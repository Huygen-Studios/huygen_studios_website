export interface Project {
  id: string;
  title: string;
  client: string;
  year: string;
  tags: string[];
  color: string;
  desc: string;
}

export const PROJECTS: Project[] = [
  { id: 'p1', title: 'AI Compass', client: 'Google', year: '2024', tags: ['3D', 'MOTION', 'WEBSITE'], color: '#b86a28', desc: 'A cutting-edge digital experience for the AI Compass project, navigating the future of artificial intelligence with immersive 3D storytelling and bold visual design.' },
  { id: 'p2', title: 'Free Spirits', client: 'Netflix', year: '2024', tags: ['EXPERIENCE', 'BRAND'], color: '#6b1010', desc: 'An ethereal brand experience blending cinematic visuals with interactive digital art, created for a landmark Netflix campaign.' },
  { id: 'p3', title: 'Visitor Guide', client: 'Google', year: '2025', tags: ['3D', 'WEBSITE', 'EVENT'], color: '#1e3d7a', desc: 'A transformative visitor experience guide that reimagines how people discover and navigate a creative campus through digital-first design.' },
  { id: 'p4', title: 'Pixel 9 Pro', client: 'Google', year: '2024', tags: ['PRODUCT', '3D', 'CAMPAIGN'], color: '#d0d0d0', desc: 'A photorealistic 3D product showcase for the Google Pixel 9 Pro, featuring smooth interactive storytelling and premium visual language.' },
  { id: 'p5', title: 'Petra', client: 'Google', year: '2024', tags: ['MUSIC', 'MOTION', 'BRAND'], color: '#2a0808', desc: 'A bold visual identity blending cultural heritage with modern digital aesthetics for an award-winning brand experience.' },
  { id: 'p6', title: 'Blue Spirits', client: 'DIAGEO', year: '2025', tags: ['PRODUCT', '3D', 'BRAND'], color: '#0e2a38', desc: 'An immersive digital campaign featuring liquid simulations and cinematic storytelling for a premium spirits range.' },
  { id: 'p7', title: 'Alocasia', client: 'DIAGEO', year: '2024', tags: ['MOTION', 'BRAND', 'CAMPAIGN'], color: '#152508', desc: 'A nature-inspired campaign blending organic motion with premium brand aesthetics for a botanical spirits collection.' },
  { id: 'p8', title: 'Judas Priest', client: 'Live Nation', year: '2024', tags: ['MUSIC', 'EXPERIENCE', '3D'], color: '#160018', desc: 'A legendary tribute digital experience celebrating 50 years of heavy metal with immersive visual storytelling and dynamic 3D.' },
  { id: 'p9', title: 'New Way to Cloud', client: 'Google Cloud', year: '2025', tags: ['BRAND', 'MOTION', 'CAMPAIGN'], color: '#051222', desc: 'The New Way to Cloud campaign reimagined with bold typography and kinetic motion design for a global audience.' },
  { id: 'p10', title: 'The Ambos', client: 'DIAGEO', year: '2025', tags: ['PRODUCT', 'BRAND', '3D'], color: '#221408', desc: 'A premium digital experience featuring immersive product visualization for a distinguished spirits range.' },
  { id: 'p11', title: 'SOUND:AI', client: 'Phantom', year: '2025', tags: ['AUDIO', 'AI', 'EXPERIENCE'], color: '#2a0030', desc: 'An experimental audio-visual installation powered by AI, creating unique soundscapes responding to user behavior in real time.' },
  { id: 'p12', title: 'Stellar Maps', client: 'ESA', year: '2024', tags: ['3D', 'DATA', 'SCIENCE'], color: '#00051a', desc: 'An interactive star map visualization letting users explore millions of celestial objects across the observable universe.' },
  { id: 'p13', title: 'Motion Type', client: 'Pentagram', year: '2025', tags: ['TYPE', 'MOTION', 'BRAND'], color: '#080808', desc: 'A typographic motion study exploring the relationship between letterforms, time, and digital space.' },
  { id: 'p14', title: 'Synthetic Nature', client: 'Adidas', year: '2025', tags: ['PRODUCT', '3D', 'SUSTAIN'], color: '#082008', desc: 'A sustainable materials campaign blending organic aesthetics with cutting-edge 3D craft for a new collection.' },
  { id: 'p15', title: 'Neural Canvas', client: 'Adobe', year: '2024', tags: ['AI', 'CREATIVE', 'TOOLS'], color: '#200808', desc: 'A creative AI toolset showcase demonstrating the future of AI-assisted creative work with beautiful interactive demos.' },
  { id: 'p16', title: 'Depth Charge', client: 'Red Bull', year: '2025', tags: ['EXPERIENCE', 'SPORT', '3D'], color: '#130800', desc: 'An extreme sports digital experience plunging viewers into the depths of underwater action and high-performance culture.' },
  { id: 'p17', title: 'Chromatic Dream', client: 'Spotify', year: '2024', tags: ['MUSIC', 'VISUAL', 'BRAND'], color: '#001800', desc: 'A visual music experience translating audio frequencies into a mesmerizing chromatic journey through sound and light.' },
  { id: 'p18', title: 'Phantom World', client: 'Internal', year: '2025', tags: ['IDENTITY', 'BRAND', 'WEB'], color: '#0d0d0d', desc: 'A self-initiated exploration of identity, space, and the boundaries of digital experience design.' },
];
