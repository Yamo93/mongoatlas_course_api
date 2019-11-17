const courseModel = require('../models/course');
const fs = require('fs');
const path = require('path');
const p = path.join(
    __dirname, '..',
    'data', 
    'courses.json');

exports.getCourses = (req, res) => {
    courseModel.getCoursesFromDb(courses => {
        res.status(200).send(courses);
    });
};

exports.getCourse = (req, res) => {
    courseModel.getCourseFromDb(req.params.id, dbResponse => {
        res.send(dbResponse);
    });
};

exports.deleteCourse = (req, res) => {
    const dbResponse = courseModel.deleteCourseFromDb(req.params.id);
    res.send(dbResponse);
};

exports.addCourse = (req, res) => {
    const dbResponse = courseModel.addCourseToDb({
        courseId: req.body.courseId,
        courseName: req.body.courseName,
        coursePeriod: req.body.coursePeriod
    });

    res.sendStatus(201).send(dbResponse);
};

exports.updateCourse = (req, res) => {
    const dbResponse = courseModel.updateCourseInDb({
        _id: req.params.id,
        courseId: req.body.courseId,
        courseName: req.body.courseName,
        coursePeriod: req.body.coursePeriod
    });
    res.send(dbResponse);
};