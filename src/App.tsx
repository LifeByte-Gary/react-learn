import React from 'react'
import styles from './App.module.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { DetailPage, HomePage, RegisterPage, SearchPage, ShoppingCartPage, SignInPage } from '@/pages'
import '@/i18n/configs'
import { useAppSelector } from '@/redux/hooks'

interface PrivateRouteProps {
  children: JSX.Element
}

function App(): JSX.Element {
  const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element | null => {
    const jwt = useAppSelector((state) => state.user.token)
    return jwt != null ? children : <Navigate to={'/sign-in'} />
  }
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/sign-in"
            element={<SignInPage />}
          />
          <Route
            path="/register"
            element={<RegisterPage />}
          />
          <Route
            path="/trips/:id"
            element={<DetailPage />}
          />
          <Route
            path="/search/:keyword"
            element={<SearchPage />}
          />
          <Route
            path="/shopping-cart"
            element={
              <PrivateRoute>
                <ShoppingCartPage />
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={<h1>404 NOT FOUND</h1>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
