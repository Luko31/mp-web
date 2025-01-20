import React, { useState } from 'react';
import { Menu, X, User, Clock, Car, Link2, Settings, UserCircle2, Lock } from 'lucide-react';

const GateControlApp = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [gateStatus, setGateStatus] = useState('Gate Closed');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  /*
  'sm': '640px', // => @media (min-width: 640px) { ... }
  'md': '768px', // => @media (min-width: 768px) { ... }
  'lg': '1024px', // => @media (min-width: 1024px) { ... }
  'xl': '1280px', // => @media (min-width: 1280px) { ... }
  '2xl': '1536px', // => @media (min-width: 1536px) { ... }
  */

const redirectToTempAccess = () => {
    window.location.href = '/temp-access';
};

return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white">
        {/* Header */}
        <header className="bg-black/50 p-4 flex items-center justify-between">
            <button onClick={toggleMenu} className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">School Gate Control</h1>
            <div className="w-6" /> {/* Spacer for symmetry */}
        </header>

        {/* Main Content */}
        <main className="container mx-auto p-4 max-w-md">
            {/* Gate Status Video Section */}
            <div className="relative mb-6 rounded-lg overflow-hidden">
                <div className="aspect-video bg-gray-800 flex items-center justify-center">
                    {/* Placeholder for video */}
                    <div className="absolute inset-0 bg-black/50" />
                    <span className="relative text-2xl font-bold">{gateStatus}</span>
                </div>
            </div>

            {/* Gate Control Buttons */}
            <div className="space-y-4">
                <button
                    onClick={() => setGateStatus('Vehicle Gate Opening')}
                    className="w-full relative bg-gray-800 rounded-lg overflow-hidden group hover:bg-gray-700 transition-colors p-6 flex items-center justify-between"
                >
                    <div className="flex items-center">
                        <Car className="w-8 h-8 mr-4" />
                        <div className="text-left">
                            <span className="text-lg font-semibold block">Open Gate</span>
                            <span className="text-sm text-gray-400">For vehicles</span>
                        </div>
                    </div>
                    <Lock className="w-6 h-6" />
                </button>

                <button
                    onClick={() => setGateStatus('Pedestrian Gate Opening')}
                    className="w-full relative bg-gray-800 rounded-lg overflow-hidden group hover:bg-gray-700 transition-colors p-6 flex items-center justify-between"
                >
                    <div className="flex items-center">
                        <UserCircle2 className="w-8 h-8 mr-4" />
                        <div className="text-left">
                            <span className="text-lg font-semibold block">Open Gate</span>
                            <span className="text-sm text-gray-400">For pedestrians</span>
                        </div>
                    </div>
                    <Lock className="w-6 h-6" />
                </button>

                <button
                    onClick={() => setGateStatus('Gate Closed')}
                    className="w-full relative bg-gray-800 rounded-lg overflow-hidden group hover:bg-gray-700 transition-colors p-6 flex items-center justify-between"
                >
                    <div className="flex items-center">
                        <Lock className="w-8 h-8 mr-4" />
                        <div className="text-left">
                            <span className="text-lg font-semibold block">Close Gate</span>
                            <span className="text-sm text-gray-400">All access points</span>
                        </div>
                    </div>
                    <Lock className="w-6 h-6" />
                </button>
            </div>
        </main>

        {/* Slide-out Menu */}
        <div className={`fixed inset-y-0 left-0 w-64 bg-gray-900 transform transition-transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="p-4">
                <button onClick={toggleMenu} className="absolute right-4 top-4 p-2 hover:bg-gray-800 rounded-lg">
                    <X className="w-6 h-6" />
                </button>
                
                {/* User Info */}
                <div className="flex items-center space-x-3 mb-8 mt-8">
                    <User className="w-8 h-8" />
                    <button className="text-lg font-semibold">John Doe</button>
                </div>

                {/* Menu Items */}
                <nav className="space-y-4">
                    <button className="flex items-center space-x-3 w-full p-2 hover:bg-gray-800 rounded-lg">
                        <Clock className="w-5 h-5" />
                        <span>History</span>
                    </button>
                    <button className="flex items-center space-x-3 w-full p-2 hover:bg-gray-800 rounded-lg">
                        <Car className="w-5 h-5" />
                        <span>Manage License Plates</span>
                    </button>
                    <button onClick={redirectToTempAccess} className="flex items-center space-x-3 w-full p-2 hover:bg-gray-800 rounded-lg">
                        <Link2 className="w-5 h-5" />
                        <span>Generate Temporary Access</span>
                    </button>
                    <button className="flex items-center space-x-3 w-full p-2 hover:bg-gray-800 rounded-lg">
                        <Car className="w-5 h-5" />
                        <span>Parking Lot Overview</span>
                    </button>
                    <button className="flex items-center space-x-3 w-full p-2 hover:bg-gray-800 rounded-lg">
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                    </button>
                </nav>
            </div>
        </div>
    </div>
);
};

export default GateControlApp;