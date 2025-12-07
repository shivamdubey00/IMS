"use client"

import React, { useState } from "react";
import { Mail, Calendar, Clock, User, Phone, CheckCircle2, AlertCircle } from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  startDate: string;
  months: number;
  email: string;
  mobile: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  startDate?: string;
  months?: string;
  email?: string;
  mobile?: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export default function InternshipForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    startDate: "",
    months: 1,
    email: "",
    mobile: "",
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.firstName || formData.firstName.length < 2) {
      newErrors.firstName = "First name required (min 2 characters)";
    }
    if (!formData.lastName || formData.lastName.length < 2) {
      newErrors.lastName = "Last name required (min 2 characters)";
    }
    if (!formData.startDate) {
      newErrors.startDate = "Start date required";
    }
    if (!formData.months || formData.months < 1) {
      newErrors.months = "Months can't be 0 or less";
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }
    if (!formData.mobile || formData.mobile.length < 10) {
      newErrors.mobile = "Mobile number required (min 10 digits)";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setApiError("");
    
    try {
      // Prepare the payload
      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        startDate: formData.startDate,
        months: Number(formData.months),
        email: formData.email.trim().toLowerCase(),
        mobile: formData.mobile.trim(),
        submittedAt: new Date().toISOString(),
      };

      console.log("Submitting payload:", payload);

      // Replace with your actual API endpoint
      const API_ENDPOINT = "https://68827f2121fa24876a9b0e5c.mockapi.io/codolog/table"; // Update this with your actual endpoint
      
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit application");
      }

      console.log("API Response:", result);
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        handleReset();
      }, 3000);
      
    } catch (error) {
      console.error("Submission error:", error);
      setApiError(
        error instanceof Error 
          ? error.message 
          : "Failed to submit application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = (): void => {
    setFormData({
      firstName: "",
      lastName: "",
      startDate: "",
      months: 1,
      email: "",
      mobile: "",
    });
    setErrors({});
    setApiError("");
    setSubmitted(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "months" ? Number(value) : value
    }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }
    
    // Clear API error when user starts typing
    if (apiError) {
      setApiError("");
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center  p-6">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 mb-6 shadow-lg shadow-emerald-500/30">
            <CheckCircle2 size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Application Submitted!</h2>
          <p className="text-slate-400">Thank you for your interest. We'll get back to you soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center  p-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 via-amber-600 to-orange-700 mb-4 shadow-lg shadow-orange-500/30">
            <span className="text-white font-bold text-2xl">C</span>
          </div>
          <h1 className="text-3xl font-bold text-black bg-clip-text mb-2">
            Internship Application 
          </h1>
          <p className="text-slate-400">Join our team and grow your career with us</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8">
          {/* API Error Alert */}
          {apiError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3">
              <AlertCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-red-400 font-semibold text-sm mb-1">Submission Failed</h3>
                <p className="text-red-300 text-sm">{apiError}</p>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2">
                  <User size={16} className="text-orange-400" />
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border bg-slate-800/50 text-white placeholder-slate-500 ${
                    errors.firstName 
                      ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-slate-700 focus:border-orange-500 focus:ring-orange-500/20"
                  } focus:outline-none focus:ring-2 transition-all duration-200`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-400 rounded-full"></span>
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2">
                  <User size={16} className="text-orange-400" />
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border bg-slate-800/50 text-white placeholder-slate-500 ${
                    errors.lastName 
                      ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-slate-700 focus:border-orange-500 focus:ring-orange-500/20"
                  } focus:outline-none focus:ring-2 transition-all duration-200`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-400 rounded-full"></span>
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2">
                  <Calendar size={16} className="text-orange-400" />
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border bg-slate-800/50 text-white placeholder-slate-500 ${
                    errors.startDate 
                      ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-slate-700 focus:border-orange-500 focus:ring-orange-500/20"
                  } focus:outline-none focus:ring-2 transition-all duration-200`}
                />
                {errors.startDate && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-400 rounded-full"></span>
                    {errors.startDate}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2">
                  <Clock size={16} className="text-orange-400" />
                  Duration (Months)
                </label>
                <input
                  type="number"
                  name="months"
                  value={formData.months}
                  onChange={handleChange}
                  min="1"
                  className={`w-full px-4 py-3 rounded-lg border bg-slate-800/50 text-white placeholder-slate-500 ${
                    errors.months 
                      ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" 
                      : "border-slate-700 focus:border-orange-500 focus:ring-orange-500/20"
                  } focus:outline-none focus:ring-2 transition-all duration-200`}
                  placeholder="6"
                />
                {errors.months && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-400 rounded-full"></span>
                    {errors.months}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2">
                <Mail size={16} className="text-orange-400" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border bg-slate-800/50 text-white placeholder-slate-500 ${
                  errors.email 
                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" 
                    : "border-slate-700 focus:border-orange-500 focus:ring-orange-500/20"
                } focus:outline-none focus:ring-2 transition-all duration-200`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-red-400 rounded-full"></span>
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2">
                <Phone size={16} className="text-orange-400" />
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border bg-slate-800/50 text-white placeholder-slate-500 ${
                  errors.mobile 
                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" 
                    : "border-slate-700 focus:border-orange-500 focus:ring-orange-500/20"
                } focus:outline-none focus:ring-2 transition-all duration-200`}
                placeholder="+91 98765 43210"
              />
              {errors.mobile && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-red-400 rounded-full"></span>
                  {errors.mobile}
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 via-amber-600 to-orange-600 text-white font-semibold hover:from-orange-600 hover:via-amber-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit Application"
                )}
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-lg border border-slate-700 text-slate-300 font-semibold hover:bg-slate-800 hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-6 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Codolog. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}