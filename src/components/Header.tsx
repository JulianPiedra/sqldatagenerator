import { useEffect, useState } from 'react';
import logo from '../assets/sqldatagenerator.svg';
import '../css/Header.css';
import { Link } from "react-router-dom";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false); // State to track if page is scrolled
    // Effect to handle scroll event and update the state
    useEffect(() => {
        // Function to check scroll position and update isScrolled state
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true); // Set to true if page is scrolled down
            } else {
                setIsScrolled(false); // Set to false if at the top of the page
            }
        };

        window.addEventListener("scroll", handleScroll); // Add scroll event listener
        return () => {
            window.removeEventListener("scroll", handleScroll); // Clean up event listener on component unmount
        };
    }, []);

    return (
        <>

            <nav className={`header ${isScrolled ? "scrolled" : ""}`} >  {/* Add scrolled class when page is scrolled */}
                <Link to="/" className='link'>
                    <img src={logo} alt="logo" className='logo' />
                </Link>
                <ul className='links'>
                    <li>
                        <a href='https://sqldatageneratorapi.runasp.net/swagger/index.html' className='link' target="_blank">API</a>
                    </li>
                    <li>
                        <a href='https://github.com/JulianPiedra/sqldatagenerator' className='link' target="_blank">Github</a>
                    </li>
                    <li>
                        <Link to="/data-generation" className='link'>Start Generating</Link>
                    </li>
                </ul>
            </nav>
        </>

    );
}
