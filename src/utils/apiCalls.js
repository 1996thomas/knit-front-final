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

export async function getArticle(slug) {
  const url = `${import.meta.env.VITE_API_URL}/api/articles`;
  try {
    const response = await axios.get(url, {
      params: {
        populate: "*",
        filters: {
          slug: {
            $eq: slug,
          },
        },
      },
    });
    // Vérifiez si l'article existe et renvoyez-le
    if (response.data && response.data.data && response.data.data.length > 0) {
      return response.data.data[0];
    } else {
      throw new Error("Article not found");
    }
  } catch (error) {
    console.error("Error fetching article:", error);
    return null; // Retourne null en cas d'erreur
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

export async function getCGU() {
  const url = `${import.meta.env.VITE_API_URL}/api/cgus`;
  try {
    const response = await axios.get(url, {
      params: { populate: "*" },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}
