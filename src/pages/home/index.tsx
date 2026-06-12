import React, { useState } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import styles from './index.module.scss'
import CircleCard from '@/components/CircleCard'
import PostCard from '@/components/PostCard'
import { mockUser, mockCircles, mockPosts } from '@/data/mock'
import type { Circle, CollapsePost } from '@/types'

const HomePage: React.FC = () => {
  const [circles, setCircles] = useState<Circle[]>(mockCircles)
  const [posts, setPosts] = useState<CollapsePost[]>(mockPosts)
  const [activeCircle, setActiveCircle] = useState<string>('circle-001')
  const [showModal, setShowModal] = useState(false)

  const handleCircleClick = (circleId: string) => {
    setActiveCircle(circleId)
  }

  const handleHug = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, hugs: post.hugs + 1 } : post
    ))
  }

  const handleWithdraw = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId))
    Taro.showToast({ title: '已撤回', icon: 'success' })
  }

  const handleCreateCircle = () => {
    setShowModal(false)
    Taro.showToast({ title: '创建成功', icon: 'success' })
  }

  const handleJoinCircle = () => {
    setShowModal(false)
    Taro.showToast({ title: '加入成功', icon: 'success' })
  }

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

      <View className={styles.postsSection}>
        <Text className={styles.sectionTitle}>最新动态</Text>
        <View className={styles.postsList}>
          {posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onHug={handleHug}
              onWithdraw={handleWithdraw}
            />
          ))}
        </View>
      </View>

      <View className={styles.floatingBtn} onClick={() => setShowModal(true)}>
        <Text className={styles.floatingIcon}>+</Text>
      </View>

      {showModal && (
        <View className={styles.modal} onClick={() => setShowModal(false)}>
          <View className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <Text className={styles.modalTitle}>选择操作</Text>
            <View className={styles.modalBtn} onClick={handleCreateCircle}>
              <Text>创建私密小圈</Text>
            </View>
            <View className={styles.modalBtn} onClick={handleJoinCircle}>
              <Text>邀请码加入</Text>
            </View>
            <View className={styles.modalCancel} onClick={() => setShowModal(false)}>
              <Text>取消</Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  )
}

export default HomePage
