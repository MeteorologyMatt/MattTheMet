import React, { useState, useEffect } from 'react';
import '../assets/HurricaneSandy.css'; // Adjust the import path based on where you save the CSS

const HurricaneSandyPage = () => {
  const [modal, setModal] = useState({ isActive: false, src: '', alt: '' });

  // Handle modal opening
  const openModal = (src, alt) => {
    setModal({ isActive: true, src, alt });
  };

  // Handle modal closing
  const closeModal = () => {
    setModal({ isActive: false, src: '', alt: '' });
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="sandy-wrapper">
      <header className="sandy-header">
        <h1>Hurricane Sandy Weather Event Analysis</h1>
        <p>A Synoptic & Mesoscale Overview using Matplotlib and Cartopy</p>
        <p className="authors">Group 3: Noelle Davis, Matthew Lentz, Gabe Slade</p>
      </header>

      <main className="container">
        {/* Event Overview */}
        <section className="section">
          <h2 className="section-title">The Event: Hurricane Sandy (Oct 22 - Nov 1, 2012)</h2>
          <div className="section-content">
            <p>
              This dashboard provides a comprehensive meteorological analysis of the devastating
              Hurricane Sandy, chronicling its formation, unprecedented path, and complex transition
              into a powerful extratropical storm before US landfall.
            </p>
            <ul>
              <li><strong>October 22, 2012:</strong> Sandy forms as a tropical depression in the central Caribbean Sea.</li>
              <li><strong>October 24-25:</strong> Rapidly intensifies, becoming a Category 3 hurricane as it traverses Jamaica, eastern Cuba, and the Bahamas.</li>
              <li><strong>October 26-28:</strong> Sandy travels north-northeast, paralleling the US East Coast. Interacts with an upper-level trough, fueling its unique structure.</li>
              <li><strong>October 28-29:</strong> Instead of continuing out to sea, the storm takes an anomalous, sharp westward turn toward the Mid-Atlantic.</li>
              <li><strong>Landfall (Oct 29):</strong> Makes landfall near Atlantic City, NJ, in the evening as a post-tropical cyclone, having transitioned into a vast midlatitude low pressure system.</li>
            </ul>
          </div>
        </section>

        {/* MSLP and Winds */}
        <section className="section">
          <h2 className="section-title">Mean Sea Level Pressure & Winds Analysis</h2>
          <div className="section-content section-grid">
            <div>
              <h3>Key Observations:</h3>
              <ul>
                <li><strong>GIF:</strong> The animation vividly illustrates Sandy's pressure field evolution and the expansive wind field associated with the system.</li>
                <li><strong>Images:</strong> Static timesteps show the rapid pressure drop approaching landfall. GFS modeled MSLP below 950 mb, though model resolution underestimated maximum sustained winds.</li>
                <li><strong>Winds:</strong> Counterclockwise flow is well-defined, with increasing intensities near the core, despite resolution limits.</li>
              </ul>
            </div>
            <div className="visual-stack">
              <h3>Animation (GIF):</h3>
              <div className="single-visual">
                <img 
                  src="/Hurricane Sandy Analysis: Images and GIFs/GIFs/MSLP & Winds GIF.gif" 
                  alt="MSLP and Winds Animation"
                  onClick={(e) => openModal(e.target.src, e.target.alt)}
                />
              </div>
              <h3>Timestep Snapshots:</h3>
              <div className="image-grid">
                {['003', '006', '012', '018', '024', '027'].map((step) => (
                  <img 
                    key={step}
                    src={`/Hurricane Sandy Analysis: Images and GIFs/Images/mslp_winds_0600_${step}.png`} 
                    alt={`MSLP H+${step}`}
                    onClick={(e) => openModal(e.target.src, e.target.alt)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Geopotential Heights and Moisture */}
        <section className="section">
          <h2 className="section-title">Geopotential Heights & Moisture Dynamics</h2>
          <div className="section-content section-grid">
            <div>
              <h3>Atmospheric Structure:</h3>
              <ul>
                <li><strong>GIF:</strong> Shows the dynamic interaction between Sandy and an approaching upper-level trough, demonstrating the extratropical transition in real time.</li>
                <li><strong>Images:</strong> The deep upper-level low interacts with Sandy’s massive moisture plume, helping explain the westward turn and immense storm size.</li>
                <li><strong>Moisture & Heights:</strong> The moisture distribution shows Sandy’s immense scale, while the 540 dam line highlights the colder air involved in the system.</li>
              </ul>
            </div>
            <div className="visual-stack">
              <h3>Animation (GIF):</h3>
              <div className="single-visual">
                <img 
                  src="/Hurricane Sandy Analysis: Images and GIFs/GIFs/Sandy GH & Moisture.gif" 
                  alt="Geopotential Height and Moisture Animation"
                  onClick={(e) => openModal(e.target.src, e.target.alt)}
                />
              </div>
              <h3>Height & Moisture Timesteps:</h3>
              <div className="image-grid">
                {['003', '006', '012', '018', '024', '027'].map((step) => (
                  <img 
                    key={step}
                    src={`/Hurricane Sandy Analysis: Images and GIFs/Images/GeopotentialGFS_0600_${step}.png`} 
                    alt={`Geopotential H+${step}`}
                    onClick={(e) => openModal(e.target.src, e.target.alt)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Radar Reflectivity */}
        <section className="section">
          <h2 className="section-title">Radar Reflectivity & Precipitation Structure</h2>
          <div className="section-content section-grid">
            <div>
              <h3>Radar Perspective:</h3>
              <ul>
                <li><strong>GIF:</strong> Animates the radar evolution, highlighting the massive rain shield, strong convection, and asymmetric structure.</li>
                <li><strong>Images:</strong> Timesteps from 06z Oct 29 to 05z Oct 30 capture the core approaching and moving inland.</li>
                <li>The counterclockwise spin and lack of a traditional eye emphasize Sandy’s broad, transitioning structure.</li>
              </ul>
            </div>
            <div className="visual-stack">
              <h3>Animation (GIF):</h3>
              <div className="single-visual">
                <img 
                  src="/Hurricane Sandy Analysis: Images and GIFs/GIFs/Radar Reflectivity GIF.gif" 
                  alt="Radar Reflectivity Animation"
                  onClick={(e) => openModal(e.target.src, e.target.alt)}
                />
              </div>
              <h3>Key Radar Moments:</h3>
              <div className="image-grid">
                {[
                  { file: '1029_060303', alt: 'Oct 29 06z' },
                  { file: '1029_120246', alt: 'Oct 29 12z' },
                  { file: '1029_175907', alt: 'Oct 29 17z' },
                  { file: '1029_210138', alt: 'Oct 29 21z' },
                  { file: '1030_030148', alt: 'Oct 30 03z' },
                  { file: '1030_055815', alt: 'Oct 30 05z' }
                ].map((item) => (
                  <img 
                    key={item.file}
                    src={`/Hurricane Sandy Analysis: Images and GIFs/Images/Radar_${item.file}.png`} 
                    alt={`Radar ${item.alt}`}
                    onClick={(e) => openModal(e.target.src, e.target.alt)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Soundings */}
        <section className="section">
          <h2 className="section-title">Vertical Analysis: Soundings (KOKX - Brookhaven, NY)</h2>
          <div className="section-content">
            <p>
              Detailed vertical profile soundings provide crucial insights into the evolving atmospheric
              state at KOKX across landfall.
            </p>
            <div className="soundings-grid">
              <div>
                <h3>Pre-Landfall (Oct 29, 12z)</h3>
                <img 
                  src="/Hurricane Sandy Analysis: Images and GIFs/Images/okx_oct29_12z_sounding.png" 
                  alt="Sounding Oct 29 12z"
                  onClick={(e) => openModal(e.target.src, e.target.alt)}
                />
                <p className="caption">Environment 12 hours prior to landfall.</p>
              </div>
              <div>
                <h3>Around Landfall (Oct 30, 00z)</h3>
                <img 
                  src="/Hurricane Sandy Analysis: Images and GIFs/Images/okx_oct30_0z_sounding.png" 
                  alt="Sounding Oct 30 00z"
                  onClick={(e) => openModal(e.target.src, e.target.alt)}
                />
                <p className="caption">Environment around the time of landfall.</p>
              </div>
              <div>
                <h3>Post-Landfall (Oct 30, 12z)</h3>
                <img 
                  src="/Hurricane Sandy Analysis: Images and GIFs/Images/okx_oct30_12z_sounding.png" 
                  alt="Sounding Oct 30 12z"
                  onClick={(e) => openModal(e.target.src, e.target.alt)}
                />
                <p className="caption">Environment 12 hours following landfall.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Meteogram */}
        <section className="section">
          <h2 className="section-title">Atlantic City, NJ Buoy Data Meteogram</h2>
          <div className="section-content section-grid">
            <div>
              <h3>Surface Observations:</h3>
              <ul>
                <li><strong>Meteogram:</strong> Tracks critical surface parameters leading up to and through landfall.</li>
                <li><strong>Pressure:</strong> The dramatic pressure drop is a signature of Sandy’s powerful low-pressure system.</li>
                <li><strong>Temperature:</strong> The post-landfall temperature drop is consistent with extratropical transition and colder air intrusion.</li>
              </ul>
            </div>
            <div className="visual-stack">
              <h3>Atlantic City Buoy Station ACYN4:</h3>
              <div className="single-visual">
                <img 
                  src="/Hurricane Sandy Analysis: Images and GIFs/Images/Buoy Station ACYN4 Meteogram.png" 
                  alt="Atlantic City Buoy Meteogram"
                  onClick={(e) => openModal(e.target.src, e.target.alt)}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="sandy-footer">
        <p>&copy; 2026 - Hurricane Sandy Analysis | Noelle Davis, Matthew Lentz, Gabe Slade</p>
        <p>A meteorological dashboard built for scientific understanding.</p>
      </footer>

      {/* Image Zoom Modal */}
      {modal.isActive && (
        <div className="image-modal active" onClick={closeModal}>
          <span className="close-modal" onClick={closeModal}>&times;</span>
          <img 
            src={modal.src} 
            alt={modal.alt || "Expanded view"} 
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  );
};

export default HurricaneSandyPage;
