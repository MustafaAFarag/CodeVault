import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppLayout from './ui/AppLayout';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';
import Notes from './pages/Notes';
import Lectures from './pages/Lectures';
import Resources from './pages/Resources';
import Sections from './pages/Sections';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './ui/ProtectedRoute';
import SignUp from './pages/SignUp';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} /> {/* Homepage  Component*/}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Homepage />} />
            {/* Dashboard  Component*/}
            <Route path="/notes" element={<Notes />} />
            <Route path="/lectures" element={<Lectures />} />
            <Route path="/sections" element={<Sections />} />
            <Route path="/quiztime" element={<Homepage />} />
            <Route path="/showcase" element={<Homepage />} />
            <Route path="/resources" element={<Resources />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'gray',
            color: 'black',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
