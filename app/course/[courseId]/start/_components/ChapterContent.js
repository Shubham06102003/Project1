import React from 'react';
import YouTube from 'react-youtube';
import ReactMarkdown from 'react-markdown';
import { CopyToClipboard } from 'react-copy-to-clipboard'; // Import the CopyToClipboard component
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import { FaClipboard } from 'react-icons/fa'; // Clipboard icon from react-icons
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const opts = {
    height: '390',
    width: '640',
    playerVars: {
        autoplay: 0,
    },
};

// Utility function to decode HTML entities
function decodeHtmlEntity(str) {
    const doc = new DOMParser().parseFromString(str, 'text/html');
    return doc.documentElement.textContent || str;
}

function ChapterContent({ chapter, content }) {
    console.log(chapter);

    // Handle successful copy action (showing a toast)
    const handleCopy = () => {
        toast.success('Copied to clipboard!'); // Show toast on successful copy
    };

    return (
        <div className="p-10 relative">
            {/* Button to redirect to the dashboard */}
            <a
                href="/dashboard" // Redirect to /dashboard
                className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow-md hover:bg-blue-600"
            >
                Dashboard
            </a>

            <h2 className="font-medium text-2xl">{chapter?.name}</h2>
            <p className="text-gray-500">{chapter?.about}</p>

            {/* Video */}
            <div className="flex justify-center my-6">
                <YouTube videoId={content?.videoId} opts={opts} />
            </div>

            {/* Content */}
            <div>
                {content?.content?.description?.map((item, index) => (
                    <div key={index} className="p-5 bg-purple-50 shadow-sm mb-3 rounded-lg">
                        <h2 className="font-medium text-2xl">{item.heading}</h2>
                        <ReactMarkdown className="text-lg text-black leading-9">
                            {item.content}
                        </ReactMarkdown>

                        {/* Code Block */}
                        {item.code && (
                            <div className="relative">
                                {/* Copy button with clipboard icon */}
                                <CopyToClipboard
                                    text={decodeHtmlEntity(item.code.replace('<precode>', '').replace('</precode>', ''))}
                                    onCopy={handleCopy}
                                >
                                    <button className="absolute top-2 right-2 p-2 bg-gray-300 text-gray-700 rounded-md shadow-md hover:bg-gray-400">
                                        <FaClipboard className="text-xl" />
                                    </button>
                                </CopyToClipboard>

                                {/* Code Block */}
                                <div className="p-4 bg-black text-white rounded-md mt-3">
                                    <pre>
                                        <code>{decodeHtmlEntity(item.code.replace('<precode>', '').replace('</precode>', ''))}</code>
                                    </pre>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Toast Container */}
            <ToastContainer />
        </div>
    );
}

export default ChapterContent;
