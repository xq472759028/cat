var y = {};
	layer = layui.layer,
    layerform = layui.form,
    layutil = layui.util,
	windowWidth = $(window).width(),
	windowHeight = $(window).height();

y.cityArr =  [
	{'c':'成都','id':'cd','z':'C','s':'四川省','orgId':85,'siteId':1},
	{'c':'北京','id':'bj','z':'B','s':'北京市','orgId':247,'siteId':2},	
	{'c':'南充','id':'nc','z':'N','s':'四川省','orgId':239,'siteId':3},
	{'c':'贵阳','id':'gy','z':'G','s':'贵州省','orgId':211,'siteId':4},
	{'c':'西安','id':'xa','z':'X','s':'陕西省','orgId':241,'siteId':5},
	{'c':'昆明','id':'km','z':'K','s':'云南省','orgId':240,'siteId':6},
	{'c':'武汉','id':'wh','z':'W','s':'湖北省','orgId':242,'siteId':7},
	{'c':'长沙','id':'cs','z':'C','s':'湖南省','orgId':243,'siteId':8},
	{'c':'合肥','id':'hf','z':'H','s':'安徽省','orgId':244,'siteId':9},
	{'c':'南京','id':'nj','z':'N','s':'江苏省','orgId':246,'siteId':10},
	{'c':'重庆','id':'cq','z':'C','s':'重庆市','orgId':245,'siteId':11},
	{'c':'石家庄','id':'sjz','z':'S','s':'河北省','orgId':248,'siteId':12},
	{'c':'济宁','id':'jning','z':'J','s':'山东省','orgId':260,'siteId':13},
	{'c':'天津','id':'tj','z':'T','s':'天津省','orgId':249,'siteId':14},
	{'c':'苏州','id':'sz','z':'S','s':'江苏省','orgId':253,'siteId':15},
	{'c':'济南','id':'jn','z':'J','s':'山东省','orgId':252,'siteId':16},
	{'c':'广州','id':'gz','z':'G','s':'广东省','orgId':251,'siteId':17},
	{'c':'大连','id':'dl','z':'D','s':'辽宁省','orgId':250,'siteId':18},
	{'c':'青岛','id':'qd','z':'Q','s':'山东省','orgId':254,'siteId':19},
	{'c':'福州','id':'fz','z':'F','s':'福建省','orgId':256,'siteId':20},
	{'c':'沈阳','id':'sy','z':'S','s':'辽宁省','orgId':255,'siteId':21},
	{'c':'太原','id':'ty','z':'T','s':'山西省','orgId':258,'siteId':22},
	{'c':'杭州','id':'hz','z':'H','s':'浙江省','orgId':257,'siteId':23},
	{'c':'无锡','id':'wuxi','z':'W','s':'江苏省','orgId':1719,'siteId':25},
	{'c':'银川','id':'yc','z':'Y','s':'宁夏','orgId':0,'siteId':26},
];

y.init = function() {  
	y.nav();
	if(pageFlag == null) {
		pageFlag = $("title").html();
	} else if(pageFlag == '专题') {
		$(".inputBtn").each(function() {
			$(this).attr("data-mode", 24);
		});
		pageFlag = $("title").html();
	}
	y.session('listparam', '');
	if(y.session('locus') === null) {
		y.session('visitid', new Fingerprint().get());
		y.session('visitdate', getNowFormatDate());
		y.session('locus', window.location.href);
		y.session('locuspage', pageFlag);
		y.session('locusdate', getNowFormatDate());
	} else {
		var locusArr = (y.session('locus')).split(',');
		var locuspageArr = (y.session('locuspage')).split(',');
		var locusdateArr = (y.session('locusdate')).split(',');
		if(locusArr[locusArr.length - 1] != window.location.href) {
			locusArr.push(window.location.href);
			locuspageArr.push(pageFlag);
			locusdateArr.push(getNowFormatDate());
			y.session('locus', locusArr.join(','));
			y.session('locuspage', locuspageArr.join(','));
			y.session('locusdate', locusdateArr.join(','));
		}
	}
	logLocalAjax({site: siteId, visitid: y.session('visitid'), visitdate: y.session('visitdate'), locus: y.session('locus'), locuspage: y.session('locuspage'), locusdate: y.session('locusdate')});
	try {
		eval('y.'+action+'()');
	} catch(err) {
		console.log(err);
	}
}

y.nav = function() {
	var letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ,'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y' , 'Z'];
	for(var i = 0; i < letter.length; i++) {
		for(var j = 0; j < y.cityArr.length; j++) {
			if(y.cityArr[j].z == letter[i]) {
				if($("#" + letter[i] + '_city').length > 0) {
					$("#" + letter[i] + '_city').append('<a href="http://' + y.cityarr[j].id + '.shj.cn/">' + y.cityArr[j].c + '</a>');
				} else {
					$(".choose-city-list").append('<li id="' + letter[i] + '_city"><span>' + letter[i] + '</span><a href="http://' + y.cityarr[j].id + '.shj.cn/">' + y.cityArr[j].c + '</a></li>');
				}				
			}
		}
	}
	$("nav li").hover(function() {
		if($(this).find("dl").length) {			
			$(this).find("dl").css("height", $(this).find("dl").attr("data-h"));
		}
	}, function() {
		if($(this).find("dl").length) {
			$(this).find("dl").css("height", 0);
		}
	});
	$(window).scroll(function() {
		
		if($(window).scrollTop() > 40) {
			$("nav").addClass('active');
		} else {
			$("nav").removeClass('active');
		}
	});
	$(".left-fixed-nav li").hover(function() {
		$(this).addClass('active').find('i').css('background-position', '0 -' + $(this).find('i').attr('data-si') + 'px');
	}, function() {
		$(this).removeClass('active').find('i').css('background-position', '0 -' + $(this).find('i').attr('data-i') + 'px');
	});
	$("#fixedNavGoTop").click(function() {
		$("html,body").animate({scrollTop: 0}, 500);
	});
	$('.bjDy').click(function (){ 
		if (siteId  != 1 && siteId != 19) {
			var htmls = $('#ncbj').html();
			var skin = '';
			var area = ['420px', '550px'];
		}else{
			var htmls = $('#cdbj').html();
			var skin = 'yuanjiao';
			var area = ['562px', '814px'];
		}
		layer.open({	         
	        type: 1,
	        area: area, 
	        skin: skin,
	        title: 0,
  			content: htmls,
  			success: function(){
			    showtime=setInterval(function(){$('#bjDy span').text(Math.floor(3*Math.random()+1)+Math.floor(Math.random()*100000+100000))},500);
			},
			cancel: function(){
				clearInterval(showtime);
			},
  			resize:0
      });
	});
	$('html').on('click','#closedy',function(){
		layer.closeAll();
		console.log(1);
	})
	$('.lfDy').click(function (e){
		e.stopPropagation();
		layer.open({	         
	        type: 1,
	        area: ['440', 'auto'], 
	        skin: 'layui-layer-bgNone',
	        title: 0,
  			content: $('#lfDy').html(),
  			resize:0
      });
	});
	$('.ghDy').click(function (e){
		e.stopPropagation();
		layer.open({	         
	        type: 1,
	        area: ['440', 'auto'], 
	        skin: 'layui-layer-bgNone',
	        title: 0,
  			content: $('#ghDy').html(),
  			resize:0
      });
	});
	$('.gdDy').click(function (e){
		e.stopPropagation();
		layer.open({	         
	        type: 1,
	        area: ['440', 'auto'], 
	        skin: 'layui-layer-bgNone',
	        title: 0,
  			content: $('#gdDy').html(),
  			resize:0
      });
	});
	$('.dzDy').click(function (e){
		e.stopPropagation();
		layer.open({	         
	        type: 1,
	        area: ['440', 'auto'], 
	        skin: 'layui-layer-bgNone',
	        title: 0,
  			content: $('#dzDy').html(),
  			resize:0
      });
	});
	$('#headerChooseCity').click(function (){
		layer.open({	         
	        type: 1,
	        area: ['500px', 'auto'], 
	        skin: 'layui-layer-bgNone',
	        title: 0,
  			content: $('#chooseCityTpl').html(),
  			resize: 0
      });
	});
	$('video').attr('preload','true');
}

