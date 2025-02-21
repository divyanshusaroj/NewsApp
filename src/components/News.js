import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
  
  
const capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  const updateNews = async () => {
    props.setProgress(0)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    props.setProgress(30)
    let data = await fetch(url);
    let parsedData = await data.json();
    props.setProgress(70)
    console.log(parsedData);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100)
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    setLoading(true)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setPage(nextPage);
    setLoading(false)
  };



    return (
        <>

        <h1 className="text-center" style={{marginTop:'90px'}}><strong>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines </strong>
        </h1>
        {/* {loading && <Loading />} */}
        
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={loading && <Loading />}
        >
    <div className="container">
        <div className="row">
          {articles.map((element, index) => {
              return (<div className="col-md-4" key={index}>
                  <NewsItem title={element.title} description={element.description}
                    imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt}
                    author={element.author} source={element.source.name} />
                </div>
              );
            })}
        </div>
    </div>
        </InfiniteScroll>

        </>
    );
  }


News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};


export default News;
