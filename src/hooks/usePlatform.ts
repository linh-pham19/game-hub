 import usePlatforms from "./usePlatforms";
  
 const usePlatform = (id?: number) => {
    const { data, error } = usePlatforms();
    const platforms = data?.results || [];
    return platforms.find((p) => p.id === id);
 }

 export default usePlatform;