import dotenv from "dotenv";
dotenv.config()

import {development} from "./development.js"
import {production} from "./production.js"
import {staging} from "./staging.js"


const environment = process.env.NODE_ENV;

console.log('Server set up to', environment, '!!!')


// export const config = environment === 'development' ? {...development} : {...production};

export const config = environment === 'development' ? { ...development } : environment === 'staging' ? { ...staging } : { ...production };
