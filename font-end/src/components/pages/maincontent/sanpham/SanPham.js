const SanPham = () => {
    return (
        <>
            <div className="">
                <div className="p-[20px]">
                    <div className="title mb-[20px]">
                        <i className="fa-solid fa-box-open text-[25px]"></i>
                        <span className="text-[22px] font-bold ml-[10px]">Quản lý sản phẩm</span>
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
                                    <span className="text-[17px] font-[500] ml-[5px]">Danh sách sản phẩm</span>
                                </div>
                                <div>
                                    <button className="text-[#fff] bg-[#1578ff] py-[7px] px-[20px] rounded-[7px]">
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
                                        <th className="w-4/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Tên
                                            sản phẩm
                                        </th>
                                        <th className="w-3/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Ngày
                                            cập nhật
                                        </th>
                                        <th className="w-2/12 border-r-[1px] border-solid border-[#fff] py-[10px]">Trạng
                                            Thái
                                        </th>
                                        <th className="w-2/12">Hành động</th>
                                    </tr>
                                    </thead>
                                    <tbody className="">
                                    <tr className="">
                                        <td className="text-center px-4 py-[15px]">1</td>
                                        <td className=" px-4 py-[10px]">Giày Slip-on sneaker13</td>
                                        <td className="text-center px-4 py-[15px]">20-12-2023</td>
                                        <td className="text-center px-4 py-[15px]">
                                            <span
                                                className="bg-primary-green text-[#fff] py-[7px] px-[17px] rounded-[20px] cursor-pointer">Đang sử dụng</span>
                                        </td>
                                        <td className="text-center px-4 py-[15px]">
                                            <i className="fa-regular fa-eye py-[7px] px-[12px] rounded-[5px] bg-[#e48902] text-[#fff] cursor-pointer"></i>
                                            <i className="fa-regular fa-pen-to-square py-[7px] px-[12px] rounded-[5px] bg-[#0189e5] text-[#fff] cursor-pointer ml-[7px]"></i>
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
export default SanPham