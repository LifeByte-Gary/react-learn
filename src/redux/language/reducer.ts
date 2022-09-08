import i18n from 'i18next'
import { ADD_LANGUAGE, CHANGE_LANGUAGE, LanguageActions } from '@/redux/language/actions'

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

export default (state = defaultState, action: LanguageActions): any => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      void i18n.changeLanguage(action.payload).then()
      return { ...state, language: action.payload }
    case ADD_LANGUAGE:
      return { ...state, languageList: [...state.languageList, action.payload] }
    default:
      return state
  }
}
