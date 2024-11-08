function AQI(val) {
    if (val >= 0 && val <= 50) return '1';
    if (val >= 51 && val <= 100) return '2';
    if (val >= 101 && val <= 150) return '3';
    if (val >= 151 && val <= 200) return '4';
    if (val >= 201 && val <= 300) return '5';
    if (val >= 301 && val <= 500) return '6';
    return '4';
}


function func(id, item) {
    /* var aqi = AQI(item['AQI']);
    var tdAQI = $('#AQI' + id);
    tdAQI.prop('class', '');
    tdAQI.addClass('AQI' + aqi); */

    $('#AQI_' + id).html(item['aqi']);
    $('#O3_' + id).html(item['o3']);
    $('#PM25_' + id).html(item['pm2.5']);
    $('#PM10_' + id).html(item['pm10']);
    $('#AQIstatus_' + id).html(item['status']);
    $('#StatusTime').html("更新時間：" + item['publishtime']);
}


$.ajax({
    url: 'https://data.epa.gov.tw/api/v2/aqx_p_432?format=json&limit=5&api_key=c79d9760-f1a3-49af-9353-9ef15ca29ef2&filters=County,EQ,%E8%8B%97%E6%A0%97%E7%B8%A3',
    data: {},
    type: 'GET',
    crossDomain: true,
    dataType: 'json',
    success: function (rsp) {
        var datas = rsp;
        /* if (datas.success == false) {
            return;
        } else {
            $.each(datas.records, function (i, item) {
                if (item.County === '苗栗縣') {
                    if (item.SiteName === '苗栗') {
                        func(1, item);
                    }
                    if (item.SiteName === '頭份') {
                        func(2, item);
                    }
                    if (item.SiteName === '三義') {
                        func(3, item);
                    }
                }
            });
        } */
        if (datas.include_total == false) {
            return;
        } else {
            $.each(datas.records, function (i, item) {
                if (item.county === '苗栗縣') {
                    if (item.sitename === '苗栗') {
                        func(1, item);
                    }
                    if (item.sitename === '頭份') {
                        func(2, item);
                    }
                    if (item.sitename === '三義') {
                        func(3, item);
                    }
                }
            });
        }
    },
    error: function () {
        //alert('Failed!');
        console.log("空氣品質API連線失敗！");
    }
});