import Axios from 'axios';
import { useCallback, useMemo } from 'react';
import {
  LoginValues,
  LoginApiReturn,
  RegisterValues,
  RegisterApiReturn,
  PinValues,
  UserModel,
  UserMetadatumModel,
  PinApiReturn,
} from './apiModels';

/**
 * Access api endpoints.
 **/
export function useApi(token?: string) {
  const axios = useMemo(() => {
    const axios = Axios.create({
      // baseURL: process.env.REACT_APP_API_BASE,
      baseURL: '',
    });

    axios.interceptors.request.use((req) => {
      token &&
        (req.headers = {
          authorization: `Bearer ${token}`,
        });
      return req;
    });

    axios.interceptors.response.use(
      (res) => res,
      (err) => {
        // console.log(err);
        if (err.response.status === 400) {
          err.code = err.response.data.code;
          err.msg = err.response.data.msg;
        } else if (err.response.status === 403 || err.response.status == 500) {
          err.code = err.response.data.code;
          err.msg = err.response.data.msg;
        } else err.msg = err.message;
        alert(`操作失败: ${err.msg}`);
        throw err;
      }
    );

    return axios;
  }, [token]);

  return {
    postLogin: useCallback(
      async (values: FormData): Promise<LoginApiReturn> =>
        (await axios.post<LoginApiReturn>('/account/login/', values)).data,
      [axios]
    ),
    postRegister: useCallback(
      async (values: FormData): Promise<RegisterApiReturn> =>
        (await axios.post<RegisterApiReturn>('/account/register/', values)).data,
      [axios]
    ),
    postSendPin: useCallback(
      async (values: FormData): Promise<PinApiReturn> =>
        (await axios.post<PinApiReturn>('/account/send_pin/', values)).data,
      [axios]
    ),
    getUserMe: useCallback(
      async (token?: string): Promise<UserModel> =>
        (
          await axios.get<UserModel>(
            '/users/me',
            token
              ? {
                  headers: { authorization: `Bearer ${token}` },
                }
              : {}
          )
        ).data,
      [axios]
    ),
    putUserMetadataMe: useCallback(
      async (data: Partial<UserMetadatumModel>): Promise<UserMetadatumModel> => {
        return (await axios.put<UserMetadatumModel>('/user-metadata/me', Object.assign({}, data)))
          .data;
      },
      [axios]
    ),
    postForgotPassword: useCallback(
      async (email: string) =>
        (
          await axios.post(`/auth/forgot-password`, {
            email,
          })
        ).data,
      [axios]
    ),
    postResetPassword: useCallback(
      async (code: string, password: string, passwordConfirmation: string) =>
        (
          await axios.post(`/auth/reset-password`, {
            code,
            password,
            passwordConfirmation,
          })
        ).data,
      [axios]
    ),
  };
}

const axiosFetcher = async (url: string, params?: any) => (await Axios.get(url, { params })).data;
/**
 * Access api.sekai.best endpoints.
 */
// export function useApi() {
//   const axios = Axios.create({
//     baseURL: process.env.REACT_APP_API_BACKEND_BASE,
//   });
// }
