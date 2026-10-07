import occupational from '@/assets/occupational.jpg';
import speech from '@/assets/speech.jpg';
import specialEducation from '@/assets/special-education.jpg';
import behavioral from '@/assets/behavioral.jpg';
import counselling from '@/assets/counselling.jpg';
import occupationalDetail from '@/assets/occupational-detail.jpg';
import speechDetail from '@/assets/speech-detail.jpg';
import specialEducationDetail from '@/assets/special-education-detail.jpg';
import behavioralDetail from '@/assets/behavioral-detail.jpg';
import counsellingDetail from '@/assets/counselling-detail.jpg';

export type Service = {
  slug: string; title: string; short: string; intro: string; image: string; detailImage: string;
  color: string; number: string; focus: string[]; activities: string[];
  approach: string; parentNote: string;
};

export const services: Service[] = [
  {
    slug: 'occupational-therapy', title: 'Occupational Therapy', number: '01', color: 'peach', image: occupational, detailImage: occupationalDetail,
    short: 'Big little wins, one playful step at a time.',
    intro: 'Occupational therapy helps children build the everyday skills they need to explore, play, learn and grow more independently. Every session meets your child where they are, using movement and hands-on play rather than a traditional doctor–patient setup.',
    focus: ['Sensory processing and regulation', 'Fine and gross motor coordination', 'Balance, strength and body awareness', 'Everyday routines and independence'],
    activities: ['Swings and movement games', 'Ball games and obstacle courses', 'Puzzles and hand-skill play', 'Balance equipment and sensory tools'],
    approach: 'Our play-based area is made for curiosity. Children may move between swings, balls, puzzles and activity stations while the therapist gently works on meaningful developmental goals.',
    parentNote: 'Sessions are adapted to your child’s interests, comfort and pace. Parents are included in understanding how to support progress at home.'
  },
  {
    slug: 'speech-therapy', title: 'Speech Therapy', number: '02', color: 'blue', image: speech, detailImage: speechDetail,
    short: 'Helping every child find their own way to connect.',
    intro: 'Speech therapy supports children in expressing themselves and understanding others. Through play, stories and meaningful interaction, children practice communication skills in a supportive space.',
    focus: ['Speech sounds and clarity', 'Language understanding and expression', 'Social communication and conversation', 'Early communication and interaction'],
    activities: ['Picture cards and story time', 'Songs, sounds and word games', 'Turn-taking with toys', 'Everyday communication practice'],
    approach: 'Rather than drills alone, sessions use the things children enjoy—stories, pretend play, games and conversation—to make communication feel natural and rewarding.',
    parentNote: 'Your therapist can share simple ways to encourage communication in daily routines, from playtime to mealtimes.'
  },
  {
    slug: 'special-education', title: 'Special Education', number: '03', color: 'yellow', image: specialEducation, detailImage: specialEducationDetail,
    short: 'A way of learning that feels like their own.',
    intro: 'Special education offers individualized learning support for children who benefit from a different pace or approach. We celebrate strengths while making new skills approachable and engaging.',
    focus: ['Early learning foundations', 'Attention and learning readiness', 'Reading, writing and number concepts', 'Independence in classroom routines'],
    activities: ['Hands-on learning games', 'Visual schedules and picture supports', 'Shape, letter and number play', 'Personalized learning activities'],
    approach: 'Learning is broken into achievable steps and taught through visual, tactile and playful activities that suit each child’s needs and interests.',
    parentNote: 'We work alongside families to build consistent, achievable learning routines beyond the therapy room.'
  },
  {
    slug: 'behavioral-therapy', title: 'Behavioral Therapy', number: '04', color: 'mint', image: behavioral, detailImage: behavioralDetail,
    short: 'Understanding feelings. Building everyday confidence.',
    intro: 'Behavioral therapy helps children develop helpful skills for navigating emotions, routines and social situations. We focus on understanding the child and encouraging positive growth with care.',
    focus: ['Emotional awareness and self-regulation', 'Transitions and daily routines', 'Social and play skills', 'Positive coping strategies'],
    activities: ['Turn-taking games', 'Play-based social practice', 'Visual routines and rewards', 'Feelings and coping activities'],
    approach: 'Sessions use consistent, child-friendly strategies and playful practice to help children build confidence in real-life situations.',
    parentNote: 'Families are partners in the process, with practical strategies that can be carried into daily life.'
  },
  {
    slug: 'counselling', title: 'Counselling', number: '05', color: 'lilac', image: counselling, detailImage: counsellingDetail,
    short: 'A safe little space for big feelings.',
    intro: 'Counselling gives children a welcoming place to explore thoughts and feelings. With age-appropriate play and conversation, we help them feel heard, supported and understood.',
    focus: ['Emotional expression', 'Confidence and self-esteem', 'Coping with change or challenges', 'Family and relationship concerns'],
    activities: ['Drawing and creative expression', 'Stories and therapeutic play', 'Feelings games', 'Gentle guided conversations'],
    approach: 'A child may find it easier to express themselves through art, stories and play than through words alone. Sessions follow their comfort and developmental stage.',
    parentNote: 'Parents and caregivers can receive thoughtful guidance while respecting the child’s need for a safe, trusting space.'
  }
];

export const getService = (slug: string) => services.find((service) => service.slug === slug);
