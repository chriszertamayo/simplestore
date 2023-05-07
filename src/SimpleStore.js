import React, { useState } from 'react'
import { ethers, BrowserProvider, parseUnits } from 'ethers'
import SimpleStorage from './abis/SimpleStorage.json'

function SimpleStore() {
    const contractAddress = SimpleStorage.networks['10'].address;

    const [errorMessage, setErrorMessage] = useState(null)
    const [defaultAccount, setDefaultAccount] = useState(null)
    const [connButtonText, setConnButtonText] = useState('Connect Wallet')

    const [currentContractVal, setCurrentContractVal] = useState(null)

    const [provider, setProvider] = useState(null)
    const [signer, setSigner] = useState(null)
    const [contract, setContract] = useState(null)

    const connectWalletHandler = async () => {
        // if (window.ethereum) {
        //     const result = await window.ethereum.request({ method: 'eth_requestAccounts' })
        //     accountChangedHandler(result[0])
        //     setConnButtonText('Wallet Connected')
        // } else {
        //     setErrorMessage('Need to install Metamask')
        // }

        if (new ethers.providers.JsonRpcProvider('http://localhost:22000')) {
            const getProvider = new ethers.providers.JsonRpcProvider('http://localhost:22000')
            const accounts = getProvider.listAccounts()
            console.log(await accounts)
            accountChangedHandler(await accounts)
            setConnButtonText('Wallet Connected')
        } else {
            setErrorMessage('Need to install Metamask')
        }
    }

    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        updateEthers()
    }

    const updateEthers = async () => {
        let tempProvider = new ethers.providers.JsonRpcProvider('http://localhost:22000')
        setProvider(tempProvider)

        let tempSigner = await tempProvider.getSigner()
        setSigner(tempSigner)

        let tempContract = new ethers.Contract(contractAddress, SimpleStorage.abi, tempSigner)
        setContract(tempContract)

    }

    const setHandler = async (event) => {
        event.preventDefault()
        await contract.set(event.target.setText.value)
    }

    const getCurrentVal = async () => {
        let val = await contract.get()
        setCurrentContractVal(val)
    }


    return (
        <div>
            <h3>{"Get/Set Interaction with contract!"}</h3>
            <button onClick={connectWalletHandler}> {connButtonText} </button>
            <h3>Address: {defaultAccount}</h3>

            <form onSubmit={setHandler}>
                <input id='setText' type='text' />
                <button type={"submit"}>Update Contract</button>
            </form>

            <button onClick={getCurrentVal}> Get Current Value</button>
            {currentContractVal}
            {errorMessage}
        </div>
    )
}

export default SimpleStore
