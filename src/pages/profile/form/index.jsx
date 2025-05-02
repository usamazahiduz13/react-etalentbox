import StepperForm from './components/StepperForm';

const ProfileForm = () => {
    return (
        <>

            <div className='w-full flex items-center justify-between'>
                <div className=" shadow-2xl overflow-hidden min-h-[85vh] max-w-screen-lg w-full  md:mx-auto sm:mx-8 mx-4 rounded-[20px] bg-[#ffffff] md:my-16 sm:my-8 my-4">
                    <StepperForm />
                </div>
            </div>
        </>
    )
}

export default ProfileForm 