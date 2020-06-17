'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with properties
 */

const Property = use('App/Models/Property')
class PropertyController {
  /**
   * Show a list of all properties.
   * GET properties
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {

    const properties = await Property.all()

    response.json({
      message: 'Here are list of customers',
      data: properties
    })
  }

  /**
   * Render a form to be used for creating a new property.
   * GET properties/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new property.
   * POST properties
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    console.log("Store")
    const { name, location, type, start_date, end_date, description } = request.post()



    // const property = new Property()
    // property.name = name
    // property.location = location
    // property.type = type
    // property.start_date = start_date
    // property.end_date = end_date
    // property.description = description

    // await property.save()

    const property = await Property.create({ name, location, type, start_date, end_date, description })

    response.json({
      message: 'Successfully created a new customer',
      data: property
    })

  }

  /**
   * Display a single property.
   * GET properties/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, request, response, view }) {

    const property = await Property.find(id)
    if (property) {
      response.json({
        message: "Successfully showing an property",
        data: property
      })
    } else {
      response.json({
        message: "did not find a property of this id",
        id
      })
    }
  }

  /**
   * Render a form to update an existing property.
   * GET properties/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update property details.
   * PUT or PATCH properties/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response }) {
    const property = await Property.find(id)


    if (property) {

      const { name, location, type, start_date, end_date, description } = request.post()

      property.name = name
      property.location = location
      property.type = type
      property.start_date = start_date
      property.end_date = end_date
      property.description = description

      await property.save()

      response.json({
        message: "Successfully Updated an property",
        data: property
      })
    } else {
      response.json({
        message: "did not find a property of this id",
        id
      })
    }


  }

  /**
   * Delete a property with id.
   * DELETE properties/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }

  async delete({ response, params: { id } }) //WORKING deleting a field from database
  {
    const property = await Property.find(id)
    if (property) {
      await property.delete()
      response.json({
        message: 'Successfully deleted a property',
        id
      })
    }
    else {
      response.json({
        message: 'No InterView found at the following ID',
        id
      })
    }

  }


  async showByName({ response, params: { name } }) {

    const property = await Property.query().select('*').from('properties').where('name','like', '%'+decodeURI(name)+'%' ).fetch()

    if (property) {
      response.json({
        message: "Successfully showing an property with name",
        data: property,
        name: decodeURI(name),
        pr0: property.data


      })
    } else {
      response.json({
        message: "did not find a property of this name",
        name

      })
    }

  }



}

module.exports = PropertyController
