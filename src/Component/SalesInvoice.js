import React, { useEffect, useState, useRef } from "react";
import { Alert, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Swal from "sweetalert2";
import { Item } from "./Item";
import { Slip } from "./Slip";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GetAPI_URL, SaveAPI_URL } from "./Config";
import { array } from "prop-types";
import Dialog from "./Dialouge";
export function SalesInvoice() {
    const RefQty = useRef(null);
    const RefPrice = useRef(null);
    const sumOfTotals = ''
    const today = new Date();
    const [nList, setNList] = useState([]);
    const [nItemList, setItemList] = useState([]);
    const [nCustList, setCustList] = useState([]);
    const [detaildata, setDetailData] = useState({
        ItemId: "",
        _Item: "",
        Item: "",
        Qty: "",
        Price: "",
        Total: ""
    })
    const [formdata, setFormData] = useState({
        CustId: "",
        Name: "",
        Date: today.toISOString().split("T")[0],
        Address: "",
    });
    const navigate = useNavigate();
    const hasLoaded = useRef(false);

    useEffect(() => {
        if (hasLoaded.current) return;

        hasLoaded.current = true;
        BindCustDropdown()
        BindItemDropdown()
        //Calc()
        //Calculate()
    }, [])

    function Calc(e) {

        debugger
        const custId = e.target.value
        setFormData(prev => ({
            ...prev,
            CustId: custId
        }))
        axios.post(GetAPI_URL, {
            SPName: "",              // or some stored procedure name if needed
            Parameter: [],
            Values: [`select * from Customers where CustId = '${custId}'`],
            Connection: ""
        }).then((res) => {
            if (!Array.isArray(res.data) || res.data.length === 0) {
                return;
            }
            var data = res.data[0];

            setFormData(prev => ({
                ...prev,
                Address: data.address || "",
                Name: data.name || ""
            }));


        }).catch((error) => {
            //alert('xx' + detaildata.Item)
        })
    }
    function onEnterQty(){
        detaildata.Total = Number(detaildata.Qty) * Number(detaildata.Price)
        setDetailData(prev => ({
            ...prev,
            Total: detaildata.Total
        }));
       
    }
    function handleItemChange(e) {

        const itemId = e.target.value;

        setDetailData(prev => ({
            ...prev,
            ItemId: itemId
        }));

        if (itemId) {
            Calculate(itemId);
        }
    }
    function Calculate(itemId) {

        const _data = null;
        axios.post(GetAPI_URL, {
            SPName: "",              // or some stored procedure name if needed
            Parameter: [],
            Values: [`select * from Items where ItemId = '${itemId}'`],
            Connection: ""
        }).then((res) => {
            if (!Array.isArray(res.data) || res.data.length === 0) {
                return;
            }
            var data = res.data[0];
            console.log(data)
            setDetailData(prev => ({
                ...prev,
                Price: data.price, Item: data.item, Qty:0, Total: Number(prev.Qty) || 0 * data.price || 0 
            }))

            //  detaildata.Total =  detaildata.Price * detaildata.Qty
            RefQty.current.focus();
        }).catch((error) => {
            //alert('xx' + detaildata.Item)
        })

    }
    function BindItemDropdown() {

        axios.post(GetAPI_URL, {
            SPName: "",              // or some stored procedure name if needed
            Parameter: [],

            Values: [`select * from Items `],
            Connection: ""
        }).then((res) => {
            setItemList(Array.isArray(res.data) ? res.data : [])
        })

    }
    function BindCustDropdown() {
        axios.post(GetAPI_URL, {
            SPName: "",              // or some stored procedure name if needed
            Parameter: [],

            Values: [`select * from Customers `],
            Connection: ""
        }).then((res) => {
            setCustList(Array.isArray(res.data) ? res.data : [])
        })

    }

    function SaveData(nlist) {
        localStorage.setItem("nList", JSON.stringify(nList));
        <Slip nlist={nlist}></Slip>
        console.log('f' + nlist)
        if (formdata.CustId === undefined) {
            Swal.fire("info", "input all feilds", "info")
            return
        }
        axios.post(SaveAPI_URL, {
            SPName: "",
            Parameter: [],
            Values: [`insert into SaleMaster(CustId,CreatedOn) values ('${formdata.CustId}','${formdata.Date}')`],
            Connection: ""
        }).then((res) => {
            let saleid = res.data
            if (saleid > 0) {

                nList.map((i) => {
                    axios.post(SaveAPI_URL, {
                        SPName: "",
                        Parameter: [],
                        Values: [`insert into SaleDetail(SaleId,ItemId,Item,Qty,Price,Total) values ('${saleid}','${i.ItemId}','${i._Item}','${i.Qty}','${i.Price}','${i.Total}')`],
                        Connection: ""
                    }).then((res1) => {
                        debugger
                        if (res1.data > 0) {
                            navigate("/Slip");
                            ClearData()
                            Swal.fire("Save", "Saved", "success")
                        }
                    })
                })
            }
            else {
                alert(saleid)
            }
            //Swal.fire("Save", "Saved", "success")

        }).catch((error) => {
            //alert('xx' + detaildata.Item)
        })
    }
    function SaveInGrid() {
        if (detaildata.Qty === "" || formdata.Customer) {
            Swal.fire("info", "input all feilds", "info")
            return
        }
        const newEntry = {
            ItemId: detaildata.ItemId,
            _Item: detaildata._Item,
            Item: detaildata.Item,
            Price: detaildata.Price,
            Qty: detaildata.Qty,
            Total: detaildata.Total,
        };
        setNList(prevList => {
            return [...prevList, newEntry]
        });

        setDetailData({ Item: "", Qty: "", Price: "", Total: "" })
        //         sumOfTotals = nList.reduce((acc, item) => {
        //     return acc + (item.total || 0);
        //   }, 0);

    }
    function ClearData() {
        <Link to="/Slip">Go to Slip</Link>
        // setFormData({
        //     Address: "", Date: Date.now, CustId: ""

        // })
        // setDetailData({
        //     ItemId: "", Item: "", Qty: "", Price: "", Total: ""
        // })
        // setNList([]);
    }
    function DeleteDetailGrid(id) {
        let res = nList.findIndex(item => item.ItemId === id)
        if (res > -1) {
            nList.splice(res, 2);
        }

    }
    function EditDetailGrid(id) {
        let res = nList.findIndex(item => item.ItemId === id)
        if (res > -1) {
            detaildata.Qty = nList[res].Qty
            detaildata.Price = nList[res].Price
            detaildata.Total = nList[res].Total
            nList.splice(res, 2);
        }

    }
    return (
        <>
            <Slip show={false} nlist={nList} qty={detaildata.Qty}></Slip>
            
            <div className="container">

                <div className="row">
                    <div className="col-xl-4 col-md-4 col-sm-12">
                        <p className="h5" style={{ color: "aqua", fontSize: "22px" }}>
                            Sale Invoice
                        </p>
                    </div>
                    <div className="col-8">
                        <p className="dflex" style={{ paddingLeft: "400px" }}>/Home</p>
                    </div>
                </div>

                {/* Input Section****************************************************************** */}
                <div className="row" >
                    <div className="col-xl-3 col-md-3 col-sm-12 ">
                        <label className="text-success">Customer</label>
                        <select
                            className="form-control dropdown"
                            name="CustId"
                            value={formdata.CustId}
                            onChange={

                                Calc
                            }
                        >
                            <option value="">Select customer</option>
                            {
                                nCustList.map((item) => (
                                    <option
                                        key={item.custId}
                                        value={item.custId}
                                    >
                                        {item.name}
                                    </option>
                                ))
                            }


                        </select>
                    </div>
                    <div className="col-xl-3 col-md-3 col-sm-12 ">
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
                    <div className="col-xl-3 col-md-3 col-sm-12 ">
                        <label className="text-success">Date</label>
                        <input
                            type="date"
                            className="form-control"
                            name="Date"
                            value={formdata.Date}
                            onChange={(e) =>
                                setFormData({ ...formdata, [e.target.name]: e.target.value })
                            }
                        />
                    </div>
                </div>
                <div className="row mt-5" >
                    {/* ITEMmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm */}
                    <div className="col-xl-2 col-md-4 col-sm-12 ">
                        <label className="text-success">Item</label>
                        <select
                            className="form-control custom-selectl"
                            name="ItemId"
                            value={detaildata.ItemId}
                            onChange={
                                handleItemChange
                            }

                        >
                            <option value="">Select Item</option>
                            {nItemList.map((i) => (
                                <option
                                    key={i.itemId}
                                    value={i.itemId}

                                >
                                    {i.item}
                                </option>
                            ))}

                        </select>
                    </div>
                    <div className="col-xl-2 col-md-4 col-sm-6">
                        <label className="text-success">Qty</label>
                        <input
                            type="number"
                            className="form-control"
                            name="Qty"
                            value={detaildata.Qty}
                            ref={RefQty}
                            onChange={(e) =>
                                setDetailData({ ...detaildata, [e.target.name]: e.target.value })
                            }
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === 'Tab') {
                                    onEnterQty()
                                    //detaildata.Total = Number(detaildata.Qty) * Number(detaildata.Price)

                                }
                            }}
                        />
                    </div>
                    <div className="col-xl-2 col-md-4 col-sm-6">
                        <label className="text-success">Price</label>
                        <input
                            type="text"
                            className="form-control"
                            name="Price"
                            disabled
                            value={detaildata.Price}
                            ref={RefPrice}
                            onChange={(e) =>
                                setDetailData({ ...detaildata, [e.target.name]: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-xl-2 col-md-4 col-sm-6">
                        <label className="text-success">Total</label>
                        <input
                            type="text"
                            disabled
                            className="form-control"
                            name="Total"
                            value={detaildata.Total}
                            onChange={(e) =>
                                setDetailData({ ...detaildata, [e.target.name]: e.target.value })
                            }

                        />
                    </div>
                    <div className="col-xl-2 col-md-4 col-sm-6 mt-3">
                        <button type="button" className="btn btn-primary" onClick={() => SaveInGrid()}>Add</button>
                    </div>
                </div>

                <div className="row mt-5 overflow-auto" style={{ height: "15em" }}>
                    <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12" >

                        <table className='table table-bordered table-striped  table-hover' >
                            <thead>
                                <tr>
                                    <th>ItemId</th>
                                    <th>Item</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>

                                {nList.map((entry, index) => (

                                    <tr key={index}>
                                        <td>{entry.ItemId}</td>
                                        <td>{entry.Item}</td>
                                        <td>{entry.Qty}</td>
                                        <td>{entry.Price}</td>
                                        <td>{entry.Total}</td>
                                        <td style={{ width: "10px" }}>
                                            <button className="" onClick={() => EditDetailGrid(entry.ItemId)}>
                                                <i className="fa fa-pen text-primary"></i>
                                            </button>
                                        </td>
                                        <td style={{ width: "10px" }}>
                                            <button className="" onClick={() => DeleteDetailGrid(entry.ItemId)}>
                                                <i className="fa fa-trash text-danger"></i>
                                            </button>
                                        </td>
                                    </tr>


                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-2 d-flex gap-1">
                        <button className="btn btn-success" onClick={() => SaveData(nList)}>
                            <i className="fa fa-save text-green"></i>
                        </button>



                        <button type="button" className="btn btn-danger" onClick={() => ClearData()}>
                            <i className="fa fa-close text-red"></i>
                        </button>

                    </div>
                </div>
            </div>


        </>
    )
}