import axios from 'axios';

import { Album, NewData, PutUrl, URLS } from './types';

const getHeaders = (accessToken: string) => {
  return {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
};

export const getVisibleAlbums = async () => {
  const url = `${URLS.apiUrl}/api/v2/qwia-photos/album/`;
  const { data }: { data: Album[] } = await axios.get(url);
  return data;
};

export const getAllAlbums = async (accessToken: string) => {
  const url = `${URLS.apiUrl}/api/v2/qwia-photos/album/all`;
  const config = getHeaders(accessToken);
  const { data }: { data: Album[] } = await axios.get(url, config);
  return data;
};

export const getAlbumById = async (aid: string) => {
  const getLikeId = localStorage.getItem('qp-id');
  const url = `${URLS.apiUrl}/api/v2/qwia-photos/album/${aid}?lid=${getLikeId}`;
  const { data } = await axios.get(url);
  return data;
};

export const postNewAlbum = async (title: string, accessToken: string) => {
  const url = `${URLS.apiUrl}/api/v2/qwia-photos/album/`;
  const config = getHeaders(accessToken);
  await axios.post(url, { title }, config);
};

export const patchAlbum = async (
  data: NewData,
  aid: string,
  accessToken: string,
) => {
  const url = `${URLS.apiUrl}/api/v2/qwia-photos/album/${aid}`;
  const config = getHeaders(accessToken);
  await axios.patch(url, data, config);
};

export const deleteAlbum = async (aid: string, accessToken: string) => {
  const url = `${URLS.apiUrl}/api/v2/qwia-photos/album/${aid}`;
  const config = getHeaders(accessToken);
  await axios.delete(url, config);
};

export const postNewPhoto = async (
  aid: string,
  title: string,
  key: string,
  accessToken: string,
) => {
  const url = `${URLS.apiUrl}/api/v2/qwia-photos/photo/${aid}`;
  const config = getHeaders(accessToken);
  const body = { title, url: key };
  await axios.post(url, body, config);
};

export const deletePhoto = async (pid: string, accessToken: string) => {
  const url = `${URLS.apiUrl}/api/v2/qwia-photos/photo/${pid}`;
  const config = getHeaders(accessToken);
  await axios.delete(url, config);
};

export const patchPhoto = async (
  title: string,
  pid: string,
  accessToken: string,
) => {
  const url = `${URLS.apiUrl}/api/v2/qwia-photos/photo/${pid}`;
  const config = getHeaders(accessToken);
  await axios.patch(url, { title }, config);
};

export const addLike = async (pid: string, lid: string) => {
  const url = `${URLS.apiUrl}/api/v2/qwia-photos/photo/like/${pid}`;
  await axios.post(url, { lid });
};

export const deleteLike = async (pid: string, lid: string) => {
  const url = `${URLS.apiUrl}/api/v2/qwia-photos/photo/like/${pid}?lid=${lid}`;
  await axios.delete(url);
};

export const getS3PutUrl = async (
  aid: string,
  fileType: string,
  accessToken: string,
) => {
  const url = `${URLS.apiUrl}/api/v2/qwia-photos/media/${aid}?filetype=${fileType}`;
  const config = getHeaders(accessToken);
  const { data } = await axios.get(url, config);
  const { uploadUrl, key } = data as PutUrl;
  return { uploadUrl, key };
};
