import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { API_URL } from "../constants/API_URL";
import { toast, ToastContainer } from "react-toastify";

interface User {
  _id: string;
  username: string;
  email: string;
}

interface PartnerToConfirm {
  userId: User;
  partnerID: string;
  carName: string;
  plaqueNumber: number;
  tel: number;
  city: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

const InvalidConfirmedPartner: React.FC = () => {
  const [toConfirmPartners, setToConfirmPartner] = useState<PartnerToConfirm[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<PartnerToConfirm | null>(null);
  const [partnerId, setPartnerId] = useState<string | number>("");
  const [tokenMoney, setTokenMoney] = useState<string | number>("");
  const [amount, setAmount] = useState<number>(8000);
  const { user } = useAuth();

  // Function to confirm a partner
  const handleConfirmPartner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerId || !tokenMoney) {
      alert("Please provide all required fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/partner/confirm`,
        { partnerId, tokenMoney, amount },
        {
          headers: {
            Authorization: `Bearer ${user}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        // Update state to remove the confirmed partner
        setToConfirmPartner((prevPartners) =>
          prevPartners.filter((partner) => partner.partnerID !== partnerId)
        );
        toast.success("Partner confirmed successfully!")
        setIsModalOpen(false); // Close the modal after confirmation
      } else {
        alert("Error confirming partner.");
      }
    } catch (error) {
      console.error("Error confirming partner:", error);
      alert("Error confirming partner.");
    }
  };

  const openModal = (partner: PartnerToConfirm) => {
    setSelectedPartner(partner);
    setPartnerId(partner.partnerID);
    setTokenMoney(""); // Clear tokenMoney on modal open
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPartner(null);
  };

  useEffect(() => {
    const toConfirm = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/partner/unconfirmed-partner`, {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        });
        console.log(response.data.partners);
        setToConfirmPartner(response.data.partners);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    toConfirm();
  }, [user, toConfirmPartners]);

  return (
    <main className="p-6">
      <h2 className="text-xl font-semibold text-gray-800">Partners to Confirm</h2>
      {toConfirmPartners.length > 0 ? (
        <table className="min-w-full mt-4 table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">Partner ID</th>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Car Name</th>
              <th className="border px-4 py-2">Plaque Number</th>
              <th className="border px-4 py-2">Phone Number</th>
              <th className="border px-4 py-2">City</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Created At</th>
              <th className="border px-4 py-2">Updated At</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {toConfirmPartners.map((partner) => (
              <tr key={partner.partnerID}>
                <td className="border px-4 py-2">{partner.partnerID}</td>
                <td className="border px-4 py-2">{partner.userId.username}</td>
                <td className="border px-4 py-2">{partner.carName}</td>
                <td className="border px-4 py-2">{partner.plaqueNumber}</td>
                <td className="border px-4 py-2">{partner.tel}</td>
                <td className="border px-4 py-2">{partner.city}</td>
                <td className="border px-4 py-2">{partner.amount}</td>
                <td className="border px-4 py-2">{new Date(partner.createdAt).toLocaleString()}</td>
                <td className="border px-4 py-2">{new Date(partner.updatedAt).toLocaleString()}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => openModal(partner)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                  >
                    Confirm
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No partners to confirm.</p>
      )}

      {/* Modal Popup */}
      {isModalOpen && selectedPartner && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Confirm Partner</h3>
            <form onSubmit={handleConfirmPartner}>
              <div>
                <label className="block text-sm font-semibold">Partner ID</label>
                <input
                  type="text"
                  value={partnerId}
                  onChange={(e) => setPartnerId(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded"
                  disabled
                />
                <label className="block text-sm font-semibold mt-4">Token Money</label>
                <input
                  type="text"
                  value={tokenMoney}
                  onChange={(e) => setTokenMoney(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded"
                  required
                />
                <label className="block text-sm font-semibold mt-4">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded"
                  disabled
                />
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer/>
    </main>
  );
};

export default InvalidConfirmedPartner;
