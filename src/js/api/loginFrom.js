import {formPost,formPut} from '../util/zeusFormAxios';
import {getBaseUrl} from '../util/config'
import { Message } from 'element-ui';

export const userLogin = parameters => formPost(`${getBaseUrl()}apigateway.gaodun.com/api/v1/vigo/login`, parameters)
