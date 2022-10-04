export type Album = {
  id: string;
  title: string;
  isPublished: boolean;
  thumbnail: {
    likes: number;
    url: string;
  } | null;
  photos: Photo[] | [];
};

export type Photo = {
  id: string;
  title: string;
  url: string;
  likes: [number, boolean];
};

export type PutUrl = {
  uploadUrl: string;
  key: string;
};

export type NewData = {
  title: string;
  isPublished: boolean;
};

export const URLS = {
  apiUrl: import.meta.env.VITE_APP_API_URL as string,
  awsUrl: import.meta.env.VITE_APP_AWS_URL as string,
  pageUrl: import.meta.env.VITE_APP_PAGE_URL as string,
};
