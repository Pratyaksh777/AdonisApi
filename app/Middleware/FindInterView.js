'use strict'
const Interview=use('App/Models/Interview')
class FindInterView {

  async handle ({ request,response,params:{id}}, next) {
    const interview=await Interview.find(id) 
    console.log("in handel data is ")
    console.log(interview)
    if(!interview)
    {   
        return response.json({
        message: 'No InterView found at the following interview ID',
        id
      })
    
    } 
    request.body.interview=interview
    console.log("body of request is")
    console.log(request.body.interview)
    await next()
  }
}

module.exports = FindInterView
