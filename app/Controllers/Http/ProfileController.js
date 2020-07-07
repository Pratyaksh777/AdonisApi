'use strict'
const Profile = use('App/Models/Profile')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with profiles
 */
class ProfileController {
  /**
   * Show a list of all profiles.
   * GET profiles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const profiles = await Profile.all()

    response.status(200).json({
      message: "Here are all Profiles.",
      data: profiles
    })
  }

  /**
   * Render a form to be used for creating a new profile.
   * GET profiles/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new profile.
   * POST profiles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const { firstName,lastName,email,state,
    city,jobTitle,compName,industry,
    compLocation,schoolName,studyField,degree,
    skills,interests } = request.post()

    const profile = await Profile.create({ firstName,lastName,email,state,
      city,jobTitle,compName,industry,
      compLocation,schoolName,studyField,degree,
      skills,interests })

    response.status(201).json({
      message: "Successfully created New Profile.",
      data: profile
    })
  }

  /**
   * Display a single profile.
   * GET profiles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params: { id }, response }) {
    const profile = await Profile.find(id)

    if (profile) {
      response.status(200).json({
        message: "Here is your Profile.",
        data: profile
      })
    } else {
      response.status(404).json({
        message: "Profile not Found.",
        id
      })
    }
  }

  /**
   * Render a form to update an existing profile.
   * GET profiles/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update profile details.
   * PUT or PATCH profiles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a profile with id.
   * DELETE profiles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async delete ({ params: { id }, request, response }) {
    const profile = await Profile.find(id)

    if(profile) {
      await profile.delete()
      response.status(200).json({
        message: "Successfully deleted this Profile.",
        id
      })
    } else {
      response.status(404).json({
        message: "Profile not Found.",
        id
      })
    }
  }
}

module.exports = ProfileController
