import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-200 text-gray-600 text-center shadow-inner px-6 py-4 w-full mt-auto">
            <div className="max-w-screen-xl mx-auto px-4">
                <p>&copy; {new Date().getFullYear()} TalentHive. All rights reserved.</p>
                <ul className="flex justify-center text-gray-500 space-x-6 mt-3">
                    <li><a href="/about" className="text-black hover:underline">About Us</a></li>
                    <li><a href="/contact" className="text-black hover:underline">Contact</a></li>
                    <li><a href="/privacy" className="text-black hover:underline">Privacy Policy</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;