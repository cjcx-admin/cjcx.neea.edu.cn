try {
    HTTP_HOST = "//search.neea.edu.cn";
    document.domain = "neea.edu.cn";
} catch (e) {}

function furl() {
    var url = $("link[rel=canonical]").attr("href");
    if (!url) return;

    var host = location.host.substring(0, location.host.indexOf("."));
    if ("cms" == host) return;

    if (url.indexOf(".htm") == -1) {
        var TYPE = ["folder", "category", "page"];
        url += "html1/" + (TYPE[node.type] || "report") + "/" + parseInt(node.id / 10000) + "/" + node.id % 10000 + "-1.htm";
    }
    url += location.search;

    var i = url.indexOf('/', 8);
    if (/ Mobile| MiniProgramEnv/.test(navigator.userAgent)) //转回手机版
    {
        if (url.indexOf("/html1") == i) {
            $.ajax({
                url: "/x" + url.substring(i + 1) + "?test",
                async: false,
                success: function(d) {
                    var i = d.indexOf('<div id="Content">'),
                        j = d.indexOf('<div id="Footer">', i);
                    if (j - i < 800) return;
                    location.replace(url.replace("/html", "/xhtml"));
                    return;
                }
            });
        }
    } else if (Math.min(screen.width, screen.height) >= 768) //转回PC版
    {
        if (url.indexOf("/xhtml1") == i) {
            location.replace(url.replace("/xhtml", "/html"));
            return;
        }
    }

    //停考项目
    if (node.id == 15080206) url = url.replace("/www", "/cjcx");
    else if (node.id == 15080211) url = url.replace("/www", "/zscx");

    //纠正域名
    var prefix = url.substring(url.indexOf('/') + 2, url.indexOf('.'));
    if (host != prefix) location.replace(url);
}
furl();

//管理模式JS
if (cook.get("login")) {
    mt.send("/Member" + "s.do?act=json", function(d) {
        eval("d=" + d);
        if (!d.username) return;

        if (d.role.length < 2) return;
        var editmode = $$('editmode');
        if (editmode) return;

        var BODY = document.body,
            DIV = document.createElement("DIV");
        DIV.innerHTML = "<input type='image' style='z-index:100;right:1px;position:fixed;top:14px;' id='editmode' onclick=window.open('/ser" + "vlet/Node?node=" + node.id + "&em=1&edit=ON','_top') src='/tea/image/public/icon_edit.gif' accesskey='w'>";
        editmode = DIV.firstChild;
        BODY.insertBefore(editmode, BODY.firstChild);
        if (mt.isIE) {
            (editmode = editmode.style).position = 'absolute';
            setInterval('editmode.top=document.body.scrollTop+14;', 100);
        }
    });
}

var last = new Array();

function ChangeDiv(divId, divName, zDivCount, obj) {
    for (i = 0; i <= zDivCount; i++) {
        document.getElementById(divName + i).style.display = "none";
    }
    document.getElementById(divName + divId).style.display = "block";
    if (!last[divName]) last[divName] = document.getElementById(divName + "DEF");
    last[divName].className = "";
    last[divName] = obj;
    last[divName].className = "Selected";
}


//系统日期
// JavaScript Document
function RunGLNL() {
    var today = new Date();
    var d = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    var DDDD = today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日 " + d;
    //DDDD = DDDD+ d[today.getDay()];
    DDDD = DDDD + " " + (CnDateofDateStr(today)); //显示农历
    //DDDD = DDDD+SolarTerm(today); //显示二十四节气
    document.write(DDDD);
}

function DaysNumberofDate(DateGL) {
    return parseInt((Date.parse(DateGL) - Date.parse(DateGL.getFullYear() + "/1/1")) / 86400000) + 1;
}

