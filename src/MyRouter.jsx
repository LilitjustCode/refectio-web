import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './pages/login'
import { Layout } from './components/layout'
import { MyProfile } from './pages/myProfile'
import { MyProducts } from './pages/myProducts'
import { EditProduct } from './pages/EditProduct'
import { AddNewProduct } from './pages/addNewProduct'
import { AllManufacturers } from './pages/allManufacturers'
import { SingleManufacturer } from './pages/singleManufacturer'

export const MyRouter = () => {
    const auth = localStorage.getItem('token')

    const PrivateRoute = ({ auth, children }) => {
        return auth ? children : window.location = '/auth/login'
    }

    const AlreadyLoggedIn = ({ auth, children }) => {
        return auth ? window.location = '/' : children
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='/auth/login' element={<AlreadyLoggedIn auth={auth}><Login /></AlreadyLoggedIn>} />
                    <Route path='/' element={<PrivateRoute auth={auth}><AllManufacturers /></PrivateRoute>} />
                    <Route path='/profile' element={<PrivateRoute auth={auth}><MyProfile /></PrivateRoute>} />
                    <Route path='/my-products' element={<PrivateRoute auth={auth}><MyProducts /></PrivateRoute>} />
                    <Route path='/addNewProduct' element={<PrivateRoute auth={auth}><AddNewProduct /></PrivateRoute>} />
                    <Route path='/:companyName/:id' element={<PrivateRoute auth={auth}><SingleManufacturer /></PrivateRoute>} />
                    <Route path='/edit/:id' element={<PrivateRoute auth={auth}><EditProduct /></PrivateRoute>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}