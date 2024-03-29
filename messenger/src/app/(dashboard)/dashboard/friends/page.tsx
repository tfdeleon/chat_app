import FriendsList from '@/components/ui/FriendsList'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { FC } from 'react'

interface pageProps {

}

const page: FC<pageProps> = ({}) => {
    const session = getServerSession(authOptions)
    if(!session) notFound()
  return <div>tim</div>
}

export default page
