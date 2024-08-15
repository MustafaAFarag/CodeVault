import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppLayout from './ui/AppLayout';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';
import Notes from './pages/Notes';
import Lectures from './pages/Lectures';
import Resources from './pages/Resources';
import { ToastContainer } from 'react-toastify';
import Sections from './pages/Sections';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/dashboard" element={<Homepage />} />

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
      <ToastContainer
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
            backgroundColor: 'red',
            color: 'black',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
