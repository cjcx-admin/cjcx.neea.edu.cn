//该文件为cms上的js文件内容。
//需调整，每一个考试项目（CET共10个考试项目）一个js文件，有个js文件和考试项目编号对应关系表{'考试项目编号-CET/NCRE/PETS':'js文件-15011111L1.js'}
var rule_list = {
    "CET4": {
        "exam": "考试时间",
        "xx": "学校",
        "score": "笔试总分",
        "ky": "口试等级"
    },
    "CET6": {
        "exam": "考试时间",
        "xx": "学校",
        "score": "笔试总分",
        "ky": "口试等级"
    },
    "CJT4": {
        "exam": "考试时间",
        "xx": "学校",
        "cj": "成绩"
    },
    "CJT6": {
        "exam": "考试时间",
        "xx": "学校",
        "cj": "成绩"
    },
    "CRT4": {
        "exam": "考试时间",
        "xx": "学校",
        "cj": "成绩"
    },
    "CRT6": {
        "exam": "考试时间",
        "xx": "学校",
        "cj": "成绩"
    },
    "PHS4": {
        "exam": "考试时间",
        "xx": "学校",
        "cj": "成绩"
    },
    "PHS6": {
        "exam": "考试时间",
        "xx": "学校",
        "cj": "成绩"
    },
    "TFU4": {
        "exam": "考试时间",
        "xx": "学校",
        "cj": "成绩"
    },
    "CET-SET": {
        "exam": "考试时间",
        "xx": "学校",
        "ky": "口试等级"
    },
    "PETS": {
        "exam": "考试时间",
        "bkjb": "考试级别",
        "zkzh": "准考证号",
        "score": "笔试成绩",
        "ky": "口试成绩"
    },
    "PETS_ZS": {
        "exam": "考试时间",
        "bkjb": "考试级别",
        "zsbh": "证书编号"
    },
    "WSK": {
        "exam": "考试时间",
        "bkjb": "考试语种",
        "zkzh": "准考证号",
        "score": "笔试总分",
        "tl": "听力部分",
        "ky": "口试总分"
    },
    "WSK_ZS": {
        "exam": "考试时间",
        "bkjb": "考试语种",
        "zsbh": "证书编号"
    },
    "CCPT": {
        "exam": "考试时间",
        "kdmc": "考点",
        "kmmc": "科目级别",
        "zkzh": "准考证号",
        "dd": "等第"
    },
    "CCPT_ZS": {
        "exam": "考试时间",
        "kdmc": "考点",
        "kmmc": "科目级别",
        "qzj": "起止级",
        "zsbh": "证书编号",
        "fzsj": "发证时间"
    },
    "MHK": {
        "exam": "考试时间",
        "sfname": "报考省份",
        "dj": "级别",
        "zkzh": "准考证号",
        "zh": "总分",
    },
    "NTCE_MS": {
        "km": "科目",
        "exam": "考试批次",
        "hg": "合格与否",
        "zkzh": "准考证号",
        "sf": "考试省份",
        "yqyx": "受到疫情影响"
    },
    "NTCE_BS": {
        "km": "科目",
        "bgf": "报告分",
        "exam": "考试批次",
        "hg": "合格与否",
        "zkzh": "准考证号",
        "yxq": "有效期限",
        "sf": "考试省份",
        "yqyx": "受到疫情影响"
    },
    "NTCE": {
        "exam": "面试时间",
        "kssf": "考试省份",
        "kslb": "考试类别",
        "zgzh": "证明编号",
        "yxq": "有效期"
    },
    "NCRE": {
        "exam": "考试时间",
        "bkjb": "考试科目",
        "zkzh": "准考证号",
        "cjdd": "成绩等第"
    },
    "NCRE_ZS": {
        "exam": "考试时间",
        "bkjb": "考试科目",
        "zsbh": "证书编号",
        "cjdd": "成绩"
    },
    "MHK_ZS": {
        "exam": "考试时间",
        "dj": "级别",
        "zsbh": "证书编号"
    },
    "NIT_ADVANCED": {
        "mkmc": "考试科目",
        "exam": "考试时间",
        "zsbh": "证书编号"
    },
    "NIT_SINGLE": {
        "mkmc": "考试科目",
        "exam": "考试时间",
        "zsbh": "证书编号"
    },
    "TDXL": {
        "exam": "考试时间",
        "km": "考试科目",
        "zkzh": "准考证号",
        "sqxwsydwmc": "申请学位授予单位",
        "score": "总分",
        "hg": "合格与否",
        "hgbh": "合格编号"
    },
    "CBT": {
        "kmname": "考试科目",
        "ksny": "考试时间",
        "xx": "学校",
        "score": "总分"
    }
};

