import Genetic from "../model/geneticModel.js";

// C - Create (create a new user)
export const createGenetic = async (req, res) => {
  try {
    const geneticData = new Genetic(req.body);

    if (!geneticData) {
      return res.status(404).json({ msg: "Genetic Data Not Found" });
    }

    const saveData = await geneticData.save();
    res
      .status(200)
      .json({ msg: "Genetic Data Added Successfully", data: saveData });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// R - Read (Read all data)
export const getAll = async (req, res) => {
  try {
    const geneticData = await Genetic.find();

    // check if the data exist
    if (!geneticData) {
      return res.status(404).json({ msg: "Genetic Data not found" });
    }

    // Display all data
    res.status(200).json(geneticData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// R - Read (Read paticular data by id)
export const getOne = async (req, res) => {
  try {
    // get the user id
    const id = req.params.id;

    // pass the id to the function
    const geneticExist = await Genetic.findById(id);

    // check if the user exist
    if (!geneticExist) {
      return res.status(404).json({ msg: "Genetic data not found" });
    }

    // Display the user according to the id
    res.status(200).json(geneticExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// U - Update (Update paticular user by id)
export const updateGeneticData = async (req, res) => {
  try {
    // get the user id
    const id = req.params.id;

    // pass the id to the function
    const geneticExist = await Genetic.findById(id);

    // check if the user exist
    if (!geneticExist) {
      return res.status(404).json({ msg: "Genetic data not found" });
    }

    // Update the user data
    const updateData = await Genetic.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    // Display the updated data
    res.status(200).json({ msg: "Genetic data Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// D - Delete (Delete User)
export const deleteGeneticData = async (req, res) => {
  try {
    // get the user id
    const id = req.params.id;

    // pass the id to the function
    const geneticExist = await Genetic.findById(id);

    // check if the user exist
    if (!geneticExist) {
      return res.status(404).json({ msg: "Genetic data not found" });
    }

    // Delete the user
    await Genetic.findByIdAndDelete(id);
    res.status(200).json({ msg: "Genetic data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
