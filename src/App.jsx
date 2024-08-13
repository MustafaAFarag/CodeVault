import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppLayout from './ui/AppLayout';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';
import Notes from './pages/Notes';
import Lectures from './pages/Lectures';
import Resources from './pages/Resources';

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
            <Route path="/quiztime" element={<Homepage />} />
            <Route path="/showcase" element={<Homepage />} />
            <Route path="/resources" element={<Resources />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
