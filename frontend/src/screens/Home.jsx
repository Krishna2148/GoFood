import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
    const [search, setSearch] = useState('')
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        try {
            let response = await fetch("http://localhost:5000/api/foodData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            response = await response.json();
            setFoodItem(response[0]);
            setFoodCat(response[1]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <Navbar />
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id="carousel">
                        <div className="carousel-caption" style={{ zIndex: "10" }} >
                            <div className="d-flex justify-content-center" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{ filter: "brightness(30%" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100" style={{ filter: "brightness(30%" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100" style={{ filter: "brightness(30%" }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className="container">
                {
                    foodCat.length !== 0
                        ? foodCat.map((category) => (
                            <div key={category._id}>
                                <div className="fs-3 m-3">
                                    {category.CategoryName}
                                </div>
                                <hr />
                                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                                    {
                                        foodItem.length !== 0 ?
                                            foodItem.filter((item) => (item.CategoryName === category.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                                                .map(filteredItem => (
                                                    <div key={filteredItem._id} className="col mb-4">
                                                        <Card foodItem={filteredItem}
                                                        // foodName={filteredItem.name}
                                                            options={filteredItem.options[0]}
                                                            // imgSrc={filteredItem.img}
                                                            // description={filteredItem.description}
                                                        ></Card>
                                                    </div>
                                                ))
                                            : <div>No data found</div>
                                    }
                                </div>
                            </div>
                        ))
                        : <div>No food categories available</div>
                }
            </div>
            <Footer />
        </div>
    )
}

