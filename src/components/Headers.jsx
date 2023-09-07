import React, { Fragment } from "react";

const Headers = ({ info }) => {
  let tags = "";
  for (let word in info.tags) {
    tags += `${info.tags[word]},`;
  }

  return (
    <Fragment>
      {/* keywords */}
      <meta name="keywords" content={tags} />
      {/* icon */}
      <link rel="shortcut icon" href="/heart.svg" />
      {/* type */}
      <meta property="og:type" content="article" />
      {/* title */}
      <title>{info.title}</title>
      <meta property="og:title" content={info.title} />
      <meta name="twitter:title" content={info.title} />
      {/* description */}
      <meta name="description" content={info.description} />
      <meta property="og:description" content={info.description} />
      <meta name="twitter:description" content={info.description} />
      {/* url */}
      <link rel="canonical" href={info.url} />
      <meta property="og:url" content={info.url} />
      <meta name="twitter:url" content={info.url} />
      {/* image */}
      <meta name="twitter:image" content={info.ogImage} />
      <meta name="twitter:image:secure_url" content={info.ogImage} />
      <meta property="og:image" content={info.ogImage} />
      <meta property="og:image:secure_url" content={info.ogImage} />
      <meta property="og:image:width" content={871} />
      <meta property="og:image:height" content={564} />
    </Fragment>
  );
};

export default Headers;
