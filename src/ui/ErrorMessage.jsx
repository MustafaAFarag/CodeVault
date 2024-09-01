// src/ui/ErrorMessage.jsx

/* eslint-disable react/prop-types */

const ErrorMessage = ({ message }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="max-w-lg rounded-lg bg-white p-8 text-center shadow-lg">
        <p className="text-2xl font-semibold text-red-600">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
