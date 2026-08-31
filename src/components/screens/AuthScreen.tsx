import React, { useState, useEffect } from 'react';
import { ShieldCheck, Mail, Lock, Phone, User, ArrowLeft, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthScreenProps {
  initialMode?: 'login' | 'signup';
  onAuthSuccess?: (userData: { name: string; email: string; phone: string }) => void;
  onSuccess?: () => void;
  onBackToOnboarding?: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  initialMode = 'login',
  onAuthSuccess,
  onSuccess,
  onBackToOnboarding,
}) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'otp' | 'forgot_password'>(initialMode);
  
  // Form fields
  const [fullName, setFullName] = useState('Eleanor Vance');
  const [email, setEmail] = useState('eleanor.vance@example.com');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  
  // OTP state
  const [otpValues, setOtpValues] = useState(['4', '8', '2', '9']);
  const [otpTimer, setOtpTimer] = useState(45);
  const [isResending, setIsResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (mode === 'otp' && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [mode, otpTimer]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMode('otp');
    setOtpTimer(45);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMode('otp');
    setOtpTimer(45);
  };

  const completeAuth = () => {
    const data = {
      name: fullName || 'Eleanor Vance',
      email: email || 'eleanor.vance@example.com',
      phone: phone || '+1 (555) 234-5678'
    };
    if (onAuthSuccess) onAuthSuccess(data);
    if (onSuccess) onSuccess();
  };

  const handleOtpVerify = () => {
    completeAuth();
  };

  const handleResendOtp = () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setOtpTimer(45);
    }, 800);
  };

  const handleDemoQuickLogin = () => {
    completeAuth();
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8F9F8] text-[#1A1C1A] min-h-[700px] overflow-y-auto">
      {/* Top Header */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            if (mode === 'otp' || mode === 'forgot_password') {
              setMode('login');
            } else if (onBackToOnboarding) {
              onBackToOnboarding();
            }
          }}
          className="w-8 h-8 rounded-full bg-white border border-[#E8EEE8] hover:bg-[#F2F4F2] active:scale-95 flex items-center justify-center text-[#1A1C1A] transition-all cursor-pointer"
        >
          <ArrowLeft size={16} />
        </button>

        {/* Demo Fast Login Helper */}
        <button
          type="button"
          onClick={handleDemoQuickLogin}
          className="text-xs font-semibold text-[#4E6E5D] bg-[#F2F4F2] border border-[#E8EEE8] px-3 py-1.5 rounded-full hover:bg-[#E8EEE8] transition-colors cursor-pointer"
        >
          Demo 1-Tap Login ⚡
        </button>
      </div>

      <div className="flex-1 px-6 py-4 flex flex-col justify-center max-w-sm mx-auto w-full">
        {/* Brand Icon Header */}
        <div className="mb-6">
          <div className="w-11 h-11 rounded-xl bg-[#4E6E5D] flex items-center justify-center text-white shadow-xs mb-3">
            <ShieldCheck size={22} />
          </div>
          
          <AnimatePresence mode="wait">
            {mode === 'login' && (
              <motion.div
                key="login-header"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="text-xl font-bold text-[#1A1C1A] tracking-tight font-heading">
                  Welcome back
                </h1>
                <p className="text-xs text-neutral-500 mt-1">
                  Sign in to manage care bookings and messages.
                </p>
              </motion.div>
            )}

            {mode === 'signup' && (
              <motion.div
                key="signup-header"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="text-xl font-bold text-[#1A1C1A] tracking-tight font-heading">
                  Create your account
                </h1>
                <p className="text-xs text-neutral-500 mt-1">
                  Connect with verified caregivers in your neighborhood.
                </p>
              </motion.div>
            )}

            {mode === 'otp' && (
              <motion.div
                key="otp-header"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="text-xl font-bold text-[#1A1C1A] tracking-tight font-heading">
                  Verify your phone
                </h1>
                <p className="text-xs text-neutral-500 mt-1">
                  Enter the 4-digit code sent to <span className="font-semibold text-neutral-800">{phone}</span>
                </p>
              </motion.div>
            )}

            {mode === 'forgot_password' && (
              <motion.div
                key="forgot-header"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="text-xl font-bold text-[#1A1C1A] tracking-tight font-heading">
                  Reset Password
                </h1>
                <p className="text-xs text-neutral-500 mt-1">
                  Enter your email or phone to receive a reset code.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Forms */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Phone Number or Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <Mail size={16} />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-[#E8EEE8] text-xs text-[#1A1C1A] focus:outline-none focus:ring-1 focus:ring-[#4E6E5D] transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-neutral-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setMode('forgot_password')}
                  className="text-xs font-semibold text-[#4E6E5D] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-[#E8EEE8] text-xs text-[#1A1C1A] focus:outline-none focus:ring-1 focus:ring-[#4E6E5D] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 rounded-xl bg-[#4E6E5D] hover:bg-[#3E584A] active:scale-[0.98] text-white font-semibold text-xs shadow-xs transition-all cursor-pointer"
            >
              Sign In
            </button>

            {/* Social Separator */}
            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E8EEE8]" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-[#F8F9F8] text-neutral-400 text-[11px]">or continue with</span>
              </div>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleDemoQuickLogin}
                className="py-2 px-3 rounded-xl border border-[#E8EEE8] bg-white hover:bg-[#F2F4F2] flex items-center justify-center gap-2 text-xs font-semibold text-[#1A1C1A] transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={handleDemoQuickLogin}
                className="py-2 px-3 rounded-xl border border-[#E8EEE8] bg-white hover:bg-[#F2F4F2] flex items-center justify-center gap-2 text-xs font-semibold text-[#1A1C1A] transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current text-[#1A1C1A]" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.64 1.35-.58.65-1.08 1.72-.94 2.74 1.01.08 2.03-.49 2.65-1.24z"/>
                </svg>
                <span>Apple</span>
              </button>
            </div>

            {/* Switch to Signup */}
            <div className="text-center pt-2">
              <span className="text-xs text-neutral-500">Don’t have an account? </span>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-xs font-semibold text-[#4E6E5D] hover:underline cursor-pointer"
              >
                Create Account
              </button>
            </div>
          </form>
        )}

        {mode === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  required
                  className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-white border border-[#E8EEE8] text-xs text-[#1A1C1A] focus:outline-none focus:ring-1 focus:ring-[#4E6E5D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <Phone size={16} />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  required
                  className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-white border border-[#E8EEE8] text-xs text-[#1A1C1A] focus:outline-none focus:ring-1 focus:ring-[#4E6E5D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-white border border-[#E8EEE8] text-xs text-[#1A1C1A] focus:outline-none focus:ring-1 focus:ring-[#4E6E5D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                  <Lock size={16} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  required
                  className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-white border border-[#E8EEE8] text-xs text-[#1A1C1A] focus:outline-none focus:ring-1 focus:ring-[#4E6E5D]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 rounded-xl bg-[#4E6E5D] hover:bg-[#3E584A] active:scale-[0.98] text-white font-semibold text-xs shadow-xs transition-all cursor-pointer"
            >
              Continue to Verification
            </button>

            <div className="text-center pt-1.5">
              <span className="text-xs text-neutral-500">Already have an account? </span>
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-xs font-semibold text-[#4E6E5D] hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </form>
        )}

        {mode === 'otp' && (
          <div className="space-y-4">
            {/* 4 Digit OTP boxes */}
            <div className="flex items-center justify-center gap-2.5 py-2">
              {otpValues.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const newOtp = [...otpValues];
                    newOtp[index] = e.target.value;
                    setOtpValues(newOtp);
                  }}
                  className="w-12 h-12 text-center text-lg font-bold text-[#1A1C1A] bg-white border border-[#E8EEE8] rounded-xl focus:border-[#4E6E5D] focus:outline-none transition-all shadow-xs"
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-[#4E6E5D] font-medium hover:underline cursor-pointer"
              >
                Change Phone Number
              </button>

              {otpTimer > 0 ? (
                <span>Resend code in <strong className="text-[#1A1C1A]">{otpTimer}s</strong></span>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isResending}
                  className="text-[#4E6E5D] font-semibold hover:underline cursor-pointer"
                >
                  {isResending ? 'Sending...' : 'Resend Code'}
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleOtpVerify}
              className="w-full py-3 px-4 rounded-xl bg-[#4E6E5D] hover:bg-[#3E584A] active:scale-[0.98] text-white font-semibold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 size={16} />
              <span>Verify & Continue</span>
            </button>
          </div>
        )}

        {mode === 'forgot_password' && (
          <div className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Registered Email or Phone
              </label>
              <input
                type="text"
                defaultValue="eleanor.vance@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E8EEE8] text-xs text-[#1A1C1A] focus:outline-none focus:ring-1 focus:ring-[#4E6E5D]"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setMode('otp');
                setOtpTimer(45);
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#4E6E5D] hover:bg-[#3E584A] text-white font-semibold text-xs shadow-xs transition-all cursor-pointer"
            >
              Send Reset Code
            </button>

            <button
              type="button"
              onClick={() => setMode('login')}
              className="w-full text-center text-xs font-semibold text-neutral-500 hover:text-[#1A1C1A] py-1 cursor-pointer"
            >
              Back to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
