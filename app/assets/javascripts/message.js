$(document).on("turbolinks:load", function() {

  function buildHTML(message) {
    // 画像がアップされないときは<img src = "null">となり余計なサムネが表示されることを防ぐ
    if (message.image_url) {
      var imageEle = '<img src = "' + message.image_url + '">';
    } else {
      var imageEle = '';
    }

    var html =
      '<div class = "chat-main__body--message">' +
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
    var textField = $('#message_body');
    var fileField = $('#message_image');

    var formData = new FormData($(this).get()[0]);

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
});
