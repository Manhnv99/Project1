


const ModalDetailImage=(props)=>{

    const handleCloseModalDetailImage=()=>{
        let modal = document.querySelector('.modal');
        const modal_container=document.querySelector('.modal-container')
        modal_container.style.animation = 'hideModal 0.5s ease-in-out'
        setTimeout(()=>{
            modal.style.display = 'none'
            modal_container.style.animation = ''
            props.handleCloseModalDetailImage()
        },500)
    }

    return(
        <div className="modal fixed bottom-0 top-0 left-0 right-0 z-20 bg-[rgba(0,0,0,0.4)]">
            <div onClick={handleCloseModalDetailImage} className="flex justify-center items-center h-full">
                <div className="modal-container p-[20px] bg-[#fff] rounded-[5px]">
                    <div className="mb-[10px] flex justify-between">
                        <div></div>
                        <div className="cursor-pointer">
                            <i onClick={handleCloseModalDetailImage} className="fa-solid fa-xmark"></i>
                        </div>
                    </div>
                    <img className="rounded-[10px] w-[400px]" src={props.detailImage}/>
                </div>
            </div>
        </div>
    )
}

export default ModalDetailImage