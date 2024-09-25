import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';

const Answers = () => {
  const [messagesResponse, setmessagesResponse] = useState([]);
  const [inputs, setInputs] = useState({ date: '', sender: '', receiver: '', field: '', file: '' }); // Initialize inputs state
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [filterType, setFilterType] = useState(null);
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    // Fetch messagesResponse from the API
    axios.get('http://localhost/api/Reponse.php', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.data.success) {
          setmessagesResponse(response.data.data);
        } else {
          console.error('No messagesResponse found');
        }
      })
      .catch(error => console.error('Error fetching messagesResponse:', error));
  }, []);

  const handleMessageClick = (message) => {
    // Construct URL for the .txt file based on FILENAME
    const fileUrl = `/${message.FILENAME}`;

    window.open(fileUrl, '_blank');

    /*const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', message.FILENAME);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);*/
  };

  // Filter messagesResponse by the selected criteria (date, sender, receiver, etc.)
  const filteredmessagesResponse = messagesResponse.filter((message) => {
    const messageType = parseInt(message.mttype, 10); // Assuming message.TYPE is a number

    return (
      (!inputs.date || new Date(message.timestamp).toLocaleDateString() === new Date(inputs.date).toLocaleDateString()) &&
      (!inputs.sender || message.SENDER.toLowerCase().includes(inputs.sender.toLowerCase())) &&
      (!inputs.receiver || message.RECEIVER.toLowerCase().includes(inputs.receiver.toLowerCase())) &&
      (!inputs.field || message.FIELDNAME.toLowerCase().includes(inputs.field.toLowerCase())) &&
      (!inputs.file || message.FILENAME.toLowerCase().includes(inputs.file.toLowerCase())) &&
      (filterType === null || filterType.includes(messageType)) // Apply the selected filterType if set
    );
  });

  const handleAccept = () => {
    setFilterType([900, 910]); // Filter by message types 900 and 910
  };

  const handleRefus = () => {
    setFilterType([196, 296]); // Filter by message types 196 and 296
  };

  const handleAll = () => {
    setFilterType([196, 296,900, 910]); // Filter by message types 196 and 296
  };

  return (
    <div className='min-h-screen bg-[#ededed] font-medium relative'>
      <Header />
      <h1 className='text-4xl pl-72 font-serif font-bold bg-gradient-to-r from-[#1b0000] via-[#7b01af] to-[#ffffff] bg-clip-text text-transparent w-auto text-center py-10'>Réponses <span className='text-3xl'>(MT900/910/196/296)</span></h1>

      <div className="flex relative">
        {/* Sidebar */}
        <div className="hidden md:flex rounded-lg min-h-screen bg-dark-blue-gradient text-black p-10 fixed top-[79px] left-0 backdrop-blur-md flex-col justify-center z-50"
        style={{
          background: "linear-gradient(135deg, rgba(44,0,56,0.8) 0%, rgba(150,1,191,0.7) 56%, rgba(200,0,255,0.6) 100%)"
        }}>
          <div className="flex flex-col space-y-5 items-center mt-[-100px] text-[1.3vw] font-bold">
            <h1 className='text-4xl text-black text-center py-0 mb-10 font-serif font-bold'>Recherche</h1>

            <div className="input-box relative w-[18vw] h-[3.5vw] border-b-2 border-black my-7">
              <span className="icon absolute sm:top-30 md:top-3 right-0 text-[1.4vw]">
                <i className='bx bx-calendar'></i>
              </span>
              <input
                type='date'
                id="date"
                name="date"
                className="w-full h-full bg-transparent border-none outline-none text-base text-black text-[1.1vw] pr-7"
                value={inputs.date || ''}
                onChange={handleChange}
              />
              <label htmlFor="date" className='absolute top-1/2 left-0 transform -translate-y-1/2 text-base pointer-events-none transition-transform duration-500 text-[10px] sm:text-[13px] md:text-[17px]'>
                Date
              </label>
            </div>

            <div className="input-box relative w-[18vw] h-[3.5vw] border-b-2 border-black my-7">
              <span className="icon absolute sm:top-30 md:top-3 right-0 text-[1.4vw]">
                <i className='bx bx-send'></i>
              </span>
              <input
                type='text'
                id="sender"
                name="sender"
                required
                className="w-full h-full bg-transparent border-none outline-none text-base text-black text-[1.1vw] pr-7"
                value={inputs.sender || ''}
                onChange={handleChange}
              />
              <label htmlFor="sender" className='absolute top-1/2 left-0 transform -translate-y-1/2 text-base pointer-events-none transition-transform duration-500 text-[10px] sm:text-[13px] md:text-[17px]'>
                Expéditeur
              </label>
            </div>

            <div className="input-box relative w-[18vw] h-[3.5vw] border-b-2 border-black my-7">
              <span className="icon absolute sm:top-30 md:top-3 right-0 text-[1.4vw]">
                <i className='bx bx-send bx-rotate-180'></i>
              </span>
              <input
                type='text'
                id="receiver"
                name="receiver"
                required
                className="w-full h-full bg-transparent border-none outline-none text-base text-black text-[1.1vw] pr-7"
                value={inputs.receiver || ''}
                onChange={handleChange}
              />
              <label htmlFor="receiver" className='absolute top-1/2 left-0 transform -translate-y-1/2 text-base pointer-events-none transition-transform duration-500 text-[10px] sm:text-[13px] md:text-[17px]'>
                Récepteur
              </label>
            </div>

            <div className="input-box relative w-[18vw] h-[3.5vw] border-b-2 border-black my-7">
              <span className="icon absolute sm:top-30 md:top-3 right-0 text-[1.4vw]">
                <i className='bx bx-file-blank'></i>
              </span>
              <input
                type='text'
                id="field"
                name="field"
                required
                className="w-full h-full bg-transparent border-none outline-none text-base text-black text-[1.1vw] pr-7"
                value={inputs.field || ''}
                onChange={handleChange}
              />
              <label htmlFor="field" className='absolute top-1/2 left-0 transform -translate-y-1/2 text-base pointer-events-none transition-transform duration-500 text-[10px] sm:text-[13px] md:text-[17px]'>
                Nom du champ
              </label>
            </div>

            <div className="input-box relative w-[18vw] h-[3.5vw] border-b-2 border-black my-7">
              <span className="icon absolute sm:top-30 md:top-3 right-0 text-[1.4vw]">
                <i className='bx bxs-file'></i>
              </span>
              <input
                type='text'
                id="file"
                name="file"
                required
                className="w-full h-full bg-transparent border-none outline-none text-base text-black text-[1.1vw] pr-7"
                value={inputs.file || ''}
                onChange={handleChange}
              />
              <label htmlFor="file" className='absolute top-1/2 left-0 transform -translate-y-1/2 text-base pointer-events-none transition-transform duration-500 text-[10px] sm:text-[13px] md:text-[17px]'>
                Nom de fichier
              </label>
            </div>

            <div className='flex items-center justify-center'>
              <button onClick={handleAccept} className="font-serif w-[7.7vw] mr-2 mt-5 rounded-lg text-[1.2vw] font-semibold shadow-2xl transition-transform transform hover:scale-105 duration-500 bg-gradient-to-r from-[#dea403] via-[#deb23a] to-[#dac17a] hover:bg-gradient-to-r hover:from-[#c99401] hover:via-[#c69f34] hover:to-[#c2ac6d]">
                Acceptation (900/910)
              </button>
              <button onClick={handleAll} className="font-serif w-[3.5vw] mr-2 mt-5 h-[2.6vw] rounded-lg text-[1.2vw] font-semibold shadow-2xl transition-transform transform hover:scale-105 duration-500 bg-gradient-to-r from-[#dea403] via-[#deb23a] to-[#dac17a] hover:bg-gradient-to-r hover:from-[#c99401] hover:via-[#c69f34] hover:to-[#c2ac6d]">
                Tout
              </button>
              <button onClick={handleRefus} className="font-serif w-[7.7vw] mt-5  rounded-lg text-[1.2vw] font-semibold shadow-2xl transition-transform transform hover:scale-105 duration-500 bg-gradient-to-r from-[#dea403] via-[#deb23a] to-[#dac17a] hover:bg-gradient-to-r hover:from-[#c99401] hover:via-[#c69f34] hover:to-[#c2ac6d]">
                Refuse (196/296)
              </button>
            </div>  

          </div>
        </div>

        {/* Hamburger menu for small screens */}
        <button
          className="md:hidden text-black text-3xl focus:outline-none ml-4 mt-[0] flex z-50 relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '×' : '≡'}
        </button>

        {/* Dropdown menu for small screens */}
        {isMenuOpen && (
          <div className="md:hidden w-[200px] h-[333px] absolute top-[30px] left-5 bg-dark-blue-gradient text-black p-4 backdrop-blur-md rounded-xl flex justify-center z-50"
          style={{
            background: "linear-gradient(135deg, rgba(44,0,56,0.8) 0%, rgba(150,1,191,0.7) 56%, rgba(200,0,255,0.6) 100%)"
          }}>
            <div className="flex flex-col space-y-4 items-center">
            <h1 className='text-3xl text-black text-center py-0 mb-5'>Recherche</h1>
            <div className="input-box relative w-[18vw] h-[3.5vw] border-b-2 border-black my-7">
              <span className="icon absolute sm:top-30 md:top-3 right-0 text-[1.4vw]">
                <i className='bx bx-calendar'></i>
              </span>
              <input
                type='date'
                id="date"
                name="date"
                className="w-full h-full bg-transparent  border-none outline-none text-base text-black text-[1.1vw] pr-7"
                value={inputs.date || ''}
                onChange={handleChange}
              />
              <label htmlFor="date" className='absolute top-1/2 left-0 transform -translate-y-1/2 text-base pointer-events-none transition-transform duration-500 text-[10px] sm:text-[13px] md:text-[17px]'>
                Date
              </label>
            </div>

            <div className="input-box relative w-[18vw] h-[3.5vw] border-b-2 border-black my-7">
              <span className="icon absolute sm:top-30 md:top-3 right-0 text-[1.4vw]">
                <i className='bx bx-send'></i>
              </span>
              <input
                type='text'
                id="sender"
                name="sender"
                required
                className="w-full h-full bg-transparent border-none outline-none text-base text-black text-[1.1vw] pr-7"
                value={inputs.sender || ''}
                onChange={handleChange}
              />
              <label htmlFor="sender" className='absolute top-1/2 left-0 transform -translate-y-1/2 text-base pointer-events-none transition-transform duration-500 text-[10px] sm:text-[13px] md:text-[17px]'>
                Expéditeur
              </label>
            </div>

            <div className="input-box relative w-[18vw] h-[3.5vw] border-b-2 border-black my-7">
              <span className="icon absolute sm:top-30 md:top-3 right-0 text-[1.4vw]">
                <i className='bx bx-send bx-rotate-180'></i>
              </span>
              <input
                type='text'
                id="receiver"
                name="receiver"
                required
                className="w-full h-full bg-transparent border-none outline-none text-base text-black text-[1.1vw] pr-7"
                value={inputs.receiver || ''}
                onChange={handleChange}
              />
              <label htmlFor="receiver" className='absolute top-1/2 left-0 transform -translate-y-1/2 text-base pointer-events-none transition-transform duration-500 text-[10px] sm:text-[13px] md:text-[17px]'>
                Récepteur
              </label>
            </div>

            <div className="input-box relative w-[18vw] h-[3.5vw] border-b-2 border-black my-7">
              <span className="icon absolute sm:top-30 md:top-3 right-0 text-[1.4vw]">
                <i className='bx bx-file-blank'></i>
              </span>
              <input
                type='text'
                id="field"
                name="field"
                required
                className="w-full h-full bg-transparent border-none outline-none text-base text-black text-[1.1vw] pr-7"
                value={inputs.field || ''}
                onChange={handleChange}
              />
              <label htmlFor="field" className='absolute top-1/2 left-0 transform -translate-y-1/2 text-base pointer-events-none transition-transform duration-500 text-[10px] sm:text-[13px] md:text-[17px]'>
                Nom du champ
              </label>
            </div>

            <div className="input-box relative w-[18vw] h-[3.5vw] border-b-2 border-black">
              <span className="icon absolute sm:top-30 md:top-3 right-0 text-[1.4vw]">
                <i className='bx bxs-file'></i>
              </span>
              <input
                type='text'
                id="file"
                name="file"
                required
                className="w-full h-full bg-transparent border-none outline-none text-base text-black text-[1.1vw]"
                value={inputs.file || ''}
                onChange={handleChange}
              />
              <label htmlFor="file" className='absolute top-1/2 left-0 transform -translate-y-1/2 text-base pointer-events-none transition-transform duration-500 text-[10px] sm:text-[13px] md:text-[17px]'>
                Nom de fichier
              </label>
            </div>

            <div>
              <button onClick={handleAccept} className="font-serif w-[7.7vw] mr-2 h-[2.6vw] rounded-lg text-[1.2vw] font-semibold shadow-2xl transition-transform transform hover:scale-105 duration-500 bg-gradient-to-r from-[#dea403] via-[#deb23a] to-[#dac17a] hover:bg-gradient-to-r hover:from-[#c99401] hover:via-[#c69f34] hover:to-[#c2ac6d]">
                Acceptation
              </button>
              <button onClick={handleAll} className="font-serif w-[3.5vw] mr-2 h-[2.6vw] rounded-lg text-[1.2vw] font-semibold shadow-2xl transition-transform transform hover:scale-105 duration-500 bg-gradient-to-r from-[#dea403] via-[#deb23a] to-[#dac17a] hover:bg-gradient-to-r hover:from-[#c99401] hover:via-[#c69f34] hover:to-[#c2ac6d]">
                Tout
              </button>
              <button onClick={handleRefus} className="font-serif w-[7.7vw] h-[2.6vw] rounded-lg text-[1.2vw] font-semibold shadow-2xl transition-transform transform hover:scale-105 duration-500 bg-gradient-to-r from-[#dea403] via-[#deb23a] to-[#dac17a] hover:bg-gradient-to-r hover:from-[#c99401] hover:via-[#c69f34] hover:to-[#c2ac6d]">
                Refuse
              </button>
            </div>  


            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 mt-[-50px] relative z-10">
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-black text-center absolute left-1/2 w-full md:w-1/2 mt-5 rounded-xl transform -translate-x-1/2 ml-[11vw]">
              {filteredmessagesResponse.length > 0 ? (
                <table className="w-full table-auto bg-slate-100 shadow-2xl rounded">
                  <thead>
                    <tr className="bg-slate-200">
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Expéditeur</th>
                      <th className="px-4 py-2">Récepteur</th>
                      <th className="px-4 py-2">Nom du champ</th>
                      <th className="px-4 py-2">Valeur</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredmessagesResponse.map((message, index) => (
                      <tr
                        key={index}
                        className="hover:bg-slate-200 transform hover:scale-[1.03] duration-500 cursor-pointer"
                        onClick={() => handleMessageClick(message)}
                      >
                        <td className="border px-4 py-2">
                          {new Date(message.timestamp).toLocaleString()}
                        </td>
                        <td className="border px-4 py-2">{message.SENDER}</td>
                        <td className="border px-4 py-2">{message.RECEIVER}</td>
                        <td className="border px-4 py-2">{message.FIELDNAME}</td>
                        <td className="border px-4 py-2">{message.VAL}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No messages found</p>
              )}
            </div>
          </div>
        </main>


      </div>
    </div>
  );
};

export default Answers;
