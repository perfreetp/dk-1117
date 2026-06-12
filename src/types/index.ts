export interface User {
  id: string
  nickname: string
  avatar: string
  role: 'admin' | 'member'
}

export interface Circle {
  id: string
  name: string
  description: string
  code: string
  members: User[]
  createdAt: string
  isActive: boolean
}

export type EmotionType = 'anxious' | 'sad' | 'tired' | 'angry' | 'confused' | 'lonely' | 'happy'

export interface CollapsePost {
  id: string
  content: string
  emotion: EmotionType
  visibility: 'all' | 'anonymous' | 'friends'
  hugs: number
  isTop: boolean
  needCompanion: boolean
  walkInvitation: boolean
  createdAt: string
  authorId: string
  authorNickname: string
  isAuthor: boolean
}

export interface Task {
  id: string
  title: string
  description: string
  type: 'comfort' | 'walk' | 'listen' | 'help'
  status: 'available' | 'claimed' | 'completed'
  reward: number
  authorId: string
  authorNickname: string
  createdAt: string
  claimedAt?: string
  completedAt?: string
  claimedBy?: string
}

export interface WeeklySummary {
  weekStart: string
  weekEnd: string
  totalPosts: number
  totalHugs: number
  emotionDistribution: Record<EmotionType, number>
  activeDays: number[]
}

export interface Notification {
  id: string
  type: 'hug' | 'comment' | 'task' | 'system'
  title: string
  content: string
  read: boolean
  createdAt: string
}
