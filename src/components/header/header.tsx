'use client'

import { CrownTwoTone, EllipsisOutlined } from '@ant-design/icons'
import Image from 'next/image'

import styles from './header.module.scss'

const avatars = ['/avatar.png', '/avatar.png', '/avatar.png', '/avatar.png']

export const Header = () => (
  <header className={styles.wrapper}>
    <div className={styles.header}>
      <div className={styles.imageWrapper}>
        {avatars.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`avatar-${index}`}
            width={32}
            height={32}
            className={styles.avatar}
          />
        ))}
      </div>

      <div className={styles.logoWrapper}>
        <div className={styles.subWrapper}>
          <CrownTwoTone twoToneColor="#eb2f96" />

          <h4>Team Unicorns</h4>
        </div>

        <span>last seen 45 minutes ago</span>
      </div>

      <div className={styles.iconWrapper}>
        <EllipsisOutlined style={{ color: '#666668', fontSize: 16 }} />
      </div>
    </div>
  </header>
)
