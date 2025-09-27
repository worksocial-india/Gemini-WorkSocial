import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';

const supportChannels = [
  {
    title: 'Talk with us',
    description: 'Our customer success team is available from 9:00 AM to 7:00 PM IST Monday to Saturday.',
    icon: Phone,
    detail: '+91 98765 43210'
  },
  {
    title: 'Write an email',
    description: 'Share documents, screenshots, or longer questions and we will respond within one business day.',
    icon: Mail,
    detail: 'support@worksocial.in'
  },
  {
    title: 'Visit our office',
    description: 'Prefer a face-to-face conversation? Schedule an appointment at our Mumbai office.',
    icon: MapPin,
    detail: 'WorkSocial India, Andheri East, Mumbai'
  }
];

function Contact() {
  const [submissionState, setSubmissionState] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmissionState('loading');
    
    try {
      // Simulate form submission - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmissionState('success');
      event.target.reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmissionState('idle');
      }, 5000);
    } catch (error) {
      setSubmissionState('error');
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <header className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            <Clock className="h-4 w-4" /> We usually reply in under 2 hours
          </p>
          <h1 className="mt-6 text-4xl font-bold text-slate-900 sm:text-5xl">Let's start a conversation</h1>
          <p className="mt-4 text-lg text-slate-600">
            Whether you're a customer, banker, or partner, our WorkSocial India team is here to help you navigate every step of your financial journey.
          </p>
        </header>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {supportChannels.map((channel) => {
            const { title, description, icon: IconComponent, detail } = channel;
            return (
              <article key={title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <IconComponent className="h-5 w-5" />
                  </span>
                  <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
                </div>
                <p className="mt-4 text-sm text-slate-600">{description}</p>
                <p className="mt-4 text-base font-medium text-blue-700">{detail}</p>
              </article>
            );
          })}
        </div>

        <section className="mt-16 grid gap-12 lg:grid-cols-2">
          <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-md">
            <h2 className="text-2xl font-semibold text-slate-900">Send us a message</h2>
            <p className="mt-2 text-sm text-slate-600">
              Share a few details and one of our specialists will reach out with personalised guidance.
            </p>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Enter your name"
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 h-12 text-sm md:text-base text-slate-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 touch-manipulation"
                  disabled={submissionState === 'loading'}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Work email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="you@company.com"
                  inputMode="email"
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 h-12 text-sm md:text-base text-slate-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 touch-manipulation"
                  disabled={submissionState === 'loading'}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700">How can we help?</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  placeholder="Give us a little context so we can tailor our response."
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm md:text-base text-slate-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 touch-manipulation"
                  disabled={submissionState === 'loading'}
                />
              </div>
              <button
                type="submit"
                disabled={submissionState === 'loading'}
                className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 h-12 text-sm font-semibold text-white shadow-lg transition hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
              >
                {submissionState === 'loading' ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <MessageSquare className="h-4 w-4" />
                    Send message
                  </>
                )}
              </button>
              {submissionState === 'success' && (
                <p className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                  ✅ Thank you for reaching out! We'll get back to you within 24 hours.
                </p>
              )}
              {submissionState === 'error' && (
                <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  ❌ Something went wrong. Please try again or email us directly at support@worksocial.in
                </p>
              )}
            </form>
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl bg-blue-600 p-8 text-white shadow-lg">
              <h2 className="text-2xl font-semibold">Partnership enquiries</h2>
              <p className="mt-3 text-sm text-blue-50">
                Building financial literacy programmes for your institution? Collaborate with WorkSocial India for curated content, workshops, and personalised tools.
              </p>
              <a
                href="mailto:partnerships@worksocial.in"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
              >
                <Mail className="h-4 w-4" /> partnerships@worksocial.in
              </a>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Office hours</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex items-start justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 7:00 PM IST</span>
                </li>
                <li className="flex items-start justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM IST</span>
                </li>
                <li className="flex items-start justify-between">
                  <span>Sunday</span>
                  <span className="text-slate-400">Closed</span>
                </li>
              </ul>
              <p className="mt-6 rounded-xl bg-slate-50 p-4 text-xs text-slate-500">
                Need urgent assistance outside these hours? Leave us a message and mark it as "priority" - our on-call specialist will get notified instantly.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Contact;
