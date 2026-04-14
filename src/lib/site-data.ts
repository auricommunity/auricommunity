import { getAssetPath } from '../utils/path'

export type NavItem = {
  label: string
  path: string
  match?: 'exact' | 'prefix'
}

export const navItems: NavItem[] = [
  { label: 'ABOUT', path: '/about' },
  { label: 'CONNECT WORSHIP', path: '/connect-worship' },
  { label: 'CAMP', path: '/camp', match: 'prefix' },
  { label: '후원', path: '/donation' },
]

export type HomeSlide = {
  id: number
  title: string
  number: string
  mediaType: 'video'
  video: string
  mainTitle: string
  subtitle: string
  description: string
  videoSettings: {
    loop: boolean
    playOnce: boolean
  }
  duration: number
}

export const homeSlides: HomeSlide[] = [
  {
    id: 0,
    title: 'ABOUT US',
    number: '01',
    mediaType: 'video',
    video: getAssetPath('/videos/aboutus.mp4'),
    mainTitle: 'AURI',
    subtitle: '하나님의 사랑 안에서',
    description: '믿음과 함께하는 특별한 공동체 경험을 만나보세요',
    videoSettings: {
      loop: false,
      playOnce: false,
    },
    duration: 2000,
  },
  {
    id: 1,
    title: 'CAMP',
    number: '02',
    mediaType: 'video',
    video: getAssetPath('/videos/camp.mp4'),
    mainTitle: 'CAMP',
    subtitle: '하나님과 함께하는 캠프',
    description: '하나님과 더 깊이 만나는 특별한 시간들',
    videoSettings: {
      loop: true,
      playOnce: false,
    },
    duration: 5000,
  },
  {
    id: 2,
    title: 'Connect Worship',
    number: '03',
    mediaType: 'video',
    video: getAssetPath('/videos/worship.mp4'),
    mainTitle: 'Connect Worship',
    subtitle: '워십으로 하나님을 섬기는 팀',
    description: '워십과 함께 하나님께 경배를 올려드리는 시간',
    videoSettings: {
      loop: true,
      playOnce: false,
    },
    duration: 3400,
  },
]

export type CampItem = {
  id: number
  title: string
  subtitle: string
  period: string
  location: string
  participants: string
  price: string
  status: string
  slug: string
  description: string
  features: string[]
  image: string
}

export const camps: CampItem[] = [
  {
    id: 1,
    title: '31 CAMP : RE:BUILDING',
    subtitle: '무너진 것을 다시 세우는 시간',
    period: '3월 1일(주일) ~ 2일(월)',
    location: '일산하나교회',
    participants: '청년 31명',
    price: '사전 3만원 / 일반 3.5만원',
    status: '모집중',
    slug: '31',
    description:
      '느헤미야의 심정으로 무너진 성벽을 다시 세우듯, 우리의 신앙과 삶을 RE:BUILDING 하는 1박 2일의 여정입니다.',
    features: ['말씀 집회', '소그룹 나눔', '아침 큐티', '공동체 교제'],
    image: getAssetPath('/images/31camp-poster.jpeg'),
  },
  {
    id: 2,
    title: 'AURI 캠프',
    subtitle: '하나님의 사랑 안에서 하나 되는 다음세대',
    period: '매년 여름/겨울',
    location: '미정',
    participants: '중학생~고등학생',
    price: '문의',
    status: '정기캠프',
    slug: 'auri',
    description: 'AURI 공동체의 대표 정기 캠프로, 다음세대를 위한 특별한 영적 성장의 시간입니다.',
    features: ['말씀 집회', '찬양 워십', '공동체 활동', '개인 기도 시간'],
    image: getAssetPath('/images/auricamp main.jpg'),
  },
  {
    id: 3,
    title: 'AND 캠프',
    subtitle: 'And 함께하는 은혜의 시간',
    period: '과거 진행 (현재 중단)',
    location: '가평 힐링캠프',
    participants: '중학생~고등학생',
    price: '-',
    status: '지난캠프',
    slug: 'and',
    description: '2024년, AURI는 10년의 걸음을 돌아보며, 단 한 번의 특별한 캠프, AND를 열었습니다.',
    features: ['말씀 나눔', '공동체 교제', '자연 체험', '문화 활동'],
    image: getAssetPath('/images/andcamp main.jpg'),
  },
  {
    id: 4,
    title: '하나다캠프',
    subtitle: '세상을 하나님 나라의 TREND로 입다',
    period: '공개 예정',
    location: '공개 예정',
    participants: '다음세대 / 청소년',
    price: '공개 예정',
    status: '준비중',
    slug: 'hanada',
    description: '파스텔 무드와 세대적 감각 위에, 하나님 나라의 시선으로 트렌드를 다시 입혀보는 새로운 하나다캠프.',
    features: ['트렌드 세션', '비주얼 워십', '크리에이티브 미션', '공동체 경험'],
    image: getAssetPath('/images/aboutbackground3.png'),
  },
]
