
import {spawn} from "node:child_process";
import assert from "node:assert/strict";

const port=3499;
let logs="";
const server=spawn(process.execPath,["node_modules/next/dist/bin/next","start","-p",String(port)],{
  stdio:["ignore","pipe","pipe"],
  env:{...process.env,PORT:String(port)}
});
server.stdout.on("data",d=>{logs+=d.toString()});
server.stderr.on("data",d=>{logs+=d.toString()});
const url="http://127.0.0.1:"+port;
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function request(path){
 return fetch(url+path,{signal:AbortSignal.timeout(4000),redirect:"manual"});
}
try{
 let ready=false;
 for(let i=0;i<65;i++){
  if(server.exitCode!==null)throw new Error("Next.js server stopped: "+logs.slice(-1200));
  try{const r=await request("/");if(r.status===200){ready=true;break}}catch{}
  await sleep(250);
 }
 assert(ready,"Next.js production start did not become ready: "+logs.slice(-1500));
 const home=await request("/");
 assert.equal(home.status,200,"The homepage should return 200");
 const html=await home.text();
 for(const marker of ["food-pasta-ritual","food-burger-builder","data-pizza-wedge=\"0\"","data-pizza-wedge=\"7\"","menu-cutlery-close-icon","menu-burger-photo-backdrop","menu-burger-photograph","menu-cutlery-close","food-pasta-steam","food-pasta-fork","food-pasta-spoon","food-icon-steam","faq-section","id=\"menu\""]){
  assert(html.includes(marker),"Missing homepage feature in rendered HTML: "+marker);
 }
 for(const image of ["hero","pizza","burger","pasta","table","salad","chef","fries"]){
  const response=await request("/media/"+image+".jpg");
  assert.equal(response.status,200,"Local image is unavailable: "+image);
  assert((response.headers.get("content-type")||"").startsWith("image/"),"Invalid image content type: "+image);
  const bytes=(await response.arrayBuffer()).byteLength;
  assert(bytes>10000,"Suspiciously small local image: "+image+" / "+bytes);
 }
 const photo=await request("/media/menu-burger-steaming.jpg");
 assert.equal(photo.status,200,"Genuine steaming cheeseburger photograph must load from same domain");
 assert((photo.headers.get("content-type")||"").startsWith("image/"),"Burger photo must remain an actual image");
 const bytes=Buffer.from(await photo.arrayBuffer());
 assert(bytes.length>30000,"Steaming hamburger photograph suspiciously small");
 assert(bytes[0]===0xFF&&bytes[1]===0xD8,"Steaming hamburger photo must be JPEG");
 console.log("Steaming cheeseburger photograph OK ("+bytes.length+" bytes)");
 const resized=await request("/_next/image?url=%2Fmedia%2Fmenu-burger-steaming.jpg&w=640&q=84");
 assert.equal(resized.status,200,"Responsive Next.js burger image optimization failed");
 assert((resized.headers.get("content-type")||"").startsWith("image/"),
   "Optimized burger did not return valid image");
 const compressedBytes=(await resized.arrayBuffer()).byteLength;
 assert(compressedBytes>9000&&compressedBytes<bytes.length,
   "Optimized steaming photo should be smaller than source");
 console.log("Optimized steaming burger photo OK: "+compressedBytes+" of "+bytes.length+" bytes");
 console.log("Production smoke passed: homepage and all eight real local images, pizza, burger and pasta scene");
}finally{
 server.kill("SIGTERM");
}
