'use client'

import { User } from 'lucide-react'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { toPusherKey } from '@/lib/utils'
import { pusherClient } from '@/lib/pusher'

interface FriendRequestSidebarOptionsProps {
    initialUnseenRequestCount: number
    sessionId: string
}

const FriendRequestSidebarOptions: FC<FriendRequestSidebarOptionsProps> = ({ sessionId, initialUnseenRequestCount}) => {
    const [unseenRequestCount, setUnseenRequestCount] = useState<number>(
        initialUnseenRequestCount
    )

    useEffect(() => {
      pusherClient.subscribe(
        toPusherKey(`user:${sessionId}:incoming_friend_requests`)
      )
      pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`))

      const friendRequestHandler = () => {
        setUnseenRequestCount((prev) => prev + 1)
      }
      const addedFriendHandler = () => {
        setUnseenRequestCount((prev) => prev - 1)
      }
      pusherClient.bind('incoming_friend_requests', friendRequestHandler)
      pusherClient.bind('new_friend', addedFriendHandler)

      return () => {
        pusherClient.unsubscribe(
          toPusherKey(`user:${sessionId}:incoming_friend_requests`)
        )
        pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`))
        pusherClient.unbind('incoming_friend_requests', friendRequestHandler)
        pusherClient.unbind('new_friend', addedFriendHandler)
      }
    }, [sessionId])
  return <Link
  href='/dashboard/requests'
  className='text-gray-700 hover:text-violet-600 hover:bg-gray-50 dark:hover:bg-gray-900 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'>
  <div className='text-gray-400 border-gray-200 dark:border-gray-900 group-hover:border-violet-600 group-hover:text-violet-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white dark:bg-gray-800'>
    <User className='h-4 w-4' />
  </div>
  <p className='truncate dark:text-violet-600'>Friend requests</p>

  {unseenRequestCount > 0 ? (
    <div className='rounded-full w-5 h-5 text-xs flex justify-center items-center text-white bg-violet-600'>
      {unseenRequestCount}
    </div>
  ) : null}
</Link>
}

export default FriendRequestSidebarOptions