y.indexbase=function(){
	var thisObj = this;
		var a = $("body").append("<script src=\"http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js\"></script>");
		//var nowCity = remote_ip_info;
		var sArr = [];
		for(var i=0; i<y.cityArr.length; i++) {	
			if($.inArray(y.cityArr[i]['s'],sArr) == -1) {
				sArr.push(y.cityArr[i]['s']);	
			}							
		}
		for(var i=0; i<sArr.length; i++) {
			$("#select_s").append("<option value=\"\">"+sArr[i]+"</option>");
		}
		$("#select_s").change(function() {
			$("#select_c").html("<option value=\"\">城市</option>");
			var value = $(this).find("option:selected").text();				
			if(value != '省份') {				
				for(var i=0; i<y.cityArr.length; i++) {
					if(y.cityArr[i]['s'] == value) {
						$("#select_c").append("<option value=\"http://"+y.cityArr[i]['id']+".shj.cn\">"+y.cityArr[i]['c']+"</option>");
					}
				}
			}	
		});
		$("#select_c").change(function() {
			var text = $(this).find("option:selected").text();
			var value = $(this).find("option:selected").val();				
			if(text != '城市') {			
				$(".shj_yindao_citys_search").attr("href",value);
			}
		});
		$(".shj_yindao_baike_cover").each(function() {
			var	a = $(this).find("a"),
				img = $(this).find("a img"),
				data_demo = $(this).next().find("ul li:eq(0) a"),
				url = $(data_demo).attr("href"),			
				imgurl = $(data_demo).attr("data-img"),
				imgalt = $(data_demo).attr("title");
			$(a).attr("href",url).attr("title",imgalt);
			$(img).attr("src",imgurl).attr("alt",imgalt);
		});
		
	  var clicks = function() {
		$("#city_zm li").click(function() {
			var value = $(this).html();
			$(".shj_yindao_citys_item_zm_city").html("");
			$("#city_zm li").removeClass("shj_yindao_citys_item_zm_click");
			$(this).addClass("shj_yindao_citys_item_zm_click");
			for(var i=0; i<y.cityArr.length; i++) {
				if(y.cityArr[i]['z'] == value) {
					$(".shj_yindao_citys_item_zm_city").append("<a href=\"http://"+y.cityArr[i]['id']+".shj.cn\" class=\"shj_yindao_city\" >"+y.cityArr[i]['c']+"</a>");
				}
			}
		});
		$(".shj_yindao_baike_lists ul li a").hover(function() {
			$(".shj_yindao_baike_cover a").attr("href",$(this).attr("href")).attr("title",$(this).attr("title"));
		})
	};
	clicks();
	$(".shj_index_jsq_select_bg").click(function() {	
		close_jsq_select();	
		$(this).parent().css("border-color","#75b43f");
		$(this).siblings(".shj_index_jsq_select_list").show();
	});
	$(".shj_index_jsq_select_list li").click(function() {
		if($(this).html() == '悦享家' && $(this).attr("data-v") == undefined && $("#tcbjcity").attr("data-v") != 3400) {
			layer.msg('该城市没有悦享家产品报价', {time: 3000, icon:5});			 
			return;
		}
		$(this).parent().siblings(".shj_jsq_rst").html($(this).html()).attr("data-v",$(this).attr("data-v"));
		close_jsq_select();
	});
	$("body").click(function(e) {
		if(e.target.className != 'shj_index_jsq_select_bg') {
			close_jsq_select();
		}
	})
	function close_jsq_select() {
		$(".shj_index_jsq_select").css("border-color","#c8c8c8");
		$(".shj_index_jsq_select").find(".shj_index_jsq_select_list").hide();
	};
	$(".shj_bjtc_close").click(function() {
    	$(".shj_bjtc_wrap").fadeOut();
    	$(".shj_bjtc_info_box").show();
		$(".shj_bjtc_rst_box").hide();
    });
    $(".shj_index_jsq_radio_bg").click(function() {
		var that = $(this).parent();
		if($(that).find("span").text() == '悦享家' && $("#bjcity").attr("data-v") != 3400) {
			layer.msg('该城市没有悦享家产品报价', {time: 3000, icon:5});			 
			return;
		}
		$(that).siblings().find(".shj_index_jsq_ricon").removeClass("shj_index_jsq_ricon_check");
		$(that).find(".shj_index_jsq_ricon").addClass("shj_index_jsq_ricon_check");
		$(that).siblings("input").attr("data-v",$(that).find("span").text());
	});
	var page = $("#page_flag").val();
	if(page == 'ltuan') {
		$("#lfyfcity").attr("data-v",get_cookie('cityid')).html(cityNamelist[get_cookie('cityid')]);
	}
	$(".shj_index_jsq_menu_bg").click(function() {
		var that = $(this).parent();
		var type = $(that).attr("data-v");		
		$(".shj_index_jsq_menu img").each(function(){
			$(this).attr("src","http://image.shj.cn:8888/static/pcweb/images/"+$(this).parent().attr("data-v")+"icon.png");
		});
		$(".shj_index_jsq_menu").removeClass("shj_yindao_jsq_menu_click");
		$(that).addClass("shj_yindao_jsq_menu_click");
		$(that).find("img").attr("src","http://image.shj.cn:8888/static/pcweb/images/"+type+"icon1.png");				
		if(type == "lf" || type == "yf") {	
			$("#shj_index_jsq_bj").hide();
			$("#shj_index_jsq_bj_right,#shj_index_jsq_lf_right,#shj_index_jsq_yf_right").hide();
			if(type == "lf") {
				$("#shj_lfyf_btn").val("免费量房").attr("data-from","引导页免费量房");
				$("#shj_index_jsq_lf_right").show();			
			} else {
				$("#shj_lfyf_btn").val("免费验房").attr("data-from","引导页免费验房");
				$("#shj_index_jsq_yf_right").show();
			}			
			$("#shj_index_jsq_lfyf").show();						
		} else {
			$("#shj_index_jsq_lfyf,#shj_index_jsq_lf_right,#shj_index_jsq_yf_right").hide();
			$("#shj_index_jsq_bj").show();
			$("#shj_index_jsq_bj_right").show();
		}
	});	
}
y.index = function() {
	new Swiper(".index-banner .swiper-container", {
		autoplay: 600000,
		speed: 1500,
		loop: !0,
		pagination: ".index-banner .swiper-pagination",
		paginationClickable: !0,
		nextButton: ".index-banner .swiper-button-next",
		prevButton: ".index-banner .swiper-button-prev",
		onSlideChangeStart: function(swiper){
			var prevNav = $(".index-banner .swiper-button-prev").find('div:eq(1)'),
				nextNav = $(".index-banner .swiper-button-next").find('div:eq(1)');
				prevSlide = $(".index-banner .swiper-slide-duplicate-prev"),
				nextSlide = $(".index-banner .swiper-slide-duplicate-next");
			if(prevNav.css('opacity') == 1) {
				prevNav.css('opacity', 0);
				setTimeout(function() {
					prevNav.find('img').attr('src', prevSlide.attr('data-img'));
					prevNav.css('opacity', 1);
				},600);
			} else {
				prevNav.find('img').attr('src', prevSlide.attr('data-img'));
			}
			if(nextNav.css('opacity') == 1) {
				nextNav.css('opacity', 0);
				setTimeout(function() {
					nextNav.find('img').attr('src', nextSlide.attr('data-img'));
					nextNav.css('opacity', 1);
				},600);
			} else {
				nextNav.find('img').attr('src', nextSlide.attr('data-img'));	
			}
	    }			
	});
	$('#swiper-container-index .swiper-slide').hover(function(){
		$(".index-swiper-banner").eq(0).width(305).find("div:eq(0)").addClass("btn-hover");
		$(".index-swiper-banner").eq(0).find("div:eq(1)").attr("style","left: 70px; opacity: 0.6");
	},function(){
		$(".index-swiper-banner").eq(0).width(70).find("div:eq(0)").removeClass("btn-hover");
		$(".index-swiper-banner").eq(0).find("div:eq(1)").attr("style","left: 0; opacity: 0");
	});
	$(".index-swiper-banner").hover(function() {
		$(this).width(305).find("div:eq(0)").addClass("btn-hover");
		$(this).find("div:eq(1)").attr("style","left: 70px; opacity: 1");
	}, function() {
		$(this).width(70).find("div:eq(0)").removeClass("btn-hover");
		$(this).find("div:eq(1)").attr("style","left: 0; opacity: 0");
	});
	var productSwiper = new Swiper(".product-nivo .swiper-container", {
		speed: 500,
		effect : 'fade',
		fade: {crossFade: true},
		//onlyExternal: true,
		onSlideChangeStart: function(swiper){
			y.changeBackground(".product ul li", $(".product ul li").eq(swiper.realIndex));
		}
	});	

	$(".product ul li").click(function() {		
		y.changeBackground(".product ul li", this);
		productSwiper.slideTo($(this).index(), 1000, false);
	});	

	$(".index-case-content>div>div").hover(function() {
		var dataStr = '';
		if($(".index-case-content .case-left").css("display") == "none") {
			dataStr = $(this).attr("data-s");
		} else {
			dataStr = $(this).attr("data");
		}

		var dataw=$(this).attr('data-w');
		var datah=$(this).attr('data-h');
		$(this).find(".borderTop").css({width: dataw, height: datah, opacity: 1});
		$(this).find(".borderBottom").css({width: dataw, height: datah, opacity: 1});

		$(this).find("div").css({opacity: 1});
	}, function() {
		$(this).find(".borderTop").css({width: 0, height: 0, opacity: 0});
		$(this).find(".borderBottom").css({width: 0, height: 0, opacity: 0});
		$(this).find("div").css({opacity: 0});
	});

	$(".index-case-content").mouseleave(function(){
		$(".borderTop").css({opacity: 0});
		$(".borderBottom").css({opacity: 0});
	});
	var designerSwiper = new Swiper('.index-designer-content .swiper-container', {
		watchSlidesProgress: true,
		slidesPerView: 'auto',
		centeredSlides: true,
		loop: true,		
		loopedSlides: 3,
		autoplay: 0,
		speed: 1200,
		observer: true,
		observeParents: true,
		pagination: ".index-designer-content .swiper-pagination",
		paginationClickable: !0,
		nextButton: ".index-designer-content .swiper-button-next",
		prevButton: ".index-designer-content .swiper-button-prev",
		onProgress: function(swiper, progress) {
			for (i = 0; i < swiper.slides.length; i++) {
				var slide = swiper.slides.eq(i);
				var slideProgress = swiper.slides[i].progress;	
				if(Math.abs(slideProgress) > swiper.slides.length / 2) {
					slideProgress = slideProgress > 0 ? - (slideProgress - swiper.slides.length / 2) : Math.abs(slideProgress + swiper.slides.length / 2); 
				}	
				translate = slideProgress * 620 + 'px';				
				scale = 1 - Math.abs(slideProgress) / 3;
				if(Math.abs(scale) > 1) {
					scale = .667;
				}
				zIndex = 99 - Math.abs(Math.round(6 * slideProgress));
				slide.transform('translateX(' + translate + ') scale(' + scale + ')');
				slide.css('zIndex', zIndex);
			}
		},
		onSlideChangeStart: function(swiper) {						
			$(document).mousemove(function(e) {
				e.preventDefault();
			});		
		},
		onSlideChangeEnd: function(swiper) {
			$(document).unbind('mousemove');				
		},
		onSetTransition: function(swiper,transiton) {
			for (var i = 0; i < swiper.slides.length; i++) {
				var slide = swiper.slides.eq(i);
				slide.transition(transiton);
			}
		}
	});
	$(".houseType-lists li").hover(function() {
		$(this).find('img').addClass('houseType-zoom');
	}, function() {
		$(this).find('img').removeClass('houseType-zoom');
	})
	$(".index-strategy-content ul li").hover(function() {
		$(".index-strategy-content ul li.active").removeClass("active");
		$(this).addClass("active");
	}, function() {
		$(this).removeClass("active");
	});
	$(".index-reservation-content li").hover(function() {
		$(this).addClass("active");
	}, function() {
		$(this).removeClass("active");
	});
	if(windowWidth < 1834) {
		$(".index-case-center").width(1226);
		$(".index-case-content .case-left").hide();
	}
	if(windowWidth < 1530) {
		$(".index-designer-center,.index-designer-content").width(1240);
		$(".index-designer-content .swiper-button-prev").css("left",0);
		$(".index-designer-content .swiper-button-next").css("right",0);
		$(".index-designer-content .designer-more").css("right",0);
	}
	if(windowWidth < 1580) {
		$(".index-houseType-center").width(1250);
	}
	$(window).resize(function() {
		if($(window).width() != windowWidth) window.location.reload();
	});
	y.quote();

	$('.strategy-type a').each(function(e){
		$(this).mouseenter(function(){
			$(this).addClass('active').siblings('a').removeClass('active');
			if (e==0) {
				$('.index-strategy-scroll .index-strategy-content').eq(0).css('left',0);
				$('.index-strategy-scroll .index-strategy-content').eq(1).css('left','1250px');
				$('.index-strategy-scroll .index-strategy-content').eq(2).css('left','2500px');
				$('.index-strategy_more').attr('href','/gsdt');
			}
			if (e==1) {
				$('.index-strategy-scroll .index-strategy-content').eq(0).css('left','-1250px');
				$('.index-strategy-scroll .index-strategy-content').eq(1).css('left',0);
				$('.index-strategy-scroll .index-strategy-content').eq(2).css('left','1250px');
				$('.index-strategy_more').attr('href','/kehu');
			}
			if (e==2) {
				$('.index-strategy-scroll .index-strategy-content').eq(0).css('left','-2500px');
				$('.index-strategy-scroll .index-strategy-content').eq(1).css('left','-1250px');
				$('.index-strategy-scroll .index-strategy-content').eq(2).css('left',0);
				$('.index-strategy_more').attr('href','/zhishi');
			}			
		});		
	});
	$.getJSON("/index/ajaxInfo",function(data) {                 
	    $('.index-strategy-scroll').prepend(data.html);	          
	});
	
	/*完工地图*/
	window.onload = function() {
		var notMapSiteId = [13,26,1,12,25];
		if($.inArray(siteId, notMapSiteId) !== -1) return false; 
		var siteOrgId,
			siteName;
		for(var i = 0; i < y.cityArr.length; i++ ) {
			if(y.cityArr[i].siteId == siteId) {
				siteOrgId = y.cityArr[i].orgId;
				siteName = y.cityArr[i].c;
			}
		}
		$.getJSON('/index/ajaxProjectCompleteList', {orgId: siteOrgId}, function(res) {
			if(res) {
				var map = new BMap.Map("CompleteSiteMap", {minZoom : 11, maxZoom : 16 });
				var isExistPoint = [];
				var navigationControl = new BMap.NavigationControl({
				    anchor: BMAP_ANCHOR_TOP_LEFT,
				    type: BMAP_NAVIGATION_CONTROL_LARGE,
				    enableGeolocation: true
				});
			  	map.addControl(navigationControl);
				map.centerAndZoom(siteName, 14);			
				map.enableScrollWheelZoom(true);												
				map.addEventListener("load",function(e) {
					/*var bounds = map.getBounds();
						for (var i = 0; i < res.length; i ++) {
						var point = new BMap.Point(res[i].longitude, res[i].latitude);
				        var marker = new BMap.Marker(point);
				        map.addOverlay(marker);
			            addClickHandler(marker, '楼盘名称：' + res[i].name + '<br>楼盘地址：' + res[i].address + '<br>完工户数：' + res[i].completeCount);
					} */
					//console.log(bounds);
					$(".house-map-loading").css('opacity', 0);
					setTimeout(function() {
						$(".house-map-loading").css('z-index', 0);
					}, 600); 
					var bounds = map.getBounds();
					makeMaker(bounds);
					map.addEventListener("moveend", UpdateMaker);
					map.addEventListener("zoomend", UpdateMaker); 						
				});
				var isRuning = 0;
				function makeMaker(bounds) {
					if(isRuning) return false;
					isRuning = 1;
					for (var i = 0; i < res.length; i ++) {
						if($.inArray(res[i].longitude, isExistPoint) > -1) continue;						
						var point = new BMap.Point(res[i].longitude, res[i].latitude);												
						if(bounds.containsPoint(point)) {
							isExistPoint.push(res[i].longitude);							
							var marker = new BMap.Marker(point);
					        map.addOverlay(marker);
				            addClickHandler(marker, '楼盘名称：' + res[i].name + '<br>楼盘地址：' + res[i].address + '<br>完工户数：' + res[i].completeCount);
						}
					}
					isRuning = 0;
				};
				function addClickHandler(marker, msg) {
					marker.addEventListener("click",function(e){
						var p = e.target;
						var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
						var opts = {
							width : 220,
							height: 100,
							title : '楼盘信息',
						};
						var infoWindow = new BMap.InfoWindow(msg, opts); 
						map.openInfoWindow(infoWindow, point); 
					});
				}
				function UpdateMaker() {
					var bounds = map.getBounds();
					makeMaker(bounds);	
				}			
			}
		});
	}
	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	  
		var csz ='left';
		var cs = function(){
			var left = $('.right-img')[0].offsetLeft;
			if (csz == 'left') {
				if(left >= -620){
					left = left-1;	
					
				}else{
					csz = 'right';
				}
			}else{
				if(left <= 0){
					left = left+1;
				}else{
					csz = 'left';
				}
				
			}
			$('.right-img').css('left',left);
			requestAnimationFrame(cs);
		}
		cs();
		// $(document).ready(function(){
		// 	//$("#myiframe").contents().find('#mp3')[0].pause();
		// 	console.log($("#myiframe").contents().find('#mp3')[0]);
		// })

}


