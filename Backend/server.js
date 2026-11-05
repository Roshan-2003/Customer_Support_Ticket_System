const express = require("express");
const cors = require("cors");
require("dotenv").config();

const ticketRoutes = require("./routes/ticketRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/tickets", ticketRoutes);
app.use("/api/comments", commentRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Customer Support API is running",
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});