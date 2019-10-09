const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const keys = fs.readFileSync('.secrets', 'utf-8')
	.split('\n');

const generateOptions = (additionalOptions = null) => {
	return {
        maxContentLength: 'Infinity', //this is needed to prevent axios from erroring out with large files		
		headers: {
			'pinata_api_key': keys[0],
			'pinata_secret_api_key': keys[1],
			...additionalOptions
		}
	}
}

const testAuthentication = () => {
    const url = `https://api.pinata.cloud/data/testAuthentication`;
    return axios
        .get(url, generateOptions())
        .then(function (response) {
			//console.log("response", response);
        })
        .catch(function (error) {
            //handle error here
        });
};


// https://pinata.cloud/documentation#PinFileToIPFS
const pinFileToIPFS = (file) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

	// we gather a local file from the API for this example, but you can gather the file from anywhere
	const data = new FormData();
	data.append('file', fs.createReadStream(file));
	
	return axios.post(
			url,
			data,
			generateOptions({'Content-Type': `multipart/form-data; boundary= ${data._boundary}`})
		).then(function (response) {
			console.log(response.data.IpfsHash);
		}).catch(function (error) {
			console.error(error);
		});
};

//testAuthentication();

pinFileToIPFS('./index.html');
