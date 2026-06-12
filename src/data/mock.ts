import type { Circle, CollapsePost, Task, User, WeeklySummary } from '@/types'

export const mockUser: User = {
  id: 'user-001',
  nickname: '小星星',
  avatar: 'https://picsum.photos/id/64/200/200',
  role: 'member'
}

export const mockCircles: Circle[] = [
  {
    id: 'circle-001',
    name: '宿舍小窝',
    description: '302宿舍的温暖小窝',
    code: 'ABC123',
    members: [
      { id: 'user-001', nickname: '小星星', avatar: 'https://picsum.photos/id/64/200/200', role: 'member' },
      { id: 'user-002', nickname: '小月亮', avatar: 'https://picsum.photos/id/91/200/200', role: 'admin' },
      { id: 'user-003', nickname: '小太阳', avatar: 'https://picsum.photos/id/177/200/200', role: 'member' },
      { id: 'user-004', nickname: '小云朵', avatar: 'https://picsum.photos/id/338/200/200', role: 'member' }
    ],
    createdAt: '2024-01-15',
    isActive: true
  },
  {
    id: 'circle-002',
    name: '班级树洞',
    description: '软件工程2班的秘密花园',
    code: 'DEF456',
    members: [
      { id: 'user-001', nickname: '小星星', avatar: 'https://picsum.photos/id/64/200/200', role: 'member' },
      { id: 'user-005', nickname: '辅导员', avatar: 'https://picsum.photos/id/1027/200/200', role: 'admin' },
      { id: 'user-006', nickname: '学习委员', avatar: 'https://picsum.photos/id/338/200/200', role: 'member' }
    ],
    createdAt: '2024-02-20',
    isActive: true
  },
  {
    id: 'circle-003',
    name: '研友互助群',
    description: '一起备考的小伙伴们',
    code: 'GHI789',
    members: [
      { id: 'user-001', nickname: '小星星', avatar: 'https://picsum.photos/id/64/200/200', role: 'member' },
      { id: 'user-007', nickname: '学霸君', avatar: 'https://picsum.photos/id/177/200/200', role: 'admin' }
    ],
    createdAt: '2024-03-01',
    isActive: true
  }
]

export const mockPosts: CollapsePost[] = [
  {
    id: 'post-001',
    content: '今天的实验又失败了，已经是第三次了。感觉自己好笨，是不是不适合做科研...',
    emotion: 'sad',
    visibility: 'all',
    hugs: 23,
    isTop: false,
    needCompanion: true,
    walkInvitation: false,
    createdAt: '2024-03-15 18:30',
    authorId: 'user-001',
    authorNickname: '小星星',
    isAuthor: true
  },
  {
    id: 'post-002',
    content: '论文deadline快到了，可是数据还没跑完。好焦虑啊，每天都睡不着觉',
    emotion: 'anxious',
    visibility: 'anonymous',
    hugs: 45,
    isTop: true,
    needCompanion: true,
    walkInvitation: true,
    createdAt: '2024-03-15 16:20',
    authorId: 'user-002',
    authorNickname: '匿名用户',
    isAuthor: false
  },
  {
    id: 'post-003',
    content: '和室友吵架了，明明是很小的事情，但就是控制不住情绪。现在好后悔...',
    emotion: 'lonely',
    visibility: 'friends',
    hugs: 18,
    isTop: false,
    needCompanion: false,
    walkInvitation: false,
    createdAt: '2024-03-15 14:10',
    authorId: 'user-003',
    authorNickname: '小太阳',
    isAuthor: false
  },
  {
    id: 'post-004',
    content: '连续复习了一周，感觉脑子已经转不动了。好想躺平啊',
    emotion: 'tired',
    visibility: 'all',
    hugs: 31,
    isTop: false,
    needCompanion: false,
    walkInvitation: false,
    createdAt: '2024-03-15 12:00',
    authorId: 'user-004',
    authorNickname: '小云朵',
    isAuthor: false
  },
  {
    id: 'post-005',
    content: '导师又布置了新任务，感觉自己永远做不完。压力好大...',
    emotion: 'angry',
    visibility: 'all',
    hugs: 27,
    isTop: false,
    needCompanion: true,
    walkInvitation: true,
    createdAt: '2024-03-14 20:45',
    authorId: 'user-005',
    authorNickname: '匿名用户',
    isAuthor: false
  },
  {
    id: 'post-006',
    content: '不知道自己想要什么，感觉很迷茫。看着周围的人都很明确，只有我还在原地',
    emotion: 'confused',
    visibility: 'anonymous',
    hugs: 52,
    isTop: false,
    needCompanion: true,
    walkInvitation: false,
    createdAt: '2024-03-14 15:30',
    authorId: 'user-006',
    authorNickname: '匿名用户',
    isAuthor: false
  },
  {
    id: 'post-007',
    content: '今天收到了心仪公司的offer！努力终于有回报了！',
    emotion: 'happy',
    visibility: 'all',
    hugs: 68,
    isTop: false,
    needCompanion: false,
    walkInvitation: false,
    createdAt: '2024-03-14 10:00',
    authorId: 'user-007',
    authorNickname: '学霸君',
    isAuthor: false
  }
]

