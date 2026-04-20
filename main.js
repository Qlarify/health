var pageMeta={
  home:{title:'Healthcare Marketing Agency India | Qlarify Health',desc:'India\'s specialist hospital marketing agency. We build video systems, SEO strategies, and paid media campaigns that turn patient intent into measurable OPD growth and enquiry volume.'},
  video:{title:'Video as Infrastructure for Hospitals | Qlarify Health',desc:'Structured healthcare video production mapped to the patient decision journey. From symptom explainers to 3D animations — build trust and drive measurably higher appointment conversions.'},
  seo:{title:'Hospital SEO & Medical Content Strategy | Qlarify Health',desc:'Rank on Google for the condition, symptom, and specialist searches your patients actually make. SEO and content marketing built exclusively for hospitals across India.'},
  paid:{title:'Hospital Paid Media & Performance Ads | Qlarify Health',desc:'Google Ads and Meta campaigns engineered for patient enquiries, not vanity metrics. Every rupee tracked from ad click to confirmed OPD appointment across your hospital network.'},
  social:{title:'Social Media Marketing for Hospitals | Qlarify Health',desc:'Platform strategy that positions your specialists as trusted voices and builds patient familiarity on Instagram, Facebook, and LinkedIn — driving brand recall and referral growth.'},
  email:{title:'Hospital Email & WhatsApp Campaigns | Qlarify Health',desc:'Reactivate your existing patient database with structured email and WhatsApp campaigns. Appointment reminders, health tips, and follow-ups that drive repeat visits at significantly lower cost.'},
  opd:{title:'OPD Growth Marketing for Hospitals | Qlarify Health',desc:'End-to-end OPD growth combining digital marketing, call centre training, and front desk alignment. Built for single-location hospitals and multi-specialty clinics across India.'},
  about:{title:'About Qlarify Health — Our Story & Team',desc:'Built from inside India\'s leading hospital systems. Meet the healthcare marketing team that has produced 10,000+ medical videos and grown OPD footfall for top hospital brands.'},
  contact:{title:'Schedule a Call | Qlarify Health',desc:'Let\'s talk about your hospital\'s marketing challenges. Book a free 30-minute call with our healthcare marketing specialists — no obligations, just clarity.'},
  privacy:{title:'Privacy Policy | Qlarify Health',desc:'How Qlarify Health collects, uses, and protects your personal information. Read our full privacy policy covering data handling, cookies, and third-party services.'},
  terms:{title:'Terms & Conditions | Qlarify Health',desc:'Terms and conditions governing your use of the Qlarify Health website. Covers intellectual property, limitations of liability, and acceptable use policies.'},
  blog:{title:'Hospital Marketing Insights & Guides | Qlarify Health',desc:'Expert strategies for hospital marketing — SEO, video systems, paid media, OPD growth, and patient acquisition. Actionable guides written by healthcare marketing specialists.'},
  'blog-hospital-marketing':{title:'What is Hospital Marketing? Complete Guide | Qlarify',desc:'Hospital marketing explained — why clinical sensitivity, patient psychology, and systems thinking matter more than ad spend. A comprehensive guide for healthcare leaders in India.'},
  'blog-opd-footfall':{title:'How to Increase OPD Footfall: 10 Strategies | Qlarify',desc:'10 proven strategies to increase OPD footfall — covering hospital SEO, Google Ads, video marketing, call centre training, and structured patient retention campaigns.'},
  'blog-video-marketing':{title:'Video Marketing for Hospitals: Why It Works | Qlarify',desc:'Why structured video systems outperform random content in healthcare. Map video to the patient decision journey and drive measurably higher appointment conversions for your hospital.'},
  'blog-hospital-seo':{title:'Hospital SEO: The Ultimate Guide for 2025 | Qlarify',desc:'How to rank your hospital on Google for searches that actually bring patients. Covers keyword strategy, technical SEO, content planning, and measurement for healthcare organisations.'},
  'blog-healthcare-agency':{title:'Healthcare Agency vs General Agency | Qlarify Health',desc:'Why generic marketing agencies fail at hospital marketing. Learn what to look for in a specialised healthcare partner — from clinical sensitivity to patient journey mapping.'},
  'blog-social-media-hospitals':{title:'Social Media Strategy for Hospitals | Qlarify Health',desc:'A practical social media framework for hospitals — what to post on each platform, how to feature specialists, and how to measure engagement that drives patient appointments.'},
  'blog-vs-generic-agencies':{title:'Qlarify vs Generic Agencies: Hospital CMO Framework',desc:'A decision framework for hospital CMOs choosing between specialist healthcare agencies and generic marketing agencies. Compliance, journey mapping, and ROI compared.'},
  'blog-in-house-vs-agency':{title:'In-House vs Healthcare Agency for Hospital Marketing',desc:'When to hire in-house marketing vs partner with a healthcare agency. A framework for Indian hospital leaders weighing cost, speed, expertise, and accountability.'},
  'blog-hospital-video-production-india':{title:'Hospital Video Production in India: Strategic Guide | Qlarify',desc:'How hospitals in India should approach video production — vendor-led vs strategy-led, the five asset categories that compound enquiries, and how to choose the right production partner.'},
  glossary:{title:'Hospital Marketing Glossary | Qlarify Health',desc:'Definitions for the terms hospital marketing teams encounter — OPD footfall, hospital SEO, patient acquisition cost, video as infrastructure, and 20+ more.'},
  '404':{title:'Page Not Found | Qlarify Health',desc:'The page you are looking for does not exist.',noindex:true}
};
var breadcrumbNames={home:'Home',video:'Video as Infrastructure',seo:'Hospital SEO',paid:'Paid Media',social:'Social Media',email:'Email & WhatsApp',opd:'OPD Growth',about:'About',contact:'Contact',privacy:'Privacy Policy',terms:'Terms',blog:'Blog','blog-hospital-marketing':'What is Hospital Marketing?','blog-opd-footfall':'How to Increase OPD Footfall','blog-video-marketing':'Video Marketing for Hospitals','blog-hospital-seo':'Hospital SEO Guide','blog-healthcare-agency':'Healthcare vs General Agency','blog-social-media-hospitals':'Social Media for Hospitals','blog-vs-generic-agencies':'Qlarify vs Generic Agencies','blog-in-house-vs-agency':'In-House vs Healthcare Agency','blog-hospital-video-production-india':'Hospital Video Production in India',glossary:'Glossary'};
function updateMeta(id){
  var m=pageMeta[id]||pageMeta.home;
  document.title=m.title;
  var descTag=document.querySelector('meta[name="description"]');if(descTag)descTag.setAttribute('content',m.desc);
  var ogTitle=document.querySelector('meta[property="og:title"]');if(ogTitle)ogTitle.setAttribute('content',m.title);
  var ogDesc=document.querySelector('meta[property="og:description"]');if(ogDesc)ogDesc.setAttribute('content',m.desc);
  var twTitle=document.querySelector('meta[name="twitter:title"]');if(twTitle)twTitle.setAttribute('content',m.title);
  var twDesc=document.querySelector('meta[name="twitter:description"]');if(twDesc)twDesc.setAttribute('content',m.desc);
  var canonical=document.querySelector('link[rel="canonical"]');
  if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical);}
  var cPath=typeof idToPath==='function'?idToPath(id):(id==='home'?'':id);
  canonical.href='https://qlarify.health/'+cPath;
  var ogUrl=document.querySelector('meta[property="og:url"]');if(ogUrl)ogUrl.setAttribute('content','https://qlarify.health/'+cPath);
  /* Handle noindex for 404 and similar pages */
  var robotsTag=document.querySelector('meta[name="robots"]');
  if(robotsTag){robotsTag.setAttribute('content',m.noindex?'noindex,nofollow':'index,follow');}
  /* Dynamic BreadcrumbList schema */
  var bcScript=document.getElementById('ld-breadcrumb');
  if(bcScript){
    var items=[{"@type":"ListItem","position":1,"name":"Home","item":"https://qlarify.health/"}];
    if(id!=='home'){
      var isBlog=id.indexOf('blog-')===0;
      if(isBlog){items.push({"@type":"ListItem","position":2,"name":"Blog","item":"https://qlarify.health/blog"});items.push({"@type":"ListItem","position":3,"name":breadcrumbNames[id]||id,"item":"https://qlarify.health/"+cPath});}
      else{items.push({"@type":"ListItem","position":2,"name":breadcrumbNames[id]||id,"item":"https://qlarify.health/"+cPath});}
    }
    bcScript.textContent=JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":items});
  }
}
// SPA-aware nav helper: if target page is in current DOM, activate it via
// showPage() (no full reload). Otherwise, fall through and let the <a href>
// trigger a real navigation — needed because each route now ships only its
// own page section to keep wire weight low.
function navTo(e, id){
  if(document.getElementById('page-'+id)){
    e.preventDefault();
    showPage(id);
  }
  // else: real navigation handles it
}
function showPage(id){
  var pages=document.querySelectorAll('.page');
  pages.forEach(function(p){p.classList.remove('active');});
  var pg=document.getElementById('page-'+id);
  if(!pg)return;
  pg.classList.add('active');
  updateMeta(id);
  if(id==='paid'&&window.__baSyncAfterImg){window.__baSyncAfterImg();}
  window.scrollTo({top:0,behavior:'instant'});
  document.getElementById('nav-links').classList.remove('mobile-open');
  document.getElementById('hamburger').classList.remove('open');
  var ov=document.getElementById('mob-overlay');
  if(ov) ov.classList.remove('visible');
  var nav=document.getElementById('main-nav');
  nav.style.zIndex='';nav.style.backdropFilter='';nav.style.webkitBackdropFilter='';
  document.body.style.overflow='';
  document.querySelectorAll('.has-dd').forEach(function(l){l.classList.remove('dd-open');});
  setTimeout(function(){
    pg.querySelectorAll('.anim,.anim-left,.anim-right').forEach(function(el,i){
      el.classList.remove('visible');void el.offsetHeight;
      el.style.transitionDelay=Math.min(i*0.048,0.34)+'s';
      var r=el.getBoundingClientRect();
      if(r.top<window.innerHeight+60)el.classList.add('visible');
      else obs.observe(el);
    });
    pg.querySelectorAll('.anim-group').forEach(function(g){
      g.classList.remove('visible');void g.offsetHeight;
      var r=g.getBoundingClientRect();
      if(r.top<window.innerHeight+60){
        g.classList.add('visible');
      } else {
        (new IntersectionObserver(function(entries,io){
          entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}});
        },{threshold:0.1,rootMargin:'0px 0px 50px 0px'})).observe(g);
      }
    });
  },260);
}
function toggleDd(id,e){
  e&&e.stopPropagation();
  var li=document.getElementById(id).parentElement;
  var open=li.classList.contains('dd-open');
  document.querySelectorAll('.has-dd').forEach(function(l){l.classList.remove('dd-open');});
  if(!open)li.classList.add('dd-open');
}
document.addEventListener('click',function(e){
  if(!e.target.closest('.has-dd'))document.querySelectorAll('.has-dd').forEach(function(l){l.classList.remove('dd-open');});
});
function toggleMobile(){
  var nl=document.getElementById('nav-links');
  var hb=document.getElementById('hamburger');
  var ov=document.getElementById('mob-overlay');
  var open=nl.classList.toggle('mobile-open');
  hb.classList.toggle('open',open);
  if(ov) ov.classList.toggle('visible',open);
  var nav=document.getElementById('main-nav');
  nav.style.zIndex=open?'301':'';
  nav.style.backdropFilter=open?'none':'';
  nav.style.webkitBackdropFilter=open?'none':'';
  document.body.style.overflow=open?'hidden':'';
}
window.addEventListener('scroll',function(){
  var sy=window.scrollY;
  document.getElementById('main-nav').classList.toggle('scrolled',sy>40);
  var st=document.getElementById('scroll-top');
  if(st) st.classList.toggle('visible',sy>400);
},{ passive:true });
var obs=new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}
  });
},{threshold:0.08,rootMargin:'0px 0px 60px 0px'});
document.querySelectorAll('.anim,.anim-left,.anim-right').forEach(function(el){obs.observe(el);});
// Path routing
var blogSlugs={'what-is-hospital-marketing':'blog-hospital-marketing','increase-opd-footfall':'blog-opd-footfall','video-marketing-hospitals':'blog-video-marketing','hospital-seo-guide':'blog-hospital-seo','healthcare-vs-general-agency':'blog-healthcare-agency','social-media-strategy-hospitals':'blog-social-media-hospitals','qlarify-health-vs-generic-agencies':'blog-vs-generic-agencies','in-house-vs-healthcare-agency':'blog-in-house-vs-agency','hospital-video-production-india':'blog-hospital-video-production-india'};
var blogIds={'blog-hospital-marketing':'blog/what-is-hospital-marketing','blog-opd-footfall':'blog/increase-opd-footfall','blog-video-marketing':'blog/video-marketing-hospitals','blog-hospital-seo':'blog/hospital-seo-guide','blog-healthcare-agency':'blog/healthcare-vs-general-agency','blog-social-media-hospitals':'blog/social-media-strategy-hospitals','blog-vs-generic-agencies':'blog/qlarify-health-vs-generic-agencies','blog-in-house-vs-agency':'blog/in-house-vs-healthcare-agency','blog-hospital-video-production-india':'blog/hospital-video-production-india'};
function pathToId(path){
  if(path.indexOf('blog/')===0){var slug=path.replace('blog/','');return blogSlugs[slug]||'404';}
  return path||'home';
}
function idToPath(id){
  if(blogIds[id])return blogIds[id];
  return id==='home'?'':id;
}
(function(){
  var path=window.location.pathname.replace(/^\//,'').replace(/\/$/,'')||'home';
  var valid=['home','video','seo','paid','social','email','opd','about','contact','privacy','terms','blog','blog-hospital-marketing','blog-opd-footfall','blog-video-marketing','blog-hospital-seo','blog-healthcare-agency','blog-social-media-hospitals','blog-vs-generic-agencies','blog-in-house-vs-agency','blog-hospital-video-production-india','glossary'];
  var id=pathToId(path);
  if(valid.includes(id)){showPage(id);return;}
  showPage('404');
})();
var _base=showPage;
showPage=function(id){
  // Only push state if the target section is actually in the current DOM —
  // otherwise navTo()/<a href> handles a real navigation and the URL is
  // updated by the browser. Pushing state for a missing page would leave the
  // URL pointing at content that isn't loaded.
  if(!document.getElementById('page-'+id))return;
  _base(id);
  if(history.pushState)history.pushState(null,'','/'+idToPath(id));
};
window.addEventListener('popstate',function(){
  var path=window.location.pathname.replace(/^\//,'').replace(/\/$/,'')||'home';
  var valid=['home','video','seo','paid','social','email','opd','about','contact','privacy','terms','blog','blog-hospital-marketing','blog-opd-footfall','blog-video-marketing','blog-hospital-seo','blog-healthcare-agency','blog-social-media-hospitals','blog-vs-generic-agencies','blog-in-house-vs-agency','blog-hospital-video-production-india','glossary'];
  var id=pathToId(path);
  // After per-page splitting, popstate may target a page not in DOM (user
  // back-buttoned to a route they hadn't visited in this session). In that
  // case let the browser do a real navigation back to that URL.
  if(document.getElementById('page-'+id)){
    _base(valid.includes(id)?id:'home');
  } else {
    window.location.href='/'+(idToPath(id)||'');
  }
});
// Hover prefetch — primes the Vercel cache for the next likely click so
// real navigation feels SPA-fast.
(function(){
  var prefetched={};
  document.addEventListener('mouseover',function(e){
    var a=e.target.closest('a[href^="/"]');
    if(!a)return;
    var href=a.getAttribute('href');
    if(!href||href.indexOf('#')===0||prefetched[href])return;
    prefetched[href]=1;
    var l=document.createElement('link');l.rel='prefetch';l.href=href;
    document.head.appendChild(l);
  },{passive:true});
})();
// Before/After slider — re-init when paid page shown
(function(){
  var wrap=document.getElementById('baWrap');if(!wrap)return;
  var base=document.getElementById('baBase'),clip=document.getElementById('baAfterClip');
  var afterImg=document.getElementById('baAfterImg'),divider=document.getElementById('baDivider'),handle=document.getElementById('baHandle');
  var drag=false;
  function syncAfterImg(){
    var w=wrap.offsetWidth;if(w===0)return;
    var hh=base.offsetHeight||300;
    afterImg.style.width=w+'px';afterImg.style.height=hh+'px';
  }
  function setPos(clientX){
    var r=wrap.getBoundingClientRect();
    var pct=Math.max(5,Math.min(95,((clientX-r.left)/r.width)*100));
    clip.style.width=pct+'%';divider.style.left=pct+'%';handle.style.left=pct+'%';syncAfterImg();
  }
  window.__baSyncAfterImg=function(){
    requestAnimationFrame(function(){requestAnimationFrame(function(){
      syncAfterImg();
      var r=wrap.getBoundingClientRect();setPos(r.left+r.width*0.5);
    });});
  };
  base.addEventListener('load',function(){window.__baSyncAfterImg&&window.__baSyncAfterImg();});
  if(base.complete){requestAnimationFrame(function(){syncAfterImg();});}
  handle.addEventListener('mousedown',function(e){drag=true;e.preventDefault();});
  document.addEventListener('mousemove',function(e){if(drag)setPos(e.clientX);});
  document.addEventListener('mouseup',function(){drag=false;});
  wrap.addEventListener('touchstart',function(){drag=true;},{passive:true});
  wrap.addEventListener('touchmove',function(e){if(drag)setPos(e.touches[0].clientX);},{passive:true});
  wrap.addEventListener('touchend',function(){drag=false;});
  window.addEventListener('resize',function(){if(window.__baSyncAfterImg)window.__baSyncAfterImg();});
})();
/* ═══════════════════════════════════════════════════
   ANIMATION ENGINE
═══════════════════════════════════════════════════ */
(function(){
  'use strict';
  var raf=requestAnimationFrame;
  function lerp(a,b,t){return a+(b-a)*t;}
  function easeOut3(t){return 1-Math.pow(1-t,3);}
  function clamp(v,lo,hi){return Math.max(lo,Math.min(hi,v));}
  function onVis(el,cb,thresh){
    if(!el)return;
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){if(e.isIntersecting){cb(el);io.unobserve(el);}});
    },{threshold:thresh||0.2,rootMargin:'0px 0px 40px 0px'});
    io.observe(el);
  }
  /* scroll progress */
  var prog=document.createElement('div');prog.id='scroll-prog';document.body.prepend(prog);
  window.addEventListener('scroll',function(){
    prog.style.width=clamp(window.scrollY/(Math.max(1,document.documentElement.scrollHeight-window.innerHeight))*100,0,100)+'%';
  },{passive:true});
  /* page overlay */
  /* overlay removed — no flash */
  /* cursor — simple dot */
  var dot = document.createElement('div');
  dot.id = 'cur-dot';
  document.body.appendChild(dot);
  document.addEventListener('mousemove', function(e) {
    dot.style.left = e.clientX + 'px';
    dot.style.top  = e.clientY + 'px';
  }, { passive: true });
  var hs = 'a,button,.service-card,.rp-feat-card,.ab-hosp-card,.ab-val,.vi-trigger,.pm-stage-card,.opd-result-card';
  document.addEventListener('mouseover', function(e) { if (e.target.closest(hs)) dot.classList.add('h'); });
  document.addEventListener('mouseout',  function(e) { if (e.target.closest(hs)) dot.classList.remove('h'); });
  document.addEventListener('mousedown', function() { dot.classList.add('c'); });
  document.addEventListener('mouseup',   function() { dot.classList.remove('c'); });
  /* hero canvas — only runs while hero is in viewport */
  (function(){
    var canvas=document.getElementById('hero-canvas');
    var hero=document.getElementById('hero-section');
    if(!canvas||!hero)return;
    var ctx=canvas.getContext('2d');
    var W,H,rafId=null,started=false;
    function resize(){W=canvas.width=hero.offsetWidth;H=canvas.height=hero.offsetHeight;}
    resize();window.addEventListener('resize',resize);
    var PAL=[[22,52,96],[45,95,160],[201,169,110],[143,166,139]];
    var particles=[];
    for(var i=0;i<30;i++){
      var col=PAL[Math.floor(Math.random()*PAL.length)];
      particles.push({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*0.00025,vy:(Math.random()-.5)*0.00025,r:Math.random()*2.4+0.6,a:Math.random(),da:(Math.random()-.5)*0.007,col:col});
    }
    var rings=[];
    function spawnRing(){rings.push({x:0.15+Math.random()*0.7,y:0.1+Math.random()*0.8,r:0,maxR:70+Math.random()*130,a:0.28,col:PAL[Math.random()>.5?0:2]});}
    spawnRing();spawnRing();spawnRing();
    var spawnTimer=null;
    var mouseX=0.5,mouseY=0.5;
    hero.addEventListener('mousemove',function(e){var r=hero.getBoundingClientRect();mouseX=(e.clientX-r.left)/r.width;mouseY=(e.clientY-r.top)/r.height;});
    function draw(){
      ctx.clearRect(0,0,W,H);
      rings=rings.filter(function(rg){return rg.a>0.003;});
      rings.forEach(function(rg){
        rg.r+=1.0;rg.a*=0.989;
        ctx.beginPath();ctx.arc(rg.x*W,rg.y*H,rg.r,0,Math.PI*2);
        ctx.strokeStyle='rgba('+rg.col[0]+','+rg.col[1]+','+rg.col[2]+','+rg.a+')';
        ctx.lineWidth=1.2;ctx.stroke();
      });
      particles.forEach(function(p){
        p.x+=p.vx+(mouseX-.5)*0.00006;p.y+=p.vy+(mouseY-.5)*0.00006;
        if(p.x<0)p.x=1;if(p.x>1)p.x=0;if(p.y<0)p.y=1;if(p.y>1)p.y=0;
        p.a+=p.da;if(p.a>1||p.a<0)p.da*=-1;p.a=clamp(p.a,0.04,1);
        ctx.beginPath();ctx.arc(p.x*W,p.y*H,p.r,0,Math.PI*2);
        ctx.fillStyle='rgba('+p.col[0]+','+p.col[1]+','+p.col[2]+','+(p.a*0.45)+')';
        ctx.fill();
      });
      rafId=raf(draw);
    }
    /* Only run RAF loop when hero is visible — saves CPU on scroll */
    new IntersectionObserver(function(entries){
      if(entries[0].isIntersecting){
        if(!started){started=true;spawnTimer=setInterval(spawnRing,2400);}
        if(!rafId)rafId=raf(draw);
      } else {
        if(rafId){cancelAnimationFrame(rafId);rafId=null;}
      }
    },{threshold:0.05}).observe(hero);
  })();
  /* chart bars */
  (function(){
    var barData=[['hbar1',240,60,0],['hbar2',220,80,80],['hbar3',200,100,160],['hbar4',180,120,240],['hbar5',155,145,320],['hbar6',168,132,400]];
    var heroVis=document.querySelector('.hero-visual');if(!heroVis)return;
    var fired=false;
    onVis(heroVis,function(){
      if(fired)return;fired=true;
      barData.forEach(function(bd){
        var el=document.getElementById(bd[0]);if(!el)return;
        var fY=bd[1],fH=bd[2],delay=bd[3];
        setTimeout(function(){
          var t0=null,dur=950;
          (function frame(ts){if(!t0)t0=ts;var t=Math.min((ts-t0)/dur,1),e=easeOut3(t);el.setAttribute('height',Math.round(e*fH));el.setAttribute('y',Math.round(300-e*fH));if(t<1)raf(frame);})(performance.now());
        },delay);
      });
      var trend=document.getElementById('htrend');
      if(trend){
        var fp=[[327,240],[353,222],[379,200],[405,178],[431,154],[457,166]];
        setTimeout(function(){
          var t0=null,dur=1200;
          (function frame(ts){if(!t0)t0=ts;var t=Math.min((ts-t0)/dur,1),e=easeOut3(t);
            var pts=fp.map(function(p){return p[0]+','+(Math.round(300+(p[1]-300)*e));});
            trend.setAttribute('points',pts.join(' '));if(t<1)raf(frame);})(performance.now());
        },350);
      }
    },0.25);
  })();
  /* count-up */
  function countUp(el,target,suffix,dur){
    var t0=null;
    (function frame(ts){if(!t0)t0=ts;var t=Math.min((ts-t0)/dur,1);
      el.textContent=Math.round(easeOut3(t)*target)+suffix;
      if(t<1)raf(frame);else el.textContent=target+suffix;})(performance.now());
  }
  var hosEl=document.getElementById('sn-hospitals'),engEl=document.getElementById('sn-engagements');
  if(hosEl)onVis(hosEl,function(){countUp(hosEl,10,'+',1400);},0.6);
  if(engEl)onVis(engEl,function(){countUp(engEl,80,'+',1600);},0.6);
  /* anim-group grids */
  document.querySelectorAll('.services-grid,.vals-grid,.opd-results,.psych-grid,.flow-cols').forEach(function(g){g.classList.add('anim-group');});
  var gObs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');gObs.unobserve(e.target);}});},{threshold:0.1,rootMargin:'0px 0px 50px 0px'});
  document.querySelectorAll('.anim-group').forEach(function(g){gObs.observe(g);});
  /* problem items pulse bar */
  (function(){
    var items=document.querySelectorAll('.problem-item');
    var pObs=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(!e.isIntersecting)return;
        var i=Array.prototype.indexOf.call(items,e.target);
        setTimeout(function(){e.target.classList.add('p-in');},i*130);
        pObs.unobserve(e.target);
      });
    },{threshold:0.3});
    items.forEach(function(el){pObs.observe(el);});
  })();
  /* logo marquee */
  (function(){
    var list=document.querySelector('.logos-list');if(!list)return;
    var orig=list.innerHTML;
    var wrap=document.createElement('div');wrap.className='logos-marquee-wrap';
    var track=document.createElement('div');track.className='logos-track';
    track.innerHTML=orig+orig;wrap.appendChild(track);
    list.parentNode.replaceChild(wrap,list);
  })();
  /* 3D card tilt — purely decorative, deferred until browser is idle */
  (window.requestIdleCallback||function(cb){setTimeout(cb,200);})(function(){
    function applyTilt(card,deg){
      card.addEventListener('mousemove',function(e){
        var r=card.getBoundingClientRect();
        var dx=(e.clientX-r.left-r.width/2)/(r.width/2),dy=(e.clientY-r.top-r.height/2)/(r.height/2);
        card.style.transform='translateY(-6px) rotateX('+(-dy*deg)+'deg) rotateY('+(dx*deg)+'deg)';
        card.style.transition='transform 0.1s ease,box-shadow 0.2s';
      });
      card.addEventListener('mouseleave',function(){card.style.transform='';card.style.transition='transform 0.4s cubic-bezier(.25,.46,.45,.94),box-shadow 0.3s';});
    }
    document.querySelectorAll('.service-card').forEach(function(c){applyTilt(c,5);});
    document.querySelectorAll('.val-card').forEach(function(c){applyTilt(c,3);});
    document.querySelectorAll('.stat-card').forEach(function(c){applyTilt(c,2.5);});
  });
  /* journey steps cycle */
  function initSteps(contSel,stepSel,cls,interval){
    document.querySelectorAll(contSel).forEach(function(container){
      var steps=container.querySelectorAll(stepSel);if(!steps.length)return;
      var cur=0,timer=null;
      function activate(i){steps.forEach(function(s){s.classList.remove(cls);});steps[i].classList.add(cls);cur=(i+1)%steps.length;}
      steps.forEach(function(s,i){s.addEventListener('click',function(){clearInterval(timer);activate(i);timer=setInterval(function(){activate(cur);},interval);});});
      var io=new IntersectionObserver(function(entries){
        if(entries[0].isIntersecting){activate(0);timer=setInterval(function(){activate(cur);},interval);}
        else{clearInterval(timer);steps.forEach(function(s){s.classList.remove(cls);});}
      },{threshold:0.25});
      io.observe(container);
    });
  }
  initSteps('.journey-grid','.j-step','j-active',2400);
  initSteps('.opd-funnel','.opd-step','opd-act',2200);
  /* OPD connector draw */
  document.querySelectorAll('.opd-funnel').forEach(function(f){
    var conn=document.createElement('div');conn.className='opd-connector';f.appendChild(conn);
    onVis(f,function(){setTimeout(function(){conn.classList.add('drawn');},150);},0.3);
  });
  /* nav active */
  var serviceSubPages=['seo','paid','social','email','opd'];
  function setNavActive(id){
    document.querySelectorAll('.nav-links li>a,.nav-links li>button').forEach(function(btn){
      btn.classList.remove('nav-active');
      var href=btn.getAttribute('href')||'';
      var oc=btn.getAttribute('onclick')||'';
      if(oc.indexOf("'"+id+"'")>-1)btn.classList.add('nav-active');
      if(serviceSubPages.indexOf(id)>-1&&oc.indexOf('toggleDd')>-1)btn.classList.add('nav-active');
    });
  }
  /* Dynamic page titles for SEO & UX */
  var pageTitles={
    home:'Qlarify Health | Healthcare Marketing Agency India',
    video:'Video as Infrastructure | Qlarify Health',
    seo:'Hospital SEO & Content Marketing | Qlarify Health',
    paid:'Paid Media & Performance Marketing | Qlarify Health',
    social:'Social Media Marketing for Hospitals | Qlarify Health',
    email:'Email & WhatsApp Patient Communication | Qlarify Health',
    opd:'OPD Growth Marketing | Qlarify Health',
    about:'About Us | Qlarify Health',
    contact:'Schedule a Call | Qlarify Health',
    privacy:'Privacy Policy | Qlarify Health',
    terms:'Terms & Conditions | Qlarify Health',
    blog:'Insights & Resources | Qlarify Health',
    'blog-hospital-marketing':'What is Hospital Marketing? | Qlarify Health',
    'blog-opd-footfall':'How to Increase OPD Footfall | Qlarify Health',
    'blog-video-marketing':'Video Marketing for Hospitals | Qlarify Health',
    'blog-hospital-seo':'Hospital SEO Guide | Qlarify Health',
    'blog-healthcare-agency':'Healthcare vs General Agency | Qlarify Health',
    'blog-social-media-hospitals':'Social Media for Hospitals | Qlarify Health'
  };
  setNavActive('home');
  var _sp2=showPage;
  showPage=function(id){_sp2(id);setNavActive(id);if(pageTitles[id])document.title=pageTitles[id];};
})();
/* ─────────────────────────────────────────────────────
   HERO H1 SLOT-MACHINE CYCLER  (clean rebuild)
───────────────────────────────────────────────────── */
(function () {
  var h1 = document.getElementById('hero-h1');
  if (!h1) return;
  /* ── Entrance: fade+slide the whole H1 in ── */
  setTimeout(function () { h1.classList.add('h1-in'); }, 80);
  /* ── Slot machine setup ── */
  var CYCLE_MS  = 2400;   // time between word changes
  var EASE      = 'cubic-bezier(0.4,0,0.2,1)';
  var TRANS_MS  = 520;    // slide transition duration
  var slots = [
    { wrap: document.getElementById('h1-slot1'), track: document.getElementById('h1-track1') },
    { wrap: document.getElementById('h1-slot2'), track: document.getElementById('h1-track2') },
    { wrap: document.getElementById('h1-slot3'), track: document.getElementById('h1-track3') },
  ];
  /* Per-slot state */
  slots.forEach(function (s) { s.idx = 0; });
  /* ── Set slot wrapper height = one word height ── */
  function fixHeight(s) {
    var firstWord = s.track && s.track.querySelector('.h1-slot-word');
    if (!firstWord) return;
    var wh = firstWord.getBoundingClientRect().height;
    if (wh > 4) s.wrap.style.height = wh + 'px';
  }
  /* Run after fonts are painted */
  function initHeights() {
    slots.forEach(fixHeight);
  }
  /* Use requestAnimationFrame to wait for first paint */
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      initHeights();
      /* Re-check on resize */
      window.addEventListener('resize', initHeights, { passive: true });
    });
  });
  /* ── Advance one slot ── */
  function advance(s) {
    var words = s.track.querySelectorAll('.h1-slot-word');
    var count = words.length;
    if (count < 2) return;
    /* Remove active underline from current */
    words[s.idx].classList.remove('sw-active');
    s.idx = (s.idx + 1) % count;
    /* If looping back to 0: instant-reset then re-enable transition */
    if (s.idx === 0) {
      s.track.style.transition = 'none';
      s.track.style.transform  = 'translateY(0)';
      /* Force reflow so the instant reset takes effect */
      void s.track.offsetHeight;
      s.track.style.transition = 'transform ' + TRANS_MS + 'ms ' + EASE;
      fixHeight(s);
      words[0].classList.add('sw-active');
      return;
    }
    /* Normal advance: slide up by idx * word-height */
    var wh = s.wrap.offsetHeight;
    s.track.style.transition = 'transform ' + TRANS_MS + 'ms ' + EASE;
    s.track.style.transform  = 'translateY(-' + (s.idx * wh) + 'px)';
    /* Mark new active word */
    setTimeout(function () {
      words[s.idx].classList.add('sw-active');
    }, TRANS_MS * 0.6);
  }
  /* ── Enable transitions after first layout ── */
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      slots.forEach(function (s) {
        s.track.style.transition = 'transform ' + TRANS_MS + 'ms ' + EASE;
      });
      /* Mark first words active */
      slots.forEach(function (s) {
        var first = s.track && s.track.querySelector('.h1-slot-word');
        if (first) first.classList.add('sw-active');
      });
    });
  });
  /* ── Start cycling after H1 entrance ── */
  var ENTRANCE_MS = 80 + 700; /* entrance delay + duration */
  setTimeout(function () {
    setInterval(function () {
      advance(slots[0]);
      setTimeout(function () { advance(slots[1]); }, 280);
      setTimeout(function () { advance(slots[2]); }, 560);
    }, CYCLE_MS);
  }, ENTRANCE_MS);
})();
/* Service card scroll entrance */
(function(){
  var cards = document.querySelectorAll('.service-card');
  var scObs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('sc-visible');
        scObs.unobserve(e.target);
      }
    });
  }, {threshold: 0.1, rootMargin: '0px 0px 80px 0px'});
  cards.forEach(function(c){ scObs.observe(c); });
})();
/* ═══════════════════════════════════════════════════
   INFOGRAPHIC ANIMATIONS
═══════════════════════════════════════════════════ */
(function(){
  'use strict';
  function onVisible(el, cb, threshold) {
    if (!el) return;
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { cb(el); io.unobserve(el); }
      });
    }, { threshold: threshold || 0.25, rootMargin: '0px 0px 40px 0px' });
    io.observe(el);
  }
  /* 1. SEO bar chart */
  onVisible(document.getElementById('seo-chart'), function(el) {
    el.querySelectorAll('.ig-bar').forEach(function(bar) {
      var w = bar.getAttribute('data-w');
      if (w) {
        requestAnimationFrame(function() {
          bar.style.width = w + '%';
        });
      }
    });
  }, 0.2);
  /* 2. Social funnel */
  onVisible(document.getElementById('social-funnel'), function(el) {
    el.classList.add('ig-animated');
    el.querySelectorAll('.ig-funnel-step').forEach(function(s) {
      s.classList.add('ig-visible');
    });
  }, 0.2);
  /* 3. Email circle stats */
  onVisible(document.getElementById('email-stats'), function(el) {
    el.querySelectorAll('.ig-circle-fill').forEach(function(circle) {
      var pct = parseFloat(circle.getAttribute('data-pct')) || 0;
      /* circumference = 2πr = 2 * π * 32 ≈ 201 */
      var circumference = 201;
      var offset = circumference - (Math.min(pct / 100, 1) * circumference);
      requestAnimationFrame(function() {
        circle.style.strokeDashoffset = offset;
      });
    });
  }, 0.3);
  /* 4. About timeline */
  onVisible(document.getElementById('ab-timeline'), function(el) {
    el.classList.add('tl-visible');
  }, 0.15);
})();
/* Animate comparison bars on scroll */
(function(){
  var wrap = document.querySelector('.pm-compare-visual');
  if (!wrap) return;
  var io = new IntersectionObserver(function(entries){
    if (!entries[0].isIntersecting) return;
    wrap.querySelectorAll('.pm-cv-bar').forEach(function(bar){
      var w = bar.getAttribute('data-w');
      if (w) requestAnimationFrame(function(){ bar.style.width = w + '%'; });
    });
    io.unobserve(wrap);
  }, { threshold: 0.2 });
  io.observe(wrap);
})();
/* ══════════════════════════════════════════════════════
   UX IMPROVEMENTS — Floating CTA + Mobile Nav Overlay + Form Validation
══════════════════════════════════════════════════════ */
/* Floating CTA — create and manage visibility */
(function(){
  var fc = document.createElement('button');
  fc.id = 'float-cta';
  fc.setAttribute('aria-label','Schedule a Call');
  fc.innerHTML = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013 13.13a19.79 19.79 0 01-3.07-8.67A2 2 0 011.95 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.12 9.91a16 16 0 006 6l1.19-1.19a2 2 0 012.11-.45c.908.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg> Schedule a Call';
  fc.addEventListener('click', function(){ showPage('contact'); });
  document.body.appendChild(fc);
  var shown = false;
  window.addEventListener('scroll', function(){
    var sy = window.scrollY;
    if(!shown && sy > 320){ shown = true; fc.classList.add('visible'); }
    else if(shown && sy < 60){ shown = false; fc.classList.remove('visible'); }
  }, {passive:true});
})();
/* Mobile nav overlay sync */
(function(){
  var ov = document.getElementById('mob-overlay');
  if(!ov) return;
  /* Patch toggleMobile to also drive the overlay */
  var _orig = window.toggleMobile;
  window.toggleMobile = function(){
    _orig();
    var open = document.getElementById('nav-links').classList.contains('mobile-open');
    if(open){ ov.classList.add('visible'); }
    else { ov.classList.remove('visible'); }
  };
  /* Close menu when overlay is tapped (fallback in case onclick doesn't fire) */
  ov.addEventListener('click', function(){
    var nl = document.getElementById('nav-links');
    if(nl.classList.contains('mobile-open')) window.toggleMobile();
  });
})();
/* Form validation */
(function(){
  var form = document.getElementById('cf-form');
  var btn  = document.getElementById('cf-submit');
  if(!form || !btn) return;
  function validateGroup(group){
    var input = group.querySelector('[data-required]');
    if(!input) return true;
    var errEl = group.querySelector('.form-error');
    var val = input.value.trim();
    group.classList.remove('has-error','is-valid');
    if(!val){
      group.classList.add('has-error');
      return false;
    }
    group.classList.add('is-valid');
    return true;
  }
  /* Real-time: validate on blur & clear error on type */
  form.querySelectorAll('.form-input,.form-select,.form-textarea').forEach(function(el){
    el.addEventListener('blur', function(){
      var g = this.closest('.form-group');
      if(g && g.querySelector('[data-required]')) validateGroup(g);
    });
    el.addEventListener('input', function(){
      var g = this.closest('.form-group');
      if(g && g.classList.contains('has-error') && g.querySelector('[data-required]')) validateGroup(g);
    });
    el.addEventListener('change', function(){
      var g = this.closest('.form-group');
      if(g && g.querySelector('[data-required]')) validateGroup(g);
    });
  });
  /* Submit */
  btn.addEventListener('click', function(){
    var allValid = true;
    form.querySelectorAll('.form-group').forEach(function(g){
      if(!validateGroup(g)) allValid = false;
    });
    if(!allValid){
      /* Scroll to first error */
      var first = form.querySelector('.has-error');
      if(first) first.querySelector('input,select,textarea').focus();
      window.qhTrack && qhTrack('form_attempt', {
        form_id: 'cf-form', form_location: 'contact', valid: false
      });
      return;
    }
    window.qhTrack && qhTrack('form_attempt', {
      form_id: 'cf-form', form_location: 'contact', valid: true,
      interest: (document.getElementById('cf-interest')||{}).value || 'unknown'
    });
    /* Loading state */
    btn.disabled = true;
    btn.innerHTML = '<span class="cf-spinner"></span>Sending…';
    /* Submit to Web3Forms */
    var formData = new FormData();
    formData.append('access_key', '9d24ab4d-33de-4076-9f42-77aab943b9ab');
    formData.append('subject', 'New enquiry from Qlarify Health website');
    formData.append('from_name', 'Qlarify Health Website');
    var hospital = document.getElementById('cf-hospital');
    var name = document.getElementById('cf-name');
    var city = document.getElementById('cf-city');
    var interest = document.getElementById('cf-interest');
    var context = document.getElementById('cf-context');
    if(hospital) formData.append('Hospital', hospital.value);
    if(name) formData.append('Name & Role', name.value);
    if(city) formData.append('City', city.value);
    if(interest) formData.append('Primary Interest', interest.value);
    if(context) formData.append('Context', context.value);
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    }).then(function(res){ return res.json(); }).then(function(data){
      if(data.success){
        btn.innerHTML = '✓ Request sent — we\'ll be in touch within 24 hours';
        btn.classList.add('cf-success');
        window.qhTrack && qhTrack('lead_form_submit', {
          form_id: 'cf-form',
          form_location: 'contact',
          interest: (interest && interest.value) || 'unknown',
          city: (city && city.value) || 'unknown',
          lead_type: 'contact_form'
        });
        form.querySelectorAll('.form-group').forEach(function(g){
          g.classList.remove('is-valid','has-error');
        });
        form.reset();
      } else {
        btn.innerHTML = '✗ Something went wrong — please try again';
        btn.disabled = false;
        window.qhTrack && qhTrack('form_error', {
          form_id: 'cf-form', error_type: 'api_failure'
        });
      }
    }).catch(function(){
      btn.innerHTML = '✗ Network error — please try again';
      btn.disabled = false;
      window.qhTrack && qhTrack('form_error', {
        form_id: 'cf-form', error_type: 'network_error'
      });
    });
  });
})();
/* ── Video Journey Prog: scroll trigger ── */
(function(){
  var prog = document.getElementById('vj-prog');
  if(!prog) return;
  var cards = prog.querySelectorAll('.vj-ps');
  var done = false;
  var obs = new IntersectionObserver(function(entries){
    if(done) return;
    entries.forEach(function(e){
      if(e.isIntersecting){ done=true; cards.forEach(function(c){ c.classList.add('vjs-in'); }); }
    });
  }, {threshold:0.3});
  obs.observe(prog);
  cards.forEach(function(c){
    c.addEventListener('mouseenter', function(){ cards.forEach(function(x){x.classList.remove('vjs-on');}); c.classList.add('vjs-on'); });
    c.addEventListener('mouseleave', function(){ c.classList.remove('vjs-on'); });
  });
})();
/* ── Patient Acquisition Engine: scroll trigger + count-up + hover ── */
(function(){
  var funnel = document.getElementById('pae-funnel');
  var bar    = document.getElementById('pae-bar');
  if(!funnel) return;
  var stages   = funnel.querySelectorAll('.pae-stage');
  var animated = false;
  function easeOut(t){ return 1 - Math.pow(1-t, 3); }
  function countUp(el, target, suffix, prefix, duration){
    var start = performance.now();
    function step(now){
      var p = Math.min((now - start) / duration, 1);
      el.textContent = (prefix||'') + Math.round(easeOut(p) * target) + (suffix||'');
      if(p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function runAnimation(){
    if(animated) return;
    animated = true;
    stages.forEach(function(s){ s.classList.add('qs-entered'); });
    setTimeout(function(){ if(bar) bar.classList.add('qs-animate'); }, 300);
    var nums = funnel.querySelectorAll('.pae-num[data-target]');
    nums.forEach(function(el, i){
      setTimeout(function(){
        var target = parseInt(el.getAttribute('data-target'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var prefix = el.getAttribute('data-prefix') || '';
        countUp(el, target, suffix, prefix, 900);
      }, 200 + i * 140);
    });
  }
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting) runAnimation(); });
  }, { threshold: 0.25 });
  obs.observe(funnel);
  // hover: set active class, highlight matching bar label
  var labels = document.querySelectorAll('.pae-bar-label');
  stages.forEach(function(s){
    s.addEventListener('mouseenter', function(){
      stages.forEach(function(x){ x.classList.remove('qs-active'); });
      labels.forEach(function(l){ l.classList.remove('qs-active-label'); });
      s.classList.add('qs-active');
      var idx = parseInt(s.getAttribute('data-stage'), 10);
      if(labels[idx]) labels[idx].classList.add('qs-active-label');
    });
    s.addEventListener('mouseleave', function(){
      s.classList.remove('qs-active');
      labels.forEach(function(l){ l.classList.remove('qs-active-label'); });
    });
  });
})();

