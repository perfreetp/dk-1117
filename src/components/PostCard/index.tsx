import React, { useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import styles from './index.module.scss'
import type { CollapsePost } from '@/types'
import { emotionLabels } from '@/data/mock'

interface PostCardProps {
  post: CollapsePost
  onHug: (id: string) => void
  onWithdraw?: (id: string) => void
}

const PostCard: React.FC<PostCardProps> = ({ post, onHug, onWithdraw }) => {
  const [showActions, setShowActions] = useState(false)
  const emotion = emotionLabels[post.emotion]

  const handleLongPress = () => {
    if (post.isAuthor) {
      setShowActions(true)
    }
  }

  return (
    <View className={styles.card} onLongPress={handleLongPress}>
      {post.isTop && <View className={styles.topTag}>置顶</View>}
      <View className={styles.header}>
        <Image className={styles.avatar} src="https://picsum.photos/id/64/200/200" mode="aspectFill" />
        <View className={styles.authorInfo}>
          <Text className={styles.authorName}>{post.authorNickname}</Text>
          <Text className={styles.time}>{post.createdAt}</Text>
        </View>
        {post.visibility === 'anonymous' && <Text className={styles.anonymous}>匿名</Text>}
      </View>
      <View className={styles.content}>
        <Text className={styles.text}>{post.content}</Text>
      </View>
      <View className={styles.tags}>
        <View className={styles.emotionTag} style={{ backgroundColor: emotion.color + '20', color: emotion.color }}>
          {emotion.label}
        </View>
        {post.visibility === 'friends' && (
          <View className={styles.friendsTag}>
            仅好友
          </View>
        )}
        {post.needCompanion && (
          <View className={styles.companionTag}>
            需要陪伴
          </View>
        )}
        {post.walkInvitation && (
          <View className={styles.walkTag}>
            散步邀约
          </View>
        )}
      </View>
      <View className={styles.actions}>
        <View className={styles.actionBtn} onClick={() => onHug(post.id)}>
          <Text className={styles.hugIcon}>🤗</Text>
          <Text className={styles.actionText}>{post.hugs} 抱抱</Text>
        </View>
        <View className={styles.actionBtn}>
          <Text className={styles.commentIcon}>💬</Text>
          <Text className={styles.actionText}>评论</Text>
        </View>
      </View>
      {showActions && (
        <View className={styles.actionSheet} onClick={() => setShowActions(false)}>
          <View className={styles.actionContent} onClick={(e) => e.stopPropagation()}>
            <View className={styles.actionItem} onClick={() => { onWithdraw?.(post.id); setShowActions(false) }}>
              <Text>撤回发言</Text>
            </View>
            <View className={styles.cancel} onClick={() => setShowActions(false)}>
              <Text>取消</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

export default PostCard