y.casus = function() {
	if($("#id").val() == undefined) {
		$(".case-filter-search>div>button").click(function() {
			var param = y.session('listparam') == '' ? {} : JSON.parse(y.session('listparam'));
			if($(this).hasClass('active')) {
				$(this).removeClass('active');
				param[$(this).attr('data-key')] = 'asc';				
			} else {
				$(this).addClass('active');
				param[$(this).attr('data-key')] = 'desc';
			}
			param['type']=$(".case-filter-center li").eq(0).find('.active').attr('data-key');
			y.session('listparam', JSON.stringify(param));
			y.loadMore($(".case-lists-container ul"), '/anli', param);
		});
		$(".case-filter-search>div>div>button").click(function() {			
			$(".case-filter-center li dl").each(function() {
				if($(this).attr('data-type') != "type"){
					$(this).find(".active").removeClass('active');
					$(this).find("dd:eq(0)").addClass('active');
				}
			})
			y.loadMore($(".case-lists-container ul"), '/anli', {'keyword' : $(this).prev('input').val(),"type":$(".case-filter-center li").eq(0).find('.active').attr('data-key')});
		});
		$(".case-filter-center li dd").click(function() {
			if(!$(this).hasClass('active')) {
				$(this).parent().find('.active').removeClass('active');
				$(this).addClass('active');
				var param = y.session('listparam') == '' ? {} : JSON.parse(y.session('listparam'));
				$(".case-filter-center li").each(function() {
					var type = $(this).find('dl').attr('data-type'),
						active = $(this).find('dd.active').attr('data-key');
					if(active != undefined) {
						param[type] = active;
					}
				});
				if ($('#keyword').val() != '') {
					param['keyword'] = $('#keyword').val();
				}
									
				y.session('listparam', JSON.stringify(param));
				if (param['type']==2) {
 					$(".case-lists-container ul").css('width','1800px');
 					$(".case-filter-center ul li").eq(3).css('display','none');
 					$(".case-filter-search>div>button").eq(1).css('display','none');
 				}else{
 					$(".case-lists-container ul").css('width','1240px');
 					$(".case-filter-center ul li").eq(3).css('display','flex');
 					$(".case-filter-search>div>button").eq(1).css('display','block');
 				}			
				y.loadMore($(".case-lists-container ul"), '/anli', param);
			} 
		});
		y.loadMore($(".case-lists-container ul"), '/anli', {'type':$("#keytype").val()});
	} else {
		y.bdshare();	
		window.onload = function() {
			var caseNavTop = $(".case-show-nav").offset().top,
				caseContentH = $(".case-show-content").height()-65-289,
				caseShowTop = [],
				caseAll= caseContentH+caseNavTop,
				isAni = false;
			$(".case-show-nav li").each(function() {
				caseShowTop.push($("#"+$(this).attr("data"))[0].offsetTop - caseNavTop);
			});
			$(window).scroll(function() {
				var scTop = $(window).scrollTop();				
				if(scTop > (caseNavTop - 200)) {
					if (caseAll>=scTop) {
						$(".case-show-nav").css('padding-top', scTop - caseNavTop + 200);
					}									
				} else {
					$(".case-show-nav").css('padding-top', 0);
				}
				if(isAni) return false;
				$(".case-show-nav li").each(function(index, item) {
					if(scTop >= caseShowTop[index] && scTop <= caseShowTop[index+1] || (index == $(".case-show-nav li").length - 1 && scTop >= caseShowTop[index])) {
						navActive(item);
					}
				})
			});
			$(".case-show-nav li").click(function() {
				navActive(this);
				isAni = true;
				$("html").animate({scrollTop: caseShowTop[$(this).index()]}, 500);
				setTimeout(function() {
					isAni = false;
				}, 600);
			});	
		}
		function navActive(that) {
			$(".case-show-nav li.active").removeClass('active');
			$(that).addClass('active');		
		}	
	}	
}
y.vrcase = function() {
	if($("#id").val() == undefined) {

		$(".case-filter-search>div>div>button").click(function() {			
			$(".case-filter-center li dl").each(function() {
				if($(this).attr('data-type') != "type"){
					$(this).find(".active").removeClass('active');
					$(this).find("dd:eq(0)").addClass('active');
				}
			})
			y.loadMore($(".case-lists-container ul"), '/vranli', {'keyword' : $(this).prev('input').val()});
		});
		$(".case-filter-center li dd").click(function() {
			if(!$(this).hasClass('active')) {
				$(this).parent().find('.active').removeClass('active');
				$(this).addClass('active');
				var param = y.session('listparam') == '' ? {} : JSON.parse(y.session('listparam'));
				$(".case-filter-center li").each(function() {
					var type = $(this).find('dl').attr('data-type'),
						active = $(this).find('dd.active').attr('data-key');
					if(active != undefined) {
						param[type] = active;
					}
				});
				if ($('#keyword').val() != '') {
					param['keyword'] = $('#keyword').val();
				}
									
				y.session('listparam', JSON.stringify(param));			
				y.loadMore($(".case-lists-container ul"), '/vranli', param);
			} 
		});
		y.loadMore($(".case-lists-container ul"), '/vranli', {});
	} else {
		y.bdshare();	
			
	}	
}
//拎包装
y.allDec = function(){
	if($("#id").val() == undefined) {
		y.loadMore($(".case-lists-container ul"), '/zzcp', {});
	}else{
		$.getJSON("/index/scan",{id:$("#id").val(),b:'lbzs'});
		y.bdshare();

	}
}
//效果图
y.effect=function(){
	if($("#id").val() == undefined) {
		y.loadMore($(".hot-lists-container ul"), '/', {});
	}else{
		var viewSwiper = new Swiper('#swiper-containerDy-effect', {
				onSlideChangeStart: function() {
					    updateNavPosition()
				}
			})
		$('#arrow-left,.arrow-lefto').on('click', function(e) {
			e.preventDefault();
			console.log(viewSwiper.activeIndex);
			if (viewSwiper.activeIndex == 0) {
				viewSwiper.slideTo(viewSwiper.slides.length - 1, 1000);
				return
			}
			viewSwiper.slidePrev();
		});
		$('#arrow-right,.arrow-righto').on('click', function(e) {
			e.preventDefault();	
			console.log(viewSwiper.activeIndex);
			if (viewSwiper.activeIndex == viewSwiper.slides.length - 1) {
				viewSwiper.slideTo(0, 1000);
				return;
			}
			viewSwiper.slideNext();
		})
		var previewSwiper = new Swiper('#swiper-containerDy-effect-nav', {
			//visibilityFullFit: true,
			slidesPerView: 4,
			allowTouchMove: false,
			onTap: function() {
				    viewSwiper.slideTo(previewSwiper.clickedIndex)
			}
		});
		function updateNavPosition() {
			$('#swiper-containerDy-effect-nav .active-nav').removeClass('active-nav')
			var activeNav = $('#swiper-containerDy-effect-nav .swiper-slide').eq(viewSwiper.activeIndex).addClass('active-nav');
			if (!activeNav.hasClass('swiper-slide-visible')) {
				if (activeNav.index() > previewSwiper.activeIndex) {
					var thumbsPerNav = Math.floor(previewSwiper.width / activeNav.width()) - 2
					previewSwiper.slideTo(activeNav.index() - thumbsPerNav)
				} else {
					previewSwiper.slideTo(activeNav.index())
				}
			}
		}
		$('#swiper-containerDy-effect-nav .swiper-slide').eq(0).addClass('active-nav');
		y.bdshare();
		y.quote();
	}
}

