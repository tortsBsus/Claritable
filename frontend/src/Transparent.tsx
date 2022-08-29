import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/Transparent.module.css";
import abi from "./utils/abi.json";
import {  ethers } from "ethers";
import { useState } from "react";
import { useEffect } from "react";
declare let window: any;

export const Transparent: FunctionComponent = () => {
  const navigate = useNavigate();
  const [amt, setAmt] = useState("");
  const [tamt, setTamt] = useState("");
  const [reason, setReason] = useState("");
  const contractAddress = "0x15569B762A696C7a6C6073193871Ef09b6A58fF8";
  const contractABI = abi.abi;

  const [currentAccount, setCurrentAccount] = useState("");


  //checks if a wallet is connected to the application => the window ethereum object is present
  const checkIfWalletIsConnected = async () => {

    console.log("Before connecting, currentAccount =" + currentAccount);
    let account;
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
        
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log("errorzzzzz" + error);
    }

  };


  //function to connect wallet to application
  const connectWallet = async () => {
    let account;
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      let address = accounts[0];
      setCurrentAccount(address);
      
    } catch (error) {
      console.log("errorz" + error);
    }
    console.log("currentaccount =" + currentAccount);

  };


  const onHOMETextClick = useCallback(() => {
    navigate("/desktop-2");
  }, [navigate]);

  const onCHARITYTextClick = useCallback(() => {
    navigate("/charities");
  }, [navigate]);


  // const getAllRequests = async () => {
  //   let Requests = [];
  //  try 
  //   {
  //         const { ethereum } = window;

  //         if (ethereum) 
  //         {
  //             //connecting to the contract
  //             const provider = new ethers.providers.Web3Provider(ethereum);
  //             const signer = provider.getSigner();
  //             const ClaritableContract = new ethers.Contract(
  //                                                         contractAddress,
  //                                                         contractABI,
  //                                                         signer
  //                                                       );

  //             try 
  //             {
  //               const reqNum = await ClaritableContract.getNumberOfGirlChildSpendRequest((ethers.utils.getAddress(currentAccount)));
  //               let counter =0;
  //               let reason:string;
  //               let amount:number;
  //               while(counter<reqNum)
  //               {
  //                 reason = await ClaritableContract.getGirlChildSpendRequestReason((ethers.utils.getAddress(currentAccount)),counter);
  //                 amount = await ClaritableContract.getEducationSpendRequestReason((ethers.utils.getAddress(currentAccount)),counter);
  //                 Requests[counter]= {reason, amount};
  //               }
                
  //             }
  //             catch(error) 
  //             {
  //               alert("Wallet Closed"+ error);
  //               return;
              
  //             }
              
  //         } 
  //         else 
  //         {
  //            console.log("Get Metamask wallet for your browser");
  //         }
  //   } 
  //   catch (error) 
  //   {
  //     alert("Something went wrong");
  //   }

    
  //   return Requests;
  // }



  // let allRequests = getAllRequests();
  // return(<div>
  //                 {
  //                 allRequests.map((reason:string, amount:number) => {return(
  //                                               <>
  //                                               <div className="dataContainer">
  //                                               <h3 style ={{margin:"2px"}}>Reason used: {reason}</h3>
  //                                                 <div>Amount spent: {amount}</div>
  //                                               </div>
  //                                               </>
  //                 )})
  //                 }
                                        
                  
   
  //       </div>);

  const verify = async () => {

    connectWallet();
    console.log("entered withdraw function");
    try 
    {
          const { ethereum } = window;

          if (ethereum) 
          {
              //connecting to the contract
              const provider = new ethers.providers.Web3Provider(ethereum);
              const signer = provider.getSigner();
              const ClaritableContract = new ethers.Contract(
                                                          contractAddress,
                                                          contractABI,
                                                          signer
                                                        );

              try 
              {
                             

                console.log("Lets check Transparency!");
                const tamtU =  await ClaritableContract.getEducationDonors((ethers.utils.getAddress(currentAccount)));
                const latest = await ClaritableContract.getNumberOfEducationSpendRequest((ethers.utils.getAddress(currentAccount)));
                console.log("Lets check Transparency1!"+latest);
                setTamt(tamt+" ");
                const reasonU = await ClaritableContract.getEducationSpendRequestReason((ethers.utils.getAddress(currentAccount)),(latest-1));  
                setReason(reasonU);                              
                console.log("\nTransparency for education donor is \n " + (reason));
                const amtU = await ClaritableContract.getEducationSpendRequestAmountSpent((ethers.utils.getAddress(currentAccount)),(latest-1));     
                setAmt(amtU+" ");                           
                console.log("\nTransparency for education donor is \n " + (amt));
                
               
          
              }
              catch(error) 
              {
                alert("Wallet Closed"+ error);
                return;
              
              }


          } 
          else 
          {
             console.log("Get Metamask wallet for your browser");
          }
    } 
    catch (error) 
    {
      alert("Something went wrong");
    }


  }

 //runs only on the first render
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);


  return (
    <div className={styles.transparentDiv}>
      <div className={styles.frameDiv}>
        
        <div className={styles.cLARITABLEDiv}>
          <span className={styles.cLARITABLSpan}>CLARITABL</span>
          <span className={styles.eSpan}>E</span>
        </div>
        <div className={styles.hOMEDiv} onClick={onHOMETextClick}>
          <span className={styles.hOMESpan}>HOME</span>
          <span className={styles.cLARITABLSpan}>{` `}</span>
        </div>
        <div className={styles.cHARITYDiv} onClick={onCHARITYTextClick}>
          CHARITY
        </div>
        <div className={styles.tRACKDiv}>TRACK</div>
        
      </div>
      <div className={styles.trackdiv}>
      <div className={styles.displayDiv}>
      <h1>Education</h1>
      <div id = "LeftOverAmount" >Donated amount left over - {tamt+" "}</div>
      <div id ="LatestReason"> Last used for : {reason +" "}</div>
      <div id ="LatestAmount"> Amt used for reason: {amt +" "} </div>
      <button  className={styles.rAISENOWDiv} onClick={() => { verify(); }}>Check some uses of your donatiions!</button>
      </div>
      </div>
      
    </div>
  );

};
