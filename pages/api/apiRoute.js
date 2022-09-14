import nextConnect from "next-connect";
import multer from "multer";

let filename = Date.now().toString();
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads/", // destination folder
    filename: (req, file, cb) => cb(null, getFileName(file)),
  }),
});

const getFileName = (file) => {
  console.log(file);
  filename += "_" + file.originalname;

  return filename;
};

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array("image")); // attribute name you are sending the file by

apiRoute.post((req, res) => {
  res.status(200).json({ data: `/uploads/profiles/${filename}` }); // response
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
