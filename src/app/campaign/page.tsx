import React from "react";
import CampaignHeader from "@/components/CampaignHeader";
import PostCard from "@/components/PostCard";
import { FaCamera, FaAward } from "react-icons/fa";
import { fakeCampaign, fakePosts } from "@/lib/fakeData";

export default function CampaignPage() {
  const campaign = fakeCampaign;
  const posts = fakePosts;

  const topPosts = posts.slice(0, 3);
  const otherPosts = posts.slice(3);

  return (
    <div className="bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <CampaignHeader
          title={campaign.title}
          description={campaign.description}
          reward={campaign.reward}
          endTime={campaign.endTime}
          topPosts={topPosts}
        />

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-purple-800">
            <FaCamera className="inline-block mr-2 text-pink-500" />
            Top Submissions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topPosts.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                featured={true}
                rank={index + 1}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-center text-purple-800">
            <FaAward className="inline-block mr-2 text-pink-500" />
            All Entries
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
