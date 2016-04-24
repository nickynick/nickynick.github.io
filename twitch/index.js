Twitch.init({clientId: 'f51444r0qklip2pyna1yp8x3byctadw'}, function(error, status) {
    if (status.authenticated) {
        // Already logged in, hide button
        $('.twitch-connect').hide()
    }
});

window.addEventListener("DOMContentLoaded", function() {    
    $('.twitch-connect').click(function() {
        Twitch.login({
            scope: ['user_read', 'channel_read']
        });
    });
});