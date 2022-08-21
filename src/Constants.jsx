export const EMAIL_VALIDATION_REGEX =
/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


export const configs={
    'prod':{
        endpoint:'http://127.0.0.1:8080'

    },
    'test':{
        endpoint:'http://localhost:8080'
    }
}

export const stage = 'prod' 