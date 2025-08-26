export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  experience: number;
  skills: string[];
  photo: string;
  email: string;
  bio: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    facebook?: string;
    instagram?: string;
  };
  available: boolean;
  favorite: boolean;
  spotlight: boolean;
  likes: number;
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Darius Charles Fajardo",
    role: "Full Stack Developer",
    department: "Engineering",
    experience: 2,
    skills: ["Coding", "Production", "CSS", "JavaScript"],
    photo:
      "https://scontent.fmnl36-1.fna.fbcdn.net/v/t39.30808-6/472400471_1226477375084092_1931296288564897007_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEegd8Zbr3ye5r1EdUJ7mzDWrmvdirtVs5aua92Ku1WzlUYTalRareasiAjlNka4GketIEBOy1zvDrvgbh2ANat&_nc_ohc=970h9WnEyuUQ7kNvwHBz8Mn&_nc_oc=AdkUPCV8PsgjYd_NdsKCKnC1igAKQh_9q3FbBD_8fH3ph9HnW-FF_vhaKR2EshhXcbQ&_nc_zt=23&_nc_ht=scontent.fmnl36-1.fna&_nc_gid=afNJY0Lu6d2qkLw3QKg3Uw&oh=00_AfUUypIEH8lMrmjHRslDPk7sX195R-cPUIRhgNONholLHA&oe=68B3A05F",
    email: "dcbfajardo@pcu.edu.ph",
    bio: "Full stack developer with a passion for creating efficient and scalable web applications. Experienced in both frontend and backend technologies.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/sarahchen",
      twitter: "https://twitter.com/sarahchen",
      github: "https://github.com/sarahchen",
    },
    available: true,
    favorite: false,
    spotlight: true,
    likes: 42,
  },
  {
    id: "2",
    name: "Will Eleazar Jaictin",
    role: "Full stack developer",
    department: "Product",
    experience: 7,
    skills: ["Coding", "Production", "CSS", "JavaScript","C++"],
    photo:
      "https://scontent.fmnl36-1.fna.fbcdn.net/v/t1.15752-9/533583319_1255793816297349_5049863942129001951_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=111&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeGEOco_KZ5OipZsBpqPvEWbILBb2xg3iQggsFvbGDeJCBo1ET9_RNwqP_wr3QeRIZ8s-S3qT1AywHxuM5tZD7Xg&_nc_ohc=fTsB-fkDEnsQ7kNvwGZUtbD&_nc_oc=Adk9Z3ie8D1AIuPcBnVcceqzYEM7SbPfByTF5y1Yl9L21NRSSFUu2dZKTh5uKQLltzo&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fmnl36-1.fna&oh=03_Q7cD3AH4gs1bP2zuASX6a2wQq1tqxc5yUySV8Sp1k5gKkUCPAA&oe=68D51E95",
    email: "wepjaictin@pcu.edu.ph",
    bio: "Full stack developer who is proficient in front-end development but has experience in back-end developing as well. A person who is very passionate when it comes to technology.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/marcusjohnson",
      twitter: "https://twitter.com/marcusj",
      instagram: "https://instagram.com/marcusj",
    },
    available: true,
    favorite: false,
    spotlight: true,
    likes: 38,
  },
  {
    id: "3",
    name: "Arkhen Floyd Elomina",
    role: "Data Manager",
    department: "Data",
    experience: 4,
    skills: ["Layout", "Organize", "Production System"],
    photo:
      "https://scontent.fmnl36-1.fna.fbcdn.net/v/t39.30808-6/523662928_1449656172854989_1042573254877859322_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGcqVFw2bA_uVT6hTeB7wGym42xQBiz0LibjbFAGLPQuCT_DMEZAzYKnGpxnYxs_9VgYZxP4JUXXFyi5-CKYoeR&_nc_ohc=VA3nLegjF8sQ7kNvwGU1yIp&_nc_oc=AdnFMRoraqU1RYqCmwyIDipFXvq5lYtQGAQcUtiSYje3dh1lKzsFGo6lYiqyEpU2ZA4&_nc_zt=23&_nc_ht=scontent.fmnl36-1.fna&_nc_gid=AYF1NIOWXL5716qTVExplg&oh=00_AfXQIQsVvfyw6mA9uZiHUNSJyxXNLzK7jN0qPPkIIyBtgQ&oe=68AE6D5A",
    email: "afpelomina@pcu.edu.ph",
    bio: "Data manager with a knack for turning raw data into meaningful insights. Skilled in data visualization and statistical analysis.",
    socialLinks: {
      facebook:
        "https://www.facebook.com/arkhenfloyd.elomina.5",
      instagram: "https://www.instagram.com/floy.d4827/",
    },
    available: true,
    favorite: false,
    spotlight: false,
    likes: 51,
  },
  {
    id: "4",
    name: "Angelmae Canete",
    role: "blogger/writer",
    department: "Engineering",
    experience: 6,
   skills: [
      "Blogging",
      " Writing",
    ],
    photo:
      "https://scontent.fmnl36-1.fna.fbcdn.net/v/t1.15752-9/536894252_2145538139273810_73969625715109099_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=103&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeG6z5u8aKq1h-QYK9AXFYikrDrd-GaeCJasOt34Zp4IljUtF9Pu0cq4gZxrZFYhC2YEXBo8T8bnFwAn2oZwZfgT&_nc_ohc=FZW55iTxjZkQ7kNvwGFmmbb&_nc_oc=AdlytGOM7s4roDgIYoyqiK2PZdHS-kbjUcb6_5Oa_l4JNR6eXI9UWuLVtGWGpMsXXK0&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fmnl36-1.fna&oh=03_Q7cD3AFkFh4BzgnKmNbtwEzsnmOPRgs1Z8xS1KbOrqyUzTO33w&oe=68D5119B",
    email: "amfcanete@pcu.edu.ph",
    bio: " A blogger who is passionate about sharing stories and experiences. Skilled in creating engaging content and building connections with readers through honest and authentic writing.",
    socialLinks: {
      instagram: "https://www.instagram.com/jelaysandwich_?igsh=cWQ2dnhtYng3M3Zh",
      linkedin: "https://linkedin.com/in/davidkim",
      github: "https://github.com/davidkim",
    },
    available: true,
    favorite: false,
    spotlight: true,
    likes: 29,
  },
  {
    id: "5",
    name: "Emely Ann Canete",
    role: "blogger/writer",
    department: "Analytics",
    experience: 3,
   skills: [
      "Blogging",
      " Writing",
    ],
    photo:
      "https://scontent.fmnl36-1.fna.fbcdn.net/v/t1.15752-9/533548254_781382164260318_1919717777686450307_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=102&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeEB3b6baQLl4W73RjON2_6T1r8Olg33qFjWvw6WDfeoWL4jt4AUZLuDgBhvXJRhlvP7nmqTudDxafJH94-VP661&_nc_ohc=N__NWvRVAXkQ7kNvwGZWQOJ&_nc_oc=AdkD9xhAUhvs2gTGPFiVXG04NqWyuqq-jVvWs3Hc0n2wim7KHMrNgiTN2Zl1E7quZSM&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fmnl36-1.fna&oh=03_Q7cD3AEpFjFmKZzZNNg_p4pvdJObE7ZoYyp4VWs4VblsBJ6mTw&oe=68D531B7",
    email: "eadcanete@pcu.edu.ph",
    bio: "A blogger who is passionate about sharing stories and experiences. Skilled in creating engaging content and building connections with readers through honest and authentic writing.",
    socialLinks: {
      instagram: "https://www.instagram.com/elis.quish?igsh=MTUxOTRtNzR2dHRtcg==",
      linkedin: "https://linkedin.com/in/priyasharma",
      github: "https://github.com/priyasharma",
    },
    available: true,
    favorite: false,
    spotlight: false,
    likes: 67,
  },
  {
    id: "6",
    name: "Johnray Adto-on",
    role: "blogger/writer",
    department: "Marketing",
    experience: 5,
   skills: [
      "Blogging",
      " Writing",
    ],
    photo:
      "https://scontent.fmnl36-1.fna.fbcdn.net/v/t1.15752-9/532925002_1170345888255845_8518997768753391855_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=104&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeF2mlhqdE9HESv9ZZO_-c5Kf4B00tWFAkZ_gHTS1YUCRqwBes_Cmk9oYCrGRswbQuL2dHpkg60vMGOc0f-ENdbc&_nc_ohc=Z_0-xYwdEmIQ7kNvwENVMsC&_nc_oc=AdkSNTwVOxAQOCKz0KDlaS5TqCPJ0HWSLgZgLOoTsNT91FHKJBK5iKeVjjoIkGo_YWM&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fmnl36-1.fna&oh=03_Q7cD3AGSDB4l4xhmWdNzX6scGeGiKc5juBiOlYEWQVsMWXENdw&oe=68D513EF",
    email: "adtoonjohnray@gmail.com",
    bio: "Hey there! I’m John-Ray, the voice behind this little corner of the internet. I started blogging as a way to share my thoughts, stories, and experiences—and it’s grown into something much more meaningful.",
    socialLinks: {
      instagram: "https://www.instagram.com/johnrayadtoon/",
      linkedin: "https://linkedin.com/in/alexthompson",
      twitter: "https://twitter.com/alexmarketing",
    },
    available: true,
    favorite: false,
    spotlight: false,
    likes: 33,
  },
  {
    id: "7",
    name: "Mariane May Escasinas",
    role: "blogger/writer",
    department: "Engineering",
    experience: 4,
    skills: [
      "Blogging",
      " Writing",
    ],
    photo:
      "https://scontent.fmnl36-1.fna.fbcdn.net/v/t1.15752-9/526720984_1642884173047417_2247854457065878985_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=102&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeE81umIwszmZrPyqnKYHfRJWgtiC3dexohaC2ILd17GiElp57oFUdj6k6ZS7YfB5fYFUwfroD3yWi2E6nw6TzGS&_nc_ohc=vLFQ-5lHz1wQ7kNvwH8V2yp&_nc_oc=Adn3-nv837wdQJjCcEMgexXjnS_wnHLd2uSEQ-Y1rNzZZn47Wc91fiCPV_-tBSY4KlI&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fmnl36-1.fna&oh=03_Q7cD3AELf0Z52lRC_nWSisRVdt9rJ7g59gtDGuq0TwAKulngvQ&oe=68D50B2E",
    email: "mmpescasinas@pcu.edu.ph",
    bio: " A creative and passionate blogger who believes writing goes beyond words on a page—it is a meaningful craft that holds experiences, lessons, and reflects the victories born from perseverance through failure.",
    socialLinks: {
      instagram: "https://www.instagram.com/marianemayescasinas/",
      linkedin: "https://linkedin.com/in/jenniferliu",
      github: "https://github.com/jenniferliu",
    },
    available: true,
    favorite: false,
    spotlight: false,
    likes: 45,
  },
  {
    id: "8",
    name: "Lilhalm D. Mendez",
    role: "blogger/writer",
    department: "Sales",
    experience: 8,
    skills: [
      "Blogging",
      " Writing",
    ],
    photo:
      "https://scontent.fmnl36-1.fna.fbcdn.net/v/t39.30808-6/534637386_1448640679508571_3771887921517743322_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHU-l3rD-0Y9M6_r4PQu09xgezZyjVXO8yB7NnKNVc7zBsQZ7zAfZsAmvNZIaZDb8Wn6dM0iRE1NMGVXJTV7oWx&_nc_ohc=GQ4zQbbXZ0kQ7kNvwEXK1DD&_nc_oc=AdlLlIW17sdwzquJILHMEpYSJUV0yQ2TAdMaqnkm3hyxLBdcsEGBWqzG4GifWjy58Mg&_nc_zt=23&_nc_ht=scontent.fmnl36-1.fna&_nc_gid=HhuN7FQQCHQHU97XiZAbcQ&oh=00_AfWFQe6KdpKIkacmMGEnXY5uVQGmeui6BqGziWjDD8T87w&oe=68B37476",
    email: "ldmendez@pcu.edu.ph",
    bio: "I am a blogger who is very honest",
    socialLinks: {
      linkedin: "https://linkedin.com/in/robertbrown",
    },
    available: true,
    favorite: false,
    spotlight: false,
    likes: 28,
  },
];

export const departments = Array.from(
  new Set(teamMembers.map((member) => member.department)),
).sort();