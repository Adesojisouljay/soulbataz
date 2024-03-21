import React, { useState, useEffect } from 'react';
import './mine.css';

const MiningComponent = () => {
  const [depositAmount, setDepositAmount] = useState(0);
  const [totalUSDT, setTotalUSDT] = useState(0);
  const miningRatePerMillisecond = 0.001;
  const [miningStarted, setMiningStarted] = useState(false);

  const handleDepositChange = (e) => {
    setDepositAmount(e.target.value);
  };

  const mineUSDT = () => {
    const interval = setInterval(() => {
      setTotalUSDT(prevTotalUSDT => prevTotalUSDT + miningRatePerMillisecond);
    }, 1); 

    return interval;
  };

  const handleStartMining = () => {
    if (!miningStarted) {
      setMiningStarted(true);
      const intervalId = mineUSDT();
      return () => clearInterval(intervalId);
    }
  };

  const convertToTimeUnit = (milliseconds) => {
    const timeUnits = [
      { label: 'milliseconds', value: milliseconds },
      { label: 'seconds', value: milliseconds / 1000 },
      { label: 'minutes', value: milliseconds / (1000 * 60) },
      { label: 'hours', value: milliseconds / (1000 * 60 * 60) },
      { label: 'days', value: milliseconds / (1000 * 60 * 60 * 24) },
      { label: 'weeks', value: milliseconds / (1000 * 60 * 60 * 24 * 7) },
      { label: 'months', value: milliseconds / (1000 * 60 * 60 * 24 * 30) }
    ];

    return timeUnits.map(unit => (
      <p key={unit.label}>
        {unit.label}: {unit.value.toFixed(2)} USDT
      </p>
    ));
  };

  return (
    <div className="mining-container">
      <h2 className="mining-title">Mining USDT</h2>
      <div className="input-container">
        <label htmlFor="depositAmount">Deposit USDT amount:</label>
        <input
          type="number"
          id="depositAmount"
          value={depositAmount}
          onChange={handleDepositChange}
        />
      </div>
      <button
        className="start-mining-button"
        onClick={handleStartMining}
        disabled={miningStarted}
      >
        {miningStarted ? 'Mining Started' : 'Start Mining'}
      </button>
      {miningStarted && (
        <div className="mining-stats">
          <p>Total USDT mined: {totalUSDT.toFixed(2)}</p>
          <p>Mining rate per:</p>
          {convertToTimeUnit(1)}
        </div>
      )}
    </div>
  );
};

export default MiningComponent;
