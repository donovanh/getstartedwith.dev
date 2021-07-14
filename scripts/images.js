/*
  Generate social images and book covers for all posts
*/

const folder = './src/posts/**/*.md';
const fs = require('fs');
const glob = require('glob');
const parseMD = require('parse-md').default;
const puppeteer = require('puppeteer');

glob(folder, {}, function (er, files) {
  let i = 1; // Count to include ignored template
  const filesToProcess = files.filter(file => !file.includes('_template'));
  filesToProcess.forEach(async file => {
    if (file.includes('_template')) {
      return;
    }
    const fileContents = fs.readFileSync(file, 'utf8')
    const { metadata, content } = parseMD(fileContents)
    await generateSocialImage(metadata);
    await generateBookImage(metadata);
    if (i === filesToProcess.length) {
      console.log('Closing social image process')
      process.exit(0);
    }
    i++;
  });
});

async function generateSocialImage({ title, description, homeImage, slug} ) {
  
  console.log('Generating social image for: ', slug);

  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  const queryString = `title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&image=${encodeURIComponent(homeImage)}`;

  await page.goto(`http://localhost:8080/generate/social?${queryString}`);
  await page.setViewport({
    width: 1200,
    height: 630,
    deviceScaleFactor: 1,
  });
  await page.screenshot({
    path: `./src/assets/img/social/${slug}.png`
  });
  console.log('Social screenshot written for: ', slug);
}

async function generateBookImage({ title, description, homeImage, slug} ) {
  
  console.log('Generating book image for: ', slug);

  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  const queryString = `title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&image=${encodeURIComponent(homeImage)}`;
  await page.goto(`http://localhost:8080/generate/book?${queryString}`);
  await page.setViewport({
    width: 1000,
    height: 1600,
    deviceScaleFactor: 2.5,
  });
  await page.screenshot({
    path: `./src/assets/img/books/${slug}.png`
  });
  console.log('Book image written for: ', slug);
}