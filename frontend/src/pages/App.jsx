import React from 'react'
import { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import LayoutRoutes from './LayoutRoutes'
import Login from './Login'

const App = () => {
  return (
    <Fragment>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} exact element={<Login/>}/>
        <Route path={`${process.env.PUBLIC_URL}/auth/login`} exact element={<Login/>}/>
        <Route path={`/*`} element={<LayoutRoutes/>}/>
      </Routes>
    </Fragment>
  )
}

export default App