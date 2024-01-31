var fs = require('fs')
var path = require('path')

var postDir = "./content/post"

const files = fs.readdirSync(postDir, { recursive: true });

for (let file of files) {
  if (fs.lstatSync(path.join(postDir, file)).isDirectory()) { continue }

  const match = file.match(/[0-9]{4}\/[0-9]{4}-[0-9]{2}-[0-9]{2}-(.*)\.md/);
  if (match) {
    const title = match[1]
    console.log(title)
    writeAt(path.join(postDir, file), 1, `title: ${title}`)
  }
}

function writeAt(file, row, text) {
  var data = fs.readFileSync(file).toString().split("\n");
data.splice(row, 0, text);
var text = data.join("\n");

fs.writeFileSync(file, text, function (err) {
  if (err) return console.log(err);
});
}