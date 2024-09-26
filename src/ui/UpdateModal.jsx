/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Modal from './Modal';
import { Button } from 'primereact/button';
import Confetti from 'react-confetti';

function UpdateModal() {
  const updates = [
    '✨ Exciting interface adjustments and new features have been added!',
    '🌟 A warm welcome awaits you in the Dashboard!',
    '🔒 Uploads are now restricted to PDF files only for better compatibility.',
    '🎉 New pages are live! Check out our "Rules and Permissions" sections!',
    '🐞 We fixed the avatar bug—feel free to upload your picture now!',
    '⏳ Heads up: Notes uploads are paused until college starts!',
    '🔐 New restrictions have been implemented for Full Name entries and for the Backend!',
    '👩‍🏫 Admin selections are now in place to streamline the process!',
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const hasSeenUpdates = localStorage.getItem('hasSeenUpdates');
    const updatesExpiration = localStorage.getItem('updatesExpiration');

    const now = new Date().getTime();
    const isExpired =
      updatesExpiration && now > parseInt(updatesExpiration, 10);

    // Reset hasSeenUpdates if expired
    if (isExpired) {
      localStorage.removeItem('hasSeenUpdates');
      localStorage.removeItem('updatesExpiration');
    }

    // Show the modal if it has not been seen or has expired
    if (!hasSeenUpdates || isExpired) {
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
    const expirationDate = new Date();

    expirationDate.setDate(expirationDate.getDate() + 1);

    localStorage.setItem('hasSeenUpdates', 'true');
    localStorage.setItem(
      'updatesExpiration',
      expirationDate.getTime().toString(),
    );
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
