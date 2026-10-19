import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Zeeshan | Graphic Designer — Creative Portfolio',description:'Zeeshan is a graphic designer specializing in branding, social media graphics, promotional design and striking creative visuals.',openGraph:{title:'Zeeshan | Graphic Designer',description:'Creative visuals. Powerful identities. Designed to make an impact.',images:['/images/zgd-logo.jpg']}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
