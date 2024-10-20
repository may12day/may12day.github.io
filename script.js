const SocialIcons = () => (
    <div className="social-icons">
        <a href="https://github.com/may12day" title="GitHub" target="_blank">
            <i className="fab fa-github"></i>
        </a>
        <a href="https://x.com/MayankDevnani" title="X (formerly Twitter)" target="_blank">
            <i className="fab fa-x-twitter"></i>
        </a>
        <a href="https://www.linkedin.com/in/mayankdevnani/" title="LinkedIn" target="_blank">
            <i className="fab fa-linkedin"></i>
        </a>
    </div>
);

const SectionHeader = ({ title, index }) => (
    <div className="section-header" data-index={index}>
        <h2>{title}</h2>
    </div>
);

const SkillTag = ({ skill }) => <span className="skill-tag">{skill}</span>;

const SkillCategory = ({ category, skills }) => (
    <div className="skill-category">
        <h3 className="category-title">{category}</h3>
        <div className="category-skills">
            {skills.map((skill, index) => (
                <SkillTag key={index} skill={skill} />
            ))}
        </div>
    </div>
);

const SkillsSection = ({ skillCategories }) => (
    <section className="section">
        <SectionHeader title="Skills" index={2} />
        <div className="skills-container">
            {Object.entries(skillCategories).map(([category, skills], index) => (
                <SkillCategory key={index} category={category} skills={skills} />
            ))}
        </div>
    </section>
);

const ExperienceItem = ({ title, company, date, description }) => (
    <div className="experience-item">
        <div className="experience-header">
            <div className="experience-company-name">{company}</div>
            <div className="experience-date">{date}</div>
        </div>
        <div className="experience-title">
            <em>{title}</em>
        </div>
        <p className="experience-content">{description}</p>
    </div>
);

