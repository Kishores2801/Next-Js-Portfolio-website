import Image from "next/image";
import Head from "../(user)/head";
import About from "../pages/About";
import Hero from "../pages/Hero";
import BlogList from "../pages/BlogList"



export default function Home() {
  return (
    <main className=" flex flex-col items-center justify-center">
    

      
      {/* Content */}
      <Hero/>
      <About/>
      <BlogList/>



    </main>
  );
}
