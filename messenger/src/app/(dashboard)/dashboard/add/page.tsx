import { FC } from 'react'
import AddFriendButton from '@/components/ui/AddFriendButton'

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return <main className='pt-8'>
    <h1 className='font-bold text-5xl mb-8'>
        <AddFriendButton />
    </h1>
    </main>
}

export default page