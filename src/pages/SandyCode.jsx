import React from 'react';
import './sandyCode.css';

export default function SandyCode() {
  return (
    <div className="code-page">
      <div className="container">
        {/* HERO HEADER */}
        <header>
          <div className="course-title">Computer Programming for Meteorologists</div>
          <h1>Final Project Code</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--accent)' }}>GR4553 Group 3 Final Project: Hurricane Sandy Analysis</p>
        </header>

        {/* PROJECT OVERVIEW */}
        <div className="info-card project-overview-box">
          <h3>Project Overview</h3>
          <p>This project examines the devastating nature and unique characteristics of Hurricane Sandy. This repository includes radar imagery, soundings and meteograms, mean sea level pressure (MSLP) and wind maps, as well as 500mb geopotential height and relative humidity charts to illustrate the meteorological evolution leading up to and during the event.</p>
        </div>

        {/* METHODOLOGY & EXTERNAL LINKS GRID */}
        <h2>Methodology &amp; Data Repositories</h2>
        <div className="grid-2-col">
          <div className="info-card">
            <h3>Radar Plots and Code</h3>
            <p>Radar data was sourced from Amazon Web Services' open NEXRAD Level II archive. The Python scripts in this directory generate radar base reflectivity plots illustrating the structure and intensity of Hurricane Sandy. To use a different radar file, you can replace the filename in the script. For example: <code>f = Level2File('KxxxYYYYMMDD_HHMMSS_V06')</code>.</p>
          </div>
          
          <div className="info-card">
            <h3>Soundings &amp; Meteogram Code</h3>
            <p>The soundings for this project were generated using the <code>sounderpy</code> Python library. This requires no external downloadable content; users simply need to specify the time of the event within the script to automatically retrieve and plot the upper-air data.</p>
          </div>

          <div className="info-card">
            <h3>Buoy Surface Data</h3>
            <p>To analyze surface-level changes, buoy data was retrieved from the National Data Buoy Center (NDBC). Specifically, we used data from Station ACYN4 to highlight the significant pressure drop and subsequent rise before and after Sandy's passing.</p>
            <a href="https://www.ndbc.noaa.gov/station_page.php?station=acyn4" target="_blank" rel="noreferrer" className="btn-link">
              Access Station ACYN4 Data &rarr;
            </a>
          </div>

          <div className="info-card">
            <h3>GFS Analysis Fields</h3>
            <p>The maps displaying 500mb geopotential height with relative humidity, as well as MSLP with surface winds, were created using GFS analysis data sourced from the NCEI NOAA archive. To replicate or adjust it, navigate to the link and select your specific time of interest (e.g., October 29th for peak hurricane lifecycle intensity).</p>
            <a href="https://www.ncei.noaa.gov/has/HAS.FileAppRouter?datasetname=GFSANL4&subqueryby=STATION&applname=&outdest=FILE" target="_blank" rel="noreferrer" className="btn-link">
              Access NCEI NOAA Archive &rarr;
            </a>
          </div>
        </div>

        {/* PROGRAMMING SCRIPTS RUNNING LOG */}
        <h2>Production Python Source Scripts</h2>

        {/* Script 1 */}
        <div className="code-section">
          <div className="code-meta">
            <div className="code-title">1. 500mb Geopotential Height &amp; RH</div>
            <div style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 500 }}>MATTHEW LENTZ</div>
          </div>
          <div className="code-desc">Processes environmental vertical layers using Gridded Binary (GRIB2) fields to project tracking arrays, calculating moisture thresholds vs structural spatial dimensions.</div>
          <pre><code className="language-python">
{`"""
Created on Wed Apr 22 15:09:48 2026
@author: Matthew Lentz
"""

# 500mb Geopotential Height and Relative Humidity
import pygrib
import numpy as np
import matplotlib.pyplot as plt
import cartopy.crs as ccrs
import cartopy.feature as cfeature

# Update the string below with the path to your GRIB data file.
grbs = pygrib.open('gfs_4_20121029_0600_027.grb2')

""" Uncomment the loop below to find the specific meteorological variable of your choice."""
#for msg in grbs:
#     print(msg)

hgtMSG = grbs[103]

# Divide the 500mb Geopotential height by 10 since the meteorological charts display heights in decameters (dm) rather than meters.
hgt = hgtMSG.values/10.0 
[lats, lons] = hgtMSG.latlons()

# Subtract by 273 (or 273.15) since we want to use Celsius and not Kelvin
tempMSG= grbs[104]
temp = tempMSG.values - 273 

rhMSG = grbs[105]
rh = rhMSG.values

# Define the coordinates for the specific region of interest
domain = (lons >= 270) & (lons <= 305) & (lats >= 20) & (lats <= 55)

# Find the row and column edges of this region
rows = np.where(np.any(domain, axis=1))[0]
cols = np.where(np.any(domain, axis=0))[0]

row1 = rows.min()
row2 = rows.max() + 1
col1 = cols.min()
col2 = cols.max() + 1

# Crop all the data arrays down to that smaller enclosure
lats = lats[row1:row2, col1:col2]
lons = lons[row1:row2, col1:col2]
hgt = hgt[row1:row2, col1:col2]
temp = temp[row1:row2, col1:col2]
rh = rh[row1:row2, col1:col2]

# Convert longitude from a 0-360 scale to a standard -180 to 180 scale
lons = lons - 360

fig = plt.figure(figsize=(8, 8))

proj = ccrs.LambertConformal(central_longitude=-90.0, central_latitude=35.0)
ax = plt.axes(projection=proj)
ax.set_extent([-90, -65, 30, 50], crs=ccrs.PlateCarree())

ax.add_feature(cfeature.LAND, facecolor='wheat')
ax.add_feature(cfeature.OCEAN, facecolor='lightblue')
ax.add_feature(cfeature.LAKES, facecolor='lightblue')
ax.add_feature(cfeature.STATES, edgecolor='grey')
ax.add_feature(cfeature.BORDERS, edgecolor='grey')

# Gridlines 
glx = ax.gridlines(crs=ccrs.PlateCarree(),draw_labels=['bottom'], x_inline=False,y_inline=False,rotate_labels=True,color='white', linestyle='--', xlocs=np.arange(-90, -65, 5),ylocs=[]) 
gly = ax.gridlines(crs=ccrs.PlateCarree(),draw_labels=['right'], x_inline=False,y_inline=False,color='white', linestyle='--', xlocs=[],ylocs=np.arange(30, 50, 4)) 
glx.xpadding=10
glx.xlabel_style={'rotation':385}
 
rhFILL = ax.contourf(lons, lats, rh, levels=[70, 80, 90, 100], cmap='Greens', transform=ccrs.PlateCarree())

hgtLEVELS = np.arange(520, 585, 5)
hgtCONTOURS = ax.contour(lons, lats, hgt, levels=hgtLEVELS, colors='black', linewidths=2, transform=ccrs.PlateCarree())
ax.clabel(hgtCONTOURS, levels=hgtLEVELS, inline=True, fontsize=10, fmt='%d')

cbar = plt.colorbar(rhFILL, orientation='horizontal')
cbar.set_label('Relative Humidity (%)')
cbar.ax.xaxis.set_label_position('top')

run_time = hgtMSG.analDate.strftime('%Y-%m-%d %H:%M UTC')
valid_time = hgtMSG.validDate.strftime('%Y-%m-%d %H:%M UTC')

plt.suptitle('500mb Heights (dm) / Humidity (%)', fontweight='bold', fontsize=13, color='black', y=0.95)
plt.title(f'GFS Model Run: {run_time} | Valid: {valid_time}', fontsize=11, color='black')

plt.show()`}
          </code></pre>
        </div>

        {/* Script 2 */}
        <div className="code-section">
          <div className="code-meta">
            <div className="code-title">2. GFS Data: MSLP and Surface Winds</div>
            <div style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 500 }}>MATTHEW LENTZ</div>
          </div>
          <div className="code-desc">Converts surface mass fields into millibars, extracting vector components to isolate kinematic wind magnitude scaling values.</div>
          <pre><code className="language-python">
{`"""
Created on Wed Apr 22 15:06:29 2026
@author: MATTHEW LENTZ
"""

import pygrib 
import numpy as np 
import matplotlib.pyplot as plt 
import cartopy.crs as ccrs 
import cartopy.feature as cfeature 

grbs = pygrib.open('gfs_4_20121029_0600_027.grb2') 

sfcMSLPMSG = grbs[207]
[lats, lons] = sfcMSLPMSG.latlons() 
sfcMSLP_array = sfcMSLPMSG.values/100

uMSG = grbs[298] 
vMSG = grbs[299] 

uKNOT = uMSG.values * 1.94384 
vKNOT = vMSG.values * 1.94384 
windMAG=np.sqrt(uKNOT**2 + vKNOT**2)*1.1508

fig = plt.figure(figsize=(8, 8)) 
proj = ccrs.LambertConformal(central_longitude=-90.0, central_latitude=35.0) 
ax = plt.axes(projection=proj) 

ax.set_extent([-80, -60, 35, 46], crs=ccrs.PlateCarree()) 

ax.add_feature(cfeature.LAND, facecolor='wheat') 
ax.add_feature(cfeature.OCEAN, facecolor='lightblue') 
ax.add_feature(cfeature.LAKES, facecolor='lightblue') 
ax.add_feature(cfeature.STATES, edgecolor='grey') 
ax.add_feature(cfeature.BORDERS, edgecolor='grey') 

glx = ax.gridlines(crs=ccrs.PlateCarree(),draw_labels=['bottom'], x_inline=False,y_inline=False,rotate_labels=True,color='white', linestyle='--', xlocs=np.arange(-140, -60, 5),ylocs=[]) 
gly = ax.gridlines(crs=ccrs.PlateCarree(),draw_labels=['right'], x_inline=False,y_inline=False,color='white', linestyle='--', xlocs=[],ylocs=np.arange(20, 60, 4)) 
glx.xpadding=10
glx.xlabel_style={'rotation':385}

MIN = np.min(sfcMSLP_array) 
MAX = np.max(sfcMSLP_array) 
LEVELS = np.arange(MIN, MAX, 7) 

bounds=[39,45,61,67,73]

hgtCONTOURS = ax.contour(lons, lats, sfcMSLP_array, levels=LEVELS,colors='black', transform=ccrs.PlateCarree()) 
ax.clabel(hgtCONTOURS,inline=True,fontsize=8,fmt='%d')

plt.contourf(lons,lats,windMAG,levels=bounds,cmap=plt.cm.autumn_r,transform=ccrs.PlateCarree())
cbar=plt.colorbar(location='bottom')
cbar.set_label('MPH')

plt.barbs(lons[::5,::5],lats[::5,::5],uKNOT[::5,::5],vKNOT[::5,::5],transform=ccrs.PlateCarree())

run_time = sfcMSLPMSG.analDate.strftime('%Y-%m-%d %H:%M UTC')
valid_time = sfcMSLPMSG.validDate.strftime('%Y-%m-%d %H:%M UTC')

plt.suptitle('Mean Sea Level Pressure & Winds', fontweight='bold', fontsize=13, color='black', y=0.95)
plt.title(f'GFS Model Run: {run_time} | Valid: {valid_time}', fontsize=11, color='black')

plt.savefig('mslp_winds_0600_027')
plt.show()`}
          </code></pre>
        </div>

        {/* Script 3 */}
        <div className="code-section">
          <div className="code-meta">
            <div className="code-title">3. Hurricane Sandy Meteogram</div>
            <div style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 500 }}>BUOY DATA OBJECTS</div>
          </div>
          <div className="code-desc">Constructs dual-axis index data structures to clean and compile missing values directly into chronological trends.</div>
          <pre><code className="language-python">
{`import pandas as pd
import matplotlib.pyplot as plt

# Original data was extracted manually from the NDBC website and pasted into a CSV.
sandy_buoy_data = pd.read_csv('buoy_data.csv')

sandy_buoy_data.columns = sandy_buoy_data.columns.str.strip()
sandy_buoy_data["Datetime"] = pd.to_datetime(sandy_buoy_data["Date"] + " " + sandy_buoy_data["Time"])
sandy_buoy_data = sandy_buoy_data.sort_values("Datetime").set_index("Datetime")

sandy_buoy_data["Pressure"] = pd.to_numeric(sandy_buoy_data["Pressure"], errors="coerce")
sandy_buoy_data["Temp"] = pd.to_numeric(sandy_buoy_data["Temp"], errors="coerce")
sandy_buoy_data["Water Temp"] = pd.to_numeric(sandy_buoy_data["Water Temp"], errors="coerce")

fig, ax1 = plt.subplots(figsize=(12, 5))

ax1.plot(sandy_buoy_data.index, sandy_buoy_data["Pressure"], color="tab:blue", label="Pressure")
ax1.set_ylabel("Pressure (hPa)", color="tab:blue")
ax1.tick_params(axis="y", labelcolor="tab:blue")
ax1.grid(True)
ax1.set_ylim(940, 1015)

ax2 = ax1.twinx()
ax2.plot(sandy_buoy_data.index, sandy_buoy_data["Temp"], color="tab:red", label="Air Temp")
ax2.plot(sandy_buoy_data.index, sandy_buoy_data["Water Temp"], color="tab:green", label="Water Temp")
ax2.set_ylabel("Temperature (°C)")

handles, labels = ax1.get_legend_handles_labels()
handles2, labels2 = ax2.get_legend_handles_labels()
ax1.legend(handles + handles2, labels + labels2)

plt.title("Atlantic City, NJ: Buoy Station ACYN4 Meteogram")
plt.show()`}
          </code></pre>
        </div>

        {/* Script 4 */}
        <div className="code-section">
          <div className="code-meta">
            <div className="code-title">4. Hurricane Sandy Radar Data</div>
            <div style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 500 }}>MATTHEW LENTZ</div>
          </div>
          <div className="code-desc">Ingests complex structural array sweeps via MetPy out of Level II binary radar structures, normalizing radial data matrices into geometric coordinates.</div>
          <pre><code className="language-python">
{`# Copyright (c) 2015,2018,2019 MetPy Developers.

import cartopy.crs as ccrs
import matplotlib.gridspec as gridspec
import matplotlib.pyplot as plt
import numpy as np

from metpy.calc import azimuth_range_to_lat_lon
from metpy.cbook import get_test_data
from metpy.io import Level2File
from metpy.plots import USCOUNTIES
from metpy.units import units

f = Level2File('KDIX20121030_055815_V06')

sweep = 0
az = np.array([ray[0].az_angle for ray in f.sweeps[sweep]])

diff = np.diff(az)
crossed = diff < -180
diff[crossed] += 360.
avg_spacing = diff.mean()

az = (az[:-1] + az[1:]) / 2
az[crossed] += 180.
az = np.concatenate(([az[0] - avg_spacing], az, [az[-1] + avg_spacing]))
az = units.Quantity(az, 'degrees')

ref_hdr = f.sweeps[sweep][0][4][b'REF'][0]
ref_range = (np.arange(ref_hdr.num_gates + 1) - 0.5) * ref_hdr.gate_width + ref_hdr.first_gate
ref_range = units.Quantity(ref_range, 'kilometers')
ref = np.array([ray[4][b'REF'][1] for ray in f.sweeps[sweep]])

rho_hdr = f.sweeps[sweep][0][4][b'RHO'][0]
rho_range = (np.arange(rho_hdr.num_gates + 1) - 0.5) * rho_hdr.gate_width + rho_hdr.first_gate
rho_range = units.Quantity(rho_range, 'kilometers')
rho = np.array([ray[4][b'RHO'][1] for ray in f.sweeps[sweep]])

cent_lon = f.sweeps[0][0][1].lon
cent_lat = f.sweeps[0][0][1].lat

spec = gridspec.GridSpec(1, 1)
fig = plt.figure(figsize=(8,8))

for var_data, var_range, ax_rect in zip((ref, rho), (ref_range, rho_range), spec):
    data = np.ma.array(var_data)
    data[np.isnan(data)] = np.ma.masked
 
    xlocs, ylocs = azimuth_range_to_lat_lon(az, var_range, cent_lon, cent_lat)

    crs = ccrs.LambertConformal(central_longitude=cent_lon, central_latitude=cent_lat)
    ax = fig.add_subplot(ax_rect, projection=crs)
    ax.add_feature(USCOUNTIES, linewidth=0.5)
    pcm=ax.pcolormesh(xlocs, ylocs, data, cmap='nipy_spectral',vmin=-10,vmax=60, transform=ccrs.PlateCarree())
    ax.set_extent([cent_lon - 3, cent_lon + 3, cent_lat - 3, cent_lat + 3])
    ax.set_aspect('equal', 'datalim')
    glx = ax.gridlines(crs=ccrs.PlateCarree(), draw_labels=['bottom'],x_inline=False,y_inline=False,rotate_labels=True,
                      linewidth=2, color='grey', alpha=0.5, linestyle='--')
    gly = ax.gridlines(crs=ccrs.PlateCarree(), draw_labels=['right'],x_inline=False,y_inline=False,
                      linewidth=2, color='grey', alpha=0.5, linestyle='--')
    gly.top_labels=False
    glx.left_labels=False
    glx.xpadding=10
    glx.xlabel_style={'rotation':385}
    plt.title("KDIX - MT. HOLLY/PHILADEPHIA, NJ Radar 1:58 AM EDT Oct. 30, 2012")
    
    cbar=plt.colorbar(pcm,ax=ax,location='bottom')
    cbar.set_label('Reflectivity (dBZ)')
 
plt.savefig('Radar_1030_055815')
plt.show()`}
          </code></pre>
        </div>

        {/* Script 5 */}
        <div className="code-section">
          <div className="code-meta">
            <div className="code-title">5. Hurricane Sandy Related Soundings</div>
            <div style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 500 }}>SOUNDERPY SOUNDINGS</div>
          </div>
          <div className="code-desc">This code from SounderPy collects real-time balloon-launched data of the atmosphere, such as temperature, humidity, and wind at different heights, without needing any saved data files on your computer.</div>
          <pre><code className="language-python">
{`import sounderpy as spy

okx_oct29_12z_sounding = spy.get_obs_data('OKX', '2012', '10', '29', '12')
spy.build_sounding(okx_oct29_12z_sounding)

okx_oct30_0z_sounding = spy.get_obs_data('OKX', '2012', '10', '30', '0')
spy.build_sounding(okx_oct30_0z_sounding, special_parcels=False)

okx_oct30_12z_sounding = spy.get_obs_data('OKX', '2012', '10', '30', '12')
spy.build_sounding(okx_oct30_12z_sounding)`}
          </code></pre>
        </div>
      </div>
    </div>
  );
}
