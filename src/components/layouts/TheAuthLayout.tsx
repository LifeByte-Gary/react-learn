import React from 'react'
import styles from './TheAuthLayout.module.css'
import logo from '@/assets/react.svg'
import { Link } from 'react-router-dom'
import { CaretDownOutlined } from '@ant-design/icons'
import { Button, Dropdown, Layout, Menu } from 'antd'

const { Header, Footer, Content } = Layout

interface PropsTypes {
  children: React.ReactNode
}

export const TheAuthLayout: React.FC<PropsTypes> = ({ children }) => {
  const menu = (
    <Menu>
      <Menu.Item>中文</Menu.Item>
      <Menu.Item>English</Menu.Item>
    </Menu>
  )

  return (
    <Layout className={styles.userLayoutContainer}>
      <Header className={styles.header}>
        <div className={styles.lang}>
          <Dropdown overlay={menu}>
            <Button>
              选择语言 <CaretDownOutlined />
            </Button>
          </Dropdown>
        </div>
      </Header>
      <Content className={styles.content}>
        <div className={styles.top}>
          <div className={styles.contentHeader}>
            <Link to="/">
              <img
                alt="logo"
                className={styles.logo}
                src={logo}
              />
              <span className={styles.title}>React 旅游网</span>
            </Link>
          </div>
          <div className={styles.desc}>慕课网 是我朝最具影响力的 线上课程学习网站</div>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Footer就不写了，太累了</Footer>
    </Layout>
  )
}
