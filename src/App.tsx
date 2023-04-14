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
import { IUser, IBasket, IOrders, IOrder, ProductIF, ISlider } from './interfaces';
import { log } from 'console';
import { Checkout } from './components/Checkout/Checkout';
import { AdminIndex } from './components/Admin/AdminIndex';
import { AdminOrders } from './components/Admin/AdminOrders';
import { AdminProducts } from './components/Admin/AdminProducts';
import { AdminCreateProducts } from './components/Admin/AdminCreateProduct';
import { AdminUpdateProduct } from './components/Admin/AdminUpdateProduct';
import { AdminUsers } from './components/Admin/AdminUsers';
import { AdminSliders } from './components/Admin/AdminSliders';
import { AdminAddSlider } from './components/Admin/AdminAddSlider';


axios.defaults.withCredentials = true;

function App() {
  const [products, setProducts] = React.useState([])
  const [user, setUser] = React.useState({} as IUser)
  const [basket, setBasket] = React.useState([])
  const [isUserLoaded, setIsUserLoaded] = React.useState(false);
  const [orders, setOrders] = React.useState([] as IOrder[])
  const [users,setUsers] = React.useState([] as IUser[])
  const [sliders,setSliders] = React.useState([] as ISlider[])
  const value = { user, setUser }
  
  useEffect(() => {
    // axios.get(`http://localhost:3000/querytest?name=${"nurlan"}&age=${20}`)
    // .then((res)=>{
    //   console.log(res)
    // })

    axios.get(`https://morning-peak-77048.herokuapp.com/sliders`)
    .then((res)=>{
        setSliders(res.data)
    })

    axios.get('https://morning-peak-77048.herokuapp.com/fortype').then(({ data }) => {
      setProducts(data.reverse())
    })

    axios.get('https://morning-peak-77048.herokuapp.com/users').then(({ data }) => {
      setUsers(data.reverse())
      console.log(data)
    })
    window.localStorage.setItem('new',"salam")
    console.log(`localdan gelen id budu : ${localStorage.getItem('userId')? localStorage.getItem('userId') : 'local yoxdu'}`)
    axios.get('https://morning-peak-77048.herokuapp.com/test')
      .then((result) => {
        console.log(result)
        if (localStorage.getItem('userId')) {
          let id = localStorage.getItem('userId')
          axios.get(`https://morning-peak-77048.herokuapp.com/getuser/${id}`)
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

    axios.get('https://morning-peak-77048.herokuapp.com/orders').then(({ data }) => {
      setOrders(data.reverse() as IOrder[])
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
          <OrderContext.Provider value={{ orders, setOrders }}>
            <BasketContext.Provider value={{ basket, setBasket }}>
              <ProductContext.Provider value={{ products, setProducts }}>
                <Navbar />
                <Routes>
                  <Route path='/' element={<Index productsArray={products} />} />
                  <Route path='/login' element={<Login orders={user.orders} username={user.username} email={user.email} isadmin={user.isadmin} basket={user.basket} _id={user._id} />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/checkout' element={<Checkout basketArray={basket} />} />
                  {isUserLoaded && user.isadmin && <Route path='/admin' element={<AdminIndex />} />}
                  {isUserLoaded && user.isadmin && <Route path='/admin/orders' element={<AdminOrders orders={orders} />} />}
                  {isUserLoaded && user.isadmin && <Route path='/admin/products' element={<AdminProducts productsArray={products as ProductIF[]} />} />}
                  {isUserLoaded && user.isadmin && <Route path='/admin/createproduct' element={<AdminCreateProducts />} />}
                  {isUserLoaded && user.isadmin && <Route path='/admin/updateproduct/:productId' element={<AdminUpdateProduct />} />}
                  {isUserLoaded && user.isadmin && <Route path='/admin/users/' element={<AdminUsers users={users} />} />}
                  {isUserLoaded && user.isadmin && <Route path='/admin/sliders/' element={<AdminSliders sliders={sliders}  />} />}
                  {isUserLoaded && user.isadmin && <Route path='/admin/addslider/' element={<AdminAddSlider  />} />}

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