/* ── Video Gap Analysis Matrix ── */
(function(){
  var gapData = {
    before: [
      {name:'Orthopaedics', cells:[3,2,0,0]},
      {name:'Cardiology',   cells:[2,1,1,0]},
      {name:'Oncology',     cells:[1,1,0,0]},
      {name:'Gynaecology',  cells:[2,1,0,0]},
      {name:'Neurology',    cells:[1,0,0,0]},
      {name:'Gastroenterology', cells:[1,1,0,0]}
    ],
    after: [
      {name:'Orthopaedics', cells:[5,6,3,3]},
      {name:'Cardiology',   cells:[4,5,3,3]},
      {name:'Oncology',     cells:[4,5,2,3]},
      {name:'Gynaecology',  cells:[4,5,2,3]},
      {name:'Neurology',    cells:[3,5,2,3]},
      {name:'Gastroenterology', cells:[3,5,2,2]}
    ]
  };
  var isAfter = false;

  function renderMatrix(state){
    var tbody = document.getElementById('gap-tbody');
    if(!tbody) return;
    var rows = gapData[state];
    var html = '';
    var totalVids = 0, totalGaps = 0;
    rows.forEach(function(r){
      html += '<tr>';
      html += '<td style="padding:10px 14px;font-size:13px;font-weight:600;color:var(--ink);white-space:nowrap;">' + r.name + '</td>';
      r.cells.forEach(function(v){
        var bg, clr, icon;
        if(v >= 3){ bg='rgba(39,174,96,.12)'; clr='#27ae60'; icon='✓ '+v; }
        else if(v >= 1){ bg='rgba(243,156,18,.1)'; clr='#e67e22'; icon='◐ '+v; }
        else { bg='rgba(192,57,43,.06)'; clr='#c0392b'; icon='✕'; totalGaps++; }
        totalVids += v;
        html += '<td style="padding:10px 14px;text-align:center;background:'+bg+';border-radius:6px;"><span style="font-size:13px;font-weight:600;color:'+clr+';">'+icon+'</span></td>';
      });
      html += '</tr>';
    });
    tbody.innerHTML = html;
    var statsEl = document.getElementById('gap-stats');
    if(statsEl){
      if(state === 'before'){
        statsEl.innerHTML = totalVids + ' videos found · <span style="color:#c0392b;">' + totalGaps + ' journey gaps</span>';
      } else {
        statsEl.innerHTML = (totalVids) + ' videos · <span style="color:#27ae60;">0 gaps — full coverage</span>';
      }
    }
  }

  window.toggleGapMatrix = function(){
    isAfter = !isAfter;
    renderMatrix(isAfter ? 'after' : 'before');
    var label = document.getElementById('gap-label');
    var btn = document.getElementById('gap-toggle');
    if(label) label.textContent = isAfter ? 'After Qlarify' : 'Before Qlarify';
    if(btn){
      btn.textContent = isAfter ? '← Show Before Qlarify' : 'Show After Qlarify →';
      btn.style.background = isAfter ? '#27ae60' : '';
    }
  };

  // Initial render
  renderMatrix('before');
})();

