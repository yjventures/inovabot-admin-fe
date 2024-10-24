'use client'

import { useGetBotImagesQuery } from '@/redux/features/botsApi'
import BotImageCard from '../BotImageCard'

interface Props {
  limit?: number
  id: string
}
export default function ViewBotsImages({ id, limit }: Props) {
  const { data } = useGetBotImagesQuery({ bot_id: id, limit: limit || 100, sortBy: 'createdAt', sortOrder: 'desc' })
  return (
    <div className='space-y-3 pt-6'>
      {data?.data?.map(img => (
        <BotImageCard key={img._id} botImg={img} />
      ))}
    </div>
  )
}
