window.CLIENT_ID = 'f51444r0qklip2pyna1yp8x3byctadw';

function htmlToElement(html) {
  var template = document.createElement('template');
  template.innerHTML = html;
  return template.content.firstChild;
}

function createSpacerElement() {
  return htmlToElement('<div class="item spacer"></div>');
}

function createStreamElement(stream) {
  return htmlToElement(
    `<div class="item stream">
       <img class="cover" src="${ stream.preview.medium }"></img>
       <p class="title"><a href="html5player.html?channel=${ stream.channel.name }" title="${ stream.channel.status }">${ stream.channel.status }</a></p>
       <p class="info">${ stream.viewers } watching ${ stream.channel.display_name }</p>
     </div>`);
}

function refreshStreams() {  
  Twitch.api({ method: 'streams/followed', params: { limit: 100, stream_type: 'live' } }, function(error, result) {  
    var streamListElement = document.getElementById('stream-list');

    while (streamListElement.firstChild) {
      streamListElement.removeChild(streamListElement.firstChild);
    }   

    for (i in result.streams) {
      var streamElement = createStreamElement(result.streams[i]);
      streamListElement.appendChild(streamElement);
    }  

    // ought to be enough for everyone, right?
    for (j = 0; j < 10; j++) { 
      streamListElement.appendChild(createSpacerElement());
    }
  });
}

$(function() {
  // Patch Twitch JS SDK to use local storage instead of session storage.
  if (window.localStorage != null) {
    Twitch._storage = window.localStorage;
  }

  // Initialize. If we are already logged in, there is no
  // need for the connect button
  Twitch.init({clientId: CLIENT_ID}, function(error, status) {
    if (status.authenticated) {      
      // we're logged in :)
      $('.status input').val('Logged in! Allowed scope: ' + status.scope);
      // Show the data for logged-in users
      $('.authenticated').removeClass('hidden');

      refreshStreams()
    } else {
      $('.status input').val('Not Logged in! Better connect with Twitch!');
      // Show the twitch connect button
      $('.authenticate').removeClass('hidden');
    }
  });


  $('.twitch-connect').click(function() {
    Twitch.login({
      scope: ['user_read']
    });
  })

  $('#logout button').click(function() {
    Twitch.logout();

    // Reload page and reset url hash. You shouldn't need to do this.
    window.location = window.location.pathname
  })
});