// 轻奢装
y.allDecQ = function(){
	y.bdshare();
	$.getJSON("/index/scan",{id:$("#id").val(),b:'lbzs'});
}
/*旧房改造*/
y.oldFix = function(){
	if($("#id").val() == undefined) {
		y.loadMore($(".case-lists-container ul"), '/jfgz', {});
	}else{
		$.getJSON("/index/scan",{id:$("#id").val(),b:'jfgz'});
		y.bdshare();
		var height=parseInt($('.fixDy-content').css('height'))+160;
		$('.fixDy-contents').css('height',height);
		$('.fixDy span').each(function(e){
			$(this).click(function(){
				$(this).addClass('active').siblings().removeClass('active');
				if (e==0) {
					$('.fixDy-content').eq(0).removeClass('left0');
					$('.fixDy-content').eq(1).removeClass('left1');
				}else{
					$('.fixDy-content').eq(0).addClass('left0');
					$('.fixDy-content').eq(1).addClass('left1');
				}
				
			});
		});

	}
	y.quote();
}

y.yuyue = function(){   
	$(".shj_ys_lists_box .swiper-slide:first-child").find("img").addClass("shj_ys_list_now").next().show();
	if(getQueryString('mode') != null) {
		$(".yuyue-form #submitBtn").attr('data-mode', getQueryString('mode'));
	}
	$(".yuyue-form #submitBtn").attr("data-from", '预约设计师-' + $(".shj_ys_lists_box .swiper-slide:first-child").find("img").attr("data-name")); 
	sjsAnliSwiper = new Swiper('.shj_ys_info_anli', {
        slidesPerView: '3',
		slidesPerGroup : 3,
		grabCursor: true,
		preventClicks : false,
		onSlideChangeStart: function(swiper) {
			$(document).mousemove(function(e) {
				e.preventDefault();
			});	
		},
		onSlideChangeEnd: function(swiper){
			$(document).unbind('mousemove');
			$(".shj_ys_scrollbar_now").css("left",Math.ceil(swiper.activeIndex/3)*$(".shj_ys_scrollbar_now").width());
		}
    }); 
    
    $(".shj_ys_list").click(function() {
		var id = $(this).attr("data-id"),
			cityid = $(this).attr("data-city"),
			title = $(this).attr("data-name"),
			caeer = $(this).attr("data-caeer"),
			thumb = $(this).attr("src"),
			url = $(this).attr("data-url"),
			style = $(this).attr("data-style");
		$(".shj_ys_list").removeClass("shj_ys_list_now");
		$(".shj_ys_list_info").hide();
		$(this).addClass("shj_ys_list_now");
		$(this).next().show();
		$(".shj_ys_sjsinfo>h2").html(title);
		$(".shj_ys_item>h6").html(caeer);
		$(".shj_ys_sjsinfo .shj_ys_info_sjsimg").find("img").attr("src",thumb);
		$(".shj_ys_sjsinfo .shj_ys_info_sjsimg").css("background-image","url("+thumb+")");
		$(".shj_ys_sjsinfo>h5").html(style);
		$(".shj_ys_go").attr("href",'/shejishi/'+id+'.html');
		$(".yuyue-form #submitBtn").attr("data-from", '预约设计师-' + title);
		console.log(id);
		console.log(cityid);
		$.get('/index/ajaxInfoP',{id:id,cityid:cityid},function(rst) {
			if(rst.flag == 1) {
				$(".shj_ys_info_anli .swiper-wrapper").html("");
				for(var i=0; i<rst.data.length; i++) {
					var z = rst.data[i];
					var html = 
						'<div class="swiper-slide"><a href="http://image.shj.cn:8888/anli/'+z.id+'.html" target="_blank"><img src="'+z.cover+'" alt="'+z.title+'" class="shj_ys_anli"/><h6 class="shj_ys_anli_info">'+z.buildName+'</h6></a></div>';
					$(".shj_ys_info_anli .swiper-wrapper").append(html);
				}
				$(".shj_ys_scrollbar_now").css("left",0).width(180/Math.ceil(rst.data.length/3));
				sjsAnliSwiper.update();
			}			
		},'json');		
	});
	sjsSwiper = new Swiper('.shj_ys_lists_box', {
        slidesPerView: 'auto',
        centeredSlides: false,
        slideToClickedSlide:true,
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev'
	});
}

