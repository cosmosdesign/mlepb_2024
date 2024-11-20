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
                <div class="patFooter-openBt--text js-patFooter-openBt--text">關閉</div>
            </button>
            </div>
            <div class="patFooterArea js-patFooter-linkBk">
                <!-- 展開區 -->
                <div class="patFooter-leftBk">
                    <a href="index.html" class="patFooter-leftBk--logo" title="回` + sysconfig[1].setvalue + `首頁" aria-label="回` + sysconfig[1].setvalue + `首頁">
                        <img src="images/footer-logo.svg" alt="苗栗縣政府環境保護局全球資訊網LOGO">
                    </a>
                    <p class="typo-gray">
                        356 苗栗縣後龍鎮高鐵一路95號
                        <br />
                        037-558-558
                    </p>
                    <br />
                    <br />
                   
                    <a href="https://accessibility.moda.gov.tw/Applications/Detail?category=20231107113536" class="patFooter-leftBk--label" title="無障礙網站">
                        <img src="images/aplus.png" border="0" width="120" height="auto" alt="通過AA無障礙網頁檢測" />
                    </a>
                </div>

                <div class="patFooter-linkBk">
                    <!-- 本局介紹 -->
                    <div class="patFooter-linkBk--section">
                        <p class="patFooter-linkBk--tit">
                            本局介紹
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
                            環保業務
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
                            最新消息
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
                    <!-- 便民服務 -->
                    <div class="patFooter-linkBk--section">
                        <p class="patFooter-linkBk--tit">
                            便民服務
                        </p>
                        `;
                        var _dfClass = $.UrlParam("_dfClass");
                        $.each(downloadfile_class_option, function (key, values) {
                            var class_ss = (_dfClass == values[0]) ? "patFooter-linkBk--li--link--active" : "";

                            FooterContent += `
                            <li class="patFooter-linkBk--li"><a href="downloadli.html?_dfClass=` + values[0] + `" class="patFooter-linkBk--li--link js-footer-tabno ` + class_ss + `" title="` + values[1] + `">` + values[1] + `</a></li>
                            `;
                        });
                        FooterContent += `
                    </div>
                    <!-- Q&A -->
                    <!-- <div class="patFooter-linkBk--section">
                        <p class="patFooter-linkBk--tit">
                            Q&A
                        </p>
                        `;
                        var _qaClass = $.UrlParam("_qaClass");
                        $.each(qa_class_option, function (key, values) {
                            var class_ss = (_qaClass == values[0]) ? "patFooter-linkBk--li--link--active" : "";

                            FooterContent += `
                            <li class="patFooter-linkBk--li"><a href="qali.html?_qaClass=` + values[0] + `" class="patFooter-linkBk--li--link js-footer-tabno ` + class_ss + `" title="` + values[1] + `">` + values[1] + `</a></li>
                            `;
                        });
                        FooterContent += `
                    </div> -->
                    <!-- 宣導專區 -->
                    <div class="patFooter-linkBk--section">
                        <p class="patFooter-linkBk--tit">
                            環境資訊
                        </p>
                        `;
                        var _dClass = $.UrlParam("_dClass");
                        $.each(disseminate_class_option, function (key, values) {
                            var class_ss = (_dClass == values[0]) ? "patFooter-linkBk--li--link--active" : "";

                            FooterContent += `
                            <li class="patFooter-linkBk--li"><a href="propagandali.html?_dClass=` + values[0] + `" class="patFooter-linkBk--li--link js-footer-tabno ` + class_ss + `" title="` + values[1] + `">` + values[1] + `</a></li>
                            `;
                        });
                        FooterContent += `
                    </div>
                    <!-- 政府資訊公開 -->
                    <div class="patFooter-linkBk--section">
                        <p class="patFooter-linkBk--tit">
                            政府資訊公開
                        </p>
                        `;
                        var _oClass = $.UrlParam("_oClass");
                        $.each(openinfo_class_option, function (key, values) {
                            var class_ss = (_oClass == values[0]) ? "patFooter-linkBk--li--link--active" : "";

                            FooterContent += `
                            <li class="patFooter-linkBk--li"><a href="opennessli.html?_oClass=` + values[0] + `" class="patFooter-linkBk--li--link js-footer-tabno ` + class_ss + `" title="` + values[1] + `">` + values[1] + `</a></li>
                            `;
                        });
                        FooterContent += `
                    </div>
                    <!-- 重要連結 -->
                    <div class="patFooter-linkBk--section">
                        <p class="patFooter-linkBk--tit">
                            重要連結
                        </p>
                        `;
                        var _lClass = $.UrlParam("_lClass");
                        $.each(links_class_option, function (key, values) {
                            var class_ss = (_lClass == values[0]) ? "patFooter-linkBk--li--link--active" : "";

                            FooterContent += `
                            <li class="patFooter-linkBk--li"><a href="linksli.html?_lClass=` + values[0] + `" class="patFooter-linkBk--li--link js-footer-tabno ` + class_ss + `" title="` + values[1] + `">` + values[1] + `</a></li>
                            `;
                        });

                        var contact_ss = (location.pathname == "/contact.html") ? "patnavSecondArea-link--active" : "";
                        var howtogo_ss = (location.pathname == "/howtogo.html") ? "patnavSecondArea-link--active" : "";
                        var acc_ss = (location.pathname == "/acc.html") ? "patnavSecondArea-link--active" : "";
                        FooterContent += `
                    </div>
                    <!-- 機關資訊 -->
                    <div class="patFooter-linkBk--section">
                        <p class="patFooter-linkBk--tit">
                            機關資訊
                        </p>
                        <li class="patFooter-linkBk--li"><a href="contact.html" class="patFooter-linkBk--li--link js-footer-tabno ` + contact_ss + `" title="聯絡我們">聯絡我們</a></li>
                        <li class="patFooter-linkBk--li"><a href="howtogo.html" class="patFooter-linkBk--li--link js-footer-tabno" ` + howtogo_ss + ` title="交通資訊">交通資訊</a></li>
                        <li class="patFooter-linkBk--li"><a href="acc.html" class="patFooter-linkBk--li--link js-footer-tabno" ` + acc_ss + ` title="網站導覽">網站導覽</a></li>
                        <li class="patFooter-linkBk--li"><a href="javascript:alert('網站更新中，敬請期待！');" class="patFooter-linkBk--li--link js-footer-tabno" title="英文版網站">英文版網站</a></li>
                        <li class="patFooter-linkBk--li mt-10">
                            <a href="` + sysconfig[17].setvalue + `" class="patFooter-linkBk--li--link js-footer-tabno" title="開新視窗超連結" target="_blank">
                            <img src="images/icon-fb.svg" alt="苗栗縣環境保護局facebook粉絲團">
                            </a>
                        </li>
                    </div>
                </div>
            </div>
            <div class="patFooter-secLinkBk">
                <p class="patFooter-secLinkBk--des">
                    Copyright © 2023 Environmental Protection Bureau　
                    苗栗縣政府環境保護局版權所有
                </p>
                <div class="patFooter-secLinkBk--linkBk">
                    <a href="security.html" class="patFooter-secLinkBk--link" title="資訊安全政策">
                        資訊安全政策 ｜
                    </a>
                    <a href="privacy.html" class="patFooter-secLinkBk--link" title="隱私權保護政策">
                        隱私權保護政策｜
                    </a>
                    <a href="opendata.html" class="patFooter-secLinkBk--link" title="政府網站資料開放宣告">
                        政府網站資料開放宣告
                    </a>

                </div>
            </div>
        </footer>

    `

    $(".jsFooter").html(FooterContent);
}
