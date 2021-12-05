// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyChI0IvZfdZK4njzNa2Fe7OFPmrKVtL8MA",
    authDomain: "picture-quiz-application.firebaseapp.com",
    databaseURL: "https://picture-quiz-application-default-rtdb.firebaseio.com",
    projectId: "picture-quiz-application",
    storageBucket: "picture-quiz-application.appspot.com",
    messagingSenderId: "276073581645",
    appId: "1:276073581645:web:6dfd2cca754cb0b0106004",
    measurementId: "G-GM10C98EL4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getDatabase, ref, get, set, child, update, remove }
    from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";

const db = getDatabase();
// References

var questionId = document.getElementById("inputQuestionId");
var imageUrl = document.getElementById("inputImageUrl");
var imageSource = document.getElementById("inputImageSource");
var question = document.getElementById("inputQuestion");
var optionOne = document.getElementById("inputOptionOne");
var optionTwo = document.getElementById("inputOptionTwo");
var optionThree = document.getElementById("inputOptionThree");
var optionFour = document.getElementById("inputOptionFour");
var correctOption = document.getElementById("inputCorrectOption");
var category = document.getElementById("inputCategory");
var difficultyLevel = document.getElementById("inputDifficultyLevel");

var submitForm = document.getElementById("TBPQ");
var updateData = document.getElementById("inputUpdateData");
var getUpdateData = document.getElementById("inputGetUpdateData");
var deleteData = document.getElementById("inputDeleteData");
// Insert Data Function 

function InsertData() {
    set(ref(db, "Question/" + questionId.value), {
        questionId: questionId.value,
        imageUrl: imageUrl.value,
        imageSource: imageSource.value,
        question: question.value,
        optionOne: optionOne.value,
        optionTwo: optionTwo.value,
        optionThree: optionThree.value,
        optionFour: optionFour.value,
        correctOption: correctOption.value,
        category: category.value,
        difficultyLevel: difficultyLevel.value,
    })
        .then(() => {
            alert("Data Stored Successfully..!");
            window.location.reload();
        })
        .catch((error) => {
            alert("Error Occured ," + error)
        });
    document.getElementById("TBPQ").reset();
}
// Select Data Function

function SelectData() {
    const dbref = ref(db);
    get(child(dbref, "Question/")).then((snapshot) => {
        if (snapshot.exists()) {
            let table = '<table class="table table-striped text-center table-bordered table-hover">';
            table += `<tr>
                <td>Question Id</td>
                <td>Image Url</td>
                <td>Image Source</td>
                <td>Question</td>
                <td>Option 1</td>
                <td>Option 2</td>
                <td>Option 3</td>
                <td>Option 4</td>
                <td>Correct Option</td>
                <td>Category</td>
                <td>Difficulty Level</td>
                <td></td>
            </tr>`;
            Object.keys(snapshot.val()).map(function (key) {
                table = table + `<tr>`;
                table = table + `<td>${snapshot.val()[key].questionId}</td>`;
                table = table + `
                <td>
                    <img src="${snapshot.val()[key].imageUrl}" height="100px" width="100px"/>
                </td>`;
                table = table + `<td>${snapshot.val()[key].imageSource}</td>`;
                table = table + `<td>${snapshot.val()[key].question}</td>`;
                table = table + `<td>${snapshot.val()[key].optionOne}</td>`;
                table = table + `<td>${snapshot.val()[key].optionTwo}</td>`;
                table = table + `<td>${snapshot.val()[key].optionThree}</td>`;
                table = table + `<td>${snapshot.val()[key].optionFour}</td>`;
                table = table + `<td>${snapshot.val()[key].correctOption}</td>`;
                table = table + `<td>${snapshot.val()[key].category}</td>`;
                table = table + `<td>${snapshot.val()[key].difficultyLevel}</td>`;
                table = table + `<td> <input class="btn btn-info" type="button" value="Select" onclick="getId(${snapshot.val()[key].questionId})"/>`;
                table += `</tr>`;
            });
            table += "</table>";
            document.getElementById("table").innerHTML = table;
        }
        else {
            alert("No Data Found");
        }
    }).catch((error) => {
        alert("Error Occured ," + error)
    })
}

function GetDataToUpdateData() {

    const dbref = ref(db);
    get(child(dbref, "Question/" + questionId.value))
        .then((snapshot) => {
            if (snapshot.exists()) {
                imageUrl.value = snapshot.val().imageUrl;
                imageSource.value = snapshot.val().imageSource;
                question.value = snapshot.val().question;
                optionOne.value = snapshot.val().optionOne;
                optionTwo.value = snapshot.val().optionTwo;
                optionThree.value = snapshot.val().optionThree;
                optionFour.value = snapshot.val().optionFour;
                correctOption.value = snapshot.val().correctOption;
                category.value = snapshot.val().category;
                difficultyLevel.value = snapshot.val().difficultyLevel;
                console.log(snapshot.val());
            }
            else {
                alert("No Data Found");
            }
        }).catch((error) => {
            alert("Error Occured ," + error)
        })
}
//Update Data Function
function UpdateData() {
    update(ref(db, "Question/" + questionId.value), {
        imageUrl: imageUrl.value,
        imageSource: imageSource.value,
        question: question.value,
        optionOne: optionOne.value,
        optionTwo: optionTwo.value,
        optionThree: optionThree.value,
        optionFour: optionFour.value,
        correctOption: correctOption.value,
        category: category.value,
        difficultyLevel: difficultyLevel.value,
    })
        .then(() => {
            alert("Data Updated Successfully..!")
            window.location.reload();
        })
        .catch((error) => {
            alert("Error Occured ," + error)
        });
    document.getElementById("TBPQ").reset();
    console.log("Update Data Function...!");
}

function DeleteData() {
    console.log("Delete Data...!")
    const dbref = ref(db);
    get(child(dbref, "Question/" + questionId.value))
        .then((snapshot) => {
            if (snapshot.exists()) {
                remove(ref(db, "Question/" + questionId.value))
                    .then(() => {
                        alert("Data Removed Successfully..!");
                        window.location.reload();
                    })
                    .catch((error) => {
                        alert("Error Occured ," + error)
                    });
                document.getElementById("TBPQ").reset();
            }
            else {
                alert("No Data Found");
            }
        }).catch((error) => {
            alert("Error Occured ," + error)
        })
}

submitForm.addEventListener('submit', InsertData);
updateData.addEventListener('click', UpdateData);
getUpdateData.addEventListener('click', GetDataToUpdateData);
deleteData.addEventListener('click', DeleteData);
window.addEventListener('load', SelectData);