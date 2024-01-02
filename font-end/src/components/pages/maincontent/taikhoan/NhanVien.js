import {useNavigate} from "react-router-dom";
import {useEffect, useLayoutEffect, useState} from "react";
import staffservice from "../../../services/staffService";
import './taikhoan.css'



const NhanVien = () => {
    const nav = useNavigate();
    const [listStaff,setListStaff]=useState([])
    const [image,setImage]=useState("299603930_597608548759822_4268610447775225171_n.jpg")
    const [totalPage,setTotalPage]=useState([])
    const [currentPage,setCurrentPage]=useState(1)
    const [input,setInput]=useState('')
    const [status,setStatus]=useState('')
    const [ageFrom,setAgeFrom]=useState('')
    const [ageTo,setAgeTo]=useState('')
    const [whatAction,setWhatAction]=useState('')



    const openAddNhanVien = () => {
        nav("/add-nhanvien-management")
    }

    useEffect(()=>{
        movePage(1);
        let myArray=[];
        staffservice.totalPage().then(res=>{
            for(let i=1;i<=res.data;i++){
                myArray.push(i)
            }
            setTotalPage(myArray)
        }).catch(e=>{
            console.log(e)
        })
    },[])

    const movePage=(page)=>{
        if(whatAction==='find'){
            staffservice.findAllPaging(input,ageFrom,ageTo,status,page).then(res=>{
                setListStaff(res.data)
            }).catch(e=>{
                console.log(e)
            })
        }else{
            staffservice.getAllPaging(page).then(res=>{
                setListStaff(res.data)
            }).catch(e=>{
                console.log(e)
            })
        }
    }

    const movePageAniMation=(pageMove)=>{
        let page=document.querySelectorAll('.page')
        for(let i=0;i<page.length;i++){
            page[i].classList.remove('activePage')
        }
        for(let i=1;i<=page.length;i++){
            if(parseInt(pageMove)===i){
                page[i-1].classList.add('activePage')
            }
        }
    }

    const handleMovePage=(e)=>{
        let currentPage=e.target.textContent
        setCurrentPage(parseInt(currentPage))
        movePageAniMation(currentPage)
        movePage(currentPage)
    }

    const handleMovePrePage=()=>{
        let page=document.querySelectorAll('.page')
        let myPage=currentPage;
        if(myPage===1){
            myPage=page.length
        }else{
            myPage--;
        }
        setCurrentPage(myPage)
        movePage(myPage)
        movePageAniMation(myPage)
    }

    const handleMoveNextPage=()=>{
        let myPage=currentPage;
        let page=document.querySelectorAll('.page')
        if(myPage===page.length){
            myPage=1
        }else{
            myPage++;
        }
        setCurrentPage(myPage)
        movePage(myPage)
        movePageAniMation(myPage)
    }

    const handleFindStaff=()=>{
        staffservice.findAllPaging(input,ageFrom,ageTo,status,1).then(res=>{
            setListStaff(res.data)
        }).catch(e=>{
            console.log(e)
        })
        let myArray=[];
        staffservice.findAllTotalPage(input,ageFrom,ageTo,status).then(res=>{
            let total=Math.ceil(res.data/3.0);
            for(let i=1;i<=total;i++){
                myArray.push(i)
            }
            setTotalPage(myArray)
        }).catch(e=>{
            console.log(e)
        })
        setWhatAction('find')
    }

    const clearText=()=>{
        const input=document.querySelector('.inputFind')
        const birthday=document.querySelectorAll('.birthDay')
        const status=document.querySelectorAll('.status option')
        input.value=''
        for(let i=0;i<birthday.length;i++){
            birthday[i].value=''
        }
        status[0].selected=true
        setStatus('')
        setInput('')
        setAgeFrom('')
        setAgeTo('')
        setWhatAction('')
    }

    const handleShowDetailStaff=(id)=>{
        nav(`/detail-nhanvien-management/${id}`)
    }
    const handleEditStaff=(id)=>{
        nav(`/update-nhanvien-management/${id}`)
    }



    return (
        <>
            <div className="">
                <div className="p-[20px]">
                    <div className="title mb-[20px]">
                        <i className="fa-solid fa-box-open text-[25px]"></i>
                        <span className="text-[22px] font-bold ml-[10px]">Quản lý tài khoản nhân viên</span>
                    </div>
                    <div className="bg-[#fff] rounded-[5px]">
                        <div className="p-[10px]">
                            <div className="border-b-[2px] border-[#999]">
                                <i className="fa-solid fa-filter text-[25px]"></i>
                                <span className="text-[17px] font-[500] ml-[5px]">Bộ lọc</span>
                            </div>
                            <div className="py-[20px]">
                                {/*Tìm Kiếm*/}
                                <div className="grid grid-cols-2">
                                    <div className="text-center">
                                        <span className="text-[#444] text-[14px] font-[500]">Tìm kiếm :</span>
                                        <input onChange={(e)=>{setInput(e.target.value)}} className="inputFind ml-[10px] pl-[10px] h-[30px] w-[300px] border-[1px] border-[#999] border-solid rounded-[5px] focus:outline-none
                                        text-[#444] text-[13px]" type="text" placeholder="Tìm kiếm tên và sđt..."/>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-[#444] text-[14px] font-[500]">Ngày sinh :</span>
                                        <input onChange={(e)=>{setAgeFrom(e.target.value)}} className="birthDay ml-[10px] pl-[10px] h-[30px] w-[150px] border-[1px] border-[#999] border-solid rounded-[5px] focus:outline-none
                                        text-[#444] text-[13px]" type="date"/>
                                        <input onChange={(e)=>{setAgeTo(e.target.value)}} className="birthDay ml-[10px] pl-[10px] h-[30px] w-[150px] border-[1px] border-[#999] border-solid rounded-[5px] focus:outline-none
                                        text-[#444] text-[13px]" type="date"/>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 mt-[25px]">
                                    <div className="text-center">
                                        <span className="text-[#444] text-[14px] font-[500]">Trạng thái :</span>
                                        <select onChange={(e)=>{setStatus(e.target.value)}}
                                            className="status ml-[10px] h-[30px] w-[300px] border-[1px] border-[#999] border-solid rounded-[5px] focus:outline-none text-[#444] text-[13px]">
                                            <option value="">Tất Cả</option>
                                            <option value="true">Đang Làm</option>
                                            <option value="false">Ngưng Làm</option>
                                        </select>
                                    </div>
                                    <div className="text-center">
                                        {/*<div>*/}
                                        {/*    <input className="relative w-[380px] focus:outline-none" min="1" max="100" type="range"/>*/}
                                        {/*    <span className="absolute ">a</span>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                                {/*End Tìm Kiếm*/}
                                <div className="text-[14px] mt-[20px] text-center py-[20px]">
                                    <button onClick={handleFindStaff} className="py-[7px] px-[20px] bg-primary-blue text-[#fff] rounded-[5px]">
                                        Tìm kiếm
                                    </button>
                                    <button onClick={clearText}
                                        className="py-[7px] px-[20px] bg-primary-red text-[#fff] rounded-[5px] ml-[10px]">
                                        Làm mới bộ lọc
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#fff] rounded-[5px] mt-[30px]">
                        <div className="p-[10px]">
                            <div className="mb-[20px] flex justify-between">
                                <div className="">
                                    <i className="fa-solid fa-list text-[25px]"></i>
                                    <span className="text-[17px] font-[500] ml-[5px]">Danh sách nhân viên</span>
                                </div>
                                <div>
                                    <button className="text-[#fff] bg-[#1578ff] py-[7px] px-[20px] rounded-[7px]"
                                            onClick={() => {
                                                openAddNhanVien()
                                            }}>
                                        <i className="fa-solid fa-plus text-[12px]"></i>
                                        <span className="text-[15px] ml-[5px]">Thêm</span>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <table className="w-full text-[12px]">
                                    <thead>
                                    <tr className="bg-primary-orange text-[#fff] text-[13px] font-[400]">
                                        <th className="w-1/12 border-r-[1px] border-solid border-[#fff] py-[10px]">STT</th>
                                        <th className="w-2/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Ảnh</th>
                                        <th className="w-2/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Tên
                                            nhân
                                            viên
                                        </th>
                                        <th className="w-1/12 border-r-[1px] border-solid border-[#fff] py-[10px]">CCCD</th>
                                        <th className="w-1/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Số
                                            điện
                                            thoại
                                        </th>
                                        <th className="w-1/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Ngày
                                            sinh
                                        </th>
                                        <th className="w-1/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Giới
                                            tính
                                        </th>
                                        <th className="w-2/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Trạng
                                            thái
                                        </th>
                                        <th className="w-1/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Hành
                                            Động
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="">
                                        {listStaff.map((item,index)=>{
                                            return(
                                                <>
                                                    <tr className="">
                                                        <td className="text-center px-4 py-[15px]">{currentPage===1 ? index+1 : ((currentPage-1)*3)+(index+1) }</td>
                                                        <td className="px-4 py-[10px]">
                                                            <img className="w-full object-cover h-[100px] rounded-[10px]"
                                                                 src={"http://localhost:8080/staff/img/" + item.image}/>
                                                        </td>
                                                        <td className="text-center px-4 py-[15px]">{item.name}</td>
                                                        <td className="text-center px-4 py-[15px]">{item.cccd}</td>
                                                        <td className="text-center px-4 py-[15px]">{item.phone}</td>
                                                        <td className="text-center px-4 py-[15px]">{item.birthDay}</td>
                                                        <td className="text-center px-4 py-[15px]">{item.gender ? "Nam" : "Nữ"}</td>
                                                        <td className="text-center px-4 py-[15px]">
                                                        <span className="text-[12px] bg-primary-green text-[#fff] py-[5px] px-[9px] rounded-[20px] cursor-pointer">{item.status ? "Đang Làm" : "Ngưng Làm"}</span>
                                                        </td>
                                                        <td className="text-center px-4 py-[15px]">
                                                            <i onClick={()=>{handleShowDetailStaff(item.id)}} className="fa-regular fa-eye py-[4px] px-[8px] rounded-[5px] bg-[#e48902] text-[#fff] cursor-pointer"></i>
                                                            <i onClick={()=>{handleEditStaff(item.id)}} className="fa-regular fa-pen-to-square py-[4px] px-[8px] rounded-[5px] bg-[#0189e5] text-[#fff] cursor-pointer ml-[5px]"></i>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                <div className="flex justify-between py-[20px] px-[20px]">
                                    <div></div>
                                    <div>
                                        <span onClick={handleMovePrePage} className="mr-[10px] cursor-pointer"><i className="fa-solid fa-chevron-left text-primary-orange"></i></span>
                                        {totalPage.map((item,index)=>{
                                            if(item===1){
                                                return(
                                                    <span onClick={(e)=>{handleMovePage(e)}} className="page mx-[5px] cursor-pointer px-[10px] py-[4px] activePage text-primary-orange">{item}</span>
                                                )
                                            }else {
                                                return (
                                                    <span onClick={(e)=>{handleMovePage(e)}} className="page mx-[5px] cursor-pointer px-[10px] py-[4px] text-primary-orange">{item}</span>
                                                )
                                            }
                                        })}
                                        <span onClick={handleMoveNextPage} className="ml-[10px] cursor-pointer"><i className="fa-solid fa-chevron-right text-primary-orange"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NhanVien