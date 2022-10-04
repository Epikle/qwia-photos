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

export type NewData = {
  title: string;
  isPublished: boolean;
};
