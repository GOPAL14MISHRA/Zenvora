import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { ServicesPage } from './pages/public/ServicesPage';
import { ProjectsPage } from './pages/public/ProjectsPage';
import { ProjectDetailPage } from './pages/public/ProjectDetailPage';
import { BlogPage } from './pages/public/BlogPage';
import { BlogDetailPage } from './pages/public/BlogDetailPage';
import { ContactPage } from './pages/public/ContactPage';
import { LoginPage } from './pages/public/LoginPage';
import { SignupPage } from './pages/public/SignupPage';
import { NotFoundPage, PrivacyPage, TermsPage } from './pages/public/StaticPages';

// Admin pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProjectsPage } from './pages/admin/AdminProjectsPage';
import { AdminProjectFormPage } from './pages/admin/AdminProjectFormPage';
import { AdminBlogPage } from './pages/admin/AdminBlogPage';
import { AdminBlogFormPage } from './pages/admin/AdminBlogFormPage';
import { AdminInquiriesPage } from './pages/admin/AdminInquiriesPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import {
  AdminServicesPage, AdminTestimonialsPage, AdminTeamPage,
  AdminMediaPage, AdminProfilePage,
} from './pages/admin/AdminMiscPages';

const router = createBrowserRouter([
  // ── Public ──
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/services', element: <ServicesPage /> },
      { path: '/projects', element: <ProjectsPage /> },
      { path: '/projects/:slug', element: <ProjectDetailPage /> },
      { path: '/blog', element: <BlogPage /> },
      { path: '/blog/:slug', element: <BlogDetailPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/privacy', element: <PrivacyPage /> },
      { path: '/terms', element: <TermsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  // ── Admin Login (standalone) ──
  { path: '/admin/login', element: <AdminLoginPage /> },
  // ── Admin (protected) ──
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: 'projects', element: <AdminProjectsPage /> },
      { path: 'projects/new', element: <AdminProjectFormPage /> },
      { path: 'projects/:id/edit', element: <AdminProjectFormPage /> },
      { path: 'blog', element: <AdminBlogPage /> },
      { path: 'blog/new', element: <AdminBlogFormPage /> },
      { path: 'blog/:id/edit', element: <AdminBlogFormPage /> },
      { path: 'services', element: <AdminServicesPage /> },
      { path: 'testimonials', element: <AdminTestimonialsPage /> },
      { path: 'inquiries', element: <AdminInquiriesPage /> },
      { path: 'team', element: <AdminTeamPage /> },
      { path: 'media', element: <AdminMediaPage /> },
      { path: 'settings', element: <AdminSettingsPage /> },
      { path: 'profile', element: <AdminProfilePage /> },
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <RouterProvider router={router} />
      </SettingsProvider>
    </AuthProvider>
  );
}