var subject_rule_list = {

    "CET": {
        "myselfUrl": "//cjcx.neea.edu.cn/html1/folder/21033/653-1.htm",
        "otherUrl": "//cjcx.neea.edu.cn/html1/folder/21033/658-1.htm",
        "mySelectTime": "仅限2005年6月及以后考试。",
        "otherSelectTime": "仅限2005年6月及以后考试。",
        "title": "全国大学英语四、六级考试（含口试）"
    },
    "NTCE": {
        "myselfUrl": "",
        "otherUrl": "",
        "mySelectTime": "仅限2005年6月及以后考试。",
        "otherSelectTime": "仅限2005年6月及以后考试。",
        "title": "中小学教师资格考试 (NTCE) "
    },
    "NTCE_RESULTS": {
        "myselfUrl": "",
        "otherUrl": "",
        "mySelectTime": "仅限2005年6月及以后考试。",
        "otherSelectTime": "仅限2005年6月及以后考试。",
        "title": "中小学教师资格考试 (NTCE) ",
        "email": "ntce@mail.neea.edu.cn",
        "phone": "010-82345677"
    },
    "MHK": {
        "myselfUrl": "",
        "otherUrl": "",
        "mySelectTime": "仅限2005年6月及以后考试。",
        "otherSelectTime": "仅限2005年6月及以后考试。",
        "title": "中国少数民族汉语水平等级考试 (MHK) "
    },
    "CCPT": {
        "myselfUrl": "",
        "otherUrl": "",
        "mySelectTime": "仅限2005年6月及以后考试。",
        "otherSelectTime": "仅限2005年6月及以后考试。",
        "title": "书画等级考试 (CCPT) "
    }


}

