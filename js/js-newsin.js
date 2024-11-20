/*newsin.html js*/
$(document).ready(function() {
    nid = $.UrlParam("nid");
    $("#nid").val(nid);
    if (nid == "") {
        window.location.href = "index.html";
    }

    $.ajax({
        url: CONFIG["Api_Domain_Path"] + "frontend_getnews",
        type: "POST",
        data: { 'chk_php_self': location.pathname, 'system_language': $.cookie('system_language'), 'nid': nid },
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
            var news = response.news;
            var newsPicData = response.newsPicData;
            var newsFileData = response.newsFileData;
            var news_class = navigation.news_class;
            var news_class_str = news_class[news.class];

            //產生全域導覽資料
            LoadSysConfig(sysconfig);
            ShowNavigation(sysconfig, navigation);
            ShowFooter(sysconfig, navigation);

            if (news.class == "3") {
                $("#news_date_title").html("公告日期");
                $("#news_usergroup_title").html("公告單位");
            } else {
                $("#news_date_title").html("發佈日期");
                $("#news_usergroup_title").html("發佈單位");
            }

            var breadcrumb_div = "";
            breadcrumb_div += `
            <a href="index.html" class="eleBite-link">
                首頁<span class="icon">▶</span>
            </a>
            <a href="javascrip:void(0);" class="eleBite-link">
                最新消息<span class="icon">▶</span>
            </a>
            <a href="newsli.html?_nClass=` + news.class + `" class="eleBite-link" title="` + news_class_str + `">
                ` + news_class_str + `<span class="icon">▶</span>
            </a>
            <a href="newsin.html?nid=` + nid + `" class="eleBite-link" title="` + news.title + `">
                ` + news.title + `<span class="icon">▶</span>
            </a>
            `
            $("#breadcrumb_div").html(breadcrumb_div);

            //var news_str_date = (news.str_date == "" || news.str_date == undefined) ? "--" : news.str_date;
            //var news_end_date = (news.end_date == "" || news.end_date == undefined) ? "--" : news.end_date;
            var str_date_array = news.str_date.split("-");
            var end_date_array = news.end_date.split("-");
            var news_str_date = str_date_array[1] + '/' + str_date_array[2] + '/0' + (str_date_array[0] - 1911);
            var news_end_date = end_date_array[1] + '/' + end_date_array[2] + '/0' + (end_date_array[0] - 1911);
            var news_date = (news_str_date == news_end_date) ? news_str_date : news_str_date + " ~ " + news_end_date;
            var news_title = (news.title == "" || news.title == undefined) ? "--" : news.title;
            var news_info = (news.info == "" || news.info == undefined) ? "--" : news.info;
            news_info = news_info.replace("\n", "<br>");
            var news_usergroup = usergroup_array[news.usergroup];
            var news_view = (news.view == "" || news.view == undefined) ? "0" : news.view;

            //$("#news_date").html(news_date);
            //$("#news_class").html(news_class);
            $("#news_str_date_day").html(str_date_array[2]);
            $("#news_str_date_month").html(str_date_array[0] - 1911 + '-' + str_date_array[1]);
            //$("#news_end_date_day").html(end_date_array[2]);
            //$("#news_end_date_month").html(end_date_array[0] + '-' + end_date_array[1]);
            $("news_view").html(news_view);
            $("#news_title").html(news_title);
            $("#news_info").html(news_info.replace(/\n/g, "<br />"));
            $("#news_usergroup").html(news_usergroup);

            var newspic_big_list = "";
            var newspic_sml_list = "";
            $.each(newsPicData, function (i, file) {
                newspic_big_list +=`
                <div class="swiper-slide modBanner-img--bigBk">
                    <img src="`+ CONFIG["Api_Domain_Path"] + 'news/' + nid + '/' + file.value +`" alt="` + file.name + `大圖片" class="modBanner-img modBanner-img--big">
                    <p class="modBanner-text">` + file.name + `</p>
                </div>
                `

                newspic_sml_list +=`
                <div class="swiper-slide">
                    <img src="`+ CONFIG["Api_Domain_Path"] + 'news/' + nid + '/' + file.value +`" alt="` + file.name + `小圖片" class="modBanner-img">
                </div>
                `
            });
            if (newspic_big_list == "") {
                $("#newspic_article").hide();
            }
            $("#newspic_big").html(newspic_big_list);
            $("#newspic_sml").html(newspic_sml_list);

            var swiper = new Swiper(".mySwiper", {
                loop: true,
                spaceBetween: 10,
                slidesPerView: 4,
                freeMode: true,
                watchSlidesProgress: true,
            });
            var swiper2 = new Swiper(".mySwiper2", {
                loop: true,
                // spaceBetween: 10,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                thumbs: {
                    swiper: swiper,
                },
            });

            var file_list = "";
            $.each(newsFileData, function (i, file) {
                file_list +=`
                <li class="modDownload-list">
                    <div class="modDownload-list--listDec"></div>
                    <a href="`+ CONFIG["Api_Domain_Path"] + 'news/' + nid + '/' + file.value +`" title="` + file.name + `" download="` + file.name + `" class="modDownload-list--link">
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

            $(document).prop("title", sysconfig[1].setvalue + " - 最新消息 - " + news_class_str + " - " + news_title);

            $("meta[property='og:url']").prop('content', window.location.href);
            $("meta[property='og:type']").prop('content', "website");
            $("meta[property='og:title']").prop('content', news_title);
            $("meta[property='og:description']").prop('content', removeHTMLTag(news_info));
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

