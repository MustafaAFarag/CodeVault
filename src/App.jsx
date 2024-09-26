import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import AppLayout from './ui/AppLayout';
import HomeLayout from './ui/HomeLayout';
import ProtectedRoute from './ui/ProtectedRoute';
import ProtectedAdminRoute from './ui/ProtectedAdminRoute';
import Analytics from './ui/Analytics';

import Homepage from './pages/Homepage';
import About from './pages/About';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PageNotFound from './pages/PageNotFound';
import Notes from './pages/Notes';
import Account from './pages/Account';
import Lectures from './pages/Lectures';
import Sections from './pages/Sections';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Logs from './pages/Logs';
import Favorites from './pages/Favorites';
import Updates from './pages/Updates';
import RulesAndPermissions from './pages/RulesAndPermissions';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Analytics />

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
            <Route path="/updates" element={<Updates />} />
            <Route path="/rules" element={<RulesAndPermissions />} />
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
            style: {
              backgroundColor: '#d4edda',
              color: '#155724',
              border: '1px solid #c3e6cb',
            },
          },
          error: {
            duration: 5000,
            style: {
              backgroundColor: '#f8d7da',
              color: '#721c24',
              border: '1px solid #f5c6cb',
            },
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
