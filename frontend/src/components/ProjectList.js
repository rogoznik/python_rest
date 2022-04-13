import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

function ProjectListItem(props) {
    const {deleteProject, project} = props;

    function handleClick() {
        deleteProject(project.id);
    }

    return (
        <tr>
            <td>
                <Link to={`/project/${project.id}`}>{project.name}</Link>
            </td>
            <td>
                {project.linkToRepo}
            </td>
            <td>
                <button onClick={() => handleClick()}>Del</button>
            </td>
        </tr>
    );
}

ProjectListItem.propTypes = {
    project: PropTypes.object,
    deleteProject: PropTypes.func
};

function ProjectList(props) {
    const {deleteProject, projects} = props;
    const [searchProjects, setSearch] = useState(projects);

    function handleChange(event) {
        const newSearchProjects = projects.filter((project) => 
            !event.target.value || 
            (event.target.value && project.name.toLowerCase().includes(event.target.value.toLowerCase()))
        );
        setSearch(newSearchProjects);
    }

    useEffect(() => {

    }, [props.projects]);

    return(
        <div>
            <Link to='/project/create'>Create</Link>
            <div>
                <input type="text" placeholder="Search" onChange={(event) => handleChange(event)} />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>
                            name
                        </th>
                        <th>
                            linkToRepo
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {searchProjects.map((project) => <ProjectListItem 
                        key={project.id.toString()} 
                        project={project} 
                        deleteProject={deleteProject}
                        />)}
                </tbody>
            </table>
        </div>
    );
}

ProjectList.propTypes = {
    projects: PropTypes.array,
    deleteProject: PropTypes.func
};

export default ProjectList;
