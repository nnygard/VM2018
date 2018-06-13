var XLSX = require('XLSX');
var jsonfile = require('jsonfile');
var workbook = XLSX.readFile("VM_BetDraft.xlsx", {dateNF: 'yyyy-mm-dd'});
var worksheet = workbook.Sheets["Sheet1"];
XLSX.utils.format_cell(worksheet);
var obj = XLSX.utils.sheet_to_json(worksheet);
var jsonfile = require('jsonfile');
var file = '../src/data.json';

jsonfile.writeFile(file, obj, function (err) {
if (err){
  console.error(err);
  }
})
