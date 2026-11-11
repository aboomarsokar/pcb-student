/* شرح صوتي: يقرأ نصّ المعلّم (عربي/إنجليزي) بأفضل صوت متاح على الجهاز */
window.Voice=(function(){
var SS=window.speechSynthesis,N=null,key=null,lang='ar',rate=1,idx=0,list=[],playing=false,gen=0,voices=[],bar=null,auto=false,hasBar=false;
try{lang=localStorage.getItem('pcbLang')||'ar'}catch(e){}
try{rate=parseFloat(localStorage.getItem('pcbRate'))||1;auto=localStorage.getItem('pcbAuto')==='1'}catch(e){}
function loadVoices(){try{voices=SS?SS.getVoices():[]}catch(e){voices=[]}}
if(SS){loadVoices();if(SS.addEventListener)SS.addEventListener('voiceschanged',loadVoices);else SS.onvoiceschanged=loadVoices}
var PREF={ar:['majed','maged','tarik','laila','hoda','zariyah','salma','naayf','google','neural','enhanced','premium','natural'],en:['samantha','daniel','karen','serena','aria','guy','jenny','ava','google us','google uk','neural','enhanced','premium','natural','siri']};
function score(v,l){var n=(v.name||'').toLowerCase(),lg=(v.lang||'').toLowerCase().replace('_','-'),s=0;if(l==='ar'){if(lg.indexOf('ar')!==0)return -1;if(lg==='ar-sa')s+=3;if(lg==='ar-eg')s+=1}else{if(lg.indexOf('en')!==0)return -1;if(lg==='en-us')s+=3;if(lg==='en-gb')s+=2}
  PREF[l].forEach(function(p,i){if(n.indexOf(p)>=0)s+=(PREF[l].length-i)*.6});if(v.localService)s+=.5;if(n.indexOf('compact')>=0)s-=2;return s}
function pick(l){var best=null,bs=-1;voices.forEach(function(v){var s=score(v,l);if(s>bs){bs=s;best=v}});return best}
function sentences(a){return (a||[]).map(function(x){return String(x).trim()}).filter(Boolean)}
function cur(){var o=N&&N.tabs&&N.tabs[key];return o?sentences(o[lang]||o.ar):[]}
function introL(){return N&&N.intro?sentences(N.intro[lang]||N.intro.ar):[]}
function stopSpeech(){gen++;playing=false;try{if(SS){SS.cancel()}}catch(e){}render()}
function speakAt(i,g){if(g!==gen)return;if(i>=list.length){playing=false;idx=0;render();return}idx=i;render();
  var u=new SpeechSynthesisUtterance(list[i]);u.lang=lang==='ar'?'ar-SA':'en-US';var v=pick(lang);if(v){u.voice=v;u.lang=v.lang}u.rate=lang==='ar'?Math.min(1.1,.92*rate):rate;u.pitch=1;u.volume=1;
  u.onend=function(){if(g===gen)speakAt(i+1,g)};u.onerror=function(e){if(g===gen&&e.error!=='canceled'&&e.error!=='interrupted'){playing=false;render()}};
  try{SS.speak(u)}catch(e){playing=false;render()}}
function play(from){if(!SS||!list.length)return;gen++;var g=gen;try{SS.cancel()}catch(e){}playing=true;idx=from||0;loadVoices();
  /* تأخير قصير بعد cancel لتفادي ابتلاع الجملة الأولى على بعض الأجهزة */
  setTimeout(function(){if(g===gen)speakAt(idx,g)},60);render()}
function toggle(){if(playing){stopSpeech();return}var a=cur();if(!a.length)return;list=a;if(!Voice.introDone&&introL().length){list=introL().concat(a);Voice.introDone=true}play(0)}
function ui(){if(bar||!document.body)return;bar=document.createElement('div');bar.className='vbar';bar.innerHTML='<div class="vh"><img class="vi" alt="" src="images/kinex.jpg"><div class="vt"><b class="vtt"></b><span class="vs"></span></div><button class="vbp" aria-label="play"></button><button class="vbs" aria-label="speed"></button></div><div class="vx hidden"></div>';
  var st=document.createElement('style');st.textContent='.vbar{position:fixed;left:8px;right:8px;bottom:calc(8px + env(safe-area-inset-bottom,0px));max-width:560px;margin:0 auto;z-index:40;background:var(--card);color:var(--ink);border:2px solid var(--accent);border-radius:18px;box-shadow:0 8px 24px rgba(0,0,0,.35);padding:6px 8px;font-family:inherit}.vbar.hidden,.vbar .hidden{display:none!important}.vh{display:flex;align-items:center;gap:8px}.vi{width:40px;height:40px;border-radius:50%;border:2px solid #19d3ff;object-fit:cover;flex:none}.vt{flex:1;min-width:0;line-height:1.5}.vtt{display:block;font-size:.9rem;color:var(--accent)}.vs{display:block;font-size:.82rem;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.vbp{width:46px;height:46px;border-radius:50%;padding:0;flex:none;display:flex;align-items:center;justify-content:center;font-size:20px;background:var(--accent);color:var(--accent-ink,#fff);border:0;cursor:pointer}.vbs{padding:6px 10px;border-radius:12px;font-size:.8rem;flex:none;cursor:pointer;border:1px solid var(--line);background:var(--card);color:var(--ink);font:inherit;font-weight:700}.vx{max-height:34vh;overflow:auto;margin-top:6px;font-size:.92rem;line-height:1.9}.vx p{margin:0 0 4px;padding:2px 8px;border-radius:8px}.vx p.on{background:color-mix(in srgb,var(--accent) 22%,var(--card));font-weight:800}body.hasvb{padding-bottom:82px}';
  document.head.appendChild(st);document.body.appendChild(bar);document.body.classList.add('hasvb');
  bar.querySelector('.vbp').onclick=toggle;bar.querySelector('.vbs').onclick=function(){var r=[.8,1,1.2];rate=r[(r.indexOf(rate)+1)%3]||1;try{localStorage.setItem('pcbRate',rate)}catch(e){}if(playing)play(idx);else render()};
  bar.querySelector('.vt').onclick=function(){bar.querySelector('.vx').classList.toggle('hidden');render()};render()}
function render(){if(!bar)return;var a=cur();var show=!!a.length&&!!SS;bar.classList.toggle('hidden',!show);if(!show)return;
  var T=lang==='ar'?{l:'استمع للشرح',p:'جارٍ الشرح...',s:'السرعة'}:{l:'Listen to the lesson',p:'Explaining...',s:'Speed'};
  bar.dir=lang==='ar'?'rtl':'ltr';bar.querySelector('.vtt').textContent=(N.title&&(N.title[lang]||N.title.ar))||'Kinex';
  bar.querySelector('.vs').textContent=playing&&list[idx]?list[idx]:T.l;bar.querySelector('.vbp').innerHTML=window.ICONS?ICONS.svg(playing?'cross':'sound'):(playing?'■':'▶');
  bar.querySelector('.vbs').textContent=rate+'×';var vx=bar.querySelector('.vx');vx.innerHTML='';(playing?list:a).forEach(function(s,i){var p=document.createElement('p');p.textContent=s;if(playing&&i===idx)p.className='on';vx.appendChild(p)});
  var on=vx.querySelector('.on');if(on&&on.scrollIntoView)try{on.scrollIntoView({block:'nearest'})}catch(e){}}
var Voice={introDone:false,
 attach:function(narr){N=narr;ui();render()},
 tab:function(k){var was=key;key=k;if(playing)stopSpeech();else render();if(auto&&was!==k)setTimeout(function(){},0)},
 setKey:function(k){this.tab(k)},
 addTab:function(k,ar,en){if(!N)N={title:{},tabs:{}};if(!N.tabs)N.tabs={};N.tabs[k]={ar:ar,en:en};ui();render()},
 setLang:function(l){lang=l==='en'?'en':'ar';try{localStorage.setItem('pcbLang',lang)}catch(e){}if(playing)stopSpeech();render()},
 getLang:function(){return lang},
 stop:stopSpeech,toggle:toggle,
 /* قراءة نص حر (للدروس النصية) */
 readText:function(txt,l){if(!SS)return;l=l||lang;var parts=String(txt).replace(/\s+/g,' ').split(/(?<=[.!?؟۔؟])\s+/).filter(function(x){return x.trim().length>1});var save=lang;lang=l;list=parts;play(0)},
 speaking:function(){return playing},
 voices:function(){return voices.map(function(v){return v.name+' ('+v.lang+')'})}};
window.addEventListener('message',function(e){var d=e.data;if(d&&d.pcb==='lang')Voice.setLang(d.l);if(d&&d.pcb==='stopvoice')stopSpeech()});
window.addEventListener('pagehide',function(){try{SS&&SS.cancel()}catch(e){}});
try{window.parent&&window.parent!==window&&window.parent.postMessage({pcb:'ready'},'*')}catch(e){}
return Voice})();
