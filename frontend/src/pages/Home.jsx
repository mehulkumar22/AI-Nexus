import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { tools, plans, testimonials } from "../assets/assets";
import { ArrowRight, Zap, Users, Globe, Check, Star, Award, TrendingUp } from 'lucide-react';

const Homepage = () => {

  const scrollToProducts = () => {
    const element = document.getElementById('products-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                AI Nexus
              </span>
              <br />
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Powerful AI tools for content moderation, image generation, and more. 
              Transform your workflow with cutting-edge artificial intelligence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <button
                onClick={scrollToProducts}
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-black font-bold rounded-xl hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                <span className="relative flex items-center">
                  Explore AI Tools
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { icon: Users, value: '10K+', label: 'Active Users' },
                { icon: Zap, value: '5M+', label: 'API Calls' },
                { icon: Globe, value: '10+', label: 'Countries' },
                { icon: Award, value: '99.9%', label: 'Uptime' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 mb-3 shadow-lg shadow-cyan-500/10">
                    <stat.icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="products-section" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Powerful AI Tools
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our suite of AI-powered tools designed to enhance your productivity and creativity
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className={`relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:transform hover:scale-105 h-full ${tool.glowColor} hover:shadow-2xl`}>
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full text-cyan-300 text-xs font-bold">
                      {tool.stats}
                    </div>
                  </div>
                  
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${tool.gradient} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <tool.icon className="h-8 w-8 text-black" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">{tool.name}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{tool.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {tool.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-300">
                        <Check className="h-4 w-4 text-cyan-400 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between">
                    {tool.comingSoon ? (
                      <div className="inline-flex items-center px-6 py-3 bg-gray-600/50 text-gray-300 font-semibold rounded-xl cursor-not-allowed">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Coming Soon
                      </div>
                    ) : (
                      <Link
                        to={tool.path}
                        className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${tool.gradient} text-black font-bold rounded-xl hover:scale-105 transition-all duration-200 shadow-lg`}
                      >
                        Try Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Trusted by Developers
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              See what our customers are saying about our AI tools
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-cyan-500/20 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-cyan-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Basic Pricing
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose the perfect plan for your needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border transition-all duration-300 hover:transform hover:scale-105 ${
                  plan.popular 
                    ? 'border-cyan-500 ring-2 ring-cyan-500/20 shadow-lg shadow-cyan-500/10' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-cyan-500 to-purple-500 text-black px-6 py-2 rounded-full text-sm font-bold flex items-center shadow-lg">
                      <Star className="mr-1 h-4 w-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${plan.gradient} mb-4 shadow-lg`}>
                    <plan.icon className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.id}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-300">{plan.credits}</span>
                  </div>
                  <p className="text-gray-300">{plan.desc}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-300">
                      <Check className="h-4 w-4 text-cyan-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/buy"
                  className={`w-full inline-block text-center px-6 py-4 font-bold rounded-xl transition-all duration-200 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-black hover:from-cyan-400 hover:to-purple-400 shadow-lg shadow-cyan-500/25'
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes gradient {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Homepage;