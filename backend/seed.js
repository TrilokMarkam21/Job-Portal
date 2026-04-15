import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();

// Import models
import { User } from "./models/user.model.js";
import { Company } from "./models/company.model.js";
import { Job } from "./models/job.model.js";

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected for seeding");

    // 1. Create a recruiter user
    const hashedPassword = await bcrypt.hash("Recruiter@123", 10);
    
    let recruiter = await User.findOne({ email: "recruiter@jobhunt.com" });
    if (!recruiter) {
      recruiter = await User.create({
        fullname: "JobHunt Admin",
        email: "recruiter@jobhunt.com",
        phoneNumber: 9999999999,
        password: hashedPassword,
        role: "recruiter",
        profile: {
          bio: "Platform admin recruiter",
          profilePhoto: ""
        }
      });
      console.log("✅ Recruiter created");
    } else {
      console.log("ℹ️  Recruiter already exists");
    }

    // 2. Create companies
    const companiesData = [
      {
        name: "Google",
        description: "Google LLC is an American multinational technology company focusing on AI, online advertising, search engine technology, cloud computing, and more.",
        website: "https://www.google.com",
        location: "Bangalore, India",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png",
        userId: recruiter._id
      },
      {
        name: "Microsoft",
        description: "Microsoft Corporation is an American multinational technology corporation producing computer software, consumer electronics, and personal computers.",
        website: "https://www.microsoft.com",
        location: "Hyderabad, India",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png",
        userId: recruiter._id
      },
      {
        name: "Amazon",
        description: "Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing, online advertising, digital streaming, and AI.",
        website: "https://www.amazon.com",
        location: "Bangalore, India",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png",
        userId: recruiter._id
      },
      {
        name: "Netflix",
        description: "Netflix, Inc. is an American subscription video on-demand over-the-top streaming service and production company.",
        website: "https://www.netflix.com",
        location: "Mumbai, India",
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
        userId: recruiter._id
      },
      {
        name: "Meta",
        description: "Meta Platforms, Inc. is an American multinational technology conglomerate that owns Facebook, Instagram, and WhatsApp.",
        website: "https://www.meta.com",
        location: "Gurugram, India",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1200px-Meta_Platforms_Inc._logo.svg.png",
        userId: recruiter._id
      },
      {
        name: "Infosys",
        description: "Infosys Limited is an Indian multinational IT services and consulting company headquartered in Bangalore.",
        website: "https://www.infosys.com",
        location: "Pune, India",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1200px-Infosys_logo.svg.png",
        userId: recruiter._id
      }
    ];

    const companies = [];
    for (const companyData of companiesData) {
      let company = await Company.findOne({ name: companyData.name });
      if (!company) {
        company = await Company.create(companyData);
        console.log(`✅ Company "${companyData.name}" created`);
      } else {
        console.log(`ℹ️  Company "${companyData.name}" already exists`);
      }
      companies.push(company);
    }

    // 3. Create jobs
    const jobsData = [
      {
        title: "Frontend Developer",
        description: "We are looking for a skilled Frontend Developer proficient in React.js, HTML5, CSS3, and JavaScript. You will be responsible for building user-facing features and ensuring great user experience.",
        requirements: ["React.js", "JavaScript", "HTML5", "CSS3", "Redux", "Git"],
        salary: 12,
        experienceLevel: 1,
        location: "Bangalore, India",
        jobType: "Full-time",
        position: 3,
        company: companies[0]._id,
        created_by: recruiter._id
      },
      {
        title: "Backend Developer",
        description: "Join Microsoft as a Backend Developer. You will design and implement scalable backend systems using Node.js, Express, and cloud services. Experience with databases and REST APIs is required.",
        requirements: ["Node.js", "Express", "MongoDB", "REST APIs", "Docker", "AWS"],
        salary: 15,
        experienceLevel: 2,
        location: "Hyderabad, India",
        jobType: "Full-time",
        position: 2,
        company: companies[1]._id,
        created_by: recruiter._id
      },
      {
        title: "Full Stack Developer",
        description: "Amazon is hiring Full Stack Developers to build end-to-end web applications. You will work on both frontend and backend, building microservices and responsive UIs.",
        requirements: ["React.js", "Node.js", "MongoDB", "AWS", "TypeScript", "GraphQL"],
        salary: 18,
        experienceLevel: 2,
        location: "Bangalore, India",
        jobType: "Full-time",
        position: 5,
        company: companies[2]._id,
        created_by: recruiter._id
      },
      {
        title: "Data Scientist",
        description: "Netflix is looking for a Data Scientist to analyze large datasets and build ML models for content recommendation. Strong background in statistics and Python is essential.",
        requirements: ["Python", "Machine Learning", "TensorFlow", "SQL", "Statistics", "Pandas"],
        salary: 22,
        experienceLevel: 3,
        location: "Mumbai, India",
        jobType: "Full-time",
        position: 2,
        company: companies[3]._id,
        created_by: recruiter._id
      },
      {
        title: "DevOps Engineer",
        description: "Meta is hiring DevOps Engineers to manage CI/CD pipelines, infrastructure automation, and cloud deployments. Experience with Kubernetes, Docker, and AWS/GCP is preferred.",
        requirements: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux", "Terraform"],
        salary: 16,
        experienceLevel: 2,
        location: "Gurugram, India",
        jobType: "Full-time",
        position: 3,
        company: companies[4]._id,
        created_by: recruiter._id
      },
      {
        title: "UI/UX Designer",
        description: "Google is looking for a creative UI/UX Designer to join our product team. You will design intuitive interfaces, create wireframes, and conduct user research.",
        requirements: ["Figma", "Adobe XD", "Prototyping", "User Research", "Wireframing", "CSS"],
        salary: 10,
        experienceLevel: 1,
        location: "Bangalore, India",
        jobType: "Full-time",
        position: 2,
        company: companies[0]._id,
        created_by: recruiter._id
      },
      {
        title: "Mobile App Developer",
        description: "Infosys is hiring React Native developers to build cross-platform mobile applications for enterprise clients. Experience with iOS and Android development is a plus.",
        requirements: ["React Native", "JavaScript", "iOS", "Android", "Redux", "Firebase"],
        salary: 8,
        experienceLevel: 1,
        location: "Pune, India",
        jobType: "Full-time",
        position: 4,
        company: companies[5]._id,
        created_by: recruiter._id
      },
      {
        title: "Cloud Architect",
        description: "Microsoft is seeking an experienced Cloud Architect to design and implement cloud solutions on Azure. Lead architectural decisions and mentor junior engineers.",
        requirements: ["Azure", "AWS", "Cloud Architecture", "Microservices", "Docker", "Kubernetes"],
        salary: 25,
        experienceLevel: 5,
        location: "Hyderabad, India",
        jobType: "Full-time",
        position: 1,
        company: companies[1]._id,
        created_by: recruiter._id
      },
      {
        title: "Software Testing Engineer",
        description: "Amazon is hiring QA Engineers to ensure software quality through automated and manual testing. Knowledge of Selenium, Jest, and CI/CD testing frameworks is needed.",
        requirements: ["Selenium", "Jest", "Manual Testing", "Automation", "JIRA", "Agile"],
        salary: 9,
        experienceLevel: 1,
        location: "Bangalore, India",
        jobType: "Full-time",
        position: 3,
        company: companies[2]._id,
        created_by: recruiter._id
      },
      {
        title: "Machine Learning Engineer",
        description: "Meta is looking for ML Engineers to build production-grade machine learning models. You will work on recommendation systems, NLP, and computer vision projects.",
        requirements: ["Python", "PyTorch", "TensorFlow", "NLP", "Computer Vision", "AWS"],
        salary: 20,
        experienceLevel: 3,
        location: "Gurugram, India",
        jobType: "Full-time",
        position: 2,
        company: companies[4]._id,
        created_by: recruiter._id
      },
      {
        title: "Java Developer",
        description: "Infosys is hiring experienced Java Developers for enterprise application development. Strong knowledge of Spring Boot, Hibernate, and microservices architecture required.",
        requirements: ["Java", "Spring Boot", "Hibernate", "Microservices", "SQL", "REST APIs"],
        salary: 10,
        experienceLevel: 2,
        location: "Pune, India",
        jobType: "Full-time",
        position: 5,
        company: companies[5]._id,
        created_by: recruiter._id
      },
      {
        title: "Cybersecurity Analyst",
        description: "Google is hiring Cybersecurity Analysts to protect systems and networks. You will perform vulnerability assessments, incident response, and security audits.",
        requirements: ["Network Security", "Penetration Testing", "SIEM", "Linux", "Firewalls", "Python"],
        salary: 14,
        experienceLevel: 2,
        location: "Bangalore, India",
        jobType: "Full-time",
        position: 2,
        company: companies[0]._id,
        created_by: recruiter._id
      }
    ];

    // Check if jobs already exist
    const existingJobs = await Job.countDocuments();
    if (existingJobs > 0) {
      console.log(`ℹ️  ${existingJobs} jobs already exist. Skipping job creation.`);
    } else {
      for (const jobData of jobsData) {
        await Job.create(jobData);
        console.log(`✅ Job "${jobData.title}" at "${companiesData.find(c => c.userId.toString() === jobData.created_by.toString())?.name || 'Company'}" created`);
      }
      console.log(`\n🎉 Successfully seeded ${jobsData.length} jobs!`);
    }

    console.log("\n✅ Seeding complete!");
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedData();
