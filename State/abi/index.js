// Get contract interface
const contractKey = 'simplesm.sol:Resolution';


const bytecode = output.contracts[contractKey].bytecode;
const data = '0x' + bytecode;
const abiJson = output.contracts[contractKey].interface;
const abi = JSON.parse(abiJson);

const compiledContract = fs.readFileSync("./build/contracts/")

// write contract json file 
const abidir = './';
if (!fs.existsSync(abidir)){
    fs.mkdirSync(abidir);
}

fs.writeFileSync(abidir + 'Resolution.js', 'export default ' + abiJson);
