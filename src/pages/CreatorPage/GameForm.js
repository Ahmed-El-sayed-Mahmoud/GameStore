// GameForm.js
import ImageUploader from '../../Componenet/Image/image'
import React, { useState } from 'react';
import './css/game_form.css';

const GameForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    minAge: '',
    description: '',
    image:' '
  });
  const setImage=(text)=>
  {
    setFormData((prevData) => ({
      ...prevData,
      image: text,
    }));
  }
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState(null);
  const[formMessage,setFormMessage]=useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear the specific error when the user starts typing in a field
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form fields
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.price.trim()) {
      errors.price = 'Price is required';
    }
    if (!formData.minAge.trim()) {
      errors.minAge = 'Minimum Age is required';
    }

    if (Object.keys(errors).length === 0) {
      // No errors, submit the form
      const res= await onSubmit(formData);
      console.log(res['text']);
      setFormMessage(res['text']);
      setFormStatus(res['status']);
    } else {
      // Set errors to display to the user
      setFormErrors(errors);
    }
  };

  return (
    <div className="game-form-container">
      <h1 className="form-header">Add New Game</h1>
      <form className="game-form" onSubmit={handleSubmit}>
        <label>
          Game Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={formErrors.name ? 'input-error' : ''}
            required
          />
        </label>

        <label>
          Price ($):
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            max="3000"
            className={formErrors.price ? 'input-error' : ''}
            required
          />
        </label>

        <label>
          Minimum Age:
          <input
            type="number"
            name="minAge"
            value={formData.minAge}
            onChange={handleChange}
            min="0"
            max="18"
            className={formErrors.minAge ? 'input-error' : ''}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={formErrors.description ? 'input-error' : ''}
            required
          />
        </label>

        <label>
          Upload Image:
          <ImageUploader setimage={setImage}/>
        </label>

        <button type="submit">Add Game</button>

        {/* Display error messages */}
        {formErrors.name && (
          <span className="error-message">{formErrors.name}</span>
        )}
        {formErrors.price && (
          <span className="error-message">{formErrors.price}</span>
        )}
        {formErrors.minAge && (
          <span className="error-message">{formErrors.minAge}</span>
        )}
        {formStatus === 'added' && (
          <span className="form-success-message">{formMessage}</span>
        )}
        {formStatus === 'failed' && (
          <span className="form-error-message">{formMessage}</span>
        )}
      </form>
    </div>
  );
};

export default GameForm;
