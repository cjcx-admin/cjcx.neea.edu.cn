//******************************************?????????????????????*********?////////////////////?

//验证登陆
function f_login(name1, name2, value1, value2) {
    sendx("/js" + "p/user/login_ajax.jsp?act=login&member=" + value1 + "&paw=" + value2,
        function(data) {

            //alert("4444->>>>."+data.length);
            if (data != '' && data.length > 1) //如果有这个用户  则写入Cookie
            {

                setCookie('aotuLoginMemberId', foLogin.LoginId.value);
                setCookie('aotuLoginPassword', foLogin.Password.value);
            }
        }
    );

}
//复选框是否选中
function hs(ch) {
    var s = document.getElementsByName(ch);

    var s2 = "";
    for (var i = 0; i < s.length; i++) {
        if (s[i].checked) {
            s2 += s[i].value + ',';
        }
    }
    s2 = s2.substr(0, s2.length - 1);

    if (s2 != '' && s2.length > 0) {
        return true;
    } else {
        return false;
    }
}
//验证码刷新
function reloadVcode() {
    var vcode = document.getElementById('vcodeImg');
    vcode.setAttribute('src', '/NF' + 'asts.do?act=verify&r=' + new Date().getTime());
    //这里必须加入随机数不然地址相同我发重新加载
}

//setCookie、getCookie、removeCookie
eval(function(p, a, c, k, e, d) {
    e = function(c) {
        return (c < a ? "" : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--) d[e(c)] = k[c] || e(c);
        k = [function(e) {
            return d[e]
        }];
        e = function() {
            return '\\w+'
        };
        c = 1;
    };
    while (c--)
        if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p;
}('a s(5,8){b 2=o q();2.j(2.g()+i*k*7*7*h);3.4=5+"="+r(8)+"; f="+2.l()+"; p=/"};a t(5){b 2=o q();2.j(2.g()-i*k*7*7*h);3.4=5+"=w; f="+2.l()+"; p=/"};a x(5,8){b c=5+"=";e(3.4.d>0){6=3.4.m(c);e(6!=-1){6+=c.d;9=3.4.m(";",6);e(9==-1)9=3.4.d;n v(3.4.u(6,9))}};n 8}', 34, 34, '||expire|document|cookie|name|offset|60|value|end|function|var|search|length|if|expires|getTime|1000|30|setTime|24|toGMTString|indexOf|return|new|path|Date|escape|setCookie|removeCookie|substring|unescape|remove|getCookie'.split('|'), 0, {}))


function submitRadio(obj, text) {
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].checked) {
            return true;
        }
    }
    alert(text);
    return false;
}

function getParameter(name, url) {
    if (!url) url = location.search;
    var i = url.indexOf("#");
    if (i != -1) url = url.substring(0, i);
    i = url.indexOf("?");
    if (i != -1) {
        url = url.substring(i + 1);
        name = name + "=";
        var ps = url.split("&");
        for (var i = 0; i < ps.length; i++) {
            if (ps[i].indexOf(name) == 0) {
                return decodeURIComponent(ps[i].substring(name.length).replace(/[+]/g, ' '));
            }
        }
    }
    return null;
}

//Array.prototype.indexOf=function(str)
//{
//  for(var i=0;i<this.length;i++)
//  {
//    if(this[i]==str)return i;
//  }
//  return -1;
//}
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
//NodeList.prototype.value=function()
//{
//  for(var i=0;i<this.length;i++)
//  {
//    if(this[i].checked)
//    return this[i].value;
//  }
//  return undefined;
//}

function isIdentifier(s) {
    if (s.length < 2)
        return false;

    for (var i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (('_' == c) || ('-' == c) ||
            (('A' <= c) && (c <= 'Z')) ||
            (('a' <= c) && (c <= 'z')) ||
            (('0' <= c) && (c <= '9')))
            continue;
        else
            return false;
    }

    return true;
}

function isMemberid(s) {
    if (s.length < 2)
        return false;
    for (var i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (('_' == c) || ('-' == c) || ('@' == c) || ('.' == c) ||
            (('A' <= c) && (c <= 'Z')) ||
            (('a' <= c) && (c <= 'z')) ||
            (('0' <= c) && (c <= '9')) ||
            s.charCodeAt(i) > 255)
            continue;
        else
            return false;
    }
    return true;
}

function isEmail(s) {
    if (s.length < 4 || s.length > 40)
        return false;

    for (var i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (('_' == c) || ('-' == c) ||
            ('@' == c) || ('.' == c) ||
            (('A' <= c) && (c <= 'Z')) ||
            (('a' <= c) && (c <= 'z')) ||
            (('0' <= c) && (c <= '9')))
            continue;
        else
            return false;
    }

    if ((i = s.lastIndexOf('@')) == -1)
        return false;

    if (s.charAt(0) == '@' || s.charAt(s.length - 1) == '@')
        return false;

    var strTail = s.substring(i + 1, s.length);
    if (strTail.length < 3)
        return false;
    if ((i = strTail.lastIndexOf('.')) == -1)
        return false;

    var strTailEnd = strTail.substring(i + 1, strTail.length);
    if (strTailEnd.length == 0)
        return false;

    return true;
}

function trim(v) {
    return v.replace(/(^\s*)|(\s*$)/g, "");
}
//function submitEmail(text, alerttext)
//{
//	var   strReg="";
//	var   r;
//	var str = text.value;
//	strReg=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/i;
//	r=str.search(strReg);
//	if(r==-1)
//	{
//	  alert(alerttext);
//          text.focus();
//	  return false;
//	}
//	return true;
//}

function submitEmail(text, alerttext) {
    if (!isEmail(text.value)) {
        alert(alerttext);
        text.focus();
        return false;
    }
    return true;
}

/*
function submitStr(text,str, alerttext) {
	if (text.value.length == 0) {
		alert(alerttext);
		text.focus();
		return false;
	}else
	{
		for(int i=0;i<str.length;i++)
		{
			for(var subLoop=0;subLoop<text.value.length;subLoop++)
			{
				if(text.value.charAt(subLoop)==str.chcarAt(i))
				{
					alert(alerttext);
					text.focus();
					return false;
				}
			}
		}
	}

	return true;
}*/

function submitIdentifier(text, alerttext) {
    if (!isIdentifier(text.value)) {
        alert(alerttext);
        text.focus();
        return false;
    }
    return true;
}

function submitMemberid(text, alerttext) {
    if (!isMemberid(text.value)) {
        alert(alerttext);
        text.focus();
        return false;
    }
    return true;
}

function submitEqual(text1, text2, alerttext) {
    if (text1.value != text2.value) {
        alert(alerttext);
        text2.focus();
        return false;
    }

    return true;
}

function submitText(text, alerttext) {
    var v = trim(text.value);
    if (v.length == 0) {
        alert(alerttext);
        try {
            text.focus();
        } catch (e) {}
        return false;
    }
    text.value = v;
    return true;
}

function submitDate(obj, text) {
    var ymd = obj.value.split("-");
    var month = ymd[1] - 1
    var d = new Date(ymd[0], month, ymd[2]);
    if (d.getMonth() + 1 != ymd[1] || d.getDate() != ymd[2] || d.getFullYear() != ymd[0] || ymd[0].length != 4) {
        alert(text);
        obj.focus();
        return false;
    }
    return true;
}

