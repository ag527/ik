function utf16to8(str) { 
    var out, i, len, c;
 
    out = ""; 
    len = str.length; 
    for(i = 0; i < len; i++) { 
        c = str.charCodeAt(i); 
        if ((c >= 0x0001) && (c <= 0x007F)) { 
            out += str.charAt(i); 
        } else if (c > 0x07FF) { 
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F)); 
            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F)); 
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F)); 
        } else { 
            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F)); 
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F)); 
        } 
    } 
    return out; 
} 
function utf8to16(str) { 
    var out, i, len, c; 
    var char2, char3; 
 
    out = ""; 
    len = str.length; 
    i = 0; 
    while(i < len) { 
        c = str.charCodeAt(i++); 
        switch(c >> 4) 
        { 
          case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7: 
            // 0xxxxxxx 
            out += str.charAt(i-1); 
            break; 
          case 12: case 13: 
            // 110x xxxx   10xx xxxx 
            char2 = str.charCodeAt(i++); 
            out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F)); 
            break; 
          case 14: 
            // 1110 xxxx  10xx xxxx  10xx xxxx 
            char2 = str.charCodeAt(i++); 
            char3 = str.charCodeAt(i++); 
            out += String.fromCharCode(((c & 0x0F) << 12) | 
                                           ((char2 & 0x3F) << 6) | 
                                           ((char3 & 0x3F) << 0)); 
            break; 
        } 
    } 
 
    return out; 
} 
 
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"; 
var base64DecodeChars = new Array( 
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, 
    -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, 
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1); 
 
function base64encode(str) { 
    var out, i, len; 
    var c1, c2, c3; 
 
    len = str.length; 
    i = 0; 
    out = ""; 
    while(i < len) { 
        c1 = str.charCodeAt(i++) & 0xff; 
        if(i == len) 
        { 
            out += base64EncodeChars.charAt(c1 >> 2); 
            out += base64EncodeChars.charAt((c1 & 0x3) << 4); 
            out += "=="; 
            break; 
        } 
        c2 = str.charCodeAt(i++); 
        if(i == len) 
        { 
            out += base64EncodeChars.charAt(c1 >> 2); 
            out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4)); 
            out += base64EncodeChars.charAt((c2 & 0xF) << 2); 
            out += "="; 
            break; 
        } 
        c3 = str.charCodeAt(i++); 
        out += base64EncodeChars.charAt(c1 >> 2); 
        out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4)); 
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6)); 
        out += base64EncodeChars.charAt(c3 & 0x3F); 
    } 
    return out; 
}

function base64decode(input) {
    var _keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output="",chr1,chr2,chr3,enc1,enc2,enc3,enc4,i=0;
    input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");
    while(i<input.length){
        enc1=_keyStr.indexOf(input.charAt(i++));
        enc2=_keyStr.indexOf(input.charAt(i++));
        enc3=_keyStr.indexOf(input.charAt(i++));
        enc4=_keyStr.indexOf(input.charAt(i++));
        chr1=(enc1<<2)| (enc2>>4);
        chr2=((enc2 & 15)<< 4)| (enc3>>2);
        chr3=((enc3 & 3)<< 6)| enc4;
        output=output+String.fromCharCode(chr1);
        if (enc3!= 64){output=output+String.fromCharCode(chr2);}
        if (enc4!= 64){output=output+String.fromCharCode(chr3);}
    }
    output=_utf8_decode(output);
    return output;
};
_utf8_decode=function(utftext){
    var string="",i=0,c=c1=c2=0;
    while(i<utftext.length){
        c=utftext.charCodeAt(i);
        if(c<128){
            string+=String.fromCharCode(c);
            i++;
        }else if((c>191)&&(c<224)){
            c2=utftext.charCodeAt(i+1);
            string+=String.fromCharCode(((c & 31)<<6)|(c2&63));
            i+=2;
        }else{
            c2=utftext.charCodeAt(i+1);
            c3=utftext.charCodeAt(i+2);
            string+=String.fromCharCode(((c&15)<<12)|((c2 & 63)<<6)|(c3&63));
            i+=3;
        }
    }
    return string;
};