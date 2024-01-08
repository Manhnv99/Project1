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
}

export default new ProductImageService()