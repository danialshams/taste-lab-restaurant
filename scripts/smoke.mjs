
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
 for(const marker of ["food-pasta-ritual","food-burger-builder","data-pizza-wedge=\"0\"","data-pizza-wedge=\"7\"","menu-cutlery-close-icon","menu-burger-steam","menu-burger-photo","menu-burger-scene","food-pasta-steam","food-pasta-fork","food-pasta-spoon","food-icon-steam","faq-section","id=\"menu\""]){
  assert(html.includes(marker),"Missing homepage feature in rendered HTML: "+marker);
 }
 for(const image of ["hero","pizza","burger","pasta","table","salad","chef","fries"]){
  const response=await request("/media/"+image+".jpg");
  assert.equal(response.status,200,"Local image is unavailable: "+image);
  assert((response.headers.get("content-type")||"").startsWith("image/"),"Invalid image content type: "+image);
  const bytes=(await response.arrayBuffer()).byteLength;
  assert(bytes>10000,"Suspiciously small local image: "+image+" / "+bytes);
 }
  const cutout=await request("/media/menu-burger.png");
  assert.equal(cutout.status,200,"Real transparent burger photo unavailable on site's own domain");
  assert((cutout.headers.get("content-type")||"").includes("image/png"),"Hamburger must remain PNG");
  const picture=Buffer.from(await cutout.arrayBuffer());
  assert(picture.length>35000,"Hamburger source image is too small");
  assert.equal(picture.subarray(0,8).toString("hex"),"89504e470d0a1a0a","Hamburger file is not a real PNG");
  assert([3,4,6].includes(picture[25]),"Hamburger photo must support transparency");
  console.log("Real photographic burger PNG OK ("+picture.length+" bytes)");
 console.log("Production smoke passed: homepage and all eight real local images, pizza, burger and pasta scene");
}finally{
 server.kill("SIGTERM");
}
