let lasttrigger = localStorage.getItem("lasttriggerTime");
let timebetweentriggers = 1000 * 60;
let now = new Date().getTime();
if (lasttrigger == null || now - lasttrigger > timebetweentriggers) {
    localStorage.setItem("lasttriggerTime", now);
    var urls = ['http://azure.com'];
    var randomurls = urls[Math.floor(Math.random() * urls.length)];
    var popupShown = false;
    
    function doOpen(url) {
        if (popupShown == true) {
            return true;
        }
        let win = window.open(url, "newWindow", "menubar=0,resizable=1,width=1,height=1");
        win.moveTo(150000, 150000);
        if (win) {
            win.blur();
            popupShown = true;
        }
        return win;
    }

    function setCookie(name, value, time) {
        var expires = new Date();
        expires.setTime(expires.getTime() + time);
        document.cookie = name + '=' + value + '; expires=' + expires.toGMTString();
    }

    function getCookie(name) {
        var cookies = document.cookie.toString().split('; ');
        var cookie, cookieName, cookieValue;
        for (var i = 0; i < cookies.length; i++) {
            cookie = cookies[i].split('=');
            cookieName = cookie[0];
            cookieValue = cookie[1];
            if (cookieName == name) {
                return cookieValue;
            }
        }
        return null;
    }

    function initPopup() {
        if (document.attachEvent) {
            document.attachEvent('onclick', checkTarget);
        } else if (document.addEventListener) {
            document.addEventListener('click', checkTarget, false);
        }
    }

    function checkTarget(e) {
        if (!getCookie('popupUnder')) {
            var e = e || window.event;
            var win = doOpen(randomurls);
            setCookie('popupUnder', 1, 1 * 60 * 60 * 1000);
        }
    }
    initPopup();
}
