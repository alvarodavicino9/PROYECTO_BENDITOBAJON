import { useScroll, motion, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40 })

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: '0%',
        background: 'linear-gradient(to right, #F97316, #C2410C)',
        zIndex: 200,
        height: '3px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
      }}
    />
  )
}
