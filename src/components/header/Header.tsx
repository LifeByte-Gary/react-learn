import React from 'react'
import styles from './Header.module.css'
import { Button, Dropdown, Input, Layout, Menu, Typography } from 'antd'
import logo from '@/assets/react.svg'
import { GlobalOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { addLanguageActionCreator, changeLanguageActionCreator } from '@/redux/language/actions'
import { useTranslation } from 'react-i18next'

export const Header: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const language = useAppSelector((state) => state.language.language)
  const languageList = useAppSelector((state) => state.language.languageList)
  const dispatch = useAppDispatch()

  const menuClickHandler = (e): void => {
    if (e.key === 'new') {
      dispatch(addLanguageActionCreator('新语言', 'new_lang'))
    } else {
      dispatch(changeLanguageActionCreator(e.key))
    }
  }

  return (
    <div className={styles.appHeader}>
      <div className={styles.topHeader}>
        <div className={styles.inner}>
          <Typography.Text>让旅游更幸福</Typography.Text>
          <Dropdown.Button
            style={{ marginLeft: 15 }}
            overlay={
              <Menu
                onClick={menuClickHandler}
                items={[
                  ...languageList.map((l) => {
                    return { key: l.code, label: l.name }
                  }),
                  { key: 'new', label: t('header.add_new_language') }
                ]}
              />
            }
            icon={<GlobalOutlined />}
          >
            {language === 'zh' ? '中文' : 'English'}
          </Dropdown.Button>
          <Button.Group className={styles.buttonGroup}>
            <Button onClick={() => navigate('/register')}>{t('header.register')}</Button>
            <Button onClick={() => navigate('/sign-in')}>{t('header.signin')}</Button>
          </Button.Group>
        </div>
      </div>
      <Layout.Header className={styles.mainHeader}>
        <span onClick={() => navigate('/')}>
          <img
            src={logo}
            alt="logo"
            className={styles.AppLogo}
          />
          <Typography.Title
            level={3}
            className={styles.title}
          >
            {t('header.title')}
          </Typography.Title>
        </span>

        <Input.Search
          placeholder={'请输入旅游目的地、主题、或关键字'}
          className={styles.searchInput}
          onSearch={(keyword) => navigate(`/search/${keyword}`)}
        />
      </Layout.Header>
      <Menu
        mode={'horizontal'}
        className={styles.mainMenu}
        items={[
          { key: '1', label: t('header.home_page') },
          { key: '2', label: t('header.weekend') },
          { key: '3', label: t('header.group') },
          { key: '4', label: t('header.backpack') },
          { key: '5', label: t('header.private') },
          { key: '6', label: t('header.cruise') },
          { key: '7', label: t('header.hotel') },
          { key: '8', label: t('header.local') },
          { key: '9', label: t('header.theme') },
          { key: '10', label: t('header.custom') },
          { key: '11', label: t('header.study') },
          { key: '12', label: t('header.visa') },
          { key: '13', label: t('header.enterprise') },
          { key: '14', label: t('header.high_end') },
          { key: '15', label: t('header.outdoor') },
          { key: '16', label: t('header.insurance') }
        ]}
      />
    </div>
  )
}
