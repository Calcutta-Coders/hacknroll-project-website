import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
export default function Upload() {
    const [uploading, setUploading] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [message, setMessage] = useState('Normal');
    const displayOverlay = () => {
        setShowOverlay(true);
    };

    const hideOverlay = () => {
        setShowOverlay(false);
    };

    const handleCloseUpSubmit = async (event) => {
        const selectedFiles = event.target.files;
        if (selectedFiles.length > 0) {
            await handleSubmit(selectedFiles, 'closeup');
        }
    };

     const handleFundusSubmit = async (event) => {
        const selectedFiles = event.target.files;
        if (selectedFiles.length > 0) {
            await handleSubmit(selectedFiles, 'fundus');
        }
    };


     const handleSubmit = async (files, type) => {
        const formData = new FormData();
        Array.from(files).forEach(file => formData.append('image', file));
        formData.append('type', type); // Append the image type 'fundus'

        setUploading(true);

        try {
            const response = await axios.post('https://mongo.api.xade.finance/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data); // Handle the response from the server
            setMessage(response.data.prediction)
            displayOverlay()

        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="wrapper">
            {showOverlay && (
                <div className="overlay">
                    <div className="message">
                        {message}
                    </div>
                    <button onClick={hideOverlay}> <FontAwesomeIcon
        icon={faArrowLeft}
        className=""
        // style={{ color: "white"}}
      /> </button>
                </div>
            )}

            <div>
<p style={{'textAlign': 'center', fontSize: '3rem', marginBottom: '2rem'}}>Close up</p>
  <div className="file-upload">
    
    <input type="file" onChange={handleCloseUpSubmit}/>
     {/* <main className={styles.main}> */}
      <FontAwesomeIcon
        icon={faArrowUp}
        className="fa fa-arrow-up"
        // style={{ color: "white"}}
      />
      {/* Check */}
    {/* </main> */}
  </div>
  </div>

  <div>
    <p style={{'textAlign': 'center', fontSize: '3rem', marginBottom: '2rem'}}>Fundus</p>

  <div className="file-upload">
    <input type="file" onChange={handleFundusSubmit}/>
     {/* <main className={styles.main}> */}
      <FontAwesomeIcon
        icon={faArrowUp}
        className="fa fa-arrow-up"
        // style={{ color: "white"}}
      />
      {/* Check */}
    {/* </main> */}
  </div>
  </div>
</div>


    );
}