function submitCheckbox(cb, text) {
    if (cb) {
        if (cb.checked) return true;
        for (var i = 0; i < cb.length; i++) {
            if (cb[i].checked)
                return true;
        }
    }
    alert(text);
    return false;
}

function submitSelect(select, alerttext) {

    if (select.selectedIndex != 0)
        return true;
    alert(alerttext);
    select.focus();
    return false;
}

function submitFloat(text, alerttext) {
    if (isNaN(parseFloat(text.value))) {
        alert(alerttext);
        text.focus();
        return false;
    }
    text.value = parseFloat(text.value);
    return true;
}

function submitInteger(text, alerttext) {
    if (isNaN(parseInt(text.value))) {
        alert(alerttext);
        text.focus();
        return false;
    }
    text.value = parseInt(text.value);
    return true;
}

function submitQuantity(nMin, nMax, nDelta, Quantity, alerttext) {
    var nQuantity = parseInt(Quantity.value);
    if (nQuantity == Math.NaN || nQuantity < nMin || nQuantity > nMax || ((nQuantity - nMin) % nDelta) != 0) {
        alert(alerttext);
        Quantity.focus();
        return false;
    }

    return true;
}

function submitLength(iMinLen, iMaxLen, Obj, alertText) {
    var iLength = Obj.value.length;
    if (iMinLen > iLength || iMaxLen < iLength) {
        alert(alertText);
        Obj.focus();
        return false;
    }
    return true;

}

function f_editor(obj) {
    if (!obj) {
        if (form1.nonuse)
            form1.nonuse.checked = localStorage.getItem('fck.editor') == 'true';
        else
            form1.nonuse = {};
    } else
        localStorage.setItem('fck.editor', form1.nonuse.checked);
    var ewebeditor = document.getElementById('editor'); //旧
    var t = form1.content.style;
    if (form1.nonuse.checked) {
        if (ewebeditor) {
            t.display = "";
            ewebeditor.style.display = "none";
        } else {
            var fck = CKEDITOR.instances['content'];
            if (fck) {
                fck.destroy();
                form1.content.value = form1.content.defaultValue;
                if (window.fit) mt.fit();
            }
        }
    } else {
        if (ewebeditor) {
            t.display = "none";
            ewebeditor.style.display = "";
        } else {
            CKEDITOR.replace(form1.content);
            if (window.fit) CKEDITOR.on('instanceReady', function(e) {
                mt.fit()
            });
        }
    }
}

function setSize(img, width, height) {
    var w = img.width;
    var h = img.height;
    //alert(w+":"+h);
    if (w > width || h > height) {
        if (w / width > h / height) {
            h = parseInt(h / (w / width));
            w = width;
        } else {
            w = parseInt(w / (h / height));
            h = height;
        }
        img.width = w;
        img.height = h;
    }
}

function f_max_img() {
    var img = new Image();
    var is = document.images;
    for (var i = 0; i < is.length; i++) {
        if (!is[i].maxheight && !is[i].maxwidth) continue;
        is[i].style.display = "none";
        img.src = is[i].src;
        var maxh = parseInt(is[i].maxheight),
            maxw = parseInt(is[i].maxwidth);
        var w = img.width,
            h = img.height;
        if (w > maxw || h > maxh) {
            if (w / maxw > h / maxh) {
                is[i].width = maxw;
            } else {
                is[i].height = maxh;
            }
        }
        is[i].style.display = "";
    }
}
setInterval(f_max_img, 100);

var nSecsLeft = 0;
var nTimerID = 0;
var strDays = "";
var strHours = "";
var strMinutes = "";
var strSeconds = "";

function startClock(s1, s2, s3, s4, n) {
    strDays = s1;
    strHours = s2;
    strMinutes = s3;
    strSeconds = s4;
    nSecsLeft = n;
    showTime();
}

function showTime() {
    nSecsLeft--;

    if (nSecsLeft > 0) {
        var nRemainDays = Math.floor(nSecsLeft / (24 * 60 * 60));
        var nRemainHours = Math.floor((nSecsLeft % (24 * 60 * 60)) / (60 * 60));
        var nRemainMinutes = Math.floor(((nSecsLeft % (24 * 60 * 60)) % (60 * 60)) / 60);
        var nRemainSeconds = Math.floor(((nSecsLeft % (24 * 60 * 60)) % (60 * 60)) % 60);
        document.foClock.Face.value = nRemainDays + " " + strDays + ", " + nRemainHours + " " + strHours + ", " + nRemainMinutes + " " + strMinutes + ", " + nRemainSeconds + " " + strSeconds;
        nTimerID = setTimeout("showTime()", 1000);
    } else
        clearTimeout(nTimerID);
}



var form;
var strElapsed;
var nProgress;

function startProgress(f, s) {
    form = f;
    strElapsed = s;
    nProgress = 0;
    showProgress();
}

function showProgress() {
    form.Progress.value = nProgress + strElapsed;
    nProgress++;
    setTimeout("showProgress()", 1000);
}


function findMember(options, member) {
    for (var i = 0; i < options.length; i++) {
        if (options[i].value == member) {
            return i;
        }
    }
    return -1;
}

function enterMember(member) {
    var options = parent.frChatMembers.document.foChatMembers.Member.options;
    var n = findMember(options, member);
    if (n == -1) {
        var tmp = new Option(member, member);
        options[options.length].value = tmp;
        options.length++;
    }
}

function leaveMember(member) {
    var options = parent.frChatMembers.document.foChatMembers.Member.options;
    var n = findMember(options, member);
    if (n != -1) {
        for (var i = n + 1; i < options.length; i++) {
            options[i - 1].text = options[i].text;
            options[i - 1].value = options[i].value;
        }
        options[options.length - 1] = null;
        options.length--;

        var choice = parent.frChatMembers.document.foChatMembers.Member;
        if (n == choice.selectedIndex) choice.selectedIndex = 0;
        if (n < choice.selectedIndex) choice.selectedIndex = n - 1;
        if (n > choice.selectedIndex) choice.selectedIndex = n;
    }
}

function analytics() {
    //       var obj=document.createElement("SCRIPT");
    //       obj.style.display="none";
    //       obj.src='http://web.51.la/go.asp?we=A-Free-Service-for-Webmasters&svid=15&id=2516104&tpages='+1+'&ttimes='+1+'&tzone='+(0-new Date().getTimezoneOffset()/60)+'&tcolor='+(screen.colorDepth||screen.pixelDepth)+'&sSize='+screen.width+','+screen.height+'&referrer='+escape(document.referrer)+'&vpage='+escape(window.parent.location);
    //       var d=document.getElementsByTagName("DIV")[0];
    //       if(d)d.appendChild(obj);
}

