const fs = require('fs');
const fetch = require('isomorphic-fetch');
const apiKey = 'AIzaSyDPbpLnca85aCOTW2gRVVGTsyQPmraRYLo';
const logger = fs.createWriteStream('log.txt', { flags: 'a' }); // Create logger


if (process.argv.length > 3) { // check if we have params from user
    const urlsFile = process.argv[2];
    const outputFile = process.argv[3]
    
    const urlsArr = fs.readFileSync(urlsFile).toString().split("\n");
    const outputStream = fs.createWriteStream(outputFile, { flags: 'a' }); 
    
    for(i in urlsArr) {
        if (urlsArr[i].length) { // check if it's not an empty line
            console.log(`Working with the following URL: ${urlsArr[i]}`);
            let urlForAPI = `https://www.googleapis.com/pagespeedonline/v4/runPagespeed?url=${urlsArr[i]}&key=${apiKey}`;
            fetch(urlForAPI)
            .then(response => response.text())
            .then(text => {
                outputStream.write(text);
                outputStream.write("\n");
            })
            .catch(err => {
                logger.write(err);
                logger.write("\n");
            });
        }
    }
} else {
    if (process.argv.length > 2) {
        logger.write('The output file path param is missing!!!');
        logger.write("\n");
        console.log('The output file path param is missing!!!');
    } else {
        logger.write('Params are missing!!!');
        logger.write("\n");
        console.log('Params are missing!!!');
    }
}
