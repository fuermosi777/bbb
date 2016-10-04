var fs = require('fs');

function code() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function updateHash(filename, startsWith, newValue) {
    var configFile = fs.readFileSync(filename, 'utf-8');
    var lines = configFile.split('\n');
    for (var i = 0; i < lines.length; i++) {
        var l = lines[i];
        if (l.startsWith(startsWith)) {
            lines[i] = newValue;
        }
    }
    var content = lines.join('\n');
    fs.writeFileSync(filename, content);
}

function main() {
    var c = code();
    updateHash('_config.yml', 'permalink:', `permalink: /${c}/:month-:day-:year/:title`);
    updateHash('home.html', 'permalink:', `permalink: /${c}/home`);
    updateHash('index.html', '<a href="', `<a href="/${c}/home">enter</a>`)
}

main();