

// Steps to complete:

// 1. Initialize Firebase
// 2. Add new trains - update the html + update the database
// 3. Retrieve trains from the  database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use date-fns formatting to set difference in months.
// 5. Calculate Total billed



  // Initialize Firebase
  var config = {
    
    apiKey: "AIzaSyCZqceeJTQd3FZ4YO9hXV_mS-boU-AvfhY",
    authDomain: "my-first-project-4c49c.firebaseapp.com",
    databaseURL: "https://my-first-project-4c49c.firebaseio.com",
    projectId: "my-first-project-4c49c",
    storageBucket: "my-first-project-4c49c.appspot.com",
    messagingSenderId: "644197139467"
  };
  
  firebase.initializeApp(config);



var database = firebase.database();



var format = dateFns.format

// 2. Button for adding Employees
$("#submit-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#employee-name-input").val().trim();
  var destination = $("#role-input").val().trim();
  var time = format($("#start-input").val().trim(), "MM/DD/YYYY")
  var frequency = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain= {
    name: trainName,
    role: destination,
    start: time,
    rate: frequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.role);
  console.log(newTrain.start);
  console.log(newTrain.rate);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#employee-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().role;
  var time = childSnapshot.val().start;
  var frequency = childSnapshot.val().rate;

  // Employee Info
  console.log(trainName);
  console.log(destination);
  console.log(time);
  console.log(frequency);

  // Prettify the employee start
  var timePretty = format(time, "MM/DD/YYYY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var empMonths = dateFns.differenceInMonths(new Date(), time)
  console.log(empMonths);

  // Calculate the total billed rate
  var empBilled = empMonths * frequency;
  console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(timePretty),
    $("<td>").text(empMonths),
    $("<td>").text(frequency),
    $("<td>").text(empBilled)
  );

  // Append the new row to the table
  $("#employee-table > tbody").append(newRow);
});

//  Time Math
// -----------------------------------------------------------------------------


//  date-fns 