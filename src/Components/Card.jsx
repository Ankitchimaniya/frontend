function getImageUrl(imagePath) {
    return "https://localhost:7172/api/Images/File/" + imagePath;
}


export default function Card(props) {

    return (
        <div className="w-[273px] shrink-0 grow ">
            <div className="group h-[182px] rounded-[15px] overflow-hidden relative">
                <img className="group-hover:scale-110 transition-transform duration-300 object-cover w-full h-full" src={getImageUrl(props.imageUrl)} alt="" />
                <div className="image-overlay absolute w-full h-full top-0 flex items-end p-2
                text-[25px] text-white font-bold text-lg">
                   {props.offer}
                </div> 
            </div>     
            <div className="text-xl font-bold mt-3">
                {props.title}                    
            </div>
            <div>
                ★ {props.rating}
                <span className="ml-2">{props.minDeliveryTime} - {props.maxDeliveryTime} mins</span> 
            </div>
            <div className="text-slate-700">
                {props.cuisine}
                <br />
                {props.location}
            </div>
        </div>
    );
}
