import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  business: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  timeline: z.string().min(1, 'Please select a timeline'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const intakeFormSchema = z.object({
  // Step 1
  businessName: z.string().min(1, 'Business name is required'),
  businessDescription: z.string().min(50, 'Business description must be at least 50 characters'),
  servicesOffered: z.string().optional(),
  
  // Step 2
  targetCustomers: z.string().optional(),
  customerProblems: z.string().optional(),
  competitorUrls: z.string().optional(),
  
  // Step 3
  brandVibe: z.string().optional(),
  colorPreferences: z.string().optional(),
  websiteReferences: z.string().optional(),
  
  // Step 4
  requiredPages: z.array(z.string()).optional(),
  requiredFeatures: z.array(z.string()).optional(),
  contentReady: z.string().optional(),
  
  // Step 5
  contactPreference: z.string().optional(),
  deadline: z.string().optional(),
  additionalNotes: z.string().optional(),
});

export type IntakeFormData = z.infer<typeof intakeFormSchema>;

