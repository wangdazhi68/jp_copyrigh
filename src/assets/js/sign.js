import { hexMD5 } from './md5';
const client_secret = 'client_secret';
const getSign = function(obj) {
    var sb = '';
    var x;
    for (x in ksort(obj)) {
        sb += x + '=' + obj[x] + '&';
    }
    sb += 'client_secret=client_secret';
    sb = uTF8Encode(sb);
    console.log(sb)
    var sign = hexMD5(sb);
    return sign;
}


var ksort = function(obj) {
    var keys = Object.keys(obj).sort(),
        sortedObj = {};
    for (var i in keys) {
        sortedObj[keys[i]] = obj[keys[i]];
    }
    return sortedObj;
}


function uTF8Encode(string) {
    string = string.toString().replace(/\x0d\x0a/g, "\x0a");
    var output = "";
    for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
            output += String.fromCharCode(c);
        } else if ((c > 127) && (c < 2048)) {
            output += String.fromCharCode((c >> 6) | 192);
            output += String.fromCharCode((c & 63) | 128);
        } else {
            output += String.fromCharCode((c >> 12) | 224);
            output += String.fromCharCode(((c >> 6) & 63) | 128);
            output += String.fromCharCode((c & 63) | 128);
        }
    }
    return output;
};

export { getSign }