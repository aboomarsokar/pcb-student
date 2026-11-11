/* خلفية التطبيق: نقش رموز علمية + اختيار اللون (15 فاتح / 15 غامق) */
(function(){
var LIGHT=[['بيج','#EFE3CC'],['كريمي','#F7EFD9'],['رملي','#E8D5B0'],['خوخي','#F6D5BE'],['وردي','#F3D3D8'],['أرجواني فاتح','#DCCFF2'],['سماوي','#CFE4F5'],['نعناعي','#CDEBDD'],['مريمية','#D5E1C3'],['ليموني','#F4F0B8'],['تركوازي فاتح','#C6EAEA'],['مشمشي','#F8DDB0'],['رمادي دافئ','#E4E1DC'],['وردي بنفسجي','#E9D5EC'],['زيتوني فاتح','#D9E2A0']];
var DARK=[['سكني داكن','#5A4636'],['إسبريسو','#3A2A20'],['كحلي','#1F2F4D'],['غابة','#1F3D2B'],['زيتوني','#34470E'],['برقوقي','#442A55'],['فيروزي داكن','#1B4B4F'],['أردوازي','#2F3B4A'],['فحمي','#2B2B2E'],['عنّابي','#532030'],['نيلي','#2E2B5E'],['صنوبري','#1E3B35'],['صدئ','#5A3020'],['فولاذي','#36495A'],['منتصف الليل','#141C33']];
var il=0,id=0;
try{il=+localStorage.getItem('pcbBgL')||0;id=+localStorage.getItem('pcbBgD')||0}catch(e){}
function rgb(h){h=h.replace('#','');return[parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]}
function hex(a){return'#'+a.map(function(x){x=Math.max(0,Math.min(255,Math.round(x)));return(x<16?'0':'')+x.toString(16)}).join('')}
function mix(a,b,t){var A=rgb(a),B=rgb(b);return hex([A[0]+(B[0]-A[0])*t,A[1]+(B[1]-A[1])*t,A[2]+(B[2]-A[2])*t])}
function isDark(){var d=document.documentElement.getAttribute('data-theme');return d==='dark'||(d!=='light'&&window.matchMedia&&matchMedia('(prefers-color-scheme:dark)').matches)}
/* نقش الرموز العلمية (يُرسم بلون واحد شفّاف) */
function pattern(c,op){
 var s='<svg xmlns="http://www.w3.org/2000/svg" width="360" height="360" viewBox="0 0 360 360" fill="none" stroke="'+c+'" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" opacity="'+op+'" font-family="Georgia,serif" font-size="20" fill-opacity="0">'+
 /* DNA */'<g transform="translate(30 20)"><path d="M0 0c40 20 40 40 0 60s-40 40 0 60 40 40 0 60"/><path d="M40 0c-40 20-40 40 0 60s40 40 0 60-40 40 0 60"/><path d="M8 14h24M10 44h20M8 76h24M10 104h20M8 136h24"/></g>'+
 /* ذرة */'<g transform="translate(250 70)"><ellipse rx="34" ry="12"/><ellipse rx="34" ry="12" transform="rotate(60)"/><ellipse rx="34" ry="12" transform="rotate(120)"/><circle r="4" fill="'+c+'"/></g>'+
 /* خلية */'<g transform="translate(150 60)"><path d="M0 0c24-10 50 0 52 22s-20 42-46 36S-18 12 0 0z"/><circle cx="26" cy="26" r="9"/><circle cx="42" cy="10" r="3"/></g>'+
 /* ميتوكوندريا */'<g transform="translate(40 190)"><ellipse cx="34" cy="20" rx="34" ry="20"/><path d="M10 20q6-12 12 0t12 0 12 0 12 0"/></g>'+
 /* دورق */'<g transform="translate(150 175)"><path d="M10 0h28M16 0v22L2 52a4 4 0 0 0 4 6h36a4 4 0 0 0 4-6L32 22V0"/><path d="M8 40h32"/></g>'+
 /* سداسي بنزين */'<g transform="translate(262 190)"><path d="M0 -26l22 13v26l-22 13-22-13v-26z"/><circle r="10"/></g>'+
 /* مجال مغناطيسي */'<g transform="translate(30 300)"><ellipse cx="30" cy="0" rx="14" ry="34"/><ellipse cx="30" cy="0" rx="26" ry="34"/><path d="M30 -34v68"/></g>'+
 /* خلية عصبية */'<g transform="translate(160 285)"><circle r="8"/><path d="M8 0q20 -14 38 -4M-6 6q-10 20 -26 26M0 -8q-4 -22 10 -34M6 6q14 12 36 14"/></g>'+
 /* نصوص */'<g fill="'+c+'" fill-opacity="1" stroke="none"><text x="120" y="30">E=mc²</text><text x="230" y="140" font-size="22">H₂O</text><text x="20" y="165" font-size="18">F=ma</text><text x="230" y="290" font-size="18">C₆H₁₂O₆</text><text x="290" y="340" font-size="17">CO₂</text><text x="105" y="345" font-size="16">ATP</text><text x="300" y="30" font-size="22">λ</text><text x="95" y="150" font-size="20">ΔE</text><text x="330" y="150" font-size="18">ħ</text></g>'+
 '</svg>';
 return 'url("data:image/svg+xml,'+encodeURIComponent(s)+'")'}
function apply(){
 var r=document.documentElement,dk=isDark(),bg=dk?DARK[id%15][1]:LIGHT[il%15][1],s=r.style;
 var tx=dk?'#F6EEE2':'#2A2016',card=dk?mix(bg,'#ffffff',.10):mix(bg,'#ffffff',.66),bd=dk?mix(bg,'#ffffff',.28):mix(bg,'#000000',.2),soft=dk?mix(bg,'#ffffff',.16):mix(bg,'#ffffff',.42),muted=dk?mix(tx,bg,.28):'#5C4B38',pri=dk?'#F0D9A8':'#5A3E1A';
 var v={'--bg':bg,'--card':card,'--text':tx,'--ink':tx,'--muted':muted,'--bd':bd,'--line':bd,'--soft':soft,'--pri':pri,'--c1b':soft,'--pat':pattern(dk?'#FFF4E0':'#3A2A14',dk?.12:.14)};
 for(var k in v)s.setProperty(k,v[k]);
 if(!document.getElementById('bgst')){var st=document.createElement('style');st.id='bgst';st.textContent='html{background-color:var(--bg)}html body{background-color:var(--bg)!important;background-image:var(--pat)!important;background-size:300px 300px!important;background-attachment:scroll!important}';(document.head||r).appendChild(st)}
}
function set(l,d){if(l!=null)il=+l||0;if(d!=null)id=+d||0;try{localStorage.setItem('pcbBgL',il);localStorage.setItem('pcbBgD',id)}catch(e){}apply()}
window.Bg={LIGHT:LIGHT,DARK:DARK,get:function(){return{l:il,d:id}},set:set,apply:apply,isDark:isDark};
apply();
try{new MutationObserver(apply).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']})}catch(e){}
try{matchMedia('(prefers-color-scheme:dark)').addEventListener('change',apply)}catch(e){}
window.addEventListener('message',function(e){var d=e.data;if(d&&d.pcb==='bg'){il=+d.l||0;id=+d.d||0;apply()}});
})();
