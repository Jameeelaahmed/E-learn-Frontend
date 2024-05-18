//privateRoutes.js

import { Outlet, Navigate } from 'react-router-dom'
import useAuth from './useAuth'

// console.log(<Outlet></Outlet>)

function PrivateRoutes() {
    const token = useAuth()
    return token ? <Outlet /> : <Navigate to='/auth' />
}

export default PrivateRoutes