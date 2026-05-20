export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: string;
  module: string;
}

export const CCC_QUESTION_BANK: Question[] = [
  // Module 1: Introduction to Computer (Basics)
  { id: 1, question: "Who is known as the father of computers?", options: ["Charles Babbage", "Alan Turing", "Bill Gates", "Steve Jobs"], correct: "Charles Babbage", module: "Basics" },
  { id: 2, question: "What is the full form of CPU?", options: ["Central Processing Unit", "Central Program Unit", "Computer Personal Unit", "Central Processor Universal"], correct: "Central Processing Unit", module: "Basics" },
  { id: 3, question: "Which of the following is the smallest unit of data in a computer?", options: ["Bit", "Byte", "Nibble", "KB"], correct: "Bit", module: "Basics" },
  { id: 4, question: "1 Byte is equal to how many bits?", options: ["4 bits", "8 bits", "12 bits", "16 bits"], correct: "8 bits", module: "Basics" },
  { id: 5, question: "Which of the following is an input device?", options: ["Monitor", "Printer", "Scanner", "Speaker"], correct: "Scanner", module: "Basics" },
  { id: 41, question: "Which memory is volatile in nature?", options: ["RAM", "ROM", "PROM", "EPROM"], correct: "RAM", module: "Basics" },
  { id: 42, question: "What is the full form of ALU?", options: ["Arithmetic Logic Unit", "Array Logic Unit", "Application Logic Unit", "Arithmetic Layer Unit"], correct: "Arithmetic Logic Unit", module: "Basics" },
  { id: 43, question: "Which generation of computers used Vacuum Tubes?", options: ["First", "Second", "Third", "Fourth"], correct: "First", module: "Basics" },
  { id: 44, question: "1 Terabyte (TB) is equal to?", options: ["1024 GB", "1024 MB", "1024 KB", "1000 GB"], correct: "1024 GB", module: "Basics" },
  { id: 45, question: "Which of the following is an example of System Software?", options: ["Operating System", "MS Word", "Chrome", "Tally"], correct: "Operating System", module: "Basics" },
  { id: 46, question: "What is the full form of BIOS?", options: ["Basic Input Output System", "Binary Input Output System", "Basic Interface Output System", "Basic Input Output Service"], correct: "Basic Input Output System", module: "Basics" },
  { id: 47, question: "Which part of the computer is considered its brain?", options: ["CPU", "Monitor", "Keyboard", "Hard Disk"], correct: "CPU", module: "Basics" },

  // Module 2: Operating System (OS)
  { id: 6, question: "Which of the following is an open-source operating system?", options: ["Windows", "macOS", "Linux", "iOS"], correct: "Linux", module: "OS" },
  { id: 7, question: "What is the shortcut key to permanently delete a file?", options: ["Delete", "Ctrl + Delete", "Shift + Delete", "Alt + Delete"], correct: "Shift + Delete", module: "OS" },
  { id: 8, question: "Which of the following is the latest version of Windows?", options: ["Windows 7", "Windows 8", "Windows 10", "Windows 11"], correct: "Windows 11", module: "OS" },
  { id: 9, question: "What is the full form of GUI?", options: ["Graphical User Interface", "General User Interface", "Graphical Universal Interface", "General Universal Interface"], correct: "Graphical User Interface", module: "OS" },
  { id: 10, question: "Which command is used to clear the screen in DOS?", options: ["CLS", "CLEAR", "CLEAN", "EXIT"], correct: "CLS", module: "OS" },
  { id: 48, question: "What is the shortcut key to rename a selected file in Windows?", options: ["F1", "F2", "F3", "F4"], correct: "F2", module: "OS" },
  { id: 49, question: "Which of the following is not an operating system?", options: ["Windows", "Linux", "Oracle", "DOS"], correct: "Oracle", module: "OS" },
  { id: 50, question: "What is the shortcut key to open the Task Manager in Windows?", options: ["Ctrl+Alt+Del", "Ctrl+Shift+Esc", "Alt+F4", "Ctrl+Esc"], correct: "Ctrl+Shift+Esc", module: "OS" },
  { id: 51, question: "Which file system is used by Windows 10?", options: ["FAT32", "NTFS", "EXT4", "HFS"], correct: "NTFS", module: "OS" },
  { id: 52, question: "What is the shortcut key to lock your Windows PC?", options: ["Win + L", "Win + D", "Win + E", "Win + R"], correct: "Win + L", module: "OS" },
  { id: 53, question: "Which of the following is a multi-user operating system?", options: ["Unix", "MS-DOS", "Windows 95", "Windows 98"], correct: "Unix", module: "OS" },

  // Module 3: Word Processing (Writer)
  { id: 11, question: "What is the default file extension of LibreOffice Writer?", options: [".doc", ".docx", ".odt", ".txt"], correct: ".odt", module: "Writer" },
  { id: 12, question: "What is the shortcut key for 'Bold' in Writer?", options: ["Ctrl + B", "Ctrl + Shift + B", "Alt + B", "Shift + B"], correct: "Ctrl + B", module: "Writer" },
  { id: 13, question: "Which menu contains the 'Mail Merge' option in Writer?", options: ["File", "Edit", "Tools", "Insert"], correct: "Tools", module: "Writer" },
  { id: 14, question: "What is the maximum zoom percentage in LibreOffice Writer?", options: ["400%", "500%", "600%", "3000%"], correct: "600%", module: "Writer" },
  { id: 15, question: "Shortcut key for Page Break in Writer?", options: ["Ctrl + Enter", "Shift + Enter", "Alt + Enter", "Ctrl + Shift + Enter"], correct: "Ctrl + Enter", module: "Writer" },
  { id: 54, question: "What is the shortcut key for 'Save As' in LibreOffice Writer?", options: ["Ctrl+S", "Ctrl+Shift+S", "F12", "Alt+S"], correct: "Ctrl+Shift+S", module: "Writer" },
  { id: 55, question: "Which shortcut key is used for 'Center Alignment' in Writer?", options: ["Ctrl+C", "Ctrl+E", "Ctrl+L", "Ctrl+R"], correct: "Ctrl+E", module: "Writer" },
  { id: 56, question: "What is the shortcut key for 'Spell Check' in Writer?", options: ["F5", "F7", "Shift+F7", "Ctrl+F7"], correct: "F7", module: "Writer" },
  { id: 57, question: "Which menu is used to insert a Header in Writer?", options: ["Format", "Insert", "Tools", "View"], correct: "Insert", module: "Writer" },
  { id: 58, question: "What is the shortcut key to close the current document in Writer?", options: ["Ctrl+W", "Ctrl+Q", "Alt+F4", "Ctrl+X"], correct: "Ctrl+W", module: "Writer" },
  { id: 59, question: "Which of the following is not a valid font style in Writer?", options: ["Bold", "Italic", "Regular", "Superscript"], correct: "Superscript", module: "Writer" },

  // Module 4: Spreadsheet (Calc)
  { id: 16, question: "What is the default file extension of LibreOffice Calc?", options: [".xls", ".xlsx", ".ods", ".csv"], correct: ".ods", module: "Calc" },
  { id: 17, question: "Every formula in Calc starts with which symbol?", options: ["+", "-", "=", "@"], correct: "=", module: "Calc" },
  { id: 18, question: "What is the shortcut key to insert a function in Calc?", options: ["Ctrl + F1", "Ctrl + F2", "Ctrl + F3", "Ctrl + F4"], correct: "Ctrl + F2", module: "Calc" },
  { id: 19, question: "How many columns are there in a Calc sheet?", options: ["1024", "16384", "256", "512"], correct: "1024", module: "Calc" },
  { id: 20, question: "Shortcut key to select the entire row in Calc?", options: ["Ctrl + Space", "Shift + Space", "Alt + Space", "Ctrl + Shift + Space"], correct: "Shift + Space", module: "Calc" },
  { id: 60, question: "What is the shortcut key to insert a new sheet in Calc?", options: ["Ctrl+F1", "Shift+F11", "Ctrl+N", "Alt+I"], correct: "Shift+F11", module: "Calc" },
  { id: 61, question: "Which function is used to find the largest value in a range in Calc?", options: ["LARGE()", "MAX()", "HIGH()", "TOP()"], correct: "MAX()", module: "Calc" },
  { id: 62, question: "What is the shortcut key to format cells in Calc?", options: ["Ctrl+1", "Ctrl+F", "Alt+F", "Shift+1"], correct: "Ctrl+1", module: "Calc" },
  { id: 63, question: "Which symbol is used for absolute cell referencing in Calc?", options: ["#", "@", "$", "&"], correct: "$", module: "Calc" },
  { id: 64, question: "What is the shortcut key to delete a cell in Calc?", options: ["Delete", "Ctrl + Minus (-)", "Ctrl + Plus (+)", "Backspace"], correct: "Ctrl + Minus (-)", module: "Calc" },
  { id: 65, question: "How many rows are there in a LibreOffice Calc sheet?", options: ["65536", "1048576", "1000000", "16384"], correct: "1048576", module: "Calc" },

  // Module 5: Presentation (Impress)
  { id: 21, question: "What is the default file extension of LibreOffice Impress?", options: [".ppt", ".pptx", ".odp", ".pdf"], correct: ".odp", module: "Impress" },
  { id: 22, question: "Which key is used to start a slide show from the first slide?", options: ["F1", "F5", "Shift + F5", "Ctrl + F5"], correct: "F5", module: "Impress" },
  { id: 23, question: "What is the maximum zoom in LibreOffice Impress?", options: ["600%", "1000%", "3000%", "500%"], correct: "3000%", module: "Impress" },
  { id: 24, question: "Which menu is used to change the slide layout?", options: ["Slide", "Format", "Insert", "Tools"], correct: "Slide", module: "Impress" },
  { id: 25, question: "Shortcut key to insert a new slide?", options: ["Ctrl + N", "Ctrl + M", "Ctrl + S", "Ctrl + O"], correct: "Ctrl + M", module: "Impress" },
  { id: 66, question: "What is the shortcut key to end a slide show?", options: ["Esc", "End", "Ctrl+Q", "Alt+F4"], correct: "Esc", module: "Impress" },
  { id: 67, question: "Which view is used to see all slides at once in Impress?", options: ["Normal", "Outline", "Slide Sorter", "Notes"], correct: "Slide Sorter", module: "Impress" },
  { id: 68, question: "What is the shortcut key to start a slide show from the current slide?", options: ["F5", "Shift+F5", "Ctrl+F5", "Alt+F5"], correct: "Shift+F5", module: "Impress" },
  { id: 69, question: "Which menu contains the 'Slide Transition' option?", options: ["Slide", "Format", "View", "Tools"], correct: "Slide", module: "Impress" },
  { id: 70, question: "What is the shortcut key to duplicate a slide in Impress?", options: ["Ctrl+D", "Ctrl+C", "Ctrl+M", "Alt+D"], correct: "Ctrl+D", module: "Impress" },
  { id: 71, question: "Which of the following is not a valid slide transition in Impress?", options: ["Wipe", "Fade", "Fly In", "Spin"], correct: "Spin", module: "Impress" },

  // Module 6: Internet & WWW
  { id: 26, question: "What is the full form of WWW?", options: ["World Wide Web", "World Web Wide", "Wide World Web", "Web World Wide"], correct: "World Wide Web", module: "Internet" },
  { id: 27, question: "Which protocol is used for secure communication over the internet?", options: ["HTTP", "HTTPS", "FTP", "SMTP"], correct: "HTTPS", module: "Internet" },
  { id: 28, question: "What is the full form of URL?", options: ["Uniform Resource Locator", "Universal Resource Locator", "Uniform Radio Locator", "Universal Radio Locator"], correct: "Uniform Resource Locator", module: "Internet" },
  { id: 29, question: "Which of the following is a web browser?", options: ["Google", "Yahoo", "Chrome", "Bing"], correct: "Chrome", module: "Internet" },
  { id: 30, question: "What is the full form of IP?", options: ["Internet Protocol", "Internal Protocol", "Internet Program", "Internal Program"], correct: "Internet Protocol", module: "Internet" },
  { id: 72, question: "What is the full form of DNS?", options: ["Domain Name System", "Data Name System", "Digital Name System", "Domain Network System"], correct: "Domain Name System", module: "Internet" },
  { id: 73, question: "Which protocol is used to send emails?", options: ["POP3", "IMAP", "SMTP", "HTTP"], correct: "SMTP", module: "Internet" },
  { id: 74, question: "What is the full form of ISP?", options: ["Internet Service Provider", "Internet Service Program", "Internal Service Provider", "Internet System Provider"], correct: "Internet Service Provider", module: "Internet" },
  { id: 75, question: "Which of the following is a search engine?", options: ["Chrome", "Firefox", "Google", "Safari"], correct: "Google", module: "Internet" },
  { id: 76, question: "What is the full form of HTML?", options: ["Hyper Text Markup Language", "Hyper Text Makeup Language", "High Text Markup Language", "Hyper Tech Markup Language"], correct: "Hyper Text Markup Language", module: "Internet" },
  { id: 77, question: "Which port is used by HTTP by default?", options: ["21", "25", "80", "443"], correct: "80", module: "Internet" },
  { id: 78, question: "What is the full form of FTP?", options: ["File Transfer Protocol", "File Text Protocol", "Fast Transfer Protocol", "File Transfer Program"], correct: "File Transfer Protocol", module: "Internet" },

  // Module 7: Digital Financial Tools (Finance)
  { id: 31, question: "What is the full form of UPI?", options: ["Unified Payments Interface", "United Payments Interface", "Universal Payments Interface", "Unique Payments Interface"], correct: "Unified Payments Interface", module: "Finance" },
  { id: 32, question: "What is the full form of OTP?", options: ["One Time Password", "One Time Program", "Only Time Password", "Only Time Program"], correct: "One Time Password", module: "Finance" },
  { id: 33, question: "Which code is used for mobile banking without internet?", options: ["*99#", "*121#", "*123#", "*100#"], correct: "*99#", module: "Finance" },
  { id: 34, question: "What is the full form of AEPS?", options: ["Aadhaar Enabled Payment System", "Aadhaar Enabled Program System", "Aadhaar Easy Payment System", "Aadhaar Easy Program System"], correct: "Aadhaar Enabled Payment System", module: "Finance" },
  { id: 35, question: "What is the maximum limit of UPI per day (standard)?", options: ["₹1,00,000", "₹50,000", "₹10,000", "₹5,00,000"], correct: "₹1,00,000", module: "Finance" },
  { id: 79, question: "What is the full form of NEFT?", options: ["National Electronic Funds Transfer", "National Electronic Finance Transfer", "Net Electronic Funds Transfer", "National Easy Funds Transfer"], correct: "National Electronic Funds Transfer", module: "Finance" },
  { id: 80, question: "What is the full form of RTGS?", options: ["Real Time Gross Settlement", "Real Time General Settlement", "Real Time Gross System", "Ready To Go Settlement"], correct: "Real Time Gross Settlement", module: "Finance" },
  { id: 81, question: "What is the full form of IMPS?", options: ["Immediate Payment Service", "Instant Money Payment Service", "Immediate Payment System", "Internal Money Payment Service"], correct: "Immediate Payment Service", module: "Finance" },
  { id: 82, question: "What is the full form of PAN?", options: ["Permanent Account Number", "Personal Account Number", "Public Account Number", "Private Account Number"], correct: "Permanent Account Number", module: "Finance" },
  { id: 83, question: "Which of the following is a digital locker provided by the Govt of India?", options: ["DigiLocker", "E-Locker", "GovLocker", "MyLocker"], correct: "DigiLocker", module: "Finance" },
  { id: 84, question: "What is the full form of BHIM?", options: ["Bharat Interface for Money", "Bharat Instant Money", "Bharat Interface Money", "Bharat Internal Money"], correct: "Bharat Interface for Money", module: "Finance" },
  { id: 85, question: "What is the full form of CVV in a debit card?", options: ["Card Verification Value", "Card Validity Value", "Card Verification Variable", "Code Verification Value"], correct: "Card Verification Value", module: "Finance" },

  // Module 8: Cyber Security (Security)
  { id: 36, question: "What is the full form of QR Code?", options: ["Quick Response Code", "Quick Result Code", "Quality Response Code", "Quality Result Code"], correct: "Quick Response Code", module: "Security" },
  { id: 37, question: "Which of the following is a type of cyber attack?", options: ["Phishing", "Fishing", "Pushing", "Pulling"], correct: "Phishing", module: "Security" },
  { id: 38, question: "What is the full form of OTP?", options: ["One Time Password", "One Time Program", "Only Time Password", "Only Time Program"], correct: "One Time Password", module: "Security" },
  { id: 39, question: "Which of the following is used to protect a computer from viruses?", options: ["Firewall", "Antivirus", "Backup", "Password"], correct: "Antivirus", module: "Security" },
  { id: 40, question: "What is the full form of KYC?", options: ["Know Your Customer", "Know Your Computer", "Keep Your Cash", "Keep Your Customer"], correct: "Know Your Customer", module: "Security" },
  { id: 86, question: "What is the full form of SSL?", options: ["Secure Sockets Layer", "Secure System Layer", "Simple Sockets Layer", "Secure Sockets Line"], correct: "Secure Sockets Layer", module: "Security" },
  { id: 87, question: "Which of the following is a strong password?", options: ["123456", "password", "Admin@123", "qwerty"], correct: "Admin@123", module: "Security" },
  { id: 88, question: "What is the full form of IDS in cyber security?", options: ["Intrusion Detection System", "Internal Detection System", "Intrusion Data System", "Intrusion Detection Service"], correct: "Intrusion Detection System", module: "Security" },
  { id: 89, question: "Which of the following is a type of malware that encrypts your files?", options: ["Virus", "Worm", "Ransomware", "Trojan"], correct: "Ransomware", module: "Security" },
  { id: 90, question: "What is the full form of VPN?", options: ["Virtual Private Network", "Virtual Public Network", "Visual Private Network", "Virtual Private Node"], correct: "Virtual Private Network", module: "Security" },
  { id: 91, question: "Which of the following is used to monitor network traffic?", options: ["Firewall", "Antivirus", "Router", "Switch"], correct: "Firewall", module: "Security" },
  { id: 92, question: "What is the full form of CAPTCHA?", options: ["Completely Automated Public Turing test to tell Computers and Humans Apart", "Completely Automated Private Turing test", "Computer Automated Public Turing test", "Completely Automated Public Text test"], correct: "Completely Automated Public Turing test to tell Computers and Humans Apart", module: "Security" },

  // Additional Mixed Questions to reach 100
  { id: 93, question: "What is the full form of USB?", options: ["Universal Serial Bus", "Universal System Bus", "Unique Serial Bus", "Universal Serial Binary"], correct: "Universal Serial Bus", module: "Basics" },
  { id: 94, question: "Which key is used to refresh the active window?", options: ["F1", "F2", "F5", "F10"], correct: "F5", module: "OS" },
  { id: 95, question: "What is the shortcut key for 'Undo'?", options: ["Ctrl+U", "Ctrl+Z", "Ctrl+Y", "Ctrl+X"], correct: "Ctrl+Z", module: "Writer" },
  { id: 96, question: "Which function is used to add values in Calc?", options: ["ADD()", "TOTAL()", "SUM()", "PLUS()"], correct: "SUM()", module: "Calc" },
  { id: 97, question: "What is the shortcut key to start a presentation from the beginning?", options: ["F5", "Shift+F5", "Ctrl+F5", "Alt+F5"], correct: "F5", module: "Impress" },
  { id: 98, question: "What is the full form of PDF?", options: ["Portable Document Format", "Personal Document Format", "Portable Data Format", "Printable Document Format"], correct: "Portable Document Format", module: "Writer" },
  { id: 99, question: "Which of the following is a social networking site?", options: ["Google", "Facebook", "Amazon", "Wikipedia"], correct: "Facebook", module: "Internet" },
  { id: 100, question: "What is the full form of RAM?", options: ["Random Access Memory", "Read Access Memory", "Rapid Access Memory", "Random Application Memory"], correct: "Random Access Memory", module: "Basics" }
];