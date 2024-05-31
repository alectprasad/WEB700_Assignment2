const collegeData = require('./modules/collegeData');
//call function to read data
collegeData.initialize()
.then(() => { 
    console.log('Fetch successfull'); 
    //after data is read call other functions
    return Promise.all([collegeData.getAllStudents(), collegeData.getTAs(), collegeData.getCourses()]);
})
//result of the three promises will be returned in order
.then(([students, tas, courses]) => {
    console.log(`Successfully retrieved ${students.length} students`);
    console.log(`Successfully retrieved ${tas.length} courses`);
    console.log(`Successfully retrieved ${courses.length} TAs`);
})
.catch((reject) => { console.log(reject) });