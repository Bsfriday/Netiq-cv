import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { AdSlot } from '../components/common/AdSlot';
import { AdManager } from '../components/common/AdManager';
import { CvRenderer } from '../components/cv-templates/CvRenderer';
import { DEFAULT_BLANK_CV } from '../data/defaultCv';
import { SAMPLE_CVS } from '../data/sampleCvs';
import { ResumeData } from '../types/cv';

describe('React Component Rendering Tests', () => {
  it('renders Header component with navigation buttons and brand logo', () => {
    const handleNavigate = vi.fn();
    render(<Header currentRoute="/random" onNavigate={handleNavigate} savedCount={3} />);

    expect(screen.getByText('NetiqCV')).toBeInTheDocument();
    expect(screen.getAllByText(/CreatIQ/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Professional CV Studio/i)).toBeInTheDocument();
    expect(screen.getByText('AI Generator')).toBeInTheDocument();
    expect(screen.getByText('Random CV')).toBeInTheDocument();
    expect(screen.getByText('Create My CV')).toBeInTheDocument();
    expect(screen.getByText('Sample CVs')).toBeInTheDocument();
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    const aiGenBtn = screen.getByRole('button', { name: /AI Generator/i });
    fireEvent.click(aiGenBtn);
    expect(handleNavigate).toHaveBeenCalledWith('/resume/type-selection');

    const randomBtn = screen.getByRole('button', { name: /Random CV/i });
    fireEvent.click(randomBtn);
    expect(handleNavigate).toHaveBeenCalledWith('/random');

    const createBtn = screen.getByRole('button', { name: /Create My CV/i });
    fireEvent.click(createBtn);
    expect(handleNavigate).toHaveBeenCalledWith('/create');
  });

  it('renders Footer component with status and metadata indicators', () => {
    render(<Footer />);

    expect(screen.getByText('Drafts Auto-Saved Locally in Browser')).toBeInTheDocument();
    expect(screen.getAllByText(/CreatIQ Products/i).length).toBeGreaterThan(0);
    expect(screen.getByText('A4 Vector PDF Ready')).toBeInTheDocument();
  });

  it('renders CvRenderer correctly with candidate data in Modern template', () => {
    const testCv: ResumeData = {
      ...DEFAULT_BLANK_CV,
      personalInfo: {
        fullName: 'Jane Doe',
        jobTitle: 'Lead Software Engineer',
        email: 'jane.doe@example.com',
        phone: '+1 (555) 234-5678',
        location: 'San Francisco, CA',
        website: 'https://janedoe.dev',
        linkedin: 'linkedin.com/in/janedoe',
        github: 'github.com/janedoe',
      },
      summary: 'Experienced cloud architect specializing in distributed scalable web systems.',
      experience: [
        {
          id: 'exp-1',
          company: 'Acme Cloud Corp',
          jobTitle: 'Staff Engineer',
          startDate: '2021-01',
          endDate: '',
          current: true,
          location: 'San Francisco, CA',
          description: 'Architected microservices handling 50k RPS'
        }
      ],
      skills: [
        {
          id: 'skill-1',
          name: 'React & TypeScript',
          level: 'Expert',
          category: 'Frontend'
        }
      ],
      themeConfig: {
        template: 'modern',
        accentColor: '#2563eb',
        font: 'sans',
        spacing: 'normal'
      }
    };

    render(<CvRenderer data={testCv} />);

    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Lead Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Acme Cloud Corp')).toBeInTheDocument();
    expect(screen.getByText('Architected microservices handling 50k RPS')).toBeInTheDocument();
    expect(screen.getByText(/React & TypeScript/i)).toBeInTheDocument();
  });

  it('renders CvRenderer properly across all layout templates with complete section hierarchy', () => {
    const templates = ['modern', 'classic', 'minimal', 'executive', 'creative', 'compact', 'professional'] as const;
    const sample = SAMPLE_CVS['Technology'];

    templates.forEach((tpl) => {
      const cvWithTemplate: ResumeData = {
        ...sample,
        themeConfig: {
          ...sample.themeConfig,
          template: tpl
        }
      };

      const { unmount } = render(<CvRenderer data={cvWithTemplate} />);
      expect(screen.getByText(sample.personalInfo.fullName)).toBeInTheDocument();
      expect(screen.getByText(sample.personalInfo.jobTitle)).toBeInTheDocument();
      if (sample.experience[0]) {
        expect(screen.getByText(sample.experience[0].jobTitle)).toBeInTheDocument();
      }
      unmount();
    });
  });

  it('renders AdManager in clean state with no active ads ready for fresh slots', () => {
    const { container } = render(<AdManager />);
    expect(container.firstChild).toBeNull();
    expect(document.querySelector('#ad-slot-section-ad-slot-1')).toBeNull();
    expect(document.querySelector('#ad-slot-section-ad-slot-2')).toBeNull();
  });

  it('handles AdSlot 5-second countdown and enables reliable user dismiss/close', () => {
    vi.useFakeTimers();
    const handleDismiss = vi.fn();
    const { unmount } = render(
      <AdSlot slotId="test-slot" isActive={true} closeCountdown={5} onDismiss={handleDismiss}>
        <div data-testid="ad-content">Ad Body</div>
      </AdSlot>
    );

    const closeBtn = document.querySelector('#close-ad-btn-test-slot') as HTMLButtonElement;
    expect(closeBtn).toBeInTheDocument();
    expect(closeBtn).toBeDisabled();
    expect(closeBtn.textContent).toContain('Close in 5');

    // Advance 2 seconds -> countdown is 3
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(closeBtn).toBeDisabled();
    expect(closeBtn.textContent).toContain('Close in 3');

    // Advance another 3 seconds (5s total) -> countdown reaches 0
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(closeBtn).not.toBeDisabled();
    expect(closeBtn.textContent).toContain('Close');

    // Click close button
    act(() => {
      fireEvent.click(closeBtn);
    });

    expect(handleDismiss).toHaveBeenCalledWith('test-slot');
    expect(document.querySelector('#ad-slot-section-test-slot')).toBeNull();

    unmount();
    vi.useRealTimers();
  });
});