function CnDateofDate(DateGL) {
    var CnData = new Array(
        0x16, 0x2a, 0xda, 0x00, 0x83, 0x49, 0xb6, 0x05, 0x0e, 0x64, 0xbb, 0x00, 0x19, 0xb2, 0x5b, 0x00,
        0x87, 0x6a, 0x57, 0x04, 0x12, 0x75, 0x2b, 0x00, 0x1d, 0xb6, 0x95, 0x00, 0x8a, 0xad, 0x55, 0x02,
        0x15, 0x55, 0xaa, 0x00, 0x82, 0x55, 0x6c, 0x07, 0x0d, 0xc9, 0x76, 0x00, 0x17, 0x64, 0xb7, 0x00,
        0x86, 0xe4, 0xae, 0x05, 0x11, 0xea, 0x56, 0x00, 0x1b, 0x6d, 0x2a, 0x00, 0x88, 0x5a, 0xaa, 0x04,
        0x14, 0xad, 0x55, 0x00, 0x81, 0xaa, 0xd5, 0x09, 0x0b, 0x52, 0xea, 0x00, 0x16, 0xa9, 0x6d, 0x00,
        0x84, 0xa9, 0x5d, 0x06, 0x0f, 0xd4, 0xae, 0x00, 0x1a, 0xea, 0x4d, 0x00, 0x87, 0xba, 0x55, 0x04
    );
    var CnMonth = new Array();
    var CnMonthDays = new Array();
    var CnBeginDay;
    var LeapMonth;
    var Bytes = new Array();
    var I;
    var CnMonthData;
    var DaysCount;
    var CnDaysCount;
    var ResultMonth;
    var ResultDay;
    var yyyy = DateGL.getFullYear();
    var mm = DateGL.getMonth() + 1;
    var dd = DateGL.getDate();
    if (yyyy < 100) yyyy += 1900;
    if ((yyyy < 1997) || (yyyy > 2020)) {
        return 0;
    }
    Bytes[0] = CnData[(yyyy - 1997) * 4];
    Bytes[1] = CnData[(yyyy - 1997) * 4 + 1];
    Bytes[2] = CnData[(yyyy - 1997) * 4 + 2];
    Bytes[3] = CnData[(yyyy - 1997) * 4 + 3];
    if ((Bytes[0] & 0x80) != 0) {
        CnMonth[0] = 12;
    } else {
        CnMonth[0] = 11;
    }
    CnBeginDay = (Bytes[0] & 0x7f);
    CnMonthData = Bytes[1];
    CnMonthData = CnMonthData << 8;
    CnMonthData = CnMonthData | Bytes[2];
    LeapMonth = Bytes[3];
    for (I = 15; I >= 0; I--) {
        CnMonthDays[15 - I] = 29;
        if (((1 << I) & CnMonthData) != 0) {
            CnMonthDays[15 - I]++;
        }
        if (CnMonth[15 - I] == LeapMonth) {
            CnMonth[15 - I + 1] = -LeapMonth;
        } else {
            if (CnMonth[15 - I] < 0) {
                CnMonth[15 - I + 1] = -CnMonth[15 - I] + 1;
            } else {
                CnMonth[15 - I + 1] = CnMonth[15 - I] + 1;
            }
            if (CnMonth[15 - I + 1] > 12) {
                CnMonth[15 - I + 1] = 1;
            }
        }
    }
    DaysCount = DaysNumberofDate(DateGL) - 1;
    if (DaysCount <= (CnMonthDays[0] - CnBeginDay)) {
        if ((yyyy > 1901) && (CnDateofDate(new Date((yyyy - 1) + "/12/31")) < 0)) {
            ResultMonth = -CnMonth[0];
        } else {
            ResultMonth = CnMonth[0];
        }
        ResultDay = CnBeginDay + DaysCount;
    } else {
        CnDaysCount = CnMonthDays[0] - CnBeginDay;
        I = 1;
        while ((CnDaysCount < DaysCount) && (CnDaysCount + CnMonthDays[I] < DaysCount)) {
            CnDaysCount += CnMonthDays[I];
            I++;
        }
        ResultMonth = CnMonth[I];
        ResultDay = DaysCount - CnDaysCount;
    }
    if (ResultMonth > 0) {
        return ResultMonth * 100 + ResultDay;
    } else {
        return ResultMonth * 100 - ResultDay;
    }
}

