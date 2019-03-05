export function getCode(n, u) {
    if (n == null) {
        return null;
        n = self.location.search;
        if (n && n !== "") try { return decodeURIComponent(n.replace("?", "")) } catch (err) { }
    }
    var s = u;
    if (s == null) s = self.location.href;
    if (n) {
        var g = new RegExp("(\\?|&)" + n + "=([^&|#]*)");
        var r = s.match(g);
        if (r) { try { return decodeURIComponent(r[2]); } catch (err) { return unescape(r[2]); } } else return null;
    } else {
        var i = s.indexOf("?");
        if (i === -1) return null;
        return decodeURIComponent(s.substr(i + 1));
    }
}

    // export const baseUrl = 'http://192.168.1.38:8090'
    export const baseUrl = 'http://www.91dream.net:8090'