import React, { useEffect, useRef, useState } from 'react';
import { Linkedin, Mail, ChevronDown, Building, Users, BarChart3, Zap, Award, Briefcase, Globe, X, HelpCircle, Package, Phone, CheckCircle, PartyPopper, Palette, ArrowRight, ArrowLeft, Sun, Moon } from 'lucide-react';
import { fallbackImages } from '../public/images';
import confetti from 'canvas-confetti';

function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const speakersRef = useRef<HTMLDivElement>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [imageErrors, setImageErrors] = useState({
    banner: false,
    profile: false
  });
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    company: false,
    message: false
  });
  const [showNotification, setShowNotification] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showPackagePopup, setShowPackagePopup] = useState(false);
  const [showBriefPopup, setShowBriefPopup] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showWhatsAppTooltip, setShowWhatsAppTooltip] = useState(false);
  const [showPassTooltip, setShowPassTooltip] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const speakers = [
    {
      name: 'Alice Johnson',
      function: 'CTO at InnovateTech',
      theme: 'AI and Machine Learning',
      image: './speaker1.jpg',
      linkedin: 'https://linkedin.com/in/alicejohnson',
      twitter: 'https://twitter.com/alicejohnson',
      // ...other social links...
    },
    {
      name: 'Bob Smith',
      function: 'Head of Marketing at MarketGurus',
      theme: 'Digital Marketing Strategies',
      image: '/speaker2.jpg',
      linkedin: 'https://linkedin.com/in/bobsmith',
      twitter: 'https://twitter.com/bobsmith',
      // ...other social links...
    },
    {
      name: 'Carol White',
      function: 'CEO at FutureVision',
      theme: 'Future of Work',
      image: '/speaker3.jpg',
      linkedin: 'https://linkedin.com/in/carolwhite',
      twitter: 'https://twitter.com/carolwhite',
      // ...other social links...
    },
    {
      name: 'David Brown',
      function: 'Product Manager at TechWave',
      theme: 'Product Management Best Practices',
      image: '/speaker4.jpg',
      linkedin: 'https://linkedin.com/in/davidbrown',
      twitter: 'https://twitter.com/davidbrown',
      // ...other social links...
    },
    {
      name: 'Eva Green',
      function: 'Data Scientist at DataMinds',
      theme: 'Big Data and Analytics',
      image: '/speaker5.jpg',
      linkedin: 'https://linkedin.com/in/evagreen',
      twitter: 'https://twitter.com/evagreen',
      // ...other social links...
    },
    {
      name: 'Frank Harris',
      function: 'Cybersecurity Expert at SecureNet',
      theme: 'Cybersecurity Trends',
      image: './speaker6.jpg',
      linkedin: 'https://linkedin.com/in/frankharris',
      twitter: 'https://twitter.com/frankharris',
      // ...other social links...
    },
    {
      name: 'Grace Lee',
      function: 'UX Designer at CreativeDesigns',
      theme: 'User Experience Design',
      image: './speaker7.jpg',
      linkedin: 'https://linkedin.com/in/gracelee',
      twitter: 'https://twitter.com/gracelee',
      // ...other social links...
    },
    {
      name: 'Henry Adams',
      function: 'Blockchain Developer at BlockChainers',
      theme: 'Blockchain Technology',
      image: '/speaker8.jpg',
      linkedin: 'https://linkedin.com/in/henryadams',
      twitter: 'https://twitter.com/henryadams',
      // ...other social links...
    },
    {
      name: 'Olvier Kamdem',
      function: 'Blockchain Developer at BlockChainers',
      theme: 'Blockchain Technology',
      image: '/speaker9.jpg',
      linkedin: 'https://linkedin.com/in/henryadams',
      twitter: 'https://twitter.com/henryadams',
      // ...other social links...
    },
    // ...7 more speakers...
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showPopup]);

  // Auto-hide notification after 20 seconds
  useEffect(() => {
    let timer: number;
    if (showNotification) {
      timer = window.setTimeout(() => {
        setShowNotification(false);
      }, 20000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showNotification]);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('animate-in');
        } else {
          el.classList.remove('animate-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    let scrollInterval: ReturnType<typeof setInterval>;

    if (!isHovered) {
      scrollInterval = setInterval(() => {
        setScrollPosition((prevPosition) => prevPosition + 1);
      }, 20); // Adjust the speed of the scroll
    }

    return () => {
      if (scrollInterval) clearInterval(scrollInterval);
    };
  }, [isHovered]);

  useEffect(() => {
    const totalWidth = speakers.length * 1;
    if (scrollPosition >= totalWidth) {
      setScrollPosition(0);
    }
  }, [scrollPosition, speakers.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        handleNext();
      }
    }, 3000); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, [isHovered, currentIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate a loading time of 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const openPackageWhatsApp = () => {
    window.open('https://wa.me/23756486222?text=Hello%20Laure,%20j%27aimerai%20en%20savoir%20plus%20sur%20les%20package%20entreprise%20sur%20LinkedinLocal%20Douala%20edition', '_blank');
  };

  const openLinkedInPage = () => {
    window.open('https://www.linkedin.com/company/linkedin-local-douala/', '_blank');
  };
  
  const openLetsTalkWhatsApp = () => {
    window.open('https://wa.me/237694846159?text=Bonjour%20Olivier,%20j%27ai%20besoin%20de%20votre%20expertise...', '_blank');
  };

  const openPassLink = () => {
    window.open('https://tally.so/r/mVbQD6', '_blank');
  };

  const handleImageError = (imageType: 'banner' | 'profile') => {
    setImageErrors(prev => ({ ...prev, [imageType]: true }));
  };

  // Form handling
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (value.trim() !== '') {
      setFormErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = (): boolean => {
    const errors = {
      name: formData.name.trim() === '',
      email: !validateEmail(formData.email),
      company: formData.company.trim() === '',
      message: formData.message.trim() === ''
    };
    
    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real application, you would send this data to your backend
      // For demonstration, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success notification
      setShowNotification(true);
      
      // Trigger confetti effect
      triggerConfetti();
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
      
      // In a real application, you would send an email to the specified address:
      // - kamdemto@gmail.com
      
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = (): boolean => {
    return (
      formData.name.trim() !== '' &&
      validateEmail(formData.email) &&
      formData.company.trim() !== '' &&
      formData.message.trim() !== ''
    );
  };

  // Function to stop event propagation
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(speakers.length / 4));
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const openPackagePopup = () => {
    setShowPackagePopup(true);
  };

  const closePackagePopup = () => {
    setShowPackagePopup(false);
  };

  const openBriefPopup = () => {
    setShowBriefPopup(true);
  };

  const closeBriefPopup = () => {
    setShowBriefPopup(false);
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/23756486222?text=Hello%20Laure,%20j%27aimerai%20en%20savoir%20plus%20sur%20les%20package%20entreprise%20sur%20LinkedinLocal%20Douala%20edition', '_blank');
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-blue-950 text-white">
        <div className="text-center animate-fade-in">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={isDarkMode ? "bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white min-h-screen" : "bg-gray-100 text-gray-900 min-h-screen"}>
      {/* Cyber-inspired animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="cyber-grid"></div>
      </div>

      {/* Header */}
      <header className={isDarkMode ? "fixed top-0 left-0 right-0 z-50 bg-blue-900/80 backdrop-blur-md border-b border-blue-500/30" : "fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-300"}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Linkedin className={isDarkMode ? "text-blue-400" : "text-blue-600"} size={28} />
            <span className="font-bold text-xl tracking-tight">LinkedIn Local Douala</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <button onClick={() => scrollToSection(heroRef)} className="hover:text-blue-500 transition">Accueil</button>
            <button onClick={() => scrollToSection(statsRef)} className="hover:text-blue-500 transition">Statistiques</button>
            <button onClick={() => scrollToSection(benefitsRef)} className="hover:text-blue-500 transition">Avantages</button>
            <button onClick={() => scrollToSection(speakersRef)} className="hover:text-blue-500 transition">Les Intervants</button>
            <button onClick={() => scrollToSection(contactRef)} className="hover:text-blue-500 transition left-8">Nous Contacter</button>
            <button className="relative hover:text-blue-500 transition right-4">
              Top Challenger
              <span className="absolute top-0 right-{-20} bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">Soon</span>
            </button>
           
          </nav>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowPopup(true)}
              className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded font-medium transition transform hover:scale-105 border border-blue-400/50 shadow-lg shadow-blue-500/20 flex items-center gap-2"
            >
              About Me <HelpCircle size={16} />
            </button>
            <button 
              onClick={toggleTheme}
              className="bg-blue-500 hover:bg-blue-400 p-2 rounded-full transition transform hover:scale-105 border border-blue-400/50 shadow-lg shadow-blue-500/20"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 cyber-text">
              LinkedIn Local Douala 2025
            </h1>
            <p className="text-xl md:text-2xl text-blue-700 mb-8">
              Devenez Partenaire de l'événement incontournable du networking et de la transformation digitale
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button 
                onClick={openBriefPopup}
                className="bg-blue-500 hover:bg-blue-400 px-6 py-3 rounded-md font-medium transition transform hover:scale-105 border border-blue-400/50 shadow-lg shadow-blue-500/20 text-lg"
              >
                LLD2025 en bref...
              </button>
              <button 
                onClick={openLinkedInPage}
                className="bg-transparent hover:bg-green-100  hover:text-black px-6 py-3 rounded-md font-medium transition border border-blue-400/30 text-lg flex items-center justify-center gap-2"
              >
                En savoir plus <ChevronDown size={18} />
              </button>
            </div>
            <div className="relative h-64 sm:h-80 md:h-96 mb-8">
              <img 
                src="/banner-linkedin-local2.jpeg"
                alt="LinkedIn Local Douala Event" 
                className="w-full h-full object-cover rounded-lg shadow-2xl shadow-blue-500/20 border-4 border-blue-400/30 backdrop-blur-sm"
                style={{ 
                  clipPath: "polygon(0% 0%, 100% 0%, 100% 92%, 95% 100%, 0% 100%)",
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2) inset"
                }}
                onError={() => handleImageError('banner')}
              />
              {imageErrors.banner && (
                <div 
                  className="absolute inset-0 rounded-lg shadow-2xl shadow-blue-500/20 border-4 border-blue-400/30 backdrop-blur-sm bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${fallbackImages.banner})`,
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 92%, 95% 100%, 0% 100%)",
                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2) inset"
                  }}
                ></div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent rounded-lg"></div>
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <span className="bg-blue-500/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                  2ᵉ édition • 2025
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className={isDarkMode ? "py-20 relative bg-blue-900/50 backdrop-blur-md border-y border-blue-500/30" : "py-20 relative bg-white border-y border-gray-300"}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center cyber-text animate" data-delay="0">
            Un événement d'envergure
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className={isDarkMode ? "bg-blue-800/50 backdrop-blur-md rounded-lg p-6 border border-blue-500/30 shadow-lg shadow-blue-500/10 text-center animate" : "bg-gray-100 rounded-lg p-6 border border-gray-300 shadow-lg text-center animate"} data-delay="100">
              <div className={isDarkMode ? "bg-blue-700/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-400/30" : "bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-300"}>
                <Users className={isDarkMode ? "text-blue-300" : "text-blue-600"} size={28} />
              </div>
              <h3 className="text-4xl font-bold mb-2 cyber-number">+300</h3>
              <p className={isDarkMode ? "text-blue-200" : "text-gray-700"}>Professionnels réunis</p>
            </div>
            <div className={isDarkMode ? "bg-blue-800/50 backdrop-blur-md rounded-lg p-6 border border-blue-500/30 shadow-lg shadow-blue-500/10 text-center animate" : "bg-gray-100 rounded-lg p-6 border border-gray-300 shadow-lg text-center animate"} data-delay="200">
              <div className={isDarkMode ? "bg-blue-700/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-400/30" : "bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-300"}>
                <Building className={isDarkMode ? "text-blue-300" : "text-blue-600"} size={28} />
              </div>
              <h3 className="text-4xl font-bold mb-2 cyber-number">+50</h3>
              <p className={isDarkMode ? "text-blue-200" : "text-gray-700"}>Entreprises représentées</p>
            </div>
            <div className={isDarkMode ? "bg-blue-800/50 backdrop-blur-md rounded-lg p-6 border border-blue-500/30 shadow-lg shadow-blue-500/10 text-center animate" : "bg-gray-100 rounded-lg p-6 border border-gray-300 shadow-lg text-center animate"} data-delay="300">
              <div className={isDarkMode ? "bg-blue-700/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-400/30" : "bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-300"}>
                <BarChart3 className={isDarkMode ? "text-blue-300" : "text-blue-600"} size={28} />
              </div>
              <h3 className="text-4xl font-bold mb-2 cyber-number">+100K</h3>
              <p className={isDarkMode ? "text-blue-200" : "text-gray-700"}>Impressions digitales</p>
            </div>
            <div className={isDarkMode ? "bg-blue-800/50 backdrop-blur-md rounded-lg p-6 border border-blue-500/30 shadow-lg shadow-blue-500/10 text-center animate" : "bg-gray-100 rounded-lg p-6 border border-gray-300 shadow-lg text-center animate"} data-delay="400">
              <div className={isDarkMode ? "bg-blue-700/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-400/30" : "bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-300"}>
                <Zap className={isDarkMode ? "text-blue-300" : "text-blue-600"} size={28} />
              </div>
              <h3 className="text-4xl font-bold mb-2 cyber-number">∞</h3>
              <p className={isDarkMode ? "text-blue-200" : "text-gray-700"}>Opportunités de collaboration</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center cyber-text animate" data-delay="0">
              Pourquoi être partenaire ?
            </h2>
            <p className={isDarkMode ? "text-xl text-blue-200 mb-16 text-center animate" : "text-xl text-gray-700 mb-16 text-center animate"} data-delay="100">
              Découvrez les avantages exclusifs réservés à nos partenaires
            </p>
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6 items-start animate" data-delay="200">
                <div className={isDarkMode ? "bg-blue-700/50 w-16 h-16 rounded-full flex items-center justify-center border border-blue-400/30 shrink-0" : "bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center border border-blue-300 shrink-0"}>
                  <Award className={isDarkMode ? "text-blue-300" : "text-blue-600"} size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Gagnez en visibilité</h3>
                  <p className={isDarkMode ? "text-blue-200" : "text-gray-700"}>Votre marque mise en avant auprès d'une audience qualifiée de professionnels et décideurs du secteur.</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6 items-start animate" data-delay="300">
                <div className={isDarkMode ? "bg-blue-700/50 w-16 h-16 rounded-full flex items-center justify-center border border-blue-400/30 shrink-0" : "bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center border border-blue-300 shrink-0"}>
                  <Users className={isDarkMode ? "text-blue-300" : "text-blue-600"} size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Rencontrez des talents et experts</h3>
                  <p className={isDarkMode ? "text-blue-200" : "text-gray-700"}>Accédez à un vivier de professionnels qualifiés prêts à collaborer et à apporter leur expertise à votre entreprise.</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6 items-start animate" data-delay="400">
                <div className={isDarkMode ? "bg-blue-700/50 w-16 h-16 rounded-full flex items-center justify-center border border-blue-400/30 shrink-0" : "bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center border border-blue-300 shrink-0"}>
                  <Building className={isDarkMode ? "text-blue-300" : "text-blue-600"} size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Boostez votre image employeur</h3>
                  <p className={isDarkMode ? "text-blue-200" : "text-gray-700"}>Montrez votre engagement pour le networking et le digital, et positionnez-vous comme un employeur de choix.</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6 items-start animate" data-delay="500">
                <div className={isDarkMode ? "bg-blue-700/50 w-16 h-16 rounded-full flex items-center justify-center border border-blue-400/30 shrink-0" : "bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center border border-blue-300 shrink-0"}>
                  <Briefcase className={isDarkMode ? "text-blue-300" : "text-blue-600"} size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Des retombées stratégiques</h3>
                  <p className={isDarkMode ? "text-blue-200" : "text-gray-700"}>Accédez à des contacts et opportunités d'affaires exclusives pour développer votre réseau et votre activité.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section ref={speakersRef} className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center cyber-text animate" data-delay="0">
            Les Intervenants
          </h2>
          <div className="flex justify-between items-center mb-4">
            <button onClick={handlePrev} className="bg-blue-500 hover:bg-blue-400 p-2 rounded-full" disabled={currentIndex === 0}>
              <ArrowLeft size={24} />
            </button>
            <button onClick={handleNext} className="bg-blue-500 hover:bg-blue-400 p-2 rounded-full" disabled={currentIndex >= Math.ceil(speakers.length / 4) - 1}>
              <ArrowRight size={24} />
            </button>
          </div>
          <div 
            className="overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {speakers.map((speaker, index) => (
                <div key={index} className="w-full sm:w-1/4 md:w-1/4 flex-shrink-0 p-4">
                  <div className="relative group">
                    <img src={speaker.image} alt={speaker.name} className="w-full h-64 object-cover rounded-lg shadow-lg" />
                    <div className="absolute inset-0 bg-blue-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-lg">{speaker.theme}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mt-4">{speaker.name}</h3>
                  <p className="text-blue-200">{speaker.function}</p>
                  <div className="flex gap-2 mt-2">
                    <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                      <Linkedin size={20} />
                    </a>
                    <a href={speaker.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                      {/* <Twitter size={20} /> */}
                    </a>
                    {/* ...other social links... */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative bg-blue-900/50 backdrop-blur-md border-y border-blue-500/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate" data-delay="0">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 cyber-text">
              Ne ratez pas cette opportunité unique !
            </h2>
            <p className="text-xl text-blue-200 mb-8">
              Rejoignez le mouvement LinkedIn Local Douala et positionnez votre entreprise comme un acteur clé du digital en Afrique !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={openPackagePopup}
                className="bg-blue-500 hover:bg-blue-400 px-8 py-4 rounded-md font-medium transition transform hover:scale-105 border border-blue-400/50 shadow-lg shadow-blue-500/20 text-lg inline-flex items-center gap-2"
              >
                Souscrire à un package <Package size={20} />
              </button>
              <div 
                className="relative"
                onMouseEnter={() => setShowPassTooltip(true)}
                onMouseLeave={() => setShowPassTooltip(false)}
              >
                {showPassTooltip && (
                  <div className="absolute bottom-full mb-2 bg-gray-800 text-white text-sm px-3 py-1 rounded-md">
                    Achete ton Pass = 10.000 
                  </div>
                )}
                <button 
                  onClick={openPassLink}
                  className="bg-transparent hover:bg-green-100 hover:text-black px-8 py-4 rounded-md font-medium transition border border-blue-400/30 text-lg inline-flex items-center gap-2"
                >
                  Acheter un pass
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-20 relative" style={{ backgroundImage: "url('/background.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-800/100 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center cyber-text animate" data-delay="0">
              Contactez-nous
            </h2>
            <p className={isDarkMode ? "text-xl text-blue-200 mb-16 text-center animate" : "text-xl text-gray-700 mb-16 text-center animate"} data-delay="100">
              Pour explorer les opportunités de partenariat
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={isDarkMode ? "bg-blue-800/50 backdrop-blur-md rounded-lg p-8 border border-blue-500/30 shadow-lg shadow-blue-500/10 animate" : "bg-gray-100 rounded-lg p-8 border border-gray-300 shadow-lg animate"} data-delay="200">
                <h3 className="text-2xl font-bold mb-6">Envoyez-nous un message</h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className={isDarkMode ? "block text-blue-200 mb-2" : "block text-gray-700 mb-2"}>Nom</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full ${isDarkMode ? 'bg-blue-900/50 border' : 'bg-white border'} ${formErrors.name ? 'border-red-500' : isDarkMode ? 'border-blue-500/30' : 'border-gray-300'} rounded-md px-4 py-2 ${isDarkMode ? 'text-white' : 'text-gray-900'} focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-blue-400' : 'focus:ring-blue-500'}`}
                      placeholder="Votre nom"
                    />
                    {formErrors.name && (
                      <p className="text-red-400 text-sm mt-1">Veuillez entrer votre nom</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className={isDarkMode ? "block text-blue-200 mb-2" : "block text-gray-700 mb-2"}>Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full ${isDarkMode ? 'bg-blue-900/50 border' : 'bg-white border'} ${formErrors.email ? 'border-red-500' : isDarkMode ? 'border-blue-500/30' : 'border-gray-300'} rounded-md px-4 py-2 ${isDarkMode ? 'text-white' : 'text-gray-900'} focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-blue-400' : 'focus:ring-blue-500'}`}
                      placeholder="Votre email"
                    />
                    {formErrors.email && (
                      <p className="text-red-400 text-sm mt-1">Veuillez entrer un email valide</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="company" className={isDarkMode ? "block text-blue-200 mb-2" : "block text-gray-700 mb-2"}>Entreprise</label>
                    <input 
                      type="text" 
                      id="company" 
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className={`w-full ${isDarkMode ? 'bg-blue-900/50 border' : 'bg-white border'} ${formErrors.company ? 'border-red-500' : isDarkMode ? 'border-blue-500/30' : 'border-gray-300'} rounded-md px-4 py-2 ${isDarkMode ? 'text-white' : 'text-gray-900'} focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-blue-400' : 'focus:ring-blue-500'}`}
                      placeholder="Nom de votre entreprise"
                    />
                    {formErrors.company && (
                      <p className="text-red-400 text-sm mt-1">Veuillez entrer le nom de votre entreprise</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="message" className={isDarkMode ? "block text-blue-200 mb-2" : "block text-gray-700 mb-2"}>Message</label>
                    <textarea 
                      id="message" 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full ${isDarkMode ? 'bg-blue-900/50 border' : 'bg-white border'} ${formErrors.message ? 'border-red-500' : isDarkMode ? 'border-blue-500/30' : 'border-gray-300'} rounded-md px-4 py-2 ${isDarkMode ? 'text-white' : 'text-gray-900'} focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-blue-400' : 'focus:ring-blue-500'}`}
                      placeholder="Votre message"
                    ></textarea>
                    {formErrors.message && (
                      <p className="text-red-400 text-sm mt-1">Veuillez entrer votre message</p>
                    )}
                  </div>
                  <button 
                    type="submit" 
                    disabled={!isFormValid() || isSubmitting}
                    className={`px-6 py-3 rounded-md font-medium transition transform hover:scale-105 border ${isDarkMode ? 'border-blue-400/50 shadow-lg shadow-blue-500/20' : 'border-gray-300 shadow-lg'} w-full flex items-center justify-center gap-2 ${isFormValid() ? 'bg-blue-500 hover:bg-blue-400' : 'bg-blue-700/50 cursor-not-allowed'}`}
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                  </button>
                </form>
              </div>
              <div 
                className={isDarkMode ? "bg-blue-800/50 backdrop-blur-md rounded-lg p-8 border border-blue-500/30 shadow-lg shadow-blue-500/10 animate relative" : "bg-gray-100 rounded-lg p-8 border border-gray-300 shadow-lg animate relative"} 
                data-delay="300"
               
              >
                <div className="absolute inset-0 bg-blue-900/50 backdrop-blur-md rounded-lg"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6">Informations de contact</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Phone className={isDarkMode ? "text-blue-300 shrink-0 mt-1" : "text-blue-600 shrink-0 mt-1"} size={24} />
                      <div>
                        <h4 className="font-medium mb-1">Téléphone</h4>
                        <p className={isDarkMode ? "text-blue-200" : "text-gray-700"}>+237 656 486 222 | +237 654 869 658</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Mail className={isDarkMode ? "text-blue-300 shrink-0 mt-1" : "text-blue-600 shrink-0 mt-1"} size={24} />
                      <div>
                        <h4 className="font-medium mb-1">Email</h4>
                        <p className={isDarkMode ? "text-blue-200" : "text-gray-700"}>infos@stayupgroup.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Linkedin className={isDarkMode ? "text-blue-300 shrink-0 mt-1" : "text-blue-600 shrink-0 mt-1"} size={24} />
                      <div>
                        <h4 className="font-medium mb-1">LinkedIn</h4>
                        <p className={isDarkMode ? "text-blue-200" : "text-gray-700"}>linkedin.com/company/linkedin-local-douala</p>
                      </div>
                    </div>
                    <div className="mt-8">
                      <h4 className="font-medium mb-4">Suivez-nous</h4>
                      <div className="flex gap-4">
                        <a href="https://www.linkedin.com/company/linkedin-local-douala/" target="_blank" rel="noopener noreferrer" className={isDarkMode ? "bg-blue-700/50 w-10 h-10 rounded-full flex items-center justify-center border border-blue-400/30 hover:bg-blue-600/50 transition" : "bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center border border-blue-300 hover:bg-blue-200 transition"}>
                          <Linkedin size={20} />
                        </a>
                        <a href="mailto:infos@stayupgroup.com" className={isDarkMode ? "bg-blue-700/50 w-10 h-10 rounded-full flex items-center justify-center border border-blue-400/30 hover:bg-blue-600/50 transition" : "bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center border border-blue-300 hover:bg-blue-200 transition"}>
                          <Mail size={20} />
                        </a>
                      </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-blue-500/30">
                      <h4 className="font-medium mb-4">Hashtags</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className={isDarkMode ? "bg-blue-700/50 px-3 py-1 rounded-full text-sm border border-blue-400/30" : "bg-blue-100 px-3 py-1 rounded-full text-sm border border-blue-300"}>
                          #LinkedInLocalDouala
                        </span>
                        <span className={isDarkMode ? "bg-blue-700/50 px-3 py-1 rounded-full text-sm border border-blue-400/30" : "bg-blue-100 px-3 py-1 rounded-full text-sm border border-blue-300"}>
                          #Networking
                        </span>
                        <span className={isDarkMode ? "bg-blue-700/50 px-3 py-1 rounded-full text-sm border border-blue-400/30" : "bg-blue-100 px-3 py-1 rounded-full text-sm border border-blue-300"}>
                          #BusinessOpportunities
                        </span>
                        <span className={isDarkMode ? "bg-blue-700/50 px-3 py-1 rounded-full text-sm border border-blue-400/30" : "bg-blue-100 px-3 py-1 rounded-full text-sm border border-blue-300"}>
                          #Entreprises
                        </span>
                        <span className={isDarkMode ? "bg-blue-700/50 px-3 py-1 rounded-full text-sm border border-blue-400/30" : "bg-blue-100 px-3 py-1 rounded-full text-sm border border-blue-300"}>
                          #Partenariat
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-blue-950 border-t border-blue-500/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Linkedin className="text-blue-400" size={24} />
              <span className="font-bold text-lg">LinkedIn Local Douala 2025</span>
            </div>
            <div className="text-blue-300 text-sm">
              © 2025 LinkedIn Local Douala | Build By <a href="https://linkedin.com/in/iamkto" className="h linkedin com" target='_blank'>Olivier Kamdem</a>. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
                    
      {/* Olivier Kamdem Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out">
          <div className="absolute inset-0 bg-blue-950/90 backdrop-blur-md transition-opacity duration-300 ease-in-out" onClick={() => setShowPopup(false)}></div>
          <div className="relative bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl border border-blue-500/30 shadow-2xl shadow-blue-500/20 max-w-2xl w-full p-6 md:p-8 animate-in transition-transform duration-300 ease-in-out" onClick={stopPropagation}>
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 bg-blue-800/80 hover:bg-blue-700 w-8 h-8 rounded-full flex items-center justify-center border border-blue-400/30 z-10 transition-transform duration-300 ease-in-out"
            >
              <X size={18} />
            </button>
        
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-blue-400/50 shadow-lg shadow-blue-500/20 flex-shrink-0">
                <img 
                  src="topprofil.png" 
                  alt="olivier Kamdem" 
                  className="w-full h-full object-cover"
                  onError={() => handleImageError('profile')}
                />
                {imageErrors.profile && (
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${fallbackImages.profile})` }}
                  ></div>
                )}
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 cyber-text">Olivier KAMDEM</h3>
                <p className="text-blue-200 mb-4">
                  Consultant ERP (Odoo, NetSuite) | UI Developer & Digital Marketing Evangelist | Expert SEO, je vous accompagne à 360° dans la digitalisation de vos processus métiers et l'optimisation de votre présence digitale.
                </p>
                <div className="space-y-3">
                  <h4 className="font-medium text-blue-300">Mes réseaux sociaux</h4>
                  <div className="flex flex-wrap gap-3">
                    <a 
                      href="https://www.linkedin.com/in/iamkto/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-700/50 hover:bg-blue-600/50 px-4 py-2 rounded-md flex items-center gap-2 border border-blue-400/30 transition"
                    >
                      <Linkedin size={18} />
                      <span>LinkedIn</span>
                    </a>
                    <a 
                      href="https://twitter.com/iamkto" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-700/50 hover:bg-blue-600/50 px-4 py-2 rounded-md flex items-center gap-2 border border-blue-400/30 transition"
                    >
                      {/* <Twitter size={18} /> */}
                      <span>Twitter</span>
                    </a>
                    <a 
                      href="https://www.instagram.com/iam.kto/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-700/50 hover:bg-blue-600/50 px-4 py-2 rounded-md flex items-center gap-2 border border-blue-400/30 transition"
                    >
                      {/* <Instagram size={18} /> */}
                      <span>Instagram</span>
                    </a>
                    <a 
                      href="https://www.tiktok.com/@iamkto" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-700/50 hover:bg-blue-600/50 px-4 py-2 rounded-md flex items-center gap-2 border border-blue-400/30 transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
                        <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
                        <path d="M15 8v8a4 4 0 0 1-4 4"/>
                        <line x1="15" y1="4" x2="15" y2="12"/>
                      </svg>
                      <span>TikTok</span>
                    </a>
                    <a 
                      href="https://github.com/kamdemto" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-700/50 hover:bg-blue-600/50 px-4 py-2 rounded-md flex items-center gap-2 border border-blue-400/30 transition"
                    >
                      {/* <Github size={18} /> */}
                      <span>GitHub</span>
                    </a>
                    <a 
                      href="https://youtu.be/z8qipkkC4_Y" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-700/50 hover:bg-blue-600/50 px-4 py-2 rounded-md flex items-center gap-2 border border-blue-400/30 transition"
                    >
                      {/* <Youtube size={18} /> */}
                      <span>YouTube</span>
                    </a>
                    <a 
                      href="https://www.behance.net/iamkto" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-700/50 hover:bg-blue-600/50 px-4 py-2 rounded-md flex items-center gap-2 border border-blue-400/30 transition"
                    >
                      <Palette size={18} />
                      <span>Behance</span>
                    </a>
                    <a 
                      href="https://ktocrea.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-700/50 hover:bg-blue-600/50 px-4 py-2 rounded-md flex items-center gap-2 border border-blue-400/30 transition"
                    >
                      <Globe size={18} />
                      <span>Site Web</span>
                    </a>
                    <a 
                      href="mailto:contact@ktocrea.com" 
                      className="bg-blue-700/50 hover:bg-blue-600/50 px-4 py-2 rounded-md flex items-center gap-2 border border-blue-400/30 transition"
                    >
                      <Mail size={18} />
                      <span>Email</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-blue-500/30">
              <h4 className="font-medium text-blue-300 mb-3">Expertise</h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-700/50 px-3 py-1 rounded-full text-sm border border-blue-400/30">
                  ERP (Odoo, NetSuite)
                </span>
                <span className="bg-blue-700/50 px-3 py-1 rounded-full text-sm border border-blue-400/30">
                  UI Development
                </span>
                <span className="bg-blue-700/50 px-3 py-1 rounded-full text-sm border border-blue-400/30">
                  Digital Marketing
                </span>
                <span className="bg-blue-700/50 px-3 py-1 rounded-full text-sm border border-blue-400/30">
                  SEO
                </span>
                <span className="bg-blue-700/50 px-3 py-1 rounded-full text-sm border border-blue-400/30">
                  Digitalisation
                </span>
                <span className="bg-blue-700/50 px-3 py-1 rounded-full text-sm border border-blue-400/30">
                  Transformation Digitale
                </span>
                <span className="bg-blue-700/50 px-3 py-1 rounded-full text-sm border border-blue-400/30">
                  Social Media
                </span>
                <span className="bg-blue-700/50 px-3 py-1 rounded-full text-sm border border-blue-400/30">
                  UI-UX Design
                </span>
                <span className="bg-blue-700/50 px-3 py-1 rounded-full text-sm border border-blue-400/30">
                  Coaching
                </span>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <button 
                onClick={openLetsTalkWhatsApp}
                className="bg-blue-500 hover:bg-blue-400 px-6 py-3 rounded-md font-medium transition transform hover:scale-105 border border-blue-400/50 shadow-lg shadow-blue-500/20 inline-flex items-center gap-2"
              >
                Let's Talk and improve your business
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Package Popup */}
      {showPackagePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out">
          <div className="absolute inset-0 bg-blue-950/90 backdrop-blur-md transition-opacity duration-300 ease-in-out" onClick={closePackagePopup}></div>
          <div className="relative bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl border border-blue-500/30 shadow-2xl shadow-blue-500/20 max-w-2xl w-full p-6 md:p-8 animate-in transition-transform duration-300 ease-in-out" onClick={stopPropagation}>
            <button 
              onClick={closePackagePopup}
              className="absolute top-4 right-4 bg-blue-800/80 hover:bg-blue-700 w-8 h-8 rounded-full flex items-center justify-center border border-blue-400/30 z-10 transition-transform duration-300 ease-in-out"
            >
              <X size={18} />
            </button>
            <div className="flex flex-col items-center">
              <img src="/package.jpeg" alt="Package" className="w-full h-auto rounded-lg mb-4" />
              <button 
                onClick={openPackageWhatsApp}
                className="bg-blue-500 hover:bg-blue-400 px-6 py-3 rounded-md font-medium transition transform hover:scale-105 border border-blue-400/50 shadow-lg shadow-blue-500/20 inline-flex items-center gap-2"
              >
                Reserver ton package
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification - Centered Popup */}
      {showNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out">
          <div className="absolute inset-0 bg-blue-950/70 backdrop-blur-sm transition-opacity duration-300 ease-in-out" onClick={() => setShowNotification(false)}></div>
          <div className="relative bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl border border-blue-400/50 shadow-2xl shadow-blue-500/30 max-w-md w-full p-6 animate-celebration transition-transform duration-300 ease-in-out" onClick={stopPropagation}>
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 transition-transform duration-300 ease-in-out">
              <PartyPopper className="text-yellow-300" size={48} />
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-blue-100" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Message envoyé avec succès!</h3>
              <p className="text-blue-100 mb-6">
                Votre demande a été bien prise en compte nous vous contacterons d'ici 24h max
              </p>
              <button 
                onClick={() => setShowNotification(false)}
                className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-md font-medium transition transform hover:scale-105 shadow-lg"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Brief Popup */}
      {showBriefPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out">
          <div className="absolute inset-0 bg-blue-950/90 backdrop-blur-md transition-opacity duration-300 ease-in-out" onClick={closeBriefPopup}></div>
          <div className="relative bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl border border-blue-500/30 shadow-2xl shadow-blue-500/20 max-w-2xl w-full p-6 md:p-8 animate-in transition-transform duration-300 ease-in-out" onClick={stopPropagation}>
            <button 
              onClick={closeBriefPopup}
              className="absolute top-4 right-4 bg-blue-800/80 hover:bg-blue-700 w-8 h-8 rounded-full flex items-center justify-center border border-blue-400/30 z-10 transition-transform duration-300 ease-in-out"
            >
              <X size={18} />
            </button>
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-4">LLD2025 en bref...</h3>
              <p className="mb-4">🔹 𝗖'𝗲𝘀𝘁 𝗾𝘂𝗼𝗶 𝗟𝗶𝗻𝗸𝗲𝗱𝗜𝗻 𝗟𝗼𝗰𝗮𝗹 ? LinkedIn Local Douala est une initiative qui rassemble des professionnels de tous horizons pour favoriser le réseautage, le partage de connaissances et l’inspiration mutuelle. Ces rencontres permettent d’explorer les opportunités du digital, notamment à travers la plateforme LinkedIn.</p>
              <p>📢 𝐔𝐧𝐞 𝐝𝐞𝐮𝐱𝐢𝐞̀𝐦𝐞 𝐞́𝐝𝐢𝐭𝐢𝐨𝐧 𝐞𝐧𝐜𝐨𝐫𝐞 𝐩𝐥𝐮𝐬 𝐠𝐫𝐚𝐧𝐝𝐞 ! Pour cette nouvelle édition, l’équipe d’organisation voit les choses en grand. Une cagnotte de 𝟱𝟬 𝟬𝟬𝟬 FCFA sera mise en jeu pour récompenser les meilleurs contributeurs ! 🎯🏆</p>
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <div 
        className="fixed bottom-4 right-8 flex items-center transition-opacity duration-300 ease-in-out"
        onMouseEnter={() => setShowWhatsAppTooltip(true)}
        onMouseLeave={() => setShowWhatsAppTooltip(false)}
      >
        {showWhatsAppTooltip && (
          <div className="bg-gray-800 text-white text-sm px-3 py-1 rounded-md mr-2 transition-opacity duration-300 ease-in-out">
            Discutons sur Whatsapp !
          </div>
        )}
        <button 
          onClick={openWhatsApp}
          className="bg-green-500 hover:bg-green-400 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105"
        >
          <img src="/whatsapp.svg" alt="WhatsApp" width="32" height="32" />
        </button>
      </div>
    </div>
  );
}

export default App;