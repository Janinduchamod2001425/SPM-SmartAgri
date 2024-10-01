import Fertilizer from "../model/fertilizerModel.js";
import PDFDocument from 'pdfkit'; 



// Function to generate a PDF report for fertilizers
export const generateFertilizerReport = async (req, res) => {
    try {
        // Fetch all fertilizers from the database
        const fertilizers = await Fertilizer.find();

        if (fertilizers.length === 0) {
            return res.status(404).json({ message: "No fertilizers found" });
        }

        // Initialize PDF document
        const doc = new PDFDocument();
        let filename = "fertilizer_report.pdf";

        // Set headers for the PDF response
        res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-type', 'application/pdf');
        doc.pipe(res); // Stream the generated PDF to the response

        // Report Title
        doc.fontSize(20).text("Fertilizer Recommendation Report", { align: 'center' });
        doc.moveDown();

        // Summary section
        const totalFertilizers = fertilizers.length;
        const fertilizerTypes = [...new Set(fertilizers.map(f => f.fertype))];
        const totalTypes = fertilizerTypes.length;

        doc.fontSize(14).text(`Total Fertilizers: ${totalFertilizers}`);
        doc.text(`Unique Fertilizer Types: ${totalTypes}`);
        doc.moveDown();

        // Fertilizer Details
        doc.fontSize(16).text("Fertilizer Details:");
        doc.moveDown();

        fertilizers.forEach((fertilizer, index) => {
            doc.fontSize(12).text(`${index + 1}. Name: ${fertilizer.fername}`, { continued: true });
            doc.text(` | Type: ${fertilizer.fertype}`, { continued: true });
            doc.text(` | Details: ${fertilizer.ferdetails}`, { continued: true });
            doc.text(` | Made By: ${fertilizer.fermade}`, { continued: true });
            doc.text(` | Soil Type: ${fertilizer.fersoil}`, { continued: true });
            doc.text(` | Suitable Crop: ${fertilizer.fercrop}`, { continued: true });
            doc.text(` | Suitable Climate: ${fertilizer.ferclimate}`);
            doc.moveDown();
        });

        // Finalize the PDF and end the document
        doc.end();
    } catch (error) {
        res.status(500).json({ message: "Error generating report", error: error.message });
    }
};





export const fcreate = async(req, res)=>{
    try{

        const fertilizerData = new Fertilizer(req.body);
        if(!fertilizerData){
            return res.status(404).json({msg: "Fertilizer data not found"});

        }
        const savedDatga = await fertilizerData.save();
        res.status(200).json({msg:"Ferilizer Added Successfully"});


    }catch (error){
        res.status(500).json({error: error});

    }
    }

    
    export const fgetAll = async(req, res) => {
        try{
            const fertilizerData = await Fertilizer.find();

            if(!fertilizerData){
                return res.status(404).json({msg: "Fertilizer data not found"});
            }

            res.status(200).json(fertilizerData);
        }catch(error){
            res.status(500).json({error: error});
        }
    }

    


    export const fgetone = async(req, res) => {
        try{
            const id = req.params.id;
            const fertilizerExist = await Fertilizer.findById(id);

            if(!fertilizerExist){
                return res.status(404).json({msg: "Fertilizer data not found"});
            }

            res.status(200).json(fertilizerExist);
        }catch(error){
            res.status(500).json({error: error});
        }
    }

    export const fupdate = async(req, res) => {
        try{
            const id = req.params.id;
            const fertilizerExist = await Fertilizer.findById(id);

            if(!fertilizerExist){
                return res.status(401).json({msg: "Fertilizer data not found"});
            }

            const fupdatedData = await Fertilizer.findByIdAndUpdate(id,req.body,{new:true});
            res.status(200).json({msg:"Updated Successfully"});
        }catch(error){
            res.status(500).json({error: error});
        }
    }

    export const fdelete = async(req, res) => {
        try{
            const id = req.params.id;
            const fertilizerExist = await Fertilizer.findById(id);

            if(!fertilizerExist){
                return res.status(401).json({msg: "Fertilizer data not found"});
            }

           await Fertilizer.findByIdAndDelete(id);
            res.status(200).json({msg:"Fertilizer deleted successfully"});
        }catch(error){
            res.status(500).json({error: error});
        }
    }




    

    // Function to recommend fertilizers based on user input
    export const recommendFertilizers = async (req, res) => {
      const { fercrop, fersoil, ferclimate, fername } = req.query;
    
      try {
        const query = {};
        
        // Add conditions to the query object based on user's input
        if (fercrop) query.fercrop = fercrop;
        if (fersoil) query.fersoil = fersoil;
        if (ferclimate) query.ferclimate = ferclimate;
        if (fername) query.fername = new RegExp(fername, 'i'); // Case-insensitive search for fertilizer name
    
        const fertilizers = await Fertilizer.find(query);
        
        if (fertilizers.length === 0) {
          return res.status(404).json({ message: "No fertilizers found for the given conditions." });
        }
    
        res.json(fertilizers);
      } catch (error) {
        res.status(500).json({ message: "Server error: " + error.message });
      }
    };
    