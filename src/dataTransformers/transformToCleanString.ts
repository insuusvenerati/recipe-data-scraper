import cleanString from "../utils/cleanString";
import transformToString from "./transformToString";

function transformToCleanString(value: any, key: any) {
  return cleanString(transformToString(value, key));
}

export default transformToCleanString;
