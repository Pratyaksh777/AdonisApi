'use strict'
const interviewee = use('App/Models/Interviewee')
const Hash = use('Hash')
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
    
    if(id==1){
       
      request.auth="failed";
    const ivee = await interviewee.findBy('email', request.post().email)
    const isSame = await Hash.verify(request.post().password, ivee.password)
      if(isSame){
        console.log("Hello")
        request.auth="success";
        request.body.interviewee = ivee;
        //console.log(request.interviewee)
      }

    else{
      return response.status(200).json({
        message: 'Interviewee not found.',
        // id
      })
      
    }

    // request.interviewee = ivee;
  }
  else if(pid){
    const obj = await interviewee.find(pid)
    //console.log(obj)
    if(!obj){
      return response.status(404).json({
        message: 'Some error ocurred.',
        // id
      })
    }
    request.interviewee = obj;
  }
  else if(qid){
    const obj = await interviewee.find(qid)
    if(!obj){
      return response.status(404).json({
        message: 'Some error ocurred.',
        // id
      })
    }
    request.interviewee = obj;

  }
  else if(patchid){
    console.log("patch")
    const obj = await interviewee.find(patchid)
    if(!obj){
      console.log("patch2")
      return response.status(404).json({
        message: 'Some error ocurred.',
        success:"failed"
      })
    }
    else{
      const {email} = request.post()

      const pers = await interviewee.findBy('email', email)
      
      if(pers){
        if(pers.id==patchid){
          //Existing account of the same person
          request.body.interviewee = obj;
        }
        else{
          response.status(200).json({
            message: "Account doesn't exist",
            success:"failed"
          })
      
        }
      }
      else{
        //New available email ID
        request.body.interviewee = obj;
      }
      
    }
    
    
  }
  else if(did){
    console.log("soft delete")
    const obj = await interviewee.find(did)
    if(!obj){
      return response.status(404).json({
        message: 'Some error ocurred.',
        // id
      })
    }
    request.interviewee = obj;
   
  }

    await next()
  }
}

module.exports = FindInterviewee