y.knowledge = function() {
	if($("#id").val() == undefined) {
		$(".konw-list-type ul a").hover(function() {
			if($(this).hasClass('active')) return false;
			$(".konw-list-type ul a.active").each(function() {
				if(($(this).index() + 1) != parseInt($(this).parent().attr("data"))) {
					$(this).removeClass('active');
				}
			});		
			$(this).addClass('active');	
			$(".konw-list-type div").css('left', $(this).index() * 25 + '%').css("opacity", 1);
		}, function() {			
			$(".konw-list-type ul a.active").each(function() {
				if(($(this).index() + 1) != parseInt($(this).parent().attr("data"))) {
					$(this).removeClass('active');
				}
			});
			if($(this).parent().attr('data') == 0) {
				$(".konw-list-type div").css('opacity', 0);
			} else {
				$(".konw-list-type div").css('left', parseInt($(this).parent().attr('data') - 1) * 25 + '%');
			}			
		});
		new Swiper ('.konw-list-banner .swiper-container', {
		    loop: true,
		    speed: 1000,
		    autoplay: 6000,
		    pagination: '.konw-list-banner .swiper-pagination',
		    nextButton: '.konw-list-banner .swiper-button-next',
		    prevButton: '.konw-list-banner .swiper-button-prev',
		}); 
		var param = {};
		param.type = $("#articleType").val();
		y.loadMore($(".konw-lists"), '/knowledge', param);
	} else {
		y.bdshare();
	}
	y.quote();
}
/*在装工地*/
y.site = function(){
	if($("#id").val() == undefined) {
		$('.statusDy dl dd').each(function(e){
			$(this).click(function(){
				$(this).addClass('active').siblings().removeClass('active');
				$('#statusDy').val($(this).attr('data-l'));
				y.loadMore($(".site-lists-container ul"), '/zjgd', {statusDy:$('#statusDy').val(),locationDy:encodeURI($('#locationDy').val())});
			});
		});
		$('.locationDy dl dd').each(function(e){
			$(this).click(function(){
				$(this).addClass('active').siblings().removeClass('active');
				$('#locationDy').val($(this).attr('data-l'));
				y.loadMore($(".site-lists-container ul"), '/zjgd', {statusDy:$('#statusDy').val()});
			});
		});
		y.loadMore($(".site-lists-container ul"), '/zjgd', {statusDy:$('#statusDy').val(),locationDy:encodeURI($('#locationDy').val())});
	}else{

		$.ajax({
			url:"/zjgd/"+$('#id').val(),
			type:'get',
			success:function(data){
				$('.site-show-stage').html('');
				$('.site-show-stage').html(data.html);
				$(".imgWrap").click(function(e) {
					if (e.target.localName != 'img') {
						$(this).find('img').click();
					}
					var dom=$(this).parents('.layer-photos-demo');
				    layer.photos({
				      photos: dom,
				      anim: 5 
				    }); 					
				});
			}
		});
	}
}

