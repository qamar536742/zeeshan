import {defaults,demos,Project,Settings} from './types';
const url=process.env.SUPABASE_URL?.replace(/\/$/,'');
const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
export const configured=()=>Boolean(url&&key);
async function request(path:string, options:RequestInit={}) {
 if(!url||!key)throw Error('Supabase not configured');
 const res=await fetch(`${url}/rest/v1/${path}`,{...options,headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json',Prefer:'return=representation',...options.headers},cache:'no-store'});
 if(!res.ok)throw Error(`Database error (${res.status}): ${await res.text()}`);
 const value=await res.text();return value?JSON.parse(value):null;
}
export async function getSettings():Promise<Settings>{if(!configured())return defaults;try{const rows=await request('site_settings?id=eq.1&select=data');return {...defaults,...(rows?.[0]?.data||{})};}catch(e){console.error(e);return defaults;}}
export async function getProjects():Promise<Project[]>{if(!configured())return demos;try{return await request('projects?select=*&order=sort_order.asc,created_at.desc');}catch(e){console.error(e);return demos;}}
export async function updateSettings(data:Settings){return request('site_settings?id=eq.1',{method:'PATCH',body:JSON.stringify({data})});}
export async function insertProject(project:Omit<Project,'id'>){return request('projects',{method:'POST',body:JSON.stringify(project)});}
export async function patchProject(id:string,project:Partial<Project>){return request(`projects?id=eq.${encodeURIComponent(id)}`,{method:'PATCH',body:JSON.stringify(project)});}
export async function deleteProject(id:string){return request(`projects?id=eq.${encodeURIComponent(id)}`,{method:'DELETE'});}
export async function uploadImage(file:File){if(!url||!key)throw Error('Supabase not configured');const allowed=['image/jpeg','image/png','image/webp','image/gif'];if(!allowed.includes(file.type))throw Error('Only JPG, PNG, WebP or GIF allowed');if(file.size>8*1024*1024)throw Error('Max image size is 8MB');const ext={'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/gif':'gif'}[file.type];const bucket=process.env.SUPABASE_STORAGE_BUCKET||'portfolio';const name=`${crypto.randomUUID()}.${ext}`;const res=await fetch(`${url}/storage/v1/object/${bucket}/${name}`,{method:'POST',headers:{apikey:key,Authorization:`Bearer ${key}`,'Content-Type':file.type,'x-upsert':'false'},body:await file.arrayBuffer()});if(!res.ok)throw Error(`Upload failed: ${await res.text()}`);return `${url}/storage/v1/object/public/${bucket}/${name}`;}
