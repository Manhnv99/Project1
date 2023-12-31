import './loading.css'


const Loading=()=>{
    return(
        <>
            <div className="loading fixed top-0 bottom-0 right-0 left-0 z-10">
                <div className="flex justify-center items-center w-full h-full">
                    <div className="w-[100px] animate-spin">
                        <img className="rounded-[50%]" src="/logo.png"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Loading