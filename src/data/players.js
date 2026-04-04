// NBA Player dataset.
// For active players, stats = 2024-25 current season averages.
// For historical/retired players, stats = best single-season averages.
// The `era` field on historical players shows the year of the featured season.
// active = currently playing in the NBA
// position = primary position (PG, SG, SF, PF, C)
//
// `value` is a composite impact score that blends traditional box-score stats
// with advanced metrics available from NBA stats APIs:
//   base     = PPG×1.0 + RPG×1.2 + APG×1.5 + SPG×2.0 + BPG×2.0
//   advanced = (PER − 15) × 0.3  +  BPM × 0.5
//
// Advanced stats included in each player's `stats` object:
//   per    – Player Efficiency Rating  (league avg ≈ 15; elite > 25; MVP > 30)
//   ts_pct – True Shooting %          (accounts for FTs & 3-pointers; avg ≈ 0.565)
//   bpm    – Box Plus/Minus           (per-100-possession value vs. avg; 0 = avg)

export const POSITIONS = ['PG', 'SG', 'SF', 'PF', 'C'];
export const ROUND_LABELS = ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center', '6th Man'];
export const ROUND_SHORT = ['PG', 'SG', 'SF', 'PF', 'C', '6th Man'];

export const PLAYERS = [
  // ─── POINT GUARDS (active) ───────────────────────────────────────────────
  { id: 9,  name: 'Stephen Curry',           position: 'PG', value: 49.3, active: true,  era: '2010s', stats: { ppg: 26.4, rpg: 4.5, apg: 5.2, spg: 1.4, bpg: 0.4, per: 23.5, ts_pct: 0.643, bpm: 7.1 } },
  { id: 10, name: 'Chris Paul',              position: 'PG', value: 26.6, active: true,  era: '2010s', stats: { ppg: 9.0,  rpg: 3.8, apg: 6.8, spg: 1.2, bpg: 0.1, per: 13.0, ts_pct: 0.560, bpm: 1.5 } },
  { id: 12, name: 'Damian Lillard',          position: 'PG', value: 47.3, active: true,  era: '2010s', stats: { ppg: 24.3, rpg: 4.4, apg: 7.0, spg: 0.9, bpg: 0.4, per: 22.1, ts_pct: 0.610, bpm: 5.0 } },
  { id: 13, name: 'Kyrie Irving',            position: 'PG', value: 44.4, active: true,  era: '2010s', stats: { ppg: 23.4, rpg: 5.0, apg: 5.2, spg: 1.3, bpg: 0.5, per: 20.8, ts_pct: 0.598, bpm: 3.8 } },
  { id: 14, name: 'Trae Young',              position: 'PG', value: 50.1, active: true,  era: '2020s', stats: { ppg: 23.2, rpg: 3.3, apg: 10.8, spg: 1.0, bpg: 0.1, per: 23.4, ts_pct: 0.603, bpm: 4.0 } },
  { id: 15, name: 'Luka Dončić',             position: 'PG', value: 63.2, active: true,  era: '2020s', stats: { ppg: 28.0, rpg: 8.6, apg: 8.0, spg: 1.5, bpg: 0.5, per: 29.0, ts_pct: 0.625, bpm: 9.5 } },
  { id: 16, name: 'Ja Morant',               position: 'PG', value: 46.1, active: true,  era: '2020s', stats: { ppg: 20.1, rpg: 5.9, apg: 8.1, spg: 1.1, bpg: 0.6, per: 21.1, ts_pct: 0.591, bpm: 3.2 } },
  { id: 17, name: "De'Aaron Fox",            position: 'PG', value: 46.9, active: true,  era: '2020s', stats: { ppg: 26.6, rpg: 4.0, apg: 5.5, spg: 1.8, bpg: 0.3, per: 20.8, ts_pct: 0.587, bpm: 2.5 } },
  { id: 18, name: 'Shai Gilgeous-Alexander', position: 'PG', value: 63.5, active: true,  era: '2020s', stats: { ppg: 32.7, rpg: 5.5, apg: 6.4, spg: 2.0, bpg: 1.0, per: 28.8, ts_pct: 0.634, bpm: 9.0 } },
  { id: 87, name: 'Fred VanVleet',           position: 'PG', value: 24.4, active: true,  era: '2020s', stats: { ppg: 10.8, rpg: 2.8, apg: 5.0, spg: 1.3, bpg: 0.2, per: 13.2, ts_pct: 0.529, bpm: 0.5 } },
  { id: 88, name: 'Tyrese Haliburton',       position: 'PG', value: 46.4, active: true,  era: '2020s', stats: { ppg: 20.1, rpg: 3.8, apg: 9.4, spg: 1.4, bpg: 0.4, per: 21.4, ts_pct: 0.584, bpm: 4.2 } },
  { id: 89, name: 'Cade Cunningham',         position: 'PG', value: 53.4, active: true,  era: '2020s', stats: { ppg: 24.8, rpg: 4.7, apg: 9.2, spg: 1.5, bpg: 0.5, per: 23.9, ts_pct: 0.570, bpm: 5.1 } },
  { id: 90, name: 'Jalen Brunson',           position: 'PG', value: 48.7, active: true,  era: '2020s', stats: { ppg: 26.1, rpg: 3.6, apg: 7.7, spg: 0.9, bpg: 0.2, per: 22.1, ts_pct: 0.611, bpm: 4.8 } },
  { id: 91, name: 'LaMelo Ball',             position: 'PG', value: 57.9, active: true,  era: '2020s', stats: { ppg: 30.2, rpg: 6.5, apg: 6.7, spg: 1.6, bpg: 0.5, per: 24.6, ts_pct: 0.580, bpm: 5.5 } },
  { id: 127, name: 'Tyrese Maxey',           position: 'PG', value: 46.2, active: true,  era: '2020s', stats: { ppg: 25.9, rpg: 3.7, apg: 6.5, spg: 0.9, bpg: 0.3, per: 21.4, ts_pct: 0.595, bpm: 3.6 } },
  { id: 128, name: 'Darius Garland',         position: 'PG', value: 40.9, active: true,  era: '2020s', stats: { ppg: 20.6, rpg: 2.8, apg: 7.9, spg: 1.1, bpg: 0.2, per: 19.3, ts_pct: 0.573, bpm: 2.4 } },
  { id: 129, name: 'Immanuel Quickley',      position: 'PG', value: 37.6, active: true,  era: '2020s', stats: { ppg: 17.2, rpg: 4.0, apg: 7.3, spg: 1.1, bpg: 0.3, per: 18.1, ts_pct: 0.570, bpm: 1.8 } },
  { id: 130, name: 'Josh Giddey',            position: 'PG', value: 37.2, active: true,  era: '2020s', stats: { ppg: 14.8, rpg: 7.4, apg: 6.3, spg: 1.2, bpg: 0.3, per: 17.2, ts_pct: 0.555, bpm: 0.8 } },
  { id: 131, name: 'Scoot Henderson',        position: 'PG', value: 28.9, active: true,  era: '2020s', stats: { ppg: 14.2, rpg: 3.8, apg: 5.2, spg: 1.0, bpg: 0.3, per: 14.8, ts_pct: 0.543, bpm: -0.5 } },
  { id: 132, name: "D'Angelo Russell",       position: 'PG', value: 30.2, active: true,  era: '2020s', stats: { ppg: 14.9, rpg: 3.2, apg: 6.1, spg: 0.8, bpg: 0.3, per: 15.0, ts_pct: 0.558, bpm: 0.2 } },

  // ─── POINT GUARDS (historical) ───────────────────────────────────────────
  { id: 1,  name: 'Magic Johnson',           position: 'PG', value: 62.5, active: false, era: '1987', stats: { ppg: 23.9, rpg: 6.3, apg: 12.2, spg: 1.7, bpg: 0.5, per: 27.4, ts_pct: 0.616, bpm: 9.2 } },
  { id: 2,  name: 'Isiah Thomas',            position: 'PG', value: 53.7, active: false, era: '1984', stats: { ppg: 21.3, rpg: 4.0, apg: 11.2, spg: 2.0, bpg: 0.3, per: 23.8, ts_pct: 0.564, bpm: 7.2 } },
  { id: 3,  name: 'John Stockton',           position: 'PG', value: 55.8, active: false, era: '1991', stats: { ppg: 17.8, rpg: 2.8, apg: 14.5, spg: 3.0, bpg: 0.3, per: 23.0, ts_pct: 0.575, bpm: 7.8 } },
  { id: 4,  name: 'Gary Payton',             position: 'PG', value: 56.9, active: false, era: '2000', stats: { ppg: 24.2, rpg: 6.4, apg: 8.9, spg: 2.3, bpg: 0.2, per: 23.1, ts_pct: 0.559, bpm: 8.5 } },
  { id: 5,  name: 'Allen Iverson',           position: 'PG', value: 62.8, active: false, era: '2005', stats: { ppg: 33.0, rpg: 4.4, apg: 7.9, spg: 2.4, bpg: 0.2, per: 26.7, ts_pct: 0.539, bpm: 8.0 } },
  { id: 6,  name: 'Steve Nash',              position: 'PG', value: 47.9, active: false, era: '2006', stats: { ppg: 18.8, rpg: 4.2, apg: 10.5, spg: 0.8, bpg: 0.2, per: 22.0, ts_pct: 0.641, bpm: 8.5 } },
  { id: 7,  name: 'Jason Kidd',              position: 'PG', value: 52.1, active: false, era: '2001', stats: { ppg: 17.3, rpg: 7.3, apg: 9.9, spg: 2.3, bpg: 0.5, per: 20.6, ts_pct: 0.508, bpm: 7.8 } },
  { id: 8,  name: 'Tony Parker',             position: 'PG', value: 43.3, active: false, era: '2009', stats: { ppg: 22.0, rpg: 3.4, apg: 7.7, spg: 0.9, bpg: 0.1, per: 20.8, ts_pct: 0.591, bpm: 4.0 } },
  { id: 11, name: 'Russell Westbrook',       position: 'PG', value: 72.3, active: false, era: '2017', stats: { ppg: 31.6, rpg: 10.7, apg: 10.4, spg: 1.6, bpg: 0.3, per: 30.6, ts_pct: 0.549, bpm: 7.7 } },
  { id: 19, name: 'Walt Frazier',            position: 'PG', value: 53.6, active: false, era: '1972', stats: { ppg: 23.2, rpg: 7.4, apg: 7.1, spg: 2.2, bpg: 0.5, per: 22.5, ts_pct: 0.565, bpm: 6.5 } },
  { id: 20, name: 'Bob Cousy',               position: 'PG', value: 45.5, active: false, era: '1952', stats: { ppg: 21.7, rpg: 6.4, apg: 6.7, spg: 1.0, bpg: 0.2, per: 18.0, ts_pct: 0.455, bpm: 5.5 } },
  { id: 92, name: 'Tiny Archibald',          position: 'PG', value: 64.3, active: false, era: '1973', stats: { ppg: 34.0, rpg: 3.2, apg: 11.4, spg: 1.5, bpg: 0.1, per: 24.8, ts_pct: 0.543, bpm: 6.5 } },
  { id: 93, name: 'Kevin Johnson',           position: 'PG', value: 47.3, active: false, era: '1995', stats: { ppg: 20.4, rpg: 3.7, apg: 9.0, spg: 1.7, bpg: 0.4, per: 21.2, ts_pct: 0.585, bpm: 5.8 } },

  // ─── SHOOTING GUARDS (active) ────────────────────────────────────────────
  { id: 28, name: 'James Harden',            position: 'SG', value: 38.5, active: true,  era: '2010s', stats: { ppg: 16.1, rpg: 4.3, apg: 7.6, spg: 1.0, bpg: 0.5, per: 18.9, ts_pct: 0.590, bpm: 3.2 } },
  { id: 29, name: 'Devin Booker',            position: 'SG', value: 47.7, active: true,  era: '2020s', stats: { ppg: 25.4, rpg: 4.6, apg: 6.5, spg: 0.9, bpg: 0.4, per: 22.2, ts_pct: 0.614, bpm: 4.5 } },
  { id: 30, name: 'Donovan Mitchell',        position: 'SG', value: 43.9, active: true,  era: '2020s', stats: { ppg: 24.0, rpg: 4.4, apg: 4.9, spg: 1.5, bpg: 0.4, per: 20.8, ts_pct: 0.584, bpm: 3.5 } },
  { id: 31, name: 'Zach LaVine',             position: 'SG', value: 40.9, active: true,  era: '2020s', stats: { ppg: 23.2, rpg: 5.0, apg: 4.5, spg: 0.8, bpg: 0.5, per: 19.4, ts_pct: 0.582, bpm: 2.0 } },
  { id: 32, name: 'Bradley Beal',            position: 'SG', value: 32.4, active: true,  era: '2020s', stats: { ppg: 17.0, rpg: 4.2, apg: 5.2, spg: 0.7, bpg: 0.3, per: 16.2, ts_pct: 0.581, bpm: 0.5 } },
  { id: 94, name: 'Tyler Herro',             position: 'SG', value: 42.6, active: true,  era: '2020s', stats: { ppg: 23.6, rpg: 5.4, apg: 4.9, spg: 0.8, bpg: 0.3, per: 20.4, ts_pct: 0.588, bpm: 2.8 } },
  { id: 95, name: 'Jalen Green',             position: 'SG', value: 39.6, active: true,  era: '2020s', stats: { ppg: 22.8, rpg: 3.9, apg: 5.0, spg: 1.1, bpg: 0.5, per: 19.0, ts_pct: 0.566, bpm: 0.5 } },
  { id: 96, name: 'Anfernee Simons',         position: 'SG', value: 35.4, active: true,  era: '2020s', stats: { ppg: 20.5, rpg: 2.8, apg: 5.8, spg: 0.7, bpg: 0.3, per: 17.5, ts_pct: 0.576, bpm: 0.2 } },
  { id: 97, name: 'Desmond Bane',            position: 'SG', value: 39.0, active: true,  era: '2020s', stats: { ppg: 22.9, rpg: 4.6, apg: 4.2, spg: 0.9, bpg: 0.3, per: 18.9, ts_pct: 0.586, bpm: 1.5 } },
  { id: 98, name: 'Jordan Poole',            position: 'SG', value: 29.0, active: true,  era: '2020s', stats: { ppg: 17.0, rpg: 3.0, apg: 4.3, spg: 0.8, bpg: 0.4, per: 14.8, ts_pct: 0.556, bpm: -1.0 } },
  { id: 99, name: 'Cam Thomas',              position: 'SG', value: 33.5, active: true,  era: '2020s', stats: { ppg: 22.1, rpg: 3.5, apg: 3.0, spg: 0.8, bpg: 0.2, per: 17.0, ts_pct: 0.573, bpm: 0.2 } },
  { id: 100, name: 'Anthony Edwards',        position: 'SG', value: 51.5, active: true,  era: '2020s', stats: { ppg: 27.0, rpg: 5.4, apg: 5.6, spg: 1.4, bpg: 0.7, per: 23.4, ts_pct: 0.571, bpm: 5.8 } },
  { id: 133, name: 'Jalen Williams',         position: 'SG', value: 41.2, active: true,  era: '2020s', stats: { ppg: 21.3, rpg: 4.6, apg: 5.3, spg: 1.4, bpg: 0.5, per: 19.4, ts_pct: 0.578, bpm: 2.5 } },
  { id: 134, name: 'Norman Powell',          position: 'SG', value: 35.5, active: true,  era: '2020s', stats: { ppg: 24.0, rpg: 3.7, apg: 2.0, spg: 1.1, bpg: 0.3, per: 17.5, ts_pct: 0.631, bpm: 1.0 } },
  { id: 135, name: 'Austin Reaves',          position: 'SG', value: 31.9, active: true,  era: '2020s', stats: { ppg: 15.9, rpg: 4.4, apg: 5.2, spg: 0.9, bpg: 0.2, per: 16.0, ts_pct: 0.576, bpm: 0.8 } },
  { id: 136, name: 'Lu Dort',               position: 'SG', value: 25.3, active: true,  era: '2020s', stats: { ppg: 15.4, rpg: 3.5, apg: 1.8, spg: 1.5, bpg: 0.4, per: 13.1, ts_pct: 0.538, bpm: -0.5 } },
  { id: 137, name: 'Coby White',             position: 'SG', value: 37.9, active: true,  era: '2020s', stats: { ppg: 19.1, rpg: 4.4, apg: 5.9, spg: 1.2, bpg: 0.3, per: 18.2, ts_pct: 0.574, bpm: 1.5 } },
  { id: 138, name: 'Malik Monk',             position: 'SG', value: 29.3, active: true,  era: '2020s', stats: { ppg: 16.9, rpg: 2.8, apg: 4.5, spg: 0.9, bpg: 0.3, per: 14.9, ts_pct: 0.573, bpm: -0.2 } },

  // ─── SHOOTING GUARDS (historical) ────────────────────────────────────────
  { id: 21, name: 'Michael Jordan',          position: 'SG', value: 70.4, active: false, era: '1987', stats: { ppg: 37.1, rpg: 5.2, apg: 4.6, spg: 2.9, bpg: 1.5, per: 32.9, ts_pct: 0.589, bpm: 12.0 } },
  { id: 22, name: 'Kobe Bryant',             position: 'SG', value: 61.1, active: false, era: '2006', stats: { ppg: 35.4, rpg: 5.3, apg: 4.5, spg: 1.8, bpg: 0.4, per: 28.0, ts_pct: 0.553, bpm: 8.5 } },
  { id: 23, name: 'Jerry West',              position: 'SG', value: 60.2, active: false, era: '1970', stats: { ppg: 31.2, rpg: 4.6, apg: 7.5, spg: 1.5, bpg: 0.3, per: 27.0, ts_pct: 0.555, bpm: 10.0 } },
  { id: 24, name: 'Clyde Drexler',           position: 'SG', value: 60.1, active: false, era: '1989', stats: { ppg: 27.2, rpg: 7.9, apg: 5.8, spg: 2.9, bpg: 0.6, per: 26.6, ts_pct: 0.546, bpm: 8.5 } },
  { id: 25, name: 'Reggie Miller',           position: 'SG', value: 41.6, active: false, era: '1990', stats: { ppg: 24.6, rpg: 3.6, apg: 4.2, spg: 1.3, bpg: 0.3, per: 19.8, ts_pct: 0.601, bpm: 3.5 } },
  { id: 26, name: 'Ray Allen',               position: 'SG', value: 39.0, active: false, era: '2000', stats: { ppg: 22.1, rpg: 5.0, apg: 3.4, spg: 1.2, bpg: 0.4, per: 18.8, ts_pct: 0.591, bpm: 3.0 } },
  { id: 27, name: 'Dwyane Wade',             position: 'SG', value: 62.8, active: false, era: '2009', stats: { ppg: 30.2, rpg: 5.0, apg: 7.5, spg: 2.2, bpg: 1.2, per: 28.5, ts_pct: 0.591, bpm: 8.8 } },
  { id: 33, name: 'Anfernee Hardaway',       position: 'SG', value: 47.1, active: false, era: '1995', stats: { ppg: 20.9, rpg: 4.4, apg: 7.2, spg: 2.2, bpg: 0.6, per: 21.5, ts_pct: 0.560, bpm: 5.0 } },
  { id: 34, name: 'Manu Ginóbili',           position: 'SG', value: 38.1, active: false, era: '2008', stats: { ppg: 19.5, rpg: 4.3, apg: 4.5, spg: 1.4, bpg: 0.3, per: 19.5, ts_pct: 0.598, bpm: 3.8 } },
  { id: 35, name: 'Pete Maravich',           position: 'SG', value: 54.6, active: false, era: '1977', stats: { ppg: 31.1, rpg: 5.1, apg: 5.4, spg: 1.4, bpg: 0.3, per: 22.0, ts_pct: 0.543, bpm: 7.5 } },
  { id: 36, name: 'Hal Greer',               position: 'SG', value: 40.8, active: false, era: '1967', stats: { ppg: 22.1, rpg: 5.9, apg: 3.8, spg: 1.0, bpg: 0.3, per: 18.5, ts_pct: 0.528, bpm: 4.5 } },
  { id: 101, name: 'Vince Carter',           position: 'SG', value: 48.5, active: false, era: '2001', stats: { ppg: 27.6, rpg: 5.5, apg: 3.9, spg: 1.3, bpg: 0.7, per: 22.0, ts_pct: 0.562, bpm: 4.5 } },
  { id: 102, name: 'Tracy McGrady',          position: 'SG', value: 61.2, active: false, era: '2003', stats: { ppg: 32.1, rpg: 6.5, apg: 5.5, spg: 1.7, bpg: 0.8, per: 28.5, ts_pct: 0.573, bpm: 8.0 } },
  { id: 156, name: 'George Gervin',          position: 'SG', value: 55.5, active: false, era: '1980', stats: { ppg: 33.1, rpg: 4.6, apg: 4.3, spg: 1.6, bpg: 0.5, per: 24.0, ts_pct: 0.577, bpm: 7.0 } },

  // ─── SMALL FORWARDS (active) ─────────────────────────────────────────────
  { id: 37, name: 'LeBron James',            position: 'SF', value: 58.4, active: true,  era: '2000s', stats: { ppg: 24.0, rpg: 8.3, apg: 8.2, spg: 1.1, bpg: 0.6, per: 27.5, ts_pct: 0.610, bpm: 9.8 } },
  { id: 42, name: 'Kevin Durant',            position: 'SF', value: 52.1, active: true,  era: '2010s', stats: { ppg: 26.9, rpg: 6.9, apg: 3.7, spg: 0.8, bpg: 1.1, per: 26.0, ts_pct: 0.637, bpm: 8.5 } },
  { id: 43, name: 'Kawhi Leonard',           position: 'SF', value: 28.4, active: true,  era: '2010s', stats: { ppg: 13.1, rpg: 4.9, apg: 2.8, spg: 1.3, bpg: 0.5, per: 17.0, ts_pct: 0.575, bpm: 2.0 } },
  { id: 44, name: 'Paul George',             position: 'SF', value: 34.5, active: true,  era: '2010s', stats: { ppg: 18.1, rpg: 5.2, apg: 3.4, spg: 1.4, bpg: 0.4, per: 17.5, ts_pct: 0.575, bpm: 1.5 } },
  { id: 45, name: 'Jayson Tatum',            position: 'SF', value: 53.8, active: true,  era: '2020s', stats: { ppg: 26.9, rpg: 8.6, apg: 4.9, spg: 1.1, bpg: 0.6, per: 23.5, ts_pct: 0.590, bpm: 6.5 } },
  { id: 46, name: 'Jimmy Butler',            position: 'SF', value: 41.9, active: true,  era: '2020s', stats: { ppg: 20.3, rpg: 5.3, apg: 4.9, spg: 1.4, bpg: 0.7, per: 20.5, ts_pct: 0.600, bpm: 4.0 } },
  { id: 52, name: 'Brandon Ingram',          position: 'SF', value: 39.7, active: true,  era: '2020s', stats: { ppg: 20.7, rpg: 5.1, apg: 5.4, spg: 0.8, bpg: 0.5, per: 19.0, ts_pct: 0.573, bpm: 2.0 } },
  { id: 103, name: 'OG Anunoby',             position: 'SF', value: 30.1, active: true,  era: '2020s', stats: { ppg: 16.3, rpg: 5.0, apg: 1.9, spg: 1.4, bpg: 0.6, per: 16.5, ts_pct: 0.596, bpm: 1.0 } },
  { id: 104, name: 'Mikal Bridges',          position: 'SF', value: 21.5, active: true,  era: '2020s', stats: { ppg: 11.3, rpg: 4.3, apg: 2.1, spg: 0.8, bpg: 0.5, per: 13.5, ts_pct: 0.545, bpm: -0.5 } },
  { id: 105, name: 'Paolo Banchero',         position: 'SF', value: 45.0, active: true,  era: '2020s', stats: { ppg: 22.6, rpg: 6.9, apg: 5.4, spg: 0.8, bpg: 0.4, per: 21.0, ts_pct: 0.568, bpm: 3.5 } },
  { id: 106, name: 'Scottie Barnes',         position: 'SF', value: 46.0, active: true,  era: '2020s', stats: { ppg: 19.9, rpg: 8.1, apg: 6.1, spg: 1.3, bpg: 0.7, per: 20.8, ts_pct: 0.585, bpm: 3.0 } },
  { id: 107, name: 'Franz Wagner',           position: 'SF', value: 43.0, active: true,  era: '2020s', stats: { ppg: 23.0, rpg: 5.6, apg: 4.7, spg: 1.2, bpg: 0.5, per: 20.0, ts_pct: 0.580, bpm: 2.5 } },
  { id: 108, name: 'Andrew Wiggins',         position: 'SF', value: 23.9, active: true,  era: '2020s', stats: { ppg: 13.7, rpg: 4.4, apg: 1.8, spg: 0.9, bpg: 0.6, per: 13.8, ts_pct: 0.550, bpm: -0.8 } },
  { id: 139, name: 'Miles Bridges',          position: 'SF', value: 41.4, active: true,  era: '2020s', stats: { ppg: 22.1, rpg: 7.0, apg: 3.7, spg: 1.0, bpg: 0.5, per: 19.5, ts_pct: 0.570, bpm: 2.0 } },
  { id: 140, name: 'Khris Middleton',        position: 'SF', value: 23.2, active: true,  era: '2020s', stats: { ppg: 10.4, rpg: 4.0, apg: 3.8, spg: 0.9, bpg: 0.3, per: 13.8, ts_pct: 0.585, bpm: 0.5 } },
  { id: 141, name: 'Herbert Jones',          position: 'SF', value: 19.0, active: true,  era: '2020s', stats: { ppg: 7.5,  rpg: 3.8, apg: 2.3, spg: 1.3, bpg: 0.5, per: 14.0, ts_pct: 0.560, bpm: 0.5 } },
  { id: 142, name: 'Matisse Thybulle',       position: 'SF', value: 16.1, active: true,  era: '2020s', stats: { ppg: 6.8,  rpg: 2.5, apg: 1.0, spg: 2.0, bpg: 0.8, per: 13.0, ts_pct: 0.510, bpm: -0.5 } },
  { id: 143, name: 'Royce O\'Neale',         position: 'SF', value: 19.5, active: true,  era: '2020s', stats: { ppg: 9.2,  rpg: 4.1, apg: 2.2, spg: 0.9, bpg: 0.3, per: 13.5, ts_pct: 0.558, bpm: 0.2 } },

  // ─── SMALL FORWARDS (historical) ─────────────────────────────────────────
  { id: 38, name: 'Larry Bird',              position: 'SF', value: 64.5, active: false, era: '1988', stats: { ppg: 29.9, rpg: 9.3, apg: 6.1, spg: 1.6, bpg: 0.8, per: 29.0, ts_pct: 0.607, bpm: 10.5 } },
  { id: 39, name: 'Scottie Pippen',          position: 'SF', value: 52.0, active: false, era: '1995', stats: { ppg: 21.4, rpg: 8.1, apg: 5.2, spg: 2.9, bpg: 0.9, per: 22.5, ts_pct: 0.555, bpm: 6.5 } },
  { id: 40, name: 'Julius Erving',           position: 'SF', value: 60.8, active: false, era: '1978', stats: { ppg: 27.7, rpg: 11.0, apg: 4.2, spg: 2.1, bpg: 1.5, per: 24.5, ts_pct: 0.574, bpm: 7.0 } },
  { id: 41, name: 'Rick Barry',              position: 'SF', value: 66.2, active: false, era: '1967', stats: { ppg: 35.6, rpg: 10.6, apg: 3.6, spg: 1.8, bpg: 0.3, per: 27.0, ts_pct: 0.592, bpm: 9.5 } },
  { id: 47, name: 'Elgin Baylor',            position: 'SF', value: 81.1, active: false, era: '1962', stats: { ppg: 38.3, rpg: 18.6, apg: 4.6, spg: 1.5, bpg: 0.3, per: 30.0, ts_pct: 0.543, bpm: 11.0 } },
  { id: 48, name: 'John Havlicek',           position: 'SF', value: 57.6, active: false, era: '1971', stats: { ppg: 28.9, rpg: 9.0, apg: 5.5, spg: 1.5, bpg: 0.5, per: 22.0, ts_pct: 0.556, bpm: 7.0 } },
  { id: 49, name: 'Dominique Wilkins',       position: 'SF', value: 51.1, active: false, era: '1986', stats: { ppg: 30.3, rpg: 7.6, apg: 2.6, spg: 1.3, bpg: 0.5, per: 21.5, ts_pct: 0.558, bpm: 4.5 } },
  { id: 50, name: 'Alex English',            position: 'SF', value: 51.6, active: false, era: '1983', stats: { ppg: 28.4, rpg: 8.2, apg: 4.0, spg: 1.2, bpg: 0.4, per: 20.8, ts_pct: 0.554, bpm: 5.0 } },
  { id: 51, name: 'Carmelo Anthony',         position: 'SF', value: 47.4, active: false, era: '2013', stats: { ppg: 28.7, rpg: 6.9, apg: 2.6, spg: 0.9, bpg: 0.4, per: 22.0, ts_pct: 0.556, bpm: 3.5 } },
  { id: 109, name: 'Grant Hill',             position: 'SF', value: 53.8, active: false, era: '1997', stats: { ppg: 21.6, rpg: 9.0, apg: 7.3, spg: 1.7, bpg: 0.6, per: 22.5, ts_pct: 0.568, bpm: 7.0 } },
  { id: 110, name: 'James Worthy',           position: 'SF', value: 39.0, active: false, era: '1988', stats: { ppg: 19.7, rpg: 5.7, apg: 3.3, spg: 1.3, bpg: 0.8, per: 19.5, ts_pct: 0.560, bpm: 3.8 } },
  { id: 157, name: 'Paul Pierce',            position: 'SF', value: 51.5, active: false, era: '2006', stats: { ppg: 26.8, rpg: 6.7, apg: 4.7, spg: 1.6, bpg: 0.6, per: 21.5, ts_pct: 0.576, bpm: 6.5 } },

  // ─── POWER FORWARDS (active) ─────────────────────────────────────────────
  { id: 60, name: 'Giannis Antetokounmpo',   position: 'PF', value: 68.8, active: true,  era: '2020s', stats: { ppg: 30.4, rpg: 11.5, apg: 6.5, spg: 1.2, bpg: 1.1, per: 30.5, ts_pct: 0.643, bpm: 11.0 } },
  { id: 61, name: 'Anthony Davis',           position: 'PF', value: 58.5, active: true,  era: '2010s', stats: { ppg: 24.7, rpg: 11.9, apg: 3.5, spg: 1.2, bpg: 2.0, per: 27.0, ts_pct: 0.616, bpm: 8.5 } },
  { id: 62, name: 'Jaylen Brown',            position: 'PF', value: 42.7, active: true,  era: '2020s', stats: { ppg: 23.9, rpg: 5.5, apg: 3.6, spg: 1.2, bpg: 0.5, per: 20.5, ts_pct: 0.600, bpm: 3.5 } },
  { id: 63, name: 'Pascal Siakam',           position: 'PF', value: 41.9, active: true,  era: '2020s', stats: { ppg: 22.3, rpg: 7.1, apg: 3.7, spg: 0.9, bpg: 0.5, per: 19.8, ts_pct: 0.590, bpm: 2.5 } },
  { id: 64, name: 'Draymond Green',          position: 'PF', value: 35.8, active: true,  era: '2020s', stats: { ppg: 9.0,  rpg: 7.4, apg: 7.7, spg: 1.2, bpg: 0.9, per: 16.5, ts_pct: 0.580, bpm: 3.5 } },
  { id: 67, name: 'Zion Williamson',         position: 'PF', value: 46.8, active: true,  era: '2020s', stats: { ppg: 24.3, rpg: 5.8, apg: 4.6, spg: 1.0, bpg: 0.7, per: 24.0, ts_pct: 0.665, bpm: 5.0 } },
  { id: 68, name: 'Julius Randle',           position: 'PF', value: 46.8, active: true,  era: '2020s', stats: { ppg: 23.6, rpg: 8.9, apg: 4.5, spg: 0.8, bpg: 0.4, per: 21.5, ts_pct: 0.581, bpm: 3.0 } },
  { id: 111, name: 'Jaren Jackson Jr.',      position: 'PF', value: 45.2, active: true,  era: '2020s', stats: { ppg: 22.4, rpg: 6.4, apg: 2.0, spg: 0.9, bpg: 3.1, per: 21.0, ts_pct: 0.614, bpm: 4.5 } },
  { id: 112, name: 'Evan Mobley',            position: 'PF', value: 42.9, active: true,  era: '2020s', stats: { ppg: 18.6, rpg: 9.4, apg: 2.6, spg: 1.0, bpg: 1.7, per: 20.5, ts_pct: 0.596, bpm: 4.0 } },
  { id: 113, name: 'Jabari Smith Jr.',       position: 'PF', value: 28.9, active: true,  era: '2020s', stats: { ppg: 14.5, rpg: 6.6, apg: 1.7, spg: 0.9, bpg: 0.9, per: 15.0, ts_pct: 0.560, bpm: 0.5 } },
  { id: 114, name: 'Keegan Murray',          position: 'PF', value: 28.8, active: true,  era: '2020s', stats: { ppg: 16.9, rpg: 5.3, apg: 1.8, spg: 0.8, bpg: 0.4, per: 15.5, ts_pct: 0.565, bpm: 0.5 } },
  { id: 115, name: 'Tobias Harris',          position: 'PF', value: 25.8, active: true,  era: '2020s', stats: { ppg: 12.5, rpg: 6.2, apg: 2.5, spg: 0.7, bpg: 0.4, per: 14.5, ts_pct: 0.574, bpm: 0.0 } },
  { id: 144, name: 'Lauri Markkanen',        position: 'PF', value: 41.0, active: true,  era: '2020s', stats: { ppg: 22.2, rpg: 8.8, apg: 1.9, spg: 0.7, bpg: 0.5, per: 20.0, ts_pct: 0.601, bpm: 3.0 } },
  { id: 145, name: 'Bennedict Mathurin',     position: 'PF', value: 27.9, active: true,  era: '2020s', stats: { ppg: 17.0, rpg: 4.1, apg: 2.4, spg: 0.8, bpg: 0.4, per: 15.0, ts_pct: 0.568, bpm: 0.0 } },
  { id: 146, name: 'Precious Achiuwa',       position: 'PF', value: 21.2, active: true,  era: '2020s', stats: { ppg: 8.2,  rpg: 7.2, apg: 1.3, spg: 0.7, bpg: 0.9, per: 13.0, ts_pct: 0.556, bpm: -0.5 } },
  { id: 147, name: 'Obi Toppin',             position: 'PF', value: 19.2, active: true,  era: '2020s', stats: { ppg: 10.1, rpg: 4.2, apg: 1.8, spg: 0.7, bpg: 0.4, per: 13.0, ts_pct: 0.570, bpm: -0.5 } },
  { id: 148, name: 'Jaylin Williams',        position: 'PF', value: 24.3, active: true,  era: '2020s', stats: { ppg: 8.5,  rpg: 6.9, apg: 2.2, spg: 1.0, bpg: 1.1, per: 14.0, ts_pct: 0.570, bpm: 0.5 } },

  // ─── POWER FORWARDS (historical) ─────────────────────────────────────────
  { id: 53, name: 'Karl Malone',             position: 'PF', value: 60.2, active: false, era: '1990', stats: { ppg: 31.0, rpg: 11.1, apg: 2.8, spg: 1.4, bpg: 0.8, per: 26.0, ts_pct: 0.574, bpm: 8.0 } },
  { id: 54, name: 'Charles Barkley',         position: 'PF', value: 59.7, active: false, era: '1988', stats: { ppg: 28.3, rpg: 11.9, apg: 3.0, spg: 1.6, bpg: 0.7, per: 26.5, ts_pct: 0.583, bpm: 9.0 } },
  { id: 55, name: 'Tim Duncan',              position: 'PF', value: 61.3, active: false, era: '2002', stats: { ppg: 25.5, rpg: 12.7, apg: 3.7, spg: 0.9, bpg: 2.5, per: 26.5, ts_pct: 0.587, bpm: 9.5 } },
  { id: 56, name: 'Dennis Rodman',           position: 'PF', value: 31.6, active: false, era: '1989', stats: { ppg: 9.0,  rpg: 13.0, apg: 1.9, spg: 0.8, bpg: 0.6, per: 16.0, ts_pct: 0.560, bpm: 2.0 } },
  { id: 57, name: 'Bob Pettit',              position: 'PF', value: 68.2, active: false, era: '1962', stats: { ppg: 31.1, rpg: 18.7, apg: 2.4, spg: 1.0, bpg: 0.3, per: 27.5, ts_pct: 0.548, bpm: 9.5 } },
  { id: 58, name: 'Kevin Garnett',           position: 'PF', value: 64.2, active: false, era: '2004', stats: { ppg: 24.2, rpg: 13.9, apg: 5.0, spg: 1.5, bpg: 2.2, per: 27.0, ts_pct: 0.577, bpm: 9.5 } },
  { id: 59, name: 'Dirk Nowitzki',           position: 'PF', value: 53.1, active: false, era: '2006', stats: { ppg: 26.6, rpg: 9.0, apg: 3.3, spg: 0.9, bpg: 0.8, per: 26.0, ts_pct: 0.632, bpm: 8.0 } },
  { id: 65, name: 'Elvin Hayes',             position: 'PF', value: 64.0, active: false, era: '1970', stats: { ppg: 28.9, rpg: 16.9, apg: 2.4, spg: 1.2, bpg: 0.8, per: 25.5, ts_pct: 0.545, bpm: 8.0 } },
  { id: 66, name: 'Jerry Lucas',             position: 'PF', value: 59.6, active: false, era: '1965', stats: { ppg: 21.1, rpg: 21.1, apg: 2.7, spg: 0.7, bpg: 0.5, per: 23.0, ts_pct: 0.554, bpm: 8.5 } },
  { id: 116, name: 'Chris Webber',           position: 'PF', value: 59.1, active: false, era: '2001', stats: { ppg: 27.1, rpg: 11.2, apg: 4.5, spg: 1.5, bpg: 0.8, per: 25.5, ts_pct: 0.570, bpm: 8.0 } },
  { id: 117, name: 'Pau Gasol',              position: 'PF', value: 46.6, active: false, era: '2008', stats: { ppg: 18.8, rpg: 9.8, apg: 3.8, spg: 0.7, bpg: 2.0, per: 22.0, ts_pct: 0.564, bpm: 5.5 } },
  { id: 118, name: 'Amar\'e Stoudemire',     position: 'PF', value: 47.5, active: false, era: '2011', stats: { ppg: 25.3, rpg: 8.8, apg: 2.3, spg: 0.9, bpg: 0.8, per: 23.5, ts_pct: 0.574, bpm: 4.5 } },

  // ─── CENTERS (active) ────────────────────────────────────────────────────
  { id: 77, name: 'Joel Embiid',             position: 'C',  value: 56.8, active: true,  era: '2020s', stats: { ppg: 23.8, rpg: 11.3, apg: 3.8, spg: 1.1, bpg: 1.6, per: 28.5, ts_pct: 0.632, bpm: 8.5 } },
  { id: 78, name: 'Nikola Jokic',            position: 'C',  value: 75.9, active: true,  era: '2020s', stats: { ppg: 29.6, rpg: 12.7, apg: 10.0, spg: 1.5, bpg: 0.8, per: 32.5, ts_pct: 0.637, bpm: 12.5 } },
  { id: 79, name: 'Bam Adebayo',             position: 'C',  value: 45.2, active: true,  era: '2020s', stats: { ppg: 19.4, rpg: 10.6, apg: 3.6, spg: 1.0, bpg: 0.8, per: 21.0, ts_pct: 0.574, bpm: 4.5 } },
  { id: 80, name: 'Karl-Anthony Towns',      position: 'C',  value: 55.1, active: true,  era: '2020s', stats: { ppg: 24.3, rpg: 13.8, apg: 3.1, spg: 0.7, bpg: 0.9, per: 25.5, ts_pct: 0.639, bpm: 6.5 } },
  { id: 81, name: 'Rudy Gobert',             position: 'C',  value: 41.1, active: true,  era: '2020s', stats: { ppg: 14.0, rpg: 12.5, apg: 1.5, spg: 0.8, bpg: 2.2, per: 20.0, ts_pct: 0.668, bpm: 4.5 } },
  { id: 82, name: 'Kristaps Porziņģis',      position: 'C',  value: 27.9, active: true,  era: '2020s', stats: { ppg: 12.0, rpg: 6.2, apg: 1.9, spg: 0.6, bpg: 1.6, per: 16.5, ts_pct: 0.607, bpm: 1.5 } },
  { id: 119, name: 'Alperen Sengun',         position: 'C',  value: 52.7, active: true,  era: '2020s', stats: { ppg: 22.6, rpg: 9.5, apg: 5.9, spg: 0.9, bpg: 1.4, per: 23.0, ts_pct: 0.576, bpm: 5.5 } },
  { id: 120, name: 'Chet Holmgren',          position: 'C',  value: 35.8, active: true,  era: '2020s', stats: { ppg: 14.1, rpg: 7.8, apg: 2.4, spg: 0.8, bpg: 2.5, per: 18.0, ts_pct: 0.596, bpm: 2.5 } },
  { id: 121, name: 'Walker Kessler',         position: 'C',  value: 27.4, active: true,  era: '2020s', stats: { ppg: 9.3,  rpg: 9.4, apg: 0.9, spg: 0.5, bpg: 2.0, per: 15.0, ts_pct: 0.668, bpm: 1.0 } },
  { id: 122, name: 'Brook Lopez',            position: 'C',  value: 29.2, active: true,  era: '2020s', stats: { ppg: 14.2, rpg: 4.6, apg: 1.3, spg: 0.6, bpg: 2.8, per: 15.5, ts_pct: 0.604, bpm: 1.0 } },
  { id: 123, name: 'Domantas Sabonis',       position: 'C',  value: 57.9, active: true,  era: '2020s', stats: { ppg: 19.9, rpg: 13.6, apg: 8.4, spg: 1.1, bpg: 0.5, per: 24.5, ts_pct: 0.581, bpm: 6.0 } },
  { id: 124, name: 'Myles Turner',           position: 'C',  value: 33.6, active: true,  era: '2020s', stats: { ppg: 14.7, rpg: 6.9, apg: 1.8, spg: 0.7, bpg: 2.5, per: 16.5, ts_pct: 0.616, bpm: 2.0 } },
  { id: 149, name: 'Victor Wembanyama',      position: 'C',  value: 59.2, active: true,  era: '2020s', stats: { ppg: 24.6, rpg: 10.6, apg: 3.7, spg: 1.4, bpg: 3.6, per: 24.5, ts_pct: 0.600, bpm: 7.0 } },
  { id: 150, name: 'Nikola Vucevic',         position: 'C',  value: 36.4, active: true,  era: '2020s', stats: { ppg: 14.6, rpg: 10.3, apg: 3.6, spg: 0.7, bpg: 0.5, per: 18.5, ts_pct: 0.580, bpm: 1.0 } },
  { id: 151, name: 'Deandre Ayton',          position: 'C',  value: 38.3, active: true,  era: '2020s', stats: { ppg: 17.1, rpg: 10.6, apg: 1.8, spg: 0.7, bpg: 1.0, per: 19.5, ts_pct: 0.645, bpm: 2.0 } },
  { id: 152, name: 'Ivica Zubac',            position: 'C',  value: 33.4, active: true,  era: '2020s', stats: { ppg: 13.1, rpg: 10.2, apg: 1.5, spg: 0.5, bpg: 1.5, per: 18.5, ts_pct: 0.645, bpm: 1.5 } },
  { id: 153, name: 'Onyeka Okongwu',         position: 'C',  value: 29.1, active: true,  era: '2020s', stats: { ppg: 11.0, rpg: 8.6, apg: 1.6, spg: 0.9, bpg: 1.2, per: 16.5, ts_pct: 0.617, bpm: 1.5 } },
  { id: 154, name: 'Isaiah Hartenstein',     position: 'C',  value: 27.8, active: true,  era: '2020s', stats: { ppg: 7.0,  rpg: 8.9, apg: 2.7, spg: 1.0, bpg: 1.4, per: 16.0, ts_pct: 0.612, bpm: 2.0 } },
  { id: 155, name: 'Clint Capela',           position: 'C',  value: 32.2, active: true,  era: '2020s', stats: { ppg: 11.5, rpg: 11.8, apg: 1.3, spg: 0.7, bpg: 0.9, per: 17.0, ts_pct: 0.668, bpm: 1.5 } },

  // ─── CENTERS (historical) ────────────────────────────────────────────────
  { id: 69, name: 'Kareem Abdul-Jabbar',     position: 'C',  value: 82.8, active: false, era: '1972', stats: { ppg: 34.8, rpg: 16.6, apg: 4.6, spg: 1.5, bpg: 3.0, per: 32.5, ts_pct: 0.594, bpm: 14.0 } },
  { id: 70, name: 'Wilt Chamberlain',        position: 'C',  value: 105.3, active: false, era: '1962', stats: { ppg: 50.4, rpg: 25.7, apg: 2.4, spg: 1.5, bpg: 1.5, per: 36.5, ts_pct: 0.540, bpm: 16.0 } },
  { id: 71, name: "Shaquille O'Neal",        position: 'C',  value: 66.6, active: false, era: '2000', stats: { ppg: 29.7, rpg: 13.6, apg: 3.8, spg: 0.5, bpg: 2.7, per: 28.5, ts_pct: 0.609, bpm: 8.8 } },
  { id: 72, name: 'Bill Russell',            position: 'C',  value: 78.4, active: false, era: '1962', stats: { ppg: 18.9, rpg: 23.6, apg: 4.5, spg: 1.5, bpg: 6.0, per: 27.0, ts_pct: 0.530, bpm: 11.5 } },
  { id: 73, name: 'Hakeem Olajuwon',         position: 'C',  value: 70.1, active: false, era: '1994', stats: { ppg: 27.3, rpg: 11.9, apg: 3.6, spg: 2.3, bpg: 4.2, per: 29.5, ts_pct: 0.576, bpm: 11.5 } },
  { id: 74, name: 'Patrick Ewing',           position: 'C',  value: 61.4, active: false, era: '1990', stats: { ppg: 28.6, rpg: 10.9, apg: 2.2, spg: 0.9, bpg: 3.9, per: 25.0, ts_pct: 0.567, bpm: 7.5 } },
  { id: 75, name: 'David Robinson',          position: 'C',  value: 66.5, active: false, era: '1994', stats: { ppg: 29.8, rpg: 10.7, apg: 2.9, spg: 1.7, bpg: 3.3, per: 29.0, ts_pct: 0.609, bpm: 10.5 } },
  { id: 76, name: 'Moses Malone',            position: 'C',  value: 65.7, active: false, era: '1982', stats: { ppg: 31.1, rpg: 14.7, apg: 1.8, spg: 1.4, bpg: 1.8, per: 27.0, ts_pct: 0.576, bpm: 8.5 } },
  { id: 83, name: 'Willis Reed',             position: 'C',  value: 51.0, active: false, era: '1970', stats: { ppg: 21.7, rpg: 13.9, apg: 2.0, spg: 0.8, bpg: 1.3, per: 22.0, ts_pct: 0.556, bpm: 6.5 } },
  { id: 84, name: 'Alonzo Mourning',         position: 'C',  value: 53.9, active: false, era: '1996', stats: { ppg: 23.2, rpg: 10.4, apg: 1.2, spg: 0.9, bpg: 3.9, per: 25.0, ts_pct: 0.582, bpm: 7.5 } },
  { id: 85, name: 'Robert Parish',           position: 'C',  value: 44.5, active: false, era: '1982', stats: { ppg: 19.9, rpg: 10.4, apg: 2.1, spg: 1.0, bpg: 1.4, per: 20.5, ts_pct: 0.558, bpm: 5.0 } },
  { id: 86, name: 'Vlade Divac',             position: 'C',  value: 35.8, active: false, era: '1991', stats: { ppg: 14.4, rpg: 8.3, apg: 2.9, spg: 1.0, bpg: 1.8, per: 16.5, ts_pct: 0.556, bpm: 2.0 } },
  { id: 125, name: 'Bill Walton',            position: 'C',  value: 57.4, active: false, era: '1977', stats: { ppg: 18.6, rpg: 14.4, apg: 3.8, spg: 0.9, bpg: 3.3, per: 24.5, ts_pct: 0.592, bpm: 9.0 } },
  { id: 126, name: 'Nate Thurmond',          position: 'C',  value: 65.6, active: false, era: '1968', stats: { ppg: 22.0, rpg: 22.0, apg: 2.0, spg: 1.0, bpg: 2.5, per: 24.0, ts_pct: 0.548, bpm: 9.0 } },
];

// Returns players filtered by position and active status
export function getPlayersByPosition(position, includeHistorical) {
  return PLAYERS.filter(
    (p) => p.position === position && (includeHistorical || p.active)
  );
}

// Returns any-position players for the 6th man round
export function getAllPlayers(includeHistorical) {
  return PLAYERS.filter((p) => includeHistorical || p.active);
}

// Shuffle an array (Fisher-Yates)
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Pick n random items from an array
export function pickRandom(arr, n) {
  return shuffle(arr).slice(0, n);
}
