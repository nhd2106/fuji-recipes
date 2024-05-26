import { useMutation, useQuery, QueryClient } from '@tanstack/react-query'
import axios from 'axios'


export type User = {
    id: string;
    email: string;
    picture: string;
    family_name: string;
    given_name: string;
}

type UpdateUser = {
    id: string;
    family_name?: string;
    given_name?: string;
    picture?: string;
    email?: string;
    credits ?: number;
}

export const useUpdateUser = () => {
    const queryClient = new QueryClient()
    return useMutation({
        mutationFn: async (userData: UpdateUser) => {
            const res = await axios.post(`/api/user/${userData.id}`, {
                ...userData,
                kindeId: userData.id
            })
            queryClient.invalidateQueries({
                queryKey: ['user', userData.id]
            })
            return res.data
        },
        
    })
}

export const useCreateUser = () => {
    return useMutation({
        mutationFn: async (userData: User) => {
            const res = await axios.post(`/api/user`, {
                ...userData,
                kindeId: userData.id
            })
            return res.data
        },
        
    })

}

export const useGetUser = (id: string) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: async () => {
            const res = await axios.get(`/api/user/${id}`)
            return res.data
        },
        enabled: !!id
    })
}