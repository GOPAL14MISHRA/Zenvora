import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { SEO } from '../../components/SEO';

export function NotFoundPage() {
  return (
    <>
      <SEO title="404 – Page Not Found" />
      <div className="min-h-screen bg-[#F7F4EE] flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#E85D3F]/5 rounded-full blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center max-w-md"
        >
          <div className="text-8xl font-bold text-[#E85D3F] mb-4">404</div>
          <h1 className="text-2xl font-bold text-[#171717] mb-3">Looks Like You Took A Wrong Turn.</h1>
          <p className="text-[#5F5A52] mb-8">The page you're looking for doesn't exist or has been moved.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/" className="btn-primary">
              <Home size={15} /> Back Home
            </Link>
            <button onClick={() => window.history.back()} className="btn-secondary">
              <ArrowLeft size={15} /> Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export function PrivacyPage() {
  return (
    <>
      <SEO title="Privacy Policy" />
      <div className="min-h-screen bg-[#F7F4EE] pt-28 pb-20">
        <div className="container-custom max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-950 text-sm mb-8 transition-colors">
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">Privacy Policy</h1>
            <p className="text-slate-500 text-sm mb-8">Last updated: September 2026</p>
            <div className="prose-custom space-y-6 leading-relaxed">
              <p>This Privacy Policy describes how Zenvora Digital ("we," "us," or "our") collects, uses, and shares information about you when you use our website and services.</p>
              <h2>Information We Collect</h2>
              <p>We collect information you provide directly to us, such as when you submit a project inquiry through our contact form. This may include your name, email address, company name, phone number and project details.</p>
              <h2>How We Use Your Information</h2>
              <p>We use the information we collect to respond to your inquiries, communicate with you about potential projects, and improve our services.</p>
              <h2>Information Sharing</h2>
              <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law.</p>
              <h2>Data Security</h2>
              <p>We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.</p>
              <h2>Contact Us</h2>
              <p>If you have questions about this Privacy Policy, please contact us at mishragopal532a20@gmail.com.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export function TermsPage() {
  return (
    <>
      <SEO title="Terms & Conditions" />
      <div className="min-h-screen bg-[#F8FAFC] pt-28 pb-20">
        <div className="container-custom max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-950 text-sm mb-8 transition-colors">
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">Terms & Conditions</h1>
            <p className="text-slate-500 text-sm mb-8">Last updated: September 2026</p>
            <div className="prose-custom space-y-6 leading-relaxed">
              <p>By accessing and using the Zenvora Digital website, you agree to be bound by these Terms and Conditions.</p>
              <h2>Use of Website</h2>
              <p>You may use this website for lawful purposes only. You agree not to use this website in any way that could damage, disable, or impair the website or interfere with any other party's use of the website.</p>
              <h2>Intellectual Property</h2>
              <p>All content on this website, including text, graphics, logos, and images, is the property of Zenvora Digital and is protected by applicable intellectual property laws.</p>
              <h2>Project Inquiries</h2>
              <p>Submitting a project inquiry through our contact form does not constitute a binding agreement. All project engagements are subject to a separate written agreement.</p>
              <h2>Disclaimer</h2>
              <p>The information on this website is provided on an "as is" basis without any warranties of any kind. Zenvora Digital disclaims all warranties, express or implied.</p>
              <h2>Contact</h2>
              <p>For questions about these Terms, please contact us at mishragopal532a20@gmail.com.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
