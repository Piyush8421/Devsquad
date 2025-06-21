const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token from localStorage (client-side only)
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

// Helper function to make API requests
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  register: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    role?: 'guest' | 'host';
  }) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  login: (credentials: { email: string; password: string }) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  getProfile: () => apiRequest('/auth/profile'),
};

// Properties API
export const propertiesAPI = {
  getAll: (filters?: {
    page?: number;
    limit?: number;
    city?: string;
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    maxGuests?: number;
  }) => {
    const queryString = filters ? new URLSearchParams(
      Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = value.toString();
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString() : '';
    
    return apiRequest(`/properties${queryString ? `?${queryString}` : ''}`);
  },

  getById: (id: string | number) => apiRequest(`/properties/${id}`),

  create: (propertyData: any) =>
    apiRequest('/properties', {
      method: 'POST',
      body: JSON.stringify(propertyData),
    }),

  update: (id: string | number, propertyData: any) =>
    apiRequest(`/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(propertyData),
    }),

  delete: (id: string | number) =>
    apiRequest(`/properties/${id}`, {
      method: 'DELETE',
    }),
};

// Bookings API
export const bookingsAPI = {
  create: (bookingData: {
    propertyId: number;
    checkIn: string;
    checkOut: string;
    guests: number;
    totalPrice: number;
    notes?: string;
  }) => apiRequest('/bookings', {
    method: 'POST',
    body: JSON.stringify(bookingData),
  }),

  getAll: (filters?: { status?: string; page?: number; limit?: number }) => {
    const queryString = filters ? new URLSearchParams(
      Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = value.toString();
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString() : '';
    
    return apiRequest(`/bookings${queryString ? `?${queryString}` : ''}`);
  },

  getById: (id: string | number) => apiRequest(`/bookings/${id}`),

  cancel: (id: string | number) =>
    apiRequest(`/bookings/${id}/cancel`, {
      method: 'PUT',
    }),
};

// Reviews API
export const reviewsAPI = {
  create: (reviewData: {
    propertyId: number;
    rating: number;
    comment: string;
  }) => apiRequest('/reviews', {
    method: 'POST',
    body: JSON.stringify(reviewData),
  }),

  getByProperty: (propertyId: string | number, page?: number) =>
    apiRequest(`/reviews/property/${propertyId}${page ? `?page=${page}` : ''}`),

  getUserReviews: (page?: number) =>
    apiRequest(`/reviews/user${page ? `?page=${page}` : ''}`),

  update: (id: string | number, reviewData: { rating: number; comment: string }) =>
    apiRequest(`/reviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify(reviewData),
    }),

  delete: (id: string | number) =>
    apiRequest(`/reviews/${id}`, {
      method: 'DELETE',
    }),
};

// Company API
export const companyAPI = {
  getInfo: () => apiRequest('/company'),
  getAbout: () => apiRequest('/company/about'),
};

// Careers API
export const careersAPI = {
  getJobs: (filters?: { department?: string; location?: string; type?: string }) => {
    const queryString = filters ? new URLSearchParams(
      Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = value.toString();
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString() : '';
    
    return apiRequest(`/careers${queryString ? `?${queryString}` : ''}`);
  },

  getJobById: (id: string | number) => apiRequest(`/careers/${id}`),

  apply: (applicationData: {
    jobId: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    coverLetter: string;
    resumeUrl: string;
    linkedinUrl?: string;
    portfolioUrl?: string;
  }) => apiRequest('/careers/apply', {
    method: 'POST',
    body: JSON.stringify(applicationData),
  }),
};

// Referrals API
export const referralsAPI = {
  getInfo: () => apiRequest('/referrals/info'),
  getMyCode: () => apiRequest('/referrals/my-code'),
  sendReferral: (referralData: {
    refereeEmail: string;
    refereeName: string;
    message?: string;
  }) => apiRequest('/referrals/send', {
    method: 'POST',
    body: JSON.stringify(referralData),
  }),
  getMyReferrals: (page?: number, status?: string) => {
    const params = new URLSearchParams();
    if (page) params.append('page', page.toString());
    if (status) params.append('status', status);
    return apiRequest(`/referrals/my-referrals${params.toString() ? `?${params.toString()}` : ''}`);
  },
  validateCode: (referralCode: string) => apiRequest('/referrals/validate', {
    method: 'POST',
    body: JSON.stringify({ referralCode }),
  }),
};

// Safety API
export const safetyAPI = {
  getGuidelines: () => apiRequest('/safety/guidelines'),
  reportIssue: (reportData: {
    type: 'safety_concern' | 'inappropriate_behavior' | 'property_issue' | 'other';
    propertyId?: number;
    bookingId?: number;
    subject: string;
    description: string;
    priority?: 'low' | 'medium' | 'high' | 'urgent';
    evidence?: string[];
  }) => apiRequest('/safety/report', {
    method: 'POST',
    body: JSON.stringify(reportData),
  }),
  getMyReports: (page?: number, status?: string) => {
    const params = new URLSearchParams();
    if (page) params.append('page', page.toString());
    if (status) params.append('status', status);
    return apiRequest(`/safety/my-reports${params.toString() ? `?${params.toString()}` : ''}`);
  },
  getReport: (caseNumber: string) => apiRequest(`/safety/report/${caseNumber}`),
};

// User API
export const userAPI = {
  getProfile: () => apiRequest('/users/profile'),
  updateProfile: (profileData: {
    firstName: string;
    lastName: string;
    phone?: string;
  }) => apiRequest('/users/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  }),
};

// Payments API
export const paymentsAPI = {
  createIntent: (paymentData: {
    propertyId: number;
    checkIn: string;
    checkOut: string;
    guests: number;
    totalAmount: number;
    currency?: string;
    paymentMethod: string;
    notes?: string;
  }) => apiRequest('/payments/create-intent', {
    method: 'POST',
    body: JSON.stringify(paymentData),
  }),

  confirmPayment: (confirmData: {
    paymentIntentId: string;
    paymentMethodId?: string;
    paymentProvider: string;
  }) => apiRequest('/payments/confirm', {
    method: 'POST',
    body: JSON.stringify(confirmData),
  }),

  getHistory: (filters?: { page?: number; limit?: number }) => {
    const queryString = filters ? new URLSearchParams(
      Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = value.toString();
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString() : '';
    
    return apiRequest(`/payments/history${queryString ? `?${queryString}` : ''}`);
  },
};
