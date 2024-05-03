import React, { useState } from 'react';

function FileBrowser() {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        setSelectedFiles([...selectedFiles, ...event.target.files]);
    };

    const openFileInBrowser = (file) => {
        const fileUrl = URL.createObjectURL(file);
        window.open(fileUrl, '_blank');
    };

    return (
        <div>
            <input type="file" multiple onChange={handleFileChange} />
            {selectedFiles.length > 0 && (
                <div>
                    <p>Selected Files:</p>
                    <ul>
                        {selectedFiles.map((file, index) => (
                            <li key={index}>
                                {file.name}
                                <button onClick={() => openFileInBrowser(file)}>Open</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default FileBrowser;
