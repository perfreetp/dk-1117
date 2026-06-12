import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import styles from './index.module.scss'
import type { Circle } from '@/types'

interface CircleCardProps {
  circle: Circle
  active: boolean
  onClick: () => void
}

const CircleCard: React.FC<CircleCardProps> = ({ circle, active, onClick }) => {
  return (
    <View className={styles.card} onClick={onClick}>
      <View className={styles.header}>
        <Image className={styles.avatar} src={circle.members[0]?.avatar} mode="aspectFill" />
        <View className={styles.info}>
          <Text className={styles.name}>{circle.name}</Text>
          <Text className={styles.desc}>{circle.description}</Text>
        </View>
        {active && <View className={styles.active} />}
      </View>
      <View className={styles.members}>
        {circle.members.slice(0, 3).map((member, index) => (
          <Image
            key={member.id}
            className={styles.memberAvatar}
            style={{ marginLeft: index > 0 ? '-16rpx' : '0', zIndex: 3 - index }}
            src={member.avatar}
            mode="aspectFill"
          />
        ))}
        {circle.members.length > 3 && (
          <View className={styles.more}>+{circle.members.length - 3}</View>
        )}
        <Text className={styles.count}>{circle.members.length}位成员</Text>
      </View>
    </View>
  )
}

export default CircleCard
