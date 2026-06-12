const CIRCLES_KEY = 'today_collapse_circles'
const POSTS_KEY = 'today_collapse_posts'
const TASKS_KEY = 'today_collapse_tasks'
const ACTIVE_CIRCLE_KEY = 'today_collapse_active_circle'

export const storage = {
  getCircles: <T>(): T[] => {
    try {
      const data = Taro.getStorageSync(CIRCLES_KEY)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  },

  setCircles: <T>(data: T[]): void => {
    Taro.setStorageSync(CIRCLES_KEY, JSON.stringify(data))
  },

  getPosts: <T>(): T[] => {
    try {
      const data = Taro.getStorageSync(POSTS_KEY)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  },

  setPosts: <T>(data: T[]): void => {
    Taro.setStorageSync(POSTS_KEY, JSON.stringify(data))
  },

  getTasks: <T>(): T[] => {
    try {
      const data = Taro.getStorageSync(TASKS_KEY)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  },

  setTasks: <T>(data: T[]): void => {
    Taro.setStorageSync(TASKS_KEY, JSON.stringify(data))
  },

  getActiveCircle: (): string => {
    try {
      return Taro.getStorageSync(ACTIVE_CIRCLE_KEY) || ''
    } catch {
      return ''
    }
  },

  setActiveCircle: (circleId: string): void => {
    Taro.setStorageSync(ACTIVE_CIRCLE_KEY, circleId)
  },

  generateInviteCode: (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = ''
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return code
  }
}
