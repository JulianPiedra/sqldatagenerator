import logo from '../assets/sqldatagenerator.svg';
import '../css/Header.css';
import { Link } from "react-router-dom";

export default function Header() {

    return (
        <>
            <div className="header">
                <nav className="navbar">
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
                            <Link to="/data-generation" className='link'>Documentation</Link>
                        </li>
                        <li>
                            <Link to="/data-generation" className='link'>Start Generating</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>

    );
}
