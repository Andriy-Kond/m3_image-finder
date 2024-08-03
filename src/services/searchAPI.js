import axios from "axios";

const END_POINT = "https://pixabay.com/api";
const SEQURE_KEY = "34581261-d39fcdfb48adfd850ac44b9c1";

async function fetchImage(query) {
  console.log("query :>> ", query);

  const completedRequest = await axios.get(
    `${END_POINT}/?key=${SEQURE_KEY}&q=${query}`,
  );

  return completedRequest.data;
}

const searchAPI = {
  fetchImage,
};

export default searchAPI;
