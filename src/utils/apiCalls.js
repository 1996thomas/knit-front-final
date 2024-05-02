import axios from "axios";

export async function getArticles() {
  const url = `${import.meta.env.VITE_API_URL}/api/articles`;
  try {
    const response = await axios.get(url, {
      params: { populate: "*" },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

export async function getArticle(articleId) {
  const url = `${import.meta.env.VITE_API_URL}/api/articles/${articleId}`;
  try {
    const response = await axios.get(url, {
      params: { populate: "*" },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

export async function getCategory(name) {
  const url = `${
    import.meta.env.VITE_API_URL
  }/api/articles?filters[tags][name][$eq]=${name}`;
  try {
    const response = await axios.get(url, {
      params: { populate: "*" },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

export async function getAllTags() {
  const url = `${import.meta.env.VITE_API_URL}/api/tags`;
  try {
    const response = await axios.get(url, {});
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

function handleAxiosError(error) {
  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log("Error", error.message);
  }
}