function CnYearofDate(DateGL) {
    var YYYY = DateGL.getFullYear();
    var MM = DateGL.getMonth() + 1;
    var CnMM = parseInt(Math.abs(CnDateofDate(DateGL)) / 100);
    if (YYYY < 100) YYYY += 1900;
    if (CnMM > MM) YYYY--;
    YYYY -= 1864;
    return CnEra(YYYY) + "年";
}

function CnMonthofDate(DateGL) {
    var CnMonthStr = new Array("零", "正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊");
    var Month;
    Month = parseInt(CnDateofDate(DateGL) / 100);
    if (Month < 0) {
        return "闰" + CnMonthStr[-Month] + "月";
    } else {
        return CnMonthStr[Month] + "月";
    }
}

function CnDayofDate(DateGL) {
    var CnDayStr = new Array("零",
        "初一", "初二", "初三", "初四", "初五",
        "初六", "初七", "初八", "初九", "初十",
        "十一", "十二", "十三", "十四", "十五",
        "十六", "十七", "十八", "十九", "二十",
        "廿一", "廿二", "廿三", "廿四", "廿五",
        "廿六", "廿七", "廿八", "廿九", "三十");
    var Day;
    Day = (Math.abs(CnDateofDate(DateGL))) % 100;
    return CnDayStr[Day];
}

function DaysNumberofMonth(DateGL) {
    var MM1 = DateGL.getFullYear();
    MM1 < 100 ? MM1 += 1900 : MM1;
    var MM2 = MM1;
    MM1 += "/" + (DateGL.getMonth() + 1);
    MM2 += "/" + (DateGL.getMonth() + 2);
    MM1 += "/1";
    MM2 += "/1";
    return parseInt((Date.parse(MM2) - Date.parse(MM1)) / 86400000);
}

function CnEra(YYYY) {
    var Tiangan = new Array("甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸");
    //var Dizhi=new Array("子(鼠)","丑(牛)","寅(虎)","卯(兔)","辰(龙)","巳(蛇)",
    //"午(马)","未(羊)","申(猴)","酉(鸡)","戌(狗)","亥(猪)");
    var Dizhi = new Array("子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥");
    return Tiangan[YYYY % 10] + Dizhi[YYYY % 12];
}

function CnDateofDateStr(DateGL) {
    if (CnMonthofDate(DateGL) == "零月") return "　请调整您的计算机日期!";
    else return "农历 " + CnYearofDate(DateGL) + " " + CnMonthofDate(DateGL) + CnDayofDate(DateGL);
}

function SolarTerm(DateGL) {
    var SolarTermStr = new Array(
        "小寒", "大寒", "立春", "雨水", "惊蛰", "春分",
        "清明", "谷雨", "立夏", "小满", "芒种", "夏至",
        "小暑", "大暑", "立秋", "处暑", "白露", "秋分",
        "寒露", "霜降", "立冬", "小雪", "大雪", "冬至");
    var DifferenceInMonth = new Array(
        1272060, 1275495, 1281180, 1289445, 1299225, 1310355,
        1321560, 1333035, 1342770, 1350855, 1356420, 1359045,
        1358580, 1355055, 1348695, 1340040, 1329630, 1318455,
        1306935, 1297380, 1286865, 1277730, 1274550, 1271556);
    var DifferenceInYear = 31556926;
    var BeginTime = new Date(1901 / 1 / 1);
    BeginTime.setTime(947120460000);
    for (; DateGL.getFullYear() < BeginTime.getFullYear();) {
        BeginTime.setTime(BeginTime.getTime() - DifferenceInYear * 1000);
    }
    for (; DateGL.getFullYear() > BeginTime.getFullYear();) {
        BeginTime.setTime(BeginTime.getTime() + DifferenceInYear * 1000);
    }
    for (var M = 0; DateGL.getMonth() > BeginTime.getMonth(); M++) {
        BeginTime.setTime(BeginTime.getTime() + DifferenceInMonth[M] * 1000);
    }
    if (DateGL.getDate() > BeginTime.getDate()) {
        BeginTime.setTime(BeginTime.getTime() + DifferenceInMonth[M] * 1000);
        M++;
    }
    if (DateGL.getDate() > BeginTime.getDate()) {
        BeginTime.setTime(BeginTime.getTime() + DifferenceInMonth[M] * 1000);
        M == 23 ? M = 0 : M++;
    }
    var JQ = "二十四节气";
    if (DateGL.getDate() == BeginTime.getDate()) {
        JQ += "    今日 <font color='#598F03'><b>" + SolarTermStr[M] + "</b></font>";
    } else if (DateGL.getDate() == BeginTime.getDate() - 1) {
        JQ += "　 明日 <font color='#598F03'><b>" + SolarTermStr[M] + "</b></font>";
    } else if (DateGL.getDate() == BeginTime.getDate() - 2) {
        JQ += "　 后日 <font color='#598F03'><b>" + SolarTermStr[M] + "</b></font>";
    } else {
        JQ = " 二十四节气";
        if (DateGL.getMonth() == BeginTime.getMonth()) {
            JQ += " 本月";
        } else {
            JQ += " 下月";
        }
        JQ += BeginTime.getDate() + "日" + "<font color='#598F03'><b>" + SolarTermStr[M] + "</b></font>";
    }
    return JQ;
}


