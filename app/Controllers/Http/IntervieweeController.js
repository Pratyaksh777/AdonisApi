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
      data: request.auth
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
