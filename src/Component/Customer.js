import React, { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Swal from "sweetalert2";
import { GetAPI_URL,SaveAPI_URL } from "./Config";
import { Dialog } from "./Dialouge";



function Customer(){
    
    const [formdata, setFormData] = useState({
        CustId:0,
        Name: '',
        Address: '',
        Contact: ''
    });
    const [nList, setNList] = useState([]);
    useEffect(() => {
        GetData()
        
    },[]);
const [debugText,SetDebugText] = useState([]);
    function GetData() {
        axios.post(GetAPI_URL,{
            SPName: "",              // or some stored procedure name if needed
            Parameter: [],
            Values: [`select * from Customers`],
            Connection: ""
        }).then((response) => {
            setNList(response.data)
            const maxId = nList.reduce((max, item) => {
  return item.custId > max ? item.custId : max;
}, 0);
formdata.CustId = maxId + 1

        }).catch((error) => {

        })
    }
    function ClearData() {
            setFormData({
                Name: "", Address: "", Contact:""
    
            })
            
            setNList([]);
        }
    const SaveData = (e) => {
 SetDebugText("(`insert into Customers(CustId,Name,Address,Contact) values ('${formdata.CustId}','${formdata.Name}', '${formdata.Address }', '${formdata.Contact }')`)")
        debugger
        axios.post(SaveAPI_URL, {

            SPName: "",            
            Parameter: [],
            Values:[debugText],
            Connection: ""
        }).then((response) => {
            
            if (response.data > 0) {
                       
                Swal.fire("Success", "save successfully","success")
                setFormData({
                    Name:"",Address:"",Contact:""
                })
            }
            else{
                Swal.fire("Failed", "save un successfully","error")
            }
            //setNList((prevList) => [...prevList, response.data]);
        }).catch((error) => {
            Swal.fire("errors", error,"error")
        })

    };
    function onDelete(id) {
        axios.post(SaveAPI_URL, {
            SPName: "",              // or some stored procedure name if needed
            Parameter: [],
            Values: [`delete from Customers where CustId = ${id}`],
            Connection: ""
        }).then((response) => {
            if (response.data === 1) {
                Swal.fire("Success", "delete successfully","success")
            }
        }).catch((error) => {
            Swal.fire("errors", error,"error")
        })
    }
    return(
       <>
       
        <dialog></dialog>
       <div className="container">

                <div className="row">
                    <div className="col-4">
                        <p className="h5" style={{ color: "aqua", fontSize: "22px" }}>
                            Customer Information{formdata.Name+formdata.Address}
                        </p>
                    </div>
                    <div className="col-8">
                        <p className="dflex" style={{ paddingLeft: "400px" }}>/Home</p>
                    </div>
                </div>

                {/* Input Section */}
                <div className="row" style={{ height: "30em" }}>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-6">
                                <label className="text-success">Cust Id</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="CustId"
                                    disabled
                                    value={formdata.CustId}
                                    onChange={(e) => setFormData({ ...formdata, [e.target.name]: e.target.value })}
                                />
                            </div>
                            <div className="col-6">
                                <label className="text-success">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="Name"
                                    value={formdata.Name}
                                    onChange={(e) =>
                                        setFormData({ ...formdata, [e.target.name]: e.target.value })
                                    }
                                />
                            </div>
                            <div className="col-6">
                                <label className="text-success">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="Address"
                                    value={formdata.Address}
                                    onChange={(e) =>
                                        setFormData({ ...formdata, [e.target.name]: e.target.value })
                                    }


                                />
                            </div>
                            <div className="col-6">
                                <label className="text-success">Contact</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="Contact"
                                    value={formdata.Contact}
                                    onChange={(e) =>
                                        setFormData({ ...formdata, [e.target.name]: e.target.value })
                                    }


                                />
                            </div>

                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-xl-6 col-sm-12 overflow-auto" style={{ height: "500px" }}>

                        <table className='table table-bordered table-striped  table-hover' >
                            <thead>
                                <tr>
                                    <th>CustId</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Contact</th>

                                </tr>
                            </thead>
                            <tbody>
                                {nList.map((i) => {

                                    return (
                                        <tr>
                                            <td>{i.custId}</td>
                                            <td>{i.name}</td>
                                            <td>{i.address}</td>
                                            <td>{i.contact}</td>

                                            <td >
                                                <button className="">
                                                    <i className="fa fa-pen text-primary"></i>
                                                </button>
                                            </td>
                                            <td>
                                                <button className="" onClick={() => onDelete(i.custId)}>
                                                    <i className="fa fa-trash text-danger"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2 d-flex gap-1">
                        <button className="btn btn-success" onClick={() => SaveData()}>
                            <i className="fa fa-save text-green"></i>
                        </button>



                        <button type="button" className="btn btn-danger" onClick={() => ClearData()} >
                            <i className="fa fa-close text-red"></i>
                        </button>

                    </div>
                </div>
            </div>
       </>
    )
}
export default Customer;