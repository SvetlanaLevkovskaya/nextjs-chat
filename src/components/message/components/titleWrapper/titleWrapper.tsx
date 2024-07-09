import { FC } from 'react'

import styles from './titleWrapper.module.scss'

export const TitleWrapper: FC = () => (
  <div className={styles.titleWrapper}>
    <p className={styles.titleName}>Andrew</p>
    <p className={styles.textNeutral500}>Product</p>
  </div>
)
