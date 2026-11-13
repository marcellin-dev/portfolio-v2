"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "none";
}

export default function AnimateOnScroll({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimateOnScrollProps) {
  const shouldReduce = useReducedMotion();

  const initial =
    shouldReduce || direction === "none"
      ? { opacity: 0 }
      : direction === "up"
      ? { opacity: 0, y: 24 }
      : { opacity: 0, x: -24 };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
