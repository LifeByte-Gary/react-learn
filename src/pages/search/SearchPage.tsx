import React, { useEffect } from 'react'
import { FilterArea, Footer, Header, ProductList } from '@/components'
import styles from './SearchPage.module.css'
import { Params, useLocation, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { searchProduct } from '@/redux/productSearch/slice'
import { Spin } from 'antd'

interface MatchParams extends Params {
  keywords: string
}

export const SearchPage: React.FC = () => {
  const { keyword } = useParams<MatchParams>()
  const location = useLocation()
  const loading = useAppSelector((state) => state.productSearch.loading)
  const error = useAppSelector((state) => state.productSearch.error)
  const data = useAppSelector((state) => state.productSearch.data)
  const pagination = useAppSelector((state) => state.productSearch.pagination)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (keyword != null) {
      void dispatch(searchProduct({ nextPage: 1, pageSize: 10, keyword }))
    }
  }, [location])

  const changePage = (nextPage, pageSize): void => {
    if (keyword != null) {
      void dispatch(searchProduct({ nextPage: 1, pageSize: 10, keyword }))
    }
  }

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
        {/* Filter */}
        <div className={styles.productListContainer}>
          <FilterArea />
        </div>
        {/* Product list */}
        <div className={styles.productListContainer}>
          <ProductList
            data={data}
            paging={pagination}
            onPageChange={changePage}
          />
        </div>
      </div>
      <Footer />
    </>
  )
}
