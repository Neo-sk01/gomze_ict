const tinify = require("tinify");
const fs = require("fs");
const path = require("path");

tinify.key = 'WmHq1W0NpHmtnl8t6fJydkh582FsCPhV';  // Replace with your actual Tinify API key

// Define source and output folders
const sourceDir = path.join(__dirname, "assets/img");
const outputDir = path.join(__dirname, "assets/optimized-images");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to compress images in the directory
const compressImages = () => {
  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      console.error("Could not list the directory.", err);
      process.exit(1);
    }

    files.forEach((file) => {
      const filePath = path.join(sourceDir, file);
      const outputFilePath = path.join(outputDir, file);

      // Compress each image using Tinify
      tinify.fromFile(filePath).toFile(outputFilePath)
        .then(() => {
          console.log(`Optimized ${file}`);
        })
        .catch(err => {
          console.error(`Error optimizing ${file}:`, err);
        });
    });
  });
};

compressImages();
