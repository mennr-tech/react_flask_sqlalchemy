import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { textFilter } from 'react-bootstrap-table2-filter';
import CustomTable from '../Components/CustomTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

function linkButton (cell, row) {
    return (
        <Link to={`/detail/${row.id}`}><FontAwesomeIcon icon={faEye}/></Link>
    );
}

const columns = [{
        dataField: 'id',
        text: 'Project ID',
        sort: true
    }, {
        dataField: 'name',
        text: 'Project Name',
        filter: textFilter({
            defaultValue: ''
        }),
        sort: true
    }, {
        dataField: 'startdate',
        text: 'Start Date',
        filter: textFilter({
            defaultValue: ''
        }),
        sort: true
    }, {
        dataField: 'action',
        text: 'Action',
        formatter: linkButton
    }];

// const projects = [ 
//     {id: 1, name: 'Project 1', startdate: '2020-04-01'},
//     {id: 2, name: 'Project 2', startdate: '2020-04-03'},
//     {id: 3, name: 'Project 3', startdate: '2020-04-06'},
//  ];

class Main extends Component {
    constructor(props) {
        super(props);
            this.state = {
                projects: []
            };
    }

    async fetchData() {
        try {
            let data = await axios.get("http://127.0.0.1:5000/projects");
            this.setState(() => ({
                projects: data.data.projects
            }));
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
    }

    componentDidMount() {
        this.fetchData();
    }
    
    render() {
        return (
            <div>
                <h1>Main</h1>
                <CustomTable page={1} sizePerPage={10} totalData={this.state.projects} columns={columns} />
            </div>
        );
    }
}

export default Main;
