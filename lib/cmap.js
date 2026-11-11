/* خريطة مفاهيم تفاعلية لختام كل درس (SVG + بطاقات) */
(function(){
var COL=['#1E88E5','#E53935','#43A047','#8E24AA','#F57C00','#00897B'];
var NS='http://www.w3.org/2000/svg';
function lang(){try{if(window.Voice&&Voice.getLang)return Voice.getLang()}catch(e){}return 'ar'}
function tx(o,l){return o?(o[l]||o.ar||''):''}
function wrap(s,n){var w=String(s).split(/\s+/),L=[],c='';w.forEach(function(x){if((c+' '+x).trim().length>n&&c){L.push(c);c=x}else c=(c+' '+x).trim()});if(c)L.push(c);return L.slice(0,3)}
function icon(name,x,y,sz,col){var b=window.ICONS&&ICONS.body?ICONS.body(name||'book'):'';if(!b)return'';var k=sz/24;return '<g transform="translate('+(x-sz/2)+' '+(y-sz/2)+') scale('+k+')" fill="none" stroke="'+col+'" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">'+b+'</g>'}
function esc(x){return String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function render(el,D){
  var l=lang(),rtl=l==='ar',n=D.branches.length,W=400,H=450,cx=200,cy=215,R=138,sel=-1;
  var css='.cm{font-family:inherit;color:var(--ink,var(--text));direction:'+(rtl?'rtl':'ltr')+'}.cm svg{width:100%;height:auto;display:block;max-height:68vh}.cm .ed{fill:none;stroke-width:3;stroke-linecap:round;stroke-dasharray:var(--len,220);stroke-dashoffset:var(--len,220);animation:cmd .9s ease forwards}.cm .nd{cursor:pointer;transform-box:fill-box;transform-origin:center;animation:cmp .5s cubic-bezier(.3,1.6,.5,1) both}.cm .nd:hover circle.bg{filter:brightness(1.1)}.cm .nd.on circle.bg{stroke:var(--ink,#000);stroke-width:3}.cm .lb{font-size:13.5px;font-weight:800;fill:var(--ink,#222);paint-order:stroke;stroke:var(--bg,#fff);stroke-width:4px;stroke-linejoin:round}.cm .ct{font-size:16px;font-weight:800;fill:#fff}@keyframes cmd{to{stroke-dashoffset:0}}@keyframes cmp{from{opacity:0;transform:scale(.2)}to{opacity:1;transform:scale(1)}}.cm .pn{background:var(--card,#fff);border:2px solid var(--bd,var(--line,#ccc));border-radius:16px;padding:12px 14px;margin:6px 0 10px;min-height:74px}.cm .pn h3{margin:0 0 6px;font-size:1.05rem}.cm .pn ul{margin:0;padding-inline-start:20px}.cm .pn li{margin:3px 0;line-height:1.7}.cm .fm{margin:8px 0 0;padding:10px 12px;border-radius:14px;text-align:center;font-weight:800;background:linear-gradient(135deg,#1565C0,#D32F2F,#2E7D32);color:#fff;direction:ltr}.cm .hint{text-align:center;color:var(--muted,#666);font-size:.92rem;margin:2px 0}@media (prefers-reduced-motion:reduce){.cm .ed{animation:none;stroke-dashoffset:0}.cm .nd{animation:none}}';
  var s='<style>'+css+'</style><div class="cm"><svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+esc(tx(D.center,l))+'">';
  var pts=[];
  for(var i=0;i<n;i++){var a=-Math.PI/2+i*2*Math.PI/n,x=cx+R*Math.cos(a),y=cy+R*Math.sin(a),c=COL[i%6];pts.push({x:x,y:y,a:a,c:c});
    var mx=cx+R*.5*Math.cos(a+.18),my=cy+R*.5*Math.sin(a+.18),len=Math.round(R*1.2);
    s+='<path class="ed" style="--len:'+len+';animation-delay:'+(.15*i)+'s" stroke="'+c+'" d="M'+cx+' '+cy+' Q'+mx.toFixed(1)+' '+my.toFixed(1)+' '+x.toFixed(1)+' '+y.toFixed(1)+'"/>'}
  s+='<g class="nd" style="animation-delay:.05s"><circle cx="'+cx+'" cy="'+cy+'" r="52" fill="#1565C0"/><circle cx="'+cx+'" cy="'+cy+'" r="52" fill="none" stroke="#D32F2F" stroke-width="3" stroke-dasharray="3 6"/>';
  var cl=wrap(tx(D.center,l),11),cs=cl.length;cl.forEach(function(t,k){s+='<text class="ct" x="'+cx+'" y="'+(cy+(k-(cs-1)/2)*18+5)+'" text-anchor="middle">'+esc(t)+'</text>'});s+='</g>';
  D.branches.forEach(function(b,i){var p=pts[i],top=p.y<cy-8,lines=wrap(tx(b.t,l),12),ly=top?p.y-36-(lines.length-1)*15:p.y+46;
    s+='<g class="nd" data-i="'+i+'" style="animation-delay:'+(.35+.12*i)+'s"><circle class="bg" cx="'+p.x.toFixed(1)+'" cy="'+p.y.toFixed(1)+'" r="30" fill="'+p.c+'"/>'+icon(b.icon,p.x,p.y,30,'#fff');
    lines.forEach(function(t,k){s+='<text class="lb" x="'+p.x.toFixed(1)+'" y="'+(ly+k*15).toFixed(1)+'" text-anchor="middle">'+esc(t)+'</text>'});s+='</g>'});
  s+='</svg><div class="hint">'+(rtl?'اضغط على أي فرع لتظهر نقاطه':'Tap any branch to see its points')+'</div><div class="pn" id="cmpn"></div>';
  if(D.formula&&tx(D.formula,l))s+='<div class="fm">'+esc(tx(D.formula,l))+'</div>';
  s+='</div>';el.innerHTML=s;
  var pn=el.querySelector('#cmpn');
  function show(i){sel=i;el.querySelectorAll('.nd[data-i]').forEach(function(g){g.classList.toggle('on',+g.dataset.i===i)});
    if(i<0){pn.innerHTML='<h3>'+esc(tx(D.center,l))+'</h3><ul>'+D.branches.map(function(b){return'<li>'+esc(tx(b.t,l))+'</li>'}).join('')+'</ul>';return}
    var b=D.branches[i];pn.style.borderColor=COL[i%6];pn.innerHTML='<h3 style="color:'+COL[i%6]+'">'+esc(tx(b.t,l))+'</h3><ul>'+b.pts.map(function(q){return'<li>'+esc(tx(q,l))+'</li>'}).join('')+'</ul>'}
  el.querySelectorAll('.nd[data-i]').forEach(function(g){g.onclick=function(){show(+g.dataset.i)}});
  show(-1);
  if(window.ICONS&&ICONS.svg){}
}
var cur=null,curEl=null;
function mount(el,D){cur=D;curEl=el;render(el,D);
  /* ربط الشرح الصوتي بنقاط الخريطة */
  try{if(window.Voice&&Voice.addTab){var f=function(k){return [tx(D.center,k)+'.'].concat(D.branches.map(function(b){return tx(b.t,k)+': '+b.pts.map(function(q){return tx(q,k)}).join('، ')+'.'}))};Voice.addTab('cmap',f('ar'),f('en'))}}catch(e){}
}
window.addEventListener('message',function(e){var d=e.data;if(d&&d.pcb==='lang'&&cur&&curEl&&curEl.isConnected){setTimeout(function(){render(curEl,cur)},30)}});
window.CMap={mount:mount,render:render};
})();
