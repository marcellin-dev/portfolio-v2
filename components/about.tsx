"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>A propos de moi</SectionHeading>


      <p className="mb-3">
        Architecte logiciel avec <span className="font-medium">4 ans d'expérience</span>, spécialisé dans la conception de solutions robustes et évolutives. J'ai eu l'honneur de développer des <span className="underline">outils d'amélioration du SEO</span> pour <span className="font-medium">Lemlist</span>, une entreprise cotée en bourse, contribuant ainsi à l'optimisation de leur produit. Ma stack technique inclut <span className="font-medium">Node.js (TypeScript)</span>, <span className="font-medium">NestJS</span>, <span className="font-medium">ASP.NET</span>, <span className="font-medium">React.js</span>, et <span className="font-medium">Flutter</span>.
      </p>
      <p className="mb-3">
        Passionné par la résolution de problèmes complexes, je mets un point d'honneur à livrer des solutions performantes et adaptées aux besoins métier. Je suis également à l'aise avec <span className="font-medium">Next.js</span>, <span className="font-medium">MongoDB</span>, et <span className="font-medium">Prisma</span>, et je suis toujours en veille sur les nouvelles technologies.
      </p>
      <p className="mb-3">
        Actuellement, je suis ouvert à de nouvelles missions en tant qu'<span className="font-medium">architecte logiciel</span> ou <span className="font-medium">développeur full-stack</span>. Si vous cherchez un expert pour booster votre produit ou concevoir une solution sur mesure, discutons-en !
      </p>

    </motion.section>
  );
}
