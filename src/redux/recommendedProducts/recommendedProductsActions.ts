export const FETCH_RECOMMENDED_PRODUCTS_START = 'FETCH_RECOMMENDED_PRODUCTS_START'
export const FETCH_RECOMMENDED_PRODUCTS_SUCCESS = 'FETCH_RECOMMENDED_PRODUCTS_SUCCESS'
export const FETCH_RECOMMENDED_PRODUCTS_FAIL = 'FETCH_RECOMMENDED_PRODUCTS_FAIL'

interface FetchRecommendedProductsStartAction {
  type: typeof FETCH_RECOMMENDED_PRODUCTS_START
}

interface FetchRecommendedProductsSuccessAction {
  type: typeof FETCH_RECOMMENDED_PRODUCTS_SUCCESS
  payload: any
}

interface FetchRecommendedProductsFailAction {
  type: typeof FETCH_RECOMMENDED_PRODUCTS_FAIL
  payload: any
}

export type RecommendedProductsAction = FetchRecommendedProductsStartAction | FetchRecommendedProductsSuccessAction | FetchRecommendedProductsFailAction

export const fetchRecommendedProductsStartActionCreator = (): FetchRecommendedProductsStartAction => {
  return {
    type: FETCH_RECOMMENDED_PRODUCTS_START
  }
}

export const fetchRecommendedProductsSuccessActionCreator = (data): FetchRecommendedProductsSuccessAction => {
  return {
    type: FETCH_RECOMMENDED_PRODUCTS_SUCCESS,
    payload: data
  }
}

export const fetchRecommendedProductsFailActionCreator = (error): FetchRecommendedProductsFailAction => {
  return {
    type: FETCH_RECOMMENDED_PRODUCTS_FAIL,
    payload: error
  }
}
