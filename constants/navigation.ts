import { NavigationLink, NavigationSocialLink, NavigationTreeLink } from '@/types/navigation.ts';

/**
 * 로그인 시 보여지는 링크
 */
const AUTH_LINK: NavigationLink[] = [
  { id: 'myPage', href: '/mypage', label: 'My Page', target: '_self' },
  { id: 'logOut', href: '', label: 'Logout', target: '_self' },
];

/**
 * 비 로그인 시 보여지는 링크
 */
const NOT_AUTH_LINK: NavigationLink[] = [
  { id: 'signIn', href: '/signin', label: 'Sign In', target: '_self' },
  { id: 'signUp', href: '/signup', label: 'Sign Up', target: '_self' },
];

/**
 * programming Nav 메뉴
 */
const PROGRAMMING: NavigationTreeLink = {
  id: 'computerScience',
  href: '/cs',
  label: 'ComputerScience',
  children: [
    { id: 'programming', href: '/programming', label: 'Programming' },
    { id: 'algorithm', href: '/algorithm', label: 'Algorithm' },
    { id: 'dataStructure', href: '/datastructure', label: 'Data Structure' },
    { id: 'os', href: '/os', label: 'Operation System' },
    { id: 'network', href: '/network', label: 'Network' },
    { id: 'security', href: '/security', label: 'Security' },
    { id: 'dataBase', href: '/database', label: 'DataBase' },
  ],
};
/**
 * posting Nav 메뉴
 */
const POSTING: NavigationTreeLink = {
  id: 'posting',
  href: '/posting',
  label: 'Posting',
  children: [
    { id: 'newPosting', label: 'What’s New', href: '/posts/latest' },
    { id: 'writing', label: 'Writing', href: '/write' },
    { id: 'tag', label: 'Tags', href: '/tags' },
    { id: 'popular', label: 'Popular', href: '/posts/popular' },
  ],
};

/**
 * community Nav 메뉴
 */
const COMMUNITY: NavigationTreeLink = {
  id: 'community',
  href: '/community',
  label: 'Community',
  children: [
    { id: 'contact', label: 'Contact', href: 'mailto:jho951@naver.com' },
    { id: 'faq', label: 'FAQ', href: '/community/faq' },
    { id: 'linkedIn', label: 'Linked In', href: 'https://www.linkedin.com/company/yourcompany' },
    { id: 'slack', label: 'Slack', href: 'https://yourdomain.slack.com' },
    { id: 'discord', label: 'Discord', href: 'https://discord.gg/2TFw8rZD' },
  ],
};

/**
 * download Nav 메뉴
 */
const DOWNLOAD: NavigationTreeLink = {
  id: 'download',
  href: '/download',
  label: 'DOWNLOAD',
  children: [
    {
      id: 'iphone',
      label: 'iPhone',
      href: 'https://apps.apple.com/app/id0000000000',
      target: '_blank',
    },
    {
      id: 'ipad',
      label: 'iPad',
      href: 'https://apps.apple.com/app/id0000000000',
      target: '_blank',
    },
    {
      id: 'android',
      label: 'Craft for Android',
      href: 'https://play.google.com/store/apps/details?id=com.yourcompany.craft',
      target: '_blank',
    },
    {
      id: 'mac',
      label: 'Craft for Mac',
      href: 'https://yourdomain.com/download/mac',
      target: '_blank',
    },
    {
      id: 'window',
      label: 'Craft for Windows',
      href: 'https://yourdomain.com/download/windows',
      target: '_blank',
    },
  ],
};

/**
 * legal Nav 메뉴
 */
const LEGAL: NavigationTreeLink = {
  id: 'legal',
  href: '/legal',
  label: 'LEGAL',

  children: [
    { id: 'privacy', label: 'Privacy', href: '/legal/privacy' },
    { id: 'terms', label: 'Terms', href: '/legal/terms', target: '_blank' },
    { id: 'secure', label: 'Security', href: '/legal/security', target: '_blank' },
    { id: 'esg', label: 'ESG', href: '/legal/esg' },
    { id: 'responsible', label: 'Responsible Disclosure', href: '/legal/responsible-disclosure' },
  ],
};

/**
 * company Nav 메뉴
 */
const COMPANY: NavigationTreeLink = {
  id: 'company',
  href: '/company',
  label: 'Company',

  children: [
    { id: 'about', label: 'About', href: '/about' },
    { id: 'brand', label: 'Brand Assets', href: '/brand-assets' },
    { id: 'careers', label: 'Careers', href: '/careers', target: '_blank' },
  ],
};

/**
 * 푸터 sns_link
 */
const SNS_LINK: NavigationSocialLink[] = [
  {
    id: 'rss',
    href: '/rss.xml',
    icon: 'rss',
    external: true,
  },
  {
    id: 'Git',
    href: 'https://github.com/jho951',
    icon: 'git',
    external: true,
  },
  { id: 'blog', href: 'https://develop-enchantment.tistory.com/', icon: 'file', external: true },
];

const SOCIAL_LIST = [
  {
    icon: 'slack',
    name: 'Slack',
    desc: 'Get the inside track on new features and learn how other people use Craft.',
    action: 'Join',
    url: '#',
    meta: '14K MEMBERS',
  },
  {
    icon: 'gmail',
    name: 'Gmail',
    desc: 'Stay up to date on our latest releases and announcements.',
    action: 'Follow',
    url: '#',
    meta: '30K FOLLOWERS',
  },
  {
    icon: 'discord',
    name: 'Discord',
    desc: 'Discuss, share, and explore creative ways to use Craft.',
    action: 'Join',
    url: '#',
    meta: '8K MEMBERS',
  },
  {
    icon: 'linkedin',
    name: 'LinkedIn',
    desc: 'Tips, tutorials, and feature deep dives to inspire your Craft workflow.',
    action: 'Subscribe',
    url: '#',
    meta: '10K SUBSCRIBERS',
  },
] as const;

const GNB: NavigationTreeLink[] = [COMPANY, PROGRAMMING, POSTING, COMMUNITY];

const FNB: NavigationTreeLink[] = [PROGRAMMING, COMMUNITY, LEGAL, DOWNLOAD, COMPANY];

/**
 * 해당 페이지에서는 헤더가 렌더되지 않습니다.
 */
const HEADER_EXCLUDED_PATHS = ['/signin', '/signup'];
/**
 * 해당 페이지에서는 푸터가 렌더되지 않습니다.
 */
const FOOTER_EXCLUDED_PATHS = ['/signin', '/signup'];

export {
  HEADER_EXCLUDED_PATHS,
  FOOTER_EXCLUDED_PATHS,
  AUTH_LINK,
  NOT_AUTH_LINK,
  PROGRAMMING,
  COMMUNITY,
  DOWNLOAD,
  SNS_LINK,
  POSTING,
  COMPANY,
  LEGAL,
  SOCIAL_LIST,
  GNB,
  FNB,
};
