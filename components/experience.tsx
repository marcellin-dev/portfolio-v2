"use client";

import { useTheme } from "@/context/theme-context";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import SectionHeading from "./section-heading";

export default function Experience() {
  const { ref } = useSectionInView("Experience");
  const { theme } = useTheme();

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
      <SectionHeading>Expérience Professionnelle</SectionHeading>
      <VerticalTimeline lineColor="">
        {experiencesData.map((item, index) => (
          <React.Fragment key={index}>
            <VerticalTimelineElement
              contentStyle={{
                background:
                  theme === "light"
                    ? "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)"
                    : "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
                boxShadow: theme === "light"
                  ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                  : "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
                border: theme === "light"
                  ? "1px solid rgba(59, 130, 246, 0.1)"
                  : "1px solid rgba(59, 130, 246, 0.2)",
                textAlign: "left",
                padding: "1.5rem 2.5rem",
                borderRadius: "12px",
              }}
              contentArrowStyle={{
                borderRight:
                  theme === "light"
                    ? "0.4rem solid #e2e8f0"
                    : "0.4rem solid rgba(255, 255, 255, 0.1)",
              }}
              date={item.date}
              icon={item.icon}
              iconStyle={{
                background:
                  theme === "light"
                    ? "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
                    : "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)",
                fontSize: "1.5rem",
                color: "white",
                boxShadow: theme === "light"
                  ? "0 4px 8px rgba(59, 130, 246, 0.3)"
                  : "0 4px 8px rgba(96, 165, 250, 0.3)",
                border: theme === "light" ? "3px solid #ffffff" : "3px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="font-medium text-blue-600 dark:text-blue-400 !mt-1">
                  {item.location}
                </p>
                <div className="h-px bg-gradient-to-r from-blue-200 to-transparent dark:from-blue-800 my-3"></div>
                <p className="!mt-3 !font-normal text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            </VerticalTimelineElement>
          </React.Fragment>
        ))}
      </VerticalTimeline>
    </section>
  );
}
