import Axios from 'axios';
import { useCallback, useMemo } from 'react';
import {
  AddGroupApiReturn,
  ChangePasswordApiReturn,
  DelGroupApiReturn,
  DoSubscribeApiReturn,
  DynamicApiReturn,
  DynamicQueryModel,
  GroupListApiReturn,
  GroupListMidApiReturn,
  GroupListMidQueryModel,
  GroupMemberApiReturn,
  GroupMemberQueryModel,
  LoginApiReturn,
  LogoutApiReturn,
  MoveMemberApiReturn,
  PinApiReturn,
  RegisterApiReturn,
  RenameGroupApiReturn,
  SearchQueryModel,
  SearchSubscribeApiReturn,
  TimelineApiReturn,
  TimelineQueryModel,
  UserApiReturn,
} from './apiModels';
import {} from './apiModels.d';

// Access ddhelper api endpoints.
export function useApi(token?: string) {
  const axios = useMemo(() => {
    const axios = Axios.create({
      // baseURL: process.env.REACT_APP_API_BASE,
      baseURL: '/api',
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
        console.log(err.response.status);
        err.code = err.response.data.code;
        err.msg = err.response.data.msg;
        alert(`操作失败: ${err.msg}`);
        if (err.response?.status === 403 && err.msg === '未登录') {
          localStorage.clear();
          window.location.href = '/auth/login';
        } else throw err;
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
    postChangePassword: useCallback(
      async (values: FormData): Promise<ChangePasswordApiReturn> =>
        (await axios.post<ChangePasswordApiReturn>('/account/change_password/', values)).data,
      [axios]
    ),
    postLogout: useCallback(
      async (): Promise<LogoutApiReturn> =>
        (await axios.post<LogoutApiReturn>('account/logout/')).data,
      [axios]
    ),
    getUserInfo: useCallback(
      async (token?: string): Promise<UserApiReturn> =>
        (
          await axios.get<UserApiReturn>(
            '/account/user_info',
            token
              ? {
                  headers: { authorization: `Bearer ${token}` },
                }
              : {}
          )
        ).data,
      [axios]
    ),
    getSearchSubscribe: useCallback(
      async (qvalues: SearchQueryModel, token?: string): Promise<SearchSubscribeApiReturn> =>
        (
          await axios.get<SearchSubscribeApiReturn>(
            '/subscribe/search',
            token
              ? {
                  headers: { authorization: `Bearer ${token}` },
                  params: qvalues,
                }
              : { params: qvalues }
          )
        ).data,
      [axios]
    ),
    postDoSubscribe: useCallback(
      async (values: FormData): Promise<DoSubscribeApiReturn> =>
        (await axios.post<DoSubscribeApiReturn>('/subscribe/subscribe/', values)).data,
      [axios]
    ),
    getGroupList: useCallback(
      async (token?: string): Promise<GroupListApiReturn> =>
        (
          await axios.get<GroupListApiReturn>(
            '/subscribe/group_list',
            token
              ? {
                  headers: { authorization: `Bearer ${token}` },
                }
              : {}
          )
        ).data,
      [axios]
    ),
    getGroupListMid: useCallback(
      async (qvalues: GroupListMidQueryModel, token?: string): Promise<GroupListMidApiReturn> =>
        (
          await axios.get<GroupListMidApiReturn>(
            '/subscribe/group_list',
            token
              ? {
                  headers: { authorization: `Bearer ${token}` },
                  params: qvalues,
                }
              : { params: qvalues }
          )
        ).data,
      [axios]
    ),
    getGroupMember: useCallback(
      async (qvalues: GroupMemberQueryModel, token?: string): Promise<GroupMemberApiReturn> =>
        (
          await axios.get<GroupMemberApiReturn>(
            '/subscribe/group/members',
            token
              ? {
                  headers: { authorization: `Bearer ${token}` },
                  params: qvalues,
                }
              : { params: qvalues }
          )
        ).data,
      [axios]
    ),
    postAddGroup: useCallback(
      async (values: FormData): Promise<AddGroupApiReturn> =>
        (await axios.post<AddGroupApiReturn>('/subscribe/group/add/', values)).data,
      [axios]
    ),
    postRenameGroup: useCallback(
      async (values: FormData): Promise<RenameGroupApiReturn> =>
        (await axios.post<RenameGroupApiReturn>('/subscribe/group/update/', values)).data,
      [axios]
    ),
    deleteDelGroup: useCallback(
      async (values: string): Promise<DelGroupApiReturn> =>
        (await axios.delete<DelGroupApiReturn>('/subscribe/group/delete/', { data: values })).data,
      [axios]
    ),
    postMoveMember: useCallback(
      async (values: FormData): Promise<MoveMemberApiReturn> =>
        (await axios.post<MoveMemberApiReturn>('/subscribe/member/move/', values)).data,
      [axios]
    ),
    getDynamic: useCallback(
      async (qvalues: DynamicQueryModel, token?: string): Promise<DynamicApiReturn> =>
        (
          await axios.get<DynamicApiReturn>(
            '/dynamic/list',
            token
              ? {
                  headers: { authorization: `Bearer ${token}` },
                  params: qvalues,
                }
              : { params: qvalues }
          )
        ).data,
      [axios]
    ),
    getTimeline: useCallback(
      async (qvalues: TimelineQueryModel, token?: string): Promise<TimelineApiReturn> =>
        (
          await axios.get<TimelineApiReturn>(
            '/timeline/list',
            token
              ? {
                  headers: { authorization: `Bearer ${token}` },
                  params: qvalues,
                }
              : { params: qvalues }
          )
        ).data,
      [axios]
    ),
  };
}
