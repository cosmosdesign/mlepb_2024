/*downloadli.html js*/
$(document).ready(function() {
    var page = ($.UrlParam("page") == "") ? 1 : $.UrlParam("page");
    keywords = $.UrlParam("keywords");
    $("#keywords").val(keywords);
    _usergroup = $.UrlParam("_usergroup");
    $("#_usergroup").val(_usergroup);
    _class = $.UrlParam("_dfClass");
    $("#_dfClass").val(_class);
    if (_class == "") {
        window.location.href = "index.html";
    }

    $.ajax({
        url: CONFIG["Api_Domain_Path"] + "frontend_downloadfilelist",
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
            var downloadfile_list = response.downloadfile_list;
            var downloadfile_class = navigation.downloadfile_class;
            var downloadfile_class_str = downloadfile_class[_class];

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
                便民服務<span class="icon">▶</span>
            </a>
            <a href="downloadli.html?_dfClass=` + _class + `" class="eleBite-link" title="` + downloadfile_class_str + `">
                ` + downloadfile_class_str + `<span class="icon">▶</span>
            </a>
            `
            $("#breadcrumb_div").html(breadcrumb_div);

            $("#downloadfile_class_title").html(downloadfile_class_str);

            //$("#Total_Count").html(downloadfile_list.total);
            //$("#span_page").html(downloadfile_list.current_page + " " + $.i18n("common_of") + " " + downloadfile_list.last_page);
            /* for (let i = 1; i <= downloadfile_list.last_page; i++) {
                var varItem = new Option(i, i);//(objItemText, objItemValue)
                document.getElementById('page_sel').options.add(varItem);
            }
            $("#page_sel").val(downloadfile_list.current_page); */
            var search_param = "";
            search_param += ($("#_dfClass").val() != "") ? "&_dfClass=" + encodeURIComponent($("#_dfClass").val()) : "";
            search_param += ($("#_usergroup").val() != "") ? "&_usergroup=" + encodeURIComponent($("#_usergroup").val()) : "";
            search_param += ($("#keywords").val() != "") ? "&keywords=" + encodeURIComponent($("#keywords").val()) : "";
            var page_list = re_page_list(downloadfile_list.current_page, downloadfile_list.last_page, '?', search_param, '', '');
            $("#page_span").html(page_list);
            $("#page").val(downloadfile_list.current_page);
            $("#last_page").val(downloadfile_list.last_page);

            var list_str = "";
            $.each(downloadfile_list.data, function (i, downloadfile) {
                var updated_at_array = downloadfile.str_date.split(" ");
                var date_array = updated_at_array[0].split("-");

                list_str += `
                <article class="modNewsProList">
                    <p class="modNewsProList-subArea">
                        <span class="modNewsProList-subArea--main">
                            ` + downloadfile_class[downloadfile.class] + `
                        </span>
                        <span class="modNewsProList-subArea--date">
                            ` + (date_array[0] - 1911) + '-' + date_array[1] + '-' + date_array[2] + `
                        </span>
                    </p>
                    <a href="downloadin.html?downloadfile_id=` + downloadfile.id + `" class="modNewsProList-link" title="` + downloadfile.title + `">
                        ` + downloadfile.title + `
                        <div class="modNewsProList-linkDecBt mt-20">
                            <img src="images/icon-arrow--right--big--em.svg" alt="">
                        </div>
                    </a>
                </article>
                `
            });

            $("#list_div").html(list_str);
            $("#Total_Count").html('共' + downloadfile_list.total + '則');
            $(document).prop("title", sysconfig[1].setvalue + " - 便民服務 - " + downloadfile_class_str);
        }
    });

    //搜尋列表
    $(document).on("click", "#search_btn", function () {
        window.location.href = encodeURI("?keywords=" + $("#keywords").val() + "&_dfClass=" + $("#_dfClass").val() + "&_usergroup=" + $("#_usergroup").val());
    });

    $(document).on("change", "#_usergroup", function () {
        window.location.href = encodeURI("?keywords=" + $("#keywords").val() + "&_dfClass=" + $("#_dfClass").val() + "&_usergroup=" + $("#_usergroup").val());
    });

    //第一頁
    $(document).on("click", "#first_page", function () {
        var page = parseInt($("#page").val());
        var search_param = "";
        search_param += ($("#_dfClass").val() != "") ? "&_dfClass=" + encodeURIComponent($("#_dfClass").val()) : "";
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
        search_param += ($("#_dfClass").val() != "") ? "&_dfClass=" + encodeURIComponent($("#_dfClass").val()) : "";
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
        search_param += ($("#_dfClass").val() != "") ? "&_dfClass=" + encodeURIComponent($("#_dfClass").val()) : "";
        search_param += ($("#_usergroup").val() != "") ? "&_usergroup=" + encodeURIComponent($("#_usergroup").val()) : "";

        window.location.href = encodeURI("?page=" + page + "&keywords=" + keywords + search_param);
    });

    //下一頁
    $(document).on("click", "#next_page", function () {
        var page = parseInt($("#page").val());
        var search_param = "";
        search_param += ($("#_dfClass").val() != "") ? "&_dfClass=" + encodeURIComponent($("#_dfClass").val()) : "";

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
        search_param += ($("#_dfClass").val() != "") ? "&_dfClass=" + encodeURIComponent($("#_dfClass").val()) : "";
        search_param += ($("#_usergroup").val() != "") ? "&_usergroup=" + encodeURIComponent($("#_usergroup").val()) : "";

        if (page == last_page) {
            alert($.i18n("common_is_last_page"));
        } else {
            window.location.href = encodeURI("?page=" + last_page + "&keywords=" + keywords + search_param);
        }
    });
});

