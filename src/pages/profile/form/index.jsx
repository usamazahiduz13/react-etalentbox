import StepperForm from './components/StepperForm';
import Header from '../../../layout/DashBoardNavbar';

const ProfileForm = () => {
    return (
        <>
            <Header />

            <div className='mt-8'>
                <div className="bg-white rounded-md shadow-md overflow-hidden min-h-[85vh]">
                    <StepperForm />
                </div>
            </div>
        </>
    )
}

export default ProfileForm 