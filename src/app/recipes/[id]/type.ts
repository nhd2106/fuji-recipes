export type Reply = {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    recipeId: string;
    userId: string;
    likes: number;
}

export type Comment = {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    recipeId: string;
    userId: string;
    likes: number;
    replies: Reply[];
}