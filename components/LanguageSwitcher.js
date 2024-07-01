import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';

const LanguageSwitcher = ({ style }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const changeLanguage = (locale) => {
    router.push(router.pathname, router.asPath, { locale });
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div style={style} className="relative inline-block text-left" ref={dropdownRef}>
      <button
        id="dropdownUsersButton"
        className="text-black bg-slate-100 hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white dark:hover:bg-blue-700 dark:focus:gray flex gap-2"
        type="button"
        onClick={toggleDropdown}
      >
        <div className='flex gap-2'>
          <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" stroke="#000000" strokeWidth="2" d="M12,23 C18.0751322,23 23,18.0751322 23,12 C23,5.92486775 18.0751322,1 12,1 C5.92486775,1 1,5.92486775 1,12 C1,18.0751322 5.92486775,23 12,23 Z M12,23 C15,23 16,18 16,12 C16,6 15,1 12,1 C9,1 8,6 8,12 C8,18 9,23 12,23 Z M2,16 L22,16 M2,8 L22,8"/>
          </svg>
          <p className='leading-4'>
            Language
          </p>
        </div>
        <svg
          className="w-2.5 h-2.5 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id="dropdownUsers"
          className="absolute w-full left-0 bottom-full mb-2 bg-white rounded-lg shadow w-60 dark:bg-gray-700"
        >
          <ul className="py-2 text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
            <li>
              <div
                className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                onClick={(e) => { e.preventDefault(); changeLanguage('en'); }}
              >
                <img
                  className="w-6 h-6 mr-2 rounded-full"
                  src="/english.jpg" // Assuming you have the image at this path
                  alt="English"
                />
                English
              </div>
            </li>
            <li>
              <div
                className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                onClick={(e) => { e.preventDefault(); changeLanguage('it'); }}
              >
                <img
                  className="w-6 h-6 mr-2 rounded-full"
                  src="/it.png" // Assuming you have the image at this path
                  alt="Italian"
                />
                Italian
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
