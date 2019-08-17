// Get contract interface
const contractKey = 'simplesm.sol:MyCurrency';


const bytecode = output.contracts[contractKey].bytecode;
const data = '0x' + bytecode;
const abiJson = output.contracts[contractKey].interface;
const abi = JSON.parse(abiJson);

const compiledContract = fs.readFileSync("../build/contracts/")

// write contract json file 
const abidir = 'src/Store/abi/';
if (!fs.existsSync(abidir)){
    fs.mkdirSync(abidir);
}

fs.writeFileSync(abidir + 'MyCurrency.js', 'export default ' + abiJson);