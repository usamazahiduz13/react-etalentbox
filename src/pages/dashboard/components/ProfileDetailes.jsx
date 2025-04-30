import { BsPencilSquare } from "react-icons/bs";
import AvatarImg from '../../../assets/imgs/avatar-1.jpg'

const ProfileDetailes = () => {
    return (
        <>
            <div className="flex justify-end">
                <button className="p-1 rounded-full hover:bg-gray-100">
                    <BsPencilSquare className="h-5 w-5 text-gray-500" />
                </button>
            </div>

            <div className="flex flex-col items-center w-full space-y-3">
                <img 
                    src={AvatarImg} 
                    alt="Ghulam Ali" 
                    className="w-28 h-28 rounded-full object-cover border-2 border-gray-200" 
                />

                <h2 className="text-xl font-semibold mt-2 mb-0">
                    Ghulam Ali
                </h2>
                <div className="flex flex-col items-center">
                    <p className="text-gray-600 text-sm">
                        Senior Software Engineer
                    </p>
                    <p className="text-gray-600 text-xs">
                        Lahore Punjab Pakistan
                    </p>
                </div>
                <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <svg 
                            key={star} 
                            className={`w-5 h-5 ${star <= 2.5 ? 'text-yellow-400' : 'text-gray-300'}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ProfileDetailes 