import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Index } from './components/Index/Index';
import { ProductContext, UserContext ,BasketContext} from './hooks';
import { useEffect } from 'react';
import axios from 'axios';
import { Navbar } from './components/Navbar/Navbar';
import { Login } from './components/Login/Login';
import { Products } from './components/ProductComponents/Products';
import { Footer } from './components/Footer/Footer';
import { Register } from './components/Register/Register';
import { IUser,IBasket } from './interfaces';
import { log } from 'console';
import { Checkout } from './components/Checkout/Checkout';

function App() {
  const [products, setProducts] = React.useState([])
  const [user, setUser] = React.useState({} as IUser)
  const [basket,setBasket] = React.useState([])
  const value = { user, setUser }
  useEffect(() => {
    axios.get('http://localhost:3000/fortype').then(({ data }) => {
      setProducts(data)
    })

    axios.get('http://localhost:3000/test')
      .then((result) => {
        if (localStorage.getItem('userId')) {
          let id = localStorage.getItem('userId')
          axios.get(`http://localhost:3000/getuser/${id}`)
            .then(({ data }) => {
              setUser(data as IUser)
              setBasket(data.basket)
              console.log("res",data as IUser)
            })

        }
      })
      .catch((err) => {
        if (localStorage.getItem('userId')) {
          localStorage.removeItem('userId')
        }
      })

  }, [])
  onscroll = () => {
    if (window.scrollY > 160) {
      document.querySelector('.afterScrollNavWrapper')?.classList.add('navActive')
    }
    else {
      document.querySelector('.afterScrollNavWrapper')?.classList.remove('navActive')

    }
  }


  return (
    <>
      <Router>
        <UserContext.Provider value={value}>
          <BasketContext.Provider value={{basket,setBasket}}>

            <ProductContext.Provider value={{ products, setProducts }}>
              <Navbar  />
              <Routes>
                <Route path='/' element={<Index productsArray={products} />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/checkout' element={<Checkout basketArray={basket}/>} />
              </Routes>
              <Footer />
            </ProductContext.Provider>
          </BasketContext.Provider>

        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
