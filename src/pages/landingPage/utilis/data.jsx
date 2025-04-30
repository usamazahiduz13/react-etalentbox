import React from 'react'
import { MdEmail, MdBusiness, MdPeople, MdSwapHoriz, MdBarChart, MdFavorite, MdEmojiEvents } from 'react-icons/md'
import Freelanceimg1 from '../../../assets/imgs/landingpage/freelanceimg1.png'
import Freelanceimg2 from '../../../assets/imgs/landingpage/freelanceimg2.png'
import Freelanceimg3 from '../../../assets/imgs/landingpage/freelanceimg3.png'
import Freelanceimg4 from '../../../assets/imgs/landingpage/freelanceimg4.png'

export const kpisData = () => [
  {
    count: 10,
    icon: <MdEmail className="w-10 h-10 mb-2 text-white" />,
    title: "Job listings",
  },
  {
    count: 12,
    icon: <MdBusiness className="w-10 h-10 mb-2 text-white" />,
    title: "Freelance Projects",
  },
  {
    count: 5,
    icon: <MdPeople className="w-10 h-10 mb-2 text-white" />,
    title: "Sponsored Jobs",
  },
]

export const driveUsData = () => [
  {
    icon: <MdSwapHoriz className="w-12 h-12 mb-2 text-blue-600" />,
    title: 'Transparency',
    description: 'Honesty in every listing, no hidden feess',
  },
  {
    icon: <MdBarChart className="w-12 h-12 mb-2 text-blue-600" />,
    title: 'User-Focused',
    description: 'Inclusive opportunities for everyone',
  },
  {
    icon: <MdFavorite className="w-12 h-12 mb-2 text-blue-600" />,
    title: 'Diversity',
    description: 'Tailoring your search to your needs',
  },
  {
    icon: <MdEmojiEvents className="w-12 h-12 mb-2 text-blue-600" />,
    title: 'Quality',
    description: 'Only verified, quality job listings',
  }
]

export const nextJobSteps = [
  { label: "Sign Up", description: "Create one profile" },
  { label: "Search", description: "Browse niche job listings" },
  { label: "Apply", description: "Apply your dream job" },
  { label: "Interview", description: "Keep updated with status" },
  { label: "Get Hired", description: "Start your new job" },
  { label: "Review", description: "Enhance your skill: Explore new skills" },
]

export const freelancePortfolioImgs = [
  {
    img: Freelanceimg1
  },
  {
    img: Freelanceimg2
  },
  {
    img: Freelanceimg3
  },
  {
    img: Freelanceimg4
  }
] 