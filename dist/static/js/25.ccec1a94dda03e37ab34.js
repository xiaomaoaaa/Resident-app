webpackJsonp([25],{174:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(7),n=(r.n(a),r(3)),o=r(80);t.default={data:function(){return{cardNumber:""}},computed:r.i(n.b)({oldPhoneNumber:"jia_phoneNumber"}),methods:{validate:function(){var e=this,t=/^1[34578]\d{9}$/,r=/^\d{18}$/,n=[""+this.cardNumber,""+this.oldPhoneNumber];""===this.oldPhoneNumber?a.MessageBox.alert("手机号码不能为空"):t.test(this.oldPhoneNumber)?""===this.cardNumber?a.MessageBox.alert("身份证号码不能为空"):r.test(this.cardNumber)?o.a.commonAjax(n,"pcn.pcnUserService","validIdcardAndMobile").then(function(t){200===t.code?e.$router.push({path:"jia_bind"}):a.MessageBox.alert("验证失败")}).catch(function(e){}):a.MessageBox.alert("请输入正确的身份证号码"):a.MessageBox.alert("请输入正确的手机号码")}}}},256:function(e,t,r){t=e.exports=r(5)(),t.push([e.i,".card .header[data-v-4fcdbdac]{position:relative;width:100%;height:.8rem;text-align:center;border-bottom:1px solid #e0e0e0;background-color:#fff}.card .header .back[data-v-4fcdbdac]{width:.4rem;height:.4rem;position:absolute;left:10px;top:10px;background-image:url("+r(76)+");background-size:cover}.card .header .title[data-v-4fcdbdac]{font-size:18px;line-height:.8rem;color:#64ccf8;font-weight:300}.card .progress[data-v-4fcdbdac]{padding:.6rem 0 1.2rem}.card .progress .pro[data-v-4fcdbdac]{width:90%;margin-left:5%;border-top:1px solid #d6d6d6;position:relative}.card .progress .pro .item[data-v-4fcdbdac]{width:60px;position:absolute;top:-.2rem}.card .progress .pro .item .cir[data-v-4fcdbdac]{display:block;width:.4rem;height:.4rem;border-radius:50%;font-size:12px;line-height:.4rem;text-align:center;margin-left:20px}.card .progress .pro .item .des[data-v-4fcdbdac]{font-size:14px;margin-top:10px}.card .progress .pro .first[data-v-4fcdbdac]{left:.4rem}.card .progress .pro .first .cir[data-v-4fcdbdac]{background-image:url("+r(82)+");background-repeat:no-repeat;background-size:cover}.card .progress .pro .first .des[data-v-4fcdbdac]{color:#57c9fd}.card .progress .pro .second[data-v-4fcdbdac]{left:50%;transform:translateX(-50%)}.card .progress .pro .second .cir[data-v-4fcdbdac]{background-color:#fcc648;color:#fff}.card .progress .pro .second .des[data-v-4fcdbdac]{color:#fcc648}.card .progress .pro .third[data-v-4fcdbdac]{right:.4rem}.card .progress .pro .third .cir[data-v-4fcdbdac]{background-color:#fff;color:#acacac}.card .progress .pro .third .des[data-v-4fcdbdac]{color:#acacac}.card .content[data-v-4fcdbdac]{padding:0 20px;background-color:#fff}.card .content .item[data-v-4fcdbdac]{font-size:16px;line-height:1rem}.card .content .item .name[data-v-4fcdbdac]{color:#5b5b5b;font-weight:500}.card .content .item input[data-v-4fcdbdac]{margin-left:.3rem;outline-style:none;border-color:transparent;width:40%;font-size:16px}.card .content .item input[data-v-4fcdbdac]::placeholder{color:#bdbdbd}.card .content .item .yz-btn[data-v-4fcdbdac]{display:inline-block;float:right;width:2rem;line-height:.7rem;background-color:#6091ed;color:#f0f0f0;margin-top:.18rem;text-align:center;border-radius:5px}.card .content .first[data-v-4fcdbdac]{border-bottom:1px solid #e7e7e7}.card .yz[data-v-4fcdbdac]{width:90%;height:.8rem;margin-top:1.5rem;margin-left:50%;transform:translateX(-50%);background-color:#57c9fd;border-radius:5px;text-align:center}.card .yz .button[data-v-4fcdbdac]{line-height:.8rem;font-size:.4rem;color:#d0f2f5}",""])},339:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"card"},[r("div",{staticClass:"header"},[r("router-link",{attrs:{to:"/jia_phone"}},[r("div",{staticClass:"back"})]),e._v(" "),r("h1",{staticClass:"title"},[e._v("证件验证")])],1),e._v(" "),e._m(0),e._v(" "),r("div",{staticClass:"content"},[r("div",{staticClass:"item first"},[r("span",{staticClass:"name"},[e._v("手机号")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.oldPhoneNumber,expression:"oldPhoneNumber"}],attrs:{type:"text",placeholder:"请输入手机号码"},domProps:{value:e.oldPhoneNumber},on:{input:function(t){t.target.composing||(e.oldPhoneNumber=t.target.value)}}})]),e._v(" "),r("div",{staticClass:"item"},[r("span",{staticClass:"name"},[e._v("身份证")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.cardNumber,expression:"cardNumber"}],attrs:{type:"text",placeholder:"请输入身份证号码"},domProps:{value:e.cardNumber},on:{input:function(t){t.target.composing||(e.cardNumber=t.target.value)}}})])]),e._v(" "),r("div",{staticClass:"yz",on:{click:e.validate}},[r("div",{staticClass:"button"},[e._v("验证")])])])},staticRenderFns:[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"progress"},[r("div",{staticClass:"pro"},[r("dl",{staticClass:"item first"},[r("dt",{staticClass:"cir"}),e._v(" "),r("dd",{staticClass:"des"},[e._v("验证方式")])]),e._v(" "),r("dl",{staticClass:"item second"},[r("dt",{staticClass:"cir"},[e._v("2")]),e._v(" "),r("dd",{staticClass:"des"},[e._v("安全验证")])]),e._v(" "),r("dl",{staticClass:"item third"},[r("dt",{staticClass:"cir"},[e._v("3")]),e._v(" "),r("dd",{staticClass:"des"},[e._v("修改绑定")])])])])}]}},37:function(e,t,r){r(390);var a=r(8)(r(174),r(339),"data-v-4fcdbdac",null);e.exports=a.exports},390:function(e,t,r){var a=r(256);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r(6)("647362fd",a,!0)},74:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(75),n=r.n(a);r.d(t,"requestLoginon",function(){return o}),r.d(t,"commonAjax",function(){return d}),r.d(t,"requestConfirmPassword",function(){return c}),r.d(t,"requestChangepwd",function(){return s}),r.d(t,"requestModuld",function(){return i}),r.d(t,"imguploadAjax",function(){return p}),r.d(t,"requestJkmoduld",function(){return l});var o=function(e){return n.a.create({headers:{"X-Service-Id":"","X-Service-Method":"","Content-Type":"application/json"}}).post("/pcn-core/login",e).then(function(e){return e.data})},d=function(e,t,r){return n.a.create({headers:{"X-Access-Token":sessionStorage.getItem("userInfo")?JSON.parse(sessionStorage.getItem("userInfo")).roles[0].accessToken:"","X-Service-Id":t,"X-Service-Method":r,"Content-Type":"application/json"}}).post("/pcn-core/*.jsonRequest",e).then(function(e){return e.data})},c=function(e){return n.a.create({headers:{"X-Service-Id":"","X-Service-Method":"","Content-Type":"application/json"}}).post("/pcn-core/modify/pwd",e).then(function(e){return e.data})},s=function(e){return n.a.create({headers:{"X-Service-Id":"","X-Service-Method":"","Content-Type":"application/json"}}).post("/pcn-core/reset/pwd",e).then(function(e){return e.data})},i=function(e){return n.a.create({headers:{"X-Service-Id":"","X-Service-Method":"","Content-Type":"application/json"}}).post("/pcn-core/api/auth/doctor/visitnode/list?t=1&moduleid="+e).then(function(e){return e.data})},p=function(e){var t=document.getElementById(e),r=new FormData(t);return n.a.create({headers:{"X-Service-Id":"","X-Service-Method":"","Content-Type":"multipart/form-data","X-Access-Token":JSON.parse(sessionStorage.getItem("userInfo")).roles[0].accessToken}}).post("http://10.8.3.40:8081/hcn-web/upload",r).then(function(e){return e.data})},l=function(e){return n.a.create({headers:{"X-Service-Id":"","X-Service-Method":"","Content-Type":"application/json"}}).post("/pcn-core/api/auth/doctor/visitnode/list",e).then(function(e){return e.data})}},75:function(e,t,r){e.exports=r(1)(122)},76:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAABGdBTUEAALGPC/xhBQAAALpQTFRFV8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9V8n9AAAAV8n9/hOQuQAAAD10Uk5Ts9XKzL7A3r3BzbTJ2Kbf4eel4gWXAulmOYYucTp1dF2Fb1/TsQOk1OrXh0f1Ufn+1nAGLQGWFQ8KHCTwACNQ5sUAAADGSURBVCjPnZPXcsIwFERNgEAooXdCNy1UY1zA5/9/CzEMb1k9RI/a0dyr3bNOYj3OX5f7+dki/x44abm74ziT8uUOP3L2bQ09uVpcgavcPNjAsqXkMA0LT/07ykImUrZ4DnyEyjW3BqlAmepf4TuWnm+hfZORTOF+0YmZD3csgQ7sr5+zq3p24jfhU2+euGVYBRomrwDFULMW5SEXaRTDL5NYQ5MalEzevgY5rttoebE2sdSgb0gdWVoyNJyP/90S07HVu2MPizLKhe26BYcAAAAASUVORK5CYII="},80:function(e,t,r){"use strict";var a=r(74);t.a=a},82:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAABGdBTUEAALGPC/xhBQAAAKJQTFRFnN/+d9P9Y839j9v+ddP9itn+ddP9dtP9Y839q+T+idn+mt7+iNn+idn+Zc39iNn+gNb9q+T+mt7+j9v+nN/+qOP+q+T+ZM39AAAAvOr+7/r/cNH91/L/9vz//P7/Zc39as/9XMv9/v//j9v+quT+8/v/Xsv9ye7+vur+Wsr9XMr9gtf+reX+W8r9/f7/kNv+v+r+gdf+WMn9+P3/////V8n9YrLi5gAAABl0Uk5Tg/H9wfPQ8vL+CtGQ0tD91OUMksCBHwb9AIpGR74AAAD8SURBVCjPhdPZdoMgEADQafZNEwUle9psbba2SZj//7WwGBGCcR6Uwz0oAzMwfkaXNlvh8Ri2mrSbT0L2TgjDPGoksTkO0YowLnA6xJcYpk9OR+iJUZpxD70x0NzHkuhLTlgZs0Qw8cnsSz7JGCLP4tuEz9XyCKhHfzifqhGFwKv3qxr24EPP7Y3+Cz3pcRv0r7/XW48ig4t67zg/vypeMt78ald6RcNZXn/KHRUfb2PBHRVbyxOT7qhIzByLdFsRIOoYXy5sFYdavJLPlX1+pPpCy8sh1sU0eFtMVaVYUciyDZz9sdhporrJHzt1p4lUCwYNdjiwRkCjfPIBjcKY1x3act4AAAAASUVORK5CYII="}});