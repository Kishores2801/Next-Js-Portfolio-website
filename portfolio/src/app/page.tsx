import Image from "next/image";
import Hero from "./components/hero";


export default function Home() {
  return (
    <main className="relative bg-white dark:bg-gray-950 text-white h-full w-full">

      
      <section id="hero" className="flex-grow h-100vh max-w-full  snap-start flex items-center justify-center">
       <Hero/>
      </section>
      <section id="about" className="flex-grow h-full snap-start flex items-center justify-center">
        About me
      </section>
      <section id="skills" className="flex-grow h-full snap-start flex items-center justify-center">
        Skills
      </section>
      <section id="projects" className="flex-grow h-full snap-start flex items-center justify-center">
        Projects
      </section>
      <section id="contact" className="flex-grow h-full snap-start flex items-center justify-center">
        contact
      </section>
    </main>
  );
}
