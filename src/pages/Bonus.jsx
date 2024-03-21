import React from 'react';
import './bonus.css';

export const Bonus = () => {

    const bonusesData = [
        { date: '2024-02-14', description: 'Product purchase', points: 100 },
        { date: '2024-02-15', description: 'Referral bonus', points: 50 },
        { date: '2024-02-16', description: 'Promotional offer', points: 200 },
        { date: '2024-02-17', description: 'Social media share', points: 20 },
        { date: '2024-02-18', description: 'Product purchase', points: 100 },
        { date: '2024-02-19', description: 'Referral bonus', points: 50 },
        { date: '2024-02-20', description: 'Promotional offer', points: 200 },
        { date: '2024-02-21', description: 'Social media share', points: 20 },
        { date: '2024-02-22', description: 'Product purchase', points: 100 },
        { date: '2024-02-23', description: 'Referral bonus', points: 50 },
        { date: '2024-02-24', description: 'Promotional offer', points: 200 },
        { date: '2024-02-25', description: 'Social media share', points: 20 },
        { date: '2024-02-26', description: 'Product purchase', points: 100 },
        { date: '2024-02-27', description: 'Referral bonus', points: 50 },
        { date: '2024-02-28', description: 'Promotional offer', points: 200 },
        { date: '2024-02-29', description: 'Social media share', points: 20 },
        { date: '2024-03-01', description: 'Product purchase', points: 100 },
        { date: '2024-03-02', description: 'Referral bonus', points: 50 },
        { date: '2024-03-03', description: 'Promotional offer', points: 200 },
        { date: '2024-03-04', description: 'Social media share', points: 20 },
      ];
      

  const totalPoints = bonusesData.reduce((acc, bonus) => acc + bonus.points, 0);

  const purchaseWithPoints = () => {
    console.log("Purchase with points option clicked");
  };

  return (
    <div className="bonuses-container">
        <h2>Bonus wallet</h2>
        <div className="point-secton">
            <h3 className="total-points">Total Points: {totalPoints}</h3>
            <button className="purchase-button" onClick={purchaseWithPoints}>Purchase with Points</button>
        </div>
      <div className="bonus-list">
        {bonusesData.map((bonus, index) => (
          <div key={index} className="bonus-item">
            <span>{bonus.date}</span>
            <span>{bonus.description}</span>
            <span>+{bonus.points} points</span>
          </div>
        ))}
      </div>
    </div>
  );
};
