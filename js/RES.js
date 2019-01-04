/**
 * 预约浮层
 * @author zhaochengju
 * @type {{}}
 */

//框架
var fixePop = $('<div/>').css({
    'position': 'fixed',
    'width': '100%',
    'height': '100%',
    'top': '0',
    'left': '0',
    'background': 'rgba(0,0,0,.5)',
    'z-index': '99'
}).addClass('fixePop');
//框架关闭 --暂时不启用
var fixeEsc = $('<div/>').css({
    'position': 'fixed',
    'width': '100%',
    'height': '100%',
    'left': '0',
    'top': '0'
});
//框架内容
var fixeNei = $('<div/>').css({
    'position': 'relative',
    'margin': '0 auto',
    'background': '#fff',
    'border-radius': '6px',
    'width': '610px',
    'top': '30%',
    'min-height': '20px',
    'z-index': '1'
});
//框架内容图片关闭 - 黄色
var fixeImg = $('<img/>').css({
    'position': 'absolute',
    'cursor': 'pointer',
    'top': '-17px',
    'right': '-20px',
    'z-index': '1'
}).attr({
    'src': '../img/fixe_new/fixe_esc.png'/*tpa=http://sh.ikongjian.com/assets/2017pc/img/fixe_new/fixe_esc.png*/,
    'onclick': 'fixeShut($(this))'
});
//框架内容图片关闭 - 灰白色
var fixeImg1 = $('<img/>').css({
    'position': 'absolute',
    'cursor': 'pointer',
    'top': '-17px',
    'right': '-20px',
    'z-index': '1'
}).attr({
    'src': '../img/fixe_new/fixe_esc1.png'/*tpa=http://sh.ikongjian.com/assets/2017pc/img/fixe_new/fixe_esc1.png*/,
    'onclick': 'fixeShut($(this))'
});


