import React, { useState, useEffect } from 'react';
import { Menu, Car, UserCircle2, Lock } from 'lucide-react';
import Cookies from 'js-cookie';
import SlideOutMenu from './Menu';

const GateControlApp = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [gateStateDisplay, setGateStateDisplay] = useState('');
  const [gateState, setGateState] = useState('closed');

  const GATE_STATES = {
    'open_p': 'Brána je otvorená pre chodcov',
    'open_v': 'Brána je otvorená pre vozidlá',
    'closed': 'Brána je zatvorená',
    'not_closed': 'Nie je zatvorená',
    'opening_p': 'Otvára sa brána pre chodcov',
    'opening_v': 'Otvára sa brána pre vozidlá',
    'closing': 'Zatvára sa brána',
  }

  const access_token = Cookies.get('auth_token');

  useEffect(() => {
    setGateStateDisplay(GATE_STATES[gateState]);
  }, [gateState]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => { 
    const ws = new WebSocket(`wss://${process.env.REACT_APP_SERVER_DOMAIN}/ws/gate/?token=${access_token}`);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      if (message.type === 'status') {
        setGateState(message.message);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  /*
  'sm': '640px', // => @media (min-width: 640px) { ... }
  'md': '768px', // => @media (min-width: 768px) { ... }
  'lg': '1024px', // => @media (min-width: 1024px) { ... }
  'xl': '1280px', // => @media (min-width: 1280px) { ... }
  '2xl': '1536px', // => @media (min-width: 1536px) { ... }
  */

return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white">
        {/* Header */}
        <header className="bg-gray-900 border-b border-gray-800 p-4 sticky top-0 bottom-0 z-10">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
                <button onClick={toggleMenu} className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                    <Menu className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold">School Gate Control</h1>
                <div className="w-6" /> {/* Spacer for symmetry */}
            </div>
        </header>
        
        <SlideOutMenu 
            isMenuOpen={isMenuOpen} 
            toggleMenu={toggleMenu} 
        />

        {/* Main Content */}
        <main className="container mx-auto p-4 max-w-md">
            {/* Gate Status Video Section */}
            <div className="relative mb-6 rounded-lg overflow-hidden">
                <div className="aspect-video bg-gray-800 flex items-center justify-center">
                    {/* Placeholder for video */}
                    <div className="absolute inset-0 bg-black/50" />
                    <span className="relative text-2xl font-bold">{gateStateDisplay}</span>
                </div>
            </div>

            {/* Gate Control Buttons */}
            <div className="space-y-4">
                <button
                    onClick={() => setGateStateDisplay('Vehicle Gate Opening')}
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
                    onClick={() => setGateStateDisplay('Pedestrian Gate Opening')}
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
                    onClick={() => setGateStateDisplay('Gate Closed')}
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
    </div>
);
};

export default GateControlApp;