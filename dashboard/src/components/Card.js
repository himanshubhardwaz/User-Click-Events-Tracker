import React from 'react'
import Card from "react-bootstrap/Card"
import 'bootstrap/dist/css/bootstrap.min.css';

const CardComponent = ({ header, title, body }) => {
    return (
        <div>
            <Card
                bg="primary"
                text='white'
                style={{ width: '18rem' }}
                className="mb-2"
            >
                <Card.Header>{header}</Card.Header>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        {body}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default CardComponent
