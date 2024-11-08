/*propagandali.html js*/
$(document).ready(function() {
    var page = ($.UrlParam("page") == "") ? 1 : $.UrlParam("page");
    keywords = $.UrlParam("keywords");
    $("#keywords").val(keywords);
    _class = $.UrlParam("_dClass");
    $("#_dClass").val(_class);
    if (_class == "") {
        window.location.href = "index.html";
    }

    $.ajax({
        url: CONFIG["Api_Domain_Path"] + "frontend_disseminatelist",
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
            var disseminate_list = response.disseminate_list;
            var disseminate_class = navigation.disseminate_class;
            var disseminate_class_str = disseminate_class[_class];

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
            <a href="propagandali.html?_dClass=` + _class + `" class="eleBite-link" title="` + disseminate_class_str + `">
                ` + disseminate_class_str + `<span class="icon">▶</span>
            </a>
            `
            $("#breadcrumb_div").html(breadcrumb_div);

            $("#disseminate_class_title").html(disseminate_class_str);

            //$("#Total_Count").html(disseminate_list.total);
            //$("#span_page").html(disseminate_list.current_page + " " + $.i18n("common_of") + " " + disseminate_list.last_page);
            /* for (let i = 1; i <= disseminate_list.last_page; i++) {
                var varItem = new Option(i, i);//(objItemText, objItemValue)
                document.getElementById('page_sel').options.add(varItem);
            }
            $("#page_sel").val(disseminate_list.current_page); */
            var search_param = "";
            search_param += ($("#_dClass").val() != "") ? "&_dClass=" + encodeURIComponent($("#_dClass").val()) : "";
            search_param += ($("#keywords").val() != "") ? "&keywords=" + encodeURIComponent($("#keywords").val()) : "";
            var page_list = re_page_list(disseminate_list.current_page, disseminate_list.last_page, '?', search_param, '', '');
            $("#page_span").html(page_list);
            $("#page").val(disseminate_list.current_page);
            $("#last_page").val(disseminate_list.last_page);

            var list_str = "";
            $.each(disseminate_list.data, function (i, disseminate) {
                var updated_at_array = disseminate.str_date.split(" ");
                var date_array = updated_at_array[0].split("-");
                var disseminate_info = (disseminate.info == "" || disseminate.info == undefined) ? "" : disseminate.info;

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
                if (disseminate.type == "2") {
                    list_str += `
                        <a href="` + disseminate.link + `" target="_blank" class="modNewsProList-link" title="另開新視窗">
                            ` + disseminate.title + `
                        </a>
                        `
                } else {
                    list_str += `
                    <a href="propagandain.html?disseminate_id=` + disseminate.id + `" class="modNewsProList-link" title="` + disseminate.title + `">
                        ` + disseminate.title + `
                    </a>
                    `
                }
                list_str += `
                    <cite class="modNewsProList-cite typo-linclamp--4">
                        ` + removeHTMLTag(disseminate_info) + `
                    </cite>
                </article>
                `
            });

            $("#list_div").html(list_str);
            $("#Total_Count").html('共' + disseminate_list.total + '則');
            $(document).prop("title", sysconfig[1].setvalue + " - 環境資訊 - " + disseminate_class_str);
        }
    });

    //搜尋列表
    $(document).on("click", "#search_btn", function () {
        window.location.href = encodeURI("?keywords=" + $("#keywords").val() + "&_dClass=" + $("#_dClass").val());
    });

    //第一頁
    $(document).on("click", "#first_page", function () {
        var page = parseInt($("#page").val());
        var search_param = "";
        search_param += ($("#_dClass").val() != "") ? "&_dClass=" + encodeURIComponent($("#_dClass").val()) : "";

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
        search_param += ($("#_dClass").val() != "") ? "&_dClass=" + encodeURIComponent($("#_dClass").val()) : "";

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
        search_param += ($("#_dClass").val() != "") ? "&_dClass=" + encodeURIComponent($("#_dClass").val()) : "";

        window.location.href = encodeURI("?page=" + page + "&keywords=" + keywords + search_param);
    });

    //下一頁
    $(document).on("click", "#next_page", function () {
        var page = parseInt($("#page").val());
        var search_param = "";
        search_param += ($("#_dClass").val() != "") ? "&_dClass=" + encodeURIComponent($("#_dClass").val()) : "";

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
        search_param += ($("#_dClass").val() != "") ? "&_dClass=" + encodeURIComponent($("#_dClass").val()) : "";

        if (page == last_page) {
            alert($.i18n("common_is_last_page"));
        } else {
            window.location.href = encodeURI("?page=" + last_page + "&keywords=" + keywords + search_param);
        }
    });
});

