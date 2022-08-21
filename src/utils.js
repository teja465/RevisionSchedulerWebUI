import { EMAIL_VALIDATION_REGEX } from "./Constants";

export const   ValidateEmailAddress=(emailStr)=>{
    return EMAIL_VALIDATION_REGEX.test(emailStr)
}