function insertMemberID() {
    s = '';
    scc = '';
    sbcc = '';
    j = 0;
    jcc = 0;
    jbcc = 0;
    if (document.foDelete == null) {
        alert('Invalid');
        return;
    }
    for (i = 0; i < document.foDelete.elements.length; i++) {
        dom = document.foDelete.elements[i];
        if (dom.checked) {
            if (dom.name == 'to') {
                if (j == 0) {
                    s += dom.value;
                    j = 1;
                } else {
                    s += ',' + dom.value;
                    j += 1;
                }
            }
            if (dom.name == 'cc') {
                if (jcc == 0) {
                    scc += dom.value;
                    jcc = 1;
                } else {
                    scc += ',' + dom.value;
                    jcc += 1;
                }
            }
            if (dom.name == 'bcc') {
                if (jbcc == 0) {
                    sbcc += dom.value;
                    jbcc = 1;
                } else {
                    sbcc += ',' + dom.value;
                    jbcc += 1;
                }
            }
            if ((dom.name != 'to') && (dom.name != 'cc') && (dom.name != 'bcc') && (dom.name != 'UseAsMyOwnCGroup')) {
                if (j == 0) {
                    s += dom.name;
                    j = 1;
                } else {
                    s += ',' + dom.name;
                    j += 1;
                }
            }
        }
    }
    if (window.opener.document.foNew == null) {
        if (window.opener.document.foEdit == null) {
            alert('Invalid');
            return;
        } else {
            if (!(window.opener.document.foEdit.Cc == null)) {
                window.opener.document.foEdit.Cc.size = 40 + (j - 1) * 10 + (jcc - 1) * 10;
                if (!(window.opener.document.foEdit.Cc.value == 0)) {
                    window.opener.document.foEdit.Cc.value += ',' + scc;
                } else {
                    window.opener.document.foEdit.Cc.value = scc;
                }
            }
            if (!(window.opener.document.foEdit.Bcc == null)) {
                window.opener.document.foEdit.Bcc.size = 40 + (jbcc - 1) * 10;
                if (!(window.opener.document.foEdit.Bcc.value == 0)) {
                    window.opener.document.foEdit.Bcc.value += ',' + sbcc;
                } else {
                    window.opener.document.foEdit.Bcc.value = sbcc;
                }
            }
            window.close();
        }
    } else {
        if (!(window.opener.document.foNew.To == null)) {
            window.opener.document.foNew.To.size = 40 + (j - 1) * 10;
            if (!(window.opener.document.foNew.To.value == 0)) {
                window.opener.document.foNew.To.value += ',' + s;
            } else {
                window.opener.document.foNew.To.value = s;
            }
            if (!(window.opener.document.foNew.Cc == null)) {
                window.opener.document.foNew.Cc.size = 40 + (jcc - 1) * 10;
                if (!(window.opener.document.foNew.Cc.value == 0)) {
                    window.opener.document.foNew.Cc.value += ',' + scc;
                } else {
                    window.opener.document.foNew.Cc.value = scc;
                }
            }
            if (!(window.opener.document.foNew.Bcc == null)) {
                window.opener.document.foNew.Bcc.size = 40 + (jbcc - 1) * 10;
                if (!(window.opener.document.foNew.Bcc.value == 0)) {
                    window.opener.document.foNew.Bcc.value += ',' + sbcc;
                } else {
                    window.opener.document.foNew.Bcc.value = sbcc;
                }
            }
            window.close();
        }
        if (!(window.opener.document.foNew.Contacts == null)) {
            window.opener.document.foNew.Contacts.size = 40 + (j - 1) * 10 + (jcc - 1) * 10 + (jbcc - 1) * 10;
            window.opener.document.foNew.Contacts.value = s + ',' + scc + ',' + sbcc;
            window.close();
        }
        if (!(window.opener.document.foNew.Members == null)) {
            window.opener.document.foNew.Members.size = 40 + (j - 1) * 10 + (jcc - 1) * 10 + (jbcc - 1) * 10;
            window.opener.document.foNew.Members.value = s + ',' + scc + ',' + sbcc;
            window.close();
        }
    }
}

function sendx(url, d) {
    if (url.indexOf("http://") == 0 && url.indexOf(location.host) == -1) {
        url = "/servlet/Ajax?act=sendx&url=" + encodeURIComponent(url);
    }
    try {
        var a = null;
        if (window.ActiveXObject) {
            a = new ActiveXObject("Msxml2.XMLHTTP");
            if (!a) {
                a = new ActiveXObject("Microsoft.XMLHTTP")
            }
        } else
        if (window.XMLHttpRequest) {
            a = new XMLHttpRequest
        }
        if (d) {
            a.onreadystatechange = function() {
                if (a.readyState == 4) {
                    d(a.responseText);
                    //d=a.responseXML?a.responseXML:a.responseText;
                }
            }
        }
        a.open("GET", url + "&t=" + new Date().getTime(), true);
        a.send("");
    } catch (e) {
        //alert(e.number+":"+e.description);
    }
}

function showCalendar(fieldname, flag) {
    var param = "edge:raised;scroll:0;status:0;help:0;resizable:1;dialogWidth:280px;dialogHeight:205px;";
    if (window.event) {
        myleft = document.body.scrollLeft + event.clientX - event.offsetX - 80;
        mytop = document.body.scrollTop + event.clientY - event.offsetY + 140;
        param += "dialogTop:" + mytop + "px;dialogLeft:" + myleft + "px"
    }
    var rs = window.showModalDialog("/jsp/include/Calendar.jsp", self, param);
    if (!rs) return;
    if (flag) rs = rs.replace("-", "年").replace("-", "月") + "日";
    (typeof(fieldname) == "object" ? fieldname : eval(fieldname)).value = rs;
}

function move(select1, select2, del) {
    if (select1.selectedIndex != -1) {
        var op1 = select1.options;
        if (select2) {
            var op2 = select2.options;
            for (var i = 0; i < op1.length; i++) {
                if (op1[i].selected) {
                    var add = true;
                    //if(!del)
                    {
                        for (var j = 0; j < op2.length; j++) {
                            if (op1[i].value == op2[j].value) {
                                add = false;
                                break;
                            }
                        }
                    }
                    if (add) {
                        op2[op2.length] = new Option(op1[i].text.replace("　├", "").replace("　", "").replace("　", ""), op1[i].value);
                        //            if(del)
                        //            {
                        //              op1[i]=null;
                        //              i--;
                        //            }
                    }
                    if (del) {
                        op1[i] = null;
                        i--;
                    }
                }
            }
        } else //上下移动
        {
            if (del) {
                for (var i = 1; i < op1.length; i++) {
                    if (op1[i].selected) {
                        var tmp = new Option(op1[i].text, op1[i].value);
                        op1[i] = new Option(op1[i - 1].text, op1[i - 1].value);
                        op1[i - 1] = tmp;
                        op1[i - 1].selected = true;
                    }
                }
            } else {
                for (var i = op1.length - 2; i > -1; i--) {
                    if (op1[i].selected) {
                        var tmp = new Option(op1[i].text, op1[i].value);
                        op1[i] = new Option(op1[i + 1].text, op1[i + 1].value);
                        op1[i + 1] = tmp;
                        op1[i + 1].selected = true;
                    }
                }
            }
        }
    }
}

function selectAll(obj, bool) {
    if (!obj) return;
    if (!obj.disabled) obj.checked = bool;
    for (var i = 0; i < obj.length; i++) {
        if (!obj[i].disabled) obj[i].checked = bool;
    }
}

function selectValue(obj, v) {
    if (!obj) return;
    if (!obj.length) obj = new Array(obj);
    for (var i = 0; i < obj.length; i++) {
        obj[i].checked = obj[i].value == v;
    }
}

function clearFrom(f) {
    for (var i = 0; i < f.elements.length; i++) {
        var obj = f.elements[i];
        if (obj.type == "text" || obj.type == "password") {
            obj.value = "";
        } else if (obj.type.indexOf("select") == 0) {
            obj.selectedIndex = 0;
        }
    }
}

