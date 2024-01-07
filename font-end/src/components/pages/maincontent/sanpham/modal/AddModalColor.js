import {useContext, useEffect, useState} from "react";
import {Context} from "../../../../provider/provider";
import Loading from "../../loading/loading";
import colorService from "../../../../services/colorService";


const AddModalColor=(props)=>{
    const addEntity=document.querySelector('.add_entity')
    const chooseEntity=document.querySelector('.choose_entity')
    const text_redirect=document.querySelector('.text-redirect')


    const value=useContext(Context)
    const [addOrChoose,setAddOrChoose]=useState(true)
    const [code,setCode]=useState('')
    const [name,setName]=useState('')
    const [status,setStatus]=useState(true)
    const [listColor,setListColor]=useState([])
    const [loading,setLoading]=useState(false)
    const [colorChoosed,setColorChoosed]=useState([])




    useEffect(() => {
        CallAPI();
    }, []);

    const CallAPI=()=>{
        colorService.getAll().then(res=>{
            setListColor(res.data)
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
            props.handleCloseAddColor();
        }, 500)
    }

    const handleMoveScreen= async ()=>{
        let codevld=document.querySelector('.codevld')
        let inputCode=document.querySelector('.code');
        let namevld=document.querySelector('.namevld')
        let inputName=document.querySelector('.name');
        namevld.innerHTML=''
        inputName.style.outline= ''
        inputName.style.border=''
        codevld.innerHTML=''
        inputCode.style.outline= ''
        inputCode.style.border=''
        if(addOrChoose){
            chooseEntity.style.display='none'
            addEntity.style.display='block'
            text_redirect.innerHTML='Chọn màu sắc'
            await setAddOrChoose(false)
        }else{
            chooseEntity.style.display='grid'
            addEntity.style.display='none'
            text_redirect.innerHTML='Thêm màu sắc'
            inputName.style.value=''
            setName('')
            inputCode.style.value=''
            setCode('')
            await setAddOrChoose(true)
        }
    }

    const handleCodeOnBlur=()=>{
        validate(code,name);
    }
    const handleNameOnBlur=()=>{
        validate(code,name);
    }

    const validate =(code,name)=>{
        let count=0;
        let codevld=document.querySelector('.codevld')
        let inputCode=document.querySelector('.code');
        let namevld=document.querySelector('.namevld')
        let inputName=document.querySelector('.name');
        if(code===''){
            codevld.innerHTML='Chưa điền mã màu sắc!'
            inputCode.style.outline= 'solid #fe4847 1px'
            inputCode.style.border='#fe4847'
            count++;
        }else{
            for(let i=0;i<listColor.length;i++){
                if(code=== listColor[i].code){
                    codevld.innerHTML='Bạn Đã Có Mã Màu Sắc Này Rồi!'
                    inputCode.style.outline= 'solid #fe4847 1px'
                    inputCode.style.border='#fe4847'
                    count++;
                    break
                }else{
                    codevld.innerHTML=''
                    inputCode.style.outline= ''
                    inputCode.style.border=''
                }
            }
            for(let i=0;i<listColor.length;i++){
                if(name===''){
                    namevld.innerHTML='Chưa điền tên màu sắc!'
                    inputName.style.outline= 'solid #fe4847 1px'
                    inputName.style.border='#fe4847'
                    count++;
                }else{
                    for(let i=0;i<listColor.length;i++){
                        if(name=== listColor[i].name){
                            namevld.innerHTML='Bạn Đã Có Màu Sắc Này Rồi!'
                            inputName.style.outline= 'solid #fe4847 1px'
                            inputName.style.border='#fe4847'
                            count++;
                            break;
                        }else{
                            namevld.innerHTML=''
                            inputName.style.outline= ''
                            inputName.style.border=''
                        }
                    }
                }
            }
        }
        return count;
    }

    const handleAddOrChoose= ()=>{
        let inputName=document.querySelector('.name');
        if(addOrChoose){
            //choose
            props.showColorChoosed(colorChoosed)
            handleClose()
        }else{
            //add
            if(validate(code,name)===0){
                setLoading(true)
                setTimeout(async ()=>{
                    const sizeRequest={
                        code:code,
                        name:name,
                        status: status === 'false' ? false : true
                    }
                    await colorService.addColor(sizeRequest).then(res=>{
                        setListColor([...listColor,res.data])
                    }).catch(e=>{
                        console.log(e)
                    })
                    setName('')
                    inputName.style.value=''
                    chooseEntity.style.display='grid'
                    addEntity.style.display='none'
                    text_redirect.innerHTML='Thêm kích cỡ'
                    await setAddOrChoose(true)
                    setLoading(false)
                    await value.showToastMessage("Thêm Màu Sắc Thành Công!")
                },1000)
            }
        }
    }

    const handleChoose=(e)=>{
        e.target.classList.toggle('activeVariant')
        const color=e.target.textContent
        if(colorChoosed.length===0){
            setColorChoosed([color])
        }else{
            let colorFound = false;
            for(let i=0;i<colorChoosed.length;i++){
                if(color===colorChoosed[i]){
                    colorChoosed.splice(i,1);
                    colorFound=true;
                    break;
                }
            }
            if(!colorFound){
                setColorChoosed([color, ...colorChoosed]);
            }
        }
    }


    return(
        <>
            {loading && <Loading/>}
            {/*Modal*/}
            <div className="modal fixed bottom-0 top-0 left-0 right-0 z-2 bg-[rgba(0,0,0,0.4)]">
                <div className="flex justify-center items-center h-full">
                    <div className="modal-container min-w-[500px] p-[20px] bg-[#fff] rounded-[5px]">
                        <div className="flex justify-between">
                            <div><span className="font-[600]">Chọn màu sắc</span></div>
                            <div onClick={handleClose} className="cursor-pointer">
                                <i className="fa-solid fa-xmark"></i>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div></div>
                            <div onClick={handleMoveScreen}
                                 className=" border-[1px] border-[#999] p-[5px] mt-[15px] rounded-[5px] hover:bg-primary-blue hover:text-[#fff] hover:border-[#fff] ease-in-out duration-[0.5s] cursor-pointer">
                                <i className="mx-[5px] text-[14px] fa-solid fa-plus"></i>
                                <span className="text-redirect text-[14px]">Thêm màu sắc</span>
                            </div>
                        </div>
                        {/*main*/}
                        <div className="add_entity hidden">
                            {/*Mã*/}
                            <div className="text-[14px]">
                                <div className="flex items-center">
                                    <p className="mb-[5px] mt-[10px]"><span className="text-primary-red">*</span> Mã
                                        màu sắc</p>
                                    <p className="codevld mb-[5px] mt-[10px] text-primary-red ml-[5px]"></p>
                                </div>
                                <input type="text" value={code} onBlur={handleCodeOnBlur} onChange={(e) => {
                                    setCode(e.target.value)
                                }}
                                       className="code w-full h-[30px] pl-[5px] focus:outline-none focus:border-[#bfdcf6] border-[#999] border-[1px] rounded-[5px]"
                                       placeholder="Mã màu sắc"/>
                            </div>
                            {/*Tên*/}
                            <div className="text-[14px]">
                                <div className="flex items-center">
                                    <p className="mb-[5px] mt-[10px]"><span className="text-primary-red">*</span> Tên
                                        màu sắc</p>
                                    <p className="namevld mb-[5px] mt-[10px] text-primary-red ml-[5px]"></p>
                                </div>
                                <input type="text" value={name} onBlur={handleNameOnBlur} onChange={(e) => {
                                    setName(e.target.value)
                                }}
                                       className="name w-full h-[30px] pl-[5px] focus:outline-none focus:border-[#bfdcf6] border-[#999] border-[1px] rounded-[5px]"
                                       placeholder="Tên màu sắc"/>
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
                            {listColor.map((item, index) => {
                                if (item.status) {
                                    return (
                                        <>
                                            <span key={index} onClick={(e) => {handleChoose(e)}} style={{backgroundColor:item.code}}
                                                  className="block w-[100%] rounded-[5px] text-center font-bold text-[#444] text-[12px] py-[6px] cursor-pointer hover:text-[#fff] ease-in-out duration-[0.5s] border-[1px] border-[#999]">{item.code}</span>
                                        </>
                                    )
                                }
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

export default AddModalColor;