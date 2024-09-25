import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Statistics from './response_statistics'
import StatisticsF from './statistics_Fmessages';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeOption, setActiveOption] = useState('/Depuis toujours');
  const [messages, setMessages] = useState([]);
  const [messagesAS, setMessagesAS] = useState([]);
  const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');


  const handleNavigation = (path) => {
    setActiveOption(path);
    navigate(path);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    // Fetch both sets of messages in a single useEffect
    const fetchData = async () => {
      try {
        const messagesResponse = await axios.get('http://localhost/api/free_messages.php', {
          headers: { 'Content-Type': 'application/json' },
        });
        if (messagesResponse.data.success) {
          setMessages(messagesResponse.data.data);
        } else {
          console.error('No messages found');
        }

        const accountStatementsResponse = await axios.get('http://localhost/api/Account_statements.php', {
          headers: { 'Content-Type': 'application/json' },
        });
        if (accountStatementsResponse.data.success) {
          setMessagesAS(accountStatementsResponse.data.data);
        } else {
          console.error('No account statements found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const filterMessages = (messagesToFilter, period) => {
    const now = new Date();
    
    // Filtrage des messages en fonction de la période
    const filteredMessages = messagesToFilter.filter(message => {
      const messageDate = new Date(message.timestamp);
      
      switch (period) {
        case '/Depuis toujours':
          return true;
        case '/Tous les jours':
          return messageDate.toDateString() === now.toDateString();
        case '/hebdomadaire':
          const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
          const endOfWeek = new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000);
          return messageDate >= startOfWeek && messageDate <= endOfWeek;
        case '/mensuel':
          return messageDate.getMonth() === now.getMonth() && messageDate.getFullYear() === now.getFullYear();
        case '/annuel':
          return messageDate.getFullYear() === now.getFullYear();
        case '/Choisir une période':
          const start = new Date(startDate);
          const end = new Date(endDate);
          return messageDate >= start && messageDate <= end;
        default:
          return false;
      }
    });
  
    // Tri des messages du plus récent au plus ancien
    return filteredMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };
  
  
  return (
    <div className='min-h-screen bg-[#ededed] font-medium relative'>
      <Header />
      <div className="text-center py-6 mb-[-20px]">
        <h1 className="mt-3 text-4xl font-serif pl-60 font-bold bg-gradient-to-r from-[#1b0000] via-[#7b01af] to-[#ffffff] bg-clip-text text-transparent w-auto">
          Dashboard
        </h1>
      </div>

      <div className="flex relative">
        {/* Sidebar */}
        <nav
          className="hidden font-serif md:flex min-h-screen rounded-lg shadow-black text-black p-10 fixed top-[79px] left-0 backdrop-blur-md flex-col justify-center z-50"
          style={{
            background: "linear-gradient(135deg, rgba(44,0,56,0.8) 0%, rgba(150,1,191,0.7) 56%, rgba(200,0,255,0.6) 100%)"
          }}
        >
          <ul className="flex flex-col space-y-5 items-center mt-[-100px]  text-[1.3vw] font-bold">
            {['/Depuis toujours', '/Tous les jours', '/hebdomadaire', '/mensuel', '/annuel','/Choisir une période'].map((path, index) => (
              <li key={index}>
                <NavLink 
                  to="#"
                  onClick={() => handleNavigation(path)}
                  className={`hover:text-[#dea403] hover:underline transition-transform duration-300 ${activeOption === path ? 'underline text-[#dea403]' : 'transform hover:scale-150'}`}
                >
                  {path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                </NavLink>
              </li>
            ))}
            <div className="input-box relative w-[13vw] h-[3.5vw] border-b-2 border-black my-7">
              <span className="icon absolute sm:top-30 md:top-5 right-0 text-[1.4vw]">
                <i className='bx bx-calendar'></i>
              </span>
              <input
                type='date'
                id="startDate"
                name="startDate"
                className="w-full h-full bg-transparent border-none outline-none text-base text-black text-[1vw] pr-7 mt-[10px]"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <label htmlFor="startDate" className='absolute top-1/2 mt-[11px] left-0 transform -translate-y-1/2 text-base pointer-events-none transition-transform duration-500 text-[10px] sm:text-[13px] md:text-[15px] pt-2'>
                Date de début
              </label>
            </div>

            <div className="input-box relative w-[13vw] h-[3.5vw] border-b-2 border-black my-7">
              <span className="icon absolute sm:top-30 md:top-5 right-0 text-[1.4vw]">
                <i className='bx bx-calendar'></i>
              </span>
              <input
                type='date'
                id="endDate"
                name="endDate"
                className="w-full h-full bg-transparent border-none outline-none mt-[10px] text-base text-black text-[1vw] pr-7"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <label htmlFor="endDate" className='absolute top-1/2 mt-[11px] left-0 transform -translate-y-1/2 text-base pointer-events-none transition-transform duration-500 text-[10px] sm:text-[13px] md:text-[15px] pt-2'>
                Date de fin
              </label>
            </div>

          </ul>
        </nav>


        {/* Hamburger menu for small and medium devices */}
        <button 
          className="md:hidden text-black text-3xl focus:outline-none ml-4 mt-[0] flex z-50 relative" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '×' : '≡'} {/* Toggle between ≡ and × */}
        </button>
        
        {/* Dropdown menu for small and medium devices */}
        {isMenuOpen && (
          <nav 
            className="md:hidden w-[200px] h-[220px] absolute top-[30px] left-5 text-black p-4 backdrop-blur-md rounded-xl flex justify-center z-50"
            style={{
              background: "linear-gradient(135deg, rgba(44,0,56,0.8) 0%, rgba(150,1,191,0.7) 56%, rgba(200,0,255,0.6) 100%)"
            }}
          >
            <ul className="flex flex-col space-y-4 items-center">
              {['/Depuis toujours', '/Tous les jours', '/hebdomadaire', '/mensuel', '/annuel'].map((path, index) => (
                <li key={index}>
                  <NavLink 
                    to="#"
                    onClick={() => handleNavigation(path)}
                    className={`hover:text-[#dea403] hover:underline ${activeOption === path ? 'underline text-[#dea403]' : ''}`}
                  >
                    {path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Main Content */}
        <main className="flex-1 md:ml-[18vw] pt-0 relative z-10">
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Block 1 */}
            <div className="backdrop-blur-md p-6 text-black rounded-lg shadow-2xl h-72 z-0 overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Statistiques de réponse aux transactions</h2>
                <Statistics selectedPeriod={activeOption} />
            </div>

            {/* Block 2 */}
            <div className="backdrop-blur-md p-6 text-black rounded-lg shadow-2xl h-72 z-0 overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Messages Financiers</h2>
              <StatisticsF selectedPeriod={activeOption} />
            </div>

            {/* Block 3 */}
            <div className="backdrop-blur-md p-6 text-black rounded-lg shadow-2xl h-56 z-0 overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Historique des extraits de compte</h2>
              <div className='text-black text-center text-[12px]'>
                {filterMessages(messagesAS, activeOption).length > 0 ? (
                  filterMessages(messagesAS, activeOption).map((messageAS, index) => (
                    <div key={index} className='mb-2 p-4 shadow-xl rounded bg-slate-50'>
                      <p><strong>Expéditeur:</strong> {messageAS.SENDER} - <strong>Récepteur:</strong> {messageAS.RECEIVER}</p>
                      <p><strong>Date:</strong> {new Date(messageAS.timestamp).toLocaleString()}</p>
                    </div>
                  ))
                ) : (
                  <p>No messages found</p>
                )}
              </div>
            </div>

            {/* Block 4 */}
            <div className="backdrop-blur-md p-6 text-black rounded-lg shadow-2xl h-56 z-0 overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Historique des messages Libres</h2>
              <div className='text-black text-center text-[12px]'>
                {filterMessages(messages, activeOption).length > 0 ? (
                  filterMessages(messages, activeOption).map((message, index) => (
                    <div key={index} className='mb-2 p-4 shadow-xl rounded bg-slate-50'>
                      <p><strong>Expéditeur:</strong> {message.SENDER} - <strong>Récepteur:</strong> {message.RECEIVER}</p>
                      <p><strong>Date:</strong> {new Date(message.timestamp).toLocaleString()}</p>
                      <p><strong>Nom du champ :</strong> {message.FIELDNAME} - <strong>Valeur:</strong> {message.VAL}</p>
                    </div>
                  ))
                ) : (
                  <p>No messages found</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
