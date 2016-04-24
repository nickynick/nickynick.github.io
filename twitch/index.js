window.CLIENT_ID = 'f51444r0qklip2pyna1yp8x3byctadw';

$(function() {
  // Initialize. If we are already logged in, there is no
  // need for the connect button
  Twitch.init({clientId: CLIENT_ID}, function(error, status) {
    if (status.authenticated) {
      // we're logged in :)
      $('.status input').val('Logged in! Allowed scope: ' + status.scope);
      // Show the data for logged-in users
      $('.authenticated').removeClass('hidden');
    } else {
      $('.status input').val('Not Logged in! Better connect with Twitch!');
      // Show the twitch connect button
      $('.authenticate').removeClass('hidden');
    }
  });


  $('.twitch-connect').click(function() {
    Twitch.login({
      scope: ['user_read', 'channel_read']
    });
  })

  $('#logout button').click(function() {
    Twitch.logout();

    // Reload page and reset url hash. You shouldn't
    // need to do this.
    window.location = window.location.pathname
  })

  $('#get-name button').click(function() {
    Twitch.api({method: 'user'}, function(error, user) {
      $('#get-name input').val(user.display_name);
    });
  })

  $('#get-stream-key button').click(function() {
    Twitch.api({method: 'channel'}, function(error, channel) {
      $('#get-stream-key input').val(channel.stream_key);
    });
  })
});