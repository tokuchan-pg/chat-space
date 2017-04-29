$(document).on("turbolinks:load", function() {

  function buildHTML(message) {
    var
      html_name =
    $('<div class = "chat-main__body--message-name">').append(message.name),
      html_time =
    $('<div class = "chat-main__body--message-time">').append(message.created_at),
      html_body =
    $('<div class = "chat-main__body--message-body">').append(message.body),
      html =
    $('<div class = "chat-main__body--message">').append([html_name, html_time, html_body]);
    return html;
  }

  $('#new_message').on('submit', function(e) {
    // javascriptで作成したフラッシュメッセージを削除
    $('.notice-succsess').remove();
    $('.notice-error').remove();
    e.preventDefault();
    var textField = $('#message_body');
    var message = textField.val();

    $.ajax({
      type: 'POST',
      url: './messages.json',
      data: {
        message: {
          body: message,
          image: 'image'
        }
      },
      dataType: 'json'
    })

    .done(function(data) {
      var html = buildHTML(data);
      $('.chat-main__body--messages-list').append(html);
      // javascriptでフラッシュメッセージを作成
      var notice = $('<p class = "notice-succsess">').append('新規メッセージが送信されました');
      $('.notice').append(notice);
      textField.val('');
    })

    .fail(function() {
      var alert = $('<p class = "notice-error">').append('メッセージを入力して下さい');
      $('.notice').append(alert);
    });
    // Turbolinksを止めないためにfalseを返しておく
    return false;
  });
});
