
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
        uint256 pollutedPreviousCycle;
        uint256 lastRegisteredCycle;
        address[] polSensors;
    }
    struct location{
        uint256 capacity;
        uint256 holding;
        uint256 original_cap;
        uint256 id;
    }

    struct sensor{
        bool isSensor;
        address registeredPolluter;
    }


    mapping(address => polluter) polluters;
    mapping(string => location) locations;
    mapping(address => sensor) sensors;
    address[] holders;
    uint256 cycle;
    uint256 locIdSpace;

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

    function validateCycleTokenTransaction(address from, address to, uint256 value) public{

    }

    /*
    let the owner of the contract register the locations of different addresses
    */
    function register(address user, string memory loc) public onlyOwner{
        require(!polluters[user].hasLocation, "Polluter Already Registered");
        polluters[user].location = loc;
        polluters[user].hasLocation = true;
        polluters[user].pollutedThisCycle = 0;
        holders.push(user);
    }

    function registerLocation(string memory loc, uint256 capacity) public onlyOwner{
        require(locations[loc].original_cap == 0, "Location Already Registered");
        locations[loc].capacity = capacity;
        locations[loc].original_cap = capacity;
        locations[loc].id = locIdSpace;
        locIdSpace++;
    }

    function nextCycle() public onlyOwner{
        cycle = cycle +1;
    }

    function registerSensor(address pol, address sens) public onlyOwner{
        sensors[sens].registeredPolluter = pol;
        sensors[sens].isSensor = true;
        polluters[pol].polSensors.push(sens);
    }

    function sensorAddPollution(uint256 pollution) public{
        require(sensors[msg.sender].isSensor, "You are not a sensor");
        address polAdd = sensors[msg.sender].registeredPolluter;
        polluter storage pol = polluters[polAdd];

        if(pol.lastRegisteredCycle != cycle){
            pol.lastRegisteredCycle = cycle;
            pol.pollutedPreviousCycle = pol.pollutedThisCycle;
            pol.pollutedThisCycle = 0;
        }

        pol.pollutedThisCycle = pol.pollutedThisCycle.add(pollution);

        //polluters[polAdd] = pol;
    }

    function getHolderAddress(uint index) public view returns(address){
        return holders[index];
    }

    function getHolderCount() public view returns(uint){
        return holders.length;
    }


    function getSensorAddress(address Tpolluter, uint index) public view returns(address){
        return polluters[Tpolluter].polSensors[index];
    }

    function getSensorCount(address Tpolluter) public view returns(uint){
        return polluters[Tpolluter].polSensors.length;
    }


    function getUserPreviousCyclePollution(address pol) public view returns (uint256) {
        polluter memory person = polluters[pol];

        //give previous if last pollution was on this cycle
        if(person.lastRegisteredCycle == cycle) return person.pollutedPreviousCycle;
        //give previous if last pollution was on last cycle
        else if(person.lastRegisteredCycle == cycle.sub(1)) return person.pollutedThisCycle;
        //give previous if last pollution was 2 or more cycles ago
        else return 0;
    }

    function getUserLocation(address user) public view returns (string memory) {
        return polluters[user].location;
    }

    function getLastPollutionCycle(address user) public view returns (uint256) {
        return polluters[user].lastRegisteredCycle;
    }

    function getLocationOriginalCapacity(string memory loc) public view returns (uint256) {
        return locations[loc].original_cap;
    }

    function getLocationCapacity(string memory loc) public view returns (uint256) {
        return locations[loc].capacity;
    }

    function getLocationHoldings(string memory loc) public view returns (uint256) {
        return locations[loc].holding;
    }

    //check if person has exceeded the token allowed pollution limit this cycle
    function checkPolluterLimit(address pol) public view returns (uint256){
        uint256 polluted;
        polluter memory poLEETer = polluters[pol];

        if(poLEETer.lastRegisteredCycle == cycle) polluted = poLEETer.pollutedThisCycle;
        else polluted = 0;

        return polluted;
    }



    /*
    take out the value from the holding of one location and move to another when a transfer is done

    make
    */
    function transfer(address to, uint256 value) public returns(bool){
        polluter storage receiver = polluters[to];
        polluter storage sender = polluters[msg.sender];
        require(receiver.hasLocation, "Address not registered"); //make sure receiver has location
        require(sender.hasLocation, "You are not registered"); //make sure sender has location
        location storage receiver_loc = locations[receiver.location];
        location storage sender_loc = locations[sender.location];

        if(receiver_loc.id == sender_loc.id){
            _transfer(msg.sender, to, value); //transfer the tokens
            return true;
        }


        require(receiver_loc.holding.add(value) <= receiver_loc.capacity, "Transaction would exceed location capacity"); //make sure cap is not exceeded and revert if it is
        receiver_loc.holding = receiver_loc.holding.add(value); //increase the location holding for receiver
        sender_loc.holding = sender_loc.holding.sub(value); //decrease the sender location holdings
        _transfer(msg.sender, to, value); //transfer the tokens
        return true;
    }

    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        polluter storage receiver = polluters[to];
        polluter storage sender = polluters[msg.sender];
        require(receiver.hasLocation, "Address not registered"); //make sure receiver has location
        require(sender.hasLocation, "You are not registered"); //make sure sender has location
        location storage receiver_loc = locations[receiver.location];
        location storage sender_loc = locations[sender.location];

        if(receiver_loc.id == sender_loc.id){
            return super.transferFrom(from, to, value); //transfer the tokens
        }

        require(receiver_loc.holding.add(value) <= receiver_loc.capacity, "Transaction would exceed location capacity"); //make sure cap is not exceeded and revert if it is
        receiver_loc.holding = receiver_loc.holding.add(value); //increase the location holding for receiver
        sender_loc.holding = sender_loc.holding.sub(value); //decrease the sender location holdings
        return super.transferFrom(from, to, value); //transfer the tokens

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
