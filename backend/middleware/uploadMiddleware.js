const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Check file type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif|glb|gltf/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    // Mimetype check might fail for 3D files depending on OS/Browser, so relying more on extname for GLB
    const is3D = file.originalname.match(/\.(glb|gltf)$/i);

    if (mimetype && extname) {
        return cb(null, true);
    } else if (is3D) {
        return cb(null, true);
    } else {
        cb('Error: Images or 3D Models (GLB/GLTF) Only!');
    }
}

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // 10MB limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

module.exports = upload;
