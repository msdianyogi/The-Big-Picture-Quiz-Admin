//Random Question Id Generator

function setQuestionId(){
    document.getElementById("inputQuestionId").value = Math.floor(1000000000000000 + Math.random() * 1000000000000000);
}
