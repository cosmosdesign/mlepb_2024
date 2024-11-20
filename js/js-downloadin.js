/*downloadin.html js*/
$(document).ready(function() {
    downloadfile_id = $.UrlParam("downloadfile_id");
    $("#downloadfile_id").val(downloadfile_id);
    if (downloadfile_id == "") {
        window.location.href = "index.html";
    }

    $.ajax({
        url: CONFIG["Api_Domain_Path"] + "frontend_getdownloadfile",
        type: "POST",
        data: { 'chk_php_self': location.pathname, 'system_language': $.cookie('system_language'), 'downloadfile_id': downloadfile_id },
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
            var downloadfile = response.downloadfile;
            var downloadfileFileData = response.downloadfileFileData;
            var downloadfile_class = navigation.downloadfile_class;
            var downloadfile_class_str = downloadfile_class[downloadfile.class];

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
                便民服務<span class="icon">▶</span>
            </a>
            <a href="downloadli.html?_dfClass=` + downloadfile.class + `" class="eleBite-link" title="` + downloadfile_class_str + `">
                ` + downloadfile_class_str + `<span class="icon">▶</span>
            </a>
            <a href="downloadin.html?downloadfile_id=` + downloadfile_id + `" class="eleBite-link" title="` + downloadfile.title + `">
                ` + downloadfile.title + `<span class="icon">▶</span>
            </a>
            `
            $("#breadcrumb_div").html(breadcrumb_div);

            var updated_at_array = downloadfile.str_date.split(" ");
            var date_array = updated_at_array[0].split("-");
            var downloadfile_date = date_array[1] + '/' + date_array[2] + '/0' + (date_array[0] - 1911);
            var downloadfile_title = (downloadfile.title == "" || downloadfile.title == undefined) ? "--" : downloadfile.title;
            var downloadfile_info = (downloadfile.info == "" || downloadfile.info == undefined) ? "--" : downloadfile.info;
            downloadfile_info = downloadfile_info.replace("\n", "<br>");
            var downloadfile_usergroup = usergroup_array[downloadfile.usergroup];

            //$("#downloadfile_date").html(downloadfile_date);
            //$("#downloadfile_class").html(downloadfile_class);
            $("#downloadfile_date_day").html(date_array[2]);
            $("#downloadfile_date_month").html(date_array[0] - 1911 + '-' + date_array[1]);
            $("#downloadfile_title").html(downloadfile_title);
            $("#downloadfile_info").html(downloadfile_info.replace(/\n/g, "<br />"));
            $("#downloadfile_usergroup").html(downloadfile_usergroup);

            var file_list = "";
            $.each(downloadfileFileData, function (i, file) {
                file_list +=`
                <li class="modDownload-list">
                    <div class="modDownload-list--listDec"></div>
                    <a href="`+ CONFIG["Api_Domain_Path"] + 'download/' + downloadfile_id + '/' + file.value +`" title="` + file.name + `" download="` + file.name + `" class="modDownload-list--link">
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

            $(document).prop("title", sysconfig[1].setvalue + " - 便民服務 - " + downloadfile_class_str + " - " + downloadfile_title);

            $("meta[property='og:url']").prop('content', window.location.href);
            $("meta[property='og:type']").prop('content', "website");
            $("meta[property='og:title']").prop('content', downloadfile_title);
            $("meta[property='og:description']").prop('content', removeHTMLTag(downloadfile_info));
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

