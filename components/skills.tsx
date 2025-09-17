"use client";

import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

export default function Skills() {
  const { ref } = useSectionInView("Skills");

  // Catégoriser les compétences pour un meilleur affichage
  const skillCategories = {
    "Langages": ["JavaScript", "TypeScript", "C#", "Golang"],
    "Backend": ["Node.js", "NestJS", "Express.js", ".NET", ".NET Core", ".NET MVC"],
    "Frontend": ["React", "Next.js", "Angular", "HTML", "CSS", "Tailwind"],
    "Mobile": ["Flutter"],
    "Bases de données": ["MongoDB", "MySQL", "PostgreSQL", "SQL Server", "Redis"],
    "DevOps & Outils": ["Docker", "AWS", "Nginx", "Git", "GitLab CI/CD", "Jenkins"],
    "Spécialisations": ["ElasticSearch", "OpenSearch", "Shopify Plugin", "API REST", "Microservices", "Clean Code"]
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 max-w-[65rem] scroll-mt-28 text-center sm:mb-40"
    >
      <SectionHeading>Compétences Techniques</SectionHeading>

      <div className="grid gap-8 max-w-6xl mx-auto">
        {Object.entries(skillCategories).map(([category, skills], categoryIndex) => (
          <div key={category} className="bg-white/50 dark:bg-white/5 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center border-b border-gray-200 dark:border-gray-700 pb-3">
              {category}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, index) => {
                const globalIndex = categoryIndex * 10 + index; // Pour l'animation
                return (
                  <motion.div
                    className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2.5 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:scale-105 hover:border-blue-300 dark:hover:border-blue-500"
                    key={skill}
                    variants={fadeInAnimationVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{
                      once: true,
                    }}
                    custom={globalIndex}
                  >
                    <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm whitespace-nowrap">
                      {skill}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Section des compétences principales en évidence */}
      <div className="mt-12 max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800 shadow-lg">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8 border-b border-blue-200 dark:border-blue-700 pb-4">
            🚀 Stack Principal
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {["TypeScript", "Node.js", "NestJS", "React", "MongoDB", "Docker"].map((skill, index) => (
              <motion.div
                key={skill}
                className="bg-white dark:bg-gray-800 px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500 hover:scale-110 transform"
                variants={fadeInAnimationVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={index + 50}
              >
                <div className="text-center">
                  <span className="font-bold text-blue-700 dark:text-blue-300 text-sm block">
                    {skill}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
