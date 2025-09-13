export type CourseModule = {
  title: string;
  duration: string;
  type: 'video' | 'article';
};

export type Course = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  imageHint: string;
  author: string;
  rating: number;
  videoUrl: string;
  modules: CourseModule[];
};

export const courses: Course[] = [
  {
    id: '1',
    title: 'Advanced Web Development with React',
    description: 'Master React and build complex, high-performance web applications from scratch.',
    longDescription: 'This course dives deep into the advanced concepts of React, including hooks, context API, performance optimization, and server-side rendering. You will work on real-world projects to solidify your understanding and build a professional portfolio.',
    imageUrl: 'https://picsum.photos/seed/course1/600/400',
    imageHint: 'coding development',
    author: 'Jane Doe',
    rating: 4.8,
    videoUrl: 'https://example.com/video1',
    modules: [
      { title: 'Introduction to Advanced React', duration: '15:30', type: 'video' },
      { title: 'Mastering Hooks', duration: '45:10', type: 'video' },
      { title: 'State Management with Context', duration: '30:00', type: 'article' },
      { title: 'Performance Optimization Techniques', duration: '55:20', type: 'video' },
    ],
  },
  {
    id: '2',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn the principles of user-centric design to create beautiful and intuitive interfaces.',
    longDescription: 'From wireframing to prototyping, this course covers the entire UI/UX design process. You will learn how to conduct user research, create user personas, and design visually appealing interfaces that provide a great user experience.',
    imageUrl: 'https://picsum.photos/seed/course2/600/400',
    imageHint: 'digital art',
    author: 'John Smith',
    rating: 4.9,
    videoUrl: 'https://example.com/video2',
    modules: [
      { title: 'What is UI/UX?', duration: '10:00', type: 'video' },
      { title: 'User Research and Personas', duration: '35:45', type: 'video' },
      { title: 'Wireframing and Prototyping', duration: '25:00', type: 'article' },
      { title: 'Visual Design Principles', duration: '48:50', type: 'video' },
    ],
  },
  {
    id: '3',
    title: 'Data Science and Machine Learning Bootcamp',
    description: 'Unlock the power of data with Python, Pandas, and Scikit-learn.',
    longDescription: 'This comprehensive bootcamp takes you from zero to hero in the world of data science. You will learn data analysis, visualization, and how to build and deploy machine learning models for prediction and classification tasks.',
    imageUrl: 'https://picsum.photos/seed/course3/600/400',
    imageHint: 'business strategy',
    author: 'Emily White',
    rating: 4.7,
    videoUrl: 'https://example.com/video3',
    modules: [
      { title: 'Python for Data Science', duration: '60:00', type: 'video' },
      { title: 'Data Analysis with Pandas', duration: '75:30', type: 'video' },
      { title: 'Introduction to Machine Learning', duration: '40:00', type: 'article' },
      { title: 'Building a Predictive Model', duration: '90:15', type: 'video' },
    ],
  },
    {
    id: '4',
    title: 'Modern Mindfulness and Well-being',
    description: 'Techniques for a calmer, more focused life in the digital age.',
    longDescription: 'Explore ancient mindfulness practices adapted for the modern world. This course provides practical tools to reduce stress, improve focus, and cultivate a greater sense of well-being through guided meditations and daily exercises.',
    imageUrl: 'https://picsum.photos/seed/course4/600/400',
    imageHint: 'mindfulness wellness',
    author: 'David Chen',
    rating: 4.9,
    videoUrl: 'https://example.com/video4',
    modules: [
      { title: 'The Art of Presence', duration: '20:00', type: 'video' },
      { title: 'Guided Body Scan Meditation', duration: '25:00', type: 'video' },
      { title: 'Mindful Breathing', duration: '15:00', type: 'article' },
      { title: 'Integrating Mindfulness into Daily Life', duration: '30:00', type: 'video' },
    ],
  },
  {
    id: '5',
    title: 'Digital Photography Masterclass',
    description: 'From aperture to post-processing, capture stunning photos with any camera.',
    longDescription: 'This masterclass covers everything you need to know to become a confident photographer. Learn the fundamentals of exposure, composition, and lighting, and then master editing techniques in Adobe Lightroom to make your photos shine.',
    imageUrl: 'https://picsum.photos/seed/course5/600/400',
    imageHint: 'photography videography',
    author: 'Maria Garcia',
    rating: 4.8,
    videoUrl: 'https://example.com/video5',
    modules: [
      { title: 'Understanding Your Camera', duration: '30:00', type: 'video' },
      { title: 'The Exposure Triangle', duration: '40:10', type: 'video' },
      { title: 'Composition Rules', duration: '20:00', type: 'article' },
      { title: 'Editing in Lightroom', duration: '70:40', type: 'video' },
    ],
  },
  {
    id: '6',
    title: 'Gourmet Cooking at Home',
    description: 'Learn professional culinary techniques to elevate your home cooking.',
    longDescription: 'Join a professional chef to learn the secrets of gourmet cooking. This course covers essential knife skills, sauce making, and plating techniques that will transform your everyday meals into restaurant-quality dishes.',
    imageUrl: 'https://picsum.photos/seed/course6/600/400',
    imageHint: 'culinary arts',
    author: 'Marco Bianchi',
    rating: 4.9,
    videoUrl: 'https://example.com/video6',
    modules: [
      { title: 'Essential Knife Skills', duration: '35:00', type: 'video' },
      { title: 'The Five Mother Sauces', duration: '50:30', type: 'video' },
      { title: 'The Art of Plating', duration: '25:00', type: 'article' },
      { title: 'Perfect Pan-Seared Steak', duration: '45:00', type: 'video' },
    ],
  }
];

export const getCourseById = (id: string | number): Course | undefined => {
  return courses.find(course => course.id === String(id));
};
