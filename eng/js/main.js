$(document).ready(function () {
    $(document).on("click", ".selectLang", function () {
        var thisid = $(this).prop('id');
        var thisid_array = thisid.split("_");
        var lang = thisid_array[1];

        $.cookie('system_language', lang, { expires: 30 });
        $.i18n().locale = lang;
        //$('body').i18n();
        window.location.reload();
    });
});

//抓網址參數
$.UrlParam = function (name) {
    //宣告正規表達式
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    /*
        * window.location.search 獲取URL ?之後的參數(包含問號)
        * substr(1) 獲取第一個字以後的字串(就是去除掉?號)
        * match(reg) 用正規表達式檢查是否符合要查詢的參數
    */
    var r = decodeURI(window.location.search).substring(1).match(reg);
    //如果取出的參數存在則取出參數的值否則回穿null
    if (r != null) return decodeURIComponent(r[2]); return "";
}

//過濾Html標籤
function removeHTMLTag(str) {
    str = str.replace(/]*>/g,''); //去除HTML tag
    str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
    str=str.replace(/ /ig,'');//去掉
    return str;
}

//前台產生分頁專用
function re_page_list(now_page, total_pages, url, key, star_style, over_style)
{
    var page_link = '';
    //數字區域
    if (now_page - 2 >= 1 && now_page + 2 <= total_pages) {
        for (var i = -2; i <= 2; i++) {
            if (i == 0) {
                page_link += "<a href='javascript:void(0);' class='eleSelPageCount mlr-5 eleSelPageCount--pageIn' title='go to " + (now_page + i) + " pages'>" + (now_page + i) + "</a>";
            } else {
                page_link += "<a href='" + url + "page=" + (now_page + i) + key + "' class='eleSelPageCount mlr-5' title='go to " + (now_page + i) + "pages '>" + (now_page + i) + "</a>";
            }
        }
    } else {
        if (total_pages <= 5) {perPage = total_pages;} else { perPage = 5;}
        if (now_page <= 4) {
            for (var i = 1; i <= perPage; i++) {
                if (i == now_page) {
                    page_link += "<a href='javascript:void(0);' class='eleSelPageCount mlr-5 eleSelPageCount--pageIn' title='go to " + i + " pages'>" + i + "</a>";
                } else {
                    page_link += "<a href='" + url + "page="+ i + key + "' class='eleSelPageCount mlr-5' title='go to " + i + " pages'>" + i + "</a>";
                }
            }
        } else {
            for (var i = total_pages - 4; i <= total_pages; i++) {
                if (i == now_page) {
                    page_link += "<a href='javascript:void(0);' class='eleSelPageCount mlr-5 eleSelPageCount--pageIn' title='go to " + i + " pages'>" + i + "</a>";
                } else {
                    page_link += "<a href='" + url + "page=" + i + key + "' class='eleSelPageCount mlr-5' title='go to " + i + " pages'>" + i + "</a>";
                }
            }
        }
    }

    return page_link;
}

//載入系統設定
function LoadSysConfig(sysconfig) {
    //載入系統名稱
    $(document).prop("title", sysconfig[19].setvalue);
    $("#facebook_link").prop("href", sysconfig[17].setvalue); //facebook連結
    $("#petition_link").prop("href", sysconfig[18].setvalue); //我要陳情連結
}

