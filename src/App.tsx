import React from 'react'
import styles from './App.module.css'
import { Carousel, Footer, Header, SideMenu } from './components'
import { Col, Row } from 'antd'

function App(): JSX.Element {
  return (
    <div className={styles.App}>
      <Header />
      <div className={styles.pageContent}>
        <Row style={{ marginTop: 20 }}>
          <Col span={6}>
            <SideMenu />
          </Col>
          <Col span={18}>
            <Carousel />
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  )
}

export default App
