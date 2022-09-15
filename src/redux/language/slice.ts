import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import i18n from 'i18next'

interface LanguageState {
  current: 'en' | 'zh'
  languageList: Array<{
    name: string
    code: string
  }>
}

const initialState: LanguageState = {
  current: 'zh',
  languageList: [
    {
      name: '中文',
      code: 'zh'
    },
    {
      name: 'English',
      code: 'en'
    }
  ]
}

export const changeLanguage = createAsyncThunk('language/change', async (languageCode: 'zh' | 'en') => {
  await i18n.changeLanguage(languageCode)

  return languageCode
})

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changeLanguage.fulfilled, (state, { payload }) => {
      state.current = payload
    })
  }
})