var RES = {
    offer: function () {
        //报价头部
        var offerTop = $('<div/>').css({
            'position': 'relative',
            'height': '80px',
            'background': '#fdaa32',
            'border-radius': '6px 6px 0 0',
            'text-align': 'center',
            'color': '#fff'
        }).append(
            $('<p/>').css({
                'font-size': '28px',
                'line-height': '28px',
                'padding': '18px 0 8px'
            }).text('免费报价'),
            $('<span/>').css('line-height', '14px').html('已有 190104 位业主获取了装修报价'),
            $('<img/>').css({
                'position': 'absolute',
                'top': '0',
                'left': '77px'
            }).attr('src', '../img/fixe_new/fixe_head.png'/*tpa=http://sh.ikongjian.com/assets/2017pc/img/fixe_new/fixe_head.png*/)
        );
        //报价Input
        var offerInput = $('<div/>').css({
            'width': '383px',
            'margin': '0 auto',
            'padding': '40px 0'
        }).append(
            //每一项填写
            $('<p/>').css({
                'overflow': 'hidden',
                'position': 'relative',
                'height': '50px',
                'line-height': '50px',
                'margin-bottom': '10px',
                'z-index': '1'
            }).append(
                $('<span/>').text('房屋面积'),
                $('<i/>').css({
                    'position': 'absolute',
                    'font-style': 'normal',
                    'height': '50px',
                    'line-height': '50px',
                    'display': 'block',
                    'top': '0',
                    'right': '18px'
                }).text('㎡'),
                $('<input/>').prop('id', 'resArea').css({
                    'display': 'block',
                    'height': '50px',
                    'width': '310px',
                    'float': 'right',
                    'border': 'none',
                    'background': '#e7e7e7',
                    'border-radius': '4px',
                    'padding': '0 50px 0 25px'
                }).attr({
                    'type': 'text',
                    'placeholder': '请输入您房屋的面积'
                })
            ),
            //每一项填写
            $('<p/>').css({
                'overflow': 'hidden',
                'position': 'relative',
                'height': '50px',
                'line-height': '50px',
                'margin-bottom': '10px',
                'z-index': '1'
            }).append(
                $('<span/>').text('您的称呼'),
                $('<input/>').prop('id', 'resUserName').css({
                    'display': 'block',
                    'height': '50px',
                    'width': '310px',
                    'float': 'right',
                    'border': 'none',
                    'background': '#e7e7e7',
                    'border-radius': '4px',
                    'padding': '0 25px'
                }).attr({
                    'type': 'text',
                    'placeholder': '请输入您的称呼'
                })
            ),
            //每一项填写
            $('<p/>').css({
                'overflow': 'hidden',
                'position': 'relative',
                'height': '50px',
                'line-height': '50px',
                'margin-bottom': '10px',
                'z-index': '1'
            }).append(
                $('<span/>').text('您的电话'),
                $('<input/>').prop('id', 'resMobile').css({
                    'display': 'block',
                    'height': '50px',
                    'width': '310px',
                    'float': 'right',
                    'border': 'none',
                    'background': '#e7e7e7',
                    'border-radius': '4px',
                    'padding': '0 25px',
                }).attr({
                    'type': 'text',
                    'placeholder': '请输入您的手机号码'
                })
            ),
            //错误提示 - 不hide标签，清空内容
            $('<i/>').addClass('resError').css({
                'color': 'red',
                'width': '100%',
                'display': 'block',
                'font-size': '12px',
                'margin-bottom': '12px',
                'height': '12px',
                'line-height': '12px;',
                'padding-left': '73px',
                'text-align': 'center',
                'font-style': 'normal'
            }).text(''),
            //提交按钮
            $('<p/>').css({
                'overflow': 'hidden',
                'position': 'relative',
                'height': '50px',
                'line-height': '50px',
                'margin-bottom': '10px',
                'z-index': '1'
            }).append(
                $('<span/>').text(''),
                $('<input/>').addClass('aboutJs_button').css({
                    'display': 'block',
                    'height': '50px',
                    'width': '310px',
                    'float': 'right',
                    'border': 'none',
                    'background': '#fdaa32',
                    'border-radius': '4px',
                    'padding': '0 25px',
                    'font-size': '18px',
                    'color': '#fff',
                    'cursor': 'pointer'
                }).attr({
                    'type': 'button',
                    'value': '获取报价'
                }).hover(function () {
                    $(this).css('background', '#fea21c')
                }, function () {
                    $(this).css('background', '#fdaa32')
                }).click(function () {
                    var msg = RES.reservation2($('#resUserName').val(), $('#resMobile').val(), $('#resArea').val());

                    if (msg != "") {
                        $('.resError').text(msg);
                    }
                })
            )
        );
        //添加到body
        $('body').append(
            //框
            fixePop.append(
                //空白处关闭
                fixeEsc,
                //内容框
                fixeNei.html('').append(
                    //关闭
                    fixeImg1,
                    //头部
                    offerTop,
                    //表单
                    offerInput
                )
            )
        )
    },
    order: function () {
        var offerTop = $('<div/>').css({
            'position': 'relative',
            'height': '80px',
            'background': '#fdaa32',
            'border-radius': '6px 6px 0 0',
            'text-align': 'center',
            'color': '#fff'
        }).append(
            $('<p/>').css({
                'font-size': '28px',
                'line-height': '28px',
                'padding': '18px 0 8px'
            }).text('预约参观'),
            $('<span/>').css('line-height', '14px').html('预约参观家装新风尚 品质生活触手可得'),
            $('<img/>').css({
                'position': 'absolute',
                'top': '0',
                'left': '77px'
            }).attr('src', '../img/fixe_new/fixe_head.png'/*tpa=http://sh.ikongjian.com/assets/2017pc/img/fixe_new/fixe_head.png*/)
        );
        //预约Input
        var offerInput = $('<div/>').css({
            'width': '383px',
            'margin': '0 auto',
            'padding': '40px 0'
        }).append(
            //每一项填写
            $('<p/>').css({
                'overflow': 'hidden',
                'position': 'relative',
                'height': '50px',
                'line-height': '50px',
                'margin-bottom': '10px',
                'z-index': '1'
            }).append(
                $('<span/>').text('您的称呼'),
                $('<input/>').prop('id', 'resUserName').css({
                    'display': 'block',
                    'height': '50px',
                    'width': '310px',
                    'float': 'right',
                    'border': 'none',
                    'background': '#e7e7e7',
                    'border-radius': '4px',
                    'padding': '0 25px'
                }).attr({
                    'type': 'text',
                    'placeholder': '请输入您的称呼'
                })
            ),
            //每一项填写
            $('<p/>').css({
                'overflow': 'hidden',
                'position': 'relative',
                'height': '50px',
                'line-height': '50px',
                'margin-bottom': '10px',
                'z-index': '1'
            }).append(
                $('<span/>').text('您的电话'),
                $('<input/>').prop('id', 'resMobile').css({
                    'display': 'block',
                    'height': '50px',
                    'width': '310px',
                    'float': 'right',
                    'border': 'none',
                    'background': '#e7e7e7',
                    'border-radius': '4px',
                    'padding': '0 25px',
                }).attr({
                    'type': 'text',
                    'placeholder': '请输入您的手机号码'
                })
            ),
            //错误提示 - 不hide标签，清空内容
            $('<i/>').addClass('resError').css({
                'color': 'red',
                'width': '100%',
                'display': 'block',
                'font-size': '12px',
                'margin-bottom': '12px',
                'height': '12px',
                'line-height': '12px;',
                'padding-left': '73px',
                'text-align': 'center',
                'font-style': 'normal'
            }).text(''),
            //提交按钮
            $('<p/>').css({
                'overflow': 'hidden',
                'position': 'relative',
                'height': '50px',
                'line-height': '50px',
                'margin-bottom': '10px',
                'z-index': '1'
            }).append(
                $('<span/>').text(''),
                $('<input/>').addClass('aboutJs_button').css({
                    'display': 'block',
                    'height': '50px',
                    'width': '310px',
                    'float': 'right',
                    'border': 'none',
                    'background': '#fdaa32',
                    'border-radius': '4px',
                    'padding': '0 25px',
                    'font-size': '18px',
                    'color': '#fff',
                    'cursor': 'pointer'
                }).attr({
                    'type': 'button',
                    'value': '立即预约'
                }).hover(function () {
                    $(this).css('background', '#fea21c')
                }, function () {
                    $(this).css('background', '#fdaa32')
                }).click(function () {
                    var msg = RES.reservation($('#resUserName').val(), $('#resMobile').val());

                    if (msg.indexOf("预约成功") >= 0) {
                        aboutOk();
                    } else {
                        $('.resError').text(msg);
                    }
                })
            )
        );
        //添加到body
        $('body').append(
            //框
            fixePop.append(
                //空白处关闭
                fixeEsc,
                //内容框
                fixeNei.html('').append(
                    //关闭
                    fixeImg1,
                    //头部
                    offerTop,
                    //表单
                    offerInput
                )
            )
        )
    },
    reservation: function (userName, mobile) {
        return $.reservation(userName, mobile, function () {
        	setTimeout(function () {
        		ga('send', 'event', '浮层预约成功', 'Click');
        	}, 1000);
            _paq.push(['trackEvent', 'Clicked', '预约按钮统计', '浮层预约']);
        })
    },
    reservation2: function (userName, mobile, area) {
        if (area == null || area == '') {
            return '面积不能为空';
        }
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
        var msg = "";
        $(this).initCaptcha(function () {
            $('.resError').text($.decorateCost(userName, mobile, area, function () {
            	setTimeout(function () {
            		ga('send', 'event', '浮层预约成功', 'Click');
            	}, 1000);
                _paq.push(['trackEvent', 'Clicked', '预约按钮统计', '浮层预约']);
            }));
        })
        return msg;
    }
}

