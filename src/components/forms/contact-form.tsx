'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormData } from '@/lib/validations';
import { contactFormFields } from '@/lib/constants';
import { Button } from '@/components/ui/button';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);
      setIsSuccess(false);
      setError(null);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error || 'Failed to send message.');
      }

      setIsSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-light border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-lg font-body text-dark">
          Message sent! I&apos;ll be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-body text-red-700">
          {error}
        </div>
      )}
      {contactFormFields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="block text-sm font-body font-medium text-dark mb-2"
          >
            {field.label}
            {field.required && <span className="text-accent ml-1">*</span>}
          </label>

          {field.type === 'select' ? (
            <>
              <select
                id={field.name}
                {...register(field.name as keyof ContactFormData)}
                className={`w-full px-4 py-3 border rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent ${
                  errors[field.name as keyof ContactFormData]
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              >
                <option value="">Select an option...</option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors[field.name as keyof ContactFormData] && (
                <p className="mt-1 text-sm text-red-600 font-body">
                  {errors[field.name as keyof ContactFormData]?.message as string}
                </p>
              )}
            </>
          ) : field.type === 'textarea' ? (
            <>
              <textarea
                id={field.name}
                rows={4}
                {...register(field.name as keyof ContactFormData)}
                placeholder={field.placeholder}
                className={`w-full px-4 py-3 border rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-y ${
                  errors[field.name as keyof ContactFormData]
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {errors[field.name as keyof ContactFormData] && (
                <p className="mt-1 text-sm text-red-600 font-body">
                  {errors[field.name as keyof ContactFormData]?.message as string}
                </p>
              )}
            </>
          ) : (
            <>
              <input
                type={field.type}
                id={field.name}
                {...register(field.name as keyof ContactFormData)}
                placeholder={field.placeholder}
                className={`w-full px-4 py-3 border rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent ${
                  errors[field.name as keyof ContactFormData]
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {errors[field.name as keyof ContactFormData] && (
                <p className="mt-1 text-sm text-red-600 font-body">
                  {errors[field.name as keyof ContactFormData]?.message as string}
                </p>
              )}
            </>
          )}
        </div>
      ))}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}

