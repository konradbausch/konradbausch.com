let teams = [];

//defines a Team with number and students
class Team {
    constructor(number, students) {
        this.number = number;
        this.students = students;
    }

}

//make a team to a html element
function teamToHtml(team) {
    let html = `<h4>TEAM ${team.number}</h4>`;
    html += `
    <div class="input-wraper">
        <div class="lable">Points</div>
        <input id="points-team-${team.number}" placeholder="1:1:1:1" type="text"/>
    </div>
    <br />
    `;

    html += `<table>`;
    for (let student of team.students) {
        console.log(student);
        html += studentToHtml(student);
    }
    html += `</table>`;
    return html;
}

//defines a Student with name and matriculation number
class Student {
    constructor(mat, name) { 
        this.mat = mat;
        this.name = name;
    }
}

//make a student to a html element
function studentToHtml(student) {
    return `
    <tr>
        <td>${student.mat}</td>
        <td>(${student.name})</td>
        <td><button class="delete" onclick="deleteStudent('${student.mat}')">ⓧ</button></td>
    </tr>`;
}

//creates as many teams as specified in input with id number-of-teams when button is pressed
function createTeams() {
    let numberOfTeams = document.getElementById("number-of-teams").value;
    //add or delete teams
    if (teams.length < numberOfTeams) {
        for (let i = teams.length; i < numberOfTeams; i++) {
            teams.push(new Team(i+1, []));
        }
    }
    else if (teams.length > numberOfTeams) {
        teams.splice(numberOfTeams, teams.length - numberOfTeams);
    }

    displayTeams();
}

//adds a student to a Group when button is pressed
function addStudent() {
    let group = document.getElementById("student-group").value;
    let mat = document.getElementById("student-mat").value;
    let name = document.getElementById("student-name").value;
    let team = teams[group-1];

    //checks if student is already in a team
    for (let team of teams) {
        for (let student of team.students) {
            if (student.mat === mat) {
                alert("Student already in a team");
                return;
            }
        }
    }

    console.log(mat);
    team.students.push(new Student(mat, name));
    displayTeams();
}


//diplays the teams in the div with id teams
function displayTeams() {
    let html = "";
    for (let team of teams) {
        html += teamToHtml(team);
    }
    html += `
    <br />
    <br />

    <div class="input-wraper">
        <div class="lable">Group</div>
        <input id="student-group" type="number" min="1" max="20" />
    </div>

    <div class="input-wraper">
        <div class="lable">Mat. Nr.</div>
        <input id="student-mat" type="text" />
    </div>

    <div class="input-wraper">
        <div class="lable">Name</div>
        <input id="student-name" type="text" />
    </div>

    <button onclick="addStudent()">Add Student</button>
    <br />
    <button onclick="downloadConfig()">Download Config</button>

    
    
    `


    document.getElementById("teams").innerHTML = html;
}


//deletes a student from a team
function deleteStudent(mat) {
    for (let team of teams) {
        for (let student of team.students) {
            if (student.mat == mat) {
                team.students.splice(team.students.indexOf(student), 1);
            }
        }
    
    }
    displayTeams();
}

//creates the config and downlaods it
function downloadConfig() {
    let jsonDatei = new Blob([JSON.stringify(teams)], { type: 'application/json' });
    let a = document.createElement('a');
    a.href = URL.createObjectURL(jsonDatei);
    a.download = "config.json";
    a.click();
  }

//loads the config from a file in config-input
function loadConfig() {
    let file = document.getElementById("config-input").files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
        teams = JSON.parse(reader.result);
        displayTeams();
    }
}

//download urm file
function downloadURMFile() {
    let output = "";
    let asignmentNumber = document.getElementById("assignment-number").value;
    let maxPoints = document.getElementById("max-points").value;

    for (i = 0; i < teams.length; i++) {

        let points = document.getElementById("points-team-" + teams[i].number).value;

        for (student of teams[i].students) {
            output += student.mat + ";" +  asignmentNumber + ";" + maxPoints + ";" + points + "\n";  
        }
    }

    //making output downloadable txt
    let urmFile = new Blob([output], { type: 'text/plain' });
    let a = document.createElement('a');
    a.href = URL.createObjectURL(urmFile);
    a.download = "Assignment"+asignmentNumber+"Points"+".txt";
    a.click();


}