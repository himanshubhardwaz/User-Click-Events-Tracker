import React from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Data.css"

const Data = ({ data }) => {

    return (
        <div className="table-div">
            {data ?
                <Table striped={true} bordered={true} hover={true} responsive>
                    <thead>
                        <tr>
                            <td>S.No</td>
                            <td>Name</td>
                            <td>type</td>
                            <td>clicks</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((singleData, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{singleData.name}</td>
                                    <td>{singleData.type}</td>
                                    <td>{singleData.clicks}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                :
                null
            }


        </div>
    )
}

export default Data
