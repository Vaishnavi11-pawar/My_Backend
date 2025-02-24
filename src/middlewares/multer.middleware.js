import multer from "multer"

// we are using disk storage, we can also use memory storage too.
// in function file parameter is for uploading the file through multer because all other data is configured but file is not so we use multer or express file upload.
// cb is callback
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

export const upload = multer({ storage,})