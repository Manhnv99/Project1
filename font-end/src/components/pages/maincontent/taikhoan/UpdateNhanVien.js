import {useContext, useEffect, useLayoutEffect, useState} from "react";
import {Context} from "../../../provider/provider";
import staffservice from "../../../services/staffservice";
import geographyservice from "../../../services/geographyservice";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../loading/loading";
import Confirm from "../confirm/Confirm";
import QRScan from "../../../utils/QRScan/QRScan";


const UpdateNhanVien = () => {
    const value=useContext(Context)
    const nav=useNavigate();
    const [file,setFile]=useState(null);
    const [error,setError]=useState({});
    const [name,setName]=useState('');
    const [cccd,setCCCD]=useState('');
    const [email,setEmail]=useState('');
    const [sdt,setSDT]=useState('');
    const [thanhpho,setThanhPho]=useState('')
    const [quanHuyen,setQuanHuyen]=useState('');
    const [xaPhuong,setXaPhuong]=useState('');
    const [address,setAddress]=useState('')
    const [ngaySinh,setNgaySinh]=useState('');
    const [trangThai,setTrangThai]=useState('')
    const [gender,setGender]=useState(true);
    const [listCity,setListCity]=useState([])
    const [listDistrict,setListDistrict]=useState([])
    const [listWard,setListWard]=useState([])
    const [loading,setLoading]=useState(false)
    const [viewConfirm,setViewConfirm]=useState(false)
    const [addOrUpdate,setAddOrUpdate]=useState(false)
    const [showQRCode,setShowQRCode]=useState(false)
    const [img,setImg]=useState(null)
    const {id}=useParams()


    useLayoutEffect(() => {
        const callAPI= async ()=>{
            await geographyservice.callAPICity().then(res=>{
                setListCity(res.data)
            }).catch(e=>{
                console.log(e)
            })
        }
        let error=document.querySelectorAll('.error')
        setError(error)
        staffservice.getStaffById(id).then(res=>{
            const staff=res.data;
            setName(staff.name)
            setCCCD(staff.cccd)
            setEmail(staff.email)
            setNgaySinh(staff.birthDay)
            setSDT(staff.phone)
            setThanhPho(staff.thanhPho)
            setQuanHuyen(staff.quanHuyen)
            setXaPhuong(staff.phuongXa)
            setTrangThai(staff.status)
            setAddress(staff.address)
            setGender(staff.gender)
            const file = new File([Blob],staff.image, { type: 'image/jpeg' });
            setFile(file)
            setImg(staff.image)
            let nam=document.querySelector(`input[name="gender"][value="true"]`)
            let nu=document.querySelector(`input[name="gender"][value="false"]`)
            if(staff.gender===true){
                nam.checked=true;
            }else{
                nu.checked=true;
            }
            let trangthai=document.querySelectorAll(".status option")
            let status='';
            if(staff.status==true){
                status='Đang Làm'
            }else{
                status='Ngưng Làm'
            }
            for(let i=0;i<trangthai.length;i++){
                if(status===trangthai[i].textContent){
                    trangthai[i].selected=true
                }
            }
        })
        callAPI();
    },[]);

    // Chọn City
    const handleChangeCity=(e)=>{
        if(e.target.value===""){
            setThanhPho("")
        }else{
            let cityChoose=listCity[e.target.value]
            setThanhPho(cityChoose.name)
            setListDistrict(cityChoose.districts)
        }
    }
    // Chọn quận huyện
    const handleChangeDistrict=(e)=>{
        if(e.target.value===""){
            setQuanHuyen("")
        }else{
            let districtChoose=listDistrict[e.target.value]
            setQuanHuyen(districtChoose.name)
            setListWard(districtChoose.wards)
        }
    }


    //chọn ảnh
    const handleChoseImg=()=>{
        const img=document.querySelector(".myimg")
        img.click();
    }
    const handleFileChange=(event)=>{
        setFile(event.target.files[0]);
        showImage(event.target.files[0]);
    }

    const showImage=(file)=>{
        const img=document.querySelector(".my-image")
        const button=document.querySelector(".my-button")
        let FileType;
        if(file){
            FileType=file.type;
        }
        const validExtentions=['image/jpeg','image/jpg',"image/png","img/webp"];
        if(validExtentions.includes(FileType)){
            const fileReader=new FileReader();
            fileReader.onload=()=>{
                const fileURL=fileReader.result;
                button.style.display="none"
                img.style.display="block"
                img.src=fileURL
            }
            fileReader.readAsDataURL(file)
        }
    }

    const handleUpdateStaff= (confirm)=>{
        if(file===null){
            alert('Bạn Chưa Chọn Ảnh')
        }else{
            if(value.StaffValidation(name,cccd,email,ngaySinh,sdt,thanhpho,quanHuyen,xaPhuong,address,trangThai,error)===0){
                setViewConfirm(true)
                if(confirm===true){
                    setLoading(true);
                    setTimeout(async ()=>{
                        const staffRequest={
                            code:'NV001',
                            name:name,
                            gender:gender,
                            birthDay:ngaySinh,
                            phone:sdt,
                            email:email,
                            cccd:cccd,
                            role:false,
                            status:trangThai === "true" ? true : false,
                            password:'123',
                            image:file.name,
                            address:address,
                            thanhPho:thanhpho,
                            quanHuyen:quanHuyen,
                            phuongXa:xaPhuong
                        }
                        await staffservice.updateStaff(id,staffRequest)
                        try {
                            const formData=new FormData();
                            formData.append('file',file)
                            await value.uploadImage(formData)
                        }catch (error){
                            console.error('Error uploading file:', error);
                        }
                        setLoading(false)
                        await nav("/nhanvien-management")
                        await value.showToastMessage("Cập Nhật Nhân Viên Thành Công!")
                    },1500)
                }
            }
        }
    };

    const handleOnBlurName=(e)=>{
        const error=document.querySelectorAll('.error')
        value.handleOnBlurName(e.target.value,error)
    }
    const handleOnBlurCCCD=(e)=>{
        const error=document.querySelectorAll('.error')
        value.handleOnBlurCCCD(e.target.value,error)
    }
    const handleOnBlurEmail=(e)=>{
        const error=document.querySelectorAll('.error')
        value.handleOnBlurEmail(e.target.value,error)
    }

    const handleOnBlurSDT=(e)=>{
        const error=document.querySelectorAll('.error')
        value.handleOnBlurSdt(e.target.value,error)
    }
    const handleOnBlurAddress=(e)=>{
        const error=document.querySelectorAll('.error')
        value.handleOnBlurAddress(e.target.value,error)
    }

    const handleOnBlurBirthday=(e)=>{
        const error=document.querySelectorAll('.error')
        value.handleOnBlurNgaySinh(e.target.value,error)
    }

    const handleOnBlurThanhPho=(e)=>{
        const error=document.querySelectorAll('.error')
        value.handleOnBlurThanhPho(e.target.value,error)
    }

    const handleOnBlurQuanHuyen=(e)=>{
        const error=document.querySelectorAll('.error')
        value.handleOnBlurQuanHuyen(e.target.value,error)
    }

    const handleOnBlurXaPhuong=(e)=>{
        const error=document.querySelectorAll('.error')
        value.handleOnBlurXaPhuong(e.target.value,error)
    }

    const handleOnBlurTrangThai=(e)=>{
        const error=document.querySelectorAll('.error')
        value.handleOnBlurTrangThai(e.target.value,error)
    }

    const handleCloseConfirm=(status)=>{
        setViewConfirm(status)
    }

    const handleShowScanQRCode=()=>{
        setShowQRCode(true)
    }

    const handleCloseScanQRCode=()=>{
        setShowQRCode(false)
    }


    const getDataQR=(data)=>{
        const result=data.split("|");
        setCCCD(result[0])
        setName(result[2])
        const nam=document.querySelector('input[name="gender"][value="true"]')
        const nu=document.querySelector('input[name="gender"][value="false"]')
        if(result[4]==="Nam"){
            nam.checked=true
        }else {
            nu.checked = true
        }
        const date=result[3].slice(0,2)
        const month=result[3].slice(2,4)
        const year=result[3].slice(4)
        const myBirthDay=year+"-"+month+"-"+date
        setNgaySinh(myBirthDay)
    }



    return (
        <>
            {showQRCode && <QRScan handleCloseScanQRCode={handleCloseScanQRCode} getDataQR={getDataQR}/>}
            {viewConfirm && <Confirm message={"Xác Nhận Cập Nhật Nhân Viên?"} addOrUpdate={addOrUpdate}  handleUpdateStaff={handleUpdateStaff} handleCloseConfirm={handleCloseConfirm}/>}
            {loading && <Loading/>}
            <div className="p-[10px]">
                <div className="text-center py-[25px]">
                    <h1 className="uppercase font-bold text-[22px]">Cập nhật nhân viên</h1>
                </div>
                <div className="flex w-full">
                    <div className="w-3/12 bg-[#fff] rounded-[5px] flex justify-center">
                        <div className="w-full">
                            <h1 className="text-center font-[600] text-[20px] my-[50px]">Ảnh đại diện</h1>
                            <div className="flex justify-center">
                                <div
                                    className="border-[1px] border-[#999] w-[80%] h-[250px] rounded-[50%] flex items-center justify-center cursor-pointer"
                                    onClick={handleChoseImg}>
                                    <img src={"http://localhost:8080/staff/img/"+img} className="my-image w-full h-full rounded-[50%] object-cover"/>
                                    <button className="my-button hidden">Chọn Ảnh</button>
                                    <input type="file" className="myimg hidden" accept="image/*"
                                           onChange={handleFileChange}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-9/12 bg-[#fff] rounded-[5px] mx-[20px]">
                        <div className="text-center my-[20px]">
                            <h1 className="font-[700] text-[22px]">Thông tin nhân viên</h1>
                        </div>
                        {/*Quét QR*/}
                        <div className="my-[20px] flex justify-between mr-[50px]">
                            <div></div>
                            <button onClick={handleShowScanQRCode}
                                className="py-[8px] px-[22px] bg-[#1b90d3] text-[#fff] rounded-[5px] hover:opacity-[0.8] ease-in-out duration-[0.3s]">
                                <i className="fa-solid fa-qrcode mr-[7px]"></i>
                                Quét QR
                            </button>
                        </div>
                        <div className="grid grid-cols-2 text-[14px] px-[50px] pb-[50px]">
                            <div className="">
                                <div className="mb-[20px]">
                                    <div className="flex">
                                        <p className="mb-[7px]"><span className="text-primary-red">*</span> Tên nhân
                                            viên
                                        </p>
                                        <p className="error text-primary-red hidden ml-[5px]"></p>
                                    </div>
                                    <input
                                        className="w-[90%] h-[30px] border-[1px] border-[#999] rounded-[5px] focus:outline-none pl-[10px]"
                                        type="text" value={name} placeholder="Tên nhân viên" onBlur={handleOnBlurName}
                                        onChange={(e) => {
                                            setName(e.target.value)
                                        }}/>
                                </div>
                                <div className="mb-[20px]">
                                    <div className="flex">
                                        <p className="mb-[7px]"><span className="text-primary-red">*</span> Căn cước
                                            công dân
                                        </p>
                                        <p className="error text-primary-red ml-[5px]"></p>
                                    </div>
                                    <input
                                        className="w-[90%] h-[30px] border-[1px] border-[#999] rounded-[5px] focus:outline-none pl-[10px]"
                                        type="text" value={cccd} placeholder="CCCD" onBlur={handleOnBlurCCCD}
                                        onChange={(e) => {
                                            setCCCD(e.target.value)
                                        }}/>
                                </div>
                                <div className="mb-[20px]">
                                    <div className="flex">
                                        <p className="mb-[7px]"><span className="text-primary-red">*</span> Email</p>
                                        <p className="error text-primary-red ml-[5px] hidden"></p>
                                    </div>
                                    <input
                                        className="w-[90%] h-[30px] border-[1px] border-[#999] rounded-[5px] focus:outline-none pl-[10px]"
                                        type="email" value={email} placeholder="Email" onBlur={handleOnBlurEmail}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}/>
                                </div>
                                <div className="mb-[20px]">
                                    <div className="flex">
                                        <p className="mb-[7px]"><span className="text-primary-red">*</span> Tỉnh/Thành
                                            phố
                                        </p>
                                        <p
                                            className="error text-primary-red ml-[5px]"></p>
                                    </div>
                                    <select onChange={(e) => {
                                        handleChangeCity(e)
                                    }} onBlur={(e) => {
                                        handleOnBlurThanhPho(e)
                                    }}
                                            className="city w-[90%] h-[30px] border-[1px] border-[#999] rounded-[5px] focus:outline-none pl-[10px]">
                                        <option value="">--Chọn Tỉnh/Thành Phố--</option>
                                        {listCity.map((item, index) => {
                                            return (
                                                <>
                                                    <option key={index} value={index}>{item.name}</option>
                                                </>
                                            )
                                        })}
                                    </select>
                                </div>

                                <div className="mb-[20px]">
                                    <div className="flex">
                                        <p className="mb-[7px]"><span className="text-primary-red">*</span> Xã/Phường
                                        </p>
                                        <p className="error text-primary-red ml-[5px]"></p>
                                    </div>
                                    <select onChange={(e) => {
                                        setXaPhuong(e.target.value)
                                    }} onBlur={(e) => {
                                        handleOnBlurXaPhuong(e)
                                    }}
                                            className="w-[90%] h-[30px] border-[1px] border-[#999] rounded-[5px] focus:outline-none pl-[10px]">
                                        <option value="">--Chọn Xã/Phường--</option>
                                        {listWard.map((item, index) => {
                                            return (
                                                <>
                                                    <option key={index}>{item.name}</option>
                                                </>
                                            )
                                        })}
                                    </select>
                                </div>

                                <div className="mb-[20px]">
                                    <div className="flex">
                                        <p className="mb-[7px]"><span className="text-primary-red">*</span> Trạng thái
                                        </p>
                                        <p className="error text-primary-red ml-[5px]"></p>
                                    </div>
                                    <select onChange={(e) => {
                                        setTrangThai(e.target.value)
                                    }} onBlur={(e) => {
                                        handleOnBlurTrangThai(e)
                                    }}
                                            className="status w-[90%] h-[30px] border-[1px] border-[#999] rounded-[5px] focus:outline-none pl-[10px]">
                                        <option value="">--Chọn trạng thái--</option>
                                        <option value="true">Đang Làm</option>
                                        <option value="false">Ngưng Làm</option>
                                    </select>
                                </div>
                            </div>
                            <div className="ml-[10%]">
                                {/*Ngày Sinh*/}
                                <div className="mb-[20px]">
                                    <div className="flex">
                                        <p className="mb-[7px]"><span className="text-primary-red">*</span> Ngày sinh
                                        </p>
                                        <p className="error text-primary-red ml-[5px]"></p>
                                    </div>
                                    <input
                                        className="w-full h-[30px] border-[1px] border-[#999] rounded-[5px] focus:outline-none pl-[10px]"
                                        type="date" value={ngaySinh} onChange={(e) => {
                                        setNgaySinh(e.target.value)
                                    }} onBlur={(e) => {
                                        handleOnBlurBirthday(e)
                                    }}/>
                                </div>
                                {/*Giới Tính*/}
                                <div className="mb-[20px]">
                                    <p className="mb-[7px]"><span className="text-primary-red">*</span> Giới Tính
                                    </p>
                                    <div className="flex">
                                        <div>
                                            <input type="radio" name="gender" value="true" onClick={(e) => {
                                                setGender(e.target.value)
                                            }}/>
                                            <span className="ml-[5px]">Nam</span>
                                        </div>
                                        <div className="ml-[10px]">
                                            <input type="radio" name="gender" value="false" onClick={(e) => {
                                                setGender(e.target.value)
                                            }}/>
                                            <span className="ml-[5px]">Nữ</span>
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
                                        className="w-full h-[30px] border-[1px] border-[#999] rounded-[5px] focus:outline-none pl-[10px]"
                                        type="text" value={sdt} placeholder="Số điện thoại" onBlur={handleOnBlurSDT}
                                        onChange={(e) => {
                                            setSDT(e.target.value)
                                        }}/>
                                </div>
                                {/*Quan huyen*/}
                                <div className="mb-[20px]">
                                    <div className="flex">
                                        <p className="mb-[7px]"><span className="text-primary-red">*</span> Quận/Huyện
                                        </p>
                                        <p className="error text-primary-red ml-[5px]"></p>
                                    </div>
                                    <select onChange={(e) => {
                                        handleChangeDistrict(e)
                                    }} onBlur={(e) => {
                                        handleOnBlurQuanHuyen(e)
                                    }}
                                            className="district w-full h-[30px] border-[1px] border-[#999] rounded-[5px] focus:outline-none pl-[10px]">
                                        <option value="">--Chọn Quận/Huyện--</option>
                                        {listDistrict.map((item, index) => {
                                            return (
                                                <>
                                                    <option key={index} value={index}>{item.name}</option>
                                                </>
                                            )
                                        })}
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
                                        className="w-full h-[30px] border-[1px] border-[#999] rounded-[5px] focus:outline-none pl-[10px]"
                                        type="text" value={address} placeholder="Số nhà/Ngõ/Đường"
                                        onBlur={handleOnBlurAddress} onChange={(e) => {
                                        setAddress(e.target.value)
                                    }}/>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between mr-[50px] mb-[50px]">
                            <div></div>
                            <div>
                                <button
                                    className="py-[8px] px-[30px] bg-[#0075ff] text-[#fff] rounded-[5px] hover:opacity-[0.8] ease-in-out duration-[0.3s]"
                                    onClick={handleUpdateStaff}>Cập Nhật
                                </button>
                                <button
                                    className="py-[8px] px-[30px] border-[1px] border-[#999] text-[#444] rounded-[5px] ml-[10px] hover:opacity-[0.8] ease-in-out duration-[0.3s]"
                                    onClick={() => {
                                        nav("/nhanvien-management")
                                    }}>Hủy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateNhanVien