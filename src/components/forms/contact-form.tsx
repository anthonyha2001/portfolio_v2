'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone number is required'),
  email: z.string().email('Valid email is required'),
  service: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [canAccessIntake, setCanAccessIntake] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const watchedFields = watch(['name', 'phone', 'email']);
  const hasRequiredFields = watchedFields[0] && watchedFields[1] && watchedFields[2];

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    console.log('Form submitted:', data);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setIsSubmitted(true);
    setCanAccessIntake(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-display font-bold text-dark mb-2">
          Message Sent!
        </h3>
        <p className="text-gray mb-6">
          I&apos;ll get back to you within 24 hours.
        </p>
        {canAccessIntake && (
          <Link
            href="/portal/intake"
            className="inline-block px-6 py-3 bg-accent text-white font-display font-semibold rounded-lg hover:bg-accent/90 transition"
          >
            Start Intake Form →
          </Link>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-8 space-y-6">
      {/* Name */}
      <div>
        <label className="block font-display font-semibold text-dark mb-2">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('name')}
          placeholder="Your name"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-accent focus:outline-none transition"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block font-display font-semibold text-dark mb-2">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          {...register('phone')}
          placeholder="Your phone number"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-accent focus:outline-none transition"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block font-display font-semibold text-dark mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          {...register('email')}
          placeholder="Your email"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-accent focus:outline-none transition"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Service */}
      <div>
        <label className="block font-display font-semibold text-dark mb-2">
          Service Interested In
        </label>
        <select
          {...register('service')}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-accent focus:outline-none transition bg-white"
        >
          <option value="">Select a service</option>
          <option value="website-development">Website Development</option>
          <option value="seo-optimization">SEO Optimization</option>
          <option value="website-maintenance">Website Maintenance</option>
          <option value="hosting-domain">Hosting & Domain</option>
          <option value="website-optimization">Website Optimization</option>
          <option value="addons-integrations">Add-ons & Integrations</option>
          <option value="not-sure">Not sure yet</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block font-display font-semibold text-dark mb-2">
          Tell me about your project
        </label>
        <textarea
          {...register('message')}
          placeholder="Describe your project or ask any questions..."
          rows={4}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-accent focus:outline-none transition resize-none"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? 'Sending...' : 'Send Message'}
      </Button>

      {/* Intake Form Access */}
      <div className="pt-4 border-t border-gray-100">
        <p className="text-sm text-gray text-center mb-3">
          Ready to start your project?
        </p>
        {hasRequiredFields ? (
          <Link
            href="/portal/intake"
            className="block w-full text-center px-6 py-3 bg-dark text-white font-display font-semibold rounded-lg hover:bg-dark/90 transition"
          >
            Go to Intake Form →
          </Link>
        ) : (
          <div className="w-full text-center px-6 py-3 bg-gray-100 text-gray font-display font-semibold rounded-lg cursor-not-allowed">
            Fill in name, phone & email to access intake form
          </div>
        )}
      </div>
    </form>
  );
}


