"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"

interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  content: string
  timestamp: Date
  isCurrentUser: boolean
}

interface MessageListProps {
  messages: Message[]
  currentUserId: string
}

export function MessageList({ messages, currentUserId }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <AnimatePresence>
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={cn("flex items-end space-x-2", message.isCurrentUser && "flex-row-reverse space-x-reverse")}
          >
            {!message.isCurrentUser && (
              <Avatar className="h-8 w-8 border-2 border-brown-200">
                <AvatarImage src={message.senderAvatar || "/placeholder.svg"} alt={message.senderName} />
                <AvatarFallback className="bg-tan text-brown-800 text-xs font-medium">
                  {message.senderName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            )}

            <div
              className={cn(
                "max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-md",
                message.isCurrentUser
                  ? "bg-tan text-brown-800 rounded-br-md"
                  : "bg-white text-brown-800 rounded-bl-md border border-brown-200",
              )}
            >
              {!message.isCurrentUser && (
                <p className="text-xs font-medium text-brown-600 mb-1">{message.senderName}</p>
              )}
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p className={cn("text-xs mt-2", message.isCurrentUser ? "text-brown-600" : "text-brown-500")}>
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>

            {message.isCurrentUser && (
              <Avatar className="h-8 w-8 border-2 border-brown-200">
                <AvatarImage src={message.senderAvatar || "/placeholder.svg"} alt={message.senderName} />
                <AvatarFallback className="bg-tan text-brown-800 text-xs font-medium">
                  {message.senderName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
      <div ref={messagesEndRef} />
    </div>
  )
}