function showImg(url) {
    if (url.indexOf(' ') != -1) url = encodeURI(url);
    if (navigator.appVersion.indexOf("MSIE 7.") != -1) {
        window.open(url);
    } else {
        var win = window.open('about:blank', '', 'height=300,width=400,resizable=1');
        win.document.write('<img src=' + url + ' onload=window.resizeTo(this.width+30,this.height+50) >');
    }
}

function showSnap(event, obj) {
    var left = document.body.scrollLeft + event.clientX - event.offsetX - 2;
    var top = document.body.scrollTop + event.clientY - event.offsetY + 18;
    obj.style.left = left;
    obj.style.top = top;
    obj.filters.revealTrans.Transition = Math.random() * 200;
    obj.filters.revealTrans.apply();
    obj.style.visibility = event.type.indexOf('over') != -1 ? 'visible' : 'hidden';
    obj.filters.revealTrans.play();
}

/*
    var img=new Image(url);
    var win=window.open('about:blank','','height='+(img.height+50)+',width='+(img.width+30)+',resizable=1');
    win.document.write('<img src='+url+' >');// onload=window.resizeTo(this.width+30,this.height+50)
*/




//EDN前台功能菜单  ////////////////////////////////////
var edn = {};
edn.show1 = function(a) {
    if (a.tagName.toUpperCase() == 'DIV') a = a.previousSibling;
    a.className = 'show';

    n = a.nextSibling;
    s = n.style;
    if (edn.s) {
        if (edn.s == s)
            clearTimeout(edn.inter);
        else
            edn.s.display = 'none';
    }
    if (s.display != 'none') return;

    s.left = mt.left(a) + 'px';
    var top = mt.top(a) + a.offsetHeight + 2;
    if (mt.isIE) top -= document.body.scrollTop;
    s.top = top + 'px';

    s.display = '';

    var arr = n.childNodes;
    for (var i = 0; i < arr.length; i++) arr[i].hideFocus = true;
};

edn.hide1 = function(a) {
    if (a.tagName.toUpperCase() == 'DIV') a = a.previousSibling;
    a.className = '';
    edn.s = a.nextSibling.style;
    edn.inter = setTimeout("edn.s.display='none'", 10);
};


edn.show2 = function(a) {
    if (a.tagName.toUpperCase() == 'DIV') a = a.previousSibling;
    s = a.nextSibling.style;
    s.left = a.offsetWidth + 'px';
    s.top = a.offsetTop + 'px';
    s.display = '';
};

edn.hide2 = function(a) {
    if (a.tagName.toUpperCase() == 'DIV') a = a.previousSibling;
    s = a.nextSibling.style;
    s.display = 'none';
};

edn.snap = function(event, obj) {
    var left = 139;
    var top = obj['offsetTop'];
    obj.style.left = left;
    obj.style.top = top;
    obj.filters.revealTrans.Transition = Math.random() * 200;
    obj.filters.revealTrans.apply();
    obj.style.visibility = event.type.indexOf('over') != -1 ? 'visible' : 'hidden';
    obj.filters.revealTrans.play();
};

edn.menu = function() {
    edn.scroll = document.getElementById("edn_menu").style;
    if (top.location != self.location)
        edn.scroll.display = 'none'; //document.write("<style type='text/css'>#fm1,.edn_dtable{display:none;}</style>");
    else if (mt.isIE && document.compatMode == 'BackCompat') {
        edn.scroll.position = 'absolute';
        setInterval("edn.scroll.top=document.body.scrollTop;", 100);
    }
};


//列举滚动加载分页
var _page = 1;
edn.page = function(i) {
    $$('PageNum').style.display = 'none';
    window.onscroll = function() {

        var HTML = document.documentElement,
            PAGE = $$('PageNum'),
            UA = navigator.userAgent;
        var dwidth = document.body.scrollTop == 0 ? document.documentElement.scrollTop : document.body.scrollTop;
        var uaheight = UA.indexOf(' UCBrowser/') > 0 ? 50 : 0;
        //UA.indexOf('HuaweiBrowser/')>0   uaheight=39;
        if (UA.indexOf('HUAWEI') > 0 || UA.indexOf('Huawei') > 0) {
            uaheight = 72;
        }
        //alert(UA);
        if (HTML.scrollHeight > HTML.clientHeight + dwidth + uaheight + 10 || PAGE.style.display == '') //只有UC浏览器要加49,50，原因未知
            return;
        var dtotalpag = $$('PageNum').innerHTML.substring($$('PageNum').innerHTML.indexOf("total:") + 6, $$('PageNum').innerHTML.indexOf("}"));
        if (++_page > dtotalpag) return;
        console.log('load:' + _page);
        PAGE.style.display = '';
        setTimeout(function() { //无静态页，会有问题
            mt.send(location.href.replace('-1', '-' + (_page)).replace('&pos=1', '&pos=' + _page) + '#', function(d) {
                var doc = _ajax.document;
                doc.body.innerHTML = d;
                var t = doc.getElementById('PageNum').parentNode.childNodes;
                while (t.length > 3) {
                    PAGE.parentNode.insertBefore(t[0], PAGE);
                }
                PAGE.style.display = 'none';
            })
        }, 500);
    };
};





//////////////////////////对话框///////////////////////start/////////////
/*
//document.write('<iframe name="dialog_frame" src="about:blank" style="display:none" width=300 height=300></iframe>');
//document.write('<div id=dialog_bg oncontextmenu="return false;" style="position:absolute;z-index:1;display:none; left:0px;top:0px;height:100%;width:100%;background-color:#CCCCCC;filter:Alpha(Opacity=0);"></div>');
document.write('<div id="dialog_box" style="position:absolute;z-index:1;display:none;left:300px;top:200px;">');
//style="background-color:#000000; width:500px; height:20px;"
document.write('  <div id=dialog_xijie >');
document.write('  <div id="dialog_title" onMouseDown="dialog_d(this);" onMouseMove="dialog_m(this);" onMouseUp="dialog_u(this);" style="CURSOR:move"><a id=dialog_close href="###" onMouseDown="javascript:dialog_close();"></a></div>');
document.write('  <div id=dialog_info ></div>');
document.write('  <div id=dialog_content>您修改的信息已成功提交.</div>');
document.write('  <div id=dialog_button><input type=button id=dialog_ok value=确定 onclick="location.reload();"></div>');
document.write('</div>');
document.write('  <div id=dialog_ad ></div>');
document.write('</div>');
*/

var d_bg = document.getElementById('dialog_bg');
var d_box = document.getElementById('dialog_box');

function dl_down(event, obj) {
    var dl = obj.parentNode;
    if (!dl) {
        var arr = document.getElementsByName(obj.name);
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].contentWindow == obj) {
                dl = arr[i].parentNode.parentNode;
                break;
            }
        }
    }
    dl.style.zIndex = ("" + new Date().getTime()).substring(4);
    var e = event.srcElement;
    if (event.button == 1 && e.tagName == "DIV") {
        obj.x = event.offsetX + e.offsetLeft + 2;
        obj.y = event.offsetY + e.offsetTop + 2;
        obj.down = true;
        obj.setCapture();
    }
}

function dl_move(event, obj) {
    if (obj.down) {
        var x = event.clientX + document.body.scrollLeft;
        if (x < 0) x = 0;
        var y = event.clientY + document.body.scrollTop;
        if (y < 0) y = 0;
        var dl = obj.parentNode;
        dl.style.left = x - obj.x;
        dl.style.top = y - obj.y;
    }
}

