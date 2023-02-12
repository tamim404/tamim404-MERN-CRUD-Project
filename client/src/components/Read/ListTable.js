import React, {useEffect, useState} from 'react';
import {Delete, Read} from "../../APIservices/CRUDservice";
import FullScreenLoader from "../Common/FullScreenLoader";
import {ErrorToast, SuccessToast} from "../../helper/ValidationHelper";
import {useNavigate} from "react-router-dom"
import { TfiEraser,TfiTrash } from "react-icons/tfi";


const ListTable = () => {
    let [DataList,SetDataList]=useState([]);
    let [Loading,SetLoading]=useState(true)

    useEffect(()=>{
        Read().then((Result)=>{
            SetDataList(Result)
            SetLoading(false)
        })

    },[])
    const navigate = useNavigate();
    const UpdateItem=(id)=>{
        navigate("/update/"+id)
    }

    const DeleteItem=(id)=>{
        Delete(id).then((Result)=>{
            if(Result===true ){
                SuccessToast("Delete Success")
                window.location.reload(true)
            }else {
                ErrorToast("Delete Fail")
            }
        })
    }


    if (Loading){
        return (
            <div>
                <FullScreenLoader/>
            </div>
        )
    }else{
        return (
            <div className="container border-black bg-white rounded-4 shadow-demo shadow-4 mx-auto text-center">
                <table className="table table-striped ">
                    <thead className="bg-secondary text-white ">
                    <tr>
                    <th><h6>Product Name</h6></th>
                    <th><h6>Product Code</h6></th>
                    <th><h6>Image</h6></th>
                    <th><h6>Unit Price</h6></th>
                    <th><h6>Qty</h6></th>
                    <th><h6>Total Price</h6></th>
                    <th ><h6>Action</h6></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        DataList.map((item,i)=>{
                            return(
                                <tr>
                                    <td>{item.ProductName}</td>
                                    <td>{item.ProductCode}</td>
                                    <td><img className="list-img" src={item.Img}/></td>
                                    <td>{item.UnitPrice}</td>
                                    <td>{item.Qty}</td>
                                    <td>{item.TotalPrice}</td>
                                    <td>
                                        <button onClick={UpdateItem.bind(this,item._id)} className="btn btn-secondary ripple-surface"><TfiEraser/></button>
                                        <button onClick={DeleteItem.bind(this,item._id)}className="btn btn-danger" ><TfiTrash/></button>
                                    </td>
                                </tr>
                            )
                        })
                    }


                    </tbody>
                </table>
            </div>
        );
    }

};

export default ListTable;