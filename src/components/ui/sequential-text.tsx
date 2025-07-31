"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SequentialTextProps {
  lines: string[];
  className?: string;
}

function SequentialText({ lines, className }: SequentialTextProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  // Calculate delay for each line based on previous lines
  const calculateDelay = (lineIndex: number) => {
    let totalDelay = 0;
    
    for (let i = 0; i < lineIndex; i++) {
      const previousLineWordCount = lines[i].split(" ").length;
      // Each word takes 0.05s to animate, plus 0.15s buffer between lines
      totalDelay += (previousLineWordCount * 0.05) + 0.15;
    }
    
    return totalDelay;
  };

  const lineVariants = {
    hidden: { opacity: 0 },
    show: (lineIndex: number) => ({
      opacity: 1,
      transition: {
        delay: calculateDelay(lineIndex),
        staggerChildren: 0.05,
        delayChildren: calculateDelay(lineIndex),
      },
    }),
  };

  const wordVariants = {
    hidden: { y: 10, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      ref={containerRef}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={cn("space-y-4", className)}
    >
      {lines.map((line, lineIndex) => (
        <motion.p
          key={lineIndex}
          custom={lineIndex}
          variants={lineVariants}
          className={cn(
            "text-sm leading-6",
            line === "What it is" ? "font-semibold mt-6 mb-3" : "",
            lineIndex === lines.length - 1 ? "mt-3" : ""
          )}
        >
          {line.split(" ").map((word, wordIndex) => (
            <motion.span
              key={wordIndex}
              variants={wordVariants}
              style={{ display: "inline-block", paddingRight: "4px" }}
            >
              {word === "" ? <span>&nbsp;</span> : word}
            </motion.span>
          ))}
        </motion.p>
      ))}
    </motion.div>
  );
}

export { SequentialText };
