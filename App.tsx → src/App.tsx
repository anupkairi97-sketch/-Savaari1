import { useState, useEffect } from 'react';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { PhoneScreen } from './screens/PhoneScreen';
import { PassengerProfileScreen } from './screens/PassengerProfileScreen';
import { DriverProfileScreen } from './screens/DriverProfileScreen';
import { PassengerBookingScreen } from './screens/PassengerBookingScreen';
import { DriverDashboardScreen } from './screens/DriverDashboardScreen';
import { Language, Profile } from './types';

export default function App() {
  const [screen, setScreen] = useState<string>('welcome');
  const [lang, setLang] = useState<Language>('en');
  const [role, setRole] = useState<'passenger' | 'driver' | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Load session persistence on mount
  useEffect(() => {
    const saved = localStorage.getItem('savaari_profile');
    if (saved) {
      try {
        const p: Profile = JSON.parse(saved);
        setProfile(p);
        setRole(p.role);
        setScreen(p.role === 'passenger' ? 'passenger_booking' : 'driver_dashboard');
      } catch (e) {
        console.error("Failed to restore session profile:", e);
      }
    }
  }, []);

  // Sync dark mode configuration with index.html root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [darkMode]);

  const handleRoleSelect = (selectedRole: 'passenger' | 'driver') => {
    setRole(selectedRole);
    setScreen('phone');
  };

  const handlePhoneVerified = (phone: string) => {
    if (role === 'passenger') {
      setScreen('passenger_profile');
    } else {
      setScreen('driver_profile');
    }
    // Update temporary profile with verified phone
    setProfile(prev => ({
      name: prev?.name || '',
      phone,
      role: role || 'passenger',
      createdAt: prev?.createdAt || new Date().toISOString()
    }));
  };

  const handleProfileSave = (savedProfile: Profile) => {
    setProfile(savedProfile);
    setScreen(savedProfile.role === 'passenger' ? 'passenger_booking' : 'driver_dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('savaari_profile');
    setProfile(null);
    setRole(null);
    setScreen('welcome');
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-[480px] bg-slate-50 text-slate-900 shadow-2xl dark:bg-[#0F0F1A] dark:text-white transition-colors duration-300">
      {screen === 'welcome' && (
        <WelcomeScreen
          onSelectRole={handleRoleSelect}
          lang={lang}
          setLang={setLang}
        />
      )}
      {screen === 'phone' && (
        <PhoneScreen
          onVerified={handlePhoneVerified}
          lang={lang}
          role={role}
          onBack={() => setScreen('welcome')}
        />
      )}
      {screen === 'passenger_profile' && (
        <PassengerProfileScreen
          onSave={handleProfileSave}
          lang={lang}
          phone={profile?.phone || ''}
        />
      )}
      {screen === 'driver_profile' && (
        <DriverProfileScreen
          onSave={handleProfileSave}
          lang={lang}
          phone={profile?.phone || ''}
        />
      )}
      {screen === 'passenger_booking' && (
        <PassengerBookingScreen
          profile={profile}
          lang={lang}
          onLogout={handleLogout}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}
      {screen === 'driver_dashboard' && (
        <DriverDashboardScreen
          profile={profile}
          lang={lang}
          onLogout={handleLogout}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}
    </div>
  );
}
