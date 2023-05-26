import User from "../models/user.model.js";
import axios from "axios"
import { config } from "../../config/index.js";
import { createUserValidator } from "../validators/createAccount.js";

const facebookUserId = config.facebook_UserId;
const authToken = config.auth_Token;






export default class CreateAccountWithSocial {

    static async createAccountwithFB (req, res, next) {

      
        try {
          const response = await axios.get(`https://graph.facebook.com/v15.0/me?fields=id,name,first_name,last_name&access_token=${authToken}`);
          console.log (response.data)
          const { id, name, first_name, last_name } = response.data;
        
          // Perform further actions with the user's data
          const newUser = new User ({
            Id: response.data.id,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            name: response.data.name,
          })

          await newUser.save();
          
          res.json( {
            message: "User created successfully",
            status: "Success",
            id, name, first_name, last_name})
          
            } catch (error) {
          console.error('Access token validation failed:', error.response.data);
          res.status(500).send("Access Validation Failed")
          
        }
      

      
 
      //   let response =  await axios.get(
      //    `https://graph.facebook.com/v15.0/me?fields=id,name,first_name,last_name&access_token=${authToken}`
      //  );
       
      //  if (response.status !== 200) {
      //    res.status(400).json({ message: "Invalid facebook user id or token"
     
      //    })
      //  }
     
      //  const newUser = new User ({
      //    facebookUserId: response.data.id,
      //    first_name: response.data.first_name,
      //    last_name: response.data.last_name,
      //      name: response.data.name,
      //        })
                
     
      // await newUser.save();
      
      // res.status(200).json({
      //    message: "User registered successfully with facebook.",
      //  });
        
     }


  //    static async createAccountwithGoogle (req, res, next) {

      
  //     try {
  //       const response = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${accessToken}`);
  //       console.log (response.data)
  //       const { id} = response.data;
      
  //       // Perform further actions with the user's data
  //       console.log(`User ID: ${id}`);
  //        res.json({id})

  //         } catch (error) {
  //       console.error('Access token validation failed:', error.response.data);
  //       res.status(500).send("Access Validation Failed")
  //     }
    

      
  //  }

    //  Google Controller
    //  static async createAccountwithGoogle (req, res, next)  {
 
    //     let response =  await axios.get(
    //      `https://graph.facebook.com/${facebookUserId}? 
    //            fields=id,name,email,picture&access_token=${authToken}`
    //    );
    //    if (response.status !== 200) {
    //      res.status(422).json({ message: "Invalid facebook user id or token"
     
    //      })
    //    }
     
    //    const newUser = new User ({
    //      facebookUserId: response.data.id,
    //        firstName: response.data.firstName,
    //        lastName: response.data.lastName,
    //        fullName: response.data.fullName,
    //          })
     
    //   await newUser.save();
     
    //   res.status(200).json({
    //      message: "User registered successfully with facebook.",
    //    });
        
    //  }
}




