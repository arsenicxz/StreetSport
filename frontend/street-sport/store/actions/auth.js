export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';


export const signup = (email, password) =>{
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC42RT39RCL0V6WZsTDujr2f3ptN-AqUnk'
        ,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if(!response.ok){
            const resData = await response.json();
            const errorId = resData.error.message;
            let message = 'Something went wrong :(';
            if(errorId === 'EMAIL_EXISTS'){
                message = 'Account with this email already exist';
            } 
            console.log(resData);
            throw new Error(message);
        }

        const resData = await response.json();
        console.log(resData);
        dispatch({type: SIGNUP});
    };
};


export const signin = (login, password) =>{
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC42RT39RCL0V6WZsTDujr2f3ptN-AqUnk'
        ,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: login,
                password: password,
                returnSecureToken: true
            })
        });

        if(!response.ok){
            const resData = await response.json();
            const errorId = resData.error.message;
            let message = 'Что-то пошло не так :(';
            if(errorId === 'EMAIL_EXISTS'){
                message = 'Account with this email already exist';
            } 
            if(errorId === 'INVALID_PASSWORD'){
                message = 'Неверный пароль';
            } 
            console.log(resData);
            throw new Error(message);
        }

        const resData = await response.json();
        console.log(resData);
        dispatch({type: SIGNUP});
    };
};