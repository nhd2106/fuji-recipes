import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaComment, FaImages } from "react-icons/fa";

interface PostCardProps {
  post: {
    id: string;
    images: string[];
    title: string;
    author: string;
    likes: number;
    comments: number;
  };
  featured?: boolean;
  rank?: number;
}

export default function PostCard({
  post,
  featured = false,
  rank,
}: PostCardProps) {
  const handleImageClick = () => {};

  return (
    <div
      className={`bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 ${
        featured ? "border-4 border-yellow-400" : ""
      }`}
    >
      <Link href={`/posts/${post.id}`}>
        <div className="relative cursor-pointer">
          <Image
            src={post.images[0]}
            alt={post.title}
            width={400}
            height={300}
            className="w-full h-64 object-cover"
          />
          {post.images.length > 1 && (
            <div className="absolute top-2 right-2 bg-white bg-opacity-75 text-blue-500 p-2 rounded-full">
              <FaImages />
            </div>
          )}
          {featured && rank && (
            <div className="absolute top-0 left-0 bg-yellow-400 text-white text-xl font-bold w-10 h-10 flex items-center justify-center rounded-br-lg">
              {rank}
            </div>
          )}
        </div>
      </Link>
      <Link href={`/posts/${post.id}`}>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 text-purple-800">
            {post.title}
          </h3>
          <p className="text-blue-600 mb-4">By {post.author}</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FaHeart className="text-pink-500 mr-1" />
              <span className="text-gray-700">{post.likes}</span>
            </div>
            <div className="flex items-center">
              <FaComment className="text-blue-500 mr-1" />
              <span className="text-gray-700">{post.comments}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
