// import
const express = require('express');

// create an instance of express
const app = express();

// middleware to parse the body of the request
app.use(express.json());

// declare a port
const PORT = 8080;

// serve static files in our public folder
app.use(express.static('client'));

// create a route
// GET - /api/health - send a response to the client
app.get('/api/health', (req, res) => {
    res.send('Hello TEAM it is our Friday!');
})

let students = [
    {
        id: 0,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@email.com',
        telephone: '123-456-7890',
        semester: 'Fall 2024',
        className: 'Web Development'
    },
    {
        id: 1,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@email.com',
        telephone: '123-456-7890',
        semester: 'Spring 2024',
        className: 'Design'
    },
    {
        id: 2,
        firstName: 'Jack',
        lastName: 'Reacher',
        email: 'jacksback@email.com',
        telephone: '123-456-7890',
        semester: 'Summer 2024',
        className: 'Art'
    }
];

// GET - /api/students - return all students
app.get("/api/students", (request, response) => {
    try {
        response.json(students);
    } catch (error) {
        console.log(error);
    }
})

// GET - /api/students/first-last-name - return all students first name and last name
app.get("/api/students/first-last-name", (request, response) => {
    try {
        response.send(students.map((student) => {
            return {
                firstName: student.firstName,
                lastName: student.lastName
            }
        }));
    } catch (error) {
        console.log(error);
    }
})

// GET - /api/students/:id - return a single student by ID
app.get("/api/students/:id", (req, res) => {
    try {
        // get the student ID from the request
        const studentId = req.params.id;

        // find the student by ID
        const student = students.find((student) => student.id === parseInt(studentId));

        // if the student is not found return a 404
        if (!student) {
            res.status(404).send("Student not found");
        }

        // return the student
        res.json(student);
    } catch (error) {
        console.log(error);
    }
})

// POST - /api/students - create a new student
app.post("/api/students", (req, res) => {
    try {
        // get the student from the request body
        const student = req.body;

        // set the student ID
        student.id = students.length;

        // add the student to the `students` array
        students.push(student);

        // return the student - OPTIONAL
        res.json(student);
    } catch (error) {
        console.log(error);
    }
})

// PUT - /api/students/:id - update a student by ID
app.put("/api/students/:id", (req, res) => {
    try {
        // destructure the student fields from the request body
        const { firstName, lastName, email, telephone, semester, className, id } = req.body;

        // get the student ID from the request parameters
        const studentId = parseInt(req.params.id);

        // find the student by ID
        const student = students.find((student) => student.id === studentId);

        // if the student is not found, return a 404
        if (!student) {
            return res.status(404).send("Student not found");
        }

        // update the student fields
        student.firstName = firstName || student.firstName;
        student.lastName = lastName || student.lastName;
        student.email = email || student.email;
        student.telephone = telephone || student.telephone;
        student.semester = semester || student.semester;
        student.className = className || student.className;

        // return the updated student
        res.json(student);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while updating the student");
    }
});


// DELETE - /api/students/:id - delete a student by ID
app.delete("/api/students/:id", (req, res) => {
    try {
        // get the student id
        const studentId = req.params.id;

        // find the student by ID
        const student = students.find((student) => student.id === parseInt(studentId));

        // if the student is not found return a 404
        if (!student) {
            res.status(404).send("Student not found");
        }

        // remove the student from the array
        students.splice(studentId, 1);

        // return the deleted student
        res.json(student);
    } catch (error) {
        console.log(error);
    }
})

// DELETE - /api/students - delete all students
app.delete("/api/students", (req, res) => {
    try {
        // clear the students array
        students = [];

        // return an empty array
        res.json(students);
    } catch (error) {
        console.log(error);
    }
})

// start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})