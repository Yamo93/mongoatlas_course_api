const path = require('path');
const credentials = require('../credentials');
const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/courses', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(credentials.atlasConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(callback) {
    const courseSchema = mongoose.Schema({
        courseId: String,
        courseName: String,
        coursePeriod: Number
    });

    const Course = mongoose.model('Course', courseSchema);

    exports.getCoursesFromDb = cb => {
        Course.find((err, courses) => {
            if (err) return err;

            cb(courses);
        });
    };

    exports.getCourseFromDb = (courseId, cb) => {
        Course.findOne({ _id: courseId }, (err, course) => {
            if (err) {
                cb(err);
            } else {
                cb(course);
            }
        });
    };

    exports.addCourseToDb = courseData => {
        const newCourse = new Course(courseData);
        newCourse.save((err, newCourse) => { 
            if (err) {
                return err;
            } else {
                return newCourse;
            }
         });
    };

    exports.updateCourseInDb = courseData => {
        Course.updateOne({ _id: courseData._id }, { 
            courseId: courseData.courseId,
            courseName: courseData.courseName,
            coursePeriod: courseData.coursePeriod
        }, (err, response) => {
            if (err) {
                return err;
            } else {
                return response;
            }
        });
    };

    exports.deleteCourseFromDb = courseId => {
        Course.deleteOne({
            _id: courseId
        }, (err, course) => {
            if (err) {
                return err;
            } else {
                return course;
            }
        });
    };
});