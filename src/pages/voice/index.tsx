import React, { useState } from 'react'
import { View, Text, Textarea } from '@tarojs/components'
import styles from './index.module.scss'
import type { EmotionType } from '@/types'
import { emotionLabels } from '@/data/mock'

const VoicePage: React.FC = () => {
  const [content, setContent] = useState('')
  const [emotion, setEmotion] = useState<EmotionType>('sad')
  const [visibility, setVisibility] = useState<'all' | 'anonymous' | 'friends'>('all')
  const [needCompanion, setNeedCompanion] = useState(false)
  const [walkInvitation, setWalkInvitation] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showWarning, setShowWarning] = useState(false)

  const emotions: { key: EmotionType; label: string }[] = [
    { key: 'anxious', label: '焦虑' },
    { key: 'sad', label: '难过' },
    { key: 'tired', label: '疲惫' },
    { key: 'angry', label: '烦躁' },
    { key: 'confused', label: '迷茫' },
    { key: 'lonely', label: '孤独' },
    { key: 'happy', label: '开心' }
  ]

  const visibilityOptions = [
    { key: 'all' as const, label: '所有人可见' },
    { key: 'anonymous' as const, label: '匿名发布' },
    { key: 'friends' as const, label: '仅好友' }
  ]

  const checkSensitiveContent = (text: string): boolean => {
    const sensitiveWords = ['自杀', '想死', '割腕', '跳楼', '自残']
    return sensitiveWords.some(word => text.includes(word))
  }

  const handleSubmit = () => {
    if (!content.trim()) {
      Taro.showToast({ title: '请输入内容', icon: 'none' })
      return
    }
    
    if (checkSensitiveContent(content)) {
      setShowWarning(true)
      setTimeout(() => setShowWarning(false), 3000)
      return
    }
    
    setShowPreview(true)
  }

  const handleConfirmSubmit = () => {
    Taro.showToast({ title: '发布成功', icon: 'success' })
    setShowPreview(false)
    setContent('')
    setEmotion('sad')
    setVisibility('all')
    setNeedCompanion(false)
    setWalkInvitation(false)
  }

  const getAuthorLabel = () => {
    switch (visibility) {
      case 'anonymous': return '匿名用户'
      case 'friends': return '仅好友可见'
      default: return '我'
    }
  }

  return (
    <View className={styles.page}>
      <Text className={styles.title}>匿名发声</Text>
      <Text className={styles.subtitle}>说出你的心声，我们都在听</Text>

      <View className={styles.inputArea}>
        <Textarea
          className={styles.input}
          placeholder="在这里倾诉你的情绪..."
          value={content}
          onChange={(e) => setContent(e.detail.value)}
          maxLength={500}
        />
        <Text className={styles.inputHint}>{content.length}/500</Text>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>现在的心情</Text>
        <View className={styles.emotionList}>
          {emotions.map(item => (
            <View
              key={item.key}
              className={`${styles.emotionTag} ${emotion === item.key ? styles.active : ''}`}
              onClick={() => setEmotion(item.key)}
            >
              <Text>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>可见范围</Text>
        <View className={styles.visibilityList}>
          {visibilityOptions.map(item => (
            <View
              key={item.key}
              className={`${styles.visibilityTag} ${visibility === item.key ? styles.active : ''}`}
              onClick={() => setVisibility(item.key)}
            >
              <Text>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>额外选项</Text>
        <View className={styles.options}>
          <View className={styles.optionItem} onClick={() => setNeedCompanion(!needCompanion)}>
            <View className={`${styles.optionCheckbox} ${needCompanion ? styles.active : ''}`}>
              {needCompanion && <Text className={styles.checkIcon}>✓</Text>}
            </View>
            <Text className={styles.optionText}>需要陪伴</Text>
          </View>
          <View className={styles.optionItem} onClick={() => setWalkInvitation(!walkInvitation)}>
            <View className={`${styles.optionCheckbox} ${walkInvitation ? styles.active : ''}`}>
              {walkInvitation && <Text className={styles.checkIcon}>✓</Text>}
            </View>
            <Text className={styles.optionText}>散步邀约</Text>
          </View>
        </View>
      </View>

      <View 
        className={`${styles.submitBtn} ${!content.trim() ? styles.disabled : ''}`}
        onClick={handleSubmit}
      >
        <Text>发布崩溃</Text>
      </View>

      {showPreview && (
        <View className={styles.previewModal} onClick={() => setShowPreview(false)}>
          <View className={styles.previewContent} onClick={(e) => e.stopPropagation()}>
            <Text className={styles.previewTitle}>预览</Text>
            <View className={styles.previewCard}>
              <Text className={styles.previewAuthor}>{getAuthorLabel()}</Text>
              <Text className={styles.previewContentText}>{content}</Text>
              <View className={styles.previewTags}>
                <View className={styles.previewTag} style={{ backgroundColor: emotionLabels[emotion].color + '20', color: emotionLabels[emotion].color }}>
                  {emotionLabels[emotion].label}
                </View>
                {needCompanion && <View className={styles.previewTag}>需要陪伴</View>}
                {walkInvitation && <View className={styles.previewTag}>散步邀约</View>}
              </View>
            </View>
            <View className={styles.previewActions}>
              <View className={styles.previewCancel} onClick={() => setShowPreview(false)}>
                <Text>取消</Text>
              </View>
              <View className={styles.previewSubmit} onClick={handleConfirmSubmit}>
                <Text>确认发布</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {showWarning && (
        <View className={styles.warningToast}>
          <Text>检测到敏感内容，请珍惜自己</Text>
        </View>
      )}
    </View>
  )
}

export default VoicePage
