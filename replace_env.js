var fs = require('fs');
var fileContent = fs.readFileSync('src/environments/environment.prod.ts');
fs.writeFileSync('src/environments/environment.prod.ts', fileContent.toString().replace(/SERVER_URL/g, process.env.SERVER_URL));