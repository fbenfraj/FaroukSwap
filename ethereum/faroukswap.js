import web3 from "./web3";
import abi from "./faroukswap-abi";

const instance = new web3.eth.Contract(
  abi,
  "0x6BF10401dbc444C62fd3d759258f54cE8bc31bC3"
);

export default instance;
