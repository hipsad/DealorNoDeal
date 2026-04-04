// NFL Player dataset — each player has a `stats` object with position-specific
// counting stats and advanced metrics.  The `value` field is a composite score
// computed by `computeNFLValue(position, stats)` in nflGameLogic.js.
//
// Composite formulas (primary stat dominates; secondary metrics add ~5-15%):
//   QB   → pass_tds + (passer_rating−80)×0.10 + (yds_per_att−6.5)×0.8
//   WR   → rec_yds  + rec_tds×20              + (yds_per_rec−10)×5
//   RB   → rush_tds + rush_yds×0.004          + (yds_per_carry−4.0)×0.8
//   CB   → ints     + pass_def×0.4            + max(0,(95−passer_rtg_allowed)×0.03)
//   S    → tackles  + ints×5                  + pass_def×2
//   EDGE → sacks    + tfl×0.2                 + qb_hits×0.08 + forced_fumbles×0.5
//
// Active players  → 2024 NFL regular-season stats
// Historical players → career-best single season (year in `era` field)

export const NFL_POSITIONS = ['QB', 'WR', 'RB', 'CB', 'S', 'EDGE'];

export const NFL_ROUND_LABELS = [
  'Quarterback', 'Wide Receiver', 'Running Back',
  'Cornerback', 'Safety', 'Edge Rusher',
];

export const NFL_ROUND_SHORT = ['QB', 'WR', 'RB', 'CB', 'S', 'EDGE'];

// Stat label shown next to the value (per position)
export const NFL_STAT_LABELS = {
  QB:   'Pass TDs',
  WR:   'Rec Yds',
  RB:   'Rush TDs',
  CB:   'INTs',
  S:    'Tackles',
  EDGE: 'Sacks',
};

// Values below these thresholds are considered "low" for that position.
// Used when distributing briefcase players to ensure a realistic spread.
export const NFL_LOW_VALUE_THRESHOLD = {
  QB:   18,   // composite QB score
  WR:   800,  // composite WR score
  RB:   9,    // composite RB score
  CB:   5,    // composite CB score
  S:    80,   // composite S score
  EDGE: 8,    // composite EDGE score
};

