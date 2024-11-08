/*newsli.html js*/
$(document).ready(function() {
    var page = ($.UrlParam("page") == "") ? 1 : $.UrlParam("page");
    keywords = $.UrlParam("keywords");
    $("#keywords").val(keywords);
    _usergroup = $.UrlParam("_usergroup");
    $("#_usergroup").val(_usergroup);
    _class = $.UrlParam("_nClass");
    $("#_nClass").val(_class);
    if (_class == "") {
        window.location.href = "index.html";
    }

    $.ajax({
        url: CONFIG["Api_Domain_Path"] + "frontend_newslist",
        type: "POST",
        data: { 'chk_php_self': location.pathname, 'system_language': $.cookie('system_language'), 'keywords': keywords, '_usergroup': _usergroup, '_class': _class, 'page': page},
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
            var news_list = response.news_list;
            var newspic_array = response.newspic_array;
            var news_class = navigation.news_class;
            var news_class_str = news_class[_class];

            //產生全域導覽資料
            LoadSysConfig(sysconfig);
            ShowNavigation(sysconfig, navigation);
            ShowFooter(sysconfig, navigation);

            //單位選單
            $.each(usergroup_array, function (key, values) {
                var varItem = new Option(values, key);//(objItemText, objItemValue)
                document.getElementById('_usergroup').options.add(varItem);
            });
            $("#_usergroup").val(_usergroup);

            var breadcrumb_div = "";
            breadcrumb_div += `
            <a href="index.html" class="eleBite-link">
                首頁<span class="icon">▶</span>
            </a>
            <a href="javascrip:void(0);" class="eleBite-link">
                最新消息<span class="icon">▶</span>
            </a>
            <a href="newsli.html?_nClass=` + _class + `" class="eleBite-link" title="` + news_class_str + `">
                ` + news_class_str + `<span class="icon">▶</span>
            </a>
            `
            $("#breadcrumb_div").html(breadcrumb_div);

            $("#news_class_title").html(news_class_str);

            //$("#Total_Count").html(news_list.total);
            //$("#span_page").html(news_list.current_page + " " + $.i18n("common_of") + " " + news_list.last_page);
            /* for (let i = 1; i <= news_list.last_page; i++) {
                var varItem = new Option(i, i);//(objItemText, objItemValue)
                document.getElementById('page_sel').options.add(varItem);
            }
            $("#page_sel").val(news_list.current_page); */
            var search_param = "";
            search_param += ($("#_nClass").val() != "") ? "&_nClass=" + encodeURIComponent($("#_nClass").val()) : "";
            search_param += ($("#_usergroup").val() != "") ? "&_usergroup=" + encodeURIComponent($("#_usergroup").val()) : "";
            search_param += ($("#keywords").val() != "") ? "&keywords=" + encodeURIComponent($("#keywords").val()) : "";
            var page_list = re_page_list(news_list.current_page, news_list.last_page, '?', search_param, '', '');
            $("#page_span").html(page_list);
            $("#page").val(news_list.current_page);
            $("#last_page").val(news_list.last_page);

            var list_str = "";
            $.each(news_list.data, function (i, news) {
                var newspic_path = (newspic_array[news.id] == '' || newspic_array[news.id] == undefined) ? "images/noimg--news.png" : CONFIG["Api_Domain_Path"] + "news/" + news.id + '/' + newspic_array[news.id];
                var date_str = (news.str_date == news.end_date) ? news.str_date : news.str_date + " ~ " + news.end_date;
                var str_date_array = news.str_date.split("-");
                var news_info = (news.info == "" || news.info == undefined) ? "" : news.info;

                list_str += `
                <article class="modNewsProList">
                    <div class="modNewsProList-imgBk">
                        <!-- 1210*905 -->
                        <img src="` + newspic_path + `" alt="" onerror="this.src='images/noimg--news.png'" class="modNewsProList-imgBk--img">
                    </div>
                    <p class="modNewsProList-subArea">
                        <span class="modNewsProList-subArea--main">
                            ` + usergroup_array[news.usergroup] + `
                        </span>
                        <span class="modNewsProList-subArea--date">
                            ` + (str_date_array[0] - 1911) + '-' + str_date_array[1] + '-' + str_date_array[2] + `
                        </span>
                    </p>
                    <a href="newsin.html?nid=` + news.id + `" class="modNewsProList-link" title="` + news.title + `">
                        ` + news.title + `
                    </a>
                    <!-- <cite class="modNewsProList-cite typo-linclamp--4">
                        ` + removeHTMLTag(news_info) + `
                    </cite> -->
                </article>
                `
            });

            $("#list_div").html(list_str);
            $("#Total_Count").html('共' + news_list.total + '則');
            $(document).prop("title", sysconfig[1].setvalue + " - 最新消息 - " + news_class_str);
        }
    });

    //搜尋列表
    $(document).on("click", "#search_btn", function () {
        window.location.href = encodeURI("?keywords=" + $("#keywords").val() + "&_nClass=" + $("#_nClass").val() + "&_usergroup=" + $("#_usergroup").val());
    });

    $(document).on("change", "#_usergroup", function () {
        window.location.href = encodeURI("?keywords=" + $("#keywords").val() + "&_nClass=" + $("#_nClass").val() + "&_usergroup=" + $("#_usergroup").val());
    });

    //第一頁
    $(document).on("click", "#first_page", function () {
        var page = parseInt($("#page").val());
        var search_param = "";
        search_param += ($("#_nClass").val() != "") ? "&_nClass=" + encodeURIComponent($("#_nClass").val()) : "";
        search_param += ($("#_usergroup").val() != "") ? "&_usergroup=" + encodeURIComponent($("#_usergroup").val()) : "";

        if (page == 1) {
            alert($.i18n("common_is_first_page"));
        } else {
            window.location.href = encodeURI("?page=1&keywords=" + keywords + search_param);
        }
    });

    //上一頁
    $(document).on("click", "#pre_page", function () {
        var page = parseInt($("#page").val());
        var search_param = "";
        search_param += ($("#_nClass").val() != "") ? "&_nClass=" + encodeURIComponent($("#_nClass").val()) : "";
        search_param += ($("#_usergroup").val() != "") ? "&_usergroup=" + encodeURIComponent($("#_usergroup").val()) : "";

        if (page == 1) {
            alert($.i18n("common_is_first_page"));
        } else {
            window.location.href = encodeURI("?page=" + (page - 1) + "&keywords=" + keywords + search_param);
        }
    });

    //選擇分頁
    $(document).on("change", "#page_sel", function () {
        var page = parseInt($(this).val());
        var search_param = "";
        search_param += ($("#_nClass").val() != "") ? "&_nClass=" + encodeURIComponent($("#_nClass").val()) : "";
        search_param += ($("#_usergroup").val() != "") ? "&_usergroup=" + encodeURIComponent($("#_usergroup").val()) : "";

        window.location.href = encodeURI("?page=" + page + "&keywords=" + keywords + search_param);
    });

    //下一頁
    $(document).on("click", "#next_page", function () {
        var page = parseInt($("#page").val());
        var search_param = "";
        search_param += ($("#_nClass").val() != "") ? "&_nClass=" + encodeURIComponent($("#_nClass").val()) : "";
        search_param += ($("#_usergroup").val() != "") ? "&_usergroup=" + encodeURIComponent($("#_usergroup").val()) : "";

        if (page == last_page) {
            alert($.i18n("common_is_last_page"));
        } else {
            window.location.href = encodeURI("?page=" + (page + 1) + "&keywords=" + keywords + search_param);
        }
    });

    //最後一頁
    $(document).on("click", "#end_page", function () {
        var last_page = parseInt($("#last_page").val());
        var search_param = "";
        search_param += ($("#_nClass").val() != "") ? "&_nClass=" + encodeURIComponent($("#_nClass").val()) : "";
        search_param += ($("#_usergroup").val() != "") ? "&_usergroup=" + encodeURIComponent($("#_usergroup").val()) : "";

        if (page == last_page) {
            alert($.i18n("common_is_last_page"));
        } else {
            window.location.href = encodeURI("?page=" + last_page + "&keywords=" + keywords + search_param);
        }
    });
});

