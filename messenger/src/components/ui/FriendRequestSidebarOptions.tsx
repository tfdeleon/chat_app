'use client'

import { User } from 'lucide-react'
import Link from 'next/link'
import { FC, useState } from 'react'

interface FriendRequestSidebarOptionsProps {
    initialUnseenRequestCount: number
    sessionId: string
}

const FriendRequestSidebarOptions: FC<FriendRequestSidebarOptionsProps> = ({ sessionId, initialUnseenRequestCount}) => {
    const [unseenRequestCount, setUnseenRequestCount] = useState<number>(
        initialUnseenRequestCount
    )
  return <Link href='/dashboard/requests' className='text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md text-sm leading-6 font-semibold'>
     <div className='text-gray-400  flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'>
        <User className='h-4.5 w-4.5'/>
    </div>
    <p className='truncate text-sm leading-6 font-semibold'> Friend Requests</p>
    {unseenRequestCount > 0 ? (
        <div className='rounded-full w-5 h05 text-xs flex justify-center items-center text-white bg-indigo-600 '>
            {unseenRequestCount}
        </div>
    ): null}
  </Link>
}

export default FriendRequestSidebarOptions
