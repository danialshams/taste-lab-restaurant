"use client";
import React,{useCallback,useEffect,useRef,useState} from "react";
import gsap from "gsap";

export type FoodKind="همه"|"پیتزا"|"برگر"|"ساندویچ"|"پاستا"|"ساید";
export function FoodIcon({kind,size=35}:{kind:FoodKind;size?:number}) {
 const common={stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round" as const,strokeLinejoin:"round" as const,fill:"none"};
 const path:Record<FoodKind,React.ReactNode>={
  "همه":<><circle cx="24" cy="27" r="15.5"/><circle cx="24" cy="27" r="11"/><path d="M9 5v11m3-11v11m3-11v11M12 16v29M40 5v40"/><g className="food-icon-steam" strokeWidth="1.9"><path d="M20 20q-5-5 0-10t0-6"/><path d="M27 19q-5-5 0-10t0-6"/></g></>,
  "پیتزا":<><path d="M8 9Q24 3 40 9L24 43Z"/><path d="M8 9Q24 1 40 9" strokeWidth="4"/><circle cx="24" cy="20" r="3" fill="currentColor" stroke="none"/><circle cx="20" cy="13" r="2.2" fill="currentColor" stroke="none"/><circle cx="29" cy="29" r="2.8" fill="currentColor" stroke="none"/></>,
  "برگر":<><path d="M7 23C9 5 39 5 41 23Z M7 35H41M8 39Q24 44 40 39V43H8Z"/><path d="M4 29Q10 25 16 29T28 29T44 29 M7 33H41"/><path d="M16 15l2 1M25 12l2 1M33 17l2 1"/></>,
  "ساندویچ":<><path d="M6 18 24 7 42 18 24 30Z M6 25 24 37 42 25 M6 18V25 M42 18V25 M24 30V37"/><path d="M7 23 24 34 41 23" strokeDasharray="4 3"/><path d="M11 17 24 25 37 17"/></>,
  "پاستا":<><path d="M8 29Q10 41 24 41T40 29H8Z M5 27H43"/><path d="M17 9q-10 10 0 17 M25 8q-10 9 0 17 M33 9q-10 10 0 17"/></>,
  "ساید":<><path d="M10 22 14 43H35L39 22Z M9 22H40 M14 12v11 M21 7v16 M28 10v13 M35 6v17"/><path d="M16 31H33"/></>
 };
 return <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" className="food-icon" {...common}>{path[kind]}</svg>;
}


const PIZZA_START_KEY="taste-pizza-fan-started-v6";
const PIZZA_FINISH_KEY="taste-pizza-fan-seen-v6";
let pizzaFanStarted=false;

// A single expanding fan-shaped clip reveals seven pre-aligned wedges.
// The source slice never moves; the remaining pieces NEVER translate,
// rotate or scale. No trajectory can produce a detached / scattered slice.
const PIZZA_CX=110;
const PIZZA_CY=110;
const PIZZA_REVEAL_RADIUS=98;
const PIZZA_START_DEG=22.5;
function pizzaFanPoint(angle:number){
 const rad=angle*Math.PI/180;
 return [
  (PIZZA_CX+PIZZA_REVEAL_RADIUS*Math.sin(rad)).toFixed(3),
  (PIZZA_CY-PIZZA_REVEAL_RADIUS*Math.cos(rad)).toFixed(3)
 ];
}
function pizzaFanPath(degrees:number){
 const sweep=Math.max(0,Math.min(315,degrees));
 const p0=pizzaFanPoint(PIZZA_START_DEG);
 if(sweep===0)return "M110 110 L"+p0[0]+" "+p0[1]+" Z";
 const p1=pizzaFanPoint(PIZZA_START_DEG+sweep);
 const largeArc=sweep>180?1:0;
 return "M110 110 L"+p0[0]+" "+p0[1]+" A98 98 0 "+largeArc+" 1 "+p1[0]+" "+p1[1]+" Z";
}
function PizzaWedge({index}:{index:number}){
 const rotate="rotate("+(index*45)+" 110 110)";
 const outer="M 110 110 L 77.1 30.55 A 86 86 0 0 1 142.9 30.55 Z";
 const cheese="M 110 110 L 81.3 40.71 A 75 75 0 0 1 138.7 40.71 Z";
 const crust="M 77.1 30.55 A 86 86 0 0 1 142.9 30.55";
 return <g data-pizza-wedge={index} transform={rotate}>
  <g filter="url(#pizza-fan-shadow-v6)">
   <path d={outer} fill="#b54d29" stroke="#903e23" strokeWidth="1.6"/>
   <path d={cheese} fill="url(#pizza-fan-cheese-v6)" stroke="#f3ce74" strokeWidth="1.4"/>
   <path d={crust} fill="none" stroke="url(#pizza-fan-bread-v6)" strokeWidth="12.5" strokeLinecap="round"/>
   <path d={crust} fill="none" stroke="#ffdda0" strokeWidth="2.3" opacity=".8"/>
   <ellipse cx="110" cy="48" rx="9" ry="9.5" fill="#ba3427" stroke="#ee7b51" strokeWidth="2"/>
   <circle cx="99" cy="76" r="7.6" fill="#ac3024" stroke="#e57940" strokeWidth="1.4"/>
   <circle cx="124" cy="82" r="7.5" fill="#af3422" stroke="#ee7b41" strokeWidth="1.2"/>
   <path d="M113 91Q101 81 98 94Q108 102 113 91 M113 91Q132 86 125 101Q115 102 113 91" fill="#477d38" stroke="#2b6134" strokeWidth="1"/>
   <ellipse cx="91" cy="55" rx="5" ry="2.5" fill="#fff2c1" opacity=".8" transform="rotate(-35 91 55)"/>
   <circle cx="116" cy="65" r="2.8" fill="#ffe7a0"/>
  </g>
 </g>;
}
function PizzaFanDisc(){
 return <svg className="food-pizza-disc food-pizza-fan-v6" viewBox="0 0 220 220" role="img" aria-label="یک برش ثابت در بالا و هفت برش که پیوسته از کنار آن آشکار می‌شوند و یک پیتزای هشت‌تکه می‌سازند">
  <defs>
   <linearGradient id="pizza-fan-cheese-v6" x1="0%" y1="0%" x2="75%" y2="100%">
    <stop offset="0" stopColor="#fff5ba"/><stop offset=".55" stopColor="#f7ba43"/><stop offset="1" stopColor="#e88e29"/>
   </linearGradient>
   <linearGradient id="pizza-fan-bread-v6" x1="0%" y1="0%" x2="80%" y2="100%">
    <stop offset="0" stopColor="#f8c278"/><stop offset=".55" stopColor="#b97039"/><stop offset="1" stopColor="#ed9c43"/>
   </linearGradient>
   <filter id="pizza-fan-shadow-v6" x="-40%" y="-40%" width="180%" height="180%">
    <feDropShadow dx="0" dy="2.4" stdDeviation="2.3" floodColor="#612b18" floodOpacity=".19"/>
   </filter>
   <clipPath id="pizza-fan-reveal-v6" clipPathUnits="userSpaceOnUse">
    <path data-pizza-fan-aperture d={pizzaFanPath(0)}/>
   </clipPath>
  </defs>
  <g clipPath="url(#pizza-fan-reveal-v6)" data-pizza-hidden-wedges>
   {Array.from({length:7},(_,i)=><PizzaWedge index={i+1} key={i+1}/>)}
  </g>
  {/* Draw the first slice last so it always stays visible above the opening fan. */}
  <g data-pizza-fixed-wedge><PizzaWedge index={0}/></g>
 </svg>;
}
export function PizzaIntro({done}:{done:()=>void}){
 const root=useRef<HTMLDivElement>(null);
 const finished=useRef(false);
 const timeline=useRef<ReturnType<typeof gsap.timeline>|null>(null);
 const [show,setShow]=useState(true);
 const finish=useCallback(()=>{
  if(finished.current)return;
  finished.current=true;
  try{sessionStorage.setItem(PIZZA_FINISH_KEY,"1")}catch{}
  timeline.current?.kill();
  setShow(false);
  done();
 },[done]);
 useEffect(()=>{
  const rootEl=root.current;
  if(!rootEl)return;
  let seen=false;
  try{seen=sessionStorage.getItem(PIZZA_FINISH_KEY)==="1"||sessionStorage.getItem(PIZZA_START_KEY)==="1"}catch{}
  if(seen||pizzaFanStarted||window.matchMedia("(prefers-reduced-motion: reduce)").matches){
   const id=requestAnimationFrame(finish);
   return()=>cancelAnimationFrame(id);
  }
  const aperture=rootEl.querySelector<SVGPathElement>("[data-pizza-fan-aperture]");
  if(!aperture){const id=requestAnimationFrame(finish);return()=>cancelAnimationFrame(id)}
  pizzaFanStarted=true;
  try{sessionStorage.setItem(PIZZA_START_KEY,"1")}catch{}
  const fan={degrees:0};
  // Only the aperture path is animated. Every wedge remains fixed in its
  // final 45-degree position and is progressively uncovered from the source.
  const draw=()=>aperture.setAttribute("d",pizzaFanPath(fan.degrees));
  const ctx=gsap.context(()=>{
   const master=gsap.timeline({onComplete:finish});
   for(let slice=1;slice<=7;slice++){
    master.to(fan,{
     degrees:slice*45,
     duration:.37,
     ease:"power1.inOut",
     onUpdate:draw
    });
   }
   master.to(rootEl,{opacity:0,duration:.44,ease:"power2.inOut"},"+=.36");
   timeline.current=master;
  },rootEl);
  return()=>{ctx.revert();timeline.current=null};
 },[finish]);
 if(!show)return null;
 return <div className="food-intro" ref={root} role="status" aria-label="در حال بازشدن هشت برش پیتزا">
  <PizzaFanDisc/>
  <div className="food-intro-word" dir="ltr">TASTE LAB</div>
  <span className="food-intro-caption">یک برش، بعد یکی دیگه؛ تا پیتزا کامل بشه.</span>
  <button type="button" onClick={finish} className="food-intro-skip">عبور از مقدمه</button>
 </div>;
}

export function BurgerIllustration(){
 return <svg className="food-burger-art" viewBox="0 0 520 540" role="img" aria-label="لایه‌های برگر که هنگام ورود به بخش خودکار از بالا کنار هم قرار می‌گیرند">
 <defs>
  <linearGradient id="bun" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f8c379"/><stop offset=".55" stopColor="#df923c"/><stop offset="1" stopColor="#be712e"/></linearGradient>
  <linearGradient id="meat" x1="0" y1="0" x2=".5" y2="1"><stop stopColor="#723720"/><stop offset="1" stopColor="#3f1d18"/></linearGradient>
  <filter id="burgerDrop" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#4b2418" floodOpacity=".24"/></filter>
 </defs>
 <ellipse cx="260" cy="461" rx="175" ry="19" fill="#a04d23" opacity=".18"/>
 <g className="food-burger-layer" data-layer="bottom" filter="url(#burgerDrop)"><path d="M99 383Q259 405 421 383L407 434Q255 455 113 434Z" fill="url(#bun)" stroke="#b66732" strokeWidth="4"/><path d="M119 426Q258 446 399 426" stroke="#ffdfa3" strokeWidth="7" fill="none" opacity=".85"/></g>
 <g className="food-burger-layer" data-layer="patty" filter="url(#burgerDrop)"><path d="M99 347Q140 337 260 343Q374 336 422 345L424 377Q374 392 260 384Q157 390 94 374Z" fill="url(#meat)" stroke="#422015" strokeWidth="4"/><path d="M120 354q50 9 95 3t98 1 81-4" stroke="#9c5b32" strokeWidth="5" fill="none" opacity=".8"/></g>
 <g className="food-burger-layer" data-layer="cheese" filter="url(#burgerDrop)"><path d="M93 325L160 311 256 322 348 309 423 324 410 350 375 348 356 364 330 342 264 351 218 340 190 360 158 340 126 348Z" fill="#ffd34a" stroke="#e4a72e" strokeWidth="2"/></g>
 <g className="food-burger-layer" data-layer="tomato" filter="url(#burgerDrop)"><path d="M113 298Q260 277 414 297L423 322Q257 343 98 319Z" fill="#ef5940" stroke="#b7382b" strokeWidth="3"/><path d="M132 312q111-19 253 0" stroke="#ffae84" strokeWidth="4" fill="none"/></g>
 <g className="food-burger-layer" data-layer="lettuce" filter="url(#burgerDrop)"><path d="M99 296Q122 272 149 280T208 274T270 282T326 274T389 280T423 294L434 306Q410 292 391 309T341 301T283 311T222 302T160 310T102 305Z" fill="#6c9e4c" stroke="#3a6e33" strokeWidth="3"/><path d="M129 296Q259 287 392 297" stroke="#b4d27b" strokeWidth="3" fill="none"/></g>
 <g className="food-burger-layer" data-layer="top" filter="url(#burgerDrop)"><path d="M99 277C108 177 182 154 260 154C349 154 410 185 420 277Q260 300 99 277Z" fill="url(#bun)" stroke="#b87331" strokeWidth="4"/><path d="M112 270Q258 290 410 270" stroke="#fff0b4" strokeWidth="7" opacity=".8" fill="none"/>
  {[[172,218],[215,201],[261,215],[307,192],[348,223],[194,240],[288,244],[326,250]].map(([cx,cy],i)=><ellipse key={i} cx={cx} cy={cy} rx="7" ry="2.8" fill="#fff3cc" transform={`rotate(-25 ${cx} ${cy})`}/>)}
 </g>
 </svg>;
}
