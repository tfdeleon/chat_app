import { LucideProps, UserPlus} from 'lucide-react'

export const Icons = {
  Logo: (props: LucideProps) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle-more"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>
  ),
  UserPlus,


}

export type Icon = keyof typeof Icons
