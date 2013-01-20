(function() {
    var ie = document.all;

    var urlAPI = 'http://api.bit.ly/shorten?version=2.0.1&login=moopz&apiKey=R_5832e7e03d36d996a37abb9e1aa0cae4&longUrl=' + encodeURIComponent(location.href) + '&callback=insertiFrame&history=1';
    var u = document.createElement('script');
    u.setAttribute('type', 'text/javascript');
    u.setAttribute('src', urlAPI);
// document.getElementsByTagName('head')[0].appendChild(u);

    if (!ie) {
        var tweet = getTweet();
        var long_url = encodeURIComponent(location.href);
        var BMiFrame = '\<iframe name=\"fbfanIFrame_0\" frameborder=\"0\" allowtransparency=\"true\" src=\"http://s.moopz.com/tweetpop.html?long_url=' + long_url + '&tweet=' + tweet + '\" class=\"FB_SERVER_IFRAME\" style=\"height: 400px; width: 600px; border-width=\"2px\"; border-color=\"#000000\"\>\<\/iframe\>\n\n\n\n';
        var d = document.createElement('div');
        d.id = "moopz-tweet-bm";
        d.innerHTML = BMiFrame;
        d.style.position = "absolute";
        d.style.top = (getPageScroll()[1] + (getPageHeight() / 5)) + "px";
        d.style.left = "400px";
        d.style.zIndex = "1000000";
        document.body.appendChild(d);
    }
    // getPageScroll() by quirksmode.com
    function getPageScroll() {
        var xScroll, yScroll;
        if (self.pageYOffset) {
            yScroll = self.pageYOffset;
            xScroll = self.pageXOffset;
        } else if (document.documentElement && document.documentElement.scrollTop) {	 // Explorer 6 Strict
            yScroll = document.documentElement.scrollTop;
            xScroll = document.documentElement.scrollLeft;
        } else if (document.body) {// all other Explorers
            yScroll = document.body.scrollTop;
            xScroll = document.body.scrollLeft;
        }
        return new Array(xScroll,yScroll)
    }

    // Adapted from getPageSize() by quirksmode.com
    function getPageHeight() {
        var windowHeight
        if (self.innerHeight) {	// all except Explorer
            windowHeight = self.innerHeight;
        } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
            windowHeight = document.documentElement.clientHeight;
        } else if (document.body) { // other Explorers
            windowHeight = document.body.clientHeight;
        }
        return windowHeight
    }
})();

function tweetSent() {
    var i = document.getElementById('facebox').getElementsByTagName('iframe')[0];
    i.onload = function() {
        document.getElementById('update-submit').value = "Tweet Sent!";
        document.doingForm.status.value = '';
        window.setTimeout("closeBox()", 2000);
    }
}

function getTweet() {
    var selection;
    if (window.getSelection) {
        selection = ''+window.getSelection();
    } else if (document.selection) {
        selection = document.selection.createRange().text;
    }
    var tweet;
    if (selection) {
        tweet = selection;
    } else {
        tweet = document.title;
    }
// alert("tweet:" + tweet + " escaped:" + encodeURIComponent(tweet));
    return encodeURIComponent(tweet);
}

function updateLength() {
    var c = document.doingForm.status.value.length;
    var l = document.getElementById('status-field-char-counter');
    l.innerHTML = 140 - c;
    l.style.color = (140 - c < 0) ? '#D40D12' : '#666';
}

function closeBox() {
    fadeOut('facebox',100);
}

function fadeOut(objId,opacity) {
    if (document.getElementById) {
        obj = document.getElementById(objId);
        if (opacity >= 0) {
            setOpacity(obj, opacity);
            opacity = opacity - 10;
            window.setTimeout("fadeOut('"+objId+"',"+opacity+")", 100);
        } else {
            obj.style.zIndex = -100;
        }
    }
}

function setOpacity(obj, opacity) {
    opacity = (opacity == 100)?99.999:opacity;

    // IE/Win
    obj.style.filter = "alpha(opacity:"+opacity+")";

    // Safari<1.2, Konqueror
    obj.style.KHTMLOpacity = opacity/100;

    // Older Mozilla and Firefox
    obj.style.MozOpacity = opacity/100;

    // Safari 1.2, newer Firefox and Mozilla, CSS3
    obj.style.opacity = opacity/100;
}