// 设置为主页 
function SetHome(obj, vrl) {
    try {
        obj.style.behavior = 'url(#default#homepage)';
        obj.setHomePage(vrl);
    } catch (e) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch (e) {
                alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage', vrl);
        } else {
            alert("您的浏览器不支持，请按照下面步骤操作：1.打开浏览器设置。2.点击设置网页。3.输入：" + vrl + "点击确定。");
        }
    }
}
// 加入收藏 兼容360和IE6 
function shoucang(sTitle, sURL) {
    try {
        window.external.addFavorite(sURL, sTitle);
    } catch (e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "");
        } catch (e) {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}


<!--
/*屏蔽所有的js错误*/
function killerrors() {
    return true;
}
window.onerror = killerrors;
//-->


//统计
var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?dc1d69ab90346d48ee02f18510292577";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();

//阿里
(function(w, d, s, q) {
    w[q] = w[q] || [];
    var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s);
    j.async = true;
    j.id = 'beacon-aplus';
    j.src = 'https://o.alicdn.com/QTSDK/quicktracking-sdk/qt_web.umd.js';
    f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'aplus_queue');

aplus_queue.push({
    action: 'aplus.setMetaInfo',
    arguments: ['appKey', 'ggvrbpmpkjf02rub5jsbg0yj']
})
aplus_queue.push({
    action: 'aplus.setMetaInfo',
    arguments: ['trackDomain', 'qtedu.om.moe.edu.cn']
});



//if(document.domain.indexOf("neea.edu.cn")!=-1)
//	document.domain = "neea.edu.cn";
function updateValidTime() {
    var uuid = cook.get("redisId", "");
    var name = cook.get("name", "");
    var email = cook.get("email", "");
    if (uuid.length > 0) {
        cook.set("redisId", uuid, 1 / 3); //neea.setCook("UUID",uuid,1/3);
        if (name.length > 0)
            cook.set("name", name, 1 / 3);
        if (email.length > 0)
            cook.set("email", email, 1 / 3);
    }
}
updateValidTime();


/*
if (location.href.indexOf("/html") > 0) {
        var locationhref = location.href.replace('/html', '/xhtml');
        if (locationhref.indexOf("?") < 0) {
            locationhref = locationhref + "?1=1";
        }
        mt.send(locationhref, function (d) {
            var cindex = d.indexOf('<div id="Content1"></div>');
            var cindex2 = d.indexOf('<div id="Content2"></div>');
            var cindex3 = d.indexOf('<div id="Content3"></div>');
            if (cindex >= 0 && cindex2 >= 0 && cindex3 >= 0) {

            } else {
                if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) && location.href.indexOf("/html") > 0) {
                    location.replace(location.href.replace('/html', '/xhtml'));
                }
            }
        });
    }
*/

function sectionTime(startTime, endTime, url) {
    try {
        var nowTime = new Date().getTime();
        startTime = new Date(startTime).getTime();
        endTime = new Date(endTime).getTime();
        if (nowTime >= startTime && nowTime < endTime) {
            if (url) {
                top.location.replace(url);
                return;
            }
            return true;
        }
    } catch (e) {}
    return false;
}