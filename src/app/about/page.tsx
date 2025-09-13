"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageTransition } from "@/components/page-transition"
import Link from "next/link"
import { MessageCircle, Users, Zap, Shield } from "lucide-react"

export default function AboutPage() {
  const features = [
    {
      icon: MessageCircle,
      title: "Real-time Messaging",
      description: "Instant communication with smooth animations and modern UI",
    },
    {
      icon: Users,
      title: "User Management",
      description: "Easy user discovery and conversation management",
    },
    {
      icon: Zap,
      title: "Fast & Responsive",
      description: "Built with Next.js App Router for optimal performance",
    },
    {
      icon: Shield,
      title: "Secure",
      description: "Modern authentication and data protection",
    },
  ]


  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-cream via-wheat to-tan/20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.05, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute top-20 right-20 w-96 h-96 bg-tan rounded-full blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.05, scale: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
            className="absolute bottom-20 left-20 w-96 h-96 bg-brown-300 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                className="text-5xl font-bold text-brown-800 mb-4"
              >
                About ChatFlow
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl text-brown-600 leading-relaxed max-w-2xl mx-auto text-balance"
              >
                A modern chat application built with cutting-edge web technologies, featuring beautiful animations and a
                warm, inviting design.
              </motion.p>
            </div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid md:grid-cols-2 gap-6 mb-12"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5, ease: "easeOut" }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="h-full shadow-lg border-0 bg-card/90 backdrop-blur-md hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="p-2 bg-tan/20 rounded-lg">
                          <feature.icon className="h-6 w-6 text-brown-700" />
                        </motion.div>
                        <CardTitle className="text-brown-800">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-brown-600">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* How ChatFlow Works */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mb-12"
            >
              <Card className="shadow-lg border-0 bg-card/90 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-brown-800 text-center">How ChatFlow Works</CardTitle>
                  <CardDescription className="text-brown-600 text-center">
                    Simple, secure, and intuitive messaging experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="max-w-4xl mx-auto">
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4, duration: 0.6 }}
                      className="text-brown-700 leading-relaxed text-lg text-center space-y-4"
                    >
                      ChatFlow makes connecting with others effortless. Simply create an account with your name and email, 
                      then log in to access your personal chat dashboard. Once inside, you can see all registered users 
                      and start conversations instantly. Send messages in real-time, view your chat history, and enjoy 
                      smooth animations that make every interaction feel natural and engaging. Your messages are securely 
                      stored and protected with modern authentication, ensuring your conversations remain private and safe. 
                      Whether you're chatting with friends, colleagues, or new connections, ChatFlow provides a beautiful 
                      and reliable platform for meaningful communication.
                    </motion.p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="text-center space-x-4"
            >
              <Link href="/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                  <Button
                    className="bg-tan hover:bg-tan/90 text-brown-800 font-medium px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    size="lg"
                  >
                    Get Started
                  </Button>
                </motion.div>
              </Link>
              <Link href="/">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                  <Button
                    variant="outline"
                    className="border-2 border-tan text-brown-700 hover:bg-tan/10 font-medium px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent backdrop-blur-sm"
                    size="lg"
                  >
                    Back to Home
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
