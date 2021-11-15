const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const alienContractFactory = await hre.ethers.getContractFactory('AlienPoll');
    const alienContract = await alienContractFactory.deploy({
      value: hre.ethers.utils.parseEther('0.1'),
    });
    await alienContract.deployed();
  
    console.log('Contract deployed to:', alienContract.address);
    console.log('Contract deployed by:', owner.address);
  
     

    let Count;
    let faceTxn = await alienContract.faceInc("Cuz narcissism");
    await faceTxn.wait(); 
    Count = await alienContract.getFaceCount();  
    faceTxn = await alienContract.connect(randomPerson).faceInc("Narcissism 2");
    await faceTxn.wait();
    console.log('Random Person is:', randomPerson.address);
    Count = await alienContract.getFaceCount();
    Count = await alienContract.getAllMess();
    console.log(Count);

    
    let shipTxn = await alienContract.shipInc("Cuz Home");
    await shipTxn.wait();  
    
    shipTxn = await alienContract.connect(randomPerson).shipInc("Homebody vibes");
    await shipTxn.wait();
    console.log('Random Person is:', randomPerson.address);
    Count = await alienContract.getAllMess();
    console.log(Count);

    let contractBalance = await hre.ethers.provider.getBalance(
      alienContract.address
    );
    console.log(
      'Contract balance:',
      hre.ethers.utils.formatEther(contractBalance)
    );

    console.log("bonus #1");
    let Txnn = await alienContract.bonus();
    await Txnn.wait();

    console.log("bonus #2");
    Txnn = await alienContract.bonus();
    await Txnn.wait();

    console.log("bonus #3");
    Txnn = await alienContract.bonus();
    await Txnn.wait();

    console.log("bonus #4");
    Txnn = await alienContract.bonus();
    await Txnn.wait();

    
    console.log("bonus #5");
     Txnn = await alienContract.bonus();
    await Txnn.wait();

    console.log("bonus #6");
    Txnn = await alienContract.bonus();
    await Txnn.wait();

    console.log("bonus #7");
    Txnn = await alienContract.bonus();
    await Txnn.wait();

    console.log("bonus #8");
    Txnn = await alienContract.bonus();
    await Txnn.wait();



    contractBalance = await hre.ethers.provider.getBalance(alienContract.address);
    console.log(
      'Contract balance:',
      hre.ethers.utils.formatEther(contractBalance)
    );

  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();