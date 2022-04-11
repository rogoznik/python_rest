import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProjectListItem(props) {
    function handleClick() {
        props.deleteProject(props.project.id);
    }

    return (
        <tr>
            <td>
                <Link to={`/project/${props.project.id}`}>{props.project.name}</Link>
            </td>
            <td>
                {props.project.linkToRepo}
            </td>
            <td>
                <button onClick={() => handleClick()}>Del</button>
            </td>
        </tr>
    );
}

function ProjectList(props) {
    const [searchProjects, setSearch] = useState(props.projects);

    function handleChange(event) {
        const newSearchProjects = props.projects.filter((project) => 
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
                        deleteProject={props.deleteProject}
                        />)}
                </tbody>
            </table>
        </div>
    );
}

export default ProjectList;
