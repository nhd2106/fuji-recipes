"use client";

import CustomReactMarkdown from "@/components/CustomMarkdown";
import WithAuth from "@/components/WithAuth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useGetUser, useUpdateUser } from "@/querries/user";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { cloneDeep } from "lodash";
import { useForm } from "react-hook-form";
import {
  BotIcon,
  CircleSlash,
  SendHorizonalIcon,
  User,
  Wand,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

type Message = {
  text: string;
  role: string;
};

function Page() {
  // convert to use react hook form
  const { register, handleSubmit, reset } = useForm();

  const [chatLogs, setChatLogs] = useState<Message[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const lastMessage = chatLogs?.[chatLogs.length - 1]?.text;
  const [processing, setProcessing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { user } = useKindeBrowserClient() || {};
  const queryClient = useQueryClient();

  const { data: userData } = useGetUser(user?.id ?? "");
  const { mutate } = useUpdateUser();

  useEffect(() => {
    if (!userData) {
      queryClient.invalidateQueries({
        queryKey: ["user", user?.id],
      });
    }
  }, [user, userData, queryClient]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [lastMessage]);

  const onSubmit = async (data: any) => {
    if (userData?.credits === 0) {
      alert("Bạn đã hết lượt hỏi demo");
      return;
    }
    const prompt = data.prompt;
    if (!prompt) {
      return;
    } else {
      setChatLogs((prev) => [
        ...prev,
        {
          text: prompt,
          role: "user",
        },
      ]);
      const formdata = new FormData();
      formdata.append("prompt", prompt);

      reset();
      const res = await fetch("/api/assistant", {
        method: "POST",
        body: formdata,
      });
      const reader = res.body?.pipeThrough(new TextDecoderStream()).getReader();

      while (true) {
        const val = (await reader?.read()) as {
          done: boolean;
          value: any;
        };

        if (val?.done) {
          setIsTyping(false);
          break;
        }

        if (val?.value) {
          if (val?.value?.includes("queued")) {
            setProcessing(true);
          }
          if (val?.value?.includes("in_progress")) {
            setProcessing(false);
          }
          if (val?.value?.includes("completed")) {
            setIsTyping(false);
            mutate({
              id: user?.id ?? "",
              credits: userData?.credits > 1 ? userData?.credits - 1 : 0,
            });
            queryClient.invalidateQueries({
              queryKey: ["user", user?.id],
            });
          }
          let content;
          const cleanedString = val?.value;
          try {
            // remove new line characters

            content = JSON.parse(cleanedString);
          } catch (error) {
            content = {};
            const splited = cleanedString.split("}}}");
            const arraryOfJson = splited.map((tem: any) => {
              try {
                return JSON.parse(tem + "}}}");
              } catch (error) {
                return {};
              }
            });
            arraryOfJson.forEach((json: any) => {
              if (json?.event === "thread.message.delta") {
                if (processing) {
                  setProcessing(false);
                }
                if (!isTyping) {
                  setIsTyping(true);
                }
                const text = json?.data?.delta?.content?.[0]?.text?.value ?? "";

                setChatLogs((prev) => {
                  const newLogs = cloneDeep(prev);
                  const lastMessage = newLogs?.[newLogs.length - 1];
                  if (lastMessage?.role === "assistant") {
                    lastMessage.text += text;
                  } else {
                    newLogs.push({
                      text,
                      role: "assistant",
                    });
                  }
                  return newLogs;
                });
              }
            });
          }
          if (content?.event === "thread.message.delta") {
            if (processing) {
              setProcessing(false);
            }
            if (!isTyping) {
              setIsTyping(true);
            }
            const text = content?.data?.delta?.content?.[0]?.text?.value ?? "";
            setChatLogs((prev) => {
              const newLogs = cloneDeep(prev);
              const lastMessage = newLogs?.[newLogs.length - 1];
              if (lastMessage?.role === "assistant") {
                lastMessage.text += text;
              } else {
                newLogs.push({
                  text,
                  role: "assistant",
                });
              }
              return newLogs;
            });
          }
        }
      }
    }
  };

  return (
    <div
      className="relative min-h[calc(100vh - 179px)] max-w-7xl mx-auto"
      style={{
        minHeight: "calc(100vh - 80px)",
      }}
    >
      <h1 className="text-xl sm:text-2xl text-center mt-2 relative ">
        <span className="flex items-center space-x-2 justify-center">
          <span className="sm:flex absolute left-2 text-base hidden ">
            Bạn còn {userData?.credits ?? 0} lượt hỏi demo
            <Wand size={24} className="mr-3 text-blue-500" />
          </span>
          <span>Recipe Assistant </span>
          <BotIcon color="blue" />
        </span>
      </h1>
      <div
        ref={chatRef}
        style={{
          height: "calc(100vh - 230px)",
        }}
        className="overflow-y-auto mt-2 sm:mt-4 p-3 sm:p-8 rounded-lg no-scrollbar "
      >
        {chatLogs.map((log, index) =>
          log.role === "user" ? (
            <div key={index} className="relative p-2 sm:p-6">
              <span className="text-gray-500">
                <User
                  className="sm:absolute left-0 sm:-translate-x-[120%]"
                  size={27}
                />
              </span>
              <div bg-gray-50>{log.text}</div>
            </div>
          ) : (
            <div key={index} className="relative ">
              <span className="text-gray-500 ">
                <BotIcon
                  className="sm:absolute left-0 sm:-translate-x-[120%]"
                  size={27}
                />
              </span>
              <CustomReactMarkdown
                content={log.text}
                className="p-2 sm:p-6  bg-gray-100 my-3"
              />
            </div>
          )
        )}
        {processing && (
          <div className="flex items-center space-x-2">
            <span className="animate-spin ">
              <CircleSlash />
            </span>
          </div>
        )}
      </div>
      <div className="absolute w-full left-0 bottom-0 text-sm">
        <div className="w-10/12 mx-auto sm:hidden">
          <span className="text-gray-500 flex ">
            <span> {userData?.credits ?? 0} lượt hỏi demo</span>
            <Wand size={24} className="mr-3 text-blue-500" />
          </span>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-4 w-10/12  mx-auto  relative "
        >
          <Textarea
            className="text-sm sm:text-md md:text-xl px-8 sm:px-4"
            placeholder="Tôi dùng máy ảnh XS-10, tôi sẽ chụp ảnh cho mẫu nữ vào buổi sáng vào lúc 6h sáng"
            id="prompt"
            {...register("prompt")}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(onSubmit)();
              }
            }}
          />
          <Button
            size={"sm"}
            variant={"link"}
            type="submit"
            className="absolute right-0 sm:right-3 px-1 sm:px-3 top-1/2 -translate-y-1/2"
            disabled={processing || !prompt || isTyping}
          >
            <SendHorizonalIcon />
          </Button>
        </form>
      </div>
    </div>
  );
}

export default WithAuth(Page);
