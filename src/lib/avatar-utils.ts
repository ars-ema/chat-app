// Utility functions for generating user avatars

export function generateUserAvatar(name: string, size: number = 40): string {
  // Create a simple avatar using the user's initials and a color based on their name
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  // Generate a consistent color based on the name
  const colors = [
    '#8B4513', '#A0522D', '#D2B48C', '#DEB887', '#F5DEB3',
    '#CD853F', '#D2691E', '#BC8F8F', '#F4A460', '#DAA520',
    '#B8860B', '#DDA0DD', '#98FB98', '#F0E68C', '#FFB6C1'
  ]
  
  const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length
  const backgroundColor = colors[colorIndex]
  
  // Create SVG avatar with a subtle gradient effect
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-${name.replace(/\s+/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${backgroundColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${adjustColor(backgroundColor, -20)};stop-opacity:1" />
        </linearGradient>
      </defs>
      <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="url(#grad-${name.replace(/\s+/g, '')})"/>
      <circle cx="${size/2}" cy="${size/2}" r="${size/2-1}" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
      <text x="50%" y="50%" text-anchor="middle" dy="0.35em" fill="white" font-family="Arial, sans-serif" font-size="${size/3}" font-weight="bold">
        ${initials}
      </text>
    </svg>
  `
  
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

function adjustColor(color: string, amount: number): string {
  const num = parseInt(color.replace("#", ""), 16)
  const r = Math.max(0, Math.min(255, ((num >> 16) & 255) + amount))
  const g = Math.max(0, Math.min(255, ((num >> 8) & 255) + amount))
  const b = Math.max(0, Math.min(255, (num & 255) + amount))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

export function getUserDisplayName(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

export function getUserColor(name: string): string {
  const colors = [
    '#8B4513', '#A0522D', '#D2B48C', '#DEB887', '#F5DEB3',
    '#CD853F', '#D2691E', '#BC8F8F', '#F4A460', '#DAA520'
  ]
  
  const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length
  return colors[colorIndex]
}
