/*about.html js*/
$(document).ready(function() {
    aboutus_id = $.UrlParam("aboutus_id");
    if (aboutus_id == "") {
        window.location.href = "index.html";
    }

    $.ajax({
        url: CONFIG["Api_Domain_Path"] + "frontend_getaboutus",
        type: "POST",
        data: { 'chk_php_self': location.pathname, 'system_language': $.cookie('system_language'), 'aboutus_id': aboutus_id },
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + ":" + xhr.responseText);
            console.log(xhr.status + ":" + xhr.responseText);
        },
        success: function (response) {
            $.getScript("js/web-js.js");

            var sysconfig = response.sysconfig;
            var navigation = response.navigation;
            var aboutus = response.aboutus;

            //產生全域導覽資料
            LoadSysConfig(sysconfig);
            ShowNavigation(sysconfig, navigation);
            ShowFooter(sysconfig, navigation);

            var breadcrumb_div = "";
            breadcrumb_div += `
            <a href="index.html" class="eleBite-link">
                首頁<span class="icon">▶</span>
            </a>
            <a href="javascrip:void(0);" class="eleBite-link">
                本局介紹<span class="icon">▶</span>
            </a>
            <a href="about.html?aboutus_id=` + aboutus_id + `" class="eleBite-link" title="` + aboutus.title + `">
                ` + aboutus.title + `<span class="icon">▶</span>
            </a>
            `
            $("#breadcrumb_div").html(breadcrumb_div);

            $("#aboutus_title").html(aboutus.title);
            $("#aboutus_info").html(aboutus.info);

            $(document).prop("title", sysconfig[1].setvalue + " - 本局介紹 - " + aboutus.title);

            $("meta[property='og:url']").prop('content', window.location.href);
            $("meta[property='og:type']").prop('content', "website");
            $("meta[property='og:title']").prop('content', aboutus.title);
            //$("meta[property='og:description']").prop('content', removeHTMLTag(aboutus.info));
            //$("meta[property='og:image']").prop('content', location.protocol + '//' + location.hostname + "/api/");
            //$("meta[property='og:image']").prop('content', location.protocol + '//' + location.hostname + "/images/49698831.jpg/");

            var share_button_str = `
            <div id="fb_share_button" class="fb-share-button" data-href="`+ window.location.href +`" data-layout="button" data-size="large">
                <a title="另開新視窗" href="https://www.facebook.com/sharer/sharer.php?u=`+ encodeURIComponent(window.location.href) +`&amp;src=sdkpreparse" class="btnMainColorBt typo-textAlignright" target="_blank">
                    SHARE
                    <img src="images/share.svg" alt="" class="icon--left">
                </a>
            </div>
            `
            $("#share_button_div").html(share_button_str);
        }
    });
});

