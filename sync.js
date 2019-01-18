const Parser = require("rss-parser");
const fs = require("fs");
const cheerio = require("cheerio");

const parser = new Parser();

(async () => {
  console.log(`Starting...`);
  let feed = await parser.parseURL(
    "https://www.douban.com/feed/people/hcsh/notes"
  );
  console.log(`Resource fetched: ${feed.title}`);

  feed.items.forEach(item => {
    let date = new Date(item.pubDate);
    let postTitle = item.title.replace(/ \./g, "-");
    let postYear = date.getFullYear();
    let postMonth = date.getMonth() + 1;
    let postDate = date.getDate();
    let postFileTitle = `${postYear}-${postMonth}-${postDate}-${postTitle}.md`;
    let postFileName = `./_posts/${postYear}/${postFileTitle}`;
    // See if post tile already exists.
    if (fs.existsSync(postFileName)) {
      console.warn(`Post with name ${postFileTitle} already exists. Skip.`);
    } else {
      console.log(`New Post: ${postFileTitle}. Writing...`);
      const encodedContent = item["content:encoded"];
      const $ = cheerio.load(encodedContent);
      let postContent = `---\nlayout: post\n---\n\n`;
      const ps = $("p");
      ps.each((_, elem) => {
        postContent += $(elem).text();
        if (_ !== ps.length - 1) {
          postContent += "\n\n";
        }
      });
      if (!fs.existsSync(`./_posts/${postYear}`)) {
        fs.mkdirSync(`./_posts/${postYear}`, {recursive: true});
      }
      fs.writeFileSync(postFileName, postContent, 'utf-8');
      console.log(`${postFileTitle} added.`);
    }
  });
  console.log(`Done!`);
})();
