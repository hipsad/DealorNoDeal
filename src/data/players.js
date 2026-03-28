// NBA Player dataset with career stats used as fallback when API is unavailable.
// value = career PPG (used as the primary rating for the game)
// active = currently playing in the NBA
// position = primary position (PG, SG, SF, PF, C)

export const POSITIONS = ['PG', 'SG', 'SF', 'PF', 'C'];
export const ROUND_LABELS = ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center', '6th Man'];
export const ROUND_SHORT = ['PG', 'SG', 'SF', 'PF', 'C', '6th Man'];

export const PLAYERS = [
  // ─── POINT GUARDS (active) ───────────────────────────────────────────────
  { id: 9,  name: 'Stephen Curry',           position: 'PG', value: 24.8, active: true,  era: '2010s' },
  { id: 10, name: 'Chris Paul',              position: 'PG', value: 17.7, active: true,  era: '2010s' },
  { id: 12, name: 'Damian Lillard',          position: 'PG', value: 25.5, active: true,  era: '2010s' },
  { id: 13, name: 'Kyrie Irving',            position: 'PG', value: 22.8, active: true,  era: '2010s' },
  { id: 14, name: 'Trae Young',              position: 'PG', value: 25.6, active: true,  era: '2020s' },
  { id: 15, name: 'Luka Dončić',             position: 'PG', value: 28.4, active: true,  era: '2020s' },
  { id: 16, name: 'Ja Morant',               position: 'PG', value: 22.3, active: true,  era: '2020s' },
  { id: 17, name: "De'Aaron Fox",            position: 'PG', value: 19.2, active: true,  era: '2020s' },
  { id: 18, name: 'Shai Gilgeous-Alexander', position: 'PG', value: 24.1, active: true,  era: '2020s' },
  { id: 87, name: 'Fred VanVleet',           position: 'PG', value: 14.7, active: true,  era: '2020s' },
  { id: 88, name: 'Tyrese Haliburton',       position: 'PG', value: 18.6, active: true,  era: '2020s' },
  { id: 89, name: 'Cade Cunningham',         position: 'PG', value: 20.4, active: true,  era: '2020s' },
  { id: 90, name: 'Jalen Brunson',           position: 'PG', value: 18.0, active: true,  era: '2020s' },
  { id: 91, name: 'LaMelo Ball',             position: 'PG', value: 20.7, active: true,  era: '2020s' },

  // ─── POINT GUARDS (historical) ───────────────────────────────────────────
  { id: 1,  name: 'Magic Johnson',           position: 'PG', value: 19.5, active: false, era: '1980s' },
  { id: 2,  name: 'Isiah Thomas',            position: 'PG', value: 19.2, active: false, era: '1980s' },
  { id: 3,  name: 'John Stockton',           position: 'PG', value: 13.1, active: false, era: '1990s' },
  { id: 4,  name: 'Gary Payton',             position: 'PG', value: 16.3, active: false, era: '1990s' },
  { id: 5,  name: 'Allen Iverson',           position: 'PG', value: 26.7, active: false, era: '2000s' },
  { id: 6,  name: 'Steve Nash',              position: 'PG', value: 14.3, active: false, era: '2000s' },
  { id: 7,  name: 'Jason Kidd',              position: 'PG', value: 12.6, active: false, era: '2000s' },
  { id: 8,  name: 'Tony Parker',             position: 'PG', value: 15.5, active: false, era: '2000s' },
  { id: 11, name: 'Russell Westbrook',       position: 'PG', value: 21.4, active: false, era: '2010s' },
  { id: 19, name: 'Walt Frazier',            position: 'PG', value: 18.9, active: false, era: '1970s' },
  { id: 20, name: 'Bob Cousy',               position: 'PG', value: 18.4, active: false, era: '1950s' },
  { id: 92, name: 'Tiny Archibald',          position: 'PG', value: 18.8, active: false, era: '1970s' },
  { id: 93, name: 'Kevin Johnson',           position: 'PG', value: 17.9, active: false, era: '1990s' },

  // ─── SHOOTING GUARDS (active) ────────────────────────────────────────────
  { id: 28, name: 'James Harden',            position: 'SG', value: 22.5, active: true,  era: '2010s' },
  { id: 29, name: 'Devin Booker',            position: 'SG', value: 22.5, active: true,  era: '2020s' },
  { id: 30, name: 'Donovan Mitchell',        position: 'SG', value: 22.4, active: true,  era: '2020s' },
  { id: 31, name: 'Zach LaVine',             position: 'SG', value: 19.5, active: true,  era: '2020s' },
  { id: 32, name: 'Bradley Beal',            position: 'SG', value: 21.0, active: true,  era: '2020s' },
  { id: 94, name: 'Tyler Herro',             position: 'SG', value: 16.4, active: true,  era: '2020s' },
  { id: 95, name: 'Jalen Green',             position: 'SG', value: 18.6, active: true,  era: '2020s' },
  { id: 96, name: 'Anfernee Simons',         position: 'SG', value: 17.4, active: true,  era: '2020s' },
  { id: 97, name: 'Desmond Bane',            position: 'SG', value: 18.2, active: true,  era: '2020s' },
  { id: 98, name: 'Jordan Poole',            position: 'SG', value: 15.8, active: true,  era: '2020s' },
  { id: 99, name: 'Cam Thomas',              position: 'SG', value: 19.2, active: true,  era: '2020s' },
  { id: 100, name: 'Anthony Edwards',        position: 'SG', value: 21.7, active: true,  era: '2020s' },

  // ─── SHOOTING GUARDS (historical) ────────────────────────────────────────
  { id: 21, name: 'Michael Jordan',          position: 'SG', value: 30.1, active: false, era: '1990s' },
  { id: 22, name: 'Kobe Bryant',             position: 'SG', value: 25.0, active: false, era: '2000s' },
  { id: 23, name: 'Jerry West',              position: 'SG', value: 27.0, active: false, era: '1960s' },
  { id: 24, name: 'Clyde Drexler',           position: 'SG', value: 20.4, active: false, era: '1990s' },
  { id: 25, name: 'Reggie Miller',           position: 'SG', value: 18.2, active: false, era: '1990s' },
  { id: 26, name: 'Ray Allen',               position: 'SG', value: 18.9, active: false, era: '2000s' },
  { id: 27, name: 'Dwyane Wade',             position: 'SG', value: 22.0, active: false, era: '2000s' },
  { id: 33, name: 'Anfernee Hardaway',       position: 'SG', value: 14.7, active: false, era: '1990s' },
  { id: 34, name: 'Manu Ginóbili',           position: 'SG', value: 13.3, active: false, era: '2000s' },
  { id: 35, name: 'Pete Maravich',           position: 'SG', value: 24.2, active: false, era: '1970s' },
  { id: 36, name: 'Hal Greer',               position: 'SG', value: 19.2, active: false, era: '1960s' },
  { id: 101, name: 'Vince Carter',           position: 'SG', value: 16.7, active: false, era: '2000s' },
  { id: 102, name: 'Tracy McGrady',          position: 'SG', value: 19.6, active: false, era: '2000s' },

  // ─── SMALL FORWARDS (active) ─────────────────────────────────────────────
  { id: 37, name: 'LeBron James',            position: 'SF', value: 27.1, active: true,  era: '2000s' },
  { id: 42, name: 'Kevin Durant',            position: 'SF', value: 27.3, active: true,  era: '2010s' },
  { id: 43, name: 'Kawhi Leonard',           position: 'SF', value: 18.0, active: true,  era: '2010s' },
  { id: 44, name: 'Paul George',             position: 'SF', value: 19.4, active: true,  era: '2010s' },
  { id: 45, name: 'Jayson Tatum',            position: 'SF', value: 23.5, active: true,  era: '2020s' },
  { id: 46, name: 'Jimmy Butler',            position: 'SF', value: 18.2, active: true,  era: '2020s' },
  { id: 52, name: 'Brandon Ingram',          position: 'SF', value: 19.1, active: true,  era: '2020s' },
  { id: 103, name: 'OG Anunoby',             position: 'SF', value: 12.8, active: true,  era: '2020s' },
  { id: 104, name: 'Mikal Bridges',          position: 'SF', value: 14.1, active: true,  era: '2020s' },
  { id: 105, name: 'Paolo Banchero',         position: 'SF', value: 21.9, active: true,  era: '2020s' },
  { id: 106, name: 'Scottie Barnes',         position: 'SF', value: 15.3, active: true,  era: '2020s' },
  { id: 107, name: 'Franz Wagner',           position: 'SF', value: 18.6, active: true,  era: '2020s' },
  { id: 108, name: 'Andrew Wiggins',         position: 'SF', value: 17.1, active: true,  era: '2020s' },

  // ─── SMALL FORWARDS (historical) ─────────────────────────────────────────
  { id: 38, name: 'Larry Bird',              position: 'SF', value: 24.3, active: false, era: '1980s' },
  { id: 39, name: 'Scottie Pippen',          position: 'SF', value: 16.1, active: false, era: '1990s' },
  { id: 40, name: 'Julius Erving',           position: 'SF', value: 24.2, active: false, era: '1980s' },
  { id: 41, name: 'Rick Barry',              position: 'SF', value: 23.2, active: false, era: '1970s' },
  { id: 47, name: 'Elgin Baylor',            position: 'SF', value: 27.4, active: false, era: '1960s' },
  { id: 48, name: 'John Havlicek',           position: 'SF', value: 20.8, active: false, era: '1970s' },
  { id: 49, name: 'Dominique Wilkins',       position: 'SF', value: 24.8, active: false, era: '1990s' },
  { id: 50, name: 'Alex English',            position: 'SF', value: 21.5, active: false, era: '1980s' },
  { id: 51, name: 'Carmelo Anthony',         position: 'SF', value: 22.5, active: false, era: '2000s' },
  { id: 109, name: 'Grant Hill',             position: 'SF', value: 17.0, active: false, era: '2000s' },
  { id: 110, name: 'James Worthy',           position: 'SF', value: 17.6, active: false, era: '1980s' },

  // ─── POWER FORWARDS (active) ─────────────────────────────────────────────
  { id: 60, name: 'Giannis Antetokounmpo',   position: 'PF', value: 26.7, active: true,  era: '2020s' },
  { id: 61, name: 'Anthony Davis',           position: 'PF', value: 24.2, active: true,  era: '2010s' },
  { id: 62, name: 'Jaylen Brown',            position: 'PF', value: 18.6, active: true,  era: '2020s' },
  { id: 63, name: 'Pascal Siakam',           position: 'PF', value: 17.7, active: true,  era: '2020s' },
  { id: 64, name: 'Draymond Green',          position: 'PF', value: 8.9,  active: true,  era: '2020s' },
  { id: 67, name: 'Zion Williamson',         position: 'PF', value: 24.0, active: true,  era: '2020s' },
  { id: 68, name: 'Julius Randle',           position: 'PF', value: 16.0, active: true,  era: '2020s' },
  { id: 111, name: 'Jaren Jackson Jr.',      position: 'PF', value: 16.6, active: true,  era: '2020s' },
  { id: 112, name: 'Evan Mobley',            position: 'PF', value: 14.9, active: true,  era: '2020s' },
  { id: 113, name: 'Jabari Smith Jr.',       position: 'PF', value: 13.1, active: true,  era: '2020s' },
  { id: 114, name: 'Keegan Murray',          position: 'PF', value: 14.9, active: true,  era: '2020s' },
  { id: 115, name: 'Tobias Harris',          position: 'PF', value: 15.9, active: true,  era: '2020s' },

  // ─── POWER FORWARDS (historical) ─────────────────────────────────────────
  { id: 53, name: 'Karl Malone',             position: 'PF', value: 25.0, active: false, era: '1990s' },
  { id: 54, name: 'Charles Barkley',         position: 'PF', value: 22.1, active: false, era: '1990s' },
  { id: 55, name: 'Tim Duncan',              position: 'PF', value: 19.0, active: false, era: '2000s' },
  { id: 56, name: 'Dennis Rodman',           position: 'PF', value: 7.3,  active: false, era: '1990s' },
  { id: 57, name: 'Bob Pettit',              position: 'PF', value: 26.4, active: false, era: '1950s' },
  { id: 58, name: 'Kevin Garnett',           position: 'PF', value: 17.8, active: false, era: '2000s' },
  { id: 59, name: 'Dirk Nowitzki',           position: 'PF', value: 20.7, active: false, era: '2000s' },
  { id: 65, name: 'Elvin Hayes',             position: 'PF', value: 21.0, active: false, era: '1970s' },
  { id: 66, name: 'Jerry Lucas',             position: 'PF', value: 17.0, active: false, era: '1960s' },
  { id: 116, name: 'Chris Webber',           position: 'PF', value: 20.7, active: false, era: '2000s' },
  { id: 117, name: 'Pau Gasol',              position: 'PF', value: 17.0, active: false, era: '2000s' },
  { id: 118, name: 'Amar\'e Stoudemire',     position: 'PF', value: 18.9, active: false, era: '2000s' },

  // ─── CENTERS (active) ────────────────────────────────────────────────────
  { id: 77, name: 'Joel Embiid',             position: 'C',  value: 26.6, active: true,  era: '2020s' },
  { id: 78, name: 'Nikola Jokic',            position: 'C',  value: 21.0, active: true,  era: '2020s' },
  { id: 79, name: 'Bam Adebayo',             position: 'C',  value: 15.6, active: true,  era: '2020s' },
  { id: 80, name: 'Karl-Anthony Towns',      position: 'C',  value: 22.3, active: true,  era: '2020s' },
  { id: 81, name: 'Rudy Gobert',             position: 'C',  value: 14.9, active: true,  era: '2020s' },
  { id: 82, name: 'Kristaps Porziņģis',      position: 'C',  value: 17.8, active: true,  era: '2020s' },
  { id: 119, name: 'Alperen Sengun',         position: 'C',  value: 19.0, active: true,  era: '2020s' },
  { id: 120, name: 'Chet Holmgren',          position: 'C',  value: 16.5, active: true,  era: '2020s' },
  { id: 121, name: 'Walker Kessler',         position: 'C',  value: 10.4, active: true,  era: '2020s' },
  { id: 122, name: 'Brook Lopez',            position: 'C',  value: 13.6, active: true,  era: '2020s' },
  { id: 123, name: 'Domantas Sabonis',       position: 'C',  value: 14.8, active: true,  era: '2020s' },
  { id: 124, name: 'Myles Turner',           position: 'C',  value: 12.4, active: true,  era: '2020s' },

  // ─── CENTERS (historical) ────────────────────────────────────────────────
  { id: 69, name: 'Kareem Abdul-Jabbar',     position: 'C',  value: 24.6, active: false, era: '1980s' },
  { id: 70, name: 'Wilt Chamberlain',        position: 'C',  value: 30.1, active: false, era: '1960s' },
  { id: 71, name: "Shaquille O'Neal",        position: 'C',  value: 23.7, active: false, era: '2000s' },
  { id: 72, name: 'Bill Russell',            position: 'C',  value: 15.1, active: false, era: '1960s' },
  { id: 73, name: 'Hakeem Olajuwon',         position: 'C',  value: 21.8, active: false, era: '1990s' },
  { id: 74, name: 'Patrick Ewing',           position: 'C',  value: 21.0, active: false, era: '1990s' },
  { id: 75, name: 'David Robinson',          position: 'C',  value: 21.1, active: false, era: '1990s' },
  { id: 76, name: 'Moses Malone',            position: 'C',  value: 20.3, active: false, era: '1980s' },
  { id: 83, name: 'Willis Reed',             position: 'C',  value: 18.7, active: false, era: '1960s' },
  { id: 84, name: 'Alonzo Mourning',         position: 'C',  value: 17.1, active: false, era: '1990s' },
  { id: 85, name: 'Robert Parish',           position: 'C',  value: 14.5, active: false, era: '1980s' },
  { id: 86, name: 'Vlade Divac',             position: 'C',  value: 11.8, active: false, era: '1990s' },
  { id: 125, name: 'Bill Walton',            position: 'C',  value: 13.3, active: false, era: '1970s' },
  { id: 126, name: 'Nate Thurmond',          position: 'C',  value: 15.0, active: false, era: '1960s' },
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
