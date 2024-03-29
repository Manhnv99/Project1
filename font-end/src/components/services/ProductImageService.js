import axios from "axios";


class ProductImageService{

    addProductImage=(productDetailImageRequest)=>{
        return axios.post(`http://localhost:8080/product-detail-image/add`,productDetailImageRequest)
    }

    uploadProductImage=(formData)=>{
        return axios.post(`http://localhost:8080/product-detail-image/product-upload`,formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    getListProductDetail=(id)=>{
        return axios.get(`http://localhost:8080/product-detail-image/list/${id}`)
    }


    getProductDetail=(id)=>{
        return axios.get(`http://localhost:8080/product-detail-image/detail/${id}`)
    }


    getListImage=(id)=>{
        return axios.get(`http://localhost:8080/product-detail-image/listImage/${id}`)
    }

}

export default new ProductImageService()