import logo from './logo.svg';
import './App.css';
import './index.css';
import { useState, useEffect, useRef } from 'react';
import Header from './Header';
import React, { Component } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'
import { Login } from './Login';
import { Navbar } from './Component/Navbar';
import { Home } from './Component/Home';
import { Contact } from './Component/Contact';
import { About } from './Component/About';
import { Item } from './Component/Item';
import { SalesInvoice } from './Component/SalesInvoice';
import Customer from './Component/Customer';
import { Slip } from './Component/Slip'
import Plotter from './Component/Plotter';
import axios from 'axios';
import { GetAPI_URL } from "./Component/Config";
import Dialog from './Component/Dialouge';


export function App() {
  const [bug, setBug] = useState(false);
const [dialogText, setDialogText] = useState("");
  const [obj, setNList] = useState([]);
  const countRef = useRef(0);
  const timeoutRef = useRef(null);
  const location = useLocation();
  useEffect(() => {

    GetMenu()
    const handleKeyDown = (e) => {
      if (e.key === "F9") {
        countRef.current += 1;


        if (countRef.current === 5) {
          
          setDialogText("F9 pressed 5 times!");
      setBug(true);
          
          


          
        }

        // 1 second ke andar 5 presses na hon to counter reset
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          countRef.current = 0;
        }, 1000);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  //const _obj = GetMenu(() => {
  function GetMenu() {
    axios.post(GetAPI_URL, {
      SPName: "",              // or some stored procedure name if needed
      Parameter: [],
      Values: [`select * from MenuMaster`],
      Connection: ""
    }).then((response) => {
      setNList(response.data)
    }).catch((error) => {

    })
  }

  //})
  // const obj = [
  //   { Id: "1", Name: "Home", Link: "Home" },
  //   { Id: "2", Name: "Contact", Link: "Contact" },
  //   { Id: "3", Name: "About", Link: "About" },
  //   { Id: "4", Name: "Item", Link: "Item" },
  //   { Id: "5", Name: "saleinvoice", Link: "SalesInvoice" },
  //   { Id: "6", Name: "Customer", Link: "Customer" },
  //   { Id: "6", Name: "Slip", Link: "Slip" },
  //   { Id: "6", Name: "Plotter", Link: "Plotter" }

  // ]
  const hideNavbarRoutes = ["/"];    // <---- HIDE NAVBAR on these pages
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  return (
    <>

        {/* Dialog */}
      
      {!shouldHideNavbar && <Header bug={bug}/>}

      <div style={{ display: "flex", height: "93vh" }}>
        


        {!shouldHideNavbar && <Navbar menu={obj} />}
        {/* <Navbar menu={obj} /> */}
        <main className="p-3 flex-grow-1 overflow-auto">


          {/* <HomeClass name="kabir ustaad" age="32" surname="bhatti"/> */}
          <Routes>

            <Route path='/' element={<Login />} />
            <Route path='/Contact' element={<Contact />} />
            <Route path='/About' element={<About />} />
            <Route path='/Item' element={<Item />} />
            <Route path='/Home' element={<Home />} />
            <Route path='/SalesInvoice' element={<SalesInvoice />} />
            <Route path='/Customer' element={<Customer />} />
            <Route path='/Slip' element={<Slip />} />
            <Route path='/Plotter' element={<Plotter />} />


          </Routes>
        </main>
      </div>
    </>

  );
}
// class App2 extends Component 
// {
//   render(){
//   return(
//     <h3>learning never ends</h3>
//   );
// }
// }


// export  class App3 extends Component {
//   constructor(props){
//     super(props)
//   }
//   render() {
//     return (
//       <div>
//     <h3>learning never {this.props.name}</h3>
//     <h3>learning never {this.props.children}</h3>

//       </div>
//     )
//   }
// }