function dl_up(event, obj) {
    if (obj.down) {
        obj.releaseCapture();
        obj.down = false;
    }
}

function dl_close(obj) {
    obj.parentNode.parentNode.parentNode.style.display = "none";
}

function showDialog(title, content, footer, w, h, ad) {
    if (!content) content = "";
    if (!footer) footer = "";
    if (!w) w = 400;
    if (!h) h = 200;
    var l = document.body.scrollLeft + (document.body.clientWidth / 2 - w / 2);
    var t = document.body.scrollTop + (document.body.clientHeight / 2 - h / 2);
    var dl = document.all("dialog");
    if (dl) {
        var c = dl.length || 1;
        l = l + c * 30;
        t = t + c * 30;
    }
    var h = "  <div id=dialog_body style=width:" + w + "px;height:" + h + "px onmousedown=dl_down(event,this); onmousemove=dl_move(event,this); onmouseup=dl_up(event,this);>";
    h = h + "    <div id=dialog_header style=width:100%><div>" + title + "</div><a id=dialog_close href=javascript:; onclick=dl_close(this)></a></div>";
    if (content.indexOf("/") == 0 || content.indexOf("http://") == 0 || content == "about:blank") {
        h = h + "<iframe name=dialog_content src=" + content + " style=width:338px;height:118px; scrolling=auto frameborder=0></iframe>";
    } else {
        h = h + "<div id=dialog_content style=width:100%;height:100%>" + content + "</div>";
    }
    h = h + "    <div id=dialog_footer style=width:100%;>" + footer + "</div>";
    h = h + "  </div>";
    if (ad) {
        h = h + "  <div id=dialog_ad>" + ad + "</div>";
    }

    var dl = document.createElement("div");
    dl.id = "dialog";
    dl.style.position = "absolute";
    dl.style.left = l;
    dl.style.top = t;
    dl.style.zIndex = ("" + new Date().getTime()).substring(4);
    dl.innerHTML = h;
    document.body.appendChild(dl);
    return dl;
}
//////////////////////////对话框///////////////////////end/////////////


///PNG透明图解决方案//////////////////////
function alphaPNG(obj) {
    var is;
    if (obj && obj.src) {
        is = new Array(obj);
    } else {
        is = document.images;
    }
    for (var i = 0; i < is.length; i++) {
        if (is[i].src.toUpperCase().indexOf(".PNG") != -1) {
            var LW = is[i].width;
            var LH = is[i].height;
            is[i].style.filter += "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingmethod=scale,src=" + is[i].src + ");";
            is[i].src = "/tea/image/public/blank_png.gif";
            is[i].width = LW;
            is[i].height = LH;
        }
    }
}


function player(url, w, h, fv) {
    if (url.toLowerCase().indexOf(".flv") != -1) {
        if (!fv) fv = "Clear_Skin_3"
        fv = "&MM_ComponentVersion=1&skinName=/tea/image/flv/" + fv + "&streamName=" + url + "&autoPlay=true&autoRewind=true";
        url = "/tea/image/flv/FLVPlayer_Progressive.swf";
    }
    document.write("<embed src=" + url + " width=" + w + " height=" + h + " flashvars=" + fv + " wmode=opaque></embed>"); // wmode="+(tr?"transparent":"opaque")+"
}

//BBS.java
edn.gag = function(m) {
    mt.show("<input name=gag type=radio id='_gag0' checked><label for='_gag0'>取消禁言</label><br/><input name=gag type=radio id='_gag1'><label for='_gag1'>禁言</label><input name=day size=5>天", 2, "禁言“" + m + "”用户");
    mt.ok = function() {
        var b = $('_gag1').checked,
            v = $('day').value;
        if (!b) v = '0';
        if (v == '') {
            alert('“禁言天数”不能为空！');
            return false;
        }
        mt.post('/Members.do?act=gag&members=' + encodeURIComponent(m) + '&gag=' + b + '&day=' + v);
    };
}


function mask() {
    var is = document.getElementsByTagName("INPUT");
    for (var i = 0; i < is.length; i++) {
        switch (is[i].getAttribute('mask')) {
            case "max":
                is[i].ondblclick = function() {
                    var ta = document.createElement("TEXTAREA");
                    ta.style.position = "absolute";
                    ta.cols = 50;
                    ta.rows = 10;
                    ta.value = this.value;
                    var left = document.body.scrollLeft + event.clientX - event.offsetX - 2;
                    var top = document.body.scrollTop + event.clientY - event.offsetY + 18;
                    ta.style.left = left;
                    ta.style.top = top;
                    document.body.appendChild(ta);
                    ta.focus();
                    var input = this;
                    ta.onblur = function() {
                        this.style.display = "none";
                        input.value = this.value;
                        input.focus();
                    }
                }
                break;
            case "int":
                is[i].style.imeMode = "disabled"; //GG不支持
                is[i].onkeypress = function() {
                    var kc = event.keyCode;
                    if (event.keyCode < 48 || event.keyCode > 57) {
                        mt.tip(this, "只能输入数字。");
                        event.returnValue = false;
                    }
                }
                is[i].attachEvent('onkeyup', function(e) {
                    e = e.srcElement || this;
                    v = e.value.replace(/[^\d]/g, '');
                    if (e.value != v) e.value = v;
                });
                break;
            case "float":
                is[i].onkeypress = function() {
                    if ((event.keyCode < 48 || event.keyCode > 57) && event.keyCode != 46) {
                        mt.tip(this, "只能输入数字。");
                        event.returnValue = false;
                    }
                }
                break;
            case "tel":
                is[i].onkeypress = function() {
                    if ((event.keyCode < 48 || event.keyCode > 57) && event.keyCode != 45) {
                        mt.tip(this, "只能输入数字和“-”。");
                        event.returnValue = false;
                    }
                }
                break;
            case "text":
                is[i].onkeypress = function() {
                    if (event.keyCode == 60 || event.keyCode == 62) {
                        mt.tip(this, "不能输入特殊符号。");
                        event.returnValue = false;
                    }
                }
                break;
            case "info":
                is[i].onchange = function() {
                    var obj = document.getElementById(this.name + 'info');
                    if (obj) {
                        var name = this.value.substring(this.value.lastIndexOf('\\') + 1);
                        var ex = name.substring(name.lastIndexOf('.') + 1);
                        obj.innerHTML = '<img width=16 height=16 src=/tea/image/netdisk/' + ex + '.gif>' + name;
                    }
                }
                break;
            case "exists":
                is[i].onblur = function() {
                    var minfo = document.getElementById(this.alt);
                    var v = this.value,
                        f, err = "<img src='/tea/image/public/check_error.gif'>",
                        ok = "<img src='/tea/image/public/check_right.gif'>";
                    if (v.length < 3) f = err + "长度至少3位";
                    else if (v.length > 20) f = err + "长度不能大于20位";
                    if (f) {
                        minfo.innerHTML = f;
                    } else {
                        minfo.innerHTML = "检查中..."
                        sendx("/servlet/Ajax?act=checkmember&member=" + encodeURIComponent(this.value), function(v) {
                            minfo.innerHTML = v == "true" ? err + "会员名已存在" : ok + "会员名可以注册";
                        });
                    }
                }
                break;
        }
    }
    var is = document.getElementsByTagName("SELECT");
    for (var i = 0; i < is.length; i++) {
        if (is[i].mask == "div") {
            var t = document.createElement("DIV");
            t.bind = is[i];
            t.className = "select";
            t.style.cssText = "border:1px solid #696969;background:#FFFFFF;height:" + (is[i].size * 12) + "px;" + is[i].style.cssText;
            var o = is[i].options,
                h = '';
            for (var j = 0; j < o.length; j++)
                h += "<li onclick='s_click(this)' v=\"" + o[j].value + "\">" + o[j].text;
            t.innerHTML = h;
            is[i].style.display = 'none';
            is[i].parentNode.insertBefore(t, is[i]);
            t.childNodes[is[i].selectedIndex].click();
        }
    }
    var is = document.getElementsByTagName("TEXTAREA");
    for (var i = 0; i < is.length; i++) {
        if (is[i].maxlength) {
            is[i].onpropertychange = function() {
                var j = parseInt(this.maxlength),
                    v = this.value;
                if (v.length > j) this.value = v = v.substring(0, j);
                j = $(this.name + '_length');
                if (j) j.innerHTML = v.length;
            }
        }
    }
}

