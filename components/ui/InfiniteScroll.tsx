import { useState, useCallback, useEffect } from "react";
import { fetchGitHubRepos } from "@/lib/dbinfinite";
const InfiniteScroll = () => {
  const [pageOffset, setPageOffset] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const throttleAnimation = useCallback((callback: () => void) => {
    return () => {
      return requestAnimationFrame(() => {
        return callback();
      });
    };
  }, []);
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetchGitHubRepos("", 40, pageOffset);
      const newData = await res.json();
      setData([...data, ...newData]);
    } catch (error) {
      console.error("Error fetching data:", error);
      // 에러 처리
    } finally {
      setIsLoading(false);
    }
  }, [pageOffset, data]);
  const handleScroll = useCallback(() => {
    const { innerHeight } = window;
    const { scrollTop, offsetHeight } = document.documentElement;
    if (innerHeight + Math.ceil(scrollTop) >= offsetHeight && !isLoading) {
      fetchData();
    }
  }, [fetchData, isLoading]);
  useEffect(() => {
    const scroll = throttleAnimation(() => handleScroll());
    window.addEventListener("scroll", scroll);
    return () => window.removeEventListener("scroll", scroll);
  }, [throttleAnimation, handleScroll]);
  useEffect(() => {
    if (!data.length) {
      fetchData();
    }
  }, [fetchData, data]);
  return <div>InfiniteScroll</div>;
};

export default InfiniteScroll;
