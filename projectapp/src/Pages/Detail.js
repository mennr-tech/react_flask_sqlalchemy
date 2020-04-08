import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import { textFilter } from 'react-bootstrap-table2-filter';
import CustomTable from '../Components/CustomTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";

const userColumns = [{
        dataField: 'id',
        text: 'User ID',
        sort: true
    }, {
        dataField: 'name',
        text: 'User Name',
        filter: textFilter({
            defaultValue: ''
        }),
        sort: true
    }, {
        dataField: 'email',
        text: 'User Email',
        filter: textFilter({
            defaultValue: ''
        }),
        sort: true
    }];

// const users = [ 
//     {id: 1, name: 'A', email: 'a@a.com'},
//     {id: 2, name: 'B', email: 'b@b.com'},
//     {id: 3, name: 'C', email: 'c@c.com'},
//     {id: 4, name: 'A', email: 'a@a.com'},
//     {id: 5, name: 'B', email: 'b@b.com'},
//     {id: 6, name: 'C', email: 'c@c.com'},
// ];

const fileColumns = [{
    dataField: 'id',
    text: 'File ID',
    sort: true
}, {
    dataField: 'name',
    text: 'File Name',
    filter: textFilter({
        defaultValue: ''
    }),
    sort: true
}, {
    dataField: 'typename',
    text: 'File Type',
    filter: textFilter({
        defaultValue: ''
    }),
    sort: true
}];

// const files = [ 
//     {id: 1, name: 'File 1', type: 'txt'},
//     {id: 2, name: 'File 2', type: 'mp3'},
//     {id: 3, name: 'File 3', type: 'html'},
//     {id: 4, name: 'File 1', type: 'txt'},
//     {id: 5, name: 'File 2', type: 'mp3'},
//     {id: 6, name: 'File 3', type: 'html'},
//     {id: 7, name: 'File 1', type: 'txt'},
//     {id: 8, name: 'File 2', type: 'mp3'},
//     {id: 9, name: 'File 3', type: 'html'},
//     {id: 10, name: 'File 1', type: 'txt'},
//     {id: 11, name: 'File 2', type: 'mp3'},
//     {id: 12, name: 'File 3', type: 'html'},
// ];

class Detail extends Component {
    constructor(props) {
        super(props);
            this.state = {
                users: [],
                files: []
            };
    }

    async fetchData() {
        try {
            let data = await axios.get(`http://127.0.0.1:5000/project_detail/${this.props.match.params.id}`);
            this.setState(() => ({
                users: data.data.users,
                files: data.data.files,
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
            <Row>
                <Col><h1>Detail</h1></Col>
                <Col className="text-right m-auto"><Link to="/"><FontAwesomeIcon icon={faArrowLeft} size="lg"/></Link></Col>
            </Row>
            
            <Tabs defaultActiveKey="users" id="uncontrolled-tab-example">
                <Tab eventKey="users" title="Users">
                    <CustomTable page={1} sizePerPage={10} totalData={this.state.users} columns={userColumns} />
                </Tab>
                <Tab eventKey="files" title="Files">
                    <CustomTable page={1} sizePerPage={10} totalData={this.state.files} columns={fileColumns} />
                </Tab>
            </Tabs>

            </div>
        );
    }
}

export default Detail;