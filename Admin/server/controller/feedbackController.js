import Feedback from "../model/feedbackModel.js";


export const feedbackdelete = async(req, res) => {
    try{
        const id = req.params.id;
        const FeedbackExist = await Feedback.findById(id);

        if(!FeedbackExist){
            return res.status(401).json({msg: "Feedback data not found"});
        }

       await Feedback.findByIdAndDelete(id);
        res.status(200).json({msg:"Feedback deleted successfully"});
    }catch(error){
        res.status(500).json({error: error});
    }
}

export const feedbackgetAll = async(req, res) => {
    try{
        const feedbackData = await Feedback.find();

        if(!feedbackData){
            return res.status(404).json({msg: "feedback data not found"});
        }

        res.status(200).json(feedbackData);
    }catch(error){
        res.status(500).json({error: error});
    }
}
