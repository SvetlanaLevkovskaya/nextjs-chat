'use client'

import { CrownTwoTone, EllipsisOutlined } from '@ant-design/icons'
import Image from 'next/image'

import styles from './header.module.scss'

export const Header = () => (
  <header className={styles.wrapper}>
    <div className={styles.imageWrapper}>
      <Image src="/avatar-group.png" alt="avatar-group" width={100} height={50} priority />
    </div>

    <div className={styles.logoWrapper}>
      <div className={styles.subWrapper}>
        <CrownTwoTone twoToneColor="#eb2f96" />

        <h4>Team Unicorns</h4>
      </div>

      <span>last seen 45 minutes ago</span>
    </div>

    <div className={styles.iconWrapper}>
      <EllipsisOutlined style={{ color: '#666668' }} />
    </div>
  </header>
)
