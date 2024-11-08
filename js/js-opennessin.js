/*opennessin.html js*/
$(document).ready(function() {
    openinfo_id = $.UrlParam("openinfo_id");
    $("#openinfo_id").val(openinfo_id);
    if (openinfo_id == "") {
        window.location.href = "index.html";
    }

    $.ajax({
        url: CONFIG["Api_Domain_Path"] + "frontend_getopeninfo",
        type: "POST",
        data: { 'chk_php_self': location.pathname, 'system_language': $.cookie('system_language'), 'openinfo_id': openinfo_id },
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
            var usergroup_array = response.usergroup_array;
            var openinfo = response.openinfo;
            var openinfoFileData = response.openinfoFileData;
            var openinfo_class = navigation.openinfo_class;
            var openinfo_class_str = openinfo_class[openinfo.class];

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
                政府資訊公開<span class="icon">▶</span>
            </a>
            <a href="propagandali.html?_oClass=` + openinfo.class + `" class="eleBite-link" title="` + openinfo_class_str + `">
                ` + openinfo_class_str + `<span class="icon">▶</span>
            </a>
            <a href="propagandain.html?openinfo_id=` + openinfo_id + `" class="eleBite-link" title="` + openinfo.title + `">
                ` + openinfo.title + `<span class="icon">▶</span>
            </a>
            `
            $("#breadcrumb_div").html(breadcrumb_div);

            var updated_at_array = openinfo.str_date.split(" ");
            var date_array = updated_at_array[0].split("-");
            var openinfo_date = date_array[1] + '/' + date_array[2] + '/0' + (date_array[0] - 1911);
            var openinfo_title = (openinfo.title == "" || openinfo.title == undefined) ? "--" : openinfo.title;
            var openinfo_info = (openinfo.info == "" || openinfo.info == undefined) ? "--" : openinfo.info;
            openinfo_info = openinfo_info.replace("\n", "<br>");
            var openinfo_usergroup = usergroup_array[openinfo.usergroup];

            //$("#openinfo_date").html(openinfo_date);
            //$("#openinfo_class").html(openinfo_class);
            $("#openinfo_date_day").html(date_array[2]);
            $("#openinfo_date_month").html(date_array[0] - 1911 + '-' + date_array[1]);
            $("#openinfo_title").html(openinfo_title);
            $("#openinfo_info").html(openinfo_info.replace(/\n/g, "<br />"));
            $("#openinfo_usergroup").html(openinfo_usergroup);

            var file_list = "";
            $.each(openinfoFileData, function (i, file) {
                file_list +=`
                <li class="modDownload-list">
                    <div class="modDownload-list--listDec"></div>
                    <a href="`+ CONFIG["Api_Domain_Path"] + 'openinfo/' + openinfo_id + '/' + file.value +`" title="` + file.name + `" download="` + file.name + `" class="modDownload-list--link">
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

            $(document).prop("title", sysconfig[1].setvalue + " - 政府資訊公開 - " + openinfo_class_str + " - " + openinfo_title);

            $("meta[property='og:url']").prop('content', window.location.href);
            $("meta[property='og:type']").prop('content', "website");
            $("meta[property='og:title']").prop('content', openinfo_title);
            $("meta[property='og:description']").prop('content', removeHTMLTag(openinfo_info));
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

