import axios from 'axios';
let base = 'proxyapi'; //开发的时候
let base1 = 'http://122.224.131.235:9088'
// let base = '';//生成的时候用
// export const commonurl = `${base}/*.jsonRequest`; //通用的请求地址
// export const loginurl = `${base}/logon/login`; //登录地址
// export const logout = `${base}/logon/logout`; //退出地址
// export const rolesurl = `${base}/logon/myRoles`; //获取角色地址
// export const changepwd = `${base}/logon/changepwd`; //修改密码接口地址
// export const imguploadurl = `${base}/admin/file/upload1`; //图片上传接口地址
// export const imgview = "http://115.236.19.147:15981/bs-coms/upload/"; //图片预览地址
// export const filedowned = "http://115.236.19.147:15981/bs-coms/download/"; //文件下载地址
// export const area_url = `${base}/coms.dictionary.coms_region.dic/`; //省市联动请求地址
// export const filedownload_url = "http://115.236.19.147:15981/coms-web/download/"; //文件下载地址

// 图片请求
export const imgview = avatarFileId => {
    return `${base1}/hcn-web/upload/${avatarFileId}`
}

//音频请求
export const voiceUrl = voiceId => {
    return `${base}/pcn-core/service/chat/voice/` + voiceId
}
export const imguploadAjax = formData => {
	let instance = axios.create({
		headers: {
			"Content-Type": "multipart/form-data",
			"X-Access-Token": JSON.parse(sessionStorage.getItem("userInfo")).properties.accessToken,
		},
	});
	return instance.post(`${base}/pcn-core/dataProxyController/hcnImgProxy `, formData).then(res => res.data);
}
// 登录提交保存sessionStorage的accessToken
export const requestLoginon = params => {
    var instance = axios.create({
        headers: {
            "X-Service-Id": "",
            "X-Service-Method": "",
            "Content-Type": "application/json"
        }
    })
    return instance.post(`${base}/pcn-core/login`, params).then(res => res.data)
}
// 通用ajax请求方法
export const commonAjax = (params, ServiceId, ServiceMethod) => {
    var instance = axios.create({
        headers: {
            // "X-Access-Token": "f325670d-86d4-4826-a6f5-fd86ce4186c4",
            "X-Access-Token": JSON.parse(sessionStorage.getItem("userInfo")).properties.accessToken,
            "X-Service-Id": ServiceId,
            "X-Service-Method": ServiceMethod,
            "Content-Type": "application/json"
        }
    })
    return instance.post(`${base}/pcn-core/*.jsonRequest`, params).then(res => res.data);
};

// 通用跨域ajax请求方法
export const commonAjaxKy = (params, ServiceId, ServiceMethod) => {
    var instance = axios.create({
        headers: {
            "X-Access-Token": JSON.parse(sessionStorage.getItem("userInfo")).properties.accessToken,
            "X-Service-Id": ServiceId,
            "X-Service-Method": ServiceMethod,
            "Content-Type": "application/json"
        }
    })
    return instance.get(`${base}/pcn-core/dataProxyController/hcnJsonRequestProxy?short_url=*.jsonRequest&params=${params}`).then(res => res.data);
}

//	居民登陆请求
export const requestLoginon1 = params => {
    var instance = axios.create({
        headers: {
            "X-Service-Id": "",
            "X-Service-Method": "",
            "Content-Type": "application/json"
        }
    })
    return instance.post(`${base}/pcn-core/dataProxyController/hcnJsonRequestProxy?short_url=logon/login&params=${params}`).then(res => res.data);
};

// 用于编辑器的图片上传
// export const imguploadAjax = params => {
// 	var instance = axios.create({
// 		headers: {
// 			"X-Access-Token": sessionStorage.getItem("accessToken")
// 		}
// 	});
// 	return instance.post(`${base}/admin/file/upload1`, params).then(res => res.data)
// };
//修改密码
export const requestConfirmPassword = params => {
    var instance = axios.create({
        headers: {
            "X-Service-Id": "",
            "X-Service-Method": "",
            "Content-Type": "application/json"
        }
    })
    return instance.post(`${base}/pcn-core/modify/pwd`, params).then(res => res.data)
}

