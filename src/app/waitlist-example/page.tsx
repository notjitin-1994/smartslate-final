import WaitlistButton from '@/components/ui/WaitlistButton';

export default function WaitlistExamplePage() {
  return (
    <div className="min-h-screen bg-background-dark text-primary p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Waitlist System Examples
        </h1>
        
        <div className="space-y-8">
          {/* General Waitlist */}
          <section className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-primary-accent">
              General Waitlist
            </h2>
            <p className="text-secondary mb-4">
              Use this for general product interest or when you don't have a specific course/product.
            </p>
            <WaitlistButton 
              source="General Product Interest"
              variant="primary"
              size="lg"
            />
          </section>

          {/* Course-Specific Waitlist */}
          <section className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-primary-accent">
              Course-Specific Waitlist
            </h2>
            <p className="text-secondary mb-4">
              Use this for specific courses or products. The modal will show the course name.
            </p>
            <div className="flex flex-wrap gap-4">
              <WaitlistButton 
                source="AI Foundations Course"
                courseName="AI Foundations: Concept to Application"
                variant="secondary"
                size="md"
              />
              <WaitlistButton 
                source="Advanced DevOps Course"
                courseName="Advanced DevOps & Cloud Engineering"
                variant="outline"
                size="md"
              />
            </div>
          </section>

          {/* Product Waitlist */}
          <section className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-primary-accent">
              Product Waitlist
            </h2>
            <p className="text-secondary mb-4">
              Use this for product launches or beta access.
            </p>
            <div className="flex flex-wrap gap-4">
              <WaitlistButton 
                source="Solara Platform"
                courseName="Solara Learning Platform"
                variant="primary"
                size="md"
              />
              <WaitlistButton 
                source="SSA Platform"
                courseName="Strategic Skills Assessment"
                variant="secondary"
                size="md"
              />
            </div>
          </section>

          {/* Custom Button Text */}
          <section className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-primary-accent">
              Custom Button Text
            </h2>
            <p className="text-secondary mb-4">
              You can customize the button text while keeping the same functionality.
            </p>
            <div className="flex flex-wrap gap-4">
              <WaitlistButton 
                source="Beta Access"
                courseName="Smartslate Platform"
                variant="primary"
                size="md"
              >
                Get Early Access
              </WaitlistButton>
              <WaitlistButton 
                source="New Feature"
                courseName="AI-Powered Learning"
                variant="outline"
                size="md"
              >
                Notify Me When Available
              </WaitlistButton>
            </div>
          </section>

          {/* Different Sizes and Variants */}
          <section className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-primary-accent">
              Button Variants & Sizes
            </h2>
            <p className="text-secondary mb-4">
              Different button styles and sizes for various use cases.
            </p>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <WaitlistButton 
                  source="Demo"
                  variant="primary"
                  size="sm"
                >
                  Small Primary
                </WaitlistButton>
                <WaitlistButton 
                  source="Demo"
                  variant="secondary"
                  size="sm"
                >
                  Small Secondary
                </WaitlistButton>
                <WaitlistButton 
                  source="Demo"
                  variant="outline"
                  size="sm"
                >
                  Small Outline
                </WaitlistButton>
              </div>
              <div className="flex flex-wrap gap-4">
                <WaitlistButton 
                  source="Demo"
                  variant="primary"
                  size="md"
                >
                  Medium Primary
                </WaitlistButton>
                <WaitlistButton 
                  source="Demo"
                  variant="secondary"
                  size="md"
                >
                  Medium Secondary
                </WaitlistButton>
                <WaitlistButton 
                  source="Demo"
                  variant="outline"
                  size="md"
                >
                  Medium Outline
                </WaitlistButton>
              </div>
              <div className="flex flex-wrap gap-4">
                <WaitlistButton 
                  source="Demo"
                  variant="primary"
                  size="lg"
                >
                  Large Primary
                </WaitlistButton>
                <WaitlistButton 
                  source="Demo"
                  variant="secondary"
                  size="lg"
                >
                  Large Secondary
                </WaitlistButton>
                <WaitlistButton 
                  source="Demo"
                  variant="outline"
                  size="lg"
                >
                  Large Outline
                </WaitlistButton>
              </div>
            </div>
          </section>
        </div>

        {/* Usage Instructions */}
        <section className="mt-12 bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
          <h2 className="text-2xl font-semibold mb-4 text-primary-accent">
            How to Use
          </h2>
          <div className="space-y-4 text-secondary">
            <p>
              <strong>1. Import the components:</strong>
            </p>
            <pre className="bg-black/20 p-4 rounded-lg overflow-x-auto">
{`import WaitlistButton from '@/components/ui/WaitlistButton';
import { useWaitlistModal } from '@/hooks/useWaitlistModal';`}
            </pre>
            
            <p>
              <strong>2. Use the button component:</strong>
            </p>
            <pre className="bg-black/20 p-4 rounded-lg overflow-x-auto">
{`<WaitlistButton 
  source="Your Source Name"
  courseName="Optional Course/Product Name"
  variant="primary" // or "secondary" or "outline"
  size="md" // or "sm" or "lg"
>
  Custom Button Text (optional)
</WaitlistButton>`}
            </pre>
            
            <p>
              <strong>3. Or use the hook directly:</strong>
            </p>
            <pre className="bg-black/20 p-4 rounded-lg overflow-x-auto">
{`const { openModal } = useWaitlistModal();

const handleClick = () => {
  openModal('Your Source', 'Optional Course Name');
};`}
            </pre>
            
            <p>
              <strong>Key Features:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Source tracking:</strong> Every submission includes a source field for analytics</li>
              <li><strong>Course/Product context:</strong> Optional course name for better context</li>
              <li><strong>Comprehensive form:</strong> Collects contact info, professional context, and business needs</li>
              <li><strong>Email notifications:</strong> Automatic email alerts for new leads</li>
              <li><strong>Database storage:</strong> All submissions stored in Supabase for admin review</li>
              <li><strong>Responsive design:</strong> Works on all devices with consistent styling</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}


