import projectService from '../services/projects';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import clientInfo from '../services/clientInfo';

const Projects = ({ user, project, projects, setProjects, setProject, projectBarOpen, setProjectBarOpen }) => {

  const createProject = async () => {
    const name = prompt('Please name your project', '');
    if (!name) {
      return;
    }
    const newProjects = await projectService.create(name, user);
    newProjects.sort((a, b) => a.name.localeCompare(b.name));
    setProjects(newProjects);
    setProject(newProjects.find((p) => p.name === name));
  };

  const setFocused = (project) => {
    setProject(project);
  };

  return (

    <Box sx={{ mt: 1, ml: clientInfo.isNarrowViewPort() ? 0.5 : 1, mr: 0.5 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        {projectBarOpen ? (
          <Typography component='div' variant='h6' sx={{ ml: 1 }}>
            Projects
          </Typography>
        ) : ('')}
        <IconButton
          sx={{ ml: projectBarOpen ? (clientInfo.isNarrowViewPort() ? 1 : 2) : 0 }}
          aria-label={`Toggle project column visibility`}
          size='small'
          onClick={() => setProjectBarOpen(!projectBarOpen)}
        >
          <Icon fontSize='small'>
            {projectBarOpen ? ('close') : ('menu')}
          </Icon>
        </IconButton>
      </Box>
      {projectBarOpen ? (
        <Box>
          <Button
            onClick={createProject}
            fullWidth
            variant='outlined'
            color='primary'
            sx={{ mt: 1, mb: 1 }}
          >
            New project
          </Button>

          <List>
            {projects.map((p) => (
              <ListItem alignItems='center' disablePadding key={p.id}>
                <ListItemButton
                  dense={true}
                  selected={project && project.id === p.id}
                  onClick={() => setFocused(p)}
                >
                  {p.name}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      ) : ('')}
    </Box>

  );
};

export default Projects;
