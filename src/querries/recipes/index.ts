import {useQuery } from '@tanstack/react-query'

export default function useRecipes(userId: string) {
  return useQuery({
    queryKey: ['recipes'],
    queryFn: async () => {
      const response = await fetch(`/api/get-recipes?userId=${userId}`)
      return response.json()
    }, 
    enabled: !!userId
  })
}