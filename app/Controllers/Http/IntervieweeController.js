'use strict'
const interviewee = use('App/Models/Interviewee')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with interviewees
 */
class IntervieweeController {
  /**
   * Show a list of all interviewees.
   * GET interviewees
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ response }) {
    const interviewees = await interviewee.all()

    response.status(200).json({
      message: 'Here are your Interviewees.',
      data: interviewees
    })
  }

  /**
   * Render a form to be used for creating a new interviewee.
   * GET interviewees/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  // async create ({ request, response, view }) {
  // }

  /**
   * Create/save a new interviewee.
   * POST interviewees
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const { First_Name, Last_Name, 
      DOB, Is_deleted, deleted_at,
      email, password, last_login
    } = request.post()

    // save and get instance back
    const customer = await interviewee.create({ First_Name, Last_Name, 
      DOB, Is_deleted, deleted_at,
      email, password, last_login })

    response.status(201).json({
      message: 'Successfully created a new Interviewee.',
      data: customer
    })
  }

  /**
   * Display a single interviewee.
   * GET interviewees/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({request, response}) {
    response.status(200).json({
      message: 'Here is your Interviewee.',
      data: request.post().interviewee
    })
  }

  /**
   * Render a form to update an existing interviewee.
   * GET interviewees/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update interviewee details.
   * PUT or PATCH interviewees/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const { First_Name, Last_Name, 
      DOB, Is_deleted, deleted_at,
      email, password, interviewee
    } = request.post()

    
     //const {intervieweex}  = request.interviewee
     //console.log(interviewee)
    interviewee.First_Name = First_Name
    interviewee.Last_Name= Last_Name
    interviewee.DOB = DOB
    interviewee.Is_deleted = Is_deleted
    interviewee.deleted_at = deleted_at
    interviewee.email = email
    interviewee.password = password

    await interviewee.save()

    response.status(200).json({
      message: 'Successfully updated this customer.',
      data: interviewee
    })

  }

/**
    *Update a login time with id 
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  async utime({params, request, response}){
    const interviewee
     = request.interviewee
    // var date = new Date();

    var currentTime = new Date();

var currentOffset = currentTime.getTimezoneOffset();

var ISTOffset = 330;   // IST offset UTC +5:30 

var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
    
    var ty =ISTTime.toISOString().split('T')[0] + ' '  
    + ISTTime.toTimeString().split(' ')[0];
    interviewee.last_login = ty
    await interviewee.save()
    console.log(interviewee.last_login)

  }

  /**
   * Delete a interviewee with id.
   * DELETE interviewees/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = IntervieweeController
