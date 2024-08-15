import { useEffect } from 'react';
import { fetchNotes } from '../services/apiNotes';
import Logout from '../features/authentication/Logout';

function Header() {
  useEffect(function () {
    fetchNotes();
  }, []);

  return (
    <header className="bg-gray-800 py-[1.2rem] px-[4.8rem] border-b-2 border-solid border-gray-700 flex justify-end items-center gap-[2.4rem] text-white">
      <Logout />
    </header>
  );
}

export default Header;
