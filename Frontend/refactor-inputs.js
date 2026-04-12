const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'components');
const filesToProcess = ['SignUp.jsx', 'ProfilePage.jsx', 'ScheduleAppointment.jsx', 'ProviderSelection.jsx', 'PaymentConfirmation.jsx', 'DietRecommendation.jsx', 'AppointmentConfirmed.jsx', 'Near_By_Hospitals.jsx'];

filesToProcess.forEach(file => {
  const filePath = path.join(srcDir, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  // Add imports
  if (content.includes('<input') || content.includes('<select')) {
    if (!content.includes('CustomInput')) {
      content = content.replace(/(import React.*?;\n)/, '$1import CustomInput from "./CustomInput";\nimport CustomSelect from "./CustomSelect";\n');
      modified = true;
    }
  }

  // Replace <input (skip type="checkbox", type="radio", type="file" if needed, but we can replace basic text inputs)
  // Basic regex to replace <input with <CustomInput avoiding checkbox/radio
  const inputRegex = /<input([^>]*?(?:type="text"|type="email"|type="password"|type="tel"|type="number"|type="date"|type="time"|type="search")[^>]*?|(?![^>]*?type="checkbox"|type="radio"|type="file")[^>]*?)>/g;
  
  if (inputRegex.test(content)) {
    content = content.replace(inputRegex, '<CustomInput$1>');
    modified = true;
  }
  
  // Replace <select> ... </select> with <CustomSelect> ... </CustomSelect>
  if (content.includes('<select') && !content.includes('<select name="role"')) {
      // It's safer to just replace all <select and </select> that aren't already custom
      content = content.replace(/<select/g, '<CustomSelect');
      content = content.replace(/<\/select>/g, '</CustomSelect>');
      modified = true;
  }

  // Also replace form-group with custom-form-container where appropriate if keeping labels 
  // Let's just handle component replacement first.

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
});
