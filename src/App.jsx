import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppLayout from './ui/AppLayout';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';
import Notes from './pages/Notes';
import Account from './pages/Account';
import Lectures from './pages/Lectures';
import Sections from './pages/Sections';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './ui/ProtectedRoute';
import ProtectedAdminRoute from './ui/ProtectedAdminRoute';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import About from './pages/about';
import AdminPanel from './pages/AdminPanel';
import Logs from './pages/Logs';
import Favorites from './pages/Favorites';
import HomeLayout from './ui/HomeLayout';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/lectures" element={<Lectures />} />
            <Route path="/sections" element={<Sections />} />
            <Route path="/account" element={<Account />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route element={<ProtectedAdminRoute />}>
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/logs" element={<Logs />} />
            </Route>
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
