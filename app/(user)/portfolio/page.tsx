
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";

import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/contact"; 
import experience from "@/components/WorkExperience";

export default function Home() {
  return (
    <main className="relative dark:bg-black-200/100 bg-gray-200/100 dark:bg-grid-white/[0.035] bg-grid-black/[0.018] text-black dark:text-white flex flex-col snap-y snap-mandatory overflow-x-hidden z-0">
      <Header />

      {/* Hero Section */}
      <section id="hero" className="flex-grow h-fit snap-start flex items-center justify-center">
        <Hero />
      </section>

      {/* About Section */}
      <section id="about" className="flex-grow snap-center flex items-center justify-center">
        <About />
      </section>

      {/* possible inclusion */}
      {/* Cards to show what i Do */}

      {/* Work Experience Section */}
      <section id="experience" className="flex-grow snap-center flex items-center justify-center">
        <WorkExperience/>
      </section>

      {/* Skills */}
      <section id="skills" className="flex-grow snap-center flex items-center justify-center">
        <Skills/>
      </section>

      <section id="project" className="flex-grow snap-center flex items-center justify-center">
        <Projects/>
        </section>
      <section id="contact" className="flex-grow snap-center flex items-center justify-center">
        <Contact/>
      </section>
    </main>
  );
}
