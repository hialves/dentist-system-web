interface IOpen {
  index: string
  signIn: string
  signUpTenant: string
}

interface IRestrict {
  clinic: string
  clinicAdd: string
  selectClinic: string
  client: string
  clientAdd: string
  dashboard: string
  employee: string
  employeeAdd: string
  stock: string
  stockAdd: string
  stockCategory: string
  stockCategoryAdd: string
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
    clinicAdd: '/clinic/add',
    selectClinic: '/clinic/select',
    client: '/client',
    clientAdd: '/client/add',
    dashboard: '/dashboard',
    employee: '/employee',
    employeeAdd: '/employee/add',
    stock: '/stock',
    stockAdd: '/stock/add',
    stockCategory: '/settings/stock-category',
    stockCategoryAdd: '/settings/stock-category/add',
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
