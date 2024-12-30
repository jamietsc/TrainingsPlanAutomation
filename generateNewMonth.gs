function generateNewMonthPlan() {
  var standardSheetName = "Tabellenblatt1"; //Name des tabellenblatts mit der standardtabelle
  var trainingsDaysCell = "B4";
  var numberOfExercises = 20; // Anzahl der Übungen
  var startRow = 6; // Startzeile der Tabelle in der Standardtabelle
  var startColumn = 1; // Startspalte der Tabelle in der Standardtabelle
  
  //get the current date 
  var now = new Date();
  var month = now.toLocaleDateString('default', {month: 'long'}); 
  var year = now.getFullYear();
  var newSheetName = month + "_" + year; //name of the new table sheet

  // get the table
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var standardSheet = spreadsheet.getSheetByName(standardSheetName);

  if(!standardSheet) {
    throw new Error('Das Tabellenblatt "${standardSheetName}" existiert nicht');
  }

  //check if the tablesheet already exists
  var newSheet = spreadsheet.getSheetByName(newSheetName);
  if(newSheet) {
    spreadsheet.deleteSheet(newSheet); 
  }

  //create new tablesheet 
  newSheet = spreadsheet.insertSheet(newSheetName);

  //load Training Data of the standard table sheet
  var trainingDays = standardSheet.getRange(trainingsDaysCell).getValue();;
  var headerRange = standardSheet.getRange(startRow, startColumn, 1, trainingDays * 5);
  var headers = headerRange.getValues()[0];

  //read exercies from the tablesheet 
  var exerciesRange = standardSheet.getRange(startRow + 1, startColumn, numberOfExercises, trainingDays * 5);
  var exercises = exerciesRange.getValues();

  //check monthly condition
  var firstDay = new Date(now.getFullYear(), now.getMonth(), 1); // Erster Tag des Monats
  var lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Letzter Tag des Monats
  var isThursdayStart = firstDay.getDay() === 4; // Donnerstag = 4
  var isWednesdayEnd = lastDay.getDay() === 3; // Mittwoch = 3

  //create tablesheet 
  for (var week = 0; week < 4; week++) {
    var tableStartRow = week * (numberOfExercises + 3) + 1;
    var tableHeaders = headers.slice();
    var tableExercises = exercises.map(row => row.slice());

    if (isThursdayStart && week === 0) {
      // Nur die zweite Hälfte der Trainingstage
      tableHeaders = headers.slice(trainingDays / 2 * 5);
      tableExercises = exercises.map(row => row.slice(trainingDays / 2 * 5));
    }

    if (isWednesdayEnd && week === 3) {
      // Nur die erste Hälfte der Trainingstage
      tableHeaders = headers.slice(0, trainingDays / 2 * 5);
      tableExercises = exercises.map(row => row.slice(0, trainingDays / 2 * 5));
    }

    // paste table header
    newSheet.getRange(tableStartRow, 1, 1, tableHeaders.length).setValues([tableHeaders]);

    // insert new exercises
    newSheet.getRange(tableStartRow + 1, 1, tableExercises.length, tableHeaders.length).setValues(tableExercises);
  }

  // info if the process went right
  SpreadsheetApp.getUi().alert(`Das Tabellenblatt "${newSheetName}" wurde erfolgreich erstellt.`);
}
