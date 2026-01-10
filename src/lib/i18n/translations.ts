export type Language = 'en' | 'mr' | 'hi';

export const translations = {
  en: {
    // Header
    welcome: 'Welcome',
    selectLanguage: 'Select Language',
    
    // Auth
    login: 'Login',
    register: 'Register',
    mobileNumber: 'Mobile Number',
    enterMobileNumber: 'Enter your mobile number',
    password: 'Password',
    enterPassword: 'Enter your password',
    confirmPassword: 'Confirm Password',
    setPassword: 'Set Password',
    sendOtp: 'Send OTP',
    verifyOtp: 'Verify OTP',
    enterOtp: 'Enter OTP',
    otpSent: 'OTP sent to your mobile number',
    otpVerified: 'OTP verified successfully',
    invalidOtp: 'Invalid OTP',
    mobileExists: 'This mobile number already exists',
    loginWithPassword: 'Login with Password',
    loginWithOtp: 'Login with OTP',
    newUser: 'New User?',
    existingUser: 'Already have an account?',
    logout: 'Logout',
    
    // Services
    chatbot: 'Chatbot',
    chatbotDesc: 'Talk to AI Chatbot',
    voiceAssistant: 'Voice Assistant',
    voiceAssistantDesc: 'Voice Assistant',
    schemes: 'Schemes',
    schemesDesc: 'Find Government Schemes',
    localServices: 'Local Services',
    localServicesDesc: 'Local Service Providers',
    legalHelp: 'Legal Help',
    legalHelpDesc: 'Legal Rights and Help',
    myApplications: 'My Applications',
    myApplicationsDesc: 'Your Application Status',
    emergency: 'Emergency Services',
    emergencyDesc: 'Emergency Services',
    profile: 'Profile',
    profileDesc: 'Manage Profile',
    
    // Popular Schemes
    popularSchemes: 'Popular Schemes',
    farmer: 'Farmer',
    health: 'Health',
    education: 'Education',
    housing: 'Housing',
    
    // Navigation
    dashboard: 'Dashboard',
    legal: 'Legal',
    services: 'Services',
    
    // Common
    back: 'Back',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    
    // Validation
    invalidMobile: 'Please enter a valid 10-digit mobile number',
    passwordMinLength: 'Password must be at least 6 characters',
    passwordMismatch: 'Passwords do not match',
  },
  mr: {
    // Header
    welcome: 'स्वागत आहे',
    selectLanguage: 'भाषा निवडा',
    
    // Auth
    login: 'लॉगिन',
    register: 'नोंदणी',
    mobileNumber: 'मोबाइल नंबर',
    enterMobileNumber: 'तुमचा मोबाइल नंबर टाका',
    password: 'पासवर्ड',
    enterPassword: 'तुमचा पासवर्ड टाका',
    confirmPassword: 'पासवर्ड पुष्टी करा',
    setPassword: 'पासवर्ड सेट करा',
    sendOtp: 'OTP पाठवा',
    verifyOtp: 'OTP पडताळा',
    enterOtp: 'OTP टाका',
    otpSent: 'तुमच्या मोबाइलवर OTP पाठवला',
    otpVerified: 'OTP यशस्वीरित्या पडताळला',
    invalidOtp: 'अवैध OTP',
    mobileExists: 'हा मोबाइल नंबर आधीच अस्तित्वात आहे',
    loginWithPassword: 'पासवर्डने लॉगिन',
    loginWithOtp: 'OTP ने लॉगिन',
    newUser: 'नवीन वापरकर्ता?',
    existingUser: 'आधीच खाते आहे?',
    logout: 'लॉगआउट',
    
    // Services
    chatbot: 'चॅटबॉट',
    chatbotDesc: 'AI चॅटबॉट सह बोला',
    voiceAssistant: 'व्हॉइस सहाय्यक',
    voiceAssistantDesc: 'आवाज सहाय्यक',
    schemes: 'योजना',
    schemesDesc: 'सरकारी योजना शोधा',
    localServices: 'स्थानिक सेवा',
    localServicesDesc: 'स्थानिक सेवा प्रदाते',
    legalHelp: 'कायदेशीर मदत',
    legalHelpDesc: 'कायदेशीर हक्क आणि मदत',
    myApplications: 'माझे अर्ज',
    myApplicationsDesc: 'आपल्या अर्जाची स्थिती',
    emergency: 'आणीबाणी सेवा',
    emergencyDesc: 'आणीबाणी सेवा',
    profile: 'प्रोफाइल',
    profileDesc: 'प्रोफाइल व्यवस्थापित करा',
    
    // Popular Schemes
    popularSchemes: 'लोकप्रिय योजना',
    farmer: 'शेतकरी',
    health: 'आरोग्य',
    education: 'शिक्षण',
    housing: 'घरकुल',
    
    // Navigation
    dashboard: 'डॅशबोर्ड',
    legal: 'कायदेशीर',
    services: 'सेवा',
    
    // Common
    back: 'मागे',
    submit: 'सबमिट',
    cancel: 'रद्द करा',
    save: 'जतन करा',
    loading: 'लोड होत आहे...',
    error: 'त्रुटी',
    success: 'यशस्वी',
    
    // Validation
    invalidMobile: 'कृपया वैध 10 अंकी मोबाइल नंबर टाका',
    passwordMinLength: 'पासवर्ड किमान 6 अक्षरांचा असावा',
    passwordMismatch: 'पासवर्ड जुळत नाहीत',
  },
  hi: {
    // Header
    welcome: 'स्वागत है',
    selectLanguage: 'भाषा चुनें',
    
    // Auth
    login: 'लॉगिन',
    register: 'पंजीकरण',
    mobileNumber: 'मोबाइल नंबर',
    enterMobileNumber: 'अपना मोबाइल नंबर दर्ज करें',
    password: 'पासवर्ड',
    enterPassword: 'अपना पासवर्ड दर्ज करें',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    setPassword: 'पासवर्ड सेट करें',
    sendOtp: 'OTP भेजें',
    verifyOtp: 'OTP सत्यापित करें',
    enterOtp: 'OTP दर्ज करें',
    otpSent: 'आपके मोबाइल पर OTP भेजा गया',
    otpVerified: 'OTP सफलतापूर्वक सत्यापित',
    invalidOtp: 'अमान्य OTP',
    mobileExists: 'यह मोबाइल नंबर पहले से मौजूद है',
    loginWithPassword: 'पासवर्ड से लॉगिन',
    loginWithOtp: 'OTP से लॉगिन',
    newUser: 'नया उपयोगकर्ता?',
    existingUser: 'पहले से खाता है?',
    logout: 'लॉगआउट',
    
    // Services
    chatbot: 'चैटबॉट',
    chatbotDesc: 'AI चैटबॉट से बात करें',
    voiceAssistant: 'वॉइस असिस्टेंट',
    voiceAssistantDesc: 'आवाज सहायक',
    schemes: 'योजनाएं',
    schemesDesc: 'सरकारी योजनाएं खोजें',
    localServices: 'स्थानीय सेवाएं',
    localServicesDesc: 'स्थानीय सेवा प्रदाता',
    legalHelp: 'कानूनी सहायता',
    legalHelpDesc: 'कानूनी अधिकार और मदद',
    myApplications: 'मेरे आवेदन',
    myApplicationsDesc: 'आपके आवेदन की स्थिति',
    emergency: 'आपातकालीन सेवाएं',
    emergencyDesc: 'आपातकालीन सेवाएं',
    profile: 'प्रोफाइल',
    profileDesc: 'प्रोफाइल प्रबंधित करें',
    
    // Popular Schemes
    popularSchemes: 'लोकप्रिय योजनाएं',
    farmer: 'किसान',
    health: 'स्वास्थ्य',
    education: 'शिक्षा',
    housing: 'आवास',
    
    // Navigation
    dashboard: 'डैशबोर्ड',
    legal: 'कानूनी',
    services: 'सेवाएं',
    
    // Common
    back: 'वापस',
    submit: 'जमा करें',
    cancel: 'रद्द करें',
    save: 'सहेजें',
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    success: 'सफल',
    
    // Validation
    invalidMobile: 'कृपया वैध 10 अंकों का मोबाइल नंबर दर्ज करें',
    passwordMinLength: 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए',
    passwordMismatch: 'पासवर्ड मेल नहीं खाते',
  },
};

export const languageNames: Record<Language, string> = {
  en: 'English',
  mr: 'मराठी',
  hi: 'हिंदी',
};
