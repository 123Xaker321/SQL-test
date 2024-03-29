const path = require('path');
const createPath = (page) => path.resolve(__dirname, '../public', `${page}.html`);
module.exports = createPath;