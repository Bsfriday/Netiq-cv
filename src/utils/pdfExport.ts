import React from 'react';
import { createRoot } from 'react-dom/client';
import jsPDF from 'jspdf';
import { toPng, toCanvas } from 'html-to-image';
import html2canvas from 'html2canvas';
import { ResumeData } from '../types/cv';
import { CvRenderer } from '../components/cv-templates/CvRenderer';
import { triggerReviewPrompt } from './reviewStorage';

export interface ExportOptions {
  filename?: string;
  quality?: number;
  format?: 'pdf' | 'json' | 'html' | 'txt';
}

/**
 * Helper to format date strings like "2022-03" into "Mar 2022"
 */
function formatShortDate(dateStr?: string): string {
  if (!dateStr) return '';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 2) {
      const year = parts[0];
      const month = parseInt(parts[1], 10);
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      if (month >= 1 && month <= 12) {
        return `${monthNames[month - 1]} ${year}`;
      }
    }
    return dateStr;
  } catch {
    return dateStr || '';
  }
}

/**
 * Clean and format a valid filename from candidate's name or title
 */
export function getCvFilename(cv?: ResumeData, extension: string = 'pdf'): string {
  const name = cv?.personalInfo?.fullName?.trim() || cv?.title?.trim() || 'NetiqCV';
  const cleanName = name
    .replace(/[^a-zA-Z0-9_\-\s]/g, '')
    .trim()
    .replace(/\s+/g, '_');
  return `${cleanName || 'Resume'}_CV.${extension}`;
}

/**
 * Helper to trigger a browser file download using standard Blob anchor
 */
export function triggerBlobDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    if (link.parentNode) {
      link.parentNode.removeChild(link);
    }
    URL.revokeObjectURL(url);
  }, 250);
}

/**
 * Helper to parse hex color to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleanHex = (hex || '#2563eb').replace('#', '');
  const bigint = parseInt(cleanHex.length === 3 ? cleanHex.split('').map(c => c + c).join('') : cleanHex, 16);
  if (isNaN(bigint)) {
    return { r: 37, g: 99, b: 235 };
  }
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

/**
 * Generates and downloads a clean, styled vector PDF directly using jsPDF
 * Systematic, template-aware layouts matching the 7 template styles:
 * Modern, Classic, Professional, Minimal, Executive, Creative, Compact.
 */
