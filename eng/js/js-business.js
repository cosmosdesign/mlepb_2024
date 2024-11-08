/*business.html js*/
$(document).ready(function() {
    affairs_id = $.UrlParam("affairs_id");
    if (affairs_id == "") {
        window.location.href = "index.html";
    }

    $.ajax({
        url: CONFIG["Api_Domain_Path"] + "frontend_getaffairs",
        type: "POST",
        data: { 'chk_php_self': location.pathname, '_lang': "E", 'affairs_id': affairs_id },
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + ":" + xhr.responseText);
            console.log(xhr.status + ":" + xhr.responseText);
        },
        success: function (response) {
            $.getScript("js/web-js.js");

            if (response.result == false) {
                window.location.href = "index.html";
            }

            var sysconfig = response.sysconfig;
            var navigation = response.navigation;
            var affairs = response.affairs;

            //產生全域導覽資料
            LoadSysConfig(sysconfig);
            ShowNavigation(sysconfig, navigation);
            ShowFooter(sysconfig, navigation);

            var breadcrumb_div = "";
            breadcrumb_div += `
            <a href="index.html" class="eleBite-link">
                Index<span class="icon">▶</span>
            </a>
            <a href="javascrip:void(0);" class="eleBite-link">
                Environmental business<span class="icon">▶</span>
            </a>
            <a href="business.html?affairs_id=` + affairs_id + `" class="eleBite-link" title="` + affairs.title + `">
                ` + affairs.title + `<span class="icon">▶</span>
            </a>
            `
            $("#breadcrumb_div").html(breadcrumb_div);

            $("#affairs_title").html(affairs.title);
            $("#affairs_info").html(affairs.info);

            $(document).prop("title", sysconfig[19].setvalue + " - Environmental business - " + affairs.title);

            $("meta[property='og:url']").prop('content', window.location.href);
            $("meta[property='og:type']").prop('content', "website");
            $("meta[property='og:title']").prop('content', affairs.title);
            $("meta[property='og:description']").prop('content', removeHTMLTag(affairs.info));
            //$("meta[property='og:image']").prop('content', location.protocol + '//' + location.hostname + "/api/");
            //$("meta[property='og:image']").prop('content', location.protocol + '//' + location.hostname + "/images/49698831.jpg/");

            //console.log(encodeURIComponent('https://www.facebook.com/mlepb360'));

            var share_button_str = `
            <div class="fb-share-button" data-href="`+ window.location.href +`" data-layout="button" data-size="large">
                <a title="Open in a new window" href="https://www.facebook.com/sharer/sharer.php?u=`+ encodeURIComponent(window.location.href) +`&amp;src=sdkpreparse" class="btnMainColorBt typo-textAlignright" target="_blank">
                    SHARE
                    <img src="images/share.svg" alt="" class="icon--left">
                </a>
            </div>
            `
            $("#share_button_div").html(share_button_str);
        }
    });
});

