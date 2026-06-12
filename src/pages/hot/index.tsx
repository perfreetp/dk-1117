import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import styles from './index.module.scss'
import { mockWeeklySummary, emotionLabels } from '@/data/mock'
import { storage } from '@/utils/storage'
import type { CollapsePost, EmotionType } from '@/types'

const HotPage: React.FC = () => {
  const [posts, setPosts] = useState<CollapsePost[]>([])

  useEffect(() => {
    const storedPosts = storage.getPosts<CollapsePost>()
    if (storedPosts.length > 0) {
      setPosts(storedPosts)
    }
  }, [])

  const publicPosts = posts.filter(post => post.visibility !== 'friends')
  const sortedPosts = [...publicPosts].sort((a, b) => b.hugs - a.hugs)
  const topPosts = sortedPosts.slice(0, 5)

  const handleHug = (postId: string) => {
    const updatedPosts = posts.map(post => 
      post.id === postId ? { ...post, hugs: post.hugs + 1 } : post
    )
    setPosts(updatedPosts)
    storage.setPosts(updatedPosts)
  }

  const getRankClass = (index: number) => {
    switch (index) {
      case 0: return styles.first
      case 1: return styles.second
      case 2: return styles.third
      default: return styles.other
    }
  }

  const totalEmotions = Object.values(mockWeeklySummary.emotionDistribution).reduce((a, b) => a + b, 0)

  const emotionList: { key: EmotionType; label: string; color: string }[] = [
    { key: 'sad', label: '难过', color: '#60a5fa' },
    { key: 'anxious', label: '焦虑', color: '#f87171' },
    { key: 'tired', label: '疲惫', color: '#9ca3af' },
    { key: 'confused', label: '迷茫', color: '#a78bfa' },
    { key: 'lonely', label: '孤独', color: '#f472b6' },
    { key: 'angry', label: '烦躁', color: '#fb923c' },
    { key: 'happy', label: '开心', color: '#34d399' }
  ]

  return (
    <ScrollView className={styles.page} scrollY>
      <Text className={styles.title}>今日热度</Text>
      <Text className={styles.subtitle}>看看大家都在说什么</Text>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>热力排行榜</Text>
          <Text className={styles.sectionMore}>查看全部</Text>
        </View>
        <View className={styles.rankingCard}>
          {topPosts.map((post, index) => (
            <View key={post.id} className={styles.rankingItem}>
              <View className={`${styles.rankingRank} ${getRankClass(index)}`}>
                <Text>{index + 1}</Text>
              </View>
              <View className={styles.rankingContent}>
                <Text className={styles.rankingText}>{post.content}</Text>
                <Text className={styles.rankingHugs}>
                  <Text className={styles.rankingHugsIcon}>🤗</Text>
                  {post.hugs} 抱抱
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>情绪分布</Text>
        </View>
        <View className={styles.emotionStats}>
          {emotionList.map(emotion => {
            const count = mockWeeklySummary.emotionDistribution[emotion.key] || 0
            const percentage = totalEmotions > 0 ? (count / totalEmotions * 100).toFixed(0) : '0'
            return (
              <View key={emotion.key} className={styles.emotionBar}>
                <View className={styles.emotionBarHeader}>
                  <Text className={styles.emotionBarLabel}>{emotion.label}</Text>
                  <Text className={styles.emotionBarValue}>{percentage}%</Text>
                </View>
                <View className={styles.emotionBarProgress}>
                  <View 
                    className={styles.emotionBarFill}
                    style={{ width: `${percentage}%`, backgroundColor: emotion.color }}
                  />
                </View>
              </View>
            )
          })}
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>本周情绪总结</Text>
        </View>
        <View className={styles.weeklySummary}>
          <Text className={styles.weeklyTitle}>📊 每周报告</Text>
          <View className={styles.weeklyStats}>
            <View className={styles.weeklyStat}>
              <Text className={styles.weeklyStatValue}>{publicPosts.length}</Text>
              <Text className={styles.weeklyStatLabel}>崩溃次数</Text>
            </View>
            <View className={styles.weeklyStat}>
              <Text className={styles.weeklyStatValue}>{publicPosts.reduce((sum, p) => sum + p.hugs, 0)}</Text>
              <Text className={styles.weeklyStatLabel}>收到抱抱</Text>
            </View>
            <View className={styles.weeklyStat}>
              <Text className={styles.weeklyStatValue}>7</Text>
              <Text className={styles.weeklyStatLabel}>活跃天数</Text>
            </View>
          </View>
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>热门崩溃</Text>
        </View>
        <View className={styles.hotPosts}>
          {sortedPosts.slice(0, 3).map(post => {
            const emotion = emotionLabels[post.emotion]
            return (
              <View key={post.id} className={styles.hotPostCard}>
                <View className={styles.hotPostHeader}>
                  <Image className={styles.hotPostAvatar} src="https://picsum.photos/id/64/200/200" mode="aspectFill" />
                  <Text className={styles.hotPostAuthor}>{post.authorNickname}</Text>
                  {post.visibility === 'anonymous' && <Text className={styles.hotPostAnonymous}>匿名</Text>}
                </View>
                <Text className={styles.hotPostContent}>{post.content}</Text>
                <View className={styles.hotPostTags}>
                  <View className={styles.hotPostTag} style={{ backgroundColor: emotion.color + '20', color: emotion.color }}>
                    {emotion.label}
                  </View>
                  {post.needCompanion && <View className={styles.hotPostTag}>需要陪伴</View>}
                  {post.walkInvitation && <View className={styles.hotPostTag}>散步邀约</View>}
                </View>
                <View className={styles.hotPostActions}>
                  <View className={styles.hotPostAction} onClick={() => handleHug(post.id)}>
                    <Text className={styles.hotPostActionIcon}>🤗</Text>
                    <Text className={styles.hotPostActionText}>{post.hugs} 抱抱</Text>
                  </View>
                  <View className={styles.hotPostAction}>
                    <Text className={styles.hotPostActionIcon}>💬</Text>
                    <Text className={styles.hotPostActionText}>评论</Text>
                  </View>
                </View>
              </View>
            )
          })}
        </View>
      </View>
    </ScrollView>
  )
}

export default HotPage
