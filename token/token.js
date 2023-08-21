//利用uuid生成未登录用户临时标识符
import {
  v4 as uuidv4
} from "uuid";
export const SET_USERID = () => {
  return uuidv4();
};
