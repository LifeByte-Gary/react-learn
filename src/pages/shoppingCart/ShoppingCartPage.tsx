import React from 'react'
import styles from './ShoppingCartPage.module.css'
import { TheMainLayout } from '@/components'
import { Affix, Col, Row } from 'antd'

export const ShoppingCartPage: React.FC = () => {
  return (
    <TheMainLayout>
      <Row>
        {/* 购物车清单 */}
        <Col span={16}>
          <div className={styles.productListContainer}>{/* <ProductList /> */}</div>
        </Col>
        {/* 支付卡组件 */}
        <Col span={8}>
          <Affix>
            <div className={styles.paymentCardContainer}>{/* <PaymentCard /> */}</div>
          </Affix>
        </Col>
      </Row>
    </TheMainLayout>
  )
}
