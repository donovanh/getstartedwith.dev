/*
  Generate ebooks from the given MD files
  Before using, install Pandoc locally: https://pandoc.org/installing.html
*/

const fs = require('fs');
const glob = require('glob');
const parseMD = require('parse-md').default;
const pandoc = require('node-pandoc-promise');

const folder = './src/posts/**/*.md';

glob(folder, {}, function (er, files) {
  let i = 1; // Count to include ignored template
  const filesToProcess = files.filter(file => !file.includes('_template'));
  filesToProcess.forEach(async file => {
    if (file.includes('_template')) {
      return;
    }
    const fileContents = fs.readFileSync(file, 'utf8')
    const { metadata, content } = parseMD(fileContents)
    await generateBook(metadata, content);
    if (i === filesToProcess.length) {
      console.log('Closing book conversion process')
      process.exit(0);
    }
    i++;
  });
});

async function generateBook({ slug }, content) {
  const src = content;
  const args = `-f markdown -t epub --css ./src/assets/css/book.css --cover-image ./src/assets/img/books/${slug}.png`.split(' ');
  await pandoc(src, args);
}