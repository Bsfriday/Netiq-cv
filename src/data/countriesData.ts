export interface CountryInfo {
  name: string;
  alpha2: string;
  alpha3: string;
  region: 'Africa' | 'Asia' | 'Europe' | 'North America' | 'South America' | 'Oceania';
  phonePrefix: string;
  capital: string;
  majorCities: string[];
  universities: string[];
  companies: string[];
}

export const ALL_COUNTRIES: CountryInfo[] = [
  // A
  {
    name: 'Afghanistan',
    alpha2: 'AF',
    alpha3: 'AFG',
    region: 'Asia',
    phonePrefix: '+93',
    capital: 'Kabul',
    majorCities: ['Kabul', 'Herat', 'Mazar-i-Sharif', 'Kandahar'],
    universities: ['Kabul University', 'Herat University', 'American University of Afghanistan'],
    companies: ['Pamir Tech Group', 'Ariana Digital Services', 'Kabul Innovations']
  },
  {
    name: 'Albania',
    alpha2: 'AL',
    alpha3: 'ALB',
    region: 'Europe',
    phonePrefix: '+355',
    capital: 'Tirana',
    majorCities: ['Tirana', 'Durrës', 'Vlorë', 'Shkodër'],
    universities: ['University of Tirana', 'Polytechnic University of Tirana', 'Epoka University'],
    companies: ['Illyria Digital Solutions', 'Adriatic Software Systems', 'Tirana Cloud Labs']
  },
  {
    name: 'Algeria',
    alpha2: 'DZ',
    alpha3: 'DZA',
    region: 'Africa',
    phonePrefix: '+213',
    capital: 'Algiers',
    majorCities: ['Algiers', 'Oran', 'Constantine', 'Annaba'],
    universities: ['University of Algiers', 'USTHB', 'University of Oran'],
    companies: ['Atlas Data Systems', 'Numidia Tech Solutions', 'Maghreb Digital Labs']
  },
  {
    name: 'Andorra',
    alpha2: 'AD',
    alpha3: 'AND',
    region: 'Europe',
    phonePrefix: '+376',
    capital: 'Andorra la Vella',
    majorCities: ['Andorra la Vella', 'Escaldes-Engordany', 'Encamp'],
    universities: ['University of Andorra'],
    companies: ['Pyrenees Digital Tech', 'Valira Solutions', 'Andorra Global Innovations']
  },
  {
    name: 'Angola',
    alpha2: 'AO',
    alpha3: 'AGO',
    region: 'Africa',
    phonePrefix: '+244',
    capital: 'Luanda',
    majorCities: ['Luanda', 'Huambo', 'Lobito', 'Benguela'],
    universities: ['Agostinho Neto University', 'Catholic University of Angola'],
    companies: ['Luanda Tech Hub', 'Kwanza Data Systems', 'Atlantico Digital Group']
  },
  {
    name: 'Antigua and Barbuda',
    alpha2: 'AG',
    alpha3: 'ATG',
    region: 'North America',
    phonePrefix: '+1-268',
    capital: "St. John's",
    majorCities: ["St. John's", 'All Saints', 'Liberta'],
    universities: ['University of the West Indies at Five Islands'],
    companies: ['Caribbean Cloud Connect', 'Antigua Digital Wave', 'Islands Tech Network']
  },
  {
    name: 'Argentina',
    alpha2: 'AR',
    alpha3: 'ARG',
    region: 'South America',
    phonePrefix: '+54',
    capital: 'Buenos Aires',
    majorCities: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata'],
    universities: ['University of Buenos Aires (UBA)', 'National University of Córdoba', 'ITBA'],
    companies: ['Pampa Digital Labs', 'Rio de la Plata Software', 'Austral AI Ventures']
  },
  {
    name: 'Armenia',
    alpha2: 'AM',
    alpha3: 'ARM',
    region: 'Asia',
    phonePrefix: '+374',
    capital: 'Yerevan',
    majorCities: ['Yerevan', 'Gyumri', 'Vanadzor'],
    universities: ['Yerevan State University', 'American University of Armenia'],
    companies: ['Ararat Tech Solutions', 'Hayastan Innovations', 'Silicon Mountain Labs']
  },
  {
    name: 'Australia',
    alpha2: 'AU',
    alpha3: 'AUS',
    region: 'Oceania',
    phonePrefix: '+61',
    capital: 'Canberra',
    majorCities: ['Sydney, NSW', 'Melbourne, VIC', 'Brisbane, QLD', 'Perth, WA', 'Adelaide, SA'],
    universities: ['University of Melbourne', 'University of Sydney', 'UNSW Sydney', 'Australian National University'],
    companies: ['Southern Cross Innovations', 'Pacific Crest Operations', 'Harbour City Tech', 'Outback Systems']
  },
  {
    name: 'Austria',
    alpha2: 'AT',
    alpha3: 'AUT',
    region: 'Europe',
    phonePrefix: '+43',
    capital: 'Vienna',
    majorCities: ['Vienna', 'Graz', 'Linz', 'Salzburg', 'Innsbruck'],
    universities: ['University of Vienna', 'Vienna University of Technology (TU Wien)', 'University of Graz'],
    companies: ['Danube Tech Dynamics', 'Alps Software Group', 'Vienna Digital Labs']
  },
  {
    name: 'Azerbaijan',
    alpha2: 'AZ',
    alpha3: 'AZE',
    region: 'Asia',
    phonePrefix: '+994',
    capital: 'Baku',
    majorCities: ['Baku', 'Ganja', 'Sumqayit'],
    universities: ['Baku State University', 'ADA University', 'Azerbaijan State Oil and Industry University'],
    companies: ['Caspian Wave Technologies', 'Baku Innovation Labs', 'Shirvan Data Systems']
  },

  // B
  {
    name: 'Bahamas',
    alpha2: 'BS',
    alpha3: 'BHS',
    region: 'North America',
    phonePrefix: '+1-242',
    capital: 'Nassau',
    majorCities: ['Nassau', 'Freeport', 'West End'],
    universities: ['University of The Bahamas'],
    companies: ['Lucayan Tech Solutions', 'Nassau Digital Systems', 'Bahamas Cloud Group']
  },
  {
    name: 'Bahrain',
    alpha2: 'BH',
    alpha3: 'BHR',
    region: 'Asia',
    phonePrefix: '+973',
    capital: 'Manama',
    majorCities: ['Manama', 'Riffa', 'Muharraq'],
    universities: ['University of Bahrain', 'Ahlia University'],
    companies: ['Dilmun Tech Partners', 'Pearl Digital Gulf', 'Manama FinTech & Cloud']
  },
  {
    name: 'Bangladesh',
    alpha2: 'BD',
    alpha3: 'BGD',
    region: 'Asia',
    phonePrefix: '+880',
    capital: 'Dhaka',
    majorCities: ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi'],
    universities: ['University of Dhaka', 'BUET', 'North South University', 'BRAC University'],
    companies: ['Padma Digital Tech', 'Bengal Wave Innovations', 'Dhaka Data Solutions']
  },
  {
    name: 'Barbados',
    alpha2: 'BB',
    alpha3: 'BRB',
    region: 'North America',
    phonePrefix: '+1-246',
    capital: 'Bridgetown',
    majorCities: ['Bridgetown', 'Speightstown', 'Oistins'],
    universities: ['University of the West Indies at Cave Hill'],
    companies: ['Bajan Digital Hub', 'Careenage Tech', 'Pelican Cloud Innovations']
  },
  {
    name: 'Belarus',
    alpha2: 'BY',
    alpha3: 'BLR',
    region: 'Europe',
    phonePrefix: '+375',
    capital: 'Minsk',
    majorCities: ['Minsk', 'Gomel', 'Mogilev', 'Vitebsk'],
    universities: ['Belarusian State University', 'BSUIR'],
    companies: ['Minsk High-Tech Solutions', 'BelData Enterprise', 'Polesie Software']
  },
  {
    name: 'Belgium',
    alpha2: 'BE',
    alpha3: 'BEL',
    region: 'Europe',
    phonePrefix: '+32',
    capital: 'Brussels',
    majorCities: ['Brussels', 'Antwerp', 'Ghent', 'Leuven', 'Liège'],
    universities: ['KU Leuven', 'Ghent University', 'Université catholique de Louvain', 'ULB Brussels'],
    companies: ['Flanders Digital NV', 'Ardennes Cloud Tech', 'Brussels Precision Labs']
  },
  {
    name: 'Belize',
    alpha2: 'BZ',
    alpha3: 'BLZ',
    region: 'North America',
    phonePrefix: '+501',
    capital: 'Belmopan',
    majorCities: ['Belize City', 'Belmopan', 'San Ignacio'],
    universities: ['University of Belize', 'Galen University'],
    companies: ['Maya Reef Tech', 'Belize Digital Enterprise', 'Barrier Tech Solutions']
  },
  {
    name: 'Benin',
    alpha2: 'BJ',
    alpha3: 'BEN',
    region: 'Africa',
    phonePrefix: '+229',
    capital: 'Porto-Novo',
    majorCities: ['Cotonou', 'Porto-Novo', 'Parakou', 'Abomey-Calavi'],
    universities: ["Université d'Abomey-Calavi", 'University of Parakou'],
    companies: ['Dahomey Tech Labs', 'Cotonou Cloud Solutions', 'Benin Digital Hub']
  },
  {
    name: 'Bhutan',
    alpha2: 'BT',
    alpha3: 'BTN',
    region: 'Asia',
    phonePrefix: '+975',
    capital: 'Thimphu',
    majorCities: ['Thimphu', 'Phuntsholing', 'Paro'],
    universities: ['Royal University of Bhutan'],
    companies: ['Druk Digital Innovations', 'Thunder Dragon Tech', 'Himalayan Cloud Labs']
  },
  {
    name: 'Bolivia',
    alpha2: 'BO',
    alpha3: 'BOL',
    region: 'South America',
    phonePrefix: '+591',
    capital: 'Sucre',
    majorCities: ['La Paz', 'Santa Cruz de la Sierra', 'Cochabamba', 'Sucre'],
    universities: ['Universidad Mayor de San Andrés', 'Universidad Mayor de San Simón'],
    companies: ['Andina Tech Systems', 'Altiplano Software', 'Santa Cruz Digital Labs']
  },
  {
    name: 'Bosnia and Herzegovina',
    alpha2: 'BA',
    alpha3: 'BIH',
    region: 'Europe',
    phonePrefix: '+387',
    capital: 'Sarajevo',
    majorCities: ['Sarajevo', 'Banja Luka', 'Tuzla', 'Mostar'],
    universities: ['University of Sarajevo', 'University of Banja Luka'],
    companies: ['Balkan Code Works', 'Sarajevo Tech Foundry', 'Bosna Cloud Systems']
  },
  {
    name: 'Botswana',
    alpha2: 'BW',
    alpha3: 'BWA',
    region: 'Africa',
    phonePrefix: '+267',
    capital: 'Gaborone',
    majorCities: ['Gaborone', 'Francistown', 'Maun'],
    universities: ['University of Botswana', 'BIUST'],
    companies: ['Kalahari Data Systems', 'Gaborone Innovations', 'Okavango Digital']
  },
  {
    name: 'Brazil',
    alpha2: 'BR',
    alpha3: 'BRA',
    region: 'South America',
    phonePrefix: '+55',
    capital: 'Brasília',
    majorCities: ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba', 'Florianópolis'],
    universities: ['Universidade de São Paulo (USP)', 'Unicamp', 'UFRJ', 'UFMG'],
    companies: ['Paulista Digital Tech', 'Carioca Solutions Ltda', 'Horizonte Brasil Ventures', 'Atlantica Software']
  },
  {
    name: 'Brunei',
    alpha2: 'BN',
    alpha3: 'BRN',
    region: 'Asia',
    phonePrefix: '+673',
    capital: 'Bandar Seri Begawan',
    majorCities: ['Bandar Seri Begawan', 'Kuala Belait', 'Seria'],
    universities: ['Universiti Brunei Darussalam', 'Universiti Teknologi Brunei'],
    companies: ['Borneo Digital Systems', 'Brunei Cloud Solutions', 'Sultanate Tech Hub']
  },
  {
    name: 'Bulgaria',
    alpha2: 'BG',
    alpha3: 'BGR',
    region: 'Europe',
    phonePrefix: '+359',
    capital: 'Sofia',
    majorCities: ['Sofia', 'Plovdiv', 'Varna', 'Burgas'],
    universities: ['Sofia University', 'Technical University of Sofia'],
    companies: ['Balkan Silicon Labs', 'Sofia Tech Valley', 'Thracian Software']
  },
  {
    name: 'Burkina Faso',
    alpha2: 'BF',
    alpha3: 'BFA',
    region: 'Africa',
    phonePrefix: '+226',
    capital: 'Ouagadougou',
    majorCities: ['Ouagadougou', 'Bobo-Dioulasso', 'Koudougou'],
    universities: ['University of Ouagadougou'],
    companies: ['Sahel Digital Systems', 'Burkina Tech Services', 'Faso Cloud Enterprise']
  },
  {
    name: 'Burundi',
    alpha2: 'BI',
    alpha3: 'BDI',
    region: 'Africa',
    phonePrefix: '+257',
    capital: 'Gitega',
    majorCities: ['Bujumbura', 'Gitega', 'Ngozi'],
    universities: ['University of Burundi'],
    companies: ['Tanganyika Data Solutions', 'Burundi Cloud Connect', 'Ruvubu Tech']
  },

  // C
  {
    name: 'Cabo Verde',
    alpha2: 'CV',
    alpha3: 'CPV',
    region: 'Africa',
    phonePrefix: '+238',
    capital: 'Praia',
    majorCities: ['Praia', 'Mindelo', 'Espargos'],
    universities: ['University of Cape Verde', 'Jean Piaget University of Cape Verde'],
    companies: ['Atlantic Ocean Tech', 'Praia Digital Labs', 'Cabo Verde Cloud Systems']
  },
  {
    name: 'Cambodia',
    alpha2: 'KH',
    alpha3: 'KHM',
    region: 'Asia',
    phonePrefix: '+855',
    capital: 'Phnom Penh',
    majorCities: ['Phnom Penh', 'Siem Reap', 'Battambang', 'Sihanoukville'],
    universities: ['Royal University of Phnom Penh', 'Institute of Technology of Cambodia'],
    companies: ['Angkor Tech Foundry', 'Mekong Wave Digital', 'Phnom Penh Software']
  },
  {
    name: 'Cameroon',
    alpha2: 'CM',
    alpha3: 'CMR',
    region: 'Africa',
    phonePrefix: '+237',
    capital: 'Yaoundé',
    majorCities: ['Douala', 'Yaoundé', 'Bamenda', 'Bafoussam'],
    universities: ['University of Yaoundé I', 'University of Douala', 'University of Buea'],
    companies: ['Silicon Mountain Buea', 'Wouri Data Systems', 'Cameroun Cloud Innovations']
  },
  {
    name: 'Canada',
    alpha2: 'CA',
    alpha3: 'CAN',
    region: 'North America',
    phonePrefix: '+1',
    capital: 'Ottawa',
    majorCities: ['Toronto, ON', 'Vancouver, BC', 'Montreal, QC', 'Ottawa, ON', 'Calgary, AB', 'Waterloo, ON'],
    universities: ['University of Toronto', 'UBC', 'McGill University', 'University of Waterloo'],
    companies: ['Maple Ridge Technologies', 'Frontier Digital Canada', 'Great Lakes Systems', 'Nordic Horizon Tech']
  },
  {
    name: 'Central African Republic',
    alpha2: 'CF',
    alpha3: 'CAF',
    region: 'Africa',
    phonePrefix: '+236',
    capital: 'Bangui',
    majorCities: ['Bangui', 'Bimbo', 'Berbérati'],
    universities: ['University of Bangui'],
    companies: ['Ubangi Digital Tech', 'Bangui Data Services', 'Equatorial Tech Hub']
  },
  {
    name: 'Chad',
    alpha2: 'TD',
    alpha3: 'TCD',
    region: 'Africa',
    phonePrefix: '+235',
    capital: "N'Djamena",
    majorCities: ["N'Djamena", 'Moundou', 'Sarh', 'Abéché'],
    universities: ["University of N'Djamena"],
    companies: ['Sahelian Digital', 'Chad Tech Innovations', 'Chari Data Systems']
  },
  {
    name: 'Chile',
    alpha2: 'CL',
    alpha3: 'CHL',
    region: 'South America',
    phonePrefix: '+56',
    capital: 'Santiago',
    majorCities: ['Santiago', 'Valparaíso', 'Concepción', 'Antofagasta'],
    universities: ['Pontificia Universidad Católica de Chile', 'Universidad de Chile', 'Universidad de Concepción'],
    companies: ['Andes Digital Labs', 'Santiago Cloud Systems', 'Atacama Software Group']
  },
  {
    name: 'China',
    alpha2: 'CN',
    alpha3: 'CHN',
    region: 'Asia',
    phonePrefix: '+86',
    capital: 'Beijing',
    majorCities: ['Beijing', 'Shanghai', 'Shenzhen', 'Hangzhou', 'Guangzhou', 'Chengdu'],
    universities: ['Tsinghua University', 'Peking University', 'Fudan University', 'Zhejiang University'],
    companies: ['Apex Quantum Data', 'Oriental Matrix Systems', 'Celestial Cloud Innovations']
  },
  {
    name: 'Colombia',
    alpha2: 'CO',
    alpha3: 'COL',
    region: 'South America',
    phonePrefix: '+57',
    capital: 'Bogotá',
    majorCities: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena'],
    universities: ['Universidad de los Andes', 'Universidad Nacional de Colombia', 'Pontificia Universidad Javeriana'],
    companies: ['Ruta N Tech Partners', 'Bogota Digital Labs', 'Coffee Axis Software']
  },
  {
    name: 'Comoros',
    alpha2: 'KM',
    alpha3: 'COM',
    region: 'Africa',
    phonePrefix: '+269',
    capital: 'Moroni',
    majorCities: ['Moroni', 'Mutsamudu', 'Fomboni'],
    universities: ['University of the Comoros'],
    companies: ['Mozambique Channel Tech', 'Moroni Cloud Services', 'Comoros Digital Wave']
  },
  {
    name: 'Congo',
    alpha2: 'CG',
    alpha3: 'COG',
    region: 'Africa',
    phonePrefix: '+242',
    capital: 'Brazzaville',
    majorCities: ['Brazzaville', 'Pointe-Noire', 'Dolisie'],
    universities: ['Marien Ngouabi University'],
    companies: ['Congo River Digital', 'Brazzaville Tech Solutions', 'Pointe-Noire Cloud Systems']
  },
  {
    name: 'Costa Rica',
    alpha2: 'CR',
    alpha3: 'CRI',
    region: 'North America',
    phonePrefix: '+506',
    capital: 'San José',
    majorCities: ['San José', 'Alajuela', 'Cartago', 'Heredia'],
    universities: ['University of Costa Rica (UCR)', 'Instituto Tecnológico de Costa Rica (TEC)'],
    companies: ['Pura Vida Software', 'San Jose Cloud Tech', 'Central Valley Innovations']
  },
  {
    name: "Côte d'Ivoire",
    alpha2: 'CI',
    alpha3: 'CIV',
    region: 'Africa',
    phonePrefix: '+225',
    capital: 'Yamoussoukro',
    majorCities: ['Abidjan', 'Bouaké', 'Yamoussoukro', 'San-Pédro'],
    universities: ['Félix Houphouët-Boigny University', 'INP-HB'],
    companies: ['Lagune Tech Innovations', 'Abidjan Digital Foundry', 'Ivorian Cloud Services']
  },
  {
    name: 'Croatia',
    alpha2: 'HR',
    alpha3: 'HRV',
    region: 'Europe',
    phonePrefix: '+385',
    capital: 'Zagreb',
    majorCities: ['Zagreb', 'Split', 'Rijeka', 'Osijek'],
    universities: ['University of Zagreb', 'University of Split', 'FER Zagreb'],
    companies: ['Dalmatia Digital', 'Zagreb Cloud Foundry', 'Adriatic Software Labs']
  },
  {
    name: 'Cuba',
    alpha2: 'CU',
    alpha3: 'CUB',
    region: 'North America',
    phonePrefix: '+53',
    capital: 'Havana',
    majorCities: ['Havana', 'Santiago de Cuba', 'Camagüey', 'Holguín'],
    universities: ['University of Havana', 'CUJAE'],
    companies: ['Havana Tech Labs', 'Antilles Software', 'Caribe Data Solutions']
  },
  {
    name: 'Cyprus',
    alpha2: 'CY',
    alpha3: 'CYP',
    region: 'Europe',
    phonePrefix: '+357',
    capital: 'Nicosia',
    majorCities: ['Nicosia', 'Limassol', 'Larnaca', 'Paphos'],
    universities: ['University of Cyprus', 'Cyprus University of Technology'],
    companies: ['Mediterranean Digital Tech', 'Limassol FinTech Foundry', 'Aphrodite Cloud Labs']
  },
  {
    name: 'Czechia',
    alpha2: 'CZ',
    alpha3: 'CZE',
    region: 'Europe',
    phonePrefix: '+420',
    capital: 'Prague',
    majorCities: ['Prague', 'Brno', 'Ostrava', 'Plzeň'],
    universities: ['Charles University', 'Czech Technical University in Prague (ČVUT)', 'Masaryk University'],
    companies: ['Bohemia Software Works', 'Prague Data Engine', 'Moravia Digital Group']
  },

  // D
  {
    name: 'Democratic Republic of the Congo',
    alpha2: 'CD',
    alpha3: 'COD',
    region: 'Africa',
    phonePrefix: '+243',
    capital: 'Kinshasa',
    majorCities: ['Kinshasa', 'Lubumbashi', 'Goma', 'Kisangani'],
    universities: ['University of Kinshasa', 'University of Lubumbashi'],
    companies: ['Kinshasa Tech Labs', 'Congo Basin Data', 'Katanga Digital Solutions']
  },
  {
    name: 'Denmark',
    alpha2: 'DK',
    alpha3: 'DNK',
    region: 'Europe',
    phonePrefix: '+45',
    capital: 'Copenhagen',
    majorCities: ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg'],
    universities: ['University of Copenhagen', 'Technical University of Denmark (DTU)', 'Aarhus University'],
    companies: ['Nordic Wave Software', 'Copenhagen Digital Foundry', 'Jutland Cloud Tech']
  },
  {
    name: 'Djibouti',
    alpha2: 'DJ',
    alpha3: 'DJI',
    region: 'Africa',
    phonePrefix: '+253',
    capital: 'Djibouti',
    majorCities: ['Djibouti', 'Ali Sabieh', 'Tadjoura'],
    universities: ['University of Djibouti'],
    companies: ['Red Sea Digital Connect', 'Horn of Africa Tech', 'Djibouti Cloud Hub']
  },
  {
    name: 'Dominica',
    alpha2: 'DM',
    alpha3: 'DMA',
    region: 'North America',
    phonePrefix: '+1-767',
    capital: 'Roseau',
    majorCities: ['Roseau', 'Portsmouth', 'Marigot'],
    universities: ['Dominica State College'],
    companies: ['Nature Island Tech', 'Roseau Digital Systems', 'Caribbean Eco Cloud']
  },
  {
    name: 'Dominican Republic',
    alpha2: 'DO',
    alpha3: 'DOM',
    region: 'North America',
    phonePrefix: '+1-809',
    capital: 'Santo Domingo',
    majorCities: ['Santo Domingo', 'Santiago de los Caballeros', 'La Romana'],
    universities: ['Universidad Autónoma de Santo Domingo', 'INTEC', 'PUCMM'],
    companies: ['Quisqueya Software', 'Santo Domingo Tech Labs', 'Caribbean Wave Tech']
  },

  // E
  {
    name: 'Ecuador',
    alpha2: 'EC',
    alpha3: 'ECU',
    region: 'South America',
    phonePrefix: '+593',
    capital: 'Quito',
    majorCities: ['Quito', 'Guayaquil', 'Cuenca', 'Manta'],
    universities: ['Universidad San Francisco de Quito (USFQ)', 'ESPOL', 'Pontificia Universidad Católica del Ecuador'],
    companies: ['Equator Tech Labs', 'Guayas Software Systems', 'Andean Cloud Foundry']
  },
  {
    name: 'Egypt',
    alpha2: 'EG',
    alpha3: 'EGY',
    region: 'Africa',
    phonePrefix: '+20',
    capital: 'Cairo',
    majorCities: ['Cairo', 'Alexandria', 'Giza', 'Mansoura'],
    universities: ['Cairo University', 'Ain Shams University', 'American University in Cairo (AUC)'],
    companies: ['Nile Tech Foundry', 'Smart Village Cairo Labs', 'Pharaoh Digital Systems']
  },
  {
    name: 'El Salvador',
    alpha2: 'SV',
    alpha3: 'SLV',
    region: 'North America',
    phonePrefix: '+503',
    capital: 'San Salvador',
    majorCities: ['San Salvador', 'Santa Ana', 'San Miguel'],
    universities: ['Universidad de El Salvador', 'Universidad Centroamericana José Simeón Cañas (UCA)'],
    companies: ['Cuscatlán Digital Tech', 'San Salvador Cloud Foundry', 'Pacifico Software Labs']
  },
  {
    name: 'Equatorial Guinea',
    alpha2: 'GQ',
    alpha3: 'GNQ',
    region: 'Africa',
    phonePrefix: '+240',
    capital: 'Malabo',
    majorCities: ['Malabo', 'Bata', 'Oyala'],
    universities: ['National University of Equatorial Guinea'],
    companies: ['Bioko Tech Solutions', 'Malabo Cloud Hub', 'Guinea Digital Wave']
  },
  {
    name: 'Eritrea',
    alpha2: 'ER',
    alpha3: 'ERI',
    region: 'Africa',
    phonePrefix: '+291',
    capital: 'Asmara',
    majorCities: ['Asmara', 'Keren', 'Massawa'],
    universities: ['Eritrea Institute of Technology'],
    companies: ['Red Sea Digital Labs', 'Asmara Tech Network', 'Dahlak Systems']
  },
  {
    name: 'Estonia',
    alpha2: 'EE',
    alpha3: 'EST',
    region: 'Europe',
    phonePrefix: '+372',
    capital: 'Tallinn',
    majorCities: ['Tallinn', 'Tartu', 'Narva', 'Pärnu'],
    universities: ['University of Tartu', 'Tallinn University of Technology (TalTech)'],
    companies: ['e-Estonia Digital Foundry', 'Baltic Unicorn Labs', 'Tallinn Tech Works']
  },
  {
    name: 'Eswatini',
    alpha2: 'SZ',
    alpha3: 'SWZ',
    region: 'Africa',
    phonePrefix: '+268',
    capital: 'Mbabane',
    majorCities: ['Mbabane', 'Manzini', 'Big Bend'],
    universities: ['University of Eswatini'],
    companies: ['Swazi Cloud Innovations', 'Mbabane Data Systems', 'Kingdom Tech Works']
  },
  {
    name: 'Ethiopia',
    alpha2: 'ET',
    alpha3: 'ETH',
    region: 'Africa',
    phonePrefix: '+251',
    capital: 'Addis Ababa',
    majorCities: ['Addis Ababa', 'Dire Dawa', 'Hawassa', 'Bahir Dar'],
    universities: ['Addis Ababa University', 'Jimma University', 'Bahir Dar University'],
    companies: ['Sheba Tech Foundry', 'Addis Cloud Labs', 'Abyssinia Digital Systems']
  },

  // F
  {
    name: 'Fiji',
    alpha2: 'FJ',
    alpha3: 'FJI',
    region: 'Oceania',
    phonePrefix: '+679',
    capital: 'Suva',
    majorCities: ['Suva', 'Lautoka', 'Nadi'],
    universities: ['University of the South Pacific (USP)', 'Fiji National University'],
    companies: ['Pacific Wave Technologies', 'Suva Digital Hub', 'Coral Coast Tech']
  },
  {
    name: 'Finland',
    alpha2: 'FI',
    alpha3: 'FIN',
    region: 'Europe',
    phonePrefix: '+358',
    capital: 'Helsinki',
    majorCities: ['Helsinki', 'Espoo', 'Tampere', 'Oulu', 'Turku'],
    universities: ['University of Helsinki', 'Aalto University', 'Tampere University', 'University of Oulu'],
    companies: ['Nordic Aurora Software', 'Helsinki Cloud Works', 'Karelia Tech Solutions']
  },
  {
    name: 'France',
    alpha2: 'FR',
    alpha3: 'FRA',
    region: 'Europe',
    phonePrefix: '+33',
    capital: 'Paris',
    majorCities: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nantes', 'Bordeaux'],
    universities: ['Sorbonne University', 'École Polytechnique', 'Université Paris-Saclay', 'HEC Paris'],
    companies: ['Lumière Technologies SA', 'Hexagone Innovations', 'Seine Digital Partners', 'Rhône Capital Solutions']
  },

  // G
  {
    name: 'Gabon',
    alpha2: 'GA',
    alpha3: 'GAB',
    region: 'Africa',
    phonePrefix: '+241',
    capital: 'Libreville',
    majorCities: ['Libreville', 'Port-Gentil', 'Franceville'],
    universities: ['Omar Bongo University'],
    companies: ['Equatorial Cloud Labs', 'Libreville Tech Hub', 'Gabon Digital Solutions']
  },
  {
    name: 'Gambia',
    alpha2: 'GM',
    alpha3: 'GMB',
    region: 'Africa',
    phonePrefix: '+220',
    capital: 'Banjul',
    majorCities: ['Banjul', 'Serekunda', 'Brikama'],
    universities: ['University of The Gambia'],
    companies: ['Gambia River Tech', 'Banjul Digital Systems', 'Smiling Coast Software']
  },
  {
    name: 'Georgia',
    alpha2: 'GE',
    alpha3: 'GEO',
    region: 'Asia',
    phonePrefix: '+995',
    capital: 'Tbilisi',
    majorCities: ['Tbilisi', 'Batumi', 'Kutaisi'],
    universities: ['Tbilisi State University', 'Ilia State University', 'Free University of Tbilisi'],
    companies: ['Caucasus Tech Works', 'Tbilisi Silicon Valley', 'Iberia Cloud Labs']
  },
  {
    name: 'Germany',
    alpha2: 'DE',
    alpha3: 'DEU',
    region: 'Europe',
    phonePrefix: '+49',
    capital: 'Berlin',
    majorCities: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Stuttgart', 'Cologne'],
    universities: ['Technical University of Munich (TUM)', 'LMU Munich', 'Heidelberg University', 'RWTH Aachen'],
    companies: ['Bavaria Tech Group GmbH', 'Rheinland Dynamics', 'Hanseatic Solutions', 'Alpen Software AG']
  },
  {
    name: 'Ghana',
    alpha2: 'GH',
    alpha3: 'GHA',
    region: 'Africa',
    phonePrefix: '+233',
    capital: 'Accra',
    majorCities: ['Accra', 'Kumasi', 'Tamale', 'Sekondi-Takoradi', 'Tema'],
    universities: ['University of Ghana', 'KNUST', 'Ashesi University'],
    companies: ['Gold Coast Tech Foundry', 'Accra Digital Labs', 'Ashanti Software Solutions']
  },
  {
    name: 'Greece',
    alpha2: 'GR',
    alpha3: 'GRC',
    region: 'Europe',
    phonePrefix: '+30',
    capital: 'Athens',
    majorCities: ['Athens', 'Thessaloniki', 'Patras', 'Heraklion'],
    universities: ['National and Kapodistrian University of Athens', 'National Technical University of Athens (NTUA)', 'Aristotle University of Thessaloniki'],
    companies: ['Hellenic Tech Group', 'Aegean Cloud Labs', 'Athens Silicon Works']
  },
  {
    name: 'Grenada',
    alpha2: 'GD',
    alpha3: 'GRD',
    region: 'North America',
    phonePrefix: '+1-473',
    capital: "St. George's",
    majorCities: ["St. George's", 'Gouyave', 'Grenville'],
    universities: ["St. George's University"],
    companies: ['Spice Isle Tech', 'Caribbean Apex Digital', 'Grenada Cloud Works']
  },
  {
    name: 'Guatemala',
    alpha2: 'GT',
    alpha3: 'GTM',
    region: 'North America',
    phonePrefix: '+502',
    capital: 'Guatemala City',
    majorCities: ['Guatemala City', 'Mixco', 'Quetzaltenango', 'Villa Nueva'],
    universities: ['Universidad de San Carlos de Guatemala', 'Universidad del Valle de Guatemala'],
    companies: ['Maya Silicon Hub', 'Guatemala Digital Systems', 'Altiplano Cloud Works']
  },
  {
    name: 'Guinea',
    alpha2: 'GN',
    alpha3: 'GIN',
    region: 'Africa',
    phonePrefix: '+224',
    capital: 'Conakry',
    majorCities: ['Conakry', 'Nzérékoré', 'Kankan', 'Kindia'],
    universities: ['Gamal Abdel Nasser University of Conakry'],
    companies: ['Conakry Tech Works', 'Guinea Digital Hub', 'Fouta Cloud Systems']
  },
  {
    name: 'Guinea-Bissau',
    alpha2: 'GW',
    alpha3: 'GNB',
    region: 'Africa',
    phonePrefix: '+245',
    capital: 'Bissau',
    majorCities: ['Bissau', 'Bafatá', 'Gabú'],
    universities: ['Amílcar Cabral University'],
    companies: ['Bissau Tech Innovations', 'Guinea Coast Software', 'Bijagos Digital Systems']
  },
  {
    name: 'Guyana',
    alpha2: 'GY',
    alpha3: 'GUY',
    region: 'South America',
    phonePrefix: '+592',
    capital: 'Georgetown',
    majorCities: ['Georgetown', 'Linden', 'New Amsterdam'],
    universities: ['University of Guyana'],
    companies: ['Demerara Tech Foundry', 'Guyana Cloud Labs', 'El Dorado Digital']
  },

  // H
  {
    name: 'Haiti',
    alpha2: 'HT',
    alpha3: 'HTI',
    region: 'North America',
    phonePrefix: '+509',
    capital: 'Port-au-Prince',
    majorCities: ['Port-au-Prince', 'Carrefour', 'Delmas', 'Cap-Haïtien'],
    universities: ["Université d'État d'Haïti"],
    companies: ['Ayiti Digital Labs', 'Caribbean Star Tech', 'Port-au-Prince Cloud Foundry']
  },
  {
    name: 'Honduras',
    alpha2: 'HN',
    alpha3: 'HND',
    region: 'North America',
    phonePrefix: '+504',
    capital: 'Tegucigalpa',
    majorCities: ['Tegucigalpa', 'San Pedro Sula', 'Choloma', 'La Ceiba'],
    universities: ['Universidad Nacional Autónoma de Honduras (UNAH)', 'UNITEC'],
    companies: ['Copán Tech Solutions', 'Sula Software Group', 'Honduras Digital Network']
  },
  {
    name: 'Hungary',
    alpha2: 'HU',
    alpha3: 'HUN',
    region: 'Europe',
    phonePrefix: '+36',
    capital: 'Budapest',
    majorCities: ['Budapest', 'Debrecen', 'Szeged', 'Miskolc', 'Pécs'],
    universities: ['Eötvös Loránd University (ELTE)', 'Budapest University of Technology and Economics (BME)'],
    companies: ['Danubian Software Hub', 'Budapest Tech Labs', 'Pannonia Cloud Foundry']
  },

  // I
  {
    name: 'Iceland',
    alpha2: 'IS',
    alpha3: 'ISL',
    region: 'Europe',
    phonePrefix: '+354',
    capital: 'Reykjavik',
    majorCities: ['Reykjavik', 'Kópavogur', 'Hafnarfjörður', 'Akureyri'],
    universities: ['University of Iceland', 'Reykjavik University'],
    companies: ['Geysir Digital Works', 'Reykjavik Cloud Foundry', 'Viking Software Systems']
  },
  {
    name: 'India',
    alpha2: 'IN',
    alpha3: 'IND',
    region: 'Asia',
    phonePrefix: '+91',
    capital: 'New Delhi',
    majorCities: ['Bengaluru, Karnataka', 'Hyderabad, Telangana', 'Mumbai, Maharashtra', 'Pune, Maharashtra', 'Delhi NCR', 'Chennai, Tamil Nadu'],
    universities: ['IIT Bombay', 'IIT Delhi', 'IIT Madras', 'BITS Pilani', 'IISc Bengaluru'],
    companies: ['Apex InfoTech Solutions', 'Paramount Digital Systems', 'Vertex Global Tech', 'Indus Wave Innovations']
  },
  {
    name: 'Indonesia',
    alpha2: 'ID',
    alpha3: 'IDN',
    region: 'Asia',
    phonePrefix: '+62',
    capital: 'Jakarta',
    majorCities: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Yogyakarta', 'Bali'],
    universities: ['University of Indonesia (UI)', 'Gadjah Mada University (UGM)', 'Institut Teknologi Bandung (ITB)'],
    companies: ['Nusantara Tech Ventures', 'Java Sea Software', 'Jakarta Cloud Foundry']
  },
  {
    name: 'Iran',
    alpha2: 'IR',
    alpha3: 'IRN',
    region: 'Asia',
    phonePrefix: '+98',
    capital: 'Tehran',
    majorCities: ['Tehran', 'Mashhad', 'Isfahan', 'Shiraz', 'Tabriz'],
    universities: ['Sharif University of Technology', 'University of Tehran', 'Amirkabir University of Technology'],
    companies: ['Persian Cloud Foundry', 'Tehran Tech Dynamics', 'Zagros Software Group']
  },
  {
    name: 'Iraq',
    alpha2: 'IQ',
    alpha3: 'IRQ',
    region: 'Asia',
    phonePrefix: '+964',
    capital: 'Baghdad',
    majorCities: ['Baghdad', 'Basra', 'Erbil', 'Mosul', 'Sulaymaniyah'],
    universities: ['University of Baghdad', 'Mustansiriyah University', 'University of Basrah'],
    companies: ['Mesopotamia Data Systems', 'Baghdad Tech Labs', 'Tigris Digital Hub']
  },
  {
    name: 'Ireland',
    alpha2: 'IE',
    alpha3: 'IRL',
    region: 'Europe',
    phonePrefix: '+353',
    capital: 'Dublin',
    majorCities: ['Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford'],
    universities: ['Trinity College Dublin (TCD)', 'University College Dublin (UCD)', 'University of Galway'],
    companies: ['Silicon Docks Dublin', 'Emerald Cloud Works', 'Celtic Tech Innovations']
  },
  {
    name: 'Israel',
    alpha2: 'IL',
    alpha3: 'ISR',
    region: 'Asia',
    phonePrefix: '+972',
    capital: 'Jerusalem',
    majorCities: ['Tel Aviv', 'Jerusalem', 'Haifa', 'Beer Sheva', 'Herzliya'],
    universities: ['Technion - Israel Institute of Technology', 'Hebrew University of Jerusalem', 'Tel Aviv University'],
    companies: ['Silicon Wadi Tech Labs', 'Tel Aviv Cloud Works', 'Galilee Software Systems']
  },
  {
    name: 'Italy',
    alpha2: 'IT',
    alpha3: 'ITA',
    region: 'Europe',
    phonePrefix: '+39',
    capital: 'Rome',
    majorCities: ['Milan', 'Rome', 'Turin', 'Bologna', 'Florence', 'Naples'],
    universities: ['Politecnico di Milano', 'Sapienza University of Rome', 'University of Bologna'],
    companies: ['Lombardia Tech Works', 'Roma Digital Foundry', 'Adriatic Software Systems']
  },

  // J
  {
    name: 'Jamaica',
    alpha2: 'JM',
    alpha3: 'JAM',
    region: 'North America',
    phonePrefix: '+1-876',
    capital: 'Kingston',
    majorCities: ['Kingston', 'Montego Bay', 'Spanish Town', 'Portmore'],
    universities: ['University of the West Indies at Mona', 'University of Technology, Jamaica'],
    companies: ['Blue Mountain Tech', 'Kingston Digital Foundry', 'Caribbean Pulse Systems']
  },
  {
    name: 'Japan',
    alpha2: 'JP',
    alpha3: 'JPN',
    region: 'Asia',
    phonePrefix: '+81',
    capital: 'Tokyo',
    majorCities: ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama', 'Fukuoka', 'Nagoya'],
    universities: ['University of Tokyo', 'Kyoto University', 'Tokyo Institute of Technology', 'Waseda University'],
    companies: ['Sunrise Digital Systems', 'Nippon Tech Dynamics', 'Fuji Horizon Corp', 'Sakura Enterprise Solutions']
  },
  {
    name: 'Jordan',
    alpha2: 'JO',
    alpha3: 'JOR',
    region: 'Asia',
    phonePrefix: '+962',
    capital: 'Amman',
    majorCities: ['Amman', 'Zarqa', 'Irbid', 'Aqaba'],
    universities: ['University of Jordan', 'Jordan University of Science and Technology (JUST)'],
    companies: ['Petra Tech Foundry', 'Amman Silicon Valley', 'Jordanian Cloud Systems']
  },

  // K
  {
    name: 'Kazakhstan',
    alpha2: 'KZ',
    alpha3: 'KAZ',
    region: 'Asia',
    phonePrefix: '+7',
    capital: 'Astana',
    majorCities: ['Almaty', 'Astana', 'Shymkent', 'Karaganda'],
    universities: ['Nazarbayev University', 'Al-Farabi Kazakh National University'],
    companies: ['Steppe Tech Foundry', 'Almaty Digital Labs', 'Astana Hub Innovations']
  },
  {
    name: 'Kenya',
    alpha2: 'KE',
    alpha3: 'KEN',
    region: 'Africa',
    phonePrefix: '+254',
    capital: 'Nairobi',
    majorCities: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'],
    universities: ['University of Nairobi', 'Strathmore University', 'Kenyatta University'],
    companies: ['Silicon Savannah Tech', 'Nairobi Cloud Works', 'Rift Valley Digital Labs']
  },
  {
    name: 'Kiribati',
    alpha2: 'KI',
    alpha3: 'KIR',
    region: 'Oceania',
    phonePrefix: '+686',
    capital: 'South Tarawa',
    majorCities: ['South Tarawa', 'Betio', 'Bikenibeu'],
    universities: ['University of the South Pacific Kiribati Campus'],
    companies: ['Equator Atoll Digital', 'Tarawa Tech Solutions', 'Pacific Link Systems']
  },
  {
    name: 'Kuwait',
    alpha2: 'KW',
    alpha3: 'KWT',
    region: 'Asia',
    phonePrefix: '+965',
    capital: 'Kuwait City',
    majorCities: ['Kuwait City', 'Hawalli', 'Salmiya', 'Al Ahmadi'],
    universities: ['Kuwait University', 'American University of Kuwait'],
    companies: ['Gulf Crest Tech', 'Kuwait City Cloud Works', 'Failaka Digital Labs']
  },
  {
    name: 'Kyrgyzstan',
    alpha2: 'KG',
    alpha3: 'KGZ',
    region: 'Asia',
    phonePrefix: '+996',
    capital: 'Bishkek',
    majorCities: ['Bishkek', 'Osh', 'Jalal-Abad'],
    universities: ['American University of Central Asia', 'Kyrgyz National University'],
    companies: ['Tian Shan Tech Labs', 'Bishkek Silicon Foundry', 'Ala-Too Digital']
  },

  // L
  {
    name: 'Laos',
    alpha2: 'LA',
    alpha3: 'LAO',
    region: 'Asia',
    phonePrefix: '+856',
    capital: 'Vientiane',
    majorCities: ['Vientiane', 'Luang Prabang', 'Pakse', 'Savannakhet'],
    universities: ['National University of Laos'],
    companies: ['Mekong River Tech', 'Vientiane Digital Hub', 'Lan Xang Cloud Systems']
  },
  {
    name: 'Latvia',
    alpha2: 'LV',
    alpha3: 'LVA',
    region: 'Europe',
    phonePrefix: '+371',
    capital: 'Riga',
    majorCities: ['Riga', 'Daugavpils', 'Liepāja', 'Jelgava'],
    universities: ['University of Latvia', 'Riga Technical University (RTU)'],
    companies: ['Baltic Sea Software', 'Riga Tech Foundry', 'Daugava Cloud Works']
  },
  {
    name: 'Lebanon',
    alpha2: 'LB',
    alpha3: 'LBN',
    region: 'Asia',
    phonePrefix: '+961',
    capital: 'Beirut',
    majorCities: ['Beirut', 'Tripoli', 'Sidon', 'Jounieh'],
    universities: ['American University of Beirut (AUB)', 'Saint Joseph University (USJ)', 'LAU'],
    companies: ['Cedar Valley Tech', 'Beirut Digital District Labs', 'Phoenicia Software Systems']
  },
  {
    name: 'Lesotho',
    alpha2: 'LS',
    alpha3: 'LSO',
    region: 'Africa',
    phonePrefix: '+266',
    capital: 'Maseru',
    majorCities: ['Maseru', 'Teyateyaneng', 'Mafeteng'],
    universities: ['National University of Lesotho'],
    companies: ['Maloti Tech Solutions', 'Maseru Digital Hub', 'Mountain Kingdom Systems']
  },
  {
    name: 'Liberia',
    alpha2: 'LR',
    alpha3: 'LBR',
    region: 'Africa',
    phonePrefix: '+231',
    capital: 'Monrovia',
    majorCities: ['Monrovia', 'Gbarnga', 'Buchanan'],
    universities: ['University of Liberia', 'Cuttington University'],
    companies: ['Atlantic Coast Tech', 'Monrovia Cloud Works', 'Liberian Digital Hub']
  },
  {
    name: 'Libya',
    alpha2: 'LY',
    alpha3: 'LBY',
    region: 'Africa',
    phonePrefix: '+218',
    capital: 'Tripoli',
    majorCities: ['Tripoli', 'Benghazi', 'Misrata', 'Bayda'],
    universities: ['University of Tripoli', 'University of Benghazi'],
    companies: ['Tripoli Cloud Tech', 'Mediterranean Data Hub', 'Cyrenaica Digital Systems']
  },
  {
    name: 'Liechtenstein',
    alpha2: 'LI',
    alpha3: 'LIE',
    region: 'Europe',
    phonePrefix: '+423',
    capital: 'Vaduz',
    majorCities: ['Vaduz', 'Schaan', 'Balzers'],
    universities: ['University of Liechtenstein'],
    companies: ['Rhine Valley FinTech', 'Vaduz Digital Assets', 'Alpine Cloud Works']
  },
  {
    name: 'Lithuania',
    alpha2: 'LT',
    alpha3: 'LTU',
    region: 'Europe',
    phonePrefix: '+370',
    capital: 'Vilnius',
    majorCities: ['Vilnius', 'Kaunas', 'Klaipėda', 'Šiauliai'],
    universities: ['Vilnius University', 'Vilnius Tech (VGTU)', 'Kaunas University of Technology (KTU)'],
    companies: ['Baltic FinTech Foundry', 'Vilnius Tech Valley', 'Gediminas Cloud Labs']
  },
  {
    name: 'Luxembourg',
    alpha2: 'LU',
    alpha3: 'LUX',
    region: 'Europe',
    phonePrefix: '+352',
    capital: 'Luxembourg City',
    majorCities: ['Luxembourg City', 'Esch-sur-Alzette', 'Differdange'],
    universities: ['University of Luxembourg'],
    companies: ['Grand Duchy FinTech', 'Luxembourg Cloud Works', 'Alzette Tech Systems']
  },

  // M
  {
    name: 'Madagascar',
    alpha2: 'MG',
    alpha3: 'MDG',
    region: 'Africa',
    phonePrefix: '+261',
    capital: 'Antananarivo',
    majorCities: ['Antananarivo', 'Toamasina', 'Antsirabe', 'Mahajanga'],
    universities: ['University of Antananarivo'],
    companies: ['Indian Ocean Tech', 'Tana Digital Foundry', 'Malagasy Cloud Works']
  },
  {
    name: 'Malawi',
    alpha2: 'MW',
    alpha3: 'MWI',
    region: 'Africa',
    phonePrefix: '+265',
    capital: 'Lilongwe',
    majorCities: ['Lilongwe', 'Blantyre', 'Mzuzu', 'Zomba'],
    universities: ['University of Malawi', 'MUST (Malawi University of Science and Technology)'],
    companies: ['Lake Malawi Tech', 'Lilongwe Digital Systems', 'Warm Heart Cloud Labs']
  },
  {
    name: 'Malaysia',
    alpha2: 'MY',
    alpha3: 'MYS',
    region: 'Asia',
    phonePrefix: '+60',
    capital: 'Kuala Lumpur',
    majorCities: ['Kuala Lumpur', 'George Town (Penang)', 'Johor Bahru', 'Petaling Jaya', 'Cyberjaya'],
    universities: ['Universiti Malaya (UM)', 'Universiti Teknologi Malaysia (UTM)', 'Universiti Putra Malaysia (UPM)'],
    companies: ['Cyberjaya Digital Labs', 'Petronas Tech Foundry', 'Penang Silicon Wave']
  },
  {
    name: 'Maldives',
    alpha2: 'MV',
    alpha3: 'MDV',
    region: 'Asia',
    phonePrefix: '+960',
    capital: 'Malé',
    majorCities: ['Malé', 'Addu City', 'Fuvahmulah'],
    universities: ['Maldives National University'],
    companies: ['Coral Atoll Digital', 'Malé Tech Innovations', 'Island Wave Cloud Systems']
  },
  {
    name: 'Mali',
    alpha2: 'ML',
    alpha3: 'MLI',
    region: 'Africa',
    phonePrefix: '+223',
    capital: 'Bamako',
    majorCities: ['Bamako', 'Sikasso', 'Mopti', 'Ségou'],
    universities: ['University of Bamako'],
    companies: ['Sahelian Cloud Works', 'Bamako Tech Foundry', 'Niger Valley Digital']
  },
  {
    name: 'Malta',
    alpha2: 'MT',
    alpha3: 'MLT',
    region: 'Europe',
    phonePrefix: '+356',
    capital: 'Valletta',
    majorCities: ['Valletta', 'Birkirkara', 'Sliema', 'Mosta'],
    universities: ['University of Malta'],
    companies: ['Mediterranean Silicon Works', 'Valletta FinTech Foundry', 'Maltese Cloud Labs']
  },
  {
    name: 'Marshall Islands',
    alpha2: 'MH',
    alpha3: 'MHL',
    region: 'Oceania',
    phonePrefix: '+692',
    capital: 'Majuro',
    majorCities: ['Majuro', 'Ebeye'],
    universities: ['College of the Marshall Islands'],
    companies: ['Micronesia Digital Wave', 'Majuro Tech Works', 'Pacific Atoll Cloud']
  },
  {
    name: 'Mauritania',
    alpha2: 'MR',
    alpha3: 'MRT',
    region: 'Africa',
    phonePrefix: '+222',
    capital: 'Nouakchott',
    majorCities: ['Nouakchott', 'Nouadhibou', 'Kiffa'],
    universities: ['University of Nouakchott Al Aasriya'],
    companies: ['Sahara Tech Hub', 'Nouakchott Cloud Systems', 'Mauritanian Digital Works']
  },
  {
    name: 'Mauritius',
    alpha2: 'MU',
    alpha3: 'MUS',
    region: 'Africa',
    phonePrefix: '+230',
    capital: 'Port Louis',
    majorCities: ['Port Louis', 'Beau Bassin-Rose Hill', 'Vacoas-Phoenix', 'Curepipe', 'Ebène'],
    universities: ['University of Mauritius'],
    companies: ['Ebène Cybercity Labs', 'Port Louis Tech Foundry', 'Indian Ocean Software']
  },
  {
    name: 'Mexico',
    alpha2: 'MX',
    alpha3: 'MEX',
    region: 'North America',
    phonePrefix: '+52',
    capital: 'Mexico City',
    majorCities: ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Querétaro'],
    universities: ['UNAM', 'Tecnológico de Monterrey (ITESM)', 'Instituto Politécnico Nacional (IPN)'],
    companies: ['Silicon Valley of Mexico (GDL)', 'Azteca Cloud Works', 'Monterrey Tech Foundry']
  },
  {
    name: 'Micronesia',
    alpha2: 'FM',
    alpha3: 'FSM',
    region: 'Oceania',
    phonePrefix: '+691',
    capital: 'Palikir',
    majorCities: ['Palikir', 'Weno', 'Kolonia'],
    universities: ['College of Micronesia-FSM'],
    companies: ['Pacific Island Cloud', 'Micronesia Data Connect', 'Palikir Digital Labs']
  },
  {
    name: 'Moldova',
    alpha2: 'MD',
    alpha3: 'MDA',
    region: 'Europe',
    phonePrefix: '+373',
    capital: 'Chișinău',
    majorCities: ['Chișinău', 'Bălți', 'Tiraspol'],
    universities: ['Moldova State University', 'Technical University of Moldova (UTM)'],
    companies: ['Chișinău Tech Park', 'Bessarabia Digital Labs', 'Moldova Cloud Foundry']
  },
  {
    name: 'Monaco',
    alpha2: 'MC',
    alpha3: 'MCO',
    region: 'Europe',
    phonePrefix: '+377',
    capital: 'Monaco',
    majorCities: ['Monaco-Ville', 'Monte Carlo', 'La Condamine', 'Fontvieille'],
    universities: ['International University of Monaco'],
    companies: ['Riviera Digital Assets', 'Monte Carlo Tech Works', 'Monaco Cloud Systems']
  },
  {
    name: 'Mongolia',
    alpha2: 'MN',
    alpha3: 'MNG',
    region: 'Asia',
    phonePrefix: '+976',
    capital: 'Ulaanbaatar',
    majorCities: ['Ulaanbaatar', 'Erdenet', 'Darkhan'],
    universities: ['National University of Mongolia', 'Mongolian University of Science and Technology'],
    companies: ['Steppe Digital Systems', 'Ulaanbaatar Tech Foundry', 'Nomadic Cloud Labs']
  },
  {
    name: 'Montenegro',
    alpha2: 'ME',
    alpha3: 'MNE',
    region: 'Europe',
    phonePrefix: '+382',
    capital: 'Podgorica',
    majorCities: ['Podgorica', 'Nikšić', 'Herceg Novi', 'Budva'],
    universities: ['University of Montenegro'],
    companies: ['Adriatic Tech Foundry', 'Podgorica Cloud Labs', 'Montenegro Digital Hub']
  },
  {
    name: 'Morocco',
    alpha2: 'MA',
    alpha3: 'MAR',
    region: 'Africa',
    phonePrefix: '+212',
    capital: 'Rabat',
    majorCities: ['Casablanca', 'Rabat', 'Marrakech', 'Tangier', 'Fes'],
    universities: ['Mohammed V University', 'Al Akhawayn University', 'Hassan II University'],
    companies: ['Casablanca Nearshore Tech', 'Atlas Digital Foundry', 'Maghreb Cloud Systems']
  },
  {
    name: 'Mozambique',
    alpha2: 'MZ',
    alpha3: 'MOZ',
    region: 'Africa',
    phonePrefix: '+258',
    capital: 'Maputo',
    majorCities: ['Maputo', 'Matola', 'Beira', 'Nampula'],
    universities: ['Eduardo Mondlane University'],
    companies: ['Maputo Tech Hub', 'Mozambique Channel Digital', 'Zambezi Cloud Labs']
  },
  {
    name: 'Myanmar',
    alpha2: 'MM',
    alpha3: 'MMR',
    region: 'Asia',
    phonePrefix: '+95',
    capital: 'Naypyidaw',
    majorCities: ['Yangon', 'Mandalay', 'Naypyidaw'],
    universities: ['University of Yangon', 'Yangon Technological University'],
    companies: ['Irrawaddy Tech Works', 'Yangon Digital Foundry', 'Golden Land Software']
  },

  // N
  {
    name: 'Namibia',
    alpha2: 'NA',
    alpha3: 'NAM',
    region: 'Africa',
    phonePrefix: '+264',
    capital: 'Windhoek',
    majorCities: ['Windhoek', 'Walvis Bay', 'Swakopmund'],
    universities: ['University of Namibia (UNAM)', 'Namibia University of Science and Technology (NUST)'],
    companies: ['Namib Digital Foundry', 'Windhoek Cloud Works', 'Kalahari Software Solutions']
  },
  {
    name: 'Nauru',
    alpha2: 'NR',
    alpha3: 'NRU',
    region: 'Oceania',
    phonePrefix: '+674',
    capital: 'Yaren',
    majorCities: ['Yaren', 'Denigomodu', 'Meneng'],
    universities: ['University of the South Pacific Nauru Campus'],
    companies: ['Pacific Crest Digital', 'Nauru Cloud Connect', 'Micronesia Sea Tech']
  },
  {
    name: 'Nepal',
    alpha2: 'NP',
    alpha3: 'NPL',
    region: 'Asia',
    phonePrefix: '+977',
    capital: 'Kathmandu',
    majorCities: ['Kathmandu', 'Pokhara', 'Lalitpur', 'Biratnagar'],
    universities: ['Tribhuvan University', 'Kathmandu University'],
    companies: ['Himalayan Silicon Works', 'Kathmandu Tech Hub', 'Everest Cloud Labs']
  },
  {
    name: 'Netherlands',
    alpha2: 'NL',
    alpha3: 'NLD',
    region: 'Europe',
    phonePrefix: '+31',
    capital: 'Amsterdam',
    majorCities: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven'],
    universities: ['Delft University of Technology (TU Delft)', 'University of Amsterdam', 'Utrecht University'],
    companies: ['Oranje Dynamics BV', 'Amstel Digital Labs', 'Randstad Horizon Tech', 'Zuiderzee Solutions']
  },
  {
    name: 'New Zealand',
    alpha2: 'NZ',
    alpha3: 'NZL',
    region: 'Oceania',
    phonePrefix: '+64',
    capital: 'Wellington',
    majorCities: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton'],
    universities: ['University of Auckland', 'University of Otago', 'Victoria University of Wellington'],
    companies: ['Aotearoa Digital Systems', 'Kiwi Cloud Works', 'Southern Alps Software']
  },
  {
    name: 'Nicaragua',
    alpha2: 'NI',
    alpha3: 'NIC',
    region: 'North America',
    phonePrefix: '+505',
    capital: 'Managua',
    majorCities: ['Managua', 'León', 'Granada', 'Matagalpa'],
    universities: ['Universidad Nacional Autónoma de Nicaragua (UNAN)', 'Universidad Centroamericana (UCA)'],
    companies: ['Lake Nicaragua Tech', 'Managua Digital Hub', 'Pacifico Software Labs']
  },
  {
    name: 'Niger',
    alpha2: 'NE',
    alpha3: 'NER',
    region: 'Africa',
    phonePrefix: '+227',
    capital: 'Niamey',
    majorCities: ['Niamey', 'Zinder', 'Maradi', 'Tahoua'],
    universities: ['Abdou Moumouni University'],
    companies: ['Sahel Digital Foundry', 'Niamey Tech Works', 'Niger River Cloud Hub']
  },
  {
    name: 'Nigeria',
    alpha2: 'NG',
    alpha3: 'NGA',
    region: 'Africa',
    phonePrefix: '+234',
    capital: 'Abuja',
    majorCities: ['Lagos', 'Abuja', 'Ibadan', 'Port Harcourt', 'Kano', 'Enugu'],
    universities: ['University of Lagos', 'University of Ibadan', 'Covenant University', 'Obafemi Awolowo University'],
    companies: ['Yaba Silicon Valley Labs', 'Lagos FinTech Foundry', 'Eko Cloud Works', 'Naija Digital Systems']
  },
  {
    name: 'North Korea',
    alpha2: 'KP',
    alpha3: 'PRK',
    region: 'Asia',
    phonePrefix: '+850',
    capital: 'Pyongyang',
    majorCities: ['Pyongyang', 'Hamhung', 'Chongjin', 'Nampo'],
    universities: ['Kim Il-sung University', 'Kim Chaek University of Technology'],
    companies: ['Taedonggang Tech Labs', 'Pyongyang Software Works', 'Koryo Data Systems']
  },
  {
    name: 'North Macedonia',
    alpha2: 'MK',
    alpha3: 'MKD',
    region: 'Europe',
    phonePrefix: '+389',
    capital: 'Skopje',
    majorCities: ['Skopje', 'Bitola', 'Kumanovo', 'Ohrid'],
    universities: ['Ss. Cyril and Methodius University in Skopje'],
    companies: ['Vardar Silicon Labs', 'Skopje Tech Foundry', 'Macedonian Cloud Works']
  },
  {
    name: 'Norway',
    alpha2: 'NO',
    alpha3: 'NOR',
    region: 'Europe',
    phonePrefix: '+47',
    capital: 'Oslo',
    majorCities: ['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Tromsø'],
    universities: ['University of Oslo', 'NTNU Trondheim', 'University of Bergen'],
    companies: ['Fjord Digital Works', 'Oslo Silicon Foundry', 'Nordic Horizon Cloud']
  },

  // O
  {
    name: 'Oman',
    alpha2: 'OM',
    alpha3: 'OMN',
    region: 'Asia',
    phonePrefix: '+968',
    capital: 'Muscat',
    majorCities: ['Muscat', 'Salalah', 'Sohar', 'Nizwa'],
    universities: ['Sultan Qaboos University'],
    companies: ['Muscat Tech Hub', 'Arabian Sea Digital', 'Oman Cloud Foundry']
  },

  // P
  {
    name: 'Pakistan',
    alpha2: 'PK',
    alpha3: 'PAK',
    region: 'Asia',
    phonePrefix: '+92',
    capital: 'Islamabad',
    majorCities: ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad'],
    universities: ['NUST Islamabad', 'LUMS Lahore', 'FAST-NUCES', 'UET Lahore'],
    companies: ['Indus Valley Tech Labs', 'Lahore Software Works', 'Karachi FinTech Hub']
  },
  {
    name: 'Palau',
    alpha2: 'PW',
    alpha3: 'PLW',
    region: 'Oceania',
    phonePrefix: '+680',
    capital: 'Ngerulmud',
    majorCities: ['Koror', 'Ngerulmud'],
    universities: ['Palau Community College'],
    companies: ['Micronesia Coral Tech', 'Palau Digital Labs', 'Pacific Island Cloud Systems']
  },
  {
    name: 'Palestine',
    alpha2: 'PS',
    alpha3: 'PSE',
    region: 'Asia',
    phonePrefix: '+970',
    capital: 'Jerusalem',
    majorCities: ['Ramallah', 'Gaza', 'Hebron', 'Nablus', 'Bethlehem'],
    universities: ['Birzeit University', 'An-Najah National University'],
    companies: ['Ramallah Tech Foundry', 'Palestine Digital Hub', 'Canaan Cloud Works']
  },
  {
    name: 'Panama',
    alpha2: 'PA',
    alpha3: 'PAN',
    region: 'North America',
    phonePrefix: '+507',
    capital: 'Panama City',
    majorCities: ['Panama City', 'San Miguelito', 'David', 'Colón'],
    universities: ['Universidad de Panamá', 'Universidad Tecnológica de Panamá (UTP)'],
    companies: ['Canal Zone Tech', 'Panama City FinTech', 'Isthmus Digital Works']
  },
  {
    name: 'Papua New Guinea',
    alpha2: 'PG',
    alpha3: 'PNG',
    region: 'Oceania',
    phonePrefix: '+675',
    capital: 'Port Moresby',
    majorCities: ['Port Moresby', 'Lae', 'Mount Hagen'],
    universities: ['University of Papua New Guinea', 'PNG University of Technology'],
    companies: ['Coral Sea Digital', 'Port Moresby Tech Works', 'Papua Cloud Systems']
  },
  {
    name: 'Paraguay',
    alpha2: 'PY',
    alpha3: 'PRY',
    region: 'South America',
    phonePrefix: '+595',
    capital: 'Asunción',
    majorCities: ['Asunción', 'Ciudad del Este', 'San Lorenzo', 'Luque'],
    universities: ['Universidad Nacional de Asunción (UNA)', 'Universidad Católica'],
    companies: ['Guaraní Tech Labs', 'Asunción Digital Foundry', 'Paraná Software Systems']
  },
  {
    name: 'Peru',
    alpha2: 'PE',
    alpha3: 'PER',
    region: 'South America',
    phonePrefix: '+51',
    capital: 'Lima',
    majorCities: ['Lima', 'Arequipa', 'Trujillo', 'Cusco', 'Chiclayo'],
    universities: ['Pontificia Universidad Católica del Perú (PUCP)', 'Universidad Nacional Mayor de San Marcos', 'UTEC'],
    companies: ['Andean Silicon Works', 'Lima Digital Foundry', 'Inca Cloud Tech']
  },
  {
    name: 'Philippines',
    alpha2: 'PH',
    alpha3: 'PHL',
    region: 'Asia',
    phonePrefix: '+63',
    capital: 'Manila',
    majorCities: ['Manila', 'Quezon City', 'Cebu City', 'Davao City', 'Makati City', 'Taguig (BGC)'],
    universities: ['University of the Philippines (UP)', 'Ateneo de Manila University', 'De La Salle University (DLSU)'],
    companies: ['BGC Silicon Works', 'Manila Cloud Foundry', 'Luzon Digital Systems', 'Cebu IT Park Labs']
  },
  {
    name: 'Poland',
    alpha2: 'PL',
    alpha3: 'POL',
    region: 'Europe',
    phonePrefix: '+48',
    capital: 'Warsaw',
    majorCities: ['Warsaw', 'Kraków', 'Wrocław', 'Gdańsk', 'Poznań'],
    universities: ['University of Warsaw', 'Warsaw University of Technology', 'Jagiellonian University'],
    companies: ['Vistula Silicon Labs', 'Warsaw Cloud Foundry', 'Krakow Tech Works', 'Silesian Software']
  },
  {
    name: 'Portugal',
    alpha2: 'PT',
    alpha3: 'PRT',
    region: 'Europe',
    phonePrefix: '+351',
    capital: 'Lisbon',
    majorCities: ['Lisbon', 'Porto', 'Braga', 'Coimbra', 'Faro'],
    universities: ['University of Lisbon', 'University of Porto', 'Instituto Superior Técnico (IST)'],
    companies: ['Tagus Silicon Valley', 'Lisbon Cloud Foundry', 'Atlantic Wave Software']
  },

  // Q
  {
    name: 'Qatar',
    alpha2: 'QA',
    alpha3: 'QAT',
    region: 'Asia',
    phonePrefix: '+974',
    capital: 'Doha',
    majorCities: ['Doha', 'Al Rayyan', 'Al Wakrah', 'Lusail'],
    universities: ['Qatar University', 'Hamad Bin Khalifa University', 'Texas A&M at Qatar'],
    companies: ['Qatar Science & Technology Park Labs', 'Doha Digital Foundry', 'Arabian Pearl Cloud']
  },

  // R
  {
    name: 'Romania',
    alpha2: 'RO',
    alpha3: 'ROU',
    region: 'Europe',
    phonePrefix: '+40',
    capital: 'Bucharest',
    majorCities: ['Bucharest', 'Cluj-Napoca', 'Timișoara', 'Iași', 'Brașov'],
    universities: ['Polytechnic University of Bucharest', 'Babeș-Bolyai University', 'University of Bucharest'],
    companies: ['Transylvania Silicon Works', 'Bucharest Tech Foundry', 'Cluj Cloud Labs']
  },
  {
    name: 'Russia',
    alpha2: 'RU',
    alpha3: 'RUS',
    region: 'Europe',
    phonePrefix: '+7',
    capital: 'Moscow',
    majorCities: ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Kazan'],
    universities: ['Lomonosov Moscow State University', 'MIPT', 'Saint Petersburg State University'],
    companies: ['Volga Digital Systems', 'Moscow Cloud Labs', 'Ural Silicon Works']
  },
  {
    name: 'Rwanda',
    alpha2: 'RW',
    alpha3: 'RWA',
    region: 'Africa',
    phonePrefix: '+250',
    capital: 'Kigali',
    majorCities: ['Kigali', 'Butare', 'Gisenyi', 'Ruhengeri'],
    universities: ['University of Rwanda', 'Carnegie Mellon University Africa', 'African Leadership University'],
    companies: ['Kigali Innovation City', 'Rwanda Silicon Valley', 'Thousand Hills Cloud Labs']
  },

  // S
  {
    name: 'Saint Kitts and Nevis',
    alpha2: 'KN',
    alpha3: 'KNA',
    region: 'North America',
    phonePrefix: '+1-869',
    capital: 'Basseterre',
    majorCities: ['Basseterre', 'Charlestown'],
    universities: ['Clarence Fitzroy Bryant College'],
    companies: ['Sugar City Digital', 'Nevis Cloud Works', 'St. Kitts Tech Labs']
  },
  {
    name: 'Saint Lucia',
    alpha2: 'LC',
    alpha3: 'LCA',
    region: 'North America',
    phonePrefix: '+1-758',
    capital: 'Castries',
    majorCities: ['Castries', 'Vieux Fort', 'Gros Islet'],
    universities: ['Sir Arthur Lewis Community College'],
    companies: ['Pitons Tech Foundry', 'Castries Digital Labs', 'Helena Cloud Systems']
  },
  {
    name: 'Saint Vincent and the Grenadines',
    alpha2: 'VC',
    alpha3: 'VCT',
    region: 'North America',
    phonePrefix: '+1-784',
    capital: 'Kingstown',
    majorCities: ['Kingstown', 'Georgetown', 'Barrouallie'],
    universities: ['St. Vincent Community College'],
    companies: ['Vincy Cloud Tech', 'Kingstown Digital Works', 'Grenadines Sea Tech']
  },
  {
    name: 'Samoa',
    alpha2: 'WS',
    alpha3: 'WSM',
    region: 'Oceania',
    phonePrefix: '+685',
    capital: 'Apia',
    majorCities: ['Apia', 'Vaitele', 'Faleasiu'],
    universities: ['National University of Samoa'],
    companies: ['Polynesian Digital Wave', 'Apia Tech Hub', 'Samoan Cloud Works']
  },
  {
    name: 'San Marino',
    alpha2: 'SM',
    alpha3: 'SMR',
    region: 'Europe',
    phonePrefix: '+378',
    capital: 'City of San Marino',
    majorCities: ['City of San Marino', 'Serravalle', 'Borgo Maggiore'],
    universities: ['University of the Republic of San Marino'],
    companies: ['Titano Tech Works', 'San Marino Cloud Labs', 'Mount Titano Software']
  },
  {
    name: 'São Tomé and Príncipe',
    alpha2: 'ST',
    alpha3: 'STP',
    region: 'Africa',
    phonePrefix: '+239',
    capital: 'São Tomé',
    majorCities: ['São Tomé', 'Santo Amaro', 'Neves'],
    universities: ['University of São Tomé and Príncipe'],
    companies: ['Equator Island Digital', 'São Tomé Tech Works', 'Gulf of Guinea Cloud']
  },
  {
    name: 'Saudi Arabia',
    alpha2: 'SA',
    alpha3: 'SAU',
    region: 'Asia',
    phonePrefix: '+966',
    capital: 'Riyadh',
    majorCities: ['Riyadh', 'Jeddah', 'Dammam', 'Khobar', 'Medina'],
    universities: ['King Saud University', 'KAUST', 'King Fahd University of Petroleum and Minerals (KFUPM)'],
    companies: ['Neom Digital Foundry', 'Riyadh Silicon Valley', 'Arabian Peninsula Cloud', 'Hijaz Tech Labs']
  },
  {
    name: 'Senegal',
    alpha2: 'SN',
    alpha3: 'SEN',
    region: 'Africa',
    phonePrefix: '+221',
    capital: 'Dakar',
    majorCities: ['Dakar', 'Thiès', 'Kaolack', 'Saint-Louis', 'Touba'],
    universities: ['Cheikh Anta Diop University (UCAD)'],
    companies: ['Teranga Silicon Works', 'Dakar Digital Foundry', 'Senegal River Cloud']
  },
  {
    name: 'Serbia',
    alpha2: 'RS',
    alpha3: 'SRB',
    region: 'Europe',
    phonePrefix: '+381',
    capital: 'Belgrade',
    majorCities: ['Belgrade', 'Novi Sad', 'Niš', 'Kragujevac'],
    universities: ['University of Belgrade', 'University of Novi Sad', 'University of Niš'],
    companies: ['Belgrade Silicon Foundry', 'Danubian Software Works', 'Vojvodina Cloud Labs']
  },
  {
    name: 'Seychelles',
    alpha2: 'SC',
    alpha3: 'SYC',
    region: 'Africa',
    phonePrefix: '+248',
    capital: 'Victoria',
    majorCities: ['Victoria', 'Anse Etoile', 'Beau Vallon'],
    universities: ['University of Seychelles'],
    companies: ['Indian Ocean Wave Tech', 'Victoria Digital Hub', 'Seychelles Cloud Works']
  },
  {
    name: 'Sierra Leone',
    alpha2: 'SL',
    alpha3: 'SLE',
    region: 'Africa',
    phonePrefix: '+232',
    capital: 'Freetown',
    majorCities: ['Freetown', 'Kenema', 'Bo', 'Koidu'],
    universities: ['Fourah Bay College', 'Njala University'],
    companies: ['Lion Mountain Tech', 'Freetown Digital Foundry', 'Sierra Cloud Works']
  },
  {
    name: 'Singapore',
    alpha2: 'SG',
    alpha3: 'SGP',
    region: 'Asia',
    phonePrefix: '+65',
    capital: 'Singapore',
    majorCities: ['Singapore City', 'Marina Bay', 'Jurong', 'Changi'],
    universities: ['National University of Singapore (NUS)', 'Nanyang Technological University (NTU)', 'SMU'],
    companies: ['Marina Bay Global Tech', 'Lion City Innovations', 'Equatorial Digital Pte Ltd', 'Merlion Capital & Tech']
  },
  {
    name: 'Slovakia',
    alpha2: 'SK',
    alpha3: 'SVK',
    region: 'Europe',
    phonePrefix: '+421',
    capital: 'Bratislava',
    majorCities: ['Bratislava', 'Košice', 'Prešov', 'Žilina'],
    universities: ['Comenius University', 'Slovak University of Technology in Bratislava (STU)'],
    companies: ['Tatra Silicon Valley', 'Bratislava Tech Foundry', 'Carpathian Cloud Labs']
  },
  {
    name: 'Slovenia',
    alpha2: 'SI',
    alpha3: 'SVN',
    region: 'Europe',
    phonePrefix: '+386',
    capital: 'Ljubljana',
    majorCities: ['Ljubljana', 'Maribor', 'Kranj', 'Celje'],
    universities: ['University of Ljubljana', 'University of Maribor'],
    companies: ['Julian Alps Software', 'Ljubljana Digital Works', 'Slovene Cloud Foundry']
  },
  {
    name: 'Solomon Islands',
    alpha2: 'SB',
    alpha3: 'SLB',
    region: 'Oceania',
    phonePrefix: '+677',
    capital: 'Honiara',
    majorCities: ['Honiara', 'Gizo', 'Auki'],
    universities: ['Solomon Islands National University'],
    companies: ['Melanesian Digital Wave', 'Honiara Tech Works', 'Pacific Island Connect']
  },
  {
    name: 'Somalia',
    alpha2: 'SO',
    alpha3: 'SOM',
    region: 'Africa',
    phonePrefix: '+252',
    capital: 'Mogadishu',
    majorCities: ['Mogadishu', 'Hargeisa', 'Kismayo', 'Bosaso'],
    universities: ['Mogadishu University', 'SIMAD University'],
    companies: ['Horn of Africa Tech Labs', 'Mogadishu Digital Hub', 'Somali Cloud Systems']
  },
  {
    name: 'South Africa',
    alpha2: 'ZA',
    alpha3: 'ZAF',
    region: 'Africa',
    phonePrefix: '+27',
    capital: 'Pretoria',
    majorCities: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Gqeberha'],
    universities: ['University of Cape Town (UCT)', 'University of the Witwatersrand (Wits)', 'Stellenbosch University'],
    companies: ['Table Mountain Tech', 'Savannah Digital Group', 'Protea Solutions Ltd', 'Highveld Systems']
  },
  {
    name: 'South Korea',
    alpha2: 'KR',
    alpha3: 'KOR',
    region: 'Asia',
    phonePrefix: '+82',
    capital: 'Seoul',
    majorCities: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Pangyo'],
    universities: ['Seoul National University (SNU)', 'KAIST', 'POSTECH', 'Yonsei University', 'Korea University'],
    companies: ['Pangyo Techno Valley Labs', 'Han River Silicon Works', 'K-Tech Digital Systems']
  },
  {
    name: 'South Sudan',
    alpha2: 'SS',
    alpha3: 'SSD',
    region: 'Africa',
    phonePrefix: '+211',
    capital: 'Juba',
    majorCities: ['Juba', 'Wau', 'Malakal'],
    universities: ['University of Juba'],
    companies: ['Nile Basin Tech', 'Juba Digital Foundry', 'South Sudan Cloud Works']
  },
  {
    name: 'Spain',
    alpha2: 'ES',
    alpha3: 'ESP',
    region: 'Europe',
    phonePrefix: '+34',
    capital: 'Madrid',
    majorCities: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Bilbao', 'Málaga'],
    universities: ['Universidad Politécnica de Madrid', 'University of Barcelona', 'Universitat Politècnica de Catalunya (UPC)'],
    companies: ['Iberian Silicon Works', 'Madrid Cloud Foundry', 'Barcelona Digital Foundry', 'Málaga Valley Tech']
  },
  {
    name: 'Sri Lanka',
    alpha2: 'LK',
    alpha3: 'LKA',
    region: 'Asia',
    phonePrefix: '+94',
    capital: 'Sri Jayawardenepura Kotte',
    majorCities: ['Colombo', 'Kandy', 'Galle', 'Jaffna'],
    universities: ['University of Colombo', 'University of Moratuwa', 'University of Peradeniya'],
    companies: ['Ceylon Silicon Works', 'Colombo Tech Foundry', 'Lanka Cloud Labs']
  },
  {
    name: 'Sudan',
    alpha2: 'SD',
    alpha3: 'SDN',
    region: 'Africa',
    phonePrefix: '+249',
    capital: 'Khartoum',
    majorCities: ['Khartoum', 'Omdurman', 'Port Sudan'],
    universities: ['University of Khartoum', 'Sudan University of Science and Technology'],
    companies: ['Nile Confluence Tech', 'Khartoum Digital Hub', 'Nubian Cloud Works']
  },
  {
    name: 'Suriname',
    alpha2: 'SR',
    alpha3: 'SUR',
    region: 'South America',
    phonePrefix: '+597',
    capital: 'Paramaribo',
    majorCities: ['Paramaribo', 'Lelydorp', 'Nieuw Nickerie'],
    universities: ['Anton de Kom University of Suriname'],
    companies: ['Guiana Shield Tech', 'Paramaribo Digital Labs', 'Suriname Cloud Works']
  },
  {
    name: 'Sweden',
    alpha2: 'SE',
    alpha3: 'SWE',
    region: 'Europe',
    phonePrefix: '+46',
    capital: 'Stockholm',
    majorCities: ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala', 'Lund'],
    universities: ['KTH Royal Institute of Technology', 'Karolinska Institute', 'Lund University', 'Uppsala University'],
    companies: ['Stockholm Unicorn Foundry', 'Nordic Baltic Software', 'Gothenburg Tech Labs']
  },
  {
    name: 'Switzerland',
    alpha2: 'CH',
    alpha3: 'CHE',
    region: 'Europe',
    phonePrefix: '+41',
    capital: 'Bern',
    majorCities: ['Zurich', 'Geneva', 'Basel', 'Lausanne', 'Bern'],
    universities: ['ETH Zurich', 'EPFL Lausanne', 'University of Zurich', 'University of Geneva'],
    companies: ['Alpine Silicon Valley', 'Zurich Cloud Foundry', 'Helvetia Precision Tech']
  },
  {
    name: 'Syria',
    alpha2: 'SY',
    alpha3: 'SYR',
    region: 'Asia',
    phonePrefix: '+963',
    capital: 'Damascus',
    majorCities: ['Damascus', 'Aleppo', 'Homs', 'Latakia'],
    universities: ['Damascus University', 'University of Aleppo'],
    companies: ['Levant Data Systems', 'Damascus Digital Hub', 'Barada Tech Works']
  },

  // T
  {
    name: 'Taiwan',
    alpha2: 'TW',
    alpha3: 'TWN',
    region: 'Asia',
    phonePrefix: '+886',
    capital: 'Taipei',
    majorCities: ['Taipei', 'Hsinchu', 'Kaohsiung', 'Taichung', 'Tainan'],
    universities: ['National Taiwan University (NTU)', 'National Tsing Hua University', 'National Yang Ming Chiao Tung University'],
    companies: ['Hsinchu Science Park Labs', 'Formosa Silicon Works', 'Taipei Cloud Foundry']
  },
  {
    name: 'Tajikistan',
    alpha2: 'TJ',
    alpha3: 'TJK',
    region: 'Asia',
    phonePrefix: '+992',
    capital: 'Dushanbe',
    majorCities: ['Dushanbe', 'Khujand', 'Bokhtar'],
    universities: ['Tajik National University'],
    companies: ['Pamir Tech Works', 'Dushanbe Silicon Labs', 'Sogdiana Cloud Systems']
  },
  {
    name: 'Tanzania',
    alpha2: 'TZ',
    alpha3: 'TZA',
    region: 'Africa',
    phonePrefix: '+255',
    capital: 'Dodoma',
    majorCities: ['Dar es Salaam', 'Dodoma', 'Mwanza', 'Arusha', 'Zanzibar City'],
    universities: ['University of Dar es Salaam', 'Sokoine University of Agriculture'],
    companies: ['Bongo Silicon Works', 'Kilimanjaro Cloud Labs', 'Swahili Tech Hub']
  },
  {
    name: 'Thailand',
    alpha2: 'TH',
    alpha3: 'THA',
    region: 'Asia',
    phonePrefix: '+66',
    capital: 'Bangkok',
    majorCities: ['Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya', 'Nonthaburi'],
    universities: ['Chulalongkorn University', 'Mahidol University', 'Kasetsart University'],
    companies: ['Siam Digital Foundry', 'Bangkok Silicon Works', 'Chao Phraya Cloud Labs']
  },
  {
    name: 'Timor-Leste',
    alpha2: 'TL',
    alpha3: 'TLS',
    region: 'Asia',
    phonePrefix: '+670',
    capital: 'Dili',
    majorCities: ['Dili', 'Baucau', 'Maliana'],
    universities: ['National University of East Timor (UNTL)'],
    companies: ['Timor Sea Tech', 'Dili Digital Foundry', 'Sunrise Cloud Systems']
  },
  {
    name: 'Togo',
    alpha2: 'TG',
    alpha3: 'TGO',
    region: 'Africa',
    phonePrefix: '+228',
    capital: 'Lomé',
    majorCities: ['Lomé', 'Sokodé', 'Kara'],
    universities: ['University of Lomé', 'University of Kara'],
    companies: ['Gulf of Guinea Tech', 'Lomé Digital Hub', 'Togolese Cloud Labs']
  },
  {
    name: 'Tonga',
    alpha2: 'TO',
    alpha3: 'TON',
    region: 'Oceania',
    phonePrefix: '+676',
    capital: "Nuku'alofa",
    majorCities: ["Nuku'alofa", 'Neiafu', 'Haveluloto'],
    universities: ['University of the South Pacific Tonga Campus'],
    companies: ['Friendly Islands Tech', "Nuku'alofa Digital Works", 'Polynesian Cloud Hub']
  },
  {
    name: 'Trinidad and Tobago',
    alpha2: 'TT',
    alpha3: 'TTO',
    region: 'North America',
    phonePrefix: '+1-868',
    capital: 'Port of Spain',
    majorCities: ['Port of Spain', 'San Fernando', 'Chaguanas', 'Arima'],
    universities: ['University of the West Indies at St. Augustine', 'UTT'],
    companies: ['Caribbean Silicon Foundry', 'Port of Spain Cloud Works', 'Trinidad Digital Systems']
  },
  {
    name: 'Tunisia',
    alpha2: 'TN',
    alpha3: 'TUN',
    region: 'Africa',
    phonePrefix: '+216',
    capital: 'Tunis',
    majorCities: ['Tunis', 'Sfax', 'Sousse', 'Kairouan'],
    universities: ['Tunis El Manar University', 'University of Carthage', 'University of Sfax'],
    companies: ['Carthage Silicon Foundry', 'Tunis Tech Valley', 'Maghreb Data Systems']
  },
  {
    name: 'Türkiye',
    alpha2: 'TR',
    alpha3: 'TUR',
    region: 'Asia',
    phonePrefix: '+90',
    capital: 'Ankara',
    majorCities: ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya'],
    universities: ['Middle East Technical University (METU)', 'Boğaziçi University', 'Istanbul Technical University (İTÜ)', 'Bilkent University'],
    companies: ['Bosphorus Silicon Works', 'Istanbul Tech Foundry', 'Anatolian Cloud Labs']
  },
  {
    name: 'Turkmenistan',
    alpha2: 'TM',
    alpha3: 'TKM',
    region: 'Asia',
    phonePrefix: '+993',
    capital: 'Ashgabat',
    majorCities: ['Ashgabat', 'Türkmenabat', 'Daşoguz', 'Mary'],
    universities: ['Magtymguly Turkmen State University'],
    companies: ['Karakum Digital Systems', 'Ashgabat Tech Hub', 'Caspian Crest Cloud']
  },
  {
    name: 'Tuvalu',
    alpha2: 'TV',
    alpha3: 'TUV',
    region: 'Oceania',
    phonePrefix: '+688',
    capital: 'Funafuti',
    majorCities: ['Funafuti', 'Alapi', 'Fakaifou'],
    universities: ['University of the South Pacific Tuvalu Campus'],
    companies: ['DotTV Digital Labs', 'Funafuti Tech Works', 'Pacific Horizon Systems']
  },

  // U
  {
    name: 'Uganda',
    alpha2: 'UG',
    alpha3: 'UGA',
    region: 'Africa',
    phonePrefix: '+256',
    capital: 'Kampala',
    majorCities: ['Kampala', 'Nansana', 'Kira', 'Mbarara', 'Gulu'],
    universities: ['Makerere University', 'Uganda Martyrs University'],
    companies: ['Pearl of Africa Silicon', 'Kampala Digital Foundry', 'Victoria Cloud Labs']
  },
  {
    name: 'Ukraine',
    alpha2: 'UA',
    alpha3: 'UKR',
    region: 'Europe',
    phonePrefix: '+380',
    capital: 'Kyiv',
    majorCities: ['Kyiv', 'Kharkiv', 'Dnipro', 'Odesa', 'Lviv'],
    universities: ['Taras Shevchenko National University of Kyiv', 'Kyiv Polytechnic Institute (KPI)', 'Lviv Polytechnic'],
    companies: ['Dnieper Silicon Valley', 'Kyiv Tech Foundry', 'Lviv Cloud Works', 'Carpathian Software']
  },
  {
    name: 'United Arab Emirates',
    alpha2: 'AE',
    alpha3: 'ARE',
    region: 'Asia',
    phonePrefix: '+971',
    capital: 'Abu Dhabi',
    majorCities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah'],
    universities: ['United Arab Emirates University', 'American University of Sharjah', 'Khalifa University', 'NYU Abu Dhabi'],
    companies: ['Emirates Apex Global', 'Gulf Horizon Ventures', 'Burj Digital Solutions', 'Falcon Tech Capital']
  },
  {
    name: 'United Kingdom',
    alpha2: 'GB',
    alpha3: 'GBR',
    region: 'Europe',
    phonePrefix: '+44',
    capital: 'London',
    majorCities: ['London', 'Manchester', 'Edinburgh', 'Bristol', 'Cambridge', 'Birmingham'],
    universities: ['University of Oxford', 'University of Cambridge', 'Imperial College London', 'UCL', 'University of Edinburgh'],
    companies: ['Albion Digital Ltd.', 'Crown & Sterling Partners', 'Thames Capital Group', 'Meridian Innovations UK']
  },
  {
    name: 'United States',
    alpha2: 'US',
    alpha3: 'USA',
    region: 'North America',
    phonePrefix: '+1',
    capital: 'Washington, D.C.',
    majorCities: ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Chicago, IL', 'Boston, MA'],
    universities: ['Stanford University', 'MIT', 'UC Berkeley', 'Columbia University', 'UT Austin', 'University of Washington'],
    companies: ['Apex Dynamics Inc.', 'Beacon Tech Solutions', 'Horizon Global', 'Pinnacle Systems', 'Vanguard Innovations']
  },
  {
    name: 'Uruguay',
    alpha2: 'UY',
    alpha3: 'URY',
    region: 'South America',
    phonePrefix: '+598',
    capital: 'Montevideo',
    majorCities: ['Montevideo', 'Salto', 'Ciudad de la Costa', 'Paysandú'],
    universities: ['Universidad de la República (UdelaR)', 'Universidad ORT Uruguay'],
    companies: ['Montevideo Silicon Works', 'Rio de la Plata Software', 'Charrúa Digital Labs']
  },
  {
    name: 'Uzbekistan',
    alpha2: 'UZ',
    alpha3: 'UZB',
    region: 'Asia',
    phonePrefix: '+998',
    capital: 'Tashkent',
    majorCities: ['Tashkent', 'Samarkand', 'Namangan', 'Andijan', 'Bukhara'],
    universities: ['National University of Uzbekistan', 'Tashkent University of Information Technologies (TUIT)'],
    companies: ['Silk Road Silicon Works', 'Tashkent IT Park', 'Samarkand Digital Systems']
  },

  // V
  {
    name: 'Vanuatu',
    alpha2: 'VU',
    alpha3: 'VUT',
    region: 'Oceania',
    phonePrefix: '+678',
    capital: 'Port Vila',
    majorCities: ['Port Vila', 'Luganville'],
    universities: ['University of the South Pacific Emalus Campus'],
    companies: ['Melanesian Cloud Works', 'Port Vila Tech Hub', 'Pacific Coral Software']
  },
  {
    name: 'Vatican City',
    alpha2: 'VA',
    alpha3: 'VAT',
    region: 'Europe',
    phonePrefix: '+39',
    capital: 'Vatican City',
    majorCities: ['Vatican City'],
    universities: ['Pontifical Gregorian University', 'Pontifical Lateran University'],
    companies: ['Holy See Digital Archives', 'Vatican Media & Systems', 'Apostolic Cloud Hub']
  },
  {
    name: 'Venezuela',
    alpha2: 'VE',
    alpha3: 'VEN',
    region: 'South America',
    phonePrefix: '+58',
    capital: 'Caracas',
    majorCities: ['Caracas', 'Maracaibo', 'Valencia', 'Barquisimeto'],
    universities: ['Universidad Central de Venezuela (UCV)', 'Universidad Simón Bolívar (USB)'],
    companies: ['Caracas Silicon Works', 'Orinoco Data Systems', 'Andean Wave Software']
  },
  {
    name: 'Vietnam',
    alpha2: 'VN',
    alpha3: 'VNM',
    region: 'Asia',
    phonePrefix: '+84',
    capital: 'Hanoi',
    majorCities: ['Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Hai Phong', 'Can Tho'],
    universities: ['Vietnam National University, Hanoi', 'Hanoi University of Science and Technology (HUST)', 'VNU-HCM'],
    companies: ['Saigon Silicon Valley Labs', 'Hanoi Tech Foundry', 'Red River Cloud Works', 'Da Nang Software Hub']
  },

  // Y
  {
    name: 'Yemen',
    alpha2: 'YE',
    alpha3: 'YEM',
    region: 'Asia',
    phonePrefix: '+967',
    capital: "Sana'a",
    majorCities: ["Sana'a", 'Aden', 'Taiz', 'Al Hudaydah'],
    universities: ["Sana'a University", 'University of Aden'],
    companies: ['Arabian Felix Digital', "Sana'a Tech Works", 'Aden Gulf Cloud Systems']
  },

  // Z
  {
    name: 'Zambia',
    alpha2: 'ZM',
    alpha3: 'ZMB',
    region: 'Africa',
    phonePrefix: '+260',
    capital: 'Lusaka',
    majorCities: ['Lusaka', 'Kitwe', 'Ndola', 'Livingstone'],
    universities: ['University of Zambia (UNZA)', 'Copperbelt University (CBU)'],
    companies: ['Zambezi Tech Foundry', 'Lusaka Digital Labs', 'Victoria Falls Cloud Works']
  },
  {
    name: 'Zimbabwe',
    alpha2: 'ZW',
    alpha3: 'ZWE',
    region: 'Africa',
    phonePrefix: '+263',
    capital: 'Harare',
    majorCities: ['Harare', 'Bulawayo', 'Chitungwiza', 'Mutare'],
    universities: ['University of Zimbabwe', 'National University of Science and Technology (NUST)'],
    companies: ['Great Zimbabwe Tech Foundry', 'Harare Silicon Valley', 'Victoria Cloud Innovations']
  },

  // Important Territories / Regions
  {
    name: 'Hong Kong',
    alpha2: 'HK',
    alpha3: 'HKG',
    region: 'Asia',
    phonePrefix: '+852',
    capital: 'Hong Kong',
    majorCities: ['Central, Hong Kong', 'Kowloon', 'Cyberport, Hong Kong', 'Science Park, Sha Tin'],
    universities: ['University of Hong Kong (HKU)', 'HKUST', 'Chinese University of Hong Kong (CUHK)'],
    companies: ['Cyberport Tech Labs', 'Victoria Harbour Digital', 'Pearl River Delta Systems']
  },
  {
    name: 'Macao',
    alpha2: 'MO',
    alpha3: 'MAC',
    region: 'Asia',
    phonePrefix: '+853',
    capital: 'Macao',
    majorCities: ['Macao', 'Taipa', 'Coloane'],
    universities: ['University of Macau', 'Macao Polytechnic University'],
    companies: ['Cotai Tech Innovations', 'Macao Digital Foundry', 'Pearl Estuary Cloud']
  },
  {
    name: 'Puerto Rico',
    alpha2: 'PR',
    alpha3: 'PRI',
    region: 'North America',
    phonePrefix: '+1-787',
    capital: 'San Juan',
    majorCities: ['San Juan', 'Bayamón', 'Carolina', 'Ponce', 'Mayagüez'],
    universities: ['University of Puerto Rico (UPR)', 'UPR Mayagüez', 'Inter American University'],
    companies: ['Isla Verde Silicon Works', 'San Juan Tech Hub', 'Borinquen Cloud Labs']
  },
  {
    name: 'Bermuda',
    alpha2: 'BM',
    alpha3: 'BMU',
    region: 'North America',
    phonePrefix: '+1-441',
    capital: 'Hamilton',
    majorCities: ['Hamilton', "St. George's"],
    universities: ['Bermuda College'],
    companies: ['Atlantic InsurTech Foundry', 'Hamilton Digital Works', 'Somers Isles Cloud']
  },
  {
    name: 'Cayman Islands',
    alpha2: 'KY',
    alpha3: 'CYM',
    region: 'North America',
    phonePrefix: '+1-345',
    capital: 'George Town',
    majorCities: ['George Town', 'West Bay', 'Bodden Town'],
    universities: ['University College of the Cayman Islands'],
    companies: ['Seven Mile Digital', 'George Town FinTech', 'Grand Cayman Cloud Works']
  }
];

