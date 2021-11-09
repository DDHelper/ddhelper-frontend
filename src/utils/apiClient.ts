import Axios from 'axios';
import { useCallback, useMemo } from 'react';
import {
  LoginValues,

} from './apiModels';

/**
 * Access api endpoints.
**/
export function useapi(token?: string) {
  const axios = useMemo(() => {
    const axios = Axios.create({
      // baseURL: process.env.REACT_APP_API_BASE,
      baseURL: 'http://yapi.phystack.top/mock/11'
    });

    axios.interceptors.request.use((req) => {
      token && (req.headers.authorization = `Bearer ${token}`);
      return req;
    });

    axios.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response.data.message && err.response.status !== 500)
          err.id = err.response.data.message[0].messages[0].id;
        else if (err.response.status === 500) {
          err.id = err.response.data.error;
          err.message = err.response.data.message;
        } else err.id = err.message;
        throw err;
      }
    );

    return axios;
  }, [token]);

  return {
    postLogin: useCallback(
      async (values: LoginValues): Promise<LoginApiReturn> =>
        (await axios.post<LoginApiReturn>('/auth/login', values)).data,
      [axios]
    ),
    postRegister: useCallback(
      async (values: RegisterValues): Promise<LoginApiReturn> =>
        (await axios.post<LoginApiReturn>('/auth/register', values))
          .data,
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
    postUpload: useCallback(
      async (formData: FormData, token?: string) =>
        (
          await axios.post('/upload', formData, {
            headers: Object.assign(
              {
                'Content-Type': 'multipart/form-data',
              },
              token
                ? {
                  authorization: `Bearer ${token}`,
                }
                : {}
            ),
          })
        ).data,
      [axios]
    ),
    putUserMetadataMe: useCallback(
      async (
        data: Partial<UserMetadatumModel>
      ): Promise<UserMetadatumModel> => {
        return (
          await axios.put<UserMetadatumModel>(
            '/user-metadata/me',
            Object.assign(
              {},
              data,
              data.languages
                ? {
                  languages: data.languages.map((lang) => lang.id),
                }
                : {}
            )
          )
        ).data;
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
    getAnnouncements: useCallback(
      async (params?: { [key: string]: any }) =>
        (
          await axios.get<AnnouncementModel[]>('/announcements?', {
            params: {
              _sort: 'isPin:DESC,published_at:DESC',
              ...(params || {}),
            },
          })
        ).data,
      [axios]
    ),
    getAnnouncementById: useCallback(
      async (id: string, params?: { [key: string]: any }) =>
        (await axios.get<AnnouncementModel>(`/announcements/${id}`, { params }))
          .data,
      [axios]
    ),
    getAnnouncementPage: useCallback(
      async (
        limit: number = 30,
        page: number = 0,
        params?: { [key: string]: any }
      ) =>
        (
          await axios.get<AnnouncementModel[]>('/announcements', {
            params: {
              _limit: limit,
              _start: page * limit,
              _sort: 'isPin:DESC,published_at:DESC',
              ...(params || {}),
            },
          })
        ).data,
      [axios]
    ),
    getAnnouncementCount: useCallback(
      async (params?: any) =>
        Number((await axios.get('/announcements/count', { params })).data),
      [axios]
    ),
    getAnnouncementByLanguagesPage: useCallback(
      async (
        limit: number = 30,
        page: number = 0,
        languages: number[],
        params?: { [key: string]: any }
      ) =>
        (
          await axios.get<AnnouncementModel[]>('/announcements/language', {
            params: {
              _limit: limit,
              _start: page * limit,
              _sort: 'isPin:DESC,published_at:DESC',
              targetLangs: languages,
              ...(params || {}),
            },
          })
        ).data,
      [axios]
    ),
    getAnnouncementByLanguagesCount: useCallback(
      async (languages: number[]) =>
        Number(
          (
            await axios.get('/announcements/language/count', {
              params: { targetLangs: languages },
            })
          ).data
        ),
      [axios]
    ),
    getComments: useCallback(
      async (contentType: string, id: string | number) =>
        (await axios.get(`/comments/${contentType}:${id}`)).data,
      [axios]
    ),
    postComment: useCallback(
      async (
        contentType: string,
        id: string | number,
        userId: number,
        avatar: AvatarModel | null,
        content: string
      ) =>
        (
          await axios.post(`/comments/${contentType}:${id}`, {
            authorUser: userId,
            authorAvatar: avatar ? avatar.url : null,
            content,
            related: [
              {
                refId: id,
                ref: contentType,
                field: 'comments',
              },
            ],
          })
        ).data,
      [axios]
    ),
    getUserProfile: useCallback(
      async (id: string | number) =>
        (
          await axios.get<UserMetadatumModel>(
            `/user-metadata/profile/user/${id}`
          )
        ).data,
      [axios]
    ),
    patchCommentLike: useCallback(
      async (
        contentType: string,
        contentId: string | number,
        commentId: string | number
      ) =>
        (
          await axios.patch<CommentModel>(
            `/comments/${contentType}:${contentId}/comment/${commentId}/like`
          )
        ).data,
      [axios]
    ),
    postCommentAbuse: useCallback(
      async (
        contentType: string,
        contentId: string | number,
        commentId: string | number,
        reason: CommentAbuseReason,
        content: string
      ) =>
        (
          await axios.post(
            `/comments/${contentType}:${contentId}/comment/${commentId}/report-abuse`,
            {
              reason,
              content,
            }
          )
        ).data,
      [axios]
    ),
    getMusic: useCallback(
      async (musicId: number) =>
        (
          await axios.get<MusicModel[]>('/musics', {
            params: { musicId, _limit: 1 },
          })
        ).data[0],
      [axios]
    ),
    getCard: useCallback(
      async (cardId: number) =>
        (
          await axios.get<CardModel[]>('/cards', {
            params: { cardId, _limit: 1 },
          })
        ).data[0],
      [axios]
    ),
    getEvent: useCallback(
      async (eventId: number) =>
        (
          await axios.get<EventModel[]>('/events', {
            params: { eventId, _limit: 1 },
          })
        ).data[0],
      [axios]
    ),
  };
}


const axiosFetcher = async (url: string, params?: any) =>
  (await Axios.get(url, { params })).data;
/**
 * Access api.sekai.best endpoints.
 */
  // export function useApi() {
  //   const axios = Axios.create({
  //     baseURL: process.env.REACT_APP_API_BACKEND_BASE,
  //   });
  // }
