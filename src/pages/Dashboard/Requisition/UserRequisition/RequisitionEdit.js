import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const RequisitionEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [requisitions, setRequisitions] = useState([]);

    useEffect(() => {
    fetch(`http://localhost:5000/createRequisition/${id}`)
        .then((res) => res.json())
        .then((data) => setRequisitions(data));
    }, []);
    
    return (
        <div>
            <h2>Hi, I am from requisition Edit: {id} </h2>

        </div>
    );
};

export default RequisitionEdit;