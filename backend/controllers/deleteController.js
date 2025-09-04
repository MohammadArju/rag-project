import { QdrantClient } from "@qdrant/js-client-rest";

export const handleDelete = async (req, res) => {
  const { sourceId } = req.params;
  if (!sourceId) return res.status(400).json({ error: "No sourceId provided" });

  try {
    const qdrantClient = new QdrantClient({ url: "http://localhost:6333" });

    // ✅ सही तरीका: सिर्फ़ उसी sourceId वाले points delete होंगे
    await qdrantClient.delete("my_documents", {
      filter: {
        must: [{ key: "metadata.sourceId", match: { value: sourceId } }],
      },
    });

    "📂 Deleted document with sourceId:", sourceId;
    res.json({ success: true, message: "Deleted successfully", sourceId });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Error deleting sourceId" });
  }
};
