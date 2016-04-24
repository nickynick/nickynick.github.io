// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

window.addEventListener("DOMContentLoaded", function() {
    var channel = getParameterByName('channel')
    if (channel === null) {
    	alert('"channel" query parameter is not set, bailing out :(')
    	return
    }

	document.getElementById('player_iframe').setAttribute('src', 'http://player.twitch.tv/?channel=' + channel + '&html5')
    document.getElementById('chat_iframe').setAttribute('src', 'http://www.twitch.tv/' + channel + '/chat')
});