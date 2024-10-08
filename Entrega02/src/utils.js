import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, __dirname +'public/assets/img')
},
filename: function(req, file, cb){
    cb(null,file.originalname)
}
})

export default __dirname
export const uploader = multer ({storage})