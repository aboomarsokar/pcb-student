/* أيقونات علمية مرسومة (SVG) تحلّ محل الإيموجي في كل التطبيق والدروس */
(function(){
var S='fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"';
var I={
 atom:'<ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/>',
 flask:'<path d="M9 3h6M10 3v6l-5.2 9.2A2 2 0 0 0 6.6 21h10.8a2 2 0 0 0 1.8-2.8L14 9V3"/><path d="M7.4 15h9.2"/>',
 tube:'<path d="M8 3h8M9 3v15a3 3 0 0 0 6 0V3"/><path d="M9 12h6"/>',
 beaker:'<path d="M6 3h12M7 3v16a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V3"/><path d="M7 12h10M7 8h3M7 16h3"/>',
 dna:'<path d="M7 3c0 5 10 5 10 9s-10 4-10 9"/><path d="M17 3c0 5-10 5-10 9s10 4 10 9"/><path d="M9 6.5h6M8.5 12h7M9 17.5h6"/>',
 cell:'<path d="M12 3c5 0 9 3.6 9 8.5S17.500 21 12 21 3 17 3 11.500 7 3 12 3z"/><circle cx="10" cy="11" r="3"/><circle cx="16" cy="15.500" r="1.200"/><circle cx="15.500" cy="8" r="1"/>',
 microscope:'<path d="M9.500 3.500l3 1.200-2.500 6-3-1.200z"/><path d="M11.500 11a5.500 5.500 0 0 1 4.500 5.500"/><path d="M6 21h12M10 21v-2.500h6V21M8 14.500l1.500 2.500"/>',
 wave:'<path d="M2 12c2.500-7 4.500-7 6.500 0s4 7 6.500 0 4-7 6.500 0"/>',
 vector:'<path d="M4 20L20 4M20 4h-7M20 4v7"/>',
 bulb:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.500 10.800c.8.700 1 1.400 1 2.200h5c0-.8.200-1.500 1-2.200A6 6 0 0 0 12 3z"/>',
 book:'<path d="M4 5a2 2 0 0 1 2-2h13v15H6a2 2 0 0 0-2 2V5z"/><path d="M4 20a2 2 0 0 0 2 1h13v-3M8 7h7"/>',
 books:'<path d="M4 4h4v16H4zM10 4h4v16h-4z"/><path d="M16.500 5.500l3.700-1 3 14.500-3.700 1z" transform="translate(-2.500 0)"/>',
 check:'<path d="M4 12.500l5 5L20 6.500"/>',
 cross:'<path d="M6 6l12 12M18 6L6 18"/>',
 checkc:'<circle cx="12" cy="12" r="9.500"/><path d="M7.500 12.500l3 3 6-6.500"/>',
 crossc:'<circle cx="12" cy="12" r="9.500"/><path d="M8.500 8.500l7 7M15.500 8.500l-7 7"/>',
 lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/><circle cx="12" cy="16" r="1.200" fill="currentColor"/>',
 medal:'<circle cx="12" cy="14" r="6"/><path d="M8.500 2.500L12 9l3.500-6.500M12 11.500l1 2 2.200.300-1.600 1.500.400 2.200-2-1.100-2 1.100.400-2.200-1.600-1.500 2.200-.300z"/>',
 trophy:'<path d="M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 14v4M8 21h8M9.500 18h5"/>',
 star:'<path d="M12 3l2.700 5.600 6.100.9-4.400 4.300 1 6.100L12 17l-5.400 2.900 1-6.100L3.200 9.500l6.100-.9z"/>',
 target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.200" fill="currentColor"/>',
 rocket:'<path d="M12 3c3.500 2 5.500 6 5 11l-2.500 2h-5L7 14c-.5-5 1.500-9 5-11z"/><circle cx="12" cy="10" r="1.800"/><path d="M9.500 16l-2 4M14.500 16l2 4M12 17v4"/>',
 pencil:'<path d="M4 20l1-4L16.500 4.500a2 2 0 0 1 3 3L8 19z"/><path d="M14.500 6.500l3 3"/>',
 notes:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8.500 8h7M8.500 12h7M8.500 16h4"/>',
 bell:'<path d="M6 16V11a6 6 0 0 1 12 0v5l1.500 2h-15z"/><path d="M10 20.500a2 2 0 0 0 4 0"/>',
 user:'<circle cx="12" cy="8" r="4"/><path d="M4.500 21a7.500 7.500 0 0 1 15 0"/>',
 home:'<path d="M3.500 11L12 4l8.500 7M6 10v10h12V10M10 20v-5h4v5"/>',
 moon:'<path d="M20 14.500A8.500 8.500 0 0 1 9.500 4 8.500 8.500 0 1 0 20 14.500z"/>',
 camera:'<path d="M4 8h3l1.500-2.500h7L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.500"/>',
 share:'<circle cx="6" cy="12" r="2.300"/><circle cx="18" cy="6" r="2.300"/><circle cx="18" cy="18" r="2.300"/><path d="M8 11l8-4M8 13l8 4"/>',
 trash:'<path d="M4 7h16M9 7V4h6v3M6.500 7l1 13h9l1-13M10 11v6M14 11v6"/>',
 link:'<path d="M10 14a4.500 4.500 0 0 0 6.400 0l3-3a4.500 4.500 0 0 0-6.400-6.400l-1 1"/><path d="M14 10a4.500 4.500 0 0 0-6.400 0l-3 3a4.500 4.500 0 0 0 6.400 6.400l1-1"/>',
 gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2.500v3M12 18.500v3M2.500 12h3M18.500 12h3M5.300 5.300l2.100 2.100M16.600 16.600l2.100 2.100M5.300 18.700l2.100-2.100M16.600 7.400l2.100-2.100"/>',
 chart:'<path d="M4 20V4M4 20h16"/><path d="M8 16v-5M12.500 16V8M17 16v-8"/>',
 trend:'<path d="M4 18l5-6 4 3 7-9"/><path d="M14.500 6H20v5.500"/>',
 ruler:'<rect x="3" y="8" width="18" height="8" rx="1.500" transform="rotate(-25 12 12)"/><path d="M8 12l1 .5M11 10.500l1 .5M14 9l1 .5M5.500 13.700l.8.4" transform="rotate(-25 12 12)"/>',
 sound:'<path d="M4 9.500v5h4l5 4v-13l-5 4z"/><path d="M16.500 9a4 4 0 0 1 0 6M19 6.500a8 8 0 0 1 0 11"/>',
 mute:'<path d="M4 9.500v5h4l5 4v-13l-5 4z"/><path d="M17 9.500l4 5M21 9.500l-4 5"/>',
 scale:'<path d="M12 3v18M6 21h12M4 7h16"/><path d="M4 7l-2.500 6a3 3 0 0 0 5 0zM20 7l-2.500 6a3 3 0 0 0 5 0z" transform="translate(-0.5 0)"/>',
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
 leaf:'<path d="M5 19C5 10 10 5 20 4c0 10-5 15-14 15z"/><path d="M5 19l8-8"/>',
 paw:'<circle cx="7" cy="9" r="1.800"/><circle cx="12" cy="6.500" r="1.800"/><circle cx="17" cy="9" r="1.800"/><path d="M12 12c-3 0-5.500 3.500-4 6 1 1.500 3 1 4 1s3 .5 4-1c1.500-2.500-1-6-4-6z"/>',
 bone:'<path d="M7 6.500a2.300 2.300 0 1 0-3.500 3L14.500 20.500a2.300 2.300 0 1 0 3-3L6.500 6.500z" transform="translate(1 0)"/>',
 brain:'<path d="M9.500 4A3.500 3.500 0 0 0 6 7.500 3.500 3.500 0 0 0 4 11a3.500 3.500 0 0 0 2 3.200A3.500 3.500 0 0 0 9.500 20H12V4zM14.500 4A3.500 3.500 0 0 1 18 7.500 3.500 3.500 0 0 1 20 11a3.500 3.500 0 0 1-2 3.200A3.500 3.500 0 0 1 14.500 20H12"/>',
 drop:'<path d="M12 3s6.500 6.500 6.500 11a6.500 6.500 0 0 1-13 0C5.500 9.500 12 3 12 3z"/>',
 flame:'<path d="M12 3c1 4 5 5.500 5 10.500a5 5 0 0 1-10 0c0-2 1-3.500 2.500-4.500 0 1.500.5 2.500 1.500 3 0-3-.5-5.500 1-9z"/>',
 cube:'<path d="M12 3l8 4.500v9L12 21l-8-4.500v-9z"/><path d="M12 12l8-4.500M12 12v9M12 12L4 7.500"/>',
 calc:'<rect x="5" y="3" width="14" height="18" rx="2"/><rect x="8" y="6" width="8" height="3.500"/><path d="M8.500 13h.01M12 13h.01M15.500 13h.01M8.500 16.500h.01M12 16.500h.01M15.500 16.500h.01"/>',
 search:'<circle cx="10.500" cy="10.500" r="6.500"/><path d="M15.500 15.500L21 21"/>',
 compass:'<circle cx="12" cy="12" r="9"/><path d="M15.500 8.500l-2 5-5 2 2-5z"/>',
 think:'<circle cx="12" cy="10" r="7"/><path d="M9.500 9.500a2.500 2.500 0 1 1 3.500 2.300c-.8.400-1 1-1 1.700M12 16.500h.01M12 17v.01"/><path d="M9 21h6"/>',
 puzzle:'<path d="M10 4h4v2.500a1.800 1.800 0 1 1 0 3.500V12h-4v-2a1.800 1.800 0 1 0 0-3.500V4zM4 12h4v4H4zM12 12h4v8h-4z"/>',
 flag:'<path d="M5 21V4M5 4h12l-2 4 2 4H5"/>',
 clip:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9zM8.500 12h7M8.500 16h5"/>',
 save:'<path d="M5 4h11l3 3v13H5z"/><path d="M8 4v5h7V4M8 20v-6h8v6"/>',
 magnet:'<path d="M5 3v8a7 7 0 0 0 14 0V3h-4v8a3 3 0 0 1-6 0V3z"/><path d="M5 7h4M15 7h4"/>',
 battery:'<rect x="3" y="8" width="16" height="8" rx="2"/><path d="M21 11v2M7 11v2M11 11v2"/>',
 run:'<circle cx="14" cy="4.500" r="2"/><path d="M12 8l-3 4 3 2v6M12 8l4 3 3 1M9 12l-4 1M12 14l4 2"/>',
 pin:'<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.500"/>',
 hand:'<path d="M8 12V6a1.500 1.500 0 0 1 3 0v5M11 11V4.500a1.500 1.500 0 0 1 3 0V11M14 11V6a1.500 1.500 0 0 1 3 0v8a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-3l-2-4a1.500 1.500 0 0 1 2.500-1.500L8 14"/>',
 down:'<path d="M12 4v15M6 13l6 6 6-6"/>',
 up:'<path d="M12 20V5M6 11l6-6 6 6"/>',
 warn:'<path d="M12 3.500L22 20H2z"/><path d="M12 10v4.500M12 17.500v.01"/>',
 mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.500 11a6.500 6.500 0 0 0 13 0M12 17.500V21"/>',
 school:'<path d="M3 10l9-5 9 5-9 5z"/><path d="M7 12.500V17c0 1.500 2.500 3 5 3s5-1.500 5-3v-4.500"/>',
 film:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 9.500l5 2.500-5 2.500zM3 9h2M3 15h2M19 9h2M19 15h2"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 grad:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.500V16c0 1.500 3 3 6 3s6-1.500 6-3v-4.500M22 9v6"/>',
 spark:'<path d="M12 3l1.800 5.200L19 10l-5.200 1.800L12 17l-1.800-5.200L5 10l5.200-1.800zM18 15l.8 2.200 2.200.8-2.200.8L18 21l-.8-2.200L15 18l2.200-.8z"/>',
 robot:'<rect x="5" y="8" width="14" height="11" rx="3"/><path d="M12 4v4M9 13h.01M15 13h.01M9.500 16.500h5M3 12.500v3M21 12.500v3"/><circle cx="12" cy="3.500" r="1" fill="currentColor"/>',
 venus:'<circle cx="12" cy="9" r="5"/><path d="M12 14v8M8.500 18h7"/>',
 mars:'<circle cx="10" cy="14" r="5.500"/><path d="M14 10l6-6M14.500 4H20v5.500"/>',
 dnaup:'<path d="M12 3v18M6 8c4 2 8 2 12 0M6 16c4-2 8-2 12 0"/>',
 chip:'<rect x="6" y="6" width="12" height="12" rx="1.500"/><rect x="9.500" y="9.500" width="5" height="5"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>',
 dot:'<circle cx="12" cy="12" r="8" fill="currentColor" stroke="none"/>',
 id:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M6.500 16c.5-1.800 1.500-2.500 2.500-2.500s2 .7 2.500 2.500M14 10h4M14 13.500h3"/>',
 therm:'<path d="M10 14V5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0z"/><path d="M12 9v7"/>',
 bacteria:'<rect x="4" y="9" width="16" height="6" rx="3" transform="rotate(-30 12 12)"/><path d="M5 17l-1.500 1.500M19 7l1.500-1.500M8 19l-.5 2M16 5l.5-2" />',
 meditate:'<circle cx="12" cy="5" r="2"/><path d="M12 8v5M7 21l5-8 5 8M4 12c3 1 5 1 8 1s5 0 8-1"/>',
 brick:'<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 10h18M3 15h18M9 5v5M15 10v5M9 15v4"/>',
 oil:'<path d="M12 3s6 6 6 11a6 6 0 0 1-12 0c0-5 6-11 6-11z"/><path d="M9 15a3 3 0 0 0 3 3"/>',
 factory:'<path d="M3 21V10l6 4V10l6 4V6h4v15z"/><path d="M7 17h2M12 17h2M17 17h.01"/>',
 stone:'<path d="M4 17l3-8 5-3 6 4 2 7-4 3H8z"/>',
 sunmed:'<circle cx="12" cy="12" r="4"/><path d="M12 2.500v3M12 18.500v3M2.500 12h3M18.500 12h3"/>',
 paper:'<path d="M5 3h10l4 4v14H5z"/><path d="M15 3v4h4M8.500 12h7M8.500 16h5"/>',
 box:'<path d="M3 7.500L12 3l9 4.500v9L12 21l-9-4.500z"/><path d="M3 7.500l9 4.500 9-4.500M12 12v9"/>',
 basket:'<path d="M4 10h16l-1.800 9a2 2 0 0 1-2 1.600H7.800a2 2 0 0 1-2-1.600z"/><path d="M8 10l3-6M16 10l-3-6M9 14v3M12 14v3M15 14v3"/>',
 wave2:'<path d="M2 9c2-2.500 4-2.500 6 0s4 2.500 6 0 4-2.500 6 0"/><path d="M2 14c2-2.500 4-2.500 6 0s4 2.500 6 0 4-2.500 6 0"/><path d="M2 19c2-2.500 4-2.500 6 0s4 2.500 6 0 4-2.500 6 0"/>',
 ramp:'<path d="M3 20h18L3 7z"/><path d="M8 20v-4M13 20v-7"/>',
 car:'<path d="M3 15v-3l2-5h14l2 5v3z"/><path d="M3 12h18"/><circle cx="7.500" cy="16.500" r="1.800"/><circle cx="16.500" cy="16.500" r="1.800"/>',
 cart:'<path d="M3 4h2.500l2 11h10l2-8H7"/><circle cx="9" cy="19" r="1.500"/><circle cx="17" cy="19" r="1.500"/>',
 crane:'<path d="M4 21V5l12 0M4 9l8-4M16 5v7"/><path d="M14 12h4v3h-4zM2 21h12"/>',
 lifebuoy:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.500"/><path d="M5.600 5.600l3.900 3.900M14.500 14.500l3.900 3.900M18.400 5.600l-3.900 3.900M9.500 14.500l-3.900 3.900"/>',
 wind:'<path d="M3 8h11a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h8"/>',
 bolt2:'<path d="M7 3h10l2 4-2 2v12H7V9L5 7z"/><path d="M9 12h6M9 16h6"/>',
 stopwatch:'<circle cx="12" cy="13" r="8"/><path d="M12 13V8.500M9.500 2.500h5M12 2.500V5M18.500 6l1.500-1.500"/>',
 parachute:'<path d="M3 11a9 9 0 0 1 18 0c-1.500-1.500-3.500-1.500-4.500 0-1-1.500-3.500-1.500-4.500 0-1-1.500-3.500-1.500-4.500 0-1-1.500-3-1.500-4.500 0z"/><path d="M5 11.500l7 8.500 7-8.500M12 11v9"/>',
 ring:'<circle cx="12" cy="12" r="8.500"/>',
 stone:'<ellipse cx="12" cy="16" rx="8" ry="4"/><path d="M5 16v-3a7 4 0 0 1 14 0v3M10 7.500h4v-3h-4z"/>',
 skate:'<path d="M6 4h6v9l7 2v3H5z"/><path d="M3 21h18"/>',
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-3 3-3 15 0 18M12 3c3 3 3 15 0 18"/>',
 spiral:'<path d="M12 12a1.500 1.500 0 1 1 1.500 1.500 3.500 3.500 0 1 1-3.500-3.500 5.500 5.500 0 1 1-5.500 5.500 7.500 7.500 0 1 1 7.500 7.500"/>',
 triruler:'<path d="M4 20V4l16 16z"/><path d="M4 9h3M4 13h5M8 20v-3M12 20v-5"/>'
};
var MAP={'📦':'box','🧺':'basket','🌊':'wave2','🪜':'ramp','🚗':'car','🛒':'cart','🏗':'crane','🛟':'lifebuoy','🌬':'wind','🔩':'bolt2','⏱':'stopwatch','🪂':'parachute','⭕':'ring','🥌':'stone','⛸':'skate','🌍':'globe','🌀':'spiral','📐':'triruler','🔒':'lock','🔓':'lock','✍':'pencil','✏':'pencil','🧪':'tube','⚗':'flask','🧫':'bacteria','📝':'notes','📋':'clip','📄':'paper','🟢':['dot','#2e9b4f'],'🟡':['dot','#d8a100'],'🔴':['dot','#d63c3c'],'🔵':['dot','#1e6fd9'],'🟣':['dot','#8e24aa'],'🟠':['dot','#ef6c00'],'⚪':['dot','#cfd8dc'],'⚫':['dot','#37474f'],'🖼':'film','🔬':'microscope','✅':'checkc','❌':'crossc','✔':'check','🧬':'dna','💡':'bulb','⚛':'atom','🗑':'trash','🧮':'calc','📘':'book','📖':'book','📕':'book','📚':'books','⚡':'vector','📤':'share','📲':'share','📊':'chart','📈':'trend','⚙':'gear','🔎':'search','🔍':'search','🔄':'wave','🔁':'wave','🎯':'target','⚖':'scale','✘':'cross','📌':'pin','📍':'pin','🚀':'rocket','📷':'camera','📸':'camera','⭐':'star','🌟':'star','✨':'spark','🎓':'grad','👤':'user','🧩':'puzzle','🏁':'flag','🔔':'bell','➕':'plus','🏆':'trophy','🌙':'moon','🎬':'film','🔗':'link','👨':'user','👦':'user','🧭':'compass','🎖':'medal','🏅':'medal','🔥':'flame','📏':'ruler','🏠':'home','👆':'hand','👇':'down','⬆':'up','🔭':'microscope','💪':'medal','🧽':'brick','🤖':'robot','🔢':'calc','🧊':'cube','🧴':'tube','💧':'drop','🏭':'factory','🦴':'bone','🪪':'id','🌡':'therm','🤔':'think','🔊':'sound','🔇':'mute','💭':'think','⚥':'venus','♀':'venus','♂':'mars','🏃':'run','🔋':'battery','🧲':'magnet','🚪':'home','💾':'save','🧠':'brain','🏫':'school','✋':'hand','🎤':'mic','🌐':'globe','🍎':'leaf','⚠':'warn','🎉':'spark','🛢':'oil','🪨':'stone','🐾':'paw','🌿':'leaf','🧘':'meditate','🧱':'brick','💻':'chip','🔹':'dot','🔸':'dot','🟦':['dot','#1e6fd9'],'🟥':['dot','#d63c3c'],'🟩':['dot','#2e9b4f']};
var RE=/(?:\p{Extended_Pictographic}[\u{1F3FB}-\u{1F3FF}️]*(?:‍\p{Extended_Pictographic}[\u{1F3FB}-\u{1F3FF}️]*)*)|[\u{1F3FB}-\u{1F3FF}]|️/gu;
function key(ch){return ch.replace(/[️\u{1F3FB}-\u{1F3FF}]/gu,'')}
function svg(name,col){var body=I[name]||I.dot;return '<svg class="ei" viewBox="0 0 24 24" '+S+(col?' style="color:'+col+'"':'')+' aria-hidden="true">'+body+'</svg>'}
function html(ch){var k=key(ch);if(!k)return '';var m=MAP[k]||MAP[Array.from(k)[0]];if(!m)return '';return Array.isArray(m)?svg(m[0],m[1]):svg(m)}
window.ICONS={body:function(n){return I[n]||I.dot},svg:svg,names:Object.keys(I),html:html,map:MAP,strip:function(s){return String(s).replace(RE,'')}};
var st=document.createElement('style');st.textContent='.ei{width:1.12em;height:1.12em;vertical-align:-.2em;display:inline-block;flex:none;overflow:visible}';(document.head||document.documentElement).appendChild(st);
var SKIP={SCRIPT:1,STYLE:1,TEXTAREA:1,INPUT:1,OPTION:1,TITLE:1,CANVAS:1,NOSCRIPT:1};
function convText(t){var s=t.nodeValue;RE.lastIndex=0;if(!RE.test(s))return;var out='',last=0,m;RE.lastIndex=0;while((m=RE.exec(s))){out+=esc(s.slice(last,m.index))+html(m[0]);last=m.index+m[0].length}out+=esc(s.slice(last));var sp=document.createElement('span');sp.className='ew';sp.style.display='contents';sp.innerHTML=out;if(t.parentNode)t.parentNode.replaceChild(sp,t)}
function conv(root){if(!root||!root.isConnected&&root!==document.body)return;if(root.nodeType===3){if(root.parentNode&&!SKIP[root.parentNode.nodeName])convText(root);return}if(root.nodeType!==1||SKIP[root.nodeName])return;
  var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){var p=n.parentNode;if(!p||SKIP[p.nodeName])return NodeFilter.FILTER_REJECT;RE.lastIndex=0;return RE.test(n.nodeValue)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),list=[],n;while(n=w.nextNode())list.push(n);list.forEach(convText)}
function esc(x){return x.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
var queue=[],tm=0,hasE=/[\u2190-\u2BFF\u{1F000}-\u{1FAFF}\uFE0F]/u;
function flush(){tm=0;var q=queue;queue=[];var seen=new Set();for(var i=0;i<q.length;i++){var n=q[i];if(seen.has(n))continue;seen.add(n);try{conv(n)}catch(e){}}}
function schedule(){if(!tm)tm=requestAnimationFrame(flush)}
function start(){queue.push(document.body);schedule();
  try{new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var m=ms[i];if(m.type==='characterData'){if(m.target.nodeValue&&hasE.test(m.target.nodeValue)){queue.push(m.target);schedule()}}else{for(var k=0;k<m.addedNodes.length;k++){var a=m.addedNodes[k];if(a.nodeType===1&&a.classList&&a.classList.contains('ew'))continue;if(a.nodeType===3&&!(a.nodeValue&&hasE.test(a.nodeValue)))continue;queue.push(a);schedule()}}}}).observe(document.body,{childList:true,subtree:true,characterData:true})}catch(e){}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
