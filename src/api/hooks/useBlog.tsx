import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { api } from ".."
import type { IStudent } from "../../types";

export const useBlog = () => {
    const getBlog = useQuery({
        queryKey: ["blog"],
        queryFn: () => api.get("").then(res => res.data)
    })
    const queryClient = useQueryClient(); // This is the access for "Create, Update, Delete" to invalidate the old data and refetch new data 
    // CREATE
    const createBlog = useMutation({
        mutationFn: (body: IStudent) => api.post("", body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blog"] })
        }
    })

    // DELETE
    const deleteBlog = useMutation({
        mutationFn: (id: string) => api.delete(`/${id}`,),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blog"] })
        }
    })

    // UPDATE
    const updateBlog = useMutation({
        mutationFn: (body: IStudent) => api.put(`/${body?.id}`, body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blog"] })
        }
    })

    return { getBlog, createBlog, deleteBlog, updateBlog };
}