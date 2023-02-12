import React, {Fragment,useRef} from 'react';
import isEmpty from "validator/es/lib/isEmpty";
import {ErrorToast, SuccessToast} from "../../helper/ValidationHelper";
import {Create} from "../../APIservices/CRUDservice";
import FullScreenLoader from "../Common/FullScreenLoader";
import { useNavigate } from "react-router-dom";;


const CreateForm = () => {
    const navigate = useNavigate();

    let ProductName,ProductCode,Img,UnitPrice,Qty,TotalPrice,Loader=useRef();

    let SaveData=()=>{
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
            Create(Product_Name,Product_Code,Product_Img,Unit_Price,Product_Qty,Total_Price).then((Result)=>{
                if (Result===true){
                    SuccessToast("Save Success")

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
        <div className="container border-black bg-white rounded-4 bg-fixed shadow-demo shadow-4 mx-auto ">
            <h2 className="pt-4 pb-3 text-center text-secondary">CREATE PRODUCT</h2>
            <div className="row">

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

            <div className="row w-100  pb-3 pt-4">
                <div className="col-md-6 p-3 m-auto">
                    <button onClick={SaveData} className="btn btn-secondary btn-rounded ripple-surface w-100">Save</button>
                </div>

            </div>

            
        </div>

        <div className="d-none" ref={(div)=>Loader=div}>
            <FullScreenLoader/>
        </div>
    </Fragment>

    );

};

export default CreateForm;