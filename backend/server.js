const dotenv = require("dotenv");
const { server } = require("./src/app");

dotenv.config();

// Connect to MongoDB


const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
