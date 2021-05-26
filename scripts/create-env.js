const fs = require('fs');


//Esta sentencia de codigo crea el archivo y le asigna texto
fs.writeFileSync('./.env',`API=${process.env.API}\n`)