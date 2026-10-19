import {SignJWT,jwtVerify} from 'jose';
import {cookies} from 'next/headers';
import {timingSafeEqual} from 'node:crypto';
export const cookieName='zgd_admin';
const secret=()=>{const s=process.env.SESSION_SECRET;if(!s||s.length<32)throw Error('Configure a SESSION_SECRET of at least 32 characters');return new TextEncoder().encode(s)};
function safeMatch(a:string,b:string){const x=Buffer.from(a),y=Buffer.from(b);return x.length===y.length&&timingSafeEqual(x,y)}
export function checkCredentials(user:string,password:string){const u=process.env.ADMIN_USERNAME,p=process.env.ADMIN_PASSWORD;if(!u||!p||p==='REPLACE_WITH_A_STRONG_UNIQUE_PASSWORD')return false;return safeMatch(user,u)&&safeMatch(password,p);}
export async function makeToken(){return new SignJWT({role:'admin'}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('8h').sign(secret());}
export async function isAdmin(){try{const token=(await cookies()).get(cookieName)?.value;if(!token)return false;const {payload}=await jwtVerify(token,secret(),{algorithms:['HS256']});return payload.role==='admin'}catch{return false}}
