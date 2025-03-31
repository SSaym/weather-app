import React, { useState, useEffect } from 'react';
import './TFLData.css';

const TflStatus = ({activeLines = [] }) => {
    const [lineStatuses, setLineStatuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // Fetch line statuses from TFL API
    useEffect(() => {
      const fetchTflStatus = async () => {
        try {
          const response = await fetch("https://api.tfl.gov.uk/Line/Mode/tube,dlr,overground,elizabeth-line/Status");
          if (!response.ok) throw new Error("Failed to fetch line statuses");
          const data = await response.json();
          setLineStatuses(data);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };
  
      fetchTflStatus();
  
      // Refresh data every 60 seconds
      const interval = setInterval(fetchTflStatus, 60000);
      return () => clearInterval(interval);
    }, []);
  
    // Display error messages if need be
    if (loading) return <p className = "tfl-loading">Loading line statuses...</p>;
    if (error) return <p className = "tfl-error">Error: {error}</p>;

    // Filter shown statuses based only on selected lines
    const filteredStatuses = lineStatuses.filter(line => 
        activeLines.includes(line.id.toLowerCase().replace('line', '').replace(/\s+/g, '-'))
      );

    // Dispaly line statuses
    return (
      <div className="tfl-status">
        <h2>Line Statuses</h2>
        <div className="tfl-grid">
          {filteredStatuses.map((line) => (
            <div key={line.id} className = {`tfl-line-card ${line.id.toLowerCase().replace(/\s+/g, '-')}`}>
              <span className="status">{line.name}:</span> {line.lineStatuses[0].statusSeverityDescription}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default TflStatus;