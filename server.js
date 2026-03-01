const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const CONTENT_PATH = path.join(__dirname, "content.json");
const DIST_PATH = path.join(__dirname, "dist");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Убедиться, что content.json существует (пустой объект)
function ensureContentFile() {
  if (!fs.existsSync(CONTENT_PATH)) {
    fs.writeFileSync(CONTENT_PATH, "{}", "utf8");
    console.log("Создан пустой content.json");
  }
}
ensureContentFile();

// API: получить текущий контент
app.get("/api/content", (req, res) => {
  fs.readFile(CONTENT_PATH, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        ensureContentFile();
        return res.json({});
      }
      console.error("Ошибка чтения content.json:", err);
      return res.status(500).json({ error: "Cannot read content file" });
    }
    try {
      const json = JSON.parse(data || "{}");
      res.json(json);
    } catch (e) {
      console.error("Ошибка парсинга content.json:", e);
      res.status(500).json({ error: "Invalid content file" });
    }
  });
});

// API: сохранить контент (простая CMS)
app.put("/api/content", (req, res) => {
  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ error: "Content must be an object" });
  }

  fs.writeFile(CONTENT_PATH, JSON.stringify(body, null, 2), "utf8", (err) => {
    if (err) {
      console.error("Ошибка записи content.json:", err);
      return res.status(500).json({ error: "Cannot write content file" });
    }
    res.json({ ok: true });
  });
});

// Статика собранного Vue-приложения
app.use(express.static(DIST_PATH));

// Отдаём index.html для любых маршрутов фронтенда
app.get("*", (req, res) => {
  const indexFile = path.join(DIST_PATH, "index.html");
  if (!fs.existsSync(indexFile)) {
    return res
      .status(500)
      .send("Frontend is not built. Run `npm run build` first.");
  }
  res.sendFile(indexFile);
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

