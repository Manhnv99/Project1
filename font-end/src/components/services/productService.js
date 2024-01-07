import axios from "axios";


class ProductService{

    add=(productRequest)=>{
        return axios.post(`http://localhost:8080/product/add`,productRequest)
    }
}

export default new ProductService()