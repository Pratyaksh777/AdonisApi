'use strict'



const Interview = use('App/Models/Interview')
class InterviewController {
  
  async index ({ response}) //WORKING to get all the fields in database 
  {
   const interviews =await Interview.all()
   if(interviews){
    response.json({
      message: 'Successfully Showing interview times',
      data:interviews
    })
   }else{
    response.json({
      message: 'Unsuccessfull in showing a interview time',
      id
    })}}

  async store ({ request, response }) //WORKING to store or create data entreys
  {
    const { title, description,date_and_time,contact} = request.post()
    console.log(title)
    const interview=await Interview.create({title, description,date_and_time,contact})
if(interview)
{
response.json({
      message: 'Successfully created a new interview time',
      data:interview
    })}else{
      response.json({
        message: 'Unsuccessfull in creating interview time',
        id
      })}
  }


  async show ({ request,params:{id}, response})//WORKING to get individual field using ID
  {
    const interview=await Interview.find(id)
    if(interview){
      response.json({
        message:"succesfully showing an interview",
        data:interview
      })
    }else{
      response.json({
        message:"not found",id
      })
    }
    
     
  }

 
  async update ({ request, response,params:{id}}) //WORKING updating the field using ID
  { 
    const { title, description,date_and_time,contact,interview} = request.post()
    interview.title = title
    interview.description = description
    interview.date_and_time = date_and_time
    interview.contact = contact
    await interview.save()
    if(interview)
    {
    response.json({
      message: 'Successfully updated a interview time',
      data:interview
    })}
    else{
      response.json({
        message: 'Unsuccessfully in updating',
        id
      })
  }
}


  async delete({ response,params:{id} }) //WORKING deleting a field from database
  { 
    const interview=await Interview.find(id)
    if(interview){
      await interview.delete()
      response.json({
        message : "Sucessfully deleted",
        id
      })
    }else{
    response.json({
      message: 'Unsuccessfull',
      id
    })
  }
   
  }
  async showByName({ response, params: { title } }) {

    const property = await Interview.query().select('*').from('interviews').where('title','like', '%'+decodeURI(title)+'%').fetch()

    if (property) {
      response.json({
        message: "Successfully showing an property with name",
        data: property
      })
    } else {
      response.json({
        message: "did not find a property of this name",
        title

      })
    }

  }

}

module.exports = InterviewController
