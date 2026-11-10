
"use client";
import React from "react";
const noodles=[
 "M307 277 C288 256 303 232 327 246 S370 275 349 300 S299 328 295 306",
 "M327 256 C351 240 372 251 382 273 S378 309 351 312 S308 305 323 285",
 "M278 292 C279 264 293 250 316 263 S349 297 329 315 S282 324 275 311",
 "M345 280 C361 262 400 271 404 294 S382 330 348 323 S327 299 345 280",
 "M296 320 C279 331 285 351 311 349 S350 327 366 339 S393 337 391 316",
 "M337 344 C321 326 336 305 357 314 S370 351 343 361 S296 348 315 337",
 "M275 308 C266 335 284 358 310 357 S342 347 348 332 S373 312 386 322",
 "M371 290 C391 284 410 308 398 328 S362 343 345 332 S325 314 330 304",
 "M301 276 C313 249 338 246 344 260 S344 288 323 296 S296 304 301 321",
 "M279 302 C292 290 318 296 313 319 S288 340 300 350 S338 355 342 337",
 "M358 267 C379 257 394 271 390 285 S370 308 353 295 S336 276 358 267",
 "M332 315 C351 294 377 303 373 320 S352 339 327 335 S301 318 315 305"
];
export default function PastaRitual(){
 return <section className="food-pasta-ritual" aria-labelledby="pasta-ritual-title" id="pasta-ritual">
  <span className="food-pasta-index" dir="ltr">04 / A LITTLE ITALIAN RITUAL</span>
  <div className="food-pasta-scene" aria-hidden="true">
   <svg className="food-pasta-art" viewBox="0 0 700 620" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="سفره گرد، بشقاب، قاشق و چنگال و رشته‌های ماکارونی">
    <defs>
     <radialGradient id="pasta-cloth" cx="40%" cy="35%" r="72%"><stop stopColor="#e95c4d"/><stop offset=".65" stopColor="#bc3b34"/><stop offset="1" stopColor="#943129"/></radialGradient>
     <radialGradient id="pasta-plate" cx="47%" cy="37%" r="75%"><stop stopColor="#fffef9"/><stop offset=".63" stopColor="#f4efe7"/><stop offset="1" stopColor="#d1c6b6"/></radialGradient>
     <linearGradient id="pasta-steel" x1="0%" y1="0%" x2="100%" y2="0%"><stop stopColor="#75878e"/><stop offset=".45" stopColor="#e4e9e7"/><stop offset=".73" stopColor="#b0bfc1"/><stop offset="1" stopColor="#65777b"/></linearGradient>
     <filter id="pasta-shadow" x="-35%" y="-35%" width="170%" height="170%"><feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#40271c" floodOpacity=".25"/></filter>
     <clipPath id="pasta-rim-clip"><circle cx="350" cy="300" r="180"/></clipPath>
    </defs>
    <ellipse cx="350" cy="326" rx="245" ry="234" fill="#7b1f1c" opacity=".07"/>
    <g className="food-pasta-cloth">
      <circle cx="350" cy="300" r="247" fill="url(#pasta-cloth)"/>
      <circle cx="350" cy="300" r="235" stroke="#ffb9a6" strokeWidth="1" strokeDasharray="8 8" fill="none" opacity=".65"/>
      <circle cx="350" cy="300" r="223" stroke="#ea7968" strokeWidth="1" fill="none" opacity=".4"/>
      {Array.from({length:14},(_,i)=><path key={i} d="M350 62L350 101" stroke="#f6b9aa" strokeWidth="1.4" opacity=".4" transform={"rotate("+(i*360/14)+" 350 300)"}/>)}
    </g>

    {/* Filled, continuous cutlery silhouettes: four fork tines, long solid
        handles and highlights—not thin unrecognizable strokes. */}
    <g className="food-pasta-fork" filter="url(#pasta-shadow)">
      <path d="M94 239 Q94 232 101 232 Q108 232 108 239 L109 483 Q109 495 101 495 Q93 495 93 483Z" fill="url(#pasta-steel)" stroke="#6a7e81" strokeWidth="1.5"/>
      <path d="M78 214 Q76 241 91 253 H110 Q126 241 124 214 L116 213 Q115 229 107 236 H94 Q86 229 86 213Z" fill="url(#pasta-steel)" stroke="#6b7d7e" strokeWidth="1.2"/>
      {Array.from({length:4},(_,i)=><rect key={i} x={77+i*12} y="157" width="8" height="69" rx="4" fill="url(#pasta-steel)" stroke="#869a9a" strokeWidth=".6"/>)}
      <path d="M98 256V473" stroke="#f8fbf9" strokeWidth="2.2" opacity=".8" strokeLinecap="round"/>
      <ellipse cx="101" cy="483" rx="3" ry="3" fill="#ecf3f0"/>
    </g>
    <g className="food-pasta-spoon" filter="url(#pasta-shadow)">
      <path d="M603 254 Q603 246 611 246 Q619 246 619 254 L619 483 Q619 495 611 495 Q603 495 603 483Z" fill="url(#pasta-steel)" stroke="#667b80" strokeWidth="1.5"/>
      <path d="M611 134 C576 134 576 193 588 226 Q596 251 611 253 Q626 251 634 226 C646 193 646 134 611 134Z" fill="url(#pasta-steel)" stroke="#63767b" strokeWidth="2"/>
      <ellipse cx="611" cy="191" rx="20" ry="46" fill="#72858a" opacity=".4"/>
      <path d="M603 153 Q589 170 598 210" stroke="#f7faf8" strokeWidth="3" opacity=".8" fill="none" strokeLinecap="round"/>
      <path d="M608 257V475" stroke="#f8fbf9" strokeWidth="2.2" opacity=".8" strokeLinecap="round"/>
      <ellipse cx="611" cy="483" rx="3" ry="3" fill="#edf3f0"/>
    </g>
    <g className="food-pasta-plate" filter="url(#pasta-shadow)">
      <circle cx="350" cy="300" r="187" fill="url(#pasta-plate)"/>
      <circle cx="350" cy="300" r="169" fill="none" stroke="#c8c3b7" strokeWidth="2"/>
      <circle cx="350" cy="300" r="153" fill="#f8f4ea" stroke="#ddd5c9" strokeWidth="5"/>
      <ellipse cx="350" cy="310" rx="132" ry="113" fill="#e3d8c8" opacity=".52"/>
      <ellipse cx="351" cy="306" rx="117" ry="96" fill="#c8432e" opacity=".16"/>
    </g>
    <g className="food-pasta-food" clipPath="url(#pasta-rim-clip)">
     <g className="food-pasta-sauce">
      <path d="M275 293Q284 251 347 256Q411 249 425 298Q432 353 371 365Q291 374 271 334Z" fill="#c64e2f" opacity=".84"/>
      <path d="M299 283Q348 263 400 291Q430 322 385 342Q317 351 292 315" fill="none" stroke="#ee8e40" strokeWidth="15" opacity=".72"/>
     </g>
     {noodles.map((d,i)=><g className="food-pasta-noodle" data-noodle={i} key={i}>
       <path d={d} stroke="#ae6d22" strokeWidth="14" strokeLinecap="round" fill="none" opacity=".72" transform="translate(1 3)"/>
       <path d={d} stroke={i%3===0?"#ffcd68":"#f8d983"} strokeWidth={i%2===0?10:11} strokeLinecap="round" strokeLinejoin="round" fill="none"/>
       <path d={d} stroke="#fff0b1" strokeWidth="2.1" strokeLinecap="round" fill="none" opacity=".75"/>
     </g>)}
     <g className="food-pasta-garnish">
      <path d="M350 294Q343 267 320 270Q322 291 350 294M350 294Q364 270 383 278Q380 297 350 294M350 294Q349 312 372 322Q378 300 350 294" fill="#478348" stroke="#256e3d" strokeWidth="2"/>
      <path d="M350 294L326 277M350 294L374 284M350 294L367 315" fill="none" stroke="#b0d081" strokeWidth="1.5"/>
      <circle cx="305" cy="318" r="8" fill="#d43f2d"/><circle cx="395" cy="316" r="7" fill="#d43f2d"/>
      <circle cx="385" cy="280" r="4" fill="#eee5cc"/>
     </g>
    </g>

    {/* Visible rising steam begins only after the spaghetti is assembled. */}
    <g className="food-pasta-steam" fill="none" stroke="#9e6749" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M305 239 C288 220 322 207 305 187 S318 157 308 145"/>
      <path d="M352 237 C331 217 370 205 351 183 S365 154 350 137"/>
      <path d="M397 239 C383 219 412 205 393 185 S405 157 394 148"/>
    </g>
   </svg>
   <div className="food-pasta-scene-label" dir="ltr">01 — TABLE / 02 — PLATE / 03 — CUTLERY / 04 — PASTA</div>
  </div>
  <div className="food-pasta-copy">
   <span className="tiny-label">THE PASTA RITUAL</span>
   <h2 id="pasta-ritual-title">عشق، از اولین<br/><em>پیچ چنگال</em> شروع می‌شه.</h2>
   <p>یه سفره رنگی، یه بشقاب گرم و طعمی که دلت می‌خواد دوباره تجربه‌اش کنی.</p>
   <a href="#menu" className="food-pasta-link">منوی پاستا رو ببین <span aria-hidden="true">↗</span></a>
  </div>
 </section>;
}
