import React, { useState, useEffect } from 'react';

interface NewsItemProps {
    title: string;
    url: string;
    summary: string;
    banner_image: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ title, url, summary, banner_image }) => {
    return (
        <div className="news-item">
            <h2><a href={url} target="_blank" rel="noopener noreferrer">{title}</a></h2>
            <p>{summary}</p>
            {banner_image && <img src={banner_image} alt={title} />}
        </div>
    );
};

const NewsList: React.FC = () => {
    const [newsItems, setNewsItems] = useState<NewsItemProps[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo`);
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.feed) {
                        const newsData = data.feed.map((item: any) => ({
                            title: item.title,
                            url: item.url,
                            summary: item.summary,
                            banner_image: item.banner_image
                        }));
                        setNewsItems(newsData);
                    }
                } else {
                    console.error('Failed to fetch news data');
                }
            } catch (error) {
                console.error('Error fetching news data:', error);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="news-list">
            {newsItems.map((item, index) => (
                <NewsItem
                    key={index}
                    title={item.title}
                    url={item.url}
                    summary={item.summary}
                    banner_image={item.banner_image}
                />
            ))}
        </div>
    );
};

export default NewsList;
