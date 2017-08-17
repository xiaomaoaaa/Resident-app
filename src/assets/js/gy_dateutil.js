//--------------------------------------------------- 
// 日期格式化 
// 格式 YYYY/yyyy/YY/yy 表示年份 
// MM/M 月份 
// W/w 星期 
// dd/DD/d/D 日期 
// hh/HH/h/H 时间 
// mm/m 分钟 
// ss/SS/s/S 秒 
//--------------------------------------------------- 
Date.prototype.Format = function(formatStr) {
	var str = formatStr;
	var Week = ['日', '一', '二', '三', '四', '五', '六'];

	str = str.replace(/yyyy|YYYY/, this.getFullYear());
	str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));

	str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
	str = str.replace(/M/g, this.getMonth() + 1);

	str = str.replace(/w|W/g, Week[this.getDay()]);

	str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
	str = str.replace(/d|D/g, this.getDate());

	str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
	str = str.replace(/h|H/g, this.getHours());
	str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
	str = str.replace(/m/g, this.getMinutes());

	str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
	str = str.replace(/s|S/g, this.getSeconds());

	return str;
}

//+--------------------------------------------------- 
//| 取得日期数据信息 
//| 参数 interval 表示数据类型 
//| y 年 m月 d日 w星期 ww周 h时 n分 s秒 
//+--------------------------------------------------- 
Date.prototype.DatePart = function(interval) {
	var myDate = this;
 	var partStr = '';
 	var Week = ['日', '一', '二', '三', '四', '五', '六'];
 	switch (interval) {
 		case 'y':
 			partStr = myDate.getFullYear();
 			break;
 		case 'm':
 			partStr = myDate.getMonth() + 1;
 			break;
 		case 'd':
 			partStr = myDate.getDate();
 			break;
 		case 'w':
 			partStr = Week[myDate.getDay()];
 			break;
 		case 'ww':
 			partStr = myDate.WeekNumOfYear();
 			break;
 		case 'h':
 			partStr = myDate.getHours();
 			break;
 		case 'n':
 			partStr = myDate.getMinutes();
 			break;
 		case 's':
 			partStr = myDate.getSeconds();
 			break;
 	}
 	return partStr;
}

//+--------------------------------------------------- 
//| 取得当前日期所在月的最大天数 
//+--------------------------------------------------- 
Date.prototype.MaxDayOfDate = function() {
	var myDate = this;
	var ary = myDate.toArray();
	var date1 = (new Date(ary[0], ary[1] + 1, 1));
	var date2 = date1.dateAdd(1, 'm', 1);
	var result = dateDiff(date1.Format('yyyy-MM-dd'), date2.Format('yyyy-MM-dd'));
	return result;
}

//+--------------------------------------------------- 
//| 字符串转成日期类型 
//| 格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd 
//+--------------------------------------------------- 
function StringToDate(DateStr) {
	var converted = Date.parse(DateStr);
	var myDate = new Date(converted);
	if (isNaN(myDate)) {
		var arys = DateStr.split('-');
		myDate = new Date(arys[0], --arys[1], arys[2]);
	}
	return myDate;
}

//星期数字转大写
function weekNumToStr(weekNum){
	var Week = ['一', '二', '三', '四', '五', '六', '日'];
	return "星期" + Week[weekNum - 1];
}

//获取日期：前天、昨天、今天、明天、后天(date:日期类型，addDayCount:要加减的天数)
Date.prototype.getDateStr = function(addDayCount) {
	var myDate = this;
	myDate.setDate(myDate.getDate() + addDayCount);//获取AddDayCount天后的日期
	return myDate;
//	document.write("前天："+GetDateStr(-2));
//	document.write("<br />昨天："+GetDateStr(-1));
//	document.write("<br />今天："+GetDateStr(0));
//	document.write("<br />明天："+GetDateStr(1));
//	document.write("<br />后天："+GetDateStr(2));
//	document.write("<br />大后天："+GetDateStr(3)); 
}

/*
* 获得时间差,时间格式为 年-月-日 小时:分钟:秒 或者 年/月/日 小时：分钟：秒
* 其中，年月日为全格式，例如 ： 2010-10-12 01:00:00
* 返回精度为：秒，分，小时，天
*/
function getDateDiff(startTime, endTime, diffType) {
    //将计算间隔类性字符转换为小写
    diffType = diffType.toLowerCase();
    var sTime = new Date(startTime);      //开始时间
    var eTime = new Date(endTime);  //结束时间
    //作为除数的数字
    var divNum = 1;
    switch (diffType) {
        case "s":
            divNum = 1000;
            break;
        case "m":
            divNum = 1000 * 60;
            break;
        case "h":
            divNum = 1000 * 3600;
            break;
        case "d":
            divNum = 1000 * 3600 * 24;
            break;
        default:
            break;
    }
    return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
}
/**
 * js中更改日期 y年， m月， d日， h小时， n分钟，s秒
 */  
Date.prototype.add = function(part, value) {
	value *= 1;
	if (isNaN(value)) {
		value = 0;
	}
	switch (part) {
		case "y":
			this.setFullYear(this.getFullYear() + value);
			break;
		case "m":
			this.setMonth(this.getMonth() + value);
			break;
		case "d":
			this.setDate(this.getDate() + value);
			break;
		case "h":
			this.setHours(this.getHours() + value);
			break;
		case "n":
			this.setMinutes(this.getMinutes() + value);
			break;
		case "s":
			this.setSeconds(this.getSeconds() + value);
			break;
		default:
	}
	return this;
}
/**
 * js中月份有多少天 
 * year:年 
 * month:月
 */  
Date.prototype.DaysInMonth = function(year, month) {
	var days = [ [ 1, 31 ], [ 3, 31 ], [ 4, 30 ], [ 5, 31 ], [ 6, 30 ],
			[ 7, 31 ], [ 8, 31 ], [ 9, 30 ], [ 10, 31 ], [ 11, 30 ], [ 12, 31 ] ];
	if (year % 4 == 0) {
		days.push([ 2, 29 ]);
	} else {
		days.push([ 2, 28 ]);
	}
	for (var i = 0; i < days.length; i++) {
		if (month == days[i][0]) {
			return days[i][1];
		}
	}
}
/**
 * 距离现在的时间差
 */
Date.prototype.getDateDiff2Now = function() {
	var now = new Date();  // 开始时间
	var startTime = this;
	console.log(startTime,now);
	if(getDateDiff(now, startTime,"m")<60){
		if(getDateDiff(now, startTime, "m")>=1)
			return getDateDiff(now, startTime, "m") + " 分钟";
		return "1 分钟前";
	}
	if(getDateDiff(now, startTime, "h")<24)
		return getDateDiff(now, startTime, "h") + " 小时";
	return getDateDiff(now, startTime, "d") + 1 ;
}

/**
 * 日期格式化
 */
function getDateFormat(date) {
	return new Date(date).Format("yyyy年MM月dd日");
}

/**
 * 获取自然月的开始结束日期
 * @param months 月数 -1 为两月前
 */
function getMonthBeginAndEnd(months) {
	var prevDate = new Date().add("m", -1),
		prevDays = prevDate.DaysInMonth(prevDate.getFullYear(), prevDate.getMonth() + 1),
		endDate = prevDate.Format("yyyy-MM-" + prevDays),
		beginDate = prevDate.add("m", months).Format("yyyy-MM-01");
	return [beginDate, endDate];
}