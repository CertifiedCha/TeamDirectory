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
"https://scontent.fmnl36-1.fna.fbcdn.net/v/t39.30808-6/494284355_1303653580699804_1925043377826567478_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEvUWWbi1K3WByQuCPoNKLvM7mmDLIiV1YzuaYMsiJXViejoycSG90YT_HGuYioKkdIi5Lt_9rMd_WdOUxLmXS8&_nc_ohc=bBzJGgoFZHQQ7kNvwF2xHmf&_nc_oc=Adm5W8KRcVr4svinT_yjPdA4uMzK9cgVTCBOOxOfZ3USPRaZhOA28_Ycrmdwl7KVC-o&_nc_zt=23&_nc_ht=scontent.fmnl36-1.fna&_nc_gid=KInOTQ3mYgDy7XbBTTyxxw&oh=00_AfcmeCV4ZZ7CQtGsarvC6WhfQMHDo8Ky3mdnGz0QA80b9w&oe=68E6A125",
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
      "https://scontent.fmnl36-1.fna.fbcdn.net/v/t39.30808-6/557627043_1419921575739670_6989985746493483481_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGS3V6I3GgonRgsAUtRwxsCpCXSjEvf9kGkJdKMS9_2Qb8P7JdhKPSPeY1btQtZuR7rtlKqXgme_Fg_ZbHCvdMb&_nc_ohc=Q3VrfGwRUXEQ7kNvwFaKCwJ&_nc_oc=AdmZyj0QkC0fM1UGYwYwkvkd2bQvv3kSVEgP-EsqH0os5lJ8TtD9s6xmzeNmivcIkHE&_nc_zt=23&_nc_ht=scontent.fmnl36-1.fna&_nc_gid=MO-agss1VYyxozUNwkzhqA&oh=00_AfdJsVb4YglcPGf6dYcJ3E6DcTzKrX8Qh4cMLtQWoVu3LQ&oe=68E6B7E4",
    email: "wepjaictin@pcu.edu.ph",
    bio: "Full stack developer who is proficient in front-end development but has experience in back-end developing as well. A person who is very passionate when it comes to technology.",
    socialLinks: {
      facebook: "https://www.facebook.com/will.eleazar.jaictin.2025",
      instagram: "https://www.instagram.com/will_azar/",
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
      "https://scontent.fmnl36-1.fna.fbcdn.net/v/t39.30808-1/523662928_1449656172854989_1042573254877859322_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeGcqVFw2bA_uVT6hTeB7wGym42xQBiz0LibjbFAGLPQuCT_DMEZAzYKnGpxnYxs_9VgYZxP4JUXXFyi5-CKYoeR&_nc_ohc=Qs1Tw_1VdGYQ7kNvwF0HXvb&_nc_oc=Adkk5JWy3W7Tc21d--3nrAHdBZNDVpdnt62a6xnO3ajEKeaSMuiVHFz9Ok6wKLtFgRA&_nc_zt=24&_nc_ht=scontent.fmnl36-1.fna&_nc_gid=FEsZEr0lhR5ozVQUicPqrA&oh=00_AffZCIMU5LK1yLcxBzQBYEzrGQNaLJQRCVt7UFmUXVk6Yw&oe=68E6965C",
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
    name: "Lilhalm D. Mendez",
    role: "blogger/writer",
    department: "Sales",
    experience: 8,
    skills: [
      "Blogging",
      "Writing",
    ],
    photo:
"https://scontent.fmnl36-1.fna.fbcdn.net/v/t39.30808-1/534637386_1448640679508571_3771887921517743322_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHU-l3rD-0Y9M6_r4PQu09xgezZyjVXO8yB7NnKNVc7zBsQZ7zAfZsAmvNZIaZDb8Wn6dM0iRE1NMGVXJTV7oWx&_nc_ohc=GxxZ9FM-A7cQ7kNvwEWssQN&_nc_oc=AdkGO_2i7ZQoVK8EcnqzKyVjBsld9S0zuVSrOvnEern1GAvdpas265qq6d6ZrocjIkc&_nc_zt=24&_nc_ht=scontent.fmnl36-1.fna&_nc_gid=5gaLFFjrwTdGKVMLbgNZEQ&oh=00_Afct7ScFBMdV3KL-i15nTq50VtHD6UtKwep85FA3VOIhPA&oe=68E68778",    
    email: "ldmendez@pcu.edu.ph",
    bio: "I am a blogger who is very honest",
    socialLinks: {
      facebook: "https://www.facebook.com/Horsdoeuvresgaming",
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
