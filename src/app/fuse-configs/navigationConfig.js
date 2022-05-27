import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'applications',
    title: 'Applications',
    translate: 'APPLICATIONS',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'contact-component',
        title: 'Contact',
        translate: 'Contact',
        type: 'item',
        icon: 'whatshot',
        url: 'contact',
      },
      {
        id: 'video-analysis',
        title: 'Video Analysis',
        type: 'item',
        icon: 'whatshot',
        url: 'videoanalysis/analysis'
      },
      {
        id: 'strockanalysislist',
        title: 'Strock Analysis List',
        type: 'item',
        icon: 'whatshot',
        url: 'strockanalysislist'
      }, {
        id: "comparelibrary",
        title: "Compare Library",
        type: "item",
        url: "comparelibrary",
        icon: 'whatshot'
        
      }, {
        id: "assessments",
        title: "Assessments",
        type: "item",
        url: "assessments",
        icon:"whatshot"
      }, {
        
        id: "playerdevelopment",
        title: "playerdevelopment",
        type: "item",
        url: "playerdevelopment",
        icon: "whatshot"
      }
    ],
  },
];


export const navigationConfigPC = [
  {
    id: 'applications',
    title: 'Applications',
    translate: 'APPLICATIONS',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'profile',
        title: 'Profile',
        translate: 'PROFILE',
        type: 'item',
        icon: 'whatshot',
        url: 'profilepage',
      },
      {
        id: 'player-data',
        title: 'PLAYER DATA',
        //translate: 'PLAYER DATA',
        type: 'item',
        icon: 'whatshot',
        url: 'competancyaggregation',
      }
    ]
  }
]

export default navigationConfig;
