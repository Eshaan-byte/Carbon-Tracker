
'use client';

import React from 'react';
import { TIPS_DATABASE } from '@/constants/tips';
import Link from 'next/link';

const AllTipsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">All Tips</h1>
          <Link href="/" className="text-blue-500 hover:underline">Back to Dashboard</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TIPS_DATABASE.map(tip => (
            <div key={tip.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-4">{tip.icon}</span>
                <h3 className="text-xl font-bold dark:text-white">{tip.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTipsPage;