//数据字典
var DICT_SFNAME = {
    "01": "全国",
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    31: "上海",
    23: "黑龙江",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    52: "云南",
    53: "贵州",
    55: "重庆",
    64: "新疆",
    65: "宁夏",
    81: "总参",
    82: "北京军区",
    83: "兰州军区",
    84: "部队院校局"
};
//MHK数据字典
var DICT_SFNAME_MHK = {
    "01": "全国",
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    31: "上海",
    23: "黑龙江",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    81: "总参",
    82: "北京军区",
    83: "兰州军区"
};
var DICT_BKJB = {
    CCPT: {
        1: "书画等级考试"
    },
    //NCRE:{10,10一级(DOS)(1994-2002上),;11,11一级B(DOS)(1996上-2002上);12,12一级(1999上-2005上);13,13一级B(2000上-2013上);14,14一级计算机基础及WPS Office应用(原WPS Office)(2004上至今);15,15一级计算机基础及MS Office应用(原MS Office)(2004下至今);16,16一级计算机基础及Photoshop应用(2013下至今);17,17一级网络安全素质教育(201909至今);20,20二级(1994);21,21二级QBASIC(1995-2005上);22,22二级FORTRAN(1995-2003下);23,23二级PASCAL(1995-2002上);24,24二级C语言程序设计(原二级C)(1995至今);25,25二级FOXBASE+(1995-2005上);26,26二级VB语言程序设计(原VISUAL BASIC)(2002上至今);27,27二级VFP数据库程序设计(原VISUAL FOXPRO)(2002上至今);28,28二级JAVA语言程序设计(原二级JAVA)(2004下至今);29,29二级ACCESS数据库程序设计(原二级ACCESS)(2004下至今);61,61二级C++语言程序设计(原二级C++)(2004下至今);62,62二级Delphi(2008上-2013上);63,63二级MySQL数据库程序设计(2013下至今);64,64二级Web程序设计(2013下至今);65,65二级MS Office高级应用(2013下至今);66,66二级Python语言程序设计;30,30三级(1994);31,31三级A(1995-2002上);32,32三级B(1995-2002上);33,33三级PC技术(2002下-2013下);34,34三级信息管理技术(2002下-2013下);35,35三级网络技术(2002下至今);36,36三级数据库技术(2002下至今);37,37三级软件测试技术(2013下至今);38,38三级信息安全技术(2013下至今);39,39三级嵌入式系统开发技术(2013下至今);40,40四级(1995-2008下);41,41四级网络工程师(2008上至今);42,42四级数据库工程师(2008上至今);43,43四级软件测试工程师(2008上至今);44,44四级信息安全工程师(2013下至今);45,45四级嵌入式系统开发工程师(2013下至今)}
    NTCE: {
        1: "教师资格考试合格证明"
    },
    PETS: {
        1: "一级B",
        2: "一级",
        3: "二级",
        4: "三级",
        5: "四级"
    },
    MHK: {
        1: "口语笔试(新疆)",
        2: "笔试",
        3: "口语"
    },
    NCRE: {
        10: "10一级(DOS)(1994-2002上)",
        11: "11一级B(DOS)(1996上-2002上)",
        12: "12一级(1999上-2005上)",
        13: "13一级B(2000上-2013上)",
        14: "14一级计算机基础及WPS Office应用(原WPS Office)(2004上至今)",
        15: "15一级计算机基础及MS Office应用(原MS Office)(2004下至今)",
        16: "16一级计算机基础及Photoshop应用(2013下至今)",
        17: "17一级网络安全素质教育(201909至今)",
        20: "20二级(1994)",
        21: "21二级QBASIC(1995-2005上)",
        22: "22二级FORTRAN(1995-2003下)",
        23: "23二级PASCAL(1995-2002上)",
        24: "24二级C语言程序设计(原二级C)(1995至今)",
        25: "25二级FOXBASE+(1995-2005上)",
        26: "26二级VB语言程序设计(原VISUAL BASIC)(2002上至今)",
        27: "27二级VFP数据库程序设计(原VISUAL FOXPRO)(2002上至今)",
        28: "28二级JAVA语言程序设计(原二级JAVA)(2004下至今)",
        29: "29二级ACCESS数据库程序设计(原二级ACCESS)(2004下至今)",
        61: "61二级C++语言程序设计(原二级C++)(2004下至今)",
        62: "62二级Delphi(2008上-2013上)",
        63: "63二级MySQL数据库程序设计(2013下至今)",
        64: "64二级Web程序设计(2013下至今)",
        65: "65二级MS Office高级应用(2013下至今)",
        66: "66二级Python语言程序设计",
        30: "30三级(1994)",
        31: "31三级A(1995-2002上)",
        32: "32三级B(1995-2002上)",
        33: "33三级PC技术(2002下-2013下)",
        34: "34三级信息管理技术(2002下-2013下)",
        35: "35三级网络技术(2002下至今)",
        36: "36三级数据库技术(2002下至今)",
        37: "37三级软件测试技术(2013下至今)",
        38: "38三级信息安全技术(2013下至今)",
        39: "39三级嵌入式系统开发技术(2013下至今)",
        40: "40四级(1995-2008下)",
        41: "41四级网络工程师(2008上至今)",
        42: "42四级数据库工程师(2008上至今)",
        43: "43四级软件测试工程师(2008上至今)",
        44: "44四级信息安全工程师(2013下至今)",
        45: "45四级嵌入式系统开发工程师(2013下至今)"
    },
    WSK: {
        "法语": "法语",
        "德语": "德语",
        "日语": "日语",
        "俄语": "俄语",
        "英语": "英语"
    }
};
var DICT_CJDD = {
    NCRE: {
        0: "不及格",
        1: "及格",
        2: "良好",
        3: "优秀"
    }
};