y.designer = function() {
	if($("#id").val() == undefined) {
		y.loadMore($(".des-lists-container ul"), '/shejishi', {});
	} else {
		$.getJSON("/index/scan",{id:$("#id").val()});
		y.loadMore($(".des-show-production ul"), '/shejishi/'+$("#id").val(), {id: $("#id").val()}, 6,$('#more-production'));
		y.loadMore($(".des-show-site ul"), '/index/designerSite', {id: $("#id").val()}, 6,$('#more-site'));	
		y.loadMore($(".des-show-comment ul"), '/index/ajaxDesigner', {id: $("#id").val()}, 3,$('#more-comment'));	
		$("#designerCommentBtn").click(function() {
		   $.getJSON("/index/ajaxInfoUser",{'designer':$('.des-show-info h3').text()}, function(data) { 
		   		if(data.code == 201){
		   			layer.msg(data.msg, {'icon': 2, time: 1500});
		   			return;
		   		} 				   		          
		   		if(data.code == 200) {
	 				layer.open({
					  type: 1,shade: .6,title: false,closeBtn: 0,area: ['800px', 'auto'],scrollbar:false,
					  content: $("#designerCommentHtml").html(),
					});

					$(".designer-comment-container textarea").focus(function () {
						$(this).css('border-color', '#00ae66');
					}).blur(function() {
						$(this).css('border-color', '#a5a5a5');
						if($(this).val() == '') {
							$(this).val('评语');
						}
					});
					layerform.render();
					$("#designerCommentClose").click(function() {
						layer.closeAll();
					});

					$('#designer-comment-username').val(data.data.username);			
					y.webuploadFiles('.designer-comment-buttom', function(e) {
						imgs = $('#designer-comment-imgs').val();
						imgs += e.path+',';
						$('#designer-comment-imgs').val(imgs);
				    });

				    $('.designer-submit-buttom').click(function(){
				    	var major= $('#major option:selected').val(),
				    		res  = $('#res option:selected').val(),
				    		talk = $('#talk option:selected').val(),
				    		atti = $('#atti option:selected').val(),
				    		budget = $('#budget option:selected').val(),
				    		light = $('#light option:selected').val(),
				    		space = $('#space option:selected').val(),
				    		style = $('#style option:selected').val(),
				    		color = $('#color option:selected').val(),
				    		img = $('#designer-comment-imgs').val(),
				    		comment = $('#comment').val(),
				    		uid = $('#uid').val(),
				    		username = $('#designer-comment-username').val();
				    		if(major==0||res==0||talk==0){
				    			layer.msg('专业能力、责任心、沟通能力不能为 0分', {'icon': 2, time: 1500});
				    			return;
				    		}
				    	$.getJSON("/index/ajaxInfoDesign",{'username':username,'uid':uid,'major':major,'res':res,'talk':talk,'atti':atti,'budget':budget,'light':light,'space':space,'style':style,'color':color,'img':img,'comment':comment},function(data){
				    		if(data.code==200) {
	     						setTimeout(function(){$('#designerCommentClose').click();}, 1000);
	     						layer.msg(data.msg, {'icon': 1, time: 1500});
	     					} else {
	     						layer.msg(data.msg, {'icon': 2, time: 1500});
	     					}

						});

				    });
				} else {
				 	layer.open({
					  type: 1,shade: .7,title: false,closeBtn: 0,area: ['480px', '385px'],scrollbar:false,
					  content: $("#UserValidate").html(),
					});
					$(".user-validate-close").click(function() {
						layer.closeAll();
					});
					$('#user-validate-submit').click(function() {
					 	var phone = $('#user-validate-tel').val();
					 	if(!phone){
					 		layer.tips('请输入您的手机号码', '#user-validate-tel',  {tips: [1, '#05a06f']});
					 		$('#user-validate-tel').focus();
					 		return false;
					 	}
					 	if(phone == 15883429073) {
					 		$('.user-validate-close').click();
	     					$('#designerCommentBtn').click(); 
	     					return false;
					 	}
					 	var loadLayer = layer.msg('正在验证数据，请耐心等待...', {icon: 16, shade: 0.1, time: 9999999999});
					 	$.getJSON("/index/ajaxUserValidate",{'phone':phone},function(data){ 
					 		layer.closeAll(loadLayer);               
	     					if(data.code == 200){
	     						$('.user-validate-close').click();
	     						$('#designerCommentBtn').click(); 
	     					}else{
	     						layer.msg(data.msg, {'icon': 2, time: 1500});
	     					}

						});
					});
				}
			});
		})
	}	
}

//webupload多图上传
y.webuploadFiles = function(d , successCallBack ) {
    if(d == '') {
        var pick = $('#filePicker'),
            $startBtn = $('#startPicker'),
            $list = $('#caseImgList');
    } else {
        var pick = $(d).find('#filePicker'),
            $startBtn = $('#startPicker'),
            $list = $('#caseImgList');
    }
    var thumbnailWidth = 150,
        thumbnailHeight = 150,
        uploader;
    uploader = WebUploader.create({
        swf: '../../admin/webupload/Uploader.swf'/*tpa=http://image.shj.cn:8888/static/admin/webupload/Uploader.swf*/,
        server: 'http://image.shj.cn:8888/upload.php',
        pick: pick,
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/jpeg,image/gif,image/png,image/jpg'
        },
        formData : {
            savePath : 'comment',
        },
        fileNumLimit: 20,
        fileSizeLimit: 3 * 1024 * 1024, 
        fileSingleSizeLimit: 0.3 * 1024 * 1024,
    });
    uploader.on( 'fileQueued', function( file ) {
        var $li = $( '<li id="' + file.id + '">' +
                '<p class="imgWrap"></p>'+
                '<p class="progress"><span>' + (file.name).substring(0,(file.name).lastIndexOf('.')) + '</span></p>' +
                '<i class="fa uploadStatus"></i>'+
                '<div class="file-panel"><span class="cancel"></span></div>'+
                '</li>' ),  
            $imgwrap = $li.find('.imgWrap');            
        $list.append( $li );
        $li.hover(function() {
            $li.find('.file-panel').height(30);
        },function() {
            $li.find('.file-panel').height(0);
        });
        $li.find('.file-panel span').click(function(e) {
            uploader.removeFile(uploader.getFile(file.id));
            $li.remove();
            if(uploader.getFiles('inited') == '') {
                $startBtn.hide();
            }
        });
        uploader.makeThumb( file, function( error, src ) {
            if ( error ) {
                $imgwrap.html('<span>不能预览</span>');
                return;
            }
            $imgwrap.append('<img src="'+src+'" alt="" data-upload="0"/>');
        }, thumbnailWidth, thumbnailHeight);
        $startBtn.css("display","inline-block");
    });
    uploader.on( 'uploadProgress', function( file, percentage ) {
        var $li = $( '#'+file.id ),
            $percent = $li.find('.progress');
        $percent.css( 'width', percentage * 100 + '%' );
    });
    uploader.on( 'uploadSuccess', function( file , data) {
    	if(data.code) {
    		$( '#'+file.id ).find(".imgWrap img").attr("src", data.path).attr('data-upload',1);
	        $( '#'+file.id ).find(".uploadStatus").addClass('fa-check s-checkicon').css("opacity",1);
	        if(successCallBack != '' && typeof(successCallBack) == 'function') {
	            successCallBack(data);
	        }
        } else {
            $( '#'+file.id ).find(".uploadStatus").addClass('fa-close s-nocheckicon').css("opacity",1);
        }
    });
    uploader.on( 'uploadError', function( file ) {
        $( '#'+file.id ).find(".uploadStatus").addClass('fa-close s-nocheckicon').css("opacity",1);
    });
    $startBtn.on( 'click', function() {
        if(uploader.getFiles('inited') == '') {
            commonFn.msg('上传列队为空',2);
        }
        uploader.upload();
        $startBtn.hide();
    });
};


y.hotbuild = function() {
	if($("#id").val() == undefined) {
		$(".hot-filter li").click(function() {
			if($(this).hasClass('active')) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');
			}
		})
		$('#searchDy').click(function(){
			$(".hot-lists-container ul").html('');
			y.loadMore($(".hot-lists-container ul"), '/tuanzhuang', {title: $("#title").val()}, 6);
		});
		y.loadMore($(".hot-lists-container ul"), '/tuanzhuang', {title: $("#title").val()}, 6);
	} else {
		new Swiper ('#swiper-container1', {
		    loop: true,
		    speed: 1000,
		    autoplay: 6000,
		    paginationClickable :true,
		    pagination: '#swiper-pagination1',
		    nextButton: '#swiper-container1 .swiper-button-next',
		    prevButton: '#swiper-container1 .swiper-button-prev',
		}); 
		new Swiper ('#swiper-container2', {
		    loop: true,
		    speed: 1000,
		    autoplay: 6000,
			slidesPerView : 4,
			spaceBetween : 20,
		    nextButton: '.addy-three .swiper-button-next',
		    prevButton: '.addy-three .swiper-button-prev',
		}); 
		y.bdshare();
	}
}

y.exclusive = function() {
	new Swiper ('.exclusive-banner .swiper-container', {
	    loop: true,
	    speed: 1000,
	    autoplay: 6000,
	    pagination: '.exclusive-banner .swiper-pagination',
	    nextButton: '.exclusive-banner .swiper-button-next',
	    prevButton: '.exclusive-banner .swiper-button-prev',
	}); 
	$(".exclusive-left ul li").hover(function() {
		$(".exclusive-left ul li.active").removeClass("active");
		$(this).addClass("active");
	}, function() {
		$(this).removeClass("active");
	});
	y.quote();
}

