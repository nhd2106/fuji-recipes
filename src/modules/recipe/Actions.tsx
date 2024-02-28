"use client";

import { LucideHeart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useState } from "react";

const Action = ({
  recipeId,
  likes = 0,
}: {
  recipeId: string;
  likes: number;
}) => {
  const { user } = useKindeBrowserClient();
  const [like, setLike] = useState(likes);
  const handleLike = async () => {
    const host = process.env.NEXT_PUBLIC_SITE_URL;
    const url = `${host}/api/action`;
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({ type: "like", userId: user?.id, recipeId }),
    });
    setLike(like + 1);
  };

  return (
    <div className="flex space-x-1 my-2">
      <Button size="icon" variant="link">
        <LucideHeart size={24} className="text-red-500" onClick={handleLike} />
        <span className="ml-2">{likes}</span>
      </Button>
      <Button variant="link" size="icon">
        <Share2
          size={24}
          className="mr-2 text-blue-600"
          onClick={() => {
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`
            );
          }}
        />
      </Button>
    </div>
  );
};

export default Action;
