/*qain.html js*/
$(document).ready(function() {
    qa_id = $.UrlParam("qa_id");
    $("#qa_id").val(qa_id);
    if (qa_id == "") {
        window.location.href = "index.html";
    }

    $.ajax({
        url: CONFIG["Api_Domain_Path"] + "frontend_getqa",
        type: "POST",
        data: { 'chk_php_self': location.pathname, 'system_language': $.cookie('system_language'), 'qa_id': qa_id },
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
            var qa = response.qa;
            var qa_class = navigation.qa_class;
            var qa_class_str = qa_class[qa.class];

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
                Q&A 問同答<span class="icon">▶</span>
            </a>
            <a href="qali.html?_qaClass=` + qa.class + `" class="eleBite-link" title="` + qa_class_str + `">
                ` + qa_class_str + `<span class="icon">▶</span>
            </a>
            <a href="qain.html?qa_id=` + qa_id + `" class="eleBite-link" title="` + qa.title + `">
                ` + qa.title + `<span class="icon">▶</span>
            </a>
            `
            $("#breadcrumb_div").html(breadcrumb_div);

            var updated_at_array = qa.updated_at.split(" ");
            var date_array = updated_at_array[0].split("-");
            var qa_date = date_array[1] + '/' + date_array[2] + '/0' + (date_array[0] - 1911);
            var qa_title = (qa.title == "" || qa.title == undefined) ? "--" : qa.title;
            var qa_info = (qa.info == "" || qa.info == undefined) ? "--" : qa.info;
            qa_info = qa_info.replace("\n", "<br>");

            //$("#qa_date").html(qa_date);
            //$("#qa_class").html(qa_class);
            $("#qa_date_day").html(date_array[2]);
            $("#qa_date_month").html(date_array[0] - 1911 + '-' + date_array[1]);
            $("#qa_title").html(qa_title);
            $("#qa_info").html(qa_info.replace(/\n/g, "<br />"));

            $(document).prop("title", sysconfig[1].setvalue + " - Q&A 問同答 - " + qa_class_str + " - " + qa_title);

            $("meta[property='og:url']").prop('content', window.location.href);
            $("meta[property='og:type']").prop('content', "website");
            $("meta[property='og:title']").prop('content', qa_title);
            $("meta[property='og:description']").prop('content', removeHTMLTag(qa_info));
            //$("meta[property='og:image']").prop('content', location.protocol + '//' + location.hostname + "/api/");
            //$("meta[property='og:image']").prop('content', location.protocol + '//' + location.hostname + "/images/49698831.jpg/");

            //console.log(encodeURIComponent('https://www.facebook.com/mlepb360'));

            var share_button_str = `
            <div class="fb-share-button" data-href="`+ window.location.href +`" data-layout="button" data-size="large">
                <a title="另開新視窗：分享內容到facebook" href="https://www.facebook.com/sharer/sharer.php?u=`+ encodeURIComponent(window.location.href) +`&amp;src=sdkpreparse" class="btnMainColorBt typo-textAlignright" target="_blank">
                    SHARE
                    <img src="images/share.svg" alt="" class="icon--left">
                </a>
            </div>
            `
            $("#share_button_div").html(share_button_str);
        }
    });
});

