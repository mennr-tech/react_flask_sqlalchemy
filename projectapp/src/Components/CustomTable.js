import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { Comparator } from 'react-bootstrap-table2-filter';

const defaultSorted = [{
  dataField: 'id',
  order: 'asc'
}];

const RemoteAll = ({ data, columns, page, sizePerPage, onTableChange, totalSize }) => (
  <div>
    <BootstrapTable
      remote
      keyField="id"
      data={ data }
      columns={ columns }
      defaultSorted={ defaultSorted }
      filter={ filterFactory() }
      pagination={ paginationFactory({ page, sizePerPage, totalSize }) }
      onTableChange={ onTableChange }
    />
  </div>
);

RemoteAll.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  totalSize: PropTypes.number.isRequired,
  sizePerPage: PropTypes.number.isRequired,
  onTableChange: PropTypes.func.isRequired
};

export default class CustomTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: props.page,
      data: props.totalData.slice(0, props.sizePerPage),
      columns: props.columns,
      totalData: props.totalData,
      totalSize: props.totalData.length,
      sizePerPage: props.sizePerPage
    };
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  componentWillReceiveProps(props) {
    this.state = {
      page: props.page,
      data: props.totalData.slice(0, props.sizePerPage),
      columns: props.columns,
      totalData: props.totalData,
      totalSize: props.totalData.length,
      sizePerPage: props.sizePerPage
    };
  }


  handleTableChange = (type, { page, sizePerPage, filters, sortField, sortOrder, data }) => {
    const currentIndex = (page - 1) * sizePerPage;
    setTimeout(() => {
      let result = this.state.totalData;

      // Handle column filters
      result = result.filter((row) => {
        let valid = true;
        for (const dataField in filters) {
          const { filterVal, filterType, comparator } = filters[dataField];

          if (filterType === 'TEXT') {
            if (comparator === Comparator.LIKE) {
              valid = row[dataField].toString().indexOf(filterVal) > -1;
            } else {
              valid = row[dataField] === filterVal;
            }
          }
          if (!valid) break;
        }
        return valid;
      });

      // Handle column sort
      if (sortOrder === 'asc') {
        result = result.sort((a, b) => {
          if (a[sortField] > b[sortField]) {
            return 1;
          } else if (b[sortField] > a[sortField]) {
            return -1;
          }
          return 0;
        });
      } else {
        result = result.sort((a, b) => {
          if (a[sortField] > b[sortField]) {
            return -1;
          } else if (b[sortField] > a[sortField]) {
            return 1;
          }
          return 0;
        });
      }
      this.setState(() => ({
        page,
        data: result.slice(currentIndex, currentIndex + sizePerPage),
        totalSize: result.length,
        sizePerPage
      }));
    }, 500);
  }

  render() {
    const { data, columns, totalSize, sizePerPage, page } = this.state;
    return (
      <RemoteAll
        data={ data }
        columns={ columns }
        page={ page }
        sizePerPage={ sizePerPage }
        totalSize={ totalSize }
        onTableChange={ this.handleTableChange }
      />
    );
  }
}