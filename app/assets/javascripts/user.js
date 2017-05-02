$(document).on("turbolinks:load", function() {

  // 検索したユーザーのHTMLを組み立て
  function buildAddUserHTML(user) {
    var html =
      '<div class="chat-group-user">' +
      '<p class="chat-group-user__name">' +
      user.name +
      '</p>' +
      '<p class="chat-group-user__btn chat-group-user__btn--add" data-id = ' + user.id + '>' +
      '追加' +
      '</p>' +
      '</div>';
    return html;
  }

  // 追加するユーザーのHTMLを組み立て
  function buildMemberHTML(user, id) {
    var html =
      '<div class="chat-group-user">' +
      '<input type = "hidden", value = ' + id + ', name = "group[user_ids][]", id ="group_user_ids_' + id + '">' +
      '<p class="chat-group-user__name">' +
      user +
      '</p>' +
      '<p class="chat-group-user__btn chat-group-user__btn--remove">' +
      '削除' +
      '</p>' +
      '</div>';
    return html;
  }

  // グループ編集ページ（groups#edit）にて、
  // 初期状態で表示されているメンバーの削除ボタンを機能させる
  $(".chat-group-user__btn--remove").on("click", function() {
    $(this).parent().remove();
  });

  $("#user_search_field").on("keyup", function() {
    $("#user-search-result").children().remove();
    var textField = $("#user_search_field");
    var user = textField.val();

    // 検索フィールドが空に戻った場合はajax通信を行わない
    if (user == ""){

    } else {

      $.ajax({
        type: 'GET',
        url: '/users',
        data: {
          user: user
        },
        dataType: 'json'
      })

      .done(function(data) {
        for (var i = 0; i < data.length; i++){
          var html = buildAddUserHTML(data[i]);
          $('#user-search-result').append(html);
        }

        $(".chat-group-user__btn--add").on("click", function() {
          var user = $(this).prev().text();
          // buildHTML内で付与したデータ属性からユーザーのidを取得する
          var id = $(this).data('id');
          var html = buildMemberHTML(user, id);
          $('#chat-group-users').append(html);
          $(this).parent().remove();

            $(".chat-group-user__btn--remove").on("click", function() {
              $(this).parent().remove();
            });

        });

      })

      .fail(function() {
        alert('エラーが起きました');
      });
      // Turbolinksを止めないためにfalseを返しておく
      return false;

    }

  });

});
