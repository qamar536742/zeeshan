import {getProjects,getSettings} from '@/lib/db';
import Portfolio from '@/components/Portfolio';
export const dynamic='force-dynamic';
export default async function Home(){const [settings,projects]=await Promise.all([getSettings(),getProjects()]);return <Portfolio settings={settings} projects={projects}/>}
