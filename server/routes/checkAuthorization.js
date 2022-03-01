const checkAuthorization = (req, res) => {
  try {
    res
      .status(200)
      .json({ success: true, statusCode: 200, message: "Authorized user" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, statusCode: 500, message: "Server error" });
  }
};

module.exports = checkAuthorization;