document.write('<style type="text/css">.select li{padding-left:5px}</style>');

function s_click(o) {
    var t = o.parentNode;
    t.bind.value = o.v;
    if (t.last) t.last.style.cssText = "background:;color:#000";
    o.style.cssText = "background:#3399FF;color:#FFF";
    t.last = o;
}



function f_init() {
    mask();
    //填充标题
    if (document.title == "") {
        var h1 = document.body.firstChild;
        if (h1.tagName == "H1") document.title = h1.innerHTML.replace(/<[^>]+>/g, "");
    }
    //
    if (window.dialogArguments) {
        var t = "　";
        for (var i = 0; i < 10; i++) t += t;
        document.title += t;
        if (!window.name || window.name == "self") {
            window.name = "self";
            var tmp = document.forms;
            for (var i = 0; i < tmp.length; i++) {
                if (!tmp[i].target) tmp[i].target = "self";
            }
        }
    }

    analytics();
    var isBg = location.pathname.indexOf("/jsp/") == 0;
    //if(typeof(node)!="number")node.id=getCookie('node',1);
    //setCookie('node',node.id);
    if (isBg || typeof(ntype) == "undefined") return;
    //access history
    if (node && node.type > 1) {
        var nid = '/' + node.id;
        var value = getCookie('tea.history', '/').replace(nid, '');
        setCookie('tea.history', nid + value);
    }
    //
    var ns = document.all("NodeIDClick");
    if (ns) {
        if (!ns.length) ns = new Array(ns);
        var p = "";
        for (var i = 0; i < ns.length; i++) {
            var n = ns[i].label;
            if (n) p += "&node=" + n;
        }
        if (p != "") {
            sendx("/servlet/Ajax?act=click" + p, function(js) {
                eval(js);
                for (var i = 0; i < ns.length; i++) {
                    ns[i].innerHTML = arr["N" + ns[i].label];
                }
            });
        }
    }
}

if (window.attachEvent) {
    window.attachEvent("onload", f_init);
} else {
    window.addEventListener("load", f_init, false);
}




//内容分页
var pageindex = 0;

function page(i) {
    var text = document.all("text_page");
    var ap = document.getElementById("SPage").childNodes;
    text[pageindex].style.display = "none";
    ap[pageindex * 2 + 2].id = "ContentPage";
    text[i].style.display = "";
    ap[i * 2 + 2].id = "Page";
    pageindex = i;
    var last = ap.length - 2;
    ap[0].style.display = (i == 0) ? "none" : "";
    ap[last].style.display = (i == last / 2 - 2) ? "none" : "";
    ap[0].onclick = function() {
        page(i - 1);
    };
    ap[last].onclick = function() {
        page(i + 1);
    };
}

//覆盖用
function override() {}

//开始菜单
var sys_menu_div, sys_menu_arr = new Array();

function sys_menu(obj, key, y) {
    sys_menu_div = sys_menu_arr[key];
    if (!sys_menu_div) {
        var s = obj.style;
        var r = parseInt(s.right) + parseInt(s.width) - 5;
        if (!r) r = 10;
        if (!y) y = 30;
        sys_menu_div = document.createElement("DIV");
        sys_menu_div.innerHTML = "<img src='/tea/image/public/load.gif' />";
        if (obj.tagName == "DIV") sys_menu_div.referer = obj;
        sys_menu_div.onselect = function() {
            return true
        };
        sys_menu_div.onmouseover = function() {
            this.style.display = '';
            var tmp = this.referer;
            while (tmp) {
                tmp.style.display = '';
                tmp = tmp.referer;
            }
        };
        sys_menu_div.onmouseout = function() {
            this.style.display = 'none';
            var tmp = this.referer;
            while (tmp) {
                tmp.style.display = 'none';
                tmp = tmp.referer;
            }
        };
        sendx("/servlet/Ajax?act=menu&q=" + encodeURI(key), function(h) {
            sys_menu_div.innerHTML = h;
        });
        obj.parentNode.appendChild(sys_menu_div);
        sys_menu_arr[key] = sys_menu_div;
        sys_menu_div.style.cssText = "position:absolute;width:140px;right:" + r + "px;top:" + y + "px;background-color:#FFFFFF;border:1px solid #CCCCCC;cursor:default;";
    } else {
        sys_menu_div.style.display = '';
    }
}

function sys_menu_over(obj) {
    obj.bgColor = '#BCD1E9';
    if (obj.onclick) return;
    var tr = obj,
        y = -document.body.scrollTop;
    while (tr.tagName != "BODY") {
        y += tr.offsetTop;
        tr = tr.parentNode;
    }
    sys_menu(obj.parentNode.parentNode.parentNode, obj.childNodes[1].innerHTML, y);
}

function sys_menu_out(obj) {
    obj.bgColor = '';
    sys_menu_div.style.display = 'none';
}

//404 影响查看源代码
//if(history.replaceState)
//{
//  var key='404_url_'+location.search,rel=localStorage.getItem(key);
//  if(rel)
//  {
//    localStorage.removeItem(key);
//    history.replaceState(null,null,rel);
//  }
//}

edn.paper = function(a, j, w, f) {
    if (f) {
        var aa = "<iframe name='flex' src='http://cdn.ftz.cn/images/mt/flex.htm?{node:" + a + ",lang:" + lang + ",toolbar:" + j + ",total:" + f + ",time:" + new Date().getTime() + "}' frameborder='0' scrolling='no' width=" + (w || 748) + " height='538' allowFullScreen></iframe>";
        document.write(aa);
        return;
    }

    if (typeof(a) == 'number') a = '/Filess.do?act=paper&community=' + node.community + '&node=' + a + '&language=' + lang;
    mt.embed(a, w || 748, 538);

    var i = a.lastIndexOf('/') + 1,
        _fid = $$(a.substring(i, a.indexOf('.', i)));
    inter = setInterval(function() {
        if (!_fid.setControlVisibility) return;
        _fid.setControlVisibility(j);
        clearInterval(inter);
    }, 100);

    _fid.onmousewheel = function(ev) {
        if (ev) event = ev;
        var p = this.getScrollPosition();
        if (event.wheelDelta) //IE、Chrome
        {
            p.y -= event.wheelDelta / 2;
        } else //Firefox
        {
            event.preventDefault();
            p.y += event.detail * 20;
        }
        this.setScrollPosition(p);
        return false;
    };
    if (!mt.isIE) _fid.addEventListener('DOMMouseScroll', _fid.onmousewheel, false);
};

