import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { plans } from "../assets/assets";
import axios from 'axios';

const BuyCredit = () => {
  const { backendUrl, loadCreditsData, user, token, setShowLogin } = useContext(AppContext);

  const paymentStripe = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
        return;
      }

      const { data } = await axios.post(
        backendUrl + '/api/user/pay-stripe',
        { planId },
        { headers: { token } }
      );

      if (data.success) {
        const { session_url } = data;
        window.location.replace(session_url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Buy Credits
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose a credit package that fits your needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              <div className="text-center mb-8">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${plan.gradient} mb-4 shadow-lg`}>
                  <plan.icon className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.id}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-white">{plan.priceDisplay}</span>
                  <span className="text-gray-300"> / {plan.credits} Credits</span>
                </div>
                <p className="text-gray-300">{plan.desc}</p>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <Check className="h-4 w-4 text-cyan-400 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => paymentStripe(plan.id)}
                className="w-full flex items-center justify-center space-x-3 px-6 py-4 font-bold rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-black hover:from-cyan-400 hover:to-purple-400 shadow-lg shadow-cyan-500/25 transition-all duration-200"
              >
                <img
                  src="https://stripe.com/img/v3/home/twitter.png"
                  alt="Stripe"
                  className="h-6 w-auto"
                />
                <span>Pay with Stripe</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyCredit;
