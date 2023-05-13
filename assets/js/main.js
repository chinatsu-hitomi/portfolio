
// $(function(){
    var $win          = $(window)
        ,winW         = $win.width()
        ,winH         = window.innerHeight
        ,scrollTop    = $win.scrollTop()
        ,winEnd       = scrollTop + winH
        ,winCenter    = scrollTop + winH/2
        ,timer        = 0
        ,breakPoint   = 980
        ,$body        = $('body')
        ,$g_container = $('.g-container')
        ,$main        = $('.main')
        ,$section     = $('.section')
        ,$anchor      = $('.right-anc a')
        ,$scroll      = $('.scroll')
        ,current      = null
        ,containerH   = $g_container.outerHeight();
    //;


    $win.on({
        "load" : function(){
            containerH = $g_container.outerHeight();

            $body.addClass('loaded');
            $main.addClass('show');

            moveToAnchor();
            scrollIn();
            lettering();
            randomLogo();
        },
        "scroll" : function(){
            scrollTop  = $win.scrollTop();
            winEnd     = scrollTop + winH;
            winCenter  = scrollTop + winH/2;

            scrollIn();
            fixHeader();
          
        },
        "resize" : function(){
            if(timer > 0){
                clearTimeout(timer);
            }

            timer = setTimeout(function(){
                winW       = $win.width();
                winH       = window.innerHeight;
                scrollTop  = $win.scrollTop();
                winEnd     = scrollTop + winH;
                winCenter  = scrollTop + winH/2
                containerH = $g_container.outerHeight();

                scrollIn();
//                getCurrent();
                //lettering();
            }, 100);
        }
    });

    function moveToAnchor() {
        $('a[href^="#"]').click(function(e) {
            var speed    = 700;
            var href     = $(this).attr("href");
            var target   = $(href == "#" || href == "" ? 'html' : href);
            var position = target.offset().top;

            e.preventDefault();
            $('body,html').animate({scrollTop:position}, speed, 'swing');
        });
    }

    function scrollIn(){
        $(".scroll-in").each(function(){
            var $this = $(this);
            var elemPos = $this.offset().top;
            if(scrollTop > elemPos - winH + 150){
                $this.addClass("show");
            }
        });
    }

  function fixHeader(){
    var headerH = $(".header").outerHeight(true);
    if (scrollTop >= headerH){//ヘッダーの高さを超えたら
      $('.header').addClass('HeightMin');//#headerについているHeightMinというクラス名を付与
    }else{
      $('.header').removeClass('HeightMin');//HeightMinというクラス名を除去
    }    
  }

	function lettering() {
		// 文字列へのspan設定
		$(".lettering").each(function() {
			var content = $(this).html();
			var trimText = $.trim(content);
			var newText = '';

			trimText.split('').forEach(function(e) {
				if(e == ' '){
					// 空白対策
					newText += '<span>&nbsp;</span>';
				} else {
					newText += '<span>' + e + '</span>';
				}
			});
			$(this).html(newText);
		});
	}

    function randomLogo() {
        // ランダムに表示させたいイメージ名を配列に格納
        var thumbnaileFileNameArray = [
            "logo01",
            "logo02",
            "logo03",
            // "logo04",
        ];
        // ランダム表示させたいimg要素を定義
        let $thumbnaileImgElement = $(".header__logo img");
    
        // 関数の実行
        randomImage(thumbnaileFileNameArray, $thumbnaileImgElement)
    }

    function randomImage ( imgArray, $target){
        var num = Math.random();
        num = Math.floor(num * imgArray.length);
        $target.attr("src", "/assets/img/common/" + imgArray[num] + ".png");
    };
    
// });




