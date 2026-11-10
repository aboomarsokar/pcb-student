/* مكتبة المحاكاة ثنائية الأبعاد لدروس الفيزياء (لوحة رسم + سحب + حركة) */
window.P2D=(function(){
var cs=[];
function col(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim()||'#000'}
function isDark(){var d=document.documentElement.getAttribute('data-theme');return d==='dark'||(d!=='light'&&matchMedia('(prefers-color-scheme:dark)').matches)}
function canvas(box,o){o=o||{};var c=document.createElement('canvas');c.style.cssText='position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:'+(o.scroll?'pan-y':'none');box.insertBefore(c,box.firstChild);
  var g=c.getContext('2d'),v={c:c,g:g,w:0,h:0,dpr:1,box:box,dirty:true,draw:null,anim:null,down:null,move:null,up:null,hold:null};
  function rs(){v.dpr=Math.min(2,devicePixelRatio||1);v.w=box.clientWidth||300;v.h=box.clientHeight||260;c.width=Math.round(v.w*v.dpr);c.height=Math.round(v.h*v.dpr);v.dirty=true}
  new ResizeObserver(rs).observe(box);rs();
  function pt(e){var r=c.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}}
  c.addEventListener('pointerdown',function(e){try{c.setPointerCapture(e.pointerId)}catch(_){}v.holdP=pt(e);if(v.down)v.down(pt(e),e);v.dirty=true});
  c.addEventListener('pointermove',function(e){if(v.move)v.move(pt(e),e);v.dirty=true});
  c.addEventListener('pointerup',function(e){if(v.up)v.up(pt(e),e);v.holdP=null;v.dirty=true});
  c.addEventListener('pointercancel',function(e){if(v.up)v.up(pt(e),e);v.holdP=null;v.dirty=true});
  cs.push(v);return v}
function loop(t){cs.forEach(function(v){if(!v.box.offsetParent)return;var ch=v.dirty;if(v.anim&&v.anim(t,v))ch=true;if(ch){var g=v.g;g.setTransform(v.dpr,0,0,v.dpr,0,0);g.clearRect(0,0,v.w,v.h);if(v.draw)v.draw(g,v.w,v.h,t,v);v.dirty=false}});requestAnimationFrame(loop)}
requestAnimationFrame(loop);
window.addEventListener('message',function(e){if(e.data&&e.data.pcb==='theme')cs.forEach(function(v){v.dirty=true})});
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){cs.forEach(function(v){v.dirty=true})});
function redrawAll(){cs.forEach(function(v){v.dirty=true})}
var FONT='"PCB Naskh","Noto Naskh Arabic","Amiri",sans-serif';
function text(g,s,x,y,o){o=o||{};g.save();g.font=(o.weight||'700')+' '+(o.size||14)+'px '+FONT;g.fillStyle=o.color||col('--ink');g.textAlign=o.align||'center';g.textBaseline=o.base||'middle';g.direction=o.dir||'rtl';if(o.shadow){g.lineWidth=3;g.strokeStyle=o.shadow;g.strokeText(s,x,y)}g.fillText(s,x,y);g.restore()}
function arrow(g,x1,y1,x2,y2,color,w,head){w=w||3;head=head||10;var a=Math.atan2(y2-y1,x2-x1),L=Math.hypot(x2-x1,y2-y1);g.save();g.strokeStyle=color;g.fillStyle=color;g.lineWidth=w;g.lineCap='round';if(L<2){g.restore();return}
  var hx=x2-Math.cos(a)*head*.6,hy=y2-Math.sin(a)*head*.6;g.beginPath();g.moveTo(x1,y1);g.lineTo(hx,hy);g.stroke();g.beginPath();g.moveTo(x2,y2);g.lineTo(x2-Math.cos(a-.42)*head,y2-Math.sin(a-.42)*head);g.lineTo(x2-Math.cos(a+.42)*head,y2-Math.sin(a+.42)*head);g.closePath();g.fill();g.restore()}
