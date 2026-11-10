import {mkdir, writeFile, stat} from "node:fs/promises";
import {join} from "node:path";

// Demo photography is bundled at build time and served from this site's own
// /media/ path; client browsers never need to reach Unsplash directly.
const originals = {
  "hero": "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=1800&q=88&fit=crop",
  "pizza": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1100&q=87&fit=crop",
  "burger": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1100&q=87&fit=crop",
  "pasta": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1100&q=87&fit=crop",
  "table": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1700&q=87&fit=crop",
  "salad": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1100&q=87&fit=crop",
  "chef": "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1200&q=87&fit=crop",
  "fries": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=1000&q=87&fit=crop"
};
const folder = join(process.cwd(), "public", "media");
await mkdir(folder, {recursive: true});
const completed = [];
async function download(name, original) {
  const path = join(folder, `${name}.jpg`);
  try { if ((await stat(path)).size > 12000) { completed.push(name); return; } } catch {}
  const address = new URL(original);
  address.searchParams.set("w", name === "hero" ? "1600" : "1050");
  address.searchParams.set("q", "79");
  address.searchParams.set("fit", "crop");
  address.searchParams.set("fm", "jpg");
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(address, {
        headers: {"User-Agent":"Mozilla/5.0 (compatible; PortfolioMediaBuilder/1.0)", "Accept":"image/jpeg"},
        signal: AbortSignal.timeout(24000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      if (!(response.headers.get("content-type") || "").includes("image/")) throw new Error("not image content");
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length < 12000 || bytes[0] !== 255 || bytes[1] !== 216) throw new Error("incomplete/non-JPEG image");
      await writeFile(path, bytes);
      completed.push(name);
      console.log(`LOCAL_MEDIA_OK ${name} (${Math.round(bytes.length / 1024)} KiB)`);
      return;
    } catch (error) {
      lastError = error;
      if (attempt < 3) await new Promise(resolve => setTimeout(resolve, 550 * attempt));
    }
  }
  throw new Error(`Cannot bundle image ${name}: ${lastError}`);
}
await Promise.all(Object.entries(originals).map(([name, url]) => download(name, url)));

// Authentic free-use stock photograph published by Pedro Furtado on Pexels.
// This image already shows visible steam rising from a cheeseburger on a dark
// background. Do NOT add artificial SVG/CSS steam to the menu.
// Source: https://www.pexels.com/photo/delicious-cheeseburger-with-smoky-atmosphere-28902885/
// License: https://www.pexels.com/license/
async function bundleSteamingBurger() {
  const target=join(folder,"menu-burger-steaming.jpg");
  try { if ((await stat(target)).size>30000) {
    console.log("LOCAL_STEAMING_BURGER_OK reused bundled photo");
    return;
  }} catch {}
  const sources=[
    "https://images.pexels.com/photos/28902885/pexels-photo-28902885.jpeg?auto=compress&cs=tinysrgb&w=1400&q=86",
    "https://images.pexels.com/photos/28902885/pexels-photo-28902885.jpeg"
  ];
  let lastError;
  for(const source of sources){
    for(let attempt=1;attempt<=3;attempt++){
      try {
        const response=await fetch(source,{
          headers:{"User-Agent":"Mozilla/5.0 (compatible; TasteLabPortfolio/1.0)","Accept":"image/jpeg,image/*"},
          signal:AbortSignal.timeout(24000)
        });
        if(!response.ok)throw new Error("HTTP "+response.status);
        if(!(response.headers.get("content-type")||"").startsWith("image/"))
          throw new Error("Expected food photograph, got "+response.headers.get("content-type"));
        const bytes=Buffer.from(await response.arrayBuffer());
        if(bytes.length<30000 || bytes[0]!==0xFF || bytes[1]!==0xD8)
          throw new Error("Incomplete or non-JPEG stock photo");
        await writeFile(target,bytes);
        console.log("LOCAL_STEAMING_BURGER_OK Pexels genuine photograph ("+Math.round(bytes.length/1024)+" KiB)");
        return;
      }catch(error){
        lastError=error;
        if(attempt<3)await new Promise(resolve=>setTimeout(resolve,450*attempt));
      }
    }
  }
  throw new Error("Unable to bundle real steaming burger photograph: "+lastError);
}
await bundleSteamingBurger();
if (completed.length !== Object.keys(originals).length) throw new Error("Media preflight incomplete");
console.log(`LOCAL_MEDIA_COMPLETE ${completed.length} locally bundled photographs`);
