import About from "@/components/about";
import AnalyticsScript from "@/components/AnalyticsScript";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import SectionDivider from "@/components/section-divider";
import SectionHeading from "@/components/section-heading";
import Skills from "@/components/skills";
import imageUrl from "@/public/githubimg.png";
import Image from "next/image";
export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <Intro />
      <AnalyticsScript />
      <SectionDivider />
      <About />
      <Projects />
      <Skills />
      <Experience />

      <SectionHeading> Mon activité sur Github en mode privé </SectionHeading>
      <Image
        src={imageUrl}
        alt="Project I worked on"
        quality={95}
        width={"600"}
      />
      <br />
      <br />
      <Contact />
    </main>
  );
}
