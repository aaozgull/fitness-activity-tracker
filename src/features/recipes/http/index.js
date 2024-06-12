import axios from "axios";
import { rapidApiKey } from "../../../constants/index"; //"../../constants";

export const getRecipesList = async (tags = null, size) => {
  console.log(`------------------getRecipesList------ `);
  const options = {
    method: "GET",
    url: "https://tasty.p.rapidapi.com/recipes/list",
    params: { from: "0", size: size || "20", tags },
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "tasty.p.rapidapi.com",
    },
  };
  return await axios.request(options);
};
