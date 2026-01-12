require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());
// Serve uploaded images
app.use('/upload', express.static(__dirname + '/upload'));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));


app.use("/api", require("./routes/userRoutes"));
app.use("/api", require("./routes/studentRoutes"));
app.use("/api", require("./routes/loginRoutes"));
app.use("/api", require("./routes/userLogRoutes"));
app.use("/api", require("./routes/rollUserRoutes"));
app.use("/api", require("./routes/classRoutes"));
app.use("/api", require("./routes/majorRoutes"));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));