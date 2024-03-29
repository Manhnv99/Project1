import './css/sanpham.css'
import {useContext, useEffect, useState} from "react";
import categoryService from "../../../services/categoryService";
import materialService from "../../../services/materialService";
import {Context} from "../../../provider/provider";
import Loading from "../loading/loading";
const moment = require('moment');

const ChatLieu = () => {
    const value=useContext(Context);
    const [name,setName]=useState('')
    const [status,setStatus]=useState(true);
    const [list,setList]=useState([])
    const [totalPage,setTotalPage]=useState([])
    const [currentPage,setCurrentPage]=useState(1);
    const [whatAction,setWhatAction]=useState('')
    const [id,setId]=useState('')
    const [nameFind,setNameFind]=useState('')
    const [statusFind,setStatusFind]=useState('')
    const [whatActionMovePage,setWhatActionMovePage]=useState('')
    const [loading,setLoading]=useState(false)


    useEffect(() => {
        showData(1)
        getPage();
    }, []);

    const showData=(page)=>{
        materialService.getAllPaging(page).then(res=>{
            if(res && res.status===200){
                setList(res.data);
            }
        }).catch(e=>{
            console.log(e)
        })
    }

    const getPage=async ()=>{
        const myPage=[];
        await materialService.getTotalPage().then(res=>{
            for(let i=1;i<=res.data;i++){
                myPage.push(i)
            }
        })
        setTotalPage(myPage);
    }


    const handleAddOrEdit= ()=>{
        if(validate(name)===0){
            if(whatAction==='add'){
                setLoading(true)
                setTimeout(async ()=>{
                    const materialRequest={
                        name:name,
                        status: status === 'false' ? false : true,
                    }
                    await materialService.addCategory(materialRequest).then(res=>{

                    }).catch(e=>{
                        console.log(e)
                    })
                    await showData(1);
                    await getPage();
                    await movePageAnimation(1);
                    await setLoading(false);
                    await value.showToastMessage("Thêm Chất Liệu Thành Công!")
                    await handleClose();
                },1000)
            }else{
                setLoading(true)
                setTimeout(async ()=>{
                    const materialRequest={
                        name:name,
                        status: status,
                    }
                    await materialService.update(id,materialRequest).catch(e=>{
                        console.log(e)
                    })
                    await showData(currentPage);
                    await setLoading(false)
                    await value.showToastMessage("Cập Nhật Chất Liệu Thành Công!")
                    await handleClose();
                },1000)
            }
        }
    }

    const handleAdd=()=>{
        setWhatAction('add')
        handleShow();
    }

    const handleEdit=(id)=>{
        setWhatAction('edit')
        setId(id)
        materialService.getById(id).then(res=>{
            const status=document.querySelectorAll('.statusModal option')
            setName(res.data.name);
            if(res.data.status===true){
                status[0].selected=true
            }else{
                status[1].selected=true
            }
            setStatus(res.data.status)
        }).catch(e=>{
            console.log(e)
        })
        handleShow()
    }

    const handleShowDetail=(id)=>{
        setWhatAction('detail')
        materialService.getById(id).then(res=>{
            const status=document.querySelectorAll('.statusModal option')
            setName(res.data.name);
            console.log(status)
            if(res.data.status===true){
                status[0].selected=true
            }else{
                status[1].selected=true
            }
        }).catch(e=>{
            console.log(e)
        })
        handleShow()
    }

    const handleClose = () => {
        const status=document.querySelectorAll('.statusModal option')
        let modal = document.querySelector('.modal');
        const modal_container=document.querySelector('.modal-container')
        const namevld=document.querySelector('.namevld')
        const inputName=document.querySelector('.name');
        modal_container.style.animation = 'hideModal 0.5s ease-in-out'
        setTimeout(() => {
            modal.style.display = 'none'
            modal_container.style.animation = ''
            status[0].selected=true
            setName('')
            setStatus(true)
            namevld.innerHTML=''
            inputName.style.outline= ''
            inputName.style.border=''
        }, 500)
    }
    const handleShow = () => {
        const modal = document.querySelector('.modal');
        const modal_container=document.querySelector('.modal-container')
        modal_container.style.animation = 'showModal 0.5s ease-in-out'
        modal.style.display = 'block'
    }


    const movePage=(page)=>{
        if(whatActionMovePage==='find'){
            materialService.findByAll(nameFind,statusFind,page).then(res=>{
                setList(res.data)
            }).catch(e=>{
                console.log(e)
            })
            setCurrentPage(page)
            movePageAnimation(page)
        }else{
            showData(page)
            setCurrentPage(page)
            movePageAnimation(page)
        }
    }
    const movePageAnimation=(page)=>{
        const movePage=document.querySelectorAll('.movePage')
        for(let i=0;i<movePage.length;i++){
            movePage[i].classList.remove('activeMovePage')
        }
        for(let i=0;i<movePage.length;i++){
            if((page-1)===i){
                movePage[i].classList.add('activeMovePage')
            }
        }
    }

    const handleMovePre=()=>{
        if(whatActionMovePage==='find'){
            if(currentPage===1){
                materialService.findByAll(nameFind,statusFind,totalPage.length).then(res=>{
                    setList(res.data)
                }).catch(e=>{
                    console.log(e)
                })
                setCurrentPage(totalPage.length)
                movePageAnimation(totalPage.length)
            }else{
                materialService.findByAll(nameFind,statusFind,currentPage-1).then(res=>{
                    setList(res.data)
                }).catch(e=>{
                    console.log(e)
                })
                setCurrentPage(currentPage-1)
                movePageAnimation(currentPage-1)
            }
        }else{
            if(currentPage===1){
                showData(totalPage.length)
                setCurrentPage(totalPage.length)
                movePageAnimation(totalPage.length)
            }else{
                showData(currentPage-1)
                setCurrentPage(currentPage-1)
                movePageAnimation(currentPage-1)
            }
        }
    }

    const handleMoveNext=()=>{
        if(whatActionMovePage==='find'){
            if(currentPage===totalPage.length){
                materialService.findByAll(nameFind,statusFind,1).then(res=>{
                    setList(res.data)
                }).catch(e=>{
                    console.log(e)
                })
                setCurrentPage(1)
                movePageAnimation(1)
            }else{
                materialService.findByAll(nameFind,statusFind,currentPage+1).then(res=>{
                    setList(res.data)
                }).catch(e=>{
                    console.log(e)
                })
                setCurrentPage(currentPage+1)
                movePageAnimation(currentPage+1)
            }
        }else{
            if(currentPage===totalPage.length){
                showData(1)
                setCurrentPage(1)
                movePageAnimation(1)
            }else{
                showData(currentPage+1)
                setCurrentPage(currentPage+1)
                movePageAnimation(currentPage+1)
            }
        }
    }

    const validate =(name)=>{
        let count=0;
        let namevld=document.querySelector('.namevld')
        let inputName=document.querySelector('.name');
        if(name===''){
            namevld.innerHTML='Chưa điền chất liệu!'
            inputName.style.outline= 'solid #fe4847 1px'
            inputName.style.border='#fe4847'
            count++;
        }else{
            namevld.innerHTML=''
            inputName.style.outline= ''
            inputName.style.border=''
        }
        return count;
    }
    const handleNameOnBlur=(e)=>{
        validate(e.target.value);
    }

    const handleFind= async ()=>{
        setWhatActionMovePage('find')
        const status= statusFind==='true' ? true : statusFind==='false' ? false : ''
        await materialService.findByAll(nameFind,status,1).then(res=>{
            setList(res.data)
        }).catch(e=>{
            console.log(e)
        })
        await materialService.findByAllTotalPage(nameFind,statusFind).then(res=>{
            let myArray=[]
            for(let i=1;i<=res.data;i++){
                myArray.push(i);
            }
            setTotalPage(myArray)
        }) .catch(e=>{
            console.log(e)
        })
    }

    const handleClear=()=>{
        setNameFind('')
        const status = document.querySelectorAll('.status option')
        status[0].selected=true
        setStatusFind('')
    }


    return (
        <>
            {loading && <Loading/>}
            <div className="">
                <div className="p-[20px]">
                    <div className="title mb-[20px]">
                        <i className="fa-solid fa-box-open text-[25px]"></i>
                        <span className="text-[22px] font-bold ml-[10px]">Quản lý chất liệu</span>
                    </div>
                    <div className="bg-[#fff] rounded-[5px]">
                        <div className="p-[10px]">
                            <div className="border-b-[2px] border-[#999]">
                                <i className="fa-solid fa-filter text-[25px]"></i>
                                <span className="text-[17px] font-[500] ml-[5px]">Bộ lọc</span>
                            </div>
                            <div className="py-[20px]">
                                <div className="grid grid-cols-2">
                                    <div className="text-center">
                                        <span className="text-[#444] text-[14px] font-[500]">Tên chất liệu :</span>
                                        <input value={nameFind} onChange={(e)=>{setNameFind(e.target.value)}} className="ml-[10px] pl-[10px] h-[30px] w-[300px] border-[1px] border-[#999] border-solid rounded-[5px] focus:outline-none
                                        text-[#444] text-[13px]" type="text" placeholder="Tìm Kiếm"/>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-[#444] text-[14px] font-[500]">Trạng thái :</span>
                                        <select onChange={(e)=>{setStatusFind(e.target.value)}}
                                                className="status ml-[10px] h-[30px] w-[300px] border-[1px] border-[#999] border-solid rounded-[5px] focus:outline-none text-[#444] text-[13px]">
                                            <option value=''>Tất Cả</option>
                                            <option value="true">Đang Sử Dụng</option>
                                            <option value="false">Ngưng Sử Dụng</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="text-[14px] mt-[20px] text-center py-[20px]">
                                    <button onClick={handleFind} className="hover:opacity-[0.8] ease-in-out duration-[0.5s] py-[7px] px-[20px] bg-primary-blue text-[#fff] rounded-[5px]">
                                        Tìm kiếm
                                    </button>
                                    <button onClick={handleClear}
                                            className="hover:opacity-[0.8] ease-in-out duration-[0.5s] py-[7px] px-[20px] bg-primary-red text-[#fff] rounded-[5px] ml-[10px]">
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
                                    <span className="text-[17px] font-[500] ml-[5px]">Danh sách chất liệu</span>
                                </div>
                                <div>
                                    <button className="hover:opacity-[0.8] ease-in-out duration-[0.5s] text-[#fff] bg-[#1578ff] py-[7px] px-[20px] rounded-[7px]"
                                            onClick={() => {
                                                handleAdd()
                                            }}>
                                        <i className="fa-solid fa-plus text-[12px]"></i>
                                        <span className="text-[15px] ml-[5px]">Thêm</span>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <table className="w-full text-[14px]">
                                    <thead>
                                    <tr className="text-center bg-primary-orange text-[#fff] text-[13px] font-[400]">
                                        <th className="w-1/12 border-r-[1px] border-solid border-[#fff] py-[10px]">STT</th>
                                        <th className="w-4/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Tên
                                            chất liệu
                                        </th>
                                        <th className="w-3/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Ngày
                                            cập nhật
                                        </th>
                                        <th className="w-2/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Trạng
                                            thái
                                        </th>
                                        <th className="w-2/12">Hành động</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-[14px]">
                                    {list.map((item,index)=>{
                                        return(
                                            <tr className="">
                                                <td className="text-center px-4 py-[15px]">{currentPage===1 ? index+1 :((currentPage-1)*3)+(index+1)}</td>
                                                <td className="text-center px-4 py-[10px]">{item.name}</td>
                                                <td className="text-center px-4 py-[15px]">
                                                    {moment(item.updated_at).format('YYYY-MM-DD HH:mm:ss')}
                                                </td>
                                                <td className="text-center px-4 py-[15px]">
                                                    <span
                                                        className="bg-primary-green text-[#fff] py-[7px] px-[17px] rounded-[20px] cursor-pointer">{item.status ? "Đang Sử Dụng":"Ngưng Sử Dụng"}</span>
                                                </td>
                                                <td className="text-center px-4 py-[15px]">
                                                    <i onClick={()=>{handleShowDetail(item.id)}} className="hover:opacity-[0.8] ease-in-out duration-[0.5s] fa-regular fa-eye py-[7px] px-[12px] rounded-[5px] bg-[#e48902] text-[#fff] cursor-pointer"></i>
                                                    <i onClick={()=>{handleEdit(item.id)}} className="hover:opacity-[0.8] ease-in-out duration-[0.5s] fa-regular fa-pen-to-square py-[7px] px-[12px] rounded-[5px] bg-[#0189e5] text-[#fff] cursor-pointer ml-[7px]"></i>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                                <div className="flex justify-between py-[20px] px-[20px]">
                                    <div></div>
                                    <div>
                                        <span onClick={handleMovePre} className="mr-[10px] cursor-pointer"><i className="fa-solid fa-chevron-left text-primary-orange"></i></span>
                                        {totalPage.map(item=>{
                                            if(item===1){
                                                return (
                                                    <span onClick={()=>{movePage(item)}} className="movePage page mx-[5px] cursor-pointer px-[10px] py-[4px] activeMovePage text-primary-orange">{item}</span>
                                                )
                                            }else{
                                                return (
                                                    <span onClick={()=>{movePage(item)}} className="movePage page mx-[5px] cursor-pointer px-[10px] py-[4px] text-primary-orange">{item}</span>
                                                )
                                            }
                                        })}
                                        <span onClick={handleMoveNext} className="ml-[10px] cursor-pointer"><i className="fa-solid fa-chevron-right text-primary-orange"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*Modal*/}
            <div className="modal fixed bottom-0 top-0 left-0 right-0 z-2 bg-[rgba(0,0,0,0.4)] hidden">
                <div className="flex justify-center items-center h-full">
                    <div className="modal-container p-[20px] bg-[#fff] rounded-[5px]">
                        <div className="flex justify-between">
                            <div><span className="font-[600]">Thêm chất liệu</span></div>
                            <div className="cursor-pointer" onClick={handleClose}><i className="fa-solid fa-xmark"></i></div>
                        </div>
                        <div className="text-[14px]">
                            <div className="flex items-center">
                                <p className="mb-[5px] mt-[10px]"><span className="text-primary-red">*</span> Tên chất liệu</p>
                                <p className="namevld mb-[5px] mt-[10px] text-primary-red ml-[5px]"></p>
                            </div>
                            <input type="text" value={name} onBlur={(e)=>{handleNameOnBlur(e)}} onChange={(e)=>{setName(e.target.value)}}
                                   className="name w-[400px] h-[30px] pl-[5px] focus:outline-none focus:border-[#bfdcf6] border-[#999] border-[1px] rounded-[5px]"
                                   placeholder="Tên chất liệu"/>
                        </div>
                        <div className="text-[14px]">
                            <p className="mb-[5px] mt-[10px]"><span className="text-primary-red">*</span> Trạng thái</p>
                            <select onChange={(e)=>{setStatus(e.target.value)}}
                                    className="statusModal w-[400px] h-[30px] pl-[5px] focus:outline-none focus:border-[#bfdcf6] border-[#999] border-[1px] rounded-[5px]">
                                <option value="true">Đang Sử Dụng</option>
                                <option value="false">Ngưng Sử Dụng</option>
                            </select>
                        </div>
                        <div className="text-[#fff] flex justify-between mt-[20px]">
                            <div>
                            </div>
                            <div>
                                {whatAction !== 'detail' && whatAction ==='add' && <button onClick={handleAddOrEdit}
                                                                                           className="hover:opacity-[0.8] ease-in-out duration-[0.5s] bg-[#1677ff] py-[5px] px-[25px] rounded-[7px]">Thêm</button>}
                                {whatAction === 'edit' && <button onClick={handleAddOrEdit}
                                                                  className="hover:opacity-[0.8] ease-in-out duration-[0.5s] bg-[#1677ff] py-[5px] px-[25px] rounded-[7px]">Cập Nhật</button>}
                                <button className="hover:opacity-[0.8] ease-in-out duration-[0.5s] bg-primary-red py-[5px] px-[20px] rounded-[7px] ml-[10px]"
                                        onClick={() => {
                                            handleClose()
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

export default ChatLieu