const { initializeApp } = require("firebase/app");
const{firebaseConfig}= require('../src/config/firebase_config');
const {getStorage,ref,getDownloadURL,uploadBytesResumable} = require("firebase/storage");

 async function uploadFile(req,res){

    const firebaseCon = initializeApp(firebaseConfig);
    const storage = getStorage(firebaseCon)

    try{

        const dateTime = giveCurrentDateTime();
        const storageRef = ref(storage,`Products/${req.file.originalname + ' '+dateTime}`);
        const metadata = {
            contentType : req.file.mimetype
        }
        const subirArchivo = await uploadBytesResumable(storageRef,req.file.buffer,metadata)
        const downloadURL = await getDownloadURL(subirArchivo.ref)                
        res.status(200).json({
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        })

    }catch(err){
        res.status(400).send(err.message)
    }
    
}

function giveCurrentDateTime() {
    const today = new Date()
    const date = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDay()
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    const dateTime = date + ' ' + time 
    return dateTime
}

module.exports={uploadFile}