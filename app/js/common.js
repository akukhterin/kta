$("a[rel='m_PageScroll2id']").mPageScroll2id({
	offset: 100
});





$(function() {


    $("a[rel='m_PageScroll2id']").mPageScroll2id({
      scrollSpeed: 900,
      scrollingEasing: "easeInOutQuint",
      offset: 100
    });

    $('.slider').each(function(){
        var slides = $(this).data('slides');
        var arrow = $(this).data('arrow');
        var arrowColor = $(this).data('arrowcolor');
        var autoplay = $(this).data('autoplay');

        if($(this).data('name') == 'partners') {
          var sliderName = 2;
        } else {
          var sliderName = 1;
        }

     $(this).slick({
      infinite: true,
      slidesToShow: slides,
      autoplay: autoplay,
      arrows: arrow,
      lazyLoad: 'ondemand',
      //adaptiveHeight: true,
      prevArrow: '<button class="slick-prev slick-arrow slick-arrow--' + arrowColor + '"><img src="../img/slider-prev.svg" class="slick-arrow__img"></button>',
      nextArrow: '<button class="slick-next slick-arrow slick-arrow--' + arrowColor + '"><img src="../img/slider-next.svg" class="slick-arrow__img"></button>',
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 567,
          settings: {
            slidesToShow: sliderName,
            slidesToScroll: 1
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });       
    });



	$('.lazy').Lazy({
		effect: 'fadeIn',
		effectTime: 300
	});

	
    if($('.img-svg').length > 0) {
        $('.img-svg').each(function() {
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            $.get(imgURL, function(data) {
                // Get the SVG tag, ignore the rest
                var $svg = $(data).find('svg');

                // Add replaced image's ID to the new SVG
                if (typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if (typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass + ' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
                if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                    $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
                }

                // Replace image with new SVG
                $img.replaceWith($svg);

            }, 'xml');

        });
    }


    $(".toggle-mnu").click(function() {
      $(this).toggleClass("on");
      $('body').toggleClass("on");
      $(".mob-menu").slideToggle();
      return false;
    });

    $('.mob-menu__a').on('click', function(e){
        e.preventDefault(); 
        if($(this).siblings('.submenu-mob__ul').length > 0) {
            $(this).siblings('.submenu-mob__ul').slideToggle(); 
        } else {
            $('.toggle-mnu, body').toggleClass('on'); 
            $(".mob-menu").slideToggle();
        }
        //console.log($(this).siblings('.submenu-mob__ul')); 
    });
    $(window).scroll(function() {
        var top = $(document).scrollTop();
        if (top < 500 && !$(".toggle-mnu").hasClass('on')) {
            $(".header").removeClass('sticky'); 
        } else {
            $(".header").addClass('sticky');
        }
    });



    $(".count__num").each(function(){
        var target_block = $(this); // Ищем блок 
        var count_end = target_block.data('count'); 
        var blockStatus = true;
        $(window).scroll(function() {
            var scroll = $(window).scrollTop() + $(window).height();
            var offset = target_block.offset().top; 
            //var scrollEvent = ($(window).scrollTop() > (target_block.position().top - $(window).height()));
            if(scroll > offset && blockStatus) {
                blockStatus = false; // Запрещаем повторное выполнение функции до следующей перезагрузки страницы.
                $({numberValue: 0}).animate({numberValue: count_end}, {
                    duration: 2000, // Продолжительность анимации, где 500 - 0.5 одной секунды, то есть 500 миллисекунд 
                    easing: "linear",
                    step: function(val) {
                        target_block.html(Math.ceil(val)); // Блок, где необходимо сделать анимацию
                    }
                });
            }
        });
    });



  $('.tabs__header').on('click', '.tabs__head-el:not(.active)', function() {
    $(this).addClass('active').siblings().removeClass('active');
    var index = $(this).index();
    $('.tabs__item').removeClass('active')
    .eq(index).addClass('fadeInUp active');
  });



  $("[id^=lightgallery]").lightGallery({
    selector: 'a',
    thumbnail: false,
    animateThumb: false,
    rotate: false,
    autoplayControls: false,
    share: false,
    actualSize: false,
  });



  $('.region__show-link').on('click', function(e){
    e.preventDefault();
    var th = $(this); 
    th.toggleClass('active');
    th.closest('.region').find('.region__text-hide').slideToggle(); 
    if(th.hasClass('active')) {
      th.find('span').text('Скрыть');
    } else {
      th.find('span').text('Читать подробнее');
    }

  });



  $('.popup-link').magnificPopup({
    type:'inline',
    midClick: true,
    removalDelay: 500,
    mainClass: 'mfp-move-from-top'
  });



// $.magnificPopup.open({
//   items: {
//     src: '#success-popup', // can be a HTML string, jQuery object, or CSS selector
//     type: 'inline',
//   },
//       midClick: true,
//     removalDelay: 500,
//     mainClass: 'mfp-move-from-top'    
// });




// Карта
var myMapTemp, myPlacemarkTemp;
var checked = false; 

const loadScript = (url, callback) => {
  const script = document.createElement('script');
    if(checked == false) {
    script.addEventListener('load', () => {
      callback();
    });   
  } else {
    callback(); 
  }
  checked = true; 
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};



function init () {
            var myMapTemp = new ymaps.Map("map", {
            center: [61.254035, 73.396230], // координаты центра на карте
            zoom: 12, // коэффициент приближения карты
            controls: ['zoomControl', 'fullscreenControl'] // выбираем только те функции, которые необходимы при использовании
          }); 
          var myPlacemarkTemp = new ymaps.Placemark([61.254035, 73.396230], {
              //balloonContent: "Здесь может быть ваш адрес",
          }, {
              // Опции.
              // Необходимо указать данный тип макета.
              iconLayout: 'default#imageWithContent',
              // Своё изображение иконки метки.
              iconImageHref: 'img/location.svg',
              // Размеры метки.
              iconImageSize: [50, 50],
              // Смещение левого верхнего угла иконки относительно
              // её "ножки" (точки привязки).
              iconImageOffset: [-25, -50],
          });
          myMapTemp.geoObjects.add(myPlacemarkTemp); // помещаем флажок на карту
          // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
          var layer = myMapTemp.layers.get(0).get(0);
}


var check_map = true;

$(window).scroll(function() {

    var target_block = $('#map'); 
    var scroll = $(window).scrollTop() + $(window).height();
    var offset = target_block.offset().top; 
    if(scroll > offset && check_map) {
      check_map = false;
      loadScript('https://api-maps.yandex.ru/2.1/?lang=ru_RU', () => {
        ymaps.ready(function(){
          init(); 
        });
      });
    }
});








});


const wow = new WOW({
  boxClass: 'wow', /* класс, который необходим для работы wow.js */
  animateClass: 'animated', /* класс, который будет автоматически добавляться анимируемым элементам при прокрутке страницы */
  offset: 30, /* по-умолчанию установлено значение 0, то есть как только при прокрутке страницы, элемент достигает низа окна браузера проигрываться анимация, в данном случае анимация начнется на 30px выше от низа окна браузера */
  mobile: true, /* если true, то на мобильных тоже будет анимация, если false, то на мобильных анимация отключается */
  live: true /* если true, то анимация будет работать даже на динамически добавляемых элементах, если false, то только на тех элементах, которые были на странице при ее загрузке */
})
wow.init();

