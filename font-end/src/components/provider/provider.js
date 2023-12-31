import {createContext, useEffect, useState} from "react";
import Staffservice from "../services/staffservice";
import geographyservice from "../services/geographyservice";
import staffservice from "../services/staffservice";
const Context=createContext();
const Provider=({children})=> {

    // UploadImg
    const uploadImage = (formData) => {
        Staffservice.uploadImage(formData)
    }


    //OnBlurName
    const handleOnBlurName = (input, error) => {
        if (input === '') {
            error[0].style.display = 'block'
            error[0].innerHTML = 'Chưa Điền Tên Nhân Viên!'
        } else {
            error[0].style.display = 'none'
        }
    }

    //OnBlurCCCD
    const handleOnBlurCCCD = (input, error) => {
        if (input === '') {
            error[1].style.display = 'block'
            error[1].innerHTML = 'Chưa điền cccd!'
        } else {
            if (input.length !== 12 || !/^[0-9]+$/.test(input)) {
                error[1].style.display = 'block'
                error[1].innerHTML = 'Không đúng định dạng cccd!'
            } else {
                staffservice.findAllTotalPage(input,'','','').then(res=>{
                    if(res.data>=1){
                        error[1].style.display = 'block'
                        error[1].innerHTML = 'CCCD này đã tồn tại!'
                    }else{
                        error[1].style.display = 'none'
                    }
                }).catch(e=>{
                    console.log(e)
                })
            }
        }
    }

    const handleOnBlurEmail = (input, error) => {
        if (input === '') {
            error[2].style.display = 'block'
            error[2].innerHTML = 'Chưa điền email!'
        } else {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
                error[2].style.display = 'block'
                error[2].innerHTML = 'Không đúng định dạng email!'
            } else {
                error[2].style.display = 'none'
            }
        }
    }
    const handleOnBlurNgaySinh = (input, error) => {
        if (input === '') {
            error[6].style.display = 'block'
            error[6].innerHTML = 'Chưa chọn ngày sinh!'
        } else {
            error[6].style.display = 'none'
        }
    }

    const handleOnBlurSdt = (input, error) => {
        if (input === '') {
            error[7].style.display = 'block'
            error[7].innerHTML = 'Chưa điền sđt!'
        } else {
            if (input.length !== 10 || !/^[0-9]+$/.test(input)) {
                error[7].style.display = 'block'
                error[7].innerHTML = 'Không đúng định dạng sđt!'
            }else{
                error[7].style.display = 'none'
            }
        }
    }

    const handleOnBlurThanhPho=(input, error)=>{
        if (input === '') {
            error[3].style.display = 'block'
            error[3].innerHTML = 'Chưa chọn thành phố!'
        }else{
            error[3].style.display = 'none'
        }
    }

    const handleOnBlurQuanHuyen=(input, error)=>{
        if (input === '') {
            error[8].style.display = 'block'
            error[8].innerHTML = 'Chưa chọn quận huyện!'
        }else{
            error[8].style.display = 'none'
        }
    }

    const handleOnBlurXaPhuong=(input, error)=>{
        if (input === '') {
            error[4].style.display = 'block'
            error[4].innerHTML = 'Chưa chọn xã phường!'
        }else{
            error[4].style.display = 'none'
        }
    }

    const handleOnBlurAddress=(input, error)=>{
        if (input === '') {
            error[9].style.display = 'block'
            error[9].innerHTML = 'Chưa điền địa chỉ chi tiết!'
        }else{
            error[9].style.display = 'none'
        }
    }

    const handleOnBlurTrangThai=(input, error)=>{
        if (input === '') {
            error[5].style.display = 'block'
            error[5].innerHTML = 'Chưa chọn trạng thái!'
        }else{
            error[5].style.display = 'none'
        }
    }


    const StaffValidation = (name, cccd, email, ngaySinh, sdt, thanhpho, quanHuyen, xaPhuong, address, trangThai, error) => {
            let count = 0;
            if (name === '') {
                error[0].style.display = 'block'
                error[0].innerHTML = 'Chưa điền tên nhân viên!'
                count++;
            } else {
                error[0].style.display = 'none'
                if (cccd === '') {
                    error[1].style.display = 'block'
                    error[1].innerHTML = 'Chưa điền cccd!'
                    count++;
                } else {
                    if (cccd.length !== 12 || !/^[0-9]+$/.test(cccd)) {
                        error[1].style.display = 'block'
                        error[1].innerHTML = 'Không đúng định dạng cccd!'
                        count++;
                    } else {
                        error[1].style.display = 'none'
                        if (email === '') {
                            error[2].style.display = 'block'
                            error[2].innerHTML = 'Chưa điền email!'
                            count++;
                        } else {
                            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                                error[2].style.display = 'block'
                                error[2].innerHTML = 'Không đúng định dạng email!'
                                count++;
                            } else {
                                error[2].style.display = 'none';
                                if (ngaySinh === '') {
                                    error[6].style.display = 'block'
                                    error[6].innerHTML = 'Chưa chọn ngày sinh!'
                                    count++;
                                } else {
                                    error[6].style.display = 'none'
                                    if (sdt === '') {
                                        error[7].style.display = 'block'
                                        error[7].innerHTML = 'Chưa điền sđt!'
                                        count++;
                                    } else {
                                        if (sdt.length !== 10 || !/^[0-9]+$/.test(sdt)) {
                                            error[7].style.display = 'block'
                                            error[7].innerHTML = 'Không đúng định dạng sđt!'
                                            count++;
                                        } else {
                                            error[7].style.display = 'none'
                                            if (thanhpho === '') {
                                                error[3].style.display = 'block'
                                                error[3].innerHTML = 'Chưa chọn thành phố!'
                                                count++;
                                            } else {
                                                error[3].style.display = 'none'
                                                if (quanHuyen === '') {
                                                    error[8].style.display = 'block'
                                                    error[8].innerHTML = 'Chưa chọn quận huyện!'
                                                    count++;
                                                } else {
                                                    error[8].style.display = 'none'
                                                    if (xaPhuong === '') {
                                                        error[4].style.display = 'block'
                                                        error[4].innerHTML = 'Chưa chọn xã phường!'
                                                        count++;
                                                    } else {
                                                        error[4].style.display = 'none'
                                                        if (address === '') {
                                                            error[9].style.display = 'block'
                                                            error[9].innerHTML = 'Chưa điền địa chỉ chi tiết!'
                                                            count++;
                                                        } else {
                                                            error[9].style.display = 'none'
                                                            if (trangThai === '') {
                                                                error[5].style.display = 'block'
                                                                error[5].innerHTML = 'Chưa chọn trạng thái!'
                                                                count++;
                                                            } else {
                                                                error[5].style.display = 'none'
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return count;
        }

        const showToastMessage=(message)=>{
            //toast content
            let toastContent=document.createElement("div")
            toastContent.classList.add('toast-body')
            toastContent.innerHTML= `
                                <i class="fa-solid fa-circle-check"></i>
                                <span class="message">${message}</span>
                                <span class="countdown"></span>`

            //toast container
            let toastContainer=document.getElementsByClassName('toast-container')[0]
            toastContainer.appendChild(toastContent)
            setTimeout(()=>{
                toastContent.style.animation='endd ease-in-out 1.5s forwards'
            },3000)

            setTimeout(()=>{
                toastContent.remove()
            },6000)
        }




        const value = {
            uploadImage, handleOnBlurName, handleOnBlurCCCD, StaffValidation,handleOnBlurEmail,handleOnBlurNgaySinh,handleOnBlurSdt,handleOnBlurThanhPho,handleOnBlurQuanHuyen,
            handleOnBlurXaPhuong,handleOnBlurAddress,handleOnBlurTrangThai,showToastMessage
        }
        return (
            <Context.Provider value={value}>
                {children}
            </Context.Provider>
        )
}

export {Context,Provider};