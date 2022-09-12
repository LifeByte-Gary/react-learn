import { RecommendedProductsAction } from '@/redux/recommendedProducts/actions'

interface RecommendedProductsState {
  loading: boolean
  error: string | null
  productList: any[]
}

const initialState: RecommendedProductsState = {
  loading: true,
  error: null,
  productList: []
}

export default (state = initialState, action: RecommendedProductsAction): any => {
  switch (action.type) {
    case 'FETCH_RECOMMENDED_PRODUCTS_START':
      return { ...state, loading: true }
    case 'FETCH_RECOMMENDED_PRODUCTS_SUCCESS':
      return { ...state, loading: false, error: null, productList: action.payload }
    case 'FETCH_RECOMMENDED_PRODUCTS_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
