import { ResumeData, IndustryCategory, CvTemplate } from '../types/cv';
import { SAMPLE_CVS } from './sampleCvs';
import { ALL_COUNTRIES, getRandomCountry, findCountryByName, CountryInfo } from './countriesData';

const FIRST_NAMES = [
  'Liam', 'Emma', 'Noah', 'Olivia', 'Ethan', 'Sophia', 'Lucas', 'Ava',
  'Mason', 'Isabella', 'Oliver', 'Mia', 'Elijah', 'Charlotte', 'Aiden', 'Amelia',
  'James', 'Harper', 'Benjamin', 'Evelyn', 'Alexander', 'Abigail', 'Henry', 'Emily',
  'Sebastian', 'Elizabeth', 'Julian', 'Sofia', 'Daniel', 'Avery', 'Gabriel', 'Ella',
  'Kai', 'Maya', 'Zane', 'Chloe', 'Damian', 'Clara', 'Adrian', 'Valerie'
];

const LAST_NAMES = [
  'Sterling', 'Vance', 'Holloway', 'Sinclair', 'Montgomery', 'Mercer', 'Castillo',
  'Thornton', 'Blackwood', 'Chen', 'Patel', 'Kowalski', 'Nakamura', 'O\'Connor',
  'Fontaine', 'Brooks', 'Gallagher', 'Hawthorne', 'Sorensen', 'Whitmore', 'Lindqvist',
  'Adler', 'Brenner', 'Donovan', 'Harrington', 'Prescott', 'Kaufman', 'Vanderbilt'
];

const CITIES = [
  'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Chicago, IL',
  'Boston, MA', 'Denver, CO', 'Atlanta, GA', 'San Diego, CA', 'Portland, OR',
  'Miami, FL', 'Toronto, ON', 'London, UK', 'Berlin, Germany', 'Sydney, Australia',
  'Washington, DC', 'Minneapolis, MN', 'Dallas, TX', 'Los Angeles, CA'
];

const TEMPLATES: CvTemplate[] = [
  'modern', 
  'classic', 
  'minimal', 
  'professional', 
  'executive', 
  'creative', 
  'compact'
];

const COLORS = [
  '#2563eb', // Royal Blue
  '#1e3a8a', // Deep Blue
  '#0284c7', // Sky Blue
  '#059669', // Emerald
  '#0f172a', // Slate Navy
  '#7c3aed', // Violet
  '#db2777', // Rose Pink
  '#d97706', // Warm Amber
];

const INDUSTRIES: IndustryCategory[] = [
  'Technology',
  'Cybersecurity',
  'Healthcare',
  'Finance',
  'Marketing',
  'Sales',
  'Design',
  'Project Management',
  'Customer Support'
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRandomCv(chosenIndustry?: IndustryCategory, chosenCountry?: string): ResumeData {
  const industry = chosenIndustry || getRandomItem(INDUSTRIES);
  const baseSample = SAMPLE_CVS[industry] || SAMPLE_CVS['Technology'];

  // Resolve country
  let countryInfo: CountryInfo;
  if (!chosenCountry || chosenCountry === 'Any' || chosenCountry === 'Any Country (Random)') {
    countryInfo = getRandomCountry();
  } else {
    countryInfo = findCountryByName(chosenCountry) || getRandomCountry();
  }

  const firstName = getRandomItem(FIRST_NAMES);
  const lastName = getRandomItem(LAST_NAMES);
  const fullName = `${firstName} ${lastName}`;
  
  const city = countryInfo.majorCities && countryInfo.majorCities.length > 0
    ? getRandomItem(countryInfo.majorCities)
    : countryInfo.capital || 'Remote';
  const location = `${city}, ${countryInfo.name}`;

  const cleanEmailName = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
  const email = `${cleanEmailName}.demo@netiqcv.io`;
  const phone = `${countryInfo.phonePrefix} ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`;
  const website = `${cleanEmailName}.pro.example`;
  const linkedin = `linkedin.com/in/${cleanEmailName}-pro`;
  const github = `github.com/${cleanEmailName}`;

  // Clone sample data deeply
  const cloned: ResumeData = JSON.parse(JSON.stringify(baseSample));

  cloned.id = `random-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  cloned.title = `${fullName} — ${cloned.personalInfo.jobTitle}`;
  cloned.industry = industry;
  cloned.personalInfo = {
    ...cloned.personalInfo,
    fullName,
    email,
    phone,
    location,
    country: countryInfo.name,
    website,
    linkedin,
    github,
  };

  // Adjust education to local university if available
  if (cloned.education && cloned.education.length > 0 && countryInfo.universities && countryInfo.universities.length > 0) {
    cloned.education[0].school = getRandomItem(countryInfo.universities);
    cloned.education[0].location = city;
  }

  // Adjust experience company if available
  if (cloned.experience && cloned.experience.length > 0 && countryInfo.companies && countryInfo.companies.length > 0) {
    cloned.experience[0].company = countryInfo.companies[0];
    cloned.experience[0].location = `${city} (Hybrid / Onsite)`;
  }

  // Adjust theme subtly for variety
  cloned.themeConfig = {
    template: getRandomItem(TEMPLATES),
    accentColor: getRandomItem(COLORS),
    font: Math.random() > 0.5 ? 'sans' : 'serif',
    spacing: 'normal',
  };

  cloned.updatedAt = Date.now();

  return cloned;
}

export { INDUSTRIES };
