import React, { useState } from 'react';

const ImageUploader = ({ setvalid, setimage ,classN,divClass}) => {

    const handleImageChange = (e) => {
        const file = e.target.files[0];
      
            if (file) {
                const reader = new FileReader();

                reader.onloadend = () => {
                    // When the reader is done reading the file, set the base64 data to the state
                    setimage(reader.result);
                };

                // Read the file as a data URL, which will convert the image to base64
                reader.readAsDataURL(file);
            }
        

      
    }
    return (
        <div className={divClass}>
            <input type="file" accept="image/*" className={classN} onChange={handleImageChange} />
        </div>
    );
};

export default ImageUploader;