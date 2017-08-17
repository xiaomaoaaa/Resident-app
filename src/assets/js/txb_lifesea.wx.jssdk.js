// export let GoMyhApp =  function() {
	import {CryptoJS} from './txb_crypto-js.js'
	var encryptByDES = function(message, key) {
		var keyHex = CryptoJS.enc.Utf8.parse(key);
		var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7
		});
		return encrypted.toString()
	};
	var get = function(url, success, fail) {
		var xhr = null;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest()
		} else {
			try {
				xhr = new ActiveXObject("Microsoft.XMLHttp")
			} catch (e) {
				xhr = new ActiveXObject("msxml2.xmlhttp")
			}
		}
		xhr.open("GET", url, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					var txt = xhr.responseText;
					txt = eval("(" + txt + ")");
					success(txt)
				} else {
					if (fail) {
						fail(xhr.status)
					}
				}
			}
		};
		xhr.send(null)
	};
	var goapp = function(o) {
		var t, date, getTimstamp = function() {
			get("http://" + o.serverUrl + "/myh/v1/usrmne/currenttime/info", function(data) {
				t = new Date();
				t = data.data.time - t.getTime();
				date = new Date();
				t = date.getTime() + t;
				var cryptkey = o.cryptkey;
				var time = encryptByDES(t.toString(), cryptkey);
				var data = encryptByDES(JSON.stringify({
					"openId": o.openId
				}), cryptkey);
				var valstr = encryptByDES(t.toString() + "&" + JSON.stringify({
					"openId": o.openId
				}), cryptkey);
				o.acl = JSON.stringify({
					"param1": o.appKey,
					"param2": time,
					"param3": data,
					"param4": valstr
				});
				var url1 = "http://" + o.serverUrl + "/myh/v1/wxuse/copraland";
				var sfForm = document.createElement("form");
				document.body.appendChild(sfForm);
				var tmpInput = document.createElement("input");
				tmpInput.type = "hidden";
				tmpInput.name = "appKey";
				tmpInput.value = o.appKey;
				sfForm.appendChild(tmpInput);
				tmpInput = document.createElement("input");
				tmpInput.type = "hidden";
				tmpInput.name = "openId";
				tmpInput.value = o.openId;
				sfForm.appendChild(tmpInput);
				tmpInput = document.createElement("input");
				tmpInput.type = "hidden";
				tmpInput.name = "acl";
				tmpInput.value = o.acl;
				sfForm.appendChild(tmpInput);
				sfForm.action = url1;
				sfForm.method = "GET";
				sfForm.submit()
			}, function(a, b, c) {
				console.error("时间戳获取失败:" + b)
			})
		};
		getTimstamp()
	};
export let GoMyhApp = function(o) {
		if (!o || !o.serverUrl || !o.openId || !o.appKey || !o.cryptkey) {
			console.error("缺少必要参数:openId,serverUrl,appKey或cryptkey")
		} else {
			goapp(o)
		}
	}
	// window.GoMyhApp()
// }