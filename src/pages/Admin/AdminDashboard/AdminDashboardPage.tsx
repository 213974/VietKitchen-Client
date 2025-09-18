import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import isEqual from 'lodash.isequal';
import { useStoreInfo } from '../../../hooks/useStoreInfo';
import { useDashboardStats } from '../../../hooks/useDashboardStats';
import ConfirmationModal from '../../../components/common/ConfirmationModal/ConfirmationModal';
import './AdminDashboardPage.css';

const availableThemes = [
  { value: 'default', name: 'Default (Mint & Green)', colors: { bg: '#f0f7f5', text: '#2a4b42', accent: '#3e8a78' } },
  { value: 'valentines', name: 'Valentines (Pink & Red)', colors: { bg: '#fff5f8', text: '#6d2243', accent: '#e53982' } },
  { value: 'stpatricks', name: 'St. Patrick\'s (Green)', colors: { bg: '#f0fbf3', text: '#1a3c1f', accent: '#16a34a' } },
  { value: 'halloween', name: 'Halloween (Orange & Black)', colors: { bg: '#1a1a1a', text: '#e5e5e5', accent: '#f97316' } },
  { value: 'thanksgiving', name: 'Thanksgiving (Brown & Amber)', colors: { bg: '#fef7f2', text: '#5c3d2e', accent: '#d97706' } },
  { value: 'christmas', name: 'Christmas (Red & Cream)', colors: { bg: '#f8fbf7', text: '#3e4a3e', accent: '#c51d1d' } },
];

const ThemePalette = ({ themeValue }: { themeValue: string }) => {
  const theme = availableThemes.find(t => t.value === themeValue);
  if (!theme) return null;
  
  return (
    <div className="theme-palette">
      <div className="palette-color" style={{ backgroundColor: theme.colors.bg }} title={`Background: ${theme.colors.bg}`} />
      <div className="palette-color" style={{ backgroundColor: theme.colors.text }} title={`Text: ${theme.colors.text}`} />
      <div className="palette-color" style={{ backgroundColor: theme.colors.accent }} title={`Accent: ${theme.colors.accent}`} />
    </div>
  );
};

const AdminDashboardPage = () => {
  const { 
    activeTheme, 
    phoneNumber, 
    updateStoreDetails, 
    isLoading: isStoreInfoLoading 
  } = useStoreInfo();
  
  const { stats, isLoading: isStatsLoading, error: statsError } = useDashboardStats();
  
  const [formData, setFormData] = useState({ theme: activeTheme, phone: phoneNumber });
  const [pristineData, setPristineData] = useState({ theme: activeTheme, phone: phoneNumber });
  const [status, setStatus] = useState({ message: '', type: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isStoreInfoLoading) {
      const initialData = { theme: activeTheme, phone: phoneNumber };
      setFormData(initialData);
      setPristineData(initialData);
    }
  }, [activeTheme, phoneNumber, isStoreInfoLoading]);

  const hasChanges = useMemo(() => !isEqual(formData, pristineData), [formData, pristineData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmSave = async () => {
    setIsModalOpen(false);
    setStatus({ message: 'Saving...', type: 'loading' });
    const success = await updateStoreDetails({
      active_theme: formData.theme,
      phone_number: formData.phone,
    });
    if (success) {
      setStatus({ message: 'Changes saved successfully!', type: 'success' });
      setPristineData(formData);
    } else {
      setStatus({ message: 'Failed to save changes. Please try again.', type: 'error' });
    }
  };

  const handleUndoChanges = () => {
    setFormData(pristineData);
    setStatus({ message: '', type: '' });
  };

  return (
    <>
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Confirm Dashboard Changes"
        onConfirm={handleConfirmSave}
        onCancel={() => setIsModalOpen(false)}
      >
        <div className="dashboard-preview-wrapper">
            <div className="preview-section">
                <h4>Before</h4>
                <div className="preview-item">
                    <span className="preview-label">Theme:</span>
                    <ThemePalette themeValue={pristineData.theme} />
                </div>
                <div className="preview-item">
                    <span className="preview-label">Phone:</span>
                    <span>{pristineData.phone}</span>
                </div>
            </div>
            <div className="preview-section">
                <h4>After</h4>
                <div className="preview-item">
                    <span className="preview-label">Theme:</span>
                    <ThemePalette themeValue={formData.theme} />
                </div>
                 <div className="preview-item">
                    <span className="preview-label">Phone:</span>
                    <span>{formData.phone}</span>
                </div>
            </div>
        </div>
      </ConfirmationModal>

      <motion.div 
        className="admin-dashboard-page"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>An overview of your website and quick settings.</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card stats-card">
            <h3>At a Glance</h3>
            {isStatsLoading && <p>Loading stats...</p>}
            {statsError && <p className="status-message error">{statsError}</p>}
            {stats && (
              <div className="stats-container">
                {/* CORRECTED: Removed the menuItemCount stat block */}
                <div className="stat-item">
                  <span className="stat-value">{stats.galleryImageCount}</span>
                  <span className="stat-label">Gallery Images</span>
                </div>
              </div>
            )}
          </div>

          <div className="dashboard-card settings-card">
            <h3>Quick Settings</h3>
            {isStoreInfoLoading ? <p>Loading settings...</p> : (
              <div className="settings-form">
                <div className="form-group">
                  <label htmlFor="theme-select">Active Website Theme</label>
                  <select 
                    id="theme-select" 
                    name="theme" 
                    value={formData.theme} 
                    onChange={handleInputChange}
                  >
                    {availableThemes.map(theme => (
                      <option key={theme.value} value={theme.value}>{theme.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="phone-input">Footer Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone-input" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange}
                    placeholder="(123) 456-7890"
                  />
                </div>

                {status.message && <p className={`status-message ${status.type}`}>{status.message}</p>}

                <div className="form-actions">
                  <button 
                    className="save-button" 
                    disabled={!hasChanges || status.type === 'loading'}
                    onClick={() => setIsModalOpen(true)}
                  >
                    {status.type === 'loading' ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button 
                    className="secondary-button" 
                    disabled={!hasChanges || status.type === 'loading'}
                    onClick={handleUndoChanges}
                  >
                    Undo
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AdminDashboardPage;