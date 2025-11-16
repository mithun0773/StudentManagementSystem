let students = JSON.parse(localStorage.getItem("students")) || [];

const nameInput = document.getElementById("name");
const deptInput = document.getElementById("dept");
const marksInput = document.getElementById("marks");
const addBtn = document.getElementById("addBtn");
const studentTable = document.getElementById("studentTable");
const searchBox = document.getElementById("searchBox");

addBtn.addEventListener("click", () => {
  const name = nameInput.value;
  const dept = deptInput.value;
  const marks = marksInput.value;

  if (name === "" || dept === "" || marks === 0) {
    alert("Enter valid data's");
    return;
  }
  const newStudent = {
    id: Date.now(),
    name,
    dept,
    marks,
  };

  students.push(newStudent);
  saveData();
  displayStudents();

  nameInput.value = "";
  deptInput.value = "";
  marksInput.value = "";
});

function displayStudents(list = students) {
  studentTable.innerHTML = "";
  list.forEach((stu) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${stu.name}</td>
        <td>${stu.dept}</td>
        <td>${stu.marks}</td>
        <td><button class= "delete-btn" onclick="deleteStudent(${stu.id})">DeleteBtn</button></td>
        
        `;
        studentTable.appendChild(tr);
  });
}

function deleteStudent(id){
    students = students.filter((s) => s.id !== id);
    saveData();
    displayStudents();
}


searchBox.addEventListener("keyup",() => {
    const keyword = searchBox.value.toLowerCase();

    const filtered = students.filter(stu => 
        stu.name.toLowerCase().includes(keyword)
    );
    displayStudents(filtered);
});

function saveData(){
    localStorage.setItem("students",JSON.stringify(students));

}

displayStudents();