// Helper functions
export function getAllCountries(): CountryInfo[] {
  return ALL_COUNTRIES;
}

export function findCountryByName(name: string): CountryInfo | undefined {
  if (!name) return undefined;
  const clean = name.trim().toLowerCase();
  return ALL_COUNTRIES.find(c => c.name.toLowerCase() === clean);
}

export function findCountryByCode(code: string): CountryInfo | undefined {
  if (!code) return undefined;
  const clean = code.trim().toUpperCase();
  return ALL_COUNTRIES.find(c => c.alpha2 === clean || c.alpha3 === clean);
}

export function getRandomCountry(): CountryInfo {
  const idx = Math.floor(Math.random() * ALL_COUNTRIES.length);
  return ALL_COUNTRIES[idx];
}

export function searchCountries(query: string): CountryInfo[] {
  if (!query || !query.trim()) return ALL_COUNTRIES;
  const clean = query.trim().toLowerCase();
  return ALL_COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(clean) ||
    c.alpha2.toLowerCase() === clean ||
    c.alpha3.toLowerCase() === clean ||
    c.region.toLowerCase().includes(clean)
  );
}

export interface CountryLocationDetails {
  countryName: string;
  city: string;
  region: string;
  capital: string;
  majorCities: string[];
  phonePrefix: string;
  countryInfo?: CountryInfo;
}

