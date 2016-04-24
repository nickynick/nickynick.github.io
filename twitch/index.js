window.CLIENT_ID = 'f51444r0qklip2pyna1yp8x3byctadw';

function refreshStreams() {  
  Twitch.api({ method: 'streams/followed', params: { limit: 100, stream_type: 'live' } }, function(error, result) {  
    var streamListElement = document.getElementById('stream-list');

    while (streamListElement.firstChild) {
      streamListElement.removeChild(streamListElement.firstChild);
    }   

    for (i in result.streams) {
      var stream = result.streams[i];      
      var channel = stream.channel;

      var streamElement = document.createElement('li');
      streamElement.innerHTML = '<a href="html5player.html?channel=' + channel.name + '">' + channel.display_name + ' | ' + channel.status + '</a>';

      streamListElement.appendChild(streamElement);
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