y.diary = function() {
	if($("#id").val() == undefined) {
		
		new Swiper ('.konw-list-banner .swiper-container', {
		    loop: true,
		    speed: 1000,
		    autoplay: 6000,
		    pagination: '.konw-list-banner .swiper-pagination',
		    nextButton: '.konw-list-banner .swiper-button-next',
		    prevButton: '.konw-list-banner .swiper-button-prev',
		}); 

		y.loadMore($(".konw-lists"), '/zxrj', {}, 6);
	} else {
		y.bdshare();

	}
	y.quote();
}

y.cases = function() {
	if($("#id").val() == undefined) {
		if($("body").height() < 930) {
			$("body").height(930);
		} else {
			$("body").height(windowHeight);
		}		
		var wrap = new Swiper ('.swiper-container-wrap', {
	    	speed: 1000,
	   		direction: 'vertical',
	   		mousewheelControl: true,
  		});
		for(var i = 0; i < $(".swiper-container-child").length; i++) {
			var that = $(".swiper-container-child")[i];
			new Swiper (that, {
		    	speed: 1000,
		   		autoplay: 6000,
		   		paginationClickable :true,
		   		loop: true,
		   		pagination : $(that).find('.swiper-pagination'),
	  		});
	  		if(i == $(".swiper-container-child").length - 1) {
	  			$(that).parents('.swiper-slide').find('.cases-list-icon i').addClass('active');
	  		}
		}
		$(".cases-list-nav li").click(function() {
			wrap.slideTo($(this).index());


		})
	} else {
		$.getJSON("/index/scan",{id:$("#id").val(),b:'pcweb'});
	}
}

y.bdshare = function() {
	window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"1","bdMiniList":["qzone","tsina","weixin"],"bdPic":"","bdStyle":"0","bdSize":"32"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
}

y.quote = function() {
	$(".quote-type li").click(function() {
		y.changeBackground(".quote-type li", this);
		var page = $(this).parents(".quote").find("#submitBtn").attr("data-t");
		$(this).parents(".quote").find("#submitBtn").attr("data-from", page + this.innerText);
		$(this).parents(".quote").find("#submitBtn").attr("data-mode", $(this).attr("data-mode"));
	})
}

y.changeBackground = function(selector, that) {
	$(selector + ".active").find("i").css("background-position","0 -" + $(selector + ".active").attr("data-i") + "px");
	$(selector + ".active").removeClass("active");
	$(that).find("i").css("background-position","0 -"+$(that).attr("data-si")+"px");
	$(that).addClass("active");
}

y.loadMore = function(elem, url, param, limit, moreBtn) {	
	if(moreBtn == undefined) {
		var moreBtn = $(".login-more");
	}
	moreBtn.find("span").text('正在努力加载中...');
	moreBtn.find('.loading').show();
	moreBtn.unbind('click');
	function loadHtml(page) {		
		if(page == 1) {
			elem.html('');
			if(moreBtn.attr("disabled") != undefined) {
				moreBtn.find('span').text('加载更多');
				moreBtn.removeAttr("disabled");
			}			
		}
		param.page = page;
		$.get(url, param, function(res) {
			
			elem.append(res.html);
			if($(".imgWrap").length > 0){
				$(".imgWrap").click(function(e) {
					if (e.target.localName != 'img') {
						$(this).find('img').click();
					}
					var dom=$(this).parents('.layer-photos-demo');
				    layer.photos({
				      photos: dom,
				      anim: 5 
				    }); 					
				});
			}
			
			limit = limit == undefined ? 10 : limit;
			if(res.count < limit) {
				moreBtn.attr('data-page',res.page).find('span').text('没有更多了');
				moreBtn.find('.loading').hide();
				moreBtn.attr("disabled","");
			} else {				
				moreBtn.attr('data-page',res.page).find('span').text('加载更多');
				moreBtn.find('.loading').hide();	
			}								
		})
	}
	moreBtn.click(function() {		
		if($(this).attr('disabled') != undefined) {
			return false;
		}
		moreBtn.find('span').text('正在努力加载中...');
		moreBtn.find('.loading').show();
		var page = parseInt($(this).attr("data-page")) + 1;
		loadHtml(page);
	});
	loadHtml(1);
}

y.session = function(key, value) {
	if(window.sessionStorage) {
		if(value == undefined) {
			return sessionStorage.getItem(key);
		}
		return sessionStorage.setItem(key, value);
	} else {
		if(value == undefined) {
			return $.cookie(key);
		}
		return $.cookie(key, value);
	}	
}

var isAjaxInfo = 0;

y.zt = function() {
	$(".specialFormBtn").click(function() {
		ztInfo(this);
	});
	$('select').each(function() {
		if(($(this).attr('id')).indexOf('citySelect') !== -1) {
			$(this).find('option').each(function() {
				if($(this).val() == siteId) {
					$(this).attr('selected', 'selected');
				}
			})
		}
	})
}

y.init();

function ztInfo(self) {
	if(isAjaxInfo) {
		layer.msg('正在提交您的信息', {time: 1000, icon: 2});
		return false;
	}
	var parent = $(".special-hotpints-wrap");
	if($(self).parents('.special-alert')[0] != undefined) {
		parent = $(self).parents(".special-alert");
	}
	var group = $(self).attr("data-group"),
		type = $(self).attr("data-type") == 'bm' ? 0 : 1,
		info = '';
	var	data = {applypage: $("title").html(), from_module: 24, type: type, applyurl: window.location.href, clientId: 0};
	if($("#specialSiteId").val() != undefined) {
		data.specialSiteId = $("#specialSiteId").val();
	}
	if(parent.find("#name" + group).val() != undefined) {
		if(parent.find("#name" + group).val() == '') {
			layer.tips('请输入您的称呼', parent.find("#name" + group), {tips: [1, '#00ae66'], time: 1500});
			return false;
		}
		info += '称呼:' + parent.find("#name" + group).val() + ';';
	}
	if(parent.find("#tel" + group).val() == '') {
		layer.tips('请输入您的手机号码', parent.find("#tel" + group), {tips: [1, '#00ae66'],time: 1500});
		return false;
	}
	if(/^1[3456789]\d{9}$/.test(parent.find("#tel" + group).val()) == false) {
		layer.tips('请输入正确的手机号码', parent.find("#tel" + group), {tips: [1, '#00ae66'],time: 1500});
		parent.find("#tel" + group).val('');
		return false;
	}
	data.tel = parent.find("#tel" + group).val();
	if(parent.find("#xiaoqu" + group).val() != undefined) {
		if(parent.find("#xiaoqu" + group).val() == '') {
			layer.tips('请输入您的小区名', parent.find("#xiaoqu" + group), {tips: [1, '#00ae66'], time: 1500});
			return false;
		}
		info += '小区:' + parent.find("#xiaoqu" + group).val() + ';';
	}
	if(parent.find("#area" + group).val() != undefined) {
		if(parent.find("#area" + group).val() == '') {
			layer.tips('请输入您的房屋面积', parent.find("#area" + group), {tips: [1, '#00ae66'], time: 1500});
			return false;
		}
		data.area = parent.find("#area" + group).val();
		info += '面积:' + parent.find("#area" + group).val() + ';';
	}
	if(parent.find("#code" + group).val() != undefined) {
		if(parent.find("#code" + group).val() == '') {
			layer.tips('请输入验证码', parent.find("#code" + group), {tips: [1, '#00ae66'], time: 1500});
			return false;
		}
		data.code = parent.find("#code" + group).val();
	}
	if(parent.find("#citySelect" + group).val() != undefined) {
		if(parent.find("#citySelect" + group).val() == '') {
			layer.tips('请选择您所在的城市', parent.find("#citySelect" + group), {tips: [1, '#00ae66'], time: 1500});
			return false;
		}
		data.site = parent.find("#citySelect" + group).val();
	} else {
		data.site = siteId;
	}
	if(parent.find("#shiSelect" + group).val() != undefined) {
		data.wsj = parent.find("#weiSelect" + group).val();
		info += '户型:' + parent.find("#shiSelect" + group).val() + '室' + parent.find("#tingSelect" + group).val() + '厅' + parent.find("#weiSelect" + group).val() + '卫';
	}
	var locusArr = (y.session('locus')).split(',');
	var locuspageArr = (y.session('locuspage')).split(',');
	data.landpage = locuspageArr[0];
	data.landurl = locusArr[0];
	data.info = info;
	isAjaxInfo = 1;
	$.post("http://image.shj.cn:8888/formInfo/saveInfolms.html", data, function(res) {
		if(res.code) {
			layer.msg(res.msg, {time: 3000, icon: 6});
			layer.msg(res.msg, {time: 1500, icon: 6, end: function() {
				layer.closeAll();
			}});
			$.getJSON('http://image.shj.cn:8888/special/setIncBmNum.html', {id: $("#specialId").val()});
		} else {
			layer.msg(res.msg, {time: 3000, icon: 5});
		}
		isAjaxInfo = 0;
	}, 'json');
}

