/**
 * Using request library
 * Implement the function (ureadline, local file path)
 *  -> download the resource @ the ureadline to the local file path
 *  -> complete: print msg `downloaded and saved # bytes to ./path
 * 
 * run example:
 *  node fetcher.js http://www.example.edu/ ./index.html
 * 
 */

// request library
// using Node's fs (file system) module to write file
const fs = require('fs');
const request = require('request');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

// for terminal input
const url = process.argv[2];        // http://www.example.edu/
const pathFile = process.argv[3];   // ./index.txt

request(url, (err, response, body) => {
  if (err) {
    // error by request ureadline
    console.error(`--- Requesting Error --- \n${err}`);
    return
  }
  const data = body;

  // check if writeFile is already exit
  fs.access(pathFile, (err) => {
    // err: no file - !err: file exits
    // console.log(`${pathFile} ${err ? 'does not exist' : 'exists'}`);
    if (!err) {
      readline.question(`${pathFile} exist! Overwrite it? (y/n): `, function(ans) {
        if (ans.toLowerCase() !== 'y') {
          readline.close();
          console.log('Application is closed!');
        } else {
          readline.close();
          console.log(`${pathFile} will be overrided...`);
          writeData();
        }
      })
    } else {  // file not exits
      readline.close();
      writeData();
    }
  });   // end of fs.acess 

  // writeData func
  function writeData() {
    // http request is complete >>> get the data >>> write to local file (async process)
    fs.writeFile(pathFile, data, err => {
    // error by writing the file
    if (err) {
      console.error(`--- Writing to File Error --- \n${err}`);
      return
    }
    const fileSize = data.length;
    console.log(`Dowloaded ${fileSize} bytes and saved at ${pathFile}`);
  });
  };  // end of writeData()
  
});