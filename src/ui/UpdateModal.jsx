/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Modal from './Modal';
import { Button } from 'primereact/button';

function UpdateModal() {
  const updates = [
    ' 🎉 New pages are live! Check out "How to Use" , "Rules/Policies!',
    '🐞 Fixed that avatar bug — Upload your picture!',
    '⏳ Heads up: Notes upload is on pause until college kicks off!',
    '🔒 New restrictions on Full Name!',
    '👩‍🏫 Admin selections are now in place to smooth out the process!',
  ];

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenUpdates = localStorage.getItem('hasSeenUpdates');
    console.log('hasSeenUpdates:', hasSeenUpdates);
    if (!hasSeenUpdates) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenUpdates', 'true');
  };

  return (
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
  );
}

export default UpdateModal;
