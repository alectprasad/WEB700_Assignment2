const fs = require('fs');

class Data {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }
}

dataCollection = null;

function initialize() {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/students.json', 'utf-8', function(err, data) {
            if(err) {
                reject('failed to read students.json')
                return; //return from function
            }
            try {
                let studentData = JSON.parse(data);
            } catch(e) {
                reject('failed to parse students.json')
                return; //return from function
            }
            //wait for first file read to complete before second file read
            fs.readFile('./data/courses.json', 'utf-8', function(err, data) {
                if(err) {
                    reject('failed to read courses.json')
                    return; //return from function
                }
                try {
                    let coursesData = JSON.parse(data);
                } catch(e) {
                    reject('failed to parse students.json')
                    return; //return from function
                }
                dataCollection = new Data(studentData, coursesData);
                resolve(dataCollection);
            })
        })
    })
}

function getAllStudents() {
    return new Promise((resolve, reject) => {
        if(dataCollection.studentData.length = 0){
            reject('no results returned'); //empty array
            return; //return from function
        }
        resolve(dataCollection.studentData);
    })
}

function getTAs() {
    return new Promise((resolve, reject) => {
        if(dataCollection.students.length = 0){
            reject('no results returned'); //empty array
            return; //return from function
        }
        var res = dataCollection.students.filter((student) => {
            return student.TA = true; //create a new filtered array
        })
        resolve(res);
    })
}

function getCourses() {
    return new Promise((resolve, reject) => {
        if(dataCollection.courses.length = 0){
            reject('no results returned'); //empty array
            return; //return from function
        }
        resolve(dataCollection.coursesData);
    })
}
export {initialize, getAllStudents, getTAs, getCourses};