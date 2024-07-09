import { FC } from 'react'

import Image from 'next/image'

import styles from './avatarWrapper.module.scss'

export const AvatarWrapper: FC = () => (
  <div className={styles.avatarWrapper}>
    <Image src="/avatar.png" alt="avatar" className={styles.avatar} width={32} height={32} />
    <span className={styles.badge}></span>
  </div>
)
