import MainLayout from '@/components/layout/MainLayout';
import ServiceDetail from '@/components/services/ServiceDetail';

interface ServicePageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

const servicesData = {
  'yacht-management': {
    heroTitle: 'Professional Yacht Management Services',
    heroDescription: 'Comprehensive yacht management tailored to your needs',
    heroImage: '/images/services/yacht-management-1.jpg',
    contentTitle: 'Expert Yacht Management',
    contentDescription: 'Our experienced team provides complete yacht management services ensuring your vessel is maintained to the highest standards and ready for any adventure.',
    features: [
      {
        title: 'Complete Maintenance',
        description: 'Regular maintenance and inspections to keep your yacht in pristine condition'
      },
      {
        title: 'Crew Coordination',
        description: 'Professional crew selection and management for your vessel'
      },
      {
        title: 'Documentation & Compliance',
        description: 'All regulatory documentation and compliance handled with expertise'
      }
    ],
    whyChooseUs: [
      {
        title: '20+ Years Experience',
        description: 'Decades of proven expertise in yacht management'
      },
      {
        title: '24/7 Support',
        description: 'Round-the-clock support for all your yacht management needs'
      },
      {
        title: 'Professional Team',
        description: 'Highly trained and certified yacht management professionals'
      }
    ]
  },
  'charter-management': {
    heroTitle: 'Charter Management Excellence',
    heroDescription: 'Grow your charter business with our expert management',
    heroImage: '/images/services/charter-management-1.jpg',
    contentTitle: 'Accountant',
    contentDescription: 'Professional charter management services to maximize your yacht\'s earning potential while ensuring guest satisfaction and regulatory compliance.',
    features: [
      {
        title: 'Booking Management',
        description: 'Professional handling of all charter bookings and reservations'
      },
      {
        title: 'Revenue Optimization',
        description: 'Strategic pricing and marketing to maximize charter income'
      },
      {
        title: 'Guest Services',
        description: 'Exceptional guest experience management from inquiry to departure'
      }
    ],
    whyChooseUs: [
      {
        title: 'Proven Track Record',
        description: 'Consistent increase in charter revenue for our clients'
      },
      {
        title: 'Market Expertise',
        description: 'Deep knowledge of charter markets and pricing trends'
      },
      {
        title: 'Professional Operations',
        description: 'Full operational support and guest coordination'
      }
    ]
  },
  'yacht-insurance': {
    heroTitle: 'Yacht Insurance Protection',
    heroDescription: 'Comprehensive coverage for peace of mind',
    heroImage: '/images/services/yacht-insurance-1.jpg',
    contentTitle: 'Complete Coverage Solutions',
    contentDescription: 'We provide comprehensive yacht insurance coverage tailored to your specific needs and circumstances.',
    features: [
      {
        title: 'Hull Insurance',
        description: 'Protection for your vessel and its structure'
      },
      {
        title: 'Liability Coverage',
        description: 'Comprehensive liability protection for all situations'
      },
      {
        title: 'Equipment Protection',
        description: 'Coverage for all onboard equipment and valuables'
      }
    ],
    whyChooseUs: [
      {
        title: 'Competitive Rates',
        description: 'Best insurance rates in the industry'
      },
      {
        title: 'Fast Claims',
        description: 'Quick and hassle-free claim processing'
      },
      {
        title: 'Expert Advisors',
        description: 'Insurance specialists to guide you through coverage options'
      }
    ]
  },
  'yacht-marketing': {
    heroTitle: 'Strategic Yacht Marketing',
    heroDescription: 'Get your yacht noticed by the right buyers and charterers',
    heroImage: '/images/services/yacht-marketing-1.jpg',
    contentTitle: 'Marketing Excellence',
    contentDescription: 'Comprehensive marketing strategies to showcase your yacht and attract high-quality charters and buyers.',
    features: [
      {
        title: 'Digital Marketing',
        description: 'Professional photography, videography, and online presence'
      },
      {
        title: 'Market Positioning',
        description: 'Strategic positioning to attract your target market'
      },
      {
        title: 'Promotion & Advertising',
        description: 'Multi-channel promotion to maximize visibility'
      }
    ],
    whyChooseUs: [
      {
        title: 'Creative Team',
        description: 'Expert marketers with yacht industry experience'
      },
      {
        title: 'Results Driven',
        description: 'Focus on measurable outcomes and ROI'
      },
      {
        title: 'Industry Knowledge',
        description: 'Deep understanding of yacht market dynamics'
      }
    ]
  },
  'sales-management': {
    heroTitle: 'Professional Yacht Sales',
    heroDescription: 'Sell your yacht quickly and at the best price',
    heroImage: '/images/services/sales-management-1.jpg',
    contentTitle: 'Sales Excellence',
    contentDescription: 'Expert yacht sales management to help you sell your vessel quickly and securely at the best possible price.',
    features: [
      {
        title: 'Yacht Valuation',
        description: 'Professional market valuation of your vessel'
      },
      {
        title: 'Buyer Sourcing',
        description: 'Access to qualified buyers worldwide'
      },
      {
        title: 'Negotiation & Documentation',
        description: 'Expert handling of all sale negotiations and legal documentation'
      }
    ],
    whyChooseUs: [
      {
        title: 'Wide Network',
        description: 'Access to a global network of qualified buyers'
      },
      {
        title: 'Expert Negotiators',
        description: 'Skilled negotiators ensuring best sale terms'
      },
      {
        title: 'Transparent Process',
        description: 'Clear and transparent sales process from start to finish'
      }
    ]
  },
  'berths-for-sale': {
    heroTitle: 'Exclusive Berth Opportunities',
    heroDescription: 'Invest in premium berth locations worldwide',
    heroImage: '/images/services/berths-for-sale-1.jpg',
    contentTitle: 'Marina Investments',
    contentDescription: 'Premium berth locations in the world\'s most desirable yacht destinations.',
    features: [
      {
        title: 'Prime Locations',
        description: 'Access to exclusive berths in premium marina locations'
      },
      {
        title: 'Investment Returns',
        description: 'Strong potential for appreciation and rental income'
      },
      {
        title: 'Full Amenities',
        description: 'Berths with access to world-class facilities and services'
      }
    ],
    whyChooseUs: [
      {
        title: 'Location Expertise',
        description: 'Expert knowledge of the best berth locations'
      },
      {
        title: 'Investment Support',
        description: 'Guidance on berth investment and management'
      },
      {
        title: 'Global Network',
        description: 'Access to exclusive berth opportunities worldwide'
      }
    ]
  },
  'procurement': {
    heroTitle: 'Professional Yacht Procurement',
    heroDescription: 'Quality supplies and equipment for your yacht',
    heroImage: '/images/services/procurement-1.jpg',
    contentTitle: 'Supply Chain Excellence',
    contentDescription: 'Professional procurement services for all yacht supplies, equipment, and maintenance materials.',
    features: [
      {
        title: 'Quality Sourcing',
        description: 'Premium quality supplies from trusted vendors'
      },
      {
        title: 'Cost Efficiency',
        description: 'Competitive pricing through established relationships'
      },
      {
        title: 'Delivery & Logistics',
        description: 'Reliable delivery to any worldwide marina location'
      }
    ],
    whyChooseUs: [
      {
        title: 'Vendor Network',
        description: 'Established relationships with quality suppliers'
      },
      {
        title: 'Cost Savings',
        description: 'Significant savings through bulk purchasing power'
      },
      {
        title: 'Reliability',
        description: 'Dependable procurement and delivery services'
      }
    ]
  },
  'crew-services': {
    heroTitle: 'Discover the Global Sea Difference',
    heroDescription: 'A quality yacht crew is essential for the efficient and safe operation of any yacht',
    heroImage: '/images/services/crew-services-1.jpg',
    contentTitle: 'A personalised approach to crew selection',
    contentDescription: 'From crew travel to crew training, and employment agreements to payroll, we provide comprehensive crew management.',
    features: [
      {
        title: 'A robust, cost-effective and tested structure',
        description: 'Under the expert supervision of our qualified and experienced human resource professionals, we source the best crew available to make your yacht truly more than a home.'
      },
      {
        title: 'Crew services that limit employment liability',
        description: 'Our team ensures that crew are employed in a legitimate structure and in compliance with local and international legislation.'
      },
      {
        title: 'Personalised service from a dedicated crew manager',
        description: 'From crew travel to crew training, and employment agreements to payroll, you can have peace of mind that all crew management requirements are taken care of.'
      }
    ],
    whyChooseUs: [
      {
        title: 'Expert HR Professionals',
        description: 'Qualified and experienced human resource specialists'
      },
      {
        title: 'Legal Compliance',
        description: 'Full compliance with international employment regulations'
      },
      {
        title: 'Dedicated Support',
        description: 'Personalized crew manager for all your needs'
      }
    ]
  }
};

export async function generateStaticParams() {
  return [
    { slug: 'yacht-management', locale: 'en' },
    { slug: 'charter-management', locale: 'en' },
    { slug: 'yacht-insurance', locale: 'en' },
    { slug: 'yacht-marketing', locale: 'en' },
    { slug: 'sales-management', locale: 'en' },
    { slug: 'berths-for-sale', locale: 'en' },
    { slug: 'procurement', locale: 'en' },
    { slug: 'crew-services', locale: 'en' },
    { slug: 'yacht-management', locale: 'pl' },
    { slug: 'charter-management', locale: 'pl' },
    { slug: 'yacht-insurance', locale: 'pl' },
    { slug: 'yacht-marketing', locale: 'pl' },
    { slug: 'sales-management', locale: 'pl' },
    { slug: 'berths-for-sale', locale: 'pl' },
    { slug: 'procurement', locale: 'pl' },
    { slug: 'crew-services', locale: 'pl' },
  ];
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesData[slug as keyof typeof servicesData];

  if (!service) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold text-[#444444]">Service not found</h1>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <ServiceDetail service={service} />
    </MainLayout>
  );
}
