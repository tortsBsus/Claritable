import * as React from "react";
import { ethers } from "ethers";
import './App.css';
import Options from "./Options";
import { useEffect, useState } from "react";
import abi from "./utils/abi.json";

export default function App() {


    let ratio1, ratio2;
    const [allMess, setAllMess] = useState([]);
    const [checkz, setCheckz] = useState(false);
    const [currentAccount, setCurrentAccount] = useState("");
    const contractAddress = "0x7013C014bDec413cD873e97740F58E2Ba821Af70";
    const contractABI = abi.abi;

    //function1
    const checkIfWalletIsConnected = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                console.log("Make sure you have metamask!");
                return;
            } else {
                console.log("We have the ethereum object", ethereum);
            }

            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length !== 0) {
                const account = accounts[0];
                console.log("Found an authorized account:", account);
                setCurrentAccount(account);
                getAllMess();
            } else {
                console.log("No authorized account found")
            }
        } catch (error) {
            console.log("errorzzzzz" + error);
        }
    }

    //function2
    const connectWallet = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log("errorz" + error)
        }
    }


    const getAllMess = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const alienContract = new ethers.Contract(contractAddress, contractABI, signer);

                const messes = await alienContract.getAllMess();

                let messCleaned = [];
                messes.forEach(mess => {
                    messCleaned.push({
                        address: mess.waver,
                        timestamp: new Date(mess.timestamp * 1000),
                        message: mess.message,
                        who: mess.who
                    });
                });

                setAllMess(messCleaned);
            } else {
                console.log("Ethereum object doesn't exist!")
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {//function5
        checkIfWalletIsConnected();
    }, [])

    useEffect(() => {
  let alienContract;

  const onVoteMessage = (from, timestamp, message) => {
    console.log('VoteMessage', from, timestamp, message);
    setAllMess(prevState => [
      ...prevState,
      {
        address: from,
        timestamp: new Date(timestamp * 1000),
        message: message,
      },
    ]);
  };

  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    alienContract = new ethers.Contract(contractAddress, contractABI, signer);
    alienContract.on('VoteMessage', onVoteMessage);
  }

  return () => {
    if (alienContract) {
      alienContract.off('VoteMessage', onVoteMessage);
    }
  };
}, []);


    //function 3
    const wave = async (choice, messagezz) => {
        console.log(messagezz)
        try {
            const { ethereum } = window;

            if (ethereum) {

                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const alienContract = new ethers.Contract(contractAddress, contractABI, signer);



                if (choice) {
                    //alienface voted     
                    try {
                        const faceTxn = await alienContract.faceInc(messagezz,{ gasLimit: 300000 });

                        console.log("Mining...", faceTxn.hash);

                        await faceTxn.wait();
                        console.log("Mined and vote cast for alien face! ", faceTxn.hash);
                        getAllMess();
                    }
                    catch (error) {
                        alert("Wait 2 mins between votes! Refresh page and try again!");
                        return;
                    }


                }
                else {
                    //alienship voted
                    try {

                        const shipTxn = await alienContract.shipInc(messagezz,{ gasLimit: 300000 });

                        console.log("Mining...", shipTxn.hash);

                        await shipTxn.wait();
                        console.log("Mined and vote cast for alien ship!", shipTxn.hash);
                        getAllMess();

                    }
                    catch (error) {
                        alert("Wait 2 mins between votes! Refresh page and try again!");
                        return;
                    }
                }


                let count = await alienContract.getTotalWaves();
                ratio1 = count.toNumber();
                console.log("Retrieved total wave count...", count.toNumber());
                count = await alienContract.getFaceCount();
                ratio1 = count.toNumber() / ratio1;
                ratio1 = ratio1.toPrecision(2);
                ratio2 = 1 - ratio1;
                ratio2 = ratio2.toPrecision(2);
                progressBar(ratio1, ratio2);

                console.log("Bonus checking?")
                if (ratio1 > ratio2) {
                  console.log("Enters1")
                    if (choice) {
                        console.log("Eligible for bonus!");
                        count = await alienContract.bonus();
                        await count.wait();
                                }
                }
                else {
                  console.log("Enters2")
                    if (!choice) {
                        console.log("Eligible for bonus!");
                        count = await alienContract.bonus();
                        await count.wait();
                        
                    }
                }


            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log("the error? " + error)
        }
    }

    //function4
    const progressBar = async (faces, ships) => {

        
        document.getElementById("F1").style.width = (faces * 20) + "rem";
        document.getElementById("S1").style.width = (ships * 20) + "rem";
        if (faces > ships) {
            document.getElementById("F1").style.opacity = 0.7;
        }
        else
            document.getElementById("S1").style.opacity = 0.7;

        setCheckz(true);
        


    }



    //return statement
    return (

        <div className="mainContainer">
            <div className="dataContainer">
                <div className="header">
                    Welcome Earthlings!
                </div>

                <Options wave={wave} allMess={allMess} checked={checkz} />

                {!currentAccount && (
                    <button className="waveButton" onClick={connectWallet}>
                        Connect Wallet
                    </button>
                )}

            </div>
        </div>

    );

}
