"use client"

import { authOptions } from '@/lib/auth'
import { chatHrefConstructor } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import { usePathname, useRouter } from 'next/navigation'
import { FC, useState, useEffect} from 'react'

interface SideBarChatListProps {
    friends: User[]
    sessionId: string
}

const session = getServerSession(authOptions)
const SideBarChatList: FC<SideBarChatListProps> = ({ friends, sessionId }) => {
    const router = useRouter()
    const pathName = usePathname()
    const [unseenMessages, setUnseenMessages] = useState<Message[]>([])
    useEffect(() => {
        if(pathName?.includes("chat")){
            setUnseenMessages((prev) => {
                return prev.filter((msg) => !pathName.includes(msg.senderId))
            })
        }
    }, [pathName])
    return <ul role='list' className='max-h-[25rem] overflow-y-auto -mx-2 space-y-1'>
    {friends.sort().map((friend) => {
        const unseenMessagesCount = unseenMessages.filter((unseenMsg) => {
            return unseenMsg.senderId === friend.id
        }).length
        return (<li key={friend.id}>
            <a href={`/dashboard/chat/${chatHrefConstructor(sessionId,friend.id)}`}></a>
        </li>)
    })}
  </ul>
}

export default SideBarChatList
