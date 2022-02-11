import web3 from "./web3";
import abi from "./faroukswap-abi";

const instance = new web3.eth.Contract(
  abi,
  "0x671F913Ab9DD24CaA2956bb80901B8f8826D66Ec"
);

export default instance;
