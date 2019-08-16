$(function(){
  var search_list = $("#user-search-result");
  var select_list = $("#chat-group-users");

  function appendProduct(user) {
    var html = 
    `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
      <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
    </div>`

      search_list.append(html);
  }

  function selectUserNmae(user_id, user_name) {
    var remove_html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
    <input name='group[user_ids][]' type='hidden' value='${user_id}'>
    <p class='chat-group-user__name'>${user_name}</p>
    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
  </div>`
    select_list.append(remove_html);
  }

      $("#user-search-field").on('keyup', function(){
      var input = $("#user-search-field").val();
      $.ajax({
        url: '/users',
        type: 'GET',
        data: ('keyword=' + input),
        processData: false,
        contentType: false,
        dataType: 'json'
      })
      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendProduct(user);
          });
        }
        // {
        //   appendErrMsgToHTML("エラーだおーーー");
        // }
      })
      .fail(function() {
        alert('一致するユーザーが見つかりません');
      })
      });
    $(document).on('click', '.user-search-add', function() {
        var user_id = $(this).attr("data-user-id");
        var user_name = $(this).attr("data-user-name");
        selectUserNmae(user_id, user_name);
        $(this).parent().remove();
    })

  $(document).on('click', '.user-search-remove', function() {
    $(this).parent().remove();
  })
});

// 16〜18行目の記述部分に注目

