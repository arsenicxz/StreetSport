import { url } from "../url";

export const GETGAMES = "GETGAMES";


export const getgames = () => {
  return async (dispatch) => {
    const response = await fetch(`${url}/showalltypes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        mod: "ShowAllTypes"
      }),
    });

    const resData = await response.json();
    if (resData.answer == "null games" || resData.answer == "server error!") {
      let message = resData.answer;
      throw new Error(message);
    }

    //console.log(resData);
    dispatch({
      type: GETGAMES,
      games: resData
    });
  };
};
