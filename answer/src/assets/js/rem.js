/**
 * Created by Lenovo on 2018/11/27.
 */
/*
封装  函数 自执行函数
 var docEl = document.documentElement;
 docEl.style.fontSize = docEl.clientWidth / 7.5 + "px";
 window  orientOnchange 事件=》针对于屏幕翻转
 doc=document  addeventListener  DOMContentLoaded
 DOMContentLoaded 检测dom是否执行完毕
*/
//可以随便去用
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize';
        recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        if(clientWidth>=750){
            docEl.style.fontSize = '200px';
        }else{
            docEl.style.fontSize = (clientWidth / 7.5)*2 + 'px';
        }
    };
 	if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


   /*动态插入meta标签   如果开发的是webapp时不能采用，单独移动端时即可*/
// (function(){
//     var w=window.screen.width;
//     var target=375
//     var scale=target/w
//     var meta=document.createElement("meta")
//     meta.name="viewport"
//     meta.content="initial-scale="+scale+",minimum-scale="+scale+",maximum-scale="+scale
//     document.head.appendChild(meta);
//  })()



/*最外面的盒子
position: relative;
width: 100%;
max-width: 750px;
min-width: 320px;
margin: 0 auto;*/












