//privateRoutes.js

import { Outlet, Navigate } from 'react-router-dom'
import useAuth from './useAuth'

function PrivateRoutes() {
    const token = useAuth()
    return token ? <Outlet /> : <Navigate to='/auth' />
}

export default PrivateRoutes