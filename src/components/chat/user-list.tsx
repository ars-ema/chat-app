"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { generateUserAvatar, getUserDisplayName, getUserColor } from "@/lib/avatar-utils"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface UserListProps {
  users: User[]
  selectedUserId?: string
  onUserSelect: (userId: string) => void
}

export function UserList({ users, selectedUserId, onUserSelect }: UserListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card/80 backdrop-blur-sm border-r border-brown-200 h-full overflow-y-auto"
    >
      <div className="p-4 border-b border-brown-200">
        <h2 className="text-lg font-semibold text-brown-800">Users</h2>
        <p className="text-sm text-brown-600 mt-1">{users.length} contacts</p>
      </div>

      <div className="p-2">
        {users.length === 0 ? (
          <div className="text-center text-brown-600 py-8">
            <p>No other users found</p>
            <p className="text-sm mt-1">Invite friends to start chatting!</p>
          </div>
        ) : (
          users.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            onClick={() => onUserSelect(user.id)}
            className={cn(
              "flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-brown-100 hover:scale-105 mb-2",
              selectedUserId === user.id && "bg-tan/20 shadow-md",
            )}
          >
            <div className="relative">
              <Avatar className="h-12 w-12 border-2 border-brown-200">
                <AvatarImage 
                  src={user.avatar || generateUserAvatar(user.name, 48)} 
                  alt={user.name} 
                />
                <AvatarFallback 
                  className="text-white font-medium"
                  style={{ backgroundColor: getUserColor(user.name) }}
                >
                  {getUserDisplayName(user.name)}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-brown-800 truncate">{user.name}</h3>
              </div>
              <p className="text-sm text-brown-600 truncate mt-1">{user.email}</p>
            </div>
          </motion.div>
          ))
        )}
      </div>
    </motion.div>
  )
}
