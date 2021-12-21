import BigNumber from 'bignumber.js'
import React, { Fragment, useEffect, useState } from 'react'
import { useEthers } from '@usedapp/core'
import { useWeb3 } from '../useWeb3'
import {
  useApeContract,
  useStakingContract,
  useVariableContract,
} from '../useContracts'
import { mint } from '../callHelper'
import useRefresh from '../useRefresh'
import { getFullDisplayBalance } from '../formatBalance'
import { Center } from '@chakra-ui/react'

const space = <Fragment>&nbsp;&nbsp;</Fragment>;

const AuctionsTwo = () => {
  const web3 = useWeb3()
  const { account } = useEthers()
  const [requestedMint, setRequestedMint] = useState(false)
  const apeContract = useApeContract()

  const [redraw, setRedraw] = useState(false)

  //added for minting NFT
  const [mintNum, setMintNum] = useState<number>(1);

  //

  useEffect(() => {
    if (account) { 
    }
    
  }, [account, mintNum])


  const handleDecreaseNumber = async()=> {
    if (mintNum >= 1){
      var tmp = mintNum - 1;
      setMintNum(tmp);
    }
    
  }


  const handleIncreaseNumber = async()=> {
    if (mintNum < 5){
      var tmp = mintNum + 1;
      setMintNum(tmp);
    }    
  }


  const handleMint = async () => {
    try {
      setRequestedMint(true)
      await mint(apeContract, account, mintNum)
      setRequestedMint(false)
    } catch {
      console.log('Mint failed')
      setRequestedMint(false)
    }
  }


  return (
    <section className="">
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: "wrap" }}>
        {/* **<!-- this is UNSTAKED part of Panel (LEFT)-->** */}
        <div className="pad" >
          <div className="radiuspanel"
            style={{
              height: 500,
              width: '100%',
              backgroundColor: 'rgb(92 92 118 / 47%)',
            }}
          >
            <div style={{marginTop:80}}>
              <h2 className="em-wide" style={{ fontFamily: 'MontserratBold', textAlign: 'center' }}>MINT YOUR NFT'S</h2>
            </div>
            <div className="row justify-content-center">
              <div className="text-center">
                <h5 className="em-wide" style={{ fontSize: 10, marginTop: 20, fontFamily: 'Montserrat' }}>
                  PRESALE MAX = 5  <br />
                  PUBLIC SALE MAX = NONE
                </h5>
              </div>
            </div>
            <div className='row centerpanel' style={{display: 'flex', justifyContent: 'center', flexWrap: "wrap"}}>
              {/* Card Body */}
              <div className='trianglebtnLeft' onClick={handleDecreaseNumber}></div>
              <div className='numpanel perfect-center' style={{
                backgroundColor:'white',
                borderRadius:10,
                padding:10,
                  textAlign:'center',
                  fontFamily:'MontserratBold',
                  fontSize:20,
                  width:50,
                  marginRight:20,
                  marginLeft:20}}>
                {mintNum}
              </div>
              <div className='trianglebtnRight' onClick={handleIncreaseNumber}></div>
            </div>
            <div className="bottomButton" style={{display: 'flex', justifyContent:'center', flexWrap: "wrap", paddingTop:40 }}>
              <button className="btn em-wide" disabled={requestedMint} style={{ fontFamily: 'MontserratBold' }} onClick={handleMint} >
                MINT NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuctionsTwo
