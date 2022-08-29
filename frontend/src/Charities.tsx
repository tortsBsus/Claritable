import { FunctionComponent } from "react";
import { Button } from "react-bootstrap";
import ReactDOM from "react-dom";
import styles from "./css/Charities.module.css";
import { useState } from "react";
import abi from "./utils/abi.json";
import {  ethers } from "ethers";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
//import { useLocation } from "react-router-dom";
declare let window: any;

export const Charities: FunctionComponent = () => {
  const [num, setNum] = useState("0");
  const [num1, setNum1] = useState("0");
  const [reason, setReason] = useState(" Enter your reason ");
  const [num2, setNum2] = useState("0"); //number

  // const navigate = useNavigate();
  const contractAddress = "0x15569B762A696C7a6C6073193871Ef09b6A58fF8";
  const EducationAddress = "0x632746282E9387134F113cE217e39C844acdaCA4";
  const UkraineAddress = "0xedECC2e46f822c10e6c53996DEEfa8FC70F0a1de";
  const GirlChildAddress = "0x150A7908abF2738fA5162e1DF032dA041a2481ca";
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




  //donate money button
  const donate = async (num: string, choice: number) => {

    console.log("entered donate function");
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
                switch(choice)
                {
                  case 1:// Transaction to donate money to Education Charity
                          console.log("Donating to Education");
                          const EducationTxn = await ClaritableContract.donateEducation({value: ethers.utils.parseEther(num)})
                          console.log("Mining", EducationTxn.hash);
                          await EducationTxn.wait();
                          console.log("Mined and paid! ", EducationTxn.hash);break;
                  case 2:// Transaction to donate money to GirlChild Charity
                          console.log("Donating to Girl Child");
                          const GirlChildTxn = await ClaritableContract.donateGirlChild({value: ethers.utils.parseEther(num)})
                          console.log("Mining", GirlChildTxn.hash);
                          await GirlChildTxn.wait();
                          console.log("Mined and paid! ", GirlChildTxn.hash);break;
                  case 3:// Transaction to donate money to Ukraine Charity
                          console.log("Donating to Ukraine");
                          const UkraineTxn = await ClaritableContract.donateUkraine({value: ethers.utils.parseEther(num)})
                          console.log("Mining", UkraineTxn.hash);
                          await UkraineTxn.wait();
                          console.log("Mined and paid! ", UkraineTxn.hash);break;
                }

                

                // console.log("Lets verify!");
                // const Txn2 = await ClaritableContract.getNumberOfAvailableDonorsEducation();                
                // console.log("\nNmber of Available Donors for Education Charity is =  " + (Txn2));
                // const Txn3 = await ClaritableContract.getAvailableDonorsEducation(0);
                // console.log("\nAvailable Donor 0 for Education Charity is =  " + (Txn3));
                // const Txn4 = BigNumber.from(await ClaritableContract.getTotalDonationsEducation());
                // console.log("\nAvailable Donations for Education Charity is =  " + (Txn4.toNumber()));
                // const Txn5 = await ClaritableContract.getEducationDonors(Txn3);
                // console.log("\nDonor " + Txn3 +" has donated  =  " + (Txn5));
                           
                
                
               
          
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

  };

   //donate money button
   const withdraw = async (num: string, reason: string) => {

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
                             

                console.log("Lets withdraw!");
                const Txn2 = await ClaritableContract.spendEducation(reason, ethers.utils.parseEther(num),{ gasLimit: 300000 });                
                console.log("\n Transaction hash is " + (Txn2.hash));

                // console.log("Lets check Transparency!");
                // const Txn2 = await ClaritableContract.getEducationSpendRequestReason((ethers.utils.getAddress('0xdadae8a1a200fd9d6797e6b0b96ee35f40ad5ed5')),1);                                
                // console.log("\nTransparency for education donor is \n " + (Txn2));
                
               
          
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

  };







  //runs only on the first render
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);




  return (
    <div className={styles.charitiesDiv}>

      <div className={styles.frameDiv}>
        <div className={styles.cLARITABLEDiv}>
          <span className={styles.cLARITABLSpan}>CLARITABL</span>
          <span className={styles.eSpan}>E</span>
        </div>
      </div>


      {
        // show only this button if wallet is connected
        ( currentAccount ) && (
          <div className ={styles.testing}>

            <div style= {{
                position: "absolute",
                  top:"215px"
          }} className={styles.cARD1Div}>
              <div className={styles.frameDiv1}>
                <div className={styles.rectangleDiv}>
                  <input className={styles.input}
                    type="number"
                    min="1"
                    value={num}
                    onChange={(e) => setNum(e.target.value)}
                  />
                  <div>You are willing to donate :{num} Ether</div>
                </div>

                <Button className={styles.rAISENOWDiv} onClick={() => {donate(num, 1);}}>DONATE NOW!</Button>

                <div className={styles.rectangleDiv1} />
              </div>
              <div className={styles.eDUCATIONDiv}>EDUCATION</div>
            </div>

            <div className={styles.cARD2Div}>
              <div className={styles.frameDiv2}>
                <div className={styles.frameDiv3}>
                  <div className={styles.rectangleDiv1} />
                  <div className={styles.rectangleDiv}>
                    <input className={styles.input}
                      type="number"
                      min="1"
                      value={num1}
                      onChange={(e) => setNum1(e.target.value)}
                    />
                    
                    <div>You are withdrawing :{num1} Ether </div>
                  </div>
                  <Button className={styles.rAISENOWDiv} onClick={() => { donate(num1,2); }}>DONATE NOW!</Button>
                </div>
                <div className={styles.gIRLCHILDEMPOWERMENT}>
                  GIRL CHILD EMPOWERMENT
                </div>
              </div>
            </div>

            <div className={styles.UcARD3Div}>
              <div className={styles.UframeDiv2}>
                <div className={styles.UframeDiv3}>
                  <div className={styles.UrectangleDiv}>
                    <input style={{
                                        position: "absolute",
                                          top:"90px",
                                          right: "60px"
                                  }}
                                  className={styles.input}
                                              type="number"
                                              min="1"
                                              value={num2}
                                              onChange={(e) => setNum2(e.target.value)}
                    />
                    <input style= {{
                                          position: "absolute",
                                            top:"60px",
                                            right: "60px"
                                    }}
                                    className={styles.input}
                                                type="text"
                                                min="1"
                                                value={reason}
                                                onChange={(e) => setReason(e.target.value)}
                    />
                    <div style= {{
                                        position: "absolute",
                                          top:"10px"
                                  }}>You are willing to donate :{num2} Ether because {reason}</div>
                  </div>
                  <Button className={styles.rAISENOWDiv} onClick={() => { withdraw(num2,reason); }}>WITHDRAW NOW!</Button>
                  <div className={styles.UrectangleDiv1} />
                </div>
                <div className={styles.sENDHELPTOUKRAINE}>WITHDRAW MONEY FOR EDUCATION CHARITY</div>
              </div>
            </div>

          </div>

        )}

      {// show only this button if wallet not connected
        !currentAccount && (
        <div className ={styles.testing}>
          <Button className={styles.dONATENOWDiv} onClick={() => { connectWallet(); }}>
            Connect Wallet plz
          </Button>
        </div>
        )}

        
    </div>
  );
};
const rootElement = document.getElementById("root");
ReactDOM.render(<Charities />, rootElement);
