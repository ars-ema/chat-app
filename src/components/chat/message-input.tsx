"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Smile } from "lucide-react"

interface MessageInputProps {
  onSendMessage: (content: string) => void
  disabled?: boolean
}

export function MessageInput({ onSendMessage, disabled = false }: MessageInputProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-t border-brown-200 bg-card/80 backdrop-blur-sm p-4"
    >
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-brown-600 hover:text-brown-800 hover:bg-brown-100 rounded-full p-2 transition-all duration-200 hover:scale-110"
        >
          <Smile className="h-5 w-5" />
        </Button>

        <div className="flex-1">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={disabled}
            className="bg-wheat/50 border-brown-200 focus:border-tan focus:ring-tan/20 rounded-xl text-brown-800 placeholder:text-brown-500"
          />
        </div>

        <Button
          type="submit"
          disabled={!message.trim() || disabled}
          className="bg-tan hover:bg-tan/90 text-brown-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 disabled:hover:scale-100 p-3"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </motion.div>
  )
}
