import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthApi, SignInPayload } from '../api/Auth'
import { ChangeState } from '../common/app.types'
import { open, prefixPrivateRoute } from '../router/routes'

interface AuthContextData {
  signed: boolean
  user: object | null | string
  profile: any
  setProfile: ChangeState<any>
  signIn(payload: SignInPayload): Promise<void>
  signOut(): void
  goToSignedPage(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface Props {
  children: React.ReactNode
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate()

  const [user, setUser] = useState<object | string | null>(null)
  const [profile, setProfile] = useState(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    async function loadStoragedData() {
      const accessToken = localStorage.getItem('accessToken')

      if (accessToken) setUser(accessToken)
    }
    loadStoragedData()
  }, [])

  async function signIn(payload: SignInPayload) {
    const { accessToken } = await AuthApi.signIn(payload)
    setUser(accessToken)
    localStorage.setItem('accessToken', accessToken)
    goToSignedPage()
  }

  function signOut() {
    localStorage.clear()
    setUser(null)
    if (window.location.pathname !== open.index) {
      navigate(open.index, { replace: true })
    }
  }

  function goToSignedPage() {
    navigate(prefixPrivateRoute)
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        profile,
        signIn,
        signOut,
        setProfile,
        goToSignedPage,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
