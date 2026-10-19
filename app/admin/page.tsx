import {getProjects,getSettings,configured} from '@/lib/db';import {isAdmin} from '@/lib/auth';import Dashboard from '@/components/Dashboard';
export const dynamic='force-dynamic';
export default async function Admin(){const loggedIn=await isAdmin();if(!loggedIn)return <Dashboard loggedIn={false} initialSettings={null} initialProjects={[]} configured={configured()}/>;const [initialSettings,initialProjects]=await Promise.all([getSettings(),getProjects()]);return <Dashboard loggedIn initialSettings={initialSettings} initialProjects={initialProjects} configured={configured()}/>}
