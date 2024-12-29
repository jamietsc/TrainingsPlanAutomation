function myFunction() {
  var sheetName = "Tabellenblatt1"; //name of the table paper || name need to be changed everytime??? wtf
  var trainingDaysCell = "B4";
  var numberOfExercises = "20";
  var baseHeader = [];
  var startRow = 6;
  var startColumn = 1;

  //load spreadsheet 
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  //load the chosen days of the dropdown menu 
  var trainingDaysValue = sheet.getRange(trainingDaysCell).getValue();
  console.log(trainingDaysValue);

  //generate the header 
  for (let i = 1; i <= trainingDaysValue; i++){
    baseHeader.push('Tag'  + i + '.', 'Übung', 'Wiederholungen', 'Startgewicht', '');
    console.log(baseHeader);
  }

  // Create the table based on the trainingsDaysValue
  var numRows = parseInt(numberOfExercises); //
  var tableStartRange = sheet.getRange(startRow, startColumn, 1, baseHeader.length);
  tableStartRange.setValues([baseHeader]);
}
