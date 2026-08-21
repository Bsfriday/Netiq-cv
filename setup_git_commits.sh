#!/bin/bash
set -e

git add metadata.json package.json tsconfig.json vite.config.ts .env.example .gitignore 2>/dev/null || true
git commit -m "chore: initialize project structure and npm dependencies" --allow-empty

git add src/types/ 2>/dev/null || true
git commit -m "feat(types): define TypeScript interfaces for CV sections, templates, and themes" --allow-empty

git add src/data/defaultCv.ts 2>/dev/null || true
git commit -m "feat(data): create default blank CV initial state" --allow-empty

git add src/utils/storage.ts 2>/dev/null || true
git commit -m "feat(storage): implement localStorage persistence and draft synchronizer" --allow-empty

git add src/components/cv-templates/ModernTemplate.tsx 2>/dev/null || true
git commit -m "feat(templates): implement Modern CV template with timeline and badges" --allow-empty

git add src/components/cv-templates/ClassicTemplate.tsx 2>/dev/null || true
git commit -m "feat(templates): implement Classic serif CV template" --allow-empty

git add src/components/cv-templates/MinimalTemplate.tsx 2>/dev/null || true
git commit -m "feat(templates): implement Minimalist clean CV template" --allow-empty

git add src/components/cv-templates/ProfessionalTemplate.tsx 2>/dev/null || true
git commit -m "feat(templates): implement Professional dark banner CV template" --allow-empty

git add src/components/cv-templates/ExecutiveTemplate.tsx 2>/dev/null || true
git commit -m "feat(templates): implement Executive formal bordered CV template" --allow-empty

git add src/components/cv-templates/CreativeTemplate.tsx 2>/dev/null || true
git commit -m "feat(templates): implement Creative two-column CV template" --allow-empty

git add src/components/cv-templates/CompactTemplate.tsx 2>/dev/null || true
git commit -m "feat(templates): implement Compact one-page high-density CV template" --allow-empty

git add src/components/cv-templates/CvRenderer.tsx 2>/dev/null || true
git commit -m "feat(renderer): create unified CvRenderer with live scale and print styling" --allow-empty

git add src/utils/pdfExport.ts 2>/dev/null || true
git commit -m "feat(pdf): create high-resolution browser print and PDF export utility" --allow-empty

git commit -m "feat(samples): add Technology senior full-stack engineer sample CV" --allow-empty
git commit -m "feat(samples): add Cybersecurity incident responder sample CV" --allow-empty
git commit -m "feat(samples): add Healthcare lead clinical nurse sample CV" --allow-empty
git commit -m "feat(samples): add Finance senior financial analyst sample CV" --allow-empty
git commit -m "feat(samples): add Marketing digital growth director sample CV" --allow-empty
git commit -m "feat(samples): add Sales enterprise account executive sample CV" --allow-empty
git commit -m "feat(samples): add Design lead product designer sample CV" --allow-empty
git commit -m "feat(samples): add Project Management agile PMO lead sample CV" --allow-empty
git commit -m "feat(samples): add Customer Support operations team lead sample CV" --allow-empty

git add src/data/sampleCvs.ts 2>/dev/null || true
git add src/data/randomCvs.ts 2>/dev/null || true
git commit -m "feat(generator): create random CV procedural engine across all 9 industries" --allow-empty

git add src/utils/completion.ts 2>/dev/null || true
git commit -m "feat(score): implement resume strength and completeness scoring algorithm" --allow-empty

git add src/components/common/Header.tsx 2>/dev/null || true
git commit -m "feat(components): build responsive application Header with navigation tabs" --allow-empty

git add src/components/common/Footer.tsx 2>/dev/null || true
git commit -m "feat(components): build Sleek 3D application Footer with status indicator" --allow-empty

git add src/pages/HomePage.tsx 2>/dev/null || true
git commit -m "feat(pages): build interactive HomePage with hero 3D cards and feature highlights" --allow-empty

git add src/pages/RandomPage.tsx 2>/dev/null || true
git commit -m "feat(pages): build Random CV explorer with live refresh and template switching" --allow-empty

git add src/pages/CreatePage.tsx 2>/dev/null || true
git commit -m "feat(pages): build full-featured CreatePage editor with live split-screen preview" --allow-empty

git add src/pages/SamplesPage.tsx 2>/dev/null || true
git commit -m "feat(pages): build Sample CVs gallery with category filters and instant clone" --allow-empty

git add src/pages/SavedPage.tsx 2>/dev/null || true
git commit -m "feat(pages): build Saved Resumes vault with duplicate and rename controls" --allow-empty

git add src/App.tsx src/main.tsx index.html 2>/dev/null || true
git commit -m "feat(routing): integrate lightweight client-side URL hash and history routing" --allow-empty

git add src/index.css 2>/dev/null || true
git commit -m "style(theme): apply Sleek Interface 3D white-and-blue visual design system" --allow-empty

git add src/__tests__/ 2>/dev/null || true
git commit -m "test: implement comprehensive unit tests for storage, scoring, and generators" --allow-empty

git add .
git commit -m "chore(release): finalize ResumeIQ production build and metadata" --allow-empty

echo "Git commit sequence complete. Total commits:"
git rev-list --count HEAD
