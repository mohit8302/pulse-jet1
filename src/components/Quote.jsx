import backgroundImage from '../assets/oswlad.jpg';
export const Quote = () => {
    return <div className=" h-screen flex justify-center flex-col"style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover'}} >
        <div className="flex justify-center">
            <div className="max-w-lg text-white italic">
                <div className="text-3xl font-bold">
                    "The beauty of destruction, the greatness of the will to win"
                </div>
                <div className="max-w-md text-xl font-semibold text-left mt-4">
                   Oswald Spengler
                </div>      
            </div>
        </div>
        
    </div>
}