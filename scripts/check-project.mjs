
import {readFileSync,existsSync} from "node:fs";
import assert from "node:assert/strict";

const read=path=>readFileSync(path,"utf8");
const page=read("app/page.tsx");
const loader=read("components/FoodIllustrations.tsx");
const pasta=read("components/PastaRitual.tsx");
const css=read("app/food-motion.css");
const layout=read("app/layout.tsx");
const base=read("app/globals.css");

assert(!page.includes("https://images.unsplash.com"),"Images should be served locally");
assert((page.match(/\/media\/\w+\.jpg/g)||[]).length===8,"All eight local food photos must remain");
assert(existsSync("scripts/prepare-media.mjs"),"The local media bundler is required");
assert(layout.includes('food-motion.css'),"Food motion CSS must load");

// QA: the loader uses ONE angular aperture; eight real wedges are stationary
// and already perfectly aligned. The mask opens in seven contiguous 45deg arcs.
// Verify the actual production geometry helpers rather than merely matching text.
assert(loader.includes("const PIZZA_START_DEG=22.5"),"Fan must start at right edge of the fixed top slice");
assert(loader.includes("const PIZZA_REVEAL_RADIUS=98"),"Mask must cover crust without escaping SVG bounds");
assert(loader.includes("Array.from({length:7}"),"Seven hidden slices required");
assert(loader.includes("<PizzaWedge index={0}/>"),"One permanently visible top source slice required");
assert(loader.includes("data-pizza-fan-aperture"),"Only the angular mask should be animated");
assert(loader.includes('clipPath="url(#pizza-fan-reveal-v6)"'),"Moving reveal must clip all seven stationary wedges");
assert(loader.includes("degrees:slice*45"),"Fan must open by adjacent wedge sectors");
assert(loader.includes("for(let slice=1;slice<=7;slice++)"),"Exactly seven sequential phases");
assert(!loader.includes("const stepInterval=")&&!loader.includes("const destination=")&&!loader.includes("radius:125"),"Remove old scattered spinner algorithm");
const beginning=loader.indexOf("const PIZZA_CX=");
const ending=loader.indexOf("function PizzaWedge(",beginning);
assert(beginning>=0&&ending>beginning,"Angular aperture helper missing");
const helpers=loader.slice(beginning,ending)
 .replace("function pizzaFanPoint(angle:number)","function pizzaFanPoint(angle)")
 .replace("function pizzaFanPath(degrees:number)","function pizzaFanPath(degrees)");
const {runInNewContext}=await import("node:vm");
const pathFor=runInNewContext(helpers+"\npizzaFanPath");
function p(deg){
 const rad=deg*Math.PI/180;
 return [110+98*Math.sin(rad),110-98*Math.cos(rad)];
}
for(const sweep of [0,2.5,18,45,77,90,135,180,225,270,315]){
 const actual=pathFor(sweep);
 assert(actual.startsWith("M110 110 L"),"Fan mask must always pivot from center");
 if(sweep===0){assert(!actual.includes(" A98 "));continue}
 const match=actual.match(/A98 98 0 ([01]) 1 ([0-9.]+) ([0-9.]+) Z$/);
 assert(match,"Fan arc command missing at "+sweep);
 const [x,y]=p(22.5+sweep);
 assert(Math.abs(Number(match[2])-x)<.002&&Math.abs(Number(match[3])-y)<.002,
  "Aperture endpoint not on fixed-radius arc at "+sweep);
 assert(Number(match[1])===(sweep>180?1:0),
  "SVG large-arc-flag must change once sweep exceeds 180");
}
assert(!css.includes(".food-pizza-slice"),"Remove stale motion on previous DOM wedges");
assert(css.includes(".food-pizza-fan-v6")&&css.includes("max-width:190px!important"),"The new pizza must stay compact");
// ScrollTrigger is a once-only entry detector, NOT the driver of ingredient movement.
const motion=page.slice(page.indexOf("function useAnimations("),page.indexOf("export default function Page()"));
assert(motion.includes('const burgerTL=gsap.timeline({paused:true})'));
assert(motion.includes('trigger:burgerStage,start:"top 87%",once:true,onEnter:()=>burgerTL.play()'));
assert(motion.includes('trigger:".food-pasta-scene",start:"top 85%",once:true,onEnter:()=>timeline.play()'));
assert(!motion.includes("pin,")&&!motion.includes("scrub:.7,pin"));
assert(motion.includes('".faq-item"')&&motion.includes('".final-cta > *"'));
assert(page.includes("<PastaRitual/>")&&page.indexOf("<PastaRitual/>")>page.indexOf('id="burger-build"')&&page.indexOf("<PastaRitual/>")<page.indexOf('id="menu"'),
 "The pasta ritual must follow the burger and precede the menu");
assert(pasta.includes("food-pasta-cloth")&&pasta.includes("food-pasta-plate"));
assert(pasta.includes("food-pasta-spoon")&&pasta.includes("food-pasta-fork"));
assert(pasta.includes("food-pasta-noodle")&&pasta.includes("food-pasta-garnish"));
assert(pasta.includes('width="8" height="69"'),"Fork must have four distinct filled tines");
assert(pasta.includes("L109 483")&&pasta.includes("L619 483"),"Fork and spoon must have full-length solid handles");
assert((pasta.match(/className="food-pasta-steam"/g)||[]).length===1,"Steam group must exist above food");
assert((pasta.match(/M3[0-9]{2} 2[0-9]{2} C/g)||[]).length>=2,"Several distinct visible steam paths are required");
assert(page.includes('pasta.classList.add("is-steaming")'),"Steam begins after pasta arrives");
assert(page.indexOf('timeline.call(()=>pasta.classList.add("is-steaming")')>page.indexOf('timeline.fromTo(".food-pasta-garnish"'),"Steam must start after the garnish lands");
assert(css.includes("@keyframes food-pasta-steam-rise")&&css.includes(".food-icon-steam"),"Both the plate icon and pasta need animated steam");
assert(css.includes("width:min(225px,55vw)"),"Pizza wheel must remain compact");

assert(page.includes('aria-controls={"faq-answer-"+i}')&&page.includes('aria-hidden={faq!==i}'));
assert(page.includes("FoodIcon kind={c as FoodKind}")&&page.includes('"ساندویچ"'));
assert(!page.includes("✳"),"Remove non-food decorative stars");
assert(css.includes(".food-pasta-ritual")&&css.includes(".food-burger-builder{overflow:hidden}"));
assert(base.includes("flex-direction:row-reverse"),"Mobile menu control remains right-aligned");

console.log("TASTE LAB V4 structural and motion-flow checks passed");
