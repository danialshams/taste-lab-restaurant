
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


/* V7: individual FULL pizza slices travel only one 45-degree slot from under
 * their immediate predecessor. No angular mask or drawing reveal.
 * Painted from 7 to 0 means predecessors naturally cover new slices at spawn. */
const pizza=loader.slice(loader.indexOf('const PIZZA_START_KEY='),loader.indexOf('export function BurgerIllustration()'));
assert(pizza.includes('taste-pizza-emerge-started-v8'),"New intro version must play in fresh sessions");
assert(pizza.includes('Array.from({length:8},(_,i)=>7-i)'),"Reverse SVG paint order required");
assert(pizza.includes('data-pizza-wedge={index}'),"All eight textured wedges must exist");
assert(pizza.includes('translate(110 110) scale(.955 1) translate(-110 -110)'),"Add a slight gap without changing slice details");
assert(pizza.includes('const previous=states[i-1]')||pizza.includes('previous=states[i-1]'),"Every slice starts under its predecessor");
assert(pizza.includes('state.angle=previous.angle'),"Animate the actual slice from the preceding slice");
assert(pizza.includes('angle:i*45'),"Each slice must move only one sector to its final position");
assert(pizza.includes('const cadence=.51')&&pizza.includes('const slideDuration=.57'),"Use close, overlapping train timings");
assert(!pizza.includes('clipPath="url(#pizza-fan-reveal-v6)"')&&!pizza.includes('data-pizza-fan-aperture'),"Remove the previous drawing/mask technique");
assert(!pizza.includes('pizzaFanPath(')&&!pizza.includes('const stepInterval='),"Remove the old loader algorithms");
assert(css.includes('.food-pizza-emerge-v7')&&css.includes('max-width:190px'),"Keep pizza compact");
assert(css.includes('.food-pizza-emerge-v7 [data-pizza-wedge]:not('),"Hide upcoming slices until they actually emerge");
const wedgeStyle=css.match(/\.food-pizza-emerge-v7 \[data-pizza-wedge\]\s*\{([^}]+)\}/);
assert(wedgeStyle,"Pizza slice selector needs explicit CSS declaration");
const wedgeDeclarations=wedgeStyle[1].replace(/\/\*[\s\S]*?\*\//g,"");
assert(!/transform-(?:box|origin)|transform\s*:/.test(wedgeDeclarations),
 "DO NOT set CSS transform-origin/transform-box on pizza wedge: it moves each 110,110 SVG pivot off-center (visually reproduced bug)");
assert(pizza.includes('rot(g,state.angle)')&&pizza.includes('rotate("+angle.toFixed(3)+" 110 110)'),
 "Use exactly one SVG attribute pivot at 110,110, never a competing CSS transform");
// The train order and angle-distance constraints are pure geometry and deterministic.
for(let i=1;i<8;i++){
 const predecessor=(i-1)*45,target=i*45;
 assert(target-predecessor===45&&target<=315,"A slice would leave the compact pizza");
}
assert(page.includes('CutleryCloseIcon')&&page.includes('className="menu-cutlery-close"'),"Crossed spoon/fork mobile/desktop X must remain");
assert(page.includes('className="menu-burger-photo-backdrop"'),"Large menu photo backdrop required");
assert(page.includes('src="/media/menu-burger-steaming.jpg"'),"Menu must show photographed steam, from site's local JPEG");
assert(!page.includes('menu-burger-steam"')&&!page.includes('menu-burger.png'),"Remove fake steam and old cutout burger");
assert(loader.includes('export function CutleryCloseIcon')&&loader.includes('rotate(-43 24 24)')&&loader.includes('rotate(43 24 24)'),"Crossed spoon and fork required");
const universalMenu=css.slice(css.indexOf('/* V8. Desktop and mobile share'));
assert(universalMenu.length>1500,"New desktop + mobile unified menu styles are missing");
assert(universalMenu.includes('background:#070707!important')&&universalMenu.includes('z-index:240!important'),"Menu must be opaque black ABOVE header at all sizes");
assert(universalMenu.includes('body:has(.menu-overlay.open) .site-header'),"Header must disappear for BOTH mobile and desktop");
assert(universalMenu.includes('@media(min-width:701px)'),"Desktop menu must be styled independently from mobile");
assert(universalMenu.includes('object-fit:contain!important')&&universalMenu.includes('opacity:.40'),"Large photo must be faded to keep menu links readable");
assert(!css.includes('menu-real-burger-steam')&&!page.includes('className="menu-burger-steam"'),"No artificial CSS/SVG steam in menu");
assert(css.includes('.menu-overlay.open nav a')&&css.includes('var(--order)*.07s'),"Links must enter sequentially");
const media=read('scripts/prepare-media.mjs');
assert(media.includes('https://www.pexels.com/photo/delicious-cheeseburger-with-smoky-atmosphere-28902885/'),"Use the verified free-use Pexels burger with steam already in the source photo");
assert(media.includes('LOCAL_STEAMING_BURGER_OK')&&media.includes('await bundleSteamingBurger()'),"Build must bundle the correct photo locally");
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
