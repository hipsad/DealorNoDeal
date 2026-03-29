// NFL Player dataset — values are SINGLE-SEASON stats (not career totals):
//   Active players  → 2024 NFL regular-season stats
//   Historical players → their career-best single season
//
// value field per position:
//   QB   → passing touchdowns in the season
//   WR   → receiving yards in the season
//   RB   → rushing touchdowns in the season
//   CB   → interceptions in the season
//   S    → tackles in the season
//   EDGE → sacks in the season
//
// The `era` field on historical players shows the year of the featured season.

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
  QB:   15,   // < 15 passing TDs in a season
  WR:   700,  // < 700 receiving yards in a season
  RB:   7,    // < 7 rushing TDs in a season
  CB:   3,    // < 3 interceptions in a season
  S:    70,   // < 70 tackles in a season
  EDGE: 7,    // < 7 sacks in a season
};

export const NFL_PLAYERS = [
  // ─── QUARTERBACKS – season passing TDs ────────────────────────────────────
  // Active (2024 NFL season)
  { id: 1001, name: 'Joe Burrow',          position: 'QB', value: 43,  active: true,  era: '2024' },
  { id: 1002, name: 'Baker Mayfield',      position: 'QB', value: 41,  active: true,  era: '2024' },
  { id: 1003, name: 'Lamar Jackson',       position: 'QB', value: 41,  active: true,  era: '2024' },
  { id: 1004, name: 'Sam Darnold',         position: 'QB', value: 35,  active: true,  era: '2024' },
  { id: 1005, name: 'Josh Allen',          position: 'QB', value: 33,  active: true,  era: '2024' },
  { id: 1006, name: 'Bo Nix',              position: 'QB', value: 29,  active: true,  era: '2024' },
  { id: 1007, name: 'Aaron Rodgers',       position: 'QB', value: 28,  active: true,  era: '2024' },
  { id: 1008, name: 'Patrick Mahomes',     position: 'QB', value: 26,  active: true,  era: '2024' },
  { id: 1009, name: 'Kyler Murray',        position: 'QB', value: 26,  active: true,  era: '2024' },
  { id: 1010, name: 'Jayden Daniels',      position: 'QB', value: 25,  active: true,  era: '2024' },
  { id: 1011, name: 'Jordan Love',         position: 'QB', value: 25,  active: true,  era: '2024' },
  { id: 1012, name: 'Justin Herbert',      position: 'QB', value: 23,  active: true,  era: '2024' },
  { id: 1013, name: 'Tua Tagovailoa',      position: 'QB', value: 23,  active: true,  era: '2024' },
  { id: 1014, name: 'Jalen Hurts',         position: 'QB', value: 22,  active: true,  era: '2024' },
  { id: 1015, name: 'Matthew Stafford',    position: 'QB', value: 20,  active: true,  era: '2024' },
  { id: 1016, name: 'C.J. Stroud',         position: 'QB', value: 20,  active: true,  era: '2024' },
  { id: 1017, name: 'Caleb Williams',      position: 'QB', value: 20,  active: true,  era: '2024' },
  { id: 1018, name: 'Geno Smith',          position: 'QB', value: 20,  active: true,  era: '2024' },
  { id: 1019, name: 'Brock Purdy',         position: 'QB', value: 20,  active: true,  era: '2024' },
  { id: 1020, name: 'Kirk Cousins',        position: 'QB', value: 18,  active: true,  era: '2024' },
  { id: 1021, name: 'Russell Wilson',      position: 'QB', value: 16,  active: true,  era: '2024' },
  { id: 1022, name: 'Trevor Lawrence',     position: 'QB', value: 15,  active: true,  era: '2024' },
  { id: 1023, name: 'Drake Maye',          position: 'QB', value: 15,  active: true,  era: '2024' },
  { id: 1024, name: 'Bryce Young',         position: 'QB', value: 14,  active: true,  era: '2024' },
  { id: 1025, name: 'Dak Prescott',        position: 'QB', value: 11,  active: true,  era: '2024' },
  { id: 2001, name: 'Jared Goff',          position: 'QB', value: 37,  active: true,  era: '2024' },
  // Historical (career-best single season)
  { id: 1026, name: 'Peyton Manning',      position: 'QB', value: 55,  active: false, era: '2013' },
  { id: 1027, name: 'Tom Brady',           position: 'QB', value: 50,  active: false, era: '2007' },
  { id: 1028, name: 'Patrick Mahomes*',    position: 'QB', value: 50,  active: false, era: '2022' },
  { id: 1029, name: 'Drew Brees',          position: 'QB', value: 46,  active: false, era: '2011' },
  { id: 1030, name: 'Dan Marino',          position: 'QB', value: 48,  active: false, era: '1984' },
  { id: 1031, name: 'Steve Young',         position: 'QB', value: 36,  active: false, era: '1994' },
  { id: 1032, name: "Y.A. Tittle",         position: 'QB', value: 36,  active: false, era: '1963' },
  { id: 1033, name: 'Brett Favre',         position: 'QB', value: 39,  active: false, era: '1995' },
  { id: 1034, name: 'Philip Rivers',       position: 'QB', value: 34,  active: false, era: '2008' },
  { id: 1035, name: 'Jim Kelly',           position: 'QB', value: 33,  active: false, era: '1991' },
  { id: 1036, name: 'Warren Moon',         position: 'QB', value: 33,  active: false, era: '1990' },
  { id: 1037, name: 'Johnny Unitas',       position: 'QB', value: 32,  active: false, era: '1959' },
  { id: 1038, name: 'Sonny Jurgensen',     position: 'QB', value: 31,  active: false, era: '1967' },
  { id: 1039, name: 'Dan Fouts',           position: 'QB', value: 30,  active: false, era: '1982' },
  { id: 1040, name: 'Len Dawson',          position: 'QB', value: 30,  active: false, era: '1966' },
  { id: 1041, name: 'Terry Bradshaw',      position: 'QB', value: 28,  active: false, era: '1978' },
  { id: 1042, name: 'Ken Stabler',         position: 'QB', value: 27,  active: false, era: '1976' },
  { id: 1043, name: 'John Elway',          position: 'QB', value: 27,  active: false, era: '1997' },
  { id: 1044, name: 'Joe Montana',         position: 'QB', value: 26,  active: false, era: '1989' },
  { id: 1045, name: 'Roger Staubach',      position: 'QB', value: 25,  active: false, era: '1979' },
  { id: 1046, name: 'Fran Tarkenton',      position: 'QB', value: 25,  active: false, era: '1975' },
  { id: 1047, name: 'Norm Van Brocklin',   position: 'QB', value: 24,  active: false, era: '1960' },
  { id: 1048, name: 'Troy Aikman',         position: 'QB', value: 23,  active: false, era: '1992' },
  { id: 1049, name: 'Bob Griese',          position: 'QB', value: 22,  active: false, era: '1977' },

  // ─── WIDE RECEIVERS – season receiving yards ──────────────────────────────
  // Active (2024 NFL season)
  { id: 1101, name: 'CeeDee Lamb',         position: 'WR', value: 1749, active: true,  era: '2024' },
  { id: 1102, name: "Ja'Marr Chase",       position: 'WR', value: 1708, active: true,  era: '2024' },
  { id: 1103, name: 'Justin Jefferson',    position: 'WR', value: 1533, active: true,  era: '2024' },
  { id: 1104, name: 'Brian Thomas Jr.',    position: 'WR', value: 1282, active: true,  era: '2024' },
  { id: 1105, name: 'Malik Nabers',        position: 'WR', value: 1204, active: true,  era: '2024' },
  { id: 1106, name: 'Amon-Ra St. Brown',   position: 'WR', value: 1174, active: true,  era: '2024' },
  { id: 1107, name: 'Tyreek Hill',         position: 'WR', value: 1100, active: true,  era: '2024' },
  { id: 1108, name: 'Garrett Wilson',      position: 'WR', value: 1100, active: true,  era: '2024' },
  { id: 1109, name: 'Drake London',        position: 'WR', value: 1100, active: true,  era: '2024' },
  { id: 1110, name: 'A.J. Brown',          position: 'WR', value: 1079, active: true,  era: '2024' },
  { id: 1111, name: 'Ladd McConkey',       position: 'WR', value: 1040, active: true,  era: '2024' },
  { id: 1112, name: 'Brandon Aiyuk',       position: 'WR', value: 1050, active: true,  era: '2024' },
  { id: 1113, name: 'Jaylen Waddle',       position: 'WR', value: 1014, active: true,  era: '2024' },
  { id: 1114, name: 'Mike Evans',          position: 'WR', value: 1002, active: true,  era: '2024' },
  { id: 1115, name: 'Cooper Kupp',         position: 'WR', value: 1001, active: true,  era: '2024' },
  { id: 1116, name: 'Tee Higgins',         position: 'WR', value: 913,  active: true,  era: '2024' },
  { id: 1117, name: 'DeVonta Smith',       position: 'WR', value: 883,  active: true,  era: '2024' },
  { id: 1118, name: 'D.K. Metcalf',        position: 'WR', value: 857,  active: true,  era: '2024' },
  { id: 1119, name: 'Rome Odunze',         position: 'WR', value: 742,  active: true,  era: '2024' },
  { id: 1120, name: 'Davante Adams',       position: 'WR', value: 800,  active: true,  era: '2024' },
  { id: 1121, name: 'Keenan Allen',        position: 'WR', value: 700,  active: true,  era: '2024' },
  { id: 1122, name: 'DeAndre Hopkins',     position: 'WR', value: 600,  active: true,  era: '2024' },
  { id: 1123, name: 'Tyler Lockett',       position: 'WR', value: 650,  active: true,  era: '2024' },
  { id: 1124, name: 'Puka Nacua',          position: 'WR', value: 400,  active: true,  era: '2024' },
  { id: 2101, name: 'Marvin Harrison Jr.', position: 'WR', value: 717,  active: true,  era: '2024' },
  { id: 2102, name: 'Xavier Worthy',       position: 'WR', value: 638,  active: true,  era: '2024' },
  // Historical (career-best single season)
  { id: 1125, name: 'Calvin Johnson',      position: 'WR', value: 1964, active: false, era: '2012' },
  { id: 1126, name: 'Julio Jones',         position: 'WR', value: 1871, active: false, era: '2015' },
  { id: 1127, name: 'Antonio Brown',       position: 'WR', value: 1834, active: false, era: '2015' },
  { id: 1128, name: 'Isaac Bruce',         position: 'WR', value: 1781, active: false, era: '1995' },
  { id: 1129, name: 'Jerry Rice',          position: 'WR', value: 1848, active: false, era: '1995' },
  { id: 1130, name: 'Marvin Harrison',     position: 'WR', value: 1722, active: false, era: '2002' },
  { id: 1131, name: 'Torry Holt',          position: 'WR', value: 1696, active: false, era: '2003' },
  { id: 1132, name: 'Randy Moss',          position: 'WR', value: 1632, active: false, era: '2003' },
  { id: 1133, name: 'Lance Alworth',       position: 'WR', value: 1602, active: false, era: '1965' },
  { id: 1134, name: 'Andre Johnson',       position: 'WR', value: 1598, active: false, era: '2008' },
  { id: 1135, name: 'Reggie Wayne',        position: 'WR', value: 1510, active: false, era: '2012' },
  { id: 1136, name: 'Larry Fitzgerald',    position: 'WR', value: 1431, active: false, era: '2008' },
  { id: 1137, name: 'Don Maynard',         position: 'WR', value: 1434, active: false, era: '1967' },
  { id: 1138, name: 'Terrell Owens',       position: 'WR', value: 1451, active: false, era: '2007' },
  { id: 1139, name: 'Tim Brown',           position: 'WR', value: 1408, active: false, era: '1997' },
  { id: 1140, name: 'Cris Carter',         position: 'WR', value: 1371, active: false, era: '1995' },
  { id: 1141, name: 'James Lofton',        position: 'WR', value: 1361, active: false, era: '1984' },
  { id: 1142, name: 'Steve Largent',       position: 'WR', value: 1287, active: false, era: '1985' },

  // ─── RUNNING BACKS – season rushing TDs ──────────────────────────────────
  // Active (2024 NFL season)
  { id: 1201, name: 'Derrick Henry',       position: 'RB', value: 16,  active: true,  era: '2024' },
  { id: 1202, name: 'Jahmyr Gibbs',        position: 'RB', value: 14,  active: true,  era: '2024' },
  { id: 1203, name: 'Saquon Barkley',      position: 'RB', value: 13,  active: true,  era: '2024' },
  { id: 1204, name: 'Joe Mixon',           position: 'RB', value: 13,  active: true,  era: '2024' },
  { id: 1205, name: 'Kyren Williams',      position: 'RB', value: 12,  active: true,  era: '2024' },
  { id: 1206, name: "De'Von Achane",       position: 'RB', value: 12,  active: true,  era: '2024' },
  { id: 1207, name: 'Bijan Robinson',      position: 'RB', value: 11,  active: true,  era: '2024' },
  { id: 1208, name: 'Jonathan Taylor',     position: 'RB', value: 10,  active: true,  era: '2024' },
  { id: 1209, name: 'Alvin Kamara',        position: 'RB', value: 10,  active: true,  era: '2024' },
  { id: 1210, name: 'Isiah Pacheco',       position: 'RB', value: 9,   active: true,  era: '2024' },
  { id: 1211, name: 'Breece Hall',         position: 'RB', value: 8,   active: true,  era: '2024' },
  { id: 1212, name: 'Christian McCaffrey', position: 'RB', value: 7,   active: true,  era: '2024' },
  { id: 1213, name: 'James Cook',          position: 'RB', value: 7,   active: true,  era: '2024' },
  { id: 1214, name: 'Josh Jacobs',         position: 'RB', value: 7,   active: true,  era: '2024' },
  { id: 1215, name: 'Brian Robinson Jr.',  position: 'RB', value: 6,   active: true,  era: '2024' },
  { id: 1216, name: 'Aaron Jones',         position: 'RB', value: 6,   active: true,  era: '2024' },
  { id: 1217, name: 'Tony Pollard',        position: 'RB', value: 6,   active: true,  era: '2024' },
  { id: 1218, name: 'Travis Etienne Jr.',  position: 'RB', value: 5,   active: true,  era: '2024' },
  { id: 1219, name: "D'Andre Swift",       position: 'RB', value: 5,   active: true,  era: '2024' },
  { id: 1220, name: 'Rachaad White',       position: 'RB', value: 5,   active: true,  era: '2024' },
  { id: 2201, name: 'David Montgomery',    position: 'RB', value: 5,   active: true,  era: '2024' },
  { id: 2202, name: 'Najee Harris',        position: 'RB', value: 4,   active: true,  era: '2024' },
  { id: 2203, name: 'Chuba Hubbard',       position: 'RB', value: 5,   active: true,  era: '2024' },
  { id: 2204, name: 'Tyjae Spears',        position: 'RB', value: 4,   active: true,  era: '2024' },
  { id: 2205, name: 'James Conner',        position: 'RB', value: 4,   active: true,  era: '2024' },
  { id: 2206, name: 'Javonte Williams',    position: 'RB', value: 3,   active: true,  era: '2024' },
  // Historical (career-best single season)
  { id: 1221, name: 'LaDainian Tomlinson', position: 'RB', value: 28,  active: false, era: '2006' },
  { id: 1222, name: 'Priest Holmes',       position: 'RB', value: 27,  active: false, era: '2003' },
  { id: 1223, name: 'Shaun Alexander',     position: 'RB', value: 27,  active: false, era: '2005' },
  { id: 1224, name: 'Emmitt Smith',        position: 'RB', value: 25,  active: false, era: '1995' },
  { id: 1225, name: 'John Riggins',        position: 'RB', value: 24,  active: false, era: '1983' },
  { id: 1226, name: 'Jim Brown',           position: 'RB', value: 21,  active: false, era: '1965' },
  { id: 1227, name: 'Marcus Allen',        position: 'RB', value: 20,  active: false, era: '1982' },
  { id: 1228, name: 'Jim Taylor',          position: 'RB', value: 19,  active: false, era: '1962' },
  { id: 1229, name: 'Earl Campbell',       position: 'RB', value: 19,  active: false, era: '1979' },
  { id: 1230, name: 'Adrian Peterson',     position: 'RB', value: 18,  active: false, era: '2009' },
  { id: 1231, name: 'Marshall Faulk',      position: 'RB', value: 18,  active: false, era: '2000' },
  { id: 1232, name: 'Clinton Portis',      position: 'RB', value: 17,  active: false, era: '2002' },
  { id: 1233, name: 'Barry Sanders',       position: 'RB', value: 16,  active: false, era: '1991' },
  { id: 1234, name: 'O.J. Simpson',        position: 'RB', value: 16,  active: false, era: '1975' },
  { id: 1235, name: 'Walter Payton',       position: 'RB', value: 14,  active: false, era: '1977' },
  { id: 1236, name: 'Edgerrin James',      position: 'RB', value: 13,  active: false, era: '1999' },
  { id: 1237, name: 'Corey Dillon',        position: 'RB', value: 13,  active: false, era: '2004' },
  { id: 1238, name: 'Jerome Bettis',       position: 'RB', value: 13,  active: false, era: '1997' },
  { id: 1239, name: 'Franco Harris',       position: 'RB', value: 14,  active: false, era: '1976' },
  { id: 1240, name: 'Thurman Thomas',      position: 'RB', value: 12,  active: false, era: '1992' },
  { id: 1241, name: 'Larry Csonka',        position: 'RB', value: 12,  active: false, era: '1972' },

  // ─── CORNERBACKS – season interceptions ──────────────────────────────────
  // Active (2024 NFL season)
  { id: 1301, name: 'Sauce Gardner',       position: 'CB', value: 6,   active: true,  era: '2024' },
  { id: 1302, name: 'Quinyon Mitchell',    position: 'CB', value: 5,   active: true,  era: '2024' },
  { id: 1303, name: 'Joey Porter Jr.',     position: 'CB', value: 4,   active: true,  era: '2024' },
  { id: 1304, name: 'Devon Witherspoon',   position: 'CB', value: 4,   active: true,  era: '2024' },
  { id: 1305, name: 'Patrick Surtain II',  position: 'CB', value: 4,   active: true,  era: '2024' },
  { id: 1306, name: 'Marlon Humphrey',     position: 'CB', value: 4,   active: true,  era: '2024' },
  { id: 1307, name: 'Tariq Woolen',        position: 'CB', value: 4,   active: true,  era: '2024' },
  { id: 1308, name: 'Christian Gonzalez',  position: 'CB', value: 3,   active: true,  era: '2024' },
  { id: 1309, name: 'Nate Wiggins',        position: 'CB', value: 3,   active: true,  era: '2024' },
  { id: 1310, name: 'Jaire Alexander',     position: 'CB', value: 3,   active: true,  era: '2024' },
  { id: 1311, name: 'Jaycee Horn',         position: 'CB', value: 3,   active: true,  era: '2024' },
  { id: 1312, name: 'Darius Slay',         position: 'CB', value: 3,   active: true,  era: '2024' },
  { id: 1313, name: 'Xavien Howard',       position: 'CB', value: 3,   active: true,  era: '2024' },
  { id: 1314, name: 'Marshon Lattimore',   position: 'CB', value: 3,   active: true,  era: '2024' },
  { id: 1315, name: 'Stephon Gilmore',     position: 'CB', value: 2,   active: true,  era: '2024' },
  { id: 2301, name: 'Paulson Adebo',       position: 'CB', value: 3,   active: true,  era: '2024' },
  { id: 2302, name: 'Rasul Douglas',       position: 'CB', value: 3,   active: true,  era: '2024' },
  { id: 2303, name: 'Cam Smith',           position: 'CB', value: 2,   active: true,  era: '2024' },
  { id: 2304, name: 'Greg Newsome II',     position: 'CB', value: 2,   active: true,  era: '2024' },
  { id: 2305, name: 'Eli Apple',           position: 'CB', value: 2,   active: true,  era: '2024' },
  { id: 2306, name: 'Carlton Davis III',   position: 'CB', value: 2,   active: true,  era: '2024' },
  { id: 2307, name: "Tre'Davious White",   position: 'CB', value: 2,   active: true,  era: '2024' },
  { id: 2308, name: 'Kelee Ringo',         position: 'CB', value: 2,   active: true,  era: '2024' },
  { id: 2309, name: 'Deommodore Lenoir',   position: 'CB', value: 2,   active: true,  era: '2024' },
  { id: 2310, name: 'Cameron Mitchell',    position: 'CB', value: 2,   active: true,  era: '2024' },
  { id: 2311, name: 'Keenan Isaac',        position: 'CB', value: 1,   active: true,  era: '2024' },
  // Historical (career-best single season)
  { id: 1316, name: 'Dick "Night Train" Lane', position: 'CB', value: 14, active: false, era: '1952' },
  { id: 1317, name: 'Lester Hayes',        position: 'CB', value: 13,  active: false, era: '1980' },
  { id: 1318, name: 'Paul Krause',         position: 'CB', value: 12,  active: false, era: '1964' },
  { id: 1319, name: 'Everson Walls',       position: 'CB', value: 11,  active: false, era: '1981' },
  { id: 1320, name: 'Rod Woodson',         position: 'CB', value: 11,  active: false, era: '1993' },
  { id: 1321, name: 'Mel Blount',          position: 'CB', value: 11,  active: false, era: '1975' },
  { id: 1322, name: 'Ty Law',              position: 'CB', value: 10,  active: false, era: '2003' },
  { id: 1323, name: 'Lem Barney',          position: 'CB', value: 10,  active: false, era: '1967' },
  { id: 1324, name: 'Mel Renfro',          position: 'CB', value: 10,  active: false, era: '1969' },
  { id: 1325, name: 'Ken Riley',           position: 'CB', value: 9,   active: false, era: '1976' },
  { id: 1326, name: 'Charles Woodson',     position: 'CB', value: 9,   active: false, era: '2009' },
  { id: 1327, name: 'Bobby Boyd',          position: 'CB', value: 9,   active: false, era: '1964' },
  { id: 1328, name: 'Emmitt Thomas',       position: 'CB', value: 9,   active: false, era: '1974' },
  { id: 1329, name: 'Aeneas Williams',     position: 'CB', value: 9,   active: false, era: '2000' },
  { id: 1330, name: 'Deion Sanders',       position: 'CB', value: 8,   active: false, era: '1994' },
  { id: 1331, name: 'Richard Sherman',     position: 'CB', value: 8,   active: false, era: '2013' },
  { id: 1332, name: 'Darrelle Revis',      position: 'CB', value: 8,   active: false, era: '2009' },
  { id: 1333, name: 'Aqib Talib',          position: 'CB', value: 8,   active: false, era: '2012' },
  { id: 1334, name: 'Patrick Peterson',    position: 'CB', value: 8,   active: false, era: '2011' },
  { id: 1335, name: 'Herb Adderley',       position: 'CB', value: 7,   active: false, era: '1965' },
  { id: 1336, name: 'Willie Brown',        position: 'CB', value: 7,   active: false, era: '1969' },

  // ─── SAFETIES – season tackles ───────────────────────────────────────────
  // Active (2024 NFL season)
  { id: 1401, name: 'Budda Baker',         position: 'S',  value: 120, active: true,  era: '2024' },
  { id: 1402, name: 'Kyle Hamilton',       position: 'S',  value: 110, active: true,  era: '2024' },
  { id: 1403, name: 'Kamren Curl',         position: 'S',  value: 100, active: true,  era: '2024' },
  { id: 1404, name: 'Jessie Bates III',    position: 'S',  value: 100, active: true,  era: '2024' },
  { id: 1405, name: 'Harrison Smith',      position: 'S',  value: 95,  active: true,  era: '2024' },
  { id: 1406, name: 'Antoine Winfield Jr.',position: 'S',  value: 90,  active: true,  era: '2024' },
  { id: 1407, name: 'Derwin James Jr.',    position: 'S',  value: 90,  active: true,  era: '2024' },
  { id: 1408, name: 'Minkah Fitzpatrick',  position: 'S',  value: 85,  active: true,  era: '2024' },
  { id: 1409, name: 'Jordan Poyer',        position: 'S',  value: 80,  active: true,  era: '2024' },
  { id: 1410, name: 'Kevin Byard',         position: 'S',  value: 80,  active: true,  era: '2024' },
  { id: 1411, name: 'Jevon Holland',       position: 'S',  value: 80,  active: true,  era: '2024' },
  { id: 1412, name: 'Justin Simmons',      position: 'S',  value: 75,  active: true,  era: '2024' },
  { id: 1413, name: 'Jabrill Peppers',     position: 'S',  value: 75,  active: true,  era: '2024' },
  { id: 1414, name: 'Quandre Diggs',       position: 'S',  value: 75,  active: true,  era: '2024' },
  { id: 1415, name: 'Marcus Williams',     position: 'S',  value: 70,  active: true,  era: '2024' },
  { id: 1416, name: 'Malik Mustapha',      position: 'S',  value: 70,  active: true,  era: '2024' },
  { id: 2401, name: 'Dax Hill',            position: 'S',  value: 80,  active: true,  era: '2024' },
  { id: 2402, name: 'Kerby Joseph',        position: 'S',  value: 75,  active: true,  era: '2024' },
  { id: 2403, name: 'C.J. Gardner-Johnson',position: 'S',  value: 70,  active: true,  era: '2024' },
  { id: 2404, name: 'Amani Hooker',        position: 'S',  value: 70,  active: true,  era: '2024' },
  { id: 2405, name: 'Jordan Battle',       position: 'S',  value: 65,  active: true,  era: '2024' },
  { id: 2406, name: 'Tracy Walker',        position: 'S',  value: 65,  active: true,  era: '2024' },
  { id: 2407, name: 'Damar Hamlin',        position: 'S',  value: 60,  active: true,  era: '2024' },
  { id: 2408, name: 'J.L. Skinner',        position: 'S',  value: 65,  active: true,  era: '2024' },
  { id: 2409, name: 'Caden Sterns',        position: 'S',  value: 60,  active: true,  era: '2024' },
  { id: 2410, name: 'Delano Hill',         position: 'S',  value: 65,  active: true,  era: '2024' },
  // Historical (career-best single season)
  { id: 1417, name: 'John Lynch',          position: 'S',  value: 135, active: false, era: '2001' },
  { id: 1418, name: 'Antoine Winfield Sr.',position: 'S',  value: 130, active: false, era: '2003' },
  { id: 1419, name: 'Kenny Easley',        position: 'S',  value: 130, active: false, era: '1984' },
  { id: 1420, name: 'Rodney Harrison',     position: 'S',  value: 130, active: false, era: '2002' },
  { id: 1421, name: 'Adrian Wilson',       position: 'S',  value: 130, active: false, era: '2008' },
  { id: 1422, name: 'Lawyer Milloy',       position: 'S',  value: 125, active: false, era: '2000' },
  { id: 1423, name: 'Steve Atwater',       position: 'S',  value: 120, active: false, era: '1993' },
  { id: 1424, name: 'Brian Dawkins',       position: 'S',  value: 115, active: false, era: '2004' },
  { id: 1425, name: 'LeRoy Butler',        position: 'S',  value: 105, active: false, era: '1998' },
  { id: 1426, name: 'Troy Polamalu',       position: 'S',  value: 100, active: false, era: '2008' },
  { id: 1427, name: 'Eugene Robinson',     position: 'S',  value: 100, active: false, era: '1993' },
  { id: 1428, name: 'Ronnie Lott',         position: 'S',  value: 95,  active: false, era: '1986' },
  { id: 1429, name: 'Tim McDonald',        position: 'S',  value: 95,  active: false, era: '1994' },
  { id: 1430, name: 'Bob Sanders',         position: 'S',  value: 90,  active: false, era: '2007' },
  { id: 1431, name: 'Jack Tatum',          position: 'S',  value: 90,  active: false, era: '1974' },
  { id: 1432, name: 'Ed Reed',             position: 'S',  value: 90,  active: false, era: '2004' },
  { id: 1433, name: 'Darren Sharper',      position: 'S',  value: 75,  active: false, era: '2009' },

  // ─── EDGE RUSHERS – season sacks ─────────────────────────────────────────
  // Active (2024 NFL season)
  { id: 1501, name: 'T.J. Watt',           position: 'EDGE', value: 18.5, active: true,  era: '2024' },
  { id: 1502, name: 'Trey Hendrickson',    position: 'EDGE', value: 17.5, active: true,  era: '2024' },
  { id: 1503, name: 'Myles Garrett',       position: 'EDGE', value: 14.0, active: true,  era: '2024' },
  { id: 1504, name: 'Micah Parsons',       position: 'EDGE', value: 14.0, active: true,  era: '2024' },
  { id: 1505, name: 'Jonathan Greenard',   position: 'EDGE', value: 13.0, active: true,  era: '2024' },
  { id: 1506, name: 'Danielle Hunter',     position: 'EDGE', value: 12.0, active: true,  era: '2024' },
  { id: 1507, name: 'Khalil Mack',         position: 'EDGE', value: 11.0, active: true,  era: '2024' },
  { id: 1508, name: 'Maxx Crosby',         position: 'EDGE', value: 10.0, active: true,  era: '2024' },
  { id: 1509, name: 'Matthew Judon',       position: 'EDGE', value: 10.0, active: true,  era: '2024' },
  { id: 1510, name: 'Brian Burns',         position: 'EDGE', value: 9.0,  active: true,  era: '2024' },
  { id: 1511, name: 'Josh Allen (EDGE)',   position: 'EDGE', value: 9.0,  active: true,  era: '2024' },
  { id: 1512, name: 'Aidan Hutchinson',    position: 'EDGE', value: 7.5,  active: true,  era: '2024' },
  { id: 1513, name: 'Lukas Van Ness',      position: 'EDGE', value: 7.0,  active: true,  era: '2024' },
  { id: 1514, name: 'Dallas Turner',       position: 'EDGE', value: 7.0,  active: true,  era: '2024' },
  { id: 1515, name: 'Nick Bosa',           position: 'EDGE', value: 8.0,  active: true,  era: '2024' },
  { id: 1516, name: 'Za\'Darius Smith',    position: 'EDGE', value: 8.0,  active: true,  era: '2024' },
  { id: 1517, name: 'Laiatu Latu',         position: 'EDGE', value: 8.0,  active: true,  era: '2024' },
  { id: 1518, name: 'Chop Robinson',       position: 'EDGE', value: 6.0,  active: true,  era: '2024' },
  { id: 1519, name: 'Von Miller',          position: 'EDGE', value: 5.0,  active: true,  era: '2024' },
  { id: 1520, name: 'Cameron Jordan',      position: 'EDGE', value: 5.0,  active: true,  era: '2024' },
  // Historical (career-best single season)
  { id: 1521, name: 'Michael Strahan',     position: 'EDGE', value: 22.5, active: false, era: '2001' },
  { id: 1522, name: 'Mark Gastineau',      position: 'EDGE', value: 22.0, active: false, era: '1984' },
  { id: 1523, name: 'Jared Allen',         position: 'EDGE', value: 22.0, active: false, era: '2011' },
  { id: 1524, name: 'Chris Doleman',       position: 'EDGE', value: 21.0, active: false, era: '1989' },
  { id: 1525, name: 'Reggie White',        position: 'EDGE', value: 21.0, active: false, era: '1987' },
  { id: 1526, name: 'Lawrence Taylor',     position: 'EDGE', value: 20.5, active: false, era: '1986' },
  { id: 1527, name: 'DeMarcus Ware',       position: 'EDGE', value: 20.0, active: false, era: '2008' },
  { id: 1528, name: 'Bruce Smith',         position: 'EDGE', value: 19.0, active: false, era: '1990' },
  { id: 1529, name: 'Clyde Simmons',       position: 'EDGE', value: 19.0, active: false, era: '1992' },
  { id: 1530, name: 'Robert Mathis',       position: 'EDGE', value: 19.5, active: false, era: '2013' },
  { id: 1531, name: 'Jason Taylor',        position: 'EDGE', value: 18.5, active: false, era: '2002' },
  { id: 1532, name: 'Elvis Dumervil',      position: 'EDGE', value: 17.0, active: false, era: '2009' },
  { id: 1533, name: 'Richard Dent',        position: 'EDGE', value: 17.5, active: false, era: '1985' },
  { id: 1534, name: 'Pat Swilling',        position: 'EDGE', value: 17.0, active: false, era: '1991' },
  { id: 1535, name: 'Dwight Freeney',      position: 'EDGE', value: 16.0, active: false, era: '2004' },
  { id: 1536, name: 'Kevin Greene',        position: 'EDGE', value: 16.0, active: false, era: '1996' },
  { id: 1537, name: 'Julius Peppers',      position: 'EDGE', value: 14.5, active: false, era: '2008' },
  { id: 1538, name: 'John Randle',         position: 'EDGE', value: 15.5, active: false, era: '1997' },
  { id: 1539, name: 'Neil Smith',          position: 'EDGE', value: 15.0, active: false, era: '1993' },
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

