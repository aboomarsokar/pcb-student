/* قارئ الكتب والرزم: تصفّح الصفحات، تكبير وتحريك، أفقي/عمودي، وألوان وإضاءة مريحة للعين */
window.Reader=(function(){
var MODES=[
 {id:'paper',n:'ورقي مريح',bg:'#e8dcc0',f:'sepia(.5) saturate(1.15) brightness(.98) contrast(.96)'},
 {id:'normal',n:'عادي',bg:'#f3f3f1',f:''},
 {id:'warm',n:'ليلي دافئ',bg:'#241c14',f:'invert(.88) sepia(.5) hue-rotate(-12deg) brightness(.8) contrast(.95)'},
 {id:'dark',n:'داكن',bg:'#111',f:'invert(.9) hue-rotate(180deg) brightness(.85)'}
];
var LS={get:function(k,d){try{var v=localStorage.getItem(k);return v==null?d:v}catch(e){return d}},set:function(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
function open(cfg){
 var N=cfg.n||0,rtl=cfg.rtl!==false,cur=Math.max(0,Math.min(N-1,+LS.get('rd_'+cfg.key,0)||0)),mode=LS.get('rdMode','paper'),bright=+LS.get('rdBr',92),warm=+LS.get('rdWm',0),land=false,zoom=1,px=0,py=0,ui=true;
 var css='.rdr{position:fixed;inset:0;z-index:90;background:#000;display:flex;flex-direction:column;font-family:inherit;color:#222;-webkit-user-select:none;user-select:none;overscroll-behavior:contain}.rdr .rrtb,.rdr .rrbt2{display:flex;align-items:center;gap:8px;padding:8px 10px;background:rgba(0,0,0,.72);color:#fff;transition:transform .2s;flex:none}.rdr .rrtb{padding-top:calc(8px + env(safe-area-inset-top,0px))}.rdr .rrbt2{flex-wrap:wrap;justify-content:center;padding-bottom:calc(8px + env(safe-area-inset-bottom,0px))}.rdr.hide .rrtb{transform:translateY(-110%);position:absolute;left:0;right:0;top:0}.rdr.hide .rrbt2{transform:translateY(110%);position:absolute;left:0;right:0;bottom:0}.rdr button{font:inherit;border:0;border-radius:10px;background:rgba(255,255,255,.16);color:#fff;padding:7px 11px;cursor:pointer;min-height:38px}.rdr button.on{background:#fff;color:#111}.rdr .rrttl{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:800}.rdr .rrvw{flex:1;position:relative;overflow:hidden;touch-action:none}.rdr .rrpg{position:absolute;left:0;top:0;transform-origin:0 0;will-change:transform}.rdr img{display:block;max-width:none;box-shadow:0 4px 18px rgba(0,0,0,.35);background:#fff}.rdr .rrmsg{position:absolute;inset:0;display:grid;place-items:center;text-align:center;padding:24px;line-height:1.9;font-weight:700}.rdr input[type=range]{flex:1;min-width:120px}.rdr .rrpn{min-width:84px;text-align:center;font-variant-numeric:tabular-nums;direction:ltr}.rdr .rrmp{display:none;gap:8px;flex-wrap:wrap;align-items:center;justify-content:center;width:100%;padding:4px 0}.rdr .rrmp.show{display:flex}.rdr .rrmp label{display:flex;gap:6px;align-items:center;font-size:.9rem}.rdr.land{width:100vh;height:100vw;top:0;left:100vw;right:auto;bottom:auto;transform-origin:top left;transform:rotate(90deg)}';
 var root=el('div','rdr'),st=el('style');st.textContent=css;root.appendChild(st);
 var tb=el('div','rrtb'),vw=el('div','rrvw'),bt=el('div','rrbt2'),pg=el('div','rrpg'),img=new Image(),msg=el('div','rrmsg');img.draggable=false;pg.appendChild(img);vw.appendChild(pg);vw.appendChild(msg);
 tb.innerHTML='<button class="rrx">✕</button><div class="rrttl"></div><button class="rrfs" title="ملء الشاشة">⛶</button>';
 bt.innerHTML='<button class="rrpv">'+(rtl?'›':'‹')+'</button><input type="range" min="1" max="'+Math.max(1,N)+'" value="1"><button class="rrnx">'+(rtl?'‹':'›')+'</button><span class="rrpn"></span><button class="rrrot">🔄 أفقي</button><button class="rreye">👁 راحة العين</button><div class="rrmp"></div>';
 root.appendChild(tb);root.appendChild(vw);root.appendChild(bt);
 root.querySelector('.rrttl').textContent=cfg.title||'';
 var mp=bt.querySelector('.rrmp');
 mp.innerHTML=MODES.map(function(m){return'<button data-m="'+m.id+'">'+m.n+'</button>'}).join('')+'<label>الإضاءة <input type="range" class="rrbr" min="45" max="110" value="'+bright+'"></label><label>دفء اللون <input type="range" class="rrwm" min="0" max="60" value="'+Math.round(warm*100)+'"></label>';
 function M(){for(var i=0;i<MODES.length;i++)if(MODES[i].id===mode)return MODES[i];return MODES[0]}
 function paint(){var m=M();vw.style.background=m.bg;img.style.filter=(m.f?m.f+' ':'')+(warm>0?'sepia('+warm+') ':'')+'brightness('+(bright/100)+')';[].forEach.call(mp.querySelectorAll('button'),function(b){b.classList.toggle('on',b.dataset.m===mode)})}
 function url(i){return cfg.pageUrl(i+1)}
 var DIM=[1,1];function fit(){var W=vw.clientWidth,H=vw.clientHeight,iw=DIM[0],ih=DIM[1];var s=Math.min(W/iw,H/ih);img.style.width=iw*s+'px';img.style.height=ih*s+'px';pg.dataset.w=iw*s;pg.dataset.h=ih*s;zoom=1;px=(W-iw*s)/2;py=(H-ih*s)/2;apply()}
 function clampPan(){var W=vw.clientWidth,H=vw.clientHeight,w=(+pg.dataset.w||0)*zoom,h=(+pg.dataset.h||0)*zoom;px=w<=W?(W-w)/2:Math.max(W-w,Math.min(0,px));py=h<=H?(H-h)/2:Math.max(H-h,Math.min(0,py))}
 function apply(){clampPan();pg.style.transform='translate('+px+'px,'+py+'px) scale('+zoom+')'}
 function show(i){cur=Math.max(0,Math.min(N-1,i));LS.set('rd_'+cfg.key,cur);bt.querySelector('input').value=cur+1;bt.querySelector('.rrpn').textContent=(cur+1)+' / '+N;msg.style.display='none';img.style.opacity=.3;
  var im=new Image();im.onload=function(){DIM=[im.naturalWidth||1,im.naturalHeight||1];img.src=im.src;img.dataset.u=url(cur);img.style.opacity=1;fit();if(cur+1<N){var pr=new Image();pr.src=url(cur+1)}};im.onerror=function(){img.removeAttribute('src');msg.style.display='grid';msg.innerHTML='تعذّر تحميل هذه الصفحة.<br>الكتب تُفتح من النسخة المرفوعة على الإنترنت، تأكد من الاتصال.'};im.src=url(cur)}
 function next(){show(cur+(1))}function prev(){show(cur-1)}
 /* تحكّم باللمس */
 var ptrs={},sd=null,pinch=0,pz=1;
 function L(dx,dy){return land?[dy,-dx]:[dx,dy]}
 vw.addEventListener('pointerdown',function(e){ptrs[e.pointerId]={x:e.clientX,y:e.clientY};sd={x:e.clientX,y:e.clientY,px:px,py:py,t:Date.now(),moved:0};var k=Object.keys(ptrs);if(k.length===2){pinch=Math.hypot(ptrs[k[0]].x-ptrs[k[1]].rrx,ptrs[k[0]].y-ptrs[k[1]].y);pz=zoom}try{vw.setPointerCapture(e.pointerId)}catch(_){}});
 vw.addEventListener('pointermove',function(e){if(!ptrs[e.pointerId])return;ptrs[e.pointerId]={x:e.clientX,y:e.clientY};var k=Object.keys(ptrs);if(k.length>=2){var d=Math.hypot(ptrs[k[0]].x-ptrs[k[1]].rrx,ptrs[k[0]].y-ptrs[k[1]].y);if(pinch>0){zoom=Math.max(1,Math.min(5,pz*d/pinch));apply()}return}
  if(!sd)return;var d2=L(e.clientX-sd.rrx,e.clientY-sd.y);sd.moved=Math.max(sd.moved,Math.abs(d2[0])+Math.abs(d2[1]));if(zoom>1){px=sd.px+d2[0];py=sd.py+d2[1];apply()}});
 function up(e){delete ptrs[e.pointerId];if(Object.keys(ptrs).length<2)pinch=0;if(!sd)return;var d=L(e.clientX-sd.rrx,e.clientY-sd.y);
  if(sd.moved<8&&Date.now()-sd.t<350){var now=Date.now();if(now-(up.t||0)<320){zoom=zoom>1?1:2.4;if(zoom===1)fit();else{var r=vw.getBoundingClientRect();px=-(e.clientX-r.left)*(zoom-1)+(e.clientX-r.left);py=-(e.clientY-r.top)*(zoom-1)+(e.clientY-r.top);apply()}up.t=0}else{up.t=now;setTimeout(function(){if(up.t===now){ui=!ui;root.classList.toggle('hide',!ui);up.t=0}},330)}}
  else if(zoom<=1.02&&Math.abs(d[0])>60&&Math.abs(d[0])>Math.abs(d[1])*1.4){var fwd=rtl?d[0]>0:d[0]<0;fwd?next():prev()}sd=null}
 vw.addEventListener('pointerup',up);vw.addEventListener('pointercancel',function(e){delete ptrs[e.pointerId];sd=null});
 vw.addEventListener('wheel',function(e){e.preventDefault();var z=Math.max(1,Math.min(5,zoom*(e.deltaY>0?.9:1.1)));var r=vw.getBoundingClientRect(),cx=e.clientX-r.left,cy=e.clientY-r.top;px=cx-(cx-px)*z/zoom;py=cy-(cy-py)*z/zoom;zoom=z;apply()},{passive:false});
 function key(e){if(e.key==='Escape')close();else if(e.key==='ArrowRight')rtl?next():prev();else if(e.key==='ArrowLeft')rtl?prev():next()}
 document.addEventListener('keydown',key);
 bt.querySelector('.rrpv').onclick=prev;bt.querySelector('.rrnx').onclick=next;
 bt.querySelector('input').oninput=function(){show(+this.value-1)};
 bt.querySelector('.rreye').onclick=function(){mp.classList.toggle('show');this.classList.toggle('on');setTimeout(fit,60)};
 [].forEach.call(mp.querySelectorAll('button'),function(b){b.onclick=function(){mode=b.dataset.m;LS.set('rdMode',mode);paint()}});
 mp.querySelector('.rrbr').oninput=function(){bright=+this.value;LS.set('rdBr',bright);paint()};
 mp.querySelector('.rrwm').oninput=function(){warm=+this.value/100;LS.set('rdWm',this.value);paint()};
 /* أفقي: قفل الاتجاه إن أمكن، وإلا تدوير الواجهة */
 var rotBtn=bt.querySelector('.rrrot');
 function setLand(on){land=on;rotBtn.classList.toggle('on',on);rotBtn.textContent=on?'🔄 عمودي':'🔄 أفقي';
  var done=false;try{if(on){var p=(document.documentElement.requestFullscreen||function(){return Promise.reject()}).call(document.documentElement);if(p&&p.then)p.then(function(){return screen.orientation&&screen.orientation.lock?screen.orientation.lock('landscape'):Promise.reject()}).then(function(){land=false;root.classList.remove('land');setTimeout(fit,200)}).catch(function(){})}else{if(screen.orientation&&screen.orientation.unlock)screen.orientation.unlock();if(document.fullscreenElement)document.exitFullscreen()}}catch(e){}
  /* تدوير بالـCSS فقط إذا كان الجهاز عمودياً فعلاً */
  var portrait=window.innerHeight>window.innerWidth;root.classList.toggle('land',on&&portrait);if(on&&!portrait)land=false;setTimeout(fit,260)}
 rotBtn.onclick=function(){setLand(!(root.classList.contains('land')||rotBtn.classList.contains('on')))};
 tb.querySelector('.rrfs').onclick=function(){try{if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen()}catch(e){}};
 window.addEventListener('resize',rz);function rz(){if(root.classList.contains('land')&&window.innerWidth>window.innerHeight){root.classList.remove('land');land=false}setTimeout(fit,120)}
 function close(){document.removeEventListener('keydown',key);window.removeEventListener('resize',rz);try{if(document.fullscreenElement)document.exitFullscreen();if(screen.orientation&&screen.orientation.unlock)screen.orientation.unlock()}catch(e){}root.remove();if(cfg.onclose)cfg.onclose()}
 tb.querySelector('.rrx').onclick=close;
 document.body.appendChild(root);paint();show(cur);
 return{close:close}
}

/* فتح ملف مرفوع على Google Drive داخل التطبيق (يحتاج اتصالاً، والملف مشاركٌ لكل من لديه الرابط) */
function driveId(u){var m=String(u).match(/\/d\/([\w-]+)/)||String(u).match(/[?&]id=([\w-]+)/);return m?m[1]:''}
function openLink(cfg){
 var id=driveId(cfg.url),src=id?'https://drive.google.com/file/d/'+id+'/preview':cfg.url,mode=LS.get('rdMode','paper'),bright=+LS.get('rdBr',92),warm=+LS.get('rdWm',0),land=false;
 var css='.rdl{position:fixed;inset:0;z-index:90;background:#000;display:flex;flex-direction:column;font-family:inherit}.rdl .a,.rdl .b{display:flex;align-items:center;gap:8px;padding:8px 10px;background:rgba(0,0,0,.85);color:#fff;flex:none;flex-wrap:wrap}.rdl .a{padding-top:calc(8px + env(safe-area-inset-top,0px))}.rdl .b{padding-bottom:calc(8px + env(safe-area-inset-bottom,0px));justify-content:center}.rdl .t{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:800}.rdl button,.rdl a.o{font:inherit;border:0;border-radius:10px;background:rgba(255,255,255,.16);color:#fff;padding:7px 11px;cursor:pointer;min-height:38px;text-decoration:none;display:inline-flex;align-items:center}.rdl button.on{background:#fff;color:#111}.rdl .f{flex:1;position:relative;background:#e8dcc0}.rdl iframe{position:absolute;inset:0;width:100%;height:100%;border:0;background:#fff}.rdl .mp{display:none;gap:8px;flex-wrap:wrap;align-items:center;justify-content:center;width:100%}.rdl .mp.show{display:flex}.rdl .mp label{display:flex;gap:6px;align-items:center;font-size:.9rem}.rdl.land{width:100vh;height:100vw;top:0;left:100vw;right:auto;bottom:auto;transform-origin:top left;transform:rotate(90deg)}';
 var root=el('div','rdl');root.innerHTML='<style>'+css+'</style><div class="a"><button class="x">✕</button><div class="t"></div><a class="o" target="_blank" rel="noopener">فتح في Drive ↗</a></div><div class="f"><iframe allow="fullscreen" allowfullscreen></iframe></div><div class="b"><button class="rot">🔄 أفقي</button><button class="fs">⛶ ملء الشاشة</button><button class="eye">👁 راحة العين</button><div class="mp">'+MODES.map(function(m){return'<button data-m="'+m.id+'">'+m.n+'</button>'}).join('')+'<label>الإضاءة <input type="range" class="br" min="45" max="110" value="'+bright+'"></label><label>دفء اللون <input type="range" class="wm" min="0" max="60" value="'+Math.round(warm*100)+'"></label></div></div>';
 root.querySelector('.t').textContent=cfg.title||'';root.querySelector('.o').href=cfg.url;var fr=root.querySelector('iframe'),mp=root.querySelector('.mp'),box=root.querySelector('.f');fr.src=src;
 function paint(){var m=MODES.filter(function(x){return x.id===mode})[0]||MODES[0];box.style.background=m.bg;fr.style.filter=(m.f?m.f+' ':'')+(warm>0?'sepia('+warm+') ':'')+'brightness('+(bright/100)+')';[].forEach.call(mp.querySelectorAll('button'),function(b){b.classList.toggle('on',b.dataset.m===mode)})}
 [].forEach.call(mp.querySelectorAll('button'),function(b){b.onclick=function(){mode=b.dataset.m;LS.set('rdMode',mode);paint()}});
 mp.querySelector('.br').oninput=function(){bright=+this.value;LS.set('rdBr',bright);paint()};mp.querySelector('.wm').oninput=function(){warm=+this.value/100;LS.set('rdWm',this.value);paint()};
 root.querySelector('.eye').onclick=function(){mp.classList.toggle('show');this.classList.toggle('on')};
 var rot=root.querySelector('.rot');rot.onclick=function(){var on=!(root.classList.contains('land')||rot.classList.contains('on'));rot.classList.toggle('on',on);rot.textContent=on?'🔄 عمودي':'🔄 أفقي';
  try{if(on){var p=document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen();if(p&&p.then)p.then(function(){return screen.orientation&&screen.orientation.lock?screen.orientation.lock('landscape'):Promise.reject()}).then(function(){root.classList.remove('land')}).catch(function(){})}else{if(screen.orientation&&screen.orientation.unlock)screen.orientation.unlock();if(document.fullscreenElement)document.exitFullscreen()}}catch(e){}
  root.classList.toggle('land',on&&window.innerHeight>window.innerWidth)};
 root.querySelector('.fs').onclick=function(){try{if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen()}catch(e){}};
 function close(){try{if(document.fullscreenElement)document.exitFullscreen();if(screen.orientation&&screen.orientation.unlock)screen.orientation.unlock()}catch(e){}root.remove();if(cfg.onclose)cfg.onclose()}
 root.querySelector('.x').onclick=close;document.body.appendChild(root);paint();return{close:close}}
return{open:open,openLink:openLink,MODES:MODES}
})();
