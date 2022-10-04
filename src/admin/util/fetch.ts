import axios from 'axios';

import { Album, NewData } from '../../shared/util/types';

enum Url {
  baseUrl = import.meta.env.VITE_APP_API_URL,
}

const getHeaders = (accessToken: string) => {
  return {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
};

export const getAllAlbums = async (accessToken: string) => {
  const url = `${Url.baseUrl}/api/v2/qwia-photos/album/all`;
  const config = getHeaders(accessToken);
  const { data }: { data: Album[] } = await axios.get(url, config);

  return data;
};

export const postNewAlbum = async (title: string, accessToken: string) => {
  const url = `${Url.baseUrl}/api/v2/qwia-photos/album/`;
  const config = getHeaders(accessToken);

  await axios.post(url, { title }, config);
};

export const patchAlbum = async (
  data: NewData,
  id: string,
  accessToken: string,
) => {
  const url = `${Url.baseUrl}/api/v2/qwia-photos/album/${id}`;
  const config = getHeaders(accessToken);

  await axios.patch(url, data, config);
};

export const postNewPhoto = async (
  albumId: string,
  title: string,
  key: string,
  accessToken: string,
) => {
  const url = `${Url.baseUrl}/api/v2/qwia-photos/photo/${albumId}`;
  const config = getHeaders(accessToken);
  const body = { title, url: key };

  await axios.post(url, body, config);
};

export const deletePhoto = async (id: string, accessToken: string) => {
  const url = `${Url.baseUrl}/api/v2/qwia-photos/photo/${id}`;
  const config = getHeaders(accessToken);

  await axios.delete(url, config);
};

export const patchPhoto = async (
  title: string,
  id: string,
  accessToken: string,
) => {
  const url = `${Url.baseUrl}/api/v2/qwia-photos/photo/${id}`;
  const config = getHeaders(accessToken);

  await axios.patch(url, { title }, config);
};
