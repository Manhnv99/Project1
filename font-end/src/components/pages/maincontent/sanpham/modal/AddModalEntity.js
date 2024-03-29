import {useContext, useEffect, useState} from "react";
import {Context} from "../../../../provider/provider";
import '../css/sanpham.css'
import materialService from "../../../../services/materialService";
import soleService from "../../../../services/soleService";
import categoryService from "../../../../services/categoryService";
import brandService from "../../../../services/brandService";
import Loading from "../../loading/loading";

const AddModalEntity=(props)=>{
    const value=useContext(Context);
    const [name,setName]=useState('')
    const [status,setStatus]=useState(true);
    const [whatActionEntity,setWhatActionEntity]=useState(props.whatActionEntity)
    const [loading,setLoading]=useState(false)



    useEffect(() => {
        const inputName=document.querySelector('.name')
        const titleName=document.querySelector('.titleName')
        if(whatActionEntity==='brand'){
            titleName.innerHTML='Tên Thương Hiệu'
            inputName.placeholder='Tên Thương Hiệu'
        }else if(whatActionEntity==='material'){
            titleName.innerHTML='Tên Chất Liệu'
            inputName.placeholder='Tên Chất Liệu'
        }else if(whatActionEntity==='sole'){
            titleName.innerHTML='Tên Đế Giày'
            inputName.placeholder='Tên Đế Giày'
        }else if(whatActionEntity==='category'){
            titleName.innerHTML='Tên Thể Loại'
            inputName.placeholder='Tên Thể Loại'
        }
    }, []);


    const handleAddEntity= async ()=>{
        if(whatActionEntity==='material'){
            if(validate(name)===0){
                setLoading(true)
                setTimeout(async ()=>{
                    const materialRequest={
                        name:name,
                        status: status === 'false' ? false : true,
                    }
                    await materialService.addCategory(materialRequest).then(res=>{
                        props.addListEntity(res.data)
                    }).catch(e=>{
                        console.log(e)
                    })
                    setLoading(false)
                    await value.showToastMessage("Thêm Chất Liệu Thành Công!")
                    await handleClose();
                },1000)
            }
        }else if(whatActionEntity==='sole'){
            if(validate(name)===0){
                setLoading(true)
                setTimeout(async ()=>{
                    const soleRequest={
                        name:name,
                        status: status === 'false' ? false : true,
                    }
                    await soleService.addCategory(soleRequest).then(res=>{
                        props.addListEntity(res.data)
                    }).catch(e=>{
                        console.log(e)
                    })
                    setLoading(false)
                    await value.showToastMessage("Thêm Đế Giày Thành Công!")
                    await handleClose();
                },1000)
            }
        }else if(whatActionEntity==='category'){
            if(validate(name)===0){
                setLoading(true)
                setTimeout(async ()=>{
                    const categoryRequest={
                        name:name,
                        status: status === 'false' ? false : true,
                    }
                    await categoryService.addCategory(categoryRequest).then(res=>{
                        props.addListEntity(res.data)
                    }).catch(e=>{
                        console.log(e)
                    })
                    setLoading(false)
                    await value.showToastMessage("Thêm Thể Loại Thành Công!")
                    await handleClose();
                },1000)
            }
        }else if(whatActionEntity==='brand'){
            if(validate(name)===0){
                setLoading(true)
                setTimeout(async ()=>{
                    const brandRequest={
                        name:name,
                        status: status === 'false' ? false : true,
                    }
                    await brandService.addCategory(brandRequest).then(res=>{
                        props.addListEntity(res.data)
                    }).catch(e=>{
                        console.log(e)
                    })
                    setLoading(false)
                    await value.showToastMessage("Thêm Thương Hiệu Thành Công!")
                    await handleClose();
                },1000)
            }
        }
    }


    const handleNameOnBlur=(e)=>{
        validate(e.target.value);
    }

    const validate =(name)=>{
        let count=0;
        let namevld=document.querySelector('.namevld')
        let inputName=document.querySelector('.name');
        if(name===''){
            if(whatActionEntity==='brand'){
                namevld.innerHTML='Chưa điền thương hiệu!'
            }else if(whatActionEntity==='category'){
                namevld.innerHTML='Chưa điền thể loại!'
            }else if(whatActionEntity==='sole'){
                namevld.innerHTML='Chưa điền đế giày!'
            }else if(whatActionEntity==='material'){
                namevld.innerHTML='Chưa điền chất liệu!'
            }
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


    const handleClose=async ()=>{
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
            props.handleCloseModal();
        }, 500)
    }

    return(
        <>
            {loading && <Loading/>}
            {/*Modal*/}
            <div className="modal fixed bottom-0 top-0 left-0 right-0 z-[3] bg-[rgba(0,0,0,0.4)]">
                <div className="flex justify-center items-center h-full">
                    <div className="modal-container p-[20px] bg-[#fff] rounded-[5px]">
                        <div className="flex justify-between">
                            <div><span className="font-[600]">
                                {whatActionEntity === 'brand' ? 'Thêm Thương Hiệu' : whatActionEntity==='material' ? 'Thêm Chất Liệu' :
                                    whatActionEntity==='sole' ? 'Thêm Đế Giày' : whatActionEntity==='category' ? 'Thêm Thể Loại' : ''}
                            </span></div>
                            <div onClick={handleClose} className="cursor-pointer" ><i className="fa-solid fa-xmark"></i></div>
                        </div>
                        <div className="text-[14px]">
                            <div className="flex items-center">
                                <div className="mb-[5px] mt-[10px]">
                                    <span className="text-primary-red">* </span>
                                    <span className="titleName">Tên thương hiệu</span>
                                </div>
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
                                <button onClick={handleAddEntity} className="hover:opacity-[0.8] ease-in-out duration-[0.5s] bg-[#1677ff] py-[5px] px-[25px] rounded-[7px]">Thêm</button>
                                <button onClick={handleClose} className="hover:opacity-[0.8] ease-in-out duration-[0.5s] bg-primary-red py-[5px] px-[20px] rounded-[7px] ml-[10px]">Hủy</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddModalEntity