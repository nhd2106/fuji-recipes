"use client";

import CustomReactMarkdown from "@/components/CustomMarkdown";
import WithAuth from "@/components/WithAuth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cloneDeep } from "lodash";
import {
  BotIcon,
  CircleSlash,
  SendHorizonalIcon,
  TypeIcon,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Message = {
  text: string;
  role: string;
};

function Page() {
  const [prompt, setPrompt] = useState<string>("");
  const [chatLogs, setChatLogs] = useState<Message[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const lastMessage = chatLogs?.[chatLogs.length - 1]?.text;
  const [processing, setProcessing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [lastMessage]);

  const handleSubmit = async () => {
    if (!prompt) {
      return;
    } else {
      setPrompt("");
      setChatLogs((prev) => [
        ...prev,
        {
          text: prompt,
          role: "user",
        },
      ]);
      const formdata = new FormData();
      formdata.append("prompt", prompt);
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
      className="relative min-h[calc(100vh - 169px)] max-w-7xl mx-auto"
      style={{
        minHeight: "calc(100vh - 80px)",
      }}
    >
      <h1 className="text-2xl text-center mt-2">
        <span className="flex items-center space-x-2 justify-center">
          <span>Recipe Assistant </span>
          <BotIcon color="blue" />
        </span>
      </h1>
      <div
        ref={chatRef}
        style={{
          height: "calc(100vh - 230px)",
        }}
        className="overflow-y-auto mt-4 p-8 rounded-lg no-scrollbar "
      >
        {chatLogs.map((log, index) =>
          log.role === "user" ? (
            <div key={index} className="relative  bg-gray-50 p-6">
              <span className="text-gray-500">
                <User
                  className="absolute left-0 -translate-x-[120%]"
                  size={27}
                />
              </span>
              <p>{log.text}</p>
            </div>
          ) : (
            <div key={index} className="relative ">
              <span className="text-gray-500">
                <BotIcon
                  className="absolute left-0 -translate-x-[120%]"
                  size={27}
                />
              </span>
              <CustomReactMarkdown
                content={log.text}
                className="p-6  bg-gray-100 my-3"
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
      <div className="absolute w-full left-0 bottom-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex gap-4 w-10/12  mx-auto  relative "
        >
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="text-lg"
            placeholder="Tôi dùng máy ảnh XS-10, ngày mai tôi sẽ chụp ảnh cho người mẫu nữ vào buổi sáng vào lúc 6h-8h sáng"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <Button
            size={"sm"}
            variant={"link"}
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2"
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
