import {useContext, useEffect, useState} from "react";
import brandService from "../../../services/brandService";
import categoryService from "../../../services/categoryService";
import materialService from "../../../services/materialService";
import soleService from "../../../services/soleService";
import AddModalEntity from "./modal/AddModalEntity";
import AddModalSize from "./modal/AddModalSize";
import AddModalColor from "./modal/AddModalColor";
import './css/sanpham.css'
import productService from "../../../services/productService";
import productDetailService from "../../../services/productDetailService";
import {Context} from "../../../provider/provider";
import ModalChangeGeneral from "./modal/ModalChangeGeneral";
import ModalDetailImage from "./modal/ModalDetailImage";
import productImageService from "../../../services/ProductImageService";
import {useNavigate} from "react-router-dom";
import Loading from "../loading/loading";


const AddSanPham=()=>{
    const value=useContext(Context)
    const nav=useNavigate()
    const [name,setName]=useState('')
    const [description,setDescription]=useState('')
    const [idBrand,setIdBrand] =useState('')
    const [idMaterial,setIdMaterial] =useState('')
    const [idSole,setIdSole]=useState('')
    const [idCategory,setIdCategory]=useState('')
    const [gender,setGender]=useState('')
    const [status,setStatus]=useState('')
    const [listBrand,setListBrand]=useState([])
    const [listMaterial,setListMaterial]=useState([])
    const [listSole,setListSole]=useState([])
    const [listCategory,setListCategory]=useState([])
    const [openEntityModal,setOpenEntityModal]=useState(false)
    const [whatActionEntity,setWhatActionEntity]=useState('')
    const [openAddSize,setOpenAddSize]=useState(false)
    const [openAddColor,setOpenAddColor]=useState(false)
    const [listSize,setListSize]=useState([])
    const [listColor,setListColor]=useState([])
    const [productShow,setProductShow]=useState([])
    const uniqueColors=[...new Set(productShow.map(item=>item.color_code))]
    const [selectedImages, setSelectedImages] = useState([]);
    const [colorChoose,setColorChoose]=useState('')
    const [detailImage,setDetailImage]=useState('')
    const [openModalDetailImage,setOpenModalDetailImage]=useState(false)
    const [openModalChangeGeneral,setOpenModalChangeGeneral]=useState(false)
    const [listChangeGeneral,setListChangeGeneral]=useState([])
    const [changeDone,setChangeDone]=useState(false)
    const [loading,setLoading]=useState(false)






    useEffect(() => {
        CallApiEntity();
    },[]);

    useEffect(() => {
        if(validateShowProduct()===0 || listSize.length===0 || listColor.length===0){
            productShow.splice(0,productShow.length)
            let myarray=[...productShow]
            if(listSize.length===0 || listColor.length===0){
                setProductShow([])
            }else{
                let count=0
                for(let i=0;i<listColor.length;i++){
                    for(let j=0;j<listSize.length;j++){
                        const product={
                            unique:count++,
                            name:name+" "+"["+ listSize[j] +"-"+ listColor[i] +"]",
                            gender:gender,
                            description:description,
                            brand_id:idBrand,
                            material_id:idMaterial,
                            sole_id:idSole,
                            category_id:idCategory,
                            quantity:'1',
                            price:'1000000',
                            color_code:listColor[i],
                            size_name:listSize[j],
                        }
                        myarray.push(product)
                    }
                }
                setProductShow(myarray)
            }
        }
    }, [name,description,idBrand,idMaterial,gender,status,idSole,idCategory,listColor,listSize]);

    useEffect(()=>{
        const checkbox=document.querySelectorAll('.checkbox')
        for(let i=0;i<checkbox.length;i++){
            checkbox[i].checked=false
        }
        setListChangeGeneral([])
        setChangeDone(false)
    },[changeDone])

    const handleAddProduct= ()=>{
        setLoading(true)
        setTimeout(async ()=>{
            const productRequest={
                name:name,
                gender:gender==='false' ? false : true,
                description:description,
                brand_id:idBrand,
                material_id:idMaterial,
                sole_id:idSole,
                category_id:idCategory
            }
            //add product
            await productService.add(productRequest).then(res=>{
                for(let i=0;i<productShow.length;i++){
                    const listImageForColor1= selectedImages.filter((item=>item.color===productShow[i].color_code))
                    let productDetailRequest={
                        quantity:parseInt(productShow[i].quantity),
                        price:parseFloat(productShow[i].price),
                        product_id:res.data.id,
                        size_name:productShow[i].size_name,
                        color_code:productShow[i].color_code,
                        status:status==='false'?false:true,
                        image:listImageForColor1[0].file.name
                    }
                    addProductDetail(productDetailRequest)
                }
            }).catch(e=>{
                console.log(e)
            })
            await redirect();
        },2000)
    }
    //add product detail
    const addProductDetail=(productDetailRequest)=>{
        productDetailService.add(productDetailRequest).then(res=>{
            const data=res.data
            const listImageForColor= selectedImages.filter((item=>item.color===data.color_code))
            for(let j=0;j<listImageForColor.length;j++){
                const productDetailImageRequest={
                    productDetail_id:data.id,
                    image:listImageForColor[j].file.name
                }
                //addProductDetailImage
                productImageService.addProductImage(productDetailImageRequest).catch(e=>{console.log(e)})
                //lưu trữ ảnh lên server
                const formData=new FormData()
                formData.append('file',listImageForColor[j].file)
                productImageService.uploadProductImage(formData).catch(e=>console.log(e))
            }
        }).catch(e=>{
            console.log(e)
        })
    }
    //chuyển sang màn sản pham
    const redirect=async ()=>{
        await setLoading(false)
        await nav("/sanpham-management")
        await value.showToastMessage("Thêm Sản Phẩm Thành Công!")
    }

    const validateShowProduct=()=>{
        const nameDOC=document.querySelector('.name')
        const motaDOC=document.querySelector('.mota')
        const thuonghieuDOC=document.querySelector('.thuonghieu')
        const chatlieuDOC=document.querySelector('.chatlieu')
        const degiayDOC=document.querySelector('.degiay')
        const theloaiDOC=document.querySelector('.theloai')
        const gioitinhDOC=document.querySelector('.gioitinh')
        const trangthaiDOC=document.querySelector('.trangthai')


        let count=0;
        if(name===''){
            nameDOC.style.border="solid #fe4847 1px"
            count++;
        }else{
            nameDOC.style.border=""
            if(description===''){
                motaDOC.style.border="solid #fe4847 1px"
                count++;
            }else{
                motaDOC.style.border=""
                if(idBrand===''){
                    thuonghieuDOC.style.border="solid #fe4847 1px"
                    count++;
                }else{
                    thuonghieuDOC.style.border=""
                    if(idMaterial===''){
                        chatlieuDOC.style.border="solid #fe4847 1px"
                        count++;
                    }else{
                        chatlieuDOC.style.border=""
                        if(gender===''){
                            gioitinhDOC.style.border="solid #fe4847 1px"
                            count++;
                        }else{
                            gioitinhDOC.style.border=""
                            if(status===''){
                                trangthaiDOC.style.border="solid #fe4847 1px"
                                count++;
                            }else{
                                trangthaiDOC.style.border=""
                                if(idSole===''){
                                    degiayDOC.style.border="solid #fe4847 1px"
                                    count++;
                                }else{
                                    degiayDOC.style.border=""
                                    if(idCategory===''){
                                        theloaiDOC.style.border="solid #fe4847 1px"
                                        count++;
                                    }else{
                                        theloaiDOC.style.border=""
                                        if(listSize.length===0){
                                            count++;
                                        }else{
                                            if(listColor.length===0){
                                                count++;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return count;
    }


    const CallApiEntity= async ()=>{
        await brandService.getAll().then(res=>{
            setListBrand(res.data)
        }).catch(e=>{
            console.log(e)
        })

        await categoryService.getAll().then(res=>{
            setListCategory(res.data)
        }).catch(e=>{
            console.log(e)
        })

        await materialService.getAll().then(res=>{
            setListMaterial(res.data)
        }).catch(e=>{
            console.log(e)
        })

        await soleService.getAll().then(res=>{
            setListSole(res.data)
        }).catch(e=>{
            console.log(e)
        })

    }


    const handleOpenFile=()=>{
        document.querySelector('input[type="file"]').click();
    }

    const handleCloseModal=()=>{
        setOpenEntityModal(false)
    }

    const handleOpenBrandModal=()=>{
        setOpenEntityModal(true)
        setWhatActionEntity('brand')
    }

    const handleOpenMaterialModal=()=>{
        setOpenEntityModal(true)
        setWhatActionEntity('material')
    }

    const handleOpenSoleModal=()=>{
        setOpenEntityModal(true)
        setWhatActionEntity('sole')
    }

    const handleOpenCategoryModal=()=>{
        setOpenEntityModal(true)
        setWhatActionEntity('category')
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

    const handleCloseAddSize=()=>{
        setOpenAddSize(false)
    }

    const handleCloseAddColor=()=>{
        setOpenAddColor(false)
    }

    const showSizeChoosed= async (listSizeRequest)=> {
        let myarray=[...listSize]
        if(listSize.length!==0){
            for(let i=0;i<listSizeRequest.length;i++){
                if(!listSize.includes(listSizeRequest[i])){
                    myarray.push(listSizeRequest[i])
                }
            }
            setListSize(myarray)
        }else{
            setListSize(listSizeRequest)
        }
    }

    const showColorChoosed=(listColorRequest)=>{
        let myarray=[...listColor]
        if(listColor.length!==0){
            for(let i=0;i<listColorRequest.length;i++){
                if(!listColor.includes(listColorRequest[i])){
                    myarray.push(listColorRequest[i])
                }
            }
            setListColor(myarray)
        }else{
            setListColor(listColorRequest)
        }
    }


    const handleChangeQuantity=(value,index)=>{
        const updateProductShow=[...productShow]
        updateProductShow[index].quantity=value
        setProductShow(updateProductShow)
    }

    const handleChangePrice=(value,index)=>{
        const updateProductShow=[...productShow]
        updateProductShow[index].price=value
        setProductShow(updateProductShow)
    }


    const handleRemoveShowProduct=(color,index)=>{
        setProductShow(productShow.filter((item,count)=>count!==index))
        let count=0;
        for(let i=0;i<productShow.length;i++){
            if(productShow[i].color_code===color){
                count++;
            }
        }
        if(count===1){
            setListColor(listColor.filter((item)=>item!==color))
            setSelectedImages(selectedImages.filter((item)=>item.color!==color))
        }
    }

    const handleImageChange=(e)=>{
        const files = e.target.files;
        const imagesArray = [];
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            const file = files[i];
            let myarray=[...selectedImages]
            reader.onloadend = () => {
                imagesArray.push({ file, url: reader.result ,color:colorChoose});

                if (imagesArray.length === files.length) {
                    for(let i=0;i<imagesArray.length;i++){
                        myarray.push(imagesArray[i])
                    }
                    if(myarray.filter(item=>item.color===colorChoose).length<=6){
                        setSelectedImages(myarray);
                    }else{
                        value.showToastMessage("Không được thêm quá 6 ảnh!")
                    }
                }
            };

            reader.readAsDataURL(file);
        }
    }

    const handleRemoveListColor=(item)=>{
        setListColor(listColor.filter((items)=>item!==items))
        setSelectedImages(selectedImages.filter(colors=>colors.color!==item))
    }


    const handleShowDetailImage = (image) => {
        setDetailImage(image)
        setOpenModalDetailImage(true)
    }
    const handleCloseModalDetailImage=()=>{
        setOpenModalDetailImage(false)
    }

    const handleGetToChangeGeneral = (unique) => {
        if (!listChangeGeneral.includes(unique)) {
            setListChangeGeneral([unique,...listChangeGeneral])
        }else{
            setListChangeGeneral(listChangeGeneral.filter(item=>item!==unique))
        }
    }

    const handleCloseModalChangeGeneral=()=>{
        setOpenModalChangeGeneral(false)
    }


    return (
        <>
            {loading && <Loading/>}
            {openAddColor &&
                <AddModalColor handleCloseAddColor={handleCloseAddColor} showColorChoosed={showColorChoosed}/>}
            {openAddSize && <AddModalSize handleCloseAddSize={handleCloseAddSize} showSizeChoosed={showSizeChoosed}/>}
            {openEntityModal && <AddModalEntity handleCloseModal={handleCloseModal} whatActionEntity={whatActionEntity}
                                                addListEntity={addListEntity}/>}
            {openModalDetailImage && <ModalDetailImage handleCloseModalDetailImage={handleCloseModalDetailImage} detailImage={detailImage}/>}
            {openModalChangeGeneral && <ModalChangeGeneral whatAction={"add"}  handleCloseModalChangeGeneral={handleCloseModalChangeGeneral} listChangeGeneral={listChangeGeneral} productShow={productShow} setProductShow={setProductShow} setChangeDone={setChangeDone}/>}
            <div>
                <div className="p-[20px]">
                    {/*Thêm Sản Phẩm*/}
                    <div className="bg-[#fff] rounded-[5px]">
                        {/*Set width 80% và nằm ra giữa*/}
                        <div className="w-[80%] mx-auto pt-[70px] pb-[50px]">
                            {/*Title*/}
                            <div className="grid grid-cols-1 text-center">
                                <p className="font-bold text-[23px]">Thêm Sản Phẩm</p>
                            </div>

                            <div className="mt-[30px]">
                                {/*Tên Sản Phẩm*/}
                                <div className="grid grid-cols-1 mb-[25px]">
                                    <div className="flex items-center">
                                        <p className="w-fit font-[600]"><span className="text-primary-red">*</span> Tên
                                            sản phẩm:</p>
                                        <input onChange={(e)=>{setName(e.target.value)}}
                                            className="name flex-1 ml-[5px] border-[1px] border-[#999] rounded-[5px] outline-none pl-[10px] py-[5px] text-[13px]"
                                            type="text" placeholder="Nhập tên sản phẩm"/>
                                    </div>
                                </div>
                                {/*Mô Tả*/}
                                <div className="grid grid-cols-1 mb-[50px]">
                                    <div className="flex">
                                        <p className="w-fit font-[600]"><span className="text-primary-red">*</span> Mô tả:</p>
                                        <textarea onChange={(e)=>{setDescription(e.target.value)}} className="mota flex-1 ml-[5px] border-[1px] border-[#999] rounded-[5px] outline-none pl-[10px] py-[5px] text-[13px] h-[150px]"
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
                                            <select onChange={(e)=>{setIdBrand(e.target.value)}}
                                                className="thuonghieu flex-1 ml-[5px] border-[1px] border-[#999] rounded-[5px] outline-none pl-[10px] py-[5px] text-[#999] text-[13px]">
                                                <option value="">--Chọn thương hiệu--</option>
                                                {listBrand.map((item,index)=> {
                                                    if(item.status){
                                                        return(
                                                            <option key={index} value={item.id}>{item.name}</option>
                                                        )
                                                    }
                                                })}
                                            </select>
                                            <button onClick={handleOpenBrandModal}
                                                className="outline-none ml-[10px] py-[2px] px-[8px] bg-[#0f6eea] rounded-[5px]">
                                                <i className="text-[#fff] fa-solid fa-plus"></i></button>
                                        </div>

                                        {/*Thêm Chất Liệu*/}
                                        <div className="flex items-center mb-[20px]">
                                            <p className="w-fit font-[600]"><span
                                                className="text-primary-red">*</span> Chất liệu:</p>
                                            <select onChange={(e)=>{setIdMaterial(e.target.value)}}
                                                className="chatlieu flex-1 ml-[5px] border-[1px] border-[#999] rounded-[5px] outline-none pl-[10px] py-[5px] text-[#999] text-[13px]">
                                                <option value="">--Chọn chất liệu--</option>
                                                {listMaterial.map((item,index)=> {
                                                    if(item.status){
                                                        return(
                                                            <option key={index} value={item.id}>{item.name}</option>
                                                        )
                                                    }
                                                })}
                                            </select>
                                            <button onClick={handleOpenMaterialModal}
                                                className="ml-[10px] py-[2px] px-[8px] bg-[#0f6eea] rounded-[5px]">
                                                <i className="text-[#fff] fa-solid fa-plus"></i></button>
                                        </div>

                                        {/*Thêm Giới Tính*/}
                                        <div className="flex items-center mb-[20px]">
                                            <p className="w-fit font-[600]"><span
                                                className="text-primary-red">*</span> Giới tính:</p>
                                            <select onChange={(e) => {
                                                setGender(e.target.value)
                                            }}
                                                    className="gioitinh flex-1 ml-[5px] border-[1px] border-[#999] rounded-[5px] outline-none pl-[10px] py-[5px] text-[#999] text-[13px]">
                                                <option value="">--Chọn giới tính--</option>
                                                <option value="true">Nam</option>
                                                <option value="false">Nữ</option>
                                            </select>
                                            <button
                                                className="ml-[10px] py-[2px] px-[8px] bg-[#0f6eea] rounded-[5px]">
                                                <i className="text-[#fff] fa-solid fa-plus"></i></button>
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
                                            <select onChange={(e)=>{setIdSole(e.target.value)}}
                                                className="degiay flex-1 ml-[5px] border-[1px] border-[#999] rounded-[5px] outline-none pl-[10px] py-[5px] text-[#999] text-[13px]">
                                                <option value="">--Chọn Đế Giày--</option>
                                                {listSole.map((item,index)=> {
                                                    if(item.status){
                                                        return(
                                                            <option key={index} value={item.id}>{item.name}</option>
                                                        )
                                                    }
                                                })}
                                            </select>
                                            <button onClick={handleOpenSoleModal}
                                                className="ml-[10px] py-[2px] px-[8px] bg-[#0f6eea] rounded-[5px]">
                                                <i className="text-[#fff] fa-solid fa-plus"></i></button>
                                        </div>

                                        {/*Thêm Thể Loại*/}
                                        <div className="flex items-center mb-[20px]">
                                            <p className="w-fit font-[600]"><span
                                                className="text-primary-red">*</span> Thể loại:</p>
                                            <select onChange={(e)=>{setIdCategory(e.target.value)}}
                                                className="theloai flex-1 ml-[5px] border-[1px] border-[#999] rounded-[5px] outline-none pl-[10px] py-[5px] text-[#999] text-[13px]">
                                                <option value="">--Chọn thể loại--</option>
                                                {listCategory.map((item,index)=> {
                                                    if(item.status){
                                                        return(
                                                            <option key={index} value={item.id}>{item.name}</option>
                                                        )
                                                    }
                                                })}
                                            </select>
                                            <button onClick={handleOpenCategoryModal}
                                                className="ml-[10px] py-[2px] px-[8px] bg-[#0f6eea] rounded-[5px]">
                                                <i className="text-[#fff] fa-solid fa-plus"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Chọn Kích Cỡ Và Màu Sắc*/}
                    <div className="bg-[#fff] rounded-[5px] mt-[20px]">
                        <div className="p-[10px]">
                            {/*Title*/}
                            <div className="grid grid-cols-1 text-center">
                                <p className="font-bold text-[23px]">Kích Cỡ Và Màu Sắc</p>
                            </div>

                            {/* Chọn Kích Cỡ */}
                            <div className="grid grid-cols-1 mt-[60px] mb-[60px]">
                                <div className="flex">
                                    <p className="min-w-[100px]">Kích Cỡ :</p>
                                    {listSize.map((item,index)=>{
                                        return(
                                            <div key={index} className="styleSizeItem">
                                                <span className="text-[13px]">{item}</span>
                                                <span onClick={()=>{setListSize(listSize.filter((items)=>item!==items))}} className="hover:opacity-[0.8] ease-in-out duration-[0.3s] cursor-pointer absolute top-[-10px]">
                                                         <i className="text-primary-red fa-solid fa-circle-minus"></i>
                                                </span>
                                            </div>
                                        )
                                    })}
                                    <button onClick={() => {
                                        setOpenAddSize(true)
                                    }}
                                            className="hover:opacity-[0.8] ease-in-out duration-[0.5s] ml-[10px] py-[2px] px-[10px] bg-[#0f6eea] rounded-[5px]">
                                    <i className="text-[#fff] fa-solid fa-plus"></i></button>
                                </div>
                            </div>

                            {/* Chọn Màu Sắc */}
                            <div className="grid grid-cols-1 mb-[60px]">
                                <div className="flex ">
                                    <p className="min-w-[100px]">Màu Sắc :</p>
                                    {listColor.map((item,index)=>{
                                        return(
                                            <div key={index} style={{backgroundColor:item}} className="styleSizeItem">
                                                <span onClick={()=>{handleRemoveListColor(item)}} className="hover:opacity-[0.8] ease-in-out duration-[0.3s] cursor-pointer absolute top-[-10px]">
                                                    <i className="text-primary-red fa-solid fa-circle-minus"></i>
                                                </span>
                                            </div>
                                        )
                                    })}
                                    <button onClick={() => {
                                        setOpenAddColor(true)
                                    }}
                                            className="hover:opacity-[0.8] ease-in-out duration-[0.5s] ml-[10px] py-[2px] px-[10px] bg-[#0f6eea] rounded-[5px]">
                                        <i className="text-[#fff] fa-solid fa-plus"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Chi Tiết Sản Phẩm*/}
                    <div className="bg-[#fff] rounded-[5px] mt-[20px]">
                        <div className="p-[10px]">
                            {/*Title*/}
                            <div className="grid grid-cols-1 text-center">
                                <p className="font-bold text-[23px]">Chi Tiết Sản Phẩm</p>
                            </div>

                            {/*Chỉnh Và Thêm*/}
                            <div className="flex justify-between my-[30px]">
                                <div></div>
                                <div>
                                    <button onClick={()=>{listChangeGeneral.length>0 ? setOpenModalChangeGeneral(true) : value.showToastMessage("Chưa chọn sản phẩm để chỉnh sửa!")}}
                                        className="hover:opacity-[0.8] ease-in-out duration-[0.5s] ml-[10px] py-[8px] px-[15px] bg-[#0f6eea] rounded-[5px] text-[#fff] font-bold text-[14px]">Chỉnh
                                        số lượng và giá chung
                                    </button>
                                    <button onClick={handleAddProduct}
                                        className="hover:opacity-[0.8] ease-in-out duration-[0.5s] ml-[20px] py-[8px] px-[15px] bg-[#0f6eea] rounded-[5px] text-[#fff] font-bold text-[14px]">Hoàn
                                        Tất
                                    </button>
                                </div>
                            </div>

                            {/*Table*/}
                            <table className="w-full text-[14px]">
                                <thead>
                                <tr className="text-center bg-primary-orange text-[#fff] text-[13px] font-[400]">
                                    <th className="w-1/12 border-r-[1px] border-solid border-[#fff] py-[10px]">
                                        <div className="flex justify-center ">
                                            <input type="checkbox"/>
                                            <span>STT</span>
                                        </div>
                                    </th>
                                    <th className="w-3/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Tên
                                        sản phẩm
                                    </th>
                                    <th className="w-1/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Số
                                        lượng
                                    </th>
                                    <th className="w-2/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Giá bán
                                    </th>
                                    <th className="w-1/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Hành
                                        động
                                    </th>
                                    <th className="w-4/12">Upload Ảnh</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {listColor.length===0 || listSize.length===0 ? <></> :
                                        uniqueColors.map((color)=>{
                                            const sizeForColor=[...new Set(productShow.filter((item)=>item.color_code===color))]
                                            return(
                                                <>
                                                    {sizeForColor.map((item,index)=> (
                                                        <tr key={index}>
                                                            <td className="text-center px-4 py-[15px]">
                                                                <div>
                                                                    <input className="checkbox" onClick={()=>handleGetToChangeGeneral(item.unique)} type="checkbox" />
                                                                    <span>{item.unique+1}</span>
                                                                </div>
                                                            </td>
                                                            <td className=" px-4 py-[10px]">{item.name}</td>
                                                            <td className="text-center px-4 py-[15px]">
                                                                <input type="number" value={item.quantity}
                                                                       onChange={(e) => {
                                                                           handleChangeQuantity(e.target.value, index)
                                                                       }}
                                                                       className="block border-[1px] border-[#999] w-full rounded-[5px] py-[3px] outline-none"/>
                                                            </td>
                                                            <td className="text-center px-4 py-[15px]">
                                                                <input type="text" value={item.price} onChange={(e) => {
                                                                    handleChangePrice(e.target.value, index)
                                                                }}
                                                                       className="block border-[1px] border-[#999] w-full rounded-[5px] py-[3px] outline-none"/>
                                                            </td>
                                                            <td className="text-center px-4 py-[15px]">
                                                                <i onClick={() => {
                                                                    handleRemoveShowProduct(item.color_code, index)
                                                                }}
                                                                   className="hover:opacity-[0.8] ease-in-out duration-[0.5s] py-[7px] px-[12px] rounded-[5px] bg-primary-red text-[#fff] cursor-pointer fa-solid fa-trash"></i>
                                                            </td>
                                                            {index === 0 &&
                                                                <td rowSpan={sizeForColor.length}>
                                                                    <div className="p-[5px]">
                                                                        <input type="file" className="hidden" multiple
                                                                               onChange={(e) => {
                                                                                   handleImageChange(e)
                                                                               }}/>
                                                                        <div className="grid grid-cols-3 gap-[15px]">
                                                                            {selectedImages.map((image, index) => {
                                                                                if (image.color === item.color_code) {
                                                                                    return (
                                                                                        <div className="list_image">
                                                                                            <img key={index}
                                                                                                 src={image.url}
                                                                                                 className="w-full h-[80px] object-cover rounded-[5px]"/>
                                                                                            <div className="overlay">
                                                                                                <i onClick={() => handleShowDetailImage(image.url)}
                                                                                                   className="cursor-pointer fa-solid fa-eye"></i>
                                                                                                <i onClick={() => {
                                                                                                    setSelectedImages(selectedImages.filter((item, dem) => dem !== index))
                                                                                                }}
                                                                                                   className="ml-[10px] cursor-pointer fa-regular fa-trash-can"></i>
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                            })}
                                                                            {selectedImages.filter(colors=>colors.color===item.color_code).length!==6 &&
                                                                                <div onClick={handleOpenFile}
                                                                                     className="border-dashed border-[1px] border-[#999] w-full text-center rounded-[5px] cursor-pointer">
                                                                                    <div onClick={() => {
                                                                                        setColorChoose(item.color_code)
                                                                                    }}
                                                                                         className="flex items-center px-[20px] h-[80px] bg-[#efefef]">
                                                                                        <div className="w-full">
                                                                                            <i className="fa-solid fa-plus"></i>
                                                                                            <p>Upload</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            }
                                                        </tr>
                                                    ))}
                                                </>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddSanPham