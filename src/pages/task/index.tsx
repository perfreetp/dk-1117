import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Input, Textarea } from '@tarojs/components'
import styles from './index.module.scss'
import TaskCard from '@/components/TaskCard'
import { mockTasks, mockUser } from '@/data/mock'
import { storage } from '@/utils/storage'
import type { Task } from '@/types'

const TaskPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [activeTab, setActiveTab] = useState<'all' | 'available' | 'claimed'>('all')
  const [showModal, setShowModal] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    type: 'comfort' as 'comfort' | 'walk' | 'listen' | 'help',
    reward: 5
  })

  useEffect(() => {
    const storedTasks = storage.getTasks<Task>()
    if (storedTasks.length > 0) {
      setTasks(storedTasks)
    } else {
      setTasks(mockTasks)
      storage.setTasks(mockTasks)
    }
  }, [])

  const tabs = [
    { key: 'all' as const, label: '全部' },
    { key: 'available' as const, label: '可领取' },
    { key: 'claimed' as const, label: '进行中' }
  ]

  const taskTypes = [
    { key: 'comfort' as const, label: '求安慰' },
    { key: 'walk' as const, label: '散步邀约' },
    { key: 'listen' as const, label: '倾听陪伴' },
    { key: 'help' as const, label: '互助帮忙' }
  ]

  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'all') return true
    return task.status === activeTab
  })

  const availableCount = tasks.filter(t => t.status === 'available').length
  const claimedCount = tasks.filter(t => t.status === 'claimed').length
  const completedCount = tasks.filter(t => t.status === 'completed').length

  const handleClaim = (taskId: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, status: 'claimed' as const, claimedAt: new Date().toLocaleString(), claimedBy: mockUser.id } : task
    )
    setTasks(updatedTasks)
    storage.setTasks(updatedTasks)
    Taro.showToast({ title: '领取成功', icon: 'success' })
  }

  const handleComplete = (taskId: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, status: 'completed' as const, completedAt: new Date().toLocaleString() } : task
    )
    setTasks(updatedTasks)
    storage.setTasks(updatedTasks)
    Taro.showToast({ title: '完成成功', icon: 'success' })
  }

  const handleSubmitTask = () => {
    if (!newTask.title.trim()) {
      Taro.showToast({ title: '请输入标题', icon: 'none' })
      return
    }
    const task: Task = {
      id: `task-${Date.now()}`,
      ...newTask,
      status: 'available',
      authorId: mockUser.id,
      authorNickname: mockUser.nickname,
      createdAt: new Date().toLocaleString()
    }
    const updatedTasks = [task, ...tasks]
    setTasks(updatedTasks)
    storage.setTasks(updatedTasks)
    setShowModal(false)
    setNewTask({ title: '', description: '', type: 'comfort', reward: 5 })
    Taro.showToast({ title: '发布成功', icon: 'success' })
  }

  return (
    <ScrollView className={styles.page} scrollY>
      <Text className={styles.title}>互助任务</Text>
      <Text className={styles.subtitle}>互相帮助，温暖彼此</Text>

      <View className={styles.statsCard}>
        <Text className={styles.statsTitle}>📋 任务统计</Text>
        <View className={styles.statsRow}>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>{availableCount}</Text>
            <Text className={styles.statLabel}>待领取</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>{claimedCount}</Text>
            <Text className={styles.statLabel}>进行中</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>{completedCount}</Text>
            <Text className={styles.statLabel}>已完成</Text>
          </View>
        </View>
      </View>

      <View className={styles.tabs}>
        {tabs.map(tab => (
          <View
            key={tab.key}
            className={`${styles.tabItem} ${activeTab === tab.key ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <Text>{tab.label}</Text>
          </View>
        ))}
      </View>

      <View className={styles.taskList}>
        {filteredTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onClaim={handleClaim}
            onComplete={handleComplete}
          />
        ))}
      </View>

      {filteredTasks.length === 0 && (
        <View className={styles.empty}>
          <Text className={styles.emptyText}>暂无任务</Text>
        </View>
      )}

      <View className={styles.floatingBtn} onClick={() => setShowModal(true)}>
        <Text className={styles.floatingIcon}>+</Text>
      </View>

      {showModal && (
        <View className={styles.modal} onClick={() => setShowModal(false)}>
          <View className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <Text className={styles.modalTitle}>发布任务</Text>
            
            <View className={styles.formGroup}>
              <Text className={styles.formLabel}>任务标题</Text>
              <Input
                className={styles.formInput}
                placeholder="请输入任务标题"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.detail.value })}
              />
            </View>

            <View className={styles.formGroup}>
              <Text className={styles.formLabel}>任务类型</Text>
              <View className={styles.typeSelector}>
                {taskTypes.map(type => (
                  <View
                    key={type.key}
                    className={`${styles.typeOption} ${newTask.type === type.key ? styles.active : ''}`}
                    onClick={() => setNewTask({ ...newTask, type: type.key })}
                  >
                    <Text>{type.label}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View className={styles.formGroup}>
              <Text className={styles.formLabel}>任务描述</Text>
              <Textarea
                className={styles.formTextarea}
                placeholder="请输入任务描述"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.detail.value })}
              />
            </View>

            <View className={styles.formGroup}>
              <Text className={styles.formLabel}>奖励 ❤️</Text>
              <Input
                className={styles.formInput}
                type="number"
                placeholder="5"
                value={newTask.reward.toString()}
                onChange={(e) => setNewTask({ ...newTask, reward: parseInt(e.detail.value) || 5 })}
              />
            </View>

            <View className={styles.modalActions}>
              <View className={styles.modalCancel} onClick={() => setShowModal(false)}>
                <Text>取消</Text>
              </View>
              <View className={styles.modalSubmit} onClick={handleSubmitTask}>
                <Text>发布任务</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  )
}

export default TaskPage