/* ── Specialty Tab Switcher ── */
window.switchSpec = function(spec){
  var tabs = document.querySelectorAll('.vi-spec-tab');
  var panels = document.querySelectorAll('.vi-spec-panel');
  tabs.forEach(function(t){
    if(t.getAttribute('data-spec') === spec){
      t.classList.add('active');
      t.style.background = 'var(--rust)';
      t.style.color = 'white';
      t.style.borderColor = 'var(--rust)';
    } else {
      t.classList.remove('active');
      t.style.background = 'white';
      t.style.color = 'var(--ink-light)';
      t.style.borderColor = 'var(--border)';
    }
  });
  panels.forEach(function(p){
    if(p.getAttribute('data-spec') === spec){
      p.classList.add('active');
      p.style.display = '';
      // Re-apply grid for ortho (inline) or show inner grid for others
      if(spec === 'ortho'){
        p.style.display = 'grid';
      } else {
        p.style.display = 'block';
      }
    } else {
      p.classList.remove('active');
      p.style.display = 'none';
    }
  });
};
/* ──────────────────────────────────────────────────────────────────────
   QH Analytics Layer — dataLayer pushes for GA4 via GTM (GTM-535KTHSM).
   All events use snake_case names + event-scoped params:
     journey_stage, page_type, page_id, route
   No PII is ever pushed to dataLayer.
   ────────────────────────────────────────────────────────────────────── */
