import React, { useState } from 'react';
import { Car, User, DoorClosed, Plus, Minus } from 'lucide-react';
import Header from './header';

const Counter = ({ icon: Icon, value, label, helperText }) => (
  <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-6 flex flex-col items-center">
    <Icon className="w-6 h-6 mb-2 text-white" />
    <button className="hover:bg-blue-500/20 hover:shadow-lg hover:shadow-blue-500/20 p-2 rounded-lg transition-all">
      <Plus className="w-5 h-5 text-white" />
    </button>
    <div className="text-2xl font-bold my-2 text-white">{value}</div>
    <button className="hover:bg-blue-500/20 hover:shadow-lg hover:shadow-blue-500/20 p-2 rounded-lg transition-all">
      <Minus className="w-5 h-5 text-white" />
    </button>
    <div className="text-sm text-gray-300 text-center mt-2">{label}</div>
    <div className="text-xs text-gray-400 text-center mt-1">{helperText}</div>
  </div>
);

const TempAccessForm = () => {
  const [activeTab, setActiveTab] = useState('license');
  const [licensePlate, setLicensePlate] = useState('');

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black overflow-y-auto text-white">
      <Header/>
      <div className="max-w-2xl mx-auto bg-gray-800/30 backdrop-blur rounded-lg border border-transparent md:border-gray-700 shadow-xl p-4 m-4">

        <h1 className="text-3xl font-bold text-white text-center mb-2 mt-8">
          Create Temporary Access
        </h1>
        <p className="text-gray-400 text-center mb-12">
          Configure temporary access permissions for visitors
        </p>

        {/* Custom Tabs */}
        <div className="mb-8">
          <div className="grid grid-cols-2 gap-1 bg-gray-800/50 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('license')}
              className={`py-2 px-4 rounded-md transition-colors ${
                activeTab === 'license'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              License Plate
            </button>
            <button
              onClick={() => setActiveTab('link')}
              className={`py-2 px-4 rounded-md transition-colors ${
                activeTab === 'link'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              Temporary Link
            </button>
          </div>
        </div>

        {activeTab === 'license' && (
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Vehicle License Plate Number
            </label>
            <input
              type="text"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              placeholder="Enter license plate number"
              className="w-full p-3 bg-gray-800/50 border border-gray-600 text-white rounded-lg 
                       focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 
                       hover:border-gray-500 transition-colors placeholder-gray-400"
            />
            <p className="text-sm text-gray-400 mt-2">
              Enter the vehicle's license plate number for temporary access authorization
            </p>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="space-y-2 w-full">
            <label className="block text-sm font-medium text-gray-300">
              Start Date/Time
            </label>
            <input
              type="datetime-local"
              className="w-full p-3 bg-gray-800/50 border border-gray-600 text-white rounded-lg 
                       focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 
                       hover:border-gray-500 transition-colors"
            />
          </div>
          <div className="space-y-2 w-full">
            <label className="block text-sm font-medium text-gray-300">
              End Date/Time
            </label>
            <input
              type="datetime-local"
              className="w-full p-3 bg-gray-800/50 border border-gray-600 text-white rounded-lg 
                       focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 
                       hover:border-gray-500 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <Counter
            icon={Car}
            value={0}
            label="Vehicle Access"
            helperText="Number of vehicles allowed"
          />
          <Counter
            icon={User}
            value={0}
            label="Pedestrian Access"
            helperText="Number of people allowed"
          />
          <Counter
            icon={DoorClosed}
            value={0}
            label="Close Gate"
            helperText="Auto-close after entries"
          />
        </div>

        <p className="text-gray-400 italic text-center text-sm mb-8">
          Set the number of entries allowed for each access type. Gates will automatically
          close after the specified number of entries.
        </p>

        <button className="w-full bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 
                         text-white font-bold py-4 px-8 rounded-lg text-lg 
                         transition-all duration-200 transform hover:scale-[1.02]">
          Create Temporary Access
        </button>
      </div>
    </div>
  );
};

export default TempAccessForm;