
pragma solidity ^0.5.7;
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-solidity/master/contracts/token/ERC20/ERC20.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-solidity/master/contracts/token/ERC20/ERC20Burnable.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-solidity/master/contracts/ownership/Ownable.sol";

contract EcoCapCoin is ERC20Burnable, Ownable{
    string public name;
    uint8 public decimals;
    string public symbol;
    //uint totalSupply;
    mapping(address => string) locations;
    mapping(address => bool) hasLocation;
    mapping(string => uint256) location_capacities;
    mapping(string => uint256) location_holdings;

    mapping(address => bool) isSensor;
    mapping(address => address) sensors; // a sensor maps to who it is recordings pollution for
    mapping(address => uint256) pollutedThisCycle; //how much has an address polluted this cycle


    constructor() public {
        name = "EcoCapCoin";                                   // Set the name for display purposes
        decimals = 18;                            // Amount of decimals for display purposes
        symbol = "ECC";                               // Set the symbol for display purposes
        uint256 totalSupply = uint256(1000000000*10**uint(decimals));                        // Update total supply
        _mint(msg.sender, totalSupply);          // Give the creator all initial tokens
        locations[msg.sender] = "GOVERNANCE NON AREA";
        hasLocation[msg.sender] = true;
        location_capacities["GOVERNANCE NON AREA"] = totalSupply;
        location_holdings["GOVERNANCE NON AREA"] = totalSupply;
    }

    /*
    let the owner of the contract register the locations of different addresses
    */
    function register(address user, string memory location) public onlyOwner{
        locations[user] = location;
        hasLocation[user] = true;
    }

    function setLocationCapacity(string memory location, uint256 capacity) public onlyOwner{
        location_capacities[location] = capacity;
    }

    function registerSensor(address polluter, address sensor) public onlyOwner{
        sensors[sensor] = polluter;
        isSensor[sensor] = true;
    }

    function sensorAddPollution(uint256 pollution) public{
        require(isSensor[msg.sender]);
        address polluter = sensors[msg.sender];
        pollutedThisCycle[polluter] = pollutedThisCycle[polluter].add(pollution);
    }

    function getUserLocation(address user) public view returns (string memory) {
        return locations[user];
    }


    function getLocationCapacity(string memory location) public view returns (uint256) {
        return location_capacities[location];
    }

    function getLocationHoldings(string memory location) public view returns (uint256) {
        return location_holdings[location];
    }



    /*
    take out the value from the holding of one location and move to another when a transfer is done

    make
    */
    function transfer(address to, uint256 value) public returns(bool){
        require(hasLocation[to]); //make sure receiver has location
        require(hasLocation[msg.sender]); //make sure sender has location
        string memory receiver_loc = locations[to];
        require(location_holdings[receiver_loc].add(value) <= location_capacities[receiver_loc]); //make sure cap is not exceeded and revert if it is
        location_holdings[receiver_loc] = location_holdings[receiver_loc].add(value); //increase the location holding for receiver
        location_holdings[locations[msg.sender]] = location_holdings[ locations[msg.sender] ].sub(value); //decrease the sender location holdings
        _transfer(msg.sender, to, value); //transfer the tokens
        return true;
    }

    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        require(hasLocation[to]); //make sure receiver has location
        require(hasLocation[from]); //make sure sender has location
        string memory receiver_loc = locations[to];
        string memory sender_loc = locations[from];
        require(location_holdings[receiver_loc].add(value) <= location_capacities[receiver_loc]); //make sure cap is not exceeded and revert if it is
        location_holdings[receiver_loc] = location_holdings[receiver_loc].add(value); //increase the location holding for receiver
        location_holdings[sender_loc] = location_holdings[ sender_loc ].sub(value); //decrease the sender location holdings
        return super.transferFrom(from,to,value);
    }

    /*

    when burning tokens, it decreases the capacity of whatever location those tokens are in
    it also obviously should decrease the location holdings and it does

    */
    function burn(uint256 value) public {
        if(hasLocation[msg.sender]){
            string memory sender_loc = locations[msg.sender];
            location_holdings[sender_loc] = location_holdings[sender_loc].sub(value);
            location_capacities[sender_loc] = location_capacities[sender_loc].sub(value);
        }
        _burn(msg.sender, value);
    }

    function burnFrom(address from, uint256 value) public {
        if(hasLocation[from]){
            string memory sender_loc = locations[from];
            location_holdings[sender_loc] = location_holdings[sender_loc].sub(value);
            location_capacities[sender_loc] = location_capacities[sender_loc].sub(value);
        }
        _burnFrom(from, value);
    }
    
}
