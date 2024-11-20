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
                page_link += "<a href='javascript:void(0);' class='eleSelPageCount mlr-5 eleSelPageCount--pageIn' title='第" + (now_page + i) + "頁'>" + (now_page + i) + "</a>";
            } else {
                page_link += "<a href='" + url + "page=" + (now_page + i) + key + "' class='eleSelPageCount mlr-5' title='第" + (now_page + i) + "頁'>" + (now_page + i) + "</a>";
            }
        }
    } else {
        if (total_pages <= 5) {perPage = total_pages;} else { perPage = 5;}
        if (now_page <= 4) {
            for (var i = 1; i <= perPage; i++) {
                if (i == now_page) {
                    page_link += "<a href='javascript:void(0);' class='eleSelPageCount mlr-5 eleSelPageCount--pageIn' title='第" + i + "頁'>" + i + "</a>";
                } else {
                    page_link += "<a href='" + url + "page="+ i + key + "' class='eleSelPageCount mlr-5' title='第" + i + "頁'>" + i + "</a>";
                }
            }
        } else {
            for (var i = total_pages - 4; i <= total_pages; i++) {
                if (i == now_page) {
                    page_link += "<a href='javascript:void(0);' class='eleSelPageCount mlr-5 eleSelPageCount--pageIn' title='第" + i + "頁'>" + i + "</a>";
                } else {
                    page_link += "<a href='" + url + "page=" + i + key + "' class='eleSelPageCount mlr-5' title='第" + i + "頁'>" + i + "</a>";
                }
            }
        }
    }

    return page_link;
}

//載入系統設定
function LoadSysConfig(sysconfig) {
    //載入系統名稱
    $(document).prop("title", sysconfig[1].setvalue);
    $("#facebook_link").prop("href", sysconfig[17].setvalue); //facebook連結
    $("#petition_link").prop("href", sysconfig[18].setvalue); //我要陳情連結
}

