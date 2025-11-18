import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Bật CORS cho tất cả origin (có thể giới hạn nếu muốn)
app.use(cors());

app.get("/pdf/:id", async (req, res) => {
  const fileId = req.params.id;
  const driveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

  try {
    const response = await fetch(driveUrl);
    if (!response.ok) throw new Error("Drive fetch failed");

    const buffer = await response.buffer();

    // Trả về PDF với header CORS
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Access-Control-Allow-Origin", "*"); // đảm bảo cho browser
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Không thể tải PDF từ Google Drive.");
  }
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
