import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SidebarWithHeader from '../components/Sidebar'
import Dashboard from '../pages/Restrict/Dashboard'
import Settings from '../pages/Restrict/Settings'
import { SignIn } from '../pages/Public/Auth/SignIn'
import { SignUpTenant } from '../pages/Public/Auth/SignUpTenant'
import { Landing } from '../pages/Public/Landing'
import { NotFound } from '../components/NotFound'
import { prefixPrivateRoute, open, restrict } from './routes'
import { Stocks } from '../pages/Restrict/Listing/Stocks'
import { Clinics } from '../pages/Restrict/Listing/Clinics'
import { Clients } from '../pages/Restrict/Listing/Clients'
import { Employees } from '../pages/Restrict/Listing/Employees'
import { AddClient } from '../pages/Restrict/Add/AddClient'
import { AddClinic } from '../pages/Restrict/Add/AddClinic'
import { AddEmployee } from '../pages/Restrict/Add/AddEmployee'
import { AddStock } from '../pages/Restrict/Add/AddStock'
import { SelectClinic } from '../pages/Restrict/Listing/SelectClinic'
import { AddStockCategory } from '../pages/Restrict/Add/AddStockCategory'

const Router: React.FC = () => {
  // prettier-ignore
  return (
    <Routes>
      <Route path={open.index} element={<Landing />} />
      <Route path={open.signIn} element={<SignIn />} />
      <Route path={open.signUpTenant} element={<SignUpTenant />} />

      <Route path={`/${prefixPrivateRoute}`} element={<SidebarWithHeader />}>
        <Route path={restrict.client} element={<Clients />} />
        <Route path={restrict.clientAdd} element={<AddClient />} />
        <Route path={restrict.clinic} element={<Clinics />} />
        <Route path={restrict.clinicAdd} element={<AddClinic />} />
        <Route path={restrict.selectClinic} element={<SelectClinic />} />
        <Route path={restrict.dashboard} element={<Dashboard />} />
        <Route path={restrict.employee} element={<Employees />} />
        <Route path={restrict.employeeAdd} element={<AddEmployee />} />
        <Route path={restrict.stock} element={<Stocks />} />
        <Route path={restrict.stockAdd} element={<AddStock />} />
        {/* TODO: settings page */}
        <Route path={restrict.stockCategory} element={<NotFound />} />
        {/* TODO: settings page */}
        <Route path={restrict.stockCategoryAdd} element={<AddStockCategory />} />
        <Route path={restrict.settings} element={<Settings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Router
