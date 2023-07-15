import multer from "multer"
import fs from "fs"
const multerFunc = (dest) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            if(fs.existsSync(dest)){
                cb(null, dest)
            }
            else{
                fs.mkdirSync(dest)
                cb(null, dest)
            }
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + file.originalname
          cb(null, file.fieldname + '-' + uniqueSuffix)
        }
      })
      
    return multer({ storage: storage })

}

export default multerFunc