/**
 * Created by zhaochengju on 17/1/14.
 */
$(document).ready(function () {
    var goPage = function (type, ordersNo, area) {
        if (area) {
            window.parent.location.href = 'http://sh.ikongjian.com/reservation/reservationSucceed/' + type + '/' + ordersNo + '?area=' + area;
        } else {
            window.parent.location.href = 'http://sh.ikongjian.com/reservation/reservationSucceed/' + type + '/' + ordersNo;
        }
    }
    
    var goPageNew = function (type, ordersNo, area) {
    	$.ajax({
            url: "/reservation/reservationSucceedNew/" + type + "/" + ordersNo + (area ? ("?area=" + area) : ""),
            type: "post",
            dataType: "json",
            async: false,
            cache: false,
            success: function (data) {
            	if(!isNaN(data)){
            		offerOk(data);
            	}
            	return data;
            }
        })
    }

    var reservation = function (userName, mobile, fun, type, area) {
        if (userName == null || userName == '') {
            return '用户名不能为空';
        }
        if (mobile == null || mobile == '') {
            return '手机号不能为空';
        }
        var mobeilReg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (!mobeilReg.test(mobile)) {
            return '手机号格式不正确';
        }
        var msg = '';
        $.ajax({
            url: "/reservation/addReservation",
            type: "post",
            dataType: "json",
            async: false,
            cache: false,
            data: {
                userName: userName,
                mobile: mobile,
                type: type
            },
            success: function (data) {
                if (data && (data.result == 0)) {
                    fun();
                    
                    //装修报价弹出框
                    if(type == 2){
                    	return goPageNew(type, data.ordersNo, area);
                    }
                    /*setTimeout(function () {
                        goPage(type, data.ordersNo, area);
                    }, 1000);*/
                    msg = data.msg;
                } else {
                    msg = data.msg;
                }
            }
        })
        return msg;
    }

    $.extend({
        reservation: function (userName, mobile, fun) {
            return reservation(userName, mobile, fun, 0);
        },
        decorateDesign: function (userName, mobile, fun) {
            return reservation(userName, mobile, fun, 1);
        },
        decorateCost: function (userName, mobile, area, fun) {
            return reservation(userName, mobile, fun, 2, area);
        }
    })
})