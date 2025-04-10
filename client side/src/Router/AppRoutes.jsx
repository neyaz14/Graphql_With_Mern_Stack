
import { BrowserRouter, Route, Routes } from 'react-router';
import Root from '../Pages/Root';
import Home from '../Pages/Home';

import SignIn from '../Authentication/SignIn';
import PrivateRoute from './PrivateRoute';
import ErrorPage from '../ErrorPage';
import AllProducts from '../Pages/AllProducts/AllProducts';



const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Root></Root>}>
                    <Route path="*" element={<ErrorPage />} />
                    <Route index element={<Home></Home>} />
                    <Route path='login' element={<SignIn></SignIn>} />

                    <Route path='allProducts' element={
                        <PrivateRoute>
                            <AllProducts></AllProducts>
                        </PrivateRoute>
                    } />

                   

                   

                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
