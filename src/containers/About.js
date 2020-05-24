import React, {useEffect, useState, Fragment} from 'react'
import {Helmet} from 'react-helmet'
import axios from 'axios';
import House from '../assets/images/photo-1430285561322-7808604715df.jpg'


function About() {

    const [topSeller, setTopSeller]= useState([])
    const [realtors, setRealtors]= useState([])

    useEffect(() => {
       axios.defaults.headers = {
           "Content-Type": "application/json"
       }
       const getTopSeller = async ()=> {
           try  {
               const res = await axios.get('http://161.35.111.5/api/realtors/topseller')
               setTopSeller(res.data)
           }
           catch(err) {
                console.log(err)
           }
       }
       getTopSeller()

    }, [])

    useEffect(() => {
        axios.defaults.headers = {
            'Content-Type': 'application/json'
        }
 
        const getRealtors = async()=> {
            try  {
                const res = await axios.get('http://161.35.111.5/api/realtors/')
                setRealtors(res.data)
            }
            catch(err) {
                 console.log(err)
            }
        }
        getRealtors()
    }, [])


    const getAllRealtors = ()=> {
        let allRealtors = []
        let results = []

        realtors.map(realtor => {
            return allRealtors.push(
                <Fragment key={realtor.id}>
                    <div className="about__display">
                        <img src={realtor.photo} className="about__display__image"/>
                    </div>
                    <h3 className="about__realtor">{realtor.name}</h3>
                    <p className="about__contact">{realtor.phone}</p>
                    <p className="about__contact">{realtor.email}</p>
                    <p className="about__contact">{realtor.description}</p>
                </Fragment>
            )
        });


        for(let i=0; i<realtors.length; i+=3){
            results.push(
                <div key={i} className="row">
                    <div className="col-1-of-3">
                        {allRealtors[i]}
                    </div>
                    <div className="col-1-of-3">
                        {allRealtors[i+1] ? allRealtors[i+1]: null}
                    </div><div className="col-1-of-3">
                        {allRealtors[i+2] ? allRealtors[i+2]: null}
                    </div>
                </div>
            )
        }

        return results
    }
    
    const getTopSeller = ()=> {
        let result = []

        topSeller && topSeller.map(seller => {
            return result.push(
                <Fragment key={seller.id}>
                    <div className="about__display">
                        <img src={seller.photo} className="about__display__image"/>
                    </div>
                    <h3 className="about__topseller">Top Seller: </h3>
                    <p className="about__realtor">{seller.name}</p>
                    <p className="about__contact">{seller.phone}</p>
                    <p className="about__contact">{seller.email}</p>
                    <p className="about__about">{seller.description}</p>
                </Fragment>
            )
        })
        return result;
    }
    return (
        <main className='about'>
            <Helmet>
                <title>Realest Estate - About</title>
                <meta name='description' content='About us'/>
            </Helmet>
            <header className="about__header">
                <h1 className="about__heading">About Realest Estate</h1>
            </header>
            <section className="about__info">
                <div className="row">
                    <div className="col-3-of-4">
                        <h3 className="about__subheading">We find the perfect home for you</h3>
                        <p className="about__paragraph">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae asperiores a deleniti, iure maxime recusandae voluptates facere. Reprehenderit, velit animi.
                        </p>
                        <div className="about__display">
                            <img src={House} className="about__display__image"/>
                        </div>
                        <p className="about__paragraph">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, numquam eligendi nihil cumque pariatur asperiores reprehenderit praesentium dolores sequi nostrum.
                        </p>
                    </div>
                    <div className="col-1-of-4">
                        {getTopSeller()}
                    </div>
                </div>
            </section>
            <section className="about__team">
                <div className="row">
                    <h3 className="about__subheading">Meet Our Awesome Team</h3>
                </div>
                {getAllRealtors()}
            </section>
        </main>
    )
}

export default About
