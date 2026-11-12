/* مختبر كيمياء واقعي: موقد بنزن، مقياس حرارة، مواد تُضاف بيدك، ودلائل التفاعل تظهر كما في المختبر */
window.Lab=(function(){
var T=window.THREE,C=window.C3D;
/* ---------- المواد ---------- */
/* ph: s صلب، l ماء، aq محلول، sus معلّق، ppt راسب، g غاز | M الكتلة المولية | st مقدار الإضافة (مول) | wm ماء مرافق (مول) */
var SP={
 H2O:{n:'ماء',f:'H₂O',ph:'l',M:18.02,st:.5,col:'#cfe8ff'},
 CaCO3:{n:'حجر جيري (مسحوق)',f:'CaCO₃',ph:'s',M:100.09,st:.03,col:'#f2f1ec',vm:37,pow:1},
 CaO:{pow:1,n:'جير حيّ',f:'CaO',ph:'s',M:56.08,st:.03,col:'#f4f1ea',vm:17},
 CaOH2_aq:{n:'ماء الجير الرائق',f:'Ca(OH)₂',ph:'aq',M:74.09,st:.01,wm:.3,col:null},
 CaOH2_s:{n:'جير مطفأ (معلّق)',f:'Ca(OH)₂',ph:'sus',M:74.09,col:'#f3f1ec'},
 CaCO3_p:{n:'راسب كربونات الكالسيوم',f:'CaCO₃',ph:'ppt',M:100.09,col:'#f6f6f2'},
 CO2:{n:'ثاني أكسيد الكربون',f:'CO₂',ph:'g',M:44.01,st:.02},
 HCl:{n:'حمض HCl مخفف',f:'HCl',ph:'aq',M:36.46,st:.02,wm:.25,col:null},
 CaCl2:{n:'كلوريد الكالسيوم',f:'CaCl₂',ph:'aq',M:110.98,col:null},
 Mg:{n:'شريط مغنيسيوم',f:'Mg',ph:'s',M:24.31,st:.02,col:'#c9ced3',vm:14},
 MgO:{pow:1,n:'أكسيد المغنيسيوم',f:'MgO',ph:'s',M:40.3,col:'#fafafa',vm:11},
 MgCl2:{n:'كلوريد المغنيسيوم',f:'MgCl₂',ph:'aq',M:95.2,col:null},
 O2:{n:'أكسجين الهواء',f:'O₂',ph:'g',M:32},
 H2:{n:'هيدروجين',f:'H₂',ph:'g',M:2.016},
 Zn:{n:'خارصين (زنك)',f:'Zn',ph:'s',M:65.38,st:.02,col:'#9aa3ab',vm:9},
 ZnCl2:{n:'كلوريد الخارصين',f:'ZnCl₂',ph:'aq',M:136.3,col:null},
 Fe:{n:'مسمار حديد',f:'Fe',ph:'s',M:55.85,st:.02,col:'#6d7378',vm:7},
 Cu:{n:'نحاس (راسب أحمر)',f:'Cu',ph:'s',M:63.55,col:'#b4582b',vm:7},
 CuSO4:{n:'محلول كبريتات النحاس',f:'CuSO₄',ph:'aq',M:159.6,st:.02,wm:.25,col:'#1E88E5'},
 FeSO4:{n:'كبريتات الحديد II',f:'FeSO₄',ph:'aq',M:151.9,col:'#6FCB5F'},
 KI:{n:'يوديد البوتاسيوم',f:'KI',ph:'aq',M:166,st:.02,wm:.25,col:null},
 PbNO32:{n:'نترات الرصاص II',f:'Pb(NO₃)₂',ph:'aq',M:331.2,st:.01,wm:.25,col:null},
 PbI2:{n:'يوديد الرصاص (راسب أصفر)',f:'PbI₂',ph:'ppt',M:461,col:'#F2B300'},
 KNO3:{n:'نترات البوتاسيوم',f:'KNO₃',ph:'aq',M:101.1,col:null},
 NaOH_aq:{n:'محلول هيدروكسيد الصوديوم',f:'NaOH',ph:'aq',M:40,st:.02,wm:.25,col:null},
 NaOH_s:{n:'هيدروكسيد الصوديوم (صلب)',f:'NaOH',ph:'s',M:40,st:.02,col:'#f2f2f2',vm:19},
 NaCl:{n:'كلوريد الصوديوم',f:'NaCl',ph:'aq',M:58.44,col:null},
 Na2CO3:{n:'كربونات الصوديوم',f:'Na₂CO₃',ph:'aq',M:105.99,st:.02,wm:.25,col:null},
 NH4NO3:{pow:1,n:'نترات الأمونيوم (صلب)',f:'NH₄NO₃',ph:'s',M:80.04,st:.03,col:'#f7f7f7',vm:46},
 NH4NO3_aq:{n:'محلول نترات الأمونيوم',f:'NH₄NO₃',ph:'aq',M:80.04,col:null},
 CH4:{n:'غاز الميثان',f:'CH₄',ph:'g',M:16.04,st:.02},
 EtOH:{n:'إيثانول',f:'C₂H₅OH',ph:'l',M:46.07,st:.03,col:null,fuel:1},
 C6H12:{n:'هكسين (ألكين)',f:'C₆H₁₂',ph:'l',M:84.16,st:.02,col:null,oil:1},
 C6H14:{n:'هكسان (ألكان)',f:'C₆H₁₄',ph:'l',M:86.18,st:.02,col:null,oil:1},
 C6H12Br2:{n:'ثنائي برومو هكسان',f:'C₆H₁₂Br₂',ph:'l',M:244.0,col:null,oil:1},
 Br2:{n:'ماء البروم (برتقالي)',f:'Br₂',ph:'aq',M:159.8,st:.01,wm:.25,col:'#EF8A17'},
 CuCO3:{pow:1,n:'كربونات النحاس (أخضر)',f:'CuCO₃',ph:'s',M:123.55,st:.03,col:'#2fa36b',vm:40},
 CuO:{pow:1,n:'أكسيد النحاس (أسود)',f:'CuO',ph:'s',M:79.55,col:'#232323',vm:12},
 Cu0:{n:'نحاس (برادة)',f:'Cu',ph:'s',M:63.55,st:.03,col:'#b4582b',vm:7},
 H2O2:{n:'ماء الأكسجين',f:'H₂O₂',ph:'aq',M:34.01,st:.03,wm:.25,col:null},
 MnO2:{pow:1,n:'ثاني أكسيد المنغنيز (حفّاز)',f:'MnO₂',ph:'s',M:86.94,st:.01,col:'#2b2b2b',vm:17},
 NaHCO3:{pow:1,n:'صودا الخبز',f:'NaHCO₃',ph:'s',M:84.01,st:.03,col:'#f1efe9',vm:36},
 AcOH:{n:'خل (حمض الإيثانويك)',f:'CH₃COOH',ph:'aq',M:60.05,st:.03,wm:.25,col:null},
 NaOAc:{n:'إيثانوات الصوديوم',f:'CH₃COONa',ph:'aq',M:82.03,col:null},
 UI:{n:'كاشف عام',f:'',ph:'ind',M:0,st:1}
};
/* ---------- التفاعلات: r متفاعلات، p نواتج، dH كيلوجول/مول (+ ماص، - طارد)، minT، k، air = يستهلك أكسجين الهواء ---------- */
var RX=[
 {id:'ch4',r:{CH4:1},p:{CO2:1,H2O:2},dH:-890,minT:0,k:.6,ign:1,air:{O2:2},hf:.04,eq:'CH₄ + 2O₂ → CO₂ + 2H₂O',type:'احتراق كامل',light:1,fire:'#7fb8ff',open:1},
 {id:'etoh',r:{EtOH:1},p:{CO2:2,H2O:3},dH:-1367,minT:0,k:.12,ign:1,air:{O2:3},hf:.05,eq:'C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O',type:'احتراق كامل',light:1,fire:'#ffd34d',open:1},
 {id:'br2',r:{C6H12:1,Br2:1},p:{C6H12Br2:1},dH:-120,minT:0,k:.35,eq:'C₆H₁₂ + Br₂ → C₆H₁₂Br₂',type:'إضافة (يزول لون البروم)',note:'br'},
 {id:'cuco3',r:{CuCO3:1},p:{CuO:1,CO2:1},dH:46,minT:290,k:.012,tf:40,eq:'CuCO₃ → CuO + CO₂',type:'تحلل حراري',gas:'CO2'},
 {id:'cu_o2',r:{Cu0:2},p:{CuO:2},dH:-312,minT:330,k:.012,tf:40,air:{O2:1},eq:'2Cu + O₂ → 2CuO',type:'اتحاد مع الأكسجين',open:1},
 {id:'h2o2',r:{H2O2:2},p:{H2O:2,O2:1},dH:-98,minT:0,k:.8,cat:'MnO2',eq:'2H₂O₂ → 2H₂O + O₂↑',type:'تحلل بوجود حفّاز',gas:'O2'},
 {id:'nahco3',r:{NaHCO3:1,AcOH:1},p:{NaOAc:1,H2O:1,CO2:1},dH:25,minT:0,k:.35,eq:'NaHCO₃ + CH₃COOH → CH₃COONa + H₂O + CO₂↑',type:'حمض + بيكربونات (ماص قليلاً)',gas:'CO2'},
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
 tube:{n:'أنبوب اختبار',cap:16,cv:14,r:1.0,h:8,leak:.35,open:1},
 beaker:{n:'كأس زجاجية',cap:55,cv:60,r:1.9,h:4.2,leak:1.2,open:1},
 crucible:{n:'بوتقة',cap:12,cv:40,r:1.5,h:1.7,leak:2.6,open:1}
};
function sup(s){return s}
function hex(h){return new T.Color(h)}
function clamp(x,a,b){return x<a?a:x>b?b:x}
function lerpC(a,b,t){return a.clone().lerp(b,t)}
/* ---------- نموذج المحاكاة ---------- */
function newState(vessel){return{n:{},T:25,vessel:vessel||'tube',burner:false,Tset:300,ind:false,t:0,log:[],signs:{},eqs:{},tube2:{ca:.01,ppt:0},conn:false,done:{},rate:{},gasRate:0,pptStart:0,lightT:0,hot0:null,leaked:{},speed:1,hist:{add:{},burner:0,off:0,maxT:25,minT:25,conn:0,unconn:0,splint:0},sd:{}}}
function mass(S){var m=0;for(var k in S.n){var sp=SP[k];if(sp&&sp.M)m+=S.n[k]*sp.M}return m}
function waterMl(S){return(S.n.H2O||0)*18.02}
function cp(S){var m=0,w=waterMl(S);for(var k in S.n){var sp=SP[k];if(!sp||sp.ph==='g'||k==='H2O')continue;if(sp.ph==='aq'||sp.ph==='sus'||sp.ph==='ppt')m+=S.n[k]*sp.M*.5;else m+=S.n[k]*sp.M*.9}return 4.18*w+m+VESSEL[S.vessel].cv}
function ph(S){var V=Math.max(.002,waterMl(S)/1000),H=S.n.HCl||0,OH=(S.n.NaOH_aq||0)+(S.n.NaOH_s||0)*0+Math.min(2*((S.n.CaOH2_aq||0)+(S.n.CaOH2_s||0)),.04*V*2)+.1*(S.n.Na2CO3||0);var A=(H-OH)/V;if(Math.abs(A)<1e-7)return 7;return A>0?clamp(-Math.log10(A),0,7):clamp(14+Math.log10(-A),7,14)}
function phCol(p){return p<3?'#E53935':p<5?'#F57C00':p<6.3?'#FBC02D':p<7.8?'#43A047':p<9.5?'#1E88E5':p<11.5?'#5E35B1':'#8E24AA'}
function solCol(S){var V=Math.max(.003,waterMl(S)/1000),c=hex('#d9efff'),op=.32,w=0;
 for(var k in S.n){var sp=SP[k];if(!sp||!sp.col||(sp.ph!=='aq'&&sp.ph!=='ppt'&&sp.ph!=='sus'))continue;var amt=S.n[k];if(amt<1e-4)continue;
  if(sp.ph==='aq'){var cc=clamp(amt/V/.4,0,1);c=lerpC(c,hex(sp.col),Math.min(1,cc*1.1));op+=cc*.3}else{var tt=clamp(amt/.012,0,1);c=lerpC(c,hex(sp.col),tt*.9);op+=tt*.45}}
 if(S.ind&&V>.0015){var pc=hex(phCol(ph(S)));c=lerpC(c,pc,.75);op=Math.max(op,.7)}
 return{c:c,op:clamp(op,.6,.95)}}
function add(S,id){var sp=SP[id];if(!sp)return;S.hist.add[id]=1;if(sp.ph==='ind'){S.ind=true;S.log.push('أضفتَ الكاشف العام: يتلوّن المحلول بحسب الحموضة.');return}
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
  if(R.cat&&!(S.n[R.cat]>1e-4))return;
  if(R.ign&&!S.burner)return;
  if(R.minT&&S.T<R.minT)return;
  var f=R.minT?clamp((S.T-R.minT)/(R.tf||40)+.25,0,2.6):1;
  var xi=Math.min(lim,R.k*f*dt*(R.gas||R.ppt?1:1));if(xi<=1e-9)return;
  for(k in R.r)S.n[k]-=R.r[k]*xi;
  for(k in R.p)S.n[k]=(S.n[k]||0)+R.p[k]*xi;
  if(R.air)for(k in R.air){S.n.O2_used=(S.n.O2_used||0)+R.air[k]*xi;S.n.O2abs=(S.n.O2abs||0)+R.air[k]*xi}
  Q+=-R.dH*xi*(R.hf||1);
  S.rate[R.id]=(S.rate[R.id]||0)*.9+xi/dt*.1;evt[R.id]=xi;
  if(!S.eqs[R.id]){S.eqs[R.id]={eq:R.eq,type:R.type};S.log.push('حدث تفاعل: '+R.eq)}
  if(R.gas){gasMade+=xi*(R.p[R.gas]||1);S.signs.gas={t:'تصاعد غاز',d:'فقاعات تصعد من المزيج. غاز '+SP[R.gas].n+'.'+(R.gas==='CO2'?' اختبره بماء الجير أو بعود الثقاب.':' اختبره بعود الثقاب المشتعل.')}}
  if(R.ppt)S.signs.ppt={t:'تكوّن راسب',d:'ظهر راسب '+(R.id==='ki_pb'?'أصفر':'أبيض')+' لم يكن موجوداً.'}
  if(R.light){if(R.fire){S.signs.light={t:'لهب',d:'اشتعلت المادة بلهب '+(R.id==='ch4'?'أزرق شاحب':'أصفر مزرق')+'، وتكوّن CO₂ وماء.'};S.fireT=.5;S.fireC=R.fire}else{S.signs.light={t:'ضوء ساطع',d:'اللهب أبيض مبهر وينتج رماداً أبيض.'};S.lightT=.4}}
  if(R.note==='br'){S.signs.color={t:'تغيّر اللون',d:'اختفى اللون البرتقالي لماء البروم: الهكسين غير مشبع (فيه رابطة مزدوجة).'}}
 });
 /* انحلال الغازات والفقد */
 var gk;for(gk in {CO2:1,H2:1,O2:1,CH4:1}){if(S.n[gk]){
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
 S.hist.maxT=Math.max(S.hist.maxT,S.T);S.hist.minT=Math.min(S.hist.minT,S.T);
 S.lightT=Math.max(0,S.lightT-dt);S.fireT=Math.max(0,(S.fireT||0)-dt);S.gasRate=gasMade/dt;S.t+=dt;
 /* تغيّر اللون */
 var sc=solCol(S);if(S.col0==null)S.col0=sc.c.clone();else if(!S.signs.color&&waterMl(S)>2&&Math.abs(S.col0.r-sc.c.r)+Math.abs(S.col0.g-sc.c.g)+Math.abs(S.col0.b-sc.c.b)>.3&&Object.keys(S.eqs).length){S.signs.color={t:'تغيّر اللون',d:'تغيّر لون المحلول عمّا كان عليه.'}}
 /* مادة صلبة جديدة */
 if((S.n.Cu||0)>.003&&!S.signs.solid)S.signs.solid={t:'ظهور مادة جديدة',d:'ظهرت مادة صلبة حمراء مائلة للبني (نحاس) على الحديد.'};
 if((S.n.MgO||0)>.003&&!S.signs.solid)S.signs.solid={t:'ظهور مادة جديدة',d:'تكوّن مسحوق أبيض (أكسيد المغنيسيوم).'};
 if((S.n.CaO||0)>.003&&(S.eqs.decomp)&&!S.signs.solid)S.signs.solid={t:'ظهور مادة جديدة',d:'الحجر الجيري صار مسحوقاً أبيض هو الجير الحيّ CaO، ونقصت كتلته لأن CO₂ تصاعد.'};
}
function snap(S){return{T:S.T,mass:mass(S)+(S.n.O2abs||0)*0}}
/* ---------- الواجهة ---------- */
function chk(c,S){var h=S.hist,a=c.split(':');switch(a[0]){case'add':return !!h.add[a[1]];case'burner':return !!h.burner;case'maxT':return h.maxT>+a[1];case'minT':return h.minT<+a[1];case'conn':return !!h.conn;case'unconn':return !!h.unconn;case'off':return !!h.off;case'rx':return !!S.eqs[a[1]];case'sign':return !!S.signs[a[1]];case'splint':return !!h.splint;case'ind':return !!S.ind;case'tube2':return !!S.eqs.tube2;case'nrx':return !!h.add.C6H14&&!S.eqs.br2}return false}
var EXP={
 decomp:{id:'decomp',title:'تحلل الحجر الجيري بالحرارة',goal:'سخّن الحجر الجيري واكشف الغاز الناتج بماء الجير.',vessel:'tube',subs:['CaCO3'],tools:['burner','thermo','wire','mass'],c:'CaCO₃ → CaO + CO₂: تحلل حراري، وتعكّر ماء الجير يدل على CO₂، ونقصت الكتلة لأن الغاز خرج.',
  steps:[{t:'ضع قطعاً من الحجر الجيري في أنبوب الاختبار.',c:'add:CaCO3',h:'اضغط «حجر جيري» أكثر من مرة.'},{t:'صِل أنبوب توصيل الغاز بأنبوب ماء الجير.',c:'conn',h:'زر «صِل أنبوب ماء الجير».'},{t:'أشعل موقد بنزن.',c:'burner'},{t:'ارفع الحرارة إلى أكثر من 850°م وانتظر حتى يصل المقياس.',c:'maxT:850',h:'حرّك المؤشر إلى 950°م، وسرّع الزمن إن شئت.'},{t:'لاحظ تعكّر ماء الجير: الغاز المتصاعد هو CO₂.',c:'tube2'},{t:'افصل أنبوب التوصيل أولاً (حتى لا يُسحب ماء الجير إلى الأنبوب الساخن).',c:'unconn'},{t:'ثم أطفئ الموقد.',c:'off'}]},
 slake:{id:'slake',title:'إطفاء الجير الحيّ بالماء',goal:'أضف الماء إلى الجير الحي وراقب الحرارة والبخار.',vessel:'beaker',subs:['CaO','H2O','UI'],tools:['thermo'],c:'CaO + H₂O → Ca(OH)₂ تفاعل طارد للحرارة، والمحلول قاعدي.',
  steps:[{t:'ضع الجير الحيّ في الكأس.',c:'add:CaO'},{t:'أضف الماء على دفعات وراقب مقياس الحرارة.',c:'add:H2O'},{t:'لاحظ ارتفاع الحرارة وتصاعد البخار.',c:'rx:slake'},{t:'أضف الكاشف العام: يتلوّن بنفسجياً لأن المحلول قاعدي.',c:'ind'}]},
 carbacid:{id:'carbacid',title:'حمض + كربونات: غاز ثاني أكسيد الكربون',goal:'أضف الحمض إلى الحجر الجيري واكشف الغاز.',vessel:'tube',subs:['CaCO3','HCl'],tools:['wire','splint'],c:'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂: يعكّر ماء الجير ويطفئ العود المشتعل.',
  steps:[{t:'ضع الحجر الجيري في الأنبوب.',c:'add:CaCO3'},{t:'صِل أنبوب ماء الجير.',c:'conn'},{t:'أضف حمض HCl المخفف.',c:'add:HCl'},{t:'لاحظ الفقاعات وتعكّر ماء الجير.',c:'tube2'}]},
 mghcl:{id:'mghcl',title:'المغنيسيوم مع الحمض: غاز الهيدروجين',goal:'أنتج الهيدروجين واكشفه بعود الثقاب.',vessel:'tube',subs:['Mg','HCl'],tools:['splint','thermo'],c:'Mg + 2HCl → MgCl₂ + H₂: غاز الهيدروجين يُحدث فرقعة مع اللهب.',
  steps:[{t:'ضع شريط المغنيسيوم في الأنبوب.',c:'add:Mg'},{t:'أضف حمض HCl المخفف.',c:'add:HCl'},{t:'لاحظ الفقاعات وارتفاع الحرارة.',c:'sign:gas'},{t:'قرّب عود الثقاب المشتعل من فوهة الأنبوب بسرعة.',c:'splint',h:'اضغط «عود ثقاب مشتعل» أثناء تصاعد الغاز.'}]},
 mgburn:{id:'mgburn',title:'احتراق المغنيسيوم',goal:'سخّن المغنيسيوم في بوتقة وقارن الكتلة قبل وبعد.',vessel:'crucible',subs:['Mg'],tools:['burner','thermo','mass'],c:'2Mg + O₂ → 2MgO: ضوء أبيض مبهر، والكتلة زادت لأن المغنيسيوم اتحد بأكسجين الهواء.',
  steps:[{t:'ضع شريط المغنيسيوم في البوتقة ودوّن الكتلة.',c:'add:Mg'},{t:'أشعل الموقد.',c:'burner'},{t:'ارفع الحرارة إلى أكثر من 620°م.',c:'maxT:620',h:'حرّك المؤشر إلى 800°م.'},{t:'لاحظ الضوء الأبيض المبهر والرماد الأبيض.',c:'rx:mg_o2'},{t:'قارن الكتلة الآن بما دوّنته: زادت.',c:'off',h:'أطفئ الموقد لتنتهي التجربة.'}]},
 fecu:{id:'fecu',title:'الحديد مع محلول كبريتات النحاس',goal:'راقب تغيّر لون المحلول وظهور النحاس.',vessel:'beaker',subs:['CuSO4','Fe'],tools:[],c:'Fe + CuSO₄ → FeSO₄ + Cu: الحديد أنشط من النحاس فيحلّ محلّه.',
  steps:[{t:'ضع محلول كبريتات النحاس الأزرق في الكأس.',c:'add:CuSO4'},{t:'أسقط مسمار الحديد فيه.',c:'add:Fe'},{t:'لاحظ تغيّر اللون الأزرق ورسوب النحاس الأحمر.',c:'rx:fe_cu'}]},
 kipb:{id:'kipb',title:'راسب يوديد الرصاص',goal:'اخلط محلولين شفافين وشاهد الراسب الأصفر.',vessel:'tube',subs:['KI','PbNO32'],tools:[],c:'2KI + Pb(NO₃)₂ → PbI₂↓ + 2KNO₃: تفاعل ترسيب.',
  steps:[{t:'ضع محلول يوديد البوتاسيوم في الأنبوب.',c:'add:KI'},{t:'أضف محلول نترات الرصاص.',c:'add:PbNO32'},{t:'لاحظ الراسب الأصفر (المطر الذهبي).',c:'sign:ppt'}]},
 neutral:{id:'neutral',title:'التعادل: حمض مع قاعدة',goal:'عادِل الحمض بالقاعدة وراقب الكاشف والحرارة.',vessel:'beaker',subs:['NaOH_aq','HCl','UI'],tools:['thermo'],c:'NaOH + HCl → NaCl + H₂O: تعادل طارد للحرارة.',
  steps:[{t:'ضع محلول هيدروكسيد الصوديوم في الكأس.',c:'add:NaOH_aq'},{t:'أضف الكاشف العام: يتلوّن بنفسجياً.',c:'ind'},{t:'أضف حمض HCl على دفعات.',c:'add:HCl'},{t:'لاحظ تغيّر لون الكاشف وارتفاع الحرارة قليلاً.',c:'rx:naoh_hcl'}]},
 dissNaOH:{id:'dissNaOH',title:'ذوبان NaOH: تفاعل طارد',goal:'ذوّب NaOH في الماء وراقب ارتفاع الحرارة.',vessel:'beaker',subs:['H2O','NaOH_s'],tools:['thermo'],c:'ذوبان NaOH يطلق حرارة: عملية طاردة.',
  steps:[{t:'ضع الماء في الكأس.',c:'add:H2O'},{t:'أضف حبيبات NaOH.',c:'add:NaOH_s'},{t:'لاحظ ارتفاع قراءة مقياس الحرارة.',c:'maxT:32'}]},
 dissNH4:{id:'dissNH4',title:'ذوبان نترات الأمونيوم: تفاعل ماص',goal:'ذوّب NH₄NO₃ في الماء وراقب انخفاض الحرارة.',vessel:'beaker',subs:['H2O','NH4NO3'],tools:['thermo'],c:'ذوبان NH₄NO₃ يمتص حرارة: عملية ماصة.',
  steps:[{t:'ضع الماء في الكأس.',c:'add:H2O'},{t:'أضف NH₄NO₃.',c:'add:NH4NO3'},{t:'لاحظ انخفاض قراءة مقياس الحرارة.',c:'minT:19'}]},
 h2o2:{id:'h2o2',title:'تحلل ماء الأكسجين بالحفّاز',goal:'اجعل MnO₂ يسرّع تحلل H₂O₂ واكشف الأكسجين.',vessel:'tube',subs:['H2O2','MnO2'],tools:['splint'],c:'2H₂O₂ → 2H₂O + O₂: الحفّاز MnO₂ لا يُستهلك، والأكسجين يعيد إشعال العود المتوهّج.',
  steps:[{t:'ضع ماء الأكسجين في الأنبوب.',c:'add:H2O2'},{t:'أضف قليلاً من MnO₂ (الحفّاز).',c:'add:MnO2'},{t:'لاحظ الفقاعات الغزيرة.',c:'sign:gas'},{t:'اختبر الغاز بعود الثقاب المتوهّج.',c:'splint'}]},
 bromine:{id:'bromine',title:'الكشف عن الألكين بماء البروم',goal:'قارن الهكسان بالهكسين مع ماء البروم.',vessel:'tube',subs:['Br2','C6H14','C6H12'],tools:[],c:'الألكين (C=C) يضيف البروم فيزول لونه البرتقالي، أما الألكان المشبع فلا.',
  steps:[{t:'ضع ماء البروم البرتقالي في الأنبوب.',c:'add:Br2'},{t:'أضف الهكسان (ألكان) ولاحظ: لا يتغيّر اللون.',c:'nrx'},{t:'أضف الهكسين (ألكين).',c:'add:C6H12'},{t:'لاحظ زوال اللون البرتقالي.',c:'rx:br2'}]},
 ethanol:{id:'ethanol',title:'احتراق الإيثانول',goal:'أشعل الإيثانول في بوتقة وراقب اللهب.',vessel:'crucible',subs:['EtOH'],tools:['burner','thermo'],c:'C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O: احتراق كامل طارد للحرارة.',
  steps:[{t:'ضع الإيثانول في البوتقة (بعيداً عن اللهب أولاً).',c:'add:EtOH'},{t:'أشعل الموقد ليشعل الوقود.',c:'burner'},{t:'لاحظ اللهب الأزرق المصفرّ.',c:'rx:etoh'}]},
 cuco3:{id:'cuco3',title:'تحلل كربونات النحاس',goal:'سخّن المسحوق الأخضر وراقب تحوّله إلى أسود.',vessel:'tube',subs:['CuCO3'],tools:['burner','thermo','wire'],c:'CuCO₃ → CuO + CO₂: يتحول الأخضر إلى أسود ويتعكّر ماء الجير.',
  steps:[{t:'ضع كربونات النحاس الخضراء في الأنبوب.',c:'add:CuCO3'},{t:'صِل أنبوب ماء الجير.',c:'conn'},{t:'أشعل الموقد وارفع الحرارة فوق 290°م.',c:'maxT:290',h:'حرّك المؤشر إلى 350°م.'},{t:'لاحظ تحوّل اللون إلى الأسود وتعكّر ماء الجير.',c:'tube2'},{t:'افصل الأنبوب ثم أطفئ الموقد.',c:'off'}]},
 nahco3:{id:'nahco3',title:'صودا الخبز مع الخل',goal:'شاهد تصاعد CO₂ عند خلط بيكربونات الصوديوم بحمض.',vessel:'tube',subs:['NaHCO3','AcOH'],tools:['splint'],c:'NaHCO₃ + CH₃COOH → CH₃COONa + H₂O + CO₂.',
  steps:[{t:'ضع صودا الخبز في الأنبوب.',c:'add:NaHCO3'},{t:'أضف الخل.',c:'add:AcOH'},{t:'لاحظ الفقاعات وفوران الغاز.',c:'sign:gas'}]},
 cuo2:{id:'cuo2',title:'تسخين النحاس في الهواء',goal:'سخّن برادة النحاس وراقبها تسودّ.',vessel:'crucible',subs:['Cu0'],tools:['burner','thermo','mass'],c:'2Cu + O₂ → 2CuO: يتكوّن أكسيد النحاس الأسود وتزيد الكتلة.',
  steps:[{t:'ضع برادة النحاس في البوتقة.',c:'add:Cu0'},{t:'أشعل الموقد وارفع الحرارة فوق 330°م.',c:'maxT:330'},{t:'لاحظ اسوداد النحاس.',c:'rx:cu_o2'}]}
};
function mountLab(root,cfg){
 C=window.C3D;T=window.THREE;cfg=cfg||{};var EX=cfg.exp||null;if(EX){cfg.subs=EX.subs;cfg.vessels=[EX.vessel];cfg.vessel=EX.vessel;cfg.hint=EX.goal;cfg.missions=null}var subs=cfg.subs||Object.keys(SP).filter(function(k){return SP[k].st}),vessels=cfg.vessels||['tube','beaker','crucible'];
 var S=newState(cfg.vessel||vessels[0]);var css='.lab .sh{display:grid;grid-template-columns:repeat(auto-fill,minmax(88px,1fr));gap:8px;margin:8px 0}.lab .stp div{display:flex;gap:8px;align-items:flex-start;padding:8px 10px;margin:5px 0;border-radius:12px;background:var(--soft);opacity:.6;line-height:1.55}.lab .stp div.cur{opacity:1;border:2px solid var(--accent);background:color-mix(in srgb,var(--accent) 14%,var(--card));font-weight:800}.lab .stp div.ok{opacity:1;background:color-mix(in srgb,var(--ok) 22%,var(--card))}.lab .stp small{display:block;font-weight:600;opacity:.85}.lab .stp b.n{flex:none;min-width:24px;height:24px;border-radius:50%;background:var(--accent);color:var(--accent-ink,#fff);display:grid;place-items:center;font-size:.85rem}.lab .fin{margin-top:8px;padding:10px 12px;border-radius:12px;background:color-mix(in srgb,var(--ok) 25%,var(--card));font-weight:700;line-height:1.7}.lab .lgrid{display:block}@media (min-width:880px){.lab .lgrid{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:16px;align-items:start}.lab .lc1{position:sticky;top:8px}.lab .stage3{height:min(560px,70vh)!important}}.lab .gh{grid-column:1/-1;font-weight:800;margin-top:6px;color:var(--accent)}.lab .sb{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;text-align:center;aspect-ratio:1/1;padding:6px 4px;border-radius:16px;line-height:1.25;font-size:.82rem}.lab .sb i{flex:none;width:34px;height:34px;border-radius:50%;border:2px solid rgba(0,0,0,.4);box-shadow:inset -4px -5px 8px rgba(0,0,0,.25),inset 3px 3px 6px rgba(255,255,255,.55)}.lab .sb small{display:block;font-weight:700;opacity:.8;direction:ltr;text-align:center;font-size:.78rem}.lab .ro{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0}.lab .rd{flex:1;min-width:92px;text-align:center;border-radius:14px;padding:6px 8px;background:var(--card);border:1.5px solid var(--bd,var(--line))}.lab .rd b{display:block;font-size:1.35rem;font-variant-numeric:tabular-nums;direction:ltr}.lab .rd span{font-size:.82rem;opacity:.8}.lab .rd.hot b{color:#E53935}.lab .ev{display:grid;gap:6px;margin:8px 0}.lab .ev div{display:flex;gap:8px;align-items:flex-start;padding:8px 10px;border-radius:12px;background:var(--soft);opacity:.55;line-height:1.5}.lab .ev div.on{opacity:1;background:color-mix(in srgb,var(--ok) 20%,var(--card));border:1.5px solid var(--ok)}.lab .eqs div{direction:ltr;text-align:center;font-weight:800;padding:6px;margin:4px 0;border-radius:10px;background:var(--soft)}.lab .eqs small{display:block;direction:rtl;font-weight:600;opacity:.85}.lab .lg{max-height:120px;overflow:auto;font-size:.92rem;line-height:1.7;opacity:.92}.lab .ms div{padding:6px 10px;margin:4px 0;border-radius:10px;background:var(--soft)}.lab .ms div.ok{background:color-mix(in srgb,var(--ok) 25%,var(--card));font-weight:800}.lab input[type=range]{width:100%}.lab .bt{display:grid;grid-template-columns:repeat(auto-fill,minmax(88px,1fr));gap:8px;margin:8px 0}.lab .bt button{aspect-ratio:1/1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;text-align:center;font-size:.82rem;line-height:1.3;padding:4px 3px;border-radius:16px}.lab .bt button.on{outline:3px solid var(--accent)}';
 root.innerHTML='<style>'+css+'</style><div class="lab"><p class="hint" id="lbHint"></p><div class="lgrid"><div class="lc1"><div class="stage3" id="lbSt" style="height:360px;background:radial-gradient(ellipse at 50% 25%,#5a6a80 0,#2d3644 65%,#1a2029 100%);border-color:#0e1218"></div><div class="ro"><div class="rd" id="lbT"><b>25°</b><span>مقياس الحرارة (°م)</span></div><div class="rd" id="lbM"><b>0.00</b><span>كتلة المواد (غم)</span></div><div class="rd" id="lbP" hidden><b>7.0</b><span>pH</span></div></div></div><div class="lc2">'+
  '<div class="card" id="lbStepsCard" hidden><h3>📋 خطوات التجربة</h3><div class="stp" id="lbStp"></div></div><div class="card"><h3 id="lbVh">١) اختر الوعاء</h3><div class="bt" id="lbV"></div><h3 id="lbMh">٢) أضف المواد بيدك</h3><div class="sh" id="lbS"></div><div class="bt"><button id="lbClr">🧽 نظّف الوعاء وابدأ من جديد</button></div></div>'+
  '<div class="card" id="lbBurnCard"><h3>٣) الموقد ودرجة الحرارة</h3><div class="bt"><button id="lbB">🔥 أشعل الموقد</button><button id="lbSp">⏩ تسريع الزمن ×1</button></div><label>درجة الحرارة المطلوبة: <b id="lbTv">300</b>°م</label><input type="range" id="lbTs" min="25" max="1100" step="5" value="300"><p class="hint" style="margin:4px 0 0">المقياس يرتفع تدريجياً كما في المختبر، فاصبر حتى يصل. بعض التفاعلات لا تبدأ إلا عند حرارة عالية.</p></div>'+
  '<div class="card" id="lbTestCard"><h3>٤) اختبارات الكشف</h3><div class="bt"><button id="lbWire">🔗 صِل أنبوب ماء الجير</button><button id="lbSplint">🕯️ عود ثقاب مشتعل</button></div><div class="lg" id="lbTest"></div></div>'+
  '<div class="card"><h3>🔎 دلائل حدوث التفاعل</h3><div class="ev" id="lbEv"></div><div class="eqs" id="lbEq"></div><b>سجلّ التجربة</b><div class="lg" id="lbLog"></div></div>'+(cfg.missions&&cfg.missions.length?'<div class="card"><h3>🎯 مهام التجربة</h3><div class="ms" id="lbMs"></div></div>':'')+'</div></div></div>';
 var $=function(id){return root.querySelector('#'+id)};
 if(EX){var tl=EX.tools||[];$('lbVh').style.display='none';$('lbV').style.display='none';$('lbMh').textContent='المواد والأدوات اللازمة لهذه التجربة';if(tl.indexOf('burner')<0)$('lbBurnCard').style.display='none';if(tl.indexOf('wire')<0&&tl.indexOf('splint')<0)$('lbTestCard').style.display='none';if(tl.indexOf('wire')<0)$('lbWire').style.display='none';if(tl.indexOf('splint')<0)$('lbSplint').style.display='none';if(tl.indexOf('thermo')<0)$('lbT').style.display='none';if(tl.indexOf('mass')<0)$('lbM').style.display='none';$('lbStepsCard').hidden=false}
 $('lbHint').textContent=cfg.hint||'أضف المواد إلى الوعاء، سخّن إن لزم، وراقب دلائل التفاعل بنفسك.';
 var SIGNS=[['gas','تصاعد غاز'],['ppt','تكوّن راسب'],['color','تغيّر اللون'],['heat','تغيّر درجة الحرارة'],['light','ضوء أو توهّج'],['solid','ظهور مادة جديدة'],['steam','بخار']];
 /* أزرار */
 var vb=$('lbV');vessels.forEach(function(v){var b=document.createElement('button');b.textContent=VESSEL[v].n;b.onclick=function(){S=newState(v);S.Tset=+$('lbTs').value;S.speed=curSpeed;kick=60;buildVessel();syncUI();selV()};b.dataset.v=v;vb.appendChild(b)});
 function selV(){[].forEach.call(vb.children,function(b){b.classList.toggle('on',b.dataset.v===S.vessel)})}
 var sh=$('lbS');var GR=[['المواد الصلبة',function(q){return q.ph==='s'}],['السوائل والمحاليل',function(q){return q.ph==='l'||q.ph==='aq'}],['الغازات والكواشف',function(q){return q.ph==='g'||q.ph==='ind'}]];GR.forEach(function(g){var l=subs.filter(function(id){return g[1](SP[id])});if(!l.length)return;var hd=document.createElement('div');hd.className='gh';hd.textContent=g[0];sh.appendChild(hd);l.forEach(addBtn)});function addBtn(id){var sp=SP[id];var b=document.createElement('button');b.className='sb';b.innerHTML='<i style="background:'+(sp.col||(sp.ph==='g'?'#e0e0e0':'#d9efff'))+'"></i><span>'+sp.n+'<small>'+sp.f+'</small></span>';b.onclick=function(){add(S,id);kick=60;buildVessel(true);syncUI()};sh.appendChild(b)}
 var curSpeed=1;
 $('lbClr').onclick=function(){var v=S.vessel,t=+$('lbTs').value;S=newState(v);S.Tset=t;S.speed=curSpeed;kick=60;buildVessel();syncUI()};
 $('lbB').onclick=function(){if(S.burner)S.hist.off=1;else S.hist.burner=1;S.burner=!S.burner;kick=60;syncUI()};
 $('lbSp').onclick=function(){curSpeed=curSpeed===1?3:curSpeed===3?6:1;S.speed=curSpeed;this.textContent='⏩ تسريع الزمن ×'+curSpeed};
 $('lbTs').oninput=function(){S.Tset=+this.value;$('lbTv').textContent=this.value};
 $('lbWire').onclick=function(){if(S.vessel!=='tube'){$('lbTest').textContent='صِل ماء الجير مع أنبوب الاختبار فقط.';return}if(S.conn)S.hist.unconn=1;else S.hist.conn=1;S.conn=!S.conn;syncUI();buildVessel(true)};
 $('lbSplint').onclick=function(){var s='',t=$('lbTest');if((S.n.H2||0)>5e-4)s='فرقعة خفيفة: الغاز هو الهيدروجين H₂.';else if((S.n.O2||0)>5e-4)s='عاد العود المتوهّج للاشتعال: الغاز هو الأكسجين O₂.';else if((S.n.CO2||0)>5e-4)s='انطفأ العود: الغاز ثاني أكسيد الكربون CO₂ (لا يساعد على الاشتعال).';else s='لا يوجد غاز كافٍ في فوهة الوعاء الآن. شغّل التفاعل ثم قرّب العود بسرعة.';t.textContent=s;if((S.n.H2||0)>5e-4||(S.n.O2||0)>5e-4||(S.n.CO2||0)>5e-4)S.hist.splint=1;S.log.push('اختبار العود المشتعل: '+s);syncUI()};
 /* ---------- المشهد ---------- */
 var v=C.viewer($('lbSt'),{yaw:-8,pitch:14,r:32,ty:9.3,tx:.8,floor:false,rmin:12,rmax:55,maxYaw:70});
 var G={},tubeG=null,vesselG=null,partG=null;
 function buildScene(){if(!v)return;var sc=v.scene;
  function ctex(w,h,fn,rx,ry){var c=document.createElement('canvas');c.width=w;c.height=h;fn(c.getContext('2d'),w,h);var t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;if(rx)t.repeat.set(rx,ry);t.colorSpace=T.SRGBColorSpace;t.anisotropy=4;return t}
  var rn=function(i){var x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x)};
  /* طاولة غرانيت داكنة منقّطة */
  var gran=ctex(256,256,function(x,w,h){x.fillStyle='#1c1e21';x.fillRect(0,0,w,h);var cols=['#ffffff','#a3a9af','#7a6a5d','#3c4046','#d8d2c8'];for(var i=0;i<2600;i++){x.globalAlpha=.35+rn(i+9)*.55;x.fillStyle=cols[Math.floor(rn(i)*5)];var sz=.8+rn(i+3)*1.8;x.fillRect(rn(i+1)*w,rn(i+2)*h,sz,sz)}x.globalAlpha=1},6,3);
  var tb=C.mesh(new T.BoxGeometry(60,1.4,24),C.std(0x3a3d42,.6),0,-.7,0);tb.receiveShadow=true;sc.add(tb);
  var top=new T.Mesh(new T.BoxGeometry(60,.14,24),new T.MeshStandardMaterial({map:gran,roughness:.32,metalness:.15}));top.position.set(0,.07,0);top.receiveShadow=true;sc.add(top);
  /* جدار بلاط أبيض ورفّ */
  var tile=ctex(128,128,function(x,w,h){var g=x.createLinearGradient(0,0,w,h);g.addColorStop(0,'#f4f6f7');g.addColorStop(1,'#dfe3e5');x.fillStyle=g;x.fillRect(0,0,w,h);x.strokeStyle='#b4babe';x.lineWidth=4;x.strokeRect(0,0,w,h)},16,6);
  var wall=new T.Mesh(new T.PlaneGeometry(70,26),new T.MeshStandardMaterial({map:tile,roughness:.55}));wall.position.set(0,12.5,-9);sc.add(wall);
  var shelf=C.mesh(new T.BoxGeometry(60,.5,3),C.std(0xcfd3d6,.5),0,13.2,-7.6);sc.add(shelf);
  var bgl=C.glass(0xe6f3ff,.4);
  [[-9,.8],[-5,1.1],[-1.5,.7],[2.5,1.0],[6,.8],[9.5,1.1]].forEach(function(q,i){var bt=new T.Mesh(C.lathe([[0,0],[q[1],0],[q[1],2.6],[q[1]*.45,3.5],[q[1]*.4,4.2]],18),bgl);bt.position.set(q[0],13.45,-7.6);sc.add(bt);var lq=new T.Mesh(new T.CylinderGeometry(q[1]*.86,q[1]*.86,1.5,16),new T.MeshStandardMaterial({color:i%2?0xcfe8f7:0xe8d9a8,transparent:true,opacity:.55,roughness:.2}));lq.position.set(q[0],14.3,-7.6);sc.add(lq)});
  /* أدوات المنضدة: كؤوس، بطاقات، نظارة، دفتر، ملعقة */
  function beaker(x,z,r,h,fill,col,pow){var g=new T.Group();g.position.set(x,.14,z);g.add(new T.Mesh(C.lathe([[0,0],[r,0],[r,h],[r+.12,h+.08]],26),bgl));if(fill){var lq=new T.Mesh(new T.CylinderGeometry(r*.94,r*.94,h*fill,24),new T.MeshStandardMaterial({color:col||0xd3e9f7,transparent:true,opacity:.5,roughness:.15}));lq.position.y=h*fill/2;g.add(lq)}if(pow){var pm=new T.Mesh(new T.SphereGeometry(r*.8,18,12),new T.MeshStandardMaterial({color:0xf3f3ef,roughness:.95}));pm.scale.set(1,.42,1);pm.position.y=r*.28;g.add(pm)}sc.add(g);return g}
  beaker(-7.4,-3.2,1.7,3.4,.55,0xcfe5f2,false);beaker(-4.1,-4.6,1.55,3.2,0,0,true);
  function bottle(x,z,txt,col){var g=new T.Group();g.position.set(x,.14,z);g.add(new T.Mesh(C.lathe([[0,0],[1.1,0],[1.1,3.4],[.45,4.4],[.42,5.2]],20),bgl));var lq=new T.Mesh(new T.CylinderGeometry(.96,.96,2.4,18),new T.MeshStandardMaterial({color:col,transparent:true,opacity:.5,roughness:.2}));lq.position.y=1.3;g.add(lq);var lb=C.plane(txt,1.7,1.05,{pw:256,ph:160,size:46,color:'#222',bg:'#f6f4ee'});lb.position.set(0,2,1.12);g.add(lb);sc.add(g)}
  bottle(8.2,-3.4,'H₂O',0xd8eefb);bottle(10.4,-4.4,'HCl 1M',0xe5ecd6);
  var card=C.plane('CaCO₃',3.6,2.2,{pw:384,ph:230,size:92,color:'#1f2430',bg:'#f2eee3'});card.rotation.x=-Math.PI/2+.5;card.position.set(-5.6,.9,4.2);card.rotation.z=.12;sc.add(card);
  var wp=C.mesh(new T.BoxGeometry(2.6,.05,2.6),C.std(0xf2eee3,.9),-2.6,.19,5.8);wp.rotation.y=.4;sc.add(wp);var wpp=new T.Mesh(new T.SphereGeometry(.7,14,10),new T.MeshStandardMaterial({color:0xf5f5f1,roughness:.95}));wpp.scale.set(1,.3,1);wpp.position.set(-2.6,.3,5.8);sc.add(wpp);
  var gog=new T.Group();[-1.1,1.1].forEach(function(x){var r=new T.Mesh(new T.TorusGeometry(.95,.1,10,24),C.std(0x2a3242,.5));r.position.set(x,.95,0);gog.add(r);var ln=new T.Mesh(new T.CircleGeometry(.92,24),new T.MeshPhysicalMaterial({color:0xcfe6ff,transparent:true,opacity:.28,roughness:.05}));ln.position.set(x,.95,0);gog.add(ln)});gog.position.set(7.3,.14,3.6);gog.rotation.set(-.15,-.5,0);sc.add(gog);
  var nb=C.mesh(new T.BoxGeometry(4.2,.3,3),C.std(0xf4f1e8,.85),8.4,.3,5.4);nb.rotation.y=-.35;sc.add(nb);var cover=C.mesh(new T.BoxGeometry(4.3,.12,3.1),C.std(0x30406a,.6),8.4,.1,5.4);cover.rotation.y=-.35;sc.add(cover);var pen=C.mesh(new T.CylinderGeometry(.07,.07,3,8),C.std(0x1f2b4a,.4),8.9,.62,5.2);pen.rotation.set(0,0,Math.PI/2);pen.rotation.y=.6;sc.add(pen);
  var sp=C.mesh(new T.BoxGeometry(3.4,.05,.55),C.std(0xcfd4d8,.25,.9),-0.2,.2,6.6);sp.rotation.y=.25;sc.add(sp);
  /* موقد بنزن نحاسي */
  var brass=new T.MeshStandardMaterial({color:0xc9a24a,metalness:.95,roughness:.28}),brassD=new T.MeshStandardMaterial({color:0x8f6f2b,metalness:.9,roughness:.35});
  var bg=new T.Group();var bb=new T.Mesh(C.lathe([[0,0],[2.5,0],[2.55,.18],[2.1,.6],[1.2,1.0],[.85,1.5],[0,1.5]],36),brass);bb.castShadow=true;bg.add(bb);
  bg.add(C.mesh(new T.CylinderGeometry(.58,.62,4.3,24),brass,0,3.65,0,true));bg.add(C.mesh(new T.CylinderGeometry(.78,.78,.7,24),brassD,0,2.2,0,true));bg.add(C.mesh(new T.CylinderGeometry(.66,.66,.35,24),brassD,0,5.6,0,true));
  var kn=C.mesh(new T.CylinderGeometry(.22,.22,1.5,12),brassD,1.2,1.35,0,true);kn.rotation.z=Math.PI/2;bg.add(kn);var kh=C.mesh(new T.CylinderGeometry(.5,.5,.35,14),brass,2.05,1.35,0,true);kh.rotation.z=Math.PI/2;bg.add(kh);
  var fl=new T.Group();var fo=new T.Mesh(new T.ConeGeometry(.9,3.8,20,1,true),new T.MeshBasicMaterial({color:0x69b3ff,transparent:true,opacity:.6,side:T.DoubleSide,depthWrite:false}));fo.position.y=1.7;var fi=new T.Mesh(new T.ConeGeometry(.38,2,16,1,true),new T.MeshBasicMaterial({color:0x1a5bd6,transparent:true,opacity:.85,side:T.DoubleSide,depthWrite:false}));fi.position.y=1;fl.add(fo);fl.add(fi);fl.position.y=5.8;fl.visible=false;bg.add(fl);G.flame=fl;G.fo=fo;G.fi=fi;
  var fill=new T.DirectionalLight(0xffffff,1.3);fill.position.set(2,10,26);sc.add(fill);var rim=new T.DirectionalLight(0x9fc4ff,.9);rim.position.set(-14,12,-10);sc.add(rim);
  var fL=new T.PointLight(0xff9d4a,0,26);fL.position.set(0,7,0);bg.add(fL);G.fL=fL;
  bg.position.set(0,0,0);sc.add(bg);
  /* ماء الجير (أنبوب ٢) */
  tubeG=new T.Group();tubeG.position.set(6.8,0,1);var gl=C.glass(0xe0f1ff,.42);var tg=new T.Mesh(C.lathe([[0,0],[.9,0],[.9,.1],[.9,7.2],[1.05,7.35]],20),gl);tg.position.y=.2;tubeG.add(tg);
  var lq=new T.Mesh(new T.CylinderGeometry(.82,.82,1,20),new T.MeshPhysicalMaterial({color:0xd9efff,transparent:true,opacity:.35,roughness:.1}));lq.scale.y=3.6;lq.position.y=.2+1.9;tubeG.add(lq);G.t2l=lq;
  var rk=C.mesh(new T.BoxGeometry(3,.4,3),C.std(0x9b7a55,.6),0,.2,0);tubeG.add(rk);
  sc.add(tubeG);
  var cv=new T.CatmullRomCurve3([new T.Vector3(0,12,0),new T.Vector3(0,14.4,0),new T.Vector3(3.4,14.4,.5),new T.Vector3(6.8,13.6,1),new T.Vector3(6.8,3,1)]);
  G.pipe=new T.Mesh(new T.TubeGeometry(cv,40,.16,8),C.glass(0xdde7ee,.55));G.pipe.visible=false;sc.add(G.pipe);
  G.pbubL=[];
  /* جسيمات: فقاعات + أبخرة */
  var N=70;var pg=new T.BufferGeometry();pg.setAttribute('position',new T.BufferAttribute(new Float32Array(N*3),3));var pm=new T.PointsMaterial({color:0xffffff,size:.28,transparent:true,opacity:.8,depthWrite:false,sizeAttenuation:true});G.bub=new T.Points(pg,pm);G.bubD=[];for(var i=0;i<N;i++)G.bubD.push({a:0,x:0,y:0,z:0,vy:0,u:0});sc.add(G.bub);
  var M=60,fg=new T.BufferGeometry();fg.setAttribute('position',new T.BufferAttribute(new Float32Array(M*3),3));
  var cvs=document.createElement('canvas');cvs.width=cvs.height=64;var cx=cvs.getContext('2d'),gr=cx.createRadialGradient(32,32,2,32,32,30);gr.addColorStop(0,'rgba(255,255,255,.85)');gr.addColorStop(1,'rgba(255,255,255,0)');cx.fillStyle=gr;cx.fillRect(0,0,64,64);
  var fm=new T.PointsMaterial({map:new T.CanvasTexture(cvs),color:0xffffff,size:2.6,transparent:true,opacity:.55,depthWrite:false,sizeAttenuation:true});G.fume=new T.Points(fg,fm);G.fumeD=[];for(i=0;i<M;i++)G.fumeD.push({a:0,x:0,y:0,z:0,vy:0});sc.add(G.fume);
  var fr=new T.Group();var f1=new T.Mesh(new T.ConeGeometry(1.1,3,18,1,true),new T.MeshBasicMaterial({color:0xffd34d,transparent:true,opacity:.7,side:T.DoubleSide,depthWrite:false}));f1.position.y=1.5;var f2=new T.Mesh(new T.ConeGeometry(.55,1.8,14,1,true),new T.MeshBasicMaterial({color:0xff8a1c,transparent:true,opacity:.85,side:T.DoubleSide,depthWrite:false}));f2.position.y=.9;fr.add(f1);fr.add(f2);fr.visible=false;sc.add(fr);G.fire=fr;G.f1=f1;G.f2=f2;
  var fl2=new T.PointLight(0xffffff,0,34);fl2.position.set(0,11,2);sc.add(fl2);G.flash=fl2;
  var gl2=new T.PointLight(0xff5a1a,0,16);gl2.position.set(0,9,0);sc.add(gl2);G.glow=gl2;
}
 var vesH=0,lumpsKey='';
 function buildVessel(soft){if(!v)return;var sc=v.scene;if(!G.flame){buildScene()}
  var def=VESSEL[S.vessel];
  if(!soft||!vesselG||vesselG.userData.v!==S.vessel){
   if(vesselG)sc.remove(vesselG);vesselG=new T.Group();vesselG.userData.v=S.vessel;lumpsKey='';
   var sup=new T.Group();
   if(S.vessel==='tube'){var pole=C.mesh(new T.CylinderGeometry(.24,.24,30,12),C.std(0xcfd4d8,.22,.95),-7.5,15,-2,true);sup.add(pole);var arm=C.mesh(new T.CylinderGeometry(.17,.17,7.5,10),C.std(0xcfd4d8,.22,.95),-3.7,12.9,-2,true);arm.rotation.z=Math.PI/2;sup.add(arm);var cl=C.mesh(new T.TorusGeometry(1.25,.2,8,20),C.std(0x9aa1a7,.3,.9),0,12.9,-2);cl.rotation.x=Math.PI/2;sup.add(cl);
    var base=C.mesh(new T.BoxGeometry(6,.6,4.6),C.std(0x30343a,.45,.5),-7.5,.3,-2,true);var boss=C.mesh(new T.BoxGeometry(1.1,.9,1.1),C.std(0x9aa1a7,.3,.9),-7.5,12.9,-2,true);sup.add(boss);sup.add(base);vesselG.position.set(0,8.7,0)}
   else{for(var a=0;a<3;a++){var ang=a*2.094+.5,lx=Math.cos(ang)*3.2,lz=Math.sin(ang)*3.2;var leg=C.mesh(new T.CylinderGeometry(.14,.14,8.4,10),C.std(0x4a4f55,.4,.7),lx,4.2,lz,true);sup.add(leg)}
    var rr0=S.vessel==='crucible'?1.75:3.3,ring=C.mesh(new T.TorusGeometry(rr0,.14,8,40),C.std(0x4a4f55,.4,.7),0,S.vessel==='crucible'?8.45:8.3,0);ring.rotation.x=Math.PI/2;sup.add(ring);
    if(S.vessel==='beaker'){var gz=C.mesh(new T.CylinderGeometry(3.2,3.2,.1,40),C.std(0x9fa6ac,.5,.5),0,8.35,0);sup.add(gz)}
    vesselG.position.set(0,S.vessel==='beaker'?8.4:8.55,0)}
   sc.add(sup);G.sup&&sc.remove(G.sup);G.sup=sup;
   var gm=S.vessel==='crucible'?C.std(0xb8aa91,.55):C.glass(0xe0f1ff,.42),pr=[];
   if(S.vessel==='tube'){pr=[[0,0],[.9*.6,.02],[.9,.35],[.9,def.h],[1.05,def.h+.12]]}
   else if(S.vessel==='beaker'){pr=[[0,0],[def.r,0],[def.r,def.h],[def.r+.15,def.h+.1]]}
   else{pr=[[0,0],[.7,0],[1.25,.45],[def.r+.5,def.h],[def.r+.65,def.h+.05]]}
   var vm=new T.Mesh(C.lathe(pr,28),gm);if(S.vessel==='crucible'){vm.material.side=T.DoubleSide;vm.material.emissive=new T.Color(0)}vm.castShadow=true;vesselG.add(vm);G.vm=vm;
   var lq=new T.Mesh(new T.CylinderGeometry(1,1,1,28),new T.MeshPhysicalMaterial({color:0xd9efff,transparent:true,opacity:.35,roughness:.08,depthWrite:false}));vesselG.add(lq);G.lq=lq;
   var sd=new T.Mesh(new T.CylinderGeometry(1,1,1,28),new T.MeshStandardMaterial({color:0xf5c400,roughness:.8}));vesselG.add(sd);G.sd=sd;
   if(S.vessel==='tube'){var st=new T.Group();st.position.y=def.h+.2;st.visible=S.conn;vesselG.add(st);G.stop=st;var sp2=new T.Mesh(new T.CylinderGeometry(.95,.75,.7,16),C.std(0x7a4b2a,.7));sp2.position.y=0;st.add(sp2)}
   else G.stop=null;
   G.th=null;if(EX&&(EX.tools||[]).indexOf('thermo')>=0){var th=new T.Group();var thx=def.r*.5,thh=def.h+(S.vessel==='crucible'?3.2:2.6);var tt=new T.Mesh(new T.CylinderGeometry(.14,.14,thh,12),C.glass(0xe8f4ff,.5));tt.position.set(thx,thh/2-.2+(S.vessel==='tube'?.4:.1),-.1);th.add(tt);var hg=new T.Mesh(new T.CylinderGeometry(.075,.075,1,10),new T.MeshStandardMaterial({color:0xe53935,emissive:0x661111,roughness:.3}));hg.position.set(thx,0,-.1);th.add(hg);var bl=new T.Mesh(new T.SphereGeometry(.24,14,12),new T.MeshStandardMaterial({color:0xe53935,emissive:0x661111,roughness:.3}));bl.position.set(thx,.2,-.1);th.add(bl);th.userData={hg:hg,thh:thh,base:.2};vesselG.add(th);G.th=th}
   G.lumps=new T.Group();vesselG.add(G.lumps);sc.add(vesselG);G.pbase=vesselG.position.y;
  }
  if(G.stop)G.stop.visible=S.conn;if(G.pipe)G.pipe.visible=!!S.conn&&S.vessel==='tube';
 }
 function updLumps(){if(!G.lumps)return;var def=VESSEL[S.vessel],key=S.vessel+'|';var tot=0,arr=[],ptot=0,pr=0,pg=0,pb=0;
  for(var k in S.n){var sp=SP[k];if(sp&&sp.ph==='s'&&S.n[k]>.001){var m=S.n[k]*sp.M;if(sp.pow){ptot+=m;var cc=new T.Color(sp.col);pr+=cc.r*m;pg+=cc.g*m;pb+=cc.b*m}else{tot+=m;arr.push([k,m])}}}
  arr.sort(function(a,b){return b[1]-a[1]});key+=arr.map(function(a){return a[0]+Math.round(a[1]/1.5)}).join(',')+'|p'+Math.round(ptot/.6)+(ptot?(Math.round(pr/ptot*20)+''+Math.round(pg/ptot*20)+Math.round(pb/ptot*20)):'');if(key===lumpsKey)return;lumpsKey=key;
  while(G.lumps.children.length)G.lumps.remove(G.lumps.children[0]);
  var base=(S.vessel==='tube'?.55:.12),rn=function(i){var x=Math.sin(i*127.1+11.7)*43758.5;return x-Math.floor(x)};
  if(ptot>0){var rr=def.r*.8,hh=Math.min(def.h*.45,.25+Math.sqrt(ptot)*.28);var geo=new T.IcosahedronGeometry(1,3),pa=geo.attributes.position;for(var i=0;i<pa.count;i++){var x=pa.getX(i),y=pa.getY(i),z=pa.getZ(i);var nz=1+(rn(i*3.1+Math.floor(x*9))-.5)*.16;pa.setXYZ(i,x*nz,Math.max(y,-.05)*nz,z*nz)}geo.computeVertexNormals();
   var pm=new T.Mesh(geo,new T.MeshStandardMaterial({color:new T.Color(pr/ptot,pg/ptot,pb/ptot),roughness:.96,metalness:0}));pm.scale.set(rr,hh,rr);pm.position.y=base;pm.castShadow=true;pm.userData.k='pow';G.lumps.add(pm);
   for(i=0;i<9;i++){var sm=new T.Mesh(new T.SphereGeometry(.07+rn(i+4)*.06,8,6),pm.material);var a2=rn(i)*6.28,rd=rr*(.3+rn(i+7)*.65);sm.position.set(Math.cos(a2)*rd,base+hh*(.2+rn(i+2)*.4)*(1-rd/rr)+.05,Math.sin(a2)*rd);G.lumps.add(sm)}}
  if(!tot)return;
  var n=clamp(Math.round(tot/.8),4,26),rr2=def.r*.62;
  for(var i2=0;i2<n;i2++){var pick=rn(i2+3)*tot,acc=0,kk=arr[0][0];for(var j=0;j<arr.length;j++){acc+=arr[j][1];if(pick<=acc){kk=arr[j][0];break}}
   var sz=.28+rn(i2+9)*.2+Math.min(.16,tot/70),isF=kk==='Mg'||kk==='Zn'||kk==='Fe'||kk==='Cu';
   var m2=new T.Mesh(isF?new T.BoxGeometry(sz*2.4,sz*.45,sz*.8):new T.DodecahedronGeometry(sz,0),new T.MeshStandardMaterial({color:SP[kk].col||'#ddd',roughness:isF?.3:.9,metalness:isF?.85:0}));
   m2.userData.k=kk;var ang=rn(i2+1)*6.28,rad=Math.sqrt(rn(i2+5))*rr2;m2.position.set(Math.cos(ang)*rad,base+.05+sz*.5+Math.floor(i2/9)*.25+(ptot?.25:0),Math.sin(ang)*rad);m2.rotation.set(rn(i2)*3,rn(i2+2)*3,rn(i2+4)*3);m2.castShadow=true;G.lumps.add(m2)}}
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
  /* لهب الاحتراق فوق الوعاء */
  if(G.fire){var fv=S.fireT>0;G.fire.visible=fv;if(fv){G.fire.position.set(0,pos+def.h-.3,0);var fk2=.8+Math.sin(t*.03)*.15+Math.random()*.12;G.fire.scale.set(1,fk2*(def.r>1.4?1.3:1),1);G.f1.material.color.set(S.fireC||'#ffd34d');G.glow.intensity=Math.max(G.glow.intensity,1.4)}}
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
  if(G.th){var u=G.th.userData,fr2=clamp((S.T-0)/1100,0,1),hh=Math.max(.15,fr2*(u.thh-.6));u.hg.scale.y=hh;u.hg.position.y=u.base+hh/2}
  /* قراءات */
  dispT(S.T);
  var busy=kick>0||S.burner||Math.abs(S.T-25)>.4||S.lightT>0||S.steam>0||S.tube2.bub>0||S.fireT>0||G.bubD.some(function(p){return p.a})||G.fumeD.some(function(p){return p.a});if(kick>0)kick--;return busy}
 if(v)v.onframe=frame;
 var lastUI=0;
 function dispT(Tv){var e=$('lbT');e.firstChild.textContent=Math.round(Tv)+'°';e.classList.toggle('hot',Tv>150);var m=mass(S);$('lbM').firstChild.textContent=m.toFixed(2);var p=$('lbP');if(S.ind&&waterMl(S)>.3){p.hidden=false;p.firstChild.textContent=ph(S).toFixed(1)}else p.hidden=true;var now=performance.now();if(now-lastUI>400){lastUI=now;syncUI()}}
 function syncUI(){$('lbB').textContent=S.burner?'⛔ أطفئ الموقد':'🔥 أشعل الموقد';$('lbB').classList.toggle('on',S.burner);$('lbWire').classList.toggle('on',S.conn);$('lbWire').textContent=S.conn?'✂️ افصل أنبوب ماء الجير':'🔗 صِل أنبوب ماء الجير';selV();
  var ev=$('lbEv');var h='';SIGNS.forEach(function(s){var q=S.signs[s[0]];h+='<div class="'+(q?'on':'')+'"><span>'+(q?'✅':'⬜')+'</span><span><b>'+s[1]+'</b>'+(q?'<br>'+q.d:'')+'</span></div>'});ev.innerHTML=h;
  var eq=$('lbEq'),he='';Object.keys(S.eqs).forEach(function(k){he+='<div>'+S.eqs[k].eq+'<small>'+S.eqs[k].type+'</small></div>'});eq.innerHTML=he;
  var lg=$('lbLog');lg.innerHTML=S.log.slice(-12).reverse().map(function(x){return'<div>• '+x+'</div>'}).join('');
  if(EX){var st=$('lbStp'),hs='',adv=true,i0=-1;EX.steps.forEach(function(q,i){if(!S.sd[i]&&adv&&chk(q.c,S))S.sd[i]=1});EX.steps.forEach(function(q,i){var ok=S.sd[i];var cur=!ok&&i0<0;if(cur)i0=i;hs+='<div class="'+(ok?'ok':cur?'cur':'')+'"><b class="n">'+(ok?'✓':(i+1))+'</b><span>'+q.t+(cur&&q.h?'<small>'+q.h+'</small>':'')+'</span></div>'});if(i0<0)hs+='<div class="fin">🎉 أتممت التجربة. '+(EX.c||'')+'</div>';st.innerHTML=hs}
  if(cfg.missions){var ms=$('lbMs'),hm='';cfg.missions.forEach(function(m){var ok=S.done[m.t]||(m.ok&&m.ok(S));if(ok)S.done[m.t]=1;hm+='<div class="'+(ok?'ok':'')+'">'+(ok?'✅ ':'⬜ ')+m.t+'</div>'});ms.innerHTML=hm}
  if(window.ICONS&&ICONS.strip){}}
 var CT=0;
 if(!v){setInterval(function(){step(S,.1*S.speed);dispT(S.T)},100)}
 function init(){buildVessel();selV();syncUI();$('lbTs').value=S.Tset;if(v){v.dirty=true}}
 init();
 return{state:function(){return S},reset:function(){$('lbClr').onclick()},dispose:function(){try{C.dispose&&C.dispose(v)}catch(e){}}}
}
function mount(root,cfg){if(!cfg||!cfg.exps)return mountLab(root,cfg);var cur=null;
 function pick(){if(cur){cur.dispose();cur=null}var css='.lxp{display:grid;gap:10px;margin:10px 0}.lxp button{text-align:start;padding:12px 14px;border-radius:16px;line-height:1.6}.lxp small{display:block;font-weight:600;opacity:.85}';
  root.innerHTML='<style>'+css+'</style><div class="card"><h3>اختر تجربة</h3><p class="hint" style="margin:0">لكل تجربة خطواتها، وتظهر لك المواد والأدوات اللازمة لها فقط.</p><div class="lxp">'+cfg.exps.map(function(id){var e=EXP[id];return'<button data-id="'+id+'"><b>'+e.title+'</b><small>'+e.goal+'</small></button>'}).join('')+'</div></div>';
  [].forEach.call(root.querySelectorAll('.lxp button'),function(b){b.onclick=function(){open(b.dataset.id)}});if(window.ICONS&&ICONS.conv){}}
 function open(id){root.innerHTML='<div class="bt" style="margin:8px 0"><button id="lxBack">→ تجربة أخرى</button></div><h2 style="margin:6px 0">'+EXP[id].title+'</h2><div id="lxIn"></div>';root.querySelector('#lxBack').onclick=pick;cur=mountLab(root.querySelector('#lxIn'),{exp:EXP[id]})}
 pick()}

function lazy(secId,cfg){var sec=document.getElementById(secId);if(!sec)return;var root=sec.querySelector('.labroot'),done=0;function chk(){if(!done&&!sec.classList.contains('hidden')){done=1;mount(root,cfg)}}try{new MutationObserver(chk).observe(sec,{attributes:true,attributeFilter:['class']})}catch(e){}chk()}
var ALL=Object.keys(SP).filter(function(k){return SP[k].st});
return{ALL:ALL,lazy:lazy,mount:mount,SP:SP,RX:RX,newState:newState,step:step,add:add,ph:ph,mass:mass,cp:cp}
})();
