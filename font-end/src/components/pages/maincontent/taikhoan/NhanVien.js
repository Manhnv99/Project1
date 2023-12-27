import {useNavigate} from "react-router-dom";

const NhanVien=()=>{

    const nav=useNavigate();

    const openAddNhanVien=()=>{
        nav("/add-nhanvien-management")
    }

    return(
        <>
            <div className="">
                <div className="p-[20px]">
                    <div className="title mb-[20px]">
                        <i className="fa-solid fa-box-open text-[25px]"></i>
                        <span className="text-[22px] font-bold ml-[10px]">Quản lý tài khoản nhân viên</span>
                    </div>
                    <div className="bg-[#fff] rounded-[5px]">
                        <div className="p-[10px]">
                            <div className="border-b-[2px] border-[#999]">
                                <i className="fa-solid fa-filter text-[25px]"></i>
                                <span className="text-[17px] font-[500] ml-[5px]">Bộ lọc</span>
                            </div>
                            <div className="py-[20px]">
                                {/*Tìm Kiếm*/}
                                <div className="grid grid-cols-2">
                                    <div className="text-center">
                                        <span className="text-[#444] text-[14px] font-[500]">Tìm kiếm :</span>
                                        <input className="ml-[10px] pl-[10px] h-[30px] w-[300px] border-[1px] border-[#999] border-solid rounded-[5px] focus:outline-none
                                        text-[#444] text-[13px]" type="text" placeholder="Tìm kiếm tên và sđt..."/>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-[#444] text-[14px] font-[500]">Ngày sinh :</span>
                                        <input className="ml-[10px] pl-[10px] h-[30px] w-[150px] border-[1px] border-[#999] border-solid rounded-[5px] focus:outline-none
                                        text-[#444] text-[13px]" type="date"/>
                                        <input className="ml-[10px] pl-[10px] h-[30px] w-[150px] border-[1px] border-[#999] border-solid rounded-[5px] focus:outline-none
                                        text-[#444] text-[13px]" type="date"/>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 mt-[25px]">
                                    <div className="text-center">
                                        <span className="text-[#444] text-[14px] font-[500]">Trạng thái :</span>
                                        <select
                                            className="ml-[10px] h-[30px] w-[300px] border-[1px] border-[#999] border-solid rounded-[5px] focus:outline-none text-[#444] text-[13px]">
                                            <option>Tất Cả</option>
                                            <option>Đang Sử Dụng</option>
                                            <option>Ngưng Sử Dụng</option>
                                        </select>
                                    </div>
                                    <div className="text-center">
                                        <input className="w-[380px] focus:outline-none" min="1" max="100" type="range"/>
                                    </div>
                                </div>
                                {/*End Tìm Kiếm*/}
                                <div className="text-[14px] mt-[20px] text-center py-[20px]">
                                <button className="py-[7px] px-[20px] bg-primary-blue text-[#fff] rounded-[5px]">
                                        Tìm kiếm
                                    </button>
                                    <button
                                        className="py-[7px] px-[20px] bg-primary-red text-[#fff] rounded-[5px] ml-[10px]">
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
                                    <span className="text-[17px] font-[500] ml-[5px]">Danh sách nhân viên</span>
                                </div>
                                <div>
                                    <button className="text-[#fff] bg-[#1578ff] py-[7px] px-[20px] rounded-[7px]" onClick={()=>{openAddNhanVien()}}>
                                        <i className="fa-solid fa-plus text-[12px]"></i>
                                        <span className="text-[15px] ml-[5px]">Thêm</span>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <table className="w-full text-[14px]">
                                    <thead>
                                    <tr className="bg-primary-orange text-[#fff] text-[13px] font-[400]">
                                        <th className="w-1/12 border-r-[1px] border-solid border-[#fff] py-[10px]">STT</th>
                                        <th className="w-2/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Ảnh</th>
                                        <th className="w-2/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Tên nhân
                                            viên
                                        </th>
                                        <th className="w-2/12 border-r-[1px] border-solid border-[#fff] py-[10px]">CCCD</th>
                                        <th className="w-1/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Số điện
                                            thoại
                                        </th>
                                        <th className="w-1/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Ngày sinh
                                        </th>
                                        <th className="w-1/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Giới tính
                                        </th>
                                        <th className="w-1/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Trạng thái</th>
                                        <th className="w-1/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Hành Động</th>
                                    </tr>
                                    </thead>
                                    <tbody className="">
                                    <tr className="">
                                        <td className="text-center px-4 py-[15px]">1</td>
                                        <td className=" px-4 py-[10px]">Giày Slip-on sneaker13</td>
                                        <td className="text-center px-4 py-[15px]">Nguyễn Vĩ Mạnh</td>
                                        <td className="text-center px-4 py-[15px]">001204020108</td>
                                        <td className="text-center px-4 py-[15px]">0343144320</td>
                                        <td className="text-center px-4 py-[15px]">28/04/2004</td>
                                        <td className="text-center px-4 py-[15px]">Nam</td>
                                        <td className="text-center px-4 py-[15px]">
                                            <span
                                                className="text-[12px] bg-primary-green text-[#fff] py-[5px] px-[9px] rounded-[20px] cursor-pointer">Kích hoạt</span>
                                        </td>
                                        <td className="text-center px-4 py-[15px]">
                                            <i className="fa-regular fa-eye py-[4px] px-[8px] rounded-[5px] bg-[#e48902] text-[#fff] cursor-pointer"></i>
                                            <i className="fa-regular fa-pen-to-square py-[4px] px-[8px] rounded-[5px] bg-[#0189e5] text-[#fff] cursor-pointer ml-[5px]"></i>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NhanVien