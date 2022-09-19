import React from 'react'
import { Col, Row } from 'antd'
import { CheckOutCard, PaymentForm, TheMainLayout } from '@/components'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { placeOrder } from '@/redux/order/slice'

export const PlaceOrderPage: React.FC = () => {
  const jwt = useAppSelector((state) => state.user.token) as string
  const loading = useAppSelector((state) => state.order.loading)
  const order = useAppSelector((state) => state.order.currentOrder)

  const dispatch = useAppDispatch()

  return (
    <TheMainLayout>
      <Row>
        <Col span={12}>
          <PaymentForm />
        </Col>
        <Col span={12}>
          <CheckOutCard
            loading={loading}
            order={order}
            onCheckout={() => {
              void dispatch(placeOrder({ jwt, orderId: order.id }))
            }}
          />
        </Col>
      </Row>
    </TheMainLayout>
  )
}
