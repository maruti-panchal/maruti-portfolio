import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Link,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Chip,
  CircularProgress,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import WebIcon from "@mui/icons-material/Web";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

// Create a custom dark theme for a modern, sleek look
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#61dafb", // A bright, cool accent color, like React's logo
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b3b3b3",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "4rem",
      "@media (max-width:600px)": {
        fontSize: "2.5rem",
      },
    },
    h2: {
      fontWeight: 600,
      fontSize: "2.5rem",
      "@media (max-width:600px)": {
        fontSize: "2rem",
      },
    },
    h3: {
      fontWeight: 500,
      fontSize: "1.75rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          padding: "12px 24px",
          textTransform: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-10px)",
            boxShadow: "0 8px 30px rgba(97, 218, 251, 0.2)",
          },
        },
      },
    },
  },
});

// A custom component for a loading spinner
const Loading = () => (
  <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
    <CircularProgress color="primary" />
  </Box>
);

// Dummy data for skills (you can replace this with dynamic data later)
const skills = [
  { name: "React", icon: <i className="devicon-react-original colored"></i> },
  {
    name: "JavaScript",
    icon: <i className="devicon-javascript-plain colored"></i>,
  },
  { name: "Material-UI", icon: <WebIcon /> },
  { name: "Node.js", icon: <i className="devicon-nodejs-plain colored"></i> },
  { name: "HTML5", icon: <i className="devicon-html5-plain colored"></i> },
  { name: "CSS3", icon: <i className="devicon-css3-plain colored"></i> },
  { name: "Git", icon: <i className="devicon-git-plain colored"></i> },
  { name: "MongoDB", icon: <i className="devicon-mongodb-plain colored"></i> },
];

