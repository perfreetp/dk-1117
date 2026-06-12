import React, { useState } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import styles from './index.module.scss'
import { mockUser } from '@/data/mock'

const SettingsPage: React.FC = () => {
  const [notifications, setNotifications] = useState(true)
  const [sound, setSound] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'editProfile' | 'manageCircle' | 'about'>('about')

  const handleEditProfile = () => {
    setModalType('editProfile')
    setShowModal(true)
  }

  const handleManageCircle = () => {
    setModalType('manageCircle')
    setShowModal(true)
  }

  const handleAbout = () => {
    setModalType('about')
    setShowModal(true)
  }

  const handleLogout = () => {
    Taro.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({ title: '已退出', icon: 'success' })
        }
      }
    })
  }

  const getModalTitle = () => {
    switch (modalType) {
      case 'editProfile': return '编辑资料'
      case 'manageCircle': return '圈子管理'
      case 'about': return '关于我们'
      default: return ''
    }
  }

  const getModalContent = () => {
    switch (modalType) {
      case 'editProfile':
        return (
          <>
            <View className={styles.modalBtn} onClick={() => { setShowModal(false); Taro.showToast({ title: '头像修改功能开发中', icon: 'none' }) }}>
              <Text>修改头像</Text>
            </View>
            <View className={styles.modalBtn} onClick={() => { setShowModal(false); Taro.showToast({ title: '昵称修改功能开发中', icon: 'none' }) }}>
              <Text>修改昵称</Text>
            </View>
            <View className={styles.modalCancel} onClick={() => setShowModal(false)}>
              <Text>取消</Text>
            </View>
          </>
        )
      case 'manageCircle':
        return (
          <>
            <View className={styles.modalBtn} onClick={() => { setShowModal(false); Taro.showToast({ title: '创建圈子功能开发中', icon: 'none' }) }}>
              <Text>创建圈子</Text>
            </View>
            <View className={styles.modalBtn} onClick={() => { setShowModal(false); Taro.showToast({ title: '邀请成员功能开发中', icon: 'none' }) }}>
              <Text>邀请成员</Text>
            </View>
            <View className={styles.modalCancel} onClick={() => setShowModal(false)}>
              <Text>取消</Text>
            </View>
          </>
        )
      case 'about':
        return (
          <>
            <View className={styles.modalBtn} onClick={() => { setShowModal(false); Taro.showToast({ title: '帮助文档开发中', icon: 'none' }) }}>
              <Text>帮助文档</Text>
            </View>
            <View className={styles.modalBtn} onClick={() => { setShowModal(false); Taro.showToast({ title: '意见反馈功能开发中', icon: 'none' }) }}>
              <Text>意见反馈</Text>
            </View>
            <View className={styles.modalCancel} onClick={() => setShowModal(false)}>
              <Text>取消</Text>
            </View>
          </>
        )
      default: return null
    }
  }

  return (
    <ScrollView className={styles.page} scrollY>
      <View className={styles.userCard}>
        <View className={styles.userInfo}>
          <Image className={styles.userAvatar} src={mockUser.avatar} mode="aspectFill" />
          <View className={styles.userDetail}>
            <Text className={styles.userName}>{mockUser.nickname}</Text>
            <Text className={styles.userRole}>{mockUser.role === 'admin' ? '管理员' : '成员'}</Text>
          </View>
        </View>
        <View className={styles.userStats}>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>12</Text>
            <Text className={styles.statLabel}>发布崩溃</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>89</Text>
            <Text className={styles.statLabel}>收到抱抱</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>3</Text>
            <Text className={styles.statLabel}>加入圈子</Text>
          </View>
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.settingItem} onClick={handleEditProfile}>
          <View className={styles.switchWrapper}>
            <Text className={styles.settingIcon}>👤</Text>
            <Text className={styles.settingLabel}>个人资料</Text>
          </View>
          <Text className={styles.settingArrow}>›</Text>
        </View>
        <View className={styles.settingItem} onClick={handleManageCircle}>
          <View className={styles.switchWrapper}>
            <Text className={styles.settingIcon}>👥</Text>
            <Text className={styles.settingLabel}>圈子管理</Text>
          </View>
          <Text className={styles.settingArrow}>›</Text>
        </View>
      </View>

      <View className={styles.divider} />

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>通知设置</Text>
        <View className={styles.settingItem}>
          <View className={styles.switchWrapper}>
            <Text className={styles.settingIcon}>🔔</Text>
            <Text className={styles.settingLabel}>消息通知</Text>
          </View>
          <View 
            className={`${styles.switch} ${notifications ? styles.active : ''}`}
            onClick={() => setNotifications(!notifications)}
          >
            <View className={styles.switchDot} />
          </View>
        </View>
        <View className={styles.settingItem}>
          <View className={styles.switchWrapper}>
            <Text className={styles.settingIcon}>🔊</Text>
            <Text className={styles.settingLabel}>声音提醒</Text>
          </View>
          <View 
            className={`${styles.switch} ${sound ? styles.active : ''}`}
            onClick={() => setSound(!sound)}
          >
            <View className={styles.switchDot} />
          </View>
        </View>
      </View>

      <View className={styles.divider} />

      <View className={styles.section}>
        <View className={styles.settingItem} onClick={handleAbout}>
          <View className={styles.switchWrapper}>
            <Text className={styles.settingIcon}>ℹ️</Text>
            <Text className={styles.settingLabel}>关于我们</Text>
          </View>
          <Text className={styles.settingArrow}>›</Text>
        </View>
      </View>

      <View className={styles.divider} />

      <View className={styles.section}>
        <View className={styles.settingItem} onClick={handleLogout}>
          <View className={styles.switchWrapper}>
            <Text className={styles.settingIcon}>🚪</Text>
            <Text className={styles.settingLabel} style={{ color: '#f53f3f' }}>退出登录</Text>
          </View>
        </View>
      </View>

      <View className={styles.footer}>
        <Text className={styles.footerText}>今日崩溃 - 温暖每一颗心</Text>
        <Text className={styles.footerVersion}>版本 1.0.0</Text>
      </View>

      {showModal && (
        <View className={styles.modal} onClick={() => setShowModal(false)}>
          <View className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <Text className={styles.modalTitle}>{getModalTitle()}</Text>
            {getModalContent()}
          </View>
        </View>
      )}
    </ScrollView>
  )
}

export default SettingsPage
