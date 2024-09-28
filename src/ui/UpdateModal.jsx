import { useState, useEffect } from 'react';
import Modal from './Modal';
import { Button } from 'primereact/button';
import Confetti from 'react-confetti';

const CURRENT_APP_VERSION = '1.1.0'; // Increment this version on every update

function UpdateModal() {
  const updates = [
    '👥 Users List displays all Users!',
    '✅ To-Dos have been updated',
    '📚 Numerical Lectures PDFs/Notes have landed',
    '🎉 All Users can upload Notes!',
    '⚠️ Warnings: Use appropriate names, or your account might face a ban/suspend!',
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const storedAppVersion = localStorage.getItem('appVersion');
    const hasSeenUpdates = localStorage.getItem('hasSeenUpdates');

    // Check if version has changed
    if (storedAppVersion !== CURRENT_APP_VERSION) {
      localStorage.removeItem('hasSeenUpdates');
      localStorage.setItem('appVersion', CURRENT_APP_VERSION); // Update to new version
    }

    // Show the modal if it has not been seen
    if (!hasSeenUpdates || storedAppVersion !== CURRENT_APP_VERSION) {
      setIsOpen(true);
    }

    // Update window size on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenUpdates', 'true');
  };

  return (
    <>
      {isOpen && <Confetti width={windowWidth} height={windowHeight} />}
      <Modal isOpen={isOpen} onClose={handleClose} showButtons={false}>
        <h2 className="mb-4 text-lg font-bold">New Updates!</h2>
        <ul className="mb-5 flex list-disc flex-col gap-2 space-y-2 pl-6 text-xl">
          {updates.map((update, index) => (
            <li key={index}>{update}</li>
          ))}
        </ul>
        <div className="flex justify-end">
          <Button
            label="Got it!"
            onClick={handleClose}
            className="rounded bg-teal-500 px-4 py-2 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-teal-600 lg:text-xl"
          />
        </div>
      </Modal>
    </>
  );
}

export default UpdateModal;
