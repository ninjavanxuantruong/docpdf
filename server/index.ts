import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/pdf/:id", async (req, res) => {
  const fileId = req.params.id;
  const driveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

  try {
    const response = await fetch(driveUrl);
    if (!response.ok) throw new Error("Drive fetch failed");

    const buffer = await response.buffer();
    res.setHeader("Content-Type", "application/pdf");
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Không thể tải PDF từ Google Drive.");
  }
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
