$(document).ready(function () {

    var currentTime = moment();

  


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBvdTck4KqGMmeta3asK4ux5z169IvZvAA",
    authDomain: "train-49fb3.firebaseapp.com",
    databaseURL: "https://train-49fb3.firebaseio.com",
    projectId: "train-49fb3",
    storageBucket: "",
    messagingSenderId: "986795312593"
  };
  firebase.initializeApp(config);


    var database = firebase.database();

    //setting up the clock
    setInterval(function () {
        $(".current-time").html(moment().format('hh:mm:ss A'))
    }, 1000);


    //on click event function to submit the form information
    $(".submit").on("click", function (event) {

        
        event.preventDefault();

        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();

        var firstTrainTime = moment($("#firstTrainTime").val().trim(), "hh:mm A").format("X");
        var frequency = $("#frequency").val().trim();
        console.log(firstTrainTime);

        currentTime = moment().format("X");

        var divArray = [
    $("#trainName"),
    $("#destination"),
    $("#firstTrainTime"),
    $("#frequency")
  ]


        if (trainName != "" && destination != "" && firstTrainTime != "" && frequency != "") {

            alert("Your Train has been added!");

            console.log(currentTime);
            database.ref().push({
                trainName: trainName,
                destination: destination,
                firstTrainTime: firstTrainTime,
                frequency: frequency
            });

            for (i = 0; i < divArray.length; i++) {
                divArray[i].parent().css("color", "black");
            }

            $("#trainName").val("");
            $("#destination").val("");
            $("#firstTrainName").val("");
            $("#frequency").val("");

                   
        } else {
            alert("You are missing data!");

            for (i = 0; i < divArray.length; i++) {
                if (divArray[i].val() == "") {
                    divArray[i].parent().css("color", "red");
                }
            }
        }
    });

    database.ref().on("child_added", function (childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        
        var trnName = childSnapshot.val().trainName;
        var trnDestination = childSnapshot.val().destination;
        var fstTrnTime = childSnapshot.val().firstTrainTime;
        var trnFrequency = childSnapshot.val().frequency;


   

        var diffTime = moment().diff(moment(firstTrainTime), "minutes");


        //
        var tRemainder = diffTime % trnFrequency;


        //how many minutes till the next train
        var minutesTillTrain = trnFrequency - tRemainder;
        console.log(minutesTillTrain);


        var nextTrain = moment().add(minutesTillTrain, "HH:mm A");
        //Next train arrival
        var theNextTrain = moment(nextTrain).format("HH:mm A");


        //add information to the table

        $(".table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDestination + "</td><td>" + trnFrequency + "</td><td>" + theNextTrain + "</td><td>" + minutesTillTrain + "</td></tr>");

    })
})
