const sharp = require('sharp');

const fs = require('fs');

const imagePath = 'imagesSrc/';

function readFolderFilenames() {
  let imageNames = [];
  fs.readdirSync(imagePath).forEach(file => {
    imageNames.push(file);
  });
  return imageNames;
}

async function crop(imageUrl, imageFileName) {
  try {
    await sharp(imageUrl)
      .trim()
      .toFile(`imageProcessed/${imageFileName}`)
  } catch (err) {
    console.log(err)
  }
}

async function main() {
  let imageFilenames = readFolderFilenames();

  const promises = imageFilenames.map(async (imageFileName) => {
    let imageUrl = `${imagePath}${imageFileName}`

    await crop(imageUrl, imageFileName);
  })

  await Promise.all(promises);

  console.log('Ready');
}

main()
