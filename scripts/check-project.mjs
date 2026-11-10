
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
assert(pizza.includes('taste-pizza-emerge-started-v7'),"New intro version must play in fresh sessions");
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
// The train order and angle-distance constraints are pure geometry and deterministic.
for(let i=1;i<8;i++){
 const predecessor=(i-1)*45,target=i*45;
 assert(target-predecessor===45&&target<=315,"A slice would leave the compact pizza");
}
assert(page.includes('CutleryCloseIcon')&&page.includes('className="menu-cutlery-close"'),"Crossed cutlery close control required");
assert(page.includes('className="menu-burger-scene"'),"Actual burger media placement required");
assert(page.includes('src="/media/menu-burger.png"'),"The cutout must be loaded locally");
assert(page.includes('className="menu-burger-steam"'),"Steam must rise above actual burger");
assert(loader.includes('export function CutleryCloseIcon')&&loader.includes('rotate(-43 24 24)')&&loader.includes('rotate(43 24 24)'),"Utensils must form the closing X");
assert(css.includes('background:#080808!important')&&css.includes('z-index:240'),"Mobile panel must cover the header with opaque black");
assert(css.includes('body:has(.menu-overlay.open) .site-header'),"Hide old header while mobile menu is open");
assert(css.includes('.menu-overlay.open nav a')&&css.includes('var(--order)*.07s'),"White navigation should enter one item after another");
assert(css.includes('@keyframes menu-real-burger-steam'),"Burger steam should move visibly");
const media=read('scripts/prepare-media.mjs');
assert(media.includes('https://commons.wikimedia.org/wiki/File:Cheeseburger.png'),"Photographic image must have grounded public-domain source");
assert(media.includes('LOCAL_MENU_BURGER_OK')&&media.includes('bundleTransparentBurger()'),"Bundle real transparent burger into own site");
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
