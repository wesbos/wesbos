import React from 'react';
import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import WelcomeStyles from '../assets/styles/WelcomeStyles';
import H from '../components/mdxComponents/Headings';
import { PostMetaTags } from '../components/MetaTags';

export default function HomePage({ data, path }) {
  return (
    <div className="welcome">
      <Helmet htmlAttributes={{ lang: 'en' }} title="Wes Bos - Swag" />
      <p>hey</p>
      <button
        type="button"
        className="snipcart-add-item"
        data-item-id="pink-on-pink-tshirt"
        data-item-price="17.00"
        data-item-url={`${process.env.GATSBY_BASE_URL}/swag`}
        data-item-name="Pink on Pink tshirt"
        // grams
        data-item-weight="215"
        // cm
        data-item-length="23"
        data-item-height="5"
        data-item-width="17"
        data-item-shippable="true"
        data-item-max-quantity="49"
      >
        Add Pink Shirt
      </button>
      <button
        type="button"
        className="snipcart-add-item"
        data-item-id="5-pack-stickers"
        data-item-price="6.00"
        data-item-url={`${process.env.GATSBY_BASE_URL}/swag`}
        data-item-name="5 Packs of Stickers"
        // grams
        data-item-weight="45"
        // cm
        data-item-length="9"
        data-item-height="14"
        data-item-width="2"
        data-item-shippable="true"
        data-item-max-quantity="49"
      >
        5 Packs of Stickers
      </button>
      {/*
        Questiosnf or Snipcart:
        1. How do I limit the amount of products sold? Inventory

      */}
    </div>
  );
}
