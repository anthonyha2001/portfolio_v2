import type { Metadata } from 'next';
import { IntakeForm } from '@/components/portal/intake-form';

export const metadata: Metadata = {
  title: 'Project Intake Form | Client Portal',
  description: 'Complete your project intake form. Save your progress anytime.',
};

export default function IntakePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-dark mb-2">
          Project Intake Form
        </h1>
        <p className="text-gray font-body">
          Complete all sections. Save your progress anytime.
        </p>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
        <IntakeForm />
      </div>
    </div>
  );
}

