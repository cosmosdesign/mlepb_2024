/*privacy.html js*/
$(document).ready(function() {
    article_id = "3";

    $.ajax({
        url: CONFIG["Api_Domain_Path"] + "frontend_getarticle",
        type: "POST",
        data: { 'chk_php_self': location.pathname, 'system_language': $.cookie('system_language'), 'article_id': article_id },
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + ":" + xhr.responseText);
            console.log(xhr.status + ":" + xhr.responseText);
            //關閉loading
            $("body").nimbleLoader("hide");
        },
        success: function (response) {
            $.getScript("js/web-js.js");

            var sysconfig = response.sysconfig;
            var navigation = response.navigation;
            var article = response.article;
            var articleFileData = response.articleFileData;
            var article_class = response.article_class;
            var article_class_str = article_class[article.class];

            //產生全域導覽資料
            LoadSysConfig(sysconfig);
            ShowNavigation(sysconfig, navigation);
            ShowFooter(sysconfig, navigation);

            var breadcrumb_div = "";
            breadcrumb_div += `
            <a href="index.html" class="eleBite-link">
                首頁<span class="icon">▶</span>
            </a>
            <a href="privacy.html" class="eleBite-link" title="` + article.title + `">
                ` + article.title + `<span class="icon">▶</span>
            </a>
            `
            $("#breadcrumb_div").html(breadcrumb_div);

            var updated_at_array = article.updated_at.split(" ");
            var date_array = updated_at_array[0].split("-");
            var article_date = date_array[1] + '/' + date_array[2] + '/0' + (date_array[0] - 1911);
            var article_title = (article.title == "" || article.title == undefined) ? "--" : article.title;
            var article_info = (article.info == "" || article.info == undefined) ? "--" : article.info;
            article_info = article_info.replace("\n", "<br>");

            //$("#article_date").html(article_date);
            //$("#article_class").html(article_class);
            $("#article_date_day").html(date_array[2]);
            $("#article_date_month").html(date_array[0] - 1911 + '-' + date_array[1]);
            $("#article_title").html(article_title);
            $("#article_info").html(article_info.replace(/\n/g, "<br />"));

            $(document).prop("title", sysconfig[1].setvalue + " - " + article_title);

            $("meta[property='og:url']").prop('content', window.location.href);
            $("meta[property='og:type']").prop('content', "website");
            $("meta[property='og:title']").prop('content', article_title);
            $("meta[property='og:description']").prop('content', removeHTMLTag(article_info));
            //$("meta[property='og:image']").prop('content', location.protocol + '//' + location.hostname + "/api/");
            //$("meta[property='og:image']").prop('content', location.protocol + '//' + location.hostname + "/images/49698831.jpg/");

            //console.log(encodeURIComponent('https://www.facebook.com/mlepb360'));

            var share_button_str = `
            <div class="fb-share-button" data-href="`+ window.location.href +`" data-layout="button" data-size="large">
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

