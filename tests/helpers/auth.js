const getAuthToken = async (request, app, credentials) => {
  const res = await request(app)
    .post("/login")
    .send(credentials);
  return res.body.token;
};

module.exports = { getAuthToken }; 