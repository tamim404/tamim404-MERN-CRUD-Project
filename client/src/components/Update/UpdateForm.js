import React, {Fragment, useEffect, useRef} from 'react';
import isEmpty from "validator/es/lib/isEmpty";
import {ErrorToast, SuccessToast} from "../../helper/ValidationHelper";
import {ReadById, Update} from "../../APIservices/CRUDservice";
import FullScreenLoader from "../Common/FullScreenLoader";
import {useNavigate} from "react-router-dom";


const UpdateForm = (props) => {


    const navigate = useNavigate();

    useEffect( ()=>{
        Loader.classList.remove("d-none")
        console.log(props.id)
        ReadById(props.id).then((result)=>{
            ProductName.value=result?.data[0].ProductName
            ProductCode.value=result?.data[0].ProductCode
            Img.value=result?.data[0].Img
            UnitPrice.value=result?.data[0].UnitPrice
            Qty.value=result?.data[0].Qty
            TotalPrice.value=result?.data[0].TotalPrice
            Loader.classList.add("d-none")


        }).catch(err => {
            console.log(err)
        });
    },[])



    let ProductName,ProductCode,Img,UnitPrice,Qty,TotalPrice,Loader=useRef();

    let UpdateData=()=>{
        let Product_Name=ProductName.value;
        let Product_Code=ProductCode.value;
        let Product_Img=Img.value;
        let Unit_Price=UnitPrice.value;
        let Product_Qty=Qty.value;
        let Total_Price=TotalPrice.value;

        if (isEmpty(Product_Name)){
            ErrorToast("Product Name Required")
        }else if (isEmpty(Product_Code)){
            ErrorToast("Product Code Required")
        }else if (isEmpty(Product_Img)){
            ErrorToast("Product Image Required")
        }else if (isEmpty(Unit_Price)){
            ErrorToast("Product Price Required")
        }else if (isEmpty(Product_Qty)){
            ErrorToast("Product Qty Required")
        }else if (isEmpty(Total_Price)){
            ErrorToast("Total Price Required")
        }else{
            Loader.classList.remove("d-none")
            Update(props.id,Product_Name,Product_Code,Product_Img,Unit_Price,Product_Qty,Total_Price).then((Result)=>{
                if (Result===true){
                    SuccessToast("Update Success")

                    return(
                        navigate("/")
                    )

                }else {
                    ErrorToast("Fail Try Again")
                }
            })
        }
    }



    return (
        <Fragment>
            <div className="container border-black bg-white rounded-4 bg-fixed shadow-demo shadow-4 mx-auto">
                <h2 className="pt-4 pb-3 text-center text-secondary">UPDATE PRODUCT</h2>
                <div className="row ">

                    <div className="col-md-4 p-2">
                        <label>Product Name</label>
                        <input ref={(input)=>ProductName=input} type="text" className="form-control"/>
                    </div>

                    <div className="col-md-4 p-2">
                        <label>Product Code</label>
                        <input ref={(input)=>ProductCode=input} type="text" className="form-control"/>
                    </div>

                    <div className="col-md-4 p-2">
                        <label>Image</label>
                        <input ref={(input)=>Img=input} type="text" className="form-control"/>
                    </div>

                    <div className="col-md-4 p-2">
                        <label>Unit Price</label>
                        <input ref={(input)=>UnitPrice=input} type="text" className="form-control"/>
                    </div>

                    <div className="col-md-4 p-2">
                        <label>Qty</label>
                        <input ref={(input)=>Qty=input} type="text" className="form-control"/>
                    </div>

                    <div className="col-md-4 p-2">
                        <label>Total Price</label>
                        <input ref={(input)=>TotalPrice=input} type="text" className="form-control"/>
                    </div>

                </div>

                <div className="row w-100 pb-3 pt-4">
                    <div className="col-md-6 p-3 m-auto">
                        <button onClick={UpdateData} className="btn btn-secondary w-100">Update</button>
                    </div>

                </div>


            </div>

            <div className="d-none" ref={(div)=>Loader=div}>
                <FullScreenLoader/>
            </div>
        </Fragment>

    );

};

export default UpdateForm;