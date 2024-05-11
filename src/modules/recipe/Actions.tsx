"use client";

import {
  Heart,
  HeartIcon,
  HeartPulse,
  LucideHeart,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from "react";

const Action = ({
  recipeId,
  likes = 0,
}: {
  recipeId: string;
  likes: number;
}) => {
  const { user } = useKindeBrowserClient();
  const [saved, setSaved] = useState<string[]>([]);
  const [like, setLike] = useState(likes);
  const [handling, setHandling] = useState(false);

  const handleLike = async () => {
    if (!user) return;
    if (handling) return;
    setHandling(true);
    const host = process.env.NEXT_PUBLIC_SITE_URL;
    const url = `${host}/api/action`;
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({ type: "like", userId: user?.id, recipeId }),
    });
    setLike(like + 1);
    setSaved([...saved, recipeId]);
    setHandling(false);
  };

  useEffect(() => {
    const getSaved = async () => {
      if (!user) return;
      const host = process.env.NEXT_PUBLIC_SITE_URL;
      const url = `${host}/api/get-saved-recipes?userId=${user.id}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          contentType: "application/json",
        },
        cache: "no-cache",
      });
      const data = await res.json();
      if (data?.length) {
        setSaved(data.map((rec: any) => rec.id));
      }
    };
    getSaved();
  }, [user]);

  return (
    <div className="flex space-x-1 my-2">
      <Button
        size="icon"
        variant="link"
        className={handling ? "cursor-not-allowed animate-pulse" : ""}
      >
        <LucideHeart
          size={24}
          className="text-red-500"
          onClick={handleLike}
          fill={saved.includes(recipeId) ? "currentColor" : "none"}
        />
        <span className="ml-2">{like}</span>
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
