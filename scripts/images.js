/*
  Generate social images and book covers for all posts
*/

const fs = require("fs");
const glob = require("glob");
const parseMD = require("parse-md").default;
const puppeteer = require("puppeteer");
const resizeImg = require("resize-img");

const folder = "./src/posts/**/*.md";

glob(folder, {}, function (er, files) {
  let i = 1; // Count to include ignored template
  const filesToProcess = files.filter((file) => !file.includes("_template"));
  filesToProcess.forEach(async (file) => {
    if (file.includes("_template")) {
      return;
    }
    const fileContents = fs.readFileSync(file, "utf8");
    const { metadata, content } = parseMD(fileContents);
    await generateSocialImage(metadata);
    await generateBookImage(metadata);
    if (i === filesToProcess.length) {
      console.log("Closing social image process");
      process.exit(0);
    }
    i++;
  });
});

async function generateSocialImage({ title, description, homeImage, slug }) {
  console.log("Generating social image for: ", slug);

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  const queryString = `title=${encodeURIComponent(
    title
  )}&description=${encodeURIComponent(description)}&image=${encodeURIComponent(
    homeImage
  )}`;

  await page.goto(`http://localhost:8080/generate/social?${queryString}`);
  await page.setViewport({
    width: 1200,
    height: 630,
    deviceScaleFactor: 1,
  });
  await page.screenshot({
    path: `./src/assets/img/social/${slug}.png`,
  });

  await page.setViewport({
    width: 1000,
    height: 1000,
    deviceScaleFactor: 1,
  });
  await page.screenshot({
    path: `./src/assets/img/social/${slug}-square.png`,
  });

  console.log("Social screenshot written for: ", slug);
}

async function generateBookImage({ title, description, homeImage, slug }) {
  console.log("Generating book image for: ", slug);

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  const queryString = `title=${encodeURIComponent(
    title
  )}&description=${encodeURIComponent(description)}&image=${encodeURIComponent(
    homeImage
  )}`;
  await page.goto(`http://localhost:8080/generate/book?${queryString}`);
  await page.setViewport({
    width: 1000,
    height: 1600,
    deviceScaleFactor: 2.5,
  });
  const path = `./src/assets/img/books/`;
  await page.screenshot({ path: `${path}${slug}.png` });

  // Create thumbnail book image
  await createResizedImage({
    path,
    slug,
    width: 100,
    height: 160,
    name: "thumb",
  });
  // Create medium-sized image
  await createResizedImage({
    path,
    slug,
    width: 400,
    height: 640,
    name: "medium",
  });
  console.log("Book image written for: ", slug);
}

async function createResizedImage({ path, slug, width, height, name }) {
  const image = await resizeImg(fs.readFileSync(`${path}${slug}.png`), {
    width,
    height,
  });
  fs.writeFileSync(`${path}${slug}-${name}.png`, image);
}
