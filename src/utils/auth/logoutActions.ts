import api from '@/redux/api'
import { Dispatch, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit'
import { CombinedState } from '@reduxjs/toolkit/query'
import { deleteCookie } from 'cookies-next'

export const logoutActions = (
  dispatch: ThunkDispatch<
    {
      api: CombinedState<{}, 'users', 'api'>
    },
    undefined,
    UnknownAction
  > &
    Dispatch<UnknownAction>,
  cb = () => {}
) => {
  deleteCookie('accessToken')
  deleteCookie('refreshToken')
  deleteCookie('userData')
  dispatch(api.util.resetApiState())
  cb()
}
