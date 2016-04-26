const fs = require('fs');

module.exports = {
  write: function(fileNamePrepend, result)
  {
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();
    var monthFull = (month < 9 ? '0' : '') + month;
    var fileName = fileNamePrepend + '_' + year
      + '-' + monthFull + '-' + day + '.json';

    fs.writeFile(fileName, JSON.stringify(result, null, '  '));
    //console.log();
  }
}