//关灯
var lights;

function closelights() {
    $$('ckplayer').style.position = 'relative';
    html = document.documentElement, body = document.body;
    lights = document.createElement('DIV');
    lights.style.cssText = "position:absolute;top:0;left:0;background:#000000;width:100%;height:" + Math.max(html.clientHeight, html.scrollHeight) + "px"; //fixed
    body.insertBefore(lights, body.firstChild);
}

function openlights() {
    body.removeChild(lights);
}

////////////
function $(n) {
    return document.getElementById(n);
}

function $$(n) {
    return document.getElementById(n);
}

//弹出注册层

function sAlert(str, pointout, nextstr) {

    var eSrc = (document.all) ? window.event.srcElement : arguments[1];


    var shield = document.createElement("DIV");
    shield.id = "shield";
    shield.style.position = "absolute";
    shield.style.left = "0px";
    shield.style.top = "0px";
    shield.style.width = "100%";
    //shield.style.height = document.body.scrollHeight+"px";
    shield.style.height = "100%"
    shield.style.background = "#333";
    shield.style.textAlign = "center";
    shield.style.zIndex = "10000";
    shield.style.filter = "alpha(opacity=0)";
    shield.style.opacity = 0;
    var alertFram = document.createElement("DIV");
    alertFram.id = "alertFram";
    alertFram.style.position = "absolute";
    alertFram.style.left = "50%";
    alertFram.style.top = "50%";
    alertFram.style.marginLeft = "-225px";
    alertFram.style.marginTop = -75 + document.documentElement.scrollTop + "px";
    alertFram.style.width = "450px";
    alertFram.style.height = "150px";
    alertFram.style.background = "#ccc";
    alertFram.style.textAlign = "center";
    alertFram.style.lineHeight = "150px";
    alertFram.style.zIndex = "10001";

    strHtml = "<ul style=\"list-style:none;margin:0px;padding:0px;width:100%\">\n";
    strHtml += "	<li style=\"background:#80A9D8;text-align:left;padding-left:10px;font-size:14px;font-weight:bold;height:25px;line-height:25px;border:1px solid #90A6BD;\">";
    strHtml += "<span style=width:300px;float:left;display:block;font-size:12px;>" + pointout + "</span>";
    strHtml += "<span style=width:20px;float:right;display:block;font-size:12px;font-weight:normal;padding-top:5px;><a href=# id=do_OK onclick=doOk();><img src='/tea/mt/close.gif'></a></span></li>\n"
    strHtml += "	<li style=\"background:#F1F1F1;text-align:center;font-size:12px;height:120px;line-height:120px;border-left:1px solid #90A6BD;border-right:1px solid #90A6BD;\">" + str + "</li>\n";
    strHtml += "	<li style=\"background:#F1F1F1;text-align:center;font-weight:bold;height:25px;line-height:25px; border:1px solid #90A6BD;\">";
    strHtml += "    " + nextstr + "</li>\n";
    strHtml += "</ul>\n";
    alertFram.innerHTML = strHtml;
    document.body.appendChild(alertFram);
    document.body.appendChild(shield);
    this.setOpacity = function(obj, opacity) {
        if (opacity >= 1) opacity = opacity / 100;
        try {
            obj.style.opacity = opacity;
        } catch (e) {}
        try {
            if (obj.filters.length > 0 && obj.filters("alpha")) {
                obj.filters("alpha").opacity = opacity * 100;
            } else {
                obj.style.filter = "alpha(opacity=\"" + (opacity * 100) + "\")";
            }
        } catch (e) {}
    }
    var c = 0;
    this.doAlpha = function() {
        if (++c > 20) {
            clearInterval(ad);
            return 0;
        }
        setOpacity(shield, c);
    }
    var ad = setInterval("doAlpha()", 1);
    this.doOk = function() { // onclick=\"doOk()\"关闭
        //alertFram.style.display = "none";
        //shield.style.display = "none";
        document.body.removeChild(alertFram);
        document.body.removeChild(shield);
        eSrc.focus();
        document.body.onselectstart = function() {
            return true;
        }
        document.body.oncontextmenu = function() {
            return true;
        }
    }
    document.getElementById("do_OK").focus();
    //eSrc.blur();
    document.body.onselectstart = function() {
        return false;
    }
    document.body.oncontextmenu = function() {
        return false;
    }
}

function Alert(title, msg, w, h) {
    var s = document.getElementsByTagName("select"); //--------------把所有select标签捉住
    for (var j = 0; j < s.length; j++) {
        s[j].style.display = "none";
    } //--------------设为不显示，再进行下面操作
    var titleheight = "20px"; // 提示窗口标题高度
    var bordercolor = "#666699"; // 提示窗口的边框颜色
    var titlecolor = "#FFFFFF"; // 提示窗口的标题颜色
    var titlebgcolor = "#1d5798"; // 提示窗口的标题背景色
    var bgcolor = "#FFFFFF"; // 提示内容的背景色
    var iWidth = document.documentElement.clientWidth;
    var iHeight = document.documentElement.clientHeight;
    var bgObj = document.createElement("div");
    bgObj.style.cssText = "position:absolute;left:0px;top:0px;width:" + iWidth + "px;height:" + Math.max(document.body.clientHeight, iHeight) + "px;filter:Alpha(Opacity=30);opacity:0.3;background-color:#000000;z-index:101;";
    document.body.appendChild(bgObj);
    var msgObj = document.createElement("div");
    msgObj.style.cssText = "position:absolute;font:11px '宋体';top:" + (iHeight - h) / 2 + "px;left:" + (iWidth - w) / 2 + "px;width:" + w + "px;height:" + h + "px;text-align:center;border:1px solid " + bordercolor + ";background-color:" + bgcolor + ";padding:1px;line-height:22px;z-index:102;";
    document.body.appendChild(msgObj);
    var table = document.createElement("table");
    msgObj.appendChild(table);
    table.style.cssText = "margin:0px;border:0px;padding:0px;";
    table.cellSpacing = 0;
    var tr = table.insertRow(-1);
    var titleBar = tr.insertCell(-1);
    titleBar.style.cssText = "width:100%;height:" + titleheight + "px;text-align:left;padding:3px;margin:0px;font:bold 13px '宋体';color:" + titlecolor + ";border:1px solid " + bordercolor + ";cursor:move;background-color:" + titlebgcolor;
    titleBar.style.paddingLeft = "10px";
    titleBar.innerHTML = title;
    var moveX = 0;
    var moveY = 0;
    var moveTop = 0;
    var moveLeft = 0;
    var moveable = false;
    var docMouseMoveEvent = document.onmousemove;
    var docMouseUpEvent = document.onmouseup;
    titleBar.onmousedown = function() {
        var evt = getEvent();
        moveable = true;
        moveX = evt.clientX;
        moveY = evt.clientY;
        moveTop = parseInt(msgObj.style.top);
        moveLeft = parseInt(msgObj.style.left);
        document.onmousemove = function() {
            if (moveable) {
                var evt = getEvent();
                var x = moveLeft + evt.clientX - moveX;
                var y = moveTop + evt.clientY - moveY;
                if (x > 0 && (x + w < iWidth) && y > 0 && (y + h < iHeight)) {
                    msgObj.style.left = x + "px";
                    msgObj.style.top = y + "px";
                }
            }
        };
        document.onmouseup = function() {
            if (moveable) {
                document.onmousemove = docMouseMoveEvent;
                document.onmouseup = docMouseUpEvent;
                moveable = false;
                moveX = 0;
                moveY = 0;
                moveTop = 0;
                moveLeft = 0;
            }
        };
    }
    var closeBtn = tr.insertCell(-1);
    closeBtn.style.cssText = "cursor:pointer; padding:2px;background-color:" + titlebgcolor;
    closeBtn.innerHTML = "<span  style='font-size:9pt; word-break:keep-all;white-space:nowrap; color:" + titlecolor + ";'>关闭</span>";
    closeBtn.onclick = function() {
        for (var j = 0; j < s.length; j++) {
            s[j].style.display = "";
        } //--------------再给select显出来
        document.body.removeChild(bgObj);
        document.body.removeChild(msgObj);
    }
    var msgBox = table.insertRow(-1).insertCell(-1);
    msgBox.style.cssText = "font:10pt '宋体';";
    msgBox.colSpan = 2;
    msgBox.innerHTML = msg;
    // 获得事件Event对象，用于兼容IE和FireFox
    function getEvent() {
        return window.event || arguments.callee.caller.arguments[0];
    }
}





