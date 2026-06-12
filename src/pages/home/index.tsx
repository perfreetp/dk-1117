import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView, Input, Textarea } from '@tarojs/components'
import styles from './index.module.scss'
import CircleCard from '@/components/CircleCard'
import PostCard from '@/components/PostCard'
import { mockUser, mockCircles, mockPosts } from '@/data/mock'
import { storage } from '@/utils/storage'
import type { Circle, CollapsePost } from '@/types'

type ModalType = 'menu' | 'create' | 'join' | 'created'

const HomePage: React.FC = () => {
  const [circles, setCircles] = useState<Circle[]>([])
  const [posts, setPosts] = useState<CollapsePost[]>([])
  const [activeCircle, setActiveCircle] = useState<string>('')
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<ModalType>('menu')
  const [newCircle, setNewCircle] = useState({ name: '', description: '', code: '' })
  const [joinCode, setJoinCode] = useState('')
  const [createdCode, setCreatedCode] = useState('')

  useEffect(() => {
    const storedCircles = storage.getCircles<Circle>()
    const storedPosts = storage.getPosts<CollapsePost>()
    const storedActiveCircle = storage.getActiveCircle()
    
    let initialCircles: Circle[]
    let initialActiveCircle: string
    
    if (storedCircles.length > 0) {
      initialCircles = storedCircles
    } else {
      initialCircles = mockCircles
      storage.setCircles(mockCircles)
    }
    
    if (storedPosts.length > 0) {
      setPosts(storedPosts)
    } else {
      setPosts(mockPosts)
      storage.setPosts(mockPosts)
    }
    
    setCircles(initialCircles)
    
    if (storedActiveCircle && initialCircles.some(c => c.id === storedActiveCircle)) {
      initialActiveCircle = storedActiveCircle
    } else if (initialCircles.length > 0) {
      initialActiveCircle = initialCircles[0].id
    } else {
      initialActiveCircle = ''
    }
    
    setActiveCircle(initialActiveCircle)
    storage.setActiveCircle(initialActiveCircle)
  }, [])

  const handleCircleClick = (circleId: string) => {
    setActiveCircle(circleId)
    storage.setActiveCircle(circleId)
  }

  const handleHug = (postId: string) => {
    const updatedPosts = posts.map(post => 
      post.id === postId ? { ...post, hugs: post.hugs + 1 } : post
    )
    setPosts(updatedPosts)
    storage.setPosts(updatedPosts)
  }

  const handleWithdraw = (postId: string) => {
    const updatedPosts = posts.filter(post => post.id !== postId)
    setPosts(updatedPosts)
    storage.setPosts(updatedPosts)
    Taro.showToast({ title: '已撤回', icon: 'success' })
  }

  const handleCreateCircle = () => {
    if (!newCircle.name.trim()) {
      Taro.showToast({ title: '请输入圈子名称', icon: 'none' })
      return
    }
    
    const code = storage.generateInviteCode()
    const circle: Circle = {
      id: `circle-${Date.now()}`,
      name: newCircle.name,
      description: newCircle.description || '暂无简介',
      code,
      members: [{ ...mockUser, role: 'admin' }],
      createdAt: new Date().toLocaleDateString(),
      isActive: true
    }
    
    const updatedCircles = [...circles, circle]
    setCircles(updatedCircles)
    storage.setCircles(updatedCircles)
    setActiveCircle(circle.id)
    storage.setActiveCircle(circle.id)
    setCreatedCode(code)
    setModalType('created')
    setNewCircle({ name: '', description: '', code: '' })
  }

  const handleJoinCircle = () => {
    if (!joinCode.trim()) {
      Taro.showToast({ title: '请输入邀请码', icon: 'none' })
      return
    }
    
    const targetCode = joinCode.toUpperCase()
    
    const existingCircle = circles.find(c => c.code === targetCode)
    if (existingCircle) {
      Taro.showToast({ title: '您已加入该圈子', icon: 'none' })
      setActiveCircle(existingCircle.id)
      storage.setActiveCircle(existingCircle.id)
      setShowModal(false)
      setJoinCode('')
      return
    }
    
    const mockCircle = mockCircles.find(c => c.code === targetCode)
    if (mockCircle) {
      const newCircle: Circle = {
        ...mockCircle,
        members: [...mockCircle.members, { ...mockUser, role: 'member' }]
      }
      
      const updatedCircles = [...circles, newCircle]
      setCircles(updatedCircles)
      storage.setCircles(updatedCircles)
      setActiveCircle(newCircle.id)
      storage.setActiveCircle(newCircle.id)
      setShowModal(false)
      setJoinCode('')
      Taro.showToast({ title: '加入成功', icon: 'success' })
      return
    }
    
    Taro.showToast({ title: '邀请码错误', icon: 'none' })
  }

  const handlePin = (postId: string) => {
    const currentCircle = circles.find(c => c.id === activeCircle)
    if (!currentCircle) return
    
    const isAdmin = currentCircle.members.some(m => m.id === mockUser.id && m.role === 'admin')
    if (!isAdmin) return
    
    const updatedPosts = posts.map(post => 
      post.id === postId ? { ...post, isTop: !post.isTop } : post
    )
    setPosts(updatedPosts)
    storage.setPosts(updatedPosts)
    
    const targetPost = updatedPosts.find(p => p.id === postId)
    const message = targetPost?.isTop ? '已置顶' : '已取消置顶'
    Taro.showToast({ title: message, icon: 'success' })
  }

  const filteredPosts = posts.filter(post => {
    if (!activeCircle) return false
    return post.circleId === activeCircle
  }).sort((a, b) => {
    if (a.isTop && !b.isTop) return -1
    if (!a.isTop && b.isTop) return 1
    return 0
  })

  const currentCircle = circles.find(c => c.id === activeCircle)
  const isAdmin = currentCircle?.members.some(m => m.id === mockUser.id && m.role === 'admin')

  return (
    <ScrollView className={styles.page} scrollY>
      <View className={styles.header}>
        <Text className={styles.title}>今日崩溃</Text>
        <View className={styles.userInfo}>
          <Text className={styles.userName}>{mockUser.nickname}</Text>
          <Image className={styles.userAvatar} src={mockUser.avatar} mode="aspectFill" />
        </View>
      </View>
      
      <Text className={styles.greeting}>今天也要好好照顾自己呀 🌟</Text>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>我的圈子</Text>
        <View className={styles.circleList}>
          {circles.map(circle => (
            <CircleCard
              key={circle.id}
              circle={circle}
              active={activeCircle === circle.id}
              onClick={() => handleCircleClick(circle.id)}
            />
          ))}
        </View>
      </View>

      {currentCircle && (
        <View className={styles.postsSection}>
          <Text className={styles.sectionTitle}>{currentCircle.name} - 最新动态</Text>
          <View className={styles.postsList}>
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <View 
                  key={post.id} 
                  onLongPress={() => isAdmin && handlePin(post.id)}
                >
                  <PostCard
                    post={post}
                    onHug={handleHug}
                    onWithdraw={handleWithdraw}
                  />
                </View>
              ))
            ) : (
              <View className={styles.emptyPosts}>
                <Text className={styles.emptyText}>暂无动态</Text>
              </View>
            )}
          </View>
        </View>
      )}

      <View className={styles.floatingBtn} onClick={() => { setModalType('menu'); setShowModal(true) }}>
        <Text className={styles.floatingIcon}>+</Text>
      </View>

      {showModal && (
        <View className={styles.modal} onClick={() => setShowModal(false)}>
          <View className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {modalType === 'menu' && (
              <>
                <Text className={styles.modalTitle}>选择操作</Text>
                <View className={styles.modalBtn} onClick={() => { setModalType('create'); setNewCircle({ name: '', description: '', code: '' }) }}>
                  <Text>创建私密小圈</Text>
                </View>
                <View className={styles.modalBtn} onClick={() => { setModalType('join'); setJoinCode('') }}>
                  <Text>邀请码加入</Text>
                </View>
                <View className={styles.modalCancel} onClick={() => setShowModal(false)}>
                  <Text>取消</Text>
                </View>
              </>
            )}

            {modalType === 'create' && (
              <>
                <Text className={styles.modalTitle}>创建私密小圈</Text>
                <View className={styles.formGroup}>
                  <Text className={styles.formLabel}>圈子名称</Text>
                  <Input
                    className={styles.formInput}
                    placeholder="请输入圈子名称"
                    value={newCircle.name}
                    onChange={(e) => setNewCircle({ ...newCircle, name: e.detail.value })}
                  />
                </View>
                <View className={styles.formGroup}>
                  <Text className={styles.formLabel}>圈子简介</Text>
                  <Textarea
                    className={styles.formTextarea}
                    placeholder="请输入圈子简介（可选）"
                    value={newCircle.description}
                    onChange={(e) => setNewCircle({ ...newCircle, description: e.detail.value })}
                  />
                </View>
                <View className={styles.modalActions}>
                  <View className={styles.modalBtn} onClick={() => setModalType('menu')} style={{ flex: 1 }}>
                    <Text>取消</Text>
                  </View>
                  <View className={styles.modalSubmit} onClick={handleCreateCircle}>
                    <Text>创建圈子</Text>
                  </View>
                </View>
              </>
            )}

            {modalType === 'join' && (
              <>
                <Text className={styles.modalTitle}>邀请码加入</Text>
                <View className={styles.formGroup}>
                  <Text className={styles.formLabel}>邀请码</Text>
                  <Input
                    className={styles.formInput}
                    placeholder="请输入6位邀请码"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.detail.value.toUpperCase())}
                    maxLength={6}
                  />
                  <Text className={styles.formLabel} style={{ marginTop: '20rpx', fontSize: '22rpx', color: '#9ca3af' }}>
                    示例邀请码：ABC123、DEF456、GHI789
                  </Text>
                </View>
                <View className={styles.modalActions}>
                  <View className={styles.modalBtn} onClick={() => setModalType('menu')} style={{ flex: 1 }}>
                    <Text>取消</Text>
                  </View>
                  <View className={styles.modalSubmit} onClick={handleJoinCircle}>
                    <Text>加入圈子</Text>
                  </View>
                </View>
              </>
            )}

            {modalType === 'created' && (
              <>
                <Text className={styles.modalTitle}>创建成功</Text>
                <View className={styles.formGroup}>
                  <Text className={styles.formLabel}>您的邀请码</Text>
                  <View className={styles.codeDisplay}>
                    <Text>{createdCode}</Text>
                  </View>
                  <Text className={styles.formLabel} style={{ marginTop: '20rpx', fontSize: '22rpx', color: '#9ca3af' }}>
                    请将邀请码分享给好友，邀请他们加入圈子
                  </Text>
                </View>
                <View className={styles.modalSubmit} onClick={() => setShowModal(false)}>
                  <Text>知道了</Text>
                </View>
              </>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  )
}

export default HomePage
