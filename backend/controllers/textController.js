import { documentLoader } from "../services/documentLoader.js";

export const handleFile = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    "📂 Uploaded file:", file.originalname;

    // Pass file.path (not buffer)
    const { docs, sourceId } = await documentLoader(file.path, "file");

    "✅ Docs Loaded:", docs.length;
    res.json({
      success: true,
      chunks: docs.length,
      extraData: file.originalname,
      type: "text",
      sourceId,
    });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "Error processing file" });
  }
};

export const handleText = async (req, res) => {
  const text = req.body.text;
  if (!text) return res.status(400).json({ error: "No text provided" });

  try {
    "📝 Text:", text;

    const { docs, sourceId } = await documentLoader(text, "text");

    "✅ Docs Loaded:", docs.length;
    res.json({
      success: true,
      chunks: docs.length,
      extraData: "Text Input",
      type: "text",
      sourceId,
    });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Error processing text" });
  }
};

export const handleWebsite = async (req, res) => {
  const website = req.body.website;
  if (!website) return res.status(400).json({ error: "No website provided" });

  if (website.includes("youtube.com") || website.includes("youtu.be")) {
    return res.status(400).json({
      error:
        "YouTube URLs are not allowed here. Please use the YouTube option.",
    });
  }

  const websiteRegex =
    /^(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  if (!websiteRegex.test(website))
    return res.status(400).json({ error: "Invalid website URL" });

  try {
    "🌐 Website:", website;

    const { docs, sourceId } = await documentLoader(website, "fullWebsite");

    "✅ Docs Loaded:", docs.length;
    res.json({
      success: true,
      chunks: docs.length,
      extraData: website,
      type: "website",
      sourceId,
    });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Error processing website" });
  }
};

export const handleYoutube = async (req, res) => {
  const youtube = req.body.youtube;
  if (!youtube) return res.status(400).json({ error: "No youtube provided" });

  const youtubeRegex =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[&?].*)?$/;

  if (!youtubeRegex.test(youtube)) {
    return res.status(400).json({ error: "Invalid YouTube URL" });
  }

  try {
    "📹 YouTube:", youtube;

    const { docs, sourceId } = await documentLoader(youtube, "youtube");

    "✅ Docs Loaded:", docs.length;
    res.json({
      success: true,
      chunks: docs.length,
      extraData: youtube,
      type: "youtube",
      sourceId,
    });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Error processing youtube" });
  }
};
