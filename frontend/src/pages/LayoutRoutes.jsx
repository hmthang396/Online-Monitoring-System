import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import AddNode from './AddNode'
import AddProject from './AddProject'
import Dashboard from './Dashboard'
import ListNode from './ListNode'
import ListProject from './ListProject'
import ListSource from './ListSource'
import AddSource from './AddSource'
import AddUser from './AddUser'
import ListUser from './ListUser'
import History from './History'
import Report from './Report'
import Setting from './Setting'
import AddReport from './AddReport'
import ListReport from './ListReport'
import Info from './Info'

const LayoutRoutes = () => {
  return (
    <Fragment>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path={`${process.env.PUBLIC_URL}/`}
            element={<Info />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/dashboard`}
            element={<Dashboard />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/product-list`}
            element={<ListProject />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/addProject`}
            element={<AddProject />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/addNode`}
            element={<AddNode />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/list-nodes`}
            element={<ListNode />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/create-source`}
            element={<AddSource />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/list-source`}
            element={<ListSource />}
          />

          <Route
            path={`${process.env.PUBLIC_URL}/create-user`}
            element={<AddUser />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/list-user`}
            element={<ListUser />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/history`}
            element={<History />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/reports`}
            element={<Report />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/settings`}
            element={<Setting />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/create-report`}
            element={<AddReport />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/list-report`}
            element={<ListReport />}
          />
        </Route>
      </Routes>
    </Fragment>
  )
}

export default LayoutRoutes