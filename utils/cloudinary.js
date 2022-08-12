const cloudinary = require("cloudinary")

cloudinary.config({ 
  cloud_name: 'dxtes3zea', 
  api_key: '381953828236395', 
  api_secret: 'XOvbNI7m9paDkHDEOx87jbrN42k',
  secure: true
});

 async function uploadImage(filePath){
    return await cloudinary.v2.uploader.upload(filePath, {
        folder: "perfil-imgs-cvv"
    })
 } 
 
 async function deleteImage(publicId){
    return await cloudinary.v2.uploader.destroy(publicId)
 }

module.exports = {uploadImage, deleteImage}
