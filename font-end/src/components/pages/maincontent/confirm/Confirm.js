import './confirm.css'
import {useState} from "react";

const Confirm=(props)=>{
    const handleConfirm= async ()=>{
        if(props.addOrUpdate===false){
            await props.handleUpdateStaff(true)
            await handleClose();
        }else{
            await props.handleAddStaff(true)
            await handleClose();
        }
    }

    const handleClose=async ()=>{
        const confirmContainer=document.querySelector('.confirm-container');
        const confirm=document.querySelector('.confirm');
        confirm.style.animation='close 0.4s ease-in-out'
        setTimeout(()=>{
            props.handleCloseConfirm(false)
            confirmContainer.style.display='none';
        },400)
    }

    return(
        <>
            <div className="confirm-container fixed bottom-0 left-0 right-0 top-0 z-10 bg-[rgba(0,0,0,0.6)]">
                <div className="confirm fixed top-[20%] right-[37%] h-full">
                    <div className="bg-[#fff] rounded-[5px]">
                        <div className="px-[70px] py-[30px] text-center">
                            <div className="mt-[20px]">
                                <i className="icon fa-solid fa-exclamation text-[#f3e1d4] px-[40px] py-[25px] border-[3px] border-[#f3e1d4] rounded-[50%] leading-none text-[40px]"></i>
                            </div>
                            <div className="mt-[25px]">
                                <p className="text-[30px] font-[600] text-[#505050]">{props.message}</p>
                            </div>
                            <div className="text-[#fff] mt-[20px]">
                                <button onClick={handleConfirm} className="py-[7px] px-[10px] bg-primary-orange rounded-[5px] outline-none hover:opacity-[0.7] ease-in-out duration-[0.2s]">Xác nhận</button>
                                <button onClick={handleClose} className="py-[7px] px-[15px] bg-primary-red rounded-[5px] ml-[10px] outline-none hover:opacity-[0.7] ease-in-out duration-[0.2s]">Hủy</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Confirm