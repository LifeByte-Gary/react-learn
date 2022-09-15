import { Button, Checkbox, Form, Input } from 'antd'
import React, { useEffect } from 'react'
import styles from './SignInForm.module.css'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useNavigate } from 'react-router-dom'
import { signIn } from '@/redux/user/slice'

export const SignInForm: React.FC = () => {
  const loading = useAppSelector((state) => state.user.loading)
  const error = useAppSelector((state) => state.user.error)
  const jwt = useAppSelector((state) => state.user.token)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (error != null) alert(error)

    if (jwt != null) {
      navigate('/')
    }
  }, [jwt, error])

  const onFinish = (values: any): void => {
    void dispatch(
      signIn({
        email: values.email,
        password: values.password
      })
    )
  }

  const onFinishFailed = (errorInfo: any): void => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={styles.signInForm}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!'
          },
          { required: true, message: 'Please input your username!' }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
