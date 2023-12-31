import './QRScan.css'
import {QrReader} from 'react-qr-reader';
import {useState} from "react";
const QRScan=(props)=>{


    const handleError=(e)=>{
        console.log(e)
    }
    const handleResult=(data)=>{
        try {
            if(data){
                props.getDataQR(data.text)
                handleClose()
            }
        }catch (e){
            console.log(e)
        }
    }
    const handleClose=()=>{
        const container=document.querySelector('.qrcode-container')
        const qrcode=document.querySelector('.qrcode')
        qrcode.style.animation='close 0.5s ease-in-out'
        setTimeout(()=>{
            container.style.display='none'
            props.handleCloseScanQRCode()
        },400)
    }

    return(
        <>
            <div className="qrcode-container fixed top-0 bottom-0 left-0 right-0">
                <div className="h-full flex justify-center items-center bg-[rgba(0,0,0,0.4)]">
                      <div className="qrcode bg-[#fff] w-[400px] h-[450px] rounded-[5px]">
                          <div className="px-[20px] pb-[20px] pt-[10px] h-full w-full">
                              <div className="flex justify-between">
                                  <div></div>
                                  <div onClick={handleClose} className="cursor-pointer"><i className="fa-solid fa-xmark text-[23px] text-[#444]"></i></div>
                              </div>
                              <div className="h-[85%] w-full">
                                  <QrReader
                                      delay={300}
                                      onError={handleError}
                                      onResult={handleResult}
                                      legacyMode
                                  />
                              </div>
                              <div className="h-[15%] flex justify-between items-center">
                                  <div></div>
                                  <div>
                                  <button onClick={handleClose} className="px-[20px] py-[7px] bg-primary-red text-[#fff] rounded-[5px]">Hủy</button>
                                  </div>
                              </div>
                          </div>
                      </div>
                </div>
            </div>
        </>
    )
}

export default QRScan