import React, { useEffect, useState } from 'react';
import '../../Styles/CustViewShops.css';
import { viewCount } from '../Services/AdminService';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { IMG_BASE_URL } from '../Services/BaseURL';
import { IoLocationSharp } from "react-icons/io5";
import { IoMdCall } from "react-icons/io";
import { IoMdMail } from "react-icons/io";

function CustViewAllShops() {
    const [data, setData] = useState([]);
    console.log('data', data)

    const fetchData = async () => {
        try {
            const result = await viewCount('viewActiveShops');
            if (result.success) {
                if (result.user.length > 0) setData(result.user);
                else setData([]);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            // toast.error('An unexpected error occurred during Data View');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (<div>
        <div className="cust-view-shop-main">
            <p className="cust-choose-shop">CHOOSE A SHOP</p>
            </div>
            {data.length > 0 ? (
                <div className="card-container">
                    {data.map((item, index) => (
                        <Link to={`/place-order1/${item._id}`} key={index} className="card-link">
                            <div className="card-view">
                                <img
                                    className="card-img-top card-img-cust"
                                    src={`${IMG_BASE_URL}/${item.image.filename}`}
                                    alt={item.name}
                                />
                                <div className="card-body">
                                    <h5 className="cust-card-title">{item.name}</h5>
                                    <div className="cust-card-data">
                                        <p><IoLocationSharp /> {item.location}</p>
                                        <p><IoMdCall /> {item.contact}</p>
                                        <p><IoMdMail /> {item.email}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <h3>No Shops Found!</h3>
            )}
        </div>
    );
}

export default CustViewAllShops;
