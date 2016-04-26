const fs = require('fs');

module.exports = {
  write: function(fileNamePrepend, result)
  {
    var fileName = 'results/' + fileNamePrepend + '-' + Date.now() + '.json';

    fs.writeFile(fileName, JSON.stringify(result, null, '  '));
  }
}
