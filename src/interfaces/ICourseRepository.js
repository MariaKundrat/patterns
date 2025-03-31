/**
 * @interface ICourseRepository
 */

/**
 * @typedef {Object} Course
 * @property {string} name
 * @property {string} description
 * @property {number} time
 * @property {number} rating
 */

/**
 * @typedef {Object} ICourseRepository
 * @property {(data: Course) => Promise<Course>} create
 * @property {() => Promise<Course[]>} getAll
 */

module.exports = {};