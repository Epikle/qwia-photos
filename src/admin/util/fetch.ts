export const fetchAllAlbums = async (accessToken: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/api/v2/qwia-photos/album/all`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error('Something went wrong...');
  }

  return response.json();
};

export const fetchNewAlbum = async (title: string, accessToken: string) => {
  await fetch(`${import.meta.env.VITE_APP_API_URL}/api/v2/qwia-photos/album/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      title: title,
    }),
  });
};

export const fetchNewPhoto = async (
  albumId: string,
  formData: FormData,
  accessToken: string,
) => {
  await fetch(
    `${import.meta.env.VITE_APP_API_URL}/api/v2/qwia-photos/photo/${albumId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    },
  );
};

export const fetchDeletePhoto = async (id: string, accessToken: string) => {
  await fetch(
    `${import.meta.env.VITE_APP_API_URL}/api/v2/qwia-photos/photo/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
};

export const fetchEditPhoto = async (
  title: string,
  id: string,
  accessToken: string,
) => {
  await fetch(
    `${import.meta.env.VITE_APP_API_URL}/api/v2/qwia-photos/photo/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ title }),
    },
  );
};
