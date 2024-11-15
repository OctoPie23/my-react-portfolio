import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface UserAvatarProps {
  src?: string
  className?: string
}

export const UserAvatar = ({ className, src }: UserAvatarProps) => {
  return (
    <Avatar className={`size-8 ${className}`}>
      <AvatarImage
        src={src ? src : '/images/shrijal-acharya.jpg'}
        alt='Shrijal Acharya @shricodev'
      />
      <AvatarFallback>SA</AvatarFallback>
    </Avatar>
  )
}
