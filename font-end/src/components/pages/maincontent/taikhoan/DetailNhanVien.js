import {useContext, useEffect, useLayoutEffect, useState} from "react";
import {Context} from "../../../provider/provider";
import staffservice from "../../../services/staffservice";
import {useNavigate, useParams} from "react-router-dom";

const DetailNhanVien = () => {
    const value=useContext(Context)
    const nav=useNavigate();
    const [staff,setStaff]=useState({})
    const {id}=useParams()


    useLayoutEffect(() => {
        staffservice.getStaffById(id).then(res=>{
            const staff=res.data;
            setStaff(staff);
            let nam=document.querySelector(`input[name="gender"][value="true"]`)
            let nu=document.querySelector(`input[name="gender"][value="false"]`)
            if(staff.gender===true){
                nam.checked=true;
            }else{
                nu.checked=true;
            }
        })
    },[]);

    return (
        <>
            <div className="p-[10px]">
                <div className="text-center py-[25px]">
                    <h1 className="uppercase font-bold text-[22px]">Chi tiết nhân viên</h1>
                </div>
                <div className="flex w-full">
                    <div className="w-3/12 bg-[#fff] rounded-[5px] flex justify-center">
                        <div>
                            <h1 className="text-center font-[600] text-[20px] my-[50px]">Ảnh đại diện</h1>
                            <div
                                className="border-[1px] border-[#999] w-[300px] h-[300px] rounded-[50%] flex items-center justify-center ">
                                <img src={"http://localhost:8080/staff/img/"+staff.image} className="my-image w-full h-full rounded-[50%] object-cover"/>
                                <button className="my-button hidden">Chọn Ảnh</button>
                                <input type="file" className="myimg hidden" accept="image/*"/>
                            </div>
                        </div>
                    </div>
                    <div className="w-9/12 bg-[#fff] rounded-[5px] mx-[20px]">
                        <div className="text-center">
                            <h1 className="font-[700] text-[22px]">Thông tin nhân viên</h1>
                        </div>
                        <div className="grid grid-cols-2 text-[14px] px-[50px] pb-[50px]">
                            <div className="px-[25px]">
                                <div className="mb-[20px]">
                                    <div className="flex">
                                        <p className="mb-[7px]"><span className="text-primary-red">*</span> Tên nhân
                                            viên
                                        </p>
                                        <p className="error text-primary-red hidden ml-[5px]"></p>
                                    </div>
                                    <input
                                        className="w-[400px] h-[30px] border-[1px] border-[#999] rounded-[5px] focus:outline-none pl-[10px]"
                                        type="text" value={staff.name} placeholder="Tên nhân viên"/>
                                </div>
                                <div className="mb-[20px]">
                                    <div className="flex">
                                        <p className="mb-[7px]"><span className="text-primary-red">*</span> Căn cước công dân
                                        </p>
                                        <p className="error text-primary-red ml-[5px]"></p>
                                    </div>
                                    <input
                                        className="w-[400px] h-[30px] border-[1px] border-[#999] rounded-[5px] focus:outline-none pl-[10px]"
                                        type="text" value={staff.cccd} placeholder="CCCD" />
                                </div>
                                <div className="mb-[20px]">
                                    <div className="flex">
                                        <p className="mb-[7px]"><span className="text-primary-red">*</span> Email</p>
                                        <p className="error text-primary-red ml-[5px] hidden"></p>
                                    </div>
                                    <input
                                        className="w-[400px] h-[30px] border-[1px] border-[#999] rounded-[5px] focus:outline-none pl-[10px]"
                                        type="email" value={staff.email} placeholder="Email"/>
                                </div>
                                <div className="mb-[20px]">
                                    <div className="flex">
                                        <p className="mb-[7px]"><span className="text-primary-red">*</span> Tỉnh/Thành
                                            phố
                                        </p>
                                        <p
                                            className="error text-primary-red ml-[5px]"></p>
                                    </div>
                                    <select className="city w-[400px] h-[30px] border-[1px] border-[#999] rounded-[5px] focus:outline-none pl-[10px]">
                                        <option value="">{staff.thanhPho}</option>
                                    </select>
                                </div>

                                <div className="mb-[20px]">
                                    <div className="flex">
                                        <p className="mb-[7px]"><span className="text-primary-red">*</span> Xã/Phường
                                        </p>
                                        <p className="error text-primary-red ml-[5px]"></p>
                                    </div>
                                    <select className="w-[400px] h-[30px] border-[1px] border-[#999] rounded-[5px] focus:outline-none pl-[10px]">
                                        <option value="">{staff.phuongXa}</option>
                                    </select>
                                </div>

                                <div className="mb-[20px]">
                                    <div className="flex">
                                        <p className="mb-[7px]"><span className="text-primary-red">*</span> Trạng thái
                                        </p>
                                        <p className="error text-primary-red ml-[5px]"></p>
                                    </div>
                                    <select className="status w-[400px] h-[30px] border-[1px] border-[#999] rounded-[5px] focus:outline-none pl-[10px]">
                                        <option value="">{staff.status ? "Đang Làm" : "Ngưng Làm"}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="px-[25px]">
                                {/*Ngày Sinh*/}
                                <div className="mb-[20px]">
                                    <div className="flex">
                                        <p className="mb-[7px]"><span className="text-primary-red">*</span> Ngày sinh
                                        </p>
                                        <p className="error text-primary-red ml-[5px]"></p>
                                    </div>
                                    <input
                                        className="w-[400px] h-[30px] border-[1px] border-[#999] rounded-[5px] focus:outline-none pl-[10px]"
                                        type="date" value={staff.birthDay}/>
                                </div>
                                {/*Giới Tính*/}
                                <div className="mb-[20px]">
                                    <p className="mb-[7px]"><span className="text-primary-red">*</span> Giới Tính
                                    </p>
                                    <div className="flex">
                                        <div>
                                            <input type="radio" name="gender" value="true" />
                                            <span className="ml-[5px]">Nam</span>
                                        </div>
                                        <div className="ml-[10px]">
                                            <input type="radio" name="gender" value="false"/>
                                            <span className="ml-[5px]" >Nữ</span>
                                        </div>
                                    </div>
                                </div>
                                {/*Phone*/}
                                <div className="mb-[20px]">
                                    <div className="flex">
                                        <p className="mb-[7px]"><span className="text-primary-red">*</span> Số điện
                                            thoại
                                        </p>
                                        <p className="error text-primary-red ml-[5px]"></p>
                                    </div>
                                    <input
                                        className="w-[400px] h-[30px] border-[1px] border-[#999] rounded-[5px] focus:outline-none pl-[10px]"
                                        type="text" value={staff.phone} placeholder="Số điện thoại"/>
                                </div>
                                {/*Quan huyen*/}
                                <div className="mb-[20px]">
                                    <div className="flex">
                                        <p className="mb-[7px]"><span className="text-primary-red">*</span> Quận/Huyện
                                        </p>
                                        <p className="error text-primary-red ml-[5px]"></p>
                                    </div>
                                    <select className="district w-[400px] h-[30px] border-[1px] border-[#999] rounded-[5px] focus:outline-none pl-[10px]">
                                        <option value="">{staff.quanHuyen}</option>
                                    </select>
                                </div>
                                {/*So Nha Ngo Duong*/}
                                <div className="mb-[20px]">
                                    <div className="flex">
                                        <p className="mb-[7px]"><span className="text-primary-red">*</span> Số
                                            nhà/Ngõ/Đường
                                        </p>
                                        <p className="error text-primary-red ml-[5px]"></p>
                                    </div>
                                    <input
                                        className="w-[400px] h-[30px] border-[1px] border-[#999] rounded-[5px] focus:outline-none pl-[10px]"
                                        type="text" value={staff.address} placeholder="Số nhà/Ngõ/Đường"/>
                                </div>
                                <div className="float-end mr-[76px] mt-[100px]">
                                    <button
                                        className="bg-primary-red py-[8px] px-[30px] border-[1px] text-[#fff] rounded-[5px] ml-[10px] hover:opacity-[0.8] ease-in-out duration-[0.3s]"
                                        onClick={()=>{nav("/nhanvien-management")}}>Hủy
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailNhanVien