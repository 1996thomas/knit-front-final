import axios from "axios";

export async function getArticles() {
  const url = `${import.meta.env.VITE_API_URL}/api/articles`;
  try {
    const response = await axios.get(url, {
      params: { populate: "*" },
    });
    const sortedData = response.data.data.sort((a, b) => a.id - b.id);
    return sortedData;
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

export async function getAd() {
  const url = `${import.meta.env.VITE_API_URL}/api/ads/`;
  try {
    const response = await axios.get(url, {
      params: { populate: "*" },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}
export async function incrementAd() {
  const url = `${import.meta.env.VITE_API_URL}/api/ads/`;

  try {
    // Step 1: Retrieve the latest ad
    const getAdsResponse = await axios.get(url, {
      params: { populate: "*" },
    });

    const latestAd = getAdsResponse.data.data[0];
    const adId = latestAd.id;
    const newAdCount = latestAd.attributes.adCount + 1;

    // Step 2: Increment adCount
    const updateAdResponse = await axios.put(`${url}${adId}`, {
      data: {
        adCount: newAdCount,
      },
    });

    return updateAdResponse.data;
  } catch (error) {
    handleAxiosError(error);
  }
}
