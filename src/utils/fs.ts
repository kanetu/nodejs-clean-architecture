import fs from "fs";


// make Promise version of fs.readdir()
const readdirAsync = (dirname: fs.PathLike): Promise<string[]> => {
    return new Promise(function(resolve, reject) {
        fs.readdir(dirname, function(err, filenames){
            if (err) 
                reject(err); 
            else 
                resolve(filenames);
        });
    });
};

// make Promise version of fs.readFile()
const readFileAsync = (filename: fs.PathOrFileDescriptor, enc: any): Promise<Buffer> => {
    return new Promise(function(resolve, reject) {
        fs.readFile(filename, enc, function(err, data){
            if (err) 
                reject(err); 
            else
                resolve(data);
        });
    });
};

const isFileExisted = async (path: string) => await fs.promises.stat(path).then(() => true, () => false);

const removeFile = async (filePath: string) => {
  const isExist = await isFileExisted(filePath)

  if(isExist) {
    fs.unlink(filePath, (err) => {
      if (err) return console.log(err);
      console.log("File deleted successfully");
    });
  }
  
};

export default {...fs, readdirAsync, readFileAsync, isFileExisted, removeFile}