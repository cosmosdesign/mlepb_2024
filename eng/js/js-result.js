/*result.html js*/
$(document).ready(function() {
    $.ajax({
        url: CONFIG["Api_Domain_Path"] + "indexe",
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
            var news_list = response.news_list;
            var links_list = response.links_list;

            //產生全域導覽資料
            LoadSysConfig(sysconfig);
            ShowNavigation(sysconfig, navigation);
            ShowFooter(sysconfig, navigation);

        }
    });
});

