var fs = require('fs');

function code() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function updateHash(filename) {
    var configFile = fs.readFileSync(filename, 'utf-8');
    var lines = configFile.split('\n');
    for (var i = 0; i < lines.length; i++) {
        var l = lines[i];
        if (l.startsWith('permalink:')) {
            lines[i] = `permalink: /${code()}/:month-:day-:year/:title`;
        }
    }
    var content = lines.join('\n');
    fs.writeFileSync('_config.yml', content);
}

function main() {
    updateHash('_config.yml');
    updateHash('home.html');
}

main();