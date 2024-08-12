import { useEffect } from 'react';
import { fetchNotes } from '../services/apiNotes';

function Header() {
  useEffect(function () {
    fetchNotes();
  }, []);

  return (
    <header className="bg-blue-600 py-[1.2rem] px-[4.8rem] border-b-2 border-solid border-gray-600 flex justify-end items-center gap-[2.4rem]">
      <p>USER</p>
      <p>LOGOUT / OPTIONS</p>
    </header>
  );
}

export default Header;
