import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import {SiEthereum} from "react-icons/si";
import {BsInfoCircle} from "react-icons/bs";
import { Loader } from "./";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-bold text-#0A0D1C ;";


const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);
// Accepting state from transactions.context 
const Welcome = () => { 
    const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading } = useContext(TransactionContext);
  console.log(connectWallet);

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData; 
    //prevents page from reloading 
    e.preventDefault();
    if (!addressTo || !amount || !keyword || !message) return; 
    //function call to send Transactions 
    sendTransaction(); 
  }; 

  return (
    <div className="flex w-full justify-center">
      <div className="flex md:flex-row flex-col items-start justify-between  md:p-20 py-12 px-4 ">
        <div className="flex flex-1 justify-start flex-col md:mr-10">
          <h1 className="text-3xl sm:text-5xl text-blue text-gradient py-1 font-bold">
            {" "}
            Send Your Crypto
            <br /> Anywhere across the World{" "}
          </h1>
          <p className="text-left mt-5 text-#0A0D1C; font-bold md: w-9/12 w-11/12 text-base">
            Your Money Endless Possibility. Buy and Sell Cryptocurrencies on
            QuicKoin.
          </p>

          {!currentAccount && <button
            type="button"
            onClick={connectWallet}
            className=" flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
            <p className="text-white text-base font-bold ">
              Connect Wallet
            </p>
          </button>}

            <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
              Reliability
            </div>
            <div className={companyCommonStyles}>Security</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
              Ethereum
            </div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
              Web 3.0
            </div>
            <div className={companyCommonStyles}>Low Fees</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
              Blockchain
            </div>
          </div>
        </div>

         <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between flex-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="white" />
                </div>
                <BsInfoCircle fontSize={21} color="white"/>
              </div>
              <div>
                <p className="text-#0A0D1C; font-light text-xs ">
                  { shortenAddress( currentAccount)}
                </p>
                 <p className="text-#0A0D1C; font-bold text-lg mt-1 ">
                Wallet Address
                </p>
              </div>
            </div>
          </div>
           <div className="text-white  p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
            <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
            <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
            <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />
            
            <div className="h-[1-px] w-full bg-gray-400 my-2" />
           {isLoading
              ?( <Loader />
             ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                   className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] bg-[#2952e3] rounded-full cursor-pointer"
                >Send Now </button>
              )}
          </div>

        </div>
      </div>
    </div>
  );
};
export default Welcome;
