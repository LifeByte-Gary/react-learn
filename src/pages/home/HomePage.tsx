import React from 'react'
import { Carousel, Footer, Header, ProductCollection, SideMenu, Sponsors } from '@/components'
import styles from './HomePage.module.css'
import { Col, Row, Spin, Typography } from 'antd'
import sideImage from '@images/sider_2019_12-09.png'
import sideImage2 from '@images/sider_2019_02-04.png'
import sideImage3 from '@images/sider_2019_02-04-2.png'
import { withTranslation, WithTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { RootState } from '@/redux/store'
import { fetchRecommendedProductsActionCreator } from '@/redux/recommendedProducts/actions'

const mapStateToProps = (
  state: RootState
): {
  loading: boolean
  error: null | string
  productList: any[]
} => {
  return {
    loading: state.recommendedProducts.loading,
    error: state.recommendedProducts.error,
    productList: state.recommendedProducts.productList
  }
}

const mapDispatchToProps = (
  dispatch
): {
  fetchRecommendedProducts: () => void
} => {
  return {
    fetchRecommendedProducts: () => {
      dispatch(fetchRecommendedProductsActionCreator())
    }
  }
}

type PropsType = WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

class HomePageComponent extends React.Component<PropsType> {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      productList: []
    }
  }

  componentDidMount(): void {
    this.props.fetchRecommendedProducts()
  }

  render(): React.ReactNode {
    const { t } = this.props

    if (this.props.loading)
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

    if (this.props.error != null) return <div>Error: {this.props.error}</div>
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
            products={this.props.productList[0].touristRoutes}
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
            products={this.props.productList[1].touristRoutes}
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
            products={this.props.productList[2].touristRoutes}
          />
          <Sponsors />
        </div>
        <Footer />
      </>
    )
  }
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HomePageComponent))
