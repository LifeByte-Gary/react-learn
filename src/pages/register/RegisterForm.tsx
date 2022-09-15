import { Button, Checkbox, Form, Input } from 'antd'
import React from 'react'
import styles from './RegisterForm.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate()

  const onFinish = (values: any): void => {
    void (async () => {
      try {
        await axios.post('http://123.56.149.216:8080/auth/register', {
          email: values.email,
          password: values.password,
          confirmPassword: values.confirm
        })
        navigate('/sign-in')
      } catch (err) {
        alert('Failed to register')
      }
    })()
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
      className={styles.registerForm}
    >
      <Form.Item
        label="Email"
        name="email"
        hasFeedback
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!'
          },
          { required: true, message: 'Please input your Email!' }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        hasFeedback
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirm"
        hasFeedback
        rules={[
          { required: true, message: 'Please input your password!' },
          ({ getFieldValue }) => ({
            async validator(_, value?: string) {
              if (value == null || getFieldValue('password') === value) {
                return await Promise.resolve()
              }
              throw new Error('The two passwords that you entered do not match!')
            }
          })
        ]}
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
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
