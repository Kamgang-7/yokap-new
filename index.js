const express = require("express");
const app = express();
const cors = require('cors');
const port = 3000;
const studentsRouter = require("./routes/studentsRoutes");

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/transactions", studentsRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log("Bienvenue");
  console.log(`students app listening at http://localhost:${port}`);
});