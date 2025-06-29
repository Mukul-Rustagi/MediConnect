const doctorService = require("../services/doctorService");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/responseHandler");

const createDoctor = async (req, res) => {
  try {
    const result = await doctorService.createDoctor(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(sendErrorResponse(error.message));
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const result = await doctorService.getAllDoctors();
    res.json(result);
  } catch (error) {
    res.status(500).json(sendErrorResponse(error.message));
  }
};

const getDoctorById = async (req, res) => {
  try {
    const result = await doctorService.getDoctorById(req.params.id);
    if (!result.data) return res.status(404).json(result);
    res.json(result);
  } catch (error) {
    res.status(500).json(sendErrorResponse(error.message));
  }
};

const updateDoctor = async (req, res) => {
  try {
    console.log(req.body);
    const result = await doctorService.updateDoctor(req.params.id, req.body);
    if (!result.data) return res.status(404).json(result);
    res.json(result);
  } catch (error) {
    res.status(400).json(sendErrorResponse(error.message));
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const result = await doctorService.deleteDoctor(req.params.id);
    if (!result.data) return res.status(404).json(result);
    res.json(result);
  } catch (error) {
    res.status(500).json(sendErrorResponse(error.message));
  }
};

module.exports = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
