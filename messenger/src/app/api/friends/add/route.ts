import { fetchRedis } from "@/helpers/redis"
import { authOptions } from "@/lib/auth"
import { addFriendValidator } from "@/lib/validations/add-friend"
import { getServerSession } from "next-auth"
import { db } from "@/lib/db"
import { z } from "zod"

export async function POST(req: Request){
    try{
        const body = await req.json()
        const{email: emailToAdd} = addFriendValidator.parse(body.email)
        const idToAdd = (await fetchRedis(
        'get',
        `user:email:${emailToAdd}`
        )) as string
    if(!idToAdd){
        return new Response("Oh no! This person does not exist.", {status: 400} )
    }
    
    const session = await getServerSession(authOptions)
    if(idToAdd === session.user.id){
        return new Response("You cannot add yourself!", {status: 400} )
    }
    if(!session){
        return new Response("Unauthorized",{status: 401})
    }
    //Check if user is already added

    const isAlreadyAdded = (await fetchRedis(
        'sismember', 
        `user:${idToAdd}:incoming_friend_requests,`, 
        session.user.id)) as 0 | 1

    if(isAlreadyAdded){
        return new Response("Already added this person", {status: 400})
    }

    const isAlreadyFriends = (await fetchRedis(
        'sismember', 
        `user:${idToAdd}:friends`, 
        idToAdd
        )) as 0 | 1

    if(isAlreadyFriends){
        return new Response("Already friends with user", {status: 400})
    }
    // Send Friend Request

    db.sadd(`user:${idToAdd}: incoming_friend_requests`, session.user.id)
    return new Response("OK")
    }catch(e){
        if(e instanceof z.ZodError){
            return new Response("Invalid Request Payload", {status: 422})
        }
            return new Response('Invalid Request',{status: 400})
    }
}