import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Col, Row, Spin, TimePicker } from 'antd'
import styles from './DetailPage.module.css'
import { Footer, Header } from '@/components'
import { ProductIntro } from '@/components/productIntro'

// interface MatchParams {
//   id: string
// }

export const DetailPage: React.FC = () => {
  // const { id } = useParams<keyof MatchParams>()
  const [loading, setLoading] = useState<boolean>(true)
  const [product, setProduct] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true)
      try {
        const { data } = await axios.get('http://123.56.149.216:8080/api/touristRoutes/fb6d4f10-79ed-4aff-a915-4ce29dc9c7e1')
        setProduct(data)
        setError(null)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error')
        setLoading(false)
      }
    }

    void fetchData()
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
            <Col span={19}>
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
            <Col span={5}>
              <TimePicker.RangePicker style={{ marginTop: 20 }} />
            </Col>
          </Row>
        </div>
        {/* 锚点菜单 */}
        <div className={styles.productDetailAnchor}></div>
        {/* 产品特色 */}
        <div
          id="feature"
          className={styles.productDetailContainer}
        ></div>
        {/* 费用 */}
        <div
          id="fees"
          className={styles.productDetailContainer}
        ></div>
        {/* 预订须知 */}
        <div
          id="notes"
          className={styles.productDetailContainer}
        ></div>
        {/* 商品评价 */}
        <div
          id="comments"
          className={styles.productDetailContainer}
        ></div>
      </div>
      <Footer />
    </>
  )
}
