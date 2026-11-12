/* مكتبة مشتركة لدروس الكيمياء ثلاثية الأبعاد (تعتمد على three.js) */
window.C3D=(function(){
var T=window.THREE,VW=[],ANS={},ns='x',cbs=[];
var CSS='@font-face{font-family:"PCB Naskh";font-style:normal;font-weight:400 700;font-display:swap;src:url("fonts/naskh-arabic.woff2") format("woff2");unicode-range:U+0600-06FF,U+0750-077F,U+0870-0891,U+0897-08E1,U+08E3-08FF,U+200C-200E,U+2010-2011,U+204F,U+2E41,U+FB50-FDFF,U+FE70-FE74,U+FE76-FEFC}'+
'@font-face{font-family:"PCB Naskh";font-style:normal;font-weight:400 700;font-display:swap;src:url("fonts/naskh-latin.woff2") format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}'+
':root{--ink:#2A2016;--muted:#5C4B38;--bg:#EFE3CC;--card:#FBF5E8;--accent:#D32F2F;--accent-ink:#fff;--soft:#E6D3AE;--line:#C9B28C;--ok:#2E7D32;--bad:#D32F2F;--r:18px;--edge:rgba(0,0,0,.28);--sh:rgba(20,40,30,.22)}'+
'@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--ink:#F6EEE2;--muted:#E6D3B8;--bg:#5A4636;--card:#6A5442;--accent:var(--accD);--accent-ink:#0b1410;--soft:#7A624C;--line:#8A7058;--ok:#66BB6A;--bad:#EF5350;--edge:rgba(0,0,0,.5);--sh:rgba(0,0,0,.5)}}'+
':root[data-theme="dark"]{--ink:#F6EEE2;--muted:#E6D3B8;--bg:#5A4636;--card:#6A5442;--accent:var(--accD);--accent-ink:#0b1410;--soft:#7A624C;--line:#8A7058;--ok:#66BB6A;--bad:#EF5350;--edge:rgba(0,0,0,.5);--sh:rgba(0,0,0,.5)}'+
'*{box-sizing:border-box}html,body{margin:0;max-width:100%;overflow-x:hidden}'+
'body{background:var(--bg);color:var(--ink);font-family:"PCB Naskh","Noto Naskh Arabic","Amiri",system-ui,sans-serif;font-weight:600;font-size:17px;line-height:1.8;-webkit-tap-highlight-color:transparent}'+
'main{max-width:880px;margin:0 auto;padding:10px 12px 28px}@media (min-width:1000px){main{max-width:1100px}.stage3{height:420px}}h1{font-size:1.15rem;margin:0}b,h1,h2,h3,th{font-weight:800}sub{font-size:.72em;line-height:0}sup{font-size:.72em;line-height:0}'+
'button{font:inherit;cursor:pointer;color:var(--ink);border:1px solid var(--line);background:var(--card);border-radius:12px;padding:9px 14px;font-weight:700;box-shadow:0 4px 0 var(--edge),0 8px 14px -6px var(--sh);transition:transform .12s,box-shadow .12s,background .2s;touch-action:manipulation}'+
'button:hover{transform:translateY(-2px);box-shadow:0 6px 0 var(--edge),0 12px 18px -6px var(--sh)}button:active{transform:translateY(4px);box-shadow:0 0 0 var(--edge),0 2px 4px var(--sh)}'+
'button:disabled{transform:translateY(3px);box-shadow:0 1px 0 var(--edge);cursor:default;opacity:.75}button:focus-visible{outline:3px solid var(--accent);outline-offset:2px}'+
'.main,.tabs button[aria-selected="true"]{background:linear-gradient(180deg,color-mix(in srgb,var(--accent) 82%,#fff),var(--accent) 55%,color-mix(in srgb,var(--accent) 82%,#000));border-color:var(--accent);color:var(--accent-ink)}'+
'.hidden{display:none!important}.card{background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:16px;margin:0 0 14px;box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 6px 0 -1px var(--edge),0 16px 26px -12px var(--sh)}'+
'.card h2{margin:0 0 6px;font-size:1.2rem;color:var(--accent)}.card h3{margin:0 0 4px;font-size:1.02rem;color:var(--accent)}'+
'.tabs{display:flex;gap:8px;overflow-x:auto;padding:4px 2px 12px;margin:6px 0 2px}.tabs button{flex:none;white-space:nowrap}'+
'.hint{color:var(--muted);margin:2px 0 10px;font-size:.95rem}.pane{animation:rise .5s ease both}@keyframes rise{from{opacity:0;transform:perspective(900px) rotateX(-10deg) translateY(18px)}to{opacity:1;transform:none}}'+
'.stage3{position:relative;height:320px;touch-action:pan-y;cursor:grab;direction:ltr;border-radius:16px;background:radial-gradient(ellipse at 50% 85%,color-mix(in srgb,var(--accent) 16%,var(--card)) 0,var(--card) 72%);border:1px solid var(--line);overflow:hidden;user-select:none;-webkit-user-select:none}'+
'.stage3 canvas{position:absolute;inset:0;width:100%;height:100%;display:block}.lbl{position:absolute;left:8px;bottom:8px;direction:rtl;background:color-mix(in srgb,var(--card) 92%,transparent);border:1px solid var(--line);border-radius:10px;padding:2px 10px;font-size:.85rem;color:var(--muted)}'+
'.chips{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}.chips button{padding:5px 12px;font-size:.92rem;border-radius:999px;box-shadow:0 3px 0 var(--edge)}.chips button.on{background:var(--accent);color:var(--accent-ink);border-color:var(--accent)}'+
'.fb{margin-top:8px;padding:8px 12px;border-radius:12px;background:var(--soft)}.toast{display:inline-block;padding:4px 12px;border-radius:12px;font-weight:800}'+
'.toast.ok{background:color-mix(in srgb,var(--ok) 20%,var(--card));color:var(--ok)}.toast.bad{background:color-mix(in srgb,var(--bad) 18%,var(--card));color:var(--bad)}'+
'.steps{display:grid;gap:8px;counter-reset:s}.steps div{counter-increment:s;background:var(--soft);border-radius:12px;padding:8px 12px}.steps div:before{content:counter(s);display:inline-flex;width:26px;height:26px;border-radius:50%;background:var(--accent);color:var(--accent-ink);align-items:center;justify-content:center;font-weight:800;margin-inline-end:8px}'+
'.sel{width:100%;padding:9px 12px;border-radius:12px;border:1.5px solid var(--line);background:var(--card);color:var(--ink);font:inherit;font-weight:700}'+
'.row{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:8px 0}.row label{font-weight:800}.row input[type=range]{flex:1;min-width:140px;accent-color:var(--accent)}.val{font-weight:800;color:var(--accent);min-width:90px;text-align:center;unicode-bidi:plaintext}'+
'.warn{background:rgba(255,183,3,.16);border:1px dashed #b7791f;border-radius:12px;padding:6px 12px;font-size:.93rem;margin:6px 0}'+
'.opts{display:grid;gap:8px;margin:10px 0}.opts button{text-align:start}.opts button.ok{background:color-mix(in srgb,var(--ok) 20%,var(--card));border-color:var(--ok)}.opts button.bad{background:color-mix(in srgb,var(--bad) 18%,var(--card));border-color:var(--bad)}'+
'.score{text-align:center;font-weight:800;font-size:1.1rem;color:var(--accent);margin:6px 0}.info h2{margin-bottom:2px}.info .en{direction:ltr;text-align:right;color:var(--muted);font-size:.9rem}.info p{margin:6px 0 0}.tag{display:inline-block;background:var(--soft);border-radius:999px;padding:1px 12px;font-size:.85rem;margin-inline-end:6px}'+
'.leg{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0;justify-content:center}.leg span{direction:rtl;background:var(--soft);border-radius:10px;padding:2px 10px;font-size:.88rem}'+
'.big{font-size:1.25rem;font-weight:800;color:var(--accent);text-align:center;margin:6px 0}.ltr{direction:ltr;unicode-bidi:isolate}'+
'@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}';
function $(id){return document.getElementById(id)}
function mk(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e}
function fm(s){return String(s).replace(/(\d+)/g,'<sub>$1</sub>')}
function tick(){try{var AC=window.AC||(window.AC=new(window.AudioContext||window.webkitAudioContext)());var t=AC.currentTime,o=AC.createOscillator(),g=AC.createGain();o.type='square';o.frequency.setValueAtTime(1500,t);o.frequency.exponentialRampToValueAtTime(700,t+.06);g.gain.setValueAtTime(.04,t);g.gain.exponentialRampToValueAtTime(.001,t+.06);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+.07)}catch(e){}}
function init(o){
  ns=o.ns;var st=mk('style','',CSS);document.head.appendChild(st);
  document.head.appendChild(mk('style','',':root{--accent:'+o.accent+';--accD:'+(o.accentDark||o.accent)+'}'));
  try{Object.assign(ANS,JSON.parse(localStorage.getItem('c3d_'+ns)||'{}'))}catch(e){}
  window.addEventListener('message',function(e){var m=e.data;if(!m)return;if(m.pcb==='answers'){Object.assign(ANS,m.m||{});cbs.forEach(function(f){f()})}else if(m.pcb==='theme'){document.documentElement.setAttribute('data-theme',m.t==='dark'?'dark':'light');VW.forEach(function(v){v.dirty=true})}});
  try{parent.postMessage({pcb:'ready'},'*')}catch(e){}
  document.addEventListener('click',function(e){if(e.target.closest('button'))tick()},true);
  requestAnimationFrame(loop);
}
function save(k,v){k=ns+':'+k;ANS[k]=v;try{localStorage.setItem('c3d_'+ns,JSON.stringify(ANS))}catch(e){}try{parent.postMessage({pcb:'ans',k:k,v:v},'*')}catch(e){}}
function get(k){return ANS[ns+':'+k]}
function onRefresh(f){cbs.push(f)}
function tabs(defs,onshow){var box=$('tabs');var cmd=document.getElementById('cmapdata');if(cmd&&window.CMap){try{var CD=JSON.parse(cmd.textContent),sec=document.createElement('section');sec.id='cmap';sec.className='pane hidden';(document.querySelector('main')||document.body).appendChild(sec);defs=defs.concat([{id:'cmap',l:'🗺️ مخطط الدرس'}]);var _os=onshow,dn=false;onshow=function(id){if(id==='cmap'&&!dn){dn=true;CMap.mount(sec,CD)}if(_os)_os(id)}}catch(e){}}defs.forEach(function(d,i){var b=mk('button','',d.l);b.setAttribute('role','tab');b.setAttribute('aria-selected',String(i===0));b.onclick=function(){box.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-selected',String(x===b))});defs.forEach(function(q){var s=$(q.id);s.classList.toggle('hidden',q.id!==d.id);if(q.id===d.id){s.classList.remove('pane');void s.offsetWidth;s.classList.add('pane')}});VW.forEach(function(v){v.dirty=true});if(window.Voice)Voice.tab(d.id);if(onshow)onshow(d.id);window.scrollTo({top:0,behavior:'smooth'})};box.appendChild(b)});
  var nt=document.getElementById('narr');if(nt&&window.Voice){try{Voice.attach(JSON.parse(nt.textContent))}catch(e){}}if(window.Voice&&defs[0])Voice.tab(defs[0].id)}
/* ---- العارض ثلاثي الأبعاد ---- */
function viewer(box,cfg){
  if(!T)return null;cfg=cfg||{};
  try{
    var test=document.createElement('canvas');if(!(test.getContext('webgl2')||test.getContext('webgl')))return null;
    var scene=new T.Scene(),cam=new T.PerspectiveCamera(30,1,.3,500);
    var key=new T.DirectionalLight(0xffffff,2.2);key.position.set(10,24,18);key.castShadow=true;key.shadow.mapSize.set(512,512);var sc=key.shadow.camera;sc.left=-30;sc.right=30;sc.top=30;sc.bottom=-30;sc.near=5;sc.far=120;key.shadow.bias=-.0008;scene.add(key);
    scene.add(new T.HemisphereLight(0xeaf3ff,0x778080,.6));
    if(cfg.floor!==false){var fl=new T.Mesh(new T.PlaneGeometry(300,300),new T.ShadowMaterial({opacity:.25}));fl.rotation.x=-Math.PI/2;fl.position.y=cfg.floorY||0;fl.receiveShadow=true;scene.add(fl)}
    var v={R:null,scene:scene,cam:cam,box:box,dirty:true,yaw:cfg.yaw||0,pitch:cfg.pitch==null?14:cfg.pitch,r:cfg.r||40,ty:cfg.ty||0,tx:cfg.tx||0,maxYaw:cfg.maxYaw==null?180:cfg.maxYaw,drag:null,moved:0,pick:[],onframe:null,onpick:null,auto:cfg.auto||0,autoT:0,pinch:0,ptrs:{}};
    /* إنشاء المُصيِّر عند أول ظهور فقط لتخفيف التحميل */
    v.init=function(){if(v.R||v.failed)return;
      try{var cv=document.createElement('canvas');box.insertBefore(cv,box.firstChild);
        var R=new T.WebGLRenderer({canvas:cv,antialias:true,alpha:true,powerPreference:'high-performance'});if(!R.getContext()){v.failed=1;return}
        R.outputColorSpace=T.SRGBColorSpace;R.toneMapping=T.ACESFilmicToneMapping;R.toneMappingExposure=1.05;R.shadowMap.enabled=true;R.shadowMap.type=T.PCFShadowMap;R.setClearColor(0,0);
        var es=new T.Scene();es.add(new T.Mesh(new T.BoxGeometry(40,40,40),new T.MeshBasicMaterial({color:new T.Color(.5,.53,.55),side:T.BackSide})));
        function pn(x,y,z,w,h,rx,ry,I){var m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({color:new T.Color(I,I,I),side:T.DoubleSide}));m.position.set(x,y,z);m.rotation.set(rx,ry,0);es.add(m)}
        pn(0,19,0,18,18,Math.PI/2,0,10);pn(-19,4,6,10,18,0,Math.PI/2,6);pn(19,2,-4,8,14,0,-Math.PI/2,3.5);pn(0,2,-19,22,12,0,0,2.2);
        var pm=new T.PMREMGenerator(R);scene.environment=pm.fromScene(es,.03).texture;pm.dispose();
        v.R=R;
        function resize(){var w=box.clientWidth||300,h=box.clientHeight||260;R.setPixelRatio(Math.min(1.5,devicePixelRatio||1));R.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();v.dirty=true}
        new ResizeObserver(resize).observe(box);resize();
      }catch(e){v.failed=1}};
    var rc=new T.Raycaster(),mv=new T.Vector2();
    v.pickAt=function(cx,cy){var b=box.getBoundingClientRect();mv.set((cx-b.left)/b.width*2-1,-((cy-b.top)/b.height)*2+1);rc.setFromCamera(mv,cam);var h=rc.intersectObjects(v.pick,true)[0];if(!h)return null;var o=h.object;while(o&&o.userData.part==null)o=o.parent;return o?{part:o.userData.part,obj:o}:null};
    box.style.touchAction='none';
    box.addEventListener('pointerdown',function(e){v.ptrs[e.pointerId]={x:e.clientX,y:e.clientY};v.drag={x:e.clientX,y:e.clientY,a:v.yaw,p:v.pitch,tx:v.tx,tz:v.tz||0};v.moved=0;v.auto=0;var ks=Object.keys(v.ptrs);if(ks.length===2){var A=v.ptrs[ks[0]],B=v.ptrs[ks[1]];v.pinch=Math.hypot(A.x-B.x,A.y-B.y);v.moved=99}try{box.setPointerCapture(e.pointerId)}catch(_){}});
    box.addEventListener('pointermove',function(e){if(v.ptrs[e.pointerId])v.ptrs[e.pointerId]={x:e.clientX,y:e.clientY};var ks=Object.keys(v.ptrs);if(ks.length>=2){var A=v.ptrs[ks[0]],B=v.ptrs[ks[1]],d=Math.hypot(A.x-B.x,A.y-B.y);if(v.pinch>0&&d>0){v.r=Math.max(cfg.rmin||8,Math.min(cfg.rmax||120,v.r*v.pinch/d));v.dirty=true}v.pinch=d;return}
      if(!v.drag)return;var dx=e.clientX-v.drag.x,dy=e.clientY-v.drag.y;v.moved=Math.max(v.moved,Math.abs(dx)+Math.abs(dy));if(v.panMode){var k=v.r*.0021,ya=v.yaw*Math.PI/180;v.tx=v.drag.tx-dx*k*Math.cos(ya)+dy*k*Math.sin(ya)*Math.sin(v.pitch*Math.PI/180);v.tz=v.drag.tz-dx*k*(-Math.sin(ya))-dy*k*Math.cos(ya)*Math.sin(v.pitch*Math.PI/180);v.dirty=true;return}v.yaw=Math.max(-v.maxYaw,Math.min(v.maxYaw,v.drag.a+dx*.4));v.pitch=Math.max(-20,Math.min(75,v.drag.p+dy*.25));v.dirty=true});
    function up(e){delete v.ptrs[e.pointerId];if(Object.keys(v.ptrs).length<2)v.pinch=0;var was=v.drag&&v.moved<6;v.drag=null;if(was&&e.type==='pointerup'&&v.onpick){var h=v.pickAt(e.clientX,e.clientY);v.onpick(h?h.part:null,h?h.obj:null)}}
    box.addEventListener('pointerup',up);box.addEventListener('pointercancel',up);
    box.addEventListener('wheel',function(e){e.preventDefault();v.r=Math.max(cfg.rmin||8,Math.min(cfg.rmax||120,v.r*(e.deltaY>0?1.08:.92)));v.dirty=true},{passive:false});
    v.tz=cfg.tz||0;v.render=function(){if(!v.R)return;var a=v.yaw*Math.PI/180,p=v.pitch*Math.PI/180;cam.position.set(v.tx+v.r*Math.cos(p)*Math.sin(a),v.ty+v.r*Math.sin(p),v.tz+v.r*Math.cos(p)*Math.cos(a));cam.lookAt(v.tx,v.ty,v.tz);v.R.render(scene,cam)};
    VW.push(v);return v;
  }catch(e){return null}
}
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
var lastF=0;
function loop(t){requestAnimationFrame(loop);if(document.hidden)return;VW.forEach(function(v){if(!v.box.offsetParent)return;if(!v.R){v.init();if(!v.R)return}
  var ch=v.dirty;if(v.auto&&!reduce&&!v.drag){v.autoT=(v.autoT||0)+1;if(v.autoT<420){v.yaw+=v.auto;ch=true}else v.auto=0}
  if(v.onframe&&v.onframe(t))ch=true;if(ch){v.render();v.dirty=false}})}
/* ---- مواد وأشكال ---- */
function std(c,r,m){return new T.MeshStandardMaterial({color:c,roughness:r==null?.4:r,metalness:m==null?0:m})}
function phys(c,r,m){return new T.MeshPhysicalMaterial({color:c,roughness:r==null?.3:r,metalness:m==null?0:m,clearcoat:.8,clearcoatRoughness:.15})}
function glass(c,op){return new T.MeshPhysicalMaterial({color:c||0xbfe3ff,roughness:.05,metalness:0,transparent:true,opacity:op==null?.3:op,clearcoat:1,side:T.DoubleSide,depthWrite:false})}
function lathe(pts,seg){return new T.LatheGeometry(pts.map(function(p){return new T.Vector2(p[0],p[1])}),seg||48)}
function mesh(g,m,x,y,z,cast){var o=new T.Mesh(g,m);o.position.set(x||0,y||0,z||0);if(cast!==false)o.castShadow=true;o.receiveShadow=true;return o}
function label(text,o){o=o||{};var w=o.w||256,h=o.h||96,c=document.createElement('canvas');c.width=w*2;c.height=h*2;var g=c.getContext('2d');g.scale(2,2);
  if(o.bg){g.fillStyle=o.bg;var r=14;g.beginPath();g.moveTo(r,0);g.lineTo(w-r,0);g.quadraticCurveTo(w,0,w,r);g.lineTo(w,h-r);g.quadraticCurveTo(w,h,w-r,h);g.lineTo(r,h);g.quadraticCurveTo(0,h,0,h-r);g.lineTo(0,r);g.quadraticCurveTo(0,0,r,0);g.fill()}
  g.fillStyle=o.color||'#fff';g.font=(o.weight||'800')+' '+(o.size||40)+'px "PCB Naskh","Noto Naskh Arabic",Arial,sans-serif';g.textAlign='center';g.textBaseline='middle';var lines=String(text).split('\n');lines.forEach(function(l,i){g.fillText(l,w/2,h/2+(i-(lines.length-1)/2)*(o.size||40)*1.15)});
  var tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;tx.anisotropy=4;return tx}
function plane(text,w,h,o){o=o||{};var tx=label(text,{w:o.pw||256,h:o.ph||96,size:o.size,color:o.color,bg:o.bg,weight:o.weight}),m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({map:tx,transparent:true,depthWrite:false}));m.userData.noPick=1;return m}
/* ---- الذرات والجزيئات ---- */
var EL={H:{c:0xf2f4f5,r:.6,m:1},He:{c:0xd9e8ff,r:.6,m:4},C:{c:0x33363a,r:.92,m:12},N:{c:0x3f6fe0,r:.88,m:14},O:{c:0xe53935,r:.86,m:16},Mg:{c:0x7cb342,r:1.15,m:24},Al:{c:0xb0bec5,r:1.1,m:27},Fe:{c:0xa8582a,r:1.15,m:56},Ca:{c:0xe0e0e0,r:1.2,m:40},Si:{c:0x7b8794,r:1.1,m:28},Cl:{c:0x66bb6a,r:1,m:35.5},Na:{c:0xab5cf2,r:1.15,m:23},K:{c:0x8f40d4,r:1.25,m:39},Pb:{c:0x57606f,r:1.2,m:207},I:{c:0x940094,r:1.15,m:127},S:{c:0xffd54f,r:.95,m:32},Br:{c:0xa62929,r:1.05,m:80}};
var sg={},mc={},bondGeo=null;
function sph(el){return sg[el]||(sg[el]=new T.SphereGeometry(EL[el].r,28,20))}
function matEl(el){return mc[el]||(mc[el]=new T.MeshPhysicalMaterial({color:EL[el].c,roughness:.28,metalness:/^(Fe|Al|Mg|Si|Ca)$/.test(el)?.5:0,clearcoat:.8,clearcoatRoughness:.15}))}
function atom(el,x,y,z,sc){var m=new T.Mesh(sph(el),matEl(el));m.position.set(x,y,z);if(sc)m.scale.setScalar(sc);m.castShadow=true;return m}
function bond(A,B,r,mat){bondGeo=bondGeo||new T.CylinderGeometry(1,1,1,12);var d=A.distanceTo(B),b=new T.Mesh(bondGeo,mat||std(0xb9c0c4,.3,.6));b.scale.set(r||.16,d,r||.16);b.position.copy(A).add(B).multiplyScalar(.5);b.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),B.clone().sub(A).normalize());b.castShadow=true;return b}
function build(atoms,bonds,sc){var g=new T.Group();atoms.forEach(function(a){g.add(atom(a[0],a[1],a[2],a[3]))});
  var pairs=bonds||[];if(!bonds){for(var i=0;i<atoms.length;i++)for(var j=i+1;j<atoms.length;j++){var A=new T.Vector3(atoms[i][1],atoms[i][2],atoms[i][3]),B=new T.Vector3(atoms[j][1],atoms[j][2],atoms[j][3]);if(A.distanceTo(B)<(EL[atoms[i][0]].r+EL[atoms[j][0]].r)*1.18&&!(atoms[i][0]===atoms[j][0]&&/^(Fe|Al|Mg|Ca)$/.test(atoms[i][0])))pairs.push([i,j])}}
  pairs.forEach(function(p){var a=atoms[p[0]],b=atoms[p[1]];g.add(bond(new T.Vector3(a[1],a[2],a[3]),new T.Vector3(b[1],b[2],b[3])))});if(sc)g.scale.setScalar(sc);return g}
