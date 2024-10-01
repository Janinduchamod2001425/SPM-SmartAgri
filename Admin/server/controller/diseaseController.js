import Disease from "../model/diseaseModel.js";

import PDFDocument from 'pdfkit';


export const generateDiseaseReport = async (req, res) => {
    try {
        // Fetch all diseases from the database
        const diseases = await Disease.find();

        if (diseases.length === 0) {
            return res.status(404).json({ message: "No diseases found" });
        }

        // Initialize PDF document
        const doc = new PDFDocument();
        let filename = "disease_report.pdf";

        // Set headers for the PDF response
        res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-type', 'application/pdf');
        doc.pipe(res); // Stream the generated PDF to the response

        // Draw green background for "SmartAgri"
        doc.rect(0, 0, doc.page.width, 100).fill('green'); // Green rectangle for background
        doc.fillColor('white').fontSize(24).text("SmartAgri", { align: 'center', underline: true });
        doc.moveDown();

        // Add current date
        const currentDate = new Date().toLocaleDateString();
        doc.fillColor('black').fontSize(12).text(`Date: ${currentDate}`, { align: 'center' });
        doc.moveDown();

        // Report Title
        doc.fontSize(20).text("Disease Feedback Report", { align: 'center' });
        doc.moveDown();

        // Summary section
        const totalDiseases = diseases.length;
        const uniqueDiseaseNames = [...new Set(diseases.map(d => d.disename))];
        const totalUniqueDiseases = uniqueDiseaseNames.length;

        doc.fontSize(14).text(`Total Diseases Reported: ${totalDiseases}`);
        doc.text(`Unique Diseases: ${totalUniqueDiseases}`);
        doc.moveDown();

        // Display Unique Disease Names
        doc.fontSize(16).text("Unique Disease Names:", { underline: true });
        doc.moveDown();

        uniqueDiseaseNames.forEach((name, index) => {
            doc.fontSize(12).text(`${index + 1}. ${name}`);
            doc.moveDown();
        });

        // Disease Details Header
        doc.fontSize(16).text("Disease Feedback Details:", { underline: true });
        doc.moveDown();

        // Disease Details (Point-wise)
        diseases.forEach((disease, index) => {
            doc.fontSize(12).text(`${index + 1}. Name: ${disease.disename}`);
            doc.list([ // Using a list for point-wise structure
                `Rating: ${disease.rating}`,
                `User Feedback: ${disease.feedback}`
            ]);
            doc.moveDown();
        });

        // Finalize the PDF and end the document
        doc.end();
    } catch (error) {
        res.status(500).json({ message: "Error generating report", error: error.message });
    }
}



export const diseasegetAll = async(req, res) => {
    try{
        const diseaseData = await Disease.find();

        if(!diseaseData){
            return res.status(404).json({msg: "disease data not found"});
        }

        res.status(200).json(diseaseData);
    }catch(error){
        res.status(500).json({error: error});
    }
}