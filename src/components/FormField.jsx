import React from 'react'
import '../style/FormStyle.css'
const Formfield = ({ label, type = 'text', value, onChange, name, error, onFocus }) => {

  return (
    <div className="form-field">
      <label className="form-field-label" htmlFor={name}>{label}</label>
      <input
        className={`form-field-input ${error ? 'error-input' : ''}`}
        type={type}
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        placeholder={error ? error : ''}
        onFocus={onFocus}

      />

    </div>
  )
}

export default Formfield;