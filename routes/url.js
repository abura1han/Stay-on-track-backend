const Url = require("../models/Url");

/**
 * Get all urls
 */
const getAllUrls = async (req, res) => {
  const { _id } = req.User;
  try {
    const urls = await Url.find({ createdBy: _id });
    res.status(200).json({ success: true, statusCode: 200, data: urls });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, statusCode: 500, message: "Server error" });
  }
};

/**
 * Get url by id
 */
const getUrlById = async (req, res) => {
  const urlId = req.params.nodeId;
  const { _id } = req.User;
  try {
    const url = await Url.findOne({ createdBy: _id, _id: urlId });
    if (!url) {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, message: "Invalid url id" });
    }

    res.status(200).json({ success: true, statusCode: 200, data: node });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, statusCode: 500, message: "Server error" });
  }
};

/**
 * Add a new url
 */
const addUrl = async (req, res) => {
  const { label, url } = req.body;
  const { _id } = req.User;
  try {
    console.log(req.body);
    if (!label) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Label is required to create an url",
      });
    }
    if (!url) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Url is required to create an url",
      });
    }

    const newUrl = await Url.create({
      createdBy: _id,
      label,
      url,
    });
    await newUrl.save();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Url added successfully",
      data: newUrl,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, statusCode: 500, message: "Server error" });
  }
};

/**
 * Update an url
 */
const updateUrl = async (req, res) => {
  const { urlId } = req.query;
  const { _id } = req.User;
  const { label, url } = req.body;
  try {
    if (!urlId) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Url id is required to update an url",
      });
    }

    // Find the url
    const isUrlExist = Url.findOne({ _id: urlId, createdBy: _id });
    if (!isUrlExist) {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, message: "Invalid note id" });
    }

    // If update data is empty then return
    if (!label || !url) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Data must be provided for updating an url",
      });
    }

    // Update the url
    const updateUrl = await Url.findOneAndUpdate(
      { _id: urlId, createdBy: _id },
      { $set: { url, label } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Note updated successfully",
      data: updateUrl,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, statusCode: 500, message: "Server error" });
  }
};

/**
 * Delete an url by id
 */
const deleteUrl = async (req, res) => {
  const { urlId } = req.query;
  const { _id } = req.User;
  try {
    // Find the url
    const url = Url.findOne({ _id: urlId, createdBy: _id });
    if (!url) {
      return res
        .status(400)
        .json({ success: false, statusCode: 400, message: "Invalid url id" });
    }

    // Delete the url
    const deleteUrl = await Url.findOneAndDelete({
      _id: urlId,
      createdBy: _id,
    });

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Url deleted successfully",
      data: deleteUrl,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, statusCode: 500, message: "Server error" });
  }
};

module.exports = {
  getAllUrls,
  getUrlById,
  addUrl,
  updateUrl,
  deleteUrl,
};
