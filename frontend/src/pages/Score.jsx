import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ScoreScreen = () => {
  const { user } = useContext(AuthContext); // Load user data from context
  const [money, setMoney] = useState(0);
  const [rank, setRank] = useState(1);
  const [inventory, setInventory] = useState([]);
  const [missions, setMissions] = useState(0);
  const [bossItems, setBossItems] = useState([]);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/users/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setMoney(data.userData.money);
          setRank(data.userData.rank || 1);
          setInventory(data.userData.inventory || []);
          setBossItems(data.userData.bossItems || []); // Separate boss items
          setMissions(data.userData.missionsCompleted || 0);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-6 text-yellow-500">Your Score</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Money & Rank */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Money & Rank</h2>
          <div className="flex items-center justify-between mb-4">
            <p className="text-lg">💰 Money:</p>
            <p className="text-2xl font-bold">${money}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg">🔰 Rank:</p>
            <p className="text-2xl font-bold">Rank {rank}</p>
          </div>
        </div>

        {/* Weapons Inventory Section */}
        <div className="bg-gradient-to-br from-green-600 to-green-800 text-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Weapons Inventory</h2>
          <ul className="space-y-2">
            {inventory.length > 0 ? (
              inventory
                .filter((item) => item.type === 'weapon') // Separate weapons
                .map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>🎯 {item.accuracy}%</span>
                  </li>
                ))
            ) : (
              <li>No weapons in your inventory.</li>
            )}
          </ul>
        </div>

        {/* Boss Items Section */}
        <div className="bg-gradient-to-br from-red-600 to-red-800 text-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Boss Items</h2>
          <ul className="space-y-2">
            {bossItems.length > 0 ? (
              bossItems.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  {/* No accuracy for boss items */}
                </li>
              ))
            ) : (
              <li>No boss items collected.</li>
            )}
          </ul>
        </div>

        {/* Missions Completed */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Missions Completed</h2>
          <p className="text-2xl font-bold text-center">{missions}</p>
          <p className="text-center">Assassinations, heists, and more!</p>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="mt-8 bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-yellow-600 rounded-lg p-4 text-center shadow-md">
            <p>🎖 10 Successful Heists</p>
          </div>
          <div className="bg-yellow-600 rounded-lg p-4 text-center shadow-md">
            <p>🎖 1 Million in Cash</p>
          </div>
          <div className="bg-yellow-600 rounded-lg p-4 text-center shadow-md">
            <p>🎖 Completed all Boss Fights</p>
          </div>
          <div className="bg-yellow-600 rounded-lg p-4 text-center shadow-md">
            <p>🎖 Escape from Maximum Security</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreScreen;