//装修报价弹窗
function offerOk(number) {
    //报价钱数
    var offerOkRmb = $('<div/>').css('position', 'relative').append(
        //图片
        $('<img/>').css('vertical-align', 'top').attr('src', '../img/fixe_new/offer.png'/*tpa=http://sh.ikongjian.com/assets/2017pc/img/fixe_new/offer.png*/),
        //内容
        $('<p/>').css({
            'position': 'absolute',
            'top': '76px',
            'left': '70px',
            'color': '#fff'
        }).append(
            //文字提示
            $('<span/>').css({
                'display': 'block',
                'line-height': '18px',
                'font-size': '16px',
                'margin-bottom': '4px'
            }).text('您的装修费用约为'),
            //价格
            $('<em/>').css({
                'display': 'block',
                'font-style': 'normal',
                'font-size': '55px',
                'font-family': 'arial',
                'line-height': '58px'
            }).html(number + '<sub style="font-size: 16px; vertical-align: 0px;">元</sub>')
        ),
        //提示语 - 爱空间与您联系
        $('<h6/>').css({
            'position': 'absolute',
            'width': '100%',
            'bottom': '68px',
            'font-weight': 'normal',
            'text-align': 'center',
            'font-size': '24px',
            'line-height': '26px',
            'color': '#fff'
        }).text('稍后爱空间的家装顾问会与您进一步沟通，请注意接听来电。')
    );
    //添加到body
    $('body').append(
        //框
        fixePop.append(
            //空白处关闭
            fixeEsc,
            //内容框
            fixeNei.css({
                'width': '770px',
            }).html('').append(
                //关闭
                fixeImg1,
                //报价钱数
                offerOkRmb
            )
        )
    )
};

