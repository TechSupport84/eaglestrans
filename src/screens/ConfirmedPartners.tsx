import React, { useState, useEffect } from 'react';
import { API_URL } from '../constants/API_URL';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';


interface User {
  _id: string;
  username: string;
  email: string;
}

interface Partner {
  _id: string;
  userId: User;
  partnerId: string;
  tokenMoney: string;
  amount: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

const {token} = useAuth()

const ConfirmedPartnersPage: React.FC = () => {
  const [confirmedPartners, setConfirmedPartners] = useState<Partner[]>([]);
  useEffect(() => {
    // Fetch confirmed partners from your API
    const fetchConfirmedPartners = async () => {
      try {
        const response = await axios(`${API_URL}/api/partner/confirmed`,   { 
          headers:{
            Authorization: `Bearer ${token}`
          }
        }); // Replace with your API endpoint
         console.log(response.data.confirmedPartners)
        if (response) {
          setConfirmedPartners(response.data.confirmedPartners);
        } else {
          console.error('Error fetching confirmed partners');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchConfirmedPartners();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-800">Confirmed Partners</h2>
      {confirmedPartners.length > 0 ? (
        <table className="min-w-full mt-4 table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">Partner ID</th>
              <th className="border px-4 py-2">Admin Info</th>
              <th className="border px-4 py-2">Token Money</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Start Date</th>
              <th className="border px-4 py-2">End Date</th>
            </tr>
          </thead>
          <tbody>
            {confirmedPartners.map((partner) => (
              <tr key={partner._id}>
                <td className="border px-4 py-2">{partner.partnerId}</td>
                <td className="border px-4 py-2">{partner.userId.username} ({partner.userId.email})</td>
                <td className="border px-4 py-2">{partner.tokenMoney}</td>
                <td className="border px-4 py-2">{partner.amount}</td>
                <td className="border px-4 py-2">{new Date(partner.startDate).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{new Date(partner.endDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No confirmed partners available.</p>
      )}
    </div>
  );
};

export default ConfirmedPartnersPage;
