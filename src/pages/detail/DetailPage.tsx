import React, { useEffect } from 'react'
import { Params, useParams } from 'react-router-dom'
import { Anchor, Button, Col, DatePicker, Divider, Menu, Row, Spin, Typography } from 'antd'
import styles from './DetailPage.module.css'
import { Footer, Header } from '@/components'
import { ProductIntro } from '@/components/productIntro'
import { ProductComments } from '@/components/productComments'
import { commentMockData } from './mockup'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getProductDetail } from '@/redux/productDetail/slice'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { addShoppingCartItem } from '@/redux/shoppingCart/slice'

interface MatchParams extends Params {
  id: string
}

export const DetailPage: React.FC = () => {
  const { id } = useParams<MatchParams>()
  const dispatch = useAppDispatch()

  const loading = useAppSelector((state) => state.productDetail.loading)
  const error = useAppSelector((state) => state.productDetail.error)
  const product = useAppSelector((state) => state.productDetail.product)

  const jwt = useAppSelector((state) => state.user.token) as string

  const shoppingCartLoading = useAppSelector((state) => state.shoppingCart.loading)

  const anchors = [
    { href: '#feature', title: '产品特色' },
    { href: '#fees', title: '费用' },
    { href: '#notes', title: '预订须知' },
    { href: '#comments', title: '用户评价' }
  ]

  useEffect(() => {
    if (id != null) {
      void dispatch(getProductDetail(id))
    }
  }, [])

  if (loading)
    return (
      <Spin
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%'
        }}
      />
    )

  if (error != null) return <div>Error: {error}</div>
  return (
    <>
      <Header />
      <div className={styles.pageContent}>
        {/* 产品简介 与 日期选择 */}
        <div className={styles.productIntroContainer}>
          <Row>
            <Col span={13}>
              <ProductIntro
                title={product.title}
                shortDescription={product.description}
                price={product.originalPrice}
                coupons={product.coupons}
                points={product.points}
                discount={product.price}
                rating={product.rating}
                pictures={product.touristRoutePictures.map((p) => p.url)}
              />
            </Col>
            <Col span={11}>
              <Button
                style={{ marginTop: 50, marginBottom: 30, display: 'block' }}
                type="primary"
                danger
                loading={shoppingCartLoading}
                onClick={() => {
                  void dispatch(addShoppingCartItem({ jwt, touristRouteId: product.id }))
                }}
              >
                <ShoppingCartOutlined />
                放入购物车
              </Button>
              <DatePicker.RangePicker style={{ marginTop: 20 }} />
            </Col>
          </Row>
        </div>
        {/* 锚点菜单 */}
        <Anchor className={styles.productDetailAnchor}>
          <Menu
            mode="horizontal"
            items={anchors.map((anchor) => ({
              key: anchor.title,
              label: (
                <Anchor.Link
                  href={anchor.href}
                  title={anchor.title}
                />
              )
            }))}
          />
        </Anchor>
        {/* 产品特色 */}
        <div
          id="feature"
          className={styles.productDetailContainer}
        >
          <Divider orientation={'center'}>
            <Typography.Title level={3}>产品特色</Typography.Title>
          </Divider>
          <div
            dangerouslySetInnerHTML={{ __html: product.features }}
            style={{ margin: 50 }}
          ></div>
        </div>
        {/* 费用 */}
        <div
          id="fees"
          className={styles.productDetailContainer}
        >
          <Divider orientation={'center'}>
            <Typography.Title level={3}>费用</Typography.Title>
          </Divider>
          <div
            dangerouslySetInnerHTML={{ __html: product.fees }}
            style={{ margin: 50 }}
          ></div>
        </div>
        {/* 预订须知 */}
        <div
          id="notes"
          className={styles.productDetailContainer}
        >
          <Divider orientation={'center'}>
            <Typography.Title level={3}>预定须知</Typography.Title>
          </Divider>
          <div
            dangerouslySetInnerHTML={{ __html: product.notes }}
            style={{ margin: 50 }}
          ></div>
        </div>
        {/* 商品评价 */}
        <div
          id="comments"
          className={styles.productDetailContainer}
        >
          <Divider orientation={'center'}>
            <Typography.Title level={3}>用户评价</Typography.Title>
          </Divider>
          <div style={{ margin: 40 }}>
            <ProductComments data={commentMockData} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
