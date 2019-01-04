// Js Tab - 张思学
function set(name,cursel,n){
	  for(i=1;i<=n;i++){
	  var menu=document.getElementById(name+i);
	  var con=document.getElementById(name+"_"+i);
	  menu.className=i==cursel?"hover":"";
	  con.style.display=i==cursel?"block":"none";
	} 
  }
function showList(id,num){
	if(num == 1){
		document.getElementById(id).style.display = "block";
	}
	else{
		document.getElementById(id).style.display = "none";
	}
} 

//JS 模拟下拉 - 张思学
function select(me){
    me.parent('.select').find('ul').stop().slideToggle(500,function(){
        me.next('ul').find('li').click(function(){
            me.text($(this).text()).next('ul').hide();
        })
    })
}

//JS 评论 - 张思学
function reply(me){
    var //获取宽度
        width = me.parents('li').width(),
        //判断是否存在评论
        num = me.attr('click'),
        //评论div
        div =$('<div/>').addClass('starWordPl'),
        //评论textarea
        textarea = $('<textarea/>').attr('placeholder','我有意见'),
        //提交input
        input = $('<input/>').addClass('starPlClick').attr({'type':'button','value':'回复'});
    if(num == 0){
        me.attr('click','1');
        //添加至位置
        me.parents('.reply').append(
            //div
            div.css('width',width - 60 ).append(
                //评论
                textarea,
                //提交按钮
                input.click(function(){
                    me.attr('click','0');
                    $(this).parent('.starWordPl').remove();
                })
            )
        );
        
    }else{
        me.attr('click','0');
        me.parents('.reply').find('.starWordPl').remove();
    }
}

//JS 单选 - 张思学
function radio(me){
    var name = me.prev('input[type=radio]').attr('name');
    me.siblings().removeAttr('checked','checked').removeClass('hover');
    me.addClass('hover').prev('input[name='+name+']').attr('checked','checked');
    //城市切换
    if(me.parent('div').hasClass('cityTabDiv')){
        me.siblings().removeClass('hover');
        me.addClass('hover');
    }
}

//JS 多选 - 张思学
function box(me){
    console.log('a')
    var name = me.prev('input[type=checkbox]').attr('name'),
        checkbox = me.prev('input[type=checkbox]').attr('checked');
    if(checkbox == undefined){
        me.addClass('hover').prev('input[name='+name+']').attr('checked','checked');
    }else{
        me.removeClass('hover').prev('input[name='+name+']').removeAttr('checked');
    }
}

//指定位置变悬浮 - 张思学
function menuFixed(id) {
    var obj = document.getElementById(id);
    var _getHeight = obj.offsetTop;
    window.onscroll = function () {
        changePos(id, _getHeight);
    }
}
function changePos(id, height) {
    var obj = document.getElementById(id);
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop < height) {
        obj.style.position = 'relative';
    } else {
        obj.style.position = 'fixed';
    }
}

/** 170906 **/
//城市选择 - 下拉
function cityDown() {
    $('.headCity .fixeCenter').stop().slideToggle("slow");
};

//提示框
var timer;
function errorTips(text) {
    $(".errorTips").remove();
    var tips = '<div class="errorTips"><span></span><p>'+text+'</p></div>';
    $(tips).appendTo("body");
    var marginLeft = $(".errorTips").outerWidth()/2,
        marginTop = $(".errorTips").outerHeight()/2;
    $(".errorTips").css({"margin-left": -marginLeft,"margin-top": -marginTop}).show();
    window.clearInterval(timer);
    timer = setTimeout('$(".errorTips").remove()',2000);
};

//背景随机切换
//通过设置元素class改变背景
//参数e,背景元素，name元素class名称
function changeBg(e,name) {
    var random = Math.floor(Math.random()*3+1); //1到3的随机数
    e.attr("class",name+" "+name+random);
};

//已解决问题数滚动
function changeNum(len,qsNum) {
    var num = qsNum.toString().split("");
    var numLen = num.length;
    for (var i =0; i < numLen; i++) {
        animalNum(i);
    }
    //每个数字位的滚动次数
    function animalNum(i) {
        var z = 0;
        var ani = 0;
        var t = setInterval(function () {
            $("#qsNumber span").eq(len-numLen+i).text(z++);
            if(z>9){
                z=0;
                ani++;
                if(ani > i-1){
                    clearInterval(t);
                    change(i)
                }
            }
        }, (numLen-i+1)*20);
    }
    function change(i){
        var y=0;
        var t1 = setInterval(function(){
            $("#qsNumber span").eq(len-numLen+i).text(y++);
            if(y>num[i]){
                clearInterval(t1);
            }
        },50)
    }
}


$(function () {
//当前位置下拉定位
    var dropDownTime;
    $(".dropdown").mouseover( function () {
        clearInterval(dropDownTime);
        var offset = $(this).position(),
            height = $(this).height();
        $(".dropdownNav").css({
            left: offset.left - 15,
            top: offset.top + height +10
        }).slideDown();
    }).mouseleave(function () {
        dropDownTime = setInterval('$(".dropdownNav").slideUp()',100);
    });

    $(".dropdownNav").mouseover(function () {
        clearInterval(dropDownTime);
    }).mouseleave(function () {
        $(".dropdownNav").slideUp();
    });

/*装修各项费用模拟*/
    var costNum = 0;
    var costData = [
        {
            cl: 36100,
            rg: 17000,
            ys: 3400,
            cc: 2500
        },
        {
            cl: 39900,
            rg: 19000,
            ys: 5650,
            cc: 3440
        },
        {
            cl: 43152,
            rg: 22476,
            ys: 3920,
            cc: 3272
        },
        {
            cl: 48546,
            rg: 24273,
            ys: 4256,
            cc: 3835
        },
        {
            cl: 53940,
            rg: 26700,
            ys: 4750,
            cc: 4150
        }];
    var costChange = setInterval(function () {
        if(costNum >= costData.length){
            costNum = 0;
        };
        $(".costSimulate li span").eq(0).html("<i>&yen;</i>"+costData[costNum].cl);
        $(".costSimulate li span").eq(1).html("<i>&yen;</i>"+costData[costNum].rg);
        $(".costSimulate li span").eq(2).html("<i>&yen;</i>"+costData[costNum].ys);
        $(".costSimulate li span").eq(3).html("<i>&yen;</i>"+costData[costNum].cc);
        costNum++;
    },500);

});