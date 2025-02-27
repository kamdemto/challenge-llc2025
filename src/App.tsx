import React, { useEffect, useRef, useState } from 'react';
import { Linkedin, Mail, ChevronDown, Building, Users, BarChart3, Zap, Award, Briefcase, Globe, X, HelpCircle, Package, Phone, CheckCircle, PartyPopper, Palette } from 'lucide-react';
import { fallbackImages } from './assets/images';
import confetti from 'canvas-confetti';

function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
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

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/694846159?text=Bonjour%20Olivier,%20j%27ai%20une%20question%20sur%20%23linkedinLocal2025', '_blank');
  };

  const openPackageWhatsApp = () => {
    window.open('https://wa.me/23756486222?text=Hello%20Laure,%20j%27aimerai%20en%20savoir%20plus%20sur%20les%20parckage%20entreprise%20sur%20LinkedinLocal%20Douala%20edition', '_blank');
  };

  const openLinkedInPage = () => {
    window.open('https://www.linkedin.com/company/linkedin-local-douala/', '_blank');
  };
  
  const openLetsTalkWhatsApp = () => {
    window.open('https://wa.me/237694846159?text=Bonjour%20Olivier,%20j%27ai%20besoin%20de%20votre%20expertise...', '_blank');
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
      
      // In a real application, you would send an email to the specified addresses:
      // - infos@stayupgroup.com
      // - kamdemto@gmail.com (cc)
      
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

  return (
    <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white min-h-screen">
      {/* Cyber-inspired animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="cyber-grid"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-blue-900/80 backdrop-blur-md border-b border-blue-500/30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Linkedin className="text-blue-400" size={28} />
            <span className="font-bold text-xl tracking-tight">LinkedIn Local Douala</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <button onClick={() => scrollToSection(heroRef)} className="hover:text-blue-300 transition">Accueil</button>
            <button onClick={() => scrollToSection(statsRef)} className="hover:text-blue-300 transition">Statistiques</button>
            <button onClick={() => scrollToSection(benefitsRef)} className="hover:text-blue-300 transition">Avantages</button>
            <button onClick={() => scrollToSection(contactRef)} className="hover:text-blue-300 transition">Contact</button>
          </nav>
          <button 
            onClick={() => setShowPopup(true)}
            className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded font-medium transition transform hover:scale-105 border border-blue-400/50 shadow-lg shadow-blue-500/20 flex items-center gap-2"
          >
            About Me <HelpCircle size={16} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate" data-delay="0">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 cyber-text">
              LinkedIn Local Douala 2025
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-8">
              Devenez Partenaire de l'événement incontournable du networking et de la transformation digitale
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button 
                onClick={openWhatsApp}
                className="bg-blue-500 hover:bg-blue-400 px-6 py-3 rounded-md font-medium transition transform hover:scale-105 border border-blue-400/50 shadow-lg shadow-blue-500/20 text-lg"
              >
                Devenir Partenaire
              </button>
              <button 
                onClick={openLinkedInPage}
                className="bg-transparent hover:bg-blue-800/50 px-6 py-3 rounded-md font-medium transition border border-blue-400/30 text-lg flex items-center justify-center gap-2"
              >
                En savoir plus <ChevronDown size={18} />
              </button>
            </div>
            <div className="relative h-64 sm:h-80 md:h-96 mb-8 animate" data-delay="200">
              <img 
                src="src/assets/banner-linkedin-local2.jpeg"
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
      <section ref={statsRef} className="py-20 relative bg-blue-900/50 backdrop-blur-md border-y border-blue-500/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center cyber-text animate" data-delay="0">
            Un événement d'envergure
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-blue-800/50 backdrop-blur-md rounded-lg p-6 border border-blue-500/30 shadow-lg shadow-blue-500/10 text-center animate" data-delay="100">
              <div className="bg-blue-700/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-400/30">
                <Users className="text-blue-300" size={28} />
              </div>
              <h3 className="text-4xl font-bold mb-2 cyber-number">+300</h3>
              <p className="text-blue-200">Professionnels réunis</p>
            </div>
            <div className="bg-blue-800/50 backdrop-blur-md rounded-lg p-6 border border-blue-500/30 shadow-lg shadow-blue-500/10 text-center animate" data-delay="200">
              <div className="bg-blue-700/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-400/30">
                <Building className="text-blue-300" size={28} />
              </div>
              <h3 className="text-4xl font-bold mb-2 cyber-number">+50</h3>
              <p className="text-blue-200">Entreprises représentées</p>
            </div>
            <div className="bg-blue-800/50 backdrop-blur-md rounded-lg p-6 border border-blue-500/30 shadow-lg shadow-blue-500/10 text-center animate" data-delay="300">
              <div className="bg-blue-700/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-400/30">
                <BarChart3 className="text-blue-300" size={28} />
              </div>
              <h3 className="text-4xl font-bold mb-2 cyber-number">+100K</h3>
              <p className="text-blue-200">Impressions digitales</p>
            </div>
            <div className="bg-blue-800/50 backdrop-blur-md rounded-lg p-6 border border-blue-500/30 shadow-lg shadow-blue-500/10 text-center animate" data-delay="400">
              <div className="bg-blue-700/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-400/30">
                <Zap className="text-blue-300" size={28} />
              </div>
              <h3 className="text-4xl font-bold mb-2 cyber-number">∞</h3>
              <p className="text-blue-200">Opportunités de collaboration</p>
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
            <p className="text-xl text-blue-200 mb-16 text-center animate" data-delay="100">
              Découvrez les avantages exclusifs réservés à nos partenaires
            </p>
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6 items-start animate" data-delay="200">
                <div className="bg-blue-700/50 w-16 h-16 rounded-full flex items-center justify-center border border-blue-400/30 shrink-0">
                  <Award className="text-blue-300" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Gagnez en visibilité</h3>
                  <p className="text-blue-200">Votre marque mise en avant auprès d'une audience qualifiée de professionnels et décideurs du secteur.</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6 items-start animate" data-delay="300">
                <div className="bg-blue-700/50 w-16 h-16 rounded-full flex items-center justify-center border border-blue-400/30 shrink-0">
                  <Users className="text-blue-300" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Rencontrez des talents et experts</h3>
                  <p className="text-blue-200">Accédez à un vivier de professionnels qualifiés prêts à collaborer et à apporter leur expertise à votre entreprise.</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6 items-start animate" data-delay="400">
                <div className="bg-blue-700/50 w-16 h-16 rounded-full flex items-center justify-center border border-blue-400/30 shrink-0">
                  <Building className="text-blue-300" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Boostez votre image employeur</h3>
                  <p className="text-blue-200">Montrez votre engagement pour le networking et le digital, et positionnez-vous comme un employeur de choix.</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6 items-start animate" data-delay="500">
                <div className="bg-blue-700/50 w-16 h-16 rounded-full flex items-center justify-center border border-blue-400/30 shrink-0">
                  <Briefcase className="text-blue-300" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Des retombées stratégiques</h3>
                  <p className="text-blue-200">Accédez à des contacts et opportunités d'affaires exclusives pour développer votre réseau et votre activité.</p>
                </div>
              </div>
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
            <button 
              onClick={openPackageWhatsApp}
              className="bg-blue-500 hover:bg-blue-400 px-8 py-4 rounded-md font-medium transition transform hover:scale-105 border border-blue-400/50 shadow-lg shadow-blue-500/20 text-lg inline-flex items-center gap-2"
            >
              Souscrire à un package <Package size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center cyber-text animate" data-delay="0">
              Contactez-nous
            </h2>
            <p className="text-xl text-blue-200 mb-16 text-center animate" data-delay="100">
              Pour explorer les opportunités de partenariat
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-800/50 backdrop-blur-md rounded-lg p-8 border border-blue-500/30 shadow-lg shadow-blue-500/10 animate" data-delay="200">
                <h3 className="text-2xl font-bold mb-6">Envoyez-nous un message</h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-blue-200 mb-2">Nom</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full bg-blue-900/50 border ${formErrors.name ? 'border-red-500' : 'border-blue-500/30'} rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400`}
                      placeholder="Votre nom"
                    />
                    {formErrors.name && (
                      <p className="text-red-400 text-sm mt-1">Veuillez entrer votre nom</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-blue-200 mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full bg-blue-900/50 border ${formErrors.email ? 'border-red-500' : 'border-blue-500/30'} rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400`}
                      placeholder="Votre email"
                    />
                    {formErrors.email && (
                      <p className="text-red-400 text-sm mt-1">Veuillez entrer un email valide</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-blue-200 mb-2">Entreprise</label>
                    <input 
                      type="text" 
                      id="company" 
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className={`w-full bg-blue-900/50 border ${formErrors.company ? 'border-red-500' : 'border-blue-500/30'} rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400`}
                      placeholder="Nom de votre entreprise"
                    />
                    {formErrors.company && (
                      <p className="text-red-400 text-sm mt-1">Veuillez entrer le nom de votre entreprise</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-blue-200 mb-2">Message</label>
                    <textarea 
                      id="message" 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full bg-blue-900/50 border ${formErrors.message ? 'border-red-500' : 'border-blue-500/30'} rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400`}
                      placeholder="Votre message"
                    ></textarea>
                    {formErrors.message && (
                      <p className="text-red-400 text-sm mt-1">Veuillez entrer votre message</p>
                    )}
                  </div>
                  <button 
                    type="submit" 
                    disabled={!isFormValid() || isSubmitting}
                    className={`px-6 py-3 rounded-md font-medium transition transform hover:scale-105 border border-blue-400/50 shadow-lg shadow-blue-500/20 w-full flex items-center justify-center gap-2 ${isFormValid() ? 'bg-blue-500 hover:bg-blue-400' : 'bg-blue-700/50 cursor-not-allowed'}`}
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                  </button>
                </form>
              </div>
              <div className="bg-blue-800/50 backdrop-blur-md rounded-lg p-8 border border-blue-500/30 shadow-lg shadow-blue-500/10 animate" data-delay="300">
                <h3 className="text-2xl font-bold mb-6">Informations de contact</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Phone className="text-blue-300 shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-medium mb-1">Téléphone</h4>
                      <p className="text-blue-200">+237 656 486 222 | +237 654 869 658</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="text-blue-300 shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <p className="text-blue-200">infos@stayupgroup.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Linkedin className="text-blue-300 shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-medium mb-1">LinkedIn</h4>
                      <p className="text-blue-200">linkedin.com/company/linkedin-local-douala</p>
                    </div>
                  </div>
                  <div className="mt-8">
                    <h4 className="font-medium mb-4">Suivez-nous</h4>
                    <div className="flex gap-4">
                      <a href="https://www.linkedin.com/company/linkedin-local-douala/" target="_blank" rel="noopener noreferrer" className="bg-blue-700/50 w-10 h-10 rounded-full flex items-center justify-center border border-blue-400/30 hover:bg-blue-600/50 transition">
                        <Linkedin size={20} />
                      </a>
                      <a href="mailto:infos@stayupgroup.com" className="bg-blue-700/50 w-10 h-10 rounded-full flex items-center justify-center border border-blue-400/30 hover:bg-blue-600/50 transition">
                        <Mail size={20} />
                      </a>
                    </div>
                  </div>
                  <div className="mt-8 pt-8 border-t border-blue-500/30">
                    <h4 className="font-medium mb-4">Hashtags</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-700/50 px-3 py-1 rounded-full text-sm border border-blue-400/30">
                        #LinkedInLocalDouala
                      </span>
                      <span className="bg-blue-700/50 px-3 py-1 rounded-full text-sm border border-blue-400/30">
                        #Networking
                      </span>
                      <span className="bg-blue-700/50 px-3 py-1 rounded-full text-sm border border-blue-400/30">
                        #BusinessOpportunities
                      </span>
                      <span className="bg-blue-700/50 px-3 py-1 rounded-full text-sm border border-blue-400/30">
                        #Entreprises
                      </span>
                      <span className="bg-blue-700/50 px-3 py-1 rounded-full text-sm border border-blue-400/30">
                        #Partenariat
                      </span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-blue-950/90 backdrop-blur-md" onClick={() => setShowPopup(false)}></div>
          <div className="relative bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl border border-blue-500/30 shadow-2xl shadow-blue-500/20 max-w-2xl w-full p-6 md:p-8 animate-in" onClick={stopPropagation}>
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 bg-blue-800/80 hover:bg-blue-700 w-8 h-8 rounded-full flex items-center justify-center border border-blue-400/30 z-10"
            >
              <X size={18} />
            </button>
            
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-blue-400/50 shadow-lg shadow-blue-500/20 flex-shrink-0">
                <img 
                  src="src/assets/topprofil.png" 
                  alt="Olivier Kamdem" 
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

      {/* Success Notification - Centered Popup */}
      {showNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-blue-950/70 backdrop-blur-sm" onClick={() => setShowNotification(false)}></div>
          <div className="relative bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl border border-blue-400/50 shadow-2xl shadow-blue-500/30 max-w-md w-full p-6 animate-celebration" onClick={stopPropagation}>
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
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
    </div>
  );
}

export default App;