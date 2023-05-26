import { config } from "../../config";
import OAuth2Client from "google-auth-library"



const clientId = config.client_id;
const clientSecret = config.client_secret;




const client = new OAuth2Client(clientId, clientSecret);

export default class GoogleAuth{

 static async CreateGoogleAuthToken (req, res, next) {

   // Exchange an authorization code or refresh token for an access token
    async function getAccessToken(code) {
    const token = await client.getToken(code);
    return token.tokens.access_token;
  }
  console.log (token)

  res.json( {
    message: "Token created successfully",
    status: "Success",

    })
  
    
  
  // Usage example
//   const authorizationCode = 'YOUR_AUTHORIZATION_CODE';
//   const accessToken = await getAccessToken(authorizationCode);
//   console.log('Access Token:', accessToken);
  
    }
}


