import React, { ReactNode } from 'react'
import { Footer, Header } from '@/components'
import styles from './TheMainLayout.module.css'

interface PropsType {
  children: ReactNode
}

export const TheMainLayout: React.FC<PropsType> = ({ children }) => {
  return (
    <>
      <Header />
      <div className={styles.pageContent}>{children}</div>
      <Footer />
    </>
  )
}
