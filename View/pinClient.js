const axios = require('axios');

const keys = require('fs').readFileSync('.secrets', 'utf-8')
	.split('\n');

const generateOptions = (additionalOptions = null) => {
	return {
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
			console.log("response", response);
        })
        .catch(function (error) {
            //handle error here
        });
};


const pinFileToIPFS = (file) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
//we gather a local file from the API for this example, but you can gather the file from anywhere
	// let data = new FormData();
	// data.append('file', fs.createReadStream('./yourfile.png'));

	return axios.post(
			url,
			file,
			generateOptions({'Content-Type': `multipart/form-data; boundary= ${data._boundary}`})
		).then(function (response) {
			console.log("pin file response", response);
		}).catch(function (error) {
			//handle error here
		});
};

testAuthentication();

//pinFileToIPFS(file);
