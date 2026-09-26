import type { TeamMember } from '../types';

export const team: TeamMember[] = [
  {
    id: '1',
    name: 'Mehak Rohilla',
    role: 'Frontend & UI Developer',
    initials: 'MR',
    bio: 'Specializes in crafting responsive web interfaces, design systems, and frontend applications with a strong focus on usability.',
    skills: ['Frontend Engineering', 'UI/UX Design', 'React & TypeScript', 'Design Systems', 'Responsive Web'],
    github: undefined,
    linkedin: undefined,
    twitter: undefined,
    order: 1,
    published: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Gopal Mishra',
    role: 'Full-Stack Developer',
    initials: 'GM',
    bio: 'Focuses on web application architecture, backend logic, API design, and building web products from ground up.',
    skills: ['Full-Stack Engineering', 'Backend APIs', 'Node.js & Databases', 'System Architecture', 'Web Applications'],
    github: undefined,
    linkedin: undefined,
    twitter: undefined,
    order: 2,
    published: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
];
