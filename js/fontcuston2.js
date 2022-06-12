function star() {
    var $body = document.querySelector('body');
    var $wr = $body.querySelector('.wrapper');
    var $sc = $body.querySelector('.scene');
    var $peoples = $body.getElementsByClassName('peopleImg');
    var $balloon = $body.querySelector('.balloon');
    var $serviceText = $body.querySelectorAll('.service .text');
    var $teamPeople = $body.querySelectorAll('.teamPeople');
    var $ProcessBox = $body.querySelectorAll('.Process .box');
    var $ProcessfireWorks = $body.querySelector('.Process .fireworks');
    var $ProcessData = $body.querySelector('.Process .data');
    var $caseitems = 0;
    var $pe = '';
    var peopleAnimation = false;
    var onScroll = false;
    var peWidtn = 0;
    var sceneAllWidth = [];
    var nowScrollTop = 0;
    var sceneBottomVue = 10;
    var scrollDirection = true;
    var peproleEventTime = null;
    var sceneAllWidthEnd = 0;

    function xmlHttpRequest(obj) {

        var type = obj.type || 'POST';
        return new Promise(function(resolve, reject) {
            var fd = new FormData(obj.el);
            var xhr = new XMLHttpRequest();
            xhr.open(type, obj.url, true);
            xhr.onload = function() { resolve(JSON.parse(xhr.responseText)) };
            xhr.onerror = function() { reject(JSON.parse(xhr.statusText)) };
            xhr.send(fd);
        });
    }

    function lightBox(t, s, p) {
        var $lightBox = $body.querySelector('.lightBox');
        var $lightBoxTitle = $lightBox.querySelector('.title>h2');
        var $lightBoxImg = $lightBox.querySelector('.img>img');
        var $lightBoxP = $lightBox.querySelector('.text>p');
        var $lightBoxClose = $lightBox.querySelectorAll('.close');
        $lightBoxTitle.innerHTML = t;
        $lightBoxImg.src = s;
        $lightBoxP.innerHTML = p;
        $lightBox.classList.add('active');
        $body.style.overflowY = 'hidden';
        for (let i = 0; i < $lightBoxClose.length; i++) {
            $lightBoxClose[i].addEventListener('click', function() {
                $lightBox.classList.remove('active');
                $body.style.overflowY = '';
            })
        }
    }

    function sceneMove() {
        // console.log('sceneMove')
        // Horizontal Scroll
        // var sceneAllWidthEnd = sceneAllWidth[4] - Math.round(window.innerWidth / 2) - Math.round(peWidtn / 2);
        // var sceneAllWidthEnd = sceneAllWidth[4];
        if (nowScrollTop < 0) {
            nowScrollTop = 0;
        }
        if (nowScrollTop > sceneAllWidthEnd) {
            nowScrollTop = sceneAllWidthEnd;
        }

        $wr.scrollLeft = document.documentElement.scrollTop = document.body.scrollTop = nowScrollTop;

        //scroll
        onScroll = false;
    }

    function random(option) {
        var maxNum = option.t || 5;
        var minNum = option.i || 1;
        return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    }

    function soundFn() {
        // console.log('soundFn');
        var snd = new Audio("./audio/0" + random({ t: 5, i: 1 }) + ".mp3");
        var button = document.querySelector('.sound');
        // console.log(snd);
        // snd.play();
        snd.loop = true;
        snd.volume = 0.5;
        button.addEventListener('click', function() {
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                snd.pause();
            } else {
                this.classList.add('active');
                snd.play();
            }
        })
    }

    // xmlHttpRequest({ url: './php/transfer.php?act=dream' }).then(function(data) {
    //sound
    soundFn();

    //輪播
    (function showslider() {
        var $slideshow = $body.querySelector('#slideshow');
        var $slideshowUl = $slideshow.querySelector('ul');
        var ob = '';
        // var cooperation = data.cooperation;

        // for (var i = 0; i < cooperation.length; i++) {
        //     ob += '<li><a href="' + cooperation[i].Content + '" target="_blank"><img src="' + cooperation[i].Cover0 + '" alt=""></a></li>'
        // }
        // $slideshowUl.innerHTML = ob;

        var button = $slideshow.querySelectorAll('.button')[0];
        var lis = $slideshow.querySelectorAll('li');
        var liLength = lis.length;
        var slideIndex = 0;

        //liWidth
        for (var i = 0; i < liLength; i++) {
            lis[i].style.left = (100 * i) + '%';
            lis[i].style.position = 'absolute';
        }
        button.onclick = function() {
            now(-1);
        };

        showSlides(slideIndex);

        function now(n) {
            var now = (slideIndex + n + liLength) % liLength;
            showSlides(now);
        }


        function showSlides(n) {
            //當前Index
            slideIndex = n;

            //ul move
            $slideshowUl.style.transform = 'translateX(-' + (100 * n) + '%)';
        }

        //auto
        var autoSlide = setInterval(function() {
            now(1);
        }, 8000)
        $slideshow.addEventListener('mouseover', function() {
            clearInterval(autoSlide);
        })
        $slideshow.addEventListener('mouseout', function() {
            autoSlide = setInterval(function() {
                now(1);
            }, 8000)
        })
    })();

    //案例
    (function caseFn() {
        var ob = '';
        // var product = data.product;
        var caseWidth = 0;
        var $case = $body.querySelectorAll('.case')[0];
        var $caseHtml = $case.querySelectorAll('.items')[0];

        function caseShowItemFn() {
            var i = 1;
            if (window.innerHeight > 1200) {
                i = 4;
            } else if (window.innerHeight > 930 && window.innerHeight < 1200) {
                i = 3;
            } else if (window.innerHeight < 930 && window.innerHeight > 680) {
                i = 2;
            } else if (window.innerHeight < 680) {
                i = 1;
            }
            return i;
        }
        for (var i = 0; i < 25; i++) {
            //     if (product[i].Url != '#') {
            //         ob += '<a class="item" href="' + product[i].Url + '" target="_blank"> ';
            //         ob += '<div class="img"><img src="' + product[i].Cover0 + '" alt=""></div>\
            //         <h6>' + product[i].Pname + '</h6>\
            //         <p>' + product[i].Content + '</p></a>';
            //     } else {
            //         ob += '<div class="item">';
            //         ob += '<div class="img"><img src="' + product[i].Cover0 + '" alt=""></div>\
            //         <h6>' + product[i].Pname + '</h6>\
            //         <p>' + product[i].Content + '</p></div>';
            //     };
            if (i % caseShowItemFn() == 0) {
                caseWidth += 230;
            }
        }
        // $caseHtml.innerHTML = ob;
        $caseHtml.style.width = caseWidth + 'px';
        $case.style.width = (caseWidth * 1 + 400) + 'px'
        var $divItems = $caseHtml.querySelectorAll('div.item');
        for (var i = 0; i < $divItems.length; i++) {
            $divItems[i].addEventListener("click", function() {
                lightBox(this.querySelectorAll('h6')[0].innerHTML, this.querySelectorAll('img')[0].src, this.querySelectorAll('p')[0].innerHTML);
            }, false)
        }
        $caseitems = $caseHtml.querySelectorAll('.item');
    })();

    //團隊
    (function teamFn() {
        // var teamjson = data.team;
        // for (let i = 0; i < $teamPeople.length; i++) {
        //     $teamPeople[i].addEventListener("click", function(e) {
        //         lightBox(teamjson[i].title + '<small>' + teamjson[i].subtitle + '</small>', teamjson[i].Cover0, teamjson[i].Content);
        //     }, false);
        // }

        var teamDate = [{
                Content: "個性雞婆，非常愛管事，做任何事總是衝第一，愛作夢，對未來抱著很大的夢想，嚮往能擁有像超級英雄般的能力，能夠打擊罪犯，是個標準的正義魔人，路見不平絕對會爬刀相助，絕不向惡勢力低頭。",
                Cover0: "./img/p08.jpg",
                subtitle: "程式部",
                title: "醬醬"
            },
            {
                Content: "一隻極為樂天派的貓熊，雖然非常貪吃，但很任勞任怨言聽計從，一說謊就臉紅的乖孩子音樂總是放得很大聲，似乎有點重聽傾向，但總能隨著音樂搖擺並揮霍著畫筆，大放藝術才華。",
                Cover0: "./img/p03.jpg",
                subtitle: "設計部",
                title: "達達"
            },
            {
                Content: "外表看似柔弱，事實上卻超級聰明狡猾，嘴上功夫非常了得，總能把黑的說成白，做錯事裝無辜的功力也是一流；南北奔波，練就一身瞬間移動的功夫，夢想是在下一次的動物馬拉松比賽得到第一。",
                Cover0: "./img/p05.jpg",
                subtitle: "業務部主管",
                title: "倍倍"
            },
            {
                Content: "因為一場意外墜落在地球，古靈精怪長講冷笑話，常常說出別人無法理解的話。不但電腦功力深厚，還有著尚未激發的特異功能。對地球上的事物充滿好奇，決定找份工作留下來在地球定居。",
                Cover0: "./img/p01.jpg",
                subtitle: "程式部",
                title: "呵呵"
            },
            {
                Content: "雖然年紀有點歲數，但成熟穩重和他一點都搭不上邊，笑點無敵低又愛作夢，常會不小心蹦出一些鬼點子；神出鬼沒的他，酒量深不可測，風流倜儻迷倒了不少少女們，果真不是小人物。",
                Cover0: "./img/p06.jpg",
                subtitle: "BOSS",
                title: "獅王爺"
            },
            {
                Content: "樂天衝動派隱藏版人物，不經常露臉，人脈很廣愛交朋友，也超級會social，一出現總會大方請客，看似凶狠的外表，其實很溫馴，但喝醉會發瘋就是了...",
                Cover0: "./img/p07.jpg",
                subtitle: "幕後金主",
                title: "GD"
            }
        ]

        for (let i = 0; i < $teamPeople.length; i++) {
            $teamPeople[i].addEventListener("click", function(e) {
                lightBox(teamDate[i].title + '<small>' + teamDate[i].subtitle + '</small>', teamDate[i].Cover0, teamDate[i].Content);
            }, false);
        }

    })();

    //服務
    // (function serviceFn() {
    //     var serverItem = data.serverItem;
    //     for (var i = 0; i < serverItem.length; i++) {
    //         $serviceText[i].innerHTML = '<h3 class="title">' + serverItem[i].title + '</h3><p>' + serverItem[i].Content + '</p>'
    //     }
    // })();

    //nav 
    (function nav() {
        var $nav = $body.querySelector('.nav');
        var $navGoTos = $nav.querySelectorAll('.menuGoTo');
        var $navogo = $nav.querySelector('.logo');
        var $navbutton = $nav.querySelector('.button');

        function menuGoTo(n, b) {
            if (b == undefined) {
                navShow()
            } else {
                $nav.classList.remove('active');
                $body.style.overflowY = '';
            }
            if (n == 0) {
                nowScrollTop = 0;
                init({})
                sceneMove();
            } else if (n == 3) {
                nowScrollTop = sceneAllWidth[2] + 200;
                init({})
                sceneMove()
            } else if (n == 5) {
                nowScrollTop = sceneAllWidth[3] + 2000;
                sceneEvent();
            } else {
                nowScrollTop = sceneAllWidth[n - 1] - 200;
                init({})
                sceneMove();
            };
        }

        function navShow() {
            if ($nav.classList.contains('active')) {
                $nav.classList.remove('active');
                $body.style.overflowY = '';
            } else {
                $nav.classList.add('active');
                $body.style.overflowY = 'hidden';
            };
        }
        for (let i = 0; i < $navGoTos.length; i++) {
            $navGoTos[i].addEventListener('click', function() {
                menuGoTo(i);
            })
        }
        $navogo.addEventListener('click', function() {
            menuGoTo(0, false);
        })
        $navbutton.addEventListener('click', function() {
            navShow();
        })
        isPeproleShow();
    })();

    //人物顯示
    function isPeproleShow(o) {
        var random = '';
        var isPeproleStandbyTimer = null;

        for (let i = 0; i < $peoples.length; i++) {
            $peoples[i].className = 'peopleImg'
        }
        if (o == undefined) {
            random = Math.floor(Math.random() * $peoples.length);
        } else {
            random = o;
        }
        $peoples[random].classList.add('active');
        $pe = $peoples[random];

        function isPeproleStandby() {
            var random = (Math.floor(Math.random() * 6) + 3) * 1000;
            clearTimeout(isPeproleStandbyTimer);
            isPeproleStandbyTimer = setTimeout(function() {
                peproleEvent('standby');
                isPeproleStandby();
            }, random)
        }
        isPeproleStandby();
        if (o == undefined) {
            resize();
        }
    }

    function resize() {
        // console.log('----resize----');
        ///Horizontal try 
        var windowInnerWidth = window.innerWidth;
        var windowInnerHeight = window.innerHeight;
        var scrollUnder = $wr.scrollWidth - windowInnerWidth + windowInnerHeight;
        document.body.style.height = scrollUnder + 'px';

        //peWidtn
        peWidtn = $pe.offsetWidth;

        //scrollTop
        // $wr.scrollLeft = document.documentElement.scrollTop = document.body.scrollTop = 0;

        //sceneAllWidth;
        var $sceneAll = $wr.querySelectorAll('.beScene>div');
        var beforW = 0;
        sceneAllWidth = [];
        for (let i = 0; i < $sceneAll.length; i++) {
            if (i == 0) {
                beforW = $sceneAll[i].offsetWidth;
            }
            if (i > 0) {
                beforW = beforW + $sceneAll[i].offsetWidth;
            }
            sceneAllWidth.push(beforW - Math.round(windowInnerWidth / 2) + Math.round(peWidtn / 2));
        }

        //sceneAllWidthEnd
        if (windowInnerWidth > 2200) {
            sceneAllWidthEnd = sceneAllWidth[3] + 2300;
        } else {
            sceneAllWidthEnd = sceneAllWidth[4] + 100;
        }

        //loading
        $sc.style.transition = 'bottom linear .8s';
        $sc.classList.add('active');
    }

    function peproleEvent(n) {
        sceneMove();
        if (peopleAnimation) {
            return;
        }
        peopleAnimation = true;
        if (n == 'walk') {
            // console.log($pe);
            if (scrollDirection) {
                $pe.style.backgroundPosition = '0 0';
                $pe.classList.add('walk_l');
            } else {
                $pe.style.backgroundPosition = '0 -200px';
                $pe.classList.add('walk_r');
            }
        }
        if (n == 'swim') {
            if (scrollDirection) {
                $pe.style.backgroundPosition = '-1000px 0';
                $pe.classList.add('swim_l');
            } else {
                $pe.style.backgroundPosition = '-1000px -200px';
                $pe.classList.add('swim_r');
            }
        }
        if (n == 'jump') {
            if (scrollDirection) {
                $pe.classList.add('jump_l');
            } else {
                $pe.classList.add('jump_r');
            }
        }
        if (n == 'standby') {
            if (scrollDirection) {
                $pe.classList.add('standby_l');
            } else {
                $pe.classList.add('standby_r');
            }
        }
        clearTimeout(peproleEventTime);
        peproleEventTime = setTimeout(function() {
            $pe.className = 'peopleImg active';
            peopleAnimation = false;
        }, 500);
    }

    function init(o) {
        var scT = o.scT ? 'bottom linear .8s' : '';
        var scB = o.scB || 10;
        var baT = o.baT ? 'bottom linear .8s' : '';
        var baB = o.baB || 0;
        var fire = o.fire ? true : false;
        var pE = o.pE || 'walk';
        var sS = o.sS ? true : false;
        $sc.style.transition = scT;
        $sc.style.bottom = scB + '%';
        $balloon.style.transition = baT;
        $balloon.style.bottom = baB + '%';

        if (fire) {
            $ProcessfireWorks.classList.add('active');
        } else {
            $ProcessfireWorks.classList.remove('active');
        }

        setTimeout(function() {
            sceneBottomVue = scB;
        }, 700)

        if (sS) {
            nowScrollTop = o.sS;
            window.removeEventListener('mousewheel', scrollFn, false);
            window.removeEventListener('DOMMouseScroll', scrollFn, false);
            window.removeEventListener('touchstart', touchmoveFn, false);
            setTimeout(function() {
                window.addEventListener('mousewheel', scrollFn, false);
                window.addEventListener('DOMMouseScroll', scrollFn, false);
                window.addEventListener('touchstart', touchmoveFn, false);
            }, 700)
        }
        peproleEvent(pE);
    }

    function sceneEvent() {
        function sceneShow(obj, s, scrollEnd) {
            var k = 0;
            for (let i = 0; i < obj.length; i++) {
                if (nowScrollTop > obj[i].getBoundingClientRect().left + scrollEnd && !obj[i].classList.contains('active')) {
                    obj[i].style.transitionDelay = k * s + 's';
                    obj[i].classList.add('active');
                    k++;
                }
            }
        }
        // console.log(nowScrollTop);
        // console.log(sceneAllWidth);
        // console.log(sceneAllWidth[3]);
        if (nowScrollTop < sceneAllWidth[0] - peWidtn / 2) {
            // console.log('首頁');
            init({});
        } else if (nowScrollTop > sceneAllWidth[0] - peWidtn / 2 && nowScrollTop < sceneAllWidth[1] - peWidtn) {
            // console.log('服務項目');
            init({});
            sceneShow($serviceText, 0.3, sceneAllWidth[0] - peWidtn * 2)
        } else if (nowScrollTop < sceneAllWidth[1] && sceneBottomVue == 100) {
            // console.log('設計案例上');
            init({ scT: true, pE: 'swim', sS: sceneAllWidth[1] - 60 });
        } else if (nowScrollTop > sceneAllWidth[1] && nowScrollTop < sceneAllWidth[2] - peWidtn && sceneBottomVue == 10) {
            // console.log('設計案例下');
            init({ scT: true, scB: '100', pE: 'swim' });
            sceneShow($caseitems, 0.1, sceneAllWidth[1] - (window.innerWidth / 2));
            // caseShow();
        } else if (nowScrollTop > sceneAllWidth[1] + peWidtn / 2 && nowScrollTop < sceneAllWidth[2] - peWidtn && sceneBottomVue == 100) {
            // console.log('我們團隊下');
            init({ scB: '100', pE: 'swim' });
            sceneShow($caseitems, 0.1, sceneAllWidth[1] - (window.innerWidth / 2));
            // caseShow();
        } else if (nowScrollTop > sceneAllWidth[2] - peWidtn && sceneBottomVue == 100) {
            // console.log('我們團隊上');
            init({ scT: true, sS: sceneAllWidth[2] - peWidtn + 60, pE: 'swim' });
        } else if (nowScrollTop > sceneAllWidth[2] && nowScrollTop < sceneAllWidth[3] - peWidtn / 2) {
            // console.log('我們團隊上走');
            init({});
            // sceneShow($teamPeople, 0.3, sceneAllWidth[2] - (window.innerWidth / 2));
            sceneShow($teamPeople, 0.3, sceneAllWidth[2] - peWidtn * 2);
            // for (let i = 0; i < $teamPeople.length; i++) {
            //     var j = 0;
            //     if (nowScrollTop > $teamPeople[i].getBoundingClientRect().left + sceneAllWidth[2] - (window.innerWidth / 2)) {
            //         $teamPeople[i].style.transitionDelay = j * 0.3 + 's';
            //         $teamPeople[i].classList.add('active');
            //         j++;
            //     }
            // }
        } else if (nowScrollTop > sceneAllWidth[3] - peWidtn / 2 && nowScrollTop < sceneAllWidth[3] + 1800 && sceneBottomVue == 10) {
            // console.log('合作流程');
            init({});
            // sceneShow($ProcessBox, 0.2, sceneAllWidth[3] - (window.innerWidth / 2));
            sceneShow($ProcessBox, 0.2, sceneAllWidth[3] - peWidtn * 2);
            // for (let i = 0; i < $ProcessBox.length; i++) {
            //     var j = 0;
            //     if (nowScrollTop > $ProcessBox[i].getBoundingClientRect().left + sceneAllWidth[3] - (window.innerWidth / 2)) {
            //         $ProcessBox[i].style.transitionDelay = j * 0.2 + 's';
            //         $ProcessBox[i].classList.add('active');
            //         j++;
            //     }
            // }
        } else if (nowScrollTop > sceneAllWidth[3] + 1800 && nowScrollTop < sceneAllWidth[3] + 2200 && sceneBottomVue == 10) {
            // console.log('聯絡資訊上');
            init({ scT: true, scB: -100, baT: true, baB: 110, sS: sceneAllWidth[3] + 1800 });
        } else if (nowScrollTop < sceneAllWidth[3] + 1800 && sceneBottomVue == -100) {
            // console.log('聯絡資訊下');
            init({ scT: true, scB: 10, baT: true, baB: 0, sS: sceneAllWidth[3] + 1800 });
        } else if (nowScrollTop > sceneAllWidth[3] + 2200 && sceneBottomVue == -100) {
            // console.log('最後');
            $ProcessData.classList.add('active');
            init({ scB: -100, baB: 110, fire: true });
        } else {
            // console.log('走路');
            peproleEvent('walk');
        }


    }

    function onScrollFn(callback) {
        if (!onScroll) {
            onScroll = true;
            requestAnimationFrame(callback);
        }
    }

    function scrollFn(e) {
        // console.log('scrollFn');
        // e.preventDefault();
        var wd = 0;
        var csp = window.pageYOffset;
        if (e.wheelDelta) {
            //chrom,ie
            if (e.wheelDelta > 0) {
                wd = 100;
                scrollDirection = false;
            } else {
                wd = -100;
                scrollDirection = true;
            }
        } else if (e.detail) {
            //firfox
            if (e.detail > 0) {
                wd = -100;
                scrollDirection = true;
            } else {
                wd = 100;
                scrollDirection = false;
            }
        }
        nowScrollTop = csp - wd;
        onScrollFn(sceneEvent)
    }

    function touchmoveFn(e) {
        var lastY = e.touches[0].clientY;
        var wd = 50;
        window.addEventListener("touchmove", function(e) {
            var currentY = e.touches[0].clientY;
            var csp = window.pageYOffset;
            if (currentY > lastY) {
                // console.log('up', currentY, lastY)
                wd = 50;
                scrollDirection = false;
            } else if (currentY < lastY) {
                //console.log('down', currentY, lastY)
                wd = -50;
                scrollDirection = true;
            }
            nowScrollTop = csp - wd;
            onScrollFn(sceneEvent);
            lastY = currentY;
        })
    }

    window.addEventListener("mousewheel", scrollFn);
    window.addEventListener("DOMMouseScroll", scrollFn);
    window.addEventListener("touchstart", touchmoveFn);
    window.addEventListener('keydown', function(e) {
        // console.log('----keydown----');
        if (e.which === 37) {
            // console.log('上-左');
            scrollDirection = false;
            // nowScrollTop = Math.abs(document.body.getBoundingClientRect().top) - 50;
            nowScrollTop = window.pageYOffset - 50;
            onScrollFn(sceneEvent);
        } else if (e.which === 39) {
            // console.log('下-右');
            scrollDirection = true;
            // nowScrollTop = Math.abs(document.body.getBoundingClientRect().top) + 50;
            nowScrollTop = window.pageYOffset + 50;
            onScrollFn(sceneEvent);
        } else if (e.which == 49) {
            // console.log('1'); 換角色
            isPeproleShow(0)
        } else if (e.which == 50) {
            // console.log('2'); 換角色
            isPeproleShow(1)
        } else if (e.which == 51) {
            // console.log('3'); 換角色
            isPeproleShow(2)
        }
    }, false);
    window.addEventListener('resize', resize);
    // })
}
window.addEventListener('load', star);