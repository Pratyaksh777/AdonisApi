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
Route.get('interviewees/:qid', 'IntervieweeController.form').middleware([
  'findInterviewee'
])
Route.get('remove/:did', 'IntervieweeController.softdel').middleware([
  'findInterviewee'
])
Route.post('interviewees', 'IntervieweeController.store')
Route.post('interviewees/:id', 'IntervieweeController.show').middleware([
  'findInterviewee'
])
Route.post('timeupdate/:pid', 'IntervieweeController.utime').middleware([
  'findInterviewee'
])

Route.patch('interviewees/:patchid', 'IntervieweeController.update').middleware([
  'findInterviewee'
])
Route.delete('interviewees/:email', 'IntervieweeController.delete').middleware([
  'findInterviewee'
])

//Ritam's routes

Route.get('properties', 'PropertyController.index')
Route.get('properties/:id', 'PropertyController.show')
Route.get('properties/name/:name', 'PropertyController.showByName')
Route.post('properties', 'PropertyController.store')
Route.patch('properties/:id', 'PropertyController.update')
Route.delete('properties/:id', 'PropertyController.delete')

//Pratyaksh's Routes

Route.get('interviews', 'InterviewController.index')
Route.get('interviews/:id', 'InterviewController.show')
Route.post('interviews', 'InterviewController.store')
Route.patch('interviews/:id', 'InterviewController.update').middleware(['findinterview'])
Route.delete('interviews/:id', 'InterviewController.delete').middleware(['findinterview'])
Route.get('interviews/name/:title', 'InterviewController.showByName')