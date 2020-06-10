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
  async handle ({ request, response, params:{id, pid, qid, patchid, did} }, next) {
    // call next to advance the request
    request.auth="failed";
    if(id==1){
       
    
    const ivee = await interviewee.findBy('email', request.post().email)
      if(request.post().password==ivee.password){
        console.log("Hello")
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
  else if(pid){
    const obj = await interviewee.find(pid)
    //console.log(obj)
    request.interviewee = obj;
  }
  else if(qid){
    const obj = await interviewee.find(qid)
    request.interviewee = obj;

  }
  else if(patchid){
    console.log("patch")
    const obj = await interviewee.find(patchid)
    request.body.interviewee = obj;
  }
  else if(did){
    console.log("soft delete")
    const obj = await interviewee.find(did)
    request.interviewee = obj;
   
  }

    await next()
  }
}

module.exports = FindInterviewee
