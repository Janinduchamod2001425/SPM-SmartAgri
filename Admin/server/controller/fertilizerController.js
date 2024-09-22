import Fertilizer from "../model/fertilizerModel.js";

export const fcreate = async (req, res) => {
  try {
    const fertilizerData = new Fertilizer(req.body);
    if (!fertilizerData) {
      return res.status(404).json({ msg: "Fertilizer data not found" });
    }
    const savedData = await fertilizerData.save();
    res
      .status(200)
      .json({ msg: "Ferilizer Added Successfully", data: savedData });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const fgetAll = async (req, res) => {
  try {
    const fertilizerData = await Fertilizer.find();

    if (!fertilizerData) {
      return res.status(404).json({ msg: "Fertilizer data not found" });
    }

    res.status(200).json(fertilizerData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const fgetone = async (req, res) => {
  try {
    const id = req.params.id;
    const fertilizerExist = await Fertilizer.findById(id);

    if (!fertilizerExist) {
      return res.status(404).json({ msg: "Fertilizer data not found" });
    }

    res.status(200).json(fertilizerExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const fupdate = async (req, res) => {
  try {
    const id = req.params.id;
    const fertilizerExist = await Fertilizer.findById(id);

    if (!fertilizerExist) {
      return res.status(401).json({ msg: "Fertilizer data not found" });
    }

    const fupdatedData = await Fertilizer.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ msg: "Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const fdelete = async (req, res) => {
  try {
    const id = req.params.id;
    const fertilizerExist = await Fertilizer.findById(id);

    if (!fertilizerExist) {
      return res.status(401).json({ msg: "Fertilizer data not found" });
    }

    await Fertilizer.findByIdAndDelete(id);
    res.status(200).json({ msg: "Fertilizer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
