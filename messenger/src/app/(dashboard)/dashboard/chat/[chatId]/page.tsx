import { fetchRedis } from '@/helpers/redis'
import { authOptions } from '@/lib/auth'
import { messageArraySchema } from '@/lib/validations/message'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
// import { FC } from 'react'

interface PageProps {
  params:{
    chatId: string
  }
}

async function getChatMessages (chatId: string) {
  try{
    const results: string[] = await fetchRedis(
      'zrange',
      `chat:${chatId}:messages`,
      0,
      -1
    )
    const dbMessages = results.map((message) => JSON.parse(message) as Message)
    const reversedMessages = dbMessages.reverse()

    const messages = messageArraySchema.parse(reversedMessages)

    return messages

  }catch(e){
    notFound()
  }
}

const page = async ({params}: PageProps) => {
  const { chatId } = params
  const session = await getServerSession(authOptions)
  if(!session) notFound()

  const { user } = session
  const [userId1, userId2] = chatId.split("--")

  if(user.id !== userId1 && user.id !== userId2){
    notFound()
  }

  const chatPartnerId = user.id  === userId1 ? userId2 : userId1
  const chatPartner = (await db.get(`user:${chatPartnerId}`)) as User
  const initialMessages = await getChatMessages(chatId)

  return <div>{params.chatId}</div>


}

export default page
