import logger from "../utils/logger";
import { parse } from "iso8601-duration";
import transformToString from "./transformToString";
import transformISOToString from "../utils/transformIsoToString";

function transformToTime(value: any, key: any) {
  // @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
  const time = transformToString(value);
  try {
    const parsedISODuration = parse(time);
    if (parsedISODuration) {
      return transformISOToString(parsedISODuration);
    }
  } catch (error) {
    // fail silently and return original time
    logger(`ISO date parsing failure for ${key}`);
  }

  return time;
}

export default transformToTime;
