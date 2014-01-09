var re = re || {};

re.setCookie = function (cookieName, value, expirationDays, path) {
    if (expirationDays === undefined) {
        expirationDays = null;
    }
    if (path === undefined) {
        path = "/";
    }
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expirationDays);
    var cookieValue = escape(value) + ((expirationDays == null) ? "" : "; path=" + path + "; expires=" + exdate.toUTCString());
    document.cookie = cookieName + "=" + cookieValue;
}

re.deleteCookie = function (cookieName, path) {
    re.setCookie(cookieName, "", -1, path);
}

re.getCookie = function (cookieName) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + cookieName + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(cookieName + "=");
    }
    if (c_start == -1) {
        c_value = null;
    }
    else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}