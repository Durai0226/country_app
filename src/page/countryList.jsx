import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../constant/url";
import facebook from "../assets/Svg/facebook.svg";
import youtube from "../assets/Svg/Yt.svg";
import linkedin from "../assets/Svg/linkedin.svg";
import twitter from "../assets/Svg/twitter.svg";
import "../styles/countryStyle.css";

const CountryCard = ({ flag, name, region }) => {
  return (
    <div className="card">
      <div className="card_img">
        <img className="flag" src={flag} alt={`Flag of ${name}`} />
      </div>
      <div className="card_country">
        <h3 className="countryName">{name}</h3>
        <span className="countryRegion">{region}</span>
      </div>
    </div>
  );
};

const CountryList = () => {
  const [countryData, setCountryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  const getCountryList = async () => {
    try {
      let response = await axios.get(API_URL);
      setCountryData(response?.data);
      setFilteredData(response?.data);
      console.log(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterByRegion = (region) => {
    if (region === "all") {
      setFilteredData(countryData);
    } else {
      const filteredCountries = countryData.filter(
        (country) => country.region === region
      );
      setFilteredData(filteredCountries);
    }
    setActiveTab(region);
  };

  useEffect(() => {
    getCountryList();
  }, []);

  return (
    <div className="container">
      <div className="heading_container">
        <div>
          <h1>Countries</h1>
        </div>
        <div className="tab">
          <button
            className={`tab_btn ${activeTab === "all" ? "active" : ""}`}
            onClick={() => filterByRegion("all")}
          >
            All
          </button>
          <button
            className={`tab_btn ${activeTab === "Asia" ? "active" : ""}`}
            onClick={() => filterByRegion("Asia")}
          >
            Asia
          </button>
          <button
            className={`tab_btn ${activeTab === "Europe" ? "active" : ""}`}
            onClick={() => filterByRegion("Europe")}
          >
            Europe
          </button>
        </div>
      </div>
      <div className="countryList_Container">
        {filteredData.map((country) => (
          <CountryCard
            key={country.name}
            flag={country.flag}
            name={country.name}
            region={country.region}
          />
        ))}
      </div>
      <div className="footer">
        <div className="social_links">
          <img src={facebook} alt="Facebook" key="facebook" />
          <img src={linkedin} alt="LinkedIn" key="linkedin" />
          <img src={twitter} alt="Twitter" key="twitter" />
          <img src={youtube} alt="Google" key="google" />
        </div>
        <div className="footer_link">
          <span className="footer_support">Example@email.com </span>
          <span className="copyRights">
            Copyright © 2020 Name. All rights reserved.
          </span>
        </div>
      </div>
    </div>
  );
};

export default CountryList;
