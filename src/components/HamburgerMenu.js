import React, { useState } from 'react';

const HamburgerMenu = ({ locations, saveLocation, removeLocation, selectSavedLocation }) => {
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

    return (
        <div className="hamburger-menu">
            <button onClick={() => setMenuOpen(!menuOpen)}>☰</button>

            {menuOpen && (
                <div className="menu-content">
                    <h3>Saved Locations</h3>

                    <ul className="location-list">
                        {/* create a list of saved locations from local storage using a map and display each within a button tag which upon click loads the saved location */}
                        {locations.length > 0 ? locations.map((location, index) => (
                            <li key={index}>
                                <button className="location-button" onClick={() => {selectSavedLocation(location); setMenuOpen(false)}}>{location}</button>
                                {/* add a remove button for each list item */}
                                <button className="remove-button" onClick={() => removeLocation(location)}>X</button> 
                            </li>
                        )) : (
                            <li>No saved locations</li>
                        )}
                    </ul>

                    <form onSubmit={handleSubmit}>
                        <input type='text' placeholder='Add a location' value={city} onChange={handleInputChange} />
                        <button type="submit">Add</button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default HamburgerMenu;
