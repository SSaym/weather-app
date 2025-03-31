import React, { useState } from 'react';
import './HamburgerMenu.css';
import Plus from '../assets/add.png';
import Trash from '../assets/trash.png';

const HamburgerMenu = ({ locations, saveLocation, removeLocation, selectSavedLocation, activeLines, toggleLine }) => {
    const [menuOpen, setMenuOpen] = useState(false); // used to toggle menu
    const [city, setCity] = useState('') // used to add new city to the save locations

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    // adds a new city to the save locations (local storage)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (city && !locations.includes(city)) {
            saveLocation(city);
            setCity('')
        }
    };

    const lines = {
        'bakerloo': 'Bakerloo',
        'central': 'Central',
        'circle': 'Circle',
        'district': 'District',
        'dlr': 'DLR',
        'elizabeth': 'Elizabeth',
        'hammersmith-city': 'Hammersmith & City',
        'jubilee': 'Jubilee',
        'metropolitan': 'Metropolitan',
        'northern': 'Northern',
        'piccadilly': 'Piccadilly',
        'victoria': 'Victoria',
        'waterloo-city': 'Waterloo & City',
    };

    return (
        <div className="hamburger-menu">
            <button className={`hamburger-icon ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </button>

            {/* the menu is always rendered, but use css to control visibility */}
            <div className={`menu-content ${menuOpen ? 'open' : ''}`}>
                <h3>Saved Locations</h3>

                <ul className="location-list">
                    {/* create a list of saved locations from local storage using a map and display each within a button tag which upon click loads the saved location */}
                    {locations.length > 0 ? locations.map((location, index) => (
                        <li key={index}>
                            <div className="location-card">
                                <button className="location-button" onClick={() => {selectSavedLocation(location); setMenuOpen(false)}}>{location}</button>
                                {/* add a remove button for each list item */}
                                <button className="remove-button" onClick={() => removeLocation(location)}><img src={Trash} alt='trash icon' className='trash-icon'/></button> 
                            </div>
                        </li>
                    )) : (
                        <li>No saved locations yet...</li>
                    )}
                </ul>

                {/* input for adding a new location */}
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Add a location' value={city} onChange={handleInputChange} />
                    <button type="submit"><img src={Plus} alt='plus icon' className='plus-icon'/></button>
                </form>

                <hr className="dotted-divider" />
                <h3>Transport Lines</h3>
                <ul className="line-list">
                    {Object.entries(lines).map(([id, name]) => (
                        <li key={id}>
                            <div className="line-card">
                                <button 
                                    className={`line-toggle ${activeLines.includes(id) ? 'active' : ''}`}
                                    onClick={() => toggleLine(id)}
                                >
                                    {name}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            
        </div>
    )
}

export default HamburgerMenu;