export const mockTasks: Task[] = [
  {
    id: 'task-001',
    title: '需要一个倾听者',
    description: '最近压力很大，想找人聊聊',
    type: 'listen',
    status: 'available',
    reward: 10,
    authorId: 'user-002',
    authorNickname: '小月亮',
    createdAt: '2024-03-15 19:00'
  },
  {
    id: 'task-002',
    title: '一起散步吗',
    description: '晚上七点，操场散步',
    type: 'walk',
    status: 'available',
    reward: 5,
    authorId: 'user-003',
    authorNickname: '小太阳',
    createdAt: '2024-03-15 18:30'
  },
  {
    id: 'task-003',
    title: '求安慰',
    description: '考试没考好，心情很低落',
    type: 'comfort',
    status: 'claimed',
    reward: 8,
    authorId: 'user-004',
    authorNickname: '小云朵',
    createdAt: '2024-03-15 17:00',
    claimedAt: '2024-03-15 17:30',
    claimedBy: 'user-001'
  },
  {
    id: 'task-004',
    title: '帮忙占座',
    description: '明天上午的课帮忙占个座',
    type: 'help',
    status: 'completed',
    reward: 3,
    authorId: 'user-001',
    authorNickname: '小星星',
    createdAt: '2024-03-14 20:00',
    claimedAt: '2024-03-14 20:15',
    completedAt: '2024-03-15 09:30',
    claimedBy: 'user-007'
  },
  {
    id: 'task-005',
    title: '一起自习',
    description: '图书馆二楼，互相监督学习',
    type: 'walk',
    status: 'available',
    reward: 5,
    authorId: 'user-005',
    authorNickname: '辅导员',
    createdAt: '2024-03-15 16:00'
  },
  {
    id: 'task-006',
    title: '情绪陪伴',
    description: '最近情绪不太好，需要有人陪着说说话',
    type: 'listen',
    status: 'available',
    reward: 12,
    authorId: 'user-006',
    authorNickname: '学习委员',
    createdAt: '2024-03-15 15:30'
  }
]

export const mockWeeklySummary: WeeklySummary = {
  weekStart: '2024-03-11',
  weekEnd: '2024-03-17',
  totalPosts: 23,
  totalHugs: 156,
  emotionDistribution: {
    anxious: 5,
    sad: 6,
    tired: 4,
    angry: 2,
    confused: 3,
    lonely: 2,
    happy: 1
  },
  activeDays: [1, 2, 3, 4, 5, 6, 7]
}

export const emotionLabels: Record<string, { label: string; color: string }> = {
  anxious: { label: '焦虑', color: '#f87171' },
  sad: { label: '难过', color: '#60a5fa' },
  tired: { label: '疲惫', color: '#9ca3af' },
  angry: { label: '烦躁', color: '#fb923c' },
  confused: { label: '迷茫', color: '#a78bfa' },
  lonely: { label: '孤独', color: '#f472b6' },
  happy: { label: '开心', color: '#34d399' }
}

export const taskTypeLabels: Record<string, string> = {
  comfort: '求安慰',
  walk: '散步邀约',
  listen: '倾听陪伴',
  help: '互助帮忙'
}
