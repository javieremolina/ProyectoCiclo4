import { Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { LoginForm } from './components/LoginForm'
import { Navbar } from './components/Navbar'
import { Cargando } from './components/Cargando'
import { ProductPage } from './components/ProductPage'
import { ProductPageMarca } from './components/ProductPageMarca'
import { MultiStepForm } from './components/SignInForm'
import { ProductDetails } from './components/ProductDetails'
import './App.css'
import { CarritoPage } from './components/CarritoPage'
import productService from './services/productos'
import usuarioService from './services/usuarios'
import { ProductForm } from './components/ProductForm'

const App = () => {
  const userSesion = !!(window.localStorage.getItem('loggedUser') && window.localStorage.getItem('loggedUser') !== undefined)

  if (userSesion) {
    const user = JSON.parse(window.localStorage.getItem('loggedUser'))
    productService.setToken(user.token)
    usuarioService.setToken(user.token)
  }
  return (
    <ChakraProvider>
      <header>
        <Navbar userState={userSesion} />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<ProductPage />} />
          <Route path='/productos' element={<ProductPage />} />
          <Route path='/productos/:id' element={<ProductDetails />} />
          <Route path='/productos/marca/:marca' element={<ProductPageMarca />} />
          <Route path='/productos/modificar/:id' element={<ProductForm />} />
          <Route path='/registrarse' element={<MultiStepForm />} />
          <Route path='/carrito' element={<CarritoPage />} />
          <Route
            path='/login'
            element={
            userSesion
              ? <Cargando mt='10px' />
              : <LoginForm userState={userSesion} />
          }
          />
        </Routes>

      </main>

    </ChakraProvider>
  )
}

export default App
