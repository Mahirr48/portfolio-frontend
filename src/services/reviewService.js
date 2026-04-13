import API from "./api";

// CREATE
export const createReview = async (data) => {
  try {
    const res = await API.post("/reviews", data);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "Failed to create review";
  }
};

// GET FEATURED
export const getFeaturedReviews = async () => {
  try {
    const res = await API.get("/reviews/featured");
    return res.data;
  } catch (err) {
    throw "Failed to fetch featured reviews";
  }
};

// GET ALL
export const getAllReviews = async () => {
  try {
    const res = await API.get("/reviews");
    return res.data;
  } catch {
    throw "Failed to fetch reviews";
  }
};

// TOGGLE APPROVE
export const toggleApprove = async (id) => {
  try {
    const res = await API.put(`/reviews/approve/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "Approve failed";
  }
};

// TOGGLE FEATURE
export const toggleFeature = async (id) => {
  try {
    const res = await API.put(`/reviews/feature/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || "Feature failed";
  }
};