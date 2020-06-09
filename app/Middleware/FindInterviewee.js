'use strict'
const interviewee = use('App/Models/Interviewee')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */



class FindInterviewee {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, params:{id} }, next) {
    // call next to advance the request
    request.auth="failed";
    if(id==1){
       console.log("Hello")
    
    const ivee = await interviewee.findBy('email', request.post().email)
      if(request.post().password==ivee.password){
        request.body.auth="success";
        request.body.interviewee = ivee;
        //console.log(request.interviewee)
      }

    if (!ivee) {
      return response.status(404).json({
        message: 'Interviewee not found.',
        // id
      })
      
    }

    // request.interviewee = ivee;
  }

    await next()
  }
}

module.exports = FindInterviewee