///头个用的JS
//var cm=null;var am=null;var bm=null;
//function getPos(el,sProp){  var iPos = 0 ;  　　while (el!=null)   　　 {    iPos+=el["offset" + sProp];   　　　　el = el.offsetParent;  }   　　return iPos;}
//function show(el,m){  if (m)  {    m.style.display=''; el.className='show'; m.style.left=m.style.pixelLeft = getPos(el,"Left") ;　m.style.top=m.style.pixelTop = 63;  }    　　if ((m!=cm) && (cm))   {    cm.style.display='none';  }  if(m == null){m.style.display='none';} cm=m; }
//function show1(el,m){if (m){m.style.display='';el.className='nsubmenu1';m.style.left=m.style.pixelLeft = 138 ;  m.style.top=m.style.pixelTop = el['offsetTop']-1;}if ((m!=am) && (am)){am.style.display='none';}if(m == null){m.style.display='none';}am=m;}
//function s_color(el){if(el.className == 'dline'){el.className='submenu2';}else{el.className='submenu1';}}
//function l_hid(sp){if(sp.className=='submenu2'){sp.className='dline';}else{sp.className='';}}
//function l_shid(sp){sp.className='';}
//function tt_show(){edn_dcreate.style.display=''; tem.style.display='';Template.className='nsubmenu1';}
//function tt_hid(){tem.style.display='none';Template.className='thcorn';}
//function tem_hid(a,b){Template.className='thcorn'; tem.style.display='none';}
//function s_hid(sp,m){  document.getElementById(sp).className='menu';  m.style.display='none';}
//function showSnap1(event,obj){ var left=139; var top=obj['offsetTop']; obj.style.left=left;  obj.style.top=top;  obj.filters.revealTrans.Transition = Math.random() * 200;  obj.filters.revealTrans.apply();  obj.style.visibility = event.type.indexOf('over')!=-1 ? 'visible' : 'hidden';  obj.filters.revealTrans.play();}
//function sh(sp,sp1){sp.className='menu';sp1.style.display='none';}
//function c_jax(me){ sendx("/jsp/admin/flow/NodeMenu_jax.jsp?id="+me,function(js){ eval(js); });}



//微信分享
if (navigator.userAgent.indexOf("MicroMessenger/") != -1) {
    var ms = document.getElementsByTagName('META');
    for (var i = 0; i < ms.length; i++) {
        ms[ms[i].getAttribute('name')] = ms[i].getAttribute('content');
    }
    var msg = {
        //appid: 'appId',
        img_url: ms["picture"] ? 'http://' + location.host + ms["picture"] : null, //网页中不存在此图,有3秒延时
        img_width: "640",
        img_height: "640", //最小 291x291
        link: location.href,
        desc: ms["description"] || location.href, //最多48个字
        title: document.title
    };
    document.addEventListener('WeixinJSBridgeReady', function() {
        var t = document.body.firstChild;
        if (t.style.display == 'none') t.innerHTML += "<img src=" + msg.img_url + ">";

        //发送给朋友/收藏
        WeixinJSBridge.on('menu:share:appmessage', function(argv) {
            WeixinJSBridge.invoke('sendAppMessage', msg, function(res) {});
        });
        //朋友圈
        WeixinJSBridge.on('menu:share:timeline', function(argv) {
            WeixinJSBridge.invoke('shareTimeline', msg, function(res) {});
        });
        WeixinJSBridge.on('menu:share:weibo', function(argv) {
            WeixinJSBridge.invoke('shareWeibo', msg, function(res) {});
        });
        WeixinJSBridge.on('menu:share:facebook', function(argv) {
            WeixinJSBridge.invoke('shareFB', msg, function(res) {});
        });
        //苹果
        WeixinJSBridge.on("menu:general:share", function(s) {
            s.generalShare(msg, function(e) {});
        });
    }, false);
}

//左侧菜单
if (!window.edn) edn = {};
edn.remind = function(i) {
    var t = top.document.getElementById('MenuFrame');
    if (t) t = t.contentWindow.$$('m' + form1.id.value);
    if (!t) return;
    //t.onclick();//标白底
    t = t.lastChild;
    if (!t.style) {
        console.log('菜单/' + form1.id.value + '：无提醒！');
        return;
    }
    t.innerHTML = '(' + i + ')';
    t.style.display = i > 0 ? '' : 'none';
    //父菜单
    //  var t=mt.fdiv(t);
    //  var p=(t.previousElementSibling||t.previousSibling).lastChild.lastChild;
    //  if(!p||p.tagName!='SPAN')return;
    //  var t=t.getElementsByTagName('SPAN'),j=0;
    //  for(var i=0;i<t.length;i++)
    //  {
    //    if(t[i].className.indexOf('remind')==-1)continue;
    //    var v=t[i].innerHTML;
    //    j+=parseInt(v.substring(1,v.length-1));
    //  }
    //  p.innerHTML='('+j+')';
    //  p.style.display=j>0?'':'none';
};

/*HTML5视频*/
if (navigator.userAgent.indexOf("Mobile") != -1) {
    window.addEventListener('load', function() {
        //视频转HTML5
        var arr = document.getElementsByTagName("EMBED");
        for (var i = 0; i < arr.length; i++) {
            var fv = arr[i].getAttribute('flashvars'),
                src = arr[i].getAttribute('src');
            if (fv && (src == '/tea/image/flv/ckplayer.swf' || src == '/tea/image/flv/audio.swf')) {
                var par = [],
                    p = /&([^=]+)=([^&]*)/g;
                while (bb = p.exec('&' + fv + '&')) par[bb[1]] = decodeURIComponent(bb[2]);

                var v = document.createElement('DIV');
                v.innerHTML = "<" + (src.indexOf('audio') > 0 ? 'audio' : 'video') + " controls width='" + arr[i].width + "' height='" + arr[i].height + "' src='" + decodeURIComponent(par['f'] || par['soundFile']) + "' poster='" + par['i'] + "'" + (par['p'] == '1' || par['autostart'] == 'yes' ? " autoplay" : "") + (par['e'] == '1' || par['loop'] == 'yes' ? " loop" : "") + (par['m'] == '1' ? "" : " preload") + " />";
                arr[i].parentNode.replaceChild(v.firstChild, arr[i--]);
            }
        }
    }, false);
}