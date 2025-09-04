import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { QdrantVectorStore } from "@langchain/community/vectorstores/qdrant";
import { QdrantClient } from "@qdrant/js-client-rest";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

export const handleChats = async (req, res) => {
  const text = req.body.text;
  if (!text) return res.status(400).json({ error: "❌ No text provided" });

  try {
    // 🔹 HuggingFace embeddings init
    const embeddings = new HuggingFaceInferenceEmbeddings({
      apiKey: process.env.HUGGINGFACE_API_KEY,
      model: "sentence-transformers/all-MiniLM-L6-v2",
      provider: "hf-inference",
    });

    // 🔹 Qdrant client init
    const qdrantClient = new QdrantClient({ url: "http://localhost:6333" });

    let vectorStore;

    try {
      // ❗ Existing collection से connect करने की कोशिश
      vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
        client: qdrantClient,
        collectionName: "my_documents",
      });
    } catch (err) {
      ("❌ No existing collection found in Qdrant!");
      return res.status(404).json({
        success: false,
        error: "❌ No collection found. Please upload documents first.",
      });
    }

    // 🔹 अगर collection मिला तो similarity search करो
    const vectorSearcher = vectorStore.asRetriever({
      topK: 3,
    });

    const result = await vectorSearcher.invoke(text);

    "📝 Query:", text;
    "✅ Docs Found:", result.length;
    const SYSTEM_PROMPT = `You are a helpful assistant  who help resolving user query based on the context available to you from PDF file with the contact and page number 
       Only ans based on the available contacts from file only
       
       Context:
       ${JSON.stringify(result)}
       
      
       `;
    const client = new OpenAI({
      apiKey: "AIzaSyAwCf6i5CEhu_aoKnqRecH_ajea_Z_y9PQ",
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    });
    const response = await client.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: text },
      ],
    });
    const answer = response.choices[0].message.content;
    answer;

    res.json({
      success: true,
      chunks: result.length,
      data: result,
      answer: answer,
    });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "❌ Error processing text" });
  }
};
