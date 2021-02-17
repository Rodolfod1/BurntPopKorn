const path = require("path");
const router = require("express").Router();
const userRoutes = require("./API/User");
const movieRoutes = require("./API/Movie");
// API Routes
router.use("/api", movieRoutes);
router.use("/user", userRoutes);

// router.use(function(req, res) {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

module.exports = router;