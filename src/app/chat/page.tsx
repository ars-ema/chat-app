"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Header } from "@/components/chat/header"
import { UserList } from "@/components/chat/user-list"
import { MessageList } from "@/components/chat/message-list"
import { MessageInput } from "@/components/chat/message-input"
import { Card } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  avatar: string
}

interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  content: string
  timestamp: Date
  isCurrentUser: boolean
}

// No mock data - will fetch from backend

export default function ChatPage() {
  const [user, setUser] = useState<User | null>(null)
  const [selectedUserId, setSelectedUserId] = useState<string>("")
  const [conversations, setConversations] = useState<Record<string, Message[]>>({})
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))
    fetchUsers()
  }, [router])

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch('/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      
      if (response.ok) {
        const data = await response.json()
        setUsers(data.users)
        // Auto-select first user if available
        if (data.users.length > 0) {
          setSelectedUserId(data.users[0].id)
          fetchMessages(data.users[0].id)
        }
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchMessages = async (receiverId: string) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/messages?receiverId=${receiverId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      
      if (response.ok) {
        const data = await response.json()
        const messages: Message[] = data.messages.map((msg: any) => ({
          id: msg.id,
          senderId: msg.senderId,
          senderName: msg.sender.name,
          senderAvatar: "/diverse-user-avatars.png",
          content: msg.text,
          timestamp: new Date(msg.createdAt),
          isCurrentUser: msg.senderId === user?.id,
        }))
        
        setConversations(prev => ({
          ...prev,
          [receiverId]: messages
        }))
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const handleSendMessage = async (content: string) => {
    if (!user || !selectedUserId) return

    try {
      const token = localStorage.getItem("token")
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          text: content,
          receiverId: selectedUserId,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const newMessage: Message = {
          id: data.message.id,
          senderId: user.id,
          senderName: user.name,
          senderAvatar: user.avatar,
          content: data.message.text,
          timestamp: new Date(data.message.createdAt),
          isCurrentUser: true,
        }

        setConversations((prev) => ({
          ...prev,
          [selectedUserId]: [...(prev[selectedUserId] || []), newMessage],
        }))
      } else {
        alert('Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message')
    }
  }

  const getSelectedUserName = (userId: string) => {
    const selectedUser = users.find(u => u.id === userId)
    return selectedUser?.name || "Unknown User"
  }

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId)
    fetchMessages(userId)
  }

  if (!user || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream to-wheat flex items-center justify-center">
        <div className="text-brown-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gradient-to-br from-cream to-wheat flex flex-col">
      <Header />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - User List */}
        <motion.div
          initial={{ opacity: 0, x: -300 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-80 hidden md:block"
        >
          <UserList selectedUserId={selectedUserId} onUserSelect={handleUserSelect} users={users} />
        </motion.div>

        {/* Main Chat Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 flex flex-col"
        >
          {selectedUserId ? (
            <Card className="flex-1 flex flex-col m-4 shadow-xl border-0 bg-card/80 backdrop-blur-sm overflow-hidden">
              {/* Chat Header */}
              <div className="border-b border-brown-200 p-4 bg-wheat/30">
                <h3 className="font-semibold text-brown-800">{getSelectedUserName(selectedUserId)}</h3>
                <p className="text-sm text-brown-600">Online</p>
              </div>

              {/* Messages */}
              <MessageList messages={conversations[selectedUserId] || []} currentUserId={user.id} />

              {/* Message Input */}
              <MessageInput onSendMessage={handleSendMessage} />
            </Card>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex-1 flex items-center justify-center m-4"
            >
              <Card className="p-12 text-center shadow-xl border-0 bg-card/80 backdrop-blur-sm">
                <div className="p-4 bg-tan/20 rounded-full w-fit mx-auto mb-4">
                  <MessageCircle className="h-12 w-12 text-brown-600" />
                </div>
                <h3 className="text-xl font-semibold text-brown-800 mb-2">Welcome to ChatFlow</h3>
                <p className="text-brown-600">Select a conversation to start chatting</p>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Mobile User List Overlay */}
      <div className="md:hidden">{/* This would be implemented as a slide-out drawer on mobile */}</div>
    </div>
  )
}
