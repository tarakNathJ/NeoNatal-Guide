import Groq from "groq-sdk";

let groqInit: Groq;
export function getGroqInstance() {
  if (groqInit) {
    return groqInit;
  }

  if (!process.env.GROQ_API_KEY) {
    return "";
  }
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  groqInit = groq;
  return groqInit;
}
