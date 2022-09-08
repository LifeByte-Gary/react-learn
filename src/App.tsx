import React from 'react'
import styles from './App.module.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { DetailPage, HomePage, RegisterPage, SignInPage } from '@/pages'

function App(): JSX.Element {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="sign-in"
            element={<SignInPage />}
          />
          <Route
            path="register"
            element={<RegisterPage />}
          />
          <Route
            path="trips/:id"
            element={<DetailPage />}
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
