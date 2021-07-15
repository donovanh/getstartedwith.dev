/*
  Generate ebooks from the given MD files
  Before using, install Pandoc locally: https://pandoc.org/installing.html
  THen use Calibre to generate pdf and mobi versions
  Upload them to Gumroad
*/

const fs = require('fs');
const glob = require('glob');
const parseMD = require('parse-md').default;
const epub = require('epub-gen');
const MarkdownIt = require('markdown-it');
const posthtml = require('posthtml');
const highlight = require('posthtml-prism');

const folder = './src/posts/**/*.md';
const md = new MarkdownIt();

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

async function generateBook({ title, slug }, content) {
  const args = `--css ./src/assets/css/book.css --cover-image `.split(' ');

  // Rewrite Image urls
  const srcDir = __dirname.replace('scripts', '');

  const updatedContent = content
    .replace(/## /g, '# ')
    .replace(/### /g, '## ')
    .replace(/#### /g, '### ')
    .replace(/\/assets/g, srcDir + 'src/assets')
    ;

  // Read in CSS to a string to apply
  const css = fs.readFileSync(srcDir + 'src/assets/css/book.css', 'utf8')

  // Render to HTML
  const html = md.render(updatedContent);

  const cleanedHTML = html
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    ;

  const highlighted = await codeHighlight(cleanedHTML);

  const chapters = highlighted.html.split('<h1>').filter(n => n).map(text => {
    const cut = text.split('</h1>');
    return {
      title: cut[0],
      data: cut[1]
    }
  });

  const options = {
    title,
    css,
    tocTitle: 'Contents',
    author: 'Donovan Hutchinson',
    output: `./src/books/${title}.epub`,
    content: [
      ...chapters,
      signoff(title, slug)
    ],
    cover: `./src/assets/img/books/${slug}.png`
  };
  
  const book = await new epub(options);
  await book.promise;

}

async function codeHighlight(source) {
  return posthtml([
    highlight({ inline: true })
  ])
  .process(source)
  .then(result => result);
};

function signoff(title, slug) {
  return {
    title: 'Thank you',
    data: `
      <p>Thank you for purchasing this guide. I hope it has helped you get started with ${title}!</p>
      <p>Please be sure to check <a href="https://getstartedwith.dev">GetStartedWith.dev</a> for more guides.</p>
      <p>If you have feedback or ideas to share, you can reach me anytime at <a href="mailto:donovan@getstartedwith.dev">donovan@getstartedwith.dev</a>.</p>
      <p>Many thanks,</p>
      <p>Donovan Hutchinson<br>
      <a href="https://getstartedwith.dev">getstartedwith.dev</a></p>
    `
  };
}