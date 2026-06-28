export interface Project {
  id: string;
  title: string;
  client: string;
  year: string;
  tags: string[];
  color: string;
  desc: string;
  link?: string;
}

export const PROJECTS: Project[] = [
  { 
    id: 'mercury-pack', 
    title: 'Mercury Pack', 
    client: 'Resource', 
    year: '2026', 
    tags: ['ASSETS', 'RESOURCE'], 
    color: '#88ccff', 
    desc: 'Mercury Pack resource folder.',
    link: 'https://drive.google.com/drive/folders/1knRmAjGq57T-vK7albQl4_DzhfqF8mVo'
  }
];
