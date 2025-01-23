import React, { useState } from 'react';
import { Menu, Car, User, X } from 'lucide-react';
import SlideOutMenu from './Menu';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    let status = 'Open';

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-green-500';
      case 'closed':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  function onClose() {
    console.log('Closing the gate');
  }

    function onOpenVehicle() {
        console.log('Opening the gate for vehicles');
        }

    function onOpenPedestrian() {
        console.log('Opening the gate for pedestrians');
    }

    

  return (
    <header className="bg-gray-900 border-b border-gray-800 p-4 sticky top-0 bottom-0 z-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Left side - Menu and Status */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="p-2 text-white hover:text-gray-400 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Status:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)} text-white`}>
                {status}
              </span>
            </div>
          </div>

          {/* Right side - Control Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenVehicle}
              aria-label="Open for vehicles"
              className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-500 
                       text-white rounded-lg transition-colors md:px-4"
            >
              <Car className="w-4 h-4" />
              <span className="hidden md:inline">Vehicles</span>
            </button>
            
            <button
              onClick={onOpenPedestrian}
              aria-label="Open for pedestrians"
              className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-500 
                       text-white rounded-lg transition-colors md:px-4"
            >
              <User className="w-4 h-4" />
              <span className="hidden md:inline">Pedestrians</span>
            </button>
            
            <button
              onClick={onClose}
              aria-label="Close gate"
              className="flex items-center gap-2 px-3 py-2 text-sm bg-red-600 hover:bg-red-500 
                       text-white rounded-lg transition-colors md:px-4"
            >
              <X className="w-4 h-4" />
              <span className="hidden md:inline">Close</span>
            </button>
          </div>
        </div>
      </div>
      <SlideOutMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </header>
    
  );
};

export default Header;