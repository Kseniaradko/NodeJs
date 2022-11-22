const path = require('path')

console.log(path.dirname(__filename))
console.log(path.basename(__filename))
console.log(path.extname(__filename).slice(1))
console.log(path.parse(__filename))

// Resolve пытается найти путь к определенной папке или файлу
console.log(path.resolve(__dirname, '..', './modules', './app.js'))

// Join конкатенирует строчки
console.log(path.join(__dirname, '..', './modules', './app.js'))
