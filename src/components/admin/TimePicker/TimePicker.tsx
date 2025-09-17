import './TimePicker.css';

interface TimePickerProps {
  value: string;
  onChange: (newTime: string) => void;
  disabled?: boolean;
}

// ------------------- Constant Options -------------------
// Generate static arrays for the select options to avoid recalculating on every render.
const hourOptions = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
const minuteOptions = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));
const periodOptions = ['AM', 'PM'];

/**
 * A reusable component that provides a set of dropdowns for selecting a time.
 * It's composed of selects for hour, minute, and AM/PM.
 */
const TimePicker = ({ value, onChange, disabled = false }: TimePickerProps) => {
  // ------------------- State & Event Handling -------------------
  // Deconstruct the time string (e.g., "11:00 AM") into its constituent parts.
  const [time, period] = value.split(' ');
  const [hour, minute] = time.split(':');

  /**
   * Handles changes to any of the three select dropdowns.
   * It reconstructs the time string and calls the parent's onChange callback.
   */
  const handlePartChange = (part: 'hour' | 'minute' | 'period', newValue: string) => {
    let newHour = hour, newMinute = minute, newPeriod = period;
    if (part === 'hour') newHour = newValue;
    if (part === 'minute') newMinute = newValue;
    if (part === 'period') newPeriod = newValue;
    // Notify the parent component of the new combined time value.
    onChange(`${newHour}:${newMinute} ${newPeriod}`);
  };

  // ------------------- Render Method -------------------
  return (
    <div className="time-picker">
      {/* Group the hour and minute selects for better responsive layout control. */}
      <div className="time-picker-inputs">
        <select value={hour} onChange={(e) => handlePartChange('hour', e.target.value)} disabled={disabled}>
          {hourOptions.map(h => <option key={h} value={h}>{h}</option>)}
        </select>
        <span>:</span>
        <select value={minute} onChange={(e) => handlePartChange('minute', e.target.value)} disabled={disabled}>
          {minuteOptions.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>
      
      <div className="time-picker-period">
        <select value={period} onChange={(e) => handlePartChange('period', e.target.value)} disabled={disabled}>
          {periodOptions.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
    </div>
  );
};

export default TimePicker;