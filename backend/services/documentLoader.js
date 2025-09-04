import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveUrlLoader } from "@langchain/community/document_loaders/web/recursive_url";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { QdrantVectorStore } from "@langchain/community/vectorstores/qdrant";
import { QdrantClient } from "@qdrant/js-client-rest";
import { compile } from "html-to-text";
import { v4 as uuidv4 } from "uuid"; // ✅ नया import
import dotenv from "dotenv";
dotenv.config();
/**
 * documentLoader: Handles PDF, Text, or Full Website Crawl
 * @param {string} input - File path, text, or website URL
 * @param {"file" | "text" | "fullWebsite"} type - Type of input
 */
export const documentLoader = async (input, type = "file") => {
  let rawDocs;

  // 1️⃣ Load documents based on type
  if (type === "file") {
    const loader = new PDFLoader(input, { splitPages: true });
    rawDocs = await loader.load();
  } else if (type === "text") {
    rawDocs = [{ pageContent: input, metadata: { source: "text" } }];
  } else if (type === "fullWebsite") {
    try {
      const compiledConvert = compile({ wordwrap: 130 });
      const loader = new RecursiveUrlLoader(input, {
        extractor: compiledConvert,
        maxDepth: 2, // adjust depth as needed
      });
      rawDocs = await loader.load();
    } catch (error) {
      throw new Error("❌ Failed to fetch full website: " + error.message);
    }
  } else if (type === "youtube") {
    const loader = YoutubeLoader.createFromUrl(input, {
      language: "en",
      addVideoInfo: true,
    });

    rawDocs = await loader.load();
  } else {
    throw new Error("❌ Unknown type provided");
  }

  // 2️⃣ Split into chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 800,
    chunkOverlap: 100,
  });
  const docs = await splitter.splitDocuments(rawDocs);
  const sourceId = uuidv4();

  // 3️⃣ Generate embeddings
  const embeddings = new HuggingFaceInferenceEmbeddings({
    apiKey: process.env.HUGGINGFACE_API_KEY,
    model: "sentence-transformers/all-MiniLM-L6-v2",
    provider: "hf-inference",
  });

  // 4️⃣ Connect to Qdrant
  const qdrantClient = new QdrantClient({ url: "http://localhost:6333" });

  // 5️⃣ Save documents to Qdrant
  await QdrantVectorStore.fromDocuments(
    docs.map((doc) => ({
      ...doc,
      metadata: { ...doc.metadata, sourceId, type }, // ✅ attach sourceId
    })),
    embeddings,
    {
      client: qdrantClient,
      collectionName: "my_documents",
    }
  );

  "✅ Stored in Qdrant:", docs.length, "chunks";
  return { docs, sourceId };
};