const App = () => {
  const GITHUB_USERNAME = "maruti-panchal";
  const LEETCODE_USERNAME = "maruti-panchal";

  const REPOSITORIES_TO_DISPLAY = [
    "NextHome",
    "dynamic-form-builder",
    "chronos-dynamic-calender",
  ];

  const [githubRepos, setGithubRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [leetcodeSolvedCount, setLeetcodeSolvedCount] = useState(null);
  const [loadingLeetcode, setLoadingLeetcode] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  // Function to fetch and filter GitHub repositories
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch GitHub repos");
        }
        const data = await response.json();
        const filteredRepos = data.filter((repo) =>
          REPOSITORIES_TO_DISPLAY.includes(repo.name)
        );
        setGithubRepos(filteredRepos);
      } catch (error) {
        console.error("Error fetching GitHub repositories:", error);
      } finally {
        setLoadingRepos(false);
      }
    };
    if (GITHUB_USERNAME && REPOSITORIES_TO_DISPLAY.length > 0) {
      fetchRepos();
    } else {
      setLoadingRepos(false);
    }
  }, [GITHUB_USERNAME, REPOSITORIES_TO_DISPLAY]);

  // Function to fetch LeetCode solved count (simulated)
  useEffect(() => {
    if (LEETCODE_USERNAME) {
      setTimeout(() => {
        const mockSolvedCount = Math.floor(Math.random() * 500) + 100;
        setLeetcodeSolvedCount(mockSolvedCount);
        setLoadingLeetcode(false);
      }, 1000);
    } else {
      setLoadingLeetcode(false);
    }
  }, [LEETCODE_USERNAME]);

  // Handler for the drawer
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  // Nav Links for both AppBar and Drawer
  const navLinks = [
    { text: "About", href: "#about" },
    { text: "Skills", href: "#skills" },
    { text: "Projects", href: "#projects" },
    { text: "Contact", href: "#contact" },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, overflowX: "hidden" }}>
        {/* Header/Navbar */}
        <AppBar
          position="fixed"
          sx={{
            bgcolor: "transparent",
            backdropFilter: "blur(10px)",
            boxShadow: "none",
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link href="#" color="inherit" underline="none">
                Maruti Panchal
              </Link>
            </Typography>
            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box>
                {navLinks.map((link) => (
                  <Button key={link.text} color="inherit" href={link.href}>
                    {link.text}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </AppBar>

        {/* Mobile Drawer */}
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{
              width: 250,
              // Set the drawer background to match the hero section gradient
              background: "linear-gradient(45deg, #0f2027, #203a43, #2c5364)",
              color: theme.palette.text.primary, // Set a matching text color
              p: 2,
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton
                onClick={toggleDrawer(false)}
                sx={{ color: theme.palette.text.primary }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <List>
              {navLinks.map((link) => (
                <ListItem key={link.text} button component="a" href={link.href}>
                  <ListItemText primary={link.text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        {/* Hero Section */}
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            background: "linear-gradient(45deg, #0f2027, #203a43, #2c5364)",
            p: 4,
            pt: 10,
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h1" gutterBottom>
              I'm Maruti Panchal.
            </Typography>
            <Typography variant="h4" color="primary" paragraph>
              A passionate developer building modern and intuitive web
              experiences.
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                href="#projects"
              >
                View My Work
              </Button>
            </Box>
          </Container>
        </Box>

        {/* About Me Section */}
        <Container id="about" sx={{ my: 10, py: 5 }}>
          <Typography variant="h2" align="center" gutterBottom>
            About Me
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ maxWidth: "800px", mx: "auto", mt: 4, lineHeight: 1.8 }}
          >
            My journey into software development began with a curiosity for how
            things work on the web. I've since developed a strong passion for
            creating elegant, efficient, and user-friendly applications using
            modern technologies. With a solid foundation in front-end
            development, particularly with React and its ecosystem, I thrive on
            solving complex problems and continuously learning new skills to
            stay ahead in the ever-evolving tech landscape.
          </Typography>
        </Container>

        {/* Skills Section */}
        <Box id="skills" sx={{ py: 10, bgcolor: "background.paper" }}>
          <Container>
            <Typography variant="h2" align="center" gutterBottom>
              Skills & Expertise
            </Typography>
            <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
              {skills.map((skill, index) => (
                <Grid item key={index}>
                  <Chip
                    icon={skill.icon}
                    label={skill.name}
                    variant="outlined"
                    sx={{
                      p: 2,
                      fontSize: "1rem",
                      "& .MuiChip-icon": {
                        fontSize: "1.2rem",
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Projects Section */}
        <Container id="projects" sx={{ my: 10, py: 5 }}>
          <Typography variant="h2" align="center" gutterBottom>
            My Projects
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {loadingRepos ? (
              <Loading />
            ) : githubRepos.length > 0 ? (
              githubRepos.map((project) => (
                <Grid item xs={12} sm={6} md={4} key={project.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {project.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {project.description || "No description provided."}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Link href={project.html_url} target="_blank">
                        <IconButton
                          color="inherit"
                          aria-label="GitHub repository"
                        >
                          <GitHubIcon />
                        </IconButton>
                      </Link>
                      {project.homepage && (
                        <Link href={project.homepage} target="_blank">
                          <Button size="small" color="primary">
                            Live Demo
                          </Button>
                        </Link>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography
                variant="body1"
                align="center"
                color="text.secondary"
                sx={{ width: "100%", mt: 4 }}
              >
                No featured projects to display.
              </Typography>
            )}
          </Grid>
        </Container>

        {/* Contact Section */}
        <Box id="contact" sx={{ bgcolor: "background.paper", py: 10 }}>
          <Container maxWidth="sm" sx={{ textAlign: "center" }}>
            <Typography variant="h2" gutterBottom>
              Get In Touch
            </Typography>
            <Typography
              variant="h6"
              paragraph
              color="text.secondary"
              sx={{ mt: 2 }}
            >
              I'm always open to new opportunities and collaborations. Feel free
              to connect with me!
            </Typography>
            <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
              <Grid item>
                <Link href="mailto:panchal.maruti70@gmail.com">
                  <IconButton color="primary" size="large">
                    <EmailIcon fontSize="large" />
                  </IconButton>
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="https://www.linkedin.com/in/maruti-panchal/"
                  target="_blank"
                >
                  <IconButton color="primary" size="large">
                    <LinkedInIcon fontSize="large" />
                  </IconButton>
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                >
                  <IconButton color="primary" size="large">
                    <GitHubIcon fontSize="large" />
                  </IconButton>
                </Link>
              </Grid>
              <Grid item>
                {loadingLeetcode ? (
                  <Loading />
                ) : (
                  <Link
                    href={`https://leetcode.com/${LEETCODE_USERNAME}/`}
                    target="_blank"
                  >
                    <Button variant="outlined" color="primary" size="large">
                      LeetCode ({leetcodeSolvedCount} Solved)
                    </Button>
                  </Link>
                )}
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
