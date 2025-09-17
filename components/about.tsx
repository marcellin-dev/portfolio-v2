"use client";

import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";

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


      <p className="mb-4 text-gray-700 dark:text-gray-300">
        <span className="font-semibold text-gray-900 dark:text-white">Développeur/architecte Node.js</span> possédant plus de <span className="font-medium text-blue-600 dark:text-blue-400">4 ans d'expérience</span>, je crée et gère des microservices et des API RESTful solides en utilisant <span className="font-medium">TypeScript/NestJS/ExpressJs</span>. Compétent en <span className="font-medium">MySQL</span>, <span className="font-medium">Postgres</span>, <span className="font-medium">MongoDB</span> et <span className="font-medium">Redis</span>, avec une bonne maîtrise de <span className="font-medium">Docker</span> et des pipelines <span className="font-medium">CI/CD (GitLab/Jenkins)</span>.
      </p>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        J'ai des connaissances en <span className="font-medium text-orange-600 dark:text-orange-400">AWS</span> et je suis intéressé par <span className="font-medium text-green-600 dark:text-green-400">Go</span>. <span className="font-semibold">Indépendant et méticuleux</span>, je prends en charge les décisions techniques, travaille volontiers en équipe, exprime mes idées de manière précise et conserve un sens du détail.
      </p>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Poussé par le <span className="font-medium text-purple-600 dark:text-purple-400">perfectionnement constant</span> et une approche <span className="italic">tester-apprendre-répéter</span>, je prends plaisir à affiner les solutions et à régler des problèmes complexes de manière systématique. J'ai eu l'honneur de développer des outils pour <span className="font-semibold text-blue-700 dark:text-blue-300">Lemlist</span>, contribuant à l'optimisation de leur produit.
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        Actuellement ouvert à de nouvelles missions en tant qu'<span className="font-medium text-indigo-600 dark:text-indigo-400">architecte logiciel</span> ou <span className="font-medium text-indigo-600 dark:text-indigo-400">développeur full-stack</span>. Si vous cherchez un expert pour concevoir une solution sur mesure, discutons-en !
      </p>

    </motion.section>
  );
}
