import i18n from 'i18next'

export interface State {
  language: 'zh' | 'en'
  languageList: Array<{
    name: string
    code: string
  }>
}

const defaultState: State = {
  language: 'zh',
  languageList: [
    { name: '中文', code: 'zh' },
    { name: 'English', code: 'en' }
  ]
}

export default (state = defaultState, action): any => {
  switch (action.type) {
    case 'change_language':
      void i18n.changeLanguage(action.payload).then()
      return { ...state, language: action.payload }
    case 'add_language':
      return { ...state, languageList: [...state.languageList, action.payload] }
    default:
      return state
  }
}
