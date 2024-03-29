import {useContext, useEffect, useState} from "react";
import materialService from "../../../../services/materialService";
import sizeService from "../../../../services/sizeService";
import {Context} from "../../../../provider/provider";
import Loading from "../../loading/loading";


const AddModalSize=(props)=>{
    const addEntity=document.querySelector('.add_entity')
    const chooseEntity=document.querySelector('.choose_entity')
    const text_redirect=document.querySelector('.text-redirect')


    const value=useContext(Context)
    const [addOrChoose,setAddOrChoose]=useState(true)
    const [name,setName]=useState('')
    const [status,setStatus]=useState(true)
    const [listSize,setListSize]=useState([])
    const [loading,setLoading]=useState(false)
    const [sizeChoosed,setSizeChoosed]=useState([])





    useEffect(() => {
        CallAPI();
    }, []);

    const CallAPI=()=>{
        sizeService.getAll().then(res=>{
            setListSize(res.data)
        }).catch(e=>{
            console.log(e)
        })
    }



    const handleClose=async ()=>{
        let modal = document.querySelector('.modal');
        const modal_container=document.querySelector('.modal-container')
        modal_container.style.animation = 'hideModal 0.5s ease-in-out'
        setTimeout(() => {
            modal.style.display = 'none'
            modal_container.style.animation = ''
            props.handleCloseAddSize();
        }, 500)
    }

    const handleMoveScreen= async ()=>{
        let namevld=document.querySelector('.namevld')
        let inputName=document.querySelector('.name');
        namevld.innerHTML=''
        inputName.style.outline= ''
        inputName.style.border=''
        if(addOrChoose){
            chooseEntity.style.display='none'
            addEntity.style.display='block'
            text_redirect.innerHTML='Chọn kích cỡ'
            await setAddOrChoose(false)
        }else{
            chooseEntity.style.display='grid'
            addEntity.style.display='none'
            text_redirect.innerHTML='Thêm kích cỡ'
            inputName.style.value=''
            setName('')
            await setAddOrChoose(true)
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
            namevld.innerHTML='Chưa điền tên size!'
            inputName.style.outline= 'solid #fe4847 1px'
            inputName.style.border='#fe4847'
            count++;
        }else if(isNaN(name)){
            namevld.innerHTML='Tên size phải là số!'
            inputName.style.outline= 'solid #fe4847 1px'
            inputName.style.border='#fe4847'
            count++;
        }else{
            for(let i=0;i<listSize.length;i++){
                if(name=== listSize[i].name){
                    namevld.innerHTML='Bạn Đã Có Size Này Rồi!'
                    inputName.style.outline= 'solid #fe4847 1px'
                    inputName.style.border='#fe4847'
                    count++;
                    break
                }else{
                    namevld.innerHTML=''
                    inputName.style.outline= ''
                    inputName.style.border=''
                }
            }
        }
        return count;
    }

    const handleAddOrChoose= ()=>{
        let inputName=document.querySelector('.name');

        if(addOrChoose){
            props.showSizeChoosed(sizeChoosed)
            handleClose();
        }else{
            //add
            if(validate(name)===0){
                setLoading(true)
                setTimeout(async ()=>{
                    const sizeRequest={
                        name:name,
                        status: status === 'false' ? false : true
                    }
                    await sizeService.addSize(sizeRequest).then(res=>{
                        setListSize([...listSize,res.data])
                        props.addListSize(res.data)
                    }).catch(e=>{
                        console.log(e)
                    })
                    setName('')
                    inputName.style.value=''
                    chooseEntity.style.display='grid'
                    addEntity.style.display='none'
                    text_redirect.innerHTML='Thêm kích cỡ'
                    await setAddOrChoose(true)
                    await setLoading(false)
                    await value.showToastMessage("Thêm Kích Thước Thành Công!")
                },1000)
            }
        }
    }

    const handleChoose=(e)=>{
        e.target.classList.toggle('activeVariant')
        const size=e.target.textContent
        if(sizeChoosed.length===0){
            setSizeChoosed([size])
        }else{
            let sizeFound = false;
            for(let i=0;i<sizeChoosed.length;i++){
                if(parseInt(size)===parseInt(sizeChoosed[i])){
                    sizeChoosed.splice(i,1);
                    sizeFound=true;
                    break;
                }
            }
            if(!sizeFound){
                setSizeChoosed([size, ...sizeChoosed]);
            }
        }
    }


    return(
        <>
            {loading && <Loading/>}
            {/*Modal*/}
            <div className="modal fixed bottom-0 top-0 left-0 right-0 z-[3] bg-[rgba(0,0,0,0.4)]">
                <div className="flex justify-center items-center h-full">
                    <div className="modal-container min-w-[500px] p-[20px] bg-[#fff] rounded-[5px]">
                        <div className="flex justify-between">
                            <div><span className="font-[600]">Chọn Kích Cỡ</span></div>
                            <div onClick={handleClose} className="cursor-pointer">
                                <i className="fa-solid fa-xmark"></i>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div></div>
                            <div onClick={handleMoveScreen}
                                className=" border-[1px] border-[#999] p-[5px] mt-[15px] rounded-[5px] hover:bg-primary-blue hover:text-[#fff] hover:border-[#fff] ease-in-out duration-[0.5s] cursor-pointer">
                                <i className="mx-[5px] text-[14px] fa-solid fa-plus"></i>
                                <span className="text-redirect text-[14px]">Thêm kích cỡ</span>
                            </div>
                        </div>
                        {/*main*/}
                        <div className="add_entity hidden">
                            <div className="text-[14px]">
                                <div className="flex items-center">
                                    <p className="mb-[5px] mt-[10px]"><span className="text-primary-red">*</span> Tên
                                        kích cỡ</p>
                                    <p className="namevld mb-[5px] mt-[10px] text-primary-red ml-[5px]"></p>
                                </div>
                                <input type="text" value={name} onBlur={(e) => {
                                    handleNameOnBlur(e)
                                }} onChange={(e) => {
                                    setName(e.target.value)
                                }}
                                       className="name w-full h-[30px] pl-[5px] focus:outline-none focus:border-[#bfdcf6] border-[#999] border-[1px] rounded-[5px]"
                                       placeholder="Tên kích cỡ"/>
                            </div>
                            <div className="text-[14px]">
                                <p className="mb-[5px] mt-[10px]"><span className="text-primary-red">*</span> Trạng thái
                                </p>
                                <select onChange={(e) => {
                                    setStatus(e.target.value)
                                }}
                                        className="statusModal w-full h-[30px] pl-[5px] focus:outline-none focus:border-[#bfdcf6] border-[#999] border-[1px] rounded-[5px]">
                                    <option value="true">Đang Sử Dụng</option>
                                    <option value="false">Ngưng Sử Dụng</option>
                                </select>
                            </div>
                        </div>
                        {/**/}
                        <div className="choose_entity grid grid-cols-4 gap-[15px] mt-[15px]">
                            {listSize.map((item,index)=>{
                                return(
                                    <>
                                        <span onClick={(e)=>{handleChoose(e)}} key={index}
                                            className="listSize block w-[100%] rounded-[5px] text-center text-[#444] text-[12px] py-[6px] cursor-pointer hover:bg-primary-blue hover:text-[#fff] ease-in-out duration-[0.5s] border-[1px] border-[#999]">{item.name}</span>
                                    </>
                                )
                            })}
                        </div>
                        {/*main*/}
                        <div className="text-[#fff] flex justify-between mt-[20px]">
                            <div>
                            </div>
                            <div>
                                {
                                    addOrChoose ? <button onClick={handleAddOrChoose}
                                                          className="hover:opacity-[0.8] ease-in-out duration-[0.5s] bg-[#1677ff] py-[5px] px-[25px] rounded-[7px]">Chọn
                                    </button> : <button onClick={handleAddOrChoose}
                                                        className="hover:opacity-[0.8] ease-in-out duration-[0.5s] bg-[#1677ff] py-[5px] px-[25px] rounded-[7px]">Thêm
                                    </button>
                                }
                                <button onClick={handleClose}
                                        className="hover:opacity-[0.8] ease-in-out duration-[0.5s] bg-primary-red py-[5px] px-[20px] rounded-[7px] ml-[10px]">Hủy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddModalSize;