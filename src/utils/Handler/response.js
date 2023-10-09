let responseData = (res, data = null) => {
  return res.json({ message: "success", data });
};

export default responseData;
