import React from "react";
import propTypes from 'prop-types'
import { href } from "react-router-dom";
import {ap} from "./App"
// function _Header(props) {
//     return(
//         <header>
//     <h2>this is my headersssss</h2>
//     <h2>{props.name}</h2>
//     <h2>{props.age}</h2>

//     <h2>{props.arr[2]}</h2>
//     </header>
//     );
// }
const Header = ({bug}) => {
    
    
    return (
        <>
            <div className="container-fluid">
                <header className="bg-primary text-white p-2 d-flex justify-content-between align-items-center">
                    <h2 className="m-0 text-center flex-grow-1">information Technology</h2>
                    {bug === true &&(
                    <a href="">
                        <i
                            className="fas fa-bug"
                            style={{ fontSize: "34px", color: "orange" , padding:5 }}
                        ></i>

                    </a>
                    )}
                    <a href="">
                        <i
                            className="fas fa-sync-alt"
                            style={{ fontSize: "34px", color: "orange" , padding:5 }}
                        ></i>

                    </a>
                    <a href="/NewApp">
                        <i className="fas fa-sign-out-alt" style={{ fontSize: "34px", color: "white" }}></i>
                    </a>

                </header>
            </div>

        </>
    );
}

export default Header;