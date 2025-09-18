import { useState, useEffect, useMemo } from 'react';
import './UpdateHoursPage.css';
import { useStoreInfo, type OpeningHour } from '../../../hooks/useStoreInfo';
import { motion } from 'framer-motion';
import isEqual from 'lodash.isequal';
import ConfirmationModal from '../../../components/common/ConfirmationModal/ConfirmationModal';
import TimePicker from '../../../components/admin/TimePicker/TimePicker';
import HoursModal from '../../../components/common/HoursModal/HoursModal';

interface LocalOpeningHour extends OpeningHour {
  open: string;
  close: string;
  isClosed: boolean;
}

const parseTime = (timeStr: string): { open: string; close: string; isClosed: boolean } => {
  if (timeStr.toLowerCase() === 'closed') {
    return { open: '11:00 AM', close: '9:00 PM', isClosed: true };
  }
  const parts = timeStr.split('–').map(part => part.trim());
  return {
    open: parts[0] || '11:00 AM',
    close: parts[1] || '9:00 PM',
    isClosed: false,
  };
};

const combineTime = (day: LocalOpeningHour): OpeningHour => {
  return {
    day: day.day,
    _id: day._id,
    time: day.isClosed ? 'Closed' : `${day.open} – ${day.close}`,
  };
};

const UpdateHoursPage = () => {
  const { hours: initialHours, updateStoreHours, isLoading, error } = useStoreInfo();
  
  const [localHours, setLocalHours] = useState<LocalOpeningHour[]>([]);
  const [pristineHours, setPristineHours] = useState<LocalOpeningHour[]>([]);
  const [status, setStatus] = useState({ message: '', type: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasChanges = useMemo(() => !isEqual(pristineHours, localHours), [pristineHours, localHours]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges]);

  useEffect(() => {
    if (initialHours.length > 0) {
      const parsed = initialHours.map(h => ({ ...h, ...parseTime(h.time) }));
      setLocalHours(parsed);
      setPristineHours(JSON.parse(JSON.stringify(parsed)));
    }
  }, [initialHours]);

  const handleTimeChange = (index: number, field: 'open' | 'close', value: string) => {
    const updatedHours = [...localHours];
    updatedHours[index] = { ...updatedHours[index], [field]: value };
    setLocalHours(updatedHours);
  };

  const handleToggleClosed = (index: number, isChecked: boolean) => {
    const updatedHours = [...localHours];
    updatedHours[index] = { ...updatedHours[index], isClosed: isChecked };
    setLocalHours(updatedHours);
  };

  const handleUndo = () => setLocalHours(pristineHours);

  const handleSetDefault = () => {
    const defaultOpen = '11:00 AM';
    const defaultClose = '9:00 PM';
    const newHours = localHours.map(hour => ({ ...hour, open: defaultOpen, close: defaultClose, isClosed: false }));
    setLocalHours(newHours);
  };

  const handleConfirmSave = async () => {
    setStatus({ message: '', type: '' });
    const formattedForApi = localHours.map(combineTime);
    // CORRECTED: Pass the formatted data to the update function
    const success = await updateStoreHours(formattedForApi);

    if (success) {
      setStatus({ message: 'Store hours updated successfully!', type: 'success' });
      setPristineHours(localHours); // Update pristine state on success
    } else {
      setStatus({ message: 'Failed to update store hours. Please try again.', type: 'error' });
    }
    setIsModalOpen(false);
  };

  if (isLoading && initialHours.length === 0) return <div>Loading store hours...</div>;
  if (error) return <div className="status-message error">{error}</div>;

  return (
    <>
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Confirm Your Changes"
        onConfirm={handleConfirmSave}
        onCancel={() => setIsModalOpen(false)}
      >
        <div className="hours-preview-wrapper">
          <div className="hours-preview">
            <h4>Before</h4>
            <HoursModal hours={pristineHours.map(combineTime)} isLoading={false} isPreview={true} />
          </div>
          <div className="hours-preview">
            <h4>After</h4>
            <HoursModal hours={localHours.map(combineTime)} isLoading={false} isPreview={true} />
          </div>
        </div>
      </ConfirmationModal>
      <motion.div 
        className="update-hours-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1>Update Store Hours</h1>
        <p>Modify the opening hours below. The changes will be reflected live on your website.</p>
        
        <form className="hours-form" onSubmit={(e) => { e.preventDefault(); if(hasChanges) setIsModalOpen(true); }}>
          <div className="hours-list-admin">
            {localHours.map((hour, index) => {
              const isModified = !isEqual(hour, pristineHours[index]);
              return (
                <div className={`hour-row ${isModified ? 'is-modified' : ''}`} key={hour.day}>
                  <label>{hour.day}</label>
                  <div className="time-inputs">
                    <TimePicker value={hour.open} onChange={(newTime) => handleTimeChange(index, 'open', newTime)} disabled={hour.isClosed} />
                    <span>–</span>
                    <TimePicker value={hour.close} onChange={(newTime) => handleTimeChange(index, 'close', newTime)} disabled={hour.isClosed} />
                  </div>
                  <div className="closed-toggle">
                    <label>
                      <input type="checkbox" checked={hour.isClosed} onChange={(e) => handleToggleClosed(index, e.target.checked)} />
                      <span>Closed</span>
                    </label>
                  </div>
                </div>
              );
            })}
          </div>

          {status.message && <p className={`status-message ${status.type}`}>{status.message}</p>}

          <div className="form-actions">
            <button type="submit" className="save-button" disabled={!hasChanges || isLoading}>
              Save Changes
            </button>
            <button type="button" className="secondary-button" onClick={handleUndo} disabled={!hasChanges || isLoading}>
              Undo Changes
            </button>
            <button type="button" className="secondary-button" onClick={handleSetDefault} disabled={isLoading}>
              Reset to Default
            </button>
          </div>
        </form>
      </motion.div>
    </>
  );
};

export default UpdateHoursPage;