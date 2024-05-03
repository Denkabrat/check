const express = require("express");
const cors = require("cors");
const router = require("./router.js");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const https = require("https");

const app = express();
const PORT = process.env.PORT || 8000;

const privateKeyPath = "./ssl/private-key.pem";
const certificatePath = "./ssl/certificate.pem";

const privateKey = fs.readFileSync(path.resolve(privateKeyPath), "utf8");
const certificate = fs.readFileSync(path.resolve(certificatePath), "utf8");

const credentials = {
  key: privateKey,
  cert: certificate
};

const server = https.createServer(credentials, app);

dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

// server.listen(PORT, () => {
//   console.log(`Сервер запущен на порту ${PORT}`);
// });