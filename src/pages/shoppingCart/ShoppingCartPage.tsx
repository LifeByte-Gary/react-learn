import React, { useEffect } from 'react'
import styles from './ShoppingCartPage.module.css'
import { TheMainLayout } from '@/components'
import { Affix, Col, Row } from 'antd'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchShoppingCart } from '@/redux/shoppingCart/slice'

export const ShoppingCartPage: React.FC = () => {
  const jwt = useAppSelector((state) => state.user.token)
  const items = useAppSelector((state) => state.shoppingCart.items)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (jwt != null) void dispatch(fetchShoppingCart(jwt))
  }, [])

  return (
    <TheMainLayout>
      <Row>
        {/* 购物车清单 */}
        <Col span={16}>
          <div className={styles.productListContainer}>{/* <ProductList /> */}</div>
          <div>{items[0].id}</div>
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
