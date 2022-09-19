import React from 'react'
import { Col, Row } from 'antd'
import { PaymentForm, TheMainLayout } from '@/components'

export const PlaceOrderPage: React.FC = () => {
  return (
    <TheMainLayout>
      <Row>
        <Col span={12}>
          <PaymentForm />
        </Col>
        <Col span={12}>{/* <CheckOutCard /> */}</Col>
      </Row>
    </TheMainLayout>
  )
}
