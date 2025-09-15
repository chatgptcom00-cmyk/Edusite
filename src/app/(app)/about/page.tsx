
import { Button } from '@/components/ui/button';
import { BadgeCheck, BookOpen, Download, Gift, Globe, Target } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const features = [
  {
    name: 'Completely Free Education',
    description: 'Access a vast library of courses, from school subjects to graduation-level material, all at no cost.',
    icon: Gift,
  },
  {
    name: 'Comprehensive Resources',
    description: 'Enhance your learning with video lectures, detailed PDF notes, and effective study strategies.',
    icon: BookOpen,
  },
    {
    name: 'Premium Content for Free',
    description: 'We provide access to premium and paid lectures at no charge, breaking financial barriers to quality education.',
    icon: BadgeCheck,
  },
  {
    name: 'Free Downloads',
    description: 'Easily download course materials to study offline, anytime and anywhere, ensuring uninterrupted learning.',
    icon: Download,
  },
];

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 md:py-40 bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-6xl">
            Empowering Minds, Breaking Barriers.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-foreground/80">
            Edusite is an all-in-one educational platform dedicated to making learning completely free and accessible for everyone.
          </p>
          <div className="mt-10">
            <Button asChild size="lg" className="font-bold">
              <Link href="/courses">
                Start Learning for Free
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-x-16 gap-y-16 lg:grid-cols-2">
            <div>
              <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Mission: Education for All
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                From school subjects to graduation-level courses, students can explore a wide range of academic and tuition classes without any cost. Along with video lectures, the platform also provides PDF notes, study strategies, and free downloads to make learning easier and more effective.
              </p>
               <p className="mt-4 text-lg leading-8 text-muted-foreground">
                What makes Edusite unique is that it also offers access to premium and paid lectures at no charge, ensuring that quality education is accessible to every learner, regardless of financial background.
              </p>
            </div>
            <div className="relative h-96 w-full overflow-hidden rounded-2xl shadow-xl">
                 <Image
                    src="https://picsum.photos/seed/collaboration/800/600"
                    alt="Students collaborating"
                    data-ai-hint="diverse students working"
                    fill
                    className="object-cover"
                 />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-card/50 py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything You Need to Succeed
            </h2>
            <p className="mt-2 text-lg leading-8 text-foreground/70">
              All in one place, all for free.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                   <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-primary">
                    <feature.icon className="h-7 w-7 flex-none text-primary/80" aria-hidden="true" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      
      {/* Founder Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16 items-center">
                <div className="relative h-96 w-full overflow-hidden rounded-2xl shadow-xl lg:order-last">
                     <Image
                        src="https://picsum.photos/seed/modern-learning/800/600"
                        alt="Modern learning environment"
                        data-ai-hint="library technology"
                        fill
                        className="object-cover"
                     />
                </div>
                <div>
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Our Founding Vision
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        Founded by <strong className="font-semibold text-primary">PixS Organisation</strong>, Edusite carries the vision of breaking barriers in education and empowering students with the right resources to achieve their goals—all in one place, all for free.
                    </p>
                    <div className="mt-8 flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="rounded-full bg-primary/10 p-4">
                          <div className="rounded-full bg-primary/20 p-4">
                            <Target className="h-12 w-12 text-primary" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Our Goal</h3>
                        <p className="text-muted-foreground">To provide universally accessible education and empower learners worldwide.</p>
                      </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

    </div>
  );
}
