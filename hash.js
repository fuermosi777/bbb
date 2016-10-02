var fs = require('fs');

function code() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var configFile = fs.readFileSync('_config.yml', 'utf-8');
var lines = configFile.split('\n');
for (var l of lines) {
    if (l.startsWith('permalink:')) {
        l = `permalink: /${code()}/:month-:day-:year/:title`
    }
}
var content = lines.join('\n');
fs.writeFileSync('_config.yml', content);