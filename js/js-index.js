/*index.html js*/
$(document).ready(function () {
    $.ajax({
        url: CONFIG["Api_Domain_Path"] + "index",
        type: "POST",
        data: { 'chk_php_self': location.pathname, 'system_language': $.cookie('system_language') },
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + ":" + xhr.responseText);
            console.log(xhr.status + ":" + xhr.responseText);
        },
        success: function (response) {
            $.getScript("js/web-js.js");

            var sysconfig = response.sysconfig;
            var navigation = response.navigation;
            var banner_list = response.banner_list[0];
            var news_class = navigation.news_class;
            var news_list = response.news_list.news;
            var newspic_array = response.news_list.newspic_array;
            var links_class = navigation.links_class;
            var links_list = response.links_list;

            //產生全域導覽資料
            LoadSysConfig(sysconfig);
            ShowNavigation(sysconfig, navigation);
            ShowFooter(sysconfig, navigation);

            //banner形象區
            if (banner_list != "" && banner_list != undefined) {
                var banner_path = CONFIG["Api_Domain_Path"] + "banner/" + banner_list.id + "/"
                var banner_pic1 = (banner_list.pic1 == "" || banner_list.pic1 == null) ? "images/banner-01--1920.png" : banner_path + banner_list.pic1;
                var banner_pic2 = (banner_list.pic2 == "" || banner_list.pic2 == null) ? "images/banner-01--big.png" : banner_path + banner_list.pic2;
                var banner_pic3 = (banner_list.pic3 == "" || banner_list.pic3 == null) ? "images/banner-01--sml.png" : banner_path + banner_list.pic3;

                var banner_str = '';
                banner_str += `
                <!-- 橫式照片1920 -->
                <source media="(min-width: 1850px)" srcset="` + banner_pic1 + `" sizes="100vw">
                <!-- 橫式照片 -->
                <source media="(orientation: landscape)" srcset="` + banner_pic2 + `" sizes="100vw">
                <!-- 直式照片 -->
                <source media="(orientation: portrait)" srcset="` + banner_pic3 + `" sizes="100vw">
                <!-- default 預設圖片 -->
                <img src="` + banner_pic1 + `" alt="` + banner_list.title + `圖片" width="100%" />
                `;

                $("#banner_list").html(banner_str);
            }

            //最新消息列表
            var list_str = '';
            $.each(news_list, function (i, news) {
                var newspic_path = (newspic_array[news.id] == '' || newspic_array[news.id] == undefined) ? "images/noimg--news.png" : CONFIG["Api_Domain_Path"] + "news/" + news.id + '/' + newspic_array[news.id];
                var date_str = (news.str_date == news.end_date) ? news.str_date : news.str_date + " ~ " + news.end_date;
                var str_date_array = news.str_date.split("-");

                list_str += `
                <article class="modNewsProList">
                    <div class="modNewsProList-imgBk">
                        <!-- 1210*905 -->
                        <img src="` + newspic_path + `" alt="" onerror="this.src='images/noimg--news.png'" class="modNewsProList-imgBk--img">
                    </div>
                    <p class="modNewsProList-subArea">
                        <span class="modNewsProList-subArea--main">
                            ` + news_class[news.class] + `
                        </span>
                        <span class="modNewsProList-subArea--date">
                            ` + (str_date_array[0] - 1911) + '-' + str_date_array[1] + '-' + str_date_array[2] + `
                        </span>
                    </p>
                    <a href="newsin.html?nid=` + news.id + `" class="modNewsProList-link" title="` + news.title + `">
                        ` + news.title + `
                    </a>
                    <!-- <cite class="modNewsProList-cite typo-linclamp--4">
                        ` + removeHTMLTag(news.info) + `
                    </cite> -->
                </article>
                `;
            });

            $("#news_list").html(list_str);

            var count = 1;
            var first_news_class = "";
            $.each(news_class, function (key, value) {
                if (count == 1) {
                    first_news_class = key;
                }
                count++;
            });
            $("#all_news").prop("href", "newsli.html?_nClass=" + first_news_class);

            //相關連結列表
            var list_str = '';
            $.each(links_list, function (i, links) {

                list_str += `
                <a href="` + links.link + `" class="modLink" title="另開新視窗" target="_blank">
                    ` + links.title + `
                    <div class="modLink-arrowBk">
                        <img src="images/icon-arrow--right--sml--white.svg" alt="">
                    </div>
                </a>
                `;
            });

            $("#links_list").html(list_str);

            var count = 1;
            var first_links_class = "";
            $.each(links_class, function (key, value) {
                if (count == 1) {
                    first_links_class = key;
                }
                count++;
            });
            $("#all_links").prop("href", "linksli.html?_lClass=" + first_links_class);
        }
    });
});
