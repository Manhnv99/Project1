

const AddNhanVien=()=>{
    return(
        <>
            <div className="p-[10px]">
                <div className="text-center py-[25px]">
                    <h1 className="uppercase font-bold text-[22px]">Thêm nhân viên</h1>
                </div>
                <div className="flex w-full">
                    <div className="w-3/12 bg-[#fff] rounded-[5px] h-screen flex justify-center">
                        <div>
                            <h1 className="text-center font-[600] text-[20px] my-[50px]">Ảnh đại diện</h1>
                            <input className="hidden" type="file" id="file" accept="image/*" multiple/>
                            <label className="block py-[110px] px-[100px] border-[1px] border-solid border-[#9999] bg-[#fafafa] rounded-[50%] cursor-pointer" for="file">
                                Upload
                            </label>
                        </div>
                    </div>
                    <div className="w-9/12 bg-[#fff] rounded-[5px] mx-[20px]">

                    </div>
                </div>
            </div>
        </>
    )
}

export default AddNhanVien