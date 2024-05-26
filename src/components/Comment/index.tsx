"use client";

import React from "react";
import { Heart, User } from "lucide-react";

const Comment = ({
  content,
  userId,
  likes,
  replies,
  createdAt,
  updatedAt,
}: {
  content: string;
  userId: string;
  likes: number;
  replies?: {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    recipeId: string;
    userId: string;
    likes: number;
  }[];
  createdAt: string;
  updatedAt: string;
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <User size={24} />
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <span className="font-bold">{userId}</span>
            <span className="text-gray-500">{createdAt}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>{likes}</span>
            <Heart size={16} />
          </div>
        </div>
      </div>
      <div>{content}</div>
      <div className="flex flex-col space-y-2">
        {(replies ?? []).map((reply) => (
          <div key={reply.id} className="pl-4 border-l-2 border-gray-200">
            <div className="flex items-center space-x-2">
              <User size={24} />
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <span className="font-bold">{reply.userId}</span>
                  <span className="text-gray-500">{reply.createdAt}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>{reply.likes}</span>
                  <Heart size={16} />
                </div>
              </div>
            </div>
            <div>{reply.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

Comment.propTypes = {};

export default Comment;