var MOL={H2:[['H',-.62,0,0],['H',.62,0,0]],O2:[['O',-.7,0,0],['O',.7,0,0]],N2:[['N',-.62,0,0],['N',.62,0,0]],H2O:[['O',0,0,0],['H',-.95,-.62,0],['H',.95,-.62,0]],NH3:[['N',0,.3,0],['H',.98,-.25,0],['H',-.5,-.25,.85],['H',-.5,-.25,-.85]],CH4:[['C',0,0,0],['H',.62,.62,.62],['H',.62,-.62,-.62],['H',-.62,.62,-.62],['H',-.62,-.62,.62]],CO2:[['C',0,0,0],['O',-1.3,0,0],['O',1.3,0,0]],NO:[['N',-.62,0,0],['O',.7,0,0]],CaO:[['Ca',-.9,0,0],['O',.9,0,0]]};
function mol(n,sc){return build(MOL[n],null,sc)}
function dispose(v){var i=VW.indexOf(v);if(i>=0)VW.splice(i,1);try{if(v&&v.R){v.R.dispose();v.R.forceContextLoss()}}catch(e){}}
return {dispose:dispose,init:init,save:save,get:get,onRefresh:onRefresh,tabs:tabs,viewer:viewer,std:std,phys:phys,glass:glass,lathe:lathe,mesh:mesh,label:label,plane:plane,atom:atom,bond:bond,build:build,mol:mol,MOL:MOL,EL:EL,$:$,mk:mk,fm:fm,T:T,VW:VW,
 quiz:function(boxId,scoreId,key,list){var box=$(boxId),sc=$(scoreId);function score(){var s=0,a=0;list.forEach(function(q,i){var r=get(key+i);if(r){a++;if(r.k===q.a)s++}});sc.textContent=a===list.length?'نتيجتك: '+s+' من '+list.length+' 🔒':''}
  function draw(){box.innerHTML='';list.forEach(function(q,qi){var card=mk('div','card');card.style.marginTop='10px';card.innerHTML='<h3>'+(qi+1)+'. '+q.q+'</h3>';var o=mk('div','opts'),fb=mk('div','fb hidden');
    function lock(k){o.querySelectorAll('button').forEach(function(x,j){x.disabled=true;if(j===q.a)x.classList.add('ok');else if(j===k)x.classList.add('bad')});fb.innerHTML=(k===q.a?'<b style="color:var(--ok)">✔ إجابة صحيحة!</b> ':'<b style="color:var(--bad)">✘ إجابة غير صحيحة.</b> ')+q.e+'<br>🔒 لا يمكن إعادة هذا السؤال.';fb.classList.remove('hidden')}
    q.o.forEach(function(t,k){var b=mk('button','',t);b.onclick=function(){if(get(key+qi))return;save(key+qi,{k:k});lock(k);score()};o.appendChild(b)});
    if(get(key+qi))lock(get(key+qi).k);card.appendChild(o);card.appendChild(fb);box.appendChild(card)});score()}
  draw();onRefresh(draw)}
};
})();
