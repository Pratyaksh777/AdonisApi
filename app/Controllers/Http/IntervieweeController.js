'use strict'
const interviewee = use('App/Models/Interviewee')
const Hash = use('Hash')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('51527806993-p7adkqpbc3ufg2dum8gimhf0bt396k2h.apps.googleusercontent.com');
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
    console.log("Hello")
    const { First_Name, Last_Name, 
      DOB, Is_deleted, deleted_at,
      email, password, last_login,Role_id,A,B,C,D
    } = request.post()
    
    try{
      await interviewee.findByOrFail('email', email)
      response.status(201).json({
        message: 'Error! An account with that email already exists',
        success:'false'
      })
    }catch(error){
    const safePassword = await Hash.make(password)
   
    console.log(safePassword)
    // save and get instance back
    const customer = await interviewee.create({ First_Name, Last_Name, 
      DOB, Is_deleted, deleted_at,
      email, password:safePassword, last_login ,Role_id,A,B,C,D})

    response.status(201).json({
      message: 'Successfully created a new Interviewee.',
     success:'true'
    })

    }
  
  
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
  //Login controller method
  async show ({request, response, params}) {
    const { First_Name, Last_Name, 
      DOB, 
      email, password, Role_id,A,B,C,D,interviewee
    } = request.post()
    if(interviewee!=undefined && interviewee.Is_deleted==0){
    var currentTime = new Date();

    var currentOffset = currentTime.getTimezoneOffset();
    
    var ISTOffset = 330;   // IST offset UTC +5:30 
    
    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
        
        var ty =ISTTime.toISOString().split('T')[0] + ' '  
        + ISTTime.toTimeString().split(' ')[0];
        interviewee.last_login = ty
        await interviewee.save()
    
    response.status(200).json({
      message: 'Here is your Interviewee.',
      data: request.post().interviewee
    })
  }
  else{
    response.status(200).json({
      message: "Account doesn't exist",
    
    })

  }

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
      DOB, Newpassword,
      email, password, Role_id,A,B,C,D,interviewee
    } = request.post()

      // console.log(Newpassword)
     //const {intervieweex}  = request.interviewee
     //console.log(interviewee)
     

    interviewee.First_Name = First_Name
    interviewee.Last_Name= Last_Name
    interviewee.DOB = DOB
    interviewee.Role_id= Role_id
    interviewee.email = email;
    interviewee.A =A
    interviewee.B =B
    interviewee.C =C 
    interviewee.D =D   
    if(Newpassword){
    const safePassword = await Hash.make(password);
    interviewee.password = safePassword
    }
    await interviewee.save()

    response.status(200).json({
      message: 'Successfully updated this customer.',
      data: interviewee,
      success:"success"
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

  async form({ params, request, response }){
    const interviewee
     = request.interviewee
     response.status(200).json({
      message: 'Successfully Found this customer.',
      data: interviewee
    })
  }

  /**
   * Delete a interviewee with id.
   * DELETE interviewees/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

    async softdel({ params, request, response }){
      const interviewee = request.interviewee;
      interviewee.Is_deleted =1;
      var currentTime = new Date();

      var currentOffset = currentTime.getTimezoneOffset();

      var ISTOffset = 330;   // IST offset UTC +5:30 

      var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
          
      var ty =ISTTime.toISOString().split('T')[0] + ' '  
      + ISTTime.toTimeString().split(' ')[0];
      interviewee.deleted_at = ty
      await interviewee.save()

      response.status(200).json({
        message: 'Successfully Deleted this account.',
      })
        
      }


  async destroy ({ params, request, response }) {
  }

  async verify({ params, request, response }) {
    
        const {idToken} = request.post()
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: '51527806993-p7adkqpbc3ufg2dum8gimhf0bt396k2h.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
            
        });
        const payload = ticket.getPayload();
        // const userid = payload['sub'];
        const email = payload['email']
        // console.log(payload)
        try{
         const person =  await interviewee.findByOrFail('email', email)
          response.status(200).json({
            message: 'Found User',
            success:'True',
            persondat:person,
            data: payload
          })
        }catch(error){
          response.status(200).json({
            message: 'No records found',
            success:'Failed',
            data: payload
          })
        
      }
    
     //end of verify
      }
    
      async register({ params, request, response }){
    
        const {idToken, 
          DOB, UserId} = request.post()
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: '51527806993-p7adkqpbc3ufg2dum8gimhf0bt396k2h.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
            
        });
        const payload = ticket.getPayload();
        // const userid = payload['sub'];
        const email = payload['email'];
        const First_Name = payload['given_name'];
        const Last_Name = payload['family_name'];
        const Social = "Google";
        try{
         const person =  await interviewee.findByOrFail('email', email)
          response.status(201).json({
            message: 'user already exists',
            success:'Failed',
          
          })
        }catch(error){
          const Is_deleted=0;
          const deleted_at="0000-00-00 00:00:00";
          const password=UserId;
      
          const last_login = "0000-00-00 00:00:00";
          const customer = await interviewee.create({ First_Name, Last_Name, 
            DOB, Is_deleted, deleted_at,
            email,password, last_login, Social, Role_id:0, A:1,B:1,C:1,D:1 })
    
    
          response.status(201).json({
            message: 'Sucessfully created a user',
            success:'True',
            persondat:customer,
            interviewee:customer
          })
        
      }
    
      }

}







module.exports = IntervieweeController









// 'use strict'
// const interviewee = use('App/Models/Interviewee')
// const Hash = use('Hash')
// const {OAuth2Client} = require('google-auth-library');
// const client = new OAuth2Client('51527806993-p7adkqpbc3ufg2dum8gimhf0bt396k2h.apps.googleusercontent.com');
// /** @typedef {import('@adonisjs/framework/src/Request')} Request */
// /** @typedef {import('@adonisjs/framework/src/Response')} Response */
// /** @typedef {import('@adonisjs/framework/src/View')} View */

// /**
//  * Resourceful controller for interacting with interviewees
//  */
// class IntervieweeController {
//   /**
//    * Show a list of all interviewees.
//    * GET interviewees
//    *
//    * @param {object} ctx
//    * @param {Request} ctx.request
//    * @param {Response} ctx.response
//    * @param {View} ctx.view
//    */
//   async index ({ response }) {
//     const interviewees = await interviewee.all()

//     response.status(200).json({
//       message: 'Here are your Interviewees.',
//       data: interviewees
//     })
//   }

//   /**
//    * Render a form to be used for creating a new interviewee.
//    * GET interviewees/create
//    *
//    * @param {object} ctx
//    * @param {Request} ctx.request
//    * @param {Response} ctx.response
//    * @param {View} ctx.view
//    */
//   // async create ({ request, response, view }) {
//   // }

//   /**
//    * Create/save a new interviewee.
//    * POST interviewees
//    *
//    * @param {object} ctx
//    * @param {Request} ctx.request
//    * @param {Response} ctx.response
//    */
//   async store ({ request, response }) {
//     const { First_Name, Last_Name, 
//       DOB, Is_deleted, deleted_at,
//       email, password, last_login
//     } = request.post()
    
//     try{
//       await interviewee.findByOrFail('email', email)
//       response.status(201).json({
//         message: 'Error! An account with that email already exists',
//         success:'false'
//       })
//     }catch(error){
//     const safePassword = await Hash.make(password)
   
//     console.log(safePassword)
//     // save and get instance back
//     const customer = await interviewee.create({ First_Name, Last_Name, 
//       DOB, Is_deleted, deleted_at,
//       email, password:safePassword, last_login })

//     response.status(201).json({
//       message: 'Successfully created a new Interviewee.',
//      success:'true'
//     })

//     }
  
  
//   }

//   /**
//    * Display a single interviewee.
//    * GET interviewees/:id
//    *
//    * @param {object} ctx
//    * @param {Request} ctx.request
//    * @param {Response} ctx.response
//    * @param {View} ctx.view
//    */
//   //Login controller method
//   async show ({request, response, params}) {
//     const { First_Name, Last_Name, 
//       DOB, 
//       email, password, interviewee
//     } = request.post()
//     if(interviewee!=undefined && interviewee.Is_deleted==0){
//     var currentTime = new Date();

//     var currentOffset = currentTime.getTimezoneOffset();
    
//     var ISTOffset = 330;   // IST offset UTC +5:30 
    
//     var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
        
//         var ty =ISTTime.toISOString().split('T')[0] + ' '  
//         + ISTTime.toTimeString().split(' ')[0];
//         interviewee.last_login = ty
//         await interviewee.save()
    
//     response.status(200).json({
//       message: 'Here is your Interviewee.',
//       data: request.post().interviewee
//     })
//   }
//   else{
//     response.status(200).json({
//       message: "Account doesn't exist",
    
//     })

//   }

//   }

//   /**
//    * Render a form to update an existing interviewee.
//    * GET interviewees/:id/edit
//    *
//    * @param {object} ctx
//    * @param {Request} ctx.request
//    * @param {Response} ctx.response
//    * @param {View} ctx.view
//    */
//   async edit ({ params, request, response, view }) {
//   }

//   /**
//    * Update interviewee details.
//    * PUT or PATCH interviewees/:id
//    *
//    * @param {object} ctx
//    * @param {Request} ctx.request
//    * @param {Response} ctx.response
//    */
//   async update ({ params, request, response }) {
//     const { First_Name, Last_Name, 
//       DOB, Newpassword,
//       email, password, interviewee
//     } = request.post()

//       // console.log(Newpassword)
//      //const {intervieweex}  = request.interviewee
//      //console.log(interviewee)
     

//     interviewee.First_Name = First_Name
//     interviewee.Last_Name= Last_Name
//     interviewee.DOB = DOB
//     // interviewee.email = email;
//     if(Newpassword){
//     const safePassword = await Hash.make(password);
//     interviewee.password = safePassword
//     }
//     await interviewee.save()

//     response.status(200).json({
//       message: 'Successfully updated this customer.',
//       data: interviewee,
//       success:"success"
//     })
    
//   }

// /**
//     *Update a login time with id 
//    *
//    * @param {object} ctx
//    * @param {Request} ctx.request
//    * @param {Response} ctx.response
//    */

//   async utime({params, request, response}){
//     const interviewee
//      = request.interviewee
//     // var date = new Date();

//     var currentTime = new Date();

//     var currentOffset = currentTime.getTimezoneOffset();

//     var ISTOffset = 330;   // IST offset UTC +5:30 

//     var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
    
//     var ty =ISTTime.toISOString().split('T')[0] + ' '  
//     + ISTTime.toTimeString().split(' ')[0];
//     interviewee.last_login = ty
//     await interviewee.save()
//     console.log(interviewee.last_login)

//   }

//   async form({ params, request, response }){
//     const interviewee
//      = request.interviewee
//      response.status(200).json({
//       message: 'Successfully Found this customer.',
//       data: interviewee
//     })
//   }

//   /**
//    * Delete a interviewee with id.
//    * DELETE interviewees/:id
//    *
//    * @param {object} ctx
//    * @param {Request} ctx.request
//    * @param {Response} ctx.response
//    */

//     async softdel({ params, request, response }){
//       const interviewee = request.interviewee;
//       interviewee.Is_deleted =1;
//       var currentTime = new Date();

//       var currentOffset = currentTime.getTimezoneOffset();

//       var ISTOffset = 330;   // IST offset UTC +5:30 

//       var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
          
//       var ty =ISTTime.toISOString().split('T')[0] + ' '  
//       + ISTTime.toTimeString().split(' ')[0];
//       interviewee.deleted_at = ty
//       await interviewee.save()

//       response.status(200).json({
//         message: 'Successfully Deleted this account.',
//       })
        
//       }


//   async destroy ({ params, request, response }) {
//   }

//   async verify({ params, request, response }) {
    
//     const {idToken} = request.post()
//     const ticket = await client.verifyIdToken({
//         idToken: idToken,
//         audience: '51527806993-p7adkqpbc3ufg2dum8gimhf0bt396k2h.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
        
//     });
//     const payload = ticket.getPayload();
//     // const userid = payload['sub'];
//     const email = payload['email']
//     // console.log(payload)
//     try{
//      const person =  await interviewee.findByOrFail('email', email)
//       response.status(200).json({
//         message: 'Found User',
//         success:'True',
//         person:person.id,
//         data: payload
//       })
//     }catch(error){
//       response.status(200).json({
//         message: 'No records found',
//         success:'Failed',
//         data: payload
//       })
    
//   }

//  //end of verify
//   }

//   async register({ params, request, response }){

//     const {idToken, 
//       DOB, UserId} = request.post()
//     const ticket = await client.verifyIdToken({
//         idToken: idToken,
//         audience: '51527806993-p7adkqpbc3ufg2dum8gimhf0bt396k2h.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
        
//     });
//     const payload = ticket.getPayload();
//     // const userid = payload['sub'];
//     const email = payload['email'];
//     const First_Name = payload['given_name'];
//     const Last_Name = payload['family_name'];
//     const Social = "Google";
//     try{
//      const person =  await interviewee.findByOrFail('email', email)
//       response.status(201).json({
//         message: 'user already exists',
//         success:'Failed',
      
//       })
//     }catch(error){
//       const Is_deleted=0;
//       const deleted_at="0000-00-00 00:00:00";
//       const password=UserId;
  
//       const last_login = "0000-00-00 00:00:00";
//       const customer = await interviewee.create({ First_Name, Last_Name, 
//         DOB, Is_deleted, deleted_at,
//         email,password, last_login, Social })


//       response.status(201).json({
//         message: 'Sucessfully created a user',
//         success:'True',
//         person:customer.id,
//         interviewee:customer
//       })
    
//   }

//   }


// }

// module.exports = IntervieweeController
