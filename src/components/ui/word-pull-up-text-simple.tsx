"use client";

import React from "react";
import { motion, Variants, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface WordPullUpTextProps {
  text: string;
  delay?: number;
  className?: string;
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

function WordPullUpText({
  text,
  delay = 0,
  className,
  as = "p",
}: WordPullUpTextProps) {
  const MotionComponent = motion[as as keyof typeof motion] as React.ComponentType<HTMLMotionProps<"div">>;

  const wrapperVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { y: 10, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <MotionComponent
      variants={wrapperVariants}
      className={cn(className)}
    >
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          style={{ display: "inline-block", paddingRight: "4px" }}
        >
          {word === "" ? <span>&nbsp;</span> : word}
        </motion.span>
      ))}
    </MotionComponent>
  );
}

export { WordPullUpText };
