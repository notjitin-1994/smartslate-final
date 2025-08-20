import { NavigationDots as StyledNavigationDots, Dot } from './styles/LandingStyles';

interface NavigationDotsProps {
  currentSection: number;
  onSectionClick: (index: number) => void;
}

const sections = [
  { id: 'hero', label: 'Introduction' },
  { id: 'paradox', label: 'The Paradox' },
  { id: 'framework', label: 'Our Solution' },
  { id: 'roi', label: 'ROI Calculator' },
  { id: 'partners', label: 'Partners' },
];

export default function NavigationDots({ currentSection, onSectionClick }: NavigationDotsProps) {
  return (
    <StyledNavigationDots>
      {sections.map((section, index) => (
        <Dot
          key={section.id}
          active={currentSection === index}
          onClick={() => onSectionClick(index)}
          title={section.label}
          aria-label={`Navigate to ${section.label}`}
        />
      ))}
    </StyledNavigationDots>
  );
}
