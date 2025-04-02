const ICourseService = require('../interfaces/ICourseService');

class CourseService extends ICourseService {
    constructor(courseRepository, instructorRepository) {
        super();
        this.courseRepository = courseRepository;
        this.instructorRepository = instructorRepository;
    }

    /**
        * Get all courses
        * @returns {Promise<Array>}
        */
    async getAllCourses() {
        try {
            return await this.courseRepository.findAll();
        } catch (error) {
            console.error('Error fetching all courses:', error);
            throw new Error('Failed to fetch courses');
        }
    }

    /**
    * Get a course by its ID
    * @param {number} id
    * @returns {Promise<Object>}
    */
    async getCourseById(id) {
        try {
            const course = await this.courseRepository.findById(id);
            if (!course) {
                throw new Error(`Course with ID ${id} not found`);
            }
            return course;
        } catch (error) {
            console.error(`Error fetching course with ID ${id}:`, error);
            throw new Error('Failed to fetch course');
        }
    }

    /**
     * Create a new course
     * @param {Object} courseData
     * @returns {Promise<Object>}
     */
    async createCourse(courseData) {
        try {
            return await this.courseRepository.create(courseData);
        } catch (error) {
            console.error('Error creating course:', error);
            throw new Error('Failed to create course');
        }
    }

    /**
    * Get courses sorted by rating in descending order
    * @returns {Promise<Array>}
    */
    async getCoursesByRating() {
        try {
            const courses = await this.courseRepository.findAll();
            return courses.sort((a, b) => b.rating - a.rating);
        } catch (error) {
            console.error('Error fetching courses by rating:', error);
            throw new Error('Failed to fetch courses by rating');
        }
    }

    /**
    * Get courses taught by a specific instructor
    * @param {number} instructorId
    * @returns {Promise<Array>}
    */
    async getCoursesByInstructor(instructorId) {
        try {
            const instructor = await this.instructorRepository.findById(instructorId);
            if (!instructor) {
                throw new Error(`Instructor with ID ${instructorId} not found`);
            }

            return await instructor.getCourses();
        } catch (error) {
            console.error(`Error fetching courses for instructor with ID ${instructorId}:`, error);
            throw new Error('Failed to fetch courses by instructor');
        }
    }
}

module.exports = CourseService;