$(document).on('turbolinks:load', function(){
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>`: "";
    var html = `<div class= "chat-main-message-box" data-id="${message.id}">
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
    var message = new FormData(this);
    var url = (window.location.href);
    $.ajax({  
      url: url,
      type: 'POST',
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".chat-main-message").append(html);
      $("#new_message")[0].reset();
      $('.chat-main-message').animate({scrollTop: $('.chat-main-message').get(0).scrollHeight}, 200, 'swing');

    })
    .fail(function(data){
      alert("エラーが発生したためメッセージは送信できませんでした。");
    })
    .always(function(data){
      $('.chat-main-form-box-send').prop('disabled', false);
    })
  })
})
