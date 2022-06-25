import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { url } from "../url";

export const SIGNUP = "SIGNUP";
export const SIGNIN = "SIGNIN";
export const LOGOUT = "LOGOUT";

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `${url}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
          mod: "CheckUserAuth",
          email: email,
          password: password,
        }),
      }
    );
    
    // if (!response.ok) {
    //   const resData = await response.json();
    //   const errorId = resData.error.message;
    //   let message = "Something went wrong :(";
    //   if (errorId === "EMAIL_EXISTS") {
    //     message = "Account with this email already exist";
    //   }
    //   console.log(resData);
    //   throw new Error(message);
    // }

    const resData = await response.json();
    if(resData.answer == "error 1!!!" || resData.answer == "server error!"){
        let message = resData.answer;
        throw new Error(message);
    }
    console.log(resData);
    dispatch({ type: SIGNUP });
  };
};

export const signin = (login, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `${url}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
            mod: "CheckUserAuth",  
            login: login,
            password: password,
        }),
      }
    );

    const resData = await response.json();
    if(resData.requestID == "0"){
        let message = resData.answer;
        throw new Error(message);
    }

    console.log(resData);
    dispatch({
      type: SIGNIN,
      userID: resData.answer,
      username: resData.answer,
      login: login,
    });
    saveDataToStorage(resData.answer);
  };
};


export const signinFromStorage = () => {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem("userData");
    const transformedData = JSON.parse(userData);
    if (!transformedData.userID) {
      throw new Error();
    }

  };
};

const saveDataToStorage = (userID) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      userID: userID,
    })
  );
};
