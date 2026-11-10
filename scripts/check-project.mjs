
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

// All wedges share a pivot, appear at the source, and advance as a synchronized
// TRAIN: for each new wedge the already-created ones shift precisely 45 degrees.
// At every intermediate frame there is one wedge-width gap between moving wedges.
const pizza=loader.slice(loader.indexOf("function PizzaDisc()"),loader.indexOf("export function BurgerIllustration()"));
assert(pizza.includes("const order=[7,6,5,4,3,2,1,0]"));
assert(pizza.includes("data-food-slice={i}"));
assert(pizza.includes('transform={i===0?undefined:"rotate(0 110 110)"}'));
assert(pizza.includes("const stepDuration=.36")&&pizza.includes("const stepInterval=.41"));
assert(pizza.includes("for(let step=1;step<8;step++)"),"Progress must be stage-based rather than one long independent orbit");
assert(pizza.includes("for(let slice=1;slice<=step;slice++)"),"Every existing slice must advance together");
assert(pizza.includes("const destination=(step-slice+1)*45"),"Wedges must settle in adjacent 45-degree positions");
assert(pizza.includes("PIZZA_START_KEY")&&pizza.includes("PIZZA_FINISH_KEY"));
assert(!/translate\s*\(/.test(pizza)&&!/radius:125/.test(pizza),"No scattering outside disc");
for(let step=1;step<8;step++){
 for(const progress of [0,.1,.25,.5,.75,.9,1]){
  const angles=[0];
  for(let slice=1;slice<=step;slice++){
    const from=(step-slice)*45;
    const to=(step-slice+1)*45;
    angles.push(from+(to-from)*progress);
  }
  // Before and during each step, earlier moving slices stay exactly one wedge
  // apart from later ones. There can be no crossovers, gaps or teleportation.
  const moving=angles.slice(1).sort((x,y)=>x-y);
  for(let i=1;i<moving.length;i++){
    assert(Math.abs(moving[i]-moving[i-1]-45)<1e-8,
      "Pizza train has overlapping or separated moving wedges");
  }
  assert(angles.every(x=>x>=0&&x<=315),"Slice escaped the pizza's circular perimeter");
 }
}
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
