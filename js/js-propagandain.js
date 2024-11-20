/*propagandain.html js*/
$(document).ready(function() {
    disseminate_id = $.UrlParam("disseminate_id");
    $("#disseminate_id").val(disseminate_id);
    if (disseminate_id == "") {
        window.location.href = "index.html";
    }

    $.ajax({
        url: CONFIG["Api_Domain_Path"] + "frontend_getdisseminate",
        type: "POST",
        data: { 'chk_php_self': location.pathname, 'system_language': $.cookie('system_language'), 'disseminate_id': disseminate_id },
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
            var disseminate = response.disseminate;
            var disseminateFileData = response.disseminateFileData;
            var disseminate_class = navigation.disseminate_class;
            var disseminate_class_str = disseminate_class[disseminate.class];

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
                環境資訊<span class="icon">▶</span>
            </a>
            <a href="propagandali.html?_dClass=` + disseminate.class + `" class="eleBite-link" title="` + disseminate_class_str + `">
                ` + disseminate_class_str + `<span class="icon">▶</span>
            </a>
            <a href="propagandain.html?disseminate_id=` + disseminate_id + `" class="eleBite-link" title="` + disseminate.title + `">
                ` + disseminate.title + `<span class="icon">▶</span>
            </a>
            `
            $("#breadcrumb_div").html(breadcrumb_div);

            var updated_at_array = disseminate.str_date.split(" ");
            var date_array = updated_at_array[0].split("-");
            var disseminate_date = date_array[1] + '/' + date_array[2] + '/0' + (date_array[0] - 1911);
            var disseminate_title = (disseminate.title == "" || disseminate.title == undefined) ? "--" : disseminate.title;
            var disseminate_info = (disseminate.info == "" || disseminate.info == undefined) ? "--" : disseminate.info;
            disseminate_info = disseminate_info.replace("\n", "<br>");

            //$("#disseminate_date").html(disseminate_date);
            //$("#disseminate_class").html(disseminate_class);
            $("#disseminate_date_day").html(date_array[2]);
            $("#disseminate_date_month").html(date_array[0] - 1911 + '-' + date_array[1]);
            $("#disseminate_title").html(disseminate_title);
            $("#disseminate_info").html(disseminate_info.replace(/\n/g, "<br />"));

            var file_list = "";
            $.each(disseminateFileData, function (i, file) {
                file_list +=`
                <li class="modDownload-list">
                    <div class="modDownload-list--listDec"></div>
                    <a href="`+ CONFIG["Api_Domain_Path"] + 'disseminate/' + disseminate_id + '/' + file.value +`" title="` + file.name + `" download="` + file.name + `" class="modDownload-list--link">
                        ` + file.name + `
                        <span class="modDownload-list--link--format">` + file.name.split(".").pop() + `</span>
                    </a>
                </li>
                `
            });

            if (file_list == "") {
                $("#file_div").hide();
            }
            $("#file_list").html(file_list);

            $(document).prop("title", sysconfig[1].setvalue + " - 環境資訊 - " + disseminate_class_str + " - " + disseminate_title);

            $("meta[property='og:url']").prop('content', window.location.href);
            $("meta[property='og:type']").prop('content', "website");
            $("meta[property='og:title']").prop('content', disseminate_title);
            $("meta[property='og:description']").prop('content', removeHTMLTag(disseminate_info));
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

