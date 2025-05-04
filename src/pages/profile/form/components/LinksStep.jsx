import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'sonner'
import fetchApi from '../../../../utils/axios'

const LinksStep = ({ formData, onInputChange, errors = {} }) => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.auth)
    const [links, setLinks] = useState({
        id: 0,
        facebook: '',
        twitter: '',
        linkedin: '',
        instagram: '',
        userId: 0
    })
    const [linkId, setLinkId] = useState(0)
    const [loading, setLoading] = useState(false)

    // Get existing links when component mounts
    const getLinks = async () => {
        if (!userInfo?.userId) {
            toast.error("User information not found. Please log in again.")
            return
        }
        
        setLoading(true)
        try {
            const res = await fetchApi.get(`/SocialLink/${userInfo.userId}`)
            if (res.data.success) {
                const linkData = res.data.data
                // Update local state
                setLinks({
                    id: linkData.id || 0,
                    facebook: linkData.facebook || '',
                    twitter: linkData.twitter || '',
                    linkedin: linkData.linkedin || '',
                    instagram: linkData.instagram || '',
                    userId: userInfo.userId
                })
                setLinkId(linkData.id || 0)
                
                // Update form data as well
                onInputChange({ target: { name: 'facebook', value: linkData.facebook || '' } })
                onInputChange({ target: { name: 'twitter', value: linkData.twitter || '' } })
                onInputChange({ target: { name: 'linkedin', value: linkData.linkedin || '' } })
                onInputChange({ target: { name: 'instagram', value: linkData.instagram || '' } })
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.error("Error fetching links:", error)
            // Handle case when no links exist yet
            if (error.response?.status === 404) {
                console.log("No links found, will create new ones on submission")
            } else {
                toast.error(error.response?.data?.message || "Failed to load social links")
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getLinks()
    }, [userInfo])

    // Handle input changes
    const handleLinkChange = (e) => {
        const { name, value } = e.target
        setLinks(prev => ({
            ...prev,
            [name]: value
        }))
        // Also update parent form data
        onInputChange(e)
    }

    // Save links - will be called from parent when "Next" is clicked
    const saveLinks = async () => {
        // Validate LinkedIn is provided
        if (!links.linkedin) {
            toast.error("LinkedIn profile URL is required")
            return false
        }
        
        
        try {
            const payload = {
                id: linkId,
                facebook: links.facebook || '',
                twitter: links.twitter || '',
                linkedin: links.linkedin || '',
                instagram: links.instagram || '',
                userId: userInfo.userId
            }
            
            let response
            if (linkId === 0) {
                // Create new links
                response = await fetchApi.post('/SocialLinks', payload)
            } else {
                // Update existing links
                response = await fetchApi.put('/SocialLinks', payload)
            }
            
            if (response.data.success) {
                toast.success("Social links saved successfully")
                return true
            } else {
                toast.error(response.data.message || "Failed to save social links")
                return false
            }
        } catch (error) {
            console.error("Error saving links:", error)
            toast.error(error.response?.data?.message || "Failed to save social links")
            return false
        }
    }

    // Make saveLinks function available to parent component
    useEffect(() => {
        if (window) {
            window.saveLinks = saveLinks
        }
        
        // Cleanup
        return () => {
            if (window && window.saveLinks) {
                delete window.saveLinks
            }
        }
    }, [links, linkId, userInfo])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    return (
        <>
            <div className='flex justify-between items-center p-2'>
                <h2 className='text-2xl font-bold'>
                    Social Links
                </h2>
            </div>

            <hr className="border-gray-200" />

            <div className='space-y-4 mt-4'>
                <div>
                    <label htmlFor="facebook" className="block text-sm font-medium text-gray-700">
                        Facebook
                    </label>
                    <input
                        type="text"
                        id="facebook"
                        name="facebook"
                        value={links.facebook || ''}
                        onChange={handleLinkChange}
                        className="mt-1 block w-full rounded-lg py-2 px-4 border border-[#D8D8D8] shadow-sm focus:border-blue-500 outline-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                        LinkedIn <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="linkedin"
                        name="linkedin"
                        value={links.linkedin || ''}
                        onChange={handleLinkChange}
                        className={`mt-1 block w-full rounded-lg py-2 px-4 border ${
                            errors.linkedin ? 'border-red-500' : 'border-[#D8D8D8]'
                        } shadow-sm focus:border-blue-500 outline-blue-500`}
                        required
                        placeholder="https://linkedin.com/in/username"
                    />
                    {errors.linkedin && (
                        <p className="mt-1 text-sm text-red-500">{errors.linkedin}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                        Please enter your full LinkedIn profile URL (e.g., https://linkedin.com/in/username)
                    </p>
                </div>

                <div>
                    <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
                        Twitter
                    </label>
                    <input
                        type="text"
                        id="twitter"
                        name="twitter"
                        value={links.twitter || ''}
                        onChange={handleLinkChange}
                        className="mt-1 block w-full rounded-lg py-2 px-4 border border-[#D8D8D8] shadow-sm focus:border-blue-500 outline-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">
                        Instagram
                    </label>
                    <input
                        type="text"
                        id="instagram"
                        name="instagram"
                        value={links.instagram || ''}
                        onChange={handleLinkChange}
                        className="mt-1 block w-full rounded-lg py-2 px-4 border border-[#D8D8D8] shadow-sm focus:border-blue-500 outline-blue-500"
                    />
                </div>
            </div>
        </>
    )
}

export default LinksStep 