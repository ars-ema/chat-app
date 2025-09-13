"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { LogOut, MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar: string
}

export function Header() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card/80 backdrop-blur-sm border-b border-brown-200 px-6 py-4 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center space-x-3"
        >
          <div className="p-2 bg-tan/20 rounded-lg">
            <MessageCircle className="h-6 w-6 text-brown-700" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-brown-800">ChatFlow</h1>
            {user && <p className="text-sm text-brown-600">Welcome back, {user.name}</p>}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="border-brown-200 text-brown-700 hover:bg-brown-100 hover:text-brown-800 transition-all duration-200 hover:scale-105 bg-transparent"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </motion.div>
      </div>
    </motion.header>
  )
}
