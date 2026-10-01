const intro_ani = document.querySelectorAll('.intro_ani');
window.onload = function(){
  const load = document.querySelector('#load');
  if(load) load.style.opacity = '0';
  intro_ani.forEach(el => el.classList.add('ani_on'));
  if(window.innerWidth > 500) document.body.style.overflow = 'hidden';
};

$('#fullpage').fullpage({
  anchors: ['firstPage','secondPage','thirdPage','fourthPage','fifthPage','sixthPage','seventhPage','eighthPage'],
  menu: '#myMenu',
  autoScrolling: true,
  scrollBar: true,
  scrollingSpeed: 1200,
  navigation: true,
  paddingTop: '80px',
  paddingBottom: '80px',
  onLeave: function(index,nextIndex,direction){
    $.fn.fullpage.setScrollingSpeed(index == 1 ? 1500 : 600);
    $('.web_section').css({'--afterWidth': window.innerWidth > 1200 ? '80%' : '90%', '--afterHeight':'100%', '--afterBg':'#ffffff44'});
    if(nextIndex >= $('.section').length - 1) $('#cursor').addClass('active'); else $('#cursor').removeClass('active');
    if($('.section').eq(index-1).is('.web_section')) this.find('.bg_circle').removeClass('active');
    if($('.section').eq(nextIndex-1).is('.web_section')) $('#myMenu > li:nth-child(3)').addClass('subpage_on'); else $('#myMenu > li:nth-child(3)').removeClass('subpage_on');
  },
  afterLoad: function(origin,destination,direction,trigger){
    $('.web_section').css(window.innerWidth > 800 ? {'--afterWidth':'100%','--afterHeight':'360px','--afterBg':'#ffffff99'} : {'--afterWidth':'100%','--afterHeight':'680px','--afterBg':'#ffffffcc'});
    if($('.section').eq(destination-1).is('.web_section')){
      this.find('.bg_circle').addClass('active');
      this.find('.mockup_all').addClass('scrollOn');
      this.find('.info').addClass('scrollOn');
    }
  },
  responsiveWidth: 500,
  afterResponsive: function(isResponsive){ if(isResponsive) $.fn.fullpage.setAutoScrolling(false); }
});

const cursor = document.querySelector('#cursor');
document.addEventListener('mousemove', e => { if(cursor){ cursor.style.left=e.clientX+'px'; cursor.style.top=e.clientY+'px'; } });

const main = document.querySelector('#myMenu > li:nth-child(3)');
const sub = document.querySelector('#myMenu .sub');
if(main && sub){
  main.addEventListener('mouseover',()=>{sub.style.transition='.4s'; sub.style.height='152px';});
  main.addEventListener('mouseout',()=>{sub.style.transition='none'; sub.style.height='0';});
}

const layer = document.querySelectorAll('.layer');
const layer_btm_gradient = document.querySelector('.layer_btm_gradient');
window.addEventListener('scroll',function(){
  const scroll_y=window.scrollY, w_height=window.innerHeight;
  if(window.innerWidth > 500){
    if(scroll_y <= window.innerHeight*2 && layer.length >= 3){
      layer_btm_gradient.style.opacity=scroll_y/w_height*3;
      layer[0].style.top=scroll_y*.8+'px'; layer[1].style.top=scroll_y*.5+'px'; layer[2].style.top=scroll_y*.3+'px';
    }
  } else if(layer_btm_gradient){
    layer_btm_gradient.style.transition='.3s'; layer_btm_gradient.style.opacity=scroll_y>5?1:0;
  }
});

let num=0; const bird=document.querySelector('.bird');
if(bird) setInterval(()=>{num=(num+1)%30; bird.style.backgroundPosition=num*48+'px';},150);

const modal_btn=document.querySelectorAll('.modal_btn');
const modal_popup_bg=document.querySelectorAll('.modal_popup_bg');
const modal_close=document.querySelectorAll('.modal_popup_bg .close_btn');
modal_btn.forEach((target,index)=>target.addEventListener('click',function(e){
  e.preventDefault(); const modal=modal_popup_bg[index]; if(!modal) return;
  modal.style.display='block'; $.fn.fullpage.setAllowScrolling(false); cursor?.classList.add('active');
}));
function closeModal(modal){
  modal.style.display='none'; $.fn.fullpage.setAllowScrolling(true); cursor?.classList.remove('active');
  modal.querySelectorAll('video').forEach(v=>v.pause());
}
modal_close.forEach((target,index)=>target.addEventListener('click',function(e){e.preventDefault(); if(modal_popup_bg[index]) closeModal(modal_popup_bg[index]);}));
modal_popup_bg.forEach(target=>target.addEventListener('click',function(e){if(this===e.target) closeModal(this);}));


// WATER FESTIVAL modal: keep wheel/touch scrolling inside its detail page.
(function(){
  const waterCase = document.querySelector('#graphic .water-case');
  if(!waterCase) return;
  const scroller = waterCase.closest('.old-inoy-detail-scroll');
  if(!scroller) return;

  scroller.addEventListener('wheel', function(e){
    e.stopPropagation();
    const max = this.scrollHeight - this.clientHeight;
    if(max <= 0) return;
    this.scrollTop += e.deltaY;
    e.preventDefault();
  }, { passive:false });

  scroller.addEventListener('touchmove', function(e){
    e.stopPropagation();
  }, { passive:true });
})();