export function getCountryLocationDetails(countryNameOrCode?: string): CountryLocationDetails {
  if (!countryNameOrCode) {
    const us = findCountryByName('United States');
    return {
      countryName: 'United States',
      city: 'Washington, D.C.',
      region: 'North America',
      capital: 'Washington, D.C.',
      majorCities: ['New York, NY', 'San Francisco, CA', 'Austin, TX', 'Seattle, WA', 'Chicago, IL', 'Boston, MA'],
      phonePrefix: '+1',
      countryInfo: us
    };
  }

  const country = findCountryByName(countryNameOrCode) || findCountryByCode(countryNameOrCode);
  if (!country) {
    return {
      countryName: countryNameOrCode,
      city: '',
      region: '',
      capital: '',
      majorCities: [],
      phonePrefix: '+1',
      countryInfo: undefined
    };
  }

  const defaultCity = country.capital || (country.majorCities && country.majorCities[0]) || '';
  const allCities: string[] = [];
  if (country.capital) allCities.push(country.capital);
  if (country.majorCities) {
    for (const c of country.majorCities) {
      if (!allCities.includes(c)) allCities.push(c);
    }
  }

  return {
    countryName: country.name,
    city: defaultCity,
    region: country.region,
    capital: country.capital,
    majorCities: allCities,
    phonePrefix: country.phonePrefix,
    countryInfo: country
  };
}
