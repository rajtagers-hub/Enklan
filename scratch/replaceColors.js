const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(dir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Tailwind class replacements
  content = content.replace(/orange-400/g, 'blue-400');
  content = content.replace(/orange-500/g, 'blue-500');
  content = content.replace(/orange-600/g, 'blue-800'); // navy blue
  content = content.replace(/orange-700/g, 'blue-900');
  
  // Hex replacements for Logo.tsx
  content = content.replace(/#F97316/gi, '#2563EB'); // blue-600
  content = content.replace(/#FB923C/gi, '#3B82F6'); // blue-500
  content = content.replace(/#EA580C/gi, '#1E40AF'); // blue-800
  content = content.replace(/#9A3412/gi, '#1E3A8A'); // blue-900
  
  fs.writeFileSync(file, content, 'utf8');
});

console.log("Colors updated to Navy Blue!");
