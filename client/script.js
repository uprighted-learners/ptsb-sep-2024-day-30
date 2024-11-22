const API_URL = "/api/students";

async function fetchStudents() {
    const response = await fetch(API_URL);
    const students = await response.json();


    const studentList = document.getElementById("student-list");
    studentList.innerHTML = "";

    students.forEach((student) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.email}</td>
            <td>${student.telephone}</td>
            <td>${student.semester}</td>
            <td>${student.className}</td>
            <td>
                <button class="delete-btn" data-id="${student.id}">Delete</button>
            </td>
        `

        studentList.appendChild(row);
    })

    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", async (event) => {
            const studentId = event.target.getAttribute("data-id");
            const response = await fetch(`${API_URL}/${studentId}`, {
                method: "DELETE"
            });

            if (response.ok) {
                fetchStudents();
            }
        });
    });
}

fetchStudents();