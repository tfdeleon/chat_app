'use client'

import Button from '@/components/ui/Button1'
import { FC, useState } from 'react'
import { signIn } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import { Icons } from '@/components/Icons'
import Image from 'next/image'
import landingImage from './image.png'
import { ModeToggle } from '@/components/ui/DarkMode'
const Page: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function loginWithGoogle() {
    setIsLoading(true)
    try {
      await signIn('google')
    } catch (error) {
      // display error message to user
      toast.error('Something went wrong with your login.')
    } finally {
      setIsLoading(false)
      console.log(signIn)
    }
  }

  return (
  <>
  <div className="h-screen flex items-center justify-center">
  <div className="container mx-auto flex flex-col md:flex-row items-center">
    <div className="flex flex-col md:flex-row w-full justify-center items-center">
      <div className="flex flex-col w-full lg:w-1/2 justify-center items-start p-8">
        <h1 className="text-4xl md:text-5xl text-violet-600 dark:text-violet-600 tracking-loose">Msg.</h1>
        <h2 className="text-3xl md:text-5xl leading-relaxed md:leading-snug mb-2 text-black dark:text-white">Realtime Chat Application</h2>
        <p className="text-sm md:text-base dark:text-gray-50 mb-4 text-black">
          The cutting-edge realtime chat application that revolutionizes how you connect and collaborate with others.
        </p>
        <ModeToggle/>
        <Button isLoading={isLoading} type='button' className='max-w-sm mx-auto w-full dark:bg-violet-600' onClick={loginWithGoogle}>
          {isLoading ? null : (
            <svg className='mr-2 h-4 w-4' aria-hidden='true' focusable='false' data-prefix='fab' data-icon='github' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
              <path d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z' fill='#4285F4' />
              <path d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z' fill='#34A853' />
              <path d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z' fill='#FBBC05' />
              <path d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z' fill='#EA4335' />
              <path d='M1 1h22v22H1z' fill='none' />
            </svg>
          )}
          Get started with Google
        </Button>
      </div>
      <div className="w-full lg:w-1/2 p-8">
        <Image referrerPolicy='no-referrer' src={landingImage} width={500} height={500} alt='web photo' />
      </div>
    </div>
  </div>
</div>
  </>
  )
}

export default Page
