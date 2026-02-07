'use client'

import { motion, type Variants } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInUpProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

const fadeInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
}

export function FadeInUp({ children, delay = 0, duration = 0.6, className }: FadeInUpProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      variants={fadeInUpVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