function doTweet() {
    var tweet = document.doingForm.status.value;
    var tweetURL = 'http://moopz.com/cgi-bin/mtmoopz/mt-comments.cgi?__mode=twitter_tweet_jsonp&blog_id=1&tweet=' + encodeURIComponent(tweet) + '&jsonp=updateTweet';
    var f = document.createElement('script');
    f.setAttribute('type', 'text/javascript');
    f.setAttribute('src', tweetURL);
    document.getElementsByTagName('head')[0].appendChild(f);
}
function updateTweet(res) {
    if (res.tweeted) {
        document.getElementById('update-submit').value = "Tweet Sent!";
        document.doingForm.status.value = '';
        window.setTimeout("closeBox()", 2000);
    } else {
        if (res.error && (res.error == 'Need Auth')) {
            setOpacity(document.getElementById('whitebox'),20);
            var authBlock = document.getElementById('auth');
            authBlock.style.display = "block";
        } else {
            alert('error tweet not sent');
        }
    }
}

function doConnect(tweet, return_to) {
    var tweet = document.doingForm.status.value;
    var return_to = 'http://moopz.com/authtweet.html';
    var h = 460;
    var w = 800;
    var top = (screen.height-(h + 110))/2;
    var left = (screen.width-w)/2;
    var options = "height=" + h + ",width=" + w + ",left=" + left  + ",screenX=" + left + ",top=" + top  + ",screenY=" + top;
    var authURL = 'http://moopz.com/cgi-bin/mtmoopz/mt-comments.cgi?__mode=login_external&blog_id=1&key=Twitter&tweet=' + encodeURIComponent(tweet) + '&oauth=1&return_to=' + encodeURIComponent(return_to);
    var authWin = new Object;
    authWin = window.open(authURL, 'connectWindow', options);
    window.setTimeout("closeBox()", 2000);
}

function doFollow() {
    var followURL = 'http://moopz.com/cgi-bin/mtmoopz/mt-comments.cgi?__mode=twitter_follow_jsonp&blog_id=106&follow=' + screen_name + '&jsonp=updateFollow';
    var f = document.createElement('script');
    f.setAttribute('type', 'text/javascript');
    f.setAttribute('src', followURL);
    document.getElementsByTagName('head')[0].appendChild(f);
}
function updateFollow(followed) {
    if (followed) {
        document.getElementById('connectbutton').innerHTML = '<span class="is-following"><i></i><strong>Following</strong></span>';
        document.getElementById('newtotal').className = "total";
        document.getElementById('oldtotal').className = "total hidden";
        var nf_screen_name = getCookie('twitter_screen_name');
        var nf_profile_image_url = getCookie('commenter_userpic');
        var g9 = document.getElementById('griditem9');
        if (g9) g9.className = "grid_item hidden";
        document.getElementById('newfollower').innerHTML = '<a href="http://twitter.com/' + nf_screen_name + '" target="_blank"><img src="' + nf_profile_image_url + '"></a><div class="name">' + nf_screen_name + '</div>';
        document.getElementById('newfollower').className = "grid_item grid_item_plus";
    }
}
function isFollowing(screen_name) {
    var following = getCookie('f_' + screen_name);
    if (following) return;
    var source_screen_name = getCookie('twitter_screen_name');
    var already_checked = getCookie('n_' + screen_name);
    if (source_screen_name && !already_checked) {
        var existsURL = 'http://api.twitter.com/1/friendships/exists.json?user_a=' + source_screen_name + '&user_b=' + screen_name + '&callback=updateFollowing';
        var f = document.createElement('script');
        f.setAttribute('type', 'text/javascript');
        f.setAttribute('src', existsURL);
        document.getElementsByTagName('head')[0].appendChild(f);
    }
}
function updateFollowing(friends) {
    var now = new Date();
    fixDate(now);
    now.setTime(now.getTime() + 1 * 24 * 60 * 60 * 1000);
    now = now.toGMTString();
    if (friends) {
        document.getElementById('connectbutton').innerHTML = '<span class="is-following"><i></i><strong>Following</strong></span>';
        setCookie('f_' + screen_name, 1, now, '/', '', '');
    } else {
        setCookie('n_' + screen_name, 1, now, '/', '', '');
    }
}
function getCookie (name) {
    var prefix = name + '=';
    var c = document.cookie;
    var nullstring = '';
    var cookieStartIndex = c.indexOf(prefix);
    if (cookieStartIndex == -1)
        return nullstring;
    var cookieEndIndex = c.indexOf(";", cookieStartIndex + prefix.length);
    if (cookieEndIndex == -1)
        cookieEndIndex = c.length;
    return unescape(c.substring(cookieStartIndex + prefix.length, cookieEndIndex));
}
function setCookie (name, value, expires, path, domain, secure) {
    var curCookie = name + "=" + escape(value) + (expires ? "; expires=" + expires : "") +
        (path ? "; path=" + path : "") + (domain ? "; domain=" + domain : "") + (secure ? "secure" : "");
    document.cookie = curCookie;
}
function fixDate (date) {
    var base = new Date(0);
    var skew = base.getTime();
    if (skew > 0)
        date.setTime(date.getTime() - skew);
}
function commaify(nStr){
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}
 