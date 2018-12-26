/*---------------------------屏幕方格化碎裂事件---------------------------*/
//初始状态
function init() {
    var clwidth=parseInt(document.documentElement.clientWidth);
    var clheight=parseInt(document.documentElement.clientHeight);
    const FRAG_SIZE = clwidth/20;
    const H_FRAG_SIZE = clheight/10;
    var defaultEase = Sine.easeOut;
    var container = document.getElementById('container'),
        containerRect = container.getBoundingClientRect(),
        fragments = [],
        centerX = clwidth/2.1,
        centerY = clheight/2.1;
    TweenMax.set(container, {
       perspective:600
    });

    createFragments();
    createTweens();
    startUpdateLoop();
    //新建碎片
    function createFragments() {
        var fragment;

        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 20; j++) {
                fragment = document.createElement('div');
                fragment.className = 'fragment';
                TweenMax.set(fragment, {
                    x:j * FRAG_SIZE,
                    y:i * H_FRAG_SIZE
                });
                container.appendChild(fragment);
                fragments.push(fragment);
            }
        }
    }
    //新建形状补间动画
    function createTweens() {
        var tl = new TimelineMax({repeat:-1}),
            fragment,
            delay;
        for (var i = 0; i < fragments.length; i++) {
            fragment = fragments[i];
            delay = 1 - (i % 20) * randomRange(0.04, 0.06);
            if (i < (clheight/2*20)) {
                tl.insert(createArcTween(fragment), delay);
            } else {
                tl.insert(createStraightTween(fragment), delay);
            }
        }
    }
    //新建特殊形状
    function createSpecialTween(fragment) {
        var bezierPoints = [
                {x:centerX - 24, y:-256},
                {x:centerX - 24, y:centerY - 24}
            ];
        var tl = new TimelineMax(),
            tween1 = TweenMax.to(fragment, 1.2, {
                bezier:{type:'soft', values:bezierPoints},
                ease:defaultEase
            }),
            tween2 = TweenMax.to(fragment, 1.2, {
                z:525,
                rotationX:360,
                rotationY:360,
                ease:defaultEase
            });
        tl.insert(tween1);
        tl.insert(tween2);
        return tl;
    }
    //新建圆形状
    function createArcTween(fragment) {
        var dx = (centerX - fragment._gsTransform.x - 24),
            dy = (centerY - fragment._gsTransform.y - 24);
        var bezierPoints = [
            {x:fragment._gsTransform.x, y:fragment._gsTransform.y - dy},
            {x:fragment._gsTransform.x, y:containerRect.bottom}
        ];
        var tl = new TimelineMax(),
            tween1 = TweenMax.to(fragment, randomRange(3.2, 3.1), {
                bezier:{values:bezierPoints},
                ease:defaultEase
            }),
            tween2 = TweenMax.to(fragment, randomRange(3.2, 3.1), {
                z:randomRange(800, 1000),
                rotationX:randomRange(360, 1080),
                rotationY:randomRange(360, 1080),
                ease:defaultEase
            });
        tl.insert(tween1);
        tl.insert(tween2);
        return tl;
    }
    
    function createStraightTween(fragment) {
        var dx = (centerX - fragment._gsTransform.x - 24) * 4;
        return TweenMax.to(fragment, randomRange(3, 3.1), {
            x:-dx,
            y:window.innerHeight + containerRect.bottom + randomRange(0, 124),
            z:randomRange(300, 500) * (Math.random() > 0.5 ? 1 : -1),
            rotationX:randomRange(360, 1080),
            rotationY:randomRange(360, 1080),
            ease:defaultEase
        })
    }
    function startUpdateLoop() {
        tick();
        function tick() {
            var fragment,
                angleX,
                angleY;

            for (var i = 0; i < fragments.length; i++) {
                fragment = fragments[i];

                angleX = Math.abs(fragment._gsTransform.rotationX % 180 - 90) / 180;
                angleY = Math.abs(fragment._gsTransform.rotationY % 180 - 90) / 180;

                var l = Math.round((angleX + angleY) / 2 * 100);
                fragment.style.backgroundColor = 'hsl(203,100%,' + l + '%)';
                fragment.style.zIndex = Math.round(fragment._gsTransform.z);
            }
            requestAnimationFrame(tick);
        }
    }
    function randomRange(min, max) {
        return min + Math.random() * (max - min);
    }
    container.style.backgroundColor='hsl(203,100%,100%)';
}
/*--------------------------------第一页开始事件------------------------------*/
$(function(){
    var kaiguan=0;
    var clheight=parseInt(document.documentElement.clientHeight);
    $('.three_1,#squareone,#squaretwo,#squarethree,#sanjiao,#sanjiao_2').hide();
    $('.arc').click(function(){
        if(kaiguan==0){
            $('.arc p').fadeOut(500);
            setTimeout(text1,1000);
            function text1(){
                $('.arc p').text('OK').fadeIn(500);
                setTimeout(text2,1000);
            }
            function text2(){
                $('.arc p').fadeOut(500);
                setTimeout(text3,1000);
            }
            function text3(){
                $('.arc p').text('现在开始').fadeIn(500);
                setTimeout(xs,1000);
            }
            function xs(){
                $('.arc').addClass("arcs");
                function xiaoshi(){
                    $('.arc,.arc_after,.arc_before').hide();
                    $('#pageTwo').attr('class','pageTwoanimate');
                    setTimeout(pageTwoHei,2200);
                }
                function disnone(){
                    $('.pageOne').hide();
                    pageTwoStart();
                }
                setTimeout(xiaoshi,1100);
                setTimeout(init,1000);
                setTimeout(disnone,3500);
                function pageTwoHei(){
                     $('#pageTwo').animate({'height':clheight+'px'},1000);
                }
            }
            kaiguan=1;
        }
        /*---------------------------第二页开头事件-------------------------*/
        function pageTwoStart(){
            setTimeout(isone,1000);
            function isone(){
                $('.three_1').show();
                $('.three_1').animate({top:'44%'},1000,'easeOutBounce')
                setTimeout(istwo,1000);
            }
            function istwo(){
                $('.three_1').fadeOut(1000);
                setTimeout(isthree,1000);
            }
            function isthree(){
                $('.three_1').text('My 资料').fadeIn(1000);
                setTimeout(isfour,1000);
            }
            function isfour(){
                $('.three_1').fadeOut(1000);
                setTimeout(isfive,1000);
            }
            function isfive(){
                $('#squareone,#squaretwo,#squarethree,#sanjiao,#sanjiao_2').fadeIn(1000);
                $('#sanjiao_2').attr('class','sanjiao_2s_ani');
                setTimeout(issix,500);  
            }
            function issix(){
                $('#sanjiao').attr('class','sanjiaos_ani');
                setTimeout(isseven,500);
            }
            function isseven(){
                $('#squarethree').attr('class','squarethrees_ani');
                setTimeout(iseight,500);
            }
            function iseight(){
                $('#squaretwo').attr('class','squaretwos_ani');
                setTimeout(isnight,500);
            }
            function isnight(){
                $('#squareone').attr('class','squareones_ani');
                setTimeout(isten,500);
            }
            function isten(){
                $('#circle').css('top','-75vw').animate({top:'-50vw'},1200,'easeOutBounce');
                setTimeout(isones,1200);
            }
            function isones(){
                $('.three_1').css('top','8%');
                $('.three_1').text('想看，那要自己打开(键盘)').fadeIn(1000);
                setTimeout(istwos,1500);
            }
            function istwos(){
                $('.three_1').fadeOut(1000);
            }
        }
    })
})
/*-------------------------------弹跳下落方法--------------------------------*/
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend( jQuery.easing,
{
    def: 'easeOutQuad',
    easeOutBounce: function (x, t, b, c, d) {
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        }
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    }
})
/*------------------------------小球移动游戏----------------------------*/
$(function(){
    var clheight=parseInt(document.documentElement.clientWidth);

    document.onkeydown=function(event){
        //var moveleft = parseInt($('#circle').css('left'));
        var moveleft=$('#circle').offset().left;

        var w1=clheight*(1-0.36)/2-clheight*0.02;
        var w2=clheight*(1-0.32)-clheight*0.02;
        var w3=clheight-clheight*0.05;
        var w4=clheight*(0.36-0.05);
        var w5=clheight*(1-0.36);
        var gettop;
        switch(event.keyCode){
            case 37:
                gettop = Math.round(clheight/(parseInt($('#circle').css('top'))));
                switch(gettop)
                {
                    case -2:
                        $('#circle').css('left','-='+20+'px');
                        if(moveleft < w1){
                            $('#circle').animate({top:'-35vw'},1200,'easeOutBounce');
                        }
                    break;
                    case -3:
                        if(moveleft > 0){ 
                            $('#circle').css('left','-='+20+'px'); 
                            if(moveleft > w5 &&  moveleft < w5+20){
                                $('#circle').attr('class','circles');
                                setTimeout(pageThreeshow,1500);
                            }
                        }
                    break;
                }
            break;
            case 39:
                gettop = Math.round(clheight/(parseInt($('#circle').css('top'))));
                switch(gettop)
                {
                    case -2:
                        $('#circle').css('left','+='+20+'px');
                        if(moveleft > w2){
                            $('#circle').animate({top:'-35vw'},1200,'easeOutBounce');
                        }
                    break;
                    case -3:
                        if(moveleft < w3){
                            $('#circle').css('left','+='+20+'px'); 
                            if(moveleft > w4 &&  moveleft < w4+20){
                                $('#circle').attr('class','circles');
                                setTimeout(pageThreeshow,1500);
                            }
                        }
                    break;
                }
                break;
        }
        function pageThreeshow(){
            $('#pageTwo').fadeOut(1000);
            $('#pageThree').fadeIn(1000);
        }
        // console.log(moveleft);
        // console.log(w4);
    }  
})
/*---------------------------------第三页------------------------------------*/
$(function(){
    var clwidth;
    var clheight
    pingxingsibian();
    window.onresize=function(){
        pingxingsibian();
    }
    function pingxingsibian(){
        clwidth=parseInt(document.documentElement.clientWidth);
        clheight=parseInt(document.documentElement.clientHeight);
        var count=Math.atan2(clheight,clwidth/2).toFixed(2);
        var rad=(count*57.30).toFixed(2);
        $('.Threeimg_one').css('-webkit-transform','skew('+(90-rad)+'deg)');
        $('.Threeimg_one img,.mengban').css('-webkit-transform','skew('+(rad-90)+'deg)');
    }

    /*-----------------------------图片轮换-----------------------------*/
    $('.pageThree_ul li').clone().appendTo(".pageThree_ul");
    var aniforthree;
    var aniforthree_plus;
    var forleft=$('.pageThree_ul').css('left');
    var num=Math.ceil(clwidth*(-0.25));
    var numplus=Math.ceil(clwidth*(-3.75));

    $('.moveleft').hover(function(){
        aniforthree=setInterval(aniforthreepage,1200);
    },function(){
        clearInterval(aniforthree);
    })
    function aniforthreepage(){
        forleft=parseInt($('.pageThree_ul').css('left'));
        if(forleft<=num && forleft>=num-200){
            $('.pageThree_ul').css('left','-275%');
            $('.pageThree_ul').animate({left:'+=50%'},1000,'easeInOutQuad');
        } else {
            $('.pageThree_ul').animate({left:'+=50%'},1000,'easeInOutQuad');
        }
        console.log(forleft);
        console.log(num);
    }

    $('.moveright').hover(function(){
        aniforthree_plus=setInterval(aniforthreepage_plus,1200);
    },function(){
        clearInterval(aniforthree_plus);
    })
    function aniforthreepage_plus(){
        forleft=parseInt($('.pageThree_ul').css('left'));
        if(forleft<=numplus && forleft>=numplus-200){
            $('.pageThree_ul').css('left','-125%');
            $('.pageThree_ul').animate({left:'-=50%'},1000,'easeInOutQuad');
        } else {
            $('.pageThree_ul').animate({left:'-=50%'},1000,'easeInOutQuad');
        }
        console.log(forleft);
        console.log(numplus);
    }
})