//載入全域導覽資料
function ShowNavigation(sysconfig, navigation) {
    $.getScript("js/web-js.js");
    $.getScript("js/dialog-js.js");

    var aboutus_option = navigation.aboutus_option;
    var affairs_option = navigation.affairs_option;
    var news_class = navigation.news_class;
    var news_class_option = navigation.news_class_option;
    var downloadfile_class = navigation.downloadfile_class;
    var downloadfile_class_option = navigation.downloadfile_class_option;
    var qa_class = navigation.qa_class;
    var qa_class_option = navigation.qa_class_option;
    var disseminate_class = navigation.disseminate_class;
    var disseminate_class_option = navigation.disseminate_class_option;
    var openinfo_class = navigation.openinfo_class;
    var openinfo_class_option = navigation.openinfo_class_option;
    var links_class = navigation.links_class;
    var links_class_option = navigation.links_class_option;

    let NavContent = `
        <a class="patSkip_main" href="#acckeyC" accesskey="C" title="中央內容區塊" tabindex="1" id="patSkip_main">跳到主要內容區</a>
        <a class="patSkip_acc" href="acc.html" title="到網站導覽區" tabindex="1" id="patSkip_acc">到網站導覽區</a>
        

        <!-- 開合選單按鈕區 -->
        <header class="patheaderBk js-patheader">
            <a href="index.html" class="patLogo js-headerLogo" title="回` + sysconfig[1].setvalue + `首頁" >
                <img src="images/logo.svg" alt="苗栗縣政府環境保護局全球資訊網LOGO"  class="patLogo-img">
            </a>
            <a href="eng/" class="patEngBt" title="打開英文版網站">
                <img src="images/icon-translate--white.svg" alt="" class="patEngBt-icon">
                <span class="patEngBt-text">
                    英文
                    <br />
                    網站
                </span>
            </a>

            <button class="patSearchBt js-navSearchBt" type="button" aria-expanded="false" onclick="openDialog('dialog2', this)">
                <img src="images/icon-serach--white.svg" class="patSearchBt-icon" alt="站內搜尋功能">
                <span class="patSearchBt-text">
                    站內
                    <br />
                    搜尋
                </span>
            </button>

            <button class="patheaderBt js-navOpenBt" type="button" aria-expanded="false" onclick="openDialog('dialog1', this)">
                <img src="images/icon-hamburger--white.svg" alt="網站連結選單" class="patheaderBt-icon">
            </button>
        </header>

        <!-- 開合選單區 -->
        <div class="hidden" role="dialog" id="dialog1" aria-labelledby="dialog1_label" aria-modal="true" aria-describedby="網站連結選單">
            <div class="patnav js-patnavContent">
                <div class="patnav-head">
                    <a href="index.html" title="回` + sysconfig[1].setvalue + `首頁"  class="js-navOpenfocus js-tabnone" tabindex="-1">
                        <img src="images/footer-logo.svg" alt="` + sysconfig[1].setvalue + `LOGO" class="patnav-head--logoImg">
                    </a>
                </div>
                <div class="clear"></div>

                <div class="patnavDecBk">
                    <img src="images/nav-dec01.png" class="patnavDecBk--dec01" alt="">
                    <img src="images/nav-dec02.png" class="patnavDecBk--dec02" alt="">
                </div>

                <ol class="patnavSectionBk">
                    <li class="patnavSection">
                        <span class="patnavFirstArea-tit">
                            本局介紹
                        </span>
                        <ul class="patnavSecondArea js-navSecondLink">
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
                            環保業務
                        </span>
                        <ul class="patnavSecondArea js-navSecondLink">
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
                            最新消息
                        </span>
                        <ul class="patnavSecondArea js-navSecondLink">
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
                    <li class="patnavSection">
                        <span class="patnavFirstArea-tit">
                            便民服務
                        </span>
                        <ul class="patnavSecondArea js-navSecondLink">
                        `;
                        var _dfClass = $.UrlParam("_dfClass");
                        $.each(downloadfile_class_option, function (key, values) {
                            var class_ss = (_dfClass == values[0]) ? "patnavSecondArea-link--active" : "";

                            NavContent += `
                            <li class="patnavSecondArea-li"><a href="downloadli.html?_dfClass=` + values[0] + `" class="patnavSecondArea-link js-tabnone ` + class_ss + `" title="` + values[1] + `" tabindex="-1">` + values[1] + `</a></li>
                            `;
                        });
                        NavContent += `
                        </ul>
                    </li>
                    <!-- <div class="patnavSection">
                        <section class="patnavFirstArea js-navFirstLink">
                            <button class="patnavFirstArea-tit js-linkOpen js-comtabno" aria-expanded="false"  tabindex="-1">
                                Q&A
                            </button>
                            <section class="patnavSecondArea js-navSecondLink">
                            `;
                            var _qaClass = $.UrlParam("_qaClass");
                            $.each(qa_class_option, function (key, values) {
                                var class_ss = (_qaClass == values[0]) ? "patnavSecondArea-link--active" : "";

                                NavContent += `
                                <li class="patnavSecondArea-li"><a href="qali.html?_qaClass=` + values[0] + `" class="patnavSecondArea-link js-tabnone ` + class_ss + `" title="` + values[1] + `" tabindex="-1">` + values[1] + `</a></li>
                                `;
                            });
                            NavContent += `
                            </section>
                        </section>
                    </div> -->
                    <li class="patnavSection">
                        <span class="patnavFirstArea-tit">
                            環境資訊
                        </span>
                        <ul class="patnavSecondArea js-navSecondLink">
                        `;
                        var _dClass = $.UrlParam("_dClass");
                        $.each(disseminate_class_option, function (key, values) {
                            var class_ss = (_dClass == values[0]) ? "patnavSecondArea-link--active" : "";

                            NavContent += `
                            <li class="patnavSecondArea-li"><a href="propagandali.html?_dClass=` + values[0] + `" class="patnavSecondArea-link js-tabnone ` + class_ss + `" title="` + values[1] + `" tabindex="-1">` + values[1] + `</a></li>
                            `;
                        });
                        NavContent += `
                        </ul>
                    </li>
                    <li class="patnavSection">
                        <span class="patnavFirstArea-tit">
                            政府資訊公開
                        </span>
                        <ul class="patnavSecondArea js-navSecondLink">
                        `;
                        var _oClass = $.UrlParam("_oClass");
                        $.each(openinfo_class_option, function (key, values) {
                            var class_ss = (_oClass == values[0]) ? "patnavSecondArea-link--active" : "";

                            NavContent += `
                            <li class="patnavSecondArea-li"><a href="opennessli.html?_oClass=` + values[0] + `" class="patnavSecondArea-link js-tabnone ` + class_ss + `" title="` + values[1] + `" tabindex="-1">` + values[1] + `</a></li>
                            `;
                        });
                        NavContent += `
                        </ul>
                    </li>
                    <li class="patnavSection">
                        <span class="patnavFirstArea-tit">
                            重要連結
                        </span>
                        <section class="patnavSecondArea js-navSecondLink">
                        `;
                        var _lClass = $.UrlParam("_lClass");
                        $.each(links_class_option, function (key, values) {
                            var class_ss = (_lClass == values[0]) ? "patnavSecondArea-link--active" : "";

                            NavContent += `
                            <li class="patnavSecondArea-li"><a href="linksli.html?_lClass=` + values[0] + `" class="patnavSecondArea-link js-tabnone ` + class_ss + `" title="` + values[1] + `" tabindex="-1">` + values[1] + `</a></li>
                            `;
                        });

                        var contact_ss = (location.pathname == "/contact.html") ? "patnavSecondArea-link--active" : "";
                        var howtogo_ss = (location.pathname == "/howtogo.html") ? "patnavSecondArea-link--active" : "";
                        var acc_ss = (location.pathname == "/acc.html") ? "patnavSecondArea-link--active" : "";

                        NavContent += `
                        </section>
                    </li>
                    <li class="patnavSection">
                        <span class="patnavFirstArea-tit">
                            機關資訊
                        </span>
                        <ul class="patnavSecondArea js-navSecondLink">
                            <li class="patnavSecondArea-li"><a href="contact.html" class="patnavSecondArea-link js-tabnone ` + contact_ss + `" title="聯絡我們" tabindex="-1">聯絡我們</a></li>
                            <li class="patnavSecondArea-li"><a href="howtogo.html" class="patnavSecondArea-link js-tabnone ` + howtogo_ss + `" title="交通資訊" tabindex="-1">交通資訊</a></li>
                            <li class="patnavSecondArea-li"><a href="acc.html" class="patnavSecondArea-link js-tabnone ` + acc_ss + `" title="網站導覽"  tabindex="-1">網站導覽</a></li>
                            <li class="patnavSecondArea-li"><a href="eng/" class="patnavSecondArea-link js-tabnone" title="英文版網站" tabindex="-1">英文版網站</a></li>
                        </ul>
                    </li>
                </ol>

                <!-- 關閉按鈕，放在最後讓無障礙使用者關閉 -->               
                <button class="patnav-navCloseBt js-navCloseBt js-tabnone" type="button" onclick="closeDialog(this)" tabindex="-1">
                    <img src="images/icon-close--white.svg" alt="關閉網站連結選單" class="patnav-navCloseBt--icon">
                </button>
            </div>
        </div>

        <!-- 搜尋區 -->
        <div class="patSearchBk js-patSearchBk hidden" role="dialog" id="dialog2" aria-labelledby="dialog2_label" aria-modal="true" aria-describedby="局內搜尋">
            <div class="patSearch js-patSearchContent">
                <div class="patSearchArea">
                    <p class="patSearchArea-tit pb-30">
                        局內搜尋
                    </p>
                    
                    <div class="patSearchArea-inputArea">
                        <script async src="https://cse.google.com/cse.js?cx=79eed71cc65107763"></script>
                        <div class="gcse-searchbox-only"></div>
                        <input type="text" name="" id="" class="patSearchArea-input js-searchBt js-tabnone" placeholder="輸入搜尋關鍵字"  tabindex="-1">
                        <a href="javascript:void(0);" class="patSearchArea-input--iconBt js-tabnone" role="button" aria-pressed="false" tabindex="-1" title="按鈕>
                            <img src="images/icon-serach--gold.svg" alt="送出搜尋">
                        </a>
                    </div>

                </div>
                <!-- 關閉按鈕，放在最後讓無障礙使用者關閉 -->
                <button type="button" class="patnav-navCloseBt js-searchCloseBt js-tabnone" onclick="closeDialog(this)" tabindex="-1">
                    <img src="images/icon-close--white.svg" alt="關閉搜尋區" class="patnav-navCloseBt--icon">
                </button>
            </div>
        </div>


        <!-- 大視口快速連結header區 -->
        <div class="patBigNav" aria-hidden="true">
            <section class="patBigNavSection js-navFirstLink--com" aria-hidden="true">
                本局介紹
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
                環保業務
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
                最新消息
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
            <section class="patBigNavSection js-navFirstLink--com" aria-hidden="true">
                便民服務
                <ul class="patBigNavSection-ListArea js-navSecondLink">
                `;
                $.each(downloadfile_class_option, function (key, values) {

                    NavContent += `
                    <a href="downloadli.html?_dfClass=` + values[0] + `" class="patBigNavSection-ListArea--link" title="` + values[1] + `" tabindex="-1" >
                        ` + values[1] + `
                    </a>
                    `;
                });
                NavContent += `
                </ul>
            </section>
            <!-- <section class="patBigNavSection js-navFirstLink--com" aria-hidden="true">
                Q&A
                <ul class="patBigNavSection-ListArea js-navSecondLink">
                `;
                $.each(qa_class_option, function (key, values) {

                    NavContent += `
                    <a href="qali.html?_qaClass=` + values[0] + `" class="patBigNavSection-ListArea--link" title="` + values[1] + `" tabindex="-1" >
                        ` + values[1] + `
                    </a>
                    `;
                });
                NavContent += `
                </ul>
            </section> -->
            <section class="patBigNavSection js-navFirstLink--com" aria-hidden="true">
                環境資訊
                <ul class="patBigNavSection-ListArea js-navSecondLink">
                `;
                $.each(disseminate_class_option, function (key, values) {

                    NavContent += `
                    <a href="propagandali.html?_dClass=` + values[0] + `" class="patBigNavSection-ListArea--link" title="` + values[1] + `" tabindex="-1" >
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

    // 焦點鎖定
	
}
