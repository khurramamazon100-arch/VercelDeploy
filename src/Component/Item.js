import React, { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Swal from "sweetalert2";
import { Prev } from "react-bootstrap/esm/PageItem";
import { GetAPI_URL } from "./Config";
import Dialog from "./Dialouge";



export function Item() {

    const [formdata, setFormData] = useState({
        ItemId: 0,
        Item: "",
        Price: 0
    });
    const [nList, setNList] = useState([]);
    useEffect(() => {
        GetData();
    }, []);


    function GetData() {

        axios.post(GetAPI_URL, {
            SPName: "",              // or some stored procedure name if needed
            Parameter: [],
            Values: [`select * from Items`],
            Connection: ""
        }).then((response) => {

            setNList(Array.isArray(response.data) ? response.data : [])







            const zmaxId = nList.reduce((max, item) => {

                return Number(item.itemId) > max
                    ? Number(item.itemId)
                    : max;
            }, 0);

            const maxId = response.data.reduce((max, item) => {
                const id = Number(item.itemId) || 0;
                return id > max ? id : max;
            }, 0);


            setFormData(Prev => ({
                ...Prev,
                ItemId: maxId + 1
            }))








        }).catch((error) => {
            console.error("ERROR:", error);
            console.error("MESSAGE:", error.message);
            console.error("RESPONSE:", error.response);
        })
    }
    const SaveData = (e) => {

        debugger
        axios.post(`http://192.168.0.86/Core2/api/Home/SaveData`, {

            SPName: "",              // or some stored procedure name if needed
            Parameter: [],
            // Values: [`insert into Items(Item,Price) values ('${formdata.Item}',${formdata.Price})`],
            Values: [`insert into Items(Item, Price) values ('${formdata.Item}', ${formdata.Price})`],
            Connection: ""
        }).then((response) => {
            console.log(response.data)
            console.log(response.status)
            if (response.data > 0) {
                Swal.fire("Success", "save successfully", "success")
                GetData()
                setFormData({

                    Item: "", Price: ""
                })
            }
            else {
                Swal.fire("Failed", "save un successfully", "error")
            }
            //setNList((prevList) => [...prevList, response.data]);
        }).catch((error) => {
            Swal.fire("errors", error, "error")
        })

    };
    function onDelete(id) {
        axios.post(`https://localhost:4001/api/Home/DeleteData`, {
            SPName: "",              // or some stored procedure name if needed
            Parameter: [],
            Values: [`delete from Items where ItemId = ${id}`],
            Connection: ""
        }).then((response) => {
            if (response.data === 1) {
                Swal.fire("Success", "delete successfully", "success")
                GetData()
            }
        }).catch((error) => {
            Swal.fire("errors", error, "error")
        })
    }
    return (
        <>


            <div className="container">
                
 
                <div className="row align-items-center mb-3">
                    <div className="col-12 col-md-6">
                        <p className="h5 item-title">
                            Item Information
                        </p>
                    </div>

                    <div className="col-12 col-md-6 text-md-end">
                        <p className="home-link mb-0">/Home</p>
                    </div>
                </div>

                {/* Input Section */}
                <div className="row g-3">
                    <div className="col-12 col-lg-5">
                        <div className="row">
                            <div className="col-12 col-md-6 mb-3">
                                <label className="text-success">Item Id</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    disabled
                                    value={formdata.ItemId}
                                    onChange={(e) => setFormData({ ...formdata, [e.target.name]: e.target.value })}
                                />
                            </div>
                            <div className="col-6">
                                <label className="text-success">Item</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="Item"
                                    value={formdata.Item}
                                    onChange={(e) =>
                                        setFormData({ ...formdata, [e.target.name]: e.target.value })
                                    }
                                />
                            </div>
                            <div className="col-6">
                                <label className="text-success">Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="Price"
                                    value={formdata.Price}
                                    onChange={(e) =>
                                        setFormData({ ...formdata, [e.target.name]: e.target.value })
                                    }


                                />
                            </div>

                        </div>
                    </div>
                    <div className="col-12 col-lg-7">
                        <div className="table-responsive item-table-container">

                            <table className='table table-bordered table-striped  table-hover' >
                                <thead>
                                    <tr>
                                        <th>ItemId</th>
                                        <th>Item</th>
                                        <th>Price</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {nList.map((i) => {

                                        return (
                                            <tr>
                                                <td>{i.itemId}</td>
                                                <td>{i.item}</td>
                                                <td>{i.price}</td>
                                                <td >
                                                    <button className="">
                                                        <i className="fa fa-pen text-primary"></i>
                                                    </button>
                                                </td>
                                                <td>
                                                    <button className="" onClick={() => onDelete(i.itemId)}>
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
                </div>
                <div className="row mt-3">
                    <div className="col-12 d-flex gap-2">
                        <button className="btn btn-success" onClick={() => SaveData()}>
                            <i className="fa fa-save text-green"></i>
                        </button>



                        <button type="button" className="btn btn-danger" >
                            <i className="fa fa-close text-red"></i>
                        </button>

                    </div>
                </div>
            </div>


        </>
    );
}