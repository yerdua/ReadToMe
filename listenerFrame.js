(function() {
    var rtm_iframe = '<iframe name="read_to_me" frameborder="0" allowtransparency="true" src="http://www.arilacenski.com/static/ReadToMe/iframe/readToMe.html" scrolling="no"' +
        ' style="height: 120px; width: 346px; position: fixed; top: 0; right: 40px;"></iframe>';
    var d = document.createElement('div');
    d.id = 'read_to_me_container';
    d.innerHTML = rtm_iframe;
    document.body.appendChild(d);
    window.console.log(document.url)
}());