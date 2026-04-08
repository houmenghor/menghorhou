// src/components/Loading.jsx
import { motion } from "framer-motion"
import profile from '../assets/images/profile.jpg'

export function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center dark:bg-secondary">
      <div className="text-center">
        <div className="relative mb-6 ">
          <motion.div
            className="w-32 h-32 rounded-full border-4 border-primary relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={profile}
              alt="Menghor Hou"
              className="object-cover w-full h-full"
            />

            <motion.div
              className="absolute inset-0 bg-primary/20"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>

          {/* Spinning circle animation */}
          <motion.div
            className="absolute inset-0 rounded-full border-t-4 border-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        <motion.h2
          className="text-2xl font-bold text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Menghor Hou
        </motion.h2>

        <motion.div
          className="mt-4 flex justify-center space-x-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-primary"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 0.6,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
