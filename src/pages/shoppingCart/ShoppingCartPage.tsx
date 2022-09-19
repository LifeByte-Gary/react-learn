import React from 'react'
import styles from './ShoppingCartPage.module.css'
import { ProductList, TheMainLayout } from '@/components'
import { Affix, Col, Row } from 'antd'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { clearShoppingCart } from '@/redux/shoppingCart/slice'
import { PaymentCard } from '@/components/paymentCard'

export const ShoppingCartPage: React.FC = () => {
  const loading = useAppSelector((state) => state.shoppingCart.loading)
  const items = useAppSelector((state) => state.shoppingCart.items)
  const jwt = useAppSelector((state) => state.user.token) as string

  const dispatch = useAppDispatch()

  return (
    <TheMainLayout>
      <Row>
        {/* 购物车清单 */}
        <Col span={16}>
          <div className={styles.productListContainer}>
            <ProductList data={items.map((item) => item.touristRoute)} />
          </div>
        </Col>
        {/* 支付卡组件 */}
        <Col span={8}>
          <Affix>
            <div className={styles.paymentCardContainer}>
              <PaymentCard
                loading={loading}
                originalPrice={items.map((s) => s.originalPrice).reduce((a: number, b: number) => a + b, 0)}
                price={items.map((s) => s.originalPrice * (s.discountPresent != null ? s.discountPresent : 1)).reduce((a, b) => a + b, 0)}
                onCheckout={() => {}}
                onShoppingCartClear={() => {
                  void dispatch(
                    clearShoppingCart({
                      jwt,
                      ids: items.map((item) => item.id)
                    })
                  )
                }}
              />
            </div>
          </Affix>
        </Col>
      </Row>
    </TheMainLayout>
  )
}
