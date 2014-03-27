/*
  中文站合作 频道页广告 - 加载iframe具体广告
*/
//$(function () {
//    // 广告信息配置
//    // 配置单项信息： ["@广告ID","@当前uri正则匹配","@广告模板地址","@iframe宽度","@iframe高度","@嵌入页面元素位置，可选值 after before 或 为空","@嵌入页面位置相对元素标识，用 class名/.advert 或 id名/#adver 来标识"]
//    var configs = [
//        ["witmart.html", /task.zhubajie.com\/witmart.html/, "http://intstyle.zhubajie.com/template/20130819/advert/ad-guzhu.html", "200", "375", "", ".right-task-list-pub"],
//        ["logochannel", /c-logovi\/logo|c-logovi\/vi|c-logovi\/ziti|c-logovi\/tubiao|t-logovi|p-logovi/, "http://intstyle.zhubajie.com/template/20130819/advert/ad-logo.html", "200", "400", "before", ".list-reason,.list-recommend"],
//        ["c-lovovi", /c-logovi\//, "http://intstyle.zhubajie.com/template/20130819/advert/ad-logo.html", "200", "400", "after", ".list-reason,.list-recommend"],
//        ["guzhu", /www.zhubajie.com\/c-*/, "http://intstyle.zhubajie.com/template/20130819/advert/ad-guzhu.html", "200", "375", "after", ".list-reason,.list-recommend"],
//        ["home", /home.zhubajie.com/, "http://intstyle.zhubajie.com/template/20130819/advert/ad-fuwushang.html", "200", "375", "before", ".list-recommend"],
//        ["task", /task.zhubajie.com/, "http://intstyle.zhubajie.com/template/20130819/advert/ad-guzhu.html", "200", "375", "before", ".list-recommend"]
//    ];
//    var conf = (function (url) {
//        for (var i = 0; i < configs.length; i++) {
//            var _c = configs[i];
//            if (_c[1].test(url)) {
//                return _c;
//            }
//        }
//    })(location.href);

//    if (conf) {
//        $(conf[6])[conf[5] ? conf[5] : "html"]("<div class='list-a-d'><iframe src=" + conf[2] + " frameborder='0' scrolling='no' align='center' width='" + conf[3] + "' height='" + conf[4] + "'></iframe></div>");
//    }
//})



/*
 中文站合作广告 2014-01-08 - 修改页面元素
*/
$(function () {
    // 正则数组
    var regc = [
        ["logo", /www.zhubajie.com\/c-logovi\/logo\//],
        ["logo", /www.zhubajie.com\/special\/pub\?rev=logo2013v2/],
        ["logo", /zt.zhubajie.com\/ztold\/logovi-copyright\/index.html/],
        ["logo", /zt.zhubajie.com\/ztold\/logovi-saving\/index.html/],
        ["logo", /gl.zhubajie.com\/main\/index-do-list-id-2000024\?header=logo/],
        ["task-logo", /task.zhubajie.com\/t-logovi\/|www.zhubajie.com\/c-logovi\//],
        ["webdesign", /www.zhubajie.com\/c-wzkf/]
    ];
    var regi = (function (url) {
        for (var i = 0; i < regc.length; i++) {
            var _c = regc[i];
            if (_c[1].test(url)) {
                return _c;
            }
        }
    })(location.href);

    if (regi) {
        switch (regi[0]) {
            // 中文站logo频道页导航元素添加
            case "logo":
                {
                    $(".mark-menu ul").append("<li>国际服务：<a href=\"http://int.zhubajie.com/logo-design/zbj-channel?utm_source=ZBJ_ChanPinZhengHe&utm_medium=LogoPinDao_Nav&utm_campaign=ZBJ\" style='color:red;'>国际Logo设计</a> <a href=\"http://int.zhubajie.com/logo-design/zbj-logostore?utm_source=ZBJ_ChanPinZhengHe&utm_medium=LogoPinDao_SubNav&utm_campaign=ZBJ\">Logo商店</a></li>");
                }
                break;
                // 中文站网建频道页导航元素添加
            case "webdesign":
                {
                    $(".dev-scr1-l-bd").append("<li><a href=\"http://int.zhubajie.com/web-design/zbj-channel?utm_source=ZBJ_ChanPinZhengHe&utm_medium=WebPinDao_Nav&utm_campaign=ZBJ\" style='color:red;'>海外网站建设</a></li>");
                }
                break;
                // 中文站Logo需求频道增加国际站logo需求列表
            case "task-logo":
                {
                    $(".filter-category dd:eq(0)").append("<a title=\"国际Logo设计\" href=\"http://int.zhubajie.com/logo-design/jobs/?utm_source=ZBJ_ChanPinZhengHe&utm_medium=LogoTask_Nav&utm_campaign=ZBJ\" target='_blank' style='color:red;'>国际Logo设计</a>");
                }
                break;
        }
    }
})



/*
  中文站合作 witmart广告 - 从后台api读取
*/

$(function () {
    // 从witmart api 获取广告内容
    if (window["witmartadvert"])
        return false;
    window["witmartadvert"] = true;

    var proto = location.protocol == "https:" ? "https://secure.witmart.com/user/sign/" : "http://www.witmart.com/api/";
    var api = proto + "greaterchinaverify?ref=" + escape(location.href) + "&type=2&jsoncallback=?";
    $.getJSON(api, function (json) {
        if (json && json.state == 1) {
            if (json.advertData['content'] != '') {
                if (json.advertData['elementType'] == 'class') {
                    var adObj = $("." + json.advertData['elementName'] + "");
                } else {
                    var adObj = $("#" + json.advertData['elementName'] + "");
                }
                var adLocate = json.advertData['locate'];
                if (adLocate == 'before' || adLocate == 'after' || adLocate == "html") {
                    adObj[adLocate](json.advertData['content']);
                    $("#" + json.advertData['adElementID'] + "").slideDown();
                    adEvents();
                }
            } else if (json.advertData['openUrl'] != '') {
                location.href = json.advertData['openUrl'];
            }
        }
    });

    function adEvents() {
        var currentUrl = window.location.href;
        var currentUrlAry = currentUrl.split('/');
        var lenCurrent = currentUrlAry.length;
        var currentKey;
        if (currentUrlAry[lenCurrent - 1] == '') {
            currentKey = currentUrlAry[lenCurrent - 2];
        } else {
            currentKey = currentUrlAry[lenCurrent - 1];
        }
        $('a.enurl').each(function (index) {
            var goUrl = $(this).attr("href");
            $(this).attr("href", goUrl.replace('iPhone', currentKey));
        });
        var servicelist = $("#j-servicelist");
        var items = servicelist.find("a.item");
        var dlbox = servicelist.find("dl");
        items.mouseover(function () {
            var t = $(this);
            if (t.get(0).timer) {
                clearTimeout(t.get(0).timer);
            }
            var idx = items.index(t);
            dlbox.eq(idx).show().animate({ opacity: 1, top: -168 });
        }).mouseout(function () {
            var t = $(this);
            var idx = items.index(t);
            t.get(0).timer = setTimeout(function () {
                dlbox.eq(idx).animate({ opacity: 0, top: -120 }).hide();
            }, 200);
        });

        dlbox.mouseover(function () {
            var t = $(this);
            var idx = dlbox.index(t);
            var timer = items.eq(idx).get(0).timer;
            if (timer) {
                clearTimeout(timer);
            }
        }).mouseout(function () {
            var t = $(this);
            var idx = dlbox.index(t);
            items.eq(idx).get(0).timer = setTimeout(function () {
                t.animate({ opacity: 0, top: -120 }).hide();
            }, 200);
        });
    }
})