export function generateDirectJsPdf(cv: ResumeData | undefined, filename: string): void {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let currentY = 16;
  const accentColor = cv?.themeConfig?.accentColor || '#2563eb';
  const rgb = hexToRgb(accentColor);
  const template = cv?.themeConfig?.template || 'modern';
  const isSerif = cv?.themeConfig?.font === 'serif';
  const mainFont = isSerif ? 'times' : 'helvetica';

  const checkPageBreak = (neededHeight: number) => {
    if (currentY + neededHeight > pageHeight - 16) {
      pdf.addPage();
      currentY = 16;
      addPageHeaderDecoration();
    }
  };

  const addPageHeaderDecoration = () => {
    pdf.setFillColor(rgb.r, rgb.g, rgb.b);
    pdf.rect(0, 0, pageWidth, 2.5, 'F');
  };

  const addSectionHeading = (title: string) => {
    checkPageBreak(14);
    pdf.setFont(mainFont, 'bold');
    pdf.setFontSize(10.5);
    pdf.setTextColor(rgb.r, rgb.g, rgb.b);
    pdf.text(title.toUpperCase(), margin, currentY);
    currentY += 2;
    pdf.setDrawColor(226, 232, 240);
    pdf.setLineWidth(0.35);
    pdf.line(margin, currentY, pageWidth - margin, currentY);
    currentY += 4.5;
  };

  const fullName = cv?.personalInfo?.fullName || cv?.title || 'Resume';
  const jobTitle = cv?.personalInfo?.jobTitle || '';

  // Template-specific Header Formatting
  if (template === 'professional') {
    // Solid Accent Banner Header
    pdf.setFillColor(rgb.r, rgb.g, rgb.b);
    pdf.rect(margin, currentY, contentWidth, 24, 'F');

    pdf.setFont(mainFont, 'bold');
    pdf.setFontSize(18);
    pdf.setTextColor(255, 255, 255);
    pdf.text(fullName, margin + 5, currentY + 9);

    if (jobTitle) {
      pdf.setFont(mainFont, 'normal');
      pdf.setFontSize(10.5);
      pdf.setTextColor(240, 245, 255);
      pdf.text(jobTitle, margin + 5, currentY + 16);
    }
    currentY += 28;
  } else if (template === 'classic' || template === 'executive') {
    // Centered Classic / Executive Header
    pdf.setFont(mainFont, 'bold');
    pdf.setFontSize(19);
    pdf.setTextColor(15, 23, 42);
    const nameWidth = pdf.getTextWidth(fullName.toUpperCase());
    pdf.text(fullName.toUpperCase(), (pageWidth - nameWidth) / 2, currentY);
    currentY += 6;

    if (jobTitle) {
      pdf.setFont(mainFont, 'normal');
      pdf.setFontSize(11);
      pdf.setTextColor(rgb.r, rgb.g, rgb.b);
      const titleWidth = pdf.getTextWidth(jobTitle.toUpperCase());
      pdf.text(jobTitle.toUpperCase(), (pageWidth - titleWidth) / 2, currentY);
      currentY += 5;
    }

    pdf.setDrawColor(rgb.r, rgb.g, rgb.b);
    pdf.setLineWidth(template === 'executive' ? 0.8 : 0.5);
    pdf.line(margin, currentY, pageWidth - margin, currentY);
    currentY += 5;
  } else if (template === 'minimal') {
    // Minimalist Understated Header
    pdf.setFont(mainFont, 'bold');
    pdf.setFontSize(18);
    pdf.setTextColor(15, 23, 42);
    pdf.text(fullName, margin, currentY);
    currentY += 5.5;

    if (jobTitle) {
      pdf.setFont(mainFont, 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(rgb.r, rgb.g, rgb.b);
      pdf.text(jobTitle, margin, currentY);
      currentY += 4.5;
    }

    pdf.setDrawColor(203, 213, 225);
    pdf.setLineWidth(0.25);
    pdf.line(margin, currentY, pageWidth - margin, currentY);
    currentY += 4;
  } else {
    // Modern / Creative / Compact
    pdf.setFont(mainFont, 'bold');
    pdf.setFontSize(20);
    pdf.setTextColor(rgb.r, rgb.g, rgb.b);
    pdf.text(fullName, margin, currentY);
    currentY += 6.5;

    if (jobTitle) {
      pdf.setFont(mainFont, 'normal');
      pdf.setFontSize(11);
      pdf.setTextColor(51, 65, 85);
      pdf.text(jobTitle, margin, currentY);
      currentY += 5.5;
    }

    pdf.setDrawColor(226, 232, 240);
    pdf.setLineWidth(0.4);
    pdf.line(margin, currentY, pageWidth - margin, currentY);
    currentY += 4.5;
  }

  // Contact Info Line
  const contacts: string[] = [];
  if (cv?.personalInfo?.email) contacts.push(cv.personalInfo.email);
  if (cv?.personalInfo?.phone) contacts.push(cv.personalInfo.phone);
  if (cv?.personalInfo?.location) contacts.push(cv.personalInfo.location);
  if (cv?.personalInfo?.linkedin) contacts.push(cv.personalInfo.linkedin);
  if (cv?.personalInfo?.website) contacts.push(cv.personalInfo.website);
  if (cv?.personalInfo?.github) contacts.push(cv.personalInfo.github);

  if (contacts.length > 0) {
    pdf.setFont(mainFont, 'normal');
    pdf.setFontSize(8.5);
    pdf.setTextColor(71, 85, 105);
    const contactText = contacts.join('   •   ');
    const splitContacts = pdf.splitTextToSize(contactText, contentWidth);
    pdf.text(splitContacts, margin, currentY);
    currentY += splitContacts.length * 3.8 + 3;
  }

  // Professional Summary
  if (cv?.summary) {
    addSectionHeading(template === 'classic' || template === 'executive' ? 'Executive Profile' : 'Professional Summary');
    pdf.setFont(mainFont, 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(51, 65, 85);
    const summaryLines = pdf.splitTextToSize(cv.summary, contentWidth);
    checkPageBreak(summaryLines.length * 4.2);
    pdf.text(summaryLines, margin, currentY);
    currentY += summaryLines.length * 4.2 + 3.5;
  }

  // Work Experience
  if (cv?.experience && cv.experience.length > 0) {
    addSectionHeading(template === 'executive' ? 'Professional History' : 'Work Experience');
    cv.experience.forEach((exp) => {
      checkPageBreak(16);
      
      // Job title
      pdf.setFont(mainFont, 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(15, 23, 42);
      pdf.text(exp.jobTitle, margin, currentY);

      // Date right-aligned
      const startFmt = formatShortDate(exp.startDate);
      const endFmt = exp.current ? 'Present' : formatShortDate(exp.endDate);
      const dateText = `${startFmt} – ${endFmt}`;
      pdf.setFont(mainFont, 'normal');
      pdf.setFontSize(8.5);
      pdf.setTextColor(100, 116, 139);
      const dateWidth = pdf.getTextWidth(dateText);
      pdf.text(dateText, pageWidth - margin - dateWidth, currentY);
      currentY += 4.2;

      // Company & location
      pdf.setFont(mainFont, 'bold');
      pdf.setFontSize(9);
      pdf.setTextColor(rgb.r, rgb.g, rgb.b);
      const companyLoc = `${exp.company}${exp.location ? ` • ${exp.location}` : ''}`;
      pdf.text(companyLoc, margin, currentY);
      currentY += 4;

      // Description
      if (exp.description) {
        pdf.setFont(mainFont, 'normal');
        pdf.setFontSize(8.5);
        pdf.setTextColor(51, 65, 85);
        const rawLines = exp.description.split('\n');
        
        rawLines.forEach((line) => {
          const trimmed = line.trim();
          if (!trimmed) return;
          const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*');
          const cleanLine = isBullet ? trimmed.replace(/^[•\-*]\s*/, '') : trimmed;
          
          if (isBullet) {
            const bulletWrapped = pdf.splitTextToSize(cleanLine, contentWidth - 4);
            checkPageBreak(bulletWrapped.length * 3.8);
            pdf.setTextColor(rgb.r, rgb.g, rgb.b);
            pdf.text('•', margin, currentY);
            pdf.setTextColor(51, 65, 85);
            pdf.text(bulletWrapped, margin + 3.5, currentY);
            currentY += bulletWrapped.length * 3.8 + 0.8;
          } else {
            const wrapped = pdf.splitTextToSize(cleanLine, contentWidth);
            checkPageBreak(wrapped.length * 3.8);
            pdf.text(wrapped, margin, currentY);
            currentY += wrapped.length * 3.8 + 0.8;
          }
        });
        currentY += 1.5;
      }
      currentY += 1.5;
    });
  }

  // Education
  if (cv?.education && cv.education.length > 0) {
    addSectionHeading('Education');
    cv.education.forEach((edu) => {
      checkPageBreak(13);
      pdf.setFont(mainFont, 'bold');
      pdf.setFontSize(9.5);
      pdf.setTextColor(15, 23, 42);
      const degreeText = `${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}`;
      pdf.text(degreeText, margin, currentY);

      const startFmt = formatShortDate(edu.startDate);
      const endFmt = edu.current ? 'Present' : formatShortDate(edu.endDate);
      const dateText = `${startFmt} – ${endFmt}`;
      pdf.setFont(mainFont, 'normal');
      pdf.setFontSize(8.5);
      pdf.setTextColor(100, 116, 139);
      const dateWidth = pdf.getTextWidth(dateText);
      pdf.text(dateText, pageWidth - margin - dateWidth, currentY);
      currentY += 4.2;

      pdf.setFont(mainFont, 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(71, 85, 105);
      pdf.text(`${edu.school}${edu.location ? ` • ${edu.location}` : ''}`, margin, currentY);
      currentY += 3.8;

      if (edu.description) {
        pdf.setFontSize(8.5);
        pdf.setTextColor(100, 116, 139);
        const eduDesc = pdf.splitTextToSize(edu.description, contentWidth);
        checkPageBreak(eduDesc.length * 3.6);
        pdf.text(eduDesc, margin, currentY);
        currentY += eduDesc.length * 3.6 + 1;
      }
      currentY += 1.5;
    });
  }

  // Skills & Expertise
  if (cv?.skills && cv.skills.length > 0) {
    addSectionHeading(template === 'professional' ? 'Key Competencies' : 'Skills & Expertise');
    checkPageBreak(12);
    pdf.setFont(mainFont, 'normal');
    pdf.setFontSize(8.5);
    pdf.setTextColor(30, 41, 59);
    const skillsList = cv.skills.map((s) => `${s.name}${s.level ? ` (${s.level})` : ''}`).join('   •   ');
    const skillLines = pdf.splitTextToSize(skillsList, contentWidth);
    pdf.text(skillLines, margin, currentY);
    currentY += skillLines.length * 3.8 + 3.5;
  }

  // Certifications
  if (cv?.certifications && cv.certifications.length > 0) {
    addSectionHeading('Certifications');
    cv.certifications.forEach((c) => {
      checkPageBreak(7);
      pdf.setFont(mainFont, 'bold');
      pdf.setFontSize(9);
      pdf.setTextColor(15, 23, 42);
      pdf.text(`• ${c.name}`, margin, currentY);
      pdf.setFont(mainFont, 'normal');
      pdf.setTextColor(100, 116, 139);
      const dateFmt = formatShortDate(c.date);
      const issuerDate = ` — ${c.issuer}${dateFmt ? ` (${dateFmt})` : ''}`;
      pdf.text(issuerDate, margin + pdf.getTextWidth(`• ${c.name}`), currentY);
      currentY += 4.2;
    });
    currentY += 1.5;
  }

  // Projects
  if (cv?.projects && cv.projects.length > 0) {
    addSectionHeading(template === 'creative' ? 'Projects & Portfolio' : 'Key Projects');
    cv.projects.forEach((p) => {
      checkPageBreak(12);
      pdf.setFont(mainFont, 'bold');
      pdf.setFontSize(9.5);
      pdf.setTextColor(15, 23, 42);
      pdf.text(p.title, margin, currentY);
      if (p.link) {
        pdf.setFont(mainFont, 'normal');
        pdf.setFontSize(8);
        pdf.setTextColor(rgb.r, rgb.g, rgb.b);
        pdf.text(` (${p.link})`, margin + pdf.getTextWidth(p.title), currentY);
      }
      currentY += 4.2;

      if (p.description) {
        pdf.setFont(mainFont, 'normal');
        pdf.setFontSize(8.5);
        pdf.setTextColor(51, 65, 85);
        const pDesc = pdf.splitTextToSize(p.description, contentWidth);
        checkPageBreak(pDesc.length * 3.6);
        pdf.text(pDesc, margin, currentY);
        currentY += pDesc.length * 3.6 + 1.5;
      }
      if (p.technologies) {
        pdf.setFont(mainFont, 'bold');
        pdf.setFontSize(8);
        pdf.setTextColor(100, 116, 139);
        pdf.text(`Tech: ${p.technologies}`, margin, currentY);
        currentY += 3.8;
      }
      currentY += 1.5;
    });
  }

  // Running footer on all pages
  const totalPages = (pdf as any).internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFont(mainFont, 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(148, 163, 184);
    pdf.text(`${fullName} — Resume`, margin, pageHeight - 7);
    const pageStr = `Page ${i} of ${totalPages}`;
    const pageStrWidth = pdf.getTextWidth(pageStr);
    pdf.text(pageStr, pageWidth - margin - pageStrWidth, pageHeight - 7);
  }

  pdf.save(filename);
  triggerReviewPrompt('cv_download', 1000);
}

/**
 * Downloads candidate resume directly as a high-resolution A4 PDF file.
 * Preserves the exact template layout, colors, typography, spacing, and highlights
 * selected by the user by rendering a dedicated isolated React tree to canvas.
 * Guaranteed to download directly without opening the browser print dialog.
 */
export async function exportCvToPdf(
  cv?: ResumeData,
  _elementId?: string
): Promise<boolean> {
  const filename = getCvFilename(cv, 'pdf');
  let tempWrapper: HTMLElement | null = null;
  let root: any = null;

  // Polyfill SVGImageElement in headless / test environments
  if (typeof window !== 'undefined' && typeof (window as any).SVGImageElement === 'undefined') {
    (window as any).SVGImageElement = (window as any).Element || class {};
  }

  try {
    if (cv) {
      // Ensure web fonts are completely resolved prior to snapshot
      if (typeof document !== 'undefined' && document.fonts) {
        try {
          await document.fonts.ready;
        } catch {
          // font readiness check non-blocking
        }
      }

      // Create an off-screen sandbox container attached to document.body
      // Set fixed standard A4 width (794px = 210mm at 96 DPI)
      tempWrapper = document.createElement('div');
      tempWrapper.id = 'cv-export-offscreen-sandbox';
      tempWrapper.style.position = 'fixed';
      tempWrapper.style.left = '-9999px';
      tempWrapper.style.top = '0';
      tempWrapper.style.width = '794px';
      tempWrapper.style.minHeight = '1123px';
      tempWrapper.style.background = '#ffffff';
      tempWrapper.style.zIndex = '-9999';
      tempWrapper.style.display = 'block';
      tempWrapper.style.visibility = 'visible';
      tempWrapper.style.opacity = '1';
      tempWrapper.style.margin = '0';
      tempWrapper.style.padding = '0';
      tempWrapper.style.overflow = 'visible';

      document.body.appendChild(tempWrapper);

      // Render the EXACT CvRenderer component with the specific resume data & template
      root = createRoot(tempWrapper);
      root.render(React.createElement(CvRenderer, { data: cv, scale: 1, isPrint: false }));

      // Allow React commit and layout engine to settle styles and fonts
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Wait for any embedded images (avatar, logo) to settle
      const imgElements = tempWrapper.querySelectorAll('img');
      if (imgElements.length > 0) {
        await Promise.all(
          Array.from(imgElements).map((img) => {
            if (img.complete) return Promise.resolve();
            return new Promise((resolve) => {
              img.onload = resolve;
              img.onerror = resolve;
              setTimeout(resolve, 400);
            });
          })
        );
      }

      let imgData: string | null = null;
      let imgWidthPx = 794;
      let imgHeightPx = 1123;

      // Primary rasterizer: html-to-image (uses native browser CSS & SVG foreignObject engine)
      try {
        const renderNode = (tempWrapper.firstElementChild as HTMLElement) || tempWrapper;
        imgData = await toPng(renderNode, {
          quality: 0.98,
          pixelRatio: 2,
          backgroundColor: '#ffffff',
          cacheBust: true,
          width: 794,
        });

        // Compute aspect ratio
        imgWidthPx = 794;
        imgHeightPx = renderNode.offsetHeight || 1123;
      } catch (htmlToImageErr) {
        console.warn('html-to-image rasterizer notice, attempting fallback to html2canvas:', htmlToImageErr);
        // Secondary rasterizer: html2canvas
        const canvas = await html2canvas(tempWrapper, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: '#ffffff',
          width: 794,
          windowWidth: 1200,
        });
        imgData = canvas.toDataURL('image/jpeg', 0.98);
        imgWidthPx = canvas.width;
        imgHeightPx = canvas.height;
      }

      if (!imgData) {
        throw new Error('Failed to generate image snapshot from preview DOM');
      }

      const pdfWidth = 210;
      const pdfHeight = 297;
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const imgWidthMm = pdfWidth;
      const imgHeightMm = (imgHeightPx * pdfWidth) / (imgWidthPx > 0 ? imgWidthPx : 794);

      let heightLeft = imgHeightMm;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidthMm, imgHeightMm, undefined, 'FAST');
      heightLeft -= pdfHeight;

      while (heightLeft > 3) {
        position = heightLeft - imgHeightMm;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidthMm, imgHeightMm, undefined, 'FAST');
        heightLeft -= pdfHeight;
      }

      // Download directly as PDF file
      pdf.save(filename);
      triggerReviewPrompt('cv_download', 1000);
      return true;
    } else {
      generateDirectJsPdf(cv, filename);
      return true;
    }
  } catch (err) {
    console.warn('Rasterized PDF export encountered an issue, generating template-specific vector PDF fallback:', err);
    try {
      generateDirectJsPdf(cv, filename);
      return true;
    } catch (fallbackError) {
      console.error('Direct PDF export failed:', fallbackError);
      return false;
    }
  } finally {
    if (root) {
      try {
        root.unmount();
      } catch (e) {
        // unmount non-blocking
      }
    }
    if (tempWrapper && tempWrapper.parentNode) {
      tempWrapper.parentNode.removeChild(tempWrapper);
    }
  }
}

/**
 * Exports CV data as formatted JSON backup file
 */
export function exportCvToJson(cv: ResumeData): void {
  const filename = getCvFilename(cv, 'json');
  const jsonStr = JSON.stringify(cv, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  triggerBlobDownload(blob, filename);
  triggerReviewPrompt('cv_download', 1000);
}

/**
 * Exports CV as plain text ATS-friendly format
 */
export function exportCvToTxt(cv: ResumeData): void {
  const filename = getCvFilename(cv, 'txt');
  const lines: string[] = [];

  const { personalInfo, summary, experience, education, skills, certifications, projects } = cv;

  lines.push('================================================================');
  lines.push(`${(personalInfo.fullName || 'RESUME').toUpperCase()}`);
  lines.push(`${personalInfo.jobTitle || ''}`);
  lines.push('================================================================');
  
  const contacts: string[] = [];
  if (personalInfo.email) contacts.push(`Email: ${personalInfo.email}`);
  if (personalInfo.phone) contacts.push(`Phone: ${personalInfo.phone}`);
  if (personalInfo.location) contacts.push(`Location: ${personalInfo.location}`);
  if (personalInfo.linkedin) contacts.push(`LinkedIn: ${personalInfo.linkedin}`);
  if (personalInfo.website) contacts.push(`Website: ${personalInfo.website}`);
  if (personalInfo.github) contacts.push(`GitHub: ${personalInfo.github}`);

  if (contacts.length > 0) {
    lines.push(contacts.join(' | '));
    lines.push('');
  }

  if (summary) {
    lines.push('----------------------------------------------------------------');
    lines.push('PROFESSIONAL SUMMARY');
    lines.push('----------------------------------------------------------------');
    lines.push(summary);
    lines.push('');
  }

  if (experience && experience.length > 0) {
    lines.push('----------------------------------------------------------------');
    lines.push('WORK EXPERIENCE');
    lines.push('----------------------------------------------------------------');
    experience.forEach((exp) => {
      lines.push(`${exp.jobTitle} - ${exp.company} (${exp.location || ''})`);
      lines.push(`${exp.startDate} - ${exp.current ? 'Present' : exp.endDate || ''}`);
      if (exp.description) {
        lines.push(exp.description);
      }
      lines.push('');
    });
  }

  if (skills && skills.length > 0) {
    lines.push('----------------------------------------------------------------');
    lines.push('SKILLS & EXPERTISE');
    lines.push('----------------------------------------------------------------');
    const skillsList = skills.map((s) => `${s.name}${s.level ? ` (${s.level})` : ''}`).join(', ');
    lines.push(skillsList);
    lines.push('');
  }

  if (education && education.length > 0) {
    lines.push('----------------------------------------------------------------');
    lines.push('EDUCATION');
    lines.push('----------------------------------------------------------------');
    education.forEach((edu) => {
      lines.push(`${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}`);
      lines.push(`${edu.school} (${edu.startDate || ''} - ${edu.endDate || ''})`);
      if (edu.description) lines.push(edu.description);
      lines.push('');
    });
  }

  if (certifications && certifications.length > 0) {
    lines.push('----------------------------------------------------------------');
    lines.push('CERTIFICATIONS');
    lines.push('----------------------------------------------------------------');
    certifications.forEach((c) => {
      lines.push(`${c.name} - ${c.issuer} (${c.date || ''})`);
    });
    lines.push('');
  }

  if (projects && projects.length > 0) {
    lines.push('----------------------------------------------------------------');
    lines.push('PROJECTS');
    lines.push('----------------------------------------------------------------');
    projects.forEach((p) => {
      lines.push(`${p.title}${p.link ? ` (${p.link})` : ''}`);
      if (p.description) lines.push(p.description);
      lines.push('');
    });
  }

  const textContent = lines.join('\n');
  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
  triggerBlobDownload(blob, filename);
  triggerReviewPrompt('cv_download', 1000);
}

/**
 * Triggers browser print dialog when explicitly requested by user
 */
export function printCv(): void {
  try {
    window.print();
    triggerReviewPrompt('cv_download', 1500);
  } catch (err) {
    console.error('Print trigger failed', err);
  }
}
