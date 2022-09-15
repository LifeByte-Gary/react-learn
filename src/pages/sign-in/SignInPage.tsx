import React from 'react'
import { TheAuthLayout } from '@/components'
import { SignInForm } from '@/pages/sign-in/SignInForm'

export const SignInPage: React.FC = () => {
  return (
    <TheAuthLayout>
      <SignInForm />
    </TheAuthLayout>
  )
}
