
$(function () {
    $('.nav li').hover(function () {
        var dataNum = $(this).data('nav');
        if (dataNum != undefined) {
            $(this).find('li').css('color', '#fff');
            $(this).find('.navIcon').attr('src', 'image/nav_hover.png');
            $(this).siblings().find('li').removeAttr('style');
            $(this).siblings().find('.navIcon').attr('src', 'image/nav.png');
            $('.navHover').show(0, function () {
                $(this).find('ul').eq(dataNum).show().siblings().hide();
            })
            $('.navHover,.headNav').mouseleave(function () {
                $('.navHover').hide(0, function () {
                    $('.navHover').find('ul').hide();
                    $('.nav li a').removeAttr('style');
                    $('.nav li a .navIcon').attr('src', 'image/nav.png'/*tpa=http://sh.ikongjian.com/assets/2017pc/img/head/nav.png*/);
                })
            })
            $('.navCode').hover(function () {
                $('.navHover').hide(0, function () {
                    $('.navHover').find('ul').hide();
                    $('.nav li a').removeAttr('style');
                    $('.nav li a .navIcon').attr('src', 'image/nav.png'/*tpa=http://sh.ikongjian.com/assets/2017pc/img/head/nav.png*/);
                })
            })
        } else {
            $(this).find('li').css('color', '#fff');
            $(this).siblings().find('a').removeAttr('style');
            $(this).siblings().find('.navIcon').attr('src', 'image/nav.png'/*tpa=http://sh.ikongjian.com/assets/2017pc/img/head/nav.png*/);
            $('.navHover').hide(0, function () {
                $(this).find('ul').hide();
            })
        }
    })
})

//JS 导航跟随 - 张思学
// $(window).scroll(function () {
//     var headTop = $(document).scrollTop();
//     if ($('div').hasClass('navAbout')) {
//         if (headTop > 10) {
//             $('.head').stop().animate({
//                 height: '85px'
//             }, 100);
//             $('.headTop').stop().animate({
//                 top: '-40px'
//             }, 40);
//             $('.headNav').stop().animate({
//                 top: '-85px'
//             }, 40);
//             $('.navAbout').stop().css('position', 'fixed').animate({
//                 top: '0px'
//             }, 40);
//         } else {
//             $('.head').stop().animate({
//                 height: '125px'
//             }, 100);
//             $('.headTop').stop().animate({
//                 top: '0px'
//             }, 30);
//             $('.headNav').stop().animate({
//                 top: '40px'
//             }, 30);
//             $('.navAbout').stop().css('position', 'relative').animate({
//                 top: '128px'
//             }, 30);
//         }
//     } else {
//         if (headTop > 10) {
//             $('.head').stop().animate({
//                 height: '85px'
//             }, 100);
//             $('.headTop').stop().animate({
//                 top: '-40px'
//             }, 20);
//             $('.headNav').stop().animate({
//                 top: '0px'
//             }, 20);
//         } else {
//             $('.head').stop().animate({
//                 height: '125px'
//             }, 100);
//             $('.headTop').stop().animate({
//                 top: '0px'
//             }, 10);
//             $('.headNav').stop().animate({
//                 top: '40px'
//             }, 10);
//         }
//     }
//
// })