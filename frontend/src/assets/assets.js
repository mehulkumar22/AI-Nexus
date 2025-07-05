import {Shield, Image, Sparkles, Zap, Star, Award} from 'lucide-react';

export const plans = [
  {
    id: 'Basic',
    price: 49,
    priceDisplay: '₹49',
    credits: 100,
    creditsDisplay: '/100 Credits',
    icon: Star,
    gradient: 'from-gray-500 to-gray-600',
    desc: 'Perfect for testing and personal projects',
    features: [
      "Instant credit activation",
      "Access to basic AI tools",
      "Secure Stripe payments",
      "No hidden fees",
      "Credits never expire"
    ],
    popular: false,
    cta: 'Buy Now'
  },
  {
    id: 'Advanced',
    price: 99,
    priceDisplay: '₹99',
    credits: 250,
    creditsDisplay: '/250 Credits',
    icon: Zap,
    gradient: 'from-cyan-400 to-purple-500',
    desc: 'Ideal for regular users and freelancers',
    features: [
      "Instant credit activation",
      "Priority processing speed",
      "Access to advanced AI features",
      "24/7 email support",
      "Credits never expire"
    ],
    popular: true,
    cta: 'Best Deal'
  },
  {
    id: 'Premium',
    price: 999,
    priceDisplay: '₹999',
    credits: 2500,
    creditsDisplay: '/2500 Credits',
    icon: Award,
    gradient: 'from-purple-400 to-pink-500',
    desc: 'Best for growing businesses and teams',
    features: [
      "Instant credit activation",
      "Highest processing priority",
      "Dedicated account manager",
      "Team sharing and management",
      "Early access to new AI tools"
    ],
    popular: false,
    cta: 'Premium Deal'
  }
];

export const tools = [
    {
      name: 'NudeDetector',
      description: 'Advanced AI-powered content moderation for safe digital environments',
      path: '/nude-detector',
      icon: Shield,
      gradient: 'from-cyan-400 to-blue-500',
      features: ['High accuracy','Real-time detection','Fast image processing'],
      stats: '99.5% Accuracy',
      glowColor: 'shadow-cyan-500/25'
    },
    {
      name: 'Text-to-Image',
      description: 'Generate stunning images from text descriptions using advanced AI',
      path: '/text-to-image',
      icon: Image,
      gradient: 'from-purple-400 to-pink-500',
      features: ['Multiple art styles', 'High resolution', 'Fast generation'],
      stats: '1M+ Images Generated',
      glowColor: 'shadow-purple-500/25'
    },
    {
      name: 'Coming Soon',
      description: 'More powerful AI tools are in development',
      path: '#',
      icon: Sparkles,
      gradient: 'from-gray-500 to-gray-600',
      features: ['Text To Video', 'Text To Speech', 'Image Moderation'],
      comingSoon: true,
      stats: '2026 Release',
      glowColor: 'shadow-gray-500/25'
    }
  ];

export const testimonials = [
  {
    name: 'Janvi Shah',
    role: 'CTO, TechStart India',
    content: 'AI Tools Platform has revolutionized our content moderation process. The accuracy is incredible and integration was seamless.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
  },
  {
    name: 'Amit Patel',
    role: 'Creative Director, DesignHub',
    content: 'The text-to-image generator is a game-changer for our creative workflow. We can prototype ideas in minutes instead of hours.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
  },
  {
    name: 'Muskan Verma',
    role: 'Founder, SafeSpace',
    content: 'Reliable, fast, and accurate. This platform has helped us maintain a safe environment for our users effortlessly.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
  }
];