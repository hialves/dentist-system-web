interface IOpen {
  index: string
  signIn: string
  signUpTenant: string
}

interface IRestrict {
  clinic: string
  client: string
  dashboard: string
  employee: string
  stock: string
  stockAdd: string
  settings: string
}

interface IRoutes {
  open: IOpen
  restrict: IRestrict
}

const routes: IRoutes = {
  open: {
    index: '/',
    signIn: '/:tenant/auth/employee/sign-in',
    signUpTenant: '/auth/sign-up/tenant',
  },
  restrict: {
    clinic: '/clinic',
    client: '/client',
    dashboard: '/dashboard',
    employee: '/employee',
    stock: '/stock',
    stockAdd: '/stock/add',
    settings: '/settings',
  },
}

export const prefixPrivateRoute = 'app'

Object.keys(routes.restrict).forEach((key) => {
  const currentItem = routes.restrict[key as keyof IRestrict]

  routes.restrict[
    key as keyof IRestrict
  ] = `/${prefixPrivateRoute}${currentItem}`
})

const { open, restrict } = routes

export { open, restrict }
