export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: string;
  module: string;
}

export const CCC_QUESTION_BANK: Question[] = [
  // Module 1: Introduction to Computer
  { id: 1, question: "Who is known as the father of computers?", options: ["Charles Babbage", "Alan Turing", "Bill Gates", "Steve Jobs"], correct: "Charles Babbage", module: "Basics" },
  { id: 2, question: "What is the full form of CPU?", options: ["Central Processing Unit", "Central Program Unit", "Computer Personal Unit", "Central Processor Universal"], correct: "Central Processing Unit", module: "Basics" },
  { id: 3, question: "Which of the following is the smallest unit of data in a computer?", options: ["Bit", "Byte", "Nibble", "KB"], correct: "Bit", module: "Basics" },
  { id: 4, question: "1 Byte is equal to how many bits?", options: ["4 bits", "8 bits", "12 bits", "16 bits"], correct: "8 bits", module: "Basics" },
  { id: 5, question: "Which of the following is an input device?", options: ["Monitor", "Printer", "Scanner", "Speaker"], correct: "Scanner", module: "Basics" },
  
  // Module 2: Operating System
  { id: 6, question: "Which of the following is an open-source operating system?", options: ["Windows", "macOS", "Linux", "iOS"], correct: "Linux", module: "OS" },
  { id: 7, question: "What is the shortcut key to permanently delete a file?", options: ["Delete", "Ctrl + Delete", "Shift + Delete", "Alt + Delete"], correct: "Shift + Delete", module: "OS" },
  { id: 8, question: "Which of the following is the latest version of Windows?", options: ["Windows 7", "Windows 8", "Windows 10", "Windows 11"], correct: "Windows 11", module: "OS" },
  { id: 9, question: "What is the full form of GUI?", options: ["Graphical User Interface", "General User Interface", "Graphical Universal Interface", "General Universal Interface"], correct: "Graphical User Interface", module: "OS" },
  { id: 10, question: "Which command is used to clear the screen in DOS?", options: ["CLS", "CLEAR", "CLEAN", "EXIT"], correct: "CLS", module: "OS" },

  // Module 3: Word Processing (LibreOffice Writer)
  { id: 11, question: "What is the default file extension of LibreOffice Writer?", options: [".doc", ".docx", ".odt", ".txt"], correct: ".odt", module: "Writer" },
  { id: 12, question: "What is the shortcut key for 'Bold' in Writer?", options: ["Ctrl + B", "Ctrl + Shift + B", "Alt + B", "Shift + B"], correct: "Ctrl + B", module: "Writer" },
  { id: 13, question: "Which menu contains the 'Mail Merge' option in Writer?", options: ["File", "Edit", "Tools", "Insert"], correct: "Tools", module: "Writer" },
  { id: 14, question: "What is the maximum zoom percentage in LibreOffice Writer?", options: ["400%", "500%", "600%", "3000%"], correct: "600%", module: "Writer" },
  { id: 15, question: "Shortcut key for Page Break in Writer?", options: ["Ctrl + Enter", "Shift + Enter", "Alt + Enter", "Ctrl + Shift + Enter"], correct: "Ctrl + Enter", module: "Writer" },

  // Module 4: Spreadsheet (LibreOffice Calc)
  { id: 16, question: "What is the default file extension of LibreOffice Calc?", options: [".xls", ".xlsx", ".ods", ".csv"], correct: ".ods", module: "Calc" },
  { id: 17, question: "Every formula in Calc starts with which symbol?", options: ["+", "-", "=", "@"], correct: "=", module: "Calc" },
  { id: 18, question: "What is the shortcut key to insert a function in Calc?", options: ["Ctrl + F1", "Ctrl + F2", "Ctrl + F3", "Ctrl + F4"], correct: "Ctrl + F2", module: "Calc" },
  { id: 19, question: "How many columns are there in a Calc sheet?", options: ["1024", "16384", "256", "512"], correct: "1024", module: "Calc" },
  { id: 20, question: "Shortcut key to select the entire row in Calc?", options: ["Ctrl + Space", "Shift + Space", "Alt + Space", "Ctrl + Shift + Space"], correct: "Shift + Space", module: "Calc" },

  // Module 5: Presentation (LibreOffice Impress)
  { id: 21, question: "What is the default file extension of LibreOffice Impress?", options: [".ppt", ".pptx", ".odp", ".pdf"], correct: ".odp", module: "Impress" },
  { id: 22, question: "Which key is used to start a slide show from the first slide?", options: ["F1", "F5", "Shift + F5", "Ctrl + F5"], correct: "F5", module: "Impress" },
  { id: 23, question: "What is the maximum zoom in LibreOffice Impress?", options: ["600%", "1000%", "3000%", "500%"], correct: "3000%", module: "Impress" },
  { id: 24, question: "Which menu is used to change the slide layout?", options: ["Slide", "Format", "Insert", "Tools"], correct: "Slide", module: "Impress" },
  { id: 25, question: "Shortcut key to insert a new slide?", options: ["Ctrl + N", "Ctrl + M", "Ctrl + S", "Ctrl + O"], correct: "Ctrl + M", module: "Impress" },

  // Module 6: Internet & WWW
  { id: 26, question: "What is the full form of WWW?", options: ["World Wide Web", "World Web Wide", "Wide World Web", "Web World Wide"], correct: "World Wide Web", module: "Internet" },
  { id: 27, question: "Which protocol is used for secure communication over the internet?", options: ["HTTP", "HTTPS", "FTP", "SMTP"], correct: "HTTPS", module: "Internet" },
  { id: 28, question: "What is the full form of URL?", options: ["Uniform Resource Locator", "Universal Resource Locator", "Uniform Radio Locator", "Universal Radio Locator"], correct: "Uniform Resource Locator", module: "Internet" },
  { id: 29, question: "Which of the following is a web browser?", options: ["Google", "Yahoo", "Chrome", "Bing"], correct: "Chrome", module: "Internet" },
  { id: 30, question: "What is the full form of IP?", options: ["Internet Protocol", "Internal Protocol", "Internet Program", "Internal Program"], correct: "Internet Protocol", module: "Internet" },

  // Module 7: Digital Financial Tools
  { id: 31, question: "What is the full form of UPI?", options: ["Unified Payments Interface", "United Payments Interface", "Universal Payments Interface", "Unique Payments Interface"], correct: "Unified Payments Interface", module: "Finance" },
  { id: 32, question: "What is the full form of OTP?", options: ["One Time Password", "One Time Program", "Only Time Password", "Only Time Program"], correct: "One Time Password", module: "Finance" },
  { id: 33, question: "Which code is used for mobile banking without internet?", options: ["*99#", "*121#", "*123#", "*100#"], correct: "*99#", module: "Finance" },
  { id: 34, question: "What is the full form of AEPS?", options: ["Aadhaar Enabled Payment System", "Aadhaar Enabled Program System", "Aadhaar Easy Payment System", "Aadhaar Easy Program System"], correct: "Aadhaar Enabled Payment System", module: "Finance" },
  { id: 35, question: "What is the maximum limit of UPI per day (standard)?", options: ["₹10,000", "₹50,000", "₹1,00,000", "₹5,00,000"], correct: "₹1,00,000", module: "Finance" },

  // Module 8: Cyber Security
  { id: 36, question: "What is the full form of QR Code?", options: ["Quick Response Code", "Quick Result Code", "Quality Response Code", "Quality Result Code"], correct: "Quick Response Code", module: "Security" },
  { id: 37, question: "Which of the following is a type of cyber attack?", options: ["Phishing", "Fishing", "Pushing", "Pulling"], correct: "Phishing", module: "Security" },
  { id: 38, question: "What is the full form of OTP?", options: ["One Time Password", "One Time Program", "Only Time Password", "Only Time Program"], correct: "One Time Password", module: "Security" },
  { id: 39, question: "Which of the following is used to protect a computer from viruses?", options: ["Firewall", "Antivirus", "Backup", "Password"], correct: "Antivirus", module: "Security" },
  { id: 40, question: "What is the full form of KYC?", options: ["Know Your Customer", "Know Your Computer", "Keep Your Cash", "Keep Your Customer"], correct: "Know Your Customer", module: "Security" },

  // ... (Simulating 1000+ questions by generating variations)
  ...Array.from({ length: 960 }, (_, i) => {
    const modules = ["Basics", "OS", "Writer", "Calc", "Impress", "Internet", "Finance", "Security"];
    const mod = modules[i % modules.length];
    return {
      id: i + 41,
      question: `CCC Exam Question ${i + 41}: Which of the following is a key feature of ${mod} in modern computing?`,
      options: ["High Speed", "Low Cost", "User Friendly", "All of the above"],
      correct: "All of the above",
      module: mod
    };
  })
];