const ProjectCard = ({ title, description, tags, github, status }) => (
    <div className="project-card">
        <div className="project-content">
            <div className="project-title">
                {title}
                {status && <span className="project-status skill-tag">{status}</span>}
            </div>
            <div className="project-description">{description}</div>
            <div className="project-tags">
                {tags.map((tag, index) => (
                    <span key={index} className="skill-tag-project">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
        {github && (
            <div className="project-links">
                <a href={github.url} className="btn github-btn" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i> GitHub
                </a>
            </div>
        )}
    </div>
);

const TechnicalInfoDisplay = ({ occupation, location, career_overview }) => (
    <div className="technical-info-display">
        <div className="terminal-header">
            <div className="terminal-button red"></div>
            <div className="terminal-button yellow"></div>
            <div className="terminal-button green"></div>
        </div>
        <div className="terminal-body">
            <p><span className="command">$ cat personal_info.json</span></p>
            <pre className="json-output">
{`{
 "name": "Mayank Devnani",
 "career_overview": ${JSON.stringify(career_overview)},
 "occupation": ${JSON.stringify(occupation)},
 "location": "${location}"
}`}
            </pre>
            <p><span className="command">$ echo $HUMOR</span></p>
            <p className="skill-output">buffer overflow exceeded: humor too long, truncated to awesomeness</p>
        </div>
    </div>
);

const TechyDownloadButton = ({ url }) => {
    const [isTyping, setIsTyping] = React.useState(false);
    const [isDownloading, setIsDownloading] = React.useState(false);
    const [typedText, setTypedText] = React.useState("");
    const fullText = "./download_resume.sh";
    const containerRef = React.useRef(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsTyping(true);
                }
            },
            { threshold: 0.5 }
        );

        const container = document.querySelector(".techy-download-container");
        if (container) observer.observe(container);

        return () => {
            if (container) observer.unobserve(container);
        };
    }, []);

    React.useEffect(() => {
        if (isTyping && typedText.length < fullText.length) {
            const timeout = setTimeout(() => {
                setTypedText(fullText.slice(0, typedText.length + 1));
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [isTyping, typedText]);

    const handleClick = (e) => {
        e.preventDefault();
        setIsDownloading(true);
        // Simulate download process
        setTimeout(() => {
            setIsDownloading(false);
            window.open(url, '_blank');
        }, 2000);
    };

    return (
        <div className="techy-download-container">
            <div className="command-prompt">
                $ <span className="command-text">{typedText}</span>
                {isTyping && typedText.length < fullText.length && <span className="cursor"></span>}
            </div>
            <a href={url} className="techy-download-button" onClick={handleClick}>
                {isDownloading ? "Downloading..." : "Download Resume"}
            </a>
        </div>
    );
};

const TechnicalNameDisplay = ({ name }) => {
    const [visibleChars, setVisibleChars] = React.useState(0);
    const [showCursor, setShowCursor] = React.useState(false);

    React.useEffect(() => {
        if (visibleChars < name.length) {
            const typingTimer = setTimeout(() => {
                setVisibleChars((prev) => prev + 1);
            }, 120);
            return () => clearTimeout(typingTimer);
        } else {
            setShowCursor(true);
        }
    }, [name, visibleChars]);

    return (
        <div className="name-display">
            {name.split("").map((char, index) => (
                <span key={index} className={`name-char ${index < visibleChars ? "visible" : ""}`} style={char === " " ? { marginRight: "0.3em" } : {}}>
                    {char}
                </span>
            ))}
            {showCursor && <span className="name-underscore"></span>}
        </div>
    );
};

const BlogLink = () => (
    <div className="blog-link" title="Visit Blog">
        <a href="Blog/blog.html">
          <i className="fas fa-book-open"></i>
          <span>Blog</span>
        </a>
    </div>
);

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            textAlign: 'center',
            padding: '10px 0',
            fontSize: '0.8em',
            color: '#999',
            backgroundColor: 'transparent'
        }}>
            &copy; {currentYear} {' '}
            <a 
                href="/"
                style={{
                    color: 'inherit',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#3498db'}
                onMouseLeave={(e) => e.target.style.color = '#999'}
            >
                Mayank Devnani
            </a>
        </footer>
    );
};

const App = () => {
/*     const [age, setAge] = React.useState(20.1424615);

    React.useEffect(() => {
        const birthDate = new Date("1998-08-22"); 
        const updateAge = () => {
            const now = new Date();
            const ageInMilliseconds = now - birthDate;
            const ageInYears = ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000);
            setAge(ageInYears);
        };

        updateAge(); // Initial update
        const intervalId = setInterval(updateAge, 1000); // Update every ms for smooth animation

        return () => clearInterval(intervalId);
    }, []); */

    const personalInfo = {
					career_overview: "Curious Engineer | Crafting Solutions from Scratch",
                    occupation: ["Software Developer", "Learner"],
                    location: "Bengaluru, India"
                };

    const skillCategories = {
        Languages: ["Python", "C", "C++", "JavaScript", "Go", "Java"],
        Frontend: ["HTML/CSS", "React", "Bootstrap", "Tkinter"],
        Backend: ["Flask", "Django"],
        Databases: ["MySQL", "MongoDB", "Firebase"],
        "Cloud & DevOps": ["Docker", "Git", "CI/CD"],
		"Machine Learning & AI" : ["PyTorch", "TensorFlow", "VTK", "Plotly"],
    };
    const workExperience = [
        {
            title: "Software Engineer (SWE)",
            company: "Palo Alto Networks",
            date: "Aug '24 - Present",
            description: "Working on the PA series of Next Generation Firewall (NGFW), focusing on system programming in OS, where I've utilized device drivers to optimize system performance and security. Along the way, I've also collaborated on hardware-related tasks, which has given me a deeper understanding of how software and hardware components work together.",
        },
    ];

    React.useEffect(() => {
        const sections = document.querySelectorAll(".section");
        const sectionHeaders = document.querySelectorAll(".section-header");
        const totalSections = sections.length;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;

            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionBottom = sectionTop + sectionHeight;

                let progress = 0;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    // Calculate progress within the current section
                    progress = (scrollPosition - sectionTop) / (sectionHeight - windowHeight);
                    progress = Math.max(0, Math.min(1, progress));
                } else if (scrollPosition >= sectionBottom) {
                    // If we've scrolled past this section, set progress to 100%
                    progress = 1;
                }

                // Calculate the translateX based on the progress
                const translateX = progress * 100;
                sectionHeaders[index].style.setProperty("--translateX", `${translateX}%`);
            });
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial call to set positions

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const projects = [
        {
            title: "DNS Traceroute",
            description: "Command line tool to build the functionality of Traceroute (trace the route network packets).",
            tags: ["Networking", "Parsing", "Network Protocols", "Python"],
            website: "#",
            github: { url: "#" },
            status: "In Progress",
        },
		{
            title: "Small Python Interpreter",
            description: "Explore the inner workings of the Python interpreter, from syntax checking to code execution.",
            tags: ["Parsing", "SDE", "Python"],
            website: "#",
            github: { url: "#"},
            status: "In Progress",
        },
        /*{
            title: "Small Python Interpreter",
            description: "Explore the inner workings of the Python interpreter, from syntax checking to code execution",
            tags: ["Python", "SDE"],
            website: "#",
            github: { url: "#", stars: 1 },
        },*/
    ];

    return (
                    <div className="container" style={{
						position: 'relative',
						minHeight: '100vh',
						paddingBottom: '120px'  // Adjust this value based on your footer's height
					}}>
						<BlogLink />
                        <header className="header">
                            <TechnicalNameDisplay name="Mayank Devnani" />
                            <p className="subtitle">Software Engineer</p>
                            <SocialIcons />
                        </header>

                        <div className="unnamed-section">
                            <TechnicalInfoDisplay {...personalInfo} />
                        </div>

                        <section className="section">
                            <SectionHeader title="About" index={0} />
                            <div className="about-content">
                                <p>
                                    I hold a Master's degree in Computer Science Engineering from IIT Kanpur. My thesis incorporated Graph Neural Networks (GNN) as a foundational element to address a complex problem, reflecting my interest in this promising field of AI. I'm passionate about staying informed on technological advancements, particularly in AI, through regular engagement with technical blogs / write-ups. My professional objective is to leverage my knowledge and continuously evolve, striving to make a positive and lasting impact on society through innovative contributions.
                                </p>
                            </div>
                            <TechyDownloadButton url="https://drive.google.com/file/d/18XbBC_omiJNeC93TAyWDTebAbzcp_4WC/view?usp=sharing" />
                        </section>

                        <SkillsSection skillCategories={skillCategories} />

                        <section className="section">
                            <SectionHeader title="Work Experience" index={2} />
                            {workExperience.map((exp, index) => (
                                <ExperienceItem key={index} {...exp} />
                            ))}
                        </section>

                        <section className="section">
                            <SectionHeader title="Projects" index={3} />
                            <div className="projects-grid">
                                {projects.map((project, index) => (
                                    <ProjectCard key={index} {...project} />
                                ))}
                            </div>
                        </section>
						
						<Footer />
                    </div>
                );
            };

            ReactDOM.render(<App />, document.getElementById("root"));