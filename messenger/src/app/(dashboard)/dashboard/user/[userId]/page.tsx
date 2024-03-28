import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { fetchRedis } from '@/helpers/redis'
import { FC } from 'react'
import Image from 'next/image'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

interface PageProps {
  params: {
    userId: string
  }
}

interface User {
  name: string
  email: string
  image: string
}

async function getUser(userId: string): Promise<User | null> {
  try {
    const userData = await fetchRedis('get', `user:${userId}`) as string | null

    if (!userData) {
      return null
    }

    const user: User = JSON.parse(userData)
    console.log(user.name)
    return user
  } catch (error) {
    throw new Error("nah bro")
  }
}

const Page: FC<PageProps> = async ({ params }) => {
  const { userId } = params
  const session = await getServerSession(authOptions)

  if (!session) return notFound()

  const user = await getUser(userId)

  if (!user) return notFound()

  return (
    <div>
      <h1>User Details: {user.email}</h1>
      <p>Name: {user.name}</p>
      <div className='container'>
      <Avatar >
      <AvatarImage src={user.image} alt="User Profile Pic" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
      </div>
    </div>
  )
}

export default Page
