function generateNewTrainingsPlan() {
  var sheetName = "Tabellenblatt1"; //name of the table paper 
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
    baseHeader.push('Tag '  + i + '.', 'Übung', 'Wiederholungen', 'Startgewicht', '');
    console.log(baseHeader);
  }

  //clear the old cells
  for (let i = 0; i<= 35; i++) {
    for(let j = 0; j <= parseInt(numberOfExercises) + 1; j++) {
      sheet.getRange(startRow + j, startColumn + i).clear();
    }
    sheet.getRange(startRow,startColumn + i).clear();
  }

  // Create the table based on the trainingsDaysValue
  var numRows = parseInt(numberOfExercises); //
  var tableStartRange = sheet.getRange(startRow, startColumn, 1, baseHeader.length);
  tableStartRange.setValues([baseHeader]);

  //Change the background color all light blue
  for(var i = 0; i <= baseHeader.length - 2; i++) {
    for(var j = 0; j <= parseInt(numberOfExercises) + 1; j++){
      sheet.getRange(startRow + j, startColumn + i).setBackground("lightblue");
    }
    sheet.getRange(startRow,startColumn + i).setBackground("lightgrey");
  }
}

function onEdit(e) {
  //declare variables 
  var sheetName = "Tabellenblatt1";
  var trainingsDaysCell = "B4";

  //get information from the edit
  var sheet = e.source.getActiveSheet();
  var range = e.range;

  Logger.log("onEdit wurde ausgelöst!");
  Logger.log("Tabellenblatt: " + sheet.getName());
  Logger.log("Bearbeitete Zelle: " + range.getA1Notation());

  if(sheet.getName() === sheetName && range.getA1Notation() === trainingsDaysCell) {
    Logger.log("Dropdown Wert geändert: " + range.getValue());
    generateNewTrainingsPlan();
  }

}
