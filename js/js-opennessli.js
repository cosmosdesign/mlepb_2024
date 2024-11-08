/*opennessli.html js*/
$(document).ready(function() {
    var page = ($.UrlParam("page") == "") ? 1 : $.UrlParam("page");
    keywords = $.UrlParam("keywords");
    $("#keywords").val(keywords);
    _usergroup = $.UrlParam("_usergroup");
    $("#_usergroup").val(_usergroup);
    _class = $.UrlParam("_oClass");
    $("#_oClass").val(_class);
    if (_class == "") {
        window.location.href = "index.html";
    }

    $.ajax({
        url: CONFIG["Api_Domain_Path"] + "frontend_openinfolist",
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
            var openinfo_list = response.openinfo_list;
            var openinfo_class = navigation.openinfo_class;
            var openinfo_class_str = openinfo_class[_class];

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
                政府資訊公開<span class="icon">▶</span>
            </a>
            <a href="opennessli.html?_oClass=` + _class + `" class="eleBite-link" title="` + openinfo_class_str + `">
                ` + openinfo_class_str + `<span class="icon">▶</span>
            </a>
            `
            $("#breadcrumb_div").html(breadcrumb_div);

            $("#openinfo_class_title").html(openinfo_class_str);

            //$("#Total_Count").html(openinfo_list.total);
            //$("#span_page").html(openinfo_list.current_page + " " + $.i18n("common_of") + " " + openinfo_list.last_page);
            /* for (let i = 1; i <= openinfo_list.last_page; i++) {
                var varItem = new Option(i, i);//(objItemText, objItemValue)
                document.getElementById('page_sel').options.add(varItem);
            }
            $("#page_sel").val(openinfo_list.current_page); */
            var search_param = "";
            search_param += ($("#_oClass").val() != "") ? "&_oClass=" + encodeURIComponent($("#_oClass").val()) : "";
            search_param += ($("#_usergroup").val() != "") ? "&_usergroup=" + encodeURIComponent($("#_usergroup").val()) : "";
            search_param += ($("#keywords").val() != "") ? "&keywords=" + encodeURIComponent($("#keywords").val()) : "";
            var page_list = re_page_list(openinfo_list.current_page, openinfo_list.last_page, '?', search_param, '', '');
            $("#page_span").html(page_list);
            $("#page").val(openinfo_list.current_page);
            $("#last_page").val(openinfo_list.last_page);

            var list_str = "";
            $.each(openinfo_list.data, function (i, openinfo) {
                var updated_at_array = openinfo.str_date.split(" ");
                var date_array = updated_at_array[0].split("-");
                var openinfo_info = (openinfo.info == "" || openinfo.info == undefined) ? "" : openinfo.info;

                list_str += `
                <article class="modNewsProList">
                    <p class="modNewsProList-subArea">
                        <span class="modNewsProList-subArea--main">
                            發佈日期
                        </span>
                        <span class="modNewsProList-subArea--date">
                            ` + (date_array[0] - 1911) + '-' + date_array[1] + '-' + date_array[2] + `
                        </span>
                    </p>
                    `
                if (openinfo.type == "2") {
                    list_str += `
                        <a href="` + openinfo.link + `" target="_blank" class="modNewsProList-link" title="另開新視窗">
                            ` + openinfo.title + `
                        </a>
                        `
                } else {
                    list_str += `
                        <a href="opennessin.html?openinfo_id=` + openinfo.id + `" class="modNewsProList-link" title="` + openinfo.title + `">
                            ` + openinfo.title + `
                        </a>
                        `
                }
                list_str += `
                    <cite class="modNewsProList-cite typo-linclamp--4">
                        ` + removeHTMLTag(openinfo_info) + `
                    </cite>
                </article>
                `
            });

            $("#list_div").html(list_str);
            $("#Total_Count").html('共' + openinfo_list.total + '則');
            $(document).prop("title", sysconfig[1].setvalue + " - 政府資訊公開 - " + openinfo_class_str);
        }
    });

    //搜尋列表
    $(document).on("click", "#search_btn", function () {
        window.location.href = encodeURI("?keywords=" + $("#keywords").val() + "&_oClass=" + $("#_oClass").val() + "&_usergroup=" + $("#_usergroup").val());
    });

    $(document).on("change", "#_usergroup", function () {
        window.location.href = encodeURI("?keywords=" + $("#keywords").val() + "&_oClass=" + $("#_oClass").val() + "&_usergroup=" + $("#_usergroup").val());
    });

    //第一頁
    $(document).on("click", "#first_page", function () {
        var page = parseInt($("#page").val());
        var search_param = "";
        search_param += ($("#_oClass").val() != "") ? "&_oClass=" + encodeURIComponent($("#_oClass").val()) : "";
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
        search_param += ($("#_oClass").val() != "") ? "&_oClass=" + encodeURIComponent($("#_oClass").val()) : "";
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
        search_param += ($("#_oClass").val() != "") ? "&_oClass=" + encodeURIComponent($("#_oClass").val()) : "";

        window.location.href = encodeURI("?page=" + page + "&keywords=" + keywords + search_param);
    });

    //下一頁
    $(document).on("click", "#next_page", function () {
        var page = parseInt($("#page").val());
        var search_param = "";
        search_param += ($("#_oClass").val() != "") ? "&_oClass=" + encodeURIComponent($("#_oClass").val()) : "";
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
        search_param += ($("#_oClass").val() != "") ? "&_oClass=" + encodeURIComponent($("#_oClass").val()) : "";
        search_param += ($("#_usergroup").val() != "") ? "&_usergroup=" + encodeURIComponent($("#_usergroup").val()) : "";

        if (page == last_page) {
            alert($.i18n("common_is_last_page"));
        } else {
            window.location.href = encodeURI("?page=" + last_page + "&keywords=" + keywords + search_param);
        }
    });
});

