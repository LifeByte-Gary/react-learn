import React from 'react'
import { useParams } from 'react-router-dom'

interface MatchParams {
  id: string
  other: string
}

export const DetailPage: React.FC = () => {
  const { id } = useParams<keyof MatchParams>()

  return <h1>旅游路线详情页, id: {id}</h1>
}
