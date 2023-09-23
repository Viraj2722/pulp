require("dotenv").config();
const express = require("express");
const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use("/api", require("./routes/api.js"));
app.use("/raw", require("./routes/raw.js"));
app.use("/print", require("./routes/print.js"));
app.use("/dl", require("./routes/download.js"));
app.use("/", require("./routes/[pulp].js"));

app.get("/", (req, res) => {
  res.render("index");
})

app.get('*', ({ res }) => {
  res.set("content-type", "text/plain");
  res.status(404).send("not found");
});

app.listen(parseInt(PORT), () => {
  console.log(`server started at port ${PORT}`);
});
