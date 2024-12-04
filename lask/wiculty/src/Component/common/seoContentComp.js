import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { stripTrailingSlash } from './utilFunctions/utilFunction';

const SeoContentComp = ({ seoContent, seoKey }) => {
  const seoContentObj = seoContent || {};
  const {
    meta_description,
    meta_keyword,
    meta_title,
    og_url,
    og_title,
    og_description,
    og_image,
    og_site_name,
    twitter_url,
    twitter_title,
    twitter_description,
    twitter_image,
    twitter_site
  } = seoContentObj[seoKey] || {};
  const pageUrl = stripTrailingSlash(window.location.href);
  return (
    <Helmet>
      <title>{meta_title}</title>
      <meta charSet="utf-8" />
      <meta name="description" content={meta_description} />
      <link rel="canonical" href={pageUrl} />
      <meta name="keywords" content={meta_keyword} />
      <meta name="twitter:url" content={twitter_url} />
      <meta name="twitter:site" content={twitter_site} />
      <meta name="twitter:title" content={twitter_title} />
      <meta name="twitter:description" content={twitter_description} />
      <meta name="twitter:image" content={twitter_image} />
      <meta property="og:locale" content="en-US" />
      <meta property="og:site_name" content={og_site_name} />
      <meta property="og:url" content={og_url} />
      <meta property="og:title" content={og_title} />
      <meta property="og:description" content={og_description} />
      <meta property="og:image" content={og_image} />
      <meta property="og:type" content="website" />
    </Helmet>
  )
}

export const mapStateToProps = state => ({
  seoContent: state.seoContent
});

SeoContentComp.propTypes = {
  seoContent: PropTypes.isRequired,
  seoKey: PropTypes.string.isRequired
};

export default connect(mapStateToProps, null)(SeoContentComp)
