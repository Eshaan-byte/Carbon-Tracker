'use client';

import { useState } from 'react';
import { ActivityInput } from '@/types';
import { calculateCarbonFootprint } from '@/lib/calculations/carbonFootprint';
import { ACTIVITY_LABELS, ACTIVITY_DESCRIPTIONS } from '@/constants/co2Factors';

interface ActivityFormProps {
  onSubmit: (
    activities: ActivityInput,
    result: {
      totalCO2: number;
      breakdown: Record<string, number>;
      equivalents: Array<{ description: string; value: number; unit: string }>;
    },
    customToastMessage?: string // <-- Add this optional property
  ) => void;
  initialValues?: Partial<ActivityInput>;
}

export default function ActivityForm({ onSubmit, initialValues }: ActivityFormProps) {
  const [activities, setActivities] = useState<ActivityInput>({
    emails: initialValues?.emails || 0,
    streamingHours: initialValues?.streamingHours || 0,
    codingHours: initialValues?.codingHours || 0,
    videoCallHours: initialValues?.videoCallHours || 0,
    cloudStorageGB: initialValues?.cloudStorageGB || 0,
    gamingHours: initialValues?.gamingHours || 0,
    socialMediaHours: initialValues?.socialMediaHours || 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (field: keyof ActivityInput, value: number) => {
    if (value <= 0) {
      if (field.includes('Hours')) {
        return 'Duration must be greater than 0';
      } else if (field === 'emails' || field === 'cloudStorageGB') {
        return 'Quantity must be greater than 0';
      }
    }
    return '';
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let hasActivity = false;

    formFields.forEach(field => {
      const value = activities[field.key];
      if (value > 0) {
        hasActivity = true;
      }
      // Check individual field errors if touched
      if (touched[field.key]) {
        const error = validateField(field.key, value);
        if (error) {
          newErrors[field.key] = error;
        }
      }
    });

    if (!hasActivity) {
      newErrors.form = 'Please select at least one activity';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ActivityInput, value: number) => {
    setActivities(prev => ({ ...prev, [field]: Math.max(0, value) }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBlur = (field: keyof ActivityInput) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, activities[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    formFields.forEach(field => {
      allTouched[field.key] = true;
    });
    setTouched(allTouched);
    
    if (!validateForm()) {
      return; // Don't submit if invalid
    }
    
    setIsSubmitting(true);

    try {
      const result = calculateCarbonFootprint(activities);
      
      // Start submission immediately - don't wait for completion
      onSubmit(activities, result);
      
      // Reset form after a short delay
      setTimeout(() => {
        setActivities({
          emails: 0,
          streamingHours: 0,
          codingHours: 0,
          videoCallHours: 0,
          cloudStorageGB: 0,
          gamingHours: 0,
          socialMediaHours: 0,
        });
        setErrors({});
        setTouched({});
        setIsSubmitting(false);
      }, 500);
      
    } catch (error) {
      console.error('Error submitting activities:', error);
      setIsSubmitting(false);
    }
  };

  const formFields = [
    {
      key: 'emails' as keyof ActivityInput,
      label: ACTIVITY_LABELS.emails,
      description: ACTIVITY_DESCRIPTIONS.emails,
      max: 500,
      step: 1,
      icon: '📧',
    },
    {
      key: 'streamingHours' as keyof ActivityInput,
      label: ACTIVITY_LABELS.streaming,
      description: ACTIVITY_DESCRIPTIONS.streaming,
      max: 24,
      step: 0.5,
      icon: '📺',
    },
    {
      key: 'codingHours' as keyof ActivityInput,
      label: ACTIVITY_LABELS.coding,
      description: ACTIVITY_DESCRIPTIONS.coding,
      max: 24,
      step: 0.5,
      icon: '💻',
    },
    {
      key: 'videoCallHours' as keyof ActivityInput,
      label: ACTIVITY_LABELS.video_calls,
      description: ACTIVITY_DESCRIPTIONS.video_calls,
      max: 24,
      step: 0.5,
      icon: '📹',
    },
    {
      key: 'cloudStorageGB' as keyof ActivityInput,
      label: ACTIVITY_LABELS.cloud_storage,
      description: ACTIVITY_DESCRIPTIONS.cloud_storage,
      max: 1000,
      step: 1,
      icon: '☁️',
    },
    {
      key: 'gamingHours' as keyof ActivityInput,
      label: ACTIVITY_LABELS.gaming,
      description: ACTIVITY_DESCRIPTIONS.gaming,
      max: 24,
      step: 0.5,
      icon: '🎮',
    },
    {
      key: 'socialMediaHours' as keyof ActivityInput,
      label: ACTIVITY_LABELS.social_media,
      description: ACTIVITY_DESCRIPTIONS.social_media,
      max: 24,
      step: 0.5,
      icon: '📱',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Track Your Daily Digital Activities
          </h2>
          <p className="text-gray-600">
            Enter your digital activities for today to calculate your carbon footprint
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {formFields.map((field) => (
              <div key={field.key} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{field.icon}</span>
                  <label className="text-lg font-medium text-gray-900">
                    {field.label}
                  </label>
                </div>
                
                <p className="text-sm text-gray-600 ml-10">
                  {field.description}
                </p>

                <div className="ml-10">
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="0"
                      max={field.max}
                      step={field.step}
                      value={activities[field.key]}
                      onChange={(e) => handleInputChange(field.key, parseFloat(e.target.value))}
                      onBlur={() => handleBlur(field.key)}
                      className={`flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider ${
                        errors[field.key] ? 'border border-red-500' : ''
                      }`}
                      aria-invalid={!!errors[field.key]}
                      aria-describedby={`${field.key}-error ${field.key}-hint`}
                    />
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="0"
                        max={field.max}
                        step={field.step}
                        value={activities[field.key]}
                        onChange={(e) => handleInputChange(field.key, parseFloat(e.target.value) || 0)}
                        onBlur={() => handleBlur(field.key)}
                        className={`w-20 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-gray-900 ${
                          errors[field.key] 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-green-500'
                        }`}
                        aria-invalid={!!errors[field.key]}
                        aria-describedby={`${field.key}-error ${field.key}-hint`}
                      />
                      <span className="text-sm text-gray-500 min-w-fit">
                        {field.key.includes('Hours') ? 'hrs' : 
                         field.key.includes('GB') ? 'GB' : 
                         field.key === 'emails' ? 'emails' : 'units'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
                    <div
                      className="bg-green-500 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${(activities[field.key] / field.max) * 100}%` }}
                    ></div>
                  </div>

                  {/* Hint */}
                  <p id={`${field.key}-hint`} className="text-xs text-gray-500 mt-1">
                    {field.key.includes('Hours') 
                      ? `Enter duration in ${field.key.includes('streaming') || field.key.includes('gaming') ? 'hours' : 'hours'} (e.g., 2.5)` 
                      : field.key === 'emails' 
                      ? 'Enter number of emails sent today' 
                      : field.key === 'cloudStorageGB' 
                      ? 'Enter storage used in GB' 
                      : 'Enter quantity'}
                  </p>

                  {/* Error message */}
                  {errors[field.key] && (
                    <p id={`${field.key}-error`} className="text-sm text-red-600 mt-1" role="alert">
                      {errors[field.key]}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form error message */}
          {errors.form && (
            <div className="text-center">
              <p className="text-sm text-red-600" role="alert">
                {errors.form}
              </p>
            </div>
          )}

          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={isSubmitting || Object.keys(errors).length > 0}
              className="px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <>
                  <span>Calculate Carbon Footprint</span>
                  <span className="ml-2">🌱</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #059669;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #059669;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}