/*linksli.html js*/
$(document).ready(function() {
    var page = ($.UrlParam("page") == "") ? 1 : $.UrlParam("page");
    keywords = $.UrlParam("keywords");
    $("#keywords").val(keywords);
    _class = $.UrlParam("_lClass");
    $("#_lClass").val(_class);
    if (_class == "") {
        window.location.href = "index.html";
    }

    $.ajax({
        url: CONFIG["Api_Domain_Path"] + "frontend_linkslist",
        type: "POST",
        data: { 'chk_php_self': location.pathname, 'system_language': $.cookie('system_language'), 'keywords': keywords, '_class': _class, 'page': page},
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
            var links_list = response.links_list;
            var links_class = navigation.links_class;
            var links_class_str = links_class[_class];

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
                重要連結<span class="icon">▶</span>
            </a>
            <a href="linksli.html?_lClass=` + _class + `" class="eleBite-link" title="` + links_class_str + `">
                ` + links_class_str + `<span class="icon">▶</span>
            </a>
            `
            $("#breadcrumb_div").html(breadcrumb_div);

            $("#links_class_title").html(links_class_str);

            //$("#Total_Count").html(links_list.total);
            //$("#span_page").html(links_list.current_page + " " + $.i18n("common_of") + " " + links_list.last_page);
            /* for (let i = 1; i <= links_list.last_page; i++) {
                var varItem = new Option(i, i);//(objItemText, objItemValue)
                document.getElementById('page_sel').options.add(varItem);
            }
            $("#page_sel").val(links_list.current_page); */
            var search_param = "";
            search_param += ($("#_lClass").val() != "") ? "&_lClass=" + encodeURIComponent($("#_lClass").val()) : "";
            search_param += ($("#keywords").val() != "") ? "&keywords=" + encodeURIComponent($("#keywords").val()) : "";
            var page_list = re_page_list(links_list.current_page, links_list.last_page, '?', search_param, '', '');
            $("#page_span").html(page_list);
            $("#page").val(links_list.current_page);
            $("#last_page").val(links_list.last_page);

            var list_str = "";
            $.each(links_list.data, function (i, links) {

                list_str += `
                <a href="` + links.link + `" class="modLink" title="另開新視窗" target="_blank">
                    ` + links.title + `
                    <div class="modLink-arrowBk">
                        <img src="images/icon-arrow--right--sml--white.svg" alt="">
                    </div>
                </a>
                `;
            });

            $("#list_div").html(list_str);
            $("#Total_Count").html('共' + links_list.total + '則');
            $(document).prop("title", sysconfig[1].setvalue + " - 重要連結 - " + links_class_str);
        }
    });

    //搜尋列表
    $(document).on("click", "#search_btn", function () {
        window.location.href = encodeURI("?keywords=" + $("#keywords").val() + "&_lClass=" + $("#_lClass").val());
    });

    //第一頁
    $(document).on("click", "#first_page", function () {
        var page = parseInt($("#page").val());
        var search_param = "";
        search_param += ($("#_lClass").val() != "") ? "&_lClass=" + encodeURIComponent($("#_lClass").val()) : "";

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
        search_param += ($("#_lClass").val() != "") ? "&_lClass=" + encodeURIComponent($("#_lClass").val()) : "";

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
        search_param += ($("#_lClass").val() != "") ? "&_lClass=" + encodeURIComponent($("#_lClass").val()) : "";

        window.location.href = encodeURI("?page=" + page + "&keywords=" + keywords + search_param);
    });

    //下一頁
    $(document).on("click", "#next_page", function () {
        var page = parseInt($("#page").val());
        var search_param = "";
        search_param += ($("#_lClass").val() != "") ? "&_lClass=" + encodeURIComponent($("#_lClass").val()) : "";

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
        search_param += ($("#_lClass").val() != "") ? "&_lClass=" + encodeURIComponent($("#_lClass").val()) : "";

        if (page == last_page) {
            alert($.i18n("common_is_last_page"));
        } else {
            window.location.href = encodeURI("?page=" + last_page + "&keywords=" + keywords + search_param);
        }
    });
});

