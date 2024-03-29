'use client'
import axios, { AxiosError } from 'axios'
import { addFriendValidator } from '@/lib/validations/add-friend'
import { FC, useState } from 'react'
import Button from './Button1'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"

interface AddFriendButtonProps {

}

type FormData = z.infer<typeof addFriendValidator>

const AddFriendButton: FC<AddFriendButtonProps> = ({}) => {
    const [showSuccessState, setShowSuccessState] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors}
    } = useForm<FormData>({
        resolver: zodResolver(addFriendValidator),
    })
    const addFriend = async(email:string) => {
        try{
            const validatedEmail = addFriendValidator.parse({ email })
            await axios.post('/api/friends/add', {
                email: validatedEmail,
            })
            setShowSuccessState(true)
        }catch(e){
            if(e instanceof z.ZodError){
                setError('email', {message: e.message})
                return
            }
            if(e instanceof AxiosError){
                setError('email', {message: e.response?.data})
                return
            }
            setError('email', {message: "Something Went Wrong"})

        }
    }
    const onSubmit = (data: FormData) => {
        addFriend(data.email)
    }
  return (
  <form onSubmit={handleSubmit(onSubmit)}className='max-w-sm'>
    <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900 dark:text-white'>
        Add Friend by E-mail
    </label>

    <div className='mt-2 flex gap-4'>
        <input
        {...register('email')}
        type="text"
        className='block w-full rounded-md  text-gray-900 shadow-sm  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet 600 sm:text-sm sm:leading-6 dark:bg-black  dark:placeholder:text-violet-600 dark:text-white'
        placeholder='youremail@you.com'
        />
        <Button  className='dark:bg-violet-600 dark:text-black'>Add</Button>
        </div>
        <p className='mt-1 text-sm text-red-600'>{errors.email?.message}</p>
        {showSuccessState ? (
            <p className='mt-1 text-sm text-green-600'>Friend Request Sent!</p>

        ): null}
  </form>
  )
}

export default AddFriendButton
