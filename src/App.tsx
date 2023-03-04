import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Index } from './components/Index/Index';
import { ProductContext, UserContext, BasketContext, OrderContext } from './hooks';
import { useEffect } from 'react';
import axios from 'axios';
import { Navbar } from './components/Navbar/Navbar';
import { Login } from './components/Login/Login';
import { Products } from './components/ProductComponents/Products';
import { Footer } from './components/Footer/Footer';
import { Register } from './components/Register/Register';
import { IUser, IBasket, IOrders, IOrder,ProductIF } from './interfaces';
import { log } from 'console';
import { Checkout } from './components/Checkout/Checkout';
import { AdminIndex } from './components/Admin/AdminIndex';
import { AdminOrders } from './components/Admin/AdminOrders';
import { AdminProducts } from './components/Admin/AdminProducts';
import { AdminCreateProducts } from './components/Admin/AdminCreateProduct';
import { AdminUpdateProduct } from './components/Admin/AdminUpdateProduct';

function App() {
  const [products, setProducts] = React.useState([])
  const [user, setUser] = React.useState({} as IUser)
  const [basket, setBasket] = React.useState([])
  const [isUserLoaded, setIsUserLoaded] = React.useState(false);
  const [orders, setOrders] = React.useState([] as IOrder[])
  const value = { user, setUser }
  useEffect(() => {
    axios.get('http://localhost:3000/fortype').then(({ data }) => {
      setProducts(data.reverse())
    })

    axios.get('http://localhost:3000/test')
      .then((result) => {
        console.log(result)
        if (localStorage.getItem('userId')) {

          let id = localStorage.getItem('userId')
          axios.get(`http://localhost:3000/getuser/${id}`)
            .then(({ data }) => {
              setUser(data as IUser)
              setBasket(data.basket)
              console.log("res", data as IUser)
              setIsUserLoaded(true);
            })

        }
      })
      .catch((err) => {
        console.log(err)
        if (localStorage.getItem('userId')) {
          localStorage.removeItem('userId')
        }
      })

    axios.get('http://localhost:3000/orders').then(({ data }) => {
      setOrders(data as IOrder[])
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

  const NotFound: React.FC = () => {
    return <div style={{ padding: "40px", display: 'flex', justifyContent: "center" }}>
      <h1>404</h1>
    </div>
  }


  return (
    <>
      <Router>
        <UserContext.Provider value={value}>
          <OrderContext.Provider value={{orders,setOrders}}>
            <BasketContext.Provider value={{ basket, setBasket }}>
              <ProductContext.Provider value={{ products, setProducts }}>
                <Navbar />
                <Routes>
                  <Route path='/' element={<Index productsArray={products} />} />
                  <Route path='/login' element={<Login orders={user.orders} username={user.username} email={user.email} isadmin={user.isadmin} basket={user.basket} id={user.id} />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/checkout' element={<Checkout basketArray={basket} />} />
                  {isUserLoaded && user.isadmin && <Route path='/admin' element={<AdminIndex />} />}
                  {isUserLoaded && user.isadmin && <Route path='/admin/orders' element={<AdminOrders orders={orders} />} />}
                  {isUserLoaded && user.isadmin && <Route path='/admin/products' element={<AdminProducts productsArray={products as ProductIF[]} />} />}
                  {isUserLoaded && user.isadmin && <Route path='/admin/createproduct' element={<AdminCreateProducts/>} />}
                  {isUserLoaded && user.isadmin && <Route path='/admin/updateproduct/:productId' element={<AdminUpdateProduct/>} />}
                  <Route path='*' element={<NotFound />} />
                </Routes>
                <Footer />
              </ProductContext.Provider>
            </BasketContext.Provider>
          </OrderContext.Provider>
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
