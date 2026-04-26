function getStudents() {
  fetch("http://localhost:5000/api/students")
    .then(res => res.json())
    .then(data => {

      document.getElementById("totalStudents").innerText = data.length;

      let table = document.getElementById("studentTable");
      table.innerHTML = "";

      data.forEach(student => {
        table.innerHTML += `
          <tr>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>${student.phone}</td>
            <td>
              <button class="delete-btn" onclick="deleteStudent('${student._id}')">Delete</button>
            </td>
          </tr>
        `;
      });

    });
}

function addStudent() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let course = document.getElementById("course").value;
  let phone = document.getElementById("phone").value;

  if(!name || !email || !course || !phone)
  {
    alert("All fields are required");
    return;
  }

  fetch("http://localhost:5000/api/students/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, course, phone })
  })
  .then(res => res.json())
  .then(data => {
    alert("Student Added");
    getStudents();
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("course").value = "";
  document.getElementById("phone").value = "";
})
.catch(err => console.log(err));
}
function searchStudent() {
  const searchValue = document.getElementById("search").value.toLowerCase();
  const rows = document.querySelectorAll("#studentTable tr");

  rows.forEach((row) => {
    const text = row.innerText.toLowerCase();

    if (text.includes(searchValue)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}
function deleteStudent(id){
  fetch(`http://localhost:5000/api/students/${id}`, {
    method: "DELETE"
  })
  .then(() => {
    alert("Deleted");
    getStudents();
  })
  .catch(err => console.log(err));
}

// page load pe auto run
window.onload = function() {
  getStudents();
};
