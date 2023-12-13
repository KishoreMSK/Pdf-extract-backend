const express = require('express')
const multer = require("multer")
const PdfParse = require("pdf-parse");
const cors = require('cors')
const app = express()
app.use(cors());
const storage = multer.memoryStorage()
const upload = multer({ storage })

app.post("/upload", upload.single('pdf') , async(req, res) => {
    try {
        const pdfBuffer = req.file.buffer;
        const pdfData = await PdfParse(pdfBuffer)
        const metaData = {
            title: pdfData.info.Title,
            creationDate: pdfData.info.CreationDate,
            author: pdfData.info.Author,
            creator: pdfData.info.Creator
        }
        res.status(200).json(metaData);
    } catch (error) {
        res.status(500).json({error: 'Something went wrong'})
    }
})

app.listen(5000, ()=> {
    console.log('Server started successfully in the port 5000')
})