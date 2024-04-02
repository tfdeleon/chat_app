import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { FC, ReactNode } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Icon, Icons } from '@/components/Icons'
import Image  from 'next/image'
import SignOutButton from '@/components/ui/SignOutButton'
import FriendRequestSidebarOptions from '@/components/ui/FriendRequestSidebarOptions'
import { fetchRedis } from '@/helpers/redis'
import { getFriendsByUserId } from '@/helpers/get-friends-id'
import SideBarChatList from '@/components/ui/SideBarChatList'
import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from '@/components/ui/DarkMode'


interface LayoutProps {
  children: ReactNode
}

interface SidebarOption {
  id: number
  name: string
  href: string
  Icon: Icon
}

const sidebarOptions: SidebarOption[] = [
  {
    id: 1,
    name: 'Friend List',
    href: '/dashboard',
    Icon: "Contact"
  },
  {
    id: 2,
    name: 'Add Friend',
    href: '/dashboard/add',
    Icon: "UserPlus"
  }
]
const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOptions)
  if (!session) notFound()

  const friends = await getFriendsByUserId(session.user.id)
  console.log('friends', friends)

  const unseenRequestCount = (
    (await fetchRedis(
      'smembers',
      `user:${session.user.id}:incoming_friend_requests`
    )) as User[]
  ).length

    return (
      <div className='w-full flex h-screen'>
        <div className='flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto overflow-x-hidden border-r border-gray-200 px-10 dark:border-gray-900'>
          <Link href='/dashboard' className='flex h-16 shrink-0 items-center text-violet-600'>
            <Icons.Logo className="h-8 w-auto stroke-violet-600 " />
            <h1 className='text-2xl font-semibold text-black dark:text-white'>Msg.</h1>
          </Link>

          {friends.length > 0 ? (<div className='text-xs font-semibold leading-6 text-gray-400 dark:text-white'> Chats</div>) : null}
          <nav className='flex flex-1 flex-col '>
            <ul role='list' className='flex flex-1 flex-col gap-y-7 dark:text-violet-600'>
              <li >
                <SideBarChatList sessionId={session.user.id} friends={friends}  />
              </li>
              <li>
                <div className='text-xs font-semibold leading-6 text-gray-400 dark:text-white'>
                  Navigation
                </div>

                <ul role='list' className='-mx-2 mt-2 space-y-1'>
                  {sidebarOptions.map((option) => {
                    const Icon = Icons[option.Icon];
                    return (
                      <li key={option.id}>
                        <Link
                          href={option.href}
                          className='text-gray-700 hover:text-violet-600 hover:bg-gray-50 dark:hover:bg-gray-900 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold dark:hover: bg-none '
                        >
                          <span className='text-gray-400 border-gray-200 dark:border-gray-900 group-hover:border-violet-600 group-hover:text-violet-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white dark:bg-gray-800 '>
                            <Icon className='h-4 w-4' />
                          </span>

                          <span className='truncate dark:text-violet-600'>{option.name}</span>
                        </Link>
                      </li>
                    );
                  })}

                  <li >
                    <FriendRequestSidebarOptions
                      sessionId={session.user.id}
                      initialUnseenRequestCount={unseenRequestCount}
                    />
                  </li>
                </ul>
              </li>
              <div>
                  <ModeToggle/>
                  </div>

              <li className='-mx-10 mt-auto flex items-center'>
                <div className='flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900'>
                  <div className='relative h-8 w-8 bg-gray-50'>
                  <Link href={`dashboard/user/${session.user.id}`}>
                    <Image
                      fill
                      referrerPolicy='no-referrer'
                      src={session.user.image || ''}
                      alt='Your profile picture'
                    />
                  </Link>

                  </div>
                  <span className='sr-only'>Your profile</span>
                  <div className='flex flex-col'>
                    <span aria-hidden='true' className='dark:text-violet-600'>{session.user.name}</span>
                    <span className='text-xs text-zinc-400 dark:text-gray-600' aria-hidden='true'>
                      {session.user.email}
                    </span>
                  </div>
                </div>

                <SignOutButton className='h-full aspect-square dark:hover:bg-gray-900' />
              </li>
            </ul>
          </nav>
        </div>
        <aside className='max-h-screen container py-14 md:py-10 w-full '><ThemeProvider attribute='class' defaultTheme='system'>{children} </ThemeProvider></aside>
      </div>
    )
  }

export default Layout
