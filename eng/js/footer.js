$(document).ready(function () {

});

//載入版尾設定
function ShowFooter(sysconfig, navigation) {
    $.getScript("js/web-js.js");

    var aboutus_option = navigation.aboutus_option;
    var affairs_option = navigation.affairs_option;
    var news_class = navigation.news_class;
    var news_class_option = navigation.news_class_option;
    var downloadfile_class = navigation.downloadfile_class;
    var downloadfile_class_option = navigation.downloadfile_class_option;
    var qa_class = navigation.qa_class;
    var qa_class_option = navigation.qa_class_option;
    var disseminate_class = navigation.disseminate_class;
    var disseminate_class_option = navigation.disseminate_class_option;
    var openinfo_class = navigation.openinfo_class;
    var openinfo_class_option = navigation.openinfo_class_option;
    var links_class = navigation.links_class;
    var links_class_option = navigation.links_class_option;

    let FooterContent = `
        <footer class="patFooter">
            <div class="patFooter-dec">
                <img src="images/ele-footerBg-01.svg" alt="">
            </div>
            <div class="patFooter-openBtBk">
            <button class="patFooter-openBt js-patFooter-openBt">
                <img src="images/icon-arrowBt--top--gray.svg" alt="" class="patFooter-openBt--icon js-patFooter-openBt--icon">
                <div class="patFooter-openBt--text js-patFooter-openBt--text">closed</div>
            </button>
            </div>
            <div class="patFooterArea js-patFooter-linkBk">
                <!-- 展開區 -->
                <div class="patFooter-leftBk">
                    <a href="index.html" class="patFooter-leftBk--logo" title="go to ` + sysconfig[19].setvalue + ` index" aria-label="go to ` + sysconfig[19].setvalue + ` index">
                        <img src="images/footer-logo.svg" alt="Miaoli County Environmental Protection Bureau LOGO">
                    </a>
                    <p class="typo-gray">
                        356 No. 95, Gaotie 1st Road, Houlong Town, Miaoli County
                        <br />
                        037-558-558
                    </p>
                    <br />
                    <br />
                    <a href="https://accessibility.moda.gov.tw/Applications/Detail?category=20231107113536" class="patFooter-leftBk--label" title="accessible interface">
                        <img src="images/aplus.png" border="0" width="120" height="auto" alt="conformance level AA" />
                    </a>
                </div>

                <div class="patFooter-linkBk">
                    <!-- 本局介紹 -->
                    <div class="patFooter-linkBk--section">
                        <p class="patFooter-linkBk--tit">
                            About us
                        </p>
                        `;
                        var aboutus_id = $.UrlParam("aboutus_id");
                        $.each(aboutus_option, function (key, values) {
                            var aboutus_ss = (aboutus_id == values[0]) ? "patFooter-linkBk--li--link--active" : "";

                            FooterContent += `
                            <li class="patFooter-linkBk--li"><a href="about.html?aboutus_id=` + values[0] + `" class="patFooter-linkBk--li--link js-footer-tabno ` + aboutus_ss + `" title="` + values[1] + `">` + values[1] + `</a></li>
                            `;
                        });
                        FooterContent += `
                    </div>
                    <!-- 環保業務 -->
                    <div class="patFooter-linkBk--section">
                        <p class="patFooter-linkBk--tit">
                            Environmental business
                        </p>
                        `;
                        var affairs_id = $.UrlParam("affairs_id");
                        $.each(affairs_option, function (key, values) {
                            var affairs_ss = (affairs_id == values[0]) ? "patFooter-linkBk--li--link--active" : "";

                            FooterContent += `
                            <li class="patFooter-linkBk--li"><a href="business.html?affairs_id=` + values[0] + `" class="patFooter-linkBk--li--link js-footer-tabno ` + affairs_ss + `" title="` + values[1] + `">` + values[1] + `</a></li>
                            `;
                        });
                        FooterContent += `
                    </div>
                    <!-- 最新消息 -->
                    <div class="patFooter-linkBk--section">
                        <p class="patFooter-linkBk--tit">
                            Latest news
                        </p>
                        `;
                        var _nClass = $.UrlParam("_nClass");
                        $.each(news_class_option, function (key, values) {
                            var class_ss = (_nClass == values[0]) ? "patFooter-linkBk--li--link--active" : "";

                            FooterContent += `
                            <li class="patFooter-linkBk--li"><a href="newsli.html?_nClass=` + values[0] + `" class="patFooter-linkBk--li--link js-footer-tabno ` + class_ss + `" title="` + values[1] + `">` + values[1] + `</a></li>
                            `;
                        });
                        FooterContent += `
                    </div>
                    `

                    var contact_ss = (location.pathname == "/contact.html") ? "patnavSecondArea-link--active" : "";
                    var howtogo_ss = (location.pathname == "/howtogo.html") ? "patnavSecondArea-link--active" : "";
                    var acc_ss = (location.pathname == "/acc.html") ? "patnavSecondArea-link--active" : "";

                    FooterContent += `
                    <!-- 機關資訊 -->
                    <div class="patFooter-linkBk--section">
                        <p class="patFooter-linkBk--tit">
                            Agency information
                        </p>
                        <!-- <li class="patFooter-linkBk--li"><a href="contact.html" class="patFooter-linkBk--li--link js-footer-tabno ` + contact_ss + `" title="contact us">contact us</a></li>
                        <li class="patFooter-linkBk--li"><a href="howtogo.html" class="patFooter-linkBk--li--link js-footer-tabno" ` + howtogo_ss + ` title="traffic information">traffic information</a></li>
                        <li class="patFooter-linkBk--li"><a href="acc.html" class="patFooter-linkBk--li--link js-footer-tabno" ` + acc_ss + ` title="Sitemap">Sitemap</a></li> -->
                        <li class="patFooter-linkBk--li"><a href="https://www.epa.gov.tw/ENG/" class="patFooter-linkBk--li--link js-footer-tabno" title="Open in a new windowHyperlink" target="_blank">Executive Yuan Environmental Protection AgencyExecutive Yuan Environmental Protection Agency</a></li>
                        <li class="patFooter-linkBk--li"><a href="../" class="patFooter-linkBk--li--link js-footer-tabno" title="中文版網站">中文版網站</a></li>
                        <li class="patFooter-linkBk--li mt-10">
                            <a href="` + sysconfig[17].setvalue + `" class="patFooter-linkBk--li--link js-footer-tabno" title="Open in a new windowHyperlink" target="_blank">
                                <img src="images/icon-fb.svg"  alt=" Miaoli County Environmental Protection Department Facebook Page">
                            </a>
                        </li>
                    </div>
                </div>
            </div>
            <div class="patFooter-secLinkBk">
                <p class="patFooter-secLinkBk--des">
                    Copyright © 2023 Environmental Protection Bureau　
                    Miaoli County Government Environmental Protection Bureau Copyright
                </p>
            </div>
        </footer>

    `

    $(".jsFooter").html(FooterContent);
}
