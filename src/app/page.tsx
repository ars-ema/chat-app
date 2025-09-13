"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { PageTransition } from "@/components/page-transition"
import Link from "next/link"

export default function HomePage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-cream via-wheat to-tan/20 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute -top-40 -right-40 w-80 h-80 bg-tan rounded-full blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-brown-300 rounded-full blur-3xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-md w-full text-center space-y-8 relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="space-y-4"
          >
            <motion.h1
              className="text-5xl font-bold text-brown-800 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              ChatFlow
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-brown-600 text-lg leading-relaxed text-balance"
            >
              Connect with friends and colleagues in a beautiful, modern chat experience designed for meaningful
              conversations.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="space-y-4"
          >
            <Link href="/login" className="block">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className="w-full bg-tan hover:bg-tan/90 text-brown-800 font-medium py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  Login
                </Button>
              </motion.div>
            </Link>

            <Link href="/register" className="block">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="w-full border-2 border-tan text-brown-700 hover:bg-tan/10 font-medium py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent backdrop-blur-sm"
                  size="lg"
                >
                  Register
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.6 }}>
            <Link
              href="/about"
              className="text-brown-500 hover:text-brown-700 transition-colors duration-200 inline-block hover:underline"
            >
              Learn more about ChatFlow
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  )
}
