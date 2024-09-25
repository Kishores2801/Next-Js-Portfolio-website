

import { Inter, Manrope } from 'next/font/google'
import "../globals.css";
import {cx} from "../../utils";
import  Header from '../../components/Header/Header';




const inter = Inter({ subsets: ['latin'], display: "swap", variable: "--font-in" })

const manrope = Manrope({ subsets: ['latin'], display: "swap", variable: "--font-mr"  })




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    <html lang="en">
      
      <body className= {cx(inter.variable, manrope.variable, "font-mr bg-light")}>
      <Header/>
        
      
        
        
        {children}
        </body>
    </html>
  );
}


