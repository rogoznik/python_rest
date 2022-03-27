import React from 'react';
import { Link } from 'react-router-dom';

function ProjectListItem(props) {
    return (
        <tr>
            <td>
                <Link to={`/project/${props.project.id}`}>{props.project.name}</Link>
            </td>
            <td>
                {props.project.linkToRepo}
            </td>
        </tr>
    );
}

function ProjectList(props) {
    return(
        <table>
            <thead>
                <tr>
                    <th>
                        name
                    </th>
                    <th>
                        linkToRepo
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.projects.map((project) => <ProjectListItem project={project} />)}
            </tbody>
        </table>
    );
}

export default ProjectList;
