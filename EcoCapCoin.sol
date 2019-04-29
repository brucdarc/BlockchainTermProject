
pragma solidity ^0.5.7;
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-solidity/master/contracts/token/ERC20/ERC20.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-solidity/master/contracts/token/ERC20/ERC20Burnable.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-solidity/master/contracts/ownership/Ownable.sol";




contract EcoCapCoin is ERC20Burnable, Ownable{
    string public name;
    uint8 public decimals;
    string public symbol;
    //uint totalSupply;

    struct polluter{
        bool hasLocation;
        string location;
        uint256 pollutedThisCycle;
    }
    struct location{
        uint256 capacity;
        uint256 holding;
        uint256 original_cap;
    }

    struct sensor{
        bool isSensor;
        address registeredPolluter;
    }


    mapping(address => polluter) polluters;
    mapping(string => location) locations;
    mapping(address => sensor) sensors;

    /*
    mapping(address => string) locations;
    mapping(address => bool) hasLocation;
    mapping(string => uint256) location_capacities;
    mapping(string => uint256) location_holdings;

    mapping(address => bool) isSensor;
    mapping(address => address) sensors; // a sensor maps to who it is recordings pollution for
    mapping(address => uint256) pollutedThisCycle; //how much has an address polluted this cycle
    */



    constructor() public {
        name = "EcoCapCoin";                                   // Set the name for display purposes
        decimals = 18;                            // Amount of decimals for display purposes
        symbol = "ECC";                               // Set the symbol for display purposes
        uint256 totalSupply = uint256(1000000000*10**uint(decimals));                        // Update total supply
        _mint(msg.sender, totalSupply);          // Give the creator all initial tokens
        
        
        polluter storage regulator = polluters[msg.sender];
        regulator.location = "GOVERNANCE NON AREA";
        regulator.hasLocation = true;
        location storage govArea = locations["GOVERNANCE NON AREA"];
        govArea.capacity = totalSupply;
        govArea.holding = totalSupply;
        govArea.original_cap = totalSupply;
        
    }

    /*
    let the owner of the contract register the locations of different addresses
    */
    function register(address user, string memory loc) public onlyOwner{
        polluters[user].location = loc;
        polluters[user].hasLocation = true;
        polluters[user].pollutedThisCycle = 0;
    }

    function setLocationCapacity(string memory loc, uint256 capacity) public onlyOwner{
        locations[loc].capacity = capacity;
        locations[loc].original_cap = capacity;
    }

    function registerSensor(address pol, address sens) public onlyOwner{
        sensors[sens].registeredPolluter = pol;
        sensors[sens].isSensor = true;
    }

    function sensorAddPollution(uint256 pollution) public{
        require(sensors[msg.sender].isSensor);
        address pol = sensors[msg.sender].registeredPolluter;
        polluters[pol].pollutedThisCycle = polluters[pol].pollutedThisCycle.add(pollution);
    }

    function getUserLocation(address user) public view returns (string memory) {
        return polluters[user].location;
    }


    function getLocationCapacity(string memory loc) public view returns (uint256) {
        return locations[loc].capacity;
    }

    function getLocationHoldings(string memory loc) public view returns (uint256) {
        return locations[loc].holding;
    }

    function checkPolluterLimit(address pol) public view returns (string memory){
        if(balanceOf(pol) < polluters[pol].pollutedThisCycle) return "EXCEEDED POLLUTION LIMIT";
        else return "Has not exceeded pollution limit";
    }



    /*
    take out the value from the holding of one location and move to another when a transfer is done

    make
    */
    function transfer(address to, uint256 value) public returns(bool){
        polluter storage receiver = polluters[to];
        polluter storage sender = polluters[msg.sender];
        require(receiver.hasLocation); //make sure receiver has location
        require(sender.hasLocation); //make sure sender has location
        location storage receiver_loc = locations[receiver.location];
        location storage sender_loc = locations[sender.location];


        require(receiver_loc.holding.add(value) <= receiver_loc.capacity); //make sure cap is not exceeded and revert if it is
        receiver_loc.holding = receiver_loc.holding.add(value); //increase the location holding for receiver
        sender_loc.holding = sender_loc.holding.sub(value); //decrease the sender location holdings
        _transfer(msg.sender, to, value); //transfer the tokens
        return true;
    }

    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        polluter storage receiver = polluters[to];
        polluter storage sender = polluters[msg.sender];
        require(receiver.hasLocation); //make sure receiver has location
        require(sender.hasLocation); //make sure sender has location
        location storage receiver_loc = locations[receiver.location];
        location storage sender_loc = locations[sender.location];


        require(receiver_loc.holding.add(value) <= receiver_loc.capacity); //make sure cap is not exceeded and revert if it is
        receiver_loc.holding = receiver_loc.holding.add(value); //increase the location holding for receiver
        sender_loc.holding = sender_loc.holding.sub(value); //decrease the sender location holdings
        return super.transferFrom(from, to, value); //transfer the tokens

        /*
        require(hasLocation[to]); //make sure receiver has location
        require(hasLocation[from]); //make sure sender has location
        string memory receiver_loc = locations[to];
        string memory sender_loc = locations[from];
        require(location_holdings[receiver_loc].add(value) <= location_capacities[receiver_loc]); //make sure cap is not exceeded and revert if it is
        location_holdings[receiver_loc] = location_holdings[receiver_loc].add(value); //increase the location holding for receiver
        location_holdings[sender_loc] = location_holdings[ sender_loc ].sub(value); //decrease the sender location holdings
        return super.transferFrom(from,to,value);
        */
        
    }

    /*

    when burning tokens, it decreases the capacity of whatever location those tokens are in
    it also obviously should decrease the location holdings and it does

    */
    function burn(uint256 value) public {
        polluter storage sender = polluters[msg.sender];

        if(sender.hasLocation){
            location storage sender_loc = locations[sender.location];
            sender_loc.holding = sender_loc.holding.sub(value);
            sender_loc.capacity = sender_loc.capacity.sub(value);
        }
        _burn(msg.sender, value);
    }

    function burnFrom(address from, uint256 value) public {
        polluter storage sender = polluters[from];

        if(sender.hasLocation){
            location storage sender_loc = locations[sender.location];
            sender_loc.holding = sender_loc.holding.sub(value);
            sender_loc.capacity = sender_loc.capacity.sub(value);
        }
        _burnFrom(from, value);
    }

}
