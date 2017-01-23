$(function () {
    //search搜索框
    (function () {
        var aLi=$('#menu li');
        var oText=$('#search').find('.form .text');
        var arrText = [
            '例如：荷棠鱼坊烧鱼 或 樱花日本料理',
            '例如：昌平区育新站龙旗广场2号楼609室',
            '例如：万达影院双人情侣券',
            '例如：东莞出事了，大老虎是谁？',
            '例如：北京初春降雪，天气变幻莫测'
        ];

        var iNow=0;

        oText.val(arrText[iNow]);

        aLi.each(function (index) {
            $(this).click(function () {
                aLi.attr('class','gradient');

                $(this).attr('class','active');

                iNow=index;
                oText.val(arrText[iNow]);
            })
        })

        oText.focus(function () {
            if($(this).val() == arrText[iNow]){
                $(this).val('');
            }
        })
        oText.blur(function () {
            if($(this).val() == ''){
                $(this).val(arrText[iNow]);
            }
        })
    })();
    //updata文字滚动
    (function () {
        var oDiv=$('.updata');
        var oUl=oDiv.find('ul');
        var iH=0;
        var arrData=[
            { 'name':'萱萱', 'time':4, 'title':'那些灿烂华美的瞬间', 'url':'https://zhidao.baidu.com/question/1176623290627614539.html' },
            { 'name':'畅畅', 'time':5, 'title':'广东3天抓获涉黄疑犯', 'url':'http://news.163.com/14/0213/08/9KUTBGEV00014AED.html' },
            { 'name':'欢欢', 'time':6, 'title':'国台办回应王郁琦', 'url':'http://bbs.tianya.cn/post-worldlook-1018002-1.shtml' },
            { 'name':'笑笑', 'time':7, 'title':'那些灿烂华美的瞬间', 'url':'https://zhidao.baidu.com/question/1176623290627614539.html' },
            { 'name':'卷毛', 'time':8, 'title':'那些灿烂华美的瞬间', 'url':'https://zhidao.baidu.com/question/1176623290627614539.html' },
            { 'name':'PDD', 'time':9, 'title':'广东3天抓获涉黄疑犯', 'url':'http://news.163.com/14/0213/08/9KUTBGEV00014AED.html' },
            { 'name':'大哥', 'time':10, 'title':'国台办回应王郁琦', 'url':'http://bbs.tianya.cn/post-worldlook-1018002-1.shtml' },
            { 'name':'小妾', 'time':11, 'title':'那些灿烂华美的瞬间', 'url':'https://zhidao.baidu.com/question/1176623290627614539.html' }
        ];
        var str='';
        var oUpBtn=$('#updataUpBtn');
        var oDownBtn=$('#updataDownBtn');
        var iNow=0;
        var timer=null;

        for(var i=0;i<arrData.length;i++){
            str+='<li><a href="'+arrData[i].url+'"><strong>'+arrData[i].name+'</strong><span>'+arrData[i].time+'分钟前</span>写了一篇文章:'+arrData[i].title+'</a></li>';
        }
        oUl.html(str);

        iH=oUl.find('li').height();

        function doMove(num) {
            iNow+=num;
            if(Math.abs(iNow)>arrData.length-1){
                iNow=0;
            }

            if(iNow>0){
                iNow= -(arrData.length-1);
            }

            oUl.stop().animate({'top':iH*iNow},2500);
        }

        function autoMove() {
            timer=setInterval(function () {
                doMove(-1);
            },3500)
        }
        autoMove();

        oDiv.hover(function () {
            clearInterval(timer);
        },autoMove);
        oUpBtn.click(function () {
            doMove(-1);
        })
        oDownBtn.click(function () {
            doMove(1);
        })
    })();
    //tab选项卡切换
    (function () {
        function Tab(oNav,aCon,sEvent) {
            var aElem=oNav.children();
            aCon.hide().eq(0).show();

            aElem.each(function (index) {
                $(this).on(sEvent,function () {
                    aElem.removeClass('active').addClass('gradient');
                    $(this).removeClass('gradient').addClass('active');
                    aElem.find('a').attr('class','triangle_down_gray');
                    $(this).find('a').attr('class','triangle_down_red');
                    aCon.hide().eq(index).show();
                })
            })
        }

        Tab($('.tabNav1'),$('.tabCon1'),'click');
        Tab($('.tabNav2'),$('.tabCon2'),'click');
        Tab($('.tabNav3'),$('.tabCon3'),'mouseover');
        Tab($('.tabNav4'),$('.tabCon4'),'mouseover');
    })();
    //fade焦点图切换
    (function () {
        var oDiv=$('#fade');
        var aUlLi=oDiv.find('ul li');
        var aOlLi=oDiv.find('ol li');
        var aP=oDiv.find('p');
        var arr=['爸爸去哪儿', '人像摄影中的光影感', '娇柔妩媚、美艳大方'];
        var iNow=0;
        var timer=null;

        function Fade() {
            aUlLi.each(function (i) {
                if(i!=iNow){
                    aUlLi.eq(i).fadeOut().css('zIndex',1);
                    aOlLi.eq(i).removeClass('active');
                }else{
                    aUlLi.eq(i).fadeIn().css('zIndex',2);
                    aOlLi.eq(i).addClass('active');
                }
            })
            aP.text(arr[iNow]);
        }

        function autoPlay() {
            timer=setInterval(function () {
                iNow++;
                iNow%=arr.length;
                Fade();
            },2500);
        }

        Fade();
        autoPlay();

        aOlLi.click(function () {
            iNow=$(this).index();
            Fade();
        });
        oDiv.hover(function () {
            clearInterval(timer);
        },autoPlay);


    })();
    //calendar日历
    (function () {
        var aSpan=$('.calendar h3 span');
        var aImg=$('.calendar .img');
        var oInfo=$('.today_info');
        var oImg=oInfo.find('img');
        var oStrong=oInfo.find('strong');
        var oP=oInfo.find('p');

        aImg.hover(function () {
            var iTop=$(this).parent().position().top-30;
            var iLeft=$(this).parent().position().left+55;
            var index=$(this).parent().index()%aSpan.length;

            oInfo.show().css({'top':iTop,'left':iLeft});
            oP.text($(this).attr('info'));
            oStrong.text(aSpan.eq(index).text());
            oImg.attr('src',$(this).attr('src'));
        },function () {
            oInfo.hide();
        })
    })();
    //BBS高亮显示
    (function () {
        var oLi=$('.bbs ol li');

        oLi.mouseover(function () {
            oLi.removeClass('active').eq($(this).index()).addClass('active');
        })
    })();
    //Hot区域蒙版效果
    (function () {
        var arr = [
            '',
            '用户1<br />人气1',
            '用户名：性感宝贝<br />区域：朝阳CBD<br />人气：124987',
            '用户3<br />人气3',
            '用户4<br />人气4',
            '用户5<br />人气5',
            '用户6<br />人气6',
            '用户7<br />人气7',
            '用户8<br />人气8',
            '用户9<br />人气9',
            '用户10<br />人气10'
        ];

        $('.hot_area li').mouseover(function () {
            if($(this).index()==0) return;

            $('.hot_area li p').remove();
            $(this).append('<p style="width:'+($(this).width()-12)+'px;height:'+($(this).height()-12)+'px;">'+arr[$(this).index()]+'</p>');
        })
    })();
});