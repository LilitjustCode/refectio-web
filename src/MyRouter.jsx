import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './pages/login'
import { Layout } from './components/layout'
import { MyProfile } from './pages/myProfile'
import { MyProducts } from './pages/myProducts'
import { AddNewProduct } from './pages/addNewProduct'
import { AllManufacturers } from './pages/allManufacturers'

export const MyRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='/' element={<AllManufacturers />} />
                    <Route path='/auth/login' element={<Login />} />
                    <Route path='/profile' element={<MyProfile />} />
                    <Route path='/myProducts' element={<MyProducts />} />
                    <Route path='/addNewProduct' element={<AddNewProduct />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}