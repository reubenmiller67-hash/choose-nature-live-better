import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import MerchPage from './pages/MerchPage';
import ContactPage from './pages/ContactPage';
import LeadPage from './pages/LeadPage';
import PlaceholderPage from './pages/PlaceholderPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import BlogPostEditor from './pages/admin/BlogPostEditor';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about-me" element={<AboutPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:id" element={<BlogPostPage />} />
          <Route path="merch" element={<MerchPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="lead" element={<LeadPage />} />
          <Route path="privacy-policy" element={<PlaceholderPage title="Privacy Policy" />} />
          <Route path="affiliate-disclosure" element={<PlaceholderPage title="Affiliate Disclosure" />} />
          <Route path="earnings-disclaimer" element={<PlaceholderPage title="Earnings Disclaimer" />} />
          <Route path="terms-of-use" element={<PlaceholderPage title="Terms of Use" />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/posts/new"
          element={
            <ProtectedRoute>
              <BlogPostEditor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/posts/edit/:id"
          element={
            <ProtectedRoute>
              <BlogPostEditor />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