(function(){
  window.dataLayer = window.dataLayer || [];

  /* journey_stage by page id — used by every event fired on that page */
  var JOURNEY_STAGE = {
    home:'awareness', about:'awareness', blog:'awareness', glossary:'awareness',
    'blog-hospital-marketing':'awareness','blog-opd-footfall':'awareness',
    'blog-video-marketing':'awareness','blog-hospital-seo':'awareness',
    'blog-healthcare-agency':'awareness','blog-social-media-hospitals':'awareness',
    'blog-vs-generic-agencies':'awareness','blog-in-house-vs-agency':'awareness',
    'blog-hospital-video-production-india':'awareness',
    video:'consideration', seo:'consideration', paid:'consideration',
    social:'consideration', email:'consideration', opd:'consideration',
    contact:'intent',
    privacy:'utility', terms:'utility', '404':'utility'
  };
  var PAGE_TYPE = {
    home:'home', about:'about', blog:'blog_index', glossary:'glossary',
    contact:'contact', privacy:'legal', terms:'legal', '404':'error'
  };
  function pageType(id){
    if(PAGE_TYPE[id]) return PAGE_TYPE[id];
    if(id.indexOf('blog-')===0) return 'blog_post';
    return 'service';
  }

  /* qhTrack: single helper. All events go through here. */
  window.qhTrack = function(name, params){
    var ctx = window.qhPageContext || {};
    var payload = Object.assign({
      event: name,
      page_id: ctx.page_id || 'home',
      route: ctx.route || location.pathname,
      page_type: ctx.page_type || 'unknown',
      journey_stage: ctx.journey_stage || 'awareness'
    }, params || {});
    window.dataLayer.push(payload);
  };

  /* Wrap updateMeta so every page change refreshes context + fires page_view_qh */
  if(typeof updateMeta === 'function'){
    var _updateMeta = updateMeta;
    updateMeta = function(id){
      _updateMeta(id);
      var route = (typeof idToPath === 'function') ? '/'+idToPath(id) : location.pathname;
      window.qhPageContext = {
        page_id: id,
        route: route,
        page_type: pageType(id),
        journey_stage: JOURNEY_STAGE[id] || 'awareness'
      };
      qhTrack('page_view_qh', { page_title: document.title });
      __qhResetScrollDepth();
    };
    /* Fire once for the page that's already active at load time */
    setTimeout(function(){
      var active = document.querySelector('.page.active');
      if(active){
        var id = active.id.replace(/^page-/, '');
        var route = (typeof idToPath === 'function') ? '/'+idToPath(id) : location.pathname;
        window.qhPageContext = {
          page_id: id, route: route,
          page_type: pageType(id),
          journey_stage: JOURNEY_STAGE[id] || 'awareness'
        };
        qhTrack('page_view_qh', { page_title: document.title });
      }
    }, 0);
  }

  /* ── Delegated click handler: call / whatsapp / mailto / outbound / cta ── */
  document.addEventListener('click', function(e){
    var a = e.target.closest('a');
    if(a){
      var href = (a.getAttribute('href') || '').trim();
      var loc = a.getAttribute('data-cta-location') || locationOf(a);
      if(href.indexOf('tel:') === 0){
        qhTrack('call_click', { link_location: loc, phone_masked: maskPhone(href.slice(4)) });
        return;
      }
      if(/^https?:\/\/(wa\.me|api\.whatsapp\.com)/i.test(href) || /^whatsapp:/i.test(href)){
        qhTrack('whatsapp_click', { link_location: loc });
        return;
      }
      if(href.indexOf('mailto:') === 0){
        qhTrack('email_click', { link_location: loc });
        return;
      }
      if(/^https?:\/\//i.test(href) && href.indexOf(location.host) === -1){
        qhTrack('outbound_click', {
          link_location: loc,
          destination_domain: hostOf(href)
        });
        return;
      }
    }
    var cta = e.target.closest('[data-track]');
    if(cta){
      qhTrack(cta.getAttribute('data-track'), {
        cta_location: cta.getAttribute('data-cta-location') || locationOf(cta),
        cta_label: (cta.textContent || '').trim().slice(0, 80)
      });
    }
  }, true);

  function locationOf(el){
    var sec = el.closest('section,header,footer,[data-section]');
    if(sec){
      return sec.getAttribute('data-section')
        || sec.id
        || sec.tagName.toLowerCase();
    }
    return 'unknown';
  }
  function hostOf(url){ try { return new URL(url).hostname; } catch(_){ return ''; } }
  function maskPhone(p){ p = (p||'').replace(/[^\d+]/g,''); return p.length < 4 ? '***' : p.slice(0,3)+'***'+p.slice(-2); }

  /* ── Scroll depth: 25 / 50 / 75 / 90 per page activation ── */
  var __qhDepthFired = {};
  function __qhResetScrollDepth(){ __qhDepthFired = {}; }
  window.__qhResetScrollDepth = __qhResetScrollDepth;
  var thresholds = [25, 50, 75, 90];
  window.addEventListener('scroll', function(){
    var doc = document.documentElement;
    var scrolled = (window.scrollY + window.innerHeight);
    var height = doc.scrollHeight;
    if(height <= window.innerHeight) return;
    var pct = Math.round((scrolled / height) * 100);
    thresholds.forEach(function(t){
      if(pct >= t && !__qhDepthFired[t]){
        __qhDepthFired[t] = 1;
        qhTrack('scroll_depth', { depth_pct: t });
      }
    });
  }, { passive: true });

  /* ── Form attempt + form view (contact form #cf-form) ── */
  document.addEventListener('DOMContentLoaded', function(){
    var form = document.getElementById('cf-form');
    if(!form) return;
    var seen = false;
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting && !seen){
          seen = true;
          qhTrack('form_view', { form_id: 'cf-form', form_location: 'contact' });
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(form);
  });

  /* ── Capture GA4 client_id for CRM tie-back (C-08) ──────────────────────
     Strategy: try window.gtag('get') first (works when GA4 Config tag
     exposes it). If window.gtag is not defined (new Google Tag type in
     GTM routes internally without exposing window.gtag), fall back to
     reading the _ga cookie which GA4 always sets after the first hit.
     Cookie format: GA1.<version>.<random>.<timestamp> → cid = last two parts.
     Stored on window.qhClientId + injected as hidden #cf-form field so
     Web3Forms forwards the cid to the CRM. */
  function qhInjectCid(cid) {
    if (!cid) return;
    window.qhClientId = cid;
    var form = document.getElementById('cf-form');
    if (form && !form.querySelector('input[name="ga_client_id"]')) {
      var hi = document.createElement('input');
      hi.type = 'hidden';
      hi.name = 'ga_client_id';
      hi.value = cid;
      form.appendChild(hi);
    }
  }
  setTimeout(function(){
    /* Primary: gtag('get') — works when window.gtag is defined */
    if (typeof window.gtag === 'function') {
      try { window.gtag('get', 'G-PMSJHJ679P', 'client_id', qhInjectCid); } catch(_){}
      return;
    }
    /* Fallback: read _ga cookie — set by GA4 after first collect hit */
    var m = document.cookie.match(/_ga=GA\d+\.\d+\.(\d+\.\d+)/);
    if (m) { qhInjectCid(m[1]); return; }
    /* Last resort: retry once more after another 2s (cookie may not be set yet) */
    setTimeout(function(){
      var m2 = document.cookie.match(/_ga=GA\d+\.\d+\.(\d+\.\d+)/);
      if (m2) qhInjectCid(m2[1]);
    }, 2000);
  }, 1500);
})();
