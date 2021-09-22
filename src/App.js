import React from 'react';
import ccxt from 'ccxt';
import axios from 'axios';
import './App.css';

function App() {
  async function getDataWithCcxt() {
    try {
      const exchange = new ccxt.bybit({
        apiKey: process.env.REACT_APP_BYBIT_API_KEY,
        secret: process.env.REACT_APP_BYBIT_API_SECRET,
        verbose: false,
        enableRateLimit: true,
        symbols: true,
      });

      // blijft undefined
      console.log(exchange.walletAddress);

      // checkt alles wat ondersteund wordt for deze entiteit
      console.log(exchange.has);

      // Werkt!
      const balance = await exchange.fetchBalance();
      console.log(balance);

      const withdrawals = await exchange.fetchWithdrawals();
      console.log(withdrawals);

      // niet supported:
      // let address = await exchange.fetchDepositAddress();
    } catch (e) {
      console.log(e);
    }
  }

  async function getDataWithByBitAccount() {
    try {
      const result = await axios.get('https://api.bybit.com/v2/private/wallet/balance', {
        'api_key': process.env.REACT_APP_BYBIT_API_KEY,
        'api_secret': process.env.REACT_APP_BYBIT_API_SECRET,
        // coin: 'BTC', <----- alle optionele parameters komen hierbij
      });
      console.log(result.data);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <button type="button" onClick={getDataWithCcxt}>Get Data with CCXT</button>
      <button type="button" onClick={getDataWithByBitAccount}>Get Data with ByBit</button>
    </>
  );
}

export default App;
