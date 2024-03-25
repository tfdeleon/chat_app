import { fetchRedis } from "@/helpers/redis"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { db } from "@/lib/db"
import { nanoid } from "nanoid"
import { messageSchema } from "@/lib/validations/message"
export async function POST(req: Request) {
    try{
        const session = await getServerSession(authOptions)
        const {text, chatId}: {text: string , chatId: string} = await req.json()

        if(!session) return new Response("Unauthorized", {status: 401})

        const [userId1, userId2] = chatId.split('--')

        if(session.user.id !== userId1 && session.user.id !== userId2) return new Response('Unauthorized', {status: 401})

        const friendId = session.user.id === userId1 ? userId2 : userId1

        const friendList = await fetchRedis('smembers',`user:${session.user.id}:friends`) as string[]
        const isFriend = friendList.includes(friendId)
        if(!isFriend) return new Response("unauthorized", {status: 401})

        const sender = await fetchRedis('get', `user:${session.user.id}`) as string
        const senderParse = JSON.parse(sender) as User

        const timestamp = Date.now()

        const messageData: Message = {
            id: nanoid(),
            senderId: session.user.id,
            text,
            timestamp,

        }
        const message = messageSchema.parse(messageData)
        await db.zadd(`chat:${chatId}:messages`, {
            score: timestamp,
            member: JSON.stringify(message),
        })

        return new Response("ok")
    }catch(error){
        if(error instanceof Error){
            return new Response(error.message, {status: 500})
        }
        return new Response("Oops something went wrong!", {status: 500})

    }
}
