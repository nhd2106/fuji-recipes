import React from "react";
import { FaGift, FaClock, FaMedal } from "react-icons/fa";
import Image from "next/image";

interface CampaignHeaderProps {
  title: string;
  description: string;
  reward: string;
  endTime: string;
  topPosts: Array<{
    id: string;
    images: string[];
    title: string;
    author: string;
  }>;
}

export default function CampaignHeader({
  title,
  description,
  reward,
  endTime,
  topPosts,
}: CampaignHeaderProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-lg shadow-lg p-8 mb-12">
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0 bg-white"
          style={{
            backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.3) 10%, transparent 10.1%),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.3) 10%, transparent 10.1%),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.3) 5%, transparent 5.1%)
          `,
            backgroundSize: "80px 80px, 80px 80px, 40px 40px",
          }}
        ></div>
      </div>
      <div className="relative z-10">
        <h1 className="text-4xl font-bold mb-4 text-white text-center">
          {title}
        </h1>
        <p className="text-xl text-white mb-6 text-center">{description}</p>

        <div className="flex justify-center items-end mb-8">
          {topPosts.slice(0, 3).map((post, index) => (
            <div
              key={post.id}
              className={`flex flex-col items-center mx-4 ${
                index === 0 ? "order-2" : index === 1 ? "order-1" : "order-3"
              }`}
            >
              <div className="relative w-24 h-24 mb-2">
                <Image
                  src={post.images[0]}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full border-4 border-white"
                />
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center">
                  <FaMedal
                    className={`${
                      index === 0
                        ? "text-yellow-400"
                        : index === 1
                        ? "text-gray-400"
                        : "text-yellow-700"
                    }`}
                  />
                </div>
              </div>
              <div
                className={`w-24 flex items-center justify-center ${
                  index === 0
                    ? "h-32 bg-yellow-400"
                    : index === 1
                    ? "h-24 bg-gray-300"
                    : "h-16 bg-yellow-600"
                }`}
              >
                <span className="font-bold text-2xl text-white">
                  {index === 0 ? "1st" : index === 1 ? "2nd" : "3rd"}
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold text-center text-white">
                {post.author}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-between items-center bg-white bg-opacity-20 p-4 rounded-lg">
          <div className="flex items-center mb-4 md:mb-0">
            <FaGift className="text-2xl text-white mr-2" />
            <span className="text-lg font-semibold text-white">
              Reward: {reward}
            </span>
          </div>
          <div className="flex items-center">
            <FaClock className="text-2xl text-white mr-2" />
            <span className="text-lg font-semibold text-white">
              Ends: {endTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
