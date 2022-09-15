import React from 'react'
import { TheAuthLayout } from '@/components'
import { RegisterForm } from '@/pages/register/RegisterForm'

export const RegisterPage: React.FC = () => {
  return (
    <TheAuthLayout>
      <RegisterForm />
    </TheAuthLayout>
  )
}
