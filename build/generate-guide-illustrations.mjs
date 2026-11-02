// Native diagram geometry + bundled brand font. Never edits an external source.
import {realpath,lstat} from 'node:fs/promises';
import {dirname,join,resolve,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';

const root=await realpath(resolve(dirname(fileURLToPath(import.meta.url)),'..'));
if(root.toLowerCase()!==resolve('F:/Shopify/merchantcanvas.com').toLowerCase())throw Error('Workspace boundary mismatch');
const output=await realpath(join(root,'public/images'));
if(!output.toLowerCase().startsWith(root.toLowerCase()+sep))throw Error('Image output outside workspace');
const fontfile=join(root,'public/fonts/PlusJakartaSans-Variable.ttf');
const ink='#07142e',blue='#164bff';
const background=geometry=>Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900"><rect width="1200" height="900" fill="#edf2ff"/>${geometry}</svg>`);
const text=async(value,left,top,size=44,color=ink,weight='600')=>({left,top,input:await sharp({text:{text:`<span foreground="${color}" weight="${weight}">${value}</span>`,font:`Plus Jakarta Sans ${size}`,fontfile,rgba:true,dpi:72}}).png().toBuffer()});
const save=async(name,geometry,labels)=>{
  const target=join(output,name+'.png');
  const existing=await lstat(target).catch(e=>{if(e.code==='ENOENT')return null;throw e;});
  if(existing?.isSymbolicLink())throw Error('Refusing symlink output');
  const layers=await Promise.all(labels.map(args=>text(...args)));
  await sharp(background(geometry)).composite(layers).png({palette:true,compressionLevel:9}).toFile(target);
  console.log(`${name}: 1200x900`);
};
await save('shopify-quantity-breaks-guide',
  '<rect x="0" y="180" width="1200" height="270" fill="#fff"/><path d="M48 480H1152" stroke="#cfd8ef"/><rect x="48" y="738" width="1104" height="110" rx="12" fill="#164bff"/>',[
    ['Two different discount rules',48,48,58],
    ['Quantity breaks',48,210,54,blue],
    ['3 × the same eligible SKU',48,300,50],
    ['Quantity is evaluated on each cart line.',48,382,36],
    ['Price positions',48,520,54,blue],
    ['$30 first  ·  $20 second  ·  $10 third',48,610,44],
    ['Second: 30% off   ·   Third: 40% off',48,672,38],
    ['Example total: $50',76,762,48,'#ffffff'],
  ]);
await save('shopify-b2b-quote-workflow-guide',
  '<path d="M128 235V760" stroke="#164bff" stroke-width="4"/><rect x="160" y="164" width="992" height="144" fill="#fff"/><rect x="160" y="514" width="992" height="144" fill="#fff"/>',[
    ['From request to draft order',48,48,58],
    ['1',72,190,58,blue],['Request intake',192,180,54],['Capture buyer, products and proposed terms.',192,254,34],
    ['2',72,365,58,blue],['Internal review',192,355,54],['Check approval thresholds and revisions.',192,429,34],
    ['3',72,540,58,blue],['Buyer decision',192,530,54],['Keep acceptance linked to the agreed version.',192,604,34],
    ['4',72,715,58,blue],['Shopify draft order',192,705,54],['Transfer agreed terms; prevent duplicates.',192,779,34],
  ]);
