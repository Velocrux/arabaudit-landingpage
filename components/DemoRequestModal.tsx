'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useLocale } from '@/context/LocaleContext'
import { getContent } from '@/lib/content'
import { validateSaudiPhone, formatSaudiPhone, validateRequired, validateEmail } from '@/lib/validation'

interface DemoRequestModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  organization: string
  industry: string
  phone: string
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  organization?: string
  industry?: string
  phone?: string
  submit?: string
}

export function DemoRequestModal({ isOpen, onClose }: DemoRequestModalProps) {
  const { locale } = useLocale()
  const t = getContent(locale).demoModal
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    industry: '',
    phone: '+966 '
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])
  
  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        organization: '',
        industry: '',
        phone: '+966 '
      })
      setErrors({})
      setShowSuccess(false)
      setShowError(false)
    }
  }, [isOpen])
  
  const handlePhoneChange = (value: string) => {
    const formatted = formatSaudiPhone(value)
    setFormData(prev => ({ ...prev, phone: formatted }))
    // Clear phone error when user types
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: undefined }))
    }
  }
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    const firstNameValidation = validateRequired(formData.firstName, t.fields.firstName)
    if (!firstNameValidation.isValid) {
      newErrors.firstName = firstNameValidation.error
    }
    
    const lastNameValidation = validateRequired(formData.lastName, t.fields.lastName)
    if (!lastNameValidation.isValid) {
      newErrors.lastName = lastNameValidation.error
    }
    
    const emailValidation = validateEmail(formData.email)
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error
    }
    
    const organizationValidation = validateRequired(formData.organization, t.fields.organization)
    if (!organizationValidation.isValid) {
      newErrors.organization = organizationValidation.error
    }
    
    const industryValidation = validateRequired(formData.industry, t.fields.industry)
    if (!industryValidation.isValid) {
      newErrors.industry = industryValidation.error
    }
    
    const phoneValidation = validateSaudiPhone(formData.phone)
    if (!phoneValidation.isValid) {
      newErrors.phone = phoneValidation.error
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setShowError(false)
    
    try {
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit request')
      }
      
      setShowSuccess(true)
      
      // Close modal after 3 seconds
      setTimeout(() => {
        onClose()
      }, 3000)
      
    } catch (error) {
      console.error('Error submitting form:', error)
      setShowError(true)
      setErrors(prev => ({ 
        ...prev, 
        submit: error instanceof Error ? error.message : 'Failed to send request'
      }))
    } finally {
      setIsSubmitting(false)
    }
  }
  
  if (!isOpen) return null
  
  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-primary/20 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="relative w-full max-w-lg bg-base rounded-2xl border-2 border-accent/40 shadow-premium overflow-hidden my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gold accent bar */}
        <div className="h-1 bg-accent" />
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-primary/60 hover:text-accent transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent rounded-full p-1"
          aria-label={t.close || 'Close'}
          type="button"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="p-8">
          {showSuccess ? (
            <div className="text-center py-8">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-section font-bold text-primary mb-2">{t.success.title}</h3>
              <p className="text-body text-primary/80">{t.success.message}</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="mx-auto mb-3 h-1 w-16 rounded-full bg-accent" />
                <h2 id="modal-title" className="text-section font-bold text-primary tracking-royal">
                  {t.title}
                </h2>
                <p className="mt-2 text-body text-primary/70">{t.subtitle}</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-primary mb-1">
                    {t.fields.firstName} <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, firstName: e.target.value }))
                      if (errors.firstName) {
                        setErrors(prev => ({ ...prev, firstName: undefined }))
                      }
                    }}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/40 ${
                      errors.firstName 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-primary/20 focus:border-accent'
                    } bg-base text-primary placeholder-primary/40`}
                    placeholder={t.placeholders?.firstName || ''}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>
                
                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-primary mb-1">
                    {t.fields.lastName} <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, lastName: e.target.value }))
                      if (errors.lastName) {
                        setErrors(prev => ({ ...prev, lastName: undefined }))
                      }
                    }}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/40 ${
                      errors.lastName 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-primary/20 focus:border-accent'
                    } bg-base text-primary placeholder-primary/40`}
                    placeholder={t.placeholders?.lastName || ''}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
                
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary mb-1">
                    {t.fields.email} <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, email: e.target.value }))
                      if (errors.email) {
                        setErrors(prev => ({ ...prev, email: undefined }))
                      }
                    }}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/40 ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-primary/20 focus:border-accent'
                    } bg-base text-primary placeholder-primary/40`}
                    placeholder={t.placeholders?.email || 'your@email.com'}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
                
                {/* Organization */}
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-primary mb-1">
                    {t.fields.organization} <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="organization"
                    value={formData.organization}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, organization: e.target.value }))
                      if (errors.organization) {
                        setErrors(prev => ({ ...prev, organization: undefined }))
                      }
                    }}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/40 ${
                      errors.organization 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-primary/20 focus:border-accent'
                    } bg-base text-primary placeholder-primary/40`}
                    placeholder={t.placeholders?.organization || ''}
                  />
                  {errors.organization && (
                    <p className="mt-1 text-sm text-red-600">{errors.organization}</p>
                  )}
                </div>
                
                {/* Industry */}
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-primary mb-1">
                    {t.fields.industry} <span className="text-accent">*</span>
                  </label>
                  <select
                    id="industry"
                    value={formData.industry}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, industry: e.target.value }))
                      if (errors.industry) {
                        setErrors(prev => ({ ...prev, industry: undefined }))
                      }
                    }}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/40 ${
                      errors.industry 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-primary/20 focus:border-accent'
                    } bg-base text-primary`}
                  >
                    <option value="">{t.placeholders?.industry || 'Select industry'}</option>
                    <optgroup label={t.industries?.sama || 'SAMA CSF (Financial Sector)'}>
                      <option value="Banking & Financial Services">{t.industries?.banking || 'Banking & Financial Services'}</option>
                      <option value="Insurance & Takaful">{t.industries?.insurance || 'Insurance & Takaful'}</option>
                      <option value="Fintech & Payment Services">{t.industries?.fintech || 'Fintech & Payment Services'}</option>
                      <option value="Investment & Securities">{t.industries?.investment || 'Investment & Securities'}</option>
                    </optgroup>
                    <optgroup label={t.industries?.nca || 'NCA ECC-2024 (Critical Infrastructure)'}>
                      <option value="Government & Public Sector">{t.industries?.government || 'Government & Public Sector'}</option>
                      <option value="Energy & Utilities">{t.industries?.energy || 'Energy & Utilities (Oil, Gas, Electricity, Water)'}</option>
                      <option value="Healthcare & Hospitals">{t.industries?.healthcare || 'Healthcare & Hospitals'}</option>
                      <option value="Telecommunications">{t.industries?.telecom || 'Telecommunications'}</option>
                      <option value="Transportation & Logistics">{t.industries?.transport || 'Transportation & Logistics'}</option>
                      <option value="Education">{t.industries?.education || 'Education'}</option>
                    </optgroup>
                    <optgroup label={t.industries?.pdpl || 'PDPL (All Sectors with Personal Data)'}>
                      <option value="Retail & E-commerce">{t.industries?.retail || 'Retail & E-commerce'}</option>
                      <option value="Technology & Software">{t.industries?.technology || 'Technology & Software'}</option>
                      <option value="Professional Services">{t.industries?.professional || 'Professional Services (Consulting, Legal, HR)'}</option>
                      <option value="Real Estate & Construction">{t.industries?.realEstate || 'Real Estate & Construction'}</option>
                      <option value="Other">{t.industries?.other || 'Other'}</option>
                    </optgroup>
                  </select>
                  {errors.industry && (
                    <p className="mt-1 text-sm text-red-600">{errors.industry}</p>
                  )}
                </div>
                
                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-primary mb-1">
                    {t.fields.phone} <span className="text-accent">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/40 ${
                      errors.phone 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-primary/20 focus:border-accent'
                    } bg-base text-primary placeholder-primary/40`}
                    placeholder="+966 5X XXX XXXX"
                    dir="ltr"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                  <p className="mt-1 text-xs text-primary/60">{t.fields.phoneHint || 'Saudi mobile number format: +966 5X XXX XXXX'}</p>
                </div>
                
                {/* Error message */}
                {showError && errors.submit && (
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-sm text-red-600 mb-2">{errors.submit}</p>
                    <a 
                      href={`mailto:kauser@velocrux.com?subject=[ArabAudit]%20Demo%20Request&body=Name:%20${formData.firstName}%20${formData.lastName}%0AEmail:%20${formData.email}%0AOrganization:%20${formData.organization}%0AIndustry:%20${formData.industry}%0APhone:%20${formData.phone}`}
                      className="text-sm text-accent hover:text-accent/80 underline font-medium"
                    >
                      {t.error?.fallback || 'Click here to email us directly'}
                    </a>
                  </div>
                )}
                
                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full mt-6 inline-flex items-center justify-center rounded-lg bg-accent px-8 py-4 text-cta font-bold text-primary shadow-gold ring-2 ring-accent ring-offset-2 transition-all duration-300 hover:scale-105 hover:shadow-gold focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t.submitting || 'Sending...'}
                    </span>
                  ) : (
                    <>
                      <span className="relative z-10">{t.submit}</span>
                      <div className="absolute inset-0 bg-gold-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] animate-shimmer"></div>
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
