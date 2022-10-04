import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SidebarWithHeader from '../components/Sidebar'
import Dashboard from '../pages/Dashboard'
import Settings from '../pages/Settings'
import SignIn from '../pages/Auth/SignIn'
import SignUp from '../pages/Auth/SignUp'
import Landing from '../pages/Landing'
import { NotFound } from '../pages/NotFound'
import { prefixPrivateRoute, open, restrict } from './routes'
import Stocks from '../pages/Listing/Stocks'
import { Clinics } from '../pages/Listing/Clinics'
import { Clients } from '../pages/Listing/Clients'
import { Employees } from '../pages/Listing/Employees'
import { AddClient } from '../pages/Add/AddClient'
import { AddClinic } from '../pages/Add/AddClinic'
import { AddEmployee } from '../pages/Add/AddEmployee'
import { AddStock } from '../pages/Add/AddStock'

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path={open.index} element={<Landing />} />
      <Route path={open.signIn} element={<SignIn />} />
      <Route path={open.signUpTenant} element={<SignUp />} />

      <Route path={`/${prefixPrivateRoute}`} element={<SidebarWithHeader />}>
        <Route path={restrict.client} element={<Clients />} />
        <Route path={restrict.clientAdd} element={<AddClient />} />
        <Route path={restrict.clinic} element={<Clinics />} />
        <Route path={restrict.clinicAdd} element={<AddClinic />} />
        <Route path={restrict.dashboard} element={<Dashboard />} />
        <Route path={restrict.employee} element={<Employees />} />
        <Route path={restrict.employeeAdd} element={<AddEmployee />} />
        <Route path={restrict.stock} element={<Stocks />} />
        <Route path={restrict.stockAdd} element={<AddStock />} />
        <Route path={restrict.settings} element={<Settings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Router
