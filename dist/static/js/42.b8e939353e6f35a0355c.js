webpackJsonp([42],{178:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={methods:{uploadImage:function(){var n=this,t=this.$refs.fileload,e=t.files[0],a=new FileReader;a.onload=function(){var t=a.result,e=new Image;e.src=t,e.width="300",e.height="150",e.style.marginTop="10px",n.$refs.imgbox.appendChild(e)},a.readAsDataURL(e)}}}},276:function(n,t,e){t=n.exports=e(5)(),t.push([n.i,".img-load .header{position:relative;width:100%;height:.8rem;text-align:center;border-bottom:1px solid #e0e0e0;background-color:#fff}.img-load .header .back{width:.4rem;height:.4rem;position:absolute;left:10px;top:10px;background-image:url("+e(76)+");background-size:cover}.img-load .header .title{font-size:18px;line-height:.8rem;color:#64ccf8;font-weight:300}.img-load .control{display:inline-block;margin-left:50%;transform:translateX(-50%);background-color:#59c9fd;margin-top:.5rem;border-radius:10px;position:relative}.img-load .control .tip{position:absolute;font-size:24px;color:#d0f2f5;top:.1rem;left:50%;transform:translateX(-50%)}.img-load .control .tip .add{font-size:28px;padding-left:.1rem}.img-load .control #img_load{opacity:0}.img-load .img-box{width:300px;margin:.4rem 0 .4rem 50%;transform:translateX(-50%)}",""])},359:function(n,t){n.exports={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"img-load"},[e("div",{staticClass:"header"},[e("router-link",{attrs:{to:"/jia_data"}},[e("div",{staticClass:"back"})]),n._v(" "),e("h1",{staticClass:"title"},[n._v("上传图片")])],1),n._v(" "),e("div",{staticClass:"control"},[e("div",{staticClass:"load-box"},[n._m(0),n._v(" "),e("input",{ref:"fileload",attrs:{type:"file",id:"img_load",accept:"image/*",multiple:""},on:{change:function(t){n.uploadImage()}}})])]),n._v(" "),e("div",{ref:"imgbox",staticClass:"img-box"})])},staticRenderFns:[function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("span",{staticClass:"tip"},[n._v("点击"),e("span",{staticClass:"add"},[n._v("+")])])}]}},41:function(n,t,e){e(410);var a=e(8)(e(178),e(359),null,null);n.exports=a.exports},410:function(n,t,e){var a=e(276);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e(6)("47fa4236",a,!0)},76:function(n,t){n.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAABGdBTUEAALGPC/xhBQAAALpQTFRFV8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9AAAAV8n9/hOQuQAAAD10Uk5Ts9XKzL7A3r3BzbTJ2Kbf4eel4gWXAulmOYYucTp1dF2Fb1/TsQOk1OrXh0f1Ufn+1nAGLQGWFQ8KHCTwACNQ5sUAAADGSURBVCjPnZPXcsIwFERNgEAooXdCNy1UY1zA5/9/CzEMb1k9RI/a0dyr3bNOYj3OX5f7+dki/x44abm74ziT8uUOP3L2bQ09uVpcgavcPNjAsqXkMA0LT/07ykImUrZ4DnyEyjW3BqlAmepf4TuWnm+hfZORTOF+0YmZD3csgQ7sr5+zq3p24jfhU2+euGVYBRomrwDFULMW5SEXaRTDL5NYQ5MalEzevgY5rttoebE2sdSgb0gdWVoyNJyP/90S07HVu2MPizLKhe26BYcAAAAASUVORK5CYII="}});