//预约成功弹窗
function aboutOk(text,tureOrFalse) {
    //预约成功
	var text; //提示语
    var returnInfo = tureOrFalse;  //默认true提示成功，false提示失败
    var aboutOkRmb = $('<div/>').css({
        'position': 'relative',
        'background': '#fff',
        'text-align':"center",
        'font-size':'24px',
        'color':'#fff',
        'border-radius':'5px 5px 0 0'
    });
    var p = $('<p/>').css({
        "position":"absolute",
        "top":"257px",
        "left":"0",
        "width":'100%'
    });
    var img = $('<img/>').css({
        'vertical-align':'top',
        'border-radius':'5px 5px 0 0'
    });

    if(text) {
        img.attr('src', '../img/fixe_new/about.jpg'/*tpa=http://sh.ikongjian.com/assets/2017pc/img/fixe_new/about.jpg*/);
        if(returnInfo == false){
            img.attr('src', '../img/fixe_new/fail.jpg'/*tpa=http://sh.ikongjian.com/assets/2017pc/img/fixe_new/fail.jpg*/);
        };
        console.log(returnInfo);
        aboutOkRmb.append(p.html(text),img);
    }else{
        img.attr('src', '../img/fixe_new/about.jpg'/*tpa=http://sh.ikongjian.com/assets/2017pc/img/fixe_new/about.jpg*/);
        aboutOkRmb.append(p.html('稍后爱空间的家装顾问会与您进一步沟通，请注意接听来电'),img);
    };
    //提示语 - 爱空间与您联系
    var aboutOkPrompt = $('<div/>').css({
        'overflow': 'hidden',
        'width': '670px',
        'margin': '30px auto 0',
        'border-top': '1px solid #e9e9e9',
        'padding': '25px 0 35px'
    }).append( 
        //图左
        $('<a/>').attr('href', 'https://detail.tmall.com/item.htm?spm=a220z.1000880.0.0.rXBUrD&id=529400777500&skuId=3153352142393').attr('target', '_blank').css({
            'display': 'block',
            'float': 'left',
            'margin-right': '31px'
        }).append(
            $('<img/>').attr('src', '../img/fixe_new/ad_2.png.jpg'/*tpa=http://sh.ikongjian.com/assets/2017pc/img/fixe_new/ad_2.png*/)
        ),
        //图右
        $('<a/>').attr('href', '#').css({
            'display': 'block',
            'float': 'left',
        }).append(
            $('<img/>').attr('src', '../img/fixe_new/ad_3_new.gif'/*tpa=http://sh.ikongjian.com/assets/2017pc/img/fixe_new/ad_3_new.gif*/)
        )
    );
    //添加到body
    $('body').append(
        //框
        fixePop.append(
            //空白处关闭
            fixeEsc,
            //内容框
            fixeNei.css({
                'width': '770px',
                'top': '15%'
            }).html('').append(
                //关闭
                fixeImg1,
                //图片
                aboutOkRmb,
                //提示语言
                aboutOkPrompt
            )
        )
    )
};

//文字鼠标经过
function fixeHover(me) {
    me.css('color', '#ec6c00').mouseout(function () {
        me.css('color', '#555');
    })
};

//关闭弹窗
function fixeShut(me) {
    $('.fixePop').remove();
    fixeNei.css({
        'position': 'relative',
        'margin': '0 auto',
        'background': '#fff',
        'border-radius': '6px',
        'width': '610px',
        'top': '30%',
        'min-height': '20px',
        'z-index': '1'
    });
};