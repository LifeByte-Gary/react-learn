import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchRecommendedProducts } from '@/redux/recommendedProducts/slice'
import { useTranslation } from 'react-i18next'
import { Col, Row, Spin, Typography } from 'antd'
import styles from '@/pages/home/HomePage.module.css'
import { Carousel, ProductCollection, SideMenu, Sponsors, TheMainLayout } from '@/components'
import sideImage from '@images/sider_2019_12-09.png'
import sideImage2 from '@images/sider_2019_02-04.png'
import sideImage3 from '@images/sider_2019_02-04-2.png'

export const HomePage: React.FC = (props) => {
  const loading = useAppSelector((state) => state.recommendedProducts.loading)
  const error = useAppSelector((state) => state.recommendedProducts.error)
  const productList = useAppSelector((state) => state.recommendedProducts.productList)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  useEffect(() => {
    void dispatch(fetchRecommendedProducts())
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
    <TheMainLayout>
      <div className={styles.pageContent}>
        <Row style={{ marginTop: 20 }}>
          <Col span={6}>
            <SideMenu />
          </Col>
          <Col span={18}>
            <Carousel />
          </Col>
        </Row>
        <ProductCollection
          title={
            <Typography.Title
              level={3}
              type={'warning'}
            >
              {t('home_page.hot_recommended')}
            </Typography.Title>
          }
          sideImage={sideImage}
          products={productList[0].touristRoutes}
        />
        <ProductCollection
          title={
            <Typography.Title
              level={3}
              type="danger"
            >
              {t('home_page.new_arrival')}
            </Typography.Title>
          }
          sideImage={sideImage2}
          products={productList[1].touristRoutes}
        />
        <ProductCollection
          title={
            <Typography.Title
              level={3}
              type="success"
            >
              {t('home_page.domestic_travel')}
            </Typography.Title>
          }
          sideImage={sideImage3}
          products={productList[2].touristRoutes}
        />
        <Sponsors />
      </div>
    </TheMainLayout>
  )
}
