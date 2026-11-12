/* الترجمة إلى الإنجليزية: تستبدل نصوص الصفحة بقاموس جاهز (window.EN_DICT) وتعكس الاتجاه، وتتابع كل ما يُضاف لاحقاً */
window.I18N=(function(){
var lang='ar',obs=null,SKIP={SCRIPT:1,STYLE:1,TEXTAREA:1,NOSCRIPT:1,CANVAS:1},ATTR=['placeholder','title','aria-label','alt'];
var EMO=/[\u{1F000}-\u{1FAFF}←-⇿⌀-⏿■-➿⬀-⯿️‍‏‎‪-‮]/gu,AR=/[؀-ۿ]/,ARX=/[؀-ۿ]/;
var fragRe=null,fragRe2=null,fragMap=null,fragN=-1;
function norm(s){return s.replace(EMO,'').replace(/\s+/g,' ').trim().replace(/^[#!\-]\s+/,'')}
function D(){return window.EN_DICT||{}}
function esc(k){return k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}
function buildFrag(){var d=D(),ks=Object.keys(d);if(ks.length===fragN&&fragRe!==null)return;fragN=ks.length;fragMap={};
 var list=ks.filter(function(k){return k.length>=2&&k.length<=90&&d[k]&&d[k]!==k}).sort(function(a,b){return b.length-a.length});
 list.forEach(function(k){fragMap[k]=d[k]});
 /* العبارات الطويلة بلا شرط حدود (تُلصق بكلمات أخرى أحياناً)، والقصيرة بحدود الكلمة */
 var lg=list.filter(function(k){return k.length>=6}).map(esc),sh=list.filter(function(k){return k.length<6}).map(esc);
 try{fragRe=lg.length?new RegExp(lg.join('|'),'g'):false}catch(e){fragRe=false}
 try{fragRe2=sh.length?new RegExp('(?<![\\u0600-\\u06FF])(?:'+sh.join('|')+')(?![\\u0600-\\u06FF])','g'):false}catch(e){fragRe2=false}}
function lead(s){var m=s.match(/^\s*/);return m?m[0]:''}function trail(s){var m=s.match(/\s*$/);return m?m[0]:''}
/* ترجمة نص واحد: تطابق تام ثم استبدال المقاطع */
var UNITS=[[/(\d[\d.,]*\s*)م\/ث²/g,'$1m/s²'],[/(\d[\d.,]*\s*)م\/ث(?![\u0600-\u06FF])/g,'$1m/s'],[/(\d[\d.,]*\s*)ث(?![\u0600-\u06FF])/g,'$1s'],[/(\d[\d.,]*\s*)م(?![\u0600-\u06FF])/g,'$1m'],[/(\d[\d.,]*\s*)ك(?![\u0600-\u06FF])/g,'$1kg'],[/(\d[\d.,]*\s*)ن(?![\u0600-\u06FF])/g,'$1 N'],[/([kcmμn])م(?![\u0600-\u06FF])/g,'$1m'],[/m\/ث/g,'m/s'],[/(\d[\d.,]*\s*)ج(?![\u0600-\u06FF])/g,'$1 J']];
function frag(s){buildFrag();var r=s;if(fragRe)r=r.replace(fragRe,function(m){return fragMap[m]||m});if(fragRe2)r=r.replace(fragRe2,function(m){return fragMap[m]||m});UNITS.forEach(function(u){r=r.replace(u[0],u[1])});return r}
function t(s){if(lang!=='en'||!s||!ARX.test(s))return s;var d=D(),n=norm(s);if(d[n])return lead(s)+d[n]+trail(s);
 /* ترقيم في البداية: «3. نص» أو «(2) نص» */
 var m=s.match(/^(\s*[\(]?[\d\u0660-\u0669]+[\.\):\-]\s*)([\s\S]+)$/);if(m){var n2=norm(m[2]);if(d[n2])return m[1]+d[n2]+trail(s)}
 /* بعد رقم أو ترقيم في نهاية الجملة */
 var m2=s.match(/^([\s\S]*?)(\s*[:：=]\s*)$/);if(m2){var n3=norm(m2[1]);if(d[n3+':']&&/[:：]/.test(m2[2]))return d[n3+':']+trail(s)}
 return frag(s)}
function doNode(n){if(n.nodeType===3){var p=n.parentNode;if(!p||SKIP[p.nodeName])return;var v=n.nodeValue;
   if(lang==='en'){if(n.__en===v)return;if(!ARX.test(v))return;var r=t(v);if(r!==v){n.__ar=v;n.__en=r;n.nodeValue=r}}
   else if(n.__ar!=null&&n.nodeValue===n.__en){n.nodeValue=n.__ar;n.__ar=null;n.__en=null}}
 else if(n.nodeType===1&&!SKIP[n.nodeName]){ATTR.forEach(function(a){var v=n.getAttribute&&n.getAttribute(a);if(v==null)return;
   if(lang==='en'&&ARX.test(v)){var r=t(v);if(r!==v){n['__a_'+a]=v;n.setAttribute(a,r)}}else if(lang!=='en'&&n['__a_'+a]!=null){n.setAttribute(a,n['__a_'+a]);n['__a_'+a]=null}})}}
function apply(root){root=root||document.body;if(!root)return;
 if(root.nodeType===3){doNode(root);return}
 doNode(root);var w=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT,null),n;
 while((n=w.nextNode())){if(n.nodeType===1&&SKIP[n.nodeName]){/* تجاهل */}doNode(n)}}
var pend=[],tm=0;
function flush(){tm=0;var q=pend;pend=[];var seen=new Set();q.forEach(function(n){if(seen.has(n)||!n.isConnected&&n.nodeType===1)return;seen.add(n);try{apply(n)}catch(e){}})}
function watch(){if(obs||!document.body)return;try{obs=new MutationObserver(function(ms){if(lang!=='en')return;ms.forEach(function(m){if(m.type==='characterData'){if(m.target.__en!==m.target.nodeValue)pend.push(m.target)}else if(m.type==='attributes'){pend.push(m.target)}else m.addedNodes.forEach(function(a){pend.push(a)})});flush()});
  obs.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:ATTR})}catch(e){}}
function setLang(l,opt){l=l==='en'?'en':'ar';var ch=l!==lang;lang=l;try{localStorage.setItem('pcbLang',l)}catch(e){}
 var r=document.documentElement;r.lang=l;r.dir=l==='en'?'ltr':'rtl';r.setAttribute('data-lang',l);
 if(document.body){watch();apply(document.body)}
 try{document.title=lang==='en'?(document.title.replace(/[؀-ۿ][؀-ۿ\s]*/g,function(m){return t(m)})):document.title}catch(e){}
 if(ch&&!(opt&&opt.silent))try{window.dispatchEvent(new CustomEvent('pcb-lang',{detail:l}))}catch(e){}}
function init(){var l=window.PCB_LANG;if(!l){try{l=localStorage.getItem('pcbLang')}catch(e){}}lang=l==='en'?'en':'ar';
 var r=document.documentElement;r.lang=lang;r.dir=lang==='en'?'ltr':'rtl';r.setAttribute('data-lang',lang);
 function go(){if(lang==='en'){watch();apply(document.body)}}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go()}
window.addEventListener('message',function(e){var d=e.data;if(d&&d.pcb==='lang')setLang(d.l)});
init();
return{t:t,apply:apply,setLang:setLang,lang:function(){return lang},isEn:function(){return lang==='en'}}
})();
