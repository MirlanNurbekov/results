import React, { useState, useEffect } from 'react';

// Data imports for demonstration
import CS11 from './Data/CS-11';
import CS12 from './Data/CS-12';
import CS13 from './Data/CS-13';
import CS14 from './Data/CS-14';
import CS15 from './Data/CS-15';
import CS16 from './Data/CS-16';

import CS21 from './Data/CS-21';
import CS22 from './Data/CS-22';
import CS23 from './Data/CS-23';
import CS24 from './Data/CS-24';
import CS25 from './Data/CS-25';

import CS31 from './Data/CS-31';

// Helper function to compute grade from score
function getGrade(score) {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  return 'F';
}

function App() {
  // ========================
  // 0) Block F12 and right-click
  // ========================
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e) => e.preventDefault();
    window.addEventListener('contextmenu', handleContextMenu);

    // Block F12 and other devtools shortcuts
    const handleKeyDown = (e) => {
      // Key codes vary by browser, but F12 is often 123
      // Also check typical combos: Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U etc.
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
      }
      // Block Ctrl+Shift+I (to open dev tools)
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
        e.preventDefault();
        e.stopPropagation();
      }
      // Block Ctrl+U (view source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup when component unmounts
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // ========================
  // 1) Manage Login State
  // ========================
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'boss' && password === 'SUboss') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Try again.');
    }
  };

  // ========================
  // 2) Navbar State
  // ========================
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle mobile dropdown
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // ========================
  // 3) Year and Group State
  //    By default -> Year 1, Group 1
  // ========================
  const [selectedYear, setSelectedYear] = useState(1);
  const [selectedGroup, setSelectedGroup] = useState(1);

  const handleYearChange = (year) => {
    setSelectedYear(year);
    // reset group to 1 whenever we change year
    setSelectedGroup(1);
    // close the menu on small screens
    setMenuOpen(false);
  };

  const handleGroupChange = (group) => {
    setSelectedGroup(group);
    setMenuOpen(false);
  };

  // ========================
  // 4) Prepare data based on
  //    year & group
  // ========================
  let dataToDisplay = [];
  // We also need to know how many groups exist in each year
  const year1Groups = [1, 2, 3, 4, 5, 6];
  const year2Groups = [1, 2, 3, 4, 5];
  const year3Groups = [1]; // only 1 group

  // pick the correct array based on year/group
  if (selectedYear === 1) {
    switch (selectedGroup) {
      case 1: dataToDisplay = CS11; break;
      case 2: dataToDisplay = CS12; break;
      case 3: dataToDisplay = CS13; break;
      case 4: dataToDisplay = CS14; break;
      case 5: dataToDisplay = CS15; break;
      case 6: dataToDisplay = CS16; break;
      default: dataToDisplay = CS11; break;
    }
  } else if (selectedYear === 2) {
    switch (selectedGroup) {
      case 1: dataToDisplay = CS21; break;
      case 2: dataToDisplay = CS22; break;
      case 3: dataToDisplay = CS23; break;
      case 4: dataToDisplay = CS24; break;
      case 5: dataToDisplay = CS25; break;
      default: dataToDisplay = CS21; break;
    }
  } else if (selectedYear === 3) {
    // only one group
    dataToDisplay = CS31;
  }

  // ========================
  // 5) Table Rendering
  //    - If year 1 => WebDev only
  //    - If year 2 or 3 => both WebDev & Python
  // ========================
  const renderTable = () => {
    if (selectedYear === 1) {
      return (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Web Development Score</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {dataToDisplay.map((student, index) => {
              const grade = getGrade(student.webdev);
              return (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.webdev}</td>
                  <td>{grade}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    } else {
      // Year 2 or 3 (both webdev and python)
      return (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Web Development Score</th>
              <th>WebDev Grade</th>
              <th>Python Score</th>
              <th>Python Grade</th>
            </tr>
          </thead>
          <tbody>
            {dataToDisplay.map((student, index) => {
              const gradeWeb = getGrade(student.webdev);
              const gradePy = getGrade(student.python);
              return (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.webdev}</td>
                  <td>{gradeWeb}</td>
                  <td>{student.python}</td>
                  <td>{gradePy}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  };

  // ========================
  // 6) Login Page vs Main Page
  // ========================
  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <h2>Login</h2>
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  // If logged in, show main
  return (
    <div className="app-container">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-logo">Marks Display</div>
        
        {/* Normal nav links (only show on desktop) */}
        <div className="nav-links">
          {/* Year Buttons */}
          <button onClick={() => handleYearChange(1)}>Year 1</button>
          <button onClick={() => handleYearChange(2)}>Year 2</button>
          <button onClick={() => handleYearChange(3)}>Year 3</button>
          
          {/* Group Buttons 
              We only show groups relevant for the chosen year
          */}
          {selectedYear === 1 && year1Groups.map((grp) => (
            <button 
              key={grp} 
              onClick={() => handleGroupChange(grp)}
            >
              Group {grp}
            </button>
          ))}
          {selectedYear === 2 && year2Groups.map((grp) => (
            <button 
              key={grp}
              onClick={() => handleGroupChange(grp)}
            >
              Group {grp}
            </button>
          ))}
          {selectedYear === 3 && year3Groups.map((grp) => (
            <button 
              key={grp} 
              onClick={() => handleGroupChange(grp)}
            >
              Group {grp}
            </button>
          ))}
        </div>

        {/* Burger button (visible on mobile) */}
        <button className="burger-button" onClick={toggleMenu}>
          &#9776; {/* hamburger icon */}
        </button>
      </nav>

      {/* Mobile dropdown menu if menuOpen */}
      {menuOpen && (
        <div className="dropdown-menu">
          <div>
            <strong>Select Year:</strong>
          </div>
          <button onClick={() => handleYearChange(1)}>Year 1</button>
          <button onClick={() => handleYearChange(2)}>Year 2</button>
          <button onClick={() => handleYearChange(3)}>Year 3</button>

          <div style={{ marginTop: '1rem' }}>
            <strong>Select Group:</strong>
          </div>
          {selectedYear === 1 && year1Groups.map((grp) => (
            <button key={grp} onClick={() => handleGroupChange(grp)}>
              Group {grp}
            </button>
          ))}
          {selectedYear === 2 && year2Groups.map((grp) => (
            <button key={grp} onClick={() => handleGroupChange(grp)}>
              Group {grp}
            </button>
          ))}
          {selectedYear === 3 && year3Groups.map((grp) => (
            <button key={grp} onClick={() => handleGroupChange(grp)}>
              Group {grp}
            </button>
          ))}
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="main-content">
        <h2>
          Year {selectedYear} - Group {selectedGroup}
        </h2>
        {renderTable()}
      </div>
    </div>
  );
}

export default App;
