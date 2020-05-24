import React from 'react'
import Card from './Card'

function Listings({listings}) {

    const getListings = ()=> {

        let listingsOnPage = []
        let result =[]
        listings.map((listing, index)=>{
        return listingsOnPage.push(
            <Card key={index}
            title={listing.title}
            address={listing.address}
            city={listing.city}
            state={listing.state}
            price={listing.price}
            sale_type={listing.title}
            home_type={listing.home_type}
            bedrooms ={listing.bedrooms}
            bathrooms={listing.bathrooms}
            sqft={listing.sqft}
            photo_main={listing.photo_main}
            slug={listing.slug}
            />
        )});
        for(let i=0; i < listings.length; i+=3){
            result.push(
                <div key={i} className="row">
                    <div className="col-1-of-3">
                        {listingsOnPage[i]}
                    </div>
                    <div className="col-1-of-3">
                        {listingsOnPage[i+1] ? listingsOnPage[i+1] : null}
                    </div>
                    <div className="col-1-of-3">
                    {listingsOnPage[i+2] ? listingsOnPage[i+2] : null}
                    </div>
                </div>
            )
        }
        return result
    }


    return (
        <div>
            {getListings()}
        </div>
    )
}

export default Listings
