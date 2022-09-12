import { ThunkAction } from 'redux-thunk'
import { RootState } from '@/redux/store'
import axios from 'axios'

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

const fetchRecommendedProductsStartActionCreator = (): FetchRecommendedProductsStartAction => {
  return {
    type: FETCH_RECOMMENDED_PRODUCTS_START
  }
}

const fetchRecommendedProductsSuccessActionCreator = (data): FetchRecommendedProductsSuccessAction => {
  return {
    type: FETCH_RECOMMENDED_PRODUCTS_SUCCESS,
    payload: data
  }
}

const fetchRecommendedProductsFailActionCreator = (error): FetchRecommendedProductsFailAction => {
  return {
    type: FETCH_RECOMMENDED_PRODUCTS_FAIL,
    payload: error
  }
}

export const fetchRecommendedProductsActionCreator = (): ThunkAction<void, RootState, unknown, RecommendedProductsAction> => async (dispatch, getState) => {
  try {
    dispatch(fetchRecommendedProductsStartActionCreator())
    const { data } = await axios.get('http://123.56.149.216:8080/api/productCollections')
    dispatch(fetchRecommendedProductsSuccessActionCreator(data))
  } catch (err) {
    if (err instanceof Error) {
      dispatch(fetchRecommendedProductsFailActionCreator(err))
    }
  }
}
