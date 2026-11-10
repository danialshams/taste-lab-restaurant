
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

// Eight slices all originate at the same 0-degree source, then rotate in place.
// Reverse SVG paint order puts seated slices above a slice still in transit.
const pizza=loader.slice(loader.indexOf("function PizzaDisc()"),loader.indexOf("export function BurgerIllustration()"));
assert(pizza.includes("const order=[7,6,5,4,3,2,1,0]"));
assert(pizza.includes("data-food-slice={i}"));
assert(pizza.includes('transform={i===0?undefined:"rotate(0 110 110)"}'));
assert(pizza.includes('const position={angle:0}')&&pizza.includes("angle:i*45"));
assert(pizza.includes('const start=.32+(i-1)*.53'));
assert(!/translate\s*\(/.test(pizza) && !/radius:125/.test(pizza),
 "Pizza wedges must not scatter via radial translation");
assert(pizza.includes("PIZZA_START_KEY")&&pizza.includes("PIZZA_FINISH_KEY"),
 "The intro must not replay when a page remounts");

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
assert(page.includes('aria-controls={"faq-answer-"+i}')&&page.includes('aria-hidden={faq!==i}'));
assert(page.includes("FoodIcon kind={c as FoodKind}")&&page.includes('"ساندویچ"'));
assert(!page.includes("✳"),"Remove non-food decorative stars");
assert(css.includes(".food-pasta-ritual")&&css.includes(".food-burger-builder{overflow:hidden}"));
assert(base.includes("flex-direction:row-reverse"),"Mobile menu control remains right-aligned");

console.log("TASTE LAB V4 structural and motion-flow checks passed");
