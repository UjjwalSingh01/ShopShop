import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/HomePage'
import ShopCategory from './pages/ShopCategory'
import Items from './pages/Items'
import ItemCart from './pages/ItemCart'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import men_banner from './Assets/banner_men.png'
import women_banner from './Assets/banner_women.png'
import kid_banner from './Assets/banner_kids.png'
import Footer from './components/Footer'
import Orders from './pages/Orders'
import { store } from '../redux/store'
import {Provider} from 'react-redux'
import men_image from './Assets/product_20.png'
import women_image from './Assets/product_1.png'
import kid_image from './Assets/product_25.png'


function App() {

  return (
    <>
      <Provider store={store}>
      {/* <Navbar /> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path='/men' element={<ShopCategory image={men_image} banner={men_banner} category="men"/>} />
          <Route path='/women' element={<ShopCategory image={women_image} banner={women_banner} category="women"/>} />
          <Route path='/kids' element={<ShopCategory image={kid_image} banner={kid_banner} category="kids"/>} />
          <Route path='/items' element={<Items />}>
            <Route path=':itemsId' element={<Items />}/>
          </Route>
          <Route path='/cart' element={<ItemCart />}/>
          <Route path='/orders' element={<Orders />}/>
          <Route path='/signin' element={<Signin />}/>
          <Route path='/signup' element={<Signup />}/>
        </Routes>
      </BrowserRouter>
      <Footer />
      </Provider>
    </>
  )
}

export default App


