var dpr, rem, scale;
var docEl = document.documentElement;
var fontEl = document.createElement("style");
var metaEl = document.querySelector('meta[name="viewport"]');
dpr = window.devicePixelRatio || 1;
rem = docEl.clientWidth * dpr / 10;
scale = 1 / dpr;
metaEl.setAttribute("content", "width=" + dpr * docEl.clientWidth + ",initial-scale=" + scale + ",maximum-scale=" + scale + ", minimum-scale=" + scale + ",user-scalable=no");
docEl.setAttribute("data-dpr", dpr);
docEl.firstElementChild.appendChild(fontEl);

if(window.screen.width < 750){
    fontEl.innerHTML = "html{font-size:" + rem + "px!important;}";
}else if( window.screen.width < 1300){
    fontEl.innerHTML = "html{font-size:80px;}";
}else if(window.screen.width > 1300){
    fontEl.innerHTML = "html{font-size:54px;}";
}

window.rem2px = function(v) {
    v = parseFloat(v);
    return v * rem
};
window.px2rem = function(v) {
    v = parseFloat(v);
    return v / rem
};
window.dpr = dpr;
window.rem = rem;

