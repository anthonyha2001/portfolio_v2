import { contact } from '@/lib/constants';

export function ContactExpectation() {
  return (
    <div className="bg-light border border-gray-200 rounded-lg p-6">
      <p className="text-sm font-body text-gray leading-relaxed">
        {contact.expectation}
      </p>
    </div>
  );
}

