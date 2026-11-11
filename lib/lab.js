/* مختبر كيمياء واقعي: موقد بنزن، مقياس حرارة، مواد تُضاف بيدك، ودلائل التفاعل تظهر كما في المختبر */
window.Lab=(function(){
var T=window.THREE,C=window.C3D;
/* ---------- المواد ---------- */
/* ph: s صلب، l ماء، aq محلول، sus معلّق، ppt راسب، g غاز | M الكتلة المولية | st مقدار الإضافة (مول) | wm ماء مرافق (مول) */
var SP={
 H2O:{n:'ماء',f:'H₂O',ph:'l',M:18.02,st:.5,col:'#cfe8ff'},
 CaCO3:{n:'حجر جيري',f:'CaCO₃',ph:'s',M:100.09,st:.03,col:'#b9b09c',vm:37},
 CaO:{n:'جير حيّ',f:'CaO',ph:'s',M:56.08,st:.03,col:'#f4f1ea',vm:17},
 CaOH2_aq:{n:'ماء الجير الرائق',f:'Ca(OH)₂',ph:'aq',M:74.09,st:.01,wm:.3,col:null},
 CaOH2_s:{n:'جير مطفأ (معلّق)',f:'Ca(OH)₂',ph:'sus',M:74.09,col:'#f3f1ec'},
 CaCO3_p:{n:'راسب كربونات الكالسيوم',f:'CaCO₃',ph:'ppt',M:100.09,col:'#f6f6f2'},
 CO2:{n:'ثاني أكسيد الكربون',f:'CO₂',ph:'g',M:44.01,st:.02},
 HCl:{n:'حمض HCl مخفف',f:'HCl',ph:'aq',M:36.46,st:.02,wm:.25,col:null},
 CaCl2:{n:'كلوريد الكالسيوم',f:'CaCl₂',ph:'aq',M:110.98,col:null},
 Mg:{n:'شريط مغنيسيوم',f:'Mg',ph:'s',M:24.31,st:.02,col:'#c9ced3',vm:14},
 MgO:{n:'أكسيد المغنيسيوم',f:'MgO',ph:'s',M:40.3,col:'#fafafa',vm:11},
 MgCl2:{n:'كلوريد المغنيسيوم',f:'MgCl₂',ph:'aq',M:95.2,col:null},
 O2:{n:'أكسجين الهواء',f:'O₂',ph:'g',M:32},
 H2:{n:'هيدروجين',f:'H₂',ph:'g',M:2.016},
 Zn:{n:'خارصين (زنك)',f:'Zn',ph:'s',M:65.38,st:.02,col:'#9aa3ab',vm:9},
 ZnCl2:{n:'كلوريد الخارصين',f:'ZnCl₂',ph:'aq',M:136.3,col:null},
 Fe:{n:'مسمار حديد',f:'Fe',ph:'s',M:55.85,st:.02,col:'#6d7378',vm:7},
 Cu:{n:'نحاس (راسب أحمر)',f:'Cu',ph:'s',M:63.55,col:'#b4582b',vm:7},
 CuSO4:{n:'محلول كبريتات النحاس',f:'CuSO₄',ph:'aq',M:159.6,st:.02,wm:.25,col:'#1E88E5'},
 FeSO4:{n:'كبريتات الحديد II',f:'FeSO₄',ph:'aq',M:151.9,col:'#9CCC8F'},
 KI:{n:'يوديد البوتاسيوم',f:'KI',ph:'aq',M:166,st:.02,wm:.25,col:null},
 PbNO32:{n:'نترات الرصاص II',f:'Pb(NO₃)₂',ph:'aq',M:331.2,st:.01,wm:.25,col:null},
 PbI2:{n:'يوديد الرصاص (راسب أصفر)',f:'PbI₂',ph:'ppt',M:461,col:'#F2B300'},
 KNO3:{n:'نترات البوتاسيوم',f:'KNO₃',ph:'aq',M:101.1,col:null},
 NaOH_aq:{n:'محلول هيدروكسيد الصوديوم',f:'NaOH',ph:'aq',M:40,st:.02,wm:.25,col:null},
 NaOH_s:{n:'هيدروكسيد الصوديوم (صلب)',f:'NaOH',ph:'s',M:40,st:.02,col:'#f2f2f2',vm:19},
 NaCl:{n:'كلوريد الصوديوم',f:'NaCl',ph:'aq',M:58.44,col:null},
 Na2CO3:{n:'كربونات الصوديوم',f:'Na₂CO₃',ph:'aq',M:105.99,st:.02,wm:.25,col:null},
 NH4NO3:{n:'نترات الأمونيوم (صلب)',f:'NH₄NO₃',ph:'s',M:80.04,st:.03,col:'#f7f7f7',vm:46},
 NH4NO3_aq:{n:'محلول نترات الأمونيوم',f:'NH₄NO₃',ph:'aq',M:80.04,col:null},
 UI:{n:'كاشف عام',f:'',ph:'ind',M:0,st:1}
};
/* ---------- التفاعلات: r متفاعلات، p نواتج، dH كيلوجول/مول (+ ماص، - طارد)، minT، k، air = يستهلك أكسجين الهواء ---------- */
var RX=[
 {id:'decomp',r:{CaCO3:1},p:{CaO:1,CO2:1},dH:178,minT:850,k:.004,tf:40,eq:'CaCO₃ → CaO + CO₂',type:'تحلل حراري',gas:'CO2'},
 {id:'slake',r:{CaO:1,H2O:1},p:{CaOH2_s:1},dH:-65,minT:0,k:.35,eq:'CaO + H₂O → Ca(OH)₂',type:'اتحاد (إطفاء الجير) طارد للحرارة'},
 {id:'cao_hcl',r:{CaO:1,HCl:2},p:{CaCl2:1,H2O:1},dH:-190,minT:0,k:.2,eq:'CaO + 2HCl → CaCl₂ + H₂O',type:'تعادل طارد للحرارة'},
 {id:'carb1',r:{CaOH2_aq:1,CO2:1},p:{CaCO3_p:1,H2O:1},dH:-113,minT:0,k:.9,eq:'Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O',type:'ترسيب (كشف CO₂)',ppt:1},
 {id:'carb2',r:{CaOH2_s:1,CO2:1},p:{CaCO3_p:1,H2O:1},dH:-113,minT:0,k:.25,eq:'Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O',type:'ترسيب (كشف CO₂)',ppt:1},
 {id:'caco3_hcl',r:{CaCO3:1,HCl:2},p:{CaCl2:1,H2O:1,CO2:1},dH:-15,minT:0,k:.05,eq:'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑',type:'حمض + كربونات',gas:'CO2'},
 {id:'mg_hcl',r:{Mg:1,HCl:2},p:{MgCl2:1,H2:1},dH:-467,minT:0,k:.09,eq:'Mg + 2HCl → MgCl₂ + H₂↑',type:'إحلال',gas:'H2'},
 {id:'zn_hcl',r:{Zn:1,HCl:2},p:{ZnCl2:1,H2:1},dH:-153,minT:0,k:.03,eq:'Zn + 2HCl → ZnCl₂ + H₂↑',type:'إحلال',gas:'H2'},
 {id:'mg_o2',r:{Mg:2},p:{MgO:2},dH:-1204,minT:620,k:.05,tf:30,air:{O2:1},eq:'2Mg + O₂ → 2MgO',type:'احتراق (اتحاد مع الأكسجين)',light:1,open:1},
 {id:'fe_cu',r:{Fe:1,CuSO4:1},p:{FeSO4:1,Cu:1},dH:-153,minT:0,k:.04,eq:'Fe + CuSO₄ → FeSO₄ + Cu',type:'إحلال'},
 {id:'ki_pb',r:{KI:2,PbNO32:1},p:{PbI2:1,KNO3:2},dH:-5,minT:0,k:1.2,eq:'2KI + Pb(NO₃)₂ → PbI₂↓ + 2KNO₃',type:'ترسيب (تبادل مزدوج)',ppt:1},
 {id:'naoh_hcl',r:{NaOH_aq:1,HCl:1},p:{NaCl:1,H2O:1},dH:-57.6,minT:0,k:1.5,eq:'NaOH + HCl → NaCl + H₂O',type:'تعادل طارد للحرارة'},
 {id:'na2co3_hcl',r:{Na2CO3:1,HCl:2},p:{NaCl:2,H2O:1,CO2:1},dH:-20,minT:0,k:.6,eq:'Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂↑',type:'حمض + كربونات',gas:'CO2'},
 {id:'nh4no3',r:{NH4NO3:1,H2O:1},p:{NH4NO3_aq:1},dH:25.7,minT:0,k:.25,eq:'NH₄NO₃(s) → NH₄NO₃(aq)',type:'ذوبان ماصّ للحرارة'},
 {id:'naoh_s',r:{NaOH_s:1,H2O:1},p:{NaOH_aq:1},dH:-44.5,minT:0,k:.3,eq:'NaOH(s) → NaOH(aq)',type:'ذوبان طارد للحرارة'}
];
var VESSEL={
 tube:{n:'أنبوب اختبار',cap:20,cv:14,r:.9,h:7.2,leak:.35,open:1},
 beaker:{n:'كأس زجاجية',cap:100,cv:60,r:1.9,h:4.2,leak:1.2,open:1},
 crucible:{n:'بوتقة',cap:15,cv:40,r:1.5,h:1.7,leak:2.6,open:1}
};
function sup(s){return s}
function hex(h){return new T.Color(h)}
function clamp(x,a,b){return x<a?a:x>b?b:x}
function lerpC(a,b,t){return a.clone().lerp(b,t)}
/* ---------- نموذج المحاكاة ---------- */
function newState(vessel){return{n:{},T:25,vessel:vessel||'tube',burner:false,Tset:300,ind:false,t:0,log:[],signs:{},eqs:{},tube2:{ca:.01,ppt:0},conn:false,done:{},rate:{},gasRate:0,pptStart:0,lightT:0,hot0:null,leaked:{},speed:1}}
function mass(S){var m=0;for(var k in S.n){var sp=SP[k];if(sp&&sp.M)m+=S.n[k]*sp.M}return m}
function waterMl(S){return(S.n.H2O||0)*18.02}
function cp(S){var m=0,w=waterMl(S);for(var k in S.n){var sp=SP[k];if(!sp||sp.ph==='g'||k==='H2O')continue;if(sp.ph==='aq'||sp.ph==='sus'||sp.ph==='ppt')m+=S.n[k]*sp.M*.5;else m+=S.n[k]*sp.M*.9}return 4.18*w+m+VESSEL[S.vessel].cv}
function ph(S){var V=Math.max(.002,waterMl(S)/1000),H=S.n.HCl||0,OH=(S.n.NaOH_aq||0)+(S.n.NaOH_s||0)*0+Math.min(2*((S.n.CaOH2_aq||0)+(S.n.CaOH2_s||0)),.04*V*2)+.1*(S.n.Na2CO3||0);var A=(H-OH)/V;if(Math.abs(A)<1e-7)return 7;return A>0?clamp(-Math.log10(A),0,7):clamp(14+Math.log10(-A),7,14)}
function phCol(p){return p<3?'#E53935':p<5?'#F57C00':p<6.3?'#FBC02D':p<7.8?'#43A047':p<9.5?'#1E88E5':p<11.5?'#5E35B1':'#8E24AA'}
function solCol(S){var V=Math.max(.003,waterMl(S)/1000),c=hex('#d9efff'),op=.32,w=0;
 for(var k in S.n){var sp=SP[k];if(!sp||!sp.col||(sp.ph!=='aq'&&sp.ph!=='ppt'&&sp.ph!=='sus'))continue;var amt=S.n[k];if(amt<1e-4)continue;
  if(sp.ph==='aq'){var cc=clamp(amt/V/.4,0,1);c=lerpC(c,hex(sp.col),cc*.85);op+=cc*.3}else{var tt=clamp(amt/.012,0,1);c=lerpC(c,hex(sp.col),tt*.9);op+=tt*.45}}
 if(S.ind&&V>.0015){var pc=hex(phCol(ph(S)));c=lerpC(c,pc,.75);op=Math.max(op,.7)}
 return{c:c,op:clamp(op,.5,.92)}}
function add(S,id){var sp=SP[id];if(!sp)return;if(sp.ph==='ind'){S.ind=true;S.log.push('أضفتَ الكاشف العام: يتلوّن المحلول بحسب الحموضة.');return}
 var vo=VESSEL[S.vessel],cur=waterMl(S);if(sp.ph==='l'||sp.ph==='aq'){if(cur+sp.st*0+ (sp.wm||sp.st)*18.02>vo.cap*1.05){S.log.push('الوعاء ممتلئ. لا يتّسع لأكثر من ذلك.');return}}
 if(sp.ph==='g'){S.n[id]=(S.n[id]||0)+sp.st;S.log.push('أضفتَ '+sp.n+'.');return}
 S.n[id]=(S.n[id]||0)+sp.st;if(sp.wm)S.n.H2O=(S.n.H2O||0)+sp.wm;S.log.push('أضفتَ '+sp.n+' ('+sp.f+').')}
function step(S,dt){
 var vo=VESSEL[S.vessel],T0=S.T,Q=0,gasMade=0,evt={};
 /* تسخين */
 var c=cp(S);if(S.burner){var d=S.Tset-S.T;if(d>0)S.T+=Math.min(d,clamp(6*d/c*60/ (60),0,40)*dt)}
 S.T+=-.28*(S.T-25)/c*dt;
 /* التفاعلات */
 var rate=0,Tbefore=S.T;
 RX.forEach(function(R){
  if(R.open&&!vo.open)return;
  var lim=1e9,k;for(k in R.r){lim=Math.min(lim,(S.n[k]||0)/R.r[k])}
  if(R.air){for(k in R.air){}}
  if(lim<1e-5)return;
  if(R.minT&&S.T<R.minT)return;
  var f=R.minT?clamp((S.T-R.minT)/(R.tf||40)+.25,0,2.6):1;
  var xi=Math.min(lim,R.k*f*dt*(R.gas||R.ppt?1:1));if(xi<=1e-9)return;
  for(k in R.r)S.n[k]-=R.r[k]*xi;
  for(k in R.p)S.n[k]=(S.n[k]||0)+R.p[k]*xi;
  if(R.air)for(k in R.air){S.n.O2_used=(S.n.O2_used||0)+R.air[k]*xi;S.n.O2abs=(S.n.O2abs||0)+R.air[k]*xi}
  Q+=-R.dH*xi;
  S.rate[R.id]=(S.rate[R.id]||0)*.9+xi/dt*.1;evt[R.id]=xi;
  if(!S.eqs[R.id]){S.eqs[R.id]={eq:R.eq,type:R.type};S.log.push('حدث تفاعل: '+R.eq)}
  if(R.gas){gasMade+=xi*(R.p[R.gas]||1);S.signs.gas={t:'تصاعد غاز',d:'فقاعات تصعد من المزيج. غاز '+SP[R.gas].n+'.'+(R.gas==='CO2'?' اختبره بماء الجير أو بعود الثقاب.':' اختبره بعود الثقاب المشتعل.')}}
  if(R.ppt)S.signs.ppt={t:'تكوّن راسب',d:'ظهر راسب '+(R.id==='ki_pb'?'أصفر':'أبيض')+' لم يكن موجوداً.'}
  if(R.light){S.signs.light={t:'ضوء ساطع',d:'اللهب أبيض مبهر وينتج رماداً أبيض.'};S.lightT=.4}
 });
 /* انحلال الغازات والفقد */
 var gk;for(gk in {CO2:1,H2:1}){if(S.n[gk]){
   if(S.conn&&gk==='CO2'&&S.vessel==='tube'){var tr=Math.min(S.n[gk],S.n[gk]*2.2*dt+gasMade*.0);S.n[gk]-=tr;
     var cb=Math.min(S.tube2.ca,tr*.97);S.tube2.ca-=cb;S.tube2.ppt+=cb;S.tube2.bub=1.2;
     if(cb>0&&!S.eqs.tube2){S.eqs.tube2={eq:'Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O',type:'ماء الجير يتعكّر عند مرور CO₂'};S.log.push('ماء الجير تعكّر: الغاز هو CO₂.');S.signs.ppt={t:'تكوّن راسب',d:'ماء الجير صار عكراً (أبيض حليبي) عند مرور الغاز: دليل على CO₂.'}}
     S.leaked.CO2_to_tube2=(S.leaked.CO2_to_tube2||0)+tr}
   else{var lk=S.n[gk]*vo.leak*dt;S.n[gk]-=lk;S.leaked[gk]=(S.leaked[gk]||0)+lk}
   if(S.n[gk]<1e-6)S.n[gk]=0}}
 S.tube2.bub=Math.max(0,(S.tube2.bub||0)-dt*1.5);
 /* أثر الحرارة */
 c=cp(S);S.T+=(Q*1000)/c;
 /* غليان وتبخّر */
 var w=S.n.H2O||0;if(w>.003&&S.T>100){var E=(S.T-100)*c,ev=Math.min(w,E/40650);S.n.H2O=w-ev;S.T=100+(E-ev*40650)/c;S.steam=1;S.signs.steam={t:'بخار ماء',d:'الماء يغلي ويتصاعد بخاره (درجة الغليان 100°م).'};if(S.n.H2O<.003)S.n.H2O=0}else S.steam=Math.max(0,(S.steam||0)-dt);
 /* دلائل أخرى */
 var dTr=Q*1000/c;S.qAcc=(S.qAcc||0)*.97+dTr;
 if(S.qAcc>4){S.signs.heat={t:'ارتفاع الحرارة',d:'ارتفعت درجة حرارة المزيج دون تسخين: التفاعل طارد للحرارة.'}}
 if(S.qAcc<-3){S.signs.heat={t:'انخفاض الحرارة',d:'انخفضت درجة الحرارة وصار الوعاء بارداً: التفاعل ماص للحرارة.'}}
 if(S.T>550&&!S.signs.glow){S.signs.glow={t:'توهّج',d:'المادة الساخنة تتوهّج بالأحمر.'}}
 S.lightT=Math.max(0,S.lightT-dt);S.gasRate=gasMade/dt;S.t+=dt;
 /* تغيّر اللون */
 var sc=solCol(S);if(S.col0==null)S.col0=sc.c.clone();else if(!S.signs.color&&waterMl(S)>2&&Math.abs(S.col0.r-sc.c.r)+Math.abs(S.col0.g-sc.c.g)+Math.abs(S.col0.b-sc.c.b)>.3&&Object.keys(S.eqs).length){S.signs.color={t:'تغيّر اللون',d:'تغيّر لون المحلول عمّا كان عليه.'}}
 /* مادة صلبة جديدة */
 if((S.n.Cu||0)>.003&&!S.signs.solid)S.signs.solid={t:'ظهور مادة جديدة',d:'ظهرت مادة صلبة حمراء مائلة للبني (نحاس) على الحديد.'};
 if((S.n.MgO||0)>.003&&!S.signs.solid)S.signs.solid={t:'ظهور مادة جديدة',d:'تكوّن مسحوق أبيض (أكسيد المغنيسيوم).'};
 if((S.n.CaO||0)>.003&&(S.eqs.decomp)&&!S.signs.solid)S.signs.solid={t:'ظهور مادة جديدة',d:'الحجر الجيري صار مسحوقاً أبيض هو الجير الحيّ CaO، ونقصت كتلته لأن CO₂ تصاعد.'};
}
function snap(S){return{T:S.T,mass:mass(S)+(S.n.O2abs||0)*0}}
/* ---------- الواجهة ---------- */
function mount(root,cfg){
 C=window.C3D;T=window.THREE;cfg=cfg||{};var subs=cfg.subs||Object.keys(SP).filter(function(k){return SP[k].st}),vessels=cfg.vessels||['tube','beaker','crucible'];
 var S=newState(cfg.vessel||vessels[0]);var css='.lab .sh{display:grid;grid-template-columns:repeat(auto-fill,minmax(128px,1fr));gap:8px;margin:8px 0}.lab .sb{display:flex;align-items:center;gap:8px;text-align:start;padding:8px 10px;border-radius:14px;line-height:1.35}.lab .sb i{flex:none;width:20px;height:20px;border-radius:50%;border:2px solid rgba(0,0,0,.35)}.lab .sb small{display:block;font-weight:600;opacity:.8;direction:ltr;text-align:start}.lab .ro{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0}.lab .rd{flex:1;min-width:92px;text-align:center;border-radius:14px;padding:6px 8px;background:var(--card);border:1.5px solid var(--bd,var(--line))}.lab .rd b{display:block;font-size:1.35rem;font-variant-numeric:tabular-nums;direction:ltr}.lab .rd span{font-size:.82rem;opacity:.8}.lab .rd.hot b{color:#E53935}.lab .ev{display:grid;gap:6px;margin:8px 0}.lab .ev div{display:flex;gap:8px;align-items:flex-start;padding:8px 10px;border-radius:12px;background:var(--soft);opacity:.55;line-height:1.5}.lab .ev div.on{opacity:1;background:color-mix(in srgb,var(--ok) 20%,var(--card));border:1.5px solid var(--ok)}.lab .eqs div{direction:ltr;text-align:center;font-weight:800;padding:6px;margin:4px 0;border-radius:10px;background:var(--soft)}.lab .eqs small{display:block;direction:rtl;font-weight:600;opacity:.85}.lab .lg{max-height:120px;overflow:auto;font-size:.92rem;line-height:1.7;opacity:.92}.lab .ms div{padding:6px 10px;margin:4px 0;border-radius:10px;background:var(--soft)}.lab .ms div.ok{background:color-mix(in srgb,var(--ok) 25%,var(--card));font-weight:800}.lab input[type=range]{width:100%}.lab .bt{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0}.lab .bt button.on{outline:3px solid var(--accent)}';
 root.innerHTML='<style>'+css+'</style><div class="lab"><p class="hint" id="lbHint"></p><div class="stage3" id="lbSt" style="height:340px"></div><div class="ro"><div class="rd" id="lbT"><b>25°</b><span>مقياس الحرارة (°م)</span></div><div class="rd" id="lbM"><b>0.00</b><span>كتلة المواد (غم)</span></div><div class="rd" id="lbP" hidden><b>7.0</b><span>pH</span></div></div>'+
  '<div class="card"><h3>١) اختر الوعاء</h3><div class="bt" id="lbV"></div><h3>٢) أضف المواد بيدك</h3><div class="sh" id="lbS"></div><div class="bt"><button id="lbClr">🧽 نظّف الوعاء وابدأ من جديد</button></div></div>'+
  '<div class="card"><h3>٣) الموقد ودرجة الحرارة</h3><div class="bt"><button id="lbB">🔥 أشعل الموقد</button><button id="lbSp">⏩ تسريع الزمن ×1</button></div><label>درجة الحرارة المطلوبة: <b id="lbTv">300</b>°م</label><input type="range" id="lbTs" min="25" max="1100" step="5" value="300"><p class="hint" style="margin:4px 0 0">المقياس يرتفع تدريجياً كما في المختبر، فاصبر حتى يصل. بعض التفاعلات لا تبدأ إلا عند حرارة عالية.</p></div>'+
  '<div class="card"><h3>٤) اختبارات الكشف</h3><div class="bt"><button id="lbWire">🔗 صِل أنبوب ماء الجير</button><button id="lbSplint">🕯️ عود ثقاب مشتعل</button></div><div class="lg" id="lbTest"></div></div>'+
  '<div class="card"><h3>🔎 دلائل حدوث التفاعل</h3><div class="ev" id="lbEv"></div><div class="eqs" id="lbEq"></div><b>سجلّ التجربة</b><div class="lg" id="lbLog"></div></div>'+(cfg.missions&&cfg.missions.length?'<div class="card"><h3>🎯 مهام التجربة</h3><div class="ms" id="lbMs"></div></div>':'')+'</div>';
 var $=function(id){return root.querySelector('#'+id)};
 $('lbHint').textContent=cfg.hint||'أضف المواد إلى الوعاء، سخّن إن لزم، وراقب دلائل التفاعل بنفسك.';
 var SIGNS=[['gas','تصاعد غاز'],['ppt','تكوّن راسب'],['color','تغيّر اللون'],['heat','تغيّر درجة الحرارة'],['light','ضوء أو توهّج'],['solid','ظهور مادة جديدة'],['steam','بخار']];
 /* أزرار */
 var vb=$('lbV');vessels.forEach(function(v){var b=document.createElement('button');b.textContent=VESSEL[v].n;b.onclick=function(){S=newState(v);S.Tset=+$('lbTs').value;S.speed=curSpeed;kick=60;buildVessel();syncUI();selV()};b.dataset.v=v;vb.appendChild(b)});
 function selV(){[].forEach.call(vb.children,function(b){b.classList.toggle('on',b.dataset.v===S.vessel)})}
 var sh=$('lbS');subs.forEach(function(id){var sp=SP[id];var b=document.createElement('button');b.className='sb';b.innerHTML='<i style="background:'+(sp.col||(sp.ph==='g'?'#e0e0e0':'#d9efff'))+'"></i><span>'+sp.n+'<small>'+sp.f+'</small></span>';b.onclick=function(){add(S,id);kick=60;buildVessel(true);syncUI()};sh.appendChild(b)});
 var curSpeed=1;
 $('lbClr').onclick=function(){var v=S.vessel,t=+$('lbTs').value;S=newState(v);S.Tset=t;S.speed=curSpeed;kick=60;buildVessel();syncUI()};
 $('lbB').onclick=function(){S.burner=!S.burner;kick=60;syncUI()};
 $('lbSp').onclick=function(){curSpeed=curSpeed===1?3:curSpeed===3?6:1;S.speed=curSpeed;this.textContent='⏩ تسريع الزمن ×'+curSpeed};
 $('lbTs').oninput=function(){S.Tset=+this.value;$('lbTv').textContent=this.value};
 $('lbWire').onclick=function(){if(S.vessel!=='tube'){$('lbTest').textContent='صِل ماء الجير مع أنبوب الاختبار فقط.';return}S.conn=!S.conn;syncUI();buildVessel(true)};
 $('lbSplint').onclick=function(){var s='',t=$('lbTest');if((S.n.H2||0)>5e-4)s='فرقعة خفيفة: الغاز هو الهيدروجين H₂.';else if((S.n.CO2||0)>5e-4)s='انطفأ العود: الغاز ثاني أكسيد الكربون CO₂ (لا يساعد على الاشتعال).';else s='لا يوجد غاز كافٍ في فوهة الوعاء الآن. شغّل التفاعل ثم قرّب العود بسرعة.';t.textContent=s;S.log.push('اختبار العود المشتعل: '+s);syncUI()};
 /* ---------- المشهد ---------- */
 var v=C.viewer($('lbSt'),{yaw:-10,pitch:31,r:29,ty:7.2,tx:1.5,floor:false,rmin:12,rmax:55,maxYaw:70});
 var G={},tubeG=null,vesselG=null,partG=null;
 function buildScene(){if(!v)return;var sc=v.scene;
  var tb=C.mesh(new T.BoxGeometry(46,1.2,18),C.std(0x8d6e50,.7),0,-.6,0);tb.receiveShadow=true;sc.add(tb);
  var top=C.mesh(new T.BoxGeometry(46,.12,18),C.std(0xd9d2c4,.35),0,.06,0);top.receiveShadow=true;sc.add(top);
  /* موقد بنزن */
  var bg=new T.Group();bg.add(C.mesh(new T.CylinderGeometry(2,2.4,.7,32),C.std(0x2c3338,.3,.8),0,.35,0,true));bg.add(C.mesh(new T.CylinderGeometry(.55,.65,5.2,24),C.std(0xb9c0c6,.25,.9),0,3.2,0,true));bg.add(C.mesh(new T.CylinderGeometry(.75,.75,.9,24),C.std(0x8f979d,.3,.8),0,1.5,0,true));
  var fl=new T.Group();var fo=new T.Mesh(new T.ConeGeometry(.9,3.8,20,1,true),new T.MeshBasicMaterial({color:0x4db3ff,transparent:true,opacity:.75,side:T.DoubleSide,depthWrite:false}));fo.position.y=1.7;var fi=new T.Mesh(new T.ConeGeometry(.38,2,16,1,true),new T.MeshBasicMaterial({color:0x1a5bd6,transparent:true,opacity:.85,side:T.DoubleSide,depthWrite:false}));fi.position.y=1;fl.add(fo);fl.add(fi);fl.position.y=5.8;fl.visible=false;bg.add(fl);G.flame=fl;G.fo=fo;G.fi=fi;
  var fL=new T.PointLight(0xff9d4a,0,26);fL.position.set(0,7,0);bg.add(fL);G.fL=fL;
  bg.position.set(0,0,0);sc.add(bg);
  /* ماء الجير (أنبوب ٢) */
  tubeG=new T.Group();tubeG.position.set(9,0,0);var gl=C.glass(0xcfe6ff,.28);var tg=new T.Mesh(C.lathe([[0,0],[.9,0],[.9,.1],[.9,7.2],[1.05,7.35]],20),gl);tg.position.y=.2;tubeG.add(tg);
  var lq=new T.Mesh(new T.CylinderGeometry(.82,.82,1,20),new T.MeshPhysicalMaterial({color:0xd9efff,transparent:true,opacity:.35,roughness:.1}));lq.scale.y=3.6;lq.position.y=.2+1.9;tubeG.add(lq);G.t2l=lq;
  var rk=C.mesh(new T.BoxGeometry(3,.4,3),C.std(0x9b7a55,.6),0,.2,0);tubeG.add(rk);
  sc.add(tubeG);
  var cv=new T.CatmullRomCurve3([new T.Vector3(0,12,0),new T.Vector3(0,14.4,0),new T.Vector3(4.5,14.4,0),new T.Vector3(9,13.6,0),new T.Vector3(9,3,0)]);
  G.pipe=new T.Mesh(new T.TubeGeometry(cv,40,.16,8),C.glass(0xdde7ee,.55));G.pipe.visible=false;sc.add(G.pipe);
  G.pbubL=[];
  /* جسيمات: فقاعات + أبخرة */
  var N=70;var pg=new T.BufferGeometry();pg.setAttribute('position',new T.BufferAttribute(new Float32Array(N*3),3));var pm=new T.PointsMaterial({color:0xffffff,size:.28,transparent:true,opacity:.8,depthWrite:false,sizeAttenuation:true});G.bub=new T.Points(pg,pm);G.bubD=[];for(var i=0;i<N;i++)G.bubD.push({a:0,x:0,y:0,z:0,vy:0,u:0});sc.add(G.bub);
  var M=60,fg=new T.BufferGeometry();fg.setAttribute('position',new T.BufferAttribute(new Float32Array(M*3),3));
  var cvs=document.createElement('canvas');cvs.width=cvs.height=64;var cx=cvs.getContext('2d'),gr=cx.createRadialGradient(32,32,2,32,32,30);gr.addColorStop(0,'rgba(255,255,255,.85)');gr.addColorStop(1,'rgba(255,255,255,0)');cx.fillStyle=gr;cx.fillRect(0,0,64,64);
  var fm=new T.PointsMaterial({map:new T.CanvasTexture(cvs),color:0xffffff,size:2.6,transparent:true,opacity:.55,depthWrite:false,sizeAttenuation:true});G.fume=new T.Points(fg,fm);G.fumeD=[];for(i=0;i<M;i++)G.fumeD.push({a:0,x:0,y:0,z:0,vy:0});sc.add(G.fume);
  var fl2=new T.PointLight(0xffffff,0,34);fl2.position.set(0,11,2);sc.add(fl2);G.flash=fl2;
  var gl2=new T.PointLight(0xff5a1a,0,16);gl2.position.set(0,9,0);sc.add(gl2);G.glow=gl2;
}
 var vesH=0,lumpsKey='';
 function buildVessel(soft){if(!v)return;var sc=v.scene;if(!G.flame){buildScene()}
  var def=VESSEL[S.vessel];
  if(!soft||!vesselG||vesselG.userData.v!==S.vessel){
   if(vesselG)sc.remove(vesselG);vesselG=new T.Group();vesselG.userData.v=S.vessel;lumpsKey='';
   var sup=new T.Group();
   if(S.vessel==='tube'){var pole=C.mesh(new T.CylinderGeometry(.22,.22,22,12),C.std(0x4a4f55,.4,.7),-7.5,11,-2,true);sup.add(pole);var arm=C.mesh(new T.CylinderGeometry(.16,.16,7.5,10),C.std(0x4a4f55,.4,.7),-3.7,11.2,-2,true);arm.rotation.z=Math.PI/2;sup.add(arm);var cl=C.mesh(new T.TorusGeometry(1.1,.17,8,20),C.std(0x4a4f55,.4,.7),0,11.2,-2);cl.rotation.x=Math.PI/2;sup.add(cl);
    var base=C.mesh(new T.BoxGeometry(5,.5,4),C.std(0x4a4f55,.4,.7),-7.5,.25,-2,true);sup.add(base);vesselG.position.set(0,5.2,0)}
   else{for(var a=0;a<3;a++){var ang=a*2.094+.5,lx=Math.cos(ang)*3.2,lz=Math.sin(ang)*3.2;var leg=C.mesh(new T.CylinderGeometry(.14,.14,8.4,10),C.std(0x4a4f55,.4,.7),lx,4.2,lz,true);sup.add(leg)}
    var rr0=S.vessel==='crucible'?1.75:3.3,ring=C.mesh(new T.TorusGeometry(rr0,.14,8,40),C.std(0x4a4f55,.4,.7),0,S.vessel==='crucible'?8.45:8.3,0);ring.rotation.x=Math.PI/2;sup.add(ring);
    if(S.vessel==='beaker'){var gz=C.mesh(new T.CylinderGeometry(3.2,3.2,.1,40),C.std(0x9fa6ac,.5,.5),0,8.35,0);sup.add(gz)}
    vesselG.position.set(0,S.vessel==='beaker'?8.4:8.55,0)}
   sc.add(sup);G.sup&&sc.remove(G.sup);G.sup=sup;
   var gm=S.vessel==='crucible'?C.std(0xcbbfa6,.5):C.glass(0xcfe6ff,.28),pr=[];
   if(S.vessel==='tube'){pr=[[0,0],[.9*.6,.02],[.9,.35],[.9,def.h],[1.05,def.h+.12]]}
   else if(S.vessel==='beaker'){pr=[[0,0],[def.r,0],[def.r,def.h],[def.r+.15,def.h+.1]]}
   else{pr=[[0,0],[.7,0],[1.25,.45],[def.r+.5,def.h],[def.r+.65,def.h+.05]]}
   var vm=new T.Mesh(C.lathe(pr,28),gm);if(S.vessel==='crucible'){vm.material.side=T.DoubleSide;vm.material.emissive=new T.Color(0)}vm.castShadow=true;vesselG.add(vm);G.vm=vm;
   var lq=new T.Mesh(new T.CylinderGeometry(1,1,1,28),new T.MeshPhysicalMaterial({color:0xd9efff,transparent:true,opacity:.35,roughness:.08,depthWrite:false}));vesselG.add(lq);G.lq=lq;
   var sd=new T.Mesh(new T.CylinderGeometry(1,1,1,28),new T.MeshStandardMaterial({color:0xf5c400,roughness:.8}));vesselG.add(sd);G.sd=sd;
   if(S.vessel==='tube'){var st=new T.Group();st.position.y=def.h+.2;st.visible=S.conn;vesselG.add(st);G.stop=st;var sp2=new T.Mesh(new T.CylinderGeometry(.95,.75,.7,16),C.std(0x7a4b2a,.7));sp2.position.y=0;st.add(sp2)}
   else G.stop=null;
   G.lumps=new T.Group();vesselG.add(G.lumps);sc.add(vesselG);G.pbase=vesselG.position.y;
  }
  if(G.stop)G.stop.visible=S.conn;if(G.pipe)G.pipe.visible=!!S.conn&&S.vessel==='tube';
 }
 function updLumps(){if(!G.lumps)return;var def=VESSEL[S.vessel],key=S.vessel+'|';var tot=0,arr=[];for(var k in S.n){var sp=SP[k];if(sp&&sp.ph==='s'&&S.n[k]>.001){tot+=S.n[k]*sp.M;arr.push([k,S.n[k]*sp.M])}}
  arr.sort(function(a,b){return b[1]-a[1]});key+=arr.map(function(a){return a[0]+Math.round(a[1]/1.5)}).join(',');if(key===lumpsKey)return;lumpsKey=key;
  while(G.lumps.children.length)G.lumps.remove(G.lumps.children[0]);if(!tot)return;
  var n=clamp(Math.round(tot/.8),6,30),rr=def.r*.62,rnd=function(i){var x=Math.sin(i*127.1+11.7)*43758.5;return x-Math.floor(x)};
  for(var i=0;i<n;i++){var pick=rnd(i+3)*tot,acc=0,kk=arr[0][0];for(var j=0;j<arr.length;j++){acc+=arr[j][1];if(pick<=acc){kk=arr[j][0];break}}
   var sz=.3+rnd(i+9)*.22+Math.min(.18,tot/70),isF=kk==='Mg'||kk==='Zn'||kk==='Fe'||kk==='Cu';
   var m=new T.Mesh(isF?new T.BoxGeometry(sz*2.2,sz*.5,sz*.8):new T.DodecahedronGeometry(sz,0),new T.MeshStandardMaterial({color:SP[kk].col||'#ddd',roughness:isF?.35:.9,metalness:isF?.8:0}));
   m.userData.k=kk;var ang=rnd(i+1)*6.28,rad=Math.sqrt(rnd(i+5))*rr;m.position.set(Math.cos(ang)*rad,.1+(S.vessel==='tube'?.55:.05)+sz*.5+Math.floor(i/10)*.25,Math.sin(ang)*rad);m.rotation.set(rnd(i)*3,rnd(i+2)*3,rnd(i+4)*3);m.castShadow=true;G.lumps.add(m)}}
 function emitBub(rate,dt,top,liquid){var cnt=0;G.bubD.forEach(function(p){if(p.a)return;if(cnt>=rate*dt)return;p.a=1;p.u=0;var def=VESSEL[S.vessel],rr=def.r*.7;p.x=(Math.random()-.5)*rr*1.6;p.z=(Math.random()-.5)*rr*1.6;p.y=.5;p.vy=1.4+Math.random()*1.6;cnt++})}
 var lastT=0,kick=40;
 function frame(t){if(!v||!G.flame)return false;var dt=Math.min(.05,(t-lastT)/1000||0);lastT=t;if(dt<=0)return false;var sdt=dt*S.speed,def=VESSEL[S.vessel];var sub=Math.max(1,Math.round(S.speed));for(var s=0;s<sub;s++)step(S,dt*S.speed/sub);
  var pos=G.pbase||5.2,hasW=waterMl(S)>.2;
  /* لهب */
  var on=S.burner,pw=on?(S.T<S.Tset-2?1:.55):0;G.flame.visible=on;if(on){var fk=.82+Math.sin(t*.02)*.07+Math.sin(t*.037)*.05;G.fo.scale.set(.8+.35*pw,fk*(.7+.7*pw),.8+.35*pw);G.fi.scale.set(.8+.2*pw,fk*(.6+.5*pw),.8+.2*pw);G.fo.position.y=1.2+1.7*pw*fk*.5;G.fi.position.y=.8+.6*pw}G.fL.intensity=on?(.9+pw*1.4):0;
  /* سائل وراسب */
  var wm=waterMl(S),cap=def.cap,ih=def.h*.9,lh=clamp(wm/cap,0,1)*ih;G.lq.visible=lh>.04;var rin=def.r*.92*(S.vessel==='tube'?1:1);G.lq.scale.set(rin,Math.max(.01,lh),rin);G.lq.position.y=(S.vessel==='crucible'?.4:.35)+lh/2;
  var sc=solCol(S);G.lq.material.color.copy(sc.c);G.lq.material.opacity=sc.op;
  var pp=0;for(var k in S.n){var sp=SP[k];if(sp&&(sp.ph==='ppt'||sp.ph==='sus')&&S.n[k]>.0003)pp+=S.n[k]}
  var sdH=clamp(pp*3.2,0,def.h*.3);G.sd.visible=sdH>.02&&hasW;if(G.sd.visible){var pc=S.n.PbI2>S.n.CaCO3_p?'#F5C400':'#f4f4ee';G.sd.material.color.set(S.n.PbI2>.0003?'#F2B300':'#f3f1ea');G.sd.scale.set(rin*.98,sdH,rin*.98);G.sd.position.y=.35+sdH/2}
  updLumps();
  /* توهج */
  var gl=clamp((S.T-500)/450,0,1);if(G.lumps)G.lumps.children.forEach(function(m){if(m.material.emissive){m.material.emissive.setRGB(gl*1.0,gl*.28,gl*.04);m.material.emissiveIntensity=1}});if(S.vessel==='crucible'&&G.vm){G.vm.material.emissive.setRGB(gl*.55,gl*.14,gl*.02)}G.glow.intensity=gl*2.2;
  /* وميض المغنيسيوم */
  var fl=S.lightT>0?1:0;G.flash.intensity=fl*(18+Math.random()*8);G.flash.position.set(0,pos+3,3);
  if(fl&&G.lumps)G.lumps.children.forEach(function(m){if(m.userData.k==='Mg'&&m.material.emissive){m.material.emissive.setRGB(1,1,1);m.material.emissiveIntensity=2.5}});
  /* فقاعات */
  var gr=S.gasRate*40;var evolving=gr>.5;if(evolving){emitBub(Math.min(60,gr*8),dt,0)}else if(Object.keys(S.rate).some(function(r){return S.rate[r]>1e-4&&(r==='mg_hcl'||r==='zn_hcl'||r==='caco3_hcl'||r==='na2co3_hcl')})){emitBub(10,dt)}
  var bp=G.bub.geometry.attributes.position,topY=(S.vessel==='crucible'?.4:.35)+Math.max(lh,.2);
  G.bubD.forEach(function(p,i){if(p.a){p.y+=p.vy*dt*2.1;p.x+=Math.sin(t*.01+i)*.004;if(p.y>(hasW?topY:def.h+4)){p.a=0}bp.setXYZ(i,p.x,pos+p.y,p.z)}else bp.setXYZ(i,0,-50,0)});bp.needsUpdate=true;
  /* أبخرة */
  var fp=G.fume.geometry.attributes.position,steam=S.steam>0&&hasW,smoke=S.lightT>0||(S.rate.mg_o2||0)>1e-3,haze=S.vessel==='crucible'&&S.rate.decomp>1e-4;var want=steam?1:smoke?1.4:haze?.5:0;
  G.fumeD.forEach(function(p,i){if(!p.a&&want>0&&Math.random()<dt*10*want){p.a=1;p.x=(Math.random()-.5)*def.r;p.z=(Math.random()-.5)*def.r;p.y=(def.h+.4);p.vy=1.2+Math.random()}
    if(p.a){p.y+=p.vy*dt*2;p.x+=Math.sin(t*.002+i)*.01;if(p.y>def.h+9)p.a=0;fp.setXYZ(i,p.x,pos+p.y,p.z)}else fp.setXYZ(i,0,-50,0)});fp.needsUpdate=true;G.fume.material.opacity=smoke?.8:.5;
  /* أنبوب ماء الجير */
  var tc=S.tube2.ppt/.01;G.t2l.material.color.copy(hex('#d9efff').lerp(hex('#f6f6f0'),clamp(tc,0,1)));G.t2l.material.opacity=.35+.55*clamp(tc,0,1);
  /* قراءات */
  dispT(S.T);
  var busy=kick>0||S.burner||Math.abs(S.T-25)>.4||S.lightT>0||S.steam>0||S.tube2.bub>0||G.bubD.some(function(p){return p.a})||G.fumeD.some(function(p){return p.a});if(kick>0)kick--;return busy}
 if(v)v.onframe=frame;
 var lastUI=0;
 function dispT(Tv){var e=$('lbT');e.firstChild.textContent=Math.round(Tv)+'°';e.classList.toggle('hot',Tv>150);var m=mass(S);$('lbM').firstChild.textContent=m.toFixed(2);var p=$('lbP');if(S.ind&&waterMl(S)>.3){p.hidden=false;p.firstChild.textContent=ph(S).toFixed(1)}else p.hidden=true;var now=performance.now();if(now-lastUI>400){lastUI=now;syncUI()}}
 function syncUI(){$('lbB').textContent=S.burner?'⛔ أطفئ الموقد':'🔥 أشعل الموقد';$('lbB').classList.toggle('on',S.burner);$('lbWire').classList.toggle('on',S.conn);$('lbWire').textContent=S.conn?'✂️ افصل أنبوب ماء الجير':'🔗 صِل أنبوب ماء الجير';selV();
  var ev=$('lbEv');var h='';SIGNS.forEach(function(s){var q=S.signs[s[0]];h+='<div class="'+(q?'on':'')+'"><span>'+(q?'✅':'⬜')+'</span><span><b>'+s[1]+'</b>'+(q?'<br>'+q.d:'')+'</span></div>'});ev.innerHTML=h;
  var eq=$('lbEq'),he='';Object.keys(S.eqs).forEach(function(k){he+='<div>'+S.eqs[k].eq+'<small>'+S.eqs[k].type+'</small></div>'});eq.innerHTML=he;
  var lg=$('lbLog');lg.innerHTML=S.log.slice(-12).reverse().map(function(x){return'<div>• '+x+'</div>'}).join('');
  if(cfg.missions){var ms=$('lbMs'),hm='';cfg.missions.forEach(function(m){var ok=S.done[m.t]||(m.ok&&m.ok(S));if(ok)S.done[m.t]=1;hm+='<div class="'+(ok?'ok':'')+'">'+(ok?'✅ ':'⬜ ')+m.t+'</div>'});ms.innerHTML=hm}
  if(window.ICONS&&ICONS.strip){}}
 var CT=0;
 if(!v){setInterval(function(){step(S,.1*S.speed);dispT(S.T)},100)}
 function init(){buildVessel();selV();syncUI();$('lbTs').value=S.Tset;if(v){v.dirty=true}}
 init();
 return{state:function(){return S},reset:function(){$('lbClr').onclick()}}
}
window.addEventListener('message',function(){});
function lazy(secId,cfg){var sec=document.getElementById(secId);if(!sec)return;var root=sec.querySelector('.labroot'),done=0;function chk(){if(!done&&!sec.classList.contains('hidden')){done=1;mount(root,cfg)}}try{new MutationObserver(chk).observe(sec,{attributes:true,attributeFilter:['class']})}catch(e){}chk()}
return{lazy:lazy,mount:mount,SP:SP,RX:RX,newState:newState,step:step,add:add,ph:ph,mass:mass,cp:cp}
})();
