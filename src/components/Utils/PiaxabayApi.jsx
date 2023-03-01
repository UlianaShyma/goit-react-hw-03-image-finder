import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

export const FetchImages = async (query, page) => {
  const { data } = await axios.get(BASE_URL, {
    params: {
      q: query,
      page: page,
      key: '33173129-c85c4e5e5fd6928dffbf93ca2',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 12,
    },
  });
  return data;
};
