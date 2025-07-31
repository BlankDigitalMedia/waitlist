"use client";

import React from "react";
import { motion, Variants, useInView, type HTMLMotionProps } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils";

interface WordPullUpTextProps {
  text: string;
  delay?: number;
  wrapperFramerProps?: Variants;
  framerProps?: Variants;
  className?: string;
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

function WordPullUpText({
  text,
  delay = 0,
  wrapperFramerProps,
  framerProps = {
    hidden: { y: 10, opacity: 0 },
    show: { y: 0, opacity: 1 },
  },
  className,
  as = "p",
}: WordPullUpTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const MotionComponent = motion[as as keyof typeof motion] as React.ComponentType<HTMLMotionProps<"div">>;

  // Create dynamic wrapper variants based on delay
  const dynamicWrapperProps = wrapperFramerProps || {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  return (
    <MotionComponent
      ref={ref}
      variants={dynamicWrapperProps}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={cn(className)}
    >
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          variants={framerProps}
          style={{ display: "inline-block", paddingRight: "4px" }}
        >
          {word === "" ? <span>&nbsp;</span> : word}
        </motion.span>
      ))}
    </MotionComponent>
  );
}

export { WordPullUpText };
