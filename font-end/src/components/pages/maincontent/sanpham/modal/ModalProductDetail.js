import {useEffect, useState} from "react";
import productImageService from "../../../../services/ProductImageService";
import brandService from "../../../../services/brandService";
import materialService from "../../../../services/materialService";
import colorService from "../../../../services/colorService";
import soleService from "../../../../services/soleService";
import categoryService from "../../../../services/categoryService";
import sizeService from "../../../../services/sizeService";
import AddModalEntity from "./AddModalEntity";
import AddModalColor from "./AddModalColor";
import AddModalSize from "./AddModalSize";


const ModalProductDetail=(props)=>{
    const [name,setName]=useState('')
    const [description,setDescription]=useState('')
    const [brand,setBrand]=useState('')
    const [material,setMaterial]=useState('')
    const [gender,setGender]=useState('')
    const [color,setColor]=useState('')
    const [quantity,setQuantity]=useState('')
    const [status,setStatus]=useState('')
    const [sole,setSole]=useState('')
    const [category,setCategory]=useState('')
    const [size,setSize]=useState('')
    const [price,setPrice]=useState('')
    const [listBrand,setListBrand]=useState([])
    const [listMaterial,setListMaterial]=useState([])
    const [listColor,setListColor]=useState([])
    const [listSole,setListSole]=useState([])
    const [listCategory,setListCategory]=useState([])
    const [listSize,setListSize]=useState([])
    const [listImage,setListImage]=useState([])
    const [openAddModalEntity,setOpenAddModalEntity]=useState(false)
    const [openAddModalColor,setOpenAddModalColor]=useState(false)
    const [openAddModalSize,setOpenAddModalSize]=useState(false)
    const [whatActionEntity,setWhatActionEntity]=useState('')





    useEffect(() => {
        const API=async ()=>{
            await callAPIEntity()
            await callAPIProductDetail()
            await callAPIImage();
            await selectedEntity();
        }
        API();
    }, []);

    const callAPIProductDetail=async ()=>{
        productImageService.getProductDetail(props.productDetailId).then(res=>{
            const productDetail=res.data
            setName(productDetail.name)
            setDescription(productDetail.description)
            setBrand(productDetail.brand_name)
            setMaterial(productDetail.material_name)
            setGender(productDetail.gender)
            setColor(productDetail.color_name)
            setQuantity(productDetail.quantity)
            setStatus(productDetail.status)
            setSole(productDetail.sole_name)
            setCategory(productDetail.category_name)
            setSize(productDetail.size)
            setPrice(productDetail.price)
        }).catch(e=>{
            console.log(e)
        })
    }

    const selectedEntity=()=>{
        let brandDOC=document.querySelectorAll('.thuonghieu option')
        let materialDOC=document.querySelectorAll('.chatlieu option')
        let genderDOC=document.querySelectorAll('.gioitinh option')
        let colorDOC=document.querySelectorAll('.mausac option')
        let statusDOC=document.querySelectorAll('.trangthai option')
        let soleDOC=document.querySelectorAll('.degiay option')
        let categoryDOC=document.querySelectorAll('.theloai option')
        let sizeDOC=document.querySelectorAll('.kichco option')
        productImageService.getProductDetail(props.productDetailId).then(res=>{
            const productDetail=res.data
            selected(brandDOC,productDetail.brand_name)
            selected(materialDOC,productDetail.material_name)
            selected(genderDOC,productDetail.gender ? 'true' : 'false')
            selected(statusDOC,productDetail.status ? 'true' : 'false')
            selected(colorDOC,productDetail.color_name)
            selected(soleDOC,productDetail.sole_name)
            selected(categoryDOC,productDetail.category_name)
            selected(sizeDOC,productDetail.size)
        }).catch(e=>{
            console.log(e)
        })
    }

    const selected=(list,entity)=>{
        for(let i=0;i<list.length;i++){
            if(entity===list.item(i).value){
                list.item(i).selected=true
            }
        }
    }

    const callAPIEntity= async ()=>{
        await brandService.getAll().then(res=>{
            setListBrand(res.data)
        }).catch(e=>{
            console.log(e)
        })

        await materialService.getAll().then(res=>{
            setListMaterial(res.data)
        }).catch(e=>{
            console.log(e)
        })
        await colorService.getAll().then(res=>{
            setListColor(res.data)
        }).catch(e=>{
            console.log(e)
        })

        await soleService.getAll().then(res=>{
            setListSole(res.data)
        }).catch(e=>{
            console.log(e)
        })

        await categoryService.getAll().then(res=>{
            setListCategory(res.data)
        }).catch(e=>{
            console.log(e)
        })

        await sizeService.getAll().then(res=>{
            setListSize(res.data)
        }).catch(e=>{
            console.log(e)
        })
    }

    const callAPIImage=()=>{
        productImageService.getListImage(props.productDetailId).then(res=>{
            setListImage(res.data)
        }).catch(e=>{
            console.log(e)
        })
    }

    const handleClose = () => {
        let modal = document.querySelector('.modal');
        const modal_container=document.querySelector('.modal-container')
        modal_container.style.animation = 'hideModal 0.5s ease-in-out'
        setTimeout(() => {
            modal.style.display = 'none'
            modal_container.style.animation = ''
            props.setOpenModalProductDetail(false)
        }, 500)
    }

    const addListEntity=(entity)=>{
        if(whatActionEntity==='brand'){
            setListBrand([entity,...listBrand])
        }else if(whatActionEntity==='material'){
            setListMaterial([entity,...listMaterial])
        }else if(whatActionEntity==='sole'){
            setListSole([entity,...listSole])
        }else if(whatActionEntity==='category'){
            setListCategory([entity,...listCategory])
        }
    }

    const addListColor=(color)=>{
        setListColor([color,...listColor])
    }
    const addListSize=(size)=>{
        setListSize([size,...listSize])
    }

    const handleOpenModalBrand=()=>{
        setOpenAddModalEntity(true)
        setWhatActionEntity('brand')
    }
    const handleOpenModalSole=()=>{
        setOpenAddModalEntity(true)
        setWhatActionEntity('sole')
    }
    const handleOpenModalMaterial=()=>{
        setOpenAddModalEntity(true)
        setWhatActionEntity('material')
    }
    const handleOpenModalCategory=()=>{
        setOpenAddModalEntity(true)
        setWhatActionEntity('category')
    }

    const handleCloseModal=()=>{
        setOpenAddModalEntity(false)
    }
    const handleCloseAddColor=()=>{
        setOpenAddModalColor(false)
    }
    const handleCloseAddSize=()=>{
        setOpenAddModalSize(false)
    }


    const handleUpdateProduct=()=>{
        const productUpdateRequest={
            name:name,
            description:description,
            brand_name:brand,
            material_name:material,
            gender:gender==='true' ? true : false,
            color_name:color,
            quantity:quantity,
            status:status,
            sole_name:sole,
            category_name:category,
            size_name:size,
            price:price
        }
        console.log(productUpdateRequest)
    }

    return(
        <>
            {openAddModalSize && <AddModalSize addListSize={addListSize} handleCloseAddSize={handleCloseAddSize}/>}
            {openAddModalColor && <AddModalColor addListColor={addListColor} handleCloseAddColor={handleCloseAddColor}/>}
            {openAddModalEntity && <AddModalEntity whatActionEntity={whatActionEntity} handleCloseModal={handleCloseModal} addListEntity={addListEntity}/>}
            <div className="modal fixed bottom-0 top-0 left-0 right-0 z-2 bg-[rgba(0,0,0,0.4)]">
                <div className="flex justify-center items-center h-full">
                    <div className="modal-container w-[1200px] h-[600px] overflow-y-scroll p-[20px] bg-[#fff] rounded-[5px]">
                        {/*header*/}
                        <div className="flex justify-between">
                            <div></div>
                            <div><i onClick={handleClose} className="cursor-pointer fa-solid fa-xmark"></i></div>
                        </div>

                        <div className="flex justify-center mb-[20px]">
                            <span className="font-bold text-[20px]">Thông Tin Sản Phẩm</span>
                        </div>
                        {/*body*/}
                        <div className="body">
                            <div className="grid grid-cols-1 mb-[25px]">
                                <div className="flex items-center">
                                    <p className="w-fit font-[600]"><span className="text-primary-red">*</span> Tên
                                        sản phẩm:</p>
                                    <input onChange={(e)=>{setName(e.target.value)}} value={name} className="name flex-1 ml-[5px] border-[1px] border-[#999] rounded-[5px] outline-none pl-[10px] py-[5px] text-[13px]"
                                           type="text" placeholder="Nhập tên sản phẩm"/>
                                </div>
                            </div>

                            {/*Mô Tả*/}
                            <div className="grid grid-cols-1 mb-[50px]">
                                <div className="flex">
                                    <p className="w-fit font-[600]"><span className="text-primary-red">*</span> Mô tả:</p>
                                    <textarea onChange={(e)=>{setDescription(e.target.value)}} value={description} className="mota flex-1 ml-[5px] border-[1px] border-[#999] rounded-[5px] outline-none pl-[10px] py-[5px] text-[13px] h-[100px]"
                                              type="text" placeholder="Nhập mô tả sản phẩm">
                                        </textarea>
                                </div>
                            </div>
                            {/*Thêm Entity*/}
                            <div className="grid grid-cols-2">
                                {/*Set width cho cột 1*/}
                                <div className="w-[90%]">

                                    {/*Thêm Thương Hiệu*/}
                                    <div className="flex items-center mb-[20px]">
                                        <p className="w-fit font-[600]"><span
                                            className="text-primary-red">*</span> Thương hiệu:</p>
                                        <select onChange={(e)=>{setBrand(e.target.value)}}
                                            className="thuonghieu flex-1 ml-[5px] border-[1px] border-[#999] rounded-[5px] outline-none pl-[10px] py-[5px] text-[#999] text-[13px]">
                                            <option value="">--Chọn thương hiệu--</option>
                                            {listBrand.map((item,index)=>{
                                                return(
                                                    <>
                                                        <option key={index}>{item.name}</option>
                                                    </>
                                                )
                                            })}
                                        </select>
                                        <button onClick={handleOpenModalBrand}
                                            className="outline-none ml-[10px] py-[2px] px-[8px] bg-[#0f6eea] rounded-[5px]">
                                            <i className="text-[#fff] fa-solid fa-plus"></i></button>
                                    </div>

                                    {/*Thêm Chất Liệu*/}
                                    <div className="flex items-center mb-[20px]">
                                        <p className="w-fit font-[600]"><span
                                            className="text-primary-red">*</span> Chất liệu:</p>
                                        <select onChange={(e)=>{setMaterial(e.target.value)}}
                                            className="chatlieu flex-1 ml-[5px] border-[1px] border-[#999] rounded-[5px] outline-none pl-[10px] py-[5px] text-[#999] text-[13px]">
                                            <option value="">--Chọn chất liệu--</option>
                                            {listMaterial.map((item,index)=>{
                                                return(
                                                    <>
                                                        <option key={index}>{item.name}</option>
                                                    </>
                                                )
                                            })}
                                        </select>
                                        <button onClick={handleOpenModalMaterial}
                                            className="ml-[10px] py-[2px] px-[8px] bg-[#0f6eea] rounded-[5px]">
                                            <i className="text-[#fff] fa-solid fa-plus"></i></button>
                                    </div>

                                    {/*Thêm Giới Tính*/}
                                    <div className="flex items-center mb-[20px]">
                                        <p className="w-fit font-[600]"><span
                                            className="text-primary-red">*</span> Giới tính:</p>
                                        <select onChange={(e)=>{setGender(e.target.value)}}
                                            className="gioitinh flex-1 ml-[5px] border-[1px] border-[#999] rounded-[5px] outline-none pl-[10px] py-[5px] text-[#999] text-[13px]">
                                            <option value="">--Chọn giới tính--</option>
                                            <option value="true">Nam</option>
                                            <option value="false">Nữ</option>
                                        </select>
                                        <button
                                            className="ml-[10px] py-[2px] px-[8px] bg-[#0f6eea] rounded-[5px]">
                                            <i className="text-[#fff] fa-solid fa-plus"></i></button>
                                    </div>
                                    {/*Thêm Màu Sắc*/}
                                    <div className="flex items-center mb-[20px]">
                                        <p className="w-fit font-[600]"><span
                                            className="text-primary-red">*</span> Màu sắc:</p>
                                        <select onChange={(e)=>{setColor(e.target.value)}}
                                            className="mausac flex-1 ml-[5px] border-[1px] border-[#999] rounded-[5px] outline-none pl-[10px] py-[5px] text-[#999] text-[13px]">
                                            <option value="">--Chọn màu sắc--</option>
                                            {listColor.map((item,index)=>{
                                                return(
                                                    <>
                                                        <option key={index} style={{background:item.code}}>{item.name}</option>
                                                    </>
                                                )
                                            })}
                                        </select>
                                        <button onClick={()=>setOpenAddModalColor(true)}
                                            className="ml-[10px] py-[2px] px-[8px] bg-[#0f6eea] rounded-[5px]">
                                            <i className="text-[#fff] fa-solid fa-plus"></i></button>
                                    </div>
                                    {/*Thêm So Luong*/}
                                    <div className="flex items-center mb-[20px]">
                                        <p className="w-fit font-[600]"><span
                                            className="text-primary-red">*</span> Số lượng:</p>
                                        <input onChange={(e)=>{setQuantity(e.target.value)}} value={quantity}
                                            className="soluong flex-1 ml-[5px] border-[1px] border-[#999] rounded-[5px] outline-none pl-[10px] py-[5px] text-[13px]"
                                            type="text" placeholder="Nhập số lượng bán"/>
                                    </div>
                                </div>
                                {/*Set width cho cột 2*/}
                                <div className="w-[90%]">
                                    {/*Thêm Trạng Thái*/}
                                    <div className="flex items-center mb-[20px]">
                                        <p className="w-fit font-[600]"><span
                                            className="text-primary-red">*</span> Trạng thái:</p>
                                        <select onChange={(e)=>{setStatus(e.target.value)}}
                                            className="trangthai flex-1 ml-[5px] border-[1px] border-[#999] rounded-[5px] outline-none pl-[10px] py-[5px] text-[#999] text-[13px]">
                                            <option value="">--Chọn trạng thái--</option>
                                            <option value="true">Kinh Doanh</option>
                                            <option value="false">Ngưng Kinh Doanh</option>
                                        </select>
                                        <button
                                            className="ml-[10px] py-[2px] px-[8px] bg-[#0f6eea] rounded-[5px]">
                                            <i className="text-[#fff] fa-solid fa-plus"></i></button>
                                    </div>

                                    {/*Thêm Đế Giày*/}
                                    <div className="flex items-center mb-[20px]">
                                        <p className="w-fit font-[600]"><span
                                            className="text-primary-red">*</span> Đế giày:</p>
                                        <select onChange={(e)=>{setSole(e.target.value)}}
                                            className="degiay flex-1 ml-[5px] border-[1px] border-[#999] rounded-[5px] outline-none pl-[10px] py-[5px] text-[#999] text-[13px]">
                                            <option value="">--Chọn Đế Giày--</option>
                                            {listSole.map((item,index)=>{
                                                return(
                                                    <>
                                                        <option key={index}>{item.name}</option>
                                                    </>
                                                )
                                            })}
                                        </select>
                                        <button onClick={handleOpenModalSole}
                                            className="ml-[10px] py-[2px] px-[8px] bg-[#0f6eea] rounded-[5px]">
                                            <i className="text-[#fff] fa-solid fa-plus"></i></button>
                                    </div>

                                    {/*Thêm Thể Loại*/}
                                    <div className="flex items-center mb-[20px]">
                                        <p className="w-fit font-[600]"><span
                                            className="text-primary-red">*</span> Thể loại:</p>
                                        <select onChange={(e)=>{setCategory(e.target.value)}}
                                            className="theloai flex-1 ml-[5px] border-[1px] border-[#999] rounded-[5px] outline-none pl-[10px] py-[5px] text-[#999] text-[13px]">
                                            <option value="">--Chọn thể loại--</option>
                                            {listCategory.map((item,index)=>{
                                                return(
                                                    <>
                                                        <option key={index}>{item.name}</option>
                                                    </>
                                                )
                                            })}
                                        </select>
                                        <button onClick={handleOpenModalCategory}
                                            className="ml-[10px] py-[2px] px-[8px] bg-[#0f6eea] rounded-[5px]">
                                            <i className="text-[#fff] fa-solid fa-plus"></i></button>
                                    </div>
                                    {/*Thêm Kích Cỡ*/}
                                    <div className="flex items-center mb-[20px]">
                                        <p className="w-fit font-[600]"><span
                                            className="text-primary-red">*</span> Kích cỡ:</p>
                                        <select onChange={(e)=>{setSize(e.target.value)}}
                                            className="kichco flex-1 ml-[5px] border-[1px] border-[#999] rounded-[5px] outline-none pl-[10px] py-[5px] text-[#999] text-[13px]">
                                            <option value="">--Chọn kích cỡ--</option>
                                            {listSize.map((item,index)=>{
                                                return(
                                                    <>
                                                        <option key={index}>{item.name}</option>
                                                    </>
                                                )
                                            })}
                                        </select>
                                        <button onClick={()=>setOpenAddModalSize(true)}
                                            className="ml-[10px] py-[2px] px-[8px] bg-[#0f6eea] rounded-[5px]">
                                            <i className="text-[#fff] fa-solid fa-plus"></i></button>
                                    </div>
                                    {/*Thêm Giá Bán*/}
                                    <div className="flex items-center mb-[20px]">
                                        <p className="w-fit font-[600]"><span
                                            className="text-primary-red">*</span> Giá bán:</p>
                                        <input onChange={(e)=>{setPrice(e.target.value)}} value={price}
                                            className="gia flex-1 ml-[5px] border-[1px] border-[#999] rounded-[5px] outline-none pl-[10px] py-[5px] text-[13px]"
                                            type="text" placeholder="Nhập giá bán"/>
                                    </div>
                                    {/*QR Code*/}
                                    <div className="flex mb-[20px]">
                                        <p className="w-fit font-[600]"><span
                                            className="text-primary-red">*</span> QR Code:</p>
                                        <img className="w-[200px] object-cover" src="/logo.png"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*footer*/}
                        <div className="grid grid-cols-1 mt-[30px]">
                            <p className="text-center font-bold text-[20px]">Ảnh Sản Phẩm</p>
                            <div className="grid grid-cols-10 gap-[20px] mt-[20px]">
                                {listImage.map((item,index)=>{
                                    return(
                                        <img key={index} className="h-[100px] w-[100px] border-[1px] border-[#999] py-[5px] px-[10px] rounded-[5px] object-contain" src={`http://localhost:8080/product-detail-image/img/`+item.image} alt=""/>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="flex justify-between mt-[20px]">
                            <div></div>
                            <div>
                                <button onClick={handleClose} className="border-[1px] border-[#999] px-[15px] py-[5px] rounded-[5px] text-[13px]">Hủy</button>
                                <button onClick={handleUpdateProduct} className=" ml-[10px] hover:opacity-[0.8] ease-in-out duration-[0.5s] bg-primary-blue text-[#fff] px-[15px] py-[5px] rounded-[5px] text-[13px]">Chỉnh sửa</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalProductDetail