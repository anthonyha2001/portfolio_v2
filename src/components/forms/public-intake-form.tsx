'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  intakeFormSchema,
  type IntakeFormData,
} from '@/lib/validations';
import {
  intakeFormSteps,
  brandVibeOptions,
  pageOptions,
  featureOptions,
} from '@/lib/constants';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'public-intake-form-draft';

const publicIntakeSchema = intakeFormSchema.extend({
  contactName: z.string().min(1, 'Name is required'),
  contactEmail: z.string().email('Valid email is required'),
  contactPhone: z.string().optional(),
});

type PublicIntakeFormData = IntakeFormData & {
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
};

export function PublicIntakeForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const totalSteps = intakeFormSteps.length;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<PublicIntakeFormData>({
    resolver: zodResolver(publicIntakeSchema),
    defaultValues: {
      requiredPages: [],
      requiredFeatures: [],
    },
  });

  // Watch all form values for auto-save
  const formValues = watch();

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved) as Partial<PublicIntakeFormData>;
        (Object.keys(data) as (keyof PublicIntakeFormData)[]).forEach((key) => {
          if (data[key] !== undefined) {
            setValue(key, data[key] as PublicIntakeFormData[typeof key]);
          }
        });
      } catch (error) {
        console.error('Error loading form data:', error);
      }
    }
  }, [setValue]);

  // Auto-save to localStorage on every field change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formValues));
  }, [formValues]);

  const onSubmit = async (data: PublicIntakeFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/intake/public-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      localStorage.removeItem(STORAGE_KEY);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Public intake submission error:', error);
      alert('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePageToggle = (page: string) => {
    const current = watch('requiredPages') || [];
    const updated = current.includes(page)
      ? current.filter((p) => p !== page)
      : [...current, page];
    setValue('requiredPages', updated);
  };

  const handleFeatureToggle = (feature: string) => {
    const current = watch('requiredFeatures') || [];
    const updated = current.includes(feature)
      ? current.filter((f) => f !== feature)
      : [...current, feature];
    setValue('requiredFeatures', updated);
  };

  if (isSubmitted) {
    return (
      <div className="bg-light border border-gray-200 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-display font-bold text-dark mb-4">
          Intake submitted!
        </h2>
        <p className="text-lg font-body text-gray mb-2">
          I&apos;ll review your project details and get back to you within 24 hours.
        </p>
        <p className="text-sm font-body text-gray">
          You&apos;ll receive an email confirmation shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Step Indicator */}
      <div className="relative">
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-300 hidden md:block"></div>
        <div className="flex justify-between relative">
          {intakeFormSteps.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;

            return (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                    isCompleted
                      ? 'bg-accent'
                      : isCurrent
                      ? 'bg-white border-4 border-accent'
                      : 'bg-gray-300'
                  }`}
                >
                  {isCompleted ? (
                    <span className="text-white text-lg font-bold">✓</span>
                  ) : (
                    <span
                      className={`text-lg font-bold ${
                        isCurrent ? 'text-accent' : 'text-gray-500'
                      }`}
                    >
                      {step.id}
                    </span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <div
                    className={`text-xs font-body ${
                      isCurrent ? 'text-accent font-bold' : 'text-gray-500'
                    }`}
                  >
                    {step.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {currentStep === 1 && (
          <div className="space-y-6">
            {/* Contact fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-body font-medium text-dark mb-2">
                  Your Name <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  {...register('contactName')}
                  className={`w-full px-4 py-3 border rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-accent ${
                    errors.contactName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.contactName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.contactName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-body font-medium text-dark mb-2">
                  Email <span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  {...register('contactEmail')}
                  className={`w-full px-4 py-3 border rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-accent ${
                    errors.contactEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.contactEmail && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.contactEmail.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-dark mb-2">
                Phone (optional)
              </label>
              <input
                type="tel"
                {...register('contactPhone')}
                className="w-full px-4 py-3 border border-gray-300 rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* Business fields */}
            <div>
              <label className="block text-sm font-body font-medium text-dark mb-2">
                Business Name <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                {...register('businessName')}
                className={`w-full px-4 py-3 border rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-accent ${
                  errors.businessName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.businessName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.businessName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-dark mb-2">
                Business Description <span className="text-accent">*</span>
              </label>
              <textarea
                rows={4}
                {...register('businessDescription')}
                className={`w-full px-4 py-3 border rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-accent resize-y ${
                  errors.businessDescription
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {errors.businessDescription && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.businessDescription.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-dark mb-2">
                Services Offered
              </label>
              <textarea
                rows={4}
                {...register('servicesOffered')}
                className="w-full px-4 py-3 border border-gray-300 rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-accent resize-y"
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-body font-medium text-dark mb-2">
                Target Customers
              </label>
              <textarea
                rows={4}
                {...register('targetCustomers')}
                className="w-full px-4 py-3 border border-gray-300 rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-accent resize-y"
              />
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-dark mb-2">
                Customer Problems
              </label>
              <textarea
                rows={4}
                {...register('customerProblems')}
                className="w-full px-4 py-3 border border-gray-300 rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-accent resize-y"
              />
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-dark mb-2">
                Competitor URLs
              </label>
              <textarea
                rows={4}
                {...register('competitorUrls')}
                placeholder="One URL per line"
                className="w-full px-4 py-3 border border-gray-300 rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-accent resize-y"
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-body font-medium text-dark mb-2">
                Brand Vibe
              </label>
              <select
                {...register('brandVibe')}
                className="w-full px-4 py-3 border border-gray-300 rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="">Select a vibe...</option>
                {brandVibeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-dark mb-2">
                Color Preferences
              </label>
              <input
                type="text"
                {...register('colorPreferences')}
                placeholder="e.g. blue and white, earth tones"
                className="w-full px-4 py-3 border border-gray-300 rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-dark mb-2">
                Website References
              </label>
              <textarea
                rows={4}
                {...register('websiteReferences')}
                placeholder="Links to sites you like"
                className="w-full px-4 py-3 border border-gray-300 rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-accent resize-y"
              />
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-body font-medium text-dark mb-4">
                Required Pages
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {pageOptions.map((page) => {
                  const current = watch('requiredPages') || [];
                  const isChecked = current.includes(page);
                  return (
                    <label
                      key={page}
                      className="flex items-center gap-2 p-3 border border-gray-300 rounded-md cursor-pointer hover:border-accent transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handlePageToggle(page)}
                        className="w-4 h-4 text-accent"
                      />
                      <span className="font-body text-dark text-sm">
                        {page}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-dark mb-4">
                Required Features
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {featureOptions.map((feature) => {
                  const current = watch('requiredFeatures') || [];
                  const isChecked = current.includes(feature);
                  return (
                    <label
                      key={feature}
                      className="flex items-center gap-2 p-3 border border-gray-300 rounded-md cursor-pointer hover:border-accent transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleFeatureToggle(feature)}
                        className="w-4 h-4 text-accent"
                      />
                      <span className="font-body text-dark text-sm">
                        {feature}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-dark mb-4">
                Content Ready?
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="yes"
                    {...register('contentReady')}
                    className="w-4 h-4 text-accent"
                  />
                  <span className="font-body text-dark">
                    Yes I have content ready
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="no"
                    {...register('contentReady')}
                    className="w-4 h-4 text-accent"
                  />
                  <span className="font-body text-dark">
                    No I need help
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-body font-medium text-dark mb-4">
                Contact Preference
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="email"
                    {...register('contactPreference')}
                    className="w-4 h-4 text-accent"
                  />
                  <span className="font-body text-dark">Email</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="phone"
                    {...register('contactPreference')}
                    className="w-4 h-4 text-accent"
                  />
                  <span className="font-body text-dark">Phone</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="either"
                    {...register('contactPreference')}
                    className="w-4 h-4 text-accent"
                  />
                  <span className="font-body text-dark">Either</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-dark mb-2">
                Deadline
              </label>
              <input
                type="text"
                {...register('deadline')}
                className="w-full px-4 py-3 border border-gray-300 rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-dark mb-2">
                Additional Notes
              </label>
              <textarea
                rows={4}
                {...register('additionalNotes')}
                className="w-full px-4 py-3 border border-gray-300 rounded-md font-body text-dark focus:outline-none focus:ring-2 focus:ring-accent resize-y"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div>
            {currentStep > 1 && (
              <Button type="button" variant="secondary" onClick={handleBack}>
                Back
              </Button>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                const data = watch();
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
              }}
              className="text-sm text-gray hover:text-accent font-body"
            >
              Save Draft
            </button>
            {currentStep < totalSteps ? (
              <Button type="button" variant="primary" onClick={handleNext}>
                Save & Continue
              </Button>
            ) : (
              <Button type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Intake'}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}


