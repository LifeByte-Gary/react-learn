import React from 'react'
import { Carousel, Footer, Header, ProductCollection, SideMenu, Sponsors } from '@/components'
import styles from './HomePage.module.css'
import { Col, Row, Spin, Typography } from 'antd'
import sideImage from '@images/sider_2019_12-09.png'
import sideImage2 from '@images/sider_2019_02-04.png'
import sideImage3 from '@images/sider_2019_02-04-2.png'
import { withTranslation, WithTranslation } from 'react-i18next'
import axios from 'axios'

interface State {
  loading: boolean
  error: string | null
  productList: any[]
}

class HomePageComponent extends React.Component<WithTranslation, State> {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      productList: []
    }
  }

  async componentDidMount(): Promise<void> {
    try {
      const { data } = await axios.get('http://123.56.149.216:8080/api/productCollections')
      this.setState({
        loading: false,
        error: null,
        productList: data
      })
    } catch (err) {
      if (err instanceof Error) {
        this.setState({
          loading: false,
          error: err.message,
          productList: []
        })
      }
    }
  }

  render(): React.ReactNode {
    const { t } = this.props

    if (this.state.loading)
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

    if (this.state.error != null) return <div>Error: {this.state.error}</div>
    return (
      <>
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
            products={this.state.productList[0].touristRoutes}
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
            products={this.state.productList[1].touristRoutes}
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
            products={this.state.productList[2].touristRoutes}
          />
          <Sponsors />
        </div>
        <Footer />
      </>
    )
  }
}

export const HomePage = withTranslation()(HomePageComponent)
