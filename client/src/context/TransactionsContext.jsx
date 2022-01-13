import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();
const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer); 
  
    return transactionContract; 
   
}

export const TransactionProvider = ({ children }) => { 
    const [currentAccount, setCurrentAccount] = useState("");
    // set state for form data for welcome.jsx 
  const [formData, setFormData] = useState({
        addressTo: " ", amount: " ", keyword: " ", message: " "
  }); 
    const [isLoading, setIsLoading] = useState(false)
    const [TransactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount")); 
    //react provides previous state using prevState then  the spread operator and object destructuring  via the ({} using the name key setting it via e.target.value) 
    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]:e.target.value}))
            }
        // checks to see if wallet is connected at the start 
    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please Install MetaMask");

            const accounts = await ethereum.request({ method: "eth_accounts" });
            
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                // getAllTransactions
            } else {
                console.log("No Accounts Found")
            }
            
        } catch (error) {
        console.log(error);

        throw new Error("No ethereum object");
        }
    }
// Connects account to metamask 
 const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
        }
    };
    // Sends Transactions for account 
    const sendTransaction = async () => { 
        try {
            if (!ethereum) return alert("Please install MetaMask.");
            //gains access to form variables 
            const { addressTo, amount, keyword, message } = formData; 
            // function call to get ethereum contract saved to transactionContract
            const transactionContract = getEthereumContract(); 
            //parses amount value into hexadecimal GWEI amount 
            const parsedAmount = ethers. utils.parseEther(amount); 
            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: currentAccount, 
                    to: addressTo, 
                    gas: "0x5208", // 21000 gwei
                    value: parsedAmount._hex, 
                    
                    
                }]
            });
            // aysncronus 
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword); 
            setIsLoading(true); 
            console.log(`Loading - ${transactionHash}`); 
            await transactionHash.wait()
             setIsLoading(false); 
             console.log(`Success - ${transactionHash}`); 
            await transactionHash.wait()
            const transactionCount = await transactionContract.getTransactionCount(); 
            setTransactionCount(transactionCount.toNumber()); 

        } catch (error) {
        console.log(error);

        throw new Error("No ethereum object");
        }

    }

        useEffect(() => { 
            checkIfWalletIsConnected(); 
        }, [ ]); 
    // passing sate through transactions.context.provider
    return (
        <TransactionContext.Provider value={{connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction}}>
            { children}
        </TransactionContext.Provider>
    ); 

}