import { FunctionComponent } from "react";
import { Button } from "react-bootstrap";
import ReactDOM from "react-dom";
import styles from "./css/Charities.module.css";
import { useState } from "react";
import abi from "./utils/abi.json";
import { ethers } from "ethers";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
//import { useLocation } from "react-router-dom";
declare let window: any;

export const Charities: FunctionComponent = () => {
  const [num, setNum] = useState("");
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState(""); //number

  //const navigate = useNavigate();
  const contractAddress = "0x7013C014bDec413cD873e97740F58E2Ba821Af70";
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
  const donate = async () => {

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
                //Transaction to donate money to contract
                const Txn = await ClaritableContract.faceInc("message", { gasLimit: 300000 });
                console.log("Mining...", Txn.hash);
                await Txn.wait();
                console.log("Mined and paid! ", Txn.hash);
                // navigate("/transparent");

              }
              catch(error) 
              {
                alert("Wallet Closed");
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
        currentAccount && (
          <div className ={styles.testing}>

            <div className={styles.cARD1Div}>
              <div className={styles.frameDiv1}>
                <div className={styles.rectangleDiv}>
                  <input className={styles.input}
                    type="number"
                    min="1"
                    value={num}
                    onChange={(e) => setNum(e.target.value)}
                  />
                  <div>You are willing to donate :{num}</div>
                </div>

                <Button className={styles.rAISENOWDiv} onClick={() => {donate();}}>DONATE NOW</Button>

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
                    <div>You are willing to donate :{num1}</div>
                  </div>
                  <Button className={styles.rAISENOWDiv} onClick={() => { donate(); }}>DONATE NOW</Button>
                </div>
                <div className={styles.gIRLCHILDEMPOWERMENT}>
                  GIRL CHILD EMPOWERMENT
                </div>
              </div>
            </div>

            <div className={styles.cARD3Div}>
              <div className={styles.frameDiv2}>
                <div className={styles.frameDiv3}>
                  <div className={styles.rectangleDiv}>
                    <input className={styles.input}
                      type="number"
                      min="1"
                      value={num2}
                      onChange={(e) => setNum2(e.target.value)}
                    />
                    <div>You are willing to donate :{num2}</div>
                  </div>
                  <Button className={styles.rAISENOWDiv} onClick={() => { donate(); }}>DONATE NOW</Button>
                  <div className={styles.rectangleDiv1} />
                </div>
                <div className={styles.sENDHELPTOUKRAINE}>SEND HELP TO UKRAINE</div>
              </div>
            </div>

          </div>

        )}

      {// show only this button if wallet not connected
        !currentAccount && (
        <div className ={styles.testing}>
          <Button className={styles.connectNowButton} onClick={() => { connectWallet(); }}>
            Connect Wallet plz
          </Button>
        </div>
        )}

    </div>
  );
};
const rootElement = document.getElementById("root");
ReactDOM.render(<Charities />, rootElement);
