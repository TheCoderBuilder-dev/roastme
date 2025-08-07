'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>1. Information We Collect</CardTitle>
        </CardHeader>
        <CardContent className="prose">
          <p>
            We collect the following types of information:
          </p>
          <ul>
            <li><strong>Account Information:</strong> When you create an account, we collect your email address, username, and password.</li>
            <li><strong>Profile Information:</strong> You may choose to provide additional information such as a bio and profile picture.</li>
            <li><strong>User Content:</strong> We collect and store the content you create, upload, or share on the platform, including photos and text.</li>
            <li><strong>Usage Information:</strong> We collect information about how you use the service, including your interactions with content and other users.</li>
            <li><strong>Device Information:</strong> We collect information about the devices you use to access the service, including IP address, browser type, and operating system.</li>
          </ul>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>2. How We Use Your Information</CardTitle>
        </CardHeader>
        <CardContent className="prose">
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Provide, maintain, and improve the service.</li>
            <li>Create and maintain your account.</li>
            <li>Process transactions and send related information.</li>
            <li>Send you technical notices, updates, security alerts, and support and administrative messages.</li>
            <li>Respond to your comments and questions and provide customer service.</li>
            <li>Monitor and analyze trends, usage, and activities in connection with the service.</li>
            <li>Personalize and improve the service and provide content or features that match user profiles or interests.</li>
          </ul>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>3. Information Sharing</CardTitle>
        </CardHeader>
        <CardContent className="prose">
          <p>
            We may share your information in the following circumstances:
          </p>
          <ul>
            <li><strong>With Other Users:</strong> When you use the service, certain information about you and your activity is visible to other users, such as your username, profile picture, bio, and content you post.</li>
            <li><strong>With Service Providers:</strong> We may share your information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.</li>
            <li><strong>For Legal Reasons:</strong> We may disclose your information if we believe it is necessary to comply with a legal obligation, protect and defend our rights or property, prevent fraud, protect the safety of our users or the public, or in connection with a merger, acquisition, or sale of assets.</li>
          </ul>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>4. Data Security</CardTitle>
        </CardHeader>
        <CardContent className="prose">
          <p>
            We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
            However, no security system is impenetrable, and we cannot guarantee the security of our systems.
          </p>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>5. Your Choices</CardTitle>
        </CardHeader>
        <CardContent className="prose">
          <p>
            You have several choices regarding the use of your information:
          </p>
          <ul>
            <li><strong>Account Information:</strong> You may update, correct, or delete information about you at any time by logging into your account and modifying your profile.</li>
            <li><strong>Privacy Settings:</strong> You can control certain privacy settings in your account, including whether your profile is public or private.</li>
            <li><strong>Email Notifications:</strong> You may opt out of receiving promotional communications from us by following the instructions in those communications.</li>
            <li><strong>Cookies:</strong> Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove or reject browser cookies.</li>
          </ul>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>6. Children's Privacy</CardTitle>
        </CardHeader>
        <CardContent className="prose">
          <p>
            Our service is not directed to children under 13, and we do not knowingly collect personal information from children under 13.
            If we learn that we have collected personal information of a child under 13, we will take steps to delete such information from our files as soon as possible.
          </p>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>7. Changes to This Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose">
          <p>
            We may change this privacy policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy
            and, in some cases, we may provide you with additional notice (such as adding a statement to our homepage or sending you a notification).
          </p>
        </CardContent>
      </Card>
      
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-4">
          By using the RoastMe service, you acknowledge that you have read and understand this Privacy Policy.
        </p>
        <Link href="/terms" className="text-orange-500 hover:text-orange-600">
          View our Terms of Service
        </Link>
      </div>
    </div>
  );
}
