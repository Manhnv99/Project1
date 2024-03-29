import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import productImageService from "../../../services/ProductImageService";
import ModalChangeGeneral from "./modal/ModalChangeGeneral";
import {Context} from "../../../provider/provider";
import ModalProductDetail from "./modal/ModalProductDetail";


const UpdateSanPham = () => {
    const nav=useNavigate();
    const {id}=useParams();
    const value=useContext(Context)
    const [listProductImage,setListProductImage]=useState([])
    const [openModalChangeGeneral,setOpenModalChangeGeneral]=useState(false)
    const [openModalProductDetail,setOpenModalProductDetail]=useState(false)
    const [listIdChangeGeneral,setListIdChangeGeneral]=useState([])
    const [changeDone,setChangeDone]=useState(false)
    const [productDetailId,setProductDetailId]=useState('')


    useEffect(() => {
        callAPI();
    }, []);

    useEffect(() => {
        const checkbox=document.querySelectorAll('.checkbox')
        for(let i=0;i<checkbox.length;i++){
            checkbox[i].checked=false
        }
        setListIdChangeGeneral([])
        setChangeDone(false)
    }, [changeDone]);


    const callAPI=()=>{
        productImageService.getListProductDetail(id).then(res=>{
            setListProductImage(res.data)
        }).catch(e=>{
            console.log(e)
        })
    }

    const handleCloseModalChangeGeneral=()=>{
        setOpenModalChangeGeneral(false)
    }
    const handleOpenModalChangeGeneral=()=>{
        if(listIdChangeGeneral.length===0){
            value.showToastMessage("Chưa Chọn Sản Phẩm Nào")
        }else{
            setOpenModalChangeGeneral(true)
        }
    }

    const handleGetToChangeGeneral=(id)=>{
        if(!listIdChangeGeneral.includes(id)){
            setListIdChangeGeneral([id,...listIdChangeGeneral])
        }else{
            setListIdChangeGeneral(listIdChangeGeneral.filter(item=>item!==id))
        }
    }

    const handleOpenModalDetailProduct= async (productDetail_id)=>{
        await setProductDetailId(productDetail_id)
        await setOpenModalProductDetail(true)
    }



    const test=()=>{
        console.log(listIdChangeGeneral)
    }

    return (
        <>
            <button onClick={test}>Test</button>
            {openModalProductDetail && <ModalProductDetail idProduct={id} productDetailId={productDetailId} setOpenModalProductDetail={setOpenModalProductDetail}/>}
            {openModalChangeGeneral && <ModalChangeGeneral setChangeDone={setChangeDone} callAPI={callAPI} whatAction={"update"} handleCloseModalChangeGeneral={handleCloseModalChangeGeneral} listIdChangeGeneral={listIdChangeGeneral}/>}
            <div className="">
                <div className="p-[20px]">
                    <div className="title mb-[20px]">
                        <i className="fa-solid fa-box-open text-[25px]"></i>
                        <span className="text-[22px] font-bold ml-[10px]">Quản lý sản phẩm chi tiết</span>
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
                                        <span className="text-[#444] text-[14px] font-[500]">Tên sản phẩm :</span>
                                        <input className="ml-[10px] pl-[10px] h-[30px] w-[300px] border-[1px] border-[#999] border-solid rounded-[5px] focus:outline-none
                                        text-[#444] text-[13px]" type="text" placeholder="Tìm Kiếm"/>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-[#444] text-[14px] font-[500]">Trạng thái :</span>
                                        <select
                                            className="ml-[10px] h-[30px] w-[300px] border-[1px] border-[#999] border-solid rounded-[5px] focus:outline-none text-[#444] text-[13px]">
                                            <option>Tất Cả</option>
                                            <option>Đang Sử Dụng</option>
                                            <option>Ngưng Sử Dụng</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="text-[14px] mt-[20px] text-center py-[20px]">
                                    <button className="hover:opacity-[0.8] ease-in-out duration-[0.5s] py-[7px] px-[20px] bg-primary-blue text-[#fff] rounded-[5px]">
                                        Tìm kiếm
                                    </button>
                                    <button
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
                                    <span className="text-[17px] font-[500] ml-[5px]">Danh sách sản phẩm chi tiết</span>
                                </div>
                                <div>
                                    <button className="hover:opacity-[0.8] ease-in-out duration-[0.5s] text-[#fff] bg-primary-blue py-[7px] px-[20px] rounded-[7px]">
                                        <span onClick={handleOpenModalChangeGeneral} className="text-[15px] ml-[5px]">Chỉnh số lượng và giá chung </span>
                                    </button>
                                </div>
                            </div>
                            <div>
                            <table className="w-full text-[14px]">
                                    <thead>
                                    <tr className="bg-primary-orange text-[#fff] text-[13px] font-[400]">
                                        <th className="w-1/12 border-r-[1px] border-solid border-[#fff] py-[10px]">
                                            <div className="flex items-center">
                                                <input type="checkbox"/>
                                                <span className="ml-[25px]">STT</span>
                                            </div>
                                        </th>
                                        <th className="w-2/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Ảnh
                                        </th>
                                        <th className="w-2/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Tên
                                            sản phẩm
                                        </th>
                                        <th className="w-1/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Số
                                            lượng tồn
                                        </th>
                                        <th className="w-1/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Giá
                                            bán
                                        </th>
                                        <th className="w-1/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Kích
                                            thước
                                        </th>
                                        <th className="w-1/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Màu Sắc
                                        </th>
                                        <th className="w-2/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Trạng Thái
                                        </th>
                                        <th className="w-1/12">Hành động</th>
                                    </tr>
                                    </thead>
                                <tbody className="">
                                    {listProductImage.map((item,index)=>{
                                        return(
                                            <tr className="">
                                                <td className="text-center py-[15px]">
                                                    <div className="flex items-center">
                                                        <input onClick={()=>{handleGetToChangeGeneral(item.productDetail_id)}} className="checkbox" type="checkbox"/>
                                                        <span className="ml-[30px]">{index + 1}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-[10px]">
                                                    <div className="flex items-center justify-center">
                                                        <img className="h-[80px] rounded-[10px] object-cover" src={"http://localhost:8080/product-detail-image/img/"+ item.image}/>
                                                    </div>
                                                </td>
                                                <td className="text-center px-4 py-[15px]">{item.name}</td>
                                                <td className="text-center px-4 py-[15px]">{item.quantity}</td>
                                                <td className="text-center px-4 py-[15px]">{item.price}</td>
                                                <td className="text-center px-4 py-[15px]">{item.size}</td>
                                                <td className="text-center px-4 py-[15px]">
                                                    <span style={{backgroundColor:`${item.color_code}`}} className="py-[15px] rounded-[5px] block"></span>
                                                </td>
                                                <td className="text-center px-4 py-[15px]">
                                                    {item.status ? <span
                                                            className="bg-primary-green px-[10px] py-[10px] rounded-[10px] text-[#fff]">Đang kinh doanh</span> :
                                                        <span
                                                            className="bg-primary-red px-[10px] py-[10px] rounded-[10px] text-[#fff]">Ngưng kinh doanh</span>}
                                                </td>
                                                <td className="text-center px-4 py-[15px]">
                                                    <i onClick={()=>{handleOpenModalDetailProduct(item.productDetail_id)}} className="hover:opacity-[0.8] ease-in-out duration-[0.5s] fa-regular fa-eye py-[7px] px-[12px] rounded-[5px] bg-[#e48902] text-[#fff] cursor-pointer"></i>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                                <div className="flex justify-between py-[20px] px-[20px]">
                                    <div></div>
                                    <div>
                                        <span className="mr-[10px] cursor-pointer">
                                            <i className="fa-solid fa-chevron-left text-primary-orange"></i></span>
                                        <span className="activeMovePage movePage page mx-[5px] cursor-pointer px-[10px] py-[4px] text-primary-orange">1</span>
                                        <span className="ml-[10px] cursor-pointer">
                                            <i className="fa-solid fa-chevron-right text-primary-orange"></i>
                                        </span>
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
export default UpdateSanPham