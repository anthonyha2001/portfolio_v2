'use client';

import { useState } from 'react';

interface IntakeData {
  businessName?: string;
  businessDescription?: string;
  servicesOffered?: string;
  targetCustomers?: string;
  customerProblems?: string;
  competitorUrls?: string;
  brandVibe?: string;
  colorPreferences?: string;
  websiteReferences?: string;
  requiredPages?: string[];
  requiredFeatures?: string[];
  contentReady?: string;
  contactPreference?: string;
  deadline?: string;
  additionalNotes?: string;
}

interface IntakeViewerProps {
  intakeData: IntakeData;
}

export function IntakeViewer({ intakeData }: IntakeViewerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasData = Object.keys(intakeData).length > 0;

  if (!hasData) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <h2 className="text-xl font-display font-bold text-dark">Intake Data</h2>
        <span className="text-gray">{isExpanded ? '−' : '+'}</span>
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          {intakeData.businessName && (
            <div>
              <label className="block text-sm font-body font-medium text-gray mb-1">
                Business Name
              </label>
              <p className="font-body text-dark">{intakeData.businessName}</p>
            </div>
          )}

          {intakeData.businessDescription && (
            <div>
              <label className="block text-sm font-body font-medium text-gray mb-1">
                Business Description
              </label>
              <p className="font-body text-dark">{intakeData.businessDescription}</p>
            </div>
          )}

          {intakeData.servicesOffered && (
            <div>
              <label className="block text-sm font-body font-medium text-gray mb-1">
                Services Offered
              </label>
              <p className="font-body text-dark">{intakeData.servicesOffered}</p>
            </div>
          )}

          {intakeData.targetCustomers && (
            <div>
              <label className="block text-sm font-body font-medium text-gray mb-1">
                Target Customers
              </label>
              <p className="font-body text-dark">{intakeData.targetCustomers}</p>
            </div>
          )}

          {intakeData.customerProblems && (
            <div>
              <label className="block text-sm font-body font-medium text-gray mb-1">
                Customer Problems
              </label>
              <p className="font-body text-dark">{intakeData.customerProblems}</p>
            </div>
          )}

          {intakeData.competitorUrls && (
            <div>
              <label className="block text-sm font-body font-medium text-gray mb-1">
                Competitor URLs
              </label>
              <p className="font-body text-dark whitespace-pre-line">{intakeData.competitorUrls}</p>
            </div>
          )}

          {intakeData.brandVibe && (
            <div>
              <label className="block text-sm font-body font-medium text-gray mb-1">
                Brand Vibe
              </label>
              <p className="font-body text-dark">{intakeData.brandVibe}</p>
            </div>
          )}

          {intakeData.colorPreferences && (
            <div>
              <label className="block text-sm font-body font-medium text-gray mb-1">
                Color Preferences
              </label>
              <p className="font-body text-dark">{intakeData.colorPreferences}</p>
            </div>
          )}

          {intakeData.websiteReferences && (
            <div>
              <label className="block text-sm font-body font-medium text-gray mb-1">
                Website References
              </label>
              <p className="font-body text-dark whitespace-pre-line">{intakeData.websiteReferences}</p>
            </div>
          )}

          {intakeData.requiredPages && intakeData.requiredPages.length > 0 && (
            <div>
              <label className="block text-sm font-body font-medium text-gray mb-1">
                Required Pages
              </label>
              <div className="flex flex-wrap gap-2">
                {intakeData.requiredPages.map((page, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-dark rounded text-sm font-body"
                  >
                    {page}
                  </span>
                ))}
              </div>
            </div>
          )}

          {intakeData.requiredFeatures && intakeData.requiredFeatures.length > 0 && (
            <div>
              <label className="block text-sm font-body font-medium text-gray mb-1">
                Required Features
              </label>
              <div className="flex flex-wrap gap-2">
                {intakeData.requiredFeatures.map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-dark rounded text-sm font-body"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {intakeData.contentReady && (
            <div>
              <label className="block text-sm font-body font-medium text-gray mb-1">
                Content Ready
              </label>
              <p className="font-body text-dark">{intakeData.contentReady}</p>
            </div>
          )}

          {intakeData.contactPreference && (
            <div>
              <label className="block text-sm font-body font-medium text-gray mb-1">
                Contact Preference
              </label>
              <p className="font-body text-dark">{intakeData.contactPreference}</p>
            </div>
          )}

          {intakeData.deadline && (
            <div>
              <label className="block text-sm font-body font-medium text-gray mb-1">
                Deadline
              </label>
              <p className="font-body text-dark">{intakeData.deadline}</p>
            </div>
          )}

          {intakeData.additionalNotes && (
            <div>
              <label className="block text-sm font-body font-medium text-gray mb-1">
                Additional Notes
              </label>
              <p className="font-body text-dark">{intakeData.additionalNotes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

