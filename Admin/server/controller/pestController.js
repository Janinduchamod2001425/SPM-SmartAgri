import Pest from "../model/pestModel.js";







export const pcreate = async (req, res) => {
  try {
    const pestData = new Pest(req.body);
    if (!pestData) {
      return res.status(404).json({ msg: "Pests and Diseases data not found" });
    }
    const savedData = await pestData.save();
    res
      .status(200)
      .json({ msg: "Record created successfully", data: savedData });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const pgetAll = async (req, res) => {
  try {
    const pestData = await Pest.find();

    if (!pestData) {
      return res.status(404).json({ msg: "Pest and Diseases data not found" });
    }

    res.status(200).json(pestData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const pgetOne = async (req, res) => {
  try {
    const id = req.params.id;
    const pestExist = await Pest.findById(id);

    if (!pestExist) {
      return res.status(404).json({ msg: "Pest and Diseases data not found" });
    }

    res.status(200).json(pestExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const pupdate = async (req, res) => {
  try {
    const id = req.params.id;
    const pestExist = await Pest.findById(id);

    if (!pestExist) {
      return res.status(401).json({ msg: "Pest and Diseases data not found" });
    }

    const pupdatedData = await Pest.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ msg: "Record updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const pdelete = async (req, res) => {
  try {
    const id = req.params.id;
    const pestExist = await Pest.findById(id);

    if (!pestExist) {
      return res.status(401).json({ msg: "Pest and Diseases data not found" });
    }

    await Pest.findByIdAndDelete(id);
    res.status(200).json({ msg: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

