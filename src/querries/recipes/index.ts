import {useQuery } from '@tanstack/react-query'

export  function useRecipes(userId: string) {
  return useQuery({
    queryKey: ['recipes'],
    queryFn: async () => {
      const response = await fetch(`/api/get-recipes?userId=${userId}`)
      return response.json()
    }, 
    enabled: !!userId
  })
}

export function useSavedRecipes(userId?: string) {
  return useQuery({
    queryKey: ['saved-recipes'],
    queryFn: async () => {
      const response = await fetch(`/api/get-saved-recipes?userId=${userId}`)
      return response.json()
    },
    enabled: Boolean(userId)
  })
}