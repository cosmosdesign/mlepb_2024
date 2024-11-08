/*qali.html js*/
$(document).ready(function() {
    var page = ($.UrlParam("page") == "") ? 1 : $.UrlParam("page");
    keywords = $.UrlParam("keywords");
    $("#keywords").val(keywords);
    _class = $.UrlParam("_qaClass");
    $("#_qaClass").val(_class);
    if (_class == "") {
        window.location.href = "index.html";
    }

    $.ajax({
        url: CONFIG["Api_Domain_Path"] + "frontend_qalist",
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
            var qa_list = response.qa_list;
            var qa_class = navigation.qa_class;
            var qa_class_str = qa_class[_class];

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
            <a href="qali.html?_qaClass=` + _class + `" class="eleBite-link" title="` + qa_class_str + `">
                ` + qa_class_str + `<span class="icon">▶</span>
            </a>
            `
            $("#breadcrumb_div").html(breadcrumb_div);

            $("#qa_class_title").html(qa_class_str);

            //$("#Total_Count").html(qa_list.total);
            //$("#span_page").html(qa_list.current_page + " " + $.i18n("common_of") + " " + qa_list.last_page);
            /* for (let i = 1; i <= qa_list.last_page; i++) {
                var varItem = new Option(i, i);//(objItemText, objItemValue)
                document.getElementById('page_sel').options.add(varItem);
            }
            $("#page_sel").val(qa_list.current_page); */
            var search_param = "";
            search_param += ($("#_qaClass").val() != "") ? "&_qaClass=" + encodeURIComponent($("#_qaClass").val()) : "";
            search_param += ($("#keywords").val() != "") ? "&keywords=" + encodeURIComponent($("#keywords").val()) : "";
            var page_list = re_page_list(qa_list.current_page, qa_list.last_page, '?', search_param, '', '');
            $("#page_span").html(page_list);
            $("#page").val(qa_list.current_page);
            $("#last_page").val(qa_list.last_page);

            var list_str = "";
            $.each(qa_list.data, function (i, qa) {
                var updated_at_array = qa.updated_at.split(" ");
                var date_array = updated_at_array[0].split("-");

                list_str += `
                <article class="pagQaList">
                    <p class="pagQaList-q mtb-10">Q</p>
                    <a href="qain.html?qa_id=` + qa.id + `" class="pagQaList-titLink mtb-10" title="` + qa.title + `">
                        <h2>` + qa.title + `</h2>
                    </a>
                    <div class="pagQaList-linkDecBt mtb-10">
                        <img src="images/icon-arrow--right--big--em.svg" alt="">
                    </div>
                </article>
                `
            });

            $("#list_div").html(list_str);
            $("#Total_Count").html('共' + qa_list.total + '則');
            $(document).prop("title", sysconfig[1].setvalue + " - Q&A 問同答 - " + qa_class_str);
        }
    });

    //搜尋列表
    $(document).on("click", "#search_btn", function () {
        window.location.href = encodeURI("?keywords=" + $("#keywords").val() + "&_qaClass=" + $("#_qaClass").val());
    });

    //第一頁
    $(document).on("click", "#first_page", function () {
        var page = parseInt($("#page").val());
        var search_param = "";
        search_param += ($("#_qaClass").val() != "") ? "&_qaClass=" + encodeURIComponent($("#_qaClass").val()) : "";

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
        search_param += ($("#_qaClass").val() != "") ? "&_qaClass=" + encodeURIComponent($("#_qaClass").val()) : "";

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
        search_param += ($("#_qaClass").val() != "") ? "&_qaClass=" + encodeURIComponent($("#_qaClass").val()) : "";

        window.location.href = encodeURI("?page=" + page + "&keywords=" + keywords + search_param);
    });

    //下一頁
    $(document).on("click", "#next_page", function () {
        var page = parseInt($("#page").val());
        var search_param = "";
        search_param += ($("#_qaClass").val() != "") ? "&_qaClass=" + encodeURIComponent($("#_qaClass").val()) : "";

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
        search_param += ($("#_qaClass").val() != "") ? "&_qaClass=" + encodeURIComponent($("#_qaClass").val()) : "";

        if (page == last_page) {
            alert($.i18n("common_is_last_page"));
        } else {
            window.location.href = encodeURI("?page=" + last_page + "&keywords=" + keywords + search_param);
        }
    });
});

