const express = require('express');
const router = express.Router();
const coursesControllers = require('../controllers/courses');

/* GET /api/courses */
router.get('/', coursesControllers.getCourses);

/* GET /api/courses/:id */
router.get('/:id', coursesControllers.getCourse);

/* POST /api/courses */
router.post('/', coursesControllers.addCourse);

/* DELETE /api/courses/:id */
router.delete('/:id', coursesControllers.deleteCourse);

/* PUT /api/courses/:id */
router.put('/:id', coursesControllers.updateCourse);

module.exports = router;