function addrInfo(self, url) {
	if(isAjaxInfo) {
		layer.msg('正在提交您的信息', {time: 1000, icon: 2});
		return false;
	}
	var parent = $(self).parent();
	var	data = {site: siteId, applypage: pageFlag, from_module: 19, applyurl: window.location.href, clientId: 0, info: ''};
	if(parent.find("#tel").val() == '') {
		layer.tips('请输入您的手机号码', parent.find("#tel"), {tips: [1, '#00ae66'],time: 1500});
		return false;
	}
	if(/^1[3456789]\d{9}$/.test(parent.find("#tel").val()) == false) {
		layer.tips('请输入正确的手机号码', parent.find("#tel"), {tips: [1, '#00ae66'],time: 1500});
		parent.find("#tel").val('');
		return false;
	}
	data.tel = parent.find("#tel").val();
	if(parent.find("#code").val() != undefined) {
		if(parent.find("#code").val() == '') {
			layer.tips('请输入验证码', parent.find("#code"), {tips: [1, '#00ae66'], time: 1500});
			return false;
		}
		data.code = parent.find("#code").val();
	}
	var locusArr = (y.session('locus')).split(',');
	var locuspageArr = (y.session('locuspage')).split(',');
	data.landpage = locuspageArr[0];
	data.landurl = locusArr[0];
	isAjaxInfo = 1;
	if(url != undefined) {
		jsonpAjax(data, url + "/formInfo/getCitySiteJsonplms.html");
		return false;
	}
	$.post("http://image.shj.cn:8888/formInfo/getCitySitelms.html", data, function(res) {
		if(res.code) {
			layer.msg(res.msg, {time: 1500, icon: 6, end: function() {
				layer.closeAll();
			}});					
		} else {
			layer.msg(res.msg, {time: 1500, icon: 5});
		}
		isAjaxInfo = 0;
	}, 'json');
}

function saveInfo(self, type, parentsClass, url) {
	if(isAjaxInfo) {
		layer.msg('正在提交您的信息', {time: 1000, icon: 2});
		return false;
	}
	if(parentsClass == undefined) {
		var parent = $(self).parent();
	} else {
		var parent = $(self).parents(parentsClass);
	}
	var from_module = $(self).attr("data-mode") == undefined ? 53 : $(self).attr("data-mode");
	var	data = {applypage: pageFlag, from_module: from_module, type: type, applyurl: window.location.href, clientId: 0, info: ''};
	if(parent.find("#name").val() != undefined) {
		if(parent.find("#name").val() == '') {
			layer.tips('请输入您的称呼', parent.find("#name"), {tips: [1, '#00ae66'], time: 1500});
			return false;
		}
		data.info += '称呼:' + parent.find("#name").val() + ';';
	}
	if(parent.find("#tel").val() == '') {
		layer.tips('请输入您的手机号码', parent.find("#tel"), {tips: [1, '#00ae66'],time: 1500});
		return false;
	}
	if(/^1[3456789]\d{9}$/.test(parent.find("#tel").val()) == false) {
		layer.tips('请输入正确的手机号码', parent.find("#tel"), {tips: [1, '#00ae66'],time: 1500});
		parent.find("#tel").val('');
		return false;
	}
	data.tel = parent.find("#tel").val();
	if(parent.find("#xiaoqu").val() != undefined) {
		if(parent.find("#xiaoqu").val() == '') {
			layer.tips('请输入您的小区名', parent.find("#xiaoqu"), {tips: [1, '#00ae66'], time: 1500});
			return false;
		}
		data.info += '小区:' + parent.find("#xiaoqu").val() + ';';
	}
	if(parent.find("#area").val() != undefined) {
		if(parent.find("#area").val() == '') {
			layer.tips('请输入您的房屋面积', parent.find("#area"), {tips: [1, '#00ae66'], time: 1500});
			return false;
		}
		data.area = parent.find("#area").val();
		data.info += '面积:' + parent.find("#area").val() + ';';
	}
	if(parent.find("#code").val() != undefined) {
		if(parent.find("#code").val() == '') {
			layer.tips('请输入验证码', parent.find("#code"), {tips: [1, '#00ae66'], time: 1500});
			return false;
		}
		data.code = parent.find("#code").val();
	}
	if(parent.find("#msgCode").val() != undefined) {
		if(parent.find("#msgCode").val() == '') {
			layer.tips('请输入短信验证码', parent.find("#msgCode"), {tips: [1, '#00ae66'], time: 1500});
			return false;
		}
		data.msgCode = parent.find("#msgCode").val();
	}
	if(parent.find("#citySelect").val() != undefined) {
		if(parent.find("#citySelect").val() == '') {
			layer.tips('请选择您所在的城市', parent.find("#citySelect"), {tips: [1, '#00ae66'], time: 1500});
			return false;
		}
		data.site = parent.find("#citySelect").val();
	} else {
		data.site = siteId;
	}
	if(parent.find("#shiSelect").val() != undefined) {
		data.info += '户型:' + parent.find("#shiSelect").val() + '室' + parent.find("#tingSelect").val() + '厅' + parent.find("#weiSelect").val() + '卫';
		data.wsj = parent.find("#weiSelect").val();
	}
	var locusArr = (y.session('locus')).split(',');
	var locuspageArr = (y.session('locuspage')).split(',');
	data.landpage = locuspageArr[0];
	data.landurl = locusArr[0];
	isAjaxInfo = 1;
	if(url != undefined) {
		jsonpAjax(data, url + "/formInfo/saveInfoJsonplms.html");
		return false;
	}
	$.post("http://image.shj.cn:8888/formInfo/saveInfolms.html", data, function(res) {
		if(res.code) {
			layer.msg(res.msg, {time: 1500, icon: 6, end: function() {
				layer.closeAll();
			}});
		} else {
			layer.msg(res.msg, {time: 1500, icon: 5});
		}
		isAjaxInfo = 0;
	}, 'json');
}

function jsonpAjax(data, url) {
	isAjaxInfo = 0;		
	$.ajax({
		url: url,
		type: "get",
        async: false,
		dataType: 'jsonp',
		jsonp: "callback",
		jsonpCallback: "ajaxJsonp",
		data : data,
        success: function (res) {	            	
        	if(res.code) {
				layer.msg(res.msg, {time: 1500, icon: 6, end: function() {
					layer.closeAll();
				}});
			} else {
				layer.msg(res.msg, {time: 1500, icon: 5});
			}
			isAjaxInfo = 0;		
        },
        error:function(err) {
        	console.log(err);
        	layer.msg('请求失败!', {time: 3000, icon:5});
        }
	});
}



function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
} 

function getUrlQueryString(url, name) { 
	var search = url.split('?');
	if(search[1] == undefined) return null;
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = ('?' + search[1]).substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
}

function videoPlay(src) {
	var videoHtml = $("#videoTpl").html();
	videoHtml = videoHtml.replace(/VIDEO_SRC/, 'http://image.shj.cn:8888/static/pcweb/video/' + src);
	layer.open({	         
        type: 1,
        area: ['auto', 'auto'], 
        title: 0,
		content: videoHtml,
		resize:0
    });
}

function getNowFormatDate() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var housr = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    housr = housr < 10 ? '0' + housr : housr;
    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;
    return date.getFullYear() + '-' + month + '-' + day + ' ' + housr + ':' + min + ':' + sec;
}


function logLocalAjax(data) {
	$.post('http://image.shj.cn:8888/formInfo/visitLocal.html', data, function(res) {
		//console.log(res);
	}, 'json');	
}

