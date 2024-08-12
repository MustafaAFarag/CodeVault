import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppLayout from './ui/AppLayout';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';
import Notes from './pages/Notes';
import Lectures from './pages/Lectures';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/dashboard" element={<Homepage />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/lectures" element={<Lectures />} />
            <Route path="/quiztime" element={<Homepage />} />
            <Route path="/showcase" element={<Homepage />} />
            <Route path="/resources" element={<Homepage />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
