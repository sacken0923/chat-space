$(function(){
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image.url ? `<img src= ${ message.image.url }>`: "";
    var html = `<div class= "chat-main-message-box" data-message-id="${message.id}">
                  <div class="chat-main-message-box-upper">
                    <div class="chat-main-message-box-upper-info">
                      ${message.user_name}
                    </div> 
                    <div class="chat-main-message-box-upper-date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="chat-main-message-box-text">
                    ${content}
                  </div>
                  <div class="lower-message__image">
                    ${img}
                  </div>
                </div>`
  return html;
  }
  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formdata = new FormData(this);
    var url = (window.location.href);
    $.ajax({  
      url: url,
      type: 'POST',
      data: formdata,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".chat-main-message").append(html);
      $("#new_message")[0].reset();
      $('.chat-main-message').animate({scrollTop: $('.chat-main-message')[0].scrollHeight});
    })
    .fail(function(data){
      alert("エラーが発生したためメッセージは送信できませんでした。");
    })
    .always(function(data){
      $('.chat-main-form-box-send').prop('disabled', false);
    })
  })

  var reloadMessages = function () {
    $('.chat-main-message').animate({ scrollTop: $('.chat-main-message')[0].scrollHeight});
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        var last_message_id = $('.chat-main-message-box:last').data("message-id"); 
        $.ajax({ 
          url: "api/messages", 
          type: 'get', 
          dataType: 'json',
          data: {last_id: last_message_id}
        })
        .done(function (messages) { 
          var insertHTML = '';
          messages.forEach(function (message){
            insertHTML = buildHTML(message);
            $('.chat-main-message').append(insertHTML);  
          })
        })  
        .fail(function () {
          alert('自動更新に失敗しました');
        });     
      }
    } 
        setInterval(reloadMessages, 5000);
});

// 37、39、50行目の部分の記述