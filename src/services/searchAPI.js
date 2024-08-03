import axios from "axios";

const END_POINT = "https://pixabay.com/api";
const SEQURE_KEY = "34581261-d39fcdfb48adfd850ac44b9c1";
const PER_PAGE = 12;

async function fetchImage(query, page) {
  const completedRequest = await axios.get(
    `${END_POINT}/?key=${SEQURE_KEY}&q=${query}&per_page=${PER_PAGE}&page=${page}`,
  );

  return completedRequest.data;
}

const searchAPI = {
  fetchImage,
};

export default searchAPI;