function rrect(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.lineTo(x+w-r,y);g.quadraticCurveTo(x+w,y,x+w,y+r);g.lineTo(x+w,y+h-r);g.quadraticCurveTo(x+w,y+h,x+w-r,y+h);g.lineTo(x+r,y+h);g.quadraticCurveTo(x,y+h,x,y+h-r);g.lineTo(x,y+r);g.quadraticCurveTo(x,y,x+r,y);g.closePath()}
function grid(g,w,h,step,color){g.save();g.strokeStyle=color||col('--line');g.lineWidth=1;g.globalAlpha=.55;g.beginPath();for(var x=0;x<=w;x+=step){g.moveTo(x+.5,0);g.lineTo(x+.5,h)}for(var y=0;y<=h;y+=step){g.moveTo(0,y+.5);g.lineTo(w,y+.5)}g.stroke();g.restore()}
/* فرز بالسحب: عناصر تُسحب إلى سلال. كل عنصر محاولة واحدة ويُقفل */
function sorter(box,o){
  var v=canvas(box),bins=o.bins,cur=null,off=null,BC=['#1565C0','#D32F2F','#2E7D32','#EF6C00'];
  var items=o.items.map(function(it,i){return{t:it[0],bin:it[1],id:i,x:0,y:0,fx:null,fy:null,w:0,h:34}});
  function binH(){return Math.max(110,v.h*.42)}
  function layout(){var w=v.w,h=v.h,bh=binH(),cw=Math.max(70,Math.min(110,(w-16)/3-8)),cols=Math.max(2,Math.floor((w-8)/(cw+6))),bw=(w-16)/bins.length,cnt=bins.map(function(){return 0}),free=0;
    items.forEach(function(it,i){it.w=cw;var r=o.get(i);if(r){var b=r.bin,k=cnt[b]++,perRow=Math.max(1,Math.floor((bw-8)/(cw*.8))),col=k%perRow,row=Math.floor(k/perRow);it.tx=8+b*bw+6+col*(cw*.8);it.ty=h-bh-8+26+row*26;it.sc=.8}else{var c=free%cols,ro=Math.floor(free/cols);free++;it.tx=6+c*(cw+6);it.ty=6+ro*(it.h+8);it.sc=1}
      if(it!==cur){if(it.fx==null){it.fx=it.tx;it.fy=it.ty}}})}
  v.draw=function(g,w,h){layout();var bh=binH(),bw=(w-16)/bins.length;
    bins.forEach(function(b,i){var bx=8+i*bw+3,by=h-bh-8;g.fillStyle=BC[i%4]+'22';rrect(g,bx,by,bw-6,bh,14);g.fill();g.strokeStyle=BC[i%4];g.lineWidth=2;g.setLineDash([6,4]);g.stroke();g.setLineDash([]);text(g,b,bx+(bw-6)/2,by+13,{size:14,color:BC[i%4]})});
    items.forEach(function(it,i){var r=o.get(i),x,y;if(it===cur){x=it.x;y=it.y}else{it.fx+=(it.tx-it.fx)*.28;it.fy+=(it.ty-it.fy)*.28;x=it.fx;y=it.fy}
      var sc=it===cur?1.06:it.sc,iw=it.w*sc,ih=it.h*(sc>.9?1:.7);g.save();g.shadowColor='rgba(0,0,0,.25)';g.shadowBlur=it===cur?12:4;g.shadowOffsetY=2;g.fillStyle=r?(r.ok?col('--ok'):col('--bad')):col('--card');rrect(g,x,y,iw,ih,9);g.fill();g.restore();
      if(!r){g.lineWidth=1.5;g.strokeStyle=col('--accent');rrect(g,x,y,iw,ih,9);g.stroke()}
      text(g,it.t,x+iw/2,y+ih/2,{size:(it.t.length>13?10:12)*(sc>.9?1.04:.9),color:r?'#fff':col('--ink')})});
    if(v.tick)v.tick()};
  function hit(p){for(var i=items.length-1;i>=0;i--){var it=items[i];if(o.get(i))continue;if(p.x>=it.fx&&p.x<=it.fx+it.w&&p.y>=it.fy&&p.y<=it.fy+it.h)return it}return null}
  v.down=function(p){var it=hit(p);if(it){cur=it;off={x:p.x-it.fx,y:p.y-it.fy};it.x=it.fx;it.y=it.fy}};
  v.move=function(p){if(cur){cur.x=p.x-off.x;cur.y=p.y-off.y}};
  v.up=function(p){if(!cur)return;var it=cur;cur=null;it.fx=it.x;it.fy=it.y;var bh=binH(),by=v.h-bh-8;if(it.y+it.h/2>by-4){var b=Math.max(0,Math.min(bins.length-1,Math.floor((it.x+it.w/2-8)/((v.w-16)/bins.length))));o.save(it.id,{bin:b,ok:it.bin===b});if(o.onDone)o.onDone()}};
  v.items=items;return v}
return{canvas:canvas,col:col,text:text,arrow:arrow,rrect:rrect,grid:grid,sorter:sorter,isDark:isDark,redraw:redrawAll,FONT:FONT}
})();