//密码重置
export const requestChangepwd = (params) => {
    let instance = axios.create({
        headers: {
            "X-Service-Id": '',
            "X-Service-Method": '',
            "Content-Type": "application/json"
        }
    })
    return instance.post(`${base}/pcn-core/reset/pwd`, params).then(res => res.data);
}

// 地区街道字典的请求
export const areaAjax = (params) => {
    var instance = axios.create({
        headers: {
            "X-Access-Token": JSON.parse(sessionStorage.getItem("userInfo")).properties.accessToken,
            "Content-Type": "application/json"
        },
        // method: 'get',
        // params: params,
    })
    return instance.get(`${base}/pcn-core/dataProxyController/dictionaryServiceProxy?short_url=hcn.base.dictionary.region.dic?${params}`).then(res => res.data);
};

// 适用人群的字典请求
export const dicAjax = () => {
    var instance = axios.create({
        headers: {
            "X-Access-Token": JSON.parse(sessionStorage.getItem("userInfo")).properties.accessToken,
            "Content-Type": "application/json"
        },
        // method: 'get',
        // params: params,
    })
    return instance.get(`${base}/pcn-core/pcn.core.dictionary.suitableObject.dic`).then(res => res.data);
    // return instance.get(`${base}/pcn-core/dataProxyController/dictionaryServiceProxy?short_url=hcn.base.dictionary.region.dic?parentKey=440305000000&sliceType=4`).then(res => res.data);
};

// 适用人群的字典请求
export const signCancelReasonDicAjax = () => {
    var instance = axios.create({
        headers: {
            "X-Access-Token": JSON.parse(sessionStorage.getItem("userInfo")).properties.accessToken,
            "Content-Type": "application/json"
        },
    })
    return instance.get(`${base}/pcn-core/pcn.core.dictionary.signCancelReason.dic`).then(res => res.data);
    // return instance.get(`${base}/pcn-core/dataProxyController/dictionaryServiceProxy?short_url=hcn.base.dictionary.region.dic?parentKey=440305000000&sliceType=4`).then(res => res.data);
};

export const residentRegister = (params, ServiceId, ServiceMethod) => {
    var instance = axios.create({
        headers: {
            // "X-Access-Token": JSON.parse(sessionStorage.getItem("userInfo")).properties.accessToken,
            "X-Service-Id": ServiceId,
            "X-Service-Method": ServiceMethod,
            "Content-Type": "application/json"
        }
    })
    return instance.post(`${base}/pcn-core/dataProxyController/hcnJsonRequestProxy?short_url=*.jsonRequest&params=${params}`).then(res => res.data);
}


//图片的转换
export const imgUrl = (imgId) => {
	return `${base1}/hcn-web/upload/` + imgId;
}
//上传图片的请求接口
// export const imguploadAjax = formData => {
//     let instance = axios.create({
//         headers: {
//             "Content-Type": "multipart/form-data",
//             "X-Access-Token": JSON.parse(sessionStorage.getItem("userInfo")).properties.accessToken,
//         },
//     });
//     return instance.post(`${base}/pcn-core/dataProxyController/hcnImgProxy `, formData).then(res => res.data);
// }
// 修改密码的请求接口
export const requestChangepwd1 = (params) =>{
    let instance = axios.create({
        headers: {
            "X-Service-Id": '',
            "X-Service-Method": '',
            "Content-Type": "application/json"
        }
    })
    return instance.post(`${base}/pcn-core/dataProxyController
        /hcnJsonRequestProxy?short_url=logon/changepwd&params=${params}`)
            .then(res => res.data);
}
