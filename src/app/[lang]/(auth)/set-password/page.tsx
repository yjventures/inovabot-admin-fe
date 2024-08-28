import React from 'react'
import SetPassword from './SetPassword'
import AuthPageWrapper from '@/components/common/auth/AuthPageWrapper'

export default function SetPasswordPage() {
  return (
    <AuthPageWrapper formPosition='left'>
      <SetPassword />
    </AuthPageWrapper>
  )
}
