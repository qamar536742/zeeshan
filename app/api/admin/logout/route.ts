import {NextResponse} from 'next/server';import {cookieName} from '@/lib/auth';
export async function POST(){const response=NextResponse.json({ok:true});response.cookies.set(cookieName,'',{path:'/',httpOnly:true,maxAge:0});return response}
