import React from 'react'
import { View, Text } from '@tarojs/components'
import styles from './index.module.scss'
import type { Task } from '@/types'
import { taskTypeLabels } from '@/data/mock'

interface TaskCardProps {
  task: Task
  onClaim: (id: string) => void
  onComplete: (id: string) => void
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClaim, onComplete }) => {
  const typeLabel = taskTypeLabels[task.type]

  const getStatusText = () => {
    switch (task.status) {
      case 'available': return '可领取'
      case 'claimed': return '进行中'
      case 'completed': return '已完成'
      default: return ''
    }
  }

  const getStatusStyle = () => {
    switch (task.status) {
      case 'available': return { backgroundColor: '#e879f920', color: '#e879f9' }
      case 'claimed': return { backgroundColor: '#fbbf2420', color: '#fbbf24' }
      case 'completed': return { backgroundColor: '#34d39920', color: '#34d399' }
      default: return {}
    }
  }

  const getTypeStyle = () => {
    switch (task.type) {
      case 'comfort': return { backgroundColor: '#f8717120', color: '#f87171' }
      case 'walk': return { backgroundColor: '#60a5fa20', color: '#60a5fa' }
      case 'listen': return { backgroundColor: '#a78bfa20', color: '#a78bfa' }
      case 'help': return { backgroundColor: '#34d39920', color: '#34d399' }
      default: return {}
    }
  }

  return (
    <View className={styles.card}>
      <View className={styles.header}>
        <View className={styles.typeTag} style={getTypeStyle()}>{typeLabel}</View>
        <View className={styles.statusTag} style={getStatusStyle()}>{getStatusText()}</View>
      </View>
      <View className={styles.content}>
        <Text className={styles.title}>{task.title}</Text>
        <Text className={styles.desc}>{task.description}</Text>
      </View>
      <View className={styles.footer}>
        <View className={styles.author}>
          <Text className={styles.authorName}>{task.authorNickname}</Text>
          <Text className={styles.time}>{task.createdAt}</Text>
        </View>
        <View className={styles.reward}>
          <Text className={styles.rewardIcon}>❤️</Text>
          <Text className={styles.rewardText}>{task.reward}</Text>
        </View>
      </View>
      <View className={styles.actions}>
        {task.status === 'available' && (
          <View className={styles.claimBtn} onClick={() => onClaim(task.id)}>
            <Text>领取任务</Text>
          </View>
        )}
        {task.status === 'claimed' && (
          <View className={styles.completeBtn} onClick={() => onComplete(task.id)}>
            <Text>完成任务</Text>
          </View>
        )}
        {task.status === 'completed' && (
          <View className={styles.doneBtn}>
            <Text>已完成</Text>
          </View>
        )}
      </View>
    </View>
  )
}

export default TaskCard
