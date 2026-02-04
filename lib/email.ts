import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface IntakeFormData {
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  businessName: string;
  businessDescription: string;
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
  userEmail?: string;
  userName?: string;
}

export async function sendIntakeEmail(data: IntakeFormData) {
  console.log('sendIntakeEmail called with data:', JSON.stringify(data, null, 2));
  const specsText = `
Contact Name: ${data.contactName || data.userName || 'N/A'}
Contact Email: ${data.contactEmail || data.userEmail || 'N/A'}
Contact Phone: ${data.contactPhone || 'N/A'}
Business Name: ${data.businessName}
Description: ${data.businessDescription}
Services: ${data.servicesOffered || 'N/A'}
Target Customers: ${data.targetCustomers || 'N/A'}
Customer Problems: ${data.customerProblems || 'N/A'}
Competitors: ${data.competitorUrls || 'N/A'}
Brand Vibe: ${data.brandVibe || 'N/A'}
Colors: ${data.colorPreferences || 'N/A'}
Website References: ${data.websiteReferences || 'N/A'}
Required Pages: ${data.requiredPages?.join(', ') || 'N/A'}
Required Features: ${data.requiredFeatures?.join(', ') || 'N/A'}
Content Ready: ${data.contentReady || 'N/A'}
Contact Preference: ${data.contactPreference || 'N/A'}
Deadline: ${data.deadline || 'N/A'}
Additional Notes: ${data.additionalNotes || 'N/A'}
  `.trim();

  const htmlEmail = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Project Intake</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #1C2343; padding: 32px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">
                🚀 New Project Intake
              </h1>
              <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 14px;">
                A new client has submitted their project details
              </p>
            </td>
          </tr>

          <!-- Client Info -->
          <tr>
            <td style="padding: 32px;">
              <div style="background-color: #f0f9ff; border-left: 4px solid #0D9AFD; padding: 16px; margin-bottom: 24px; border-radius: 0 8px 8px 0;">
                <h2 style="color: #1C2343; margin: 0 0 8px 0; font-size: 18px;">
                  ${data.businessName}
                </h2>
                <p style="color: #64748b; margin: 0; font-size: 14px;">
                  ${data.contactName || data.userName || 'Client'} • ${data.contactEmail || data.userEmail || 'No email provided'}
                </p>
                ${
                  data.contactPhone
                    ? `<p style="color: #64748b; margin: 4px 0 0 0; font-size: 13px;">Phone: ${data.contactPhone}</p>`
                    : ''
                }
              </div>

              <!-- Business Description -->
              <div style="margin-bottom: 24px;">
                <h3 style="color: #1C2343; margin: 0 0 8px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
                  Business Description
                </h3>
                <p style="color: #475569; margin: 0; font-size: 15px; line-height: 1.6;">
                  ${data.businessDescription}
                </p>
              </div>

              <!-- Two Column Grid -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td width="48%" valign="top" style="padding-right: 12px;">
                    <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                      <h4 style="color: #64748b; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase;">Brand Vibe</h4>
                      <p style="color: #1C2343; margin: 0; font-size: 14px; font-weight: 500;">${data.brandVibe || 'Not specified'}</p>
                    </div>
                    <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                      <h4 style="color: #64748b; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase;">Colors</h4>
                      <p style="color: #1C2343; margin: 0; font-size: 14px; font-weight: 500;">${data.colorPreferences || 'Not specified'}</p>
                    </div>
                    <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px;">
                      <h4 style="color: #64748b; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase;">Content Ready</h4>
                      <p style="color: #1C2343; margin: 0; font-size: 14px; font-weight: 500;">${data.contentReady || 'Not specified'}</p>
                    </div>
                  </td>
                  <td width="48%" valign="top" style="padding-left: 12px;">
                    <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                      <h4 style="color: #64748b; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase;">Contact Preference</h4>
                      <p style="color: #1C2343; margin: 0; font-size: 14px; font-weight: 500;">${data.contactPreference || 'Not specified'}</p>
                    </div>
                    <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                      <h4 style="color: #64748b; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase;">Deadline</h4>
                      <p style="color: #1C2343; margin: 0; font-size: 14px; font-weight: 500;">${data.deadline || 'Not specified'}</p>
                    </div>
                    <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px;">
                      <h4 style="color: #64748b; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase;">Target Customers</h4>
                      <p style="color: #1C2343; margin: 0; font-size: 14px; font-weight: 500;">${data.targetCustomers || 'Not specified'}</p>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Required Pages -->
              ${data.requiredPages && data.requiredPages.length > 0 ? `
              <div style="margin-bottom: 24px;">
                <h3 style="color: #1C2343; margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
                  Required Pages
                </h3>
                <div>
                  ${data.requiredPages.map(page => `
                    <span style="display: inline-block; background-color: #0D9AFD; color: white; padding: 6px 12px; border-radius: 20px; font-size: 13px; margin: 4px 4px 4px 0;">${page}</span>
                  `).join('')}
                </div>
              </div>
              ` : ''}

              <!-- Required Features -->
              ${data.requiredFeatures && data.requiredFeatures.length > 0 ? `
              <div style="margin-bottom: 24px;">
                <h3 style="color: #1C2343; margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
                  Required Features
                </h3>
                <div>
                  ${data.requiredFeatures.map(feature => `
                    <span style="display: inline-block; background-color: #1C2343; color: white; padding: 6px 12px; border-radius: 20px; font-size: 13px; margin: 4px 4px 4px 0;">${feature}</span>
                  `).join('')}
                </div>
              </div>
              ` : ''}

              <!-- Website References -->
              ${data.websiteReferences ? `
              <div style="margin-bottom: 24px;">
                <h3 style="color: #1C2343; margin: 0 0 8px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
                  Website References
                </h3>
                <p style="color: #475569; margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-line;">
                  ${data.websiteReferences}
                </p>
              </div>
              ` : ''}

              <!-- Additional Notes -->
              ${data.additionalNotes ? `
              <div style="margin-bottom: 24px;">
                <h3 style="color: #1C2343; margin: 0 0 8px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
                  Additional Notes
                </h3>
                <p style="color: #475569; margin: 0; font-size: 14px; line-height: 1.6;">
                  ${data.additionalNotes}
                </p>
              </div>
              ` : ''}

              <!-- Copy Specs Box -->
              <div style="background-color: #1C2343; padding: 24px; border-radius: 8px; margin-top: 32px;">
                <h3 style="color: #ffffff; margin: 0 0 16px 0; font-size: 16px;">
                  📋 Quick Copy - Project Specs
                </h3>
                <pre style="background-color: #0f172a; color: #e2e8f0; padding: 16px; border-radius: 6px; font-size: 12px; line-height: 1.5; white-space: pre-wrap; word-wrap: break-word; margin: 0; font-family: 'Courier New', monospace;">${specsText}</pre>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; margin: 0; font-size: 13px;">
                This email was sent from your website intake form.
              </p>
              <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 12px;">
                Anthony Hasrouny • Web Development
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'anthonyhasrouny8@gmail.com',
    subject: `🚀 New Project: ${data.businessName}`,
    html: htmlEmail,
    text: `New Project Intake\n\n${specsText}`,
  };

  console.log('About to call transporter.sendMail');
  const result = await transporter.sendMail(mailOptions);
  console.log('transporter.sendMail succeeded:', result);
  return result;
}


