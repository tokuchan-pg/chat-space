$(document).on("turbolinks:load", function() {

  function buildHTML(message) {

    // 画像がアップされないときは<img src = "null">となり余計なサムネが表示されることを防ぐ
    if (message.image_url) {
      var imageEle = '<img src = "' + message.image_url + '">';
    } else {
      var imageEle = '';
    }

    var html =
      '<div class = "chat-main__body--message" data-message-id = ' +
      message.id +
      '>' +
      '<div class = "chat-main__body--message-name">' +
      message.name +
      '</div>' +
      '<div class = "chat-main__body--message-time">' +
      message.created_at +
      '</div>' +
      '<div class = "chat-main__body--message-body">' +
      message.body +
      '</div>' +
      '<div class = "chat-main__body--message-image">' +
      imageEle +
      '</div>' +
      '</div>';
    return html;
  }

  // ファイル選択時にフォームを自動で送信する
  $('#message_image').on('change', function(){
    $(this).parents('#new_message').submit();
  });

  // フォームの非同期通信
  $('#new_message').on('submit', function(e) {
    // javascriptで作成したフラッシュメッセージを削除
    $('.notice-succsess').remove();
    $('.notice-error').remove();
    e.preventDefault();
    var textField = $('#message_body'),
        fileField = $('#message_image'),
        formData = new FormData($(this).get()[0]);

    $.ajax({
      type: 'POST',
      url: $(this).attr('action'),
      data: formData,
      // Ajaxがdataを整形しない指定
      processData: false,
      contentType: false,
      dataType: 'json'
    })

    .done(function(data) {
      var html = buildHTML(data);
      $('.chat-main__body--messages-list').append(html);
      // javascriptでフラッシュメッセージを作成
      var notice = $('<p class = "notice-succsess">').append('新規メッセージが送信されました');
      $('.notice').append(notice);
      textField.val('');
      fileField.val('');
    })

    .fail(function() {
      var alert = $('<p class = "notice-error">').append('メッセージを入力して下さい');
      $('.notice').append(alert);
    });
    // Turbolinksを止めないためにfalseを返しておく
    return false;
  });

  // 10秒間隔で、インターバル中に投稿されたメッセージを非同期で取得し表示する
  setInterval(function(){

    // 特定のグループの最後に投稿されたメッセージのidを取得する
    // まだメッセージが投稿されていない場合は、0を代入する
    // ||の左側の要素があればそれを代入、なければ右側の値を代入
    var lastMessageID = $('.chat-main__body--message').last().data('message-id') || 0;

    // APIに最後のメッセージのidを送り、そのidより大きいメッセージがあれば返してもらう
    $.ajax({
      type: 'GET',
      url: './messages',
      data: {
        lastMessageID: lastMessageID
      },
      dataType: 'json'
    })

    .done(function(data) {
      // 配列dataの要素数が1以上のときのみHTMLを組成する
      if (data.length){
        data.forEach(function(message_add){
          var html = buildHTML(message_add);
          $('.chat-main__body--messages-list').append(html);
        });
      }
    })

    .fail(function() {
      alert('エラーが生じました');
    });
    // Turbolinksを止めないためにfalseを返しておく
    return false;
    },
    10000);

});
