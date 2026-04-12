import React, { useState } from 'react';
import { Lightbulb, X } from 'lucide-react';
import './FilterSidebar.css';

const FilterSidebar = ({ onFilterChange, onClearAll }) => {
  const [employmentType, setEmploymentType] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState([]);
  const [salaryRange, setSalaryRange] = useState([0, 200000]);

  const handleEmploymentTypeChange = (type) => {
    const updated = employmentType.includes(type)
      ? employmentType.filter((t) => t !== type)
      : [...employmentType, type];
    setEmploymentType(updated);
    onFilterChange({
      employmentType: updated,
      experienceLevel,
      salaryRange,
    });
  };

  const handleExperienceLevelChange = (level) => {
    const updated = experienceLevel.includes(level)
      ? experienceLevel.filter((l) => l !== level)
      : [...experienceLevel, level];
    setExperienceLevel(updated);
    onFilterChange({
      employmentType,
      experienceLevel: updated,
      salaryRange,
    });
  };

  const handleSalaryChange = (e) => {
    const newValue = parseInt(e.target.value || '0', 10);
    const index = e.target.dataset.index;
    const updated =
      index === '0'
        ? [newValue, salaryRange[1]]
        : [salaryRange[0], newValue];
    setSalaryRange(updated);
    onFilterChange({
      employmentType,
      experienceLevel,
      salaryRange: updated,
    });
  };

  const handleClearAll = () => {
    setEmploymentType([]);
    setExperienceLevel([]);
    setSalaryRange([0, 200000]);
    onClearAll();
  };

  const isDefaultState =
    employmentType.length === 0 &&
    experienceLevel.length === 0 &&
    salaryRange[0] === 0 &&
    salaryRange[1] === 200000;

  return (
    <aside className="filter-sidebar">
      <div className="filters-header">
        <h3>Filters</h3>
        <button
          className="clear-all-btn"
          onClick={handleClearAll}
          style={{ visibility: isDefaultState ? 'hidden' : 'visible' }}
        >
          <X size={16} /> Clear all
        </button>
      </div>

      <div className="filter-section">
        <h4 className="filter-title">EMPLOYMENT TYPE</h4>
        <div className="checkbox-group">
          {['Full-time', 'Contract', 'Part-time'].map((type) => (
            <label key={type} className="checkbox-label">
              <input
                type="checkbox"
                checked={employmentType.includes(type)}
                onChange={() => handleEmploymentTypeChange(type)}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4 className="filter-title">EXPERIENCE LEVEL</h4>
        <div className="checkbox-group">
          {['Entry Level', 'Intermediate', 'Senior / Executive'].map((level) => (
            <label key={level} className="checkbox-label">
              <input
                type="checkbox"
                checked={experienceLevel.includes(level)}
                onChange={() => handleExperienceLevelChange(level)}
              />
              <span>{level}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4 className="filter-title">SALARY RANGE</h4>
        <div className="salary-inputs">
          <input
            type="number"
            min="0"
            max="200000"
            value={salaryRange[0]}
            onChange={handleSalaryChange}
            data-index="0"
            placeholder="Min"
            className="salary-input"
          />
          <span className="salary-separator">—</span>
          <input
            type="number"
            min="0"
            max="200000"
            value={salaryRange[1]}
            onChange={handleSalaryChange}
            data-index="1"
            placeholder="Max"
            className="salary-input"
          />
        </div>
        <div className="salary-display">
          ${salaryRange[0].toLocaleString()} — ${salaryRange[1].toLocaleString()}
        </div>
      </div>

      <div className="pro-tip-card">
        <div className="pro-tip-icon">
          <Lightbulb size={20} />
        </div>
        <div className="pro-tip-content">
          <h5>Pro Tip</h5>
          <p>
            Verified profiles receive 3x more invitations from premium
            employers.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