//載入全域導覽資料
function ShowNavigation(sysconfig, navigation) {
    $.getScript("js/web-js.js");

    var aboutus_option = navigation.aboutus_option;
    var affairs_option = navigation.affairs_option;
    var news_class = navigation.news_class;
    var news_class_option = navigation.news_class_option;

    let NavContent = `
        <a class="patSkip_main" href="#acckeyC" accesskey="C" title="Central Content Area" tabindex="1" id="patSkip_main">Jump to Main Content Area</a>
        <a class="patSkip_acc" href="acc.html" title="Go to Website Navigaion Area" tabindex="1" id="patSkip_acc">Go to Website Navigaion Area</a>


        <!-- 開合選單按鈕區 -->
        <header class="patheaderBk js-patheader">
            <a href="index.html" class="patLogo js-headerLogo" title="go to` + sysconfig[19].setvalue + ` index" >
                <img src="images/logo.svg" alt="Miaoli County Environmental Protection Department LOGO"  class="patLogo-img">
            </a>
            <a href="../" class="patEngBt" target="_blank" title="另開新視窗">
                <img src="images/icon-translate--white.svg" class="patEngBt-icon" alt="">
                <span class="patEngBt-text">
                    中文網站
                </span>
            </a>
            <button class="patSearchBt js-navSearchBt" type="button" aria-expanded="false" onclick="openDialog('dialog2', this)">
                <img src="images/icon-serach--white.svg" class="patSearchBt-icon" alt="Open website search function">
                <span class="patSearchBt-text">
                    SEARCH
                </span>
            </button>
            <button class="patheaderBt js-navOpenBt" type="button" aria-expanded="false" onclick="openDialog('dialog1', this)">
                <img src="images/icon-hamburger--white.svg" class="patheaderBt-icon" alt="Open website link menu">
            </button>
        </header>

        <!-- 開合選單區 -->
        <div class="hidden" role="dialog" id="dialog1" aria-labelledby="dialog1_label" aria-modal="true" aria-describedby="dialog1_desc">
            <div class="patnav js-patnavContent">
                <div class="patnav-head">
                    <a href="index.html" title="go to` + sysconfig[19].setvalue + ` index" class="js-navOpenfocus js-tabnone" tabindex="-1">
                        <img src="images/footer-logo.svg" alt="` + sysconfig[19].setvalue + `LOGO" class="patnav-head--logoImg">
                    </a>
                </div>

                <div class="patnavDecBk">
                    <img src="images/nav-dec01.png" class="patnavDecBk--dec01" alt="">
                    <img src="images/nav-dec02.png" class="patnavDecBk--dec02" alt="">
                </div>

                <ol class="patnavSectionBk">
                    <li class="patnavSection">
                        <span class="patnavFirstArea-tit">
                            About us
                        </span>
                        <ul class="patnavSecondArea">
                        `;
                        var aboutus_id = $.UrlParam("aboutus_id");
                        $.each(aboutus_option, function (key, values) {
                            var aboutus_ss = (aboutus_id == values[0]) ? "patnavSecondArea-link--active" : "";

                            NavContent += `
                            <li class="patnavSecondArea-li"><a href="about.html?aboutus_id=` + values[0] + `" class="patnavSecondArea-link js-tabnone ` + aboutus_ss + `" title="` + values[1] + `" tabindex="-1">` + values[1] + `</a></li>
                            `;
                        });
                        NavContent += `
                        </ul>
                    </li>
                    <li class="patnavSection">
                        <span class="patnavFirstArea-tit">
                            Environmental Protection
                        </span>
                        <ul class="patnavSecondArea">
                        `;
                        var affairs_id = $.UrlParam("affairs_id");
                        $.each(affairs_option, function (key, values) {
                            var affairs_ss = (affairs_id == values[0]) ? "patnavSecondArea-link--active" : "";

                            NavContent += `
                            <li class="patnavSecondArea-li"><a href="business.html?affairs_id=` + values[0] + `" class="patnavSecondArea-link js-tabnone ` + affairs_ss + `" title="` + values[1] + `" tabindex="-1">` + values[1] + `</a></li>
                            `;
                        });
                        NavContent += `
                        </ul>
                    </li>
                    <li class="patnavSection">
                        <span class="patnavFirstArea-tit">
                            Latest news
                        </span>
                        <ul class="patnavSecondArea">
                        `;
                        var _nClass = $.UrlParam("_nClass");
                        $.each(news_class_option, function (key, values) {
                            var class_ss = (_nClass == values[0]) ? "patnavSecondArea-link--active" : "";

                            NavContent += `
                            <li class="patnavSecondArea-li"><a href="newsli.html?_nClass=` + values[0] + `" class="patnavSecondArea-link js-tabnone ` + class_ss + `" title="` + values[1] + `" tabindex="-1">` + values[1] + `</a></li>
                            `;
                        });
                        NavContent += `
                        </ul>
                    </li>
                    `

                    var contact_ss = (location.pathname == "/contact.html") ? "patnavSecondArea-link--active" : "";
                    var howtogo_ss = (location.pathname == "/howtogo.html") ? "patnavSecondArea-link--active" : "";
                    var acc_ss = (location.pathname == "/acc.html") ? "patnavSecondArea-link--active" : "";

                    NavContent += `
                    <li class="patnavSection">
                        <span class="patnavFirstArea-tit">
                            Agency information
                        </span>
                        <section class="patnavSecondArea">
                            <!-- <li class="patnavSecondArea-li"><a href="contact.html" class="patnavSecondArea-link js-tabnone ` + contact_ss + `" title="contact us" tabindex="-1">contact us</a></li>
                            <li class="patnavSecondArea-li"><a href="howtogo.html" class="patnavSecondArea-link js-tabnone ` + howtogo_ss + `" title="traffic information" tabindex="-1">traffic information</a></li>
                            <li class="patnavSecondArea-li"><a href="acc.html" class="patnavSecondArea-link js-tabnone ` + acc_ss + `" title="Sitemap"  tabindex="-1">Sitemap</a></li> -->
                            <li class="patnavSecondArea-li"><a href="../" class="patnavSecondArea-link js-tabnone" title="中文版網站" tabindex="-1">中文版網站</a></li>
                        </section>
                    </li>
                </ol>

                <!-- 關閉按鈕，放在最後讓無障礙使用者關閉 -->
                <button class="patnav-navCloseBt js-navCloseBt js-tabnone" type="button" onclick="closeDialog(this)" tabindex="-1">
                    <img src="images/icon-close--white.svg" alt="Close website link menu" class="patnav-navCloseBt--icon">
                </button>

            </div>
        </div>

        <!-- 搜尋區 -->
        <div class="patSearchBk js-patSearchBk hidden" role="dialog" id="dialog2" aria-labelledby="dialog2_label" aria-modal="true" aria-describedby="dialog2_desc">
            <div class="patSearch js-patSearchContent">
                <div class="patSearchArea">
                    <p class="patSearchArea-tit pb-30">
                        Internal search
                    </p>
                    <div class="patSearchArea-inputArea">
                        <!-- <script async src="https://cse.google.com/cse.js?cx=79eed71cc65107763"></script>
                        <div class="gcse-searchbox-only"></div> -->
                        <!-- <input type="text" name="" id="" class="patSearchArea-input js-searchBt js-tabnone" placeholder="input search keyword"  tabindex="-1">
                        <a href="javascript:void(0);" class="patSearchArea-input--iconBt js-tabnone" aria-pressed="false" tabindex="-1">
                            <img src="images/icon-serach--gold.svg" alt="submit">
                        </a> -->
                    </div>

                </div>
                <!-- 關閉按鈕，放在最後讓無障礙使用者關閉 -->
                <button type="button" class="patnav-navCloseBt js-searchCloseBt js-tabnone" onclick="closeDialog(this)" tabindex="-1">
                    <img src="images/icon-close--white.svg" class="patnav-navCloseBt--icon" alt="close search area">
                </button>
            </div>
           
        </div>

        <!-- 大視口快速連結header區 -->
        <div class="patBigNav" aria-hidden="true">
            <section class="patBigNavSection js-navFirstLink--com" aria-hidden="true">
                About us
                <ul class="patBigNavSection-ListArea js-navSecondLink">
                `;
                $.each(aboutus_option, function (key, values) {

                    NavContent += `
                    <a href="about.html?aboutus_id=` + values[0] + `" class="patBigNavSection-ListArea--link" title="` + values[1] + `" tabindex="-1" >
                        ` + values[1] + `
                    </a>
                    `;
                });
                NavContent += `
                </ul>
            </section>
            <section class="patBigNavSection js-navFirstLink--com" aria-hidden="true">
                Environmental business
                <ul class="patBigNavSection-ListArea js-navSecondLink">
                `;
                $.each(affairs_option, function (key, values) {

                    NavContent += `
                    <a href="business.html?affairs_id=` + values[0] + `" class="patBigNavSection-ListArea--link" title="` + values[1] + `" tabindex="-1" >
                        ` + values[1] + `
                    </a>
                    `;
                });
                NavContent += `
                </ul>
            </section>
            <section class="patBigNavSection js-navFirstLink--com" aria-hidden="true">
                Latest news
                <ul class="patBigNavSection-ListArea js-navSecondLink">
                `;
                $.each(news_class_option, function (key, values) {

                    NavContent += `
                    <a href="newsli.html?_nClass=` + values[0] + `" class="patBigNavSection-ListArea--link" title="` + values[1] + `" tabindex="-1" >
                        ` + values[1] + `
                    </a>
                    `;
                });
                NavContent += `
                </ul>
            </section>
        </div>
    `

    $(".jsNavMain").html(NavContent);

    $('body').i18n();
}
