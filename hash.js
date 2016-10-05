var fs = require('fs');

function code() {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function updateCodeInFile(filename, startsWith, newvalue) {
    var configFile = fs.readFileSync(filename, 'utf-8');
    var lines = configFile.split('\n');
    for (var i = 0; i < lines.length; i++) {
        var l = lines[i];
        if (l.startsWith(startsWith)) {
            lines[i] = newvalue;
        }
    }
    var content = lines.join('\n');
    fs.writeFileSync(filename, content);
}

function updateFilename(filename, newfilename) {
    fs.renameSync(filename, newfilename);
}

function currentCode() {
    var configFile = fs.readFileSync('_config.yml', 'utf-8');
    var lines = configFile.split('\n');
    for (var i = 0; i < lines.length; i++) {
        var l = lines[i];
        if (l.startsWith('code:')) {
            return l.substring(6, l.length);
        }
    }
    throw new TypeError();
}

function main() {
    var oldcode = currentCode();
    var newcode = code();
    updateCodeInFile('_config.yml', 'permalink:', `permalink: /${newcode}/:month-:day-:year/:title`);
    updateCodeInFile('_config.yml', 'paginate_path:', `paginate_path: /${newcode}/:num/`);
    updateCodeInFile('_config.yml', 'code:', `code: ${newcode}`);
    updateCodeInFile('index.html', '<a href="', `<a href="/${newcode}">enter</a>`);
    updateCodeInFile('_layouts/default.html', '<header><a href="/', `<header><a href="/${newcode}">hcsh</a></header>`);
    updateFilename(oldcode, newcode);
}

main();