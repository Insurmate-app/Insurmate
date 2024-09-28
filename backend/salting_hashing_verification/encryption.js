const bcrypt = require("bcrypt");
const saltRounds = 10; // Number of salt rounds

// Hashing the password
async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("Hashed Password:", hashedPassword);
    return hashedPassword;
  } catch (err) {
    console.error(err);
  }
}

// Function to compare a plain password with the hashed password
async function checkPassword(plainPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    if (isMatch) {
      console.log("Password is correct!");
    } else {
      console.log("Password is incorrect!");
    }
    return isMatch;
  } catch (err) {
    console.error(err);
  }
}

// Wrapping the execution in an async function
async function run() {
  let args = process.argv;
  let plainPassword = args[2];

  const hashedPassword = await hashPassword(plainPassword);

  // Simulate password check
  await checkPassword(plainPassword, hashedPassword);
}

// Run the async function
run();
