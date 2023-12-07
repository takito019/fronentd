import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ProductsPage from './pages/ProductsPage';
import ProductsFormPage from './pages/ProductsFormPage';
import ProtectedRoute from './ProtectedRoute';
import {ProductsProvider} from './context/ProductsContext'
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';


function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <BrowserRouter>
        <main className='container mx-auto px-10'>
        <Navbar/>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />

            {/* Sección de rutas protegidas */}
            <Route element={<ProtectedRoute />} >
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/products' element={<ProductsPage />} />
              <Route path='/add-product' element={<ProductsFormPage />} />
              <Route path='/products/:id' element={<ProductsFormPage />} />
            </Route>

            { /* Ruta para 404 Not Found y redirección */}
            <Route path='*' element={ <NotFound /> } />

          </Routes>
          </main>
        </BrowserRouter>
      </ProductsProvider>
    </AuthProvider>
  )
}

export default App