import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const UserAvatar = ({ className }: { className?: string }) => {
  return (
    <Avatar className={`size-8 ${className}`}>
      <AvatarImage
        src='/images/shricodev.jpg'
        alt='Shrijal Acharya @shricodev'
      />
      <AvatarFallback>SA</AvatarFallback>
    </Avatar>
  )
}