export const NFL_PLAYERS = [
  // ─── QUARTERBACKS ─────────────────────────────────────────────────────────
  // stats: pass_tds, passer_rating, comp_pct (%), yds_per_att
  // value = pass_tds + (passer_rating−80)×0.10 + (yds_per_att−6.5)×0.8
  // Active (2024 NFL season)
  { id: 1001, name: 'Joe Burrow',          position: 'QB', value: 46.7, active: true,  era: '2024', stats: { pass_tds: 43, passer_rating: 105.3, comp_pct: 67.7, yds_per_att: 8.0 } },
  { id: 1002, name: 'Baker Mayfield',      position: 'QB', value: 44.7, active: true,  era: '2024', stats: { pass_tds: 41, passer_rating: 104.0, comp_pct: 70.0, yds_per_att: 8.1 } },
  { id: 1003, name: 'Lamar Jackson',       position: 'QB', value: 47.3, active: true,  era: '2024', stats: { pass_tds: 41, passer_rating: 119.6, comp_pct: 67.6, yds_per_att: 9.4 } },
  { id: 1004, name: 'Sam Darnold',         position: 'QB', value: 37.1, active: true,  era: '2024', stats: { pass_tds: 35, passer_rating:  92.5, comp_pct: 63.8, yds_per_att: 7.5 } },
  { id: 1005, name: 'Josh Allen',          position: 'QB', value: 30.0, active: true,  era: '2024', stats: { pass_tds: 28, passer_rating:  92.1, comp_pct: 63.6, yds_per_att: 7.5 } },
  { id: 1006, name: 'Bo Nix',              position: 'QB', value: 31.1, active: true,  era: '2024', stats: { pass_tds: 29, passer_rating:  92.1, comp_pct: 66.9, yds_per_att: 7.6 } },
  { id: 1007, name: 'Aaron Rodgers',       position: 'QB', value: 29.4, active: true,  era: '2024', stats: { pass_tds: 28, passer_rating:  89.5, comp_pct: 63.8, yds_per_att: 7.1 } },
  { id: 1008, name: 'Patrick Mahomes',     position: 'QB', value: 29.1, active: true,  era: '2024', stats: { pass_tds: 26, passer_rating: 101.4, comp_pct: 70.1, yds_per_att: 7.7 } },
  { id: 1009, name: 'Kyler Murray',        position: 'QB', value: 22.9, active: true,  era: '2024', stats: { pass_tds: 21, passer_rating:  91.3, comp_pct: 66.6, yds_per_att: 7.4 } },
  { id: 1010, name: 'Jayden Daniels',      position: 'QB', value: 28.4, active: true,  era: '2024', stats: { pass_tds: 25, passer_rating: 100.1, comp_pct: 69.3, yds_per_att: 8.2 } },
  { id: 1011, name: 'Jordan Love',         position: 'QB', value: 27.0, active: true,  era: '2024', stats: { pass_tds: 25, passer_rating:  92.3, comp_pct: 63.8, yds_per_att: 7.5 } },
  { id: 1012, name: 'Justin Herbert',      position: 'QB', value: 24.7, active: true,  era: '2024', stats: { pass_tds: 23, passer_rating:  88.5, comp_pct: 66.5, yds_per_att: 7.5 } },
  { id: 1013, name: 'Tua Tagovailoa',      position: 'QB', value: 21.6, active: true,  era: '2024', stats: { pass_tds: 19, passer_rating:  95.3, comp_pct: 69.1, yds_per_att: 7.8 } },
  { id: 1014, name: 'Jalen Hurts',         position: 'QB', value: 18.6, active: true,  era: '2024', stats: { pass_tds: 18, passer_rating:  84.0, comp_pct: 63.0, yds_per_att: 6.8 } },
  { id: 1015, name: 'Matthew Stafford',    position: 'QB', value: 22.5, active: true,  era: '2024', stats: { pass_tds: 20, passer_rating:  95.4, comp_pct: 69.2, yds_per_att: 7.7 } },
  { id: 1016, name: 'C.J. Stroud',         position: 'QB', value: 20.1, active: true,  era: '2024', stats: { pass_tds: 20, passer_rating:  79.3, comp_pct: 63.9, yds_per_att: 6.7 } },
  { id: 1017, name: 'Caleb Williams',      position: 'QB', value: 20.4, active: true,  era: '2024', stats: { pass_tds: 20, passer_rating:  81.2, comp_pct: 61.0, yds_per_att: 6.8 } },
  { id: 1018, name: 'Geno Smith',          position: 'QB', value: 22.7, active: true,  era: '2024', stats: { pass_tds: 21, passer_rating:  91.2, comp_pct: 68.6, yds_per_att: 7.2 } },
  { id: 1019, name: 'Brock Purdy',         position: 'QB', value: 23.3, active: true,  era: '2024', stats: { pass_tds: 20, passer_rating: 101.0, comp_pct: 71.4, yds_per_att: 8.0 } },
  { id: 1020, name: 'Kirk Cousins',        position: 'QB', value: 20.2, active: true,  era: '2024', stats: { pass_tds: 18, passer_rating:  94.0, comp_pct: 67.9, yds_per_att: 7.5 } },
  { id: 1021, name: 'Russell Wilson',      position: 'QB', value: 18.6, active: true,  era: '2024', stats: { pass_tds: 16, passer_rating:  95.2, comp_pct: 67.4, yds_per_att: 7.8 } },
  { id: 1022, name: 'Trevor Lawrence',     position: 'QB', value: 15.2, active: true,  era: '2024', stats: { pass_tds: 15, passer_rating:  79.5, comp_pct: 62.0, yds_per_att: 6.8 } },
  { id: 1023, name: 'Drake Maye',          position: 'QB', value: 15.4, active: true,  era: '2024', stats: { pass_tds: 15, passer_rating:  80.5, comp_pct: 61.5, yds_per_att: 6.9 } },
  { id: 1024, name: 'Bryce Young',         position: 'QB', value: 14.9, active: true,  era: '2024', stats: { pass_tds: 15, passer_rating:  79.0, comp_pct: 63.0, yds_per_att: 6.5 } },
  { id: 1025, name: 'Dak Prescott',        position: 'QB', value: 10.5, active: true,  era: '2024', stats: { pass_tds: 11, passer_rating:  75.0, comp_pct: 61.0, yds_per_att: 6.5 } },
  { id: 2001, name: 'Jared Goff',          position: 'QB', value: 40.6, active: true,  era: '2024', stats: { pass_tds: 37, passer_rating: 103.8, comp_pct: 70.3, yds_per_att: 8.0 } },
  // Historical (career-best single season)
  { id: 1026, name: 'Peyton Manning',      position: 'QB', value: 59.7, active: false, era: '2013', stats: { pass_tds: 55, passer_rating: 115.1, comp_pct: 68.3, yds_per_att: 8.0 } },
  { id: 1027, name: 'Tom Brady',           position: 'QB', value: 55.2, active: false, era: '2007', stats: { pass_tds: 50, passer_rating: 117.2, comp_pct: 68.9, yds_per_att: 8.3 } },
  { id: 1028, name: 'Patrick Mahomes*',    position: 'QB', value: 53.7, active: false, era: '2022', stats: { pass_tds: 50, passer_rating: 105.2, comp_pct: 67.1, yds_per_att: 8.0 } },
  { id: 1029, name: 'Drew Brees',          position: 'QB', value: 51.2, active: false, era: '2011', stats: { pass_tds: 46, passer_rating: 110.6, comp_pct: 71.2, yds_per_att: 9.2 } },
  { id: 1030, name: 'Dan Marino',          position: 'QB', value: 52.9, active: false, era: '1984', stats: { pass_tds: 48, passer_rating: 108.9, comp_pct: 64.2, yds_per_att: 9.0 } },
  { id: 1031, name: 'Steve Young',         position: 'QB', value: 41.3, active: false, era: '1994', stats: { pass_tds: 36, passer_rating: 112.8, comp_pct: 70.3, yds_per_att: 9.0 } },
  { id: 1032, name: "Y.A. Tittle",         position: 'QB', value: 40.5, active: false, era: '1963', stats: { pass_tds: 36, passer_rating: 104.8, comp_pct: 60.0, yds_per_att: 9.0 } },
  { id: 1033, name: 'Brett Favre',         position: 'QB', value: 42.2, active: false, era: '1995', stats: { pass_tds: 39, passer_rating:  99.5, comp_pct: 63.0, yds_per_att: 8.0 } },
  { id: 1034, name: 'Philip Rivers',       position: 'QB', value: 38.5, active: false, era: '2008', stats: { pass_tds: 34, passer_rating: 105.5, comp_pct: 65.2, yds_per_att: 8.9 } },
  { id: 1035, name: 'Jim Kelly',           position: 'QB', value: 36.7, active: false, era: '1991', stats: { pass_tds: 33, passer_rating: 101.2, comp_pct: 63.3, yds_per_att: 8.5 } },
  { id: 1036, name: 'Warren Moon',         position: 'QB', value: 36.0, active: false, era: '1990', stats: { pass_tds: 33, passer_rating:  96.8, comp_pct: 61.7, yds_per_att: 8.2 } },
  { id: 1037, name: 'Johnny Unitas',       position: 'QB', value: 36.4, active: false, era: '1959', stats: { pass_tds: 32, passer_rating: 102.0, comp_pct: 54.6, yds_per_att: 9.2 } },
  { id: 1038, name: 'Sonny Jurgensen',     position: 'QB', value: 34.9, active: false, era: '1967', stats: { pass_tds: 31, passer_rating:  98.5, comp_pct: 56.8, yds_per_att: 9.0 } },
  { id: 1039, name: 'Dan Fouts',           position: 'QB', value: 32.5, active: false, era: '1982', stats: { pass_tds: 30, passer_rating:  92.5, comp_pct: 60.9, yds_per_att: 8.0 } },
  { id: 1040, name: 'Len Dawson',          position: 'QB', value: 32.6, active: false, era: '1966', stats: { pass_tds: 30, passer_rating:  89.9, comp_pct: 56.5, yds_per_att: 8.5 } },
  { id: 1041, name: 'Terry Bradshaw',      position: 'QB', value: 29.6, active: false, era: '1978', stats: { pass_tds: 28, passer_rating:  84.7, comp_pct: 56.3, yds_per_att: 7.9 } },
  { id: 1042, name: 'Ken Stabler',         position: 'QB', value: 30.5, active: false, era: '1976', stats: { pass_tds: 27, passer_rating: 103.4, comp_pct: 66.7, yds_per_att: 8.0 } },
  { id: 1043, name: 'John Elway',          position: 'QB', value: 28.9, active: false, era: '1997', stats: { pass_tds: 27, passer_rating:  87.5, comp_pct: 55.7, yds_per_att: 7.9 } },
  { id: 1044, name: 'Joe Montana',         position: 'QB', value: 30.9, active: false, era: '1989', stats: { pass_tds: 26, passer_rating: 112.4, comp_pct: 70.2, yds_per_att: 8.6 } },
  { id: 1045, name: 'Roger Staubach',      position: 'QB', value: 29.1, active: false, era: '1979', stats: { pass_tds: 25, passer_rating: 104.8, comp_pct: 63.5, yds_per_att: 8.5 } },
  { id: 1046, name: 'Fran Tarkenton',      position: 'QB', value: 27.3, active: false, era: '1975', stats: { pass_tds: 25, passer_rating:  92.3, comp_pct: 64.0, yds_per_att: 7.8 } },
  { id: 1047, name: 'Norm Van Brocklin',   position: 'QB', value: 29.7, active: false, era: '1960', stats: { pass_tds: 24, passer_rating: 110.2, comp_pct: 54.6, yds_per_att: 9.8 } },
  { id: 1048, name: 'Troy Aikman',         position: 'QB', value: 26.1, active: false, era: '1992', stats: { pass_tds: 23, passer_rating:  99.0, comp_pct: 69.1, yds_per_att: 8.0 } },
  { id: 1049, name: 'Bob Griese',          position: 'QB', value: 25.4, active: false, era: '1977', stats: { pass_tds: 22, passer_rating:  97.5, comp_pct: 61.3, yds_per_att: 8.5 } },

  // ─── WIDE RECEIVERS ────────────────────────────────────────────────────────
  // stats: rec_yds, rec_tds, yds_per_rec, catch_pct (%)
  // value = rec_yds + rec_tds×20 + (yds_per_rec−10)×5
  // Active (2024 NFL season, source: nflverse)
  { id: 1102, name: "Ja'Marr Chase",       position: 'WR', value: 2075.5, active: true,  era: '2024', stats: { rec_yds: 1708, rec_tds: 17, yds_per_rec: 15.5, catch_pct: 72 } },
  { id: 1103, name: 'Justin Jefferson',    position: 'WR', value: 1759.5, active: true,  era: '2024', stats: { rec_yds: 1533, rec_tds: 10, yds_per_rec: 15.3, catch_pct: 72 } },
  { id: 1104, name: 'Brian Thomas Jr.',    position: 'WR', value: 1507,   active: true,  era: '2024', stats: { rec_yds: 1282, rec_tds: 10, yds_per_rec: 15.0, catch_pct: 66 } },
  { id: 1109, name: 'Drake London',        position: 'WR', value: 1397.5, active: true,  era: '2024', stats: { rec_yds: 1271, rec_tds:  6, yds_per_rec: 11.3, catch_pct: 69 } },
  { id: 1106, name: 'Amon-Ra St. Brown',   position: 'WR', value: 1425.5, active: true,  era: '2024', stats: { rec_yds: 1263, rec_tds:  8, yds_per_rec: 10.5, catch_pct: 75 } },
  { id: 2103, name: 'Jerry Jeudy',         position: 'WR', value: 1386.5, active: true,  era: '2024', stats: { rec_yds: 1229, rec_tds:  7, yds_per_rec: 13.5, catch_pct: 70 } },
  { id: 1105, name: 'Malik Nabers',        position: 'WR', value: 1354,   active: true,  era: '2024', stats: { rec_yds: 1204, rec_tds:  7, yds_per_rec: 12.0, catch_pct: 65 } },
  { id: 1101, name: 'CeeDee Lamb',         position: 'WR', value: 1429,   active: true,  era: '2024', stats: { rec_yds: 1194, rec_tds: 11, yds_per_rec: 13.0, catch_pct: 71 } },
  { id: 1111, name: 'Ladd McConkey',       position: 'WR', value: 1261.5, active: true,  era: '2024', stats: { rec_yds: 1149, rec_tds:  5, yds_per_rec: 12.5, catch_pct: 76 } },
  { id: 2104, name: 'Jaxon Smith-Njigba',  position: 'WR', value: 1295,   active: true,  era: '2024', stats: { rec_yds: 1130, rec_tds:  8, yds_per_rec: 11.0, catch_pct: 78 } },
  { id: 1108, name: 'Garrett Wilson',      position: 'WR', value: 1266.5, active: true,  era: '2024', stats: { rec_yds: 1104, rec_tds:  7, yds_per_rec: 14.5, catch_pct: 68 } },
  { id: 2105, name: 'Terry McLaurin',      position: 'WR', value: 1241,   active: true,  era: '2024', stats: { rec_yds: 1096, rec_tds:  6, yds_per_rec: 15.0, catch_pct: 67 } },
  { id: 2106, name: 'Courtland Sutton',    position: 'WR', value: 1311,   active: true,  era: '2024', stats: { rec_yds: 1081, rec_tds: 10, yds_per_rec: 16.0, catch_pct: 68 } },
  { id: 1110, name: 'A.J. Brown',          position: 'WR', value: 1281.5, active: true,  era: '2024', stats: { rec_yds: 1079, rec_tds:  9, yds_per_rec: 14.5, catch_pct: 65 } },
  { id: 1120, name: 'Davante Adams',       position: 'WR', value: 1215.5, active: true,  era: '2024', stats: { rec_yds: 1063, rec_tds:  7, yds_per_rec: 12.5, catch_pct: 70 } },
  { id: 2107, name: 'Zay Flowers',         position: 'WR', value: 1204,   active: true,  era: '2024', stats: { rec_yds: 1059, rec_tds:  7, yds_per_rec: 11.0, catch_pct: 72 } },
  { id: 2108, name: 'Jakobi Meyers',       position: 'WR', value: 1132,   active: true,  era: '2024', stats: { rec_yds: 1027, rec_tds:  5, yds_per_rec: 11.0, catch_pct: 74 } },
  { id: 2109, name: 'Calvin Ridley',       position: 'WR', value: 1132,   active: true,  era: '2024', stats: { rec_yds: 1017, rec_tds:  5, yds_per_rec: 13.0, catch_pct: 68 } },
  { id: 2110, name: 'Nico Collins',        position: 'WR', value: 1191,   active: true,  era: '2024', stats: { rec_yds: 1006, rec_tds:  8, yds_per_rec: 15.0, catch_pct: 67 } },
  { id: 1114, name: 'Mike Evans',          position: 'WR', value: 1191.5, active: true,  era: '2024', stats: { rec_yds: 1004, rec_tds:  8, yds_per_rec: 15.5, catch_pct: 65 } },
  { id: 2111, name: 'Jameson Williams',    position: 'WR', value: 1176,   active: true,  era: '2024', stats: { rec_yds: 1001, rec_tds:  7, yds_per_rec: 17.0, catch_pct: 59 } },
  { id: 1118, name: 'D.K. Metcalf',        position: 'WR', value: 1134.5, active: true,  era: '2024', stats: { rec_yds:  992, rec_tds:  6, yds_per_rec: 14.5, catch_pct: 62 } },
  { id: 2112, name: 'Darnell Mooney',      position: 'WR', value: 1082,   active: true,  era: '2024', stats: { rec_yds:  992, rec_tds:  4, yds_per_rec: 12.0, catch_pct: 71 } },
  { id: 1124, name: 'Puka Nacua',          position: 'WR', value: 1072.5, active: true,  era: '2024', stats: { rec_yds:  990, rec_tds:  4, yds_per_rec: 10.5, catch_pct: 77 } },
  { id: 2113, name: 'D.J. Moore',          position: 'WR', value: 1136,   active: true,  era: '2024', stats: { rec_yds:  966, rec_tds:  8, yds_per_rec: 12.0, catch_pct: 72 } },
  { id: 1107, name: 'Tyreek Hill',         position: 'WR', value: 1034,   active: true,  era: '2024', stats: { rec_yds:  959, rec_tds:  3, yds_per_rec: 13.0, catch_pct: 58 } },
  { id: 1116, name: 'Tee Higgins',         position: 'WR', value: 1031,   active: true,  era: '2024', stats: { rec_yds:  911, rec_tds:  5, yds_per_rec: 14.0, catch_pct: 69 } },
  { id: 2114, name: 'George Pickens',      position: 'WR', value: 1030,   active: true,  era: '2024', stats: { rec_yds:  900, rec_tds:  5, yds_per_rec: 16.0, catch_pct: 57 } },
  { id: 2101, name: 'Marvin Harrison Jr.', position: 'WR', value: 1065,   active: true,  era: '2024', stats: { rec_yds:  885, rec_tds:  8, yds_per_rec: 14.0, catch_pct: 63 } },
  { id: 2115, name: 'Jordan Addison',      position: 'WR', value: 1012.5, active: true,  era: '2024', stats: { rec_yds:  875, rec_tds:  6, yds_per_rec: 13.5, catch_pct: 67 } },
  { id: 2116, name: 'Jayden Reed',         position: 'WR', value: 1004.5, active: true,  era: '2024', stats: { rec_yds:  857, rec_tds:  7, yds_per_rec: 11.5, catch_pct: 75 } },
  { id: 1117, name: 'DeVonta Smith',       position: 'WR', value:  973,   active: true,  era: '2024', stats: { rec_yds:  833, rec_tds:  6, yds_per_rec: 14.0, catch_pct: 70 } },
  { id: 2117, name: 'Alec Pierce',         position: 'WR', value:  926.5, active: true,  era: '2024', stats: { rec_yds:  824, rec_tds:  4, yds_per_rec: 14.5, catch_pct: 60 } },
  { id: 2118, name: 'Khalil Shakir',       position: 'WR', value:  903.5, active: true,  era: '2024', stats: { rec_yds:  821, rec_tds:  4, yds_per_rec: 10.5, catch_pct: 75 } },
  { id: 1113, name: 'Jaylen Waddle',       position: 'WR', value:  829,   active: true,  era: '2024', stats: { rec_yds:  744, rec_tds:  4, yds_per_rec: 11.0, catch_pct: 71 } },
  { id: 1121, name: 'Keenan Allen',        position: 'WR', value:  854,   active: true,  era: '2024', stats: { rec_yds:  744, rec_tds:  5, yds_per_rec: 12.0, catch_pct: 77 } },
  { id: 1119, name: 'Rome Odunze',         position: 'WR', value:  826.5, active: true,  era: '2024', stats: { rec_yds:  734, rec_tds:  4, yds_per_rec: 12.5, catch_pct: 66 } },
  { id: 1115, name: 'Cooper Kupp',         position: 'WR', value:  800,   active: true,  era: '2024', stats: { rec_yds:  710, rec_tds:  4, yds_per_rec: 12.0, catch_pct: 75 } },
  { id: 1122, name: 'DeAndre Hopkins',     position: 'WR', value:  720,   active: true,  era: '2024', stats: { rec_yds:  610, rec_tds:  5, yds_per_rec: 12.0, catch_pct: 73 } },
  { id: 1123, name: 'Tyler Lockett',       position: 'WR', value:  695,   active: true,  era: '2024', stats: { rec_yds:  600, rec_tds:  4, yds_per_rec: 13.0, catch_pct: 71 } },
  { id: 2102, name: 'Xavier Worthy',       position: 'WR', value:  778,   active: true,  era: '2024', stats: { rec_yds:  638, rec_tds:  6, yds_per_rec: 14.0, catch_pct: 65 } },
  { id: 1112, name: 'Brandon Aiyuk',       position: 'WR', value:  419,   active: true,  era: '2024', stats: { rec_yds:  374, rec_tds:  2, yds_per_rec: 11.0, catch_pct: 72 } },
  // Historical (career-best single season)
  { id: 1125, name: 'Calvin Johnson',      position: 'WR', value: 2099,   active: false, era: '2012', stats: { rec_yds: 1964, rec_tds:  5, yds_per_rec: 17.0, catch_pct: 59 } },
  { id: 1126, name: 'Julio Jones',         position: 'WR', value: 2059.5, active: false, era: '2015', stats: { rec_yds: 1871, rec_tds:  8, yds_per_rec: 15.7, catch_pct: 66 } },
  { id: 1127, name: 'Antonio Brown',       position: 'WR', value: 2049,   active: false, era: '2015', stats: { rec_yds: 1834, rec_tds: 10, yds_per_rec: 13.0, catch_pct: 68 } },
  { id: 1128, name: 'Isaac Bruce',         position: 'WR', value: 2080.5, active: false, era: '1995', stats: { rec_yds: 1781, rec_tds: 13, yds_per_rec: 17.9, catch_pct: 60 } },
  { id: 1129, name: 'Jerry Rice',          position: 'WR', value: 2175,   active: false, era: '1995', stats: { rec_yds: 1848, rec_tds: 15, yds_per_rec: 15.4, catch_pct: 68 } },
  { id: 1130, name: 'Marvin Harrison',     position: 'WR', value: 2045,   active: false, era: '2002', stats: { rec_yds: 1722, rec_tds: 15, yds_per_rec: 14.6, catch_pct: 68 } },
  { id: 1131, name: 'Torry Holt',          position: 'WR', value: 1965,   active: false, era: '2003', stats: { rec_yds: 1696, rec_tds: 12, yds_per_rec: 15.8, catch_pct: 65 } },
  { id: 1132, name: 'Randy Moss',          position: 'WR', value: 2012,   active: false, era: '2003', stats: { rec_yds: 1632, rec_tds: 17, yds_per_rec: 18.0, catch_pct: 62 } },
  { id: 1133, name: 'Lance Alworth',       position: 'WR', value: 1932,   active: false, era: '1965', stats: { rec_yds: 1602, rec_tds: 14, yds_per_rec: 20.0, catch_pct: 53 } },
  { id: 1134, name: 'Andre Johnson',       position: 'WR', value: 1778,   active: false, era: '2008', stats: { rec_yds: 1598, rec_tds:  8, yds_per_rec: 14.0, catch_pct: 66 } },
  { id: 1135, name: 'Reggie Wayne',        position: 'WR', value: 1772.5, active: false, era: '2012', stats: { rec_yds: 1510, rec_tds: 12, yds_per_rec: 14.5, catch_pct: 71 } },
  { id: 1136, name: 'Larry Fitzgerald',    position: 'WR', value: 1693.5, active: false, era: '2008', stats: { rec_yds: 1431, rec_tds: 12, yds_per_rec: 14.5, catch_pct: 71 } },
  { id: 1137, name: 'Don Maynard',         position: 'WR', value: 1694,   active: false, era: '1967', stats: { rec_yds: 1434, rec_tds: 10, yds_per_rec: 22.0, catch_pct: 51 } },
  { id: 1138, name: 'Terrell Owens',       position: 'WR', value: 1786,   active: false, era: '2007', stats: { rec_yds: 1451, rec_tds: 15, yds_per_rec: 17.0, catch_pct: 65 } },
  { id: 1139, name: 'Tim Brown',           position: 'WR', value: 1673,   active: false, era: '1997', stats: { rec_yds: 1408, rec_tds: 12, yds_per_rec: 15.0, catch_pct: 63 } },
  { id: 1140, name: 'Cris Carter',         position: 'WR', value: 1723.5, active: false, era: '1995', stats: { rec_yds: 1371, rec_tds: 17, yds_per_rec: 12.5, catch_pct: 72 } },
  { id: 1141, name: 'James Lofton',        position: 'WR', value: 1571,   active: false, era: '1984', stats: { rec_yds: 1361, rec_tds:  8, yds_per_rec: 20.0, catch_pct: 57 } },
  { id: 1142, name: 'Steve Largent',       position: 'WR', value: 1492,   active: false, era: '1985', stats: { rec_yds: 1287, rec_tds:  9, yds_per_rec: 15.0, catch_pct: 65 } },

  // ─── RUNNING BACKS ────────────────────────────────────────────────────────
  // stats: rush_tds, rush_yds, yds_per_carry, rec_yds
  // value = rush_tds + rush_yds×0.004 + (yds_per_carry−4.0)×0.8
  // Active (2024 NFL season, source: nflverse)
  { id: 1201, name: 'Derrick Henry',       position: 'RB', value: 24.5, active: true,  era: '2024', stats: { rush_tds: 16, rush_yds: 1921, yds_per_carry: 5.0, rec_yds: 198 } },
  { id: 1213, name: 'James Cook',          position: 'RB', value: 20.7, active: true,  era: '2024', stats: { rush_tds: 16, rush_yds: 1009, yds_per_carry: 4.8, rec_yds: 369 } },
  { id: 1202, name: 'Jahmyr Gibbs',        position: 'RB', value: 21.6, active: true,  era: '2024', stats: { rush_tds: 16, rush_yds: 1170, yds_per_carry: 5.1, rec_yds: 394 } },
  { id: 1214, name: 'Josh Jacobs',         position: 'RB', value: 20.7, active: true,  era: '2024', stats: { rush_tds: 15, rush_yds: 1320, yds_per_carry: 4.5, rec_yds: 200 } },
  { id: 1205, name: 'Kyren Williams',      position: 'RB', value: 19.3, active: true,  era: '2024', stats: { rush_tds: 14, rush_yds: 1174, yds_per_carry: 4.7, rec_yds: 250 } },
  { id: 1207, name: 'Bijan Robinson',      position: 'RB', value: 19.6, active: true,  era: '2024', stats: { rush_tds: 14, rush_yds: 1205, yds_per_carry: 5.0, rec_yds: 423 } },
  { id: 1203, name: 'Saquon Barkley',      position: 'RB', value: 21.9, active: true,  era: '2024', stats: { rush_tds: 13, rush_yds: 2005, yds_per_carry: 5.1, rec_yds: 278 } },
  { id: 2201, name: 'David Montgomery',    position: 'RB', value: 16.6, active: true,  era: '2024', stats: { rush_tds: 12, rush_yds: 1005, yds_per_carry: 4.7, rec_yds: 100 } },
  { id: 1204, name: 'Joe Mixon',           position: 'RB', value: 14.7, active: true,  era: '2024', stats: { rush_tds: 11, rush_yds:  890, yds_per_carry: 4.2, rec_yds: 350 } },
  { id: 1208, name: 'Jonathan Taylor',     position: 'RB', value: 15.0, active: true,  era: '2024', stats: { rush_tds: 11, rush_yds:  969, yds_per_carry: 4.2, rec_yds: 281 } },
  { id: 2203, name: 'Chuba Hubbard',       position: 'RB', value: 15.3, active: true,  era: '2024', stats: { rush_tds: 10, rush_yds: 1107, yds_per_carry: 5.1, rec_yds: 200 } },
  { id: 2207, name: 'J.K. Dobbins',        position: 'RB', value: 13.3, active: true,  era: '2024', stats: { rush_tds:  9, rush_yds:  986, yds_per_carry: 4.4, rec_yds: 115 } },
  { id: 2205, name: 'James Conner',        position: 'RB', value: 11.5, active: true,  era: '2024', stats: { rush_tds:  8, rush_yds:  786, yds_per_carry: 4.5, rec_yds: 220 } },
  { id: 1215, name: 'Brian Robinson Jr.',  position: 'RB', value: 11.5, active: true,  era: '2024', stats: { rush_tds:  8, rush_yds:  844, yds_per_carry: 4.2, rec_yds: 150 } },
  { id: 2208, name: 'Zach Charbonnet',     position: 'RB', value: 12.0, active: true,  era: '2024', stats: { rush_tds:  8, rush_yds:  881, yds_per_carry: 4.6, rec_yds: 183 } },
  { id: 2209, name: 'Bucky Irving',        position: 'RB', value: 13.1, active: true,  era: '2024', stats: { rush_tds:  8, rush_yds: 1122, yds_per_carry: 4.8, rec_yds: 122 } },
  { id: 2210, name: 'Kareem Hunt',         position: 'RB', value: 10.6, active: true,  era: '2024', stats: { rush_tds:  7, rush_yds:  791, yds_per_carry: 4.5, rec_yds: 200 } },
  { id: 2211, name: 'Rhamondre Stevenson', position: 'RB', value: 10.0, active: true,  era: '2024', stats: { rush_tds:  7, rush_yds:  778, yds_per_carry: 3.9, rec_yds: 150 } },
  { id: 2212, name: 'Kenneth Walker III',  position: 'RB', value: 10.6, active: true,  era: '2024', stats: { rush_tds:  7, rush_yds:  830, yds_per_carry: 4.4, rec_yds:  96 } },
  { id: 2213, name: 'Tank Bigsby',         position: 'RB', value: 10.2, active: true,  era: '2024', stats: { rush_tds:  7, rush_yds:  756, yds_per_carry: 4.2, rec_yds:  88 } },
  { id: 2214, name: 'Chase Brown',         position: 'RB', value: 12.4, active: true,  era: '2024', stats: { rush_tds:  7, rush_yds: 1085, yds_per_carry: 5.3, rec_yds: 180 } },
  { id: 1219, name: "D'Andre Swift",       position: 'RB', value: 10.7, active: true,  era: '2024', stats: { rush_tds:  6, rush_yds: 1019, yds_per_carry: 4.8, rec_yds: 188 } },
  { id: 2202, name: 'Najee Harris',        position: 'RB', value:  9.7, active: true,  era: '2024', stats: { rush_tds:  6, rush_yds:  826, yds_per_carry: 4.5, rec_yds: 186 } },
  { id: 1209, name: 'Alvin Kamara',        position: 'RB', value:  8.6, active: true,  era: '2024', stats: { rush_tds:  6, rush_yds:  680, yds_per_carry: 3.8, rec_yds: 461 } },
  { id: 1206, name: "De'Von Achane",       position: 'RB', value:  9.5, active: true,  era: '2024', stats: { rush_tds:  6, rush_yds:  820, yds_per_carry: 4.3, rec_yds: 360 } },
  { id: 1216, name: 'Aaron Jones',         position: 'RB', value:  9.1, active: true,  era: '2024', stats: { rush_tds:  5, rush_yds:  871, yds_per_carry: 4.8, rec_yds: 205 } },
  { id: 1217, name: 'Tony Pollard',        position: 'RB', value:  7.9, active: true,  era: '2024', stats: { rush_tds:  5, rush_yds:  673, yds_per_carry: 4.2, rec_yds: 221 } },
  { id: 1211, name: 'Breece Hall',         position: 'RB', value:  7.8, active: true,  era: '2024', stats: { rush_tds:  5, rush_yds:  730, yds_per_carry: 3.9, rec_yds: 411 } },
  { id: 2206, name: 'Javonte Williams',    position: 'RB', value:  7.4, active: true,  era: '2024', stats: { rush_tds:  4, rush_yds:  787, yds_per_carry: 4.3, rec_yds: 192 } },
  { id: 2204, name: 'Tyjae Spears',        position: 'RB', value:  6.4, active: true,  era: '2024', stats: { rush_tds:  4, rush_yds:  607, yds_per_carry: 4.0, rec_yds: 250 } },
  { id: 1220, name: 'Rachaad White',       position: 'RB', value:  5.3, active: true,  era: '2024', stats: { rush_tds:  3, rush_yds:  554, yds_per_carry: 4.1, rec_yds: 374 } },
  { id: 1218, name: 'Travis Etienne Jr.',  position: 'RB', value:  4.5, active: true,  era: '2024', stats: { rush_tds:  2, rush_yds:  612, yds_per_carry: 4.0, rec_yds: 279 } },
  { id: 1210, name: 'Isiah Pacheco',       position: 'RB', value:  2.6, active: true,  era: '2024', stats: { rush_tds:  1, rush_yds:  430, yds_per_carry: 3.8, rec_yds: 120 } },
  { id: 1212, name: 'Christian McCaffrey', position: 'RB', value:  0.8, active: true,  era: '2024', stats: { rush_tds:  0, rush_yds:  149, yds_per_carry: 4.3, rec_yds:  96 } },
  // Historical (career-best single season)
  { id: 1221, name: 'LaDainian Tomlinson', position: 'RB', value: 36.2, active: false, era: '2006', stats: { rush_tds: 28, rush_yds: 1815, yds_per_carry: 5.2, rec_yds: 508 } },
  { id: 1222, name: 'Priest Holmes',       position: 'RB', value: 33.6, active: false, era: '2003', stats: { rush_tds: 27, rush_yds: 1420, yds_per_carry: 5.1, rec_yds: 690 } },
  { id: 1223, name: 'Shaun Alexander',     position: 'RB', value: 35.4, active: false, era: '2005', stats: { rush_tds: 27, rush_yds: 1880, yds_per_carry: 5.1, rec_yds:  78 } },
  { id: 1224, name: 'Emmitt Smith',        position: 'RB', value: 32.8, active: false, era: '1995', stats: { rush_tds: 25, rush_yds: 1773, yds_per_carry: 4.9, rec_yds: 375 } },
  { id: 1225, name: 'John Riggins',        position: 'RB', value: 29.6, active: false, era: '1983', stats: { rush_tds: 24, rush_yds: 1347, yds_per_carry: 4.3, rec_yds:  55 } },
  { id: 1226, name: 'Jim Brown',           position: 'RB', value: 28.2, active: false, era: '1965', stats: { rush_tds: 21, rush_yds: 1544, yds_per_carry: 5.3, rec_yds: 262 } },
  { id: 1227, name: 'Marcus Allen',        position: 'RB', value: 28.2, active: false, era: '1982', stats: { rush_tds: 20, rush_yds: 1759, yds_per_carry: 5.5, rec_yds: 191 } },
  { id: 1228, name: 'Jim Taylor',          position: 'RB', value: 26.0, active: false, era: '1962', stats: { rush_tds: 19, rush_yds: 1474, yds_per_carry: 5.4, rec_yds: 186 } },
  { id: 1229, name: 'Earl Campbell',       position: 'RB', value: 27.0, active: false, era: '1979', stats: { rush_tds: 19, rush_yds: 1697, yds_per_carry: 5.5, rec_yds:  97 } },
  { id: 1230, name: 'Adrian Peterson',     position: 'RB', value: 23.9, active: false, era: '2009', stats: { rush_tds: 18, rush_yds: 1383, yds_per_carry: 4.5, rec_yds: 139 } },
  { id: 1231, name: 'Marshall Faulk',      position: 'RB', value: 24.6, active: false, era: '2000', stats: { rush_tds: 18, rush_yds: 1359, yds_per_carry: 5.4, rec_yds: 830 } },
  { id: 1232, name: 'Clinton Portis',      position: 'RB', value: 24.2, active: false, era: '2002', stats: { rush_tds: 17, rush_yds: 1508, yds_per_carry: 5.5, rec_yds: 178 } },
  { id: 1233, name: 'Barry Sanders',       position: 'RB', value: 23.9, active: false, era: '1991', stats: { rush_tds: 16, rush_yds: 1548, yds_per_carry: 6.1, rec_yds: 289 } },
  { id: 1234, name: 'O.J. Simpson',        position: 'RB', value: 24.5, active: false, era: '1975', stats: { rush_tds: 16, rush_yds: 1817, yds_per_carry: 5.5, rec_yds: 136 } },
  { id: 1235, name: 'Walter Payton',       position: 'RB', value: 22.6, active: false, era: '1977', stats: { rush_tds: 14, rush_yds: 1852, yds_per_carry: 5.5, rec_yds: 480 } },
  { id: 1236, name: 'Edgerrin James',      position: 'RB', value: 19.5, active: false, era: '1999', stats: { rush_tds: 13, rush_yds: 1553, yds_per_carry: 4.4, rec_yds: 439 } },
  { id: 1237, name: 'Corey Dillon',        position: 'RB', value: 20.7, active: false, era: '2004', stats: { rush_tds: 13, rush_yds: 1635, yds_per_carry: 5.4, rec_yds:  83 } },
  { id: 1238, name: 'Jerome Bettis',       position: 'RB', value: 19.3, active: false, era: '1997', stats: { rush_tds: 13, rush_yds: 1431, yds_per_carry: 4.7, rec_yds: 110 } },
  { id: 1239, name: 'Franco Harris',       position: 'RB', value: 18.9, active: false, era: '1976', stats: { rush_tds: 14, rush_yds: 1128, yds_per_carry: 4.5, rec_yds: 200 } },
  { id: 1240, name: 'Thurman Thomas',      position: 'RB', value: 18.6, active: false, era: '1992', stats: { rush_tds: 12, rush_yds: 1487, yds_per_carry: 4.8, rec_yds: 626 } },
  { id: 1241, name: 'Larry Csonka',        position: 'RB', value: 16.4, active: false, era: '1972', stats: { rush_tds: 12, rush_yds: 1003, yds_per_carry: 4.5, rec_yds: 118 } },

  // ─── CORNERBACKS ──────────────────────────────────────────────────────────
  // stats: ints, pass_def (passes defensed), passer_rtg_allowed (lower = better)
  // value = ints + pass_def×0.4 + max(0,(95−passer_rtg_allowed)×0.03)
  // Active (2024 NFL season, source: nflverse)
  { id: 1301, name: 'Marlon Humphrey',     position: 'CB', value: 11.5, active: true,  era: '2024', stats: { ints: 6, pass_def: 12, passer_rtg_allowed:  73 } },
  { id: 1302, name: 'Byron Murphy II',     position: 'CB', value: 10.6, active: true,  era: '2024', stats: { ints: 6, pass_def: 10, passer_rtg_allowed:  76 } },
  { id: 1303, name: 'Derek Stingley Jr.',  position: 'CB', value: 11.3, active: true,  era: '2024', stats: { ints: 5, pass_def: 14, passer_rtg_allowed:  72 } },
  { id: 1304, name: 'Donte Jackson',       position: 'CB', value: 10.1, active: true,  era: '2024', stats: { ints: 5, pass_def: 11, passer_rtg_allowed:  72 } },
  { id: 1305, name: 'Patrick Surtain II',  position: 'CB', value: 12.3, active: true,  era: '2024', stats: { ints: 4, pass_def: 18, passer_rtg_allowed:  60 } },
  { id: 1306, name: 'Tarheeb Still',       position: 'CB', value:  8.2, active: true,  era: '2024', stats: { ints: 4, pass_def:  9, passer_rtg_allowed:  75 } },
  { id: 1307, name: 'Beanie Bishop Jr.',   position: 'CB', value:  8.0, active: true,  era: '2024', stats: { ints: 4, pass_def:  9, passer_rtg_allowed:  82 } },
  { id: 1308, name: 'Cam Taylor-Britt',    position: 'CB', value:  6.7, active: true,  era: '2024', stats: { ints: 3, pass_def:  8, passer_rtg_allowed:  80 } },
  { id: 1309, name: 'Jack Jones',          position: 'CB', value:  6.6, active: true,  era: '2024', stats: { ints: 3, pass_def:  8, passer_rtg_allowed:  81 } },
  { id: 1310, name: 'Tariq Woolen',        position: 'CB', value:  8.5, active: true,  era: '2024', stats: { ints: 3, pass_def: 12, passer_rtg_allowed:  72 } },
  { id: 1311, name: 'Paulson Adebo',       position: 'CB', value:  6.7, active: true,  era: '2024', stats: { ints: 3, pass_def:  8, passer_rtg_allowed:  80 } },
  { id: 1312, name: 'Kamari Lassiter',     position: 'CB', value:  6.2, active: true,  era: '2024', stats: { ints: 3, pass_def:  7, passer_rtg_allowed:  82 } },
  { id: 1313, name: 'Kenny Moore II',      position: 'CB', value:  5.7, active: true,  era: '2024', stats: { ints: 3, pass_def:  6, passer_rtg_allowed:  85 } },
  { id: 1314, name: 'Elijah Molden',       position: 'CB', value:  6.2, active: true,  era: '2024', stats: { ints: 3, pass_def:  7, passer_rtg_allowed:  80 } },
  { id: 1315, name: 'Coby Bryant',         position: 'CB', value:  6.4, active: true,  era: '2024', stats: { ints: 3, pass_def:  8, passer_rtg_allowed:  84 } },
  { id: 2301, name: 'Sean Murphy-Bunting', position: 'CB', value:  6.0, active: true,  era: '2024', stats: { ints: 3, pass_def:  7, passer_rtg_allowed:  88 } },
  { id: 2302, name: 'Denzel Ward',         position: 'CB', value:  6.5, active: true,  era: '2024', stats: { ints: 2, pass_def: 10, passer_rtg_allowed:  78 } },
  { id: 2303, name: 'Zyon McCollum',       position: 'CB', value:  4.7, active: true,  era: '2024', stats: { ints: 2, pass_def:  6, passer_rtg_allowed:  84 } },
  { id: 2304, name: 'Mike Sainristil',     position: 'CB', value:  5.7, active: true,  era: '2024', stats: { ints: 2, pass_def:  8, passer_rtg_allowed:  80 } },
  { id: 2305, name: 'Trent McDuffie',      position: 'CB', value:  7.6, active: true,  era: '2024', stats: { ints: 2, pass_def: 12, passer_rtg_allowed:  68 } },
  { id: 2306, name: 'Tyrique Stevenson',   position: 'CB', value:  5.0, active: true,  era: '2024', stats: { ints: 2, pass_def:  7, passer_rtg_allowed:  88 } },
  { id: 2307, name: 'Carlton Davis III',   position: 'CB', value:  6.0, active: true,  era: '2024', stats: { ints: 2, pass_def:  9, passer_rtg_allowed:  83 } },
  { id: 2308, name: 'Trevon Diggs',        position: 'CB', value:  6.1, active: true,  era: '2024', stats: { ints: 2, pass_def:  9, passer_rtg_allowed:  80 } },
  { id: 2309, name: 'Christian Gonzalez',  position: 'CB', value:  5.7, active: true,  era: '2024', stats: { ints: 2, pass_def:  8, passer_rtg_allowed:  79 } },
  { id: 2310, name: 'Jaire Alexander',     position: 'CB', value:  5.9, active: true,  era: '2024', stats: { ints: 2, pass_def:  8, passer_rtg_allowed:  72 } },
  { id: 2311, name: 'A.J. Terrell',        position: 'CB', value:  6.2, active: true,  era: '2024', stats: { ints: 2, pass_def:  9, passer_rtg_allowed:  74 } },
  { id: 2312, name: 'Jaycee Horn',         position: 'CB', value:  3.4, active: true,  era: '2024', stats: { ints: 1, pass_def:  5, passer_rtg_allowed:  83 } },
  { id: 2313, name: 'Nate Wiggins',        position: 'CB', value:  3.7, active: true,  era: '2024', stats: { ints: 1, pass_def:  6, passer_rtg_allowed:  84 } },
  { id: 2314, name: 'Stephon Gilmore',     position: 'CB', value:  3.3, active: true,  era: '2024', stats: { ints: 1, pass_def:  5, passer_rtg_allowed:  85 } },
  { id: 2315, name: 'Sauce Gardner',       position: 'CB', value:  5.8, active: true,  era: '2024', stats: { ints: 1, pass_def: 10, passer_rtg_allowed:  68 } },
  // Historical (career-best single season)
  { id: 1316, name: 'Dick "Night Train" Lane', position: 'CB', value: 21.1, active: false, era: '1952', stats: { ints: 14, pass_def: 14, passer_rtg_allowed:  45 } },
  { id: 1317, name: 'Lester Hayes',        position: 'CB', value: 19.6, active: false, era: '1980', stats: { ints: 13, pass_def: 13, passer_rtg_allowed:  48 } },
  { id: 1318, name: 'Paul Krause',         position: 'CB', value: 18.0, active: false, era: '1964', stats: { ints: 12, pass_def: 12, passer_rtg_allowed:  55 } },
  { id: 1319, name: 'Everson Walls',       position: 'CB', value: 16.6, active: false, era: '1981', stats: { ints: 11, pass_def: 11, passer_rtg_allowed:  55 } },
  { id: 1320, name: 'Rod Woodson',         position: 'CB', value: 16.8, active: false, era: '1993', stats: { ints: 11, pass_def: 11, passer_rtg_allowed:  50 } },
  { id: 1321, name: 'Mel Blount',          position: 'CB', value: 16.7, active: false, era: '1975', stats: { ints: 11, pass_def: 11, passer_rtg_allowed:  52 } },
  { id: 1322, name: 'Ty Law',              position: 'CB', value: 15.2, active: false, era: '2003', stats: { ints: 10, pass_def: 10, passer_rtg_allowed:  55 } },
  { id: 1323, name: 'Lem Barney',          position: 'CB', value: 15.3, active: false, era: '1967', stats: { ints: 10, pass_def: 10, passer_rtg_allowed:  52 } },
  { id: 1324, name: 'Mel Renfro',          position: 'CB', value: 15.2, active: false, era: '1969', stats: { ints: 10, pass_def: 10, passer_rtg_allowed:  55 } },
  { id: 1325, name: 'Ken Riley',           position: 'CB', value: 13.7, active: false, era: '1976', stats: { ints:  9, pass_def:  9, passer_rtg_allowed:  58 } },
  { id: 1326, name: 'Charles Woodson',     position: 'CB', value: 15.0, active: false, era: '2009', stats: { ints:  9, pass_def: 12, passer_rtg_allowed:  55 } },
  { id: 1327, name: 'Bobby Boyd',          position: 'CB', value: 13.9, active: false, era: '1964', stats: { ints:  9, pass_def:  9, passer_rtg_allowed:  52 } },
  { id: 1328, name: 'Emmitt Thomas',       position: 'CB', value: 13.8, active: false, era: '1974', stats: { ints:  9, pass_def:  9, passer_rtg_allowed:  56 } },
  { id: 1329, name: 'Aeneas Williams',     position: 'CB', value: 15.1, active: false, era: '2000', stats: { ints:  9, pass_def: 12, passer_rtg_allowed:  52 } },
  { id: 1330, name: 'Deion Sanders',       position: 'CB', value: 15.5, active: false, era: '1994', stats: { ints:  8, pass_def: 15, passer_rtg_allowed:  45 } },
  { id: 1331, name: 'Richard Sherman',     position: 'CB', value: 15.9, active: false, era: '2013', stats: { ints:  8, pass_def: 16, passer_rtg_allowed:  46 } },
  { id: 1332, name: 'Darrelle Revis',      position: 'CB', value: 18.3, active: false, era: '2009', stats: { ints:  8, pass_def: 22, passer_rtg_allowed:  44 } },
  { id: 1333, name: 'Aqib Talib',          position: 'CB', value: 15.7, active: false, era: '2012', stats: { ints:  8, pass_def: 16, passer_rtg_allowed:  52 } },
  { id: 1334, name: 'Patrick Peterson',    position: 'CB', value: 15.8, active: false, era: '2011', stats: { ints:  8, pass_def: 16, passer_rtg_allowed:  48 } },
  { id: 1335, name: 'Herb Adderley',       position: 'CB', value: 11.0, active: false, era: '1965', stats: { ints:  7, pass_def:  7, passer_rtg_allowed:  55 } },
  { id: 1336, name: 'Willie Brown',        position: 'CB', value: 11.0, active: false, era: '1969', stats: { ints:  7, pass_def:  7, passer_rtg_allowed:  55 } },

  // ─── SAFETIES ──────────────────────────────────────────────────────────────
  // stats: tackles, ints, pass_def (passes defensed)
  // value = tackles + ints×5 + pass_def×2
  // Active (2024 NFL season, source: nflverse)
  { id: 1401, name: 'Budda Baker',         position: 'S',  value: 119,  active: true,  era: '2024', stats: { tackles:  95, ints: 2, pass_def:  7 } },
  { id: 1402, name: 'Nick Cross',          position: 'S',  value: 101,  active: true,  era: '2024', stats: { tackles:  86, ints: 1, pass_def:  5 } },
  { id: 1410, name: 'Kevin Byard',         position: 'S',  value: 118,  active: true,  era: '2024', stats: { tackles:  80, ints: 4, pass_def:  9 } },
  { id: 2401, name: 'Brandon Jones',       position: 'S',  value:  94,  active: true,  era: '2024', stats: { tackles:  79, ints: 1, pass_def:  5 } },
  { id: 2402, name: 'Brian Branch',        position: 'S',  value: 110,  active: true,  era: '2024', stats: { tackles:  79, ints: 3, pass_def:  8 } },
  { id: 1406, name: 'Kyle Hamilton',       position: 'S',  value: 103,  active: true,  era: '2024', stats: { tackles:  77, ints: 2, pass_def:  8 } },
  { id: 2403, name: 'Julian Love',         position: 'S',  value:  98,  active: true,  era: '2024', stats: { tackles:  76, ints: 2, pass_def:  6 } },
  { id: 2404, name: 'DeShon Elliott',      position: 'S',  value:  86,  active: true,  era: '2024', stats: { tackles:  73, ints: 1, pass_def:  4 } },
  { id: 2405, name: 'Quentin Lake',        position: 'S',  value:  86,  active: true,  era: '2024', stats: { tackles:  73, ints: 1, pass_def:  4 } },
  { id: 2406, name: 'Xavier Woods',        position: 'S',  value:  92,  active: true,  era: '2024', stats: { tackles:  72, ints: 2, pass_def:  5 } },
  { id: 2407, name: 'Grant Delpit',        position: 'S',  value:  89,  active: true,  era: '2024', stats: { tackles:  67, ints: 2, pass_def:  6 } },
  { id: 2408, name: 'Jeremy Chinn',        position: 'S',  value:  82,  active: true,  era: '2024', stats: { tackles:  67, ints: 1, pass_def:  5 } },
  { id: 2409, name: 'Trevon Moehrig',      position: 'S',  value:  88,  active: true,  era: '2024', stats: { tackles:  64, ints: 2, pass_def:  7 } },
  { id: 2410, name: 'Josh Metellus',       position: 'S',  value:  76,  active: true,  era: '2024', stats: { tackles:  63, ints: 1, pass_def:  4 } },
  { id: 1404, name: 'Jessie Bates III',    position: 'S',  value:  95,  active: true,  era: '2024', stats: { tackles:  62, ints: 3, pass_def:  9 } },
  { id: 1408, name: 'Minkah Fitzpatrick',  position: 'S',  value:  88,  active: true,  era: '2024', stats: { tackles:  62, ints: 2, pass_def:  8 } },
  { id: 2411, name: 'Julian Blackmon',     position: 'S',  value:  82,  active: true,  era: '2024', stats: { tackles:  62, ints: 2, pass_def:  5 } },
  { id: 2412, name: 'Jalen Thompson',      position: 'S',  value:  76,  active: true,  era: '2024', stats: { tackles:  61, ints: 1, pass_def:  5 } },
  { id: 2413, name: 'Damar Hamlin',        position: 'S',  value:  69,  active: true,  era: '2024', stats: { tackles:  61, ints: 0, pass_def:  4 } },
  { id: 1407, name: 'Derwin James Jr.',    position: 'S',  value:  86,  active: true,  era: '2024', stats: { tackles:  60, ints: 2, pass_def:  8 } },
  { id: 2414, name: 'Xavier McKinney',     position: 'S',  value: 108,  active: true,  era: '2024', stats: { tackles:  59, ints: 5, pass_def: 12 } },
  { id: 1405, name: 'Harrison Smith',      position: 'S',  value:  80,  active: true,  era: '2024', stats: { tackles:  56, ints: 2, pass_def:  7 } },
  { id: 2415, name: 'Kyle Dugger',         position: 'S',  value:  74,  active: true,  era: '2024', stats: { tackles:  54, ints: 2, pass_def:  5 } },
  { id: 2416, name: 'Camryn Bynum',        position: 'S',  value:  83,  active: true,  era: '2024', stats: { tackles:  54, ints: 3, pass_def:  7 } },
  { id: 2417, name: 'Bryan Cook',          position: 'S',  value:  74,  active: true,  era: '2024', stats: { tackles:  54, ints: 2, pass_def:  5 } },
  { id: 2418, name: 'Reed Blankenship',    position: 'S',  value:  74,  active: true,  era: '2024', stats: { tackles:  52, ints: 2, pass_def:  6 } },
  { id: 1409, name: 'Jordan Poyer',        position: 'S',  value:  75,  active: true,  era: '2024', stats: { tackles:  51, ints: 2, pass_def:  7 } },
  // Historical (career-best single season)
  { id: 1417, name: 'John Lynch',          position: 'S',  value: 179,  active: false, era: '2001', stats: { tackles: 135, ints: 4, pass_def: 12 } },
  { id: 1418, name: 'Antoine Winfield Sr.',position: 'S',  value: 183,  active: false, era: '2003', stats: { tackles: 130, ints: 5, pass_def: 14 } },
  { id: 1419, name: 'Kenny Easley',        position: 'S',  value: 210,  active: false, era: '1984', stats: { tackles: 130, ints:10, pass_def: 15 } },
  { id: 1420, name: 'Rodney Harrison',     position: 'S',  value: 169,  active: false, era: '2002', stats: { tackles: 130, ints: 3, pass_def: 12 } },
  { id: 1421, name: 'Adrian Wilson',       position: 'S',  value: 165,  active: false, era: '2008', stats: { tackles: 130, ints: 3, pass_def: 10 } },
  { id: 1422, name: 'Lawyer Milloy',       position: 'S',  value: 160,  active: false, era: '2000', stats: { tackles: 125, ints: 3, pass_def: 10 } },
  { id: 1423, name: 'Steve Atwater',       position: 'S',  value: 153,  active: false, era: '1993', stats: { tackles: 120, ints: 3, pass_def:  9 } },
  { id: 1424, name: 'Brian Dawkins',       position: 'S',  value: 165,  active: false, era: '2004', stats: { tackles: 115, ints: 4, pass_def: 15 } },
  { id: 1425, name: 'LeRoy Butler',        position: 'S',  value: 159,  active: false, era: '1998', stats: { tackles: 105, ints: 6, pass_def: 12 } },
  { id: 1426, name: 'Troy Polamalu',       position: 'S',  value: 163,  active: false, era: '2008', stats: { tackles: 100, ints: 7, pass_def: 14 } },
  { id: 1427, name: 'Eugene Robinson',     position: 'S',  value: 147,  active: false, era: '1993', stats: { tackles: 100, ints: 5, pass_def: 11 } },
  { id: 1428, name: 'Ronnie Lott',         position: 'S',  value: 167,  active: false, era: '1986', stats: { tackles:  95, ints: 8, pass_def: 16 } },
  { id: 1429, name: 'Tim McDonald',        position: 'S',  value: 130,  active: false, era: '1994', stats: { tackles:  95, ints: 3, pass_def: 10 } },
  { id: 1430, name: 'Bob Sanders',         position: 'S',  value: 136,  active: false, era: '2007', stats: { tackles:  90, ints: 6, pass_def:  8 } },
  { id: 1431, name: 'Jack Tatum',          position: 'S',  value: 117,  active: false, era: '1974', stats: { tackles:  90, ints: 3, pass_def:  6 } },
  { id: 1432, name: 'Ed Reed',             position: 'S',  value: 171,  active: false, era: '2004', stats: { tackles:  90, ints: 9, pass_def: 18 } },
  { id: 1433, name: 'Darren Sharper',      position: 'S',  value: 146,  active: false, era: '2009', stats: { tackles:  75, ints: 9, pass_def: 13 } },

  // ─── EDGE RUSHERS ─────────────────────────────────────────────────────────
  // stats: sacks, tfl (tackles for loss), qb_hits, forced_fumbles
  // value = sacks + tfl×0.2 + qb_hits×0.08 + forced_fumbles×0.5
  // Active (2024 NFL season, source: nflverse)
  { id: 1502, name: 'Trey Hendrickson',    position: 'EDGE', value: 25.2, active: true,  era: '2024', stats: { sacks: 17.5, tfl: 14, qb_hits: 42, forced_fumbles: 3 } },
  { id: 1503, name: 'Myles Garrett',       position: 'EDGE', value: 20.1, active: true,  era: '2024', stats: { sacks: 14.0, tfl: 11, qb_hits: 36, forced_fumbles: 2 } },
  { id: 2501, name: 'Nik Bonitto',         position: 'EDGE', value: 18.9, active: true,  era: '2024', stats: { sacks: 13.5, tfl: 10, qb_hits: 30, forced_fumbles: 2 } },
  { id: 1504, name: 'Micah Parsons',       position: 'EDGE', value: 17.3, active: true,  era: '2024', stats: { sacks: 12.0, tfl: 12, qb_hits: 30, forced_fumbles: 1 } },
  { id: 1505, name: 'Jonathan Greenard',   position: 'EDGE', value: 16.9, active: true,  era: '2024', stats: { sacks: 12.0, tfl:  9, qb_hits: 26, forced_fumbles: 2 } },
  { id: 1506, name: 'Danielle Hunter',     position: 'EDGE', value: 17.2, active: true,  era: '2024', stats: { sacks: 12.0, tfl: 10, qb_hits: 28, forced_fumbles: 2 } },
  { id: 1501, name: 'T.J. Watt',           position: 'EDGE', value: 20.1, active: true,  era: '2024', stats: { sacks: 11.5, tfl: 18, qb_hits: 38, forced_fumbles: 4 } },
  { id: 2502, name: 'Andrew Van Ginkel',   position: 'EDGE', value: 15.4, active: true,  era: '2024', stats: { sacks: 11.5, tfl:  8, qb_hits: 22, forced_fumbles: 1 } },
  { id: 2503, name: 'Will Anderson Jr.',   position: 'EDGE', value: 16.2, active: true,  era: '2024', stats: { sacks: 11.0, tfl: 10, qb_hits: 28, forced_fumbles: 2 } },
  { id: 2504, name: 'Dante Fowler Jr.',    position: 'EDGE', value: 14.2, active: true,  era: '2024', stats: { sacks: 10.5, tfl:  8, qb_hits: 20, forced_fumbles: 1 } },
  { id: 2505, name: 'Jonathon Cooper',     position: 'EDGE', value: 13.8, active: true,  era: '2024', stats: { sacks: 10.5, tfl:  7, qb_hits: 18, forced_fumbles: 1 } },
  { id: 2506, name: 'Travon Walker',       position: 'EDGE', value: 14.7, active: true,  era: '2024', stats: { sacks: 10.5, tfl:  8, qb_hits: 20, forced_fumbles: 2 } },
  { id: 2507, name: 'Will McDonald IV',    position: 'EDGE', value: 13.8, active: true,  era: '2024', stats: { sacks: 10.5, tfl:  7, qb_hits: 18, forced_fumbles: 1 } },
  { id: 2508, name: 'Odafe Oweh',          position: 'EDGE', value: 14.0, active: true,  era: '2024', stats: { sacks: 10.0, tfl:  7, qb_hits: 20, forced_fumbles: 2 } },
  { id: 2509, name: 'Harold Landry III',   position: 'EDGE', value: 12.1, active: true,  era: '2024', stats: { sacks:  9.0, tfl:  6, qb_hits: 18, forced_fumbles: 1 } },
  { id: 1515, name: 'Nick Bosa',           position: 'EDGE', value: 14.1, active: true,  era: '2024', stats: { sacks:  9.0, tfl: 10, qb_hits: 26, forced_fumbles: 2 } },
  { id: 2510, name: 'Leonard Floyd',       position: 'EDGE', value: 11.8, active: true,  era: '2024', stats: { sacks:  8.5, tfl:  7, qb_hits: 17, forced_fumbles: 1 } },
  { id: 1510, name: 'Brian Burns',         position: 'EDGE', value: 12.5, active: true,  era: '2024', stats: { sacks:  8.5, tfl:  8, qb_hits: 18, forced_fumbles: 2 } },
  { id: 2511, name: 'Tuli Tuipulotu',      position: 'EDGE', value: 11.7, active: true,  era: '2024', stats: { sacks:  8.5, tfl:  7, qb_hits: 16, forced_fumbles: 1 } },
  { id: 1511, name: 'Josh Hines-Allen',    position: 'EDGE', value: 12.0, active: true,  era: '2024', stats: { sacks:  8.0, tfl:  8, qb_hits: 18, forced_fumbles: 2 } },
  { id: 2512, name: 'Kwity Paye',          position: 'EDGE', value: 11.0, active: true,  era: '2024', stats: { sacks:  8.0, tfl:  6, qb_hits: 16, forced_fumbles: 1 } },
  { id: 2513, name: 'Gregory Rousseau',    position: 'EDGE', value: 11.8, active: true,  era: '2024', stats: { sacks:  8.0, tfl:  7, qb_hits: 17, forced_fumbles: 2 } },
  { id: 2514, name: 'George Karlaftis',    position: 'EDGE', value: 11.2, active: true,  era: '2024', stats: { sacks:  8.0, tfl:  7, qb_hits: 16, forced_fumbles: 1 } },
  { id: 2515, name: 'Derick Hall',         position: 'EDGE', value: 11.0, active: true,  era: '2024', stats: { sacks:  8.0, tfl:  6, qb_hits: 16, forced_fumbles: 1 } },
  { id: 1508, name: 'Maxx Crosby',         position: 'EDGE', value: 14.1, active: true,  era: '2024', stats: { sacks:  7.5, tfl: 12, qb_hits: 28, forced_fumbles: 4 } },
  { id: 2516, name: 'Rashan Gary',         position: 'EDGE', value: 11.5, active: true,  era: '2024', stats: { sacks:  7.5, tfl:  8, qb_hits: 18, forced_fumbles: 2 } },
  { id: 1512, name: 'Aidan Hutchinson',    position: 'EDGE', value: 11.5, active: true,  era: '2024', stats: { sacks:  7.5, tfl:  8, qb_hits: 18, forced_fumbles: 2 } },
  { id: 1518, name: 'Chop Robinson',       position: 'EDGE', value:  8.5, active: true,  era: '2024', stats: { sacks:  6.0, tfl:  5, qb_hits: 12, forced_fumbles: 1 } },
  { id: 1507, name: 'Khalil Mack',         position: 'EDGE', value:  9.4, active: true,  era: '2024', stats: { sacks:  6.0, tfl:  6, qb_hits: 15, forced_fumbles: 2 } },
  { id: 1519, name: 'Von Miller',          position: 'EDGE', value:  8.6, active: true,  era: '2024', stats: { sacks:  6.0, tfl:  5, qb_hits: 14, forced_fumbles: 1 } },
  { id: 1509, name: 'Matthew Judon',       position: 'EDGE', value:  8.0, active: true,  era: '2024', stats: { sacks:  5.5, tfl:  5, qb_hits: 12, forced_fumbles: 1 } },
  { id: 1517, name: 'Laiatu Latu',         position: 'EDGE', value:  6.1, active: true,  era: '2024', stats: { sacks:  4.0, tfl:  4, qb_hits: 10, forced_fumbles: 1 } },
  { id: 1520, name: 'Cameron Jordan',      position: 'EDGE', value:  6.5, active: true,  era: '2024', stats: { sacks:  4.0, tfl:  5, qb_hits: 12, forced_fumbles: 1 } },
  { id: 1516, name: "Za'Darius Smith",     position: 'EDGE', value:  6.2, active: true,  era: '2024', stats: { sacks:  4.0, tfl:  4, qb_hits: 11, forced_fumbles: 1 } },
  { id: 1513, name: 'Lukas Van Ness',      position: 'EDGE', value:  4.2, active: true,  era: '2024', stats: { sacks:  3.0, tfl:  3, qb_hits:  8, forced_fumbles: 0 } },
  { id: 1514, name: 'Dallas Turner',       position: 'EDGE', value:  5.1, active: true,  era: '2024', stats: { sacks:  3.0, tfl:  4, qb_hits: 10, forced_fumbles: 1 } },
  // Historical (career-best single season)
  { id: 1521, name: 'Michael Strahan',     position: 'EDGE', value: 31.3, active: false, era: '2001', stats: { sacks: 22.5, tfl: 18, qb_hits: 40, forced_fumbles: 4 } },
  { id: 1522, name: 'Mark Gastineau',      position: 'EDGE', value: 29.3, active: false, era: '1984', stats: { sacks: 22.0, tfl: 15, qb_hits: 35, forced_fumbles: 3 } },
  { id: 1523, name: 'Jared Allen',         position: 'EDGE', value: 30.4, active: false, era: '2011', stats: { sacks: 22.0, tfl: 17, qb_hits: 38, forced_fumbles: 4 } },
  { id: 1524, name: 'Chris Doleman',       position: 'EDGE', value: 28.3, active: false, era: '1989', stats: { sacks: 21.0, tfl: 16, qb_hits: 32, forced_fumbles: 3 } },
  { id: 1525, name: 'Reggie White',        position: 'EDGE', value: 30.1, active: false, era: '1987', stats: { sacks: 21.0, tfl: 18, qb_hits: 38, forced_fumbles: 5 } },
  { id: 1526, name: 'Lawrence Taylor',     position: 'EDGE', value: 31.5, active: false, era: '1986', stats: { sacks: 20.5, tfl: 20, qb_hits: 38, forced_fumbles: 8 } },
  { id: 1527, name: 'DeMarcus Ware',       position: 'EDGE', value: 28.5, active: false, era: '2008', stats: { sacks: 20.0, tfl: 18, qb_hits: 36, forced_fumbles: 4 } },
  { id: 1528, name: 'Bruce Smith',         position: 'EDGE', value: 27.4, active: false, era: '1990', stats: { sacks: 19.0, tfl: 16, qb_hits: 34, forced_fumbles: 5 } },
  { id: 1529, name: 'Clyde Simmons',       position: 'EDGE', value: 25.5, active: false, era: '1992', stats: { sacks: 19.0, tfl: 14, qb_hits: 28, forced_fumbles: 3 } },
  { id: 1530, name: 'Robert Mathis',       position: 'EDGE', value: 26.7, active: false, era: '2013', stats: { sacks: 19.5, tfl: 14, qb_hits: 30, forced_fumbles: 4 } },
  { id: 1531, name: 'Jason Taylor',        position: 'EDGE', value: 25.9, active: false, era: '2002', stats: { sacks: 18.5, tfl: 14, qb_hits: 32, forced_fumbles: 4 } },
  { id: 1532, name: 'Elvis Dumervil',      position: 'EDGE', value: 22.6, active: false, era: '2009', stats: { sacks: 17.0, tfl: 12, qb_hits: 28, forced_fumbles: 2 } },
  { id: 1533, name: 'Richard Dent',        position: 'EDGE', value: 25.4, active: false, era: '1985', stats: { sacks: 17.5, tfl: 14, qb_hits: 32, forced_fumbles: 5 } },
  { id: 1534, name: 'Pat Swilling',        position: 'EDGE', value: 23.0, active: false, era: '1991', stats: { sacks: 17.0, tfl: 12, qb_hits: 26, forced_fumbles: 3 } },
  { id: 1535, name: 'Dwight Freeney',      position: 'EDGE', value: 22.1, active: false, era: '2004', stats: { sacks: 16.0, tfl: 12, qb_hits: 28, forced_fumbles: 3 } },
  { id: 1536, name: 'Kevin Greene',        position: 'EDGE', value: 22.0, active: false, era: '1996', stats: { sacks: 16.0, tfl: 12, qb_hits: 26, forced_fumbles: 3 } },
  { id: 1537, name: 'Julius Peppers',      position: 'EDGE', value: 20.6, active: false, era: '2008', stats: { sacks: 14.5, tfl: 12, qb_hits: 28, forced_fumbles: 3 } },
  { id: 1538, name: 'John Randle',         position: 'EDGE', value: 21.2, active: false, era: '1997', stats: { sacks: 15.5, tfl: 12, qb_hits: 28, forced_fumbles: 2 } },
  { id: 1539, name: 'Neil Smith',          position: 'EDGE', value: 20.9, active: false, era: '1993', stats: { sacks: 15.0, tfl: 12, qb_hits: 28, forced_fumbles: 3 } },
];

// Filter players by position and active status
export function getNFLPlayersByPosition(position, includeHistorical) {
  return NFL_PLAYERS.filter(
    (p) => p.position === position && (includeHistorical || p.active)
  );
}

// Return all NFL players optionally filtered to active only
export function getAllNFLPlayers(includeHistorical) {
  return NFL_PLAYERS.filter((p) => includeHistorical || p.active);
}

// Shuffle an array (Fisher-Yates)
export function shuffleNFL(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Pick n random items from an array
export function pickRandomNFL(arr, n) {
  return shuffleNFL(arr).slice(0, n);
}

