import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";


const UpdateSanPham = () => {
    const nav=useNavigate();
    const {id}=useParams();


    useEffect(() => {

    }, []);


    return (
        <>
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
                                        <span className="text-[15px] ml-[5px]">Chỉnh số lượng và giá chung </span>
                                    </button>
                                    <button
                                            className="ml-[20px] hover:opacity-[0.8] ease-in-out duration-[0.5s] text-[#fff] bg-primary-blue py-[7px] px-[20px] rounded-[7px]">
                                        <div className="flex items-center">
                                            <i className="fa-regular fa-pen-to-square text-[15px]"></i>
                                            <span className="text-[15px] ml-[5px]">Update sản phẩm</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <div>
                            <table className="w-full text-[14px]">
                                    <thead>
                                    <tr className="bg-primary-orange text-[#fff] text-[13px] font-[400]">
                                        <th className="w-1/12 border-r-[1px] border-solid border-[#fff] py-[10px]">STT</th>
                                        <th className="w-2/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Mã
                                            sản phẩm
                                        </th>
                                        <th className="w-5/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Tên
                                            sản phẩm
                                        </th>
                                        <th className="w-2/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Số
                                            lượng tồn
                                        </th>
                                        <th className="w-2/12">Hành động</th>
                                    </tr>
                                    </thead>
                                    <tbody className="">
                                    <tr className="">
                                        <td className="text-center px-4 py-[15px]">1</td>
                                        <td className=" px-4 py-[10px]">1</td>
                                        <td className="text-center px-4 py-[15px]">1</td>
                                        <td className="text-center px-4 py-[15px]">
                                            1
                                        </td>
                                        <td className="text-center px-4 py-[15px]">
                                            <i className="hover:opacity-[0.8] ease-in-out duration-[0.5s] fa-regular fa-eye py-[7px] px-[12px] rounded-[5px] bg-[#e48902] text-[#fff] cursor-pointer"></i>
                                            <i className="hover:opacity-[0.8] ease-in-out duration-[0.5s] fa-regular fa-pen-to-square py-[7px] px-[12px] rounded-[5px] bg-[#0189e5] text-[#fff] cursor-pointer ml-[7px]"></i>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div className="flex justify-between py-[20px] px-[20px]">
                                    <div></div>
                                    <div>
                                        <span className="mr-[10px] cursor-pointer">
                                            <i className="fa-solid fa-chevron-left text-primary-orange"></i></span>
                                        <span
                                            className="activeMovePage movePage page mx-[5px] cursor-pointer px-[10px] py-[4px] text-primary-orange">1</span>
                                        <span className="ml-[10px] cursor-pointer">
                                            <i className="fa-solid fa-chevron-right text-primary-orange"></i></span>
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