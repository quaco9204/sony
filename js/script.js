// html 을 렌더링할때 실행
$(document).ready(function () {
    // modal close
    $('.modal').click(function () {
        $(this).fadeOut();
    });

    // 스크롤바의 위치에 따라서 gotop이 보이고 숨겨짐
    $(window).scroll(function () {
        // 스크롤바의 위치를 체크한다.
        let scY = $(window).scrollTop();
        if (scY >= 400) {
            $('.gotop').addClass('gotop-active');
        } else {
            $('.gotop').removeClass('gotop-active');
        }

        // 소니 사이트 닫기(스크롤시 바로닫힘)
        if (sony_site.hasClass('sony-site-active')) {
            sony_site.removeClass('sony-site-active');
            sony_site.attr('site-state', 'hide');
            site.removeAttr('style');
        }
    });

    // 위로가기
    $('.gotop').click(function (e) {
        // href를 막는다.
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 600);
    });

    // 메뉴 기능
    const menu = $('.menu-list > li:nth-child(2) > a');
    const depth2 = $('.depth2');

    //타이머 저장
    let depth2_timer;

    menu.mouseenter(function () {
        clearTimeout(depth2_timer); // 타이머 없에자, 서브메뉴 보여야 하니.
        depth2.stop().slideDown(350);
    });

    menu.mouseleave(function () {
        depth2_timer = setTimeout(depth2Out, 50); // 시간을 주고 depth2 를 사라지게 하겠다.
    });

    depth2.mouseenter(function () {

        clearTimeout(depth2_timer); // 타이머 없에자, 서브메뉴 보여야 하니.
    });

    depth2.mouseleave(function () {
        depth2_timer = setTimeout(depth2Out, 50); // 시간을 주고 depth2 를 사라지게 하겠다.
    })

    function depth2Out() {
        depth2.stop().slideUp(350);
    }

    //소니 사이트 관련 site-open, ' hide'
    const site = $('.site'); //소니사이트 이동 버튼
    const sony_site = $('.sony-site'); // 소니 사이트 페이지
    const sony_site_bt = $('.sony-site-bt'); //소니 사이트 페이지 내 닫기버튼

    sony_site.attr('site-state', 'hide'); //소니사이트 속성 추가 site-state = "hide"

    site.click(function (event) { //이동버튼 클릭시 이벤트값을 읽어들이며 함수실행
        event.stopPropagation(); //a태그 #으로 인한 페이지 새로고침 방지
        let temp = sony_site.attr('site-state') //소니사이트 속성값을 temp변수에 저장
        if (temp == 'hide') { // 속성값 hide 상태일때 
            sony_site.addClass('sony-site-active');
            sony_site.attr('site-state', 'show'); // 소니사이트 속성값 show로 변경
            $(this).css('border', '2px solid #5d58f4'); // 포커스 유지, 테두리 색상지정
        } else {
            sony_site.removeClass('sony-site-active'); // 소니사이트 페이지 에니메이션- 일시중단시작. 페이지 닫힘
            sony_site.attr('site-state', 'hide'); // 소니사이트 속성값 hide변경
            $(this).removeAttr('style'); // 포커스 유지 스타일 해제
        }

    });
    //
    sony_site_bt.click(function (event) {
        event.preventDefault();
        sony_site.removeClass('sony-site-active');
        sony_site.attr('site-state', 'hide');
        site.removeAttr('style');
    });

    //상품 검색 관련
    const search = $('.search');
    const icon_up_dir = $('.icon-up-dir');
    const search_wrap = $('.search-wrap');
    const search_txt = $('#search-txt');
    const form_cancel = $('.form-cancel');

    // 상태 저장
    search_wrap.attr('open-state', 'hide');

    search_wrap.click(function (event) {
        event.stopPropagation();
    });

    search.click(function (event) {
        event.stopPropagation();

        let temp = search_wrap.attr('open-state');
        if (temp == 'hide') {
            icon_up_dir.stop().fadeIn(100);
            search_wrap.stop().slideDown(100);
            search_wrap.attr('open-state', 'show');
            $(this).css('background', '#5d58f4');
        } else {
            icon_up_dir.stop().fadeOut(100);
            search_wrap.stop().fadeOut(100);
            search_wrap.attr('open-state', 'hide');
            $(this).removeAttr('style');
        }

    });

    $('body').click(function () {
        icon_up_dir.stop().fadeOut(100);
        search_wrap.stop().fadeOut(100);
        search_wrap.attr('open-state', 'hide');
        search.removeAttr('style');
    });

    search_txt.keyup(function () {
        let temp = $(this).val();
        if (temp == '') {
            form_cancel.hide();
        } else {
            form_cancel.show();
        }
    });
    form_cancel.click(function () {
        search_txt.val('');
        $(this).hide();
    });


    //최신 상품 슬라이드
    let sw_latest = new Swiper('.sw-latest', {
        slidesPerView: "auto",
        // spaceBetween: 25,
        slidesPerGroup: 3,
        pagination: {
            el: '.sw-latest-pg',
            clickable: true,
        },
        navigation: {
            prevEl: '.sw-latest-prev',
            nextEl: '.sw-latest-next',
        },
        on: {
            slideChange: function () {}
        },
    });

    // 버튼 보이고, 숨기기
    $('.sw-latest').mouseenter(function () {
        $('.sw-latest-prev').stop().fadeIn(300);
        $('.sw-latest-next').stop().fadeIn(300);
    });
    $('.sw-latest').mouseleave(function () {
        $('.sw-latest-prev').stop().fadeOut(300);
        $('.sw-latest-next').stop().fadeOut(300);
    });

    // 뉴스 슬라이더
    let sw_news = new Swiper('.sw-news', {
        slidesPerView: 3,
        spaceBetween: 52,
        allowTouchMove: false,
        // touchRatio: 0,
    });

    // 더보기 버튼
    const addon_bt = $('.addon-bt');
    const addon_main = $('.addon-main');
    const addon_bt_icon = addon_bt.find('>i');
    //var addon_bt_icon = $('.addon-bt>i'); 위와 같은내용임


    addon_bt.click(function () {
        // 내용을 보여주는 것을 토글한다.
        addon_main.slideToggle();
        // 아이콘의 클래스를 토글한다.
        addon_bt_icon.toggleClass('icon-up-micro'); //빼고
        addon_bt_icon.toggleClass('icon-down-micro'); //넣기
    });

    // SNS 기능
    const sns_box = $('.sns-box');
    const sns_cont = $('.sns-cont');
    const sns_box_close = $('.sns-box-close');

    const sns_atag = $('.footer-sns a');
    const sns_stx = 240; //첫번째 sns-box 위치
    const sns_space = 40; // 아이콘 오버시  sns-box 간의 간격
    const sns_box_attr = 'data-sns'; // 오버시 보여줄 대상 attr
    const sns_atag_total = sns_atag.length;


    let sns_pos_arr = [];
    for (let i = 0; i < sns_atag_total; i++) {
        sns_pos_arr[i] = sns_stx + (sns_space * i);
    }

    // 동일한 동작이 반복
    // 현재 보여야 할  sns-cont 를 저장
    let sns_cont_box;

    function snsPos(_num, who) {
        // 모두 숨겨라
        sns_cont.hide();
        // 내용을 바꾸어서 보여줄 준비를 한다.
        let box = who.attr(sns_box_attr);
        sns_cont_box = $(box);
        sns_cont_box.show();

        // 위치를 잡는다.
        sns_box.css({
            left: _num
        });

        // 부드럽게  보여준다.
        sns_box.stop().fadeIn();
    }
    sns_box_close.click(function () {
        // sns_cont.hide();
        sns_box.stop().fadeOut(500);
    });

    // 마우스가  롤 오버되면 계속 보여야 한다.
    sns_box.mouseenter(function () {
        // 모두 숨겨라
        sns_cont.hide();
        // 저장해 둔 것은 보여라
        sns_cont_box.show();
        $(this).show();
    });
    sns_box.mouseleave(function () {
        $(this).hide();
    });

    function snsHide() {
        sns_cont.hide();
        sns_box.hide();

    }

    $.each(sns_atag, function (index, item) {
        $(this).mouseenter(function () {
            snsPos(sns_pos_arr[index], $(this));
        });
        $(this).mouseleave(function () {
            snsHide();
        });
    });

    // heart 관련
    $('.hot-box-img .icon-heart').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).toggleClass('icon-heart-active');
    });

});

// image, video, audio 등 리소스를 불러들였을 때 실행 
window.onload = function () {


};