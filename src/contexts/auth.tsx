import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthApi, SignInPayload } from '../api/Auth'
import { EmployeeApi, IEmployee } from '../api/Employee'
import { ChangeState } from '../common/app.types'
import { open, prefixPrivateRoute, restrict } from '../router/routes'

interface AuthContextData {
  signed: boolean
  token?: string | null
  clinicId?: number | null
  profile: IEmployee | null
  setProfile: ChangeState<any>
  signIn(payload: SignInPayload): Promise<void>
  signOut(): void
  setClinicId: ChangeState<any>
  goToSignedPage(): void
  getProfile(): Promise<void>
  finalizeLogin(clinicId: number): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface Props {
  children: React.ReactNode
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate()

  const [token, setToken] = useState<string | null>(null)
  const [clinicId, setClinicId] = useState<number | null>(null)
  const [profile, setProfile] = useState<IEmployee | null>(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    async function loadStoragedData() {
      const accessToken = localStorage.getItem('accessToken')
      const _clinicId = localStorage.getItem('clinicId')

      if (accessToken) setToken(accessToken)
      if (_clinicId) setClinicId(+_clinicId)
    }
    loadStoragedData()
  }, [])

  async function signIn(payload: SignInPayload) {
    const { accessToken } = await AuthApi.signIn(payload)
    saveAccessToken(accessToken)
    goToSignedPage()
  }

  function signOut() {
    localStorage.clear()
    setToken(null)
    if (window.location.pathname !== open.index) {
      navigate(open.index, { replace: true })
    }
  }

  function saveAccessToken(accessToken: string) {
    setToken(accessToken)
    localStorage.setItem('accessToken', accessToken)
  }

  function goToSignedPage() {
    navigate(prefixPrivateRoute)
  }

  function goToDashboard() {
    navigate(restrict.dashboard)
  }

  async function getProfile() {
    const data = await EmployeeApi.getProfile()
    setProfile(data)
  }

  async function finalizeLogin(clinicId: number) {
    const { accessToken } = await AuthApi.finalizeLogin(clinicId)
    saveAccessToken(accessToken)
    setClinicId(clinicId)
    localStorage.setItem('clinicId', clinicId.toString())
    goToDashboard()
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!token,
        token,
        clinicId,
        profile,
        signIn,
        signOut,
        setClinicId,
        setProfile,
        goToSignedPage,
        getProfile,
        finalizeLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
