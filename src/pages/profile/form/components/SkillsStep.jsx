import TechnicalSkillsPopup from './TechnicalSkillsPopup'
import SoftSkillsPopup from './SoftSkillsPopup'

const SkillsStep = () => {
    return (
        <>
            <div className='flex justify-between items-center mb-2 p-2'>
                <h2 className='text-2xl font-bold'>
                    Technical Skills
                </h2>

                <TechnicalSkillsPopup />
            </div>

            <hr className="border-gray-200" />

            <div className='flex justify-between items-center my-2 p-2'>
                <h2 className='text-2xl font-bold'>
                    Soft Skills
                </h2>

                <SoftSkillsPopup />
            </div>

            <hr className="border-gray-200" />

            <div className='px-6 pt-2'>
                <div className='space-y-2'>
                    <div className='flex justify-between'>
                        <h3 className='text-xl font-semibold'>
                            Javascript
                        </h3>

                        <div className='flex space-x-2'>
                            <button className="p-2 text-gray-600 hover:text-blue-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                            <button className="p-2 text-gray-600 hover:text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <hr className="my-4 border-gray-200" />
                </div>
            </div>
        </>
    )
}

export default SkillsStep 