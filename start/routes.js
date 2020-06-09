'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.get('interviewees', 'IntervieweeController.index')
Route.get('interviewees/:email&:password', 'IntervieweeController.show').middleware([
  'findInterviewee'
])
Route.post('interviewees', 'IntervieweeController.store')
Route.post('interviewees/:id', 'IntervieweeController.show').middleware([
  'findInterviewee'
])
Route.post('timeupdate/:pid', 'IntervieweeController.utime').middleware([
  'findInterviewee'
])
Route.patch('interviewees/:email', 'IntervieweeController.update').middleware([
  'findInterviewee'
])
Route.delete('interviewees/:email', 'IntervieweeController.delete').middleware([
  'findInterviewee'
])