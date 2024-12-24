import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
//import LanguageSelector from '../LanguageSelector';

const Navbar = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                {t('appName')}
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/store" className="nav-link">
              {t('store')}
            </Link>
            <Link to="/appointments" className="nav-link">
              {t('appointments')}
            </Link>
            <Link to="/prescriptions" className="nav-link">
              {t('prescriptions')}
            </Link>

            <LanguageSelector />
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
