import React, {useState, useEffect} from 'react'
import {Helmet} from 'react-helmet'
import Card from '../components/Card'
import axios from 'axios'
import Pagination from '../components/Pagination'

function Listings() {

    const [listings, setListings] = useState([])
    const [count, setCount] = useState(0)
    const [previous, setPrevious] = useState('')
    const [next, setNext] = useState('')
    const [active, setActive] = useState(1)

    useEffect(() => {
       window.scrollTo(0, 0)

       const fetchData = async ()=> {
           try{
               const res = await axios.get('http://localhost:8000/api/listings/?page=1');
               setListings(res.data.results)
               setCount(res.data.count)
               setPrevious(res.data.previous)
               setNext(res.data.next)
           }
           catch(err){
                console.log(err)
           }
        }
        fetchData();

    }, [])

    const displayListings = ()=> {
        let display = []
        let results = []

        listings.map((listing, index)=>{
            return display.push(
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
            )
        })

        for(let i=0; i<listings.length; i+=3){

            results.push(
                <div key={i} className="row">
                    <div className="col-1-of-3">
                        {display[i]} 
                    </div>
                    <div className="col-1-of-3">
                        {display[i+1] ? display[i+1]: null} 
                    </div>
                    <div className="col-1-of-3">
                        {display[i+2] ? display[i+2]: null} 
                    </div>
                </div>
            )
        }

        return results
    }

    const visitPage = (page)=> {
        axios.get(`http://localhost:8000/api/listings/?page=${page}`)
        .then(res=> {
            setListings(res.data.results)
            setActive(page)
            setPrevious(res.data.previous)
            setNext(res.data.next)
        })
        .catch(err=>{

        })
    }

    const previous_number = ()=> {
        axios.get(previous)
        .then(res=> {
            setListings(res.data.results)
            setPrevious(res.data.previous)
            setNext(res.data.next)
            if(previous)
                setActive(active-1)

        })
        .catch(err=> {
            console.log(err)
        })
    }
    
    const next_number = ()=> {
        axios.get(next)
        .then(res=> {
            setListings(res.data.results)
            setPrevious(res.data.previous)
            setNext(res.data.next)
            if(next)
                setActive(active-1)

        })
        .catch(err=> {
            console.log(err)
        })
    }


    return (
        <main className='listings'>
            <Helmet>
                <title>Realest Estate - Listings</title>
                <meta name='description' content='Listings page'/>
            </Helmet>
            <section className="listings__listings">
                {displayListings()}
            </section>
            <section className="listings__pagination">
                <div className="row">
                <Pagination
                    itemsPerPage= {3}
                    count={count}
                    visitPage={visitPage}
                    previous={previous_number}
                    next = {next_number}
                    active ={active}
                    setActive ={setActive} />
                </div>
            </section>
        </main>
    )
}

export default Listings
