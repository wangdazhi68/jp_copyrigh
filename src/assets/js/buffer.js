import CryptoJS from "crypto-js";
const swapendian32 = function(val) {
    return (((val & 0xFF) << 24) |
        ((val & 0xFF00) << 8) |
        ((val >> 8) & 0xFF00) |
        ((val >> 24) & 0xFF)) >>> 0;
}

const arrayBufferToWordArray = function(arrayBuffer) {
    var fullWords = Math.floor(arrayBuffer.byteLength / 4);
    var bytesLeft = arrayBuffer.byteLength % 4;
    var u32 = new Uint32Array(arrayBuffer, 0, fullWords);
    var u8 = new Uint8Array(arrayBuffer);
    var cp = [];
    for (var i = 0; i < fullWords; ++i) {
        cp.push(swapendian32(u32[i]));
    }
    if (bytesLeft) {
        var pad = 0;
        for (var i = bytesLeft; i > 0; --i) {
            pad = pad << 8;
            pad += u8[u8.byteLength - i];
        }
        for (var i = 0; i < 4 - bytesLeft; ++i) {
            pad = pad << 8;
        }
        cp.push(pad);
    }
    return CryptoJS.lib.WordArray.create(cp, arrayBuffer.byteLength);
};

export {
    arrayBufferToWordArray,
    swapendian32
}