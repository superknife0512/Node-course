const fs = require('fs');

// help delete file in system
module.exports = (filePath)=>{
    fs.unlink(filePath, err=>{
        if(err){
            throw err
        }

        console.log('Deleted Image');
    })
}