import {useContext, useState} from "react";
import {Context} from "../../../../provider/provider";
import Loading from "../../loading/loading";


const ModalChangeGeneral=(props)=>{
    const value=useContext(Context)
    const [price,setPrice]=useState('')
    const [quantity,setQuantity]=useState(0)
    const [loading,setLoading]=useState(false)


    const handleChangeGeneral=()=>{
        if(validate()===0){
            setLoading(true)
            setTimeout(()=>{
                const listChange=props.listChangeGeneral.map((item)=>{
                    return props.productShow.filter(product=>product.unique===item)
                })
                let myarray=[]
                for(let i=0;i<listChange.length;i++){
                    listChange[i][0].price=price;
                    listChange[i][0].quantity=quantity;
                    myarray.push(listChange[i][0])
                }
                let productShow=[...props.productShow]
                for(let i=0;i<props.productShow;i++){
                    for(let j=0;j<myarray.length;j++){
                        if(productShow.unique===myarray[j].unique){
                            productShow.splice(productShow.unique,1,myarray[j])
                        }
                    }
                }
                props.setProductShow(productShow)
                handleCloseModalChangeGeneral()
                value.showToastMessage("Cập nhật số lượng và giá thành công!")
                props.setChangeDone(true)
            },1000)
        }
    }

    const handleCloseModalChangeGeneral = () => {
        let modal = document.querySelector('.modal');
        const modal_container = document.querySelector('.modal-container')
        modal_container.style.animation = 'hideModal 0.5s ease-in-out'
        setTimeout(() => {
            modal.style.display = 'none'
            modal_container.style.animation = ''
            props.handleCloseModalChangeGeneral()
        }, 500)
    }

    const validate=()=>{
        let count=0;
        const priceDOC=document.querySelector('.price')
        const error=document.querySelector('.error')
        if(price===''){
            error.textContent='Chưa nhập đơn giá!'
            priceDOC.style.border='solid #fe4847 1px'
            count++;
        }else{
            if(isNaN(price)){
                error.textContent='Đơn giá phải là số!'
                priceDOC.style.border='solid #fe4847 1px'
                count++;
            }else{
                error.textContent=''
                priceDOC.style.border=''
            }
        }
        return count
    }

    return(
        <>
            {loading && <Loading/>}
            <div className="modal fixed bottom-0 top-0 left-0 right-0 z-20 bg-[rgba(0,0,0,0.4)]">
                <div className="flex justify-center items-center h-full">
                    <div className="modal-container p-[20px] bg-[#fff] rounded-[5px]">
                        <div className="mb-[10px] flex justify-between">
                            <div>
                                <span>Chỉnh sửa giá và số lượng sản phẩm</span>
                            </div>
                            <div className="cursor-pointer">
                                <i onClick={handleCloseModalChangeGeneral} className="fa-solid fa-xmark"></i>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 text-[14px]">
                            <div className="flex items-center">
                                <div className="mb-[5px] mt-[10px]">
                                    <span className="text-primary-red">* </span>
                                    <span className="titleName">Số lượng</span>
                                </div>
                                <p className="namevld mb-[5px] mt-[10px] text-primary-red ml-[5px]"></p>
                            </div>
                            <input type="number" value={quantity} onChange={(e)=>{setQuantity(e.target.value)}}
                                   className="w-[400px] h-[30px] pl-[5px] focus:outline-none focus:border-[#bfdcf6] border-[#999] border-[1px] rounded-[5px]"
                                   placeholder="Nhập số lượng"/>
                        </div>
                        <div className="grid grid-cols-1 text-[14px]">
                            <div className="flex items-center">
                                <div className="mb-[5px] mt-[10px]">
                                    <span className="text-primary-red">* </span>
                                    <span className="titleName">Đơn Giá</span>
                                    <span className="error text-primary-red ml-[5px]"></span>
                                </div>
                                <p className="namevld mb-[5px] mt-[10px] text-primary-red ml-[5px]"></p>
                            </div>
                            <input type="text" value={price} onChange={(e)=>{setPrice(e.target.value)}}
                                   className="price w-[400px] h-[30px] pl-[5px] focus:outline-none focus:border-[#bfdcf6] border-[#999] border-[1px] rounded-[5px]"
                                   placeholder="Nhập đơn giá"/>
                        </div>
                        <div className="text-[#fff] flex justify-between mt-[20px]">
                            <div>
                            </div>
                            <div>
                                <button onClick={handleChangeGeneral}
                                        className="hover:opacity-[0.8] ease-in-out duration-[0.5s] bg-[#1677ff] py-[5px] px-[25px] rounded-[7px]">Cập nhật
                                </button>
                                <button onClick={handleCloseModalChangeGeneral} className="hover:opacity-[0.8] ease-in-out duration-[0.5s] bg-primary-red py-[5px] px-[20px] rounded-[7px] ml-[10px]">Hủy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalChangeGeneral