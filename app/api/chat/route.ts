import Groq from "groq-sdk";
import { NextRequest } from "next/server";
import { getSystemPrompt } from "@/utils/Prompts";
import type { Message } from "@/types";
import { getGroqInstance } from "@/utils/GroqInstance";

export async function POST(req: NextRequest) {
  try {
    const {
      messages,
      babyAge = "0-4w",
      topic = "feeding",
      language = "english",
    }: {
      messages: Message[];
      babyAge: string;
      topic: string;
      language: string;
    } = await req.json();

    // chack user message
    // then chack groq api key exist or not
    // get  groq instance
    // chack getGroqInstance function  responce
    // then formating information
    //  sending messages to the AI and it generates a response
    // return responce

    if (
      !messages ||
      !Array.isArray(messages) ||
      messages.length === 0 ||
      !messages[0]?.content?.trim()
    ) {
      return Response.json(
        { error: "Please enter a message" },
        { status: 400 },
      );
    }

    const groq = getGroqInstance();

    if (!groq) {
      return Response.json(
        { error: "API key not configured" },
        { status: 500 },
      );
    }

    const formattedMessages = messages.map((m) => ({
      role: m.role === "user" ? "user" : ("assistant" as "user" | "assistant"),
      content: m.content,
    }));

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1500,
      temperature: 0.7,
      messages: [
        { role: "system", content: getSystemPrompt(babyAge, topic, language) },
        ...formattedMessages,
      ],
    });

    const text = completion.choices[0]?.message?.content || "";
    return Response.json({ content: text });
  } catch (error) {
    console.error("Groq API error:", error);
    return Response.json(
      { error: "Failed to get response. Please try again." },
      { status: 500 },
    );
  }
}
