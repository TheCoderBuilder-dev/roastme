'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>1. Acceptance of Terms</CardTitle>
        </CardHeader>
        <CardContent className="prose">
          <p>
            By accessing or using the RoastMe service, you agree to be bound by these Terms of Service. If you do not agree
            to these terms, please do not use the service.
          </p>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>2. Description of Service</CardTitle>
        </CardHeader>
        <CardContent className="prose">
          <p>
            RoastMe is a social platform where users can submit photos and request to be "roasted" by other users in a comedic context.
            The platform features a gamified experience with leaderboards, achievements, and a voting system.
          </p>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>3. User Conduct</CardTitle>
        </CardHeader>
        <CardContent className="prose">
          <p>
            As a user of the RoastMe service, you agree not to:
          </p>
          <ul>
            <li>Post content that is illegal, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, invasive of another's privacy, or otherwise objectionable.</li>
            <li>Post content that you do not have a right to make available under any law or contractual relationship.</li>
            <li>Impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
            <li>Post or transmit any unsolicited advertising, promotional materials, "spam," "chain letters," or any other form of solicitation.</li>
            <li>Post any material that contains software viruses or any other computer code, files, or programs designed to interrupt, destroy, or limit the functionality of any computer software or hardware.</li>
          </ul>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>4. Content Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="prose">
          <p>
            All "roasts" should be comedic in nature and not malicious. The following content is prohibited:
          </p>
          <ul>
            <li>Content that promotes discrimination, bigotry, racism, hatred against any individual or group.</li>
            <li>Content that is sexually explicit or pornographic.</li>
            <li>Content that promotes violence or describes graphic violence.</li>
            <li>Content that promotes illegal activities or harm to others.</li>
            <li>Content that infringes on intellectual property rights.</li>
          </ul>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>5. Moderation</CardTitle>
        </CardHeader>
        <CardContent className="prose">
          <p>
            RoastMe reserves the right to moderate content and remove any content that violates these terms. 
            We may also suspend or terminate user accounts that repeatedly violate these terms or engage in behavior
            that is harmful to the community.
          </p>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>6. Limitation of Liability</CardTitle>
        </CardHeader>
        <CardContent className="prose">
          <p>
            RoastMe shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from
            your access to or use of, or inability to access or use, the service or any content provided on or through the service.
          </p>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>7. Changes to Terms</CardTitle>
        </CardHeader>
        <CardContent className="prose">
          <p>
            We reserve the right to modify these terms at any time. We will provide notice of significant changes to these terms
            by posting the new terms on the site and/or via email.
          </p>
        </CardContent>
      </Card>
      
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-4">
          By using the RoastMe service, you acknowledge that you have read and understand these terms and agree to be bound by them.
        </p>
        <Link href="/privacy" className="text-orange-500 hover:text-orange-600">
          View our Privacy Policy
        </Link>
      </div>
    </div>
  );
}
