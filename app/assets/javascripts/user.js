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

  // ユーザー検索機能本体(インクリメンタルサーチ)
  function searchUsers() {
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
        data.forEach(function(user){
          var html = buildAddUserHTML(user);
          $('#user-search-result').append(html);
        });
      })

      .fail(function() {
        alert('エラーが起きました');
      });
      // Turbolinksを止めないためにfalseを返しておく
      return false;
    }
  }

  // ユーザー検索(インクリメンタルサーチ)の発火イベントの指定
  $("#user_search_field").on("keyup", searchUsers);

  // ユーザーを追加
  // Ajaxで動的に継ぎ足した要素を直接セレクタに指定することは出来ないので、
  // Ajaxが動く前から存在している要素を調査範囲に指定する
  $("#user-search-result").on("click", ".chat-group-user__btn--add", function() {
    var user = $(this).prev().text();
    // buildHTML内で付与したデータ属性からユーザーのidを取得する
    var id = $(this).data('id');
    var html = buildMemberHTML(user, id);
    $('#chat-group-users').append(html);
    $(this).parent().remove();
  });

  // ユーザーを削除
  $("#chat-group-users").on("click", ".chat-group-user__btn--remove", function(){
    $(this).parent().remove();
  });
});
