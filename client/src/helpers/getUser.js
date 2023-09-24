const { default: axios } = require("axios");

const getUser = async (token) => {
  try {
    const { data } = await axios.get("/api/user/getUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data.status === "success") {
      // console.log(data.user);
      return data.user;
    } else {
      console.log(data.